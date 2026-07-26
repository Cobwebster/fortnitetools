import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapEvolutionClient } from '@/components/MapEvolutionClient'
import { MAP_EVOLUTION, MAP_EVOLUTION_CHAPTERS } from '@/lib/map-evolution'

const faqs = [
  {
    q: 'How do I compare two Fortnite maps?',
    a: 'Pick a version on the left and right (filter by chapter first if you want), then drag the white handle across the image. The left side shows the older (or left-selected) map; the right side shows the other.',
  },
  {
    q: 'Why only one map per season?',
    a: `Epic ships many patches per season. We keep ${MAP_EVOLUTION.length} representative end-of-season (or late-season) snapshots so the tool stays fast and easy to browse — enough to see how each chapter evolved without hundreds of near-identical patches.`,
  },
  {
    q: 'Where do the map images come from?',
    a: 'Historical minimaps are sourced from the open fortnite-archives community project on GitHub (yaelbrinkert/fortnite-archives), then compressed to WebP for this site. The archive has no explicit license; we attribute the source and follow Epic’s Fan Content Policy disclaimer.',
  },
]

export default function MapEvolutionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 80% -10%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Map Evolution</span>
            </nav>

            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Map Evolution</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Compare any two Fortnite islands side by side — drag the slider to reveal how the map
              changed from Chapter 1 through Chapter {MAP_EVOLUTION_CHAPTERS.at(-1)}.{' '}
              <strong className="text-foreground">{MAP_EVOLUTION.length} season maps</strong> in the
              archive.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/fortnite-map" className="text-primary hover:underline">
                Live BR map
              </Link>
              {' · '}
              <Link href="/map-rotation" className="text-primary hover:underline">
                Reload rotation
              </Link>
              {' · '}
              <Link href="/tools" className="text-primary hover:underline">
                All tools
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-12">
          <MapEvolutionClient />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How Fortnite&apos;s map changed
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Battle Royale has used multiple islands: the original Chapter 1 map, Apollo (Chapter 2),
              Artemis (Chapter 3), Asteria (Chapter 4), Helios (Chapter 5), Oninoshima (Chapter 6), and
              Shattered Coast (Chapter 7). Within each chapter, seasons reshape biomes, POIs, and
              water levels. This viewer is for nostalgia and lore — for current loot and drops use
              the{' '}
              <Link href="/fortnite-map" className="text-primary hover:underline">
                interactive map
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-sm font-bold text-foreground">{faq.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-3 rounded-xl border border-border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold uppercase tracking-wider text-foreground">Attribution &amp; disclaimer</p>
            <p>
              Map imagery adapted from the community archive{' '}
              <a
                href="https://github.com/yaelbrinkert/fortnite-archives"
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                yaelbrinkert/fortnite-archives
              </a>
              . That repository does not publish an explicit license; we host compressed copies for
              this free fan tool and welcome the archive author to request changes.
            </p>
            <p>
              Portions of the materials used are trademarks and/or copyrighted works of Epic Games,
              Inc. All rights reserved by Epic. This material is not official and is not endorsed by
              Epic.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
