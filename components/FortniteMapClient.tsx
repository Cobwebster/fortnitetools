'use client'

import { useMemo, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { extractTrafficColor, type ContestLevel } from '@/lib/map-data'
import {
  DEFAULT_ACTIVE_SPAWNS,
  MAP_MODES,
  QUEST_LAYERS,
  SPAWN_LAYERS,
  type MapModeId,
  type SpawnLayerId,
} from '@/lib/map-layers'
import { SPAWN_LAYER_COLOR } from '@/lib/map-spawns'
import {
  MAP_EVOLUTION,
  MAP_EVOLUTION_CHAPTERS,
  findMapById,
} from '@/lib/map-evolution'

const FortniteLeafletMap = dynamic(
  () =>
    import('@/components/FortniteLeafletMap').then((m) => m.FortniteLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(85vh,800px)] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        Loading interactive map…
      </div>
    ),
  },
)

function Accordion({
  title,
  open,
  onToggle,
  children,
  count,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  count?: string
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}
          aria-hidden
        />
        <span className="flex-1">{title}</span>
        {count ? <span className="text-[10px] font-semibold text-muted-foreground">{count}</span> : null}
      </button>
      {open ? <div className="space-y-0.5 px-2 pb-3">{children}</div> : null}
    </div>
  )
}

