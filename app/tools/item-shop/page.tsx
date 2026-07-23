import Link from 'next/link'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ItemShopClient } from '@/components/ItemShopClient'
import { fetchShop } from '@/lib/fortnite-api'
import { ITEM_SHOP_FAQS } from '@/lib/item-shop-seo'

export const revalidate = 300

export default async function ItemShopPage() {
  const shop = await fetchShop().catch(() => null)
  const offerCount = shop?.offers.length ?? 0
  const shopDate = shop?.date
    ? new Date(shop.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null

  const outfitCount = shop
    ? shop.offers.reduce(
        (n, o) => n + o.items.filter((i) => i.typeValue === 'outfit').length,
        0
      )
    : 0
  const emoteCount = shop
    ? shop.offers.reduce(
        (n, o) => n + o.items.filter((i) => i.typeValue === 'emote').length,
        0
      )
    : 0

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
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Item Shop</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Item Shop</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The free Fortnite cosmetic browser for today&apos;s shop, full outfit sets, emote dance videos, style
              variants, and every skin in the catalog — including newly added and incoming items.
            </p>
            {(offerCount > 0 || shopDate) && (
              <p className="mt-4 text-sm text-muted-foreground">
                {shopDate && (
                  <>
                    Current rotation: <span className="text-foreground font-medium">{shopDate}</span> (UTC)
                  </>
                )}
                {offerCount > 0 && (
                  <>
                    {shopDate ? ' · ' : ''}
                    <span className="text-foreground font-medium">{offerCount}</span> offers
                    {outfitCount > 0 && (
                      <>
                        {' '}
                        · <span className="text-foreground font-medium">{outfitCount}</span> outfits
                      </>
                    )}
                    {emoteCount > 0 && (
                      <>
                        {' '}
                        · <span className="text-foreground font-medium">{emoteCount}</span> emotes
                      </>
                    )}
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading shop…</p>}>
            <ItemShopClient />
          </Suspense>

          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Why use this Item Shop viewer
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-8">
              Most shop trackers only show today&apos;s tiles. FortniteTools is built as a full cosmetic browser: click any
              outfit, emote, pickaxe, or wrap to open the complete API record — set members, V-Bucks price when available,
              styles, tags, and official dance previews.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Today&apos;s live shop</h3>
                <p>
                  See the current Fortnite Item Shop with prices, leave times, sale discounts, giftable/refundable flags,
                  and bundle contents — refreshed from Fortnite-API throughout the day.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Full outfit sets</h3>
                <p>
                  Open an outfit like Solid Snake and jump through every related cosmetic in the set: back bling, pickaxe,
                  glider, wrap, loading screen, and emote — not just the featured skin.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Emote &amp; dance videos</h3>
                <p>
                  Emotes tagged with a showcase video embed the official animation so you can preview the dance before
                  spending V-Bucks.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Styles &amp; variants</h3>
                <p>
                  Progressive styles, alternate edits, and variant images from the cosmetic API appear in the detail panel
                  when Epic ships them.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">New &amp; incoming</h3>
                <p>
                  Browse cosmetics freshly added to the game files. Useful for early looks — not an official Epic release
                  calendar.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Catalog search</h3>
                <p>
                  Search thousands of BR cosmetics by name, type (outfits, emotes, kicks, wraps…), and rarity — including
                  items not currently for sale.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              How to browse Fortnite cosmetics
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              <li>
                Start on <strong className="text-foreground">Today&apos;s Shop</strong> to see what is live right now, or
                switch to <strong className="text-foreground">Browse Catalog</strong> to search any skin or emote.
              </li>
              <li>
                Click a tile to open the detail drawer. Shareable links look like{' '}
                <code className="text-xs text-foreground">/tools/item-shop?id=…</code>.
              </li>
              <li>
                From an outfit, use the set grid to open matching cosmetics. From an emote with a Video badge, watch the
                dance preview.
              </li>
              <li>
                Check V-Bucks price, leave time, and giftable status when the item is in today&apos;s shop — then plan packs
                with the{' '}
                <Link href="/tools/vbucks-calculator" className="text-primary hover:underline">
                  V-Bucks calculator
                </Link>
                .
              </li>
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-5 max-w-3xl">
              {ITEM_SHOP_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">
              Related Fortnite tools
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/vbucks-calculator" className="text-primary hover:underline">
                  V-Bucks calculator
                </Link>
              </li>
              <li>
                <Link href="/fortnite-map" className="text-primary hover:underline">
                  Interactive map
                </Link>
              </li>
              <li>
                <Link href="/guides/weapons/fortnite-best-weapons-tier-list-2026" className="text-primary hover:underline">
                  Weapons tier list
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-primary hover:underline">
                  All tools
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
