'use client'

import { useState, useCallback } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, RotateCcw, Info } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'

const GAMES = [
  { id: 'fortnite', label: 'Fortnite', multiplier: 0.55 },
  { id: 'valorant', label: 'Valorant', multiplier: 0.07 },
  { id: 'apex', label: 'Apex Legends', multiplier: 0.022 },
  { id: 'warzone', label: 'Call of Duty: Warzone', multiplier: 0.0066 },
  { id: 'cs2', label: 'CS2 / CS:GO', multiplier: 0.022 },
  { id: 'overwatch', label: 'Overwatch 2', multiplier: 0.0066 },
  { id: 'pubg', label: 'PUBG', multiplier: 0.007 },
  { id: 'r6', label: 'Rainbow Six Siege', multiplier: 0.0038 },
]

function toCm360(sens: number, dpi: number, multiplier: number): number {
  return (2.54 * 360) / (sens * dpi * multiplier)
}

function fromCm360(cm360: number, dpi: number, multiplier: number): number {
  return (2.54 * 360) / (cm360 * dpi * multiplier)
}

function round(n: number, decimals = 4): number {
  return Math.round(n * 10 ** decimals) / 10 ** decimals
}

const SEO_KEYS = [
  { h: 'seo.s1h', p: ['seo.s1p1', 'seo.s1p2'] },
  { h: 'seo.s2h', p: ['seo.s2p1', 'seo.s2p2'] },
  { h: 'seo.s3h', p: ['seo.s3p1', 'seo.s3p2'] },
  { h: 'seo.s4h', p: ['seo.s4p1', 'seo.s4p2'] },
] as const

const FAQ_KEYS = [
  ['faqs.q1', 'faqs.a1'],
  ['faqs.q2', 'faqs.a2'],
  ['faqs.q3', 'faqs.a3'],
  ['faqs.q4', 'faqs.a4'],
  ['faqs.q5', 'faqs.a5'],
  ['faqs.q6', 'faqs.a6'],
  ['faqs.q7', 'faqs.a7'],
] as const

