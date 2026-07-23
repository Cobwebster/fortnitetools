'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'
import {
  INPUT_LABELS,
  PLAYLIST_LABELS,
  formatStat,
  type InputStats,
  type PlayerStatsResult,
  type PlaylistStats,
  type StatsAccountType,
  type StatsTimeWindow,
} from '@/lib/fortnite-stats'

const ACCOUNT_OPTIONS: { value: StatsAccountType; label: string }[] = [
  { value: 'epic', label: 'Epic' },
  { value: 'psn', label: 'PlayStation' },
  { value: 'xbl', label: 'Xbox' },
]

const WINDOW_OPTIONS: { value: StatsTimeWindow; label: string }[] = [
  { value: 'lifetime', label: 'Lifetime' },
  { value: 'season', label: 'Current season' },
]

function StatCell({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-xl font-bold text-foreground tabular-nums">{value}</p>
      {hint ? <p className="text-[11px] text-muted-foreground mt-0.5">{hint}</p> : null}
    </div>
  )
}

function PlaylistTable({ stats }: { stats: PlaylistStats }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Wins', value: formatStat(stats.wins) },
    { label: 'K/D', value: formatStat(stats.kd, 2) },
    { label: 'Win rate', value: stats.winRate == null ? '—' : `${formatStat(stats.winRate, 1)}%` },
    { label: 'Matches', value: formatStat(stats.matches) },
    { label: 'Kills', value: formatStat(stats.kills) },
    { label: 'Deaths', value: formatStat(stats.deaths) },
    { label: 'Kills / match', value: formatStat(stats.killsPerMatch, 2) },
    { label: 'Score', value: formatStat(stats.score) },
    { label: 'Score / match', value: formatStat(stats.scorePerMatch, 1) },
    { label: 'Minutes played', value: formatStat(stats.minutesPlayed) },
    { label: 'Players outlived', value: formatStat(stats.playersOutlived) },
    { label: 'Top 3', value: formatStat(stats.top3) },
    { label: 'Top 5', value: formatStat(stats.top5) },
    { label: 'Top 6', value: formatStat(stats.top6) },
    { label: 'Top 10', value: formatStat(stats.top10) },
    { label: 'Top 12', value: formatStat(stats.top12) },
    { label: 'Top 25', value: formatStat(stats.top25) },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((row) => (
        <StatCell key={row.label} label={row.label} value={row.value} />
      ))}
    </div>
  )
}

function InputSection({
  title,
  input,
}: {
  title: string
  input: InputStats
}) {
  const playlists = (Object.keys(PLAYLIST_LABELS) as (keyof InputStats)[]).filter((key) => input[key])

  if (playlists.length === 0) return null

  return (
    <section className="rounded-xl border border-border bg-card p-5 space-y-5">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{title}</h2>
      {playlists.map((key) => {
        const playlist = input[key]
        if (!playlist) return null
        return (
          <div key={key} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {PLAYLIST_LABELS[key]}
              </h3>
              {playlist.lastModified ? (
                <p className="text-[11px] text-muted-foreground">
                  Updated {new Date(playlist.lastModified).toLocaleString()}
                </p>
              ) : null}
            </div>
            <PlaylistTable stats={playlist} />
          </div>
        )
      })}
    </section>
  )
}

