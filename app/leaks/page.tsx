import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdSenseUnit } from '@/components/adsense-unit'
import { LeakCard } from '@/components/leak-card'
import { CURRENT_SEASON } from '@/lib/season'
import {
  LEAKS_FAQS,
  getLeaksSorted,
  leakCategories,
  type LeakStatus,
} from '@/lib/leaks'
import { breadcrumbJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const STATUS_ORDER: LeakStatus[] = ['active', 'watching', 'shipped', 'dead']

export default function LeaksPage() {
  const all = getLeaksSorted()
  const featured = all.filter((l) => l.featured)
  const rest = all.filter((l) => !l.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Leaks', path: '/leaks' },
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
            name: 'Fortnite Leaks',
            url: `${siteConfig.url}/leaks`,
            description:
              'Fortnite leak write-ups for Treasure Hunters and Chapter 8 — individual pages with clear unconfirmed / shipped status.',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: all.length,
              itemListElement: all.map((leak, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteConfig.url}/leaks/${leak.slug}`,
                name: leak.title,
              })),
            },
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Leaks</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {CURRENT_SEASON.shortLabel} · File finds · Not patch notes
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
              Fortnite Leaks
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Fresh: AFK squad fills for the Pirate Shop Token can get you matchmaking banned. Also Lil
              Uzi Vert Stronghold / Lil’ SMG, gold swaps, shop rows, Power Hours, Chapter 8 finishers.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link
                href="/leaks/pirate-shop-afk-squad-fill-ban"
                className="font-semibold text-primary hover:underline"
              >
                AFK Pirate Shop ban
              </Link>
              {' · '}
              <Link href="/leaks/lil-uzi-vert-stronghold-update" className="text-primary hover:underline">
                Lil Uzi Stronghold
              </Link>
              {' · '}
              <Link href="/guides" className="text-primary hover:underline">
                Guides
              </Link>
              {' · '}
              <Link href="/news" className="text-primary hover:underline">
                News
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <AdSenseUnit variant="inTool" className="mb-8" />

          <nav aria-label="Filter by category" className="mb-8">
            <ul className="flex flex-wrap gap-2" role="list">
              {leakCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {featured.length > 0 ? (
            <section className="mb-12">
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                Active & watching
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {featured.map((leak) => (
                  <LeakCard key={leak.slug} leak={leak} featured />
                ))}
              </div>
            </section>
          ) : null}

          {STATUS_ORDER.map((status) => {
            const group = rest.filter((l) => l.status === status)
            if (group.length === 0) return null
            const heading =
              status === 'shipped'
                ? 'Shipped (archive)'
                : status === 'dead'
                  ? 'Likely cut'
                  : status === 'watching'
                    ? 'More watching'
                    : 'More unconfirmed'
            return (
              <section key={status} className="mb-12">
                <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  {heading}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((leak) => (
                    <LeakCard key={leak.slug} leak={leak} />
                  ))}
                </div>
              </section>
            )
          })}

          <section className="mb-12 space-y-8">
            {leakCategories.map((cat) => {
              const items = all.filter((l) => l.category === cat.id)
              if (items.length === 0) return null
              return (
                <div key={cat.id} id={cat.id}>
                  <h2 className="font-display text-lg font-bold uppercase text-foreground">
                    {cat.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  <ul className="mt-3 space-y-2">
                    {items.map((leak) => (
                      <li key={leak.slug}>
                        <Link
                          href={`/leaks/${leak.slug}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {leak.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>

          <section>
            <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="max-w-3xl space-y-5">
              {LEAKS_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="mb-1.5 text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
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
