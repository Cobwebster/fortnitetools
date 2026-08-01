import type { Metadata } from 'next'
import Link from 'next/link'
import { SitePage } from '@/components/site-page'
import { createMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy policy for FortniteTools.com — accounts, analytics, Supabase auth, and how to contact us.',
  path: '/privacy',
  keywords: ['fortnitetools privacy', 'privacy policy'],
})

export default function PrivacyPage() {
  return (
    <SitePage
      title="Privacy Policy"
      description="Plain-language privacy notes for FortniteTools.com. Last updated August 2026."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Summary</h2>
        <p>
          FortniteTools is a small independent fan site. Most tools work without signing in. If you create an optional
          account, we store the minimum needed to keep you logged in and to handle things you submit (like feedback or
          loadout uploads). We do not sell your personal information.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Information we collect
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-foreground">Optional accounts</strong> — If you register, we store your email,
            password (handled securely by our auth provider — we do not see your raw password), optional display name,
            and account timestamps. Auth cookies keep you signed in.
          </li>
          <li>
            <strong className="text-foreground">Stuff you submit while logged in</strong> — Feedback / suggestions and
            community loadout submissions (name, loadout title, share URL, and your account id). We use this to run the
            site and may publish moderated loadouts later.
          </li>
          <li>
            <strong className="text-foreground">Usage analytics</strong> — We use Google Analytics for aggregate page
            views and traffic. Google may set cookies or similar identifiers.
          </li>
          <li>
            <strong className="text-foreground">Technical logs</strong> — Standard hosting logs (IP address, browser
            type, timestamps) may be stored briefly by our host for security and reliability.
          </li>
          <li>
            <strong className="text-foreground">Tool inputs</strong> — Calculator values (sensitivity, XP, loadouts,
            player names, etc.) usually stay in your browser unless a tool clearly calls a public game-data API (Item
            Shop, map, player stats, and similar).
          </li>
          <li>
            <strong className="text-foreground">Email</strong> — If you email us, we receive whatever you include so we
            can reply.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          How we use the information
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Provide and improve tools and guides</li>
          <li>Authenticate accounts and protect against abuse</li>
          <li>Review feedback and community submissions</li>
          <li>Understand which pages are useful (analytics)</li>
          <li>Reply when you contact us</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Cookies &amp; local storage
        </h2>
        <p>
          Signed-in sessions use auth cookies from our auth provider. Analytics may set its own cookies. Browsers may
          also store small tool preferences (for example shareable loadout params in the URL). You can clear site data
          anytime in your browser settings. Signing out clears the session on this device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Third-party services
        </h2>
        <p>
          We use <strong className="text-foreground">Supabase</strong> for authentication and database storage for
          accounts and submissions. We use <strong className="text-foreground">Google Analytics</strong> for traffic
          stats. Some tools load public Fortnite-related data from third-party APIs. Those providers have their own
          privacy practices. We do not control Epic Games&apos; services or the official Fortnite client.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Your choices
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>You can use most of the site without creating an account</li>
          <li>You can update your display name or password from your account page</li>
          <li>You can sign out anytime</li>
          <li>
            To delete your account or submitted content, email{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.contactEmail}
            </a>{' '}
            from the address on the account
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Children</h2>
        <p>
          The site discusses a game played by many ages. We do not knowingly collect personal information from children
          for marketing. Accounts are optional. If you believe a child has shared personal data with us, contact us and
          we will delete it where we can.
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
          . Also see our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </SitePage>
  )
}
