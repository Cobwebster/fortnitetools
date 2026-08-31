import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SeasonCountdownClient } from '@/components/SeasonCountdownClient'
import {
  CURRENT_SEASON,
  formatSeasonLongDate,
  getSeasonCountdown,
  nextSeasonStartDate,
  seasonEndDate,
  seasonStartDate,
} from '@/lib/season'

const faqs = [
  {
    q: `When does Fortnite ${CURRENT_SEASON.label} end?`,
    a: `${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) ends on ${formatSeasonLongDate(seasonEndDate())}. Use the live countdown above for days, hours, minutes, and seconds remaining.`,
  },
  {
    q: `When does ${CURRENT_SEASON.next.label} start?`,
    a: `${CURRENT_SEASON.next.label} starts on ${formatSeasonLongDate(nextSeasonStartDate())}, immediately after Override ends.`,
  },
  {
    q: 'What happens when the Fortnite season ends?',
    a: 'The Battle Pass locks, seasonal quests rotate out, and the loot pool / map can change for the next season. Unclaimed pass rewards are gone — grind XP before the timer ends.',
  },
  {
    q: 'How accurate is this Fortnite season countdown?',
    a: 'The end date matches Epic’s published Override / Chapter 7 Season 4 schedule (November 1, 2026 on the Battle Pass page). Exact downtime can move by a few hours for servers and patching.',
  },
]

export default function SeasonCountdownPage() {
  const snap = getSeasonCountdown()
  const endLabel = formatSeasonLongDate(seasonEndDate())
  const startLabel = formatSeasonLongDate(seasonStartDate())
  const nextLabel = formatSeasonLongDate(nextSeasonStartDate())

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in oklab, var(--card) 100%, transparent), var(--background))',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-12deg, transparent, transparent 12px, currentColor 12px, currentColor 13px)',
            }}
          />

          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Season Countdown</span>
            </nav>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="relative mx-auto w-36 shrink-0 sm:mx-0 sm:w-44">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg ring-1 ring-primary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CURRENT_SEASON.mapImage}
                    alt={`${CURRENT_SEASON.label} live minimap`}
                    className="aspect-square w-full object-cover"
                    width={176}
                    height={176}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card/95 p-2 shadow-md backdrop-blur-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CURRENT_SEASON.passIcon}
                    alt={`${CURRENT_SEASON.label} Battle Pass icon`}
                    className="h-full w-full object-contain"
                    width={40}
                    height={40}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} · {CURRENT_SEASON.codename}
                </p>
                <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-wide text-foreground sm:text-5xl text-balance">
                  When does Fortnite {CURRENT_SEASON.label} end?
                </h1>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-8">
              <SeasonCountdownClient />
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Reset-week loot notes are retired — Override is live. Island, ranked, and Battle Pass
              notes live on the{' '}
              <Link href="/season" className="text-primary hover:underline">
                {CURRENT_SEASON.label} hub
              </Link>
              . Queue vs downtime is the{' '}
              <Link href="/status" className="text-primary hover:underline">
                status page
              </Link>
              ; LP notes are{' '}
              <Link href="/ranked" className="text-primary hover:underline">
                ranked
              </Link>
              .
            </p>

            <p className="mt-6 text-sm text-muted-foreground" suppressHydrationWarning>
              Static snapshot for search: {CURRENT_SEASON.label} is about{' '}
              <strong className="text-foreground">{Math.round(snap.progressPct)}% complete</strong>
              {!snap.ended ? (
                <>
                  {' '}
                  with roughly{' '}
                  <strong className="text-foreground">{snap.daysRemaining} days</strong> left
                </>
              ) : null}
              . End date: <strong className="text-foreground">{endLabel}</strong>.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-12">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {CURRENT_SEASON.label} end date
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fortnite <strong className="text-foreground">{CURRENT_SEASON.label}</strong> (
              {CURRENT_SEASON.codename}) started around <strong className="text-foreground">{startLabel}</strong>{' '}
              and ends on <strong className="text-foreground">{endLabel}</strong>. That is the date
              players mean when they search “when does Fortnite season end” or “Chapter 7 Season 4
              end date.”
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">{CURRENT_SEASON.next.label}</strong> is scheduled to
              begin on <strong className="text-foreground">{nextLabel}</strong> — the same calendar
              day the current season wraps.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Finish the Battle Pass before it ends
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pair this calculator with the{' '}
              <Link href="/xp-calculator" className="text-primary hover:underline">
                Fortnite XP calculator
              </Link>
              ,{' '}
              <Link href="/tools/battle-pass-xp-calculator" className="text-primary hover:underline">
                Battle Pass XP calculator
              </Link>{' '}
              and farm Creative XP from our{' '}
              <Link href="/codes" className="text-primary hover:underline">
                map codes
              </Link>
              . Strategy context lives in the{' '}
              <Link
                href="/guides/season/fortnite-season-battle-pass-guide"
                className="text-primary hover:underline"
              >
                Battle Pass guide
              </Link>
              {' '}
              (Runners-era — Override pass levels differ; use the XP calculator for the live end date)
              .
            </p>
          </section>

          <section className="space-y-4">
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
