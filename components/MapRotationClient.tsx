'use client'

import { useEffect, useState } from 'react'
import {
  ROTATION_MODES,
  formatClockRange,
  formatRemaining,
  getRotationSnapshot,
  type RotationModeId,
  type RotationSnapshot,
} from '@/lib/map-rotation'

function useRotation(modeId: RotationModeId) {
  const [snap, setSnap] = useState<RotationSnapshot | null>(null)

  useEffect(() => {
    setSnap(getRotationSnapshot(modeId))
    const id = window.setInterval(() => setSnap(getRotationSnapshot(modeId)), 250)
    return () => window.clearInterval(id)
  }, [modeId])

  return snap
}

export function MapRotationClient() {
  const [modeId, setModeId] = useState<RotationModeId>('reload')
  const snap = useRotation(modeId)
  const ready = snap !== null

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Game mode">
        {ROTATION_MODES.map((m) => {
          const active = modeId === m.id
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setModeId(m.id)}
              className={`rounded-md border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {!ready ? (
        <div className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Loading live rotation…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              className="rounded-xl border border-border bg-card p-5 sm:p-6"
              style={{
                background: `linear-gradient(145deg, color-mix(in oklab, ${snap.current.accent} 16%, var(--card)), var(--card))`,
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Current rotation
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-wide text-foreground sm:text-4xl">
                {snap.current.name}
                {snap.current.badge === 'new' ? (
                  <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-primary">
                    New
                  </span>
                ) : null}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{snap.current.theme}</p>
              <p className="mt-4 text-sm font-semibold tabular-nums text-foreground">
                {formatClockRange(snap.currentStart, snap.currentEnd)}
              </p>
              {snap.rotating ? (
                <div className="mt-5">
                  <p
                    className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-6xl"
                    aria-live="polite"
                  >
                    {formatRemaining(snap.remainingMs)}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    remaining
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-sm font-semibold text-foreground">Live · no map switch scheduled</p>
              )}
            </div>

            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Up next
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-wide text-foreground sm:text-4xl">
                {snap.next.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{snap.next.theme}</p>
              <p className="mt-4 text-sm font-semibold tabular-nums text-foreground">
                {snap.rotating
                  ? formatClockRange(snap.nextStart, snap.nextEnd)
                  : 'Same map until Epic updates the pool'}
              </p>
              {snap.rotating ? (
                <p className="mt-5 text-sm text-muted-foreground">
                  Starts in{' '}
                  <strong className="tabular-nums text-foreground">
                    {formatRemaining(snap.remainingMs)}
                  </strong>
                </p>
              ) : null}
            </div>
          </div>

          {snap.mode.note ? (
            <p className="text-sm text-muted-foreground">{snap.mode.note}</p>
          ) : null}

          <div>
            <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Full rotation
            </h3>
            <ol className="space-y-2">
              {snap.cycle.map((slot) => (
                <li
                  key={`${slot.map.id}-${slot.start.toISOString()}`}
                  className={`flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 sm:gap-4 ${
                    slot.isLive
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold tabular-nums ${
                      slot.isLive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {slot.index + 1}
                  </span>
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ background: slot.map.accent }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-bold uppercase tracking-wide text-foreground">
                      {slot.map.name}
                      {slot.map.badge === 'new' ? (
                        <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-primary">
                          New
                        </span>
                      ) : null}
                    </p>
                    <p className="text-xs text-muted-foreground">{slot.map.theme}</p>
                  </div>
                  <div className="w-full text-left sm:w-auto sm:text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {slot.isLive ? (
                        snap.rotating ? (
                          <>
                            Live{' '}
                            <span className="tabular-nums text-primary">
                              {formatRemaining(snap.remainingMs)}
                            </span>
                          </>
                        ) : (
                          <span className="text-primary">Live</span>
                        )
                      ) : (
                        <>
                          Starts in{' '}
                          <span className="tabular-nums text-foreground">
                            {formatRemaining(slot.startsInMs)}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                      {snap.rotating
                        ? formatClockRange(slot.start, slot.end)
                        : 'Until Epic changes the pool'}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  )
}
