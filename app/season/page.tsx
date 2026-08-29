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
  SEASON_MYTHICS,
  VAULTED_THIS_SEASON,
} from '@/lib/season-hub'
import { WEAPONS } from '@/lib/weapons'

const LOOT_BY_CATEGORY = (['AR', 'Shotgun', 'SMG', 'Pistol', 'Sniper'] as const).map((category) => ({
  category,
  names: WEAPONS.filter((w) => w.category === category && w.rarity !== 'Mythic').map((w) => w.name),
}))

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
                    alt={`${CURRENT_SEASON.label} Shattered Coast map`}
                    className="aspect-square w-full object-cover"
                    width={176}
                    height={176}
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Last reviewed {SEASON_HUB_REVIEWED} · {CURRENT_SEASON.shortLabel} still live
                </p>
                <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-wide text-foreground sm:text-5xl text-balance">
                  Fortnite {CURRENT_SEASON.next.label} — what changed
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Reset-week hub for island, loot pool, mythics, ranked, and the Battle Pass free
                  track. {CURRENT_SEASON.label} ({CURRENT_SEASON.codename}) is still the live client
                  until {formatSeasonLongDate(seasonEndDate())}. {CURRENT_SEASON.next.label} is dated{' '}
                  {formatSeasonLongDate(nextSeasonStartDate())}; the lobby MOTD says “Reality Reboots
                  August 20.” S4 POIs, guns, and mythics are{' '}
                  <strong className="text-foreground">not invented here</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {SEASON_HUB_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="font-semibold text-primary hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to use this page this week
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Search traffic this week wants “what changed.” Most of those answers are still “not
              yet.” The useful part is knowing what is still true on Shattered Coast so you do not
              queue with a vaulted Flex SMG loadout.
            </p>
            <div className="mt-5 grid gap-3">
              {RESET_WEEK_PLAYBOOK.map((step) => (
                <article key={step.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-primary/40 bg-card p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Incoming — do not spoiler-fill
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Confirmed: season countdown to {formatSeasonLongDate(nextSeasonStartDate())} (UTC) and
              the lobby tile “Reality Reboots August 20.” Not confirmed in our files: S4 POI names,
              loot pool, boss mythics, or Battle Pass layout. When the client flips, this page gets a
              rewrite the same day — until then, play Shattered Coast and the C7S3 pool.
            </p>
            <p className="mt-3 text-sm">
              <Link href="/season-countdown" className="font-semibold text-primary hover:underline">
                Live countdown
              </Link>
              {' · '}
              <Link href="/news" className="font-semibold text-primary hover:underline">
                Lobby MOTDs
              </Link>
              {' · '}
              <Link href="/modes" className="font-semibold text-primary hover:underline">
                Playlists
              </Link>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What changed
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Each card is live S3 vs incoming S4. If a leak site already named S4 drops, ignore it
              here.
            </p>
            <div className="mt-5 grid gap-4">
              {SEASON_CHANGE_CARDS.map((card) => (
                <article key={card.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                      {card.title}
                    </h3>
                    <Link href={card.href} className="shrink-0 text-sm font-semibold text-primary hover:underline">
                      {card.linkLabel}
                    </Link>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Live: </span>
                    {card.live}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">S4: </span>
                    {card.incoming}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.extra}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Named POIs still on Shattered Coast
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Five of these have rotate guides (contest, extract, third-party). The rest stay on the
              interactive map and the two map articles. After the reboot, treat this list as stale.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {LIVE_NAMED_POIS.map((poi) => (
                <li key={poi.name}>
                  <Link
                    href={poi.href}
                    className="flex flex-col rounded-lg border border-border bg-card px-3 py-2 hover:border-primary/60"
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
              Live loot snapshot
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Body-shot planning pool after the 16 Jul 2026 hotfix. Numbers and STK live on the
              weapons encyclopedia and loadout builder — this is the name list so reset-week search
              has a dated snapshot.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {LOOT_BY_CATEGORY.map((row) => (
                <div key={row.category} className="rounded-xl border border-border bg-card px-4 py-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary">{row.category}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.names.join(' · ')}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-foreground">
              Vaulted mid-season (not in BR)
            </h3>
            <ul className="mt-2 space-y-2">
              {VAULTED_THIS_SEASON.map((item) => (
                <li key={item.name} className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="text-muted-foreground"> — {item.when}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Live mythics
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Boss or vault versions of the guns above. Harbor and Sinister Strip still pull this
              traffic on Shattered Coast. Taking one makes you the third-party.
            </p>
            <ul className="mt-4 space-y-2">
              {SEASON_MYTHICS.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt="" className="h-10 w-10 object-contain" width={40} height={40} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{w.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {w.note || w.category} · {w.dmg} body · {w.fireRate} rps
                    </p>
                  </div>
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
