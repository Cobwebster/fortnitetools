import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { EPIC_DISCLAIMER, siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Simple terms for using FortniteTools.com — free fan tools, optional accounts, and common-sense rules.',
  path: '/terms',
  keywords: ['fortnitetools terms', 'terms of service'],
})

export default function TermsPage() {
  return (
    <SitePage
      title="Terms of Service"
      description="Chill, plain-English terms. Last updated August 2026. Not a scary corporate novel."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">The vibe</h2>
        <p>
          FortniteTools is a free fan site with calculators, maps, codes, and guides. Use it, share it, don&apos;t be
          weird. By using the site you agree to these terms. If you don&apos;t like them, no hard feelings — just
          don&apos;t use the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Not Epic Games
        </h2>
        <p>{EPIC_DISCLAIMER}</p>
        <p>
          We are not an official Fortnite product. Game names, images, and trademarks belong to their owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          What the site is for
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Planning loadouts, XP, settings, maps, and similar helper tools</li>
          <li>Reading guides and Creative codes</li>
          <li>Optional accounts for feedback and community loadout submissions</li>
        </ul>
        <p>
          We do <strong className="text-foreground">not</strong> sell V-Bucks, accounts, cheats, hacks, or real-money
          item trades. Don&apos;t use the site to promote that stuff.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Tools are estimates
        </h2>
        <p>
          Damage, XP, V-Bucks math, timers, map archives, and similar numbers can be wrong after patches. Always trust
          the live game over our pages. We&apos;re not liable if a calculator is off, a code stops working, or you make
          a purchase based on something here.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Accounts</h2>
        <p>
          Accounts are optional. If you register, keep your password to yourself, don&apos;t share accounts to abuse
          features, and don&apos;t submit spam, scams, or junk. We can suspend or delete accounts that break these
          rules or hurt the site.
        </p>
        <p>
          Content you submit (feedback, loadout names/links, etc.) may be stored and — for loadouts — possibly shown
          publicly later after moderation. Don&apos;t submit anything you don&apos;t want associated with your display
          name.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Be cool
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>No scraping the site into the ground or attacking our services</li>
          <li>No pretending to be FortniteTools or Epic</li>
          <li>No uploading illegal, hateful, or abusive content</li>
          <li>No using our brand to run phishing / free V-Bucks scams</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Availability
        </h2>
        <p>
          The site might go down, change, or lose features. We&apos;ll try to keep things working, but there&apos;s no
          uptime guarantee and no warranty of any kind. Free site energy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Liability (short version)
        </h2>
        <p>
          To the fullest extent allowed by law, FortniteTools and its operators aren&apos;t responsible for indirect or
          consequential damages from using the site. If something goes wrong, your main remedy is to stop using the
          site. Local consumer laws that can&apos;t be waived still apply where they apply.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Changes</h2>
        <p>
          We may update these terms. The “Last updated” note at the top is the cue. Keeping using the site after a
          change means you&apos;re fine with the new version.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Contact</h2>
        <p>
          Questions:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
            {siteConfig.contactEmail}
          </a>{' '}
          ·{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>{' '}
          ·{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link href="/about" className="text-primary hover:underline">
            About
          </Link>
          .
        </p>
      </section>
    </SitePage>
  )
}
