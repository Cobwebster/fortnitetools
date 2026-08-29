import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapEvolutionClient } from '@/components/MapEvolutionClient'
import { MAP_EVOLUTION, MAP_EVOLUTION_CHAPTERS } from '@/lib/map-evolution'

const CHAPTER_SUMMARIES = [
  {
    chapter: 1,
    island: 'Athena',
    seasons: 10,
    blurb:
      'The original Battle Royale island. Season 1 starts tiny and sparse; by Season X the map is packed with locations, rifts, and live-event scars. Compare C1S1 to C1SX to see how Tilted, Retail, and the edges filled in over nearly two years.',
  },
  {
    chapter: 2,
    island: 'Apollo',
    seasons: 8,
    blurb:
      'A full island swap with water, boats, and a slower loot cadence early on. Mid-chapter seasons add agency islands, The Spyglass / IO conflict, and massive end-chapter reshapes. Side-by-side C2S1 vs late C2 shows how “new map” fatigue turned into a dense mid-game island.',
  },
  {
    chapter: 3,
    island: 'Artemis',
    seasons: 4,
    blurb:
      'Flip-side terrain, Reality Trees, chrome, and the return of builds-versus-chrome set pieces. Shorter chapter, but each season rewrites large biomes — perfect for slider comparisons between “fresh Artemis” and chrome-era Artemis.',
  },
  {
    chapter: 4,
    island: 'Asteria',
    seasons: 5,
    blurb:
      'Modular “Kingdom / Neon / Wilds / Eclipse” style biome seasons, plus OG nostalgia windows. Use chapter filters to jump straight to Asteria without scrolling the full archive.',
  },
  {
    chapter: 5,
    island: 'Helios',
    seasons: 5,
    blurb:
      'Modern BR pacing with big named POIs, underground / mythic loops, and Remix-era callbacks. Comparing early Helios to late Helios highlights how seasonal story props change drop denseness.',
  },
  {
    chapter: 6,
    island: 'Oninoshima',
    seasons: 5,
    blurb:
      'Spirit-world / Japanese-inspired island language with mini-seasons in the mix. Filter Chapter 6 to scrub only those patches when you are tracing Oninoshima POI churn.',
  },
  {
    chapter: 7,
    island: 'Shattered Coast',
    seasons: 3,
    blurb:
      'Current Runners era. Start with Chapter 7 Season 3 on the right and any nostalgia map on the left for “then vs now” content. For live POIs and drops, switch to the interactive map — this archive is historical minimaps, not live markers.',
  },
] as const

const COMPARISON_IDEAS = [
  {
    title: 'Chapter 1 Season 1 vs Chapter 7 Season 3',
    body: 'The classic “how far has Fortnite come?” pair. Empty early Athena next to today’s Shattered Coast shows island size, POI density, and art direction in one drag.',
  },
  {
    title: 'Season X vs Chapter 2 Season 1',
    body: 'Watch the hard cut from the maxed-out original island to Apollo’s fresh coastline — the moment the community learned Epic would retire maps wholesale.',
  },
  {
    title: 'Same chapter, early vs late season',
    body: 'Filter to one chapter, put season 1 on the left and the final season on the right. Biomes, water, and named locations usually move more than players remember.',
  },
  {
    title: 'OG / Remix callbacks vs the “real” old map',
    body: 'When a nostalgia playlist returns old POI names, compare that chapter’s archive snapshot to true Chapter 1 seasons — layout rhymes, but the terrain mesh is rarely identical.',
  },
]

