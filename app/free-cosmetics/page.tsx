import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FreeCosmeticsClient } from '@/components/FreeCosmeticsClient'
import { FREE_COSMETIC_OFFERS } from '@/lib/free-cosmetics'

const faqs = [
  {
    q: 'What free Fortnite cosmetics are available right now?',
    a: 'Use the Active filter above — it hides completed items and expired timed offers. Twitch drops, Reload / BR quests, Ranked, Sprite mastery, and free pass tracks rotate through the season.',
  },
  {
    q: 'Where do Sprite mastery rewards come from?',
    a: 'Mastering Sprites unlocks free backblings and a glider at set milestones. See the Sprite list for every companion, then extract them before the mastery window ends.',
  },
  {
    q: 'Can I still get Boogie Down for free?',
    a: 'Yes — enable two-factor authentication on your Epic account. It is listed under ongoing account rewards with no end date.',
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

            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Free Fortnite <span className="text-primary">Cosmetics</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Timed and ongoing free rewards — Twitch drops, quests, Ranked, Sprite mastery, passes,
              and account links. Mark what you&apos;ve finished; we save progress in this browser.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{FREE_COSMETIC_OFFERS.length}</strong> offers tracked ·{' '}
              <Link
                href="/guides/how-to/how-to-extract-sprites-fortnite"
                className="text-primary hover:underline"
              >
                Sprite guide
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

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-12">
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
