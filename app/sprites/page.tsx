import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SpritesGallery } from '@/components/SpritesGallery'
import { CURRENT_SEASON } from '@/lib/season'
import {
  SPRITE_COUNTS,
  SPRITES_CAPTURED_AT,
  SPRITES_FAQS,
  SPRITES_HOWTO,
} from '@/lib/sprites'

export default function SpritesPage() {
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
              <span className="text-foreground">Sprites</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · {SPRITE_COUNTS.total} companions · snapshot {SPRITES_CAPTURED_AT}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Sprites</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              All {SPRITE_COUNTS.total} Chapter 7 Sprite portraits across {SPRITE_COUNTS.families}{' '}
              families — Jonesy, Klombo, Gold, Cheat Master, Quack, and collab skins. Open any tile
              for ability, how to get, location notes, and every family variant. These are in-game
              companions, not PNG texture sheets.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/guides/how-to/how-to-extract-sprites-fortnite" className="text-primary hover:underline">
                Extract guide
              </Link>
              {' · '}
              <Link href="/guides/how-to/how-to-get-cube-sprites-fortnite" className="text-primary hover:underline">
                Cube Sprites
              </Link>
              {' · '}
              <Link href="/lobby-hacks" className="text-primary hover:underline">
                Lobby Hacks
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section>
            <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              All Sprite icons
            </h2>
            <SpritesGallery />
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How this list is built
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {SPRITES_HOWTO.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {SPRITES_FAQS.map((faq) => (
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
