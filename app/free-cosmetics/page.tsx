import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FreeCosmeticsClient } from '@/components/FreeCosmeticsClient'
import { FREE_COSMETIC_OFFERS, FREE_COSMETICS_REVIEWED } from '@/lib/free-cosmetics'
import { CURRENT_SEASON } from '@/lib/season'

const faqs = [
  {
    q: 'What free Fortnite cosmetics are available in Override right now?',
    a: 'Use the Active filter — it hides finished and expired offers. Live windows include ironmouse Twitch Drops (through 30 Sep), Admin Panel Lobby Hack codes, Override Battle Pass free track, Ranked Null styles, and ongoing account rewards like 2FA Boogie Down.',
  },
  {
    q: 'What is the Admin Panel?',
    a: 'Chapter 7 Season 4 added Lobby Hack codes in the Admin Panel (lobby, Ranked off). Epic codes grant XP, Sprite Dust, Sprites, and cosmetics — never V-Bucks. Redeem before the season ends.',
  },
  {
    q: 'Can I still get Boogie Down for free?',
    a: 'Yes — enable two-factor authentication on your Epic account. It is listed under ongoing account rewards with no end date.',
  },
  {
    q: 'When does the Override free Battle Pass track end?',
    a: `${CURRENT_SEASON.label} is scheduled through 1 November 2026. Finish free-track and seasonal ranked quests before then.`,
  },
]

export default function FreeCosmeticsPage() {
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
                'radial-gradient(ellipse 65% 50% at 10% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Free Cosmetics</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Reviewed {FREE_COSMETICS_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Free Fortnite <span className="text-primary">Cosmetics</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Override freebies — ironmouse Twitch Drops, Admin Panel Lobby Hacks, Ranked Null, Battle
              Pass free track, and evergreen account rewards. Mark what you&apos;ve finished; progress
              saves in this browser.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{FREE_COSMETIC_OFFERS.length}</strong> offers tracked ·{' '}
              <Link href="/season" className="text-primary hover:underline">
                Season hub
              </Link>
              {' · '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/season-countdown" className="text-primary hover:underline">
                Season countdown
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <FreeCosmeticsClient />

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
        </div>
      </main>
      <Footer />
    </>
  )
}
