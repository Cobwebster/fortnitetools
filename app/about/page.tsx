import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { EPIC_DISCLAIMER } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'About FortniteTools',
  description:
    'FortniteTools is an independent fan site with free Fortnite calculators, maps, and season guides. Not affiliated with Epic Games.',
  path: '/about',
  keywords: ['about fortnitetools', 'fortnite fan site', 'fortnite tools'],
})

export default function AboutPage() {
  return (
    <SitePage
      title="About"
      description="Who we are, what this site is for, and how we relate to Fortnite and Epic Games."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">What is FortniteTools?</h2>
        <p>
          FortniteTools is a free, independent fan site. We build simple calculators and guides so players can plan loadouts,
          check Item Shop cosmetics, convert sensitivity, track XP, and learn the current map — without signup walls or
          paywalled basics.
        </p>
        <p>
          Content is written for the live season and updated when the loot pool, map, or systems change. Numbers in tools
          (damage, XP, V-Bucks packs, storm timers) are planning estimates and can drift after patches.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">What we do (and don&apos;t)</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Free tools: map, loadout builder, shop browser, sensitivity, XP, V-Bucks helpers, and more</li>
          <li>Season-focused guides with honest disclaimers when data is approximate</li>
          <li>No accounts required for core tools</li>
          <li>We do not sell V-Bucks, accounts, cheats, or in-game items</li>
          <li>We do not claim to be an official Epic Games product</li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-2">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
          Not affiliated with Epic Games
        </h2>
        <p className="text-foreground/90">{EPIC_DISCLAIMER}</p>
        <p>
          We respect Epic&apos;s IP and want that boundary to stay clear. Questions or partnership ideas? See{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          .
        </p>
      </section>

      <p>
        Privacy details are on our{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>{' '}
        page.
      </p>
    </SitePage>
  )
}
