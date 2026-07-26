'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  MAP_EVOLUTION,
  MAP_EVOLUTION_CHAPTERS,
  defaultCompareIds,
  findMapById,
  mapsForChapter,
  type MapEvolutionEntry,
} from '@/lib/map-evolution'

type ChapterFilter = number | 'all'

function VersionPicker({
  side,
  value,
  chapterFilter,
  onChapterChange,
  onChange,
}: {
  side: 'left' | 'right'
  value: string
  chapterFilter: ChapterFilter
  onChapterChange: (c: ChapterFilter) => void
  onChange: (id: string) => void
}) {
  const options = useMemo(() => mapsForChapter(chapterFilter), [chapterFilter])
  const selected = findMapById(value)

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {side === 'left' ? 'Left map' : 'Right map'}
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={`${side} chapter filter`}>
        <button
          type="button"
          onClick={() => onChapterChange('all')}
          className={`rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
            chapterFilter === 'all'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
          }`}
        >
          All
        </button>
        {MAP_EVOLUTION_CHAPTERS.map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => onChapterChange(ch)}
            className={`rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              chapterFilter === ch
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            C{ch}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="sr-only">{side} version</span>
        <select
          value={options.some((o) => o.id === value) ? value : options[0]?.id ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {options.map((m) => (
            <option key={m.id} value={m.id}>
              {m.shortLabel} · v{m.version}
            </option>
          ))}
        </select>
      </label>
      {selected ? (
        <p className="truncate text-xs text-muted-foreground">
          {selected.label} <span className="opacity-60">({selected.version})</span>
        </p>
      ) : null}
    </div>
  )
}

function CompareSlider({
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
      {/* Right (under) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={right.image}
        alt={`${right.label} Fortnite map`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Left (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: clip }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={left.image}
          alt={`${left.label} Fortnite map`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute left-3 top-3 max-w-[42%] rounded-md border border-white/15 bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {left.shortLabel}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 max-w-[42%] rounded-md border border-white/15 bg-black/55 px-2 py-1 text-right text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {right.shortLabel}
      </div>

      {/* Divider + handle */}
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

export function MapEvolutionClient() {
  const defaults = defaultCompareIds()
  const [leftId, setLeftId] = useState(defaults.left)
  const [rightId, setRightId] = useState(defaults.right)
  const [leftChapter, setLeftChapter] = useState<ChapterFilter>('all')
  const [rightChapter, setRightChapter] = useState<ChapterFilter>('all')
  const [position, setPosition] = useState(50)

  const left = findMapById(leftId) ?? MAP_EVOLUTION[0]
  const right = findMapById(rightId) ?? MAP_EVOLUTION[MAP_EVOLUTION.length - 1]

  useEffect(() => {
    if (!left || !right) return
    for (const src of [left.image, right.image]) {
      const img = new window.Image()
      img.src = src
    }
  }, [left, right])

  // When chapter filter changes, keep selection if still valid, else first in list
  const onLeftChapter = (c: ChapterFilter) => {
    setLeftChapter(c)
    const opts = mapsForChapter(c)
    if (!opts.some((o) => o.id === leftId) && opts[0]) setLeftId(opts[0].id)
  }
  const onRightChapter = (c: ChapterFilter) => {
    setRightChapter(c)
    const opts = mapsForChapter(c)
    if (!opts.some((o) => o.id === rightId) && opts[0]) setRightId(opts[0].id)
  }

  const swap = () => {
    setLeftId(rightId)
    setRightId(leftId)
    setLeftChapter(rightChapter)
    setRightChapter(leftChapter)
    setPosition(50)
  }

  if (!left || !right) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Map archive is empty. Run <code className="text-foreground">npm run fetch:map-evolution</code>.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:gap-6 sm:p-5">
        <VersionPicker
          side="left"
          value={leftId}
          chapterFilter={leftChapter}
          onChapterChange={onLeftChapter}
          onChange={setLeftId}
        />
        <button
          type="button"
          onClick={swap}
          className="shrink-0 rounded-lg border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Swap sides
        </button>
        <VersionPicker
          side="right"
          value={rightId}
          chapterFilter={rightChapter}
          onChapterChange={onRightChapter}
          onChange={setRightId}
        />
      </div>

      <CompareSlider left={left} right={right} position={position} onPosition={setPosition} />

      <p className="text-center text-xs text-muted-foreground">
        Drag the handle (or use arrow keys) to compare{' '}
        <strong className="text-foreground">{left.shortLabel}</strong> and{' '}
        <strong className="text-foreground">{right.shortLabel}</strong>.{' '}
        {MAP_EVOLUTION.length} season maps loaded · one representative patch per season.
      </p>
    </div>
  )
}
