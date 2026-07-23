'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Info } from 'lucide-react'
import { WEAPONS, RARITY_TEXT as RARITY_COLORS, RARITY_BORDER, calcWeaponStats } from '@/lib/weapons'

// Fortnite player HP pools
const HEALTH_PRESETS = [
  { label: '100 HP (no shields)',    hp: 100 },
  { label: '200 HP (full shields)',  hp: 200 },
  { label: '150 HP (half shields)',  hp: 150 },
  { label: '50 HP (near death)',     hp: 50  },
]

const RARITY_BG: Record<string, string> = {
  Uncommon:  RARITY_BORDER.Uncommon,
  Rare:      RARITY_BORDER.Rare,
  Epic:      RARITY_BORDER.Epic,
  Legendary: RARITY_BORDER.Legendary,
}

const CATEGORIES = ['All', 'AR', 'Shotgun', 'SMG', 'Pistol', 'Sniper']

function ceil(n: number) { return Math.ceil(n) }

export default function WeaponDamageCalculatorPage() {
  const [selectedWeapon, setSelectedWeapon] = useState('surgical_burst')
  const [targetHP, setTargetHP] = useState(200)
  const [customHP, setCustomHP] = useState('')
  const [headshot, setHeadshot] = useState(false)
  const [category, setCategory] = useState('All')

  const weapon = WEAPONS.find(w => w.id === selectedWeapon) ?? WEAPONS[0]
  const hp = customHP ? (parseInt(customHP) || targetHP) : targetHP

  const results = useMemo(() => {
    const base = calcWeaponStats(weapon, hp, headshot)
    return {
      ...base,
      shotsToBreakWood: ceil(100 / weapon.dmg),
      shotsToBreakBrick: ceil(200 / weapon.dmg),
      shotsToBreakMetal: ceil(500 / weapon.dmg),
    }
  }, [weapon, hp, headshot])

  const filtered = category === 'All' ? WEAPONS : WEAPONS.filter(w => w.category === category)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-foreground">Weapon Damage Calculator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Weapon Damage <span className="text-primary">Calculator</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Approximate shots-to-kill, DPS, and time-to-kill for Chapter 7 Season 3 weapons. Values are for planning — Epic changes balance mid-season, so confirm in-game after patches.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

            {/* Left: weapon selector + options */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      category === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Weapon grid */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {filtered.map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWeapon(w.id)}
                      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all ${
                        selectedWeapon === w.id
                          ? `${RARITY_BG[w.rarity]} border-current`
                          : 'border-border bg-muted/30 hover:bg-muted'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.image}
                        alt=""
                        className="h-12 w-12 shrink-0 object-contain drop-shadow-sm"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">{w.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs font-medium ${RARITY_COLORS[w.rarity]}`}>{w.rarity}</span>
                          <span className="text-xs text-muted-foreground">{w.dmg} dmg</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Target Options</h2>

                {/* HP preset */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Target HP</p>
                  <div className="grid grid-cols-2 gap-2">
                    {HEALTH_PRESETS.map(preset => (
                      <button
                        key={preset.hp}
                        type="button"
                        onClick={() => { setTargetHP(preset.hp); setCustomHP('') }}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors text-left ${
                          targetHP === preset.hp && !customHP
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={customHP}
                      onChange={e => setCustomHP(e.target.value)}
                      placeholder="Custom HP (1–200)"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Headshot toggle */}
                <button
                  type="button"
                  onClick={() => setHeadshot(v => !v)}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                    headshot ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                  }`}
                >
                  <span className="text-sm font-medium text-foreground">Headshot damage</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${headshot ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
                    {headshot ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: results */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Selected weapon card */}
              <div className={`rounded-xl border p-5 ${RARITY_BG[weapon.rarity]}`}>
                <div className="flex items-start gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={weapon.image}
                    alt=""
                    className="h-16 w-16 shrink-0 object-contain drop-shadow-md"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className={`text-xs font-bold uppercase tracking-wider ${RARITY_COLORS[weapon.rarity]}`}>{weapon.rarity} · {weapon.category}</p>
                    <h2 className="font-display text-xl font-bold text-foreground mt-0.5 leading-tight">{weapon.name}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Base Damage', val: weapon.dmg },
                    { label: 'HS Mult', val: `×${weapon.hs}` },
                    { label: 'Fire Rate', val: `${weapon.fireRate}/s` },
                    { label: 'Mag Size', val: weapon.mag },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded bg-background/40 px-3 py-2">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-bold text-foreground">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kill stats */}
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">vs. {hp} HP Player</p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Damage per shot</span>
                    <span className="font-display text-2xl font-bold text-foreground">{results.effectiveDmg.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Shots to kill</span>
                    <span className={`font-display text-2xl font-bold ${results.magCanKill ? 'text-primary' : 'text-destructive'}`}>
                      {results.shotsToKill}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Time to kill</span>
                    <span className="font-display text-2xl font-bold text-foreground">{results.timeToKill.toFixed(2)}s</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">{headshot ? 'DPS (all HS)' : 'DPS (body)'}</span>
                    <span className="font-display text-2xl font-bold text-foreground">{results.effectiveDps.toFixed(1)}</span>
                  </div>
                  {headshot && (
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-muted-foreground">Body DPS (reference)</span>
                      <span className="text-muted-foreground">{results.bodyDps.toFixed(1)}</span>
                    </div>
                  )}
                  {!results.magCanKill && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      Needs a reload — magazine only holds {weapon.mag} shots ({weapon.mag * weapon.dmg} damage).
                    </div>
                  )}
                </div>
              </div>

              {/* Structure damage */}
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Shots to Destroy Structure</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Wood wall (~100 HP placed)',   shots: results.shotsToBreakWood,  color: 'text-amber-600' },
                    { label: 'Brick wall (~200 HP placed)',  shots: results.shotsToBreakBrick, color: 'text-stone-400' },
                    { label: 'Metal wall (~500 HP max)',  shots: results.shotsToBreakMetal, color: 'text-cyan-400' },
                  ].map(({ label, shots, color }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className={`text-xs font-medium ${color}`}>{label}</span>
                      <span className="text-sm font-bold text-foreground">{shots} shots</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-2">How weapon damage works in Fortnite</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-2">
                  Players normally have <strong className="text-foreground">100 HP + up to 100 shield</strong> (200 effective). Some limited-time modes or items can change that — use the custom HP field when needed.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Headshots</strong> multiply body damage (often ~1.5× on many guns; snipers and some precision weapons can be higher). Structure damage uses approximate placed/max wall HP for wood / brick / metal — walls also heal after placement, so live TTK on builds can differ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
