'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import {
  WEAPON_CHANGE_PATCHES,
  changeTone,
  formatChangeValue,
  formatDelta,
  type WeaponChangeEntry,
  type WeaponChangePatch,
} from '@/lib/weapon-changes'
import { CATALOG_RARITY_BG, CATALOG_RARITY_TEXT } from '@/lib/weapons-catalog'

function matchesQuery(entry: WeaponChangeEntry, q: string) {
  if (!q) return true
  return `${entry.rarity} ${entry.name}`.toLowerCase().includes(q)
}

function StatTable({ entry }: { entry: WeaponChangeEntry }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-border/70 text-[10px] uppercase tracking-wider text-muted-foreground">
            <th className="px-3 py-2 font-semibold">Stat</th>
            <th className="px-3 py-2 font-semibold">Old</th>
            <th className="px-3 py-2 font-semibold">New</th>
            <th className="px-3 py-2 font-semibold">Change</th>
          </tr>
        </thead>
        <tbody>
          {entry.stats.map((s) => {
            const tone = changeTone(s.stat, s.change)
            const toneClass =
              tone === 'buff'
                ? 'text-emerald-400'
                : tone === 'nerf'
                  ? 'text-rose-400'
                  : 'text-muted-foreground'
            return (
              <tr key={s.stat} className="border-b border-border/40 last:border-0">
                <td className="px-3 py-1.5 text-foreground/90">{s.stat}</td>
                <td className="px-3 py-1.5 tabular-nums text-muted-foreground">
                  {formatChangeValue(s.old)}
                </td>
                <td className="px-3 py-1.5 tabular-nums text-foreground">
                  {formatChangeValue(s.new)}
                </td>
                <td className={`px-3 py-1.5 tabular-nums font-semibold ${toneClass}`}>
                  {formatDelta(s.change)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function WeaponChangeCard({ entry }: { entry: WeaponChangeEntry }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          {entry.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.image}
              alt={entry.name}
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-[10px] font-bold uppercase text-muted-foreground">FN</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground sm:text-base">
            {entry.name}
          </p>
          <span
            className={`mt-1 inline-flex rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATALOG_RARITY_BG[entry.rarity]} ${CATALOG_RARITY_TEXT[entry.rarity]}`}
          >
            {entry.rarity}
          </span>
        </div>
      </div>
      <StatTable entry={entry} />
    </article>
  )
}

function PatchSection({
  patch,
  query,
}: {
  patch: WeaponChangePatch
  query: string
}) {
  const entries = useMemo(
    () => patch.entries.filter((e) => matchesQuery(e, query)),
    [patch.entries, query]
  )
  if (!entries.length) return null

  return (
    <section id={patch.date} className="scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-2">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
          {patch.label}
        </h2>
        <p className="text-xs text-muted-foreground">
          {entries.length} change{entries.length === 1 ? '' : 's'}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <WeaponChangeCard
            key={`${patch.date}-${entry.rarity}-${entry.name}-${entry.stats[0]?.stat ?? ''}`}
            entry={entry}
          />
        ))}
      </div>
    </section>
  )
}

export function WeaponChangesClient() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const visiblePatchCount = useMemo(() => {
    if (!deferredQuery) return WEAPON_CHANGE_PATCHES.length
    return WEAPON_CHANGE_PATCHES.filter((p) =>
      p.entries.some((e) => matchesQuery(e, deferredQuery))
    ).length
  }, [deferredQuery])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block min-w-0 flex-1">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Search weapons
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Harbinger SMG, Twinfire, Ranger…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/40 placeholder:text-muted-foreground focus:ring-2"
          />
        </label>
        <p className="text-xs text-muted-foreground sm:pb-2.5">
          Showing {visiblePatchCount} of {WEAPON_CHANGE_PATCHES.length} patch days
        </p>
      </div>

      <nav
        className="flex flex-wrap gap-1.5"
        aria-label="Jump to patch date"
      >
        {WEAPON_CHANGE_PATCHES.map((p) => {
          const hasMatch =
            !deferredQuery || p.entries.some((e) => matchesQuery(e, deferredQuery))
          if (!hasMatch) return null
          return (
            <a
              key={p.date}
              href={`#${p.date}`}
              className="rounded border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {p.label.replace(/, \d{4}$/, '')}
            </a>
          )
        })}
      </nav>

      <div className="space-y-12">
        {WEAPON_CHANGE_PATCHES.map((patch) => (
          <PatchSection key={patch.date} patch={patch} query={deferredQuery} />
        ))}
      </div>

      {visiblePatchCount === 0 ? (
        <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No weapon changes match &ldquo;{query.trim()}&rdquo;.
        </p>
      ) : null}
    </div>
  )
}
