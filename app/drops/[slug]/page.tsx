import type { Metadata } from 'next'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  DROP_GUIDES,
  DROP_GUIDE_FAQS,
  formatDropReviewed,
  getDropGuide,
} from '@/lib/drop-guides'
import {
  contestLabels,
  extractTrafficLabels,
  lootLabel,
} from '@/lib/map-data'
import { articleJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'
import { MapPoiCrop } from '@/components/MapPoiCrop'
import { CONTEST_COLOR, dropMapFocus, loadMapPois } from '@/lib/drop-map'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return DROP_GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const drop = getDropGuide(slug)
  if (!drop) return {}
  return createMetadata({
    title: `Best Drop ${drop.name} – Fortnite Rotate & Extract Guide`,
    description: `${drop.excerpt} Contest, bus, extract (${drop.extract.name}), third-party angles, and rotate paths for Chapter 7 Season 4 Override (returning POI). Last reviewed ${formatDropReviewed(drop.reviewed)}.`,
    path: `/drops/${drop.slug}`,
    keywords: [
      `best drop ${drop.name}`,
      `fortnite ${drop.name}`,
      `${drop.name} landing spot`,
      `${drop.name} rotate`,
      `${drop.name} extract`,
      'shattered coast drop',
      'fortnite ranked drop',
    ],
    type: 'article',
    publishedTime: `${drop.reviewed}T00:00:00.000Z`,
    tags: [drop.name, drop.contest, 'drop guide', 'shattered coast'],
  })
}

export default async function DropGuidePage({ params }: Props) {
  const { slug } = await params
  const drop = getDropGuide(slug)
  if (!drop) notFound()

  const faqs = DROP_GUIDE_FAQS[drop.slug] || []
  const others = DROP_GUIDES.filter((g) => g.slug !== drop.slug)
  const pois = await loadMapPois()
  const focus = dropMapFocus(drop.slug, drop.nearPoi, pois)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: `Best drop ${drop.name}`,
              description: drop.excerpt,
              path: `/drops/${drop.slug}`,
              datePublished: drop.reviewed,
            })
          ),
        }}
      />
      {faqs.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Drops', path: '/drops' },
              { name: drop.name, path: `/drops/${drop.slug}` },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <MapPoiCrop
              focus={focus}
              alt=""
              className="h-full min-h-[22rem]"
              scale={2.2}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--background) 40%, transparent), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/drops" className="transition-colors hover:text-primary">
                Drops
              </Link>
              <span>/</span>
              <span className="text-foreground">{drop.name}</span>
            </nav>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border border-border shadow-lg ring-1 ring-primary/20 sm:mx-0 sm:w-56">
                <MapPoiCrop
                  focus={focus}
                  alt={`${drop.name} on the live Shattered Coast map`}
                  className="aspect-square h-auto"
                  scale={3}
                />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} · last reviewed {formatDropReviewed(drop.reviewed)}
                </p>
                <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
                  Best drop <span className="text-primary">{drop.name}</span>
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{drop.excerpt}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs sm:justify-start">
                  <span
                    className="rounded-md px-2.5 py-1 font-semibold uppercase tracking-wider text-black"
                    style={{ background: CONTEST_COLOR[drop.contest] || '#888' }}
                  >
                    {contestLabels[drop.contest]}
                  </span>
                  <span className="rounded-md border border-border bg-card px-2.5 py-1 text-primary">
                    Loot {lootLabel(drop.loot)} · {drop.chests}
                  </span>
                  <span className="rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground">
                    {drop.biome}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Why drop here
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{drop.why}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Skip when: </span>
              {drop.skipWhen}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Bus and landing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{drop.bus}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{drop.landing}</p>
            <ul className="mt-4 space-y-2">
              {drop.split.map((line) => (
                <li
                  key={line}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">Extract</h2>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {drop.extract.name}{' '}
              <span className="font-normal text-muted-foreground">
                · {extractTrafficLabels[drop.extract.traffic]}
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{drop.extract.tip}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Sprites: </span>
              {drop.sprites}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Third parties
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{drop.thirdParty}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Nearby POIs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{drop.adjacent}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Rotate paths
            </h2>
            <div className="mt-4 space-y-3">
              {drop.rotates.map((rotate) => (
                <div key={rotate.title} className="rounded-xl border border-border bg-card px-4 py-3">
                  <h3 className="text-sm font-bold text-foreground">{rotate.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{rotate.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                Leave when
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{drop.leaveWhen}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                Loadout
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{drop.loadoutNote}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Zero Build: </span>
                {drop.zb}
              </p>
              <p className="mt-3 text-sm">
                <Link href="/tools/loadout-builder" className="font-semibold text-primary hover:underline">
                  Loadout builder
                </Link>
                {' · '}
                <Link href="/fortnite-map" className="font-semibold text-primary hover:underline">
                  Map pins
                </Link>
                {' · '}
                <Link href="/tools/zone-timer" className="font-semibold text-primary hover:underline">
                  Zone timer
                </Link>
              </p>
            </div>
          </section>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Shattered Coast / {CURRENT_SEASON.shortLabel} snapshot. When Chapter 7 Season 4 reboots the
            island, treat this path as stale until we rewrite it — see the{' '}
            <Link href="/season" className="font-semibold text-primary hover:underline">
              season hub
            </Link>
            .
          </p>

          {faqs.length ? (
            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                  <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </section>
          ) : null}

          <section className="border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Other drops
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((g) => {
                const otherFocus = dropMapFocus(g.slug, g.nearPoi, pois)
                return (
                  <Link
                    key={g.slug}
                    href={`/drops/${g.slug}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60"
                  >
                    <div className="relative">
                      <MapPoiCrop
                        focus={otherFocus}
                        alt={`${g.name} on the live Shattered Coast map`}
                        className="h-28"
                        scale={2.4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <p className="absolute bottom-2 left-3 text-sm font-semibold text-white group-hover:text-primary">
                        {g.name}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
