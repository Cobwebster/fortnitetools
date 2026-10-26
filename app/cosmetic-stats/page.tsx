import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CosmeticStatsClient } from '@/components/CosmeticStatsClient'
import { COSMETIC_STATS_FAQS, loadCosmeticStats } from '@/lib/cosmetic-stats'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 21_600

export default async function CosmeticStatsPage() {
  const data = await loadCosmeticStats().catch(() => null)

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
              <Link href="/tools/item-shop" className="transition-colors hover:text-primary">
                Item Shop
              </Link>
              <span>/</span>
              <span className="text-foreground">Cosmetic Stats</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Shop history boards
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Cosmetic Stats</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Outfit shop popularity from Fortnite-API history — most Item Shop appearances, longest
              vaults, recent returns, and what’s live tonight. This is rotation frequency, not how
              many players equip the skin in lobby.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/tools/skin-rarity-calculator" className="text-primary hover:underline">
                Skin rarity
              </Link>
              {' · '}
              <Link href="/new-cosmetics" className="text-primary hover:underline">
                New cosmetics
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          {data ? (
            <CosmeticStatsClient data={data} />
          ) : (
            <p className="rounded-xl border border-dashed border-border px-5 py-8 text-sm text-muted-foreground">
              Cosmetic catalog unavailable right now. Try the{' '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop tracker
              </Link>{' '}
              or refresh in a few minutes.
            </p>
          )}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            <dl className="space-y-4">
              {COSMETIC_STATS_FAQS.map((item) => (
                <div key={item.question} className="max-w-3xl">
                  <dt className="font-semibold text-foreground">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
