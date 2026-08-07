'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Loader2 } from 'lucide-react'
import { FortniteIcon } from '@/components/fortnite-icon'
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

const INPUT_ICONS: Record<keyof typeof INPUT_LABELS, string> = {
  all: '/images/icons/crown.png',
  keyboardMouse: '/images/icons/pickaxe.png',
  gamepad: '/images/loadout/crash_pad.png',
  touch: '/images/loadout/pulse_scanner.png',
}

const PLAYLIST_ICONS: Partial<Record<keyof InputStats, string>> = {
  overall: '/images/icons/crown.png',
  solo: '/images/loadout/hunting_rifle.png',
  duo: '/images/loadout/flex_smg.png',
  trio: '/images/loadout/warforged_ar.png',
  squad: '/images/loadout/striker_pump.png',
  ltm: '/images/loadout/seven_sliders.png',
}

const HIGHLIGHT_ICONS = {
  kd: '/images/loadout/heavy_impact.png',
  wins: '/images/icons/crown.png',
  winRate: '/images/loadout/golden_apple.png',
  matches: '/images/icons/map.png',
} as const

function StatCell({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string
  hint?: string
  icon?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
      <div className="flex items-center gap-2">
        {icon ? (
          <FortniteIcon
            src={icon}
            size="sm"
            frameClassName="h-7 w-7 border-transparent bg-black/30"
          />
        ) : null}
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
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
  inputKey,
  t,
}: {
  title: string
  input: InputStats
  inputKey: keyof typeof INPUT_LABELS
  t: ReturnType<typeof useTranslations>
}) {
  const playlists = (Object.keys(PLAYLIST_LABELS) as (keyof InputStats)[]).filter((key) => input[key])

  if (playlists.length === 0) return null

  return (
    <section className="rounded-xl border border-border bg-card p-5 space-y-5">
      <div className="flex items-center gap-3">
        <FortniteIcon src={INPUT_ICONS[inputKey]} size="md" />
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{title}</h2>
      </div>
      {playlists.map((key) => {
        const playlist = input[key]
        if (!playlist) return null
        return (
          <div key={key} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-2">
              <div className="flex items-center gap-2">
                {PLAYLIST_ICONS[key] ? (
                  <FortniteIcon
                    src={PLAYLIST_ICONS[key]!}
                    size="sm"
                    frameClassName="border-transparent bg-transparent"
                  />
                ) : null}
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  {PLAYLIST_LABELS[key]}
                </h3>
              </div>
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
              <div className="flex items-start gap-3">
                <FortniteIcon
                  src="/images/icons/crown.png"
                  size="lg"
                  frameClassName="border-primary/40 bg-primary/10"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {data.timeWindow === 'season' ? t('seasonStats') : t('lifetimeStats')} ·{' '}
                    {data.accountType.toUpperCase()}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
                    {data.account.name}
                  </h2>
                  {data.battlePass ? (
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <FortniteIcon
                        src="/images/icons/battle_pass.png"
                        size="sm"
                        frameClassName="border-transparent bg-transparent"
                      />
                      <span>
                        {t('battlePassLevel')}{' '}
                        <span className="font-semibold text-foreground">{data.battlePass.level}</span>
                        {data.battlePass.progress > 0 ? (
                          <>
                            {' '}
                            · {formatStat(data.battlePass.progress, 1)}% {t('toNext')}
                          </>
                        ) : null}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
              {overall ? (
                <div className="grid grid-cols-2 gap-2 sm:min-w-[300px]">
                  <StatCell
                    label={t('statKd')}
                    value={formatStat(overall.kd, 2)}
                    icon={HIGHLIGHT_ICONS.kd}
                  />
                  <StatCell
                    label={t('statWins')}
                    value={formatStat(overall.wins)}
                    icon={HIGHLIGHT_ICONS.wins}
                  />
                  <StatCell
                    label={t('statWinRate')}
                    value={overall.winRate == null ? '—' : `${formatStat(overall.winRate, 1)}%`}
                    icon={HIGHLIGHT_ICONS.winRate}
                  />
                  <StatCell
                    label={t('statMatches')}
                    value={formatStat(overall.matches)}
                    icon={HIGHLIGHT_ICONS.matches}
                  />
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
              <InputSection
                key={section.key}
                title={section.label}
                input={section.input}
                inputKey={section.key}
                t={t}
              />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  )
}
