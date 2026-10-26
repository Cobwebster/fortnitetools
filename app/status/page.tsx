import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteIcon } from '@/components/fortnite-icon'
import { StatusDashboard } from '@/components/StatusDashboard'
import { StatusDot } from '@/components/StatusDot'
import { componentStatusTone, type StatusToneKind } from '@/lib/status-tone'
import { fetchFortniteNews } from '@/lib/fortnite-news'
import {
  fetchEpicStatus,
  formatEpicUpdated,
  indicatorCopy,
  pickStatusMotds,
  STATUS_CHECKS,
  STATUS_FAQS,
  STATUS_RESET_WEEK,
  STATUS_REVIEWED,
  WHAT_WE_DONT_SHOW,
  YOU_VS_EPIC,
} from '@/lib/fortnite-status'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 60

function resolveTone(indicator: string, ok: boolean): StatusToneKind {
  if (!ok) return 'unknown'
  if (indicator === 'none') return 'ok'
  if (indicator === 'minor' || indicator === 'maintenance') return 'warn'
  return 'bad'
}

export default async function StatusPage() {
  const [epic, news] = await Promise.all([
    fetchEpicStatus(),
    fetchFortniteNews().catch(() => null),
  ])
  const motds = pickStatusMotds(news?.motds ?? [])
  const tone = resolveTone(epic.indicator, epic.ok)
  const updated = formatEpicUpdated(epic.updatedAt)
  const headline = epic.ok
    ? indicatorCopy(epic.indicator, epic.description)
    : 'We could not reach Epic’s status board from this server.'

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
                'radial-gradient(ellipse 55% 50% at 15% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 20%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 50%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Status</span>
            </nav>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.codename} · checked {STATUS_REVIEWED}
                </p>
                <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl lg:text-6xl">
                  Is Fortnite <span className="text-primary">down</span>?
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Live read on Epic’s public board, lobby headlines that mention downtime, and the
                  Override → Treasure Hunters clock — not a fake ping map of your city. 1 November
                  queue day starts here.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href="https://status.epicgames.com/"
                  className="rounded-md border border-border bg-card/80 px-3 py-2 font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Epic board
                </a>
                <Link
                  href="/news"
                  className="rounded-md border border-border bg-card/80 px-3 py-2 font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Lobby news
                </Link>
                <Link
                  href="/season-countdown"
                  className="rounded-md border border-border bg-card/80 px-3 py-2 font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Nov 1 countdown
                </Link>
                <Link
                  href="/guides/season/fortnite-treasure-hunters"
                  className="rounded-md border border-border bg-card/80 px-3 py-2 font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Treasure Hunters
                </Link>
                <Link
                  href="/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping"
                  className="rounded-md border border-border bg-card/80 px-3 py-2 font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Ping / packet loss
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <StatusDashboard
            tone={tone}
            headline={headline}
            description={
              epic.ok
                ? epic.description && epic.description !== headline
                  ? epic.description
                  : 'If this is green and only you cannot matchmake, that is usually your network — not a global outage we can invent dots for.'
                : epic.description
            }
            updatedLabel={updated}
            componentCount={epic.components.length}
            incidentCount={epic.incidents.length}
            fetchOk={epic.ok}
          />

          <p className="text-center text-xs text-muted-foreground">
            Failing to load Epic’s board here is <strong className="text-foreground">not</strong> proof
            Fortnite is down —{' '}
            <a
              href="https://status.epicgames.com/"
              className="font-semibold text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              open it directly
            </a>
            .
          </p>

          {epic.ok && epic.components.length > 0 ? (
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                    Epic services
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Store, login, and Fortnite can fail separately. Green overall does not mean every row is perfect.
                  </p>
                </div>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {epic.components.map((c) => {
                  const cTone = componentStatusTone(c.status)
                  return (
                    <li
                      key={c.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <StatusDot tone={cTone} />
                        <span className="truncate text-sm font-semibold text-foreground">{c.name}</span>
                      </span>
                      <span className="shrink-0 text-xs font-medium capitalize text-muted-foreground">
                        {c.status}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {epic.ok && epic.incidents.length > 0 ? (
            <section>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Open incidents
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {epic.incidents.map((i) => (
                  <article
                    key={i.name}
                    className="rounded-xl border border-rose-500/30 bg-card p-5 ring-1 ring-rose-500/15"
                  >
                    <div className="flex items-center gap-2">
                      <StatusDot tone="bad" />
                      <h3 className="text-sm font-bold text-foreground">{i.name}</h3>
                    </div>
                    <p className="mt-2 text-sm capitalize text-muted-foreground">
                      {i.status}
                      {i.createdAt ? ` · ${formatEpicUpdated(i.createdAt)}` : ''}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : epic.ok ? (
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-5 py-4 text-sm text-muted-foreground">
              <span className="mr-2 inline-flex items-center gap-2 font-semibold text-emerald-300">
                <StatusDot tone="ok" /> No open incidents
              </span>
              Epic’s summary listed none when we last checked.
            </div>
          ) : null}

          <section className="grid gap-3 lg:grid-cols-3">
            {STATUS_RESET_WEEK.map((row, i) => (
              <article
                key={row.title}
                className="relative overflow-hidden rounded-xl border border-border bg-card p-5"
              >
                <FortniteIcon
                  src={
                    i === 0
                      ? '/images/icons/glider.png'
                      : i === 1
                        ? '/images/icons/storm.png'
                        : '/images/loadout/pulse_scanner.png'
                  }
                  alt=""
                  size="sm"
                />
                <h3 className="mt-3 text-sm font-bold text-foreground">{row.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
              </article>
            ))}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What this page is watching
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {STATUS_CHECKS.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <FortniteIcon
                    src={
                      row.title.includes('board')
                        ? '/images/icons/storm.png'
                        : row.title.includes('news')
                          ? '/images/icons/map.png'
                          : '/images/icons/battle_pass.png'
                    }
                    alt=""
                    size="sm"
                  />
                  <h3 className="mt-3 text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                  Lobby headlines
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Same tiles as the in-game news tab. We surface reboot / downtime wording when it is there —
                  a collab skin ad is not a status flag.
                </p>
              </div>
              <Link href="/news" className="text-sm font-semibold text-primary hover:underline">
                Full news →
              </Link>
            </div>
            {motds.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {motds.map((m) => (
                  <article key={m.id} className="overflow-hidden rounded-xl border border-border bg-card">
                    {m.image || m.tileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.image || m.tileImage || ''}
                        alt=""
                        className="aspect-[21/9] w-full object-cover opacity-90"
                      />
                    ) : null}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-foreground">{m.title}</h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {m.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
                No lobby headlines loaded right now — that is not downtime. Try the{' '}
                <Link href="/news" className="font-semibold text-primary hover:underline">
                  news page
                </Link>{' '}
                or the in-game tab.
              </p>
            )}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              You vs Epic
            </h2>
            <div className="mt-5 grid gap-2">
              {YOU_VS_EPIC.map((row) => (
                <article
                  key={row.symptom}
                  className="grid gap-1 rounded-xl border border-border bg-card px-4 py-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] sm:gap-4"
                >
                  <p className="text-sm font-semibold text-foreground">{row.symptom}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{row.likely}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What we will not publish
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {WHAT_WE_DONT_SHOW.map((row) => (
                <article key={row.title} className="rounded-xl border border-border/80 bg-muted/20 p-5">
                  <FortniteIcon
                    src={
                      row.title.includes('ping')
                        ? '/images/icons/map.png'
                        : row.title.includes('queue')
                          ? '/images/loadout/pulse_scanner.png'
                          : '/images/icons/pickaxe.png'
                    }
                    alt=""
                    size="sm"
                  />
                  <h3 className="mt-3 text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              In-match stutter with a green Epic board is usually packet loss or routing — use the{' '}
              <Link
                href="/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping"
                className="font-semibold text-primary hover:underline"
              >
                ping guide
              </Link>
              , not a fake world map.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              If you are spending before downtime
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Account steps people search while the season clock runs out — not a status flag.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link
                href="/guides/how-to/how-to-redeem-fortnite-code"
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/60"
              >
                <p className="text-sm font-bold text-foreground">Redeem a code</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Gift cards and creator codes before you sit in a queue.
                </p>
              </Link>
              <Link
                href="/guides/how-to/how-to-refund-fortnite-skins"
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/60"
              >
                <p className="text-sm font-bold text-foreground">Refund skins</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Cancel Purchase and Return Tickets if you bought a pass you cannot finish.
                </p>
              </Link>
              <Link
                href="/guides/how-to/how-much-is-fortnite-battle-pass"
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/60"
              >
                <p className="text-sm font-bold text-foreground">Battle Pass is 800</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Override still costs 800 V-Bucks (or Crew). Unclaimed tiers do not carry.
                </p>
              </Link>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {STATUS_FAQS.map((faq) => (
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
