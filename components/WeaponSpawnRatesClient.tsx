'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/link'
import {
  SPAWN_RATES_META,
  SPAWN_SOURCE_META,
  formatSpawnPct,
  getSpawnModeMeta,
  getSpawnWeaponsForMode,
  sortSpawnWeapons,
  type SpawnModeId,
  type SpawnSourceKey,
} from '@/lib/weapon-spawn-rates'

function WeaponThumb({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="h-10 w-10 object-contain drop-shadow-md"
      loading="lazy"
    />
  )
}

export function WeaponSpawnRatesClient() {
  const modes = useMemo(() => getSpawnModeMeta(), [])
  const [mode, setMode] = useState<SpawnModeId>('br')
  const [sortBy, setSortBy] = useState<SpawnSourceKey>('chest')
  const [query, setQuery] = useState('')

  const activeMeta = modes.find((m) => m.id === mode) ?? modes[0]!
  const rows = useMemo(() => {
    const list = getSpawnWeaponsForMode(mode)
    const q = query.trim().toLowerCase()
    const filtered = q
      ? list.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.category.toLowerCase().includes(q)
        )
      : list
    return sortSpawnWeapons(filtered, sortBy)
  }, [mode, query, sortBy])

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Playlist mode">
          {modes.map((m) => {
            const active = m.id === mode
            return (
              <button
                key={m.id}
                type="button"
                disabled={!m.available}
                onClick={() => m.available && setMode(m.id)}
                className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : m.available
                      ? 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                      : 'cursor-not-allowed border-border/50 text-muted-foreground/40'
                }`}
              >
                {m.label}
                {!m.available ? ' · Soon' : ''}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="block min-w-0 flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Weapon or category…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <p className="text-xs text-muted-foreground sm:pb-2">
            {SPAWN_RATES_META.patch} · captured {SPAWN_RATES_META.capturedAt}
            {mode !== 'br' && activeMeta.available ? (
              <>
                {' '}
                · {activeMeta.label} uses the BR pool
              </>
            ) : null}
          </p>
        </div>
      </div>

      {!activeMeta.available ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          {activeMeta.label} spawn rates are not curated yet — pools differ from Battle Royale.
          BR / Ranked / Zero Build are live above.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
                <th className="px-4 py-3 font-semibold">Weapon</th>
                {SPAWN_SOURCE_META.map((src) => {
                  const active = sortBy === src.key
                  return (
                    <th key={src.key} className="px-3 py-3 text-right font-semibold">
                      <button
                        type="button"
                        onClick={() => setSortBy(src.key)}
                        className={`tabular-nums transition-colors ${
                          active ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {src.short}
                        {active ? ' ↓' : ''}
                      </button>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => {
                const href = w.catalogId ? `/weapons/${w.catalogId}` : null
                const name = (
                  <span className="font-semibold text-foreground">{w.name}</span>
                )
                return (
                  <tr key={w.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background">
                          <WeaponThumb src={w.image} alt={w.name} />
                        </div>
                        <div className="min-w-0">
                          {href ? (
                            <Link href={href} className="hover:text-primary transition-colors">
                              {name}
                            </Link>
                          ) : (
                            name
                          )}
                          <p className="text-[11px] text-muted-foreground">{w.category}</p>
                        </div>
                      </div>
                    </td>
                    {SPAWN_SOURCE_META.map((src) => (
                      <td
                        key={src.key}
                        className={`px-3 py-2.5 text-right tabular-nums ${
                          sortBy === src.key
                            ? 'font-semibold text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {formatSpawnPct(w[src.key])}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              No weapons match that search.
            </p>
          ) : null}
        </div>
      )}

      <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
        {SPAWN_RATES_META.note} Sort by column header. Reload / Blitz / OG pools will land here when
        curated.
      </p>
    </div>
  )
}
