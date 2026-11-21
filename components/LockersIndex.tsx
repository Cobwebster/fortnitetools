import Link from '@/components/link'
import { LockerDirectoryGrid } from '@/components/LockerDirectoryGrid'
import { LockersPagination } from '@/components/LockersPagination'
import { listPublicLockers } from '@/lib/lockers-db'
import {
  LOCKERS_PAGE_SIZE,
  lockersPageHref,
  paginateLockers,
} from '@/lib/lockers-pagination'
import { breadcrumbJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'
import { siteConfig } from '@/lib/site'

export async function LockersIndex({ page }: { page: number }) {
  const all = await listPublicLockers().catch(() => [])
  const paged = paginateLockers(all, page)
  const path = lockersPageHref(page)
  const from = paged.total ? (page - 1) * LOCKERS_PAGE_SIZE + 1 : 0
  const to = paged.total ? (page - 1) * LOCKERS_PAGE_SIZE + paged.items.length : 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Player lockers', path: '/lockers' },
              ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name:
              page > 1
                ? `Player Fortnite Lockers – Page ${page}`
                : 'Player Fortnite lockers',
            description: 'Public lockers shared by FortniteTools players.',
            url: `${siteConfig.url}${path}`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Player Fortnite lockers',
              url: `${siteConfig.url}/lockers`,
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: paged.total,
              itemListElement: paged.items.map((locker, index) => ({
                '@type': 'ListItem',
                position: (page - 1) * LOCKERS_PAGE_SIZE + index + 1,
                url: `${siteConfig.url}/locker/${locker.slug}`,
                name: `${locker.displayName}’s Fortnite locker`,
              })),
            },
          }),
        }}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav
            className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            {page > 1 ? (
              <>
                <Link href="/lockers" className="hover:text-primary">
                  Player lockers
                </Link>
                <span>/</span>
                <span className="text-foreground">Page {page}</span>
              </>
            ) : (
              <span className="text-foreground">Player lockers</span>
            )}
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {CURRENT_SEASON.shortLabel} · Community
          </p>
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
            Player <span className="text-primary">Lockers</span>
            {page > 1 ? <span className="text-primary"> · Page {page}</span> : null}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {page > 1
              ? `Page ${page} of ${paged.totalPages} — more public player lockers. ${paged.total} in total.`
              : 'Browse public player lockers, or sign in and share yours with a link right away.'}
          </p>
          {page > 1 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              <Link href="/lockers" className="font-semibold text-primary hover:underline">
                Back to page 1
              </Link>
              {paged.nextPage ? (
                <>
                  {' · '}
                  <Link
                    href={lockersPageHref(paged.nextPage)}
                    className="font-semibold text-primary hover:underline"
                  >
                    Page {paged.nextPage}
                  </Link>
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        {page === 1 ? (
          <Link
            href="/locker"
            className="block overflow-hidden rounded-2xl border border-primary/40 bg-linear-to-br from-primary/20 via-card to-card p-5 sm:p-6 transition-colors hover:border-primary/70"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Share link works now
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Build your locker
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sign in at <span className="text-foreground">/locker</span>, add cosmetics, and copy
              your public URL anytime. The directory below is a snapshot of public lockers from the
              latest site build — your share link still works even if you are not listed yet.
            </p>
            <span className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground">
              Open /locker
            </span>
          </Link>
        ) : null}

        <section>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            {paged.total
              ? `${paged.total} public locker${paged.total === 1 ? '' : 's'}`
              : 'Public lockers'}
          </h2>
          <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
            {paged.total
              ? `Showing ${from}–${to} of ${paged.total}. Each card is a real player page.`
              : 'Each card is a real player page.'}
          </p>
          <LockerDirectoryGrid lockers={paged.items} />
          <LockersPagination page={paged.page} totalPages={paged.totalPages} />
        </section>
      </div>
    </>
  )
}