const faqs = [
  {
    q: 'What is Fortnite map evolution?',
    a: `Map evolution is a visual history of Fortnite Battle Royale islands. This tool lets you pick any two of ${MAP_EVOLUTION.length} season snapshots and drag a slider to compare them — for example Chapter 1 Season 1 next to Chapter 7 Season 3 (Shattered Coast).`,
  },
  {
    q: 'How do I compare two Fortnite maps?',
    a: 'Optionally filter by chapter, choose a version for the left image and one for the right, then drag the white handle. Everything left of the handle shows the left map; everything right of the handle shows the other map.',
  },
  {
    q: 'Which chapters and seasons are included?',
    a: `The archive covers Chapters ${MAP_EVOLUTION_CHAPTERS[0]}–${MAP_EVOLUTION_CHAPTERS.at(-1)} with ${MAP_EVOLUTION.length} representative maps (roughly one late-season or end-of-season patch per season, including Season X and mini-seasons where they matter).`,
  },
  {
    q: 'Why only one map per season?',
    a: `Epic ships many patches per season. We keep ${MAP_EVOLUTION.length} readable snapshots so the tool stays fast — enough to see chapter-scale change without hosting hundreds of near-identical mid-patch minimaps.`,
  },
  {
    q: 'Is this the live Fortnite map with chests and markers?',
    a: 'No. Map Evolution is historical minimap art. For the current Shattered Coast BR map with locations, use the interactive Fortnite map tool. For Reload island timers, use Map Rotation.',
  },
  {
    q: 'Where do the map images come from?',
    a: 'Historical minimaps are sourced from the open fortnite-archives community project on GitHub (yaelbrinkert/fortnite-archives), then compressed to WebP for this site. The archive has no explicit license; we attribute the source and follow Epic’s Fan Content Policy disclaimer.',
  },
  {
    q: 'Can I use these comparisons for YouTube or TikTok?',
    a: 'You can record your screen using this free fan tool. Map art remains Epic’s IP — follow Epic Fan Content rules, credit the game, and do not claim the imagery as your own asset pack.',
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
              archive, from Athena to Shattered Coast.
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
              <Link href="/guides/map/fortnite-map-all-locations-guide" className="text-primary hover:underline">
                POI guide
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

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to use the Fortnite map comparison slider
            </h2>
            <ol className="max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Optionally tap a <strong className="text-foreground">chapter filter</strong> so both
                dropdowns only list seasons from that island era.
              </li>
              <li>
                Set the <strong className="text-foreground">left</strong> map (usually the older
                season) and the <strong className="text-foreground">right</strong> map (usually the
                newer season).
              </li>
              <li>
                Drag the white vertical handle across the image. Release to scrub slowly and spot POI
                renames, new biomes, and coastline edits.
              </li>
              <li>
                For “then vs now,” leave Chapter 7 Season 3 on the right and pick any nostalgia season
                on the left — Chapter 1 Season 1 is the most shared pairing.
              </li>
              <li>
                When you are done reminiscing, open the{' '}
                <Link href="/fortnite-map" className="text-primary hover:underline">
                  live interactive map
                </Link>{' '}
                for current Shattered Coast markers, or{' '}
                <Link href="/map-rotation" className="text-primary hover:underline">
                  Reload map rotation
                </Link>{' '}
                for the 20-minute island timer.
              </li>
            </ol>
          </section>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How Fortnite&apos;s map changed by chapter
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Battle Royale has used multiple full islands, not just reskins of one terrain file.
              Athena (Chapter 1), Apollo (Chapter 2), Artemis (Chapter 3), Asteria (Chapter 4), Helios
              (Chapter 5), Oninoshima (Chapter 6), and Shattered Coast (Chapter 7) each reset the
              drop meta. Within a chapter, seasons still reshape biomes, water, and named POIs —
              which is why a season-to-season slider is useful even when the island name stays the
              same.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CHAPTER_SUMMARIES.map((ch) => (
                <div key={ch.chapter} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    Chapter {ch.chapter} — {ch.island}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {ch.seasons} season snapshots in this archive
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ch.blurb}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Best Fortnite map comparisons to try
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Not sure where to start? These pairings answer the searches people actually type —
              “old Fortnite map vs new,” “Season X vs Chapter 2,” and “Shattered Coast compared to
              Chapter 1.”
            </p>
            <div className="space-y-4 max-w-3xl">
              {COMPARISON_IDEAS.map((idea) => (
                <div key={idea.title}>
                  <h3 className="text-sm font-bold text-foreground">{idea.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{idea.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Map evolution vs live map vs Reload rotation
            </h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Tool
                    </th>
                    <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">Map Evolution</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Historical minimaps, chapter nostalgia, before/after content
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      <Link href="/fortnite-map" className="text-primary hover:underline">
                        Interactive BR map
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Current Shattered Coast layout and named locations
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      <Link href="/map-rotation" className="text-primary hover:underline">
                        Map Rotation
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Which Reload island is live and when it swaps (20-minute cycle)
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      <Link href="/guides/map/fortnite-loot-guide-best-spots" className="text-primary hover:underline">
                        Best loot spots guide
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Where to land this season for contested vs edge drops
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Why players look up old Fortnite maps
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Creators need clean before/after frames for season recaps. Competitive players argue
              about whether a POI “used to be better.” Returning players want to remember where
              Tilted sat relative to the coast. Parents helping kids with a school project want a
              simple visual timeline. A slider beats a random image search because both maps share
              the same framing and scale.
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              This page is intentionally an archive viewer — not a loot heat map. When you need
              Season 3 drop advice, read the{' '}
              <Link href="/guides/map/fortnite-map-all-locations-guide" className="text-primary hover:underline">
                Shattered Coast POI guide
              </Link>{' '}
              and the{' '}
              <Link href="/guides/map/fortnite-loot-guide-best-spots" className="text-primary hover:underline">
                best loot spots
              </Link>{' '}
              article instead of treating a historical minimap as live intel.
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

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Related Fortnite map tools &amp; guides
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/fortnite-map" className="text-primary hover:underline">
                  Interactive Fortnite map
                </Link>
              </li>
              <li>
                <Link href="/map-rotation" className="text-primary hover:underline">
                  Reload map rotation
                </Link>
              </li>
              <li>
                <Link href="/guides/map/fortnite-map-all-locations-guide" className="text-primary hover:underline">
                  Every named POI
                </Link>
              </li>
              <li>
                <Link href="/guides/map/fortnite-loot-guide-best-spots" className="text-primary hover:underline">
                  Best loot spots
                </Link>
              </li>
              <li>
                <Link href="/season-countdown" className="text-primary hover:underline">
                  Season countdown
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-primary hover:underline">
                  All tools
                </Link>
              </li>
            </ul>
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
