import Link from '@/components/link'
import { AdSenseUnit } from '@/components/adsense-unit'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerCountClient } from '@/components/PlayerCountClient'
import { TrackedStatsLeaderboards } from '@/components/TrackedStatsLeaderboards'
import { loadPlayerCountData } from '@/lib/player-count'
import { loadStatsLeaderboard } from '@/lib/stats-leaderboard'
import {
  STATS_HUB_FAQS,
  STATS_HUB_LINKS,
  STATS_HUB_PLAYBOOK,
  STATS_HUB_REVIEWED,
} from '@/lib/stats-hub'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 86400

export default async function StatsPage() {
  const [data, leaderboard] = await Promise.all([
    loadPlayerCountData(),
    loadStatsLeaderboard(),
  ])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 12% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 0%, color-mix(in oklab, #38bdf8 12%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="transition-colors hover:text-primary">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Player Stats</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Updated {STATS_HUB_REVIEWED} · our poll + Epic CCU
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Player Stats</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Wins, kills, Battle Pass level, and time among accounts we poll ourselves — plus which
              modes and Creative maps are actually busy. Look up any name on the tracker. No scraped
              third-party ladders.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-foreground">{STATS_HUB_REVIEWED}</span>
              {' · '}
              <Link href="/tools/player-stats" className="text-primary hover:underline">
                Player stats
              </Link>
              {' · '}
              <Link href="/tools/player-compare" className="text-primary hover:underline">
                Compare players
              </Link>
              {' · '}
              <Link href="/player-count" className="text-primary hover:underline">
                Player count
              </Link>
              {' · '}
              <Link href="/season" className="text-primary hover:underline">
                Season hub
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <AdSenseUnit variant="inTool" />
          <TrackedStatsLeaderboards snapshot={leaderboard} />

          <div className="border-t border-border pt-10">
            <PlayerCountClient
              epicRows={data.epicRows}
              creativeRows={data.creativeRows}
              totalTrackedPeak={data.totalTrackedPeak}
              updatedAt={data.updatedAt}
              sourceNote={data.sourceNote}
              variant="stats"
            />
          </div>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to read these boards
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Player tables are a tracked sample we refresh ourselves. Mode tables are live
              popularity from Epic. Neither claims to be every Fortnite player ranked.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {STATS_HUB_PLAYBOOK.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-card px-5 py-4"
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Related:{' '}
              {STATS_HUB_LINKS.map((link, i) => (
                <span key={link.href}>
                  {i > 0 ? ' · ' : null}
                  <Link href={link.href} className="font-semibold text-primary hover:underline">
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            <dl className="space-y-4">
              {STATS_HUB_FAQS.map((item) => (
                <div key={item.question} className="max-w-3xl">
                  <dt className="font-semibold text-foreground">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
          <AdSenseUnit variant="endOfBlog" />
        </div>
      </main>
      <Footer />
    </>
  )
}
