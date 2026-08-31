'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { Info, CheckCircle2, Circle } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'
import { seasonEndDate } from '@/lib/season'

// Chapter 7 Season 4 (Override) Battle Pass planning model — Aug–Nov 2026
// 100 reward levels. XP-per-level and weekly sources are estimates; quest values change.
const XP_PER_LEVEL = 80_000
const TOTAL_LEVELS = 100

const WEEKLY_SOURCES = [
  { id: 'quests_weekly',  label: 'Weekly Quests (5 completed)',       xp: 150_000, default: true },
  { id: 'quests_daily',   label: 'Daily Quests (7 days × 5 quests)',  xp: 350_000, default: true },
  { id: 'matches_played', label: 'Regular matches played (14/week)',   xp: 140_000, default: true },
  { id: 'medals',         label: 'Match medals & placement XP',        xp:  80_000, default: false },
  { id: 'punch_cards',    label: 'Punch card milestones',              xp: 100_000, default: false },
  { id: 'crew',           label: 'Fortnite Crew bonus XP (weekly)',    xp:  50_000, default: false },
  { id: 'reload',         label: 'Fortnite Reload matches (14/week)',  xp: 120_000, default: false },
  { id: 'lego',           label: 'LEGO Fortnite play (2hrs/day)',      xp: 196_000, default: false },
  { id: 'rocket',         label: 'Rocket Racing (10 races/week)',      xp:  60_000, default: false },
  { id: 'festival',       label: 'Festival concerts / events',         xp:  40_000, default: false },
]

// Chapter 7 Season 4: August 20 – November 1, 2026
const SEASON_END = seasonEndDate()

function defaultWeeksRemaining() {
  const ms = SEASON_END.getTime() - Date.now()
  const weeks = Math.max(1, Math.ceil(ms / (7 * 24 * 60 * 60 * 1000)))
  return String(Math.min(12, weeks))
}

