import type { Metadata } from 'next'
import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LockerDirectoryGrid } from '@/components/LockerDirectoryGrid'
import { breadcrumbJsonLd, createMetadata } from '@/lib/seo'
import { listPublicLockers } from '@/lib/lockers-db'
import { CURRENT_SEASON } from '@/lib/season'
import { siteConfig } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = createMetadata({
  title: 'Player Fortnite Lockers',
  description:
    'Browse public Fortnite lockers players built on FortniteTools. Open a share link, or sign in and make yours.',
  path: '/lockers',
  keywords: [
    'fortnite lockers',
    'player fortnite lockers',
    'shared fortnite locker',
    'fortnite cosmetics locker',
  ],
})

export default async function PlayerLockersPage() {
  const lockers = await listPublicLockers()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Player lockers', path: '/lockers' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Player Fortnite lockers',
            description: 'Public lockers shared by FortniteTools players.',
            url: `${siteConfig.url}/lockers`,
            numberOfItems: lockers.length,
            itemListElement: lockers.map((locker, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${siteConfig.url}/locker/${locker.slug}`,
              name: `${locker.displayName}’s Fortnite locker`,
            })),
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Player lockers</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Community
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Player <span className="text-primary">Lockers</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Public lockers people built here — outfits, pickaxes, wraps, the lot. Open a link, or
              submit yours.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
          <Link
            href="/locker"
            className="block overflow-hidden rounded-2xl border border-primary/40 bg-linear-to-br from-primary/20 via-card to-card p-5 sm:p-6 transition-colors hover:border-primary/70"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Submit yours
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Put your locker on this page
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sign in, add cosmetics at <span className="text-foreground">/locker</span>, and your
              share link shows up here for anyone to open.
            </p>
            <span className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground">
              Build at /locker
            </span>
          </Link>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {lockers.length
                ? `${lockers.length} public locker${lockers.length === 1 ? '' : 's'}`
                : 'Public lockers'}
            </h2>
            <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
              Each card is a real player page.
            </p>
            <LockerDirectoryGrid lockers={lockers} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
