import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DailyJamTracksClient } from '@/components/DailyJamTracksClient'
import { CURRENT_SEASON } from '@/lib/season'
import { fetchDailyJamTracks, JAM_TRACKS_FAQS } from '@/lib/jam-tracks'

export const revalidate = 86400

export default async function DailyJamTracksPage() {
  let snapshot = null as Awaited<ReturnType<typeof fetchDailyJamTracks>> | null
  let error: string | null = null
  try {
    snapshot = await fetchDailyJamTracks()
  } catch {
    error = 'Could not load today’s Festival rotation. Try again in a minute.'
  }

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
                'radial-gradient(ellipse 65% 50% at 10% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Daily Jam Tracks</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Festival Music Library · refreshes 00:00 UTC
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Daily <span className="text-primary">Jam Tracks</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Today’s free Fortnite Festival Jam Tracks — click any cover to play a YouTube embed.
              Featured songs rotate every day at midnight UTC. New shop arrivals and recently rotated
              tracks are listed below.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/new-cosmetics" className="text-primary hover:underline">
                New cosmetics
              </Link>
              {' · '}
              <Link href="/modes" className="text-primary hover:underline">
                Modes
              </Link>
              {' · '}
              <Link href="/player-count" className="text-primary hover:underline">
                Player count
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          {error || !snapshot ? (
            <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
              {error || 'No snapshot available.'}
            </p>
          ) : (
            <DailyJamTracksClient snapshot={snapshot} />
          )}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How Daily Jam Tracks work
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold text-foreground">Free for the day</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Featured Jam Tracks can be selected in Festival’s Music Library without owning them.
                  That free window ends at the next UTC midnight refresh.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold text-foreground">Listen first</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Click a card to load a YouTube player for that song. Some tracks also include a short
                  Spotify preview under the video.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold text-foreground">Own it forever</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Buying a Jam Track in the Item Shop keeps it in your locker. Featured rotation does
                  not grant permanent ownership.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {JAM_TRACKS_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>

          <p className="border-t border-border pt-8 text-xs text-muted-foreground">
            Rotation data comes from the public Festival Jam Track catalog (refreshes around 00:00 UTC).
            YouTube embeds are search-resolved and may not be the official Festival chart video. Not
            affiliated with Epic Games.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
