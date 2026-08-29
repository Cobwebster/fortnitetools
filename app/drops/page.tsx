import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapPoiCrop } from '@/components/MapPoiCrop'
import { DROP_GUIDES, DROP_INDEX_FAQS, DROP_PICKER } from '@/lib/drop-guides'
import { CONTEST_COLOR, dropMapFocus, loadMapPois } from '@/lib/drop-map'
import { contestLabels, lootLabel } from '@/lib/map-data'
import { CURRENT_SEASON } from '@/lib/season'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

export const revalidate = 3600

const PICKER_ART = [
  { title: 'Ranked climb (LP)', image: '/images/icons/crown.png' },
  { title: 'Loot and fights', image: '/images/loadout/striker_pump.png' },
  { title: 'Sprite / cube bank', image: '/images/loadout/flowberry.png' },
  { title: 'Zone already looks north / snow', image: '/images/icons/storm.png' },
] as const

export default async function DropsIndexPage() {
  const pois = await loadMapPois()

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CURRENT_SEASON.mapImage}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent), var(--background))',
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
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="relative mx-auto w-36 shrink-0 sm:mx-0 sm:w-44">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg ring-1 ring-primary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CURRENT_SEASON.mapImage}
                    alt={`${CURRENT_SEASON.label} Shattered Coast — drop guides for this island`}
                    className="aspect-square w-full object-cover"
                    width={176}
                    height={176}
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} · Shattered Coast · last reviewed 17 Aug 2026
                </p>
                <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
                  Best Fortnite <span className="text-primary">Drops</span>
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Five named POIs with real rotate paths — contest, bus, landing split, extract, Sprites,
                  third-party angles, and when to leave. Crops below are the live Shattered Coast
                  minimap, not clip art. Use the{' '}
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
                  <Link href="/ranked" className="text-primary hover:underline">
                    Ranked LP / drops
                  </Link>
                </p>
              </div>
            </div>
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
              {DROP_PICKER.map((row) => {
                const art = PICKER_ART.find((a) => a.title === row.title)
                return (
                  <article key={row.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                    {art ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={art.image}
                        alt=""
                        className="h-12 w-12 shrink-0 object-contain drop-shadow-md"
                      />
                    ) : null}
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              The five landing pages
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DROP_GUIDES.map((drop) => {
                const focus = dropMapFocus(drop.slug, drop.nearPoi, pois)
                return (
                  <Link
                    key={drop.slug}
                    href={`/drops/${drop.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60"
                  >
                    <div className="relative">
                      <MapPoiCrop
                        focus={focus}
                        alt={`${drop.name} on the live Shattered Coast map`}
                        className="h-44"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <span
                        className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
                        style={{ background: CONTEST_COLOR[drop.contest] || '#888' }}
                      >
                        {contestLabels[drop.contest]}
                      </span>
                      <p className="absolute bottom-2 left-3 font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-primary">
                        {drop.name}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {drop.biome} · {drop.chests} {lootLabel(drop.loot)}
                      </p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{drop.excerpt}</p>
                      <p className="mt-3 text-xs text-muted-foreground">Extract: {drop.extract.name}</p>
                      <p className="mt-3 text-sm font-semibold text-primary">Rotate guide →</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

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
