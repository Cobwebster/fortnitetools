import Link from '@/components/link'
import { PostCard } from '@/components/post-card'
import { GuidesPagination } from '@/components/GuidesPagination'
import { categories, getPostsSorted } from '@/lib/posts'
import { GUIDES_PAGE_SIZE, paginateGuides } from '@/lib/guides-pagination'
import { breadcrumbJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export function GuidesIndex({ page }: { page: number }) {
  const all = getPostsSorted()
  const paged = paginateGuides(all, page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Guides', path: '/guides' },
              ...(page > 1 ? [{ name: `Page ${page}`, path: `/guides/pages/${page}` }] : []),
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
            name: page > 1 ? `Fortnite Guides – Page ${page}` : 'Fortnite Guides',
            url: `${siteConfig.url}${page > 1 ? `/guides/pages/${page}` : '/guides'}`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Fortnite Guides',
              url: `${siteConfig.url}/guides`,
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: paged.total,
              itemListElement: paged.items.map((post, index) => ({
                '@type': 'ListItem',
                position: (page - 1) * GUIDES_PAGE_SIZE + index + 1,
                url: `${siteConfig.url}/guides/${post.category}/${post.slug}`,
                name: post.title,
              })),
            },
          }),
        }}
      />
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Guides</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
            Fortnite Guides
            {page > 1 ? <span className="text-primary"> · Page {page}</span> : null}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {page > 1
              ? `Page ${page} of ${paged.totalPages} — more Override and older Runners write-ups. ${paged.total} guides in total.`
              : 'Fresh Override write-ups first — Admin Panel codes, Battle Pass end date, Green Hill Zone, Match Overrides, and Ranked Null. Older Runners weapon and Sprite articles stay linked with last-reviewed dates until we rewrite the loot pool.'}
          </p>
          {page === 1 ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Start with the{' '}
              <Link href="/season" className="text-primary hover:underline">
                season hub
              </Link>{' '}
              or map drops if you want where to land. How-to covers refunds and codes. Tools (map, shop, loadout, build
              sim) sit next to these — they are not replacements for the write-ups.
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/guides" className="text-primary hover:underline">
                Back to page 1
              </Link>
              {paged.nextPage ? (
                <>
                  {' · '}
                  <Link href={`/guides/pages/${paged.nextPage}`} className="text-primary hover:underline">
                    Page {paged.nextPage}
                  </Link>
                </>
              ) : null}
            </p>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category">
            <ul className="flex flex-wrap gap-2" role="list">
              <li>
                <Link
                  href="/guides"
                  className="rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                  aria-current="page"
                >
                  All
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/guides/${cat.id}`}
                    className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-5 text-sm text-muted-foreground">
          Showing {(page - 1) * GUIDES_PAGE_SIZE + 1}–{(page - 1) * GUIDES_PAGE_SIZE + paged.items.length} of {paged.total}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.items.map((post) => (
            <PostCard key={post.slug} post={post} featured />
          ))}
        </div>
        <GuidesPagination page={paged.page} totalPages={paged.totalPages} />
      </div>
    </>
  )
}
