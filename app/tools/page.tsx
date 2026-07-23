import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteIcon } from '@/components/fortnite-icon'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { toolIcon } from '@/lib/site-icons'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Tools – Free Calculators',
  description:
    'Free Fortnite tools: interactive map, item shop tracker, sensitivity converter, V-Bucks calculator, K/D calculator, zone timer, keybinds, FPS settings, XP calculator, and weapon damage calculator.',
  path: '/tools',
  keywords: [
    'fortnite tools',
    'fortnite interactive map',
    'fortnite item shop',
    'fortnite sensitivity calculator',
    'fortnite kd calculator',
    'vbucks calculator',
    'fortnite zone timer',
    'fortnite xp calculator',
  ],
})

const TOOLS = [
  {
    href: '/fortnite-map',
    title: 'Interactive Map',
    description:
      'Shattered Coast POI map with loot ratings, contest filters, and drop tips for Chapter 7 Season 3.',
    tags: ['Map', 'Loot', 'POIs'],
  },
  {
    href: '/tools/item-shop',
    title: 'Item Shop Tracker',
    description:
      'Live shop rotation plus newly added cosmetics and a searchable catalog of outfits, emotes, and more.',
    tags: ['Shop', 'Skins', 'Emotes'],
  },
  {
    href: '/tools/loadout-builder',
    title: 'Loadout Builder',
    description:
      'Build a C7S3 hotbar with real item icons — shotgun, AR, SMG, heals, mobility — plus estimated STK/TTK.',
    tags: ['Loadout', 'Weapons', 'TTK'],
  },
  {
    href: '/tools/sensitivity-calculator',
    title: 'Sensitivity Calculator',
    description: 'Convert mouse sensitivity from Valorant, CS2, Apex, and more to Fortnite using cm/360 as a starting point.',
    tags: ['Aim', 'Settings', 'Mouse'],
  },
  {
    href: '/tools/kd-calculator',
    title: 'K/D Calculator',
    description: 'Calculate Kill/Death ratio, win rate, and kills per game with rough public-lobby comparison ranges.',
    tags: ['Stats', 'K/D', 'Win Rate'],
  },
  {
    href: '/tools/zone-timer',
    title: 'Zone Timer',
    description: 'Storm circle wait and shrink reference for Chapter 7 Season 3. Start it when a new zone appears so you know when to rotate.',
    tags: ['Storm', 'Rotation', 'Strategy'],
  },
  {
    href: '/tools/fps-settings',
    title: 'FPS & Settings Guide',
    description: 'Graphics, display, and audio presets for competitive, balanced, and quality play — with notes on what actually costs FPS.',
    tags: ['FPS', 'Graphics', 'Settings'],
  },
  {
    href: '/tools/keybinds',
    title: 'Pro Keybinds Reference',
    description: 'Side-by-side keyboard bind reference for well-known players. Use it as a starting point, not a mandatory layout.',
    tags: ['Keybinds', 'Building', 'Pro'],
  },
  {
    href: '/tools/weapon-damage-calculator',
    title: 'Weapon Damage Calculator',
    description: 'Shots-to-kill, TTK, and DPS estimates for Chapter 7 Season 3 weapons in the current loot pool sample.',
    tags: ['Weapons', 'Damage', 'TTK'],
  },
  {
    href: '/tools/vbucks-calculator',
    title: 'V-Bucks Calculator',
    description: 'Build a wishlist and estimate a low-cost V-Bucks pack combination using common USD storefront prices.',
    tags: ['V-Bucks', 'Skins', 'Shop'],
  },
  {
    href: '/tools/battle-pass-xp-calculator',
    title: 'Battle Pass XP Calculator',
    description: 'Check if you can finish the Battle Pass before the season ends. Enter your level and weekly XP sources to project your final level.',
    tags: ['XP', 'Battle Pass', 'Levels'],
  },
]

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Tools</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Tools</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Free interactive tools built for Fortnite players. Calculate your sensitivity, V-Bucks costs, Battle Pass progress, and weapon damage — all updated for the current season.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all"
              >
                <div className="flex items-start gap-4">
                  <FortniteIcon
                    src={toolIcon(tool.href)}
                    alt=""
                    size="md"
                    frameClassName="group-hover:border-primary/40 group-hover:bg-black/70 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="rounded px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Open tool
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              About These Tools
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Sensitivity Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Switching from Valorant, CS2, or Apex? Convert with cm/360 as a starting point, then fine-tune in Creative once building and editing feel right.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">V-Bucks Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Packs come in fixed sizes. Add Item Shop prices to a wishlist and we search for a low-cost pack combo using common USD prices (regional storefronts can differ).
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Battle Pass XP Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Seasons are roughly 10 weeks. Plug in your level and weekly XP sources to see whether you finish the pass before Chapter 7 Season 3 ends.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Weapon Damage Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Compare approximate shots-to-kill and TTK for the current Runners loot pool so you can plan loadouts before you drop.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
