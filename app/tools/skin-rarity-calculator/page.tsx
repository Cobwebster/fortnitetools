import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SkinRarityClient } from '@/components/SkinRarityClient'
import { SkinRarityReportPanel } from '@/components/skin-rarity-report'
import {
  RARE_SKIN_EXAMPLES,
  SKIN_RARITY_SEO_SECTIONS,
  STATIC_EXAMPLE_ITEM,
  STATIC_EXAMPLE_REPORT,
} from '@/lib/skin-rarity-seo'

export default function SkinRarityCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Skin Rarity</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Skin <span className="text-primary">Rarity Calculator</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Free Fortnite rare skins checker — search any outfit for shop appearances, vault time, Battle Pass
              exclusives, and a scarcity score. Color tiers (Rare / Epic / Legendary) are not the same as
              collectibility.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
          {/* Static example always in HTML for crawlers — above the fold */}
          <section aria-labelledby="example-heading" className="space-y-3">
            <div>
              <h2
                id="example-heading"
                className="font-display text-xl font-bold uppercase tracking-wide text-foreground"
              >
                Example: How rare is Black Knight?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                Black Knight is one of the most-searched rare Fortnite skins. It unlocked from the Chapter 1 Season 2
                Battle Pass, sits at Legendary shop-color rarity, and has never been sold as a normal Item Shop outfit —
                scarcity score <strong className="text-foreground">{STATIC_EXAMPLE_REPORT.score}/100</strong> (
                {STATIC_EXAMPLE_REPORT.label}).
              </p>
            </div>
            <SkinRarityReportPanel
              item={STATIC_EXAMPLE_ITEM}
              report={STATIC_EXAMPLE_REPORT}
              eyebrow="Static example · crawlable without JavaScript"
            />
          </section>

          <section aria-labelledby="try-heading" className="space-y-3">
            <h2
              id="try-heading"
              className="font-display text-xl font-bold uppercase tracking-wide text-foreground"
            >
              Check any Fortnite skin
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Search another outfit for live shop history and a scarcity score. Results update below after you search.
            </p>
            <SkinRarityClient />
          </section>

          <section aria-labelledby="famous-heading" className="space-y-4">
            <h2
              id="famous-heading"
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              Famous rare Fortnite skins people search for
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              These names show up constantly in “rare skins” searches. Use the calculator above to pull live shop history —
              the notes below are a quick static guide.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {RARE_SKIN_EXAMPLES.map((skin) => (
                <li key={skin.name} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">{skin.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{skin.scarcity}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{skin.note}</p>
                </li>
              ))}
            </ul>
          </section>

          {SKIN_RARITY_SEO_SECTIONS.map((section) => (
            <section key={section.heading} className="space-y-3 border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {section.heading}
              </h2>
              {section.body.map((para) => (
                <p key={para.slice(0, 48)} className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Related Fortnite tools
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
              Check{' '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                today&apos;s Item Shop
              </Link>
              , estimate pack cost with the{' '}
              <Link href="/tools/vbucks-calculator" className="text-primary hover:underline">
                V-Bucks calculator
              </Link>
              , or browse more free utilities on the{' '}
              <Link href="/tools" className="text-primary hover:underline">
                tools hub
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
