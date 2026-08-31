import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  CURRENT_SEASON,
  formatSeasonLongDate,
  nextSeasonStartDate,
  seasonEndDate,
} from '@/lib/season'
import {
  LIVE_NAMED_POIS,
  RESET_WEEK_PLAYBOOK,
  SEASON_CHANGE_CARDS,
  SEASON_HUB_FAQS,
  SEASON_HUB_LINKS,
  SEASON_HUB_REVIEWED,
  VAULTED_THIS_SEASON,
} from '@/lib/season-hub'

export default function SeasonHubPage() {
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
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Season</span>
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
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Last reviewed {SEASON_HUB_REVIEWED} · {CURRENT_SEASON.shortLabel} live
                </p>
                <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-wide text-foreground sm:text-5xl text-balance">
                  Fortnite {CURRENT_SEASON.label} — {CURRENT_SEASON.codename}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Live hub for island changes, Match Overrides, ranked, and the Battle Pass. Season
                  ends {formatSeasonLongDate(seasonEndDate())}; {CURRENT_SEASON.next.label} is dated{' '}
                  {formatSeasonLongDate(nextSeasonStartDate())}. Loot DPS sheets that still say
                  Runners are getting a rewrite — we will not invent Override gun numbers.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
              {SEASON_HUB_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-border bg-card/80 px-3 py-1.5 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Playbook
            </h2>
            <div className="mt-5 grid gap-3">
              {RESET_WEEK_PLAYBOOK.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What changed
            </h2>
            <div className="mt-5 space-y-4">
              {SEASON_CHANGE_CARDS.map((card) => (
                <article key={card.id} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Live: </span>
                    {card.live}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Next: </span>
                    {card.incoming}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.extra}</p>
                  <p className="mt-3 text-sm">
                    <Link href={card.href} className="font-semibold text-primary hover:underline">
                      {card.linkLabel}
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Named POIs (live list)
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              From Fortnite-API named locations, reviewed {SEASON_HUB_REVIEWED}. Drop guides exist for
              five returning POIs — new Override names use the map until dedicated pages ship.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {LIVE_NAMED_POIS.map((poi) => (
                <li key={poi.name}>
                  <Link
                    href={poi.href}
                    className="flex flex-col rounded-lg border border-border bg-card px-3 py-2 hover:border-primary/50"
                  >
                    <span className="text-sm font-semibold text-foreground">{poi.name}</span>
                    <span className="text-xs text-muted-foreground">{poi.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Gone / locked with the reboot
            </h2>
            <ul className="mt-4 space-y-2">
              {VAULTED_THIS_SEASON.map((row) => (
                <li
                  key={row.name}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
                >
                  <span className="font-semibold text-foreground">{row.name}</span> — {row.when}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {SEASON_HUB_FAQS.map((faq) => (
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
