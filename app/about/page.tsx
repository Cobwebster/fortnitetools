import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { EPIC_DISCLAIMER, siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'About FortniteTools',
  description:
    'FortniteTools is an independent fan site built by a Fortnite player who wanted better free tools and guides. Not affiliated with Epic Games.',
  path: '/about',
  keywords: ['about fortnitetools', 'fortnite fan site', 'fortnite tools'],
})

export default function AboutPage() {
  return (
    <SitePage
      title="About"
      description="Who runs FortniteTools, why it exists, and how we relate to Fortnite and Epic Games."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Why this site exists
        </h2>
        <p>
          FortniteTools was started by a Fortnite player who got tired of clunky, ad-heavy, or paywalled helpers and
          wanted a cleaner place for free tools that actually help in-game. The goal is simple: calculators, map helpers,
          shop lookups, and season guides you can use without signing up for every click.
        </p>
        <p>
          I still play and keep the site updated when the loot pool, map, or season systems change. Numbers in tools
          (damage, XP, V-Bucks packs, storm timers) are planning estimates and can drift after patches — guides call that
          out when it matters.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          What is FortniteTools?
        </h2>
        <p>
          An independent fan site with free Fortnite calculators and practical guides — sensitivity conversion, K/D and
          XP helpers, weapon damage estimates, FPS settings, keybinds, the interactive map, Item Shop browsing, and
          how-to articles for the live season.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          What we do (and don&apos;t)
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Free tools: map, loadout builder, shop browser, sensitivity, XP, V-Bucks helpers, and more</li>
          <li>Season-focused guides with honest disclaimers when data is approximate</li>
          <li>Core tools work without an account; optional login for feedback and community submissions</li>
          <li>We do not sell V-Bucks, accounts, cheats, or in-game items</li>
          <li>We do not claim to be an official Epic Games product</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          How pages get updated
        </h2>
        <p>
          When Epic ships a new season or a mid-season loot hotfix, I check the map layers, weapon stats, shop reset,
          and the guides that name specific guns. Dates in articles are real review dates, not a sitemap stamp. If a
          number is an estimate (storm timers, TTK, V-Bucks pack math), the page says so.
        </p>
        <p>
          I do not pad the site with extra calculators, translated clones of the same form, or a page per cosmetic.
          Those look busy and read empty. The indexable corpus is the interactive tools plus the season guides.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Who runs it</h2>
        <p>
          FortniteTools is a solo fan project. Questions, corrections, bug reports, or partnership ideas are welcome at{' '}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-primary hover:underline break-all"
          >
            {siteConfig.contactEmail}
          </a>
          . The same address is on our{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>{' '}
          page.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-2">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
          Not affiliated with Epic Games
        </h2>
        <p className="text-foreground/90">{EPIC_DISCLAIMER}</p>
        <p>
          We respect Epic&apos;s IP and want that boundary to stay clear. For privacy details, see our{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </SitePage>
  )
}