export function PlayerStatsClient({
  initialName = '',
  initialAccountType = 'epic',
  initialTimeWindow = 'lifetime',
  configured,
}: {
  initialName?: string
  initialAccountType?: StatsAccountType
  initialTimeWindow?: StatsTimeWindow
  configured: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [name, setName] = useState(initialName)
  const [accountType, setAccountType] = useState<StatsAccountType>(initialAccountType)
  const [timeWindow, setTimeWindow] = useState<StatsTimeWindow>(initialTimeWindow)
  const [data, setData] = useState<PlayerStatsResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const runLookup = useCallback(
    async (opts: { name: string; accountType: StatsAccountType; timeWindow: StatsTimeWindow; pushUrl: boolean }) => {
      const trimmed = opts.name.trim()
      if (!trimmed) {
        setError('Enter a Fortnite / Epic display name.')
        return
      }
      if (!configured) {
        setError('Player stats need a FORTNITE_API_KEY on the server. Add one from fortnite-api.com, then redeploy.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          name: trimmed,
          accountType: opts.accountType,
          timeWindow: opts.timeWindow,
        })
        const res = await fetch(`/api/fortnite/stats?${params}`)
        const json = await res.json()
        if (!res.ok) {
          setData(null)
          setError(json.error || 'Lookup failed')
          return
        }
        setData(json as PlayerStatsResult)

        if (opts.pushUrl) {
          const next = new URLSearchParams()
          next.set('name', trimmed)
          if (opts.accountType !== 'epic') next.set('accountType', opts.accountType)
          if (opts.timeWindow !== 'lifetime') next.set('timeWindow', opts.timeWindow)
          const qs = next.toString()
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        }
      } catch {
        setData(null)
        setError('Network error loading stats.')
      } finally {
        setLoading(false)
      }
    },
    [configured, pathname, router]
  )

  // Auto-load when landing with ?name=
  useEffect(() => {
    const qName = searchParams.get('name')?.trim()
    if (!qName || !configured) return
    const qType = (searchParams.get('accountType') || 'epic') as StatsAccountType
    const qWindow = (searchParams.get('timeWindow') || 'lifetime') as StatsTimeWindow
    setName(qName)
    setAccountType(qType)
    setTimeWindow(qWindow)
    void runLookup({ name: qName, accountType: qType, timeWindow: qWindow, pushUrl: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount / query identity
  }, [searchParams, configured])

  const overall = data?.inputs.all?.overall

  const inputSections = useMemo(() => {
    if (!data) return []
    return (Object.keys(INPUT_LABELS) as (keyof typeof INPUT_LABELS)[])
      .map((key) => ({ key, label: INPUT_LABELS[key], input: data.inputs[key] }))
      .filter((row) => row.input)
  }, [data])

  return (
    <div className="space-y-8">
      <form
        className="rounded-xl border border-border bg-card p-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          void runLookup({ name, accountType, timeWindow, pushUrl: true })
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Player name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Epic display name"
              maxLength={32}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Platform
            </span>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as StatsAccountType)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {ACCOUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Window
            </span>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value as StatsTimeWindow)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {WINDOW_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Look up
            </button>
          </div>
        </div>
        {!configured ? (
          <p className="text-xs text-amber-200/90 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
            Server needs <code className="text-foreground">FORTNITE_API_KEY</code> from{' '}
            <a
              href="https://dash.fortnite-api.com/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              fortnite-api.com
            </a>{' '}
            (free Discord login). Shop/map work without it; player stats require the key.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Search updates the URL so you can share a stats link. Default landing page stays clean until you look someone
            up.
          </p>
        )}
      </form>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? (
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {data.timeWindow === 'season' ? 'Season stats' : 'Lifetime stats'} · {data.accountType.toUpperCase()}
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
                  {data.account.name}
                </h2>
                {data.battlePass ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Battle Pass level{' '}
                    <span className="font-semibold text-foreground">{data.battlePass.level}</span>
                    {data.battlePass.progress > 0 ? (
                      <>
                        {' '}
                        · {formatStat(data.battlePass.progress, 1)}% to next
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
              {overall ? (
                <div className="grid grid-cols-2 gap-2 sm:min-w-[280px]">
                  <StatCell label="K/D" value={formatStat(overall.kd, 2)} />
                  <StatCell label="Wins" value={formatStat(overall.wins)} />
                  <StatCell
                    label="Win rate"
                    value={overall.winRate == null ? '—' : `${formatStat(overall.winRate, 1)}%`}
                  />
                  <StatCell label="Matches" value={formatStat(overall.matches)} />
                </div>
              ) : null}
            </div>
            {data.image ? (
              <div className="mt-5 overflow-hidden rounded-lg border border-border bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image}
                  alt={`${data.account.name} Fortnite stats card`}
                  className="mx-auto max-h-[420px] w-auto object-contain"
                />
              </div>
            ) : null}
          </section>

          {inputSections.map((section) =>
            section.input ? (
              <InputSection key={section.key} title={section.label} input={section.input} />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  )
}
