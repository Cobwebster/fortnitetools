import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MousePointer2, DollarSign, Trophy, Crosshair, TrendingUp, Monitor, Keyboard, Timer, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fortnite Tools – Free Calculators & Interactive Tools | FortniteTools.com',
  description:
    'Free Fortnite tools: sensitivity converter, V-Bucks calculator, K/D calculator, zone timer, keybinds reference, FPS settings guide, XP calculator, and weapon damage calculator.',
  keywords: ['fortnite tools', 'fortnite sensitivity calculator', 'fortnite kd calculator', 'vbucks calculator', 'fortnite zone timer', 'best fortnite settings', 'fortnite keybinds', 'fortnite xp calculator'],
  openGraph: {
    title: 'Fortnite Tools – Free Calculators & Interactive Tools',
    description: 'Free Fortnite tools built for serious players. Sensitivity converter, K/D calculator, zone timer, pro keybinds, FPS settings, and more.',
    url: 'https://fortnitetools.com/tools',
  },
}

const TOOLS = [
  {
    href: '/tools/sensitivity-calculator',
    icon: MousePointer2,
    title: 'Sensitivity Calculator',
    description: 'Convert your mouse sensitivity from Valorant, CS2, Apex, Warzone, and 5 more games to Fortnite. Matches your exact cm/360.',
    tags: ['Aim', 'Settings', 'Mouse'],
  },
  {
    href: '/tools/kd-calculator',
    icon: TrendingUp,
    title: 'K/D Calculator',
    description: 'Calculate your Kill/Death ratio, win rate, and kills per game. Compare your stats against the average player and pro benchmarks.',
    tags: ['Stats', 'K/D', 'Win Rate'],
  },
  {
    href: '/tools/zone-timer',
    icon: Timer,
    title: 'Zone Timer',
    description: 'Real wait and shrink times for every storm circle in Chapter 6 Season 2. Start it when a new zone appears and know exactly when to rotate.',
    tags: ['Storm', 'Rotation', 'Strategy'],
  },
  {
    href: '/tools/fps-settings',
    icon: Monitor,
    title: 'FPS & Settings Guide',
    description: 'Every graphics, display, and audio setting explained with competitive, balanced, and quality presets. Find the right settings for your PC.',
    tags: ['FPS', 'Graphics', 'Settings'],
  },
  {
    href: '/tools/keybinds',
    icon: Keyboard,
    title: 'Pro Keybinds Reference',
    description: 'Real keybindings from Bugha, Clix, Mongraal, Benjyfishy, and MrSavage. Compare building, editing, and combat binds side-by-side.',
    tags: ['Keybinds', 'Building', 'Pro'],
  },
  {
    href: '/tools/weapon-damage-calculator',
    icon: Crosshair,
    title: 'Weapon Damage Calculator',
    description: 'See shots-to-kill, time-to-kill, DPS, and structure damage for every weapon in the current season. Toggle headshots and target HP.',
    tags: ['Weapons', 'Damage', 'TTK'],
  },
  {
    href: '/tools/vbucks-calculator',
    icon: DollarSign,
    title: 'V-Bucks Calculator',
    description: 'Build a wishlist from real Item Shop prices and find the cheapest pack combination. Never overpay for V-Bucks again.',
    tags: ['V-Bucks', 'Skins', 'Shop'],
  },
  {
    href: '/tools/battle-pass-xp-calculator',
    icon: Trophy,
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
        {/* Hero */}
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

        {/* Tools grid */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tool.tags.map(tag => (
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
              )
            })}
          </div>
        </section>

        {/* SEO content */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              About These Tools
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Sensitivity Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The most common question players ask when switching to Fortnite from Valorant, CS2, or Apex is "what should my sensitivity be?" Our converter uses each game&apos;s internal multiplier to compute the exact cm/360 equivalence, so you land in Fortnite with identical aim feel from day one.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">V-Bucks Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  V-Bucks are sold in fixed bundles, which makes it confusing to figure out the cheapest way to cover a specific wishlist. Our calculator automatically finds the optimal pack combination and shows you the real per-V-Buck cost so you never overpay.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Battle Pass XP Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Seasons are 10 weeks long and require 8,000,000 XP to complete the Battle Pass. This tool tells you whether your current play style will get you there — and which XP sources to add if you&apos;re falling short.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Weapon Damage Calculator</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Knowing your shots-to-kill and time-to-kill is essential for decision making in fights. A 115-damage pump shotgun kills a fully-shielded player in 2 headshots — something every player should know before choosing their loadout.
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
