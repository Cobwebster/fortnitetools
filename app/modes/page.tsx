import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteModesClient } from '@/components/FortniteModesClient'
import { fetchPlaylists, PLAYLIST_FAQS } from '@/lib/fortnite-playlists'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 3600

export default async function ModesPage() {
  const playlists = await fetchPlaylists().catch(() => [])

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
                'radial-gradient(ellipse 70% 55% at 12% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
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
              <span className="text-foreground">Game Modes</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Playlist catalog
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Game Modes</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {playlists.length} playlists from current game files after dropping bot, test, and QA rows.
              Ranked ids are labelled even when Epic&apos;s display name is just “Solo.” This is the
              catalog, not how LP works — use{' '}
              <Link href="/ranked" className="text-primary hover:underline">
                ranked reset / LP
              </Link>{' '}
              and the{' '}
              <Link href="/reload" className="text-primary hover:underline">
                Reload mode page
              </Link>{' '}
              for those questions.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/reload" className="text-primary hover:underline">
                Reload
              </Link>
              {' · '}
              <Link href="/ranked" className="text-primary hover:underline">
                Ranked
              </Link>
              {' · '}
              <Link href="/map-rotation" className="text-primary hover:underline">
                Reload rotation
              </Link>
              {' · '}
              <Link href="/player-count" className="text-primary hover:underline">
                Player count
              </Link>
              {' · '}
              <Link href="/codes" className="text-primary hover:underline">
                Creative codes
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <FortniteModesClient playlists={playlists} />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="max-w-3xl space-y-4">
              {PLAYLIST_FAQS.map((faq) => (
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
