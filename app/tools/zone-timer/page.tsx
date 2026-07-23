'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Play, RotateCcw, SkipForward } from 'lucide-react'

// Fortnite Chapter 6 Season 2 — Solo BR zone timings (seconds)
// waitTime = how long this circle stays open before shrinking starts
// shrinkTime = how long the shrink takes
// damage = DPS while outside the zone
type ZonePhase = {
  phase: number
  label: string
  players: string
  waitTime: number   // seconds before zone starts shrinking
  shrinkTime: number // seconds the shrink takes
  damage: number     // hp/s outside zone
  tip: string
}

const PHASES: ZonePhase[] = [
  { phase: 1, label: 'Circle 1',  players: '100 → ~60', waitTime: 150, shrinkTime: 90,  damage: 1,  tip: 'Use the full wait to loot properly. The zone is massive — start rotating when the timer hits 60 seconds.' },
  { phase: 2, label: 'Circle 2',  players: '~60 → ~35', waitTime: 110, shrinkTime: 75,  damage: 2,  tip: 'Storm deals 2 HP/s. If you are far, start rotating early. One large rotation caught in storm can drain your entire shield.' },
  { phase: 3, label: 'Circle 3',  players: '~35 → ~20', waitTime: 90,  shrinkTime: 60,  damage: 5,  tip: 'Storm now hurts. Prioritise zone over loot. Any player caught outside at this phase is a free kill.' },
  { phase: 4, label: 'Circle 4',  players: '~20 → ~12', waitTime: 60,  shrinkTime: 50,  damage: 7,  tip: 'Zone fights begin. Hold high ground inside the zone and pick off players rotating. Do not chase — let storm do the work.' },
  { phase: 5, label: 'Circle 5',  players: '~12 → ~7',  waitTime: 45,  shrinkTime: 40,  damage: 10, tip: 'Critical phase. Top 10 players are alive. Every fight matters. Heal up before the circle starts moving.' },
  { phase: 6, label: 'Circle 6',  players: '~7 → ~4',   waitTime: 30,  shrinkTime: 30,  damage: 12, tip: 'Keep shields topped. Storm at this stage melts you in 8 seconds flat. Stay inside and build fights carefully.' },
  { phase: 7, label: 'Circle 7',  players: '~4 → ~2',   waitTime: 20,  shrinkTime: 25,  damage: 15, tip: 'Final circles. The zone is tiny. Stay high, control the space, and only commit to fights you can win cleanly.' },
  { phase: 8, label: 'Final Zone',players: '2–1',        waitTime: 10,  shrinkTime: 20,  damage: 20, tip: 'The zone is a few tiles wide. There is nowhere to hide. Win or die.' },
]

type TimerState = 'idle' | 'waiting' | 'shrinking' | 'done'

