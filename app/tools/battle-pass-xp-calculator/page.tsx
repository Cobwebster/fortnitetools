'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Info, CheckCircle2, Circle } from 'lucide-react'

// Chapter 7 Season 3 (Runners) Battle Pass planning model — July 2026
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

// Chapter 7 Season 3: June 6 – August 19, 2026
const SEASON_END = new Date('2026-08-19T00:00:00Z')

function defaultWeeksRemaining() {
  const ms = SEASON_END.getTime() - Date.now()
  const weeks = Math.max(1, Math.ceil(ms / (7 * 24 * 60 * 60 * 1000)))
  return String(Math.min(12, weeks))
}

export default function XPCalculatorPage() {
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
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
              <span>/</span>
              <span className="text-foreground">Battle Pass XP Calculator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Battle Pass XP <span className="text-primary">Calculator</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Find out if you can finish the Battle Pass before the season ends. Enter your current level and check off the XP sources you play each week.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

            {/* Left: inputs */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {/* Current progress */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Your Current Progress</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cur-level" className="block text-xs font-semibold text-muted-foreground mb-1">Current Level</label>
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
                    <label htmlFor="cur-xp" className="block text-xs font-semibold text-muted-foreground mb-1">XP into Current Level</label>
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
                    <label htmlFor="tgt-level" className="block text-xs font-semibold text-muted-foreground mb-1">Target Level</label>
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
                    <label htmlFor="weeks" className="block text-xs font-semibold text-muted-foreground mb-1">Weeks Remaining</label>
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
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-1">Weekly XP Sources</h2>
                <p className="text-xs text-muted-foreground mb-4">Check every source you realistically complete each week.</p>
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
                        +{(source.xp / 1000).toFixed(0)}K/wk
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
                  {results.willComplete ? 'On Track' : 'Behind Schedule'}
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {results.willComplete
                    ? `You will reach Level ${results.tgtLvl} with your current play habits. You are projected to hit Level ${Math.min(results.projectedLevels, 100)}.`
                    : `You need ${(results.xpNeeded - results.totalAvailableXP).toLocaleString()} more XP than you will earn. Enable more sources or play more consistently.`
                  }
                </p>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">XP needed to reach Level {results.tgtLvl}</p>
                  <p className="font-display text-2xl font-bold text-foreground">{results.xpNeeded.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Weekly XP (selected sources)</p>
                  <p className="font-display text-2xl font-bold text-foreground">{results.weeklyXP.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{results.levelsPerWeek.toFixed(1)} levels/week</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Total available XP ({results.weeks} weeks)</p>
                  <p className="font-display text-2xl font-bold text-foreground">{results.totalAvailableXP.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Projected final level</p>
                  <p className={`font-display text-2xl font-bold ${results.projectedLevels >= results.tgtLvl ? 'text-primary' : 'text-destructive'}`}>
                    Level {Math.min(results.projectedLevels, 100)}{results.projectedLevels > 100 ? ' (bonus)' : ''}
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>XP coverage</span>
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
                      You need <strong className="text-foreground">{results.xpPerWeekNeeded.toLocaleString()} XP/week</strong> to finish on time.
                      Try enabling LEGO Fortnite or Rocket Racing for extra XP.
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
                <h2 className="text-sm font-semibold text-foreground mb-2">How Fortnite Battle Pass XP works</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                  This planner uses a simplified model of about{' '}
                  <strong className="text-foreground">80,000 XP per level</strong> toward a 100-level pass.
                  Real quest values, XP boosts, and caps change during the season — use the result as a grind plan, not a guarantee.
                  Chapter 7 Season 3 (Runners) is scheduled through{' '}
                  <strong className="text-foreground">August 19, 2026</strong>.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Weekly and daily quests are usually the most reliable XP. Modes like LEGO Fortnite can add a lot of
                  passive XP but are often capped — confirm current rates in-game before relying on them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
