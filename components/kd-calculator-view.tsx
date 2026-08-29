'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { TrendingUp, Minus } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'

// Rough public-lobby benchmarks for context (not official Epic stats)
const BENCHMARKS = {
  kd: [
    { id: 'low', min: 0, max: 0.5, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
    { id: 'average', min: 0.5, max: 1.0, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    { id: 'aboveAvg', min: 1.0, max: 2.0, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
    { id: 'strong', min: 2.0, max: 4.0, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
    { id: 'veryHigh', min: 4.0, max: 999, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
  ],
  wr: [
    { id: 'low', min: 0, max: 3, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
    { id: 'average', min: 3, max: 7, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    { id: 'aboveAvg', min: 7, max: 15, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
    { id: 'strong', min: 15, max: 25, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
    { id: 'veryHigh', min: 25, max: 100, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
  ],
} as const

function getBenchmark(val: number, type: 'kd' | 'wr') {
  return BENCHMARKS[type].find((b) => val >= b.min && val < b.max) ?? BENCHMARKS[type][0]
}

function StatInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-muted px-4 py-3 text-lg font-bold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  )
}

function ResultCard({
  label,
  value,
  benchmark,
  benchmarkLabel,
  sublabel,
}: {
  label: string
  value: string
  benchmark: ReturnType<typeof getBenchmark>
  benchmarkLabel: string
  sublabel?: string
}) {
  return (
    <div className={`rounded-xl border ${benchmark.border} ${benchmark.bg} p-5 flex flex-col gap-2`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={`font-display text-5xl font-bold ${benchmark.color}`}>{value}</span>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${benchmark.bg} ${benchmark.color} border ${benchmark.border}`}>
          {benchmarkLabel}
        </span>
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  )
}

const CONTEXT_RANGES = [
  { id: 'typicalPubs', kd: '0.6–1.2', wr: '2–8%' },
  { id: 'strongPubs', kd: '2–4', wr: '10–20%' },
  { id: 'highLevelPubs', kd: '5+', wr: '20%+' },
  { id: 'rankedSameKd', kd: 'Usually lower', wr: 'Placement-weighted' },
] as const

const SEO_KEYS = ['s1', 's2', 's3', 's4'] as const

export function KDCalculatorView() {
  const t = useTranslations('tools.kdCalculator')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [kills, setKills] = useState('')
  const [deaths, setDeaths] = useState('')
  const [wins, setWins] = useState('')
  const [matches, setMatches] = useState('')

  const [projKills, setProjKills] = useState('')
  const [projMatches, setProjMatches] = useState('')

  const stats = useMemo(() => {
    const k = parseFloat(kills)
    const d = parseFloat(deaths)
    const w = parseFloat(wins)
    const m = parseFloat(matches)

    if (Number.isNaN(k) || Number.isNaN(d) || d <= 0) return null

    const kd = k / d
    const wr = m > 0 && !Number.isNaN(w) ? (w / m) * 100 : null
    const kpg = m > 0 ? k / m : null

    return { kd, wr, kpg }
  }, [kills, deaths, wins, matches])

  const projected = useMemo(() => {
    const pk = parseFloat(projKills)
    const pm = parseFloat(projMatches)
    const currentKills = parseFloat(kills)
    const currentDeaths = parseFloat(deaths)
    if (!stats || Number.isNaN(pk) || Number.isNaN(pm) || pm <= 0) return null
    if (Number.isNaN(currentKills) || Number.isNaN(currentDeaths)) return null
    // Assume ~1 death per future match (solo BR approximation)
    const newKills = currentKills + pk * pm
    const newDeaths = currentDeaths + pm
    return newKills / newDeaths
  }, [projKills, projMatches, stats, kills, deaths])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href={homeHref} className="hover:text-primary transition-colors">
                {t('home')}
              </Link>
              <span>/</span>
              <Link href={toolsHref} className="hover:text-primary transition-colors">
                {t('tools')}
              </Link>
              <span>/</span>
              <span className="text-foreground">{t('breadcrumb')}</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Inputs */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground mb-5">
                  {t('yourStatsTitle')}
                </h2>
                <div className="flex flex-col gap-4">
                  <StatInput label={t('totalKills')} value={kills} onChange={setKills} placeholder={t('totalKillsPlaceholder')} />
                  <StatInput label={t('totalDeaths')} value={deaths} onChange={setDeaths} placeholder={t('totalDeathsPlaceholder')} />
                  <StatInput label={t('totalWins')} value={wins} onChange={setWins} placeholder={t('totalWinsPlaceholder')} />
                  <StatInput label={t('totalMatches')} value={matches} onChange={setMatches} placeholder={t('totalMatchesPlaceholder')} />
                </div>
              </div>

              {/* Projector */}
              {stats && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground mb-1">
                    {t('projectorTitle')}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">{t('projectorSubtitle')}</p>
                  <div className="flex flex-col gap-3">
                    <StatInput label={t('avgKillsGame')} value={projKills} onChange={setProjKills} placeholder={t('avgKillsPlaceholder')} />
                    <StatInput label={t('futureGames')} value={projMatches} onChange={setProjMatches} placeholder={t('futureGamesPlaceholder')} />
                    {projected !== null && (
                      <div className="mt-1 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('projectedKd')}</span>
                        <span className={`font-display text-2xl font-bold ${getBenchmark(projected, 'kd').color}`}>
                          {projected.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {stats ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label={t('kdRatio')}
                      value={stats.kd.toFixed(2)}
                      benchmark={getBenchmark(stats.kd, 'kd')}
                      benchmarkLabel={t(`benchmarks.${getBenchmark(stats.kd, 'kd').id}`)}
                      sublabel={t('kdAvgSublabel')}
                    />
                    {stats.wr !== null && (
                      <ResultCard
                        label={t('winRate')}
                        value={`${stats.wr.toFixed(1)}%`}
                        benchmark={getBenchmark(stats.wr, 'wr')}
                        benchmarkLabel={t(`benchmarks.${getBenchmark(stats.wr, 'wr').id}`)}
                        sublabel={t('winRateSublabel')}
                      />
                    )}
                    {stats.kpg !== null && (
                      <ResultCard
                        label={t('killsPerGame')}
                        value={stats.kpg.toFixed(2)}
                        benchmark={getBenchmark(stats.kpg, 'kd')}
                        benchmarkLabel={t(`benchmarks.${getBenchmark(stats.kpg, 'kd').id}`)}
                        sublabel={t('killsPerGameSublabel')}
                      />
                    )}
                  </div>

                  {/* K/D explanation */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{t('breakdownTitle')}</h3>
                    <div className="flex flex-col gap-2">
                      {BENCHMARKS.kd.map((b) => (
                        <div
                          key={b.id}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                            stats.kd >= b.min && stats.kd < b.max ? `${b.bg} border ${b.border}` : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {stats.kd >= b.min && stats.kd < b.max ? (
                              <TrendingUp className={`h-3.5 w-3.5 ${b.color}`} />
                            ) : (
                              <Minus className="h-3.5 w-3.5 text-muted-foreground/30" />
                            )}
                            <span className={`text-sm font-medium ${stats.kd >= b.min && stats.kd < b.max ? b.color : 'text-muted-foreground'}`}>
                              {t(`benchmarks.${b.id}`)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{b.max === 999 ? `${b.min}+` : `${b.min} – ${b.max}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground text-sm">
                  {t('emptyState')}
                </div>
              )}

              {/* Context ranges */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{t('contextTitle')}</h3>
                <p className="mb-3 text-xs text-muted-foreground">{t('contextNote')}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('colContext')}</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('colKd')}</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('colWinPct')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {CONTEXT_RANGES.map((p) => (
                        <tr key={p.id}>
                          <td className="py-2 font-medium text-foreground">{t(`contextRanges.${p.id}`)}</td>
                          <td className="py-2 text-right text-muted-foreground">{p.kd}</td>
                          <td className="py-2 text-right text-muted-foreground">{p.wr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SEO content */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">{t('seoTitle')}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              {SEO_KEYS.map((key) => (
                <div key={key}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{t(`seo.${key}h`)}</h3>
                  <p>{t(`seo.${key}p`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-12 border-t border-border pt-10 space-y-3">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{t('relatedTitle')}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('relatedBefore')}{' '}
              <Link href={localizeHref(locale, '/tools/player-stats')} className="text-primary hover:underline">
                {t('relatedTracker')}
              </Link>
              {t('relatedMid1')}{' '}
              <Link href={localizeHref(locale, '/tools/zone-timer')} className="text-primary hover:underline">
                {t('relatedZoneTimer')}
              </Link>
              {t('relatedMid2')}{' '}
              <Link href={toolsHref} className="text-primary hover:underline">
                {t('relatedHub')}
              </Link>
              {t('relatedAfter')}
            </p>
          </section>
        </div>
      </main>
  )
}
