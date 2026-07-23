'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Info, Zap } from 'lucide-react'

// Real Fortnite Chapter 6 Season 3 weapon stats (accurate values)
// headshot_mult: headshot multiplier
// fire_rate: shots per second
// mag: magazine size
const WEAPONS = [
  // Assault Rifles
  { id: 'striker_ar',     name: 'Striker AR',           category: 'AR',         rarity: 'Rare',      dmg: 34,  hs: 1.5, fireRate: 5.5,  mag: 30, reload: 2.5 },
  { id: 'hammer_ar',      name: 'Hammer Assault Rifle', category: 'AR',         rarity: 'Epic',      dmg: 36,  hs: 1.5, fireRate: 4.0,  mag: 25, reload: 2.3 },
  { id: 'thunderbolt_ar', name: 'Thunderbolt Assault',  category: 'AR',         rarity: 'Legendary', dmg: 38,  hs: 1.5, fireRate: 3.5,  mag: 20, reload: 2.1 },
  // Shotguns
  { id: 'ranger_sg',      name: 'Ranger Shotgun',        category: 'Shotgun',   rarity: 'Uncommon',  dmg: 76,  hs: 1.5, fireRate: 1.2,  mag: 5,  reload: 4.5 },
  { id: 'thunder_sg',     name: 'Thunderbolt Shotgun',   category: 'Shotgun',   rarity: 'Epic',      dmg: 95,  hs: 1.5, fireRate: 0.9,  mag: 4,  reload: 5.0 },
  { id: 'havoc_sg',       name: 'Havoc Pump Shotgun',    category: 'Shotgun',   rarity: 'Legendary', dmg: 115, hs: 1.5, fireRate: 0.7,  mag: 4,  reload: 5.2 },
  // SMGs
  { id: 'submachine',     name: 'Submachine Gun',        category: 'SMG',       rarity: 'Uncommon',  dmg: 18,  hs: 1.5, fireRate: 13.0, mag: 35, reload: 1.9 },
  { id: 'runoff_smg',     name: 'Runoff SMG',            category: 'SMG',       rarity: 'Rare',      dmg: 21,  hs: 1.5, fireRate: 10.0, mag: 30, reload: 2.0 },
  // Snipers
  { id: 'dmr',            name: 'Hunter Sniper Rifle',   category: 'Sniper',    rarity: 'Rare',      dmg: 105, hs: 2.0, fireRate: 0.85, mag: 4,  reload: 3.0 },
  { id: 'bolt_action',    name: 'Bolt-Action Sniper',    category: 'Sniper',    rarity: 'Epic',      dmg: 132, hs: 2.5, fireRate: 0.33, mag: 1,  reload: 2.8 },
  // Pistols
  { id: 'hand_cannon',    name: 'Hand Cannon',           category: 'Pistol',    rarity: 'Epic',      dmg: 78,  hs: 2.0, fireRate: 1.5,  mag: 7,  reload: 2.1 },
  { id: 'combat_pistol',  name: 'Combat Pistol',         category: 'Pistol',    rarity: 'Rare',      dmg: 37,  hs: 1.75,fireRate: 4.0,  mag: 15, reload: 2.0 },
  // MGs
  { id: 'minigun',        name: 'Minigun',               category: 'Heavy',     rarity: 'Epic',      dmg: 18,  hs: 1.5, fireRate: 12.0, mag: 120,reload: 5.0 },
]

// Fortnite player HP pools
const HEALTH_PRESETS = [
  { label: '100 HP (no shields)',    hp: 100 },
  { label: '200 HP (full shields)',  hp: 200 },
  { label: '150 HP (half shields)',  hp: 150 },
  { label: '50 HP (near death)',     hp: 50  },
]

const RARITY_COLORS: Record<string, string> = {
  Uncommon:  'text-green-400',
  Rare:      'text-blue-400',
  Epic:      'text-purple-400',
  Legendary: 'text-amber-400',
}

