'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
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

const ACCOUNT_OPTIONS: { value: StatsAccountType; labelKey: 'accountEpic' | 'accountPsn' | 'accountXbl' }[] = [
  { value: 'epic', labelKey: 'accountEpic' },
  { value: 'psn', labelKey: 'accountPsn' },
  { value: 'xbl', labelKey: 'accountXbl' },
]

const WINDOW_OPTIONS: { value: StatsTimeWindow; labelKey: 'windowLifetime' | 'windowSeason' }[] = [
  { value: 'lifetime', labelKey: 'windowLifetime' },
  { value: 'season', labelKey: 'windowSeason' },
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

function PlaylistTable({
  stats,
  t,
}: {
  stats: PlaylistStats
  t: ReturnType<typeof useTranslations>
}) {
  const rows: { label: string; value: string }[] = [
    { label: t('statWins'), value: formatStat(stats.wins) },
    { label: t('statKd'), value: formatStat(stats.kd, 2) },
    { label: t('statWinRate'), value: stats.winRate == null ? '—' : `${formatStat(stats.winRate, 1)}%` },
    { label: t('statMatches'), value: formatStat(stats.matches) },
    { label: t('statKills'), value: formatStat(stats.kills) },
    { label: t('statDeaths'), value: formatStat(stats.deaths) },
    { label: t('statKillsPerMatch'), value: formatStat(stats.killsPerMatch, 2) },
    { label: t('statScore'), value: formatStat(stats.score) },
    { label: t('statScorePerMatch'), value: formatStat(stats.scorePerMatch, 1) },
    { label: t('statMinutesPlayed'), value: formatStat(stats.minutesPlayed) },
    { label: t('statPlayersOutlived'), value: formatStat(stats.playersOutlived) },
    { label: t('statTop3'), value: formatStat(stats.top3) },
    { label: t('statTop5'), value: formatStat(stats.top5) },
    { label: t('statTop6'), value: formatStat(stats.top6) },
    { label: t('statTop10'), value: formatStat(stats.top10) },
    { label: t('statTop12'), value: formatStat(stats.top12) },
    { label: t('statTop25'), value: formatStat(stats.top25) },
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
  t,
}: {
  title: string
  input: InputStats
  t: ReturnType<typeof useTranslations>
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
                  {t('updatedPrefix')} {new Date(playlist.lastModified).toLocaleString()}
                </p>
              ) : null}
            </div>
            <PlaylistTable stats={playlist} t={t} />
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
  const t = useTranslations('tools.playerStats')
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
        setError(t('errorEnterName'))
        return
      }
      if (!configured) {
        setError(t('errorNeedApiKey'))
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
          setError(json.error || t('lookupFailed'))
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
        setError(t('networkError'))
      } finally {
        setLoading(false)
      }
    },
    [configured, pathname, router, t]
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
              {t('playerNameLabel')}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              maxLength={32}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('platformLabel')}
            </span>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as StatsAccountType)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {ACCOUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.labelKey)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('windowLabel')}
            </span>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value as StatsTimeWindow)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {WINDOW_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.labelKey)}
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
              {t('lookupBtn')}
            </button>
          </div>
        </div>
        {!configured ? (
          <p className="text-xs text-amber-200/90 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
            {t('notConfiguredPrefix')} <code className="text-foreground">{t('notConfiguredCode')}</code>{' '}
            {t('notConfiguredMid')}{' '}
            <a
              href="https://dash.fortnite-api.com/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {t('notConfiguredLinkText')}
            </a>{' '}
            {t('notConfiguredSuffix')}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">{t('configuredHint')}</p>
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
                  {data.timeWindow === 'season' ? t('seasonStats') : t('lifetimeStats')} ·{' '}
                  {data.accountType.toUpperCase()}
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
                  {data.account.name}
                </h2>
                {data.battlePass ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('battlePassLevel')}{' '}
                    <span className="font-semibold text-foreground">{data.battlePass.level}</span>
                    {data.battlePass.progress > 0 ? (
                      <>
                        {' '}
                        · {formatStat(data.battlePass.progress, 1)}% {t('toNext')}
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
              {overall ? (
                <div className="grid grid-cols-2 gap-2 sm:min-w-[280px]">
                  <StatCell label={t('statKd')} value={formatStat(overall.kd, 2)} />
                  <StatCell label={t('statWins')} value={formatStat(overall.wins)} />
                  <StatCell
                    label={t('statWinRate')}
                    value={overall.winRate == null ? '—' : `${formatStat(overall.winRate, 1)}%`}
                  />
                  <StatCell label={t('statMatches')} value={formatStat(overall.matches)} />
                </div>
              ) : null}
            </div>
            {data.image ? (
              <div className="mt-5 overflow-hidden rounded-lg border border-border bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image}
                  alt={t('statsImageAlt', { name: data.account.name })}
                  className="mx-auto max-h-[420px] w-auto object-contain"
                />
              </div>
            ) : null}
          </section>

          {inputSections.map((section) =>
            section.input ? (
              <InputSection key={section.key} title={section.label} input={section.input} t={t} />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  )
}
