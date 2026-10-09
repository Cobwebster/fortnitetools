'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/link'
import {
  CURRENT_SEASON,
  formatSeasonLongDate,
  getSeasonCountdown,
  nextSeasonStartDate,
  pad2,
} from '@/lib/season'
import type { StatusToneKind } from '@/lib/status-tone'

export type { StatusToneKind }

type Props = {
  tone: StatusToneKind
  headline: string
  description: string
  updatedLabel: string | null
  componentCount: number
  incidentCount: number
  fetchOk: boolean
}

const TONE = {
  ok: {
    word: 'Online',
    sub: 'Epic’s board looks clear',
    orb: 'bg-emerald-400',
    ring: 'border-emerald-400/40',
    glow: 'rgba(52, 211, 153, 0.35)',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
  },
  warn: {
    word: 'Issues',
    sub: 'Epic flagged something',
    orb: 'bg-amber-400',
    ring: 'border-amber-400/45',
    glow: 'rgba(251, 191, 36, 0.35)',
    badge: 'bg-amber-500/15 text-amber-200 border-amber-400/40',
  },
  bad: {
    word: 'Down',
    sub: 'Epic reports an outage',
    orb: 'bg-rose-500',
    ring: 'border-rose-500/45',
    glow: 'rgba(244, 63, 94, 0.4)',
    badge: 'bg-rose-500/15 text-rose-200 border-rose-500/40',
  },
  unknown: {
    word: 'Unknown',
    sub: 'Could not reach Epic’s board',
    orb: 'bg-muted-foreground',
    ring: 'border-border',
    glow: 'rgba(148, 163, 184, 0.25)',
    badge: 'bg-muted text-muted-foreground border-border',
  },
} as const

function MiniCountdown() {
  const [parts, setParts] = useState<ReturnType<typeof getSeasonCountdown> | null>(null)
  useEffect(() => {
    setParts(getSeasonCountdown())
    const id = window.setInterval(() => setParts(getSeasonCountdown()), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (!parts) {
    return (
      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
        Loading Override timer…
      </p>
    )
  }

  if (parts.ended) {
    return (
      <p className="text-sm text-muted-foreground">
        Override countdown elapsed — expect season-flip queues, not a mystery outage.
      </p>
    )
  }

  const cells = [
    { v: pad2(parts.days), l: 'Days' },
    { v: pad2(parts.hours), l: 'Hrs' },
    { v: pad2(parts.minutes), l: 'Min' },
    { v: pad2(parts.seconds), l: 'Sec' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" aria-live="polite">
        {cells.map((c) => (
          <div
            key={c.l}
            className="min-w-[3.5rem] rounded-md border border-border/80 bg-background/70 px-2.5 py-2 text-center"
          >
            <div className="font-display text-2xl font-extrabold tabular-nums leading-none text-foreground sm:text-3xl">
              {c.v}
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {c.l}
            </div>
          </div>
        ))}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700"
          style={{ width: `${Math.round(parts.progressPct)}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {Math.round(parts.progressPct)}% through Override · ends{' '}
        {formatSeasonLongDate(nextSeasonStartDate())}
      </p>
    </div>
  )
}

export function StatusDashboard({
  tone,
  headline,
  description,
  updatedLabel,
  componentCount,
  incidentCount,
  fetchOk,
}: Props) {
  const t = TONE[tone]

  return (
    <div className="space-y-6">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-card ${t.ring}`}
        style={{
          boxShadow: `0 0 0 1px color-mix(in oklab, ${t.glow} 40%, transparent), 0 24px 80px -40px ${t.glow}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full blur-3xl"
          style={{ background: t.glow }}
          aria-hidden="true"
        />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0 sm:h-32 sm:w-32">
              <div
                className={`absolute inset-0 animate-ping rounded-full opacity-20 ${t.orb}`}
                style={{ animationDuration: '2.4s' }}
              />
              <div className={`absolute inset-3 rounded-full border-2 ${t.ring} bg-background/80`} />
              <div className={`absolute inset-[2.35rem] rounded-full ${t.orb}`} />
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <p className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${t.badge}`}>
                Live check
              </p>
              <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {t.word}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t.sub}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{headline}</p>
              {description ? (
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
              ) : null}
              {updatedLabel ? (
                <p className="mt-3 text-xs text-muted-foreground">Board updated {updatedLabel}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {
                label: 'Board',
                value: fetchOk ? (tone === 'ok' ? 'Clear' : tone === 'warn' ? 'Flagged' : 'Outage') : 'N/A',
              },
              { label: 'Incidents', value: String(incidentCount) },
              { label: 'Services', value: String(componentCount) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/80 bg-background/55 px-3 py-4 text-center backdrop-blur-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold uppercase tabular-nums text-foreground sm:text-3xl">
                  {stat.value}
                </p>
              </div>
            ))}
            <div className="col-span-3 rounded-xl border border-border/80 bg-background/55 px-4 py-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Override ends
                </p>
                <Link href="/season-countdown" className="text-xs font-semibold text-primary hover:underline">
                  Full countdown
                </Link>
              </div>
              <MiniCountdown />
              <p className="mt-2 text-xs text-muted-foreground">
                {CURRENT_SEASON.shortLabel} · scheduled flip into {CURRENT_SEASON.next.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

