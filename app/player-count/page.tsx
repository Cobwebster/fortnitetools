import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerCountClient } from '@/components/PlayerCountClient'
import { loadPlayerCountData, PLAYER_COUNT_FAQS } from '@/lib/player-count'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 1800

export default async function PlayerCountPage() {
  const data = await loadPlayerCountData()

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
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Player Count</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Epic Data API
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Player Count</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Peak concurrent players for Battle Royale, Reload, OG, Blitz, LEGO, and the Creative
              maps people actually search for — powered by Epic&apos;s public Ecosystem Data API.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/codes" className="text-primary hover:underline">
                Map codes
              </Link>
              {' · '}
              <Link href="/map-rotation" className="text-primary hover:underline">
                Map rotation
              </Link>
              {' · '}
              <Link href="/tools/player-stats" className="text-primary hover:underline">
                Player stats
              </Link>
              {' · '}
              <Link href="/tools" className="text-primary hover:underline">
                All tools
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
          <PlayerCountClient
            epicRows={data.epicRows}
            creativeRows={data.creativeRows}
            totalTrackedPeak={data.totalTrackedPeak}
            updatedAt={data.updatedAt}
            sourceNote={data.sourceNote}
          />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            <dl className="space-y-4">
              {PLAYER_COUNT_FAQS.map((item) => (
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
