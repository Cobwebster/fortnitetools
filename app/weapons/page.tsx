import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponsCatalogClient } from '@/components/WeaponsCatalogClient'
import { WEAPON_CATALOG } from '@/lib/weapons-catalog'

const faqs = [
  {
    q: 'How many Fortnite weapons are listed here?',
    a: `This encyclopedia includes the current BR loot pool plus a large vaulted history — ${WEAPON_CATALOG.length} weapons with per-rarity DPS, damage, structure damage, fire rate, mag size, and reload.`,
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
    a: 'Use the Weapon Damage Calculator for TTK against 100/150/200 HP targets, or build a hotbar in the Loadout Builder.',
  },
]

export default function WeaponsPage() {
  const liveCount = WEAPON_CATALOG.filter((w) => !w.vaulted).length
  const vaultedCount = WEAPON_CATALOG.filter((w) => w.vaulted).length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
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
              Complete Fortnite weapons list with rarity tables — DPS, body damage, structure
              damage, fire rate, mag size, and reload. Compare any two guns side by side, browse
              Assault Rifles, Shotguns, SMGs, Pistols, DMRs, Snipers, Bows, Explosives, and more.
              Toggle vaulted history for older loot.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{liveCount}</strong> current ·{' '}
              <strong className="text-foreground">{vaultedCount}</strong> vaulted ·{' '}
              <Link
                href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                className="text-primary hover:underline"
              >
                Meta tier list
              </Link>
              {' · '}
              <Link href="/weapon-changes" className="text-primary hover:underline">
                Weapon changes
              </Link>
              {' · '}
              <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
                Damage calculator
              </Link>
              {' · '}
              <Link href="/tools/loadout-builder" className="text-primary hover:underline">
                Loadout builder
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