function LayerRow({
  label,
  hint,
  active,
  available = true,
  unavailableLabel = 'Soon',
  onToggle,
  swatch,
}: {
  label: string
  hint?: string
  active: boolean
  available?: boolean
  unavailableLabel?: string
  onToggle?: () => void
  swatch?: ReactNode
}) {
  if (!available) {
    return (
      <div className="flex items-start gap-2 rounded-md px-2 py-1.5 opacity-45">
        <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border border-border bg-muted" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-muted-foreground">{label}</span>
          {hint ? <span className="block text-[10px] text-muted-foreground/80">{hint}</span> : null}
        </span>
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
          {unavailableLabel}
        </span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
        active ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <span
        className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
          active ? 'border-primary bg-primary' : 'border-border bg-background'
        }`}
        aria-hidden
      >
        {active ? <span className="h-1.5 w-1.5 rounded-sm bg-primary-foreground" /> : null}
      </span>
      {swatch}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {hint ? <span className="block text-[10px] text-muted-foreground">{hint}</span> : null}
      </span>
    </button>
  )
}

export function FortniteMapClient() {
  const [mapMode, setMapMode] = useState<MapModeId>('br')
  const [mapVersionId, setMapVersionId] = useState('live')
  const [query, setQuery] = useState('')
  const [showNamed, setShowNamed] = useState(true)
  const [showLandmarks, setShowLandmarks] = useState(false)
  const [activeSpawns, setActiveSpawns] = useState<Set<SpawnLayerId>>(
    () => new Set(DEFAULT_ACTIVE_SPAWNS)
  )
  const [contestFilter, setContestFilter] = useState<ContestLevel | 'all'>('all')
  const [minLoot, setMinLoot] = useState(1)

  const [openSpawns, setOpenSpawns] = useState(true)
  const [openLocations, setOpenLocations] = useState(true)
  const [openQuests, setOpenQuests] = useState(false)

  const isLive = mapVersionId === 'live'
  const historical = !isLive ? findMapById(mapVersionId) : null
  const spawnQuery = query.trim().toLowerCase()

  const versionsByChapter = useMemo(() => {
    return MAP_EVOLUTION_CHAPTERS.map((ch) => ({
      chapter: ch,
      maps: MAP_EVOLUTION.filter((m) => m.chapter === ch),
    }))
  }, [])

  const toggleSpawn = (id: SpawnLayerId) => {
    if (!isLive) return
    setActiveSpawns((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredSpawns = useMemo(() => {
    if (!spawnQuery) return SPAWN_LAYERS
    return SPAWN_LAYERS.filter(
      (s) =>
        s.label.toLowerCase().includes(spawnQuery) ||
        s.hint?.toLowerCase().includes(spawnQuery) ||
        s.id.includes(spawnQuery.replace(/\s+/g, '_'))
    )
  }, [spawnQuery])

  const filteredQuests = useMemo(() => {
    if (!spawnQuery) return QUEST_LAYERS
    return QUEST_LAYERS.filter(
      (q) =>
        q.label.toLowerCase().includes(spawnQuery) ||
        q.children?.some((c) => c.label.toLowerCase().includes(spawnQuery))
    )
  }, [spawnQuery])

  const activeSpawnList = useMemo(() => [...activeSpawns], [activeSpawns])

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="rounded-xl border border-border bg-card overflow-hidden h-fit lg:sticky lg:top-20">
        <div className="border-b border-border p-3 space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Map
            </span>
            <select
              value={mapMode}
              onChange={(e) => {
                const next = e.target.value as MapModeId
                const mode = MAP_MODES.find((m) => m.id === next)
                if (mode?.available) setMapMode(next)
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {MAP_MODES.map((m) => (
                <option key={m.id} value={m.id} disabled={!m.available}>
                  {m.label}
                  {m.badge === 'new' ? ' · New' : ''}
                  {!m.available ? ' (soon)' : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Island version
            </span>
            <select
              value={mapVersionId}
              onChange={(e) => setMapVersionId(e.target.value)}
              disabled={mapMode !== 'br'}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
            >
              <option value="live">Live · Current season</option>
              {versionsByChapter.map((group) => (
                <optgroup key={group.chapter} label={`Chapter ${group.chapter}`}>
                  {group.maps.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.shortLabel} · v{m.version}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {!isLive && historical ? (
              <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                Viewing <strong className="text-foreground">{historical.shortLabel}</strong> archive
                image — markers stay on Live.{' '}
                <Link href="/map-evolution" className="text-primary hover:underline">
                  Compare seasons
                </Link>
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Spawns, POIs, extracts…"
              disabled={!isLive}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
            />
          </label>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSpawns(new Set())}
              disabled={!isLive}
              className="rounded border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              Clear spawns
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveSpawns(
                  new Set(['extraction_sites', 'vaults', 'sprite_chests', 'reboot_vans'])
                )
              }
              disabled={!isLive}
              className="rounded border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              Key layers
            </button>
          </div>
        </div>

        <div className="max-h-[min(70vh,720px)] overflow-y-auto">
          <Accordion
            title="Spawns"
            open={openSpawns}
            onToggle={() => setOpenSpawns((v) => !v)}
            count={isLive ? `${activeSpawns.size} on` : 'live only'}
          >
            {filteredSpawns.map((layer) => (
              <LayerRow
                key={layer.id}
                label={layer.label}
                hint={!isLive ? 'Switch to Live for spawn pins' : layer.hint}
                available={isLive}
                unavailableLabel="Live only"
                active={isLive && activeSpawns.has(layer.id)}
                onToggle={() => toggleSpawn(layer.id)}
                swatch={
                  <span
                    className={`mt-1 inline-block h-2.5 w-2.5 shrink-0 border border-black/20 ${
                      layer.id === 'extraction_sites' ? 'rotate-45' : 'rounded-sm'
                    }`}
                    style={{ background: SPAWN_LAYER_COLOR[layer.id] ?? extractTrafficColor.medium }}
                    aria-hidden
                  />
                }
              />
            ))}
            {filteredSpawns.length === 0 ? (
              <p className="px-2 py-2 text-xs text-muted-foreground">No spawn filters match.</p>
            ) : null}
          </Accordion>

          <Accordion title="Locations" open={openLocations} onToggle={() => setOpenLocations((v) => !v)}>
            <LayerRow
              label="Named Locations"
              available={isLive}
              unavailableLabel="Live only"
              active={isLive && showNamed}
              onToggle={() => setShowNamed((v) => !v)}
              hint={!isLive ? 'Live map only' : undefined}
            />
            <LayerRow
              label="Landmarks"
              available={isLive}
              unavailableLabel="Live only"
              active={isLive && showLandmarks}
              onToggle={() => setShowLandmarks((v) => !v)}
              hint={!isLive ? 'Live map only' : undefined}
            />

            <div className="mt-2 space-y-2 border-t border-border/60 px-2 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Drop filters
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'hot', 'balanced', 'edge'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setContestFilter(f)}
                    disabled={!isLive}
                    className={`rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-40 ${
                      contestFilter === f
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {f === 'all' ? 'All' : f}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="shrink-0">Min loot</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={minLoot}
                  onChange={(e) => setMinLoot(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                  disabled={!isLive || (!showNamed && !showLandmarks)}
                />
                <span className="w-6 text-right font-semibold text-foreground">{minLoot}+</span>
              </label>
            </div>
          </Accordion>

          <Accordion title="Quests" open={openQuests} onToggle={() => setOpenQuests((v) => !v)}>
            {filteredQuests.map((quest) => (
              <div key={quest.id}>
                <LayerRow label={quest.label} available={quest.available} active={false} />
                {quest.children?.map((child) => (
                  <div key={child.id} className="pl-4">
                    <LayerRow label={child.label} available={child.available} active={false} />
                  </div>
                ))}
              </div>
            ))}
            {filteredQuests.length === 0 ? (
              <p className="px-2 py-2 text-xs text-muted-foreground">No quests match.</p>
            ) : null}
          </Accordion>
        </div>

        <div className="border-t border-border px-3 py-2.5 text-[11px] text-muted-foreground">
          <Link
            href="/guides/how-to/how-to-extract-sprites-fortnite"
            className="font-semibold text-primary hover:underline"
          >
            How to extract Sprites →
          </Link>
          <p className="mt-1">
            {isLive
              ? 'Spawn pins are POI-anchored planning markers for Shattered Coast. Toggle layers in Spawns.'
              : 'Historical versions show the island image only. Switch Island version back to Live for pins.'}
          </p>
        </div>
      </aside>

      <FortniteLeafletMap
        showNamed={showNamed}
        showLandmarks={showLandmarks}
        activeSpawns={activeSpawnList}
        contestFilter={contestFilter}
        minLoot={minLoot}
        query={query}
        mapVersionId={mapVersionId}
      />
    </div>
  )
}
