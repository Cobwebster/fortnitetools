'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from '@/components/link'
import { Loader2, Search, Swords } from 'lucide-react'
import {
  formatStat,
  type PlayerStatsResult,
  type PlaylistStats,
  type StatsAccountType,
  type StatsTimeWindow,
} from '@/lib/fortnite-stats'

type Side = 'a' | 'b'

type CompareRow = {
  key: string
  label: string
  format: (n: number | null | undefined) => string
  higherWins: boolean
}

const ROWS: CompareRow[] = [
  {
    key: 'wins',
    label: 'Wins',
    format: (n) => formatStat(n),
    higherWins: true,
  },
  {
    key: 'kd',
    label: 'K/D',
    format: (n) => formatStat(n, 2),
    higherWins: true,
  },
  {
    key: 'winRate',
    label: 'Win rate',
    format: (n) => (n == null ? '—' : `${formatStat(n, 1)}%`),
    higherWins: true,
  },
  {
    key: 'kills',
    label: 'Kills',
    format: (n) => formatStat(n),
    higherWins: true,
  },
  {
    key: 'deaths',
    label: 'Deaths',
    format: (n) => formatStat(n),
    higherWins: false,
  },
  {
    key: 'matches',
    label: 'Matches',
    format: (n) => formatStat(n),
    higherWins: true,
  },
  {
    key: 'killsPerMatch',
    label: 'Kills / match',
    format: (n) => formatStat(n, 2),
    higherWins: true,
  },
  {
    key: 'score',
    label: 'Score',
    format: (n) => formatStat(n),
    higherWins: true,
  },
  {
    key: 'minutesPlayed',
    label: 'Minutes played',
    format: (n) => formatStat(n),
    higherWins: true,
  },
  {
    key: 'playersOutlived',
    label: 'Players outlived',
    format: (n) => formatStat(n),
    higherWins: true,
  },
]

function overallOf(data: PlayerStatsResult | null): PlaylistStats | null {
  return data?.inputs.all?.overall ?? null
}