export function BattlePassXpCalculatorView() {
  const t = useTranslations('tools.battlePassXp')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [currentLevel, setCurrentLevel] = useState('1')
  const [currentLevelXP, setCurrentLevelXP] = useState('0')
  const [targetLevel, setTargetLevel] = useState('100')
  const [weeksRemaining, setWeeksRemaining] = useState(defaultWeeksRemaining)
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(WEEKLY_SOURCES.map(s => [s.id, s.default]))
  )

  const toggle = (id: string) => setEnabled(prev => ({ ...prev, [id]: !prev[id] }))

  const results = useMemo(() => {
    const curLvl = Math.min(Math.max(parseInt(currentLevel) || 1, 1), TOTAL_LEVELS)
    const curXP  = Math.min(Math.max(parseInt(currentLevelXP) || 0, 0), XP_PER_LEVEL - 1)
    const tgtLvl = Math.min(Math.max(parseInt(targetLevel) || 100, curLvl), TOTAL_LEVELS)
    const weeks  = Math.max(parseInt(weeksRemaining) || 1, 1)

    const levelsNeeded = tgtLvl - curLvl
    const xpAlreadyInLevel = curXP
    const xpNeeded = levelsNeeded * XP_PER_LEVEL - xpAlreadyInLevel
    const weeklyXP = WEEKLY_SOURCES.filter(s => enabled[s.id]).reduce((acc, s) => acc + s.xp, 0)
    const totalAvailableXP = weeklyXP * weeks
    const projectedLevels = Math.floor((totalAvailableXP + xpAlreadyInLevel) / XP_PER_LEVEL) + curLvl
    const xpPerWeekNeeded = weeks > 0 ? Math.ceil(xpNeeded / weeks) : xpNeeded
    const willComplete = totalAvailableXP >= xpNeeded
    const weeklyProgress = weeklyXP > 0 ? weeklyXP / XP_PER_LEVEL : 0
    const levelsPerWeek = weeklyProgress

    return { levelsNeeded, xpNeeded, weeklyXP, totalAvailableXP, projectedLevels, xpPerWeekNeeded, willComplete, levelsPerWeek, tgtLvl, curLvl, weeks }
  }, [currentLevel, currentLevelXP, targetLevel, weeksRemaining, enabled])

  const progressPct = Math.min(100, (results.totalAvailableXP / Math.max(results.xpNeeded, 1)) * 100)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-primary transition-colors">{t('home')}</Link>
            <span>/</span>
            <Link href={toolsHref} className="hover:text-primary transition-colors">{t('tools')}</Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
            {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* Left: inputs */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Current progress */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{t('progressTitle')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cur-level" className="block text-xs font-semibold text-muted-foreground mb-1">{t('currentLevel')}</label>
                  <input
                    id="cur-level"
                    type="number"
                    min="1"
                    max="100"
                    value={currentLevel}
                    onChange={e => setCurrentLevel(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cur-xp" className="block text-xs font-semibold text-muted-foreground mb-1">{t('currentLevelXp')}</label>
                  <input
                    id="cur-xp"
                    type="number"
                    min="0"
                    max="79999"
                    step="1000"
                    value={currentLevelXP}
                    onChange={e => setCurrentLevelXP(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="tgt-level" className="block text-xs font-semibold text-muted-foreground mb-1">{t('targetLevel')}</label>
                  <input
                    id="tgt-level"
                    type="number"
                    min="1"
                    max="100"
                    value={targetLevel}
                    onChange={e => setTargetLevel(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="weeks" className="block text-xs font-semibold text-muted-foreground mb-1">{t('weeksRemaining')}</label>
                  <input
                    id="weeks"
                    type="number"
                    min="1"
                    max={12}
                    value={weeksRemaining}
                    onChange={e => setWeeksRemaining(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            </div>

            {/* XP sources */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-1">{t('sourcesTitle')}</h2>
              <p className="text-xs text-muted-foreground mb-4">{t('sourcesHint')}</p>
              <div className="flex flex-col gap-2">
                {WEEKLY_SOURCES.map(source => (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => toggle(source.id)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted transition-colors w-full"
                  >
                    {enabled[source.id]
                      ? <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      : <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">{source.label}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                      {t('perWeek', { xp: (source.xp / 1000).toFixed(0) })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Verdict */}
            <div className={`rounded-xl border p-5 ${results.willComplete ? 'border-primary/40 bg-primary/5' : 'border-destructive/40 bg-destructive/5'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${results.willComplete ? 'text-primary' : 'text-destructive'}`}>
                {results.willComplete ? t('onTrack') : t('behindSchedule')}
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {results.willComplete
                  ? t('onTrackMsg', { target: results.tgtLvl, projected: Math.min(results.projectedLevels, 100) })
                  : t('behindMsg', { xp: (results.xpNeeded - results.totalAvailableXP).toLocaleString() })
                }
              </p>
            </div>

            {/* Stats */}
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{t('xpNeededLabel', { level: results.tgtLvl })}</p>
                <p className="font-display text-2xl font-bold text-foreground">{results.xpNeeded.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{t('weeklyXpLabel')}</p>
                <p className="font-display text-2xl font-bold text-foreground">{results.weeklyXP.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t('levelsPerWeek', { levels: results.levelsPerWeek.toFixed(1) })}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{t('totalAvailableLabel', { weeks: results.weeks })}</p>
                <p className="font-display text-2xl font-bold text-foreground">{results.totalAvailableXP.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{t('projectedLabel')}</p>
                <p className={`font-display text-2xl font-bold ${results.projectedLevels >= results.tgtLvl ? 'text-primary' : 'text-destructive'}`}>
                  {t('projectedLevelText', { level: Math.min(results.projectedLevels, 100) })}{results.projectedLevels > 100 ? t('bonusSuffix') : ''}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{t('coverageLabel')}</span>
                  <span>{Math.round(progressPct)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${progressPct >= 100 ? 'bg-primary' : 'bg-destructive'}`}
                    style={{ width: `${Math.min(progressPct, 100)}%` }}
                  />
                </div>
              </div>

              {!results.willComplete && (
                <div className="rounded-lg bg-muted px-3 py-2.5">
                  <p className="text-xs text-muted-foreground">
                    {t('needMorePrefix')} <strong className="text-foreground">{t('needMoreXp', { xp: results.xpPerWeekNeeded.toLocaleString() })}</strong>{' '}
                    {t('needMoreSuffix')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2">{t('howTitle')}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">{t('howP1')}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('howP2')}</p>
            </div>
          </div>
        </div>

        <section className="mt-12 border-t border-border pt-10 space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            {t('relatedTitle')}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('relatedBefore')}{' '}
            <Link href={localizeHref(locale, '/tools/vbucks-calculator')} className="text-primary hover:underline">
              {t('relatedVbucks')}
            </Link>
            {t('relatedMid1')}{' '}
            <Link href={localizeHref(locale, '/tools/player-stats')} className="text-primary hover:underline">
              {t('relatedTracker')}
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
