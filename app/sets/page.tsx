import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdSenseUnit } from '@/components/adsense-unit'
import { SetsCatalogClient } from '@/components/SetsCatalogClient'
import { fetchCatalogSets, SETS_HOWTO, SETS_INDEX_FAQS } from '@/lib/cosmetic-sets'
import { CURRENT_SEASON } from '@/lib/season'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

export const revalidate = 604800

export default async function SetsIndexPage() {
  const sets = await fetchCatalogSets()
  const shopCount = sets.filter((s) => s.inShop).length

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SETS_INDEX_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sets', path: '/sets' },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 10% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Sets</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · full set catalog
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Sets</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Search {sets.length.toLocaleString()} cosmetic sets from the Fortnite-API BR catalog
              {shopCount ? ` — ${shopCount} with something in tonight’s Item Shop` : ''}. Open a
              card for the full roster and shop-history counts.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/new-cosmetics" className="text-primary hover:underline">
                New cosmetics
              </Link>
              {' · '}
              <Link href="/tools/skin-rarity-calculator" className="text-primary hover:underline">
                Skin rarity
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <AdSenseUnit variant="inTool" />

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How this list is built
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {SETS_HOWTO.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          {sets.length === 0 ? (
            <p className="rounded-xl border border-border bg-card px-4 py-6 text-sm text-muted-foreground">
              Cosmetics catalog API did not return sets. Try the Item Shop tracker.
            </p>
          ) : (
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Browse sets
              </h2>
              <SetsCatalogClient sets={sets} />
            </section>
          )}

          <AdSenseUnit variant="endOfBlog" />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            {SETS_INDEX_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
