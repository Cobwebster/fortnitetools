'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/link'
import {
  SPRITE_THEME_STYLES,
  SPRITE_VARIANT_ORDER,
  SPRITES,
  type SpriteEntry,
} from '@/lib/sprites'

function matchesQuery(sprite: SpriteEntry, q: string) {
  if (!q) return true
  return (
    sprite.name.toLowerCase().includes(q) ||
    sprite.shortName.toLowerCase().includes(q) ||
    sprite.family.toLowerCase().includes(q) ||
    sprite.variant.toLowerCase().includes(q)
  )
}

export function SpritesGallery() {
  const [query, setQuery] = useState('')
  const [variant, setVariant] = useState('')

  const q = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return SPRITES.filter((sprite) => {
      if (variant && sprite.variant !== variant) return false
      return matchesQuery(sprite, q)
    })
  }, [q, variant])

  const queryCount = useMemo(
    () => SPRITES.filter((sprite) => matchesQuery(sprite, q)).length,
    [q]
  )

  const variantCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const sprite of SPRITES) {
      if (!matchesQuery(sprite, q)) continue
      counts.set(sprite.variant, (counts.get(sprite.variant) ?? 0) + 1)
    }
    return counts
  }, [q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Jonesy, Gold, Klombo…"
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none lg:max-w-sm"
          aria-label="Search Sprites"
        />
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {SPRITES.length}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setVariant('')}
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
            variant === ''
              ? 'border-primary bg-primary/15 text-primary'
              : 'border-border bg-card text-muted-foreground hover:text-foreground'
          }`}
        >
          All ({queryCount})
        </button>
        {SPRITE_VARIANT_ORDER.map((label) => {
          const count = variantCounts.get(label) ?? 0
          if (!count && variant !== label) return null
          return (
            <button
              key={label}
              type="button"
              onClick={() => setVariant(variant === label ? '' : label)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                variant === label
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No Sprites match that search.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {filtered.map((sprite) => (
            <Link
              key={sprite.id}
              href={`/sprites/${sprite.slug}`}
              className={`group overflow-hidden rounded-xl border text-left transition-colors hover:border-primary/70 ${SPRITE_THEME_STYLES[sprite.theme]}`}
            >
              <div className="aspect-square bg-background/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sprite.image}
                  alt={sprite.name}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <div className="space-y-0.5 px-2 pb-2 pt-1">
                <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-foreground group-hover:text-primary">
                  {sprite.shortName}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {sprite.variant}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
