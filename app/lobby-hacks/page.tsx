import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdSenseUnit } from '@/components/adsense-unit'
import { LobbyHacksClient } from '@/components/LobbyHacksClient'
import { CURRENT_SEASON } from '@/lib/season'
import {
  LOBBY_HACK_COUNTS,
  LOBBY_HACKS_CAPTURED_AT,
  LOBBY_HACKS_FAQS,
  LOBBY_HACKS_HOWTO,
  LOBBY_HACKS_REVIEWED,
} from '@/lib/lobby-hacks'

export default function LobbyHacksPage() {
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
              <span className="text-foreground">Lobby Hacks</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · {LOBBY_HACK_COUNTS.total} codes · updated {LOBBY_HACKS_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Lobby Hacks</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Click a code to copy it and mark it as used. Override Admin Panel strings for Sprites,
              XP, Sprite Dust, locker items, and lobby effects — never V-Bucks. Snapshot{' '}
              {LOBBY_HACKS_CAPTURED_AT}; Epic can retire a string without notice.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link
                href="/guides/how-to/fortnite-admin-panel-lobby-hack-codes"
                className="text-primary hover:underline"
              >
                How to redeem
              </Link>
              {' · '}
              <Link href="/sprites" className="text-primary hover:underline">
                Sprite gallery
              </Link>
              {' · '}
              <Link href="/free-cosmetics" className="text-primary hover:underline">
                Free cosmetics
              </Link>
              {' · '}
              <Link href="/codes" className="text-primary hover:underline">
                Creative map codes
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to use these codes
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {LOBBY_HACKS_HOWTO.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <AdSenseUnit variant="inTool" />

          <section>
            <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              All Lobby Hack codes
            </h2>
            <LobbyHacksClient />
          </section>

          <AdSenseUnit variant="endOfBlog" />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {LOBBY_HACKS_FAQS.map((faq) => (
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
