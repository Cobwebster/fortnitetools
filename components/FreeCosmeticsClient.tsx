'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import {
  FREE_COSMETIC_CATEGORY_LABEL,
  FREE_COSMETIC_OFFERS,
  cosmeticIconUrl,
  formatRemaining,
  offerRemaining,
  sortOffersByUrgency,
  type FreeCosmeticCategory,
  type FreeCosmeticOffer,
  type FreeCosmeticReward,
} from '@/lib/free-cosmetics'

const STORAGE_KEY = 'ft-free-cosmetics-done'

type FilterId = 'active' | 'completed' | 'ongoing' | 'all'

function loadDone(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

function saveDone(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

function RewardIcons({ rewards }: { rewards: FreeCosmeticReward[] }) {
  if (!rewards.length) return null
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Rewards">
      {rewards.map((r) => (
        <li key={r.id}>
          <span
            title={r.name}
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-border/80 bg-black/40 sm:h-14 sm:w-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cosmeticIconUrl(r.id)}
              alt={r.name}
              width={56}
              height={56}
              className="h-full w-full object-contain p-0.5"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1'
                  img.src = `https://fortnite-api.com/images/cosmetics/br/${r.id.toLowerCase()}/icon.png`
                  return
                }
                img.closest('li')?.setAttribute('hidden', '')
              }}
            />
          </span>
        </li>
      ))}
    </ul>
  )
}

function OfferCard({
  offer,
  done,
  onToggle,
  now,
}: {
  offer: FreeCosmeticOffer
  done: boolean
  onToggle: () => void
  now: Date
}) {
  const rem = offerRemaining(offer.endsIso, now)
  const ended = rem?.ended ?? false
  const isExternal = offer.href?.startsWith('http')

  return (
    <article
      className={`rounded-xl border p-4 sm:p-5 transition-opacity ${
        done
          ? 'border-border/60 bg-muted/20 opacity-70'
          : ended
            ? 'border-border bg-card/60 opacity-60'
            : 'border-border bg-card'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {FREE_COSMETIC_CATEGORY_LABEL[offer.category]}
          </p>
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
            {offer.title}
          </h3>
          {offer.endsIso ? (
            <p className="text-sm text-muted-foreground">
              {ended ? (
                <span className="font-semibold text-rose-300">Ended</span>
              ) : (
                <>
                  Ends in{' '}
                  <strong className="text-foreground">{formatRemaining(rem!)}</strong>
                  {offer.endsLabel ? (
                    <>
                      {' '}
                      · <span className="text-muted-foreground">Ends {offer.endsLabel}</span>
                    </>
                  ) : null}
                </>
              )}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No end date</p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            done
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
          }`}
        >
          {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
          {done ? 'Completed' : 'Mark completed'}
        </button>
      </div>

      {offer.rewards?.length ? <RewardIcons rewards={offer.rewards} /> : null}

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.howTo}</p>
      {offer.details?.length ? (
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-4">
          {offer.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ) : null}

      {offer.href ? (
        isExternal ? (
          <a
            href={offer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            {offer.hrefLabel || 'Open link'} →
          </a>
        ) : (
          <Link
            href={offer.href}
            className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            {offer.hrefLabel || 'Open'} →
          </Link>
        )
      ) : null}
    </article>
  )
}

export function FreeCosmeticsClient() {
  const [done, setDone] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)
  const [filter, setFilter] = useState<FilterId>('active')
  const [category, setCategory] = useState<FreeCosmeticCategory | 'all'>('all')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setDone(loadDone())
    setNow(new Date())
    setHydrated(true)
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveDone(next)
      return next
    })
  }

  const clock = now ?? new Date(0)

  const sorted = useMemo(() => sortOffersByUrgency(FREE_COSMETIC_OFFERS, clock), [clock])

  const list = useMemo(() => {
    if (!hydrated) return []
    return sorted.filter((o) => {
      if (category !== 'all' && o.category !== category) return false
      const rem = offerRemaining(o.endsIso, clock)
      const isDone = done.has(o.id)
      if (filter === 'completed') return isDone
      if (filter === 'ongoing') return !o.endsIso && !isDone
      if (filter === 'active') {
        if (isDone) return false
        if (!o.endsIso) return true
        return !rem?.ended
      }
      return true
    })
  }, [sorted, filter, category, done, clock, hydrated])

  const activeCount = hydrated
    ? FREE_COSMETIC_OFFERS.filter((o) => {
        if (done.has(o.id)) return false
        const rem = offerRemaining(o.endsIso, clock)
        return !o.endsIso || !rem?.ended
      }).length
    : FREE_COSMETIC_OFFERS.filter((o) => o.endsIso).length

  const categories = useMemo(() => {
    const ids = [...new Set(FREE_COSMETIC_OFFERS.map((o) => o.category))]
    return ids
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Status filter">
          {(
            [
              { id: 'active' as const, label: `Active (${activeCount})` },
              { id: 'ongoing' as const, label: 'No end date' },
              { id: 'completed' as const, label: 'Completed' },
              { id: 'all' as const, label: 'All' },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === f.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`rounded-md border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              category === 'all'
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All types
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                category === c
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {FREE_COSMETIC_CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          {hydrated ? (
            <>
              Showing <strong className="text-foreground">{list.length}</strong> offers · completed
              status saves in this browser
            </>
          ) : (
            'Loading…'
          )}
        </p>
      </div>

      <div className="space-y-3">
        {!hydrated ? (
          <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
            Loading free cosmetics…
          </div>
        ) : (
          <>
            {list.map((offer: FreeCosmeticOffer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                done={done.has(offer.id)}
                onToggle={() => toggle(offer.id)}
                now={clock}
              />
            ))}
            {list.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
                Nothing in this filter. Try Active or All.
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
