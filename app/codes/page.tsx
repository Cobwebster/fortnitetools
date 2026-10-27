import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CommunitySubmitCta } from '@/components/community-submit-cta'
import { CreativeCodesClient } from '@/components/CreativeCodesClient'
import { CREATIVE_MAPS, genreLabel, uniqueMapsByCode, type CreativeMapLive, type CreativeGenre } from '@/lib/creative-codes'
import {
  CREATIVE_CODES_FAQS,
  CREATIVE_CODES_GENRE_GUIDES,
  CREATIVE_CODES_LINKS,
  CREATIVE_CODES_PLAYBOOK,
  CREATIVE_CODES_REVIEWED,
} from '@/lib/creative-codes-seo'
import { fetchIslandMetricsBatch } from '@/lib/fortnite-ecosystem'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 86400

export default async function CodesPage() {
  const unique = uniqueMapsByCode(CREATIVE_MAPS)
  const metrics = await fetchIslandMetricsBatch(unique.map((m) => m.code)).catch(() => new Map())

  const maps: CreativeMapLive[] = unique.map((m) => {
    const live = metrics.get(m.code)
    return {
      ...m,
      liveUniquePlayers: live?.uniquePlayers ?? null,
      livePlays: live?.plays ?? null,
      livePeakCcu: live?.peakCcu ?? null,
      liveTitle: live?.title ?? null,
      creator: m.creator || live?.creatorCode || m.creator,
    }
  })

  const genreCount = unique.reduce<Record<string, number>>((acc, m) => {
    acc[m.genre] = (acc[m.genre] || 0) + 1
    return acc
  }, {})

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
                'radial-gradient(ellipse 70% 55% at 12% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 0%, color-mix(in oklab, #38bdf8 12%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="transition-colors hover:text-primary">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Map Codes</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.codename} · updated {CREATIVE_CODES_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Map Codes</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Working Creative / UEFN island codes for Override — XP farms, 1v1 warmups, Zone Wars,
              horror, deathruns, and viral tycoons. Copy a code, paste it in Discover. We only keep
              islands that still resolve on Epic&apos;s public API.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{unique.length}</strong> islands ·{' '}
              {Object.entries(genreCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([g, n]) => `${n} ${genreLabel(g as CreativeGenre)}`)
                .join(' · ')}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {CREATIVE_CODES_LINKS.map((link, i) => (
                <span key={link.href} className="inline-flex items-center gap-3">
                  {i > 0 ? <span className="text-border" aria-hidden="true">·</span> : null}
                  <Link href={link.href} className="text-primary hover:underline">
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section aria-labelledby="codes-playbook-heading">
            <h2
              id="codes-playbook-heading"
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              How to use this list
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Creative is still the fastest Battle Pass filler in {CURRENT_SEASON.codename} — until
              the daily cap hits. Pair farms with BR weeklies and the season countdown so you finish
              before {CURRENT_SEASON.codename} ends.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CREATIVE_CODES_PLAYBOOK.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card px-4 py-4">
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="codes-genres-heading">
            <h2
              id="codes-genres-heading"
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              What each genre is for
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Filters below match these buckets. XP Maps default on load; switch to 1v1 or Zone Wars
              when you are warming up, not grinding levels.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CREATIVE_CODES_GENRE_GUIDES.map((g) => (
                <div key={g.id} className="rounded-xl border border-border bg-card/80 px-4 py-3">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary">{g.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
                </div>
              ))}
            </div>
          </section>

          <CreativeCodesClient maps={maps} initialGenre="xp" />

          <div className="mt-10 space-y-4">
            <CommunitySubmitCta
              href="/upload/xp_map"
              title="Submit an XP map code"
              body="Found a Creative island that still awards Override XP? Post the code — players browse submissions on /upload."
            />
            <CommunitySubmitCta
              href="/upload/map_code"
              title="Submit a practice / 1v1 / Zone Wars code"
              body="Warmup and piece-control maps welcome. Island name + notes help the feed stay useful."
            />
          </div>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to enter a Creative code
            </h2>
            <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Launch Fortnite and open the <strong className="text-foreground">Discover</strong> tab.</li>
              <li>Tap the <strong className="text-foreground">search</strong> icon (not the V-Bucks redeem page).</li>
              <li>
                Paste the 12-digit code with dashes (
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">XXXX-XXXX-XXXX</code>
                ).
              </li>
              <li>Select the matching island → <strong className="text-foreground">Play</strong>.</li>
              <li>
                For XP farms, set the lobby to <strong className="text-foreground">Private</strong> so
                randoms cannot reset your setup.
              </li>
            </ol>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Island codes are not the same as Item Shop creator support codes or Override{' '}
              <Link href="/lobby-hacks" className="text-primary hover:underline">
                Admin Panel Lobby Hacks
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Creative XP vs Battle Pass XP
            </h2>
            <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Creative / UEFN maps can dump large chunks of Battle Pass XP quickly, but Epic
                calibrates a <strong className="text-foreground">daily Creative cap</strong> and a
                larger weekly allowance. After the bar stops moving on FortM or a tycoon, you are
                capped — more AFK will not help until reset.
              </p>
              <p>
                A practical Override evening: clear BR daily / weekly quests first, hit Creative until
                the cap, then redeem any live Admin Panel XP codes. Project the rest of the season
                with the{' '}
                <Link href="/xp-calculator" className="text-primary hover:underline">
                  XP calculator
                </Link>{' '}
                and the{' '}
                <Link href="/guides/season/fortnite-override-battle-pass-guide" className="text-primary hover:underline">
                  Override Battle Pass guide
                </Link>
                .
              </p>
              <p>
                Want live traffic, not just a curated list?{' '}
                <Link href="/player-count" className="text-primary hover:underline">
                  Player count
                </Link>{' '}
                ranks Creative islands by peak concurrent players.
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {CREATIVE_CODES_FAQS.map((faq) => (
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
