'use client'

import { useEffect, useState } from 'react'
import {
  CURRENT_SEASON,
  formatSeasonLongDate,
  getSeasonCountdown,
  nextSeasonStartDate,
  pad2,
  seasonEndDate,
  type SeasonCountdownParts,
} from '@/lib/season'

function useSeasonCountdown() {
  // null until mount — avoids SSR/client clock mismatch hydration errors
  const [parts, setParts] = useState<SeasonCountdownParts | null>(null)

  useEffect(() => {
    setParts(getSeasonCountdown())
    const id = window.setInterval(() => setParts(getSeasonCountdown()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return parts
}

function DigitBlock({
  value,
  label,
  compact,
}: {
  value: string
  label: string
  compact?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={
          compact
            ? 'min-w-[3.25rem] rounded-lg border border-border bg-background/80 px-2 py-3 text-center sm:min-w-[4rem] sm:px-3 sm:py-4'
            : 'min-w-[4.5rem] rounded-lg border border-border bg-background/80 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:min-w-[5.5rem] sm:px-4 sm:py-5'
        }
        aria-hidden="true"
      >
        <span
          className={
            compact
              ? 'font-display text-3xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-4xl'
              : 'font-display text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl md:text-6xl'
          }
        >
          {value}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function SeasonCountdownClient({ compact = false }: { compact?: boolean }) {
  const c = useSeasonCountdown()
  const endLabel = formatSeasonLongDate(seasonEndDate())
  const nextLabel = formatSeasonLongDate(nextSeasonStartDate())
  const ready = c !== null
  const pctRounded = ready ? Math.round(c.progressPct) : 0

  return (
    <div className={compact ? 'space-y-5' : 'space-y-8'}>
      <div className="space-y-3">
        <p
          className={
            compact
              ? 'text-sm leading-relaxed text-muted-foreground sm:text-base'
              : 'text-base leading-relaxed text-muted-foreground sm:text-lg'
          }
          suppressHydrationWarning
        >
          {!ready ? (
            <>
              Loading live <strong className="text-foreground">{CURRENT_SEASON.label}</strong> countdown…
            </>
          ) : c.ended ? (
            <>
              <strong className="text-foreground">{CURRENT_SEASON.label}</strong> has ended.{' '}
              <strong className="text-foreground">{CURRENT_SEASON.next.label}</strong> is live.
            </>
          ) : (
            <>
              <strong className="text-foreground">{CURRENT_SEASON.label}</strong> (
              {CURRENT_SEASON.codename}) is{' '}
              <strong className="text-foreground">{pctRounded}% complete</strong>. There{' '}
              {c.daysRemaining === 1 ? 'is' : 'are'}{' '}
              <strong className="text-foreground">
                {c.daysRemaining} {c.daysRemaining === 1 ? 'day' : 'days'} remaining
              </strong>
              .
            </>
          )}
        </p>

        {compact ? null : (
          <>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={pctRounded}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${CURRENT_SEASON.label} progress`}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                style={{ width: ready ? `${pctRounded}%` : '0%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground tabular-nums">
              {ready ? `${pctRounded}% of the season complete` : 'Calculating progress…'}
            </p>
          </>
        )}
      </div>

      <div
        className="flex flex-wrap items-end justify-center gap-2 sm:gap-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {!ready ? (
          <>
            <DigitBlock value="--" label="Days" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value="--" label="Hours" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value="--" label="Mins" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value="--" label="Secs" compact={compact} />
          </>
        ) : c.ended ? (
          <p className="font-display text-3xl font-bold uppercase tracking-wide text-primary sm:text-4xl">
            Season ended
          </p>
        ) : (
          <>
            <DigitBlock value={pad2(c.days)} label="Days" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value={pad2(c.hours)} label="Hours" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value={pad2(c.minutes)} label="Mins" compact={compact} />
            <span className="mb-8 font-display text-3xl font-bold text-muted-foreground sm:mb-10 sm:text-4xl">
              :
            </span>
            <DigitBlock value={pad2(c.seconds)} label="Secs" compact={compact} />
          </>
        )}
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <p className="text-base text-foreground sm:text-lg">
          <strong>{CURRENT_SEASON.label}</strong> ends on{' '}
          <strong className="text-primary">{endLabel}</strong>
        </p>
        <p className="text-base text-muted-foreground sm:text-lg">
          <strong className="text-foreground">{CURRENT_SEASON.next.label}</strong> starts on{' '}
          <strong className="text-foreground">{nextLabel}</strong>
        </p>
      </div>
    </div>
  )
}
