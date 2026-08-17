'use client'

import { useMemo, useState } from 'react'
import {
  MODE_CATEGORY_ICONS,
  MODE_CATEGORY_META,
  teamSizeIcon,
  teamSizeLabel,
  type ModeCategory,
  type ModePlaylist,
} from '@/lib/fortnite-playlists'

function formatAdded(iso: string | null) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

function PickaxeStack({ count, alt }: { count: number; alt: string }) {
  const n = Math.min(Math.max(count, 1), 4)
  const cell = n === 1 ? 'h-12 w-12' : 'h-7 w-7'
  return (
    <div
      className={`grid place-items-center gap-0.5 ${n === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
      role="img"
      aria-label={alt}
    >
      {Array.from({ length: n }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/images/icons/pickaxe.png"
          alt=""
          className={`${cell} object-contain drop-shadow-md`}
        />
      ))}
    </div>
  )
}

function ModeThumb({ playlist }: { playlist: ModePlaylist }) {
  const sizeLabel = teamSizeLabel(playlist.maxTeamSize)
  const catLabel = MODE_CATEGORY_META.find((m) => m.id === playlist.category)?.label ?? 'Mode'
  const alt = `${sizeLabel} ${catLabel}`
  const catIcon = MODE_CATEGORY_ICONS[playlist.category]
  const largeTeam = playlist.maxTeamSize >= 5

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-black/45">
      {playlist.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={playlist.image} alt={alt} className="h-full w-full object-cover" />
      ) : largeTeam ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={teamSizeIcon(playlist.maxTeamSize)}
          alt={alt}
          className="h-full w-full object-contain p-2 drop-shadow-md"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-1.5">
          <PickaxeStack count={playlist.maxTeamSize} alt={alt} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={playlist.image ? teamSizeIcon(playlist.maxTeamSize) : catIcon}
        alt=""
        className="absolute bottom-0.5 right-0.5 h-7 w-7 object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]"
      />
    </div>
  )
}

export function FortniteModesClient({ playlists }: { playlists: ModePlaylist[] }) {
  const [category, setCategory] = useState<ModeCategory | 'all'>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of playlists) map.set(p.category, (map.get(p.category) || 0) + 1)
    return map
  }, [playlists])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return playlists.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      )
    })
  }, [playlists, category, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Search modes
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Reload, Ranked, Festival…"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          />
        </label>
        <p className="text-sm text-muted-foreground">
          Showing <strong className="text-foreground">{filtered.length}</strong> of {playlists.length}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {MODE_CATEGORY_META.map((meta) => {
          const count = meta.id === 'all' ? playlists.length : counts.get(meta.id) || 0
          if (meta.id !== 'all' && count === 0) return null
          const active = category === meta.id
          return (
            <button
              key={meta.id}
              type="button"
              onClick={() => setCategory(meta.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MODE_CATEGORY_ICONS[meta.id]}
                alt=""
                className="h-4 w-4 object-contain drop-shadow-sm"
              />
              {meta.label} ({count})
            </button>
          )
        })}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {MODE_CATEGORY_META.find((m) => m.id === category)?.blurb}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          No playlists match that filter.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const added = formatAdded(p.added)
            return (
              <article key={p.id} className="flex gap-3 overflow-hidden rounded-xl border border-border bg-card p-3">
                <ModeThumb playlist={p} />
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-foreground leading-snug">{p.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teamSizeIcon(p.maxTeamSize)}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                    {teamSizeLabel(p.maxTeamSize)} · {p.maxPlayers || '—'} players
                    {p.isTournament ? ' · Tournament' : ''}
                  </p>
                  {p.description ? (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                  ) : null}
                  {added ? <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Added {added}</p> : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