export function SensitivityCalculatorView() {
  const t = useTranslations('tools.sensitivityCalculator')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [fromGame, setFromGame] = useState('valorant')
  const [toGame, setToGame] = useState('fortnite')
  const [sens, setSens] = useState('')
  const [dpi, setDpi] = useState('800')
  const [result, setResult] = useState<{
    converted: number
    cm360from: number
    cm360to: number
  } | null>(null)
  const [error, setError] = useState('')

  const fromDef = GAMES.find((g) => g.id === fromGame)!
  const toDef = GAMES.find((g) => g.id === toGame)!

  const calculate = useCallback(() => {
    setError('')
    const s = parseFloat(sens)
    const d = parseFloat(dpi)
    if (!sens || isNaN(s) || s <= 0) {
      setError(t('errorSens'))
      return
    }
    if (!dpi || isNaN(d) || d <= 0) {
      setError(t('errorDpi'))
      return
    }
    const cm360 = toCm360(s, d, fromDef.multiplier)
    const converted = fromCm360(cm360, d, toDef.multiplier)
    setResult({ converted: round(converted), cm360from: round(cm360, 1), cm360to: round(cm360, 1) })
  }, [sens, dpi, fromDef, toDef, t])

  const reset = () => {
    setSens('')
    setDpi('800')
    setResult(null)
    setError('')
  }
  const swap = () => {
    setFromGame(toGame)
    setToGame(fromGame)
    setResult(null)
  }

  const edpi =
    parseFloat(sens) > 0 && parseFloat(dpi) > 0
      ? round(parseFloat(sens) * parseFloat(dpi), 0)
      : null

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <Link href={toolsHref} className="hover:text-primary transition-colors">
              {t('tools')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
            {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-6">
            <label htmlFor="dpi" className="block text-sm font-semibold text-foreground mb-1">
              {t('mouseDpi')}
            </label>
            <input
              id="dpi"
              type="number"
              min="100"
              max="32000"
              step="100"
              value={dpi}
              onChange={(e) => {
                setDpi(e.target.value)
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('dpiPlaceholder')}
            />
            <p className="mt-1 text-xs text-muted-foreground">{t('dpiHint')}</p>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 mb-6">
            <div>
              <label htmlFor="from-game" className="block text-sm font-semibold text-foreground mb-1">
                {t('convertFrom')}
              </label>
              <select
                id="from-game"
                value={fromGame}
                onChange={(e) => {
                  setFromGame(e.target.value)
                  setResult(null)
                }}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {GAMES.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={swap}
              aria-label={t('swapAria')}
              className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <div>
              <label htmlFor="to-game" className="block text-sm font-semibold text-foreground mb-1">
                {t('convertTo')}
              </label>
              <select
                id="to-game"
                value={toGame}
                onChange={(e) => {
                  setToGame(e.target.value)
                  setResult(null)
                }}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {GAMES.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="sens" className="block text-sm font-semibold text-foreground mb-1">
              {t('sensLabel', { game: fromDef.label })}
            </label>
            <input
              id="sens"
              type="number"
              min="0.01"
              step="0.01"
              value={sens}
              onChange={(e) => {
                setSens(e.target.value)
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('sensPlaceholder', { game: fromDef.label })}
            />
            {edpi ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {t('edpiLine', { edpi })}
              </p>
            ) : null}
          </div>

          {error ? (
            <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={calculate}
              className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {t('convertBtn')}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label={t('resetAria')}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {result ? (
            <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">{t('result')}</p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display text-5xl font-bold text-foreground">{result.converted}</span>
                <span className="text-muted-foreground text-sm">
                  {t('resultSens', { game: toDef.label })}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">{t('cm360')}</p>
                  <p className="text-lg font-semibold text-foreground">{result.cm360from} cm</p>
                </div>
                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    {t('edpiTo', { game: toDef.label })}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {round(result.converted * parseFloat(dpi), 0)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('fineTune', { sens: result.converted, dpi, game: toDef.label })}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2">{t('howTitle')}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('howBody')}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground mb-1">{t('edpiTitle')}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('edpiBody')}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground mb-1">{t('rangesTitle')}</h3>
              <ul className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
                <li>
                  • <strong className="text-foreground">{t('rangeLow')}</strong>
                </li>
                <li>
                  • <strong className="text-foreground">{t('rangeHigh')}</strong>
                </li>
                <li>
                  • <strong className="text-foreground">{t('rangeComp')}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {SEO_KEYS.map((section) => (
          <section key={section.h} className="mt-12 border-t border-border pt-10 space-y-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {t(section.h)}
            </h2>
            {section.p.map((key) => (
              <p key={key} className="text-sm leading-relaxed text-muted-foreground">
                {t(key)}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
            {t('faqTitle')}
          </h2>
          <div className="space-y-5">
            {FAQ_KEYS.map(([q, a]) => (
              <div key={q}>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{t(q)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(a)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-10 space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            {t('relatedTitle')}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('relatedBefore')}{' '}
            <Link href={localizeHref(locale, '/tools/fps-settings')} className="text-primary hover:underline">
              {t('relatedFps')}
            </Link>
            {t('relatedMid1')}{' '}
            <Link href={localizeHref(locale, '/tools/keybinds')} className="text-primary hover:underline">
              {t('relatedKeybinds')}
            </Link>
            {t('relatedMid2')}{' '}
            <Link href={localizeHref(locale, '/tools/player-stats')} className="text-primary hover:underline">
              {t('relatedTracker')}
            </Link>
            {t('relatedMid3')}{' '}
            <Link href={toolsHref} className="text-primary hover:underline">
              {t('relatedHub')}
            </Link>
            {t('relatedAfter')}
          </p>
        </section>
      </section>
    </main>
  )
}
