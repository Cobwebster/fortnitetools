import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CreativeCodesClient } from '@/components/CreativeCodesClient'
import { CREATIVE_MAPS, uniqueMapsByCode, type CreativeMapLive } from '@/lib/creative-codes'
import { CREATIVE_CODES_FAQS } from '@/lib/creative-codes-seo'
import { fetchIslandMetricsBatch } from '@/lib/fortnite-ecosystem'

export const revalidate = 1800

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Map Codes</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Map Codes</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Copy a code, paste it in Discover. These islands still load on Epic&apos;s public API — thumbnails are
              the same Discover art you see in-game. Defaults to XP maps.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {unique.length} islands ·{' '}
              <Link href="/guides/season/best-fortnite-xp-maps" className="text-primary hover:underline">
                XP leveling guide
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <CreativeCodesClient maps={maps} initialGenre="xp" />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to use a code
            </h2>
            <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Open Fortnite → Discover → search icon.</li>
              <li>Paste the 12-digit code (keep the dashes).</li>
              <li>Select the island → Play. Private match if you&apos;re XP farming.</li>
            </ol>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
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
