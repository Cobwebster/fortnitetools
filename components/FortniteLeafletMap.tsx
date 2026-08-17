'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MAP_HALF,
  contestLabels,
  extractTrafficColor,
  extractTrafficLabels,
  getEnrichment,
  lootLabel,
  resolveExtractionSites,
  worldToLatLng,
  type ContestLevel,
  type PoiEnrichment,
  type ResolvedExtractionSite,
} from '@/lib/map-data'
import type { SpawnLayerId } from '@/lib/map-layers'
import {
  SPAWN_LAYER_COLOR,
  resolveSpawnPoints,
  type ResolvedSpawnPoint,
} from '@/lib/map-spawns'
import { SPAWN_LAYERS } from '@/lib/map-layers'
import { findMapById } from '@/lib/map-evolution'

type ApiPoi = {
  id: string
  name: string
  location: { x: number; y: number; z: number }
}

type MapApiResponse = {
  status: number
  data: {
    images: { blank: string; pois: string }
    pois: ApiPoi[]
  }
}

type DisplayPoi = ApiPoi & {
  enrichment?: PoiEnrichment
  isNamed: boolean
}

type Selection =
  | { kind: 'poi'; id: string }
  | { kind: 'extract'; id: string }
  | { kind: 'spawn'; id: string }

const contestColor: Record<ContestLevel, string> = {
  hot: '#ff6b4a',
  balanced: '#3dd6c6',
  edge: '#7aa2ff',
}

function makePoiIcon(color: string, active: boolean, label?: string) {
  const size = active ? 16 : 12
  const safeLabel = label
    ? label
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    : ''

  const labelHtml = safeLabel
    ? `<span style="
        position:absolute;left:50%;bottom:100%;transform:translate(-50%,-4px);
        white-space:nowrap;pointer-events:none;
        font:700 11px/1.1 system-ui,sans-serif;letter-spacing:0.02em;
        color:${active ? '#ffffff' : '#f4f8ff'};
        text-shadow:
          0 0 4px rgba(0,0,0,.95),
          0 1px 2px rgba(0,0,0,.9),
          1px 0 2px rgba(0,0,0,.9),
          -1px 0 2px rgba(0,0,0,.9),
          0 -1px 2px rgba(0,0,0,.9);
      ">${safeLabel}</span>`
    : ''

  return L.divIcon({
    className: 'fn-poi-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - (label ? 14 : 0)],
    html: `<span style="position:relative;display:block;width:${size}px;height:${size}px;">
      ${labelHtml}
      <span style="
        display:block;width:${size}px;height:${size}px;border-radius:999px;
        background:${color};border:2px solid ${active ? '#fff' : 'rgba(0,0,0,.55)'};
        box-shadow:0 0 0 1px rgba(0,0,0,.25);
      "></span>
    </span>`,
  })
}

function makeExtractIcon(color: string, active: boolean, label?: string) {
  const size = active ? 18 : 14
  const safeLabel = label
    ? label
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    : ''

  const labelHtml = safeLabel
    ? `<span style="
        position:absolute;left:50%;bottom:100%;transform:translate(-50%,-6px);
        white-space:nowrap;pointer-events:none;
        font:700 10px/1.1 system-ui,sans-serif;letter-spacing:0.02em;
        color:${active ? '#ffffff' : '#fff7ed'};
        text-shadow:
          0 0 4px rgba(0,0,0,.95),
          0 1px 2px rgba(0,0,0,.9);
      ">${safeLabel}</span>`
    : ''

  return L.divIcon({
    className: 'fn-poi-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - (label ? 14 : 0)],
    html: `<span style="position:relative;display:block;width:${size}px;height:${size}px;">
      ${labelHtml}
      <span style="
        display:block;width:${size}px;height:${size}px;
        transform:rotate(45deg);
        background:${color};
        border:2px solid ${active ? '#fff' : 'rgba(0,0,0,.5)'};
        box-shadow:0 0 10px ${color}88, 0 0 0 1px rgba(0,0,0,.2);
      "></span>
    </span>`,
  })
}

