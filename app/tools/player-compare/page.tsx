import { Suspense } from 'react'
import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerCompareClient } from '@/components/PlayerCompareClient'
import { getFortniteApiKey, type StatsAccountType, type StatsTimeWindow } from '@/lib/fortnite-stats'
import { PLAYER_COMPARE_FAQS } from '@/lib/player-compare-seo'

type Props = {
  searchParams: Promise<{
    a?: string
    b?: string
    accountType?: string
    timeWindow?: string
  }>
}

export default async function PlayerComparePage({ searchParams }: Props) {
  const params = await searchParams
  const configured = Boolean(getFortniteApiKey())
  const initialA = params.a?.trim() || ''
  const initialB = params.b?.trim() || ''
  const initialAccountType = (['epic', 'psn', 'xbl'].includes(params.accountType || '')
    ? params.accountType
    : 'epic') as StatsAccountType
  const initialTimeWindow = (['lifetime', 'season'].includes(params.timeWindow || '')
    ? params.timeWindow
    : 'season') as StatsTimeWindow

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
                'radial-gradient(ellipse 70% 55% at 12% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 0%, color-mix(in oklab, #38bdf8 12%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="transition-colors hover:text-primary">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Player Compare</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Fortnite tracker · Head to head
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Player Compare</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Drop two Epic, PlayStation, or Xbox names and see season or lifetime Battle Royale stats
              side by side — wins, K/D, win rate, kills, matches, and more. Built for duo tryouts,
              lobby checks, and bragging rights.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/tools/player-stats" className="text-primary hover:underline">
                Single-player tracker
              </Link>
              {' · '}
              <Link href="/stats" className="text-primary hover:underline">
                Player stats leaderboards
              </Link>
              {' · '}
              <Link href="/tools" className="text-primary hover:underline">
                All tools
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 sm:px-6">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading compare tool…</p>}>
            <PlayerCompareClient
              configured={configured}
              initialA={initialA}
              initialB={initialB}
              initialAccountType={initialAccountType}
              initialTimeWindow={initialTimeWindow}
            />
          </Suspense>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Why compare Fortnite stats?
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Searching “compare Fortnite stats” usually means you already have two names — a duo
              partner, a ranked stack invite, or someone in your lobby. This tool loads both overall
              BR snapshots from the same Fortnite-API feed as our tracker, then highlights who leads
              each category so you do not have to flip tabs.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            <dl className="space-y-4">
              {PLAYER_COMPARE_FAQS.map((item) => (
                <div key={item.question} className="max-w-3xl">
                  <dt className="font-semibold text-foreground">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
