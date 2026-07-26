'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  formatCompact,
  formatPlayers,
  type PlayerCountRow,
} from '@/lib/player-count'

function RankTable({
  rows,
  emptyLabel,
}: {
  rows: PlayerCountRow[]
  emptyLabel: string
}) {
  if (!rows.length) {
    return (
      <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30 text-[10px] font-bold uppercase tracking-wider text-foreground">
            <th className="px-3 py-2.5 font-semibold">#</th>
            <th className="px-3 py-2.5 font-semibold">Map</th>
            <th className="px-3 py-2.5 font-semibold text-right">Peak CCU</th>
            <th className="px-3 py-2.5 font-semibold text-right">Unique (day)</th>
            <th className="px-3 py-2.5 font-semibold text-right">Code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.code}-${row.title}`} className="border-b border-border/50 last:border-0">
              <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{i + 1}</td>
              <td className="px-3 py-2.5">
                <div className="font-semibold text-foreground">{row.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {row.creatorCode ? `@${row.creatorCode}` : row.kind === 'epic' ? 'Epic' : 'Creative'}
                  {row.note ? ` · ${row.note}` : ''}
                </div>
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-foreground">
                {formatPlayers(row.peakCcu)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                {formatPlayers(row.uniquePlayers)}
              </td>
              <td className="px-3 py-2.5 text-right">
                <code className="rounded border border-border bg-background px-1.5 py-0.5 text-[11px] text-foreground">
                  {row.code}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function IslandLookup() {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PlayerCountRow | null>(null)
  const [pending, startTransition] = useTransition()

  function lookup() {
    const cleaned = code.trim().replace(/\s+/g, '')
    if (!cleaned) return
    setError(null)
    setResult(null)
    startTransition(async () => {
      try {
        const res = await fetch(`/api/fortnite/island-metrics?code=${encodeURIComponent(cleaned)}`)
        const json = await res.json()
        if (!res.ok) {
          setError(json.error || 'Island not found')
          return
        }
        setResult(json as PlayerCountRow)
      } catch {
        setError('Lookup failed — try again in a moment.')
      }
    })
  }

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Look up any island
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste a Creative code (XXXX-XXXX-XXXX) or an Epic slug like{' '}
          <code className="text-foreground">experience_br</code>.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') lookup()
          }}
          placeholder="3225-0366-8885"
          className="w-full flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/40 placeholder:text-muted-foreground focus:ring-2"
        />
        <button
          type="button"
          onClick={lookup}
          disabled={pending || !code.trim()}
          className="rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-opacity disabled:opacity-40"
        >
          {pending ? 'Loading…' : 'Check players'}
        </button>
      </div>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Map</p>
            <p className="mt-1 font-display text-lg font-bold uppercase text-foreground">{result.title}</p>
            <p className="text-xs text-muted-foreground">{result.code}</p>
          </div>
          <div className="rounded-lg border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Peak CCU
            </p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums text-primary">
              {formatPlayers(result.peakCcu)}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Unique players (day)
            </p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">
              {formatPlayers(result.uniquePlayers)}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function PlayerCountClient({
  epicRows,
  creativeRows,
  totalTrackedPeak,
  updatedAt,
  sourceNote,
}: {
  epicRows: PlayerCountRow[]
  creativeRows: PlayerCountRow[]
  totalTrackedPeak: number
  updatedAt: string
  sourceNote: string
}) {
  const updatedLabel = new Date(updatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card px-5 py-4 sm:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Tracked peak CCU
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold tabular-nums text-primary sm:text-4xl">
            {formatPlayers(totalTrackedPeak)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Sum of Epic modes + top Creative maps below ({formatCompact(totalTrackedPeak)})
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4 sm:col-span-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            About these numbers
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sourceNote}</p>
          <p className="mt-2 text-xs text-muted-foreground">Updated {updatedLabel}</p>
        </div>
      </div>

      <IslandLookup />

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Epic modes
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Battle Royale, Reload, OG, Blitz, LEGO, Festival, and Racing — ranked by peak concurrent.
            </p>
          </div>
        </div>
        <RankTable rows={epicRows} emptyLabel="Epic mode metrics unavailable right now." />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            Popular Creative maps
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Viral tycoons, pillars, Zone Wars, and other high-traffic islands (100+ peak CCU) —
            sorted by latest peak concurrent. Looking for a quieter map code? See{' '}
            <Link href="/codes" className="text-primary hover:underline">
              Creative map codes
            </Link>
            .
          </p>
        </div>
        <RankTable
          rows={creativeRows}
          emptyLabel="No Creative maps with live metrics right now — try the lookup above."
        />
      </section>
    </div>
  )
}
