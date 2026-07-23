import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { EPIC_DISCLAIMER, siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    'Contact FortniteTools — email thederpywhale@hotmail.com for questions, corrections, or feedback about our free Fortnite tools and guides.',
  path: '/contact',
  keywords: ['contact fortnitetools', 'fortnite tools email'],
})

export default function ContactPage() {
  return (
    <SitePage
      title="Contact"
      description="Questions, corrections, feedback, or partnership ideas — reach out by email."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Email</h2>
        <p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-base font-semibold text-primary hover:underline break-all"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          We read every message we can. Tool bug reports, guide corrections, and map/POI tip updates are especially
          helpful. Please allow a few days for a reply.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">What to include</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>The page or tool URL (for example /tools/loadout-builder)</li>
          <li>What you expected vs what happened</li>
          <li>Device / browser if it looks like a display bug</li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-2">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">Affiliation</h2>
        <p className="text-foreground/90">{EPIC_DISCLAIMER}</p>
        <p>
          More about the project on{' '}
          <Link href="/about" className="text-primary hover:underline">
            About
          </Link>
          .
        </p>
      </section>
    </SitePage>
  )
}
