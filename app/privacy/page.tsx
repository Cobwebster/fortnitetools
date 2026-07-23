import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Simple privacy policy for FortniteTools.com — what we collect (very little), analytics, and how to contact us.',
  path: '/privacy',
  keywords: ['fortnitetools privacy', 'privacy policy'],
})

export default function PrivacyPage() {
  return (
    <SitePage
      title="Privacy Policy"
      description="Plain-language privacy notes for FortniteTools.com. Last updated July 2026."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Summary</h2>
        <p>
          FortniteTools is a small fan site. We do not run user accounts, and we do not sell your personal information. This
          page explains the limited data involved when you use the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Information we collect</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-foreground">Usage analytics</strong> — We use Google Analytics and Vercel Analytics to
            see aggregate page views and performance. This helps us fix broken pages and improve tools. Google may set
            cookies or similar identifiers as part of that service.
          </li>
          <li>
            <strong className="text-foreground">Technical logs</strong> — Standard hosting logs (IP address, browser type,
            timestamps) may be stored briefly by our host for security and reliability.
          </li>
          <li>
            <strong className="text-foreground">Tool inputs</strong> — Values you type into calculators (sensitivity, XP,
            loadouts, player names, etc.) stay in your browser unless a tool clearly sends a request to a public game-data
            API to fetch live information (for example the Item Shop, map, or player stats lookup).
          </li>
          <li>
            <strong className="text-foreground">Email</strong> — If you email us, we receive whatever you include in that
            message so we can reply.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Cookies &amp; local storage</h2>
        <p>
          We do not use advertising trackers. Your browser may store small local preferences for tools (for example a
          shareable loadout link in the address bar). You can clear site data anytime in your browser settings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Third-party services</h2>
        <p>
          Some tools load public Fortnite-related data from third-party APIs (for example shop or map imagery). Those
          providers have their own privacy practices. We do not control Epic Games&apos; services or official Fortnite
          clients.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Children</h2>
        <p>
          The site discusses a game played by many ages. We do not knowingly collect personal information from children. If
          you believe a child has sent us personal data by email, contact us and we will delete it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Contact</h2>
        <p>
          Privacy questions:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
            {siteConfig.contactEmail}
          </a>{' '}
          or visit{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          .
        </p>
      </section>
    </SitePage>
  )
}
