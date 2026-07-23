import Link from 'next/link'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerStatsClient } from '@/components/PlayerStatsClient'
import { PLAYER_STATS_FAQS } from '@/lib/player-stats-seo'
import { getFortniteApiKey } from '@/lib/fortnite-stats'
import type { StatsAccountType, StatsTimeWindow } from '@/lib/fortnite-stats'

type Props = {
  searchParams: Promise<{ name?: string; accountType?: string; timeWindow?: string }>
}

export default async function PlayerStatsPage({ searchParams }: Props) {
  const params = await searchParams
  const configured = Boolean(getFortniteApiKey())
  const initialName = params.name?.trim() || ''
  const initialAccountType = (['epic', 'psn', 'xbl'].includes(params.accountType || '')
    ? params.accountType
    : 'epic') as StatsAccountType
  const initialTimeWindow = (['lifetime', 'season'].includes(params.timeWindow || '')
    ? params.timeWindow
    : 'lifetime') as StatsTimeWindow

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Player Stats</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Fortnite <span className="text-primary">Player Stats</span>
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Look up any Fortnite player by Epic username (or PSN / Xbox). See K/D, wins, win rate, matches, kills,
              Solo / Duo / Squad / LTM splits, input-device breakdowns, and Battle Pass level when available.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Suspense
            fallback={
              <div className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
                Loading stats tool…
              </div>
            }
          >
            <PlayerStatsClient
              initialName={initialName}
              initialAccountType={initialAccountType}
              initialTimeWindow={initialTimeWindow}
              configured={configured}
            />
          </Suspense>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Free Fortnite stats tracker &amp; username lookup
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">
              People search “Fortnite stats”, “Fortnite tracker”, and “Fortnite K/D check” every day. This tool resolves a
              display name through Fortnite-API and shows the full Battle Royale career (or current season) snapshot Epic
              exposes — overall plus playlist and input splits — so you can compare teammates, check a lobby name, or track
              your own progress.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              <li>Type the exact in-game name (watch for zeros vs O, and creator suffixes).</li>
              <li>Pick Epic, PlayStation, or Xbox if the name lives on that platform identity.</li>
              <li>Choose Lifetime or Current season, then Look up.</li>
              <li>Share the URL — it keeps the player name in the query string after a successful search.</li>
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Stats we show when Epic provides them
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Headline numbers</h3>
                <p>K/D ratio, wins, win rate, matches, kills, deaths, kills per match, score, and minutes played.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Mode splits</h3>
                <p>Solo, Duo, Squad, and LTM rows (Trio is often empty in the API). Placement tops (Top 3 / 5 / 10 / 25) when present.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Input devices</h3>
                <p>All inputs, plus Keyboard &amp; Mouse, Controller, and Touch when the account has played on those devices.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Battle Pass</h3>
                <p>Season Battle Pass level and progress toward the next level when the API returns it.</p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-5 max-w-3xl">
              {PLAYER_STATS_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">
              Related tools
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/kd-calculator" className="text-primary hover:underline">
                  K/D Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/loadout-builder" className="text-primary hover:underline">
                  Loadout Builder
                </Link>
              </li>
              <li>
                <Link href="/fortnite-map" className="text-primary hover:underline">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-primary hover:underline">
                  All Tools
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
