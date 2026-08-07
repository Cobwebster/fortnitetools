'use client'

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { MapEvolutionEntry } from '@/lib/map-evolution'

export function MapEvolutionCompareSlider({
  left,
  right,
  position,
  onPosition,
}: {
  left: MapEvolutionEntry
  right: MapEvolutionEntry
  position: number
  onPosition: (pct: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pct = ((clientX - rect.left) / rect.width) * 100
      onPosition(Math.min(100, Math.max(0, pct)))
    },
    [onPosition]
  )

  const onPointerDown = (e: ReactPointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    dragging.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  const clip = `inset(0 ${100 - position}% 0 0)`

  return (
    <div
      ref={trackRef}
      className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-xl border border-border bg-[#0a121f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Map comparison slider"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onPosition(Math.max(0, position - 2))
        if (e.key === 'ArrowRight') onPosition(Math.min(100, position + 2))
        if (e.key === 'Home') onPosition(0)
        if (e.key === 'End') onPosition(100)
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={right.image}
        alt={`${right.label} Fortnite map`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ clipPath: clip }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={left.image}
          alt={`${left.label} Fortnite map`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute left-3 top-3 max-w-[42%] rounded-md border border-white/15 bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {left.shortLabel}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 max-w-[42%] rounded-md border border-white/15 bg-black/55 px-2 py-1 text-right text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {right.shortLabel}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/70 shadow-lg"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <span className="flex gap-0.5">
          <span className="h-4 w-0.5 rounded-full bg-white/90" />
          <span className="h-4 w-0.5 rounded-full bg-white/90" />
          <span className="h-4 w-0.5 rounded-full bg-white/90" />
        </span>
      </div>
    </div>
  )
}
