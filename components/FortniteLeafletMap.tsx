'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
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
  getEnrichment,
  lootLabel,
  worldToLatLng,
  type ContestLevel,
  type PoiEnrichment,
} from '@/lib/map-data'

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

const CONTEST_FILTERS: Array<ContestLevel | 'all'> = ['all', 'hot', 'balanced', 'edge']

const contestColor: Record<ContestLevel, string> = {
  hot: '#ff6b4a',
  balanced: '#3dd6c6',
  edge: '#7aa2ff',
}

function makeIcon(color: string, active: boolean, label?: string) {
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
    // Keep a readable zoom without slamming into max detail
    const targetZoom = Math.min(Math.max(map.getZoom(), -3), -1)
    map.flyTo(latlng, targetZoom, { duration: 0.45 })
  }, [latlng, map])
  return null
}

export function FortniteLeafletMap() {
  const [pois, setPois] = useState<DisplayPoi[]>([])
  const [mapUrl, setMapUrl] = useState('https://fortnite-api.com/images/map.png')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [contestFilter, setContestFilter] = useState<ContestLevel | 'all'>('all')
  const [minLoot, setMinLoot] = useState(1)
  const [query, setQuery] = useState('')
  const [namedOnly, setNamedOnly] = useState(true)
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null)

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
        setMapUrl(json.data.images.blank || json.data.images.pois)
        const mapped: DisplayPoi[] = json.data.pois.map((poi) => {
          const enrichment = getEnrichment(poi.name)
          const isNamed = poi.id.includes('.POI.') || Boolean(enrichment)
          return { ...poi, enrichment, isNamed }
        })
        setPois(mapped)
        const firstNamed = mapped.find((p) => p.isNamed)
        setSelectedId(firstNamed?.id ?? mapped[0]?.id ?? null)
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pois.filter((poi) => {
      if (namedOnly && !poi.isNamed) return false
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
  }, [pois, namedOnly, contestFilter, minLoot, query])

  const selected =
    filtered.find((p) => p.id === selectedId) ??
    filtered[0] ??
    pois.find((p) => p.id === selectedId) ??
    null

  const bounds: L.LatLngBoundsExpression = [
    [MAP_HALF, -MAP_HALF],
    [-MAP_HALF, MAP_HALF],
  ]

  function selectPoi(poi: DisplayPoi) {
    setSelectedId(poi.id)
    setFlyTo(worldToLatLng(poi.location.x, poi.location.y))
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="block flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Search locations
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Harbor, Lodge, edge…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {CONTEST_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setContestFilter(f)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  contestFilter === f
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {f === 'all' ? 'All drops' : contestLabels[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex flex-1 items-center gap-3 text-sm text-muted-foreground min-w-[180px]">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider">Min loot</span>
            <input
              type="range"
              min={1}
              max={5}
              value={minLoot}
              onChange={(e) => setMinLoot(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
            <span className="w-10 text-right font-semibold text-foreground">{minLoot}+</span>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={namedOnly}
              onChange={(e) => setNamedOnly(e.target.checked)}
              className="rounded border-border"
            />
            Named POIs only
          </label>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border bg-[#07111f]">
          {loading && (
            <div className="flex h-[min(70vh,640px)] items-center justify-center text-sm text-muted-foreground">
              Loading live Fortnite map…
            </div>
          )}
          {error && !loading && (
            <div className="flex h-[min(70vh,640px)] items-center justify-center px-6 text-center text-sm text-muted-foreground">
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
              className="h-[min(70vh,640px)] w-full bg-[#07111f] z-0"
              style={{ background: '#07111f' }}
            >
              <ImageOverlay url={mapUrl} bounds={bounds} />
              <FitBounds />
              <Recenter latlng={flyTo} />
              {filtered.map((poi) => {
                const en = poi.enrichment
                const color = en ? contestColor[en.contest] : '#c9d7e8'
                const active = poi.id === selected?.id
                const latlng = worldToLatLng(poi.location.x, poi.location.y)
                // Label named towns/POIs; keep tiny landmarks unlabeled unless few are shown
                const showLabel = poi.isNamed || filtered.length <= 20
                return (
                  <Marker
                    key={poi.id}
                    position={latlng}
                    icon={makeIcon(color, active, showLabel ? poi.name : undefined)}
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
            </MapContainer>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: contestColor.hot }} /> Hot
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: contestColor.balanced }} /> Balanced
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: contestColor.edge }} /> Edge
            </span>
            <span className="ml-auto">{filtered.length} markers · map via Fortnite-API</span>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          {selected ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {selected.enrichment
                  ? contestLabels[selected.enrichment.contest]
                  : selected.isNamed
                    ? 'Named location'
                    : 'Landmark'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {selected.name}
              </h2>

              {selected.enrichment ? (
                <>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Loot</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {lootLabel(selected.enrichment.loot)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Chests</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {selected.enrichment.chests}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Mobility</dt>
                      <dd className="mt-0.5 text-foreground">{selected.enrichment.mobility}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Tip: </span>
                    {selected.enrichment.tip}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selected.enrichment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selected.enrichment.guideHref && (
                    <Link
                      href={selected.enrichment.guideHref}
                      className="mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
                    >
                      Read map guide →
                    </Link>
                  )}
                </>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Live landmark from the current Fortnite map. Zoom and pan the
                  real minimap to plan rotates.
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
          <ul className="max-h-64 space-y-1 overflow-y-auto" role="list">
            {filtered.map((poi) => (
              <li key={poi.id}>
                <button
                  type="button"
                  onClick={() => selectPoi(poi)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    poi.id === selected?.id
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
            {filtered.length === 0 && (
              <li className="px-2 py-3 text-sm text-muted-foreground">No locations match these filters.</li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  )
}