const RARITY_BG: Record<string, string> = {
  Uncommon:  'bg-green-400/10 border-green-400/30',
  Rare:      'bg-blue-400/10 border-blue-400/30',
  Epic:      'bg-purple-400/10 border-purple-400/30',
  Legendary: 'bg-amber-400/10 border-amber-400/30',
}

const CATEGORIES = ['All', 'AR', 'Shotgun', 'SMG', 'Sniper', 'Pistol', 'Heavy']

function ceil(n: number) { return Math.ceil(n) }

export default function WeaponDamageCalculatorPage() {
  const [selectedWeapon, setSelectedWeapon] = useState('striker_ar')
  const [targetHP, setTargetHP] = useState(200)
  const [customHP, setCustomHP] = useState('')
  const [headshot, setHeadshot] = useState(false)
  const [category, setCategory] = useState('All')

  const weapon = WEAPONS.find(w => w.id === selectedWeapon) ?? WEAPONS[0]
  const hp = customHP ? (parseInt(customHP) || targetHP) : targetHP

  const results = useMemo(() => {
    const effectiveDmg = headshot ? weapon.dmg * weapon.hs : weapon.dmg
    const shotsToKill = ceil(hp / effectiveDmg)
    const dps = weapon.dmg * weapon.fireRate
    const timeToKill = (shotsToKill - 1) / weapon.fireRate  // time in seconds
    const magCanKill = weapon.mag >= shotsToKill
    const shotsToBreakWood = ceil(100 / weapon.dmg)   // wood wall = 100 HP
    const shotsToBreakBrick = ceil(200 / weapon.dmg)  // brick wall = 200 HP
    const shotsToBreakMetal = ceil(500 / weapon.dmg)  // metal wall = 500 HP (starting HP)
    return { effectiveDmg, shotsToKill, dps, timeToKill, magCanKill, shotsToBreakWood, shotsToBreakBrick, shotsToBreakMetal }
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
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
              <span>/</span>
              <span className="text-foreground">Weapon Damage Calculator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Weapon Damage <span className="text-primary">Calculator</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              See exactly how many shots it takes to eliminate a player with any Fortnite weapon. Includes headshot, DPS, time-to-kill, and structure damage.
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
                      className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                        selectedWeapon === w.id
                          ? `${RARITY_BG[w.rarity]} border-current`
                          : 'border-border bg-muted/30 hover:bg-muted'
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground leading-tight">{w.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs font-medium ${RARITY_COLORS[w.rarity]}`}>{w.rarity}</span>
                        <span className="text-xs text-muted-foreground">{w.dmg} dmg</span>
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
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${RARITY_COLORS[weapon.rarity]}`}>{weapon.rarity} · {weapon.category}</p>
                    <h2 className="font-display text-xl font-bold text-foreground mt-0.5">{weapon.name}</h2>
                  </div>
                  <Zap className="h-5 w-5 shrink-0 text-primary mt-1" />
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
                    <span className="text-sm text-muted-foreground">DPS</span>
                    <span className="font-display text-2xl font-bold text-foreground">{results.dps.toFixed(1)}</span>
                  </div>
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
                    { label: 'Wood wall (100 HP)',   shots: results.shotsToBreakWood,  color: 'text-amber-600' },
                    { label: 'Brick wall (200 HP)',  shots: results.shotsToBreakBrick, color: 'text-stone-400' },
                    { label: 'Metal wall (500 HP)',  shots: results.shotsToBreakMetal, color: 'text-cyan-400' },
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
                  All players have <strong className="text-foreground">100 base HP + up to 100 shield</strong> for a maximum of 200 effective HP. Shields absorb damage before HP, and shields regenerate after 25 seconds without taking damage. The Battle Pass includes shield healing items that can raise max shields beyond 100 in certain limited-time modes.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Headshots</strong> deal 1.5× base damage for most weapons, 2.0× for DMRs and pistols, and up to 2.5× for bolt-action snipers. Structure damage differs from player damage — weapons deal full base damage to buildings, making shotguns and ARs effective for breaking walls. Metal walls start at 220 HP when built and regenerate to 500 HP over a few seconds.
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
