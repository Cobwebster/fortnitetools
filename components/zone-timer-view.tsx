'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { Play, RotateCcw, SkipForward } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'

// Fortnite Chapter 7 Season 3 — Solo BR zone timings (seconds, community reference)
// waitTime = how long this circle stays open before shrinking starts
// shrinkTime = how long the shrink takes
// damage = DPS while outside the zone
type ZonePhase = {
  phase: number
  id: string
  waitTime: number // seconds before zone starts shrinking
  shrinkTime: number // seconds the shrink takes
  damage: number // hp/s outside zone
}

const PHASES: ZonePhase[] = [
  { phase: 1, id: 'p1', waitTime: 150, shrinkTime: 90, damage: 1 },
  { phase: 2, id: 'p2', waitTime: 110, shrinkTime: 75, damage: 2 },
  { phase: 3, id: 'p3', waitTime: 90, shrinkTime: 60, damage: 5 },
  { phase: 4, id: 'p4', waitTime: 60, shrinkTime: 50, damage: 7 },
  { phase: 5, id: 'p5', waitTime: 45, shrinkTime: 40, damage: 10 },
  { phase: 6, id: 'p6', waitTime: 30, shrinkTime: 30, damage: 12 },
  { phase: 7, id: 'p7', waitTime: 20, shrinkTime: 25, damage: 15 },
  { phase: 8, id: 'p8', waitTime: 10, shrinkTime: 20, damage: 20 },
]

const SEO_KEYS = ['s1', 's2', 's3', 's4'] as const

type TimerState = 'idle' | 'waiting' | 'shrinking' | 'done'

export function ZoneTimerView() {
  const t = useTranslations('tools.zoneTimer')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [currentPhase, setCurrentPhase] = useState(0)
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const phase = PHASES[currentPhase]
  const totalPhaseTime = phase.waitTime + phase.shrinkTime

  const clearTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    setElapsed(0)
    setTimerState('waiting')
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1
        if (next >= phase.waitTime + phase.shrinkTime) {
          clearTimer()
          setTimerState('done')
          return next
        }
        return next
      })
    }, 1000)
  }, [clearTimer, phase])

  useEffect(() => () => clearTimer(), [clearTimer])

  useEffect(() => {
    if (timerState === 'waiting' && elapsed >= phase.waitTime) {
      setTimerState('shrinking')
    }
  }, [elapsed, timerState, phase.waitTime])

  const reset = () => {
    clearTimer()
    setElapsed(0)
    setTimerState('idle')
  }

  const nextPhase = () => {
    clearTimer()
    setElapsed(0)
    setTimerState('idle')
    setCurrentPhase((p) => Math.min(p + 1, PHASES.length - 1))
  }

  const timeLeft =
    timerState === 'waiting'
      ? phase.waitTime - elapsed
      : timerState === 'shrinking'
        ? phase.waitTime + phase.shrinkTime - elapsed
        : timerState === 'idle'
          ? phase.waitTime
          : 0

  const progress = Math.min(elapsed / totalPhaseTime, 1)
  const waitProgress = Math.min(elapsed / phase.waitTime, 1)
  const shrinkProgress = timerState === 'shrinking' ? Math.min((elapsed - phase.waitTime) / phase.shrinkTime, 1) : 0

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}:${String(sec).padStart(2, '0')}` : `${sec}s`
  }

  const stateColor =
    timerState === 'waiting'
      ? 'text-primary'
      : timerState === 'shrinking'
        ? 'text-accent'
        : timerState === 'done'
          ? 'text-destructive'
          : 'text-muted-foreground'

  const stateLabel =
    timerState === 'waiting'
      ? t('stateWaiting')
      : timerState === 'shrinking'
        ? t('stateShrinking')
        : timerState === 'done'
          ? t('stateDone')
          : t('stateIdle')

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
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

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Phase selector */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('selectPhase')}</h2>
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentPhase(i)
                  reset()
                }}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  currentPhase === i ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-display text-sm font-bold uppercase tracking-wide ${currentPhase === i ? 'text-primary' : 'text-foreground'}`}>
                    {t(`phases.${p.id}.label`)}
                  </span>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="text-primary font-mono">{formatTime(p.waitTime)}</span>
                    <span className="text-accent font-mono">{formatTime(p.shrinkTime)}</span>
                  </div>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t(`phases.${p.id}.players`)} {t('playersSuffix')} &middot; {p.damage} {t('hpsSuffix')}
                </div>
              </button>
            ))}
            <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
              <span className="text-primary font-semibold">{t('legendWait')}</span> {t('legendWaitSuffix')} &nbsp;
              <span className="text-accent font-semibold">{t('legendShrink')}</span> {t('legendShrinkSuffix')}
            </div>
          </div>

          {/* Timer */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="rounded-xl border border-border bg-card p-7 flex flex-col items-center gap-6">
              {/* Big timer */}
              <div className="text-center">
                <div className={`font-display text-8xl font-bold tabular-nums leading-none ${stateColor}`}>
                  {formatTime(Math.max(0, timeLeft))}
                </div>
                <div className={`mt-2 text-sm font-semibold ${stateColor}`}>{stateLabel}</div>
              </div>

              {/* Progress bars */}
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
                  <span>
                    {t('waitLabel')}: <span className="text-primary font-mono">{formatTime(phase.waitTime)}</span>
                  </span>
                  <span>
                    {t('shrinkLabel')}: <span className="text-accent font-mono">{formatTime(phase.shrinkTime)}</span>
                  </span>
                </div>
                {/* Combined bar */}
                <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${(phase.waitTime / totalPhaseTime) * waitProgress * 100}%` }}
                  />
                  <div
                    className="h-full bg-accent transition-all duration-1000 ease-linear"
                    style={{ width: `${(phase.shrinkTime / totalPhaseTime) * shrinkProgress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t('percentComplete', { percent: Math.round(progress * 100) })}</span>
                  <span className="text-destructive font-semibold">{t('outsideDamage', { damage: phase.damage })}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {timerState === 'idle' || timerState === 'done' ? (
                  <button
                    onClick={startTimer}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Play className="h-4 w-4" />
                    {t('startCircle', { phase: phase.phase })}
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-foreground hover:border-primary/50 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    {t('reset')}
                  </button>
                )}
                {currentPhase < PHASES.length - 1 && (
                  <button
                    onClick={nextPhase}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <SkipForward className="h-4 w-4" />
                    {t('nextZone')}
                  </button>
                )}
              </div>
            </div>

            {/* Tip */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{t('strategyTitle', { phase: phase.phase })}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(`phases.${phase.id}.tip`)}</p>
            </div>

            {/* Storm damage reference */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{t('damageRefTitle')}</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {PHASES.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-lg border p-2 text-center ${
                      currentPhase === p.phase - 1 ? 'border-primary bg-primary/10' : 'border-border bg-muted/30'
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">{t('circleLabel', { phase: p.phase })}</div>
                    <div className={`font-display text-lg font-bold ${p.damage >= 10 ? 'text-destructive' : p.damage >= 5 ? 'text-accent' : 'text-primary'}`}>
                      {p.damage}
                    </div>
                    <div className="text-xs text-muted-foreground">{t('hpsSuffix')}</div>
                  </div>
                ))}
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
            <Link href={localizeHref(locale, '/tools/kd-calculator')} className="text-primary hover:underline">
              {t('relatedKd')}
            </Link>
            {t('relatedMid1')}{' '}
            <Link href={localizeHref(locale, '/tools/fps-settings')} className="text-primary hover:underline">
              {t('relatedFps')}
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
