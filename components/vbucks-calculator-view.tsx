'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { ShoppingCart, TrendingUp, Info, Star } from 'lucide-react'
import { loadShopWishlist, type ShopWishlistItem } from '@/lib/shop-wishlist'
import { localizeHref, type AppLocale } from '@/i18n/config'

// Official Fortnite V-Bucks pack pricing (USD) as of 2026
const VBUCKS_PACKS = [
  { id: 'p1000', vbucks: 1000, price: 7.99, tag: '' as const },
  { id: 'p2800', vbucks: 2800, price: 19.99, tag: 'tagPopular' as const },
  { id: 'p5000', vbucks: 5000, price: 31.99, tag: '' as const },
  { id: 'p13500', vbucks: 13500, price: 79.99, tag: 'tagBestValue' as const },
]

// Common Fortnite Item Shop / pack prices (USD storefront examples, 2026)
const SHOP_ITEMS = [
  { id: 'battlePass', cost: 950, category: 'pass' },
  { id: 'crewPack', cost: 1800, category: 'pass' },
  { id: 'iconSeriesSkin', cost: 2000, category: 'skin' },
  { id: 'legendarySkin', cost: 2000, category: 'skin' },
  { id: 'epicSkin', cost: 1500, category: 'skin' },
  { id: 'rareSkin', cost: 1200, category: 'skin' },
  { id: 'uncommonSkin', cost: 800, category: 'skin' },
  { id: 'legendaryBackBling', cost: 400, category: 'cosmetic' },
  { id: 'epicPickaxe', cost: 1200, category: 'cosmetic' },
  { id: 'rarePickaxe', cost: 800, category: 'cosmetic' },
  { id: 'legendaryGlider', cost: 1500, category: 'cosmetic' },
  { id: 'epicWrap', cost: 500, category: 'cosmetic' },
  { id: 'legendaryEmote', cost: 500, category: 'emote' },
  { id: 'epicEmote', cost: 300, category: 'emote' },
  { id: 'uncommonEmote', cost: 200, category: 'emote' },
  { id: 'lobbyMusic', cost: 500, category: 'emote' },
  { id: 'loadingScreen', cost: 200, category: 'cosmetic' },
  { id: 'spray', cost: 300, category: 'cosmetic' },
]

function cheapestWayToBuy(needed: number): {
  packs: { pack: (typeof VBUCKS_PACKS)[0]; qty: number }[]
  total: number
  leftover: number
} {
  // True min-cost: try every pack combo up to a small qty cap
  type Combo = { qty: number[]; cost: number; vbucks: number }
  const state: { best: Combo | null } = { best: null }
  const caps = VBUCKS_PACKS.map((p) => Math.min(12, Math.ceil(needed / p.vbucks) + 2))

  function search(i: number, qty: number[], cost: number, vbucks: number) {
    if (vbucks >= needed) {
      const current = state.best
      if (!current || cost < current.cost || (cost === current.cost && vbucks < current.vbucks)) {
        state.best = { qty: [...qty], cost, vbucks }
      }
      return
    }
    if (i >= VBUCKS_PACKS.length) return
    for (let q = 0; q <= caps[i]; q++) {
      qty[i] = q
      const nextCost = cost + q * VBUCKS_PACKS[i].price
      const nextV = vbucks + q * VBUCKS_PACKS[i].vbucks
      if (state.best && nextCost >= state.best.cost) break
      search(i + 1, qty, nextCost, nextV)
    }
    qty[i] = 0
  }

  search(
    0,
    VBUCKS_PACKS.map(() => 0),
    0,
    0
  )

  if (!state.best) {
    const biggest = VBUCKS_PACKS[VBUCKS_PACKS.length - 1]
    const qty = Math.ceil(needed / biggest.vbucks)
    return {
      packs: [{ pack: biggest, qty }],
      total: biggest.price * qty,
      leftover: biggest.vbucks * qty - needed,
    }
  }

  const best = state.best
  const packs = best.qty.map((qty, i) => ({ pack: VBUCKS_PACKS[i], qty })).filter((r) => r.qty > 0)
  return { packs, total: best.cost, leftover: best.vbucks - needed }
}

function usdPerVBuck(pack: (typeof VBUCKS_PACKS)[0]) {
  return ((pack.price / pack.vbucks) * 100).toFixed(3)
}

const CATEGORY_IDS = ['pass', 'skin', 'cosmetic', 'emote'] as const

