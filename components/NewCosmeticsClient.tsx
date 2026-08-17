'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { COSMETIC_TYPES, RARITY_COLORS, type CosmeticItem } from '@/lib/fortnite-api'
import { CosmeticDetailDrawer } from '@/components/CosmeticDetailDrawer'

function rarityClass(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

export function NewCosmeticsClient({
  items,
  build,
  lastAddition,
}: {
  items: CosmeticItem[]
  build?: string
  lastAddition?: string
}) {
  const [type, setType] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!type) return items
    return items.filter((item) => item.typeValue === type)
  }, [items, type])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Cosmetics Epic added in the current game build
          {lastAddition ? ` — last BR addition ${formatDate(lastAddition)}` : ''}.
          {build ? ` Build ${build}.` : ''} This is the same “New” list as the{' '}
          <Link href="/tools/item-shop" className="text-primary hover:underline">
            Item Shop
          </Link>{' '}
          tab, as its own page so it can be indexed.
        </p>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">All new ({items.length})</option>
          {COSMETIC_TYPES.filter((ct) => ct.value).map((ct) => {
            const count = items.filter((i) => i.typeValue === ct.value).length
            if (!count) return null
            return (
              <option key={ct.value} value={ct.value}>
                {ct.label} ({count})
              </option>
            )
          })}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`overflow-hidden rounded-xl border text-left transition-colors hover:border-primary/60 ${rarityClass(item.rarityValue)}`}
          >
            <div className="aspect-square bg-background/40">
              {item.image || item.smallImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image || item.smallImage || ''}
                  alt={item.name}
                  className="h-full w-full object-contain p-2"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">No art</div>
              )}
            </div>
            <div className="space-y-0.5 p-2.5">
              <p className="line-clamp-2 text-xs font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.type}
                {item.added ? ` · ${formatDate(item.added)}` : ''}
              </p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing in that type for this build.</p>
      ) : null}

      <CosmeticDetailDrawer
        cosmeticId={selectedId}
        onClose={() => setSelectedId(null)}
        onSelectId={setSelectedId}
      />
    </div>
  )
}
