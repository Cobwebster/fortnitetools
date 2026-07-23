'use client'

import { useState, useCallback } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, RotateCcw, Info } from 'lucide-react'

// DPI-independent sensitivity multipliers per game.
// Fortnite default FOV is 80 (80 degrees). Sens is measured in cm/360.
// We store each game's internal multiplier to convert raw sens → cm/360.
// Formula: cm/360 = (360 / (dpi * sens * multiplier)) * 2.54
const GAMES = [
  { id: 'fortnite',  label: 'Fortnite',              multiplier: 0.5500 },
  { id: 'valorant',  label: 'Valorant',               multiplier: 0.0700 },
  { id: 'apex',      label: 'Apex Legends',            multiplier: 0.0220 },
  { id: 'warzone',   label: 'Call of Duty: Warzone',   multiplier: 0.0066 },
  { id: 'cs2',       label: 'CS2 / CS:GO',             multiplier: 0.0220 },
  { id: 'overwatch', label: 'Overwatch 2',             multiplier: 0.0066 },
  { id: 'pubg',      label: 'PUBG',                    multiplier: 0.0070 },
  { id: 'r6',        label: 'Rainbow Six Siege',       multiplier: 0.0038 },
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

export default function SensitivityCalculatorPage() {
  const [fromGame, setFromGame] = useState('valorant')
  const [toGame, setToGame] = useState('fortnite')
  const [sens, setSens] = useState('')
  const [dpi, setDpi] = useState('800')
  const [result, setResult] = useState<{ converted: number; cm360from: number; cm360to: number } | null>(null)
  const [error, setError] = useState('')

  const fromDef = GAMES.find(g => g.id === fromGame)!
  const toDef   = GAMES.find(g => g.id === toGame)!

  const calculate = useCallback(() => {
    setError('')
    const s = parseFloat(sens)
    const d = parseFloat(dpi)
    if (!sens || isNaN(s) || s <= 0) { setError('Enter a valid sensitivity (must be greater than 0).'); return }
    if (!dpi  || isNaN(d) || d <= 0) { setError('Enter a valid DPI (must be greater than 0).'); return }
    const cm360 = toCm360(s, d, fromDef.multiplier)
    const converted = fromCm360(cm360, d, toDef.multiplier)
    setResult({ converted: round(converted), cm360from: round(cm360, 1), cm360to: round(cm360, 1) })
  }, [sens, dpi, fromDef, toDef])

  const reset = () => { setSens(''); setDpi('800'); setResult(null); setError('') }
  const swap  = () => { setFromGame(toGame); setToGame(fromGame); setResult(null) }

  const edpi = parseFloat(sens) > 0 && parseFloat(dpi) > 0
    ? round(parseFloat(sens) * parseFloat(dpi), 0)
    : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
              <span>/</span>
              <span className="text-foreground">Sensitivity Calculator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Fortnite Sensitivity <span className="text-primary">Calculator</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Convert your mouse sensitivity from any game to Fortnite — or from Fortnite to any other game.
              Your aim transfers perfectly when you match your <strong className="text-foreground">cm/360</strong>.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            {/* DPI row */}
            <div className="mb-6">
              <label htmlFor="dpi" className="block text-sm font-semibold text-foreground mb-1">
                Mouse DPI
              </label>
              <input
                id="dpi"
                type="number"
                min="100"
                max="32000"
                step="100"
                value={dpi}
                onChange={e => { setDpi(e.target.value); setResult(null) }}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. 800"
              />
              <p className="mt-1 text-xs text-muted-foreground">Common values: 400, 800, 1600. Check your mouse software.</p>
            </div>

            {/* From / To game row */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 mb-6">
              <div>
                <label htmlFor="from-game" className="block text-sm font-semibold text-foreground mb-1">Convert From</label>
                <select
                  id="from-game"
                  value={fromGame}
                  onChange={e => { setFromGame(e.target.value); setResult(null) }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {GAMES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </div>
              <button
                type="button"
                onClick={swap}
                aria-label="Swap games"
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <div>
                <label htmlFor="to-game" className="block text-sm font-semibold text-foreground mb-1">Convert To</label>
                <select
                  id="to-game"
                  value={toGame}
                  onChange={e => { setToGame(e.target.value); setResult(null) }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {GAMES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </div>
            </div>

            {/* Sensitivity input */}
            <div className="mb-6">
              <label htmlFor="sens" className="block text-sm font-semibold text-foreground mb-1">
                {fromDef.label} Sensitivity
              </label>
              <input
                id="sens"
                type="number"
                min="0.01"
                step="0.01"
                value={sens}
                onChange={e => { setSens(e.target.value); setResult(null) }}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={`Enter your ${fromDef.label} sensitivity`}
              />
              {edpi && (
                <p className="mt-1 text-xs text-muted-foreground">
                  eDPI: <span className="text-foreground font-medium">{edpi}</span> (sens × DPI)
                </p>
              )}
            </div>

            {error && (
              <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={calculate}
                className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Convert Sensitivity
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label="Reset"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Result</p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-5xl font-bold text-foreground">{result.converted}</span>
                  <span className="text-muted-foreground text-sm">{toDef.label} sensitivity</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-1">cm/360 (physical)</p>
                    <p className="text-lg font-semibold text-foreground">{result.cm360from} cm</p>
                  </div>
                  <div className="rounded-lg bg-muted px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-1">eDPI ({toDef.label})</p>
                    <p className="text-lg font-semibold text-foreground">
                      {round(result.converted * parseFloat(dpi), 0)}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Set your {toDef.label} sensitivity to <strong className="text-foreground">{result.converted}</strong> at {dpi} DPI to match your existing muscle memory exactly.
                </p>
              </div>
            )}
          </div>

          {/* Info box */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-2">How does this work?</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each game uses a different internal sensitivity scale. This calculator converts your sensitivity
                  using the <strong className="text-foreground">cm/360 method</strong> — the physical distance your mouse
                  needs to travel to spin your character 360 degrees. By matching this value across games, your
                  muscle memory transfers directly.
                </p>
                <h3 className="mt-4 text-sm font-semibold text-foreground mb-1">What is eDPI?</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  eDPI (effective DPI) = sensitivity × DPI. It&apos;s a universal number to compare aim speed
                  between players regardless of their individual sens/DPI split. Most Fortnite pro players
                  use an eDPI between <strong className="text-foreground">40,000 – 80,000</strong>.
                </p>
                <h3 className="mt-4 text-sm font-semibold text-foreground mb-1">Fortnite recommended settings</h3>
                <ul className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
                  <li>• <strong className="text-foreground">Low sens</strong>: 0.05–0.08 at 800 DPI — better for long-range accuracy</li>
                  <li>• <strong className="text-foreground">High sens</strong>: 0.12–0.18 at 800 DPI — faster building/editing reactions</li>
                  <li>• <strong className="text-foreground">Pro average</strong>: ~0.07–0.10 at 800 DPI (eDPI ~56,000–80,000)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
