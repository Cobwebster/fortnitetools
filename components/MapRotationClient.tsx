'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
  ROTATION_MODES,
  formatClockRange,
  formatRemaining,
  getRotationSnapshot,
  type RotationMap,
  type RotationModeId,
  type RotationSnapshot,
} from '@/lib/map-rotation'

function MapCard({
  map,
  children,
  className = '',
}: {
  map: RotationMap
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/15 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={map.image}
        alt={`${map.name} Fortnite map`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(8,10,14,0.28) 0%, rgba(8,10,14,0.55) 45%, rgba(8,10,14,0.88) 100%), linear-gradient(90deg, color-mix(in oklab, ${map.accent} 22%, transparent), transparent 55%)`,
        }}
      />
      <div className="relative z-10 p-5 sm:p-6">{children}</div>
    </div>
  )
}

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
            <MapCard map={snap.current} className="min-h-[280px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Current rotation
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-4xl">
                {snap.current.name}
                {snap.current.badge === 'new' ? (
                  <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-amber-200">
                    New
                  </span>
                ) : null}
              </h2>
              <p className="mt-2 text-sm text-white/75">{snap.current.theme}</p>
              <p className="mt-4 text-sm font-semibold tabular-nums text-white">
                {formatClockRange(snap.currentStart, snap.currentEnd)}
              </p>
              {snap.rotating ? (
                <div className="mt-5">
                  <p
                    className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-white drop-shadow sm:text-6xl"
                    aria-live="polite"
                  >
                    {formatRemaining(snap.remainingMs)}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                    remaining
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-sm font-semibold text-white">Live · no map switch scheduled</p>
              )}
            </MapCard>

            <MapCard map={snap.next} className="min-h-[280px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Up next
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-4xl">
                {snap.next.name}
              </h2>
              <p className="mt-2 text-sm text-white/75">{snap.next.theme}</p>
              <p className="mt-4 text-sm font-semibold tabular-nums text-white">
                {snap.rotating
                  ? formatClockRange(snap.nextStart, snap.nextEnd)
                  : 'Same map until Epic updates the pool'}
              </p>
              {snap.rotating ? (
                <p className="mt-5 text-sm text-white/75">
                  Starts in{' '}
                  <strong className="tabular-nums text-white">
                    {formatRemaining(snap.remainingMs)}
                  </strong>
                </p>
              ) : null}
            </MapCard>
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
                  className={`relative overflow-hidden rounded-xl border ${
                    slot.isLive ? 'border-white/40' : 'border-white/10'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slot.map.image}
                    alt={`${slot.map.name} Fortnite map`}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: slot.isLive
                        ? 'linear-gradient(90deg, rgba(8,10,14,0.55) 0%, rgba(8,10,14,0.72) 100%)'
                        : 'linear-gradient(90deg, rgba(8,10,14,0.72) 0%, rgba(8,10,14,0.82) 100%)',
                    }}
                  />
                  <div className="relative z-10 flex flex-wrap items-center gap-3 px-4 py-3 sm:gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold tabular-nums ${
                        slot.isLive
                          ? 'bg-white text-zinc-900'
                          : 'bg-white/15 text-white/80'
                      }`}
                    >
                      {slot.index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-bold uppercase tracking-wide text-white">
                        {slot.map.name}
                        {slot.map.badge === 'new' ? (
                          <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-amber-200">
                            New
                          </span>
                        ) : null}
                      </p>
                      <p className="text-xs text-white/65">{slot.map.theme}</p>
                    </div>
                    <div className="w-full text-left sm:w-auto sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                        {slot.isLive ? (
                          snap.rotating ? (
                            <>
                              Live{' '}
                              <span className="tabular-nums text-amber-200">
                                {formatRemaining(snap.remainingMs)}
                              </span>
                            </>
                          ) : (
                            <span className="text-amber-200">Live</span>
                          )
                        ) : (
                          <>
                            Starts in{' '}
                            <span className="tabular-nums text-white">
                              {formatRemaining(slot.startsInMs)}
                            </span>
                          </>
                        )}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-white">
                        {snap.rotating
                          ? formatClockRange(slot.start, slot.end)
                          : 'Until Epic changes the pool'}
                      </p>
                    </div>
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
