import type { Metadata } from 'next'
import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponsCatalogClient } from '@/components/WeaponsCatalogClient'
import { WEAPON_CATALOG } from '@/lib/weapons-catalog'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'All Fortnite Weapons – DPS, Damage & Stats by Rarity',
  description:
    'Chapter 7 Season 4 (Override) Fortnite weapons after v42.40 — Pump, 8-Bit, Sweeper, Heavy AR, Wood Stake, Mega Buster, plus vaulted history (Midas’ Masterpiece, Drum Gun). Compare DPS, damage, fire rate, mag, and reload.',
  path: '/weapons',
  keywords: [
    'fortnite weapons',
    'all fortnite weapons',
    'fortnite weapon stats',
    'fortnite override weapons',
    '8-bit shotgun fortnite',
    'mega buster fortnite',
    'fortnite weapon compare',
    'fortnite dps',
    'fortnite shotgun stats',
    'fortnite assault rifle stats',
    'vaulted fortnite weapons',
  ],
})

const faqs = [
  {
    q: 'How many Fortnite weapons are listed here?',
    a: `This encyclopedia includes the current BR loot pool plus a large vaulted history — ${WEAPON_CATALOG.length} weapons with per-rarity DPS, damage, structure damage, fire rate, mag size, and reload. Each gun also has its own stats page.`,
  },
  {
    q: 'Does every Fortnite weapon have its own page?',
    a: `Yes. Open any card for rarity tables, shots-to-kill vs 100/150/200, loot-pool status, and patch history when we have it — ${WEAPON_CATALOG.length} URLs under /weapons.`,
  },
  {
    q: 'How is DPS calculated?',
    a: 'Body damage × fire rate. Useful for comparing guns on paper; bloom, falloff, and pellet spread still decide real fights.',
  },
  {
    q: 'Can I compare two Fortnite weapons?',
    a: 'Yes — use Compare weapons at the top of this page, or tap Compare on any gun card. Pick rarities for each side to see DPS, damage, structure damage, fire rate, mag, and reload.',
  },
  {
    q: 'Where can I test shots-to-kill?',
    a: 'Use the Weapon Damage Calculator for TTK against 100/150/200 HP targets, or open a weapon page for the same math at the planning rarity.',
  },
]

export default function WeaponsPage() {
  const liveCount = WEAPON_CATALOG.filter((w) => !w.vaulted).length
  const vaultedCount = WEAPON_CATALOG.filter((w) => w.vaulted).length

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(
              faqs.map((f) => ({
                question: f.q,
                answer: f.a,
              }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'All Fortnite Weapons', path: '/weapons' },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Weapons</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              All Fortnite <span className="text-primary">Weapons</span>
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Override loot pool after v42.40 — DPS, body damage, structure damage, fire rate,
              mag size, reload. Live highlights: Pump (post–v42.10), 8-Bit, Sweeper (fire-rate bump),
              Heavy AR, Wood Stake, Dual Fiend Hunters, Mega Buster. Midas’ Masterpiece and Drum Gun
              are vaulted. Compare any two guns; toggle vaulted history when you want older loot.
              Gatekeeper / Hunting Rifle / Finger Guns still need Loot Hack.
              Click a gun name for its own page (STK, first-added when we know it, patch history).
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{liveCount}</strong> current ·{' '}
              <strong className="text-foreground">{vaultedCount}</strong> vaulted ·{' '}
              <Link href="/weapon-changes" className="text-primary hover:underline">
                Buffs / nerfs
              </Link>
              {' · '}
              <Link href="/tools/loadout-builder" className="text-primary hover:underline">
                Loadout builder
              </Link>
              {' · '}
              <Link href="/season" className="text-primary hover:underline">
                Season hub
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
          <WeaponsCatalogClient />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Fortnite weapon stats explained
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Each weapon shows one row per rarity with planning stats. Infinite-magazine mythics
              display as ∞. Epic balance patches change numbers — see{' '}
              <Link href="/weapon-changes" className="text-primary hover:underline">
                weapon changes
              </Link>{' '}
              for Old / New / Change history, and confirm in-game after updates. For
              current-meta rankings see the{' '}
              <Link
                href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                className="text-primary hover:underline"
              >
                weapons tier list
              </Link>
              ; for close-range picks, the{' '}
              <Link
                href="/guides/weapons/fortnite-shotgun-guide-best-options"
                className="text-primary hover:underline"
              >
                shotgun guide
              </Link>
              .
            </p>
          </section>

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
        </div>
      </main>
      <Footer />
    </>
  )
}
