import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ReloadNowCard } from '@/components/ReloadNowCard'
import {
  MODE_COMPARE,
  RELOAD_FAQS,
  RELOAD_ISLAND_PLAY,
  RELOAD_REVIEWED,
  RELOAD_VS_BR_LOOT,
  RELOAD_WHY,
  RELOAD_XP,
} from '@/lib/reload-hub'
import { CURRENT_SEASON } from '@/lib/season'
import { formatCompact, loadPlayerCountData } from '@/lib/player-count'
import { PAST_RELOAD_MAPS } from '@/lib/map-rotation-seo'

export const revalidate = 600

export default async function ReloadPage() {
  const counts = await loadPlayerCountData().catch(() => null)
  const reloadCcu = counts?.epicRows.find((r) => r.code === 'experience_reload')

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
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Reload</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · last reviewed {RELOAD_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Reload</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Respawn Battle Royale on a small island that changes every 20 minutes. This is the mode
              page — what Reload is, how it differs from BR and Blitz, and which island to queue for.
              The live clock is the{' '}
              <Link href="/map-rotation" className="text-primary hover:underline">
                map rotation timer
              </Link>
              . Do not treat Oasis as Shattered Coast.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/map-rotation" className="text-primary hover:underline">
                Rotation timer
              </Link>
              {' · '}
              <Link href="/modes" className="text-primary hover:underline">
                All playlists
              </Link>
              {' · '}
              <Link href="/player-count" className="text-primary hover:underline">
                Player count
              </Link>
              {' · '}
              <Link href="/ranked" className="text-primary hover:underline">
                Ranked
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <ReloadNowCard />

          {reloadCcu?.peakCcu ? (
            <p className="text-sm text-muted-foreground">
              Epic’s public Data API recorded a peak of{' '}
              <strong className="text-foreground">{formatCompact(reloadCcu.peakCcu)}</strong> concurrent
              Reload players on the latest reported day — not “online right now,” and not BR. Full
              table on the player-count page.
            </p>
          ) : null}

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What Reload actually is
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              In the files the mode is BlastBerry. In the lobby it is Discover → Reload. You land,
              you die, you come back until the match is actually over. That sounds like Team Rumble.
              It is not: storm still closes, there is still a winner, and the late game is a real
              BR endgame on a tiny island. Early deaths are practice. Late deaths are the game.
            </p>
            <div className="mt-5 grid gap-3">
              {RELOAD_WHY.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Reload vs BR vs Blitz vs OG
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              People search these as if they were skins of the same mode. They are not. If you queued
              the wrong tile, no drop guide on this site will save the game.
            </p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Mode</th>
                    <th className="px-3 py-2 font-semibold">Respawn</th>
                    <th className="px-3 py-2 font-semibold">Island</th>
                    <th className="px-3 py-2 font-semibold">Queue when</th>
                  </tr>
                </thead>
                <tbody>
                  {MODE_COMPARE.map((row) => (
                    <tr key={row.mode} className="border-t border-border align-top">
                      <td className="px-3 py-2">
                        <Link href={row.href} className="font-semibold text-primary hover:underline">
                          {row.mode}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">{row.players}</p>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{row.respawn}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.island}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.pickWhen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {RELOAD_VS_BR_LOOT.body}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Current islands — how to play them
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Slots are minutes past the hour, same worldwide. The rotation page has the countdown;
              these notes are for the 18 minutes you are actually in the match.
            </p>
            <div className="mt-5 space-y-4">
              {RELOAD_ISLAND_PLAY.map((island) => (
                <article key={island.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                      {island.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {island.slot}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{island.play}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Skip: </span>
                    {island.skip}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              {RELOAD_XP.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{RELOAD_XP.body}</p>
            <p className="mt-3 text-sm">
              <Link href="/xp-calculator" className="font-semibold text-primary hover:underline">
                XP calculator
              </Link>
              {' · '}
              <Link href="/codes" className="font-semibold text-primary hover:underline">
                Creative XP codes
              </Link>
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Ranked Reload
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              When the Habanero Reload queue is in Discover, you are playing LP on these small
              islands — not on Heatwave Harbor. The Shattered Coast drop pages do not apply. Respawn
              still makes early deaths cheap; ranked still punishes throwing the late game for a clip.
              How LP is counted is the{' '}
              <Link href="/ranked" className="font-semibold text-primary hover:underline">
                ranked hub
              </Link>
              , not a second copy of that math here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to queue a specific map
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Open the{' '}
                <Link href="/map-rotation" className="font-semibold text-primary hover:underline">
                  rotation timer
                </Link>{' '}
                and wait until the island you want is live (or about to be — leave a buffer).
              </li>
              <li>In Fortnite: Discover → Reload (Solo / Duo / Trio / Squads / Zero Build as offered).</li>
              <li>
                Do not queue in the last minute of a slot if you care which island you get. A match
                that starts on Slurp Rush finishes on Slurp Rush even if Springfield is now “live”
                in the lobby.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Maps that used to be in the pool
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Reload is not a permanent three-map product. Venture (Chapter 1 Tilted / Pleasant /
              Retail) was the original island and is currently the Blitz map, not a Reload slot.
              Elite Stronghold, Squid Grounds, Surf City, and Nitemare Island have rotated through
              and can return. The timer page lists them; this page will not pretend they are live
              tonight. If the lobby shows a fourth island, trust the lobby and the clock — we update
              the pool when the files / community timers agree.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {PAST_RELOAD_MAPS.map((m) => (
                <li key={m.name} className="rounded-lg border border-border bg-card px-3 py-2">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  <span> — {m.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {RELOAD_FAQS.map((faq) => (
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
