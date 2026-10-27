import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapRotationClient } from '@/components/MapRotationClient'
import { MAP_ROTATION_FAQS, PAST_RELOAD_MAPS } from '@/lib/map-rotation-seo'
import { ROTATION_REVIEWED } from '@/lib/map-rotation'
import { CURRENT_SEASON } from '@/lib/season'

const SCHEDULE = [
  {
    slot: ':00 – :20',
    map: 'Nitemare Island',
    theme: 'Fortnitemares / Kado’s Curse — Terror Turrets, The Hunt',
  },
  {
    slot: ':20 – :40',
    map: 'Squid Grounds',
    theme: 'Squid Game collab island — post Oct 15–19 takeover',
  },
  {
    slot: ':40 – :00',
    map: 'Stranger Things',
    theme: 'Hawkins crossover — shared Ranked / Unranked pool',
  },
]

export default function MapRotationPage() {
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
                'radial-gradient(ellipse 70% 55% at 15% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 0%, color-mix(in oklab, #38bdf8 14%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Map Rotation</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Live timer · reviewed {ROTATION_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Map Rotation</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              What Reload map is on right now, how many minutes until it changes, and which island is
              next. Reload rotates every <strong className="text-foreground">20 minutes</strong> —
              Nitemare Island, Squid Grounds, then Stranger Things (Ranked and Unranked share the
              pool after Epic’s v42.40 notes) — and this page tracks it live so you don&apos;t have
              to open the lobby to check. What Reload <em>is</em>, vs BR and Blitz, lives on the{' '}
              <Link href="/reload" className="text-primary hover:underline">
                Reload mode page
              </Link>
              .
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/reload" className="text-primary hover:underline">
                What is Reload
              </Link>
              {' · '}
              <Link href="/map-evolution" className="text-primary hover:underline">
                Map evolution
              </Link>
              {' · '}
              <Link href="/fortnite-map" className="text-primary hover:underline">
                Interactive BR map
              </Link>
              {' · '}
              <Link href="/codes" className="text-primary hover:underline">
                Creative codes
              </Link>
              {' · '}
              <Link href="/season-countdown" className="text-primary hover:underline">
                Season countdown
              </Link>
              {' · '}
              <Link href="/tools" className="text-primary hover:underline">
                All tools
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-12">
          <MapRotationClient />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Fortnite Reload map rotation times
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Reload slots are tied to minutes past the hour, so the schedule is identical in every
              region and timezone. If it is <strong className="text-foreground">:25</strong> where you
              are, Squid Grounds is live everywhere.
            </p>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Time slot
                    </th>
                    <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Map
                    </th>
                    <th scope="col" className="hidden px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:table-cell">
                      Theme
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((row) => (
                    <tr key={row.map} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold tabular-nums text-foreground">{row.slot}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{row.map}</td>
                      <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{row.theme}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Three maps × 20 minutes means a full cycle takes one hour and then repeats, 24/7. There
              is no daily reset and no regional offset. Epic announces the pool; exact slot order is
              community-aligned — trust the lobby if it disagrees.
            </p>
          </section>

          <section className="space-y-5 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Reload maps in the current rotation
            </h2>
            <div className="space-y-5 max-w-3xl">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Nitemare Island — live at :00
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Fortnitemares / Kado’s Curse island. Expect The Hunt match modifier, Terror Turrets,
                  and Nitemare-only Siphon weapons (Gatekeeper still drops here after the general
                  Reload vault). Best queue if you are chasing Map Mastery or Halloween loot.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Squid Grounds — live at :20
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Squid Game collab island. It ran alone for the Oct 15–19 exclusive weekend, then
                  returned to the normal three-map rotation with Nitemare Island and Stranger Things.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Stranger Things — live at :40
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Hawkins crossover Reload island. Epic briefly swapped it for Oasis earlier in
                  Fortnitemares, then put it back — it is in both Ranked and Unranked under the
                  current pool.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to play a specific Reload map
            </h2>
            <ol className="max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Check the timer above for the map you want and how long until it starts.</li>
              <li>
                Open Fortnite and go to <strong className="text-foreground">Discover → Reload</strong>{' '}
                (Solo, Duo, Trio, Squads, or Zero Build — Ranked uses the same map pool).
              </li>
              <li>
                Queue inside that map&apos;s 20-minute window. Matches started before a swap finish on
                the old island.
              </li>
              <li>
                If you queue in the last minute or two of a slot, you may load into the next map
                instead — leave a small buffer.
              </li>
            </ol>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Maps that could return to the rotation
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Epic swaps Reload islands in and out across patches. These were live recently (or
              earlier in Chapter 7) and may come back:
            </p>
            <ul className="max-w-3xl space-y-2 text-sm text-muted-foreground">
              {PAST_RELOAD_MAPS.map((m) => (
                <li key={m.name} className="rounded-lg border border-border bg-card px-4 py-2.5">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  {' — '}
                  {m.note}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Fortnite Blitz map rotation
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Blitz Royale is the 32-player, no-build, fast-storm mode. It uses the same one-map-at-a-
              time idea as Reload, but with a shorter{' '}
              <strong className="text-foreground">10-minute</strong> slot when more than one island
              is enabled. Right now Blitz is running a single map, so the Blitz tab above shows the
              live island without a switch countdown. Past Blitz islands include Starfall Island and
              Stark Island.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Why Fortnite rotates maps instead of letting you pick
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Reload and Blitz islands are much smaller than the Battle Royale map, and both modes
              rely on quick re-queues. If every island were selectable at once, the player base would
              split across playlists and queue times would climb — especially in smaller regions and
              off-peak hours. A timed rotation keeps a single healthy queue while still cycling
              favourites like Nitemare Island and Squid Grounds through every hour.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {MAP_ROTATION_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              More Fortnite tools
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              <li className="rounded-lg border border-border bg-card px-4 py-3">
                <Link href="/fortnite-map" className="font-semibold text-primary hover:underline">
                  Interactive Fortnite map
                </Link>
                <p className="mt-1 text-muted-foreground">
                  Live {CURRENT_SEASON.label} POIs, loot ratings, chests, and Extraction Sites.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-card px-4 py-3">
                <Link href="/tools/zone-timer" className="font-semibold text-primary hover:underline">
                  Zone timer
                </Link>
                <p className="mt-1 text-muted-foreground">
                  Storm wait and shrink timings so you know when to rotate.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-card px-4 py-3">
                <Link href="/codes" className="font-semibold text-primary hover:underline">
                  Creative map codes
                </Link>
                <p className="mt-1 text-muted-foreground">
                  XP maps, box fights, 1v1s, deathruns, and tycoons.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-card px-4 py-3">
                <Link href="/season-countdown" className="font-semibold text-primary hover:underline">
                  Season countdown
                </Link>
                <p className="mt-1 text-muted-foreground">
                  Live countdown to the end of {CURRENT_SEASON.label}.
                </p>
              </li>
            </ul>
          </section>

          <p className="border-t border-border pt-8 text-xs text-muted-foreground">
            Pool based on Epic Reload v42.40 community notes (Nitemare Island, Squid Grounds, Stranger
            Things for Ranked + Unranked after 19 Oct 2026). Clock slots are community-aligned — Epic
            does not publish a public rotation API. Not affiliated with Epic Games. If the in-game
            lobby disagrees with this page, trust the lobby.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
