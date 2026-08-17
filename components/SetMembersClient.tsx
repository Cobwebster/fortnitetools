'use client'

import { useState } from 'react'
import { RARITY_COLORS, type CosmeticItem } from '@/lib/fortnite-api'
import { CosmeticDetailDrawer } from '@/components/CosmeticDetailDrawer'

function rarityClass(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

function formatDay(iso: string | undefined) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

export function SetMembersClient({ items }: { items: CosmeticItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const history = item.shopHistory || []
          const last = history[history.length - 1]
          return (
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
                  <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                    No art
                  </div>
                )}
              </div>
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold leading-snug text-foreground">{item.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.type} · {item.rarity}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {history.length
                    ? `${history.length} shop day${history.length === 1 ? '' : 's'} · last ${formatDay(last)}`
                    : 'No shop history (pass / exclusive / unreleased)'}
                </p>
              </div>
            </button>
          )
        })}
      </div>
      <CosmeticDetailDrawer cosmeticId={selectedId} onClose={() => setSelectedId(null)} onSelectId={setSelectedId} />
    </>
  )
}
