'use client'

import { useState } from 'react'
import Link from '@/components/link'
import type { CosmeticStatsPayload, CosmeticStatsRow } from '@/lib/cosmetic-stats'
import { formatShopDate } from '@/lib/cosmetic-stats'

const TABS = [
  {
    id: 'mostAppeared' as const,
    title: 'Most appeared',
    blurb: 'Outfits with the most Item Shop dates on record (shopHistory length).',
    column: 'Appearances',
  },
  {
    id: 'longestVaulted' as const,
    title: 'Longest vaulted',
    blurb: 'Shop outfits not in tonight’s rotation, ranked by days since last appearance.',
    column: 'Days out',
  },
  {
    id: 'recentReturns' as const,
    title: 'Recent returns',
    blurb: 'Outfits that showed up in the last two weeks and have rotated before.',
    column: 'Days since',
  },
  {
    id: 'inShopTonight' as const,
    title: 'In shop tonight',
    blurb: 'Outfits live in today’s Item Shop — prices from the live shop feed.',
    column: 'V-Bucks',
  },
]

function cellValue(tab: (typeof TABS)[number]['id'], row: CosmeticStatsRow): string {
  if (tab === 'mostAppeared') return row.appearances.toLocaleString('en-US')
  if (tab === 'inShopTonight') return row.price != null ? row.price.toLocaleString('en-US') : '—'
  return row.daysSinceLastSeen != null ? row.daysSinceLastSeen.toLocaleString('en-US') : '—'
}

export function CosmeticStatsClient({ data }: { data: CosmeticStatsPayload }) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('mostAppeared')
  const meta = TABS.find((t) => t.id === tab) || TABS[0]
  const rows = data.boards[tab] || []

  const updated = new Date(data.generatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Outfits scanned
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold tabular-nums text-primary">
            {data.outfitCount.toLocaleString('en-US')}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Shop offers tonight
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold tabular-nums text-foreground">
            {data.shopOfferCount.toLocaleString('en-US')}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4 sm:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            About these boards
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{data.note}</p>
          <p className="mt-2 text-xs text-muted-foreground">Updated {updated}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? 'rounded-md border border-primary bg-primary/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary'
                : 'rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary'
            }
          >
            {t.title}
          </button>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            {meta.title}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">{meta.blurb}</p>
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-sm text-muted-foreground">No rows for this board right now.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-4 py-2 font-bold">#</th>
                  <th className="px-2 py-2 font-bold">Outfit</th>
                  <th className="px-2 py-2 font-bold">Rarity</th>
                  <th className="px-2 py-2 font-bold">Last seen</th>
                  <th className="px-4 py-2 text-right font-bold">{meta.column}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-2.5 tabular-nums text-muted-foreground">{i + 1}</td>
                    <td className="px-2 py-2.5">
                      <div className="flex items-center gap-3">
                        {row.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={row.image}
                            alt=""
                            className="h-10 w-10 rounded-md border border-border bg-black/40 object-contain"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-md border border-border bg-muted" />
                        )}
                        <div className="min-w-0">
                          <Link
                            href="/tools/skin-rarity-calculator"
                            className="block truncate font-semibold text-foreground hover:text-primary hover:underline"
                          >
                            {row.name}
                          </Link>
                          {row.inShop ? (
                            <p className="text-[11px] font-medium text-primary">In shop tonight</p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-muted-foreground">{row.rarity}</td>
                    <td className="px-2 py-2.5 tabular-nums text-muted-foreground">
                      {formatShopDate(row.lastSeen)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-primary">
                      {cellValue(tab, row)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-sm text-muted-foreground">
        Dig into one skin on the{' '}
        <Link href="/tools/skin-rarity-calculator" className="font-semibold text-primary hover:underline">
          skin rarity calculator
        </Link>
        {' · '}
        <Link href="/tools/item-shop" className="font-semibold text-primary hover:underline">
          Item Shop tracker
        </Link>
        {' · '}
        <Link href="/new-cosmetics" className="font-semibold text-primary hover:underline">
          New cosmetics
        </Link>
      </p>
    </div>
  )
}
