import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ToolsCatalogClient } from '@/components/ToolsCatalogClient'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Tools – Free Calculators',
  description:
    'Free Fortnite tools: XP calculator, season countdown, player stats lookup, skin rarity calculator, interactive map, item shop tracker, sensitivity converter, V-Bucks calculator, K/D calculator, zone timer, keybinds, FPS settings, and weapon damage calculator.',
  path: '/tools',
  keywords: [
    'fortnite tools',
    'fortnite xp calculator',
    'fortnite season countdown',
    'when does fortnite season end',
    'fortnite map codes',
    'fortnite xp map codes',
    'fortnite creative codes',
    'fortnite stats',
    'fortnite rare skins',
    'fortnite skin rarity calculator',
    'fortnite tracker',
    'fortnite interactive map',
    'fortnite item shop',
    'fortnite sensitivity calculator',
    'fortnite kd calculator',
    'vbucks calculator',
    'fortnite zone timer',
    'fortnite xp calculator',
  ],
})

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Tools</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Tools</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Free interactive tools built for Fortnite players. Calculate your sensitivity, V-Bucks
              costs, Battle Pass progress, and weapon damage — all updated for the current season.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <ToolsCatalogClient />
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              About These Tools
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  Skin Rarity Calculator
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  People search &quot;rare Fortnite skins&quot; constantly. This lookup separates shop color
                  tiers from real scarcity using appearance history and exclusive sources.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  Sensitivity Calculator
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Switching from Valorant, CS2, or Apex? Convert with cm/360 as a starting point, then
                  fine-tune in Creative once building and editing feel right.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  V-Bucks Calculator
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Packs come in fixed sizes. Add Item Shop prices to a wishlist and we search for a
                  low-cost pack combo using common USD prices (regional storefronts can differ).
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  Battle Pass XP Calculator
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Seasons are roughly 10 weeks. Plug in your level and weekly XP sources to see whether
                  you finish the pass before Chapter 7 Season 3 ends.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  Weapon Damage Calculator
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Compare approximate shots-to-kill and TTK for the current Runners loot pool so you
                  can plan loadouts before you drop.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  Fortnite Tracker
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Look up any Epic, PlayStation, or Xbox name for K/D, wins, matches, and playlist
                  splits — useful for lobbies, duo tryouts, or tracking your own season.
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
