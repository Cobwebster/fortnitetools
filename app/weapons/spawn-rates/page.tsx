import type { Metadata } from 'next'
import Link from '@/components/link'
import { AdSenseUnit } from '@/components/adsense-unit'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponSpawnRatesClient } from '@/components/WeaponSpawnRatesClient'
import { SPAWN_RATES_META, getSpawnWeaponsForMode } from '@/lib/weapon-spawn-rates'
import { CURRENT_SEASON } from '@/lib/season'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'

const liveCount = getSpawnWeaponsForMode('br').length

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Weapon Spawn Rates – Chest, Floor, Rare & Supply',
  description: `Treasure Hunters (${SPAWN_RATES_META.patch}) Fortnite weapon spawn rates — chest, floor loot, rare chest, and supply drop odds per roll for Battle Royale, Ranked, and Zero Build. ${liveCount} weapons curated ${SPAWN_RATES_META.capturedAt}.`,
  path: '/weapons/spawn-rates',
  keywords: [
    'fortnite spawn rates',
    'fortnite chest spawn rates',
    'fortnite floor loot rates',
    'fortnite loot pool odds',
    'fortnite weapon drop chance',
    'treasure hunters loot pool',
  ],
})

const faqs = [
  {
    q: 'What do these spawn rate percentages mean?',
    a: 'Each number is the chance that one loot-container roll yields that weapon at any rarity. Chests and rare chests roll several times per open, so the chance you see the gun from a full chest is higher than a single roll.',
  },
  {
    q: 'Which playlists are covered?',
    a: 'Battle Royale is curated. Ranked and Zero Build currently use the same BR pool on this page. Reload, Blitz, and OG use different pools and are marked Soon until we publish separate tables.',
  },
  {
    q: 'Are these official Epic numbers?',
    a: `They are curated planning figures from public loot-pool data (captured ${SPAWN_RATES_META.capturedAt}, ${SPAWN_RATES_META.patch}). Epic hotfixes mid-week — confirm in-game after updates.`,
  },
  {
    q: 'Where are full weapon stats?',
    a: 'Open the weapons encyclopedia for DPS, damage, fire rate, mag, and reload by rarity, or use the loadout builder for STK planning.',
  },
]

export default function WeaponSpawnRatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a })))
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Weapons', path: '/weapons' },
              { name: 'Spawn Rates', path: '/weapons/spawn-rates' },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 15% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 0%, color-mix(in oklab, #f59e0b 12%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/weapons" className="hover:text-primary transition-colors">
                Weapons
              </Link>
              <span>/</span>
              <span className="text-foreground">Spawn Rates</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Loot odds
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Weapon <span className="text-primary">Spawn Rates</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Chest, floor loot, rare chest, and supply drop odds for the live Treasure Hunters
              combat pool — {liveCount} weapons, sorted by how often they roll. Ranked and Zero
              Build share the BR table here; Reload / Blitz / OG come next.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/weapons" className="text-primary hover:underline">
                Weapons encyclopedia
              </Link>
              {' · '}
              <Link href="/weapon-changes" className="text-primary hover:underline">
                Buffs / nerfs
              </Link>
              {' · '}
              <Link href="/tools/loadout-builder" className="text-primary hover:underline">
                Loadout builder
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <AdSenseUnit variant="inTool" />
          <WeaponSpawnRatesClient />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-sm font-bold text-foreground">{faq.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <AdSenseUnit variant="endOfBlog" />
        </div>
      </main>
      <Footer />
    </>
  )
}
