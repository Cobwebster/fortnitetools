import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteMapClient } from '@/components/FortniteMapClient'
import { breadcrumbJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const faqs = [
  {
    q: 'What is the current Fortnite map in Chapter 7 Season 3?',
    a: 'Chapter 7 Season 3 (Runners) uses the Shattered Coast island, added after the Shattered live event. Named locations include Lifty Lodge, Battlewoods, Wonkeeland, Latte Landing, Frosted Flats, Sinister Strip, Golden Grove, Shaken Sanctuary, Cluster Coast, Sunken Shores, Heatwave Harbor, Calamari Canyon, and Chopped Shop.',
  },
  {
    q: 'Where should I land in Fortnite for the best loot?',
    a: 'High-loot contested drops like Heatwave Harbor, Lifty Lodge, Battlewoods, and Sinister Strip reward early fights. For cleaner loot into zone, use balanced spots such as Wonkeeland or Latte Landing. Edge POIs like Cluster Coast and Sunken Shores are better for placement-focused games.',
  },
  {
    q: 'How do I use this interactive Fortnite map?',
    a: 'Pan and zoom the live minimap, click a marker for loot and contest notes, and filter by hot drop, balanced, or edge. Search by POI name when you already know where you want to land.',
  },
  {
    q: 'Does this Fortnite map update every season?',
    a: 'The minimap image and coordinates load from live Fortnite-API data, so named locations refresh when Epic updates the island. Editorial loot tips are reviewed around major patches.',
  },
]

export default function FortniteMapPage() {
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Fortnite Map', path: '/fortnite-map' },
  ])

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fortnite Interactive Map',
    url: `${siteConfig.url}/fortnite-map`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    description:
      'Interactive Fortnite Chapter 7 Season 3 map with live Shattered Coast minimap, POI markers, loot ratings, and drop filters.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav
              className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Fortnite Map</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite Interactive Map
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Free Chapter 7 Season 3 Shattered Coast map with live minimap
              imagery, named POIs, loot ratings, and drop filters — built for
              planning landings and rotations.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Prefer reading?{' '}
              <Link
                href="/guides/map/fortnite-map-all-locations-guide"
                className="font-semibold text-primary hover:opacity-80"
              >
                Full POI guide
              </Link>
              {' · '}
              <Link href="/guides/map" className="font-semibold text-primary hover:opacity-80">
                All map guides
              </Link>
              {' · '}
              <Link
                href="/guides/map/fortnite-loot-guide-best-spots"
                className="font-semibold text-primary hover:opacity-80"
              >
                Best landing spots
              </Link>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <FortniteMapClient />
          <p className="mt-4 text-xs text-muted-foreground">
            Map imagery and coordinates from{' '}
            <a
              href="https://fortnite-api.com/"
              className="underline hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              Fortnite-API
            </a>
            . Not affiliated with Epic Games. Loot/contest tips are editorial and
            may change with patches.
          </p>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                How this Fortnite map tool works
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                This interactive Fortnite map loads the current Battle Royale
                minimap and places markers using live POI coordinates. Use it to
                answer the searches players make every season: where to land,
                which POIs are contested, and how to rotate across Shattered Coast.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                  <span className="font-semibold text-foreground">Live minimap</span>
                  {' — '}
                  Real in-game map imagery for Chapter 7 Season 3, not a fake sketch.
                </li>
                <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                  <span className="font-semibold text-foreground">Named POIs & landmarks</span>
                  {' — '}
                  Click Lifty Lodge, Heatwave Harbor, Wonkeeland, and more.
                </li>
                <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                  <span className="font-semibold text-foreground">Loot & contest filters</span>
                  {' — '}
                  Sort hot drops, balanced landings, and quiet edge POIs.
                </li>
                <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                  <span className="font-semibold text-foreground">Drop planning</span>
                  {' — '}
                  Search a location, read mobility notes, then queue your landing.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                Shattered Coast named locations
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Looking up “Fortnite map locations” or “Shattered Coast POIs”?
                These are the main named drops players search for in Chapter 7
                Season 3. Open them on the map above for markers and tips.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {[
                  {
                    title: 'Hot drops',
                    body: 'Lifty Lodge, Battlewoods, Sinister Strip, Heatwave Harbor, Frosted Flats — high loot, high contest when the bus is nearby.',
                  },
                  {
                    title: 'Balanced landings',
                    body: 'Wonkeeland, Latte Landing, Golden Grove, Shaken Sanctuary, Chopped Shop — solid chests without guaranteed early chaos.',
                  },
                  {
                    title: 'Edge / placement',
                    body: 'Cluster Coast, Sunken Shores, Calamari Canyon — quieter loot with longer rotates into mid-game circles.',
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="rounded-lg border border-border bg-background/60 px-4 py-4"
                  >
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                Best Fortnite landing spots by goal
              </h2>
              <div className="mt-4 space-y-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  <span className="font-semibold text-foreground">Fight practice:</span>{' '}
                  Drop contested named locations under the bus path. You will die
                  more often, but you learn loot speed, first fights, and third-party timing faster.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Ranked placement:</span>{' '}
                  Prefer balanced or edge POIs, leave with mobility, and rotate early.
                  Surviving to top 10 usually beats greed-looting one more chest.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Squads:</span>{' '}
                  Land in the same building cluster, split floors, and meet on a
                  marked point. Split-landing across a whole city creates free 1v3s.
                </p>
                <p>
                  For deeper drop strategy, read the{' '}
                  <Link
                    href="/guides/map/fortnite-loot-guide-best-spots"
                    className="font-semibold text-primary hover:opacity-80"
                  >
                    best loot spots guide
                  </Link>{' '}
                  and the{' '}
                  <Link
                    href="/guides/map/fortnite-map-all-locations-guide"
                    className="font-semibold text-primary hover:opacity-80"
                  >
                    full Shattered Coast POI breakdown
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                Fortnite map FAQ
              </h2>
              <div className="mt-5 space-y-4">
                {faqs.map((item) => (
                  <article
                    key={item.q}
                    className="rounded-lg border border-border bg-background/60 px-4 py-4"
                  >
                    <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                More Fortnite tools
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Pair the map with other free FortniteTools utilities while you queue.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary">
                <li>
                  <Link href="/tools/zone-timer" className="hover:opacity-80">
                    Zone timer
                  </Link>
                </li>
                <li>
                  <Link href="/tools/weapon-damage-calculator" className="hover:opacity-80">
                    Weapon damage calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                    className="hover:opacity-80"
                  >
                    Season 3 weapon tier list
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="hover:opacity-80">
                    All tools
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
