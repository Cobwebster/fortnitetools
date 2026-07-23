'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

type Player = {
  name: string
  team: string
  input: 'KBM' | 'Controller'
  keybinds: Record<string, string>
}

const ACTIONS = [
  { id: 'wall',        label: 'Wall',            category: 'Building' },
  { id: 'floor',       label: 'Floor',           category: 'Building' },
  { id: 'ramp',        label: 'Ramp',            category: 'Building' },
  { id: 'roof',        label: 'Roof / Pyramid',  category: 'Building' },
  { id: 'stair',       label: 'Stairs',          category: 'Building' },
  { id: 'edit',        label: 'Edit',            category: 'Building' },
  { id: 'repair',      label: 'Repair / Reset',  category: 'Building' },
  { id: 'crouch',      label: 'Crouch',          category: 'Combat' },
  { id: 'jump',        label: 'Jump',            category: 'Combat' },
  { id: 'sprint',      label: 'Sprint',          category: 'Combat' },
  { id: 'reload',      label: 'Reload',          category: 'Combat' },
  { id: 'interact',    label: 'Interact',        category: 'Combat' },
  { id: 'slot1',       label: 'Weapon Slot 1',   category: 'Inventory' },
  { id: 'slot2',       label: 'Weapon Slot 2',   category: 'Inventory' },
  { id: 'slot3',       label: 'Weapon Slot 3',   category: 'Inventory' },
  { id: 'slot4',       label: 'Weapon Slot 4',   category: 'Inventory' },
  { id: 'slot5',       label: 'Weapon Slot 5',   category: 'Inventory' },
  { id: 'map',         label: 'Map',             category: 'Inventory' },
  { id: 'inventory',   label: 'Inventory',       category: 'Inventory' },
  { id: 'ping',        label: 'Ping / Marker',   category: 'Inventory' },
]

const PROS: Player[] = [
  {
    name: 'Bugha',    team: 'Sentinels', input: 'KBM',
    keybinds: { wall:'Q', floor:'C', ramp:'V', roof:'F', stair:'–', edit:'F', repair:'H', crouch:'L-Ctrl', jump:'Space', sprint:'L-Shift', reload:'R', interact:'E', slot1:'1', slot2:'2', slot3:'3', slot4:'4', slot5:'5', map:'M', inventory:'Tab', ping:'Z' },
  },
  {
    name: 'Clix',     team: 'NRG', input: 'KBM',
    keybinds: { wall:'Q', floor:'C', ramp:'V', roof:'F', stair:'T', edit:'G', repair:'H', crouch:'L-Ctrl', jump:'Space', sprint:'L-Shift', reload:'R', interact:'E', slot1:'1', slot2:'2', slot3:'3', slot4:'4', slot5:'5', map:'M', inventory:'Tab', ping:'Z' },
  },
  {
    name: 'Mongraal', team: 'FaZe', input: 'KBM',
    keybinds: { wall:'Q', floor:'Z', ramp:'C', roof:'V', stair:'–', edit:'F', repair:'H', crouch:'L-Ctrl', jump:'Space', sprint:'L-Shift', reload:'R', interact:'E', slot1:'1', slot2:'2', slot3:'3', slot4:'4', slot5:'5', map:'M', inventory:'Tab', ping:'X' },
  },
  {
    name: 'Benjyfishy', team: 'NIP', input: 'KBM',
    keybinds: { wall:'Q', floor:'C', ramp:'V', roof:'T', stair:'F', edit:'G', repair:'H', crouch:'L-Ctrl', jump:'Space', sprint:'L-Shift', reload:'R', interact:'E', slot1:'1', slot2:'2', slot3:'3', slot4:'4', slot5:'5', map:'M', inventory:'Tab', ping:'Z' },
  },
  {
    name: 'MrSavage',  team: 'NRG', input: 'KBM',
    keybinds: { wall:'Q', floor:'C', ramp:'V', roof:'F', stair:'T', edit:'G', repair:'H', crouch:'L-Ctrl', jump:'Space', sprint:'L-Shift', reload:'R', interact:'E', slot1:'1', slot2:'2', slot3:'3', slot4:'4', slot5:'5', map:'M', inventory:'Tab', ping:'Z' },
  },
]

// Highlight keys that differ between players
function isUnique(action: string, value: string, players: Player[]) {
  const vals = players.map(p => p.keybinds[action])
  return vals.filter(v => v === value).length === 1
}

