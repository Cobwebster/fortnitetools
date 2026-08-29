import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fetchLiveSets, LIVE_SET_CAP, SETS_HOWTO, SETS_INDEX_FAQS } from '@/lib/cosmetic-sets'
import { CURRENT_SEASON } from '@/lib/season'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

export const revalidate = 600

export default async function SetsIndexPage() {
  const sets = await fetchLiveSets()
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
        <section className="relative overflow-hidden border-b border-border">
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
              {CURRENT_SEASON.shortLabel} · live list · cap {LIVE_SET_CAP}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Sets</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {sets.length} sets from tonight&apos;s Item Shop
              {shopCount ? ` (${shopCount} in shop)` : ''} plus cosmetics added in the current game
              build. Shop-first, then new-build, cap {LIVE_SET_CAP}. When a set leaves both lists,
              the URL 404s — this is not a locker encyclopedia and not 10k outfit pages.
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
              Shop / new-cosmetics APIs did not return sets. Try the Item Shop tracker.
            </p>
          ) : (
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Live sets tonight
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {sets.map((set) => (
                <Link
                  key={set.slug}
                  href={`/sets/${set.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60"
                >
                  <div className="aspect-square bg-muted/40">
                    {set.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={set.thumb}
                        alt=""
                        className="h-full w-full object-contain p-3"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No art
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 p-3">
                    <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                      {set.name}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {set.inShop ? (
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary">
                          In shop
                        </span>
                      ) : null}
                      {set.fromNew ? (
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground">
                          New build
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {set.sampleCount} item{set.sampleCount === 1 ? '' : 's'} in tonight&apos;s lists
                    </p>
                  </div>
                </Link>
              ))}
              </div>
            </section>
          )}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
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
