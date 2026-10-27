import type { Metadata } from 'next'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'
import { SPRITE_THEME_STYLES } from '@/lib/sprites'
import {
  allSpriteSlugs,
  buildSpritePage,
  SPRITE_PAGES_REVIEWED,
} from '@/lib/sprite-pages'

export const dynamicParams = false

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allSpriteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const model = buildSpritePage(slug)
  if (!model) return { robots: { index: false, follow: false } }
  const { sprite, description } = model
  return createMetadata({
    title: `${sprite.name} – Ability & How to Get`,
    description,
    path: `/sprites/${sprite.slug}`,
    keywords: [
      `${sprite.name} fortnite`,
      `how to get ${sprite.shortName} fortnite`,
      `${sprite.family} sprite fortnite`,
      `${sprite.variant} sprite fortnite`,
      'fortnite sprites',
      'fortnite sprite abilities',
    ],
  })
}

export default async function SpriteDetailPage({ params }: Props) {
  const { slug } = await params
  const model = buildSpritePage(slug)
  if (!model) notFound()

  const {
    sprite,
    ability,
    abilityScale,
    variantBonus,
    location,
    howToGet,
    lobbyHack,
    familyVariants,
    related,
    faqs,
    liveOverride,
  } = model

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sprites', path: '/sprites' },
              { name: sprite.name, path: `/sprites/${sprite.slug}` },
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
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/sprites" className="transition-colors hover:text-primary">
                Sprites
              </Link>
              <span>/</span>
              <span className="text-foreground">{sprite.shortName}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
              <div
                className={`overflow-hidden rounded-2xl border ${SPRITE_THEME_STYLES[sprite.theme]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sprite.image}
                  alt={sprite.name}
                  width={220}
                  height={220}
                  className="aspect-square w-full object-contain bg-background/40 p-3"
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} · {sprite.family} family · reviewed {SPRITE_PAGES_REVIEWED}
                </p>
                <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide text-foreground sm:text-4xl">
                  {sprite.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                  <span className="rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground">
                    {sprite.variant}
                  </span>
                  <span className="rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground">
                    {sprite.family}
                  </span>
                  {liveOverride ? (
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
                      Override live
                    </span>
                  ) : (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-200">
                      Catalog / may be vaulted
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {ability}
                  {abilityScale ? ` ${abilityScale}` : ''}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <Link href="/sprites" className="text-primary hover:underline">
                    All Sprites
                  </Link>
                  {' · '}
                  <Link
                    href="/guides/how-to/how-to-extract-sprites-fortnite"
                    className="text-primary hover:underline"
                  >
                    Extract guide
                  </Link>
                  {' · '}
                  <Link href="/lobby-hacks" className="text-primary hover:underline">
                    Lobby Hacks
                  </Link>
                  {' · '}
                  <Link href="/fortnite-map" className="text-primary hover:underline">
                    Map
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-border bg-card p-4 sm:col-span-2 lg:col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Ability
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{ability}</p>
              {abilityScale ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{abilityScale}</p>
              ) : null}
            </article>

            {variantBonus ? (
              <article className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {sprite.variant} bonus
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{variantBonus}</p>
              </article>
            ) : (
              <article className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Variant
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{sprite.variant}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Base family power applies. Special finishes add separate bonuses when noted.
                </p>
              </article>
            )}

            <article className="rounded-xl border border-border bg-card p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Location
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{location}</p>
            </article>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to get {sprite.shortName}
            </h2>
            <ol className="mt-4 space-y-3">
              {howToGet.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <p className="text-sm font-bold text-foreground">
                    <span className="mr-2 text-primary">{i + 1}.</span>
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            {lobbyHack ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Quick copy list:{' '}
                <Link href="/lobby-hacks" className="text-primary hover:underline">
                  Lobby Hacks
                </Link>{' '}
                → look for <span className="font-mono text-foreground">{lobbyHack.code}</span>.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {sprite.family} variants
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every finish in the {sprite.family} family from our snapshot. Same base power; finishes
              add their own bonuses.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {familyVariants.map((v) => {
                const active = v.slug === sprite.slug
                return (
                  <Link
                    key={v.id}
                    href={`/sprites/${v.slug}`}
                    className={`group overflow-hidden rounded-xl border text-left transition-colors hover:border-primary/70 ${
                      active ? 'border-primary ring-1 ring-primary/40' : SPRITE_THEME_STYLES[v.theme]
                    }`}
                  >
                    <div className="aspect-square bg-background/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.image}
                        alt={v.name}
                        width={120}
                        height={120}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <div className="space-y-0.5 px-2 pb-2 pt-1">
                      <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-foreground group-hover:text-primary">
                        {v.shortName}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {v.variant}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {related.length > 0 ? (
            <section>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                More {sprite.variant} Sprites
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {related.map((v) => (
                  <Link
                    key={v.id}
                    href={`/sprites/${v.slug}`}
                    className={`group overflow-hidden rounded-xl border text-left transition-colors hover:border-primary/70 ${SPRITE_THEME_STYLES[v.theme]}`}
                  >
                    <div className="aspect-square bg-background/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.image}
                        alt={v.name}
                        width={120}
                        height={120}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <div className="space-y-0.5 px-2 pb-2 pt-1">
                      <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-foreground group-hover:text-primary">
                        {v.shortName}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {v.family}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            {faqs.map((faq) => (
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
