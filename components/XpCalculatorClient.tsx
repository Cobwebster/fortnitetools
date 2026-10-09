'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from '@/components/link'
import {
  CURRENT_SEASON,
  getSeasonCountdown,
} from '@/lib/season'
import {
  PLAYTIME_MODES,
  WEEKLY_XP_SOURCES,
  XP_LEVEL_CAP,
  XP_PER_LEVEL,
  buildXpPerLevelTable,
  clampLevel,
  dailyXpNeeded,
  formatDuration,
  formatXp,
  minutesForXp,
  onPaceLevel,
  totalXpToLevel,
  xpBetweenLevels,
} from '@/lib/xp-calculator'

type Tab = 'calculator' | 'weekly' | 'per-level'

export function XpCalculatorClient() {
  const [season, setSeason] = useState<ReturnType<typeof getSeasonCountdown> | null>(null)
  const [tab, setTab] = useState<Tab>('calculator')
  const [currentLevel, setCurrentLevel] = useState('1')
  const [targetLevel, setTargetLevel] = useState('100')
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(WEEKLY_XP_SOURCES.map((s) => [s.id, s.default]))
  )

  useEffect(() => {
    setSeason(getSeasonCountdown())
  }, [])

  const cur = clampLevel(parseInt(currentLevel, 10) || 1)
  const tgt = clampLevel(parseInt(targetLevel, 10) || 100)
  const days = Math.max(1, season?.daysRemaining ?? 1)
  const weeks = Math.max(1, Math.ceil(days / 7))
  const pct = season ? Math.round(season.progressPct) : null

  const pace100 = season ? onPaceLevel(100, season.progressPct) : null
  const pace200 = season ? onPaceLevel(200, season.progressPct) : null

  const xpNeeded = xpBetweenLevels(cur, tgt)
  const daily = dailyXpNeeded(cur, tgt, days)
  const levelsNeeded = Math.max(0, tgt - cur)

  const weeklyXp = WEEKLY_XP_SOURCES.filter((s) => enabled[s.id]).reduce((acc, s) => acc + s.xp, 0)
  const totalWeeklyPlan = weeklyXp * weeks
  const projectedLevel = Math.min(
    XP_LEVEL_CAP,
    cur + Math.floor(totalWeeklyPlan / XP_PER_LEVEL)
  )
  const onTrackWeekly = totalWeeklyPlan >= xpNeeded

  const perLevelRows = useMemo(() => buildXpPerLevelTable(XP_LEVEL_CAP), [])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="XP calculator views">
        {(
          [
            { id: 'calculator' as const, label: 'Daily pace' },
            { id: 'weekly' as const, label: 'Weekly planner' },
            { id: 'per-level' as const, label: 'XP per level' },
          ] as const
        ).map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {pct == null || !season ? (
          <>Loading season progress…</>
        ) : (
          <>
            {CURRENT_SEASON.label.replace('Chapter 7 ', '')} is{' '}
            <strong className="text-foreground">{pct}% complete</strong>. There{' '}
            {season.daysRemaining === 1 ? 'is' : 'are'}{' '}
            <strong className="text-foreground">
              {season.daysRemaining} {season.daysRemaining === 1 ? 'day' : 'days'} remaining
            </strong>
            .{' '}
            <Link href="/season-countdown" className="text-primary hover:underline">
              Full season countdown
            </Link>
          </>
        )}
      </p>

      {tab === 'calculator' ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <PaceCard title="To reach level 100" level={pace100} />
            <PaceCard title="To reach level 200" level={pace200} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Current level
              </span>
              <input
                type="number"
                min={1}
                max={XP_LEVEL_CAP}
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-lg font-semibold tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Target level
              </span>
              <input
                type="number"
                min={1}
                max={XP_LEVEL_CAP}
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-lg font-semibold tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {[100, 150, 200].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTargetLevel(String(n))}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                Goal {n}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card px-5 py-6 text-center sm:text-left">
            {xpNeeded <= 0 ? (
              <p className="font-display text-2xl font-bold uppercase tracking-wide text-primary">
                You already reached level {tgt}
              </p>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  You need
                </p>
                <p className="mt-1 font-display text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">
                  {formatXp(daily)}{' '}
                  <span className="text-2xl text-primary sm:text-3xl">XP daily</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {formatXp(xpNeeded)} XP total · {levelsNeeded} levels · {formatXp(XP_PER_LEVEL)} XP
                  per level · {days} days left
                </p>
              </>
            )}
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Playtime XP
            </h2>
            <p className="text-sm text-muted-foreground">
              Approximate XP per minute of playtime. Use these to estimate how long it takes to hit
              today&apos;s daily target ({formatXp(daily)} XP).
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-2.5 font-semibold">Mode</th>
                    <th className="px-3 py-2.5 font-semibold text-right">XP / min</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Weekly limit</th>
                    <th className="px-4 py-2.5 font-semibold text-right">Time for daily XP</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAYTIME_MODES.map((mode) => {
                    const mins = minutesForXp(daily, mode.xpPerMinute)
                    return (
                      <tr key={mode.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-foreground">{mode.name}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                          {formatXp(mode.xpPerMinute)}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                          {mode.weeklyLimit > 0 ? formatXp(mode.weeklyLimit) : '—'}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-foreground">
                          {xpNeeded <= 0 ? '—' : formatDuration(mins)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              Creative weekly limit shows as — when no separate playtime cap is listed (maps still
              follow Epic&apos;s Creative XP rules). Rates are community references and can change
              after patches.
            </p>
          </section>
        </>
      ) : null}

      {tab === 'weekly' ? (
        <section className="space-y-4">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Weekly Battle Pass planner
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Toggle the XP sources you actually do. Estimates only — quest values move mid-season.
              About <strong className="text-foreground">{weeks} weeks</strong> left from today&apos;s
              countdown.
            </p>
          </div>
          <ul className="space-y-2">
            {WEEKLY_XP_SOURCES.map((source) => {
              const on = enabled[source.id]
              return (
                <li key={source.id}>
                  <button
                    type="button"
                    onClick={() => setEnabled((prev) => ({ ...prev, [source.id]: !prev[source.id] }))}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                      on
                        ? 'border-primary/50 bg-primary/10 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    <span className="font-medium">{source.label}</span>
                    <span className="shrink-0 tabular-nums font-semibold text-primary">
                      {formatXp(source.xp)} / wk
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="rounded-xl border border-border bg-card px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {onTrackWeekly ? 'On track' : 'Behind pace'}
            </p>
            <p className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              ~Level {projectedLevel}{' '}
              <span className="text-base font-semibold normal-case tracking-normal text-muted-foreground">
                if you keep this week every week
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatXp(weeklyXp)} XP / week · {formatXp(totalWeeklyPlan)} XP over {weeks} weeks · need{' '}
              {formatXp(xpNeeded)} XP to hit level {tgt}
            </p>
          </div>
        </section>
      ) : null}

      {tab === 'per-level' ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            XP per level
          </h2>
          <p className="text-sm text-muted-foreground">
            Every level costs a flat <strong className="text-foreground">{formatXp(XP_PER_LEVEL)} XP</strong>.
            Level 100 = {formatXp(totalXpToLevel(100))} XP from level 1. Level 200 ={' '}
            {formatXp(totalXpToLevel(200))} XP.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border max-h-[28rem]">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border bg-muted/40 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2.5 font-semibold">Level</th>
                  <th className="px-3 py-2.5 font-semibold text-right">XP to next</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Total XP</th>
                </tr>
              </thead>
              <tbody>
                {perLevelRows.map((row) => (
                  <tr key={row.level} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2 tabular-nums text-foreground">
                      {row.level} → {row.level + 1}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {formatXp(row.xpToNext)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums font-medium text-foreground">
                      {formatXp(row.totalXp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function PaceCard({ title, level }: { title: string; level: number | null }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Be level{' '}
        <strong className="font-display text-2xl font-bold text-foreground">
          {level == null ? '—' : level}
        </strong>{' '}
        today
      </p>
    </div>
  )
}