function valueOf(stats: PlaylistStats | null, key: string): number | null {
  if (!stats) return null
  const v = (stats as Record<string, unknown>)[key]
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

function winnerSide(
  a: number | null,
  b: number | null,
  higherWins: boolean
): Side | 'tie' | null {
  if (a == null || b == null) return null
  if (a === b) return 'tie'
  if (higherWins) return a > b ? 'a' : 'b'
  return a < b ? 'a' : 'b'
}

async function fetchOne(
  name: string,
  accountType: StatsAccountType,
  timeWindow: StatsTimeWindow
): Promise<{ ok: true; data: PlayerStatsResult } | { ok: false; error: string }> {
  const params = new URLSearchParams({ name, accountType, timeWindow })
  const res = await fetch(`/api/fortnite/stats?${params}`)
  const json = await res.json().catch(() => null)
  if (!res.ok) {
    return { ok: false, error: json?.error || `Could not load ${name}` }
  }
  return { ok: true, data: json as PlayerStatsResult }
}

export function PlayerCompareClient({
  configured,
  initialA = '',
  initialB = '',
  initialAccountType = 'epic',
  initialTimeWindow = 'season',
}: {
  configured: boolean
  initialA?: string
  initialB?: string
  initialAccountType?: StatsAccountType
  initialTimeWindow?: StatsTimeWindow
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [nameA, setNameA] = useState(initialA)
  const [nameB, setNameB] = useState(initialB)
  const [accountType, setAccountType] = useState<StatsAccountType>(initialAccountType)
  const [timeWindow, setTimeWindow] = useState<StatsTimeWindow>(initialTimeWindow)
  const [dataA, setDataA] = useState<PlayerStatsResult | null>(null)
  const [dataB, setDataB] = useState<PlayerStatsResult | null>(null)
  const [errorA, setErrorA] = useState<string | null>(null)
  const [errorB, setErrorB] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const runCompare = useCallback(
    async (opts: {
      a: string
      b: string
      accountType: StatsAccountType
      timeWindow: StatsTimeWindow
      pushUrl: boolean
    }) => {
      const a = opts.a.trim()
      const b = opts.b.trim()
      if (!a || !b) {
        setFormError('Enter two player names to compare.')
        return
      }
      if (a.toLowerCase() === b.toLowerCase()) {
        setFormError('Pick two different names.')
        return
      }
      if (!configured) {
        setFormError('Player stats need a FORTNITE_API_KEY on the server.')
        return
      }

      setLoading(true)
      setFormError(null)
      setErrorA(null)
      setErrorB(null)

      try {
        const [ra, rb] = await Promise.all([
          fetchOne(a, opts.accountType, opts.timeWindow),
          fetchOne(b, opts.accountType, opts.timeWindow),
        ])

        if (ra.ok) {
          setDataA(ra.data)
          setErrorA(null)
        } else {
          setDataA(null)
          setErrorA(ra.error)
        }
        if (rb.ok) {
          setDataB(rb.data)
          setErrorB(null)
        } else {
          setDataB(null)
          setErrorB(rb.error)
        }

        if (opts.pushUrl && ra.ok && rb.ok) {
          const next = new URLSearchParams()
          next.set('a', a)
          next.set('b', b)
          if (opts.accountType !== 'epic') next.set('accountType', opts.accountType)
          if (opts.timeWindow !== 'season') next.set('timeWindow', opts.timeWindow)
          router.replace(`${pathname}?${next.toString()}`, { scroll: false })
        }
      } catch {
        setFormError('Network error loading stats. Try again.')
        setDataA(null)
        setDataB(null)
      } finally {
        setLoading(false)
      }
    },
    [configured, pathname, router]
  )

  useEffect(() => {
    const qa = searchParams.get('a')?.trim()
    const qb = searchParams.get('b')?.trim()
    if (!qa || !qb || !configured) return
    const qType = (searchParams.get('accountType') || 'epic') as StatsAccountType
    const qWindow = (searchParams.get('timeWindow') || 'season') as StatsTimeWindow
    setNameA(qa)
    setNameB(qb)
    setAccountType(qType)
    setTimeWindow(qWindow)
    void runCompare({
      a: qa,
      b: qb,
      accountType: qType,
      timeWindow: qWindow,
      pushUrl: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount / query only
  }, [searchParams, configured])

  const overallA = overallOf(dataA)
  const overallB = overallOf(dataB)

  const score = useMemo(() => {
    let aWins = 0
    let bWins = 0
    for (const row of ROWS) {
      const w = winnerSide(valueOf(overallA, row.key), valueOf(overallB, row.key), row.higherWins)
      if (w === 'a') aWins += 1
      if (w === 'b') bWins += 1
    }
    return { aWins, bWins }
  }, [overallA, overallB])

  const fieldClass =
    'w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'
  const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground'

  return (
    <div className="space-y-8">
      <form
        className="rounded-xl border border-border bg-card p-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          void runCompare({
            a: nameA,
            b: nameB,
            accountType,
            timeWindow,
            pushUrl: true,
          })
        }}
      >
        <div className="flex items-center gap-2 text-primary">
          <Swords className="h-5 w-5" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Head to head</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Player A</span>
            <input
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              className={fieldClass}
              placeholder="Epic / PSN / Xbox name"
              maxLength={32}
              autoComplete="off"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Player B</span>
            <input
              value={nameB}
              onChange={(e) => setNameB(e.target.value)}
              className={fieldClass}
              placeholder="Epic / PSN / Xbox name"
              maxLength={32}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="block">
            <span className={labelClass}>Platform</span>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as StatsAccountType)}
              className={fieldClass}
            >
              <option value="epic">Epic</option>
              <option value="psn">PlayStation</option>
              <option value="xbl">Xbox</option>
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Window</span>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value as StatsTimeWindow)}
              className={fieldClass}
            >
              <option value="season">Current season</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Compare
            </button>
          </div>
        </div>

        {formError ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {formError}
          </p>
        ) : null}
        {!configured ? (
          <p className="text-sm text-muted-foreground">
            Add <code className="rounded bg-muted px-1 text-xs">FORTNITE_API_KEY</code> to enable lookups.
          </p>
        ) : null}
      </form>

      {(dataA || dataB || errorA || errorB) && (
        <section className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <PlayerCard
              label="Player A"
              data={dataA}
              error={errorA}
              edgeWins={score.aWins}
              otherWins={score.bWins}
            />
            <PlayerCard
              label="Player B"
              data={dataB}
              error={errorB}
              edgeWins={score.bWins}
              otherWins={score.aWins}
            />
          </div>

          {overallA && overallB ? (
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Overall BR comparison
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Green = better on that row. Category score {score.aWins}–{score.bWins} (ties ignored).
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      <th className="px-4 py-2 text-left font-bold">Stat</th>
                      <th className="px-4 py-2 text-right font-bold">
                        {dataA?.account.name || 'A'}
                      </th>
                      <th className="px-4 py-2 text-right font-bold">
                        {dataB?.account.name || 'B'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => {
                      const va = valueOf(overallA, row.key)
                      const vb = valueOf(overallB, row.key)
                      const win = winnerSide(va, vb, row.higherWins)
                      return (
                        <tr key={row.key} className="border-b border-border/70 last:border-0">
                          <td className="px-4 py-2.5 text-muted-foreground">{row.label}</td>
                          <td
                            className={`px-4 py-2.5 text-right font-semibold tabular-nums ${
                              win === 'a' ? 'text-primary' : 'text-foreground'
                            }`}
                          >
                            {row.format(va)}
                          </td>
                          <td
                            className={`px-4 py-2.5 text-right font-semibold tabular-nums ${
                              win === 'b' ? 'text-primary' : 'text-foreground'
                            }`}
                          >
                            {row.format(vb)}
                          </td>
                        </tr>
                      )}
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <p className="text-sm text-muted-foreground">
            Need a full playlist split?{' '}
            <Link href="/tools/player-stats" className="font-semibold text-primary hover:underline">
              Open the Fortnite tracker
            </Link>
            {' · '}
            <Link href="/stats" className="font-semibold text-primary hover:underline">
              Player stats leaderboards
            </Link>
          </p>
        </section>
      )}
    </div>
  )
}

function PlayerCard({
  label,
  data,
  error,
  edgeWins,
  otherWins,
}: {
  label: string
  data: PlayerStatsResult | null
  error: string | null
  edgeWins: number
  otherWins: number
}) {
  const leading = data && edgeWins > otherWins
  return (
    <div
      className={`rounded-xl border bg-card p-4 ${
        leading ? 'border-primary/50 ring-1 ring-primary/25' : 'border-border'
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      {error ? (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      ) : data ? (
        <>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">{data.account.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.timeWindow === 'season' ? 'Current season' : 'Lifetime'}
            {data.battlePass ? ` · BP ${data.battlePass.level}` : null}
            {leading ? ' · Leading categories' : null}
          </p>
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt=""
              className="mt-3 max-h-28 w-auto rounded-lg border border-border"
            />
          ) : null}
        </>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Waiting for lookup…</p>
      )}
    </div>
  )
}
