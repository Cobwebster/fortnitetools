'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/link'
import type { LiveSet } from '@/lib/cosmetic-sets'

type FilterId = 'all' | 'shop' | 'new'

const PAGE_SIZE = 60

export function SetsCatalogClient({ sets }: { sets: LiveSet[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const shopCount = useMemo(() => sets.filter((s) => s.inShop).length, [sets])
  const newCount = useMemo(() => sets.filter((s) => s.fromNew).length, [sets])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sets.filter((set) => {
      if (filter === 'shop' && !set.inShop) return false
      if (filter === 'new' && !set.fromNew) return false
      if (!q) return true
      return (
        set.name.toLowerCase().includes(q) ||
        set.setText?.toLowerCase().includes(q) ||
        set.backend?.toLowerCase().includes(q) ||
        set.slug.includes(q.replace(/\s+/g, '-'))
      )
    })
  }, [sets, query, filter])

  const shown = filtered.slice(0, visible)

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Search sets
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            placeholder="Set name, collab, or slug…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Set filters">
          {(
            [
              { id: 'all' as const, label: `All (${sets.length})` },
              { id: 'new' as const, label: `New build (${newCount})` },
              { id: 'shop' as const, label: `In shop (${shopCount})` },
            ] as const
          ).map((chip) => {
            const active = filter === chip.id
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setFilter(chip.id)
                  setVisible(PAGE_SIZE)
                }}
                className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Showing <strong className="text-foreground">{Math.min(shown.length, filtered.length)}</strong>{' '}
          of <strong className="text-foreground">{filtered.length}</strong> sets
          {query.trim() ? (
            <>
              {' '}
              matching <strong className="text-foreground">{query.trim()}</strong>
            </>
          ) : null}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          No sets match that search. Try a shorter name or clear the shop / new filter.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shown.map((set) => (
              <Link
                key={set.slug}
                href={`/sets/${set.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60"
              >
                <div className="aspect-square bg-muted/40">
                  {set.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={set.thumb}
                      alt=""
                      className="h-full w-full object-contain p-3"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No art
                    </div>
                  )}
                </div>
                <div className="space-y-1.5 p-3">
                  <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {set.name}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {set.inShop ? (
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary">
                        In shop
                      </span>
                    ) : null}
                    {set.fromNew ? (
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground">
                        New build
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {set.sampleCount} item{set.sampleCount === 1 ? '' : 's'} in catalog
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {visible < filtered.length ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
                className="rounded-lg border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                Show more ({filtered.length - visible} left)
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