export function VBucksCalculatorView() {
  const t = useTranslations('tools.vbucks')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [cart, setCart] = useState<Record<string, number>>({})
  const [customVBucks, setCustomVBucks] = useState('')
  const [shopWishlist, setShopWishlist] = useState<ShopWishlistItem[]>([])
  const [includeWishlist, setIncludeWishlist] = useState(true)

  useEffect(() => {
    const sync = () => setShopWishlist(loadShopWishlist())
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const totalFromCart = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = SHOP_ITEMS.find((i) => i.id === id)
    return acc + (item ? item.cost * qty : 0)
  }, 0)

  const wishlistTotal = shopWishlist.reduce((acc, item) => acc + (item.price ?? 0), 0)
  const customAmount = parseInt(customVBucks) || 0
  const totalNeeded = totalFromCart + customAmount + (includeWishlist ? wishlistTotal : 0)
  const shopHref = '/tools/item-shop'

  const breakdown = totalNeeded > 0 ? cheapestWayToBuy(totalNeeded) : null

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }
      if (next[id] === 0) delete next[id]
      return next
    })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <Link href={toolsHref} className="hover:text-primary transition-colors">
              {t('tools')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
            {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Item picker */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {CATEGORY_IDS.map((catId) => (
              <div key={catId} className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{t(`categories.${catId}`)}</h2>
                <div className="flex flex-col gap-2">
                  {SHOP_ITEMS.filter((i) => i.category === catId).map((item) => {
                    const itemName = t(`items.${item.id}`)
                    return (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{itemName}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.cost.toLocaleString()} {t('vbucksSuffix')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, -1)}
                            disabled={!cart[item.id]}
                            className="h-7 w-7 rounded border border-border bg-muted text-foreground font-bold hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                            aria-label={t('removeAria', { item: itemName })}
                          >
                            –
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-foreground tabular-nums">{cart[item.id] ?? 0}</span>
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, 1)}
                            className="h-7 w-7 rounded border border-border bg-muted text-foreground font-bold hover:border-primary hover:text-primary transition-colors text-sm"
                            aria-label={t('addAria', { item: itemName })}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {shopWishlist.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" aria-hidden="true" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      {t('shopWishlistTitle')}
                    </h2>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={includeWishlist}
                      onChange={(e) => setIncludeWishlist(e.target.checked)}
                      className="accent-primary"
                    />
                    {t('shopWishlistInclude')}
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  {shopWishlist.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground shrink-0">
                        {item.price
                          ? `${item.price.toLocaleString()} ${t('vbucksSuffix')}`
                          : t('shopWishlistNoPrice')}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t('shopWishlistHint')}{' '}
                  <Link href={shopHref} className="text-primary hover:underline">
                    {t('relatedItemShop')}
                  </Link>
                </p>
              </div>
            )}

            {/* Custom amount */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{t('customAmountTitle')}</h2>
              <input
                type="number"
                min="0"
                step="100"
                value={customVBucks}
                onChange={(e) => setCustomVBucks(e.target.value)}
                placeholder={t('customAmountPlaceholder')}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">{t('customAmountHint')}</p>
            </div>
          </div>

          {/* Sidebar summary */}
          <div className="flex flex-col gap-4">
            {/* Cart summary */}
            <div className="rounded-xl border border-border bg-card p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{t('yourTotalTitle')}</h2>
              </div>

              {Object.keys(cart).length === 0 && !customAmount && !(includeWishlist && wishlistTotal > 0) ? (
                <p className="text-sm text-muted-foreground">{t('emptyCart')}</p>
              ) : (
                <>
                  <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = SHOP_ITEMS.find((i) => i.id === id)!
                      return (
                        <div key={id} className="flex justify-between text-xs gap-2">
                          <span className="text-muted-foreground truncate">
                            {qty > 1 ? `${qty}× ` : ''}
                            {t(`items.${item.id}`)}
                          </span>
                          <span className="text-foreground font-medium shrink-0">{(item.cost * qty).toLocaleString()}</span>
                        </div>
                      )
                    })}
                    {includeWishlist && wishlistTotal > 0 && (
                      <div className="flex justify-between text-xs gap-2">
                        <span className="text-muted-foreground">{t('shopWishlistLabel')}</span>
                        <span className="text-foreground font-medium">{wishlistTotal.toLocaleString()}</span>
                      </div>
                    )}
                    {customAmount > 0 && (
                      <div className="flex justify-between text-xs gap-2">
                        <span className="text-muted-foreground">{t('customLabel')}</span>
                        <span className="text-foreground font-medium">{customAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-3 mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">{t('vbucksNeeded')}</span>
                      <span className="font-display text-2xl font-bold text-primary">{totalNeeded.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Cheapest way */}
              {breakdown && (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">{t('cheapestWayTitle')}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {breakdown.packs.map(({ pack, qty }) => (
                      <div key={pack.id} className="flex justify-between text-sm">
                        <span className="text-foreground">
                          {qty > 1 ? `${qty}× ` : ''}
                          {t(`packs.${pack.id}`)}
                        </span>
                        <span className="text-muted-foreground">${(pack.price * qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-3 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-foreground">{t('totalCost')}</span>
                    <span className="font-display text-xl font-bold text-foreground">${breakdown.total.toFixed(2)}</span>
                  </div>
                  {breakdown.leftover > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">{t('leftover', { count: breakdown.leftover.toLocaleString() })}</p>
                  )}
                </div>
              )}
            </div>

            {/* Pack value table */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{t('packPricesTitle')}</h2>
              <div className="flex flex-col gap-2">
                {VBUCKS_PACKS.map((pack) => (
                  <div key={pack.id} className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {t(`packs.${pack.id}`)}
                        {pack.tag && (
                          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-accent text-accent-foreground">
                            {t(pack.tag)}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{t('perVbuck', { price: usdPerVBuck(pack) })}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground shrink-0">${pack.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2">{t('aboutTitle')}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('aboutIntro')} <strong className="text-foreground">{t('aboutBestPack')}</strong> {t('aboutMid')} {t('aboutOutro')}
              </p>
            </div>
          </div>
        </div>

        {/* Related tools */}
        <section className="mt-12 border-t border-border pt-10 space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{t('relatedTitle')}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('relatedBefore')}{' '}
            <Link href={localizeHref(locale, '/tools/battle-pass-xp-calculator')} className="text-primary hover:underline">
              {t('relatedBattlePass')}
            </Link>
            {locale === 'en' ? (
              <>
                {t('relatedMid1')}{' '}
                <Link href={localizeHref(locale, '/tools/item-shop')} className="text-primary hover:underline">
                  {t('relatedItemShop')}
                </Link>
                {t('relatedMid2')}{' '}
              </>
            ) : (
              <>{t('relatedMid2')}{' '}</>
            )}
            <Link href={toolsHref} className="text-primary hover:underline">
              {t('relatedHub')}
            </Link>
            {t('relatedAfter')}
          </p>
        </section>
      </div>
    </main>
  )
}
