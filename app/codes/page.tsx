import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CreativeCodesClient } from '@/components/CreativeCodesClient'
import {
  CREATIVE_MAPS,
  uniqueMapsByCode,
  type CreativeMapLive,
} from '@/lib/creative-codes'
import { CREATIVE_CODES_FAQS, CREATIVE_CODES_SEO_SECTIONS } from '@/lib/creative-codes-seo'
import { fetchIslandMetricsBatch } from '@/lib/fortnite-ecosystem'

export const revalidate = 1800

export default async function CodesPage() {
  const unique = uniqueMapsByCode(CREATIVE_MAPS)
  // Prefer live metrics for featured / high-XP maps to keep TTFB reasonable
  const metricCodes = unique
    .filter((m) => m.featured || m.xpRating >= 4 || m.genre === 'horror' || m.genre === '1v1')
    .map((m) => m.code)
  const metrics = await fetchIslandMetricsBatch(metricCodes).catch(() => new Map())

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

  const featured = maps.filter((m) => m.featured)

  const totalCodes = unique.length
  const withLive = unique.filter((m) => metrics.has(m.code)).length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Creative Codes</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Map Codes</span>
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Searchable Creative island database — XP maps, horror, 1v1, tycoon, escape rooms, deathruns, and more.
              Copy a code, paste it in Discover, and play. Live unique-player metrics refresh when Epic&apos;s public
              ecosystem API is available.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong className="text-foreground">{totalCodes}</strong> unique codes curated
              {withLive > 0 ? (
                <>
                  {' '}
                  · <strong className="text-foreground">{withLive}</strong> with live metrics
                </>
              ) : null}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
          {/* Static featured block for crawlers */}
          <section aria-labelledby="featured-codes" className="space-y-4">
            <h2
              id="featured-codes"
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              Featured Fortnite Creative codes
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Quick picks for the searches people type every day: XP map codes, horror map codes, 1v1 map codes, and
              tycoon codes. Full searchable grid is below.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {featured.map((m) => (
                <li key={m.id} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">{m.name}</p>
                  <p className="mt-1 font-mono text-sm font-semibold tracking-wider text-primary">{m.code}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {m.genre} · {m.players} players · XP rating {m.xpRating}/5
                    {typeof m.liveUniquePlayers === 'number'
                      ? ` · ${m.liveUniquePlayers.toLocaleString()} unique players recently`
                      : ''}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="database-heading" className="space-y-4">
            <h2
              id="database-heading"
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              Search the Creative map database
            </h2>
            <CreativeCodesClient maps={maps} />
          </section>

          {CREATIVE_CODES_SEO_SECTIONS.map((section) => (
            <section key={section.heading} className="space-y-3 border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {section.heading}
              </h2>
              {section.body.map((para) => (
                <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {CREATIVE_CODES_FAQS.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                  <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Related tools
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
              Track Battle Pass progress with the{' '}
              <Link href="/tools/battle-pass-xp-calculator" className="text-primary hover:underline">
                XP calculator
              </Link>
              , browse the{' '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              , or open the{' '}
              <Link href="/tools" className="text-primary hover:underline">
                full tools hub
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
