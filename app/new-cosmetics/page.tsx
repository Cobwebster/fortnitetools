import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewCosmeticsClient } from '@/components/NewCosmeticsClient'
import { fetchNewCosmetics } from '@/lib/fortnite-api'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 600

const faqs = [
  {
    question: 'What counts as a “new” Fortnite cosmetic?',
    answer:
      'Anything Fortnite-API lists on /v2/cosmetics/new for the current game build — outfits, emotes, jam tracks, cars, and more. It is not the same as “in the Item Shop tonight.”',
  },
  {
    question: 'Can I buy these from this page?',
    answer:
      'No. Open a tile for details and shop history. If it is in today’s rotation, the Item Shop tracker shows the V-Bucks price.',
  },
  {
    question: 'Why is a leaked item here before it is in the shop?',
    answer:
      'Epic often ships cosmetics in a pak before they go on sale. New ≠ purchasable. Treat unreleased rows as files, not a store listing.',
  },
]

export default async function NewCosmeticsPage() {
  const data = await fetchNewCosmetics().catch(() => ({
    build: undefined as string | undefined,
    lastAdditions: {} as Record<string, string>,
    byType: {},
    all: [],
  }))

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
              <span className="text-foreground">New Cosmetics</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Current build
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              New Fortnite <span className="text-primary">Cosmetics</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {data.all.length} items added in this game build. Click a tile for set, rarity, and shop history.
              Tonight&apos;s prices stay on the Item Shop tracker.
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
              <Link href="/free-cosmetics" className="text-primary hover:underline">
                Free cosmetics
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <NewCosmeticsClient
            items={data.all}
            build={data.build}
            lastAddition={data.lastAdditions?.br || data.lastAdditions?.all}
          />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="max-w-3xl space-y-4">
              {faqs.map((faq) => (
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
