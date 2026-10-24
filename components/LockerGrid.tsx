'use client'

import { useMemo, useState, type DragEvent } from 'react'
import { RARITY_COLORS, type CosmeticItem } from '@/lib/fortnite-api'
import { tabsForItems } from '@/lib/lockers'

function rarityFrame(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

export function LockerGrid({
  items,
  onRemove,
  onDropAdd,
  removingId,
  dropActive,
}: {
  items: CosmeticItem[]
  onRemove?: (id: string) => void
  onDropAdd?: (id: string) => void
  removingId?: string | null
  dropActive?: boolean
}) {
  const [tab, setTab] = useState('all')
  const [over, setOver] = useState(false)
  const tabs = useMemo(() => tabsForItems(items), [items])
  const visible = useMemo(
    () => (tab === 'all' ? items : items.filter((item) => item.typeValue === tab)),
    [items, tab]
  )
  const canDrop = Boolean(onDropAdd)
  const highlight = canDrop && (over || dropActive)

  function handleDragOver(e: DragEvent) {
    if (!canDrop) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setOver(true)
  }

  function handleDrop(e: DragEvent) {
    if (!onDropAdd) return
    e.preventDefault()
    setOver(false)
    const id = e.dataTransfer.getData('text/cosmetic-id') || e.dataTransfer.getData('text/plain')
    if (id) onDropAdd(id)
  }

  const dropProps = canDrop
    ? {
        onDragOver: handleDragOver,
        onDragEnter: handleDragOver,
        onDragLeave: () => setOver(false),
        onDrop: handleDrop,
      }
    : {}

  if (!items.length) {
    return (
      <div
        {...dropProps}
        className={`rounded-xl border border-dashed px-5 py-12 text-center transition-colors ${
          highlight ? 'border-primary bg-primary/10' : 'border-border'
        }`}
      >
        <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
          {highlight ? 'Drop to add' : 'Your locker is empty'}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Search above, then click <strong className="text-foreground">Add</strong> on a result — or
          drag it here.
        </p>
      </div>
    )
  }

  return (
    <div
      {...dropProps}
      className={`space-y-4 rounded-xl border p-3 sm:p-4 transition-colors ${
        highlight ? 'border-primary bg-primary/10' : 'border-transparent'
      }`}
    >
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Locker categories">
        {tabs.map((t) => {
          const count = t.value === 'all' ? items.length : items.filter((i) => i.typeValue === t.value).length
          const active = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.value)}
              className={`rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {t.label} {count}
            </button>
          )
        })}
      </div>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {visible.map((item) => (
          <li key={item.id}>
            <article
              className={`relative overflow-hidden rounded-lg border bg-black/40 ${rarityFrame(item.rarityValue)}`}
            >
              <div className="aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.smallImage || item.image || ''}
                  alt={item.name}
                  className="h-full w-full object-contain p-1.5"
                  loading="lazy"
                />
              </div>
              <p className="truncate px-1.5 pb-1.5 text-center text-[10px] font-semibold text-foreground">
                {item.name}
              </p>
              {onRemove ? (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  disabled={removingId === item.id}
                  className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-rose-300 hover:bg-rose-500/80 hover:text-white disabled:opacity-40"
                >
                  Remove
                </button>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
