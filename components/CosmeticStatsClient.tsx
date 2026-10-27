'use client'

import { useState } from 'react'
import { CosmeticDetailDrawer } from '@/components/CosmeticDetailDrawer'
import type { CosmeticStatsBucket, CosmeticStatsPayload, CosmeticStatsRow } from '@/lib/cosmetic-stats'
import { formatShopDate, rarityBarClass } from '@/lib/cosmetic-stats'

const PREVIEW = 15

type BoardId = keyof CosmeticStatsPayload['boards']

const BOARDS: {
  id: BoardId
  title: string
  blurb: string
  column: string
  value: (row: CosmeticStatsRow) => string
}[] = [
  {
    id: 'mostAppeared',
    title: 'Most occurrences in the shop',
    blurb: 'Distinct Item Shop dates on Fortnite-API shopHistory — not lobby wear.',
    column: 'Times',
    value: (row) => row.appearances.toLocaleString('en-US'),
  },
  {
    id: 'longestVaulted',
    title: 'Longest wait in the shop',
    blurb: 'Not in tonight’s rotation, ranked by days since last shop date.',
    column: 'Days',
    value: (row) => (row.daysSinceLastSeen != null ? row.daysSinceLastSeen.toLocaleString('en-US') : '—'),
  },
  {
    id: 'recentReturns',
    title: 'Recent returns',
    blurb: 'Showed up in the last two weeks and has rotated before.',
    column: 'Days since',
    value: (row) => (row.daysSinceLastSeen != null ? row.daysSinceLastSeen.toLocaleString('en-US') : '—'),
  },
  {
    id: 'inShopTonight',
    title: 'In shop tonight',
    blurb: 'Live Item Shop entries from the Fortnite-API shop feed.',
    column: 'V-Bucks',
    value: (row) => (row.price != null ? row.price.toLocaleString('en-US') : '—'),
  },
]

function StatsTable({
  title,
  blurb,
  column,
  rows,
  value,
  onSelect,
}: {
  title: string
  blurb: string
  column: string
  rows: CosmeticStatsRow[]
  value: (row: CosmeticStatsRow) => string
  onSelect: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? rows : rows.slice(0, PREVIEW)

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{blurb}</p>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-8 text-sm text-muted-foreground">No rows for this board right now.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-4 py-2 font-bold">#</th>
                  <th className="px-2 py-2 font-bold">Cosmetic</th>
                  <th className="px-4 py-2 text-right font-bold">{column}</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row, i) => (
                  <tr key={row.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-2 tabular-nums text-muted-foreground">{i + 1}</td>
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        onClick={() => onSelect(row.id)}
                        className="flex w-full items-center gap-3 text-left"
                      >
                        {row.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={row.image}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-md border border-border bg-black/40 object-contain"
                          />
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-md border border-border bg-muted" />
                        )}
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-foreground hover:text-primary">
                            {row.name}
                          </span>
                          <span className="block text-[11px] text-muted-foreground">
                            {row.type}
                            {row.inShop ? ' · in shop' : ''}
                          </span>
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold tabular-nums text-primary">
                      {value(row)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > PREVIEW ? (
            <div className="border-t border-border px-4 py-2">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                {expanded ? 'Show less' : `More (${rows.length})`}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}

function CountTable({
  title,
  rows,
  bar,
}: {
  title: string
  rows: CosmeticStatsBucket[]
  bar?: boolean
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <th className="px-4 py-2 font-bold">Name</th>
              <th className="px-4 py-2 text-right font-bold">Count</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-2">
                  <p className="font-semibold text-foreground">{row.label}</p>
                  {bar ? (
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${rarityBarClass(row.key)}`}
                        style={{ width: `${Math.min(100, Math.max(row.pct, 0.4))}%` }}
                      />
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                  <span className="font-semibold text-foreground">{row.pct.toFixed(2)}%</span>
                  <span className="mt-0.5 block text-[11px]">
                    {row.count.toLocaleString('en-US')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function CosmeticStatsClient({ data }: { data: CosmeticStatsPayload }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const updated = new Date(data.generatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Cosmetics in catalog
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold tabular-nums text-primary">
            {data.catalogCount.toLocaleString('en-US')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.outfitCount.toLocaleString('en-US')} outfits
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
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            About these boards
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{data.note}</p>
          <p className="mt-2 text-xs text-muted-foreground">Updated {updated}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {BOARDS.map((board) => (
          <StatsTable
            key={board.id}
            title={board.title}
            blurb={board.blurb}
            column={board.column}
            rows={data.boards[board.id]}
            value={board.value}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CountTable title="Cosmetics by rarity" rows={data.rarity} bar />
        <CountTable title="Cosmetics by season" rows={data.seasons} bar />
      </div>

      <CountTable title="Number of cosmetics" rows={data.types} />

      <CosmeticDetailDrawer
        cosmeticId={selectedId}
        onClose={() => setSelectedId(null)}
        onSelectId={setSelectedId}
      />
    </div>
  )
}
