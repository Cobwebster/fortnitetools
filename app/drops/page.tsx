import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DROP_GUIDES, DROP_INDEX_FAQS, DROP_PICKER } from '@/lib/drop-guides'
import { contestLabels, lootLabel } from '@/lib/map-data'
import { CURRENT_SEASON } from '@/lib/season'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

export default function DropsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(DROP_INDEX_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Drops', path: '/drops' },
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
              <span className="text-foreground">Drops</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Shattered Coast · last reviewed 17 Aug 2026
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Best Fortnite <span className="text-primary">Drops</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Five named POIs with real rotate paths — contest, bus, landing split, extract, Sprites,
              third-party angles, and when to leave. These are not the map pin tooltips. Use the{' '}
              <Link href="/fortnite-map" className="text-primary hover:underline">
                interactive map
              </Link>{' '}
              for pins; use these pages when you search “best drop [POI]” on reset week.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/fortnite-map" className="text-primary hover:underline">
                Map
              </Link>
              {' · '}
              <Link href="/guides/map/fortnite-loot-guide-best-spots" className="text-primary hover:underline">
                Loot spots guide
              </Link>
              {' · '}
              <Link href="/guides/map/fortnite-map-all-locations-guide" className="text-primary hover:underline">
                All locations
              </Link>
              {' · '}
              <Link href="/season" className="text-primary hover:underline">
                Season hub
              </Link>
              {' · '}
              <Link href="/guides/how-to/fortnite-ranked-mode-guide" className="text-primary hover:underline">
                Ranked
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Pick a drop for the game you are actually playing
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              “Best drop” is a bad query unless you say ranked, loot, Sprites, or placement. Harbor
              wins chests and loses LP. Sunken Shores does the opposite. Chapter 7 Season 4 will
              stale every path here — until then this is late C7S3 Shattered Coast.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DROP_PICKER.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              The five landing pages
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-semibold">POI</th>
                    <th className="px-3 py-2 font-semibold">Contest</th>
                    <th className="px-3 py-2 font-semibold">Chests</th>
                    <th className="px-3 py-2 font-semibold">Extract</th>
                    <th className="px-3 py-2 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {DROP_GUIDES.map((drop) => (
                    <tr key={drop.slug} className="border-t border-border">
                      <td className="px-3 py-2">
                        <Link href={`/drops/${drop.slug}`} className="font-semibold text-primary hover:underline">
                          {drop.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{contestLabels[drop.contest]}</td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {drop.chests} {lootLabel(drop.loot)}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{drop.extract.name}</td>
                      <td className="px-3 py-2 text-muted-foreground">{drop.biome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DROP_GUIDES.map((drop) => (
              <Link
                key={drop.slug}
                href={`/drops/${drop.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
                    {contestLabels[drop.contest]}
                  </span>
                  <span className="text-xs text-primary" aria-hidden="true">
                    {lootLabel(drop.loot)}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-foreground group-hover:text-primary">
                  {drop.name}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{drop.biome}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{drop.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-primary">Rotate guide →</p>
              </Link>
            ))}
          </div>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Map pins vs these pages
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Clicking Heatwave, Battlewoods, Wonkeeland, Latte, or Sunken Shores on the map now
              opens the matching drop URL. Lifty, Frosted Flats, Strip, Grove, Sanctuary, Cluster,
              Calamari, Chopped Shop, and Zero Point still use the short tooltip plus the older map
              articles. We did not clone a pin into 14 thin URLs.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="max-w-3xl space-y-4">
              {DROP_INDEX_FAQS.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                  <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
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