function makeSpawnIcon(color: string, active: boolean, diamond = false, goldRing = false) {
  const size = active ? 14 : 10
  const shape = diamond
    ? `transform:rotate(45deg);border-radius:1px;`
    : `border-radius:2px;`
  const ring = goldRing
    ? `box-shadow:0 0 0 2px #fbbf24, 0 0 0 1px rgba(0,0,0,.35);`
    : `box-shadow:0 0 0 1px rgba(0,0,0,.35);`
  return L.divIcon({
    className: 'fn-poi-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<span style="
      display:block;width:${size}px;height:${size}px;
      background:${color};border:1.5px solid ${active ? '#fff' : 'rgba(0,0,0,.45)'};
      ${shape}${ring}
    "></span>`,
  })
}

function FitBounds() {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(
      [
        [MAP_HALF, -MAP_HALF],
        [-MAP_HALF, MAP_HALF],
      ],
      { padding: [24, 24], maxZoom: -5 },
    )
  }, [map])
  return null
}

function Recenter({ latlng }: { latlng: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (!latlng) return
    const targetZoom = Math.min(Math.max(map.getZoom(), -3), -1)
    map.flyTo(latlng, targetZoom, { duration: 0.45 })
  }, [latlng, map])
  return null
}

export function FortniteLeafletMap({
  showNamed = true,
  showLandmarks = false,
  activeSpawns = ['extraction_sites'] as SpawnLayerId[],
  contestFilter = 'all',
  minLoot = 1,
  query = '',
  mapVersionId = 'live',
}: {
  showNamed?: boolean
  showLandmarks?: boolean
  activeSpawns?: SpawnLayerId[]
  contestFilter?: ContestLevel | 'all'
  minLoot?: number
  query?: string
  /** `live` = Fortnite-API current island; otherwise a map-evolution catalog id */
  mapVersionId?: string
}) {
  const locale = useLocale()
  const [pois, setPois] = useState<DisplayPoi[]>([])
  const [extracts, setExtracts] = useState<ResolvedExtractionSite[]>([])
  const [spawns, setSpawns] = useState<ResolvedSpawnPoint[]>([])
  const [liveMapUrl, setLiveMapUrl] = useState('https://fortnite-api.com/images/map.png')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null)

  const isLive = mapVersionId === 'live'
  const historical = !isLive ? findMapById(mapVersionId) : null
  const mapUrl = historical?.image ?? liveMapUrl

  const showPois = isLive && (showNamed || showLandmarks)
  const showExtracts = isLive && activeSpawns.includes('extraction_sites')
  const spawnLayerSet = useMemo(
    () => (isLive ? new Set(activeSpawns) : new Set<SpawnLayerId>()),
    [activeSpawns, isLive]
  )

  useEffect(() => {
    const markerStyleId = 'fn-poi-marker-style'
    if (document.getElementById(markerStyleId)) return
    const style = document.createElement('style')
    style.id = markerStyleId
    style.textContent = `
      .fn-poi-marker {
        background: transparent !important;
        border: none !important;
      }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('https://fortnite-api.com/v1/map')
        if (!res.ok) throw new Error(`Map API ${res.status}`)
        const json = (await res.json()) as MapApiResponse
        if (cancelled) return
        setLiveMapUrl(json.data.images.blank || json.data.images.pois)
        const mapped: DisplayPoi[] = json.data.pois.map((poi) => {
          const enrichment = getEnrichment(poi.name)
          const isNamed =
            (poi.id.includes('.Location.POI.') && !poi.id.includes('UnNamed')) ||
            Boolean(enrichment)
          return { ...poi, enrichment, isNamed }
        })
        setPois(mapped)
        const resolved = resolveExtractionSites(mapped)
        setExtracts(resolved)
        setSpawns(resolveSpawnPoints(mapped))
        const firstNamed = mapped.find((p) => p.isNamed)
        setSelection(
          firstNamed
            ? { kind: 'poi', id: firstNamed.id }
            : resolved[0]
              ? { kind: 'extract', id: resolved[0].id }
              : null
        )
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load map')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredPois = useMemo(() => {
    if (!showPois) return []
    const q = query.trim().toLowerCase()
    return pois.filter((poi) => {
      if (poi.isNamed && !showNamed) return false
      if (!poi.isNamed && !showLandmarks) return false
      const en = poi.enrichment
      if (contestFilter !== 'all') {
        if (!en || en.contest !== contestFilter) return false
      }
      if (minLoot > 1) {
        if (!en || en.loot < minLoot) return false
      }
      if (!q) return true
      return (
        poi.name.toLowerCase().includes(q) ||
        en?.tags.some((t) => t.includes(q)) ||
        en?.tip.toLowerCase().includes(q)
      )
    })
  }, [pois, showPois, showNamed, showLandmarks, contestFilter, minLoot, query])

  const filteredExtracts = useMemo(() => {
    if (!showExtracts) return []
    const q = query.trim().toLowerCase()
    if (!q) return extracts
    return extracts.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.nearPoi.toLowerCase().includes(q) ||
        e.poiName.toLowerCase().includes(q) ||
        e.tip.toLowerCase().includes(q) ||
        e.traffic.includes(q) ||
        q.includes('extract') ||
        q.includes('sprite')
    )
  }, [extracts, showExtracts, query])

  const filteredSpawns = useMemo(() => {
    const q = query.trim().toLowerCase()
    return spawns.filter((s) => {
      if (s.layer === 'extraction_sites') return false
      if (!spawnLayerSet.has(s.layer)) return false
      if (!q) return true
      const layerLabel = SPAWN_LAYERS.find((l) => l.id === s.layer)?.label ?? s.layer
      return (
        s.poiName.toLowerCase().includes(q) ||
        s.nearPoi.toLowerCase().includes(q) ||
        (s.label?.toLowerCase().includes(q) ?? false) ||
        layerLabel.toLowerCase().includes(q) ||
        s.layer.includes(q.replace(/\s+/g, '_'))
      )
    })
  }, [spawns, spawnLayerSet, query])

  const selectedPoi =
    selection?.kind === 'poi'
      ? filteredPois.find((p) => p.id === selection.id) ??
        pois.find((p) => p.id === selection.id) ??
        null
      : null

  const selectedExtract =
    selection?.kind === 'extract'
      ? filteredExtracts.find((e) => e.id === selection.id) ??
        extracts.find((e) => e.id === selection.id) ??
        null
      : null

  const selectedSpawn =
    selection?.kind === 'spawn'
      ? filteredSpawns.find((s) => s.id === selection.id) ??
        spawns.find((s) => s.id === selection.id) ??
        null
      : null

  const bounds: L.LatLngBoundsExpression = [
    [MAP_HALF, -MAP_HALF],
    [-MAP_HALF, MAP_HALF],
  ]

  function selectPoi(poi: DisplayPoi) {
    setSelection({ kind: 'poi', id: poi.id })
    setFlyTo(worldToLatLng(poi.location.x, poi.location.y))
  }

  function selectExtract(site: ResolvedExtractionSite) {
    setSelection({ kind: 'extract', id: site.id })
    setFlyTo(worldToLatLng(site.location.x, site.location.y))
  }

  function selectSpawn(point: ResolvedSpawnPoint) {
    setSelection({ kind: 'spawn', id: point.id })
    setFlyTo(worldToLatLng(point.location.x, point.location.y))
  }

  const markerCount = filteredPois.length + filteredExtracts.length + filteredSpawns.length
  const spawnLayerLabel = (id: SpawnLayerId) =>
    SPAWN_LAYERS.find((l) => l.id === id)?.label ?? id

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#07111f]">
          {loading && (
            <div className="flex h-[min(85vh,800px)] items-center justify-center text-sm text-muted-foreground">
              Loading live Fortnite map…
            </div>
          )}
          {error && !loading && (
            <div className="flex h-[min(85vh,800px)] items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Could not load map data ({error}). Check your connection and refresh.
            </div>
          )}
          {!loading && !error && (
            <MapContainer
              crs={L.CRS.Simple}
              center={[0, 0]}
              zoom={-6}
              minZoom={-8}
              maxZoom={1}
              className="h-[min(85vh,800px)] w-full bg-[#07111f] z-0"
              style={{ background: '#07111f' }}
            >
              <ImageOverlay key={mapUrl} url={mapUrl} bounds={bounds} />
              <FitBounds />
              <Recenter latlng={isLive ? flyTo : null} />
              {isLive && filteredPois.map((poi) => {
                const en = poi.enrichment
                const color = en ? contestColor[en.contest] : '#c9d7e8'
                const active = selection?.kind === 'poi' && poi.id === selection.id
                const latlng = worldToLatLng(poi.location.x, poi.location.y)
                const showLabel = poi.isNamed || filteredPois.length <= 20
                return (
                  <Marker
                    key={poi.id}
                    position={latlng}
                    icon={makePoiIcon(color, active, showLabel ? poi.name : undefined)}
                    zIndexOffset={active ? 1000 : poi.isNamed ? 200 : 0}
                    eventHandlers={{
                      click: () => selectPoi(poi),
                    }}
                  >
                    <Popup>
                      <strong>{poi.name}</strong>
                      {en ? (
                        <div style={{ marginTop: 4, fontSize: 12 }}>
                          {contestLabels[en.contest]} · loot {en.loot}/5
                        </div>
                      ) : null}
                    </Popup>
                  </Marker>
                )
              })}
              {filteredExtracts.map((site) => {
                const color = extractTrafficColor[site.traffic]
                const active = selection?.kind === 'extract' && site.id === selection.id
                const latlng = worldToLatLng(site.location.x, site.location.y)
                return (
                  <Marker
                    key={site.id}
                    position={latlng}
                    icon={makeExtractIcon(color, active, site.name.replace(' Extract', ''))}
                    zIndexOffset={active ? 1100 : 400}
                    eventHandlers={{
                      click: () => selectExtract(site),
                    }}
                  >
                    <Popup>
                      <strong>{site.name}</strong>
                      <div style={{ marginTop: 4, fontSize: 12 }}>
                        {extractTrafficLabels[site.traffic]} · near {site.poiName}
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
              {filteredSpawns.map((point) => {
                const color = SPAWN_LAYER_COLOR[point.layer]
                const active = selection?.kind === 'spawn' && point.id === selection.id
                const latlng = worldToLatLng(point.location.x, point.location.y)
                const label = point.label || spawnLayerLabel(point.layer)
                return (
                  <Marker
                    key={point.id}
                    position={latlng}
                    icon={makeSpawnIcon(color, active, false, Boolean(point.guaranteed))}
                    zIndexOffset={active ? 1050 : point.guaranteed ? 350 : 150}
                    eventHandlers={{
                      click: () => selectSpawn(point),
                    }}
                  >
                    <Popup>
                      <strong>{label}</strong>
                      <div style={{ marginTop: 4, fontSize: 12 }}>
                        {spawnLayerLabel(point.layer)} · near {point.poiName}
                        {point.guaranteed ? ' · high confidence' : ''}
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: contestColor.hot }} /> Hot POI
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: contestColor.balanced }} /> Balanced
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rotate-45"
                style={{ background: extractTrafficColor.medium }}
              />{' '}
              Extract
            </span>
            <span className="ml-auto">
              {isLive
                ? `${markerCount} markers · ${filteredSpawns.length} spawns · ${filteredExtracts.length} extracts`
                : historical
                  ? `${historical.shortLabel} · v${historical.version} preview`
                  : 'Map preview'}
            </span>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          {!isLive && historical ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Historical island · v{historical.version}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {historical.label}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Archive minimap preview for {historical.shortLabel}. Spawn pins, POIs, and Extraction
                Sites are only available on the <strong className="text-foreground">Live</strong>{' '}
                current-season map.
              </p>
              <Link
                href="/map-evolution"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
              >
                Compare seasons on Map Evolution →
              </Link>
            </>
          ) : selectedExtract ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Extraction Site · {extractTrafficLabels[selectedExtract.traffic]}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {selectedExtract.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Near <span className="font-semibold text-foreground">{selectedExtract.poiName}</span> on
                Shattered Coast (Chapter 7 Season 3 / Runners).
              </p>
              <p className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Tip: </span>
                {selectedExtract.tip}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
                <li>Unlocks after the <strong className="text-foreground">first storm circle</strong> closes</li>
                <li>~<strong className="text-foreground">30s</strong> defend while the crate inbound (you ping the lobby)</li>
                <li>One successful use per site per match</li>
              </ul>
              <Link
                href={
                  locale === 'en'
                    ? '/guides/how-to/how-to-extract-sprites-fortnite'
                    : `/${locale}/guides`
                }
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
              >
                {locale === 'en' ? 'Full Sprite extraction guide →' : 'Guides →'}
              </Link>
            </>
          ) : selectedSpawn ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {spawnLayerLabel(selectedSpawn.layer)}
                {selectedSpawn.guaranteed ? ' · High confidence' : ''}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {selectedSpawn.label || spawnLayerLabel(selectedSpawn.layer)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Near <span className="font-semibold text-foreground">{selectedSpawn.poiName}</span> —
                POI-anchored planning pin for Chapter 7 Season 3.
              </p>
              <p className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
                Exact in-match spots can shift slightly. Use this to plan drops and rotates, then
                confirm on the live minimap.
              </p>
            </>
          ) : selectedPoi ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {selectedPoi.enrichment
                  ? contestLabels[selectedPoi.enrichment.contest]
                  : selectedPoi.isNamed
                    ? 'Named location'
                    : 'Landmark'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {selectedPoi.name}
              </h2>

              {selectedPoi.enrichment ? (
                <>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Loot</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {lootLabel(selectedPoi.enrichment.loot)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Chests</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {selectedPoi.enrichment.chests}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Mobility</dt>
                      <dd className="mt-0.5 text-foreground">{selectedPoi.enrichment.mobility}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Tip: </span>
                    {selectedPoi.enrichment.tip}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectedPoi.enrichment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selectedPoi.enrichment.guideHref && (
                    <Link
                      href={selectedPoi.enrichment.guideHref}
                      className="mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
                    >
                      {selectedPoi.enrichment.guideHref.startsWith('/drops/')
                        ? 'Drop guide →'
                        : 'Read map guide →'}
                    </Link>
                  )}
                </>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Live landmark from the current Fortnite map. Zoom and pan the real minimap to plan
                  rotates.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a marker on the map.</p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Jump to location
          </p>
          <ul className="max-h-72 space-y-1 overflow-y-auto" role="list">
            {showExtracts &&
              filteredExtracts.map((site) => (
                <li key={site.id}>
                  <button
                    type="button"
                    onClick={() => selectExtract(site)}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                      selection?.kind === 'extract' && site.id === selection.id
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="font-medium">{site.name}</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-80">
                      {site.traffic}
                    </span>
                  </button>
                </li>
              ))}
            {filteredSpawns.slice(0, 80).map((point) => {
              const label = point.label || spawnLayerLabel(point.layer)
              return (
                <li key={point.id}>
                  <button
                    type="button"
                    onClick={() => selectSpawn(point)}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                      selection?.kind === 'spawn' && point.id === selection.id
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="min-w-0 truncate font-medium">{label}</span>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide opacity-80">
                      {point.poiName}
                    </span>
                  </button>
                </li>
              )
            })}
            {filteredSpawns.length > 80 ? (
              <li className="px-2.5 py-1.5 text-[11px] text-muted-foreground">
                +{filteredSpawns.length - 80} more on the map (narrow filters to list them)
              </li>
            ) : null}
            {filteredPois.map((poi) => (
              <li key={poi.id}>
                <button
                  type="button"
                  onClick={() => selectPoi(poi)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    selection?.kind === 'poi' && poi.id === selection.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="font-medium">{poi.name}</span>
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    {poi.enrichment?.contest ?? (poi.isNamed ? 'poi' : 'spot')}
                  </span>
                </button>
              </li>
            ))}
            {markerCount === 0 && (
              <li className="px-2 py-3 text-sm text-muted-foreground">
                {isLive
                  ? 'No locations match these filters. Enable a layer or clear search.'
                  : 'No markers on historical islands — switch Island version to Live.'}
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  )
}