const CATEGORIES = Array.from(new Set(ACTIONS.map(a => a.category)))

const KBD = ({ children }: { children: string }) => (
  <span className="inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-bold text-foreground min-w-[2rem]">
    {children}
  </span>
)

export default function KeybindsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [highlighted, setHighlighted] = useState<string | null>(null)

  const filteredActions = activeCategory === 'All'
    ? ACTIONS
    : ACTIONS.filter(a => a.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-foreground">Pro Keybinds</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite Pro <span className="text-primary">Keybinds</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Real keyboard bindings used by top competitive Fortnite players. Compare building, editing, and combat keybinds side-by-side to find what works for you.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

          {/* Category filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="sticky left-0 bg-card px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-36">Action</th>
                  {PROS.map(p => (
                    <th key={p.name} className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap min-w-[110px]">
                      <div className="font-bold text-foreground">{p.name}</div>
                      <div className="text-muted-foreground font-normal">{p.team}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.filter(cat => activeCategory === 'All' || cat === activeCategory).map(cat => (
                  <>
                    <tr key={`cat-${cat}`} className="bg-muted/30">
                      <td colSpan={PROS.length + 1} className="px-5 py-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{cat}</span>
                      </td>
                    </tr>
                    {filteredActions.filter(a => a.category === cat).map(action => (
                      <tr
                        key={action.id}
                        className={`border-t border-border/50 transition-colors cursor-default ${highlighted === action.id ? 'bg-primary/5' : 'hover:bg-muted/20'}`}
                        onMouseEnter={() => setHighlighted(action.id)}
                        onMouseLeave={() => setHighlighted(null)}
                      >
                        <td className="sticky left-0 bg-card px-5 py-3 font-medium text-foreground whitespace-nowrap">{action.label}</td>
                        {PROS.map(p => {
                          const val = p.keybinds[action.id] ?? '–'
                          const unique = isUnique(action.id, val, PROS)
                          return (
                            <td key={p.name} className="px-4 py-3 text-center">
                              <span className={unique ? 'opacity-50' : ''}>
                                <KBD>{val}</KBD>
                              </span>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">Keys with lower opacity are used by only one player and may not represent a common pattern.</p>

          {/* Tips */}
          <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'The Q Wall', body: 'Nearly every top keyboard player binds Wall to Q. It is the closest accessible key to WASD and allows you to throw up a wall instantly without disrupting movement.' },
              { title: 'Building on Side Mouse Buttons', body: 'Some players bind floor and ramp to mouse 4 and mouse 5 (side buttons). This keeps your left hand free for movement and keeps builds closer to your aim hand.' },
              { title: 'Edit on a Close Key', body: 'Edit needs to be fast. Most pros use F, G, or T — keys reachable without moving your left hand far from WASD. Slow edit keys are one of the biggest skill bottlenecks for new players.' },
              { title: 'Crouch vs L-Ctrl', body: 'Almost all pros use Left Ctrl for crouch. Some remap it to avoid accidental crouches. The key point is it should not conflict with your building or editing binds.' },
              { title: 'Avoid Number Keys for Builds', body: 'Using 1–4 for builds forces a large hand movement away from WASD and significantly slows your build pace. The closer your build keys are to movement, the faster you can build while moving.' },
              { title: 'Personalise Over Time', body: 'Do not copy pro binds directly if they feel uncomfortable. Start with a logical layout and adjust over months. Muscle memory takes time — changing binds every week resets your progress.' },
            ].map(tip => (
              <div key={tip.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{tip.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{tip.body}</p>
              </div>
            ))}
          </section>

          {/* SEO content */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">Choosing the Best Fortnite Keybinds</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Why Keybinds Matter</h3>
                <p>In Fortnite, you need to switch between movement, building, editing, and shooting within fractions of a second. The faster your hands can execute these transitions, the more responsive your gameplay feels. Poor keybinds — like having builds on number keys far from WASD — create a physical delay that no amount of practice can overcome.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Controller Binds</h3>
                <p>Controller players use a different system entirely. Builder Pro layout is the most popular competitive controller layout, placing building on the face buttons and making it faster to transition from aiming. Most competitive controller players also use paddles or back buttons to free up their thumbs from ever leaving the sticks.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
