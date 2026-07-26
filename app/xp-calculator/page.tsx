import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { XpCalculatorClient } from '@/components/XpCalculatorClient'
import { CURRENT_SEASON } from '@/lib/season'
import { XP_PER_LEVEL, formatXp, totalXpToLevel } from '@/lib/xp-calculator'

const faqs = [
  {
    q: 'How does this Fortnite XP calculator work?',
    a: `Enter your current level and target. We divide the remaining XP (${formatXp(XP_PER_LEVEL)} per level) by days left in ${CURRENT_SEASON.label} to get a daily XP goal, then estimate playtime from mode rates.`,
  },
  {
    q: 'How much XP per level in Fortnite right now?',
    a: `Every level costs ${formatXp(XP_PER_LEVEL)} XP. Level 100 is ${formatXp(totalXpToLevel(100))} XP from level 1; level 200 is ${formatXp(totalXpToLevel(200))} XP.`,
  },
  {
    q: 'What does “be level X today” mean?',
    a: 'It is an on-pace checkpoint for the season. If you want level 100 or 200 by the end date, that is roughly where your account level should sit today.',
  },
  {
    q: 'Is playtime XP the only way to level up?',
    a: 'No. Weekly/daily quests, medals, and Punch Cards add a lot. Use the Battle Pass XP calculator for a weekly quest plan, and Creative map codes when you need to farm fast.',
  },
]

export default function XpCalculatorPage() {
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
                'radial-gradient(ellipse 70% 50% at 20% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 65%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">XP Calculator</span>
            </nav>

            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">XP Calculator</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Plan daily XP for {CURRENT_SEASON.label} ({CURRENT_SEASON.codename}). See how much XP
              you need per day for level 100 or 200, stay on pace, and compare playtime rates across
              modes.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-12">
          <XpCalculatorClient />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Level up before the season ends
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pair this calculator with the{' '}
              <Link href="/season-countdown" className="text-primary hover:underline">
                season countdown
              </Link>
              ,{' '}
              <Link href="/tools/battle-pass-xp-calculator" className="text-primary hover:underline">
                Battle Pass weekly XP planner
              </Link>
              , and{' '}
              <Link href="/codes" className="text-primary hover:underline">
                Creative XP map codes
              </Link>
              . Pass reward context:{' '}
              <Link
                href="/guides/season/fortnite-season-battle-pass-guide"
                className="text-primary hover:underline"
              >
                Runners Battle Pass guide
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
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
