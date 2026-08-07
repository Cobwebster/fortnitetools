'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { MapEvolutionCompareSlider } from '@/components/map-evolution-compare'
import { FortniteIcon } from '@/components/fortnite-icon'
import { findMapById, MAP_EVOLUTION, type MapEvolutionEntry } from '@/lib/map-evolution'
import { toolIcon } from '@/lib/site-icons'

/** Curated iconic seasons for the homepage teaser (not the full archive). */
const TEASER_IDS = [
  '1-11', // C1S1
  '13-30-water-lvl-3', // C2S3 water
  '21-51', // C3S3
  '25-30', // C4S3
  '39-51', // C7S1
  '41-10', // C7S3 current
] as const

function teaserMaps(): MapEvolutionEntry[] {
  return TEASER_IDS.map((id) => findMapById(id)).filter(
    (m): m is MapEvolutionEntry => Boolean(m)
  )
}

function SidePicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: MapEvolutionEntry[]
  onChange: (id: string) => void
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((m) => {
          const active = m.id === value
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={`rounded-md border px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {m.shortLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Interactive Map Evolution preview for the homepage — limited presets + CTA. */
export function MapEvolutionTeaser() {
  const t = useTranslations('home')
  const options = useMemo(() => teaserMaps(), [])
  const fallbackLeft = options[0]?.id ?? MAP_EVOLUTION[0]?.id ?? ''
  const fallbackRight =
    options[options.length - 1]?.id ?? MAP_EVOLUTION[MAP_EVOLUTION.length - 1]?.id ?? fallbackLeft

  const [leftId, setLeftId] = useState(fallbackLeft)
  const [rightId, setRightId] = useState(fallbackRight)
  const [position, setPosition] = useState(50)

  const left = findMapById(leftId) ?? options[0]
  const right = findMapById(rightId) ?? options[options.length - 1]

  useEffect(() => {
    if (!left || !right) return
    for (const src of [left.image, right.image]) {
      const img = new window.Image()
      img.src = src
    }
  }, [left, right])

  if (!left || !right || options.length < 2) return null

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      aria-labelledby="map-evo-teaser-heading"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <FortniteIcon
              src={toolIcon('/map-evolution')}
              size="md"
              frameClassName="border-primary/40 bg-primary/10"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                {t('mapEvoEyebrow')}
              </p>
              <h2
                id="map-evo-teaser-heading"
                className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-foreground"
              >
                {t('mapEvoTitle')}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t('mapEvoBody')}
              </p>
            </div>
          </div>
          <Link
            href="/map-evolution"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:self-auto"
          >
            {t('mapEvoCta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="space-y-4">
            <SidePicker
              label={t('mapEvoLeft')}
              value={leftId}
              options={options}
              onChange={setLeftId}
            />
            <SidePicker
              label={t('mapEvoRight')}
              value={rightId}
              options={options}
              onChange={setRightId}
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t('mapEvoHint', { count: MAP_EVOLUTION.length })}
            </p>
            <Link
              href="/map-evolution"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {t('mapEvoLink')} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <MapEvolutionCompareSlider
              left={left}
              right={right}
              position={position}
              onPosition={setPosition}
            />
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              {t('mapEvoDrag')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