export default function ZoneTimerPage() {
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
      setElapsed(prev => {
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
    setCurrentPhase(p => Math.min(p + 1, PHASES.length - 1))
  }

  const timeLeft = timerState === 'waiting'
    ? phase.waitTime - elapsed
    : timerState === 'shrinking'
      ? phase.waitTime + phase.shrinkTime - elapsed
      : timerState === 'idle' ? phase.waitTime : 0

  const progress = Math.min(elapsed / totalPhaseTime, 1)
  const waitProgress = Math.min(elapsed / phase.waitTime, 1)
  const shrinkProgress = timerState === 'shrinking'
    ? Math.min((elapsed - phase.waitTime) / phase.shrinkTime, 1)
    : 0

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}:${String(sec).padStart(2, '0')}` : `${sec}s`
  }

  const stateColor =
    timerState === 'waiting'   ? 'text-primary' :
    timerState === 'shrinking' ? 'text-accent' :
    timerState === 'done'      ? 'text-destructive' :
    'text-muted-foreground'

  const stateLabel =
    timerState === 'waiting'   ? 'Waiting — zone open' :
    timerState === 'shrinking' ? 'Zone shrinking now!' :
    timerState === 'done'      ? 'Phase complete' :
    'Press start when the circle appears'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-foreground">Zone Timer</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Zone Timer</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Real wait times and shrink durations for every storm circle in Chapter 6 Season 2. Start the timer when a new zone appears to know exactly when to rotate.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

            {/* Phase selector */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Phase</h2>
              {PHASES.map((p, i) => (
                <button
                  key={p.phase}
                  onClick={() => { setCurrentPhase(i); reset() }}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${
                    currentPhase === i
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-sm font-bold uppercase tracking-wide ${currentPhase === i ? 'text-primary' : 'text-foreground'}`}>
                      {p.label}
                    </span>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="text-primary font-mono">{formatTime(p.waitTime)}</span>
                      <span className="text-accent font-mono">{formatTime(p.shrinkTime)}</span>
                    </div>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{p.players} players &middot; {p.damage} HP/s</div>
                </button>
              ))}
              <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Cyan</span> = wait time &nbsp;
                <span className="text-accent font-semibold">Yellow</span> = shrink time
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
                    <span>Wait: <span className="text-primary font-mono">{formatTime(phase.waitTime)}</span></span>
                    <span>Shrink: <span className="text-accent font-mono">{formatTime(phase.shrinkTime)}</span></span>
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
                    <span>{Math.round(progress * 100)}% complete</span>
                    <span className="text-destructive font-semibold">{phase.damage} HP/s outside</span>
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
                      Start Circle {phase.phase}
                    </button>
                  ) : (
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-foreground hover:border-primary/50 transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </button>
                  )}
                  {currentPhase < PHASES.length - 1 && (
                    <button
                      onClick={nextPhase}
                      className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      <SkipForward className="h-4 w-4" />
                      Next Zone
                    </button>
                  )}
                </div>
              </div>

              {/* Tip */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Phase {phase.phase} Strategy</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{phase.tip}</p>
              </div>

              {/* Storm damage reference */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Storm Damage Reference</h3>
                <div className="grid grid-cols-4 gap-1.5">
                  {PHASES.map(p => (
                    <div key={p.phase} className={`rounded-lg border p-2 text-center ${currentPhase === p.phase - 1 ? 'border-primary bg-primary/10' : 'border-border bg-muted/30'}`}>
                      <div className="text-xs text-muted-foreground">Circle {p.phase}</div>
                      <div className={`font-display text-lg font-bold ${p.damage >= 10 ? 'text-destructive' : p.damage >= 5 ? 'text-accent' : 'text-primary'}`}>{p.damage}</div>
                      <div className="text-xs text-muted-foreground">HP/s</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO content */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">Understanding Fortnite Storm Timing</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Why Zone Timing Matters</h3>
                <p>One of the most common ways players die in Fortnite is being caught outside the zone. Knowing exactly how long you have before a zone starts shrinking — and how fast it moves — lets you make informed decisions about when to start rotating rather than guessing.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">When to Rotate</h3>
                <p>As a general rule, start your rotation when there is 30–40% of the wait timer remaining. This gives you enough time to travel on foot, accounting for fights, looting, and terrain obstacles. Players who wait until the zone starts shrinking are often caught in a running fight while taking storm damage — a difficult scenario to recover from.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Late Game Storm Damage</h3>
                <p>Storm damage scales significantly in later circles. Circle 1 deals just 1 HP per second, but by Circle 6 it deals 12 HP/s, meaning a player with 200 HP can only survive 16 seconds outside the zone without any heals. Circle 8 deals 20 HP/s — a full elimination in 10 seconds.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Storm Surge</h3>
                <p>In addition to the main storm, Fortnite has a Storm Surge mechanic in later circles that targets players with low damage dealt. If you are in the bottom half of remaining players by damage dealt, Storm Surge begins dealing additional damage to you. This punishes passive play and forces action in late game scenarios.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
