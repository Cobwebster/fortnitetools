'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapEvolutionCompareSlider } from '@/components/map-evolution-compare'
import {
  MAP_EVOLUTION,
  MAP_EVOLUTION_CHAPTERS,
  defaultCompareIds,
  findMapById,
  mapsForChapter,
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

      <MapEvolutionCompareSlider
        left={left}
        right={right}
        position={position}
        onPosition={setPosition}
      />

      <p className="text-center text-xs text-muted-foreground">
        Drag the handle (or use arrow keys) to compare{' '}
        <strong className="text-foreground">{left.shortLabel}</strong> and{' '}
        <strong className="text-foreground">{right.shortLabel}</strong>.{' '}
        {MAP_EVOLUTION.length} season maps loaded · one representative patch per season.
      </p>
    </div>
  )
}
