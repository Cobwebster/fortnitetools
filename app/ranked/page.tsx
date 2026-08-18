import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  LAST_NIGHT,
  LP_RULES,
  RANKED_DROPS,
  RANKED_FAQS,
  RANKED_NOT,
  RANKED_QUEUES,
  RANKED_RESET,
  RANKED_REVIEWED,
  RANKED_VS_GUIDE,
  RANK_TIERS,
} from '@/lib/ranked-hub'
import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate } from '@/lib/season'
import { fetchPlaylists } from '@/lib/fortnite-playlists'
import { CONTEST_COLOR, dropMapFocus, loadMapPois } from '@/lib/drop-map'
import { MapPoiCrop } from '@/components/MapPoiCrop'

export const revalidate = 3600

export default async function RankedPage() {
  const [playlists, pois] = await Promise.all([
    fetchPlaylists().catch(() => []),
    loadMapPois(),
  ])
  const habanero = playlists
    .filter((p) => p.category === 'ranked')
    .sort((a, b) => a.maxTeamSize - b.maxTeamSize || a.name.localeCompare(b.name))
    .slice(0, 12)
  const habaneroWithArt = habanero.filter((p) => p.image)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CURRENT_SEASON.mapImage}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Ranked</span>
            </nav>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="relative mx-auto w-36 shrink-0 sm:mx-0 sm:w-44">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg ring-1 ring-primary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CURRENT_SEASON.mapImage}
                    alt={`${CURRENT_SEASON.label} Shattered Coast — ranked is this island until the reboot`}
                    className="aspect-square w-full object-cover"
                    width={176}
                    height={176}
                  />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/crown.png"
                  alt=""
                  className="absolute -bottom-3 -right-3 h-14 w-14 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} ladder · last reviewed {RANKED_REVIEWED}
                </p>
                <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
                  Fortnite <span className="text-primary">Ranked</span>
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  League Points, the Season 4 reset date, and which Shattered Coast drops still make
                  sense while Chapter 7 Season 3 is live. “Fortnite ranked reset” and “how ranked works”
                  are not the same question as{' '}
                  <Link href="/modes" className="text-primary hover:underline">
                    every playlist in the files
                  </Link>
                  . The long climb article is linked below — this page is the season-boundary sheet.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <Link href="/guides/how-to/fortnite-ranked-mode-guide" className="text-primary hover:underline">
                    Climb guide (Bronze → Unreal)
                  </Link>
                  {' · '}
                  <Link href="/drops" className="text-primary hover:underline">
                    Drop pages
                  </Link>
                  {' · '}
                  <Link href="/season" className="text-primary hover:underline">
                    Season hub
                  </Link>
                  {' · '}
                  <Link href="/reload" className="text-primary hover:underline">
                    Ranked Reload
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <section className="overflow-hidden rounded-xl border border-primary/40 bg-card ring-1 ring-primary/20">
            <div className="relative h-36 sm:h-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CURRENT_SEASON.mapImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/30" />
              <div className="relative z-10 flex h-full items-end p-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Reset week</p>
                  <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                    {RANKED_RESET.title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-5 pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground">{RANKED_RESET.live}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{RANKED_RESET.incoming}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{RANKED_RESET.after}</p>
              <p className="text-sm">
                <Link href="/season-countdown" className="font-semibold text-primary hover:underline">
                  Season countdown
                </Link>
                {' · '}
                <Link href="/status" className="font-semibold text-primary hover:underline">
                  Is Fortnite down / reboot queue
                </Link>
                {' · '}
                scheduled {formatSeasonLongDate(nextSeasonStartDate())} UTC
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              This page vs the climb guide vs /modes
            </h2>
            <div className="mt-5 grid gap-3">
              <article className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground">/ranked (you are here)</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{RANKED_VS_GUIDE.thisPage}</p>
              </article>
              <article className="flex gap-4 rounded-xl border border-border bg-card p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/map-evolution/35-20.webp"
                  alt="Chapter 3 map used as the climb-guide thumbnail"
                  className="h-20 w-20 shrink-0 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    <Link href="/guides/how-to/fortnite-ranked-mode-guide" className="text-primary hover:underline">
                      How to climb (June 28, 2026)
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{RANKED_VS_GUIDE.longGuide}</p>
                </div>
              </article>
              <article className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground">
                  <Link href="/modes" className="text-primary hover:underline">
                    Game modes catalog
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{RANKED_VS_GUIDE.modes}</p>
              </article>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How LP actually pays
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ranked is a Habanero playlist on the same Shattered Coast island as pubs, with a
              different lobby and a different incentive. The client still shows Bronze I through
              Unreal. We will not invent a new Season 4 point formula before the reboot — S3 math
              below is what the live tab is counting tonight.
            </p>
            <div className="mt-5 grid gap-3">
              {LP_RULES.map((row) => (
                <article key={row.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.image}
                    alt=""
                    className="h-14 w-14 shrink-0 object-contain drop-shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If your tracker K/D looks godlike and Diamond feels impossible, you are probably dying
              20th with kills. Open the{' '}
              <Link href="/tools/player-stats" className="font-semibold text-primary hover:underline">
                stats tracker
              </Link>
              , then read the climb guide’s Gold–Diamond section instead of swapping shotguns.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Tiers — what each band is for
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Divisions are I–III inside Bronze through Diamond. Elite / Champion / Unreal sit above
              that. Thresholds move by season and region — trust the in-game ladder, not a screenshot
              from Chapter 6.
            </p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Band</th>
                    <th className="px-3 py-2 font-semibold">What it actually tests</th>
                  </tr>
                </thead>
                <tbody>
                  {RANK_TIERS.map((row) => (
                    <tr key={row.tier} className="border-t border-border align-top">
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/images/icons/crown.png" alt="" className="h-5 w-5 object-contain" />
                          {row.tier}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Which ranked queue you queued
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {RANKED_QUEUES.map((row) => (
                <article key={row.name} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative h-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={row.image} alt={row.alt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    {'badge' in row && row.badge ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.badge}
                        alt=""
                        className="absolute bottom-2 right-2 h-10 w-10 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground">{row.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                  </div>
                </article>
              ))}
            </div>
            {habanero.length > 0 ? (
              <div className="mt-5 rounded-xl border border-border bg-muted/30 p-5">
                <h3 className="text-sm font-bold text-foreground">Habanero rows in current files</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Playlist catalog, not live matchmaking health. Names in the files are often just
                  “Solo” — we prefix Ranked. Cross-check Discover tonight. Thumbs are Epic’s
                  showcase art when the files have one.
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {habanero.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src="/images/icons/crown.png"
                          alt=""
                          className="h-10 w-10 shrink-0 object-contain"
                        />
                      )}
                      <span>
                        <span className="font-semibold text-foreground">{p.name}</span>
                        {p.subName ? ` · ${p.subName}` : ''} · {p.maxTeamSize}s
                      </span>
                    </li>
                  ))}
                </ul>
                {habaneroWithArt.length === 0 ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    No showcase images on the Habanero rows we pulled this hour — Discover still wins.
                  </p>
                ) : null}
                <p className="mt-3 text-sm">
                  <Link href="/modes" className="font-semibold text-primary hover:underline">
                    Full modes catalog
                  </Link>
                </p>
              </div>
            ) : null}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Where to drop in ranked (C7S3)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Crops of the live Shattered Coast minimap, focused on each named POI. Ranked is not
              pubs with a badge: Heatwave Harbor’s chest density is still real, and so is the 50/50.
              After the S4 island flip, treat the names as stale until we rewrite them — we will not
              invent Season 4 POIs the night before the reboot.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {RANKED_DROPS.map((row) => {
                const focus = dropMapFocus(row.slug, row.name, pois)
                return (
                  <Link
                    key={row.slug}
                    href={row.href}
                    className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
                  >
                    <div className="relative">
                      <MapPoiCrop focus={focus} alt={`${row.name} on the live Shattered Coast map`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <p className="absolute bottom-2 left-3 font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-primary">
                        {row.name}
                      </p>
                      <span
                        className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
                        style={{ background: CONTEST_COLOR[row.contest] || '#888' }}
                      >
                        {row.contest}
                      </span>
                    </div>
                    <p className="p-4 text-sm leading-relaxed text-muted-foreground">{row.ranked}</p>
                  </Link>
                )
              })}
            </div>
            <p className="mt-3 text-sm">
              <Link href="/fortnite-map" className="font-semibold text-primary hover:underline">
                Full Shattered Coast map
              </Link>
              {' · '}
              <Link href="/drops" className="font-semibold text-primary hover:underline">
                All five drop guides
              </Link>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Last night of the season
            </h2>
            <div className="mt-5 grid gap-3">
              {LAST_NIGHT.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What ranked is not
            </h2>
            <div className="mt-5 grid gap-3">
              {RANKED_NOT.map((row) => (
                <article key={row.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            {RANKED_FAQS.map((faq) => (
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
