import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fetchFortniteNews } from '@/lib/fortnite-news'
import {
  countdownStatusLine,
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
import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate } from '@/lib/season'

export const revalidate = 60

function statusTone(indicator: string, ok: boolean) {
  if (!ok) return { border: 'border-border', label: 'Could not reach Epic’s board' }
  if (indicator === 'none') return { border: 'border-emerald-500/50', label: 'Epic board: operational' }
  if (indicator === 'minor' || indicator === 'maintenance') {
    return { border: 'border-amber-400/60', label: indicatorCopy(indicator, '') }
  }
  return { border: 'border-red-500/50', label: indicatorCopy(indicator, '') }
}

export default async function StatusPage() {
  const [epic, news] = await Promise.all([
    fetchEpicStatus(),
    fetchFortniteNews().catch(() => null),
  ])
  const motds = pickStatusMotds(news?.motds ?? [])
  const tone = statusTone(epic.indicator, epic.ok)
  const updated = formatEpicUpdated(epic.updatedAt)
  const countdownLine = countdownStatusLine()

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
                'radial-gradient(ellipse 60% 45% at 50% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Status</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Reset week · last reviewed {STATUS_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Is Fortnite <span className="text-primary">down</span>?
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Downtime, queue, “servers.” This page is Epic’s public status board plus what we can
              actually see on this site: lobby MOTDs and the season countdown. It is not a fake ping
              map. If the board is green and only you cannot matchmake, that is usually your network
              — not a global outage we can invent dots for.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href="https://status.epicgames.com/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                status.epicgames.com
              </a>
              {' · '}
              <Link href="/news" className="text-primary hover:underline">
                Lobby news
              </Link>
              {' · '}
              <Link href="/season-countdown" className="text-primary hover:underline">
                Countdown
              </Link>
              {' · '}
              <Link href="/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping" className="text-primary hover:underline">
                Packet loss / ping
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <section className={`rounded-xl border bg-card p-5 ring-1 ring-black/5 ${tone.border}`}>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Epic status board</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {tone.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {epic.ok
                ? epic.description ||
                  'Epic returned a status payload. Open the official board if you want their wording next to ours.'
                : epic.description}
            </p>
            {updated ? (
              <p className="mt-2 text-xs text-muted-foreground">Board last updated {updated}.</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fetching this JSON from our server failing is <strong className="text-foreground">not</strong>{' '}
              proof Fortnite is down. Open{' '}
              <a
                href="https://status.epicgames.com/"
                className="font-semibold text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Epic’s page
              </a>{' '}
              directly.
            </p>
          </section>

          <section className="rounded-xl border border-primary/40 bg-card p-5 ring-1 ring-primary/20">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Reset week</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Chapter 7 Season 4 downtime
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{countdownLine}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Lobby MOTD: “Reality Reboots August 20.” Our timestamp is{' '}
              {formatSeasonLongDate(nextSeasonStartDate())} UTC — same as the {CURRENT_SEASON.shortLabel}{' '}
              end we publish on the countdown. Downtime can move a few hours. Ranked LP usually
              resets at that boundary; confirm the ranked tab after you get in.
            </p>
            <div className="mt-5 grid gap-3">
              {STATUS_RESET_WEEK.map((row) => (
                <article key={row.title} className="rounded-lg border border-border bg-background/60 p-4">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm">
              <Link href="/season-countdown" className="font-semibold text-primary hover:underline">
                Live countdown
              </Link>
              {' · '}
              <Link href="/season" className="font-semibold text-primary hover:underline">
                Season hub
              </Link>
              {' · '}
              <Link href="/ranked" className="font-semibold text-primary hover:underline">
                Ranked reset
              </Link>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What this page is checking
            </h2>
            <div className="mt-5 grid gap-3">
              {STATUS_CHECKS.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Lobby news (MOTDs)
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Same tiles as the Fortnite lobby, via the public news endpoint. We highlight reboot /
              downtime wording when it is there. A collab skin ad is not a status flag.
            </p>
            {motds.length ? (
              <div className="mt-5 grid gap-3">
                {motds.map((m) => (
                  <article key={m.id} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-bold text-foreground">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                News payload was empty from this server. That is not downtime — open the{' '}
                <Link href="/news" className="font-semibold text-primary hover:underline">
                  news page
                </Link>{' '}
                or the in-game tab.
              </p>
            )}
            <p className="mt-3 text-sm">
              <Link href="/news" className="font-semibold text-primary hover:underline">
                Full lobby news
              </Link>
            </p>
          </section>

          {epic.ok && epic.components.length > 0 ? (
            <section>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Epic components
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Top-level rows from Epic’s status page (groups collapsed). Store vs Fortnite vs login
                can fail separately.
              </p>
              <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
                {epic.components.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-3 bg-card px-4 py-2.5 text-sm">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="shrink-0 capitalize text-muted-foreground">{c.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {epic.ok && epic.incidents.length > 0 ? (
            <section>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Open incidents Epic listed
              </h2>
              <div className="mt-4 space-y-3">
                {epic.incidents.map((i) => (
                  <article key={i.name} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-bold text-foreground">{i.name}</h3>
                    <p className="mt-1 text-sm capitalize text-muted-foreground">
                      {i.status}
                      {i.createdAt ? ` · ${formatEpicUpdated(i.createdAt)}` : ''}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : epic.ok ? (
            <p className="text-sm text-muted-foreground">
              Epic’s summary listed no open incidents in the payload we fetched.
            </p>
          ) : null}

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              You vs Epic
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-semibold">What you see</th>
                    <th className="px-3 py-2 font-semibold">Likely cause</th>
                  </tr>
                </thead>
                <tbody>
                  {YOU_VS_EPIC.map((row) => (
                    <tr key={row.symptom} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-medium text-foreground">{row.symptom}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.likely}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What we will not publish
            </h2>
            <div className="mt-5 grid gap-3">
              {WHAT_WE_DONT_SHOW.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              In-match stutter with a green Epic board is usually packet loss or a routing issue.
              That guide is for your connection, not for pretending we monitor every region’s ping.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {STATUS_FAQS.map((faq) => (
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
