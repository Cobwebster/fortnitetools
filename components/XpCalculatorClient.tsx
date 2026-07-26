'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CURRENT_SEASON,
  getSeasonCountdown,
} from '@/lib/season'
import {
  PLAYTIME_MODES,
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

type Tab = 'calculator' | 'per-level'

export function XpCalculatorClient() {
  const [season, setSeason] = useState<ReturnType<typeof getSeasonCountdown> | null>(null)
  const [tab, setTab] = useState<Tab>('calculator')
  const [currentLevel, setCurrentLevel] = useState('1')
  const [targetLevel, setTargetLevel] = useState('100')

  useEffect(() => {
    setSeason(getSeasonCountdown())
  }, [])

  const cur = clampLevel(parseInt(currentLevel, 10) || 1)
  const tgt = clampLevel(parseInt(targetLevel, 10) || 100)
  const days = Math.max(1, season?.daysRemaining ?? 1)
  const pct = season ? Math.round(season.progressPct) : null

  const pace100 = season ? onPaceLevel(100, season.progressPct) : null
  const pace200 = season ? onPaceLevel(200, season.progressPct) : null

  const xpNeeded = xpBetweenLevels(cur, tgt)
  const daily = dailyXpNeeded(cur, tgt, days)
  const levelsNeeded = Math.max(0, tgt - cur)

  const perLevelRows = useMemo(() => buildXpPerLevelTable(XP_LEVEL_CAP), [])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="XP calculator views">
        {(
          [
            { id: 'calculator' as const, label: 'XP Calculator' },
            { id: 'per-level' as const, label: 'XP Per Level' },
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
      ) : (
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
      )}
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
