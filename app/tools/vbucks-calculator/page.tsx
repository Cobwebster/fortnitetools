'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShoppingCart, TrendingUp, Info } from 'lucide-react'

// Official Fortnite V-Bucks pack pricing (USD) as of 2026
const VBUCKS_PACKS = [
  { vbucks: 1000,  price: 7.99,  label: '1,000 V-Bucks',  tag: '' },
  { vbucks: 2800,  price: 19.99, label: '2,800 V-Bucks',  tag: 'Most Popular' },
  { vbucks: 5000,  price: 31.99, label: '5,000 V-Bucks',  tag: '' },
  { vbucks: 13500, price: 79.99, label: '13,500 V-Bucks', tag: 'Best Value' },
]

// Common Fortnite Item Shop / pack prices (USD storefront examples, 2026)
const SHOP_ITEMS = [
  { name: 'Battle Pass',               cost: 950,  category: 'pass' },
  { name: 'Crew Pack (monthly)',        cost: 1800, category: 'pass' },
  { name: 'Icon Series Skin',           cost: 2000, category: 'skin' },
  { name: 'Legendary Skin',            cost: 2000, category: 'skin' },
  { name: 'Epic Skin',                 cost: 1500, category: 'skin' },
  { name: 'Rare Skin',                 cost: 1200, category: 'skin' },
  { name: 'Uncommon Skin',             cost: 800,  category: 'skin' },
  { name: 'Legendary Back Bling',      cost: 400,  category: 'cosmetic' },
  { name: 'Epic Pickaxe',              cost: 1200, category: 'cosmetic' },
  { name: 'Rare Pickaxe',              cost: 800,  category: 'cosmetic' },
  { name: 'Legendary Glider',          cost: 1500, category: 'cosmetic' },
  { name: 'Epic Wrap',                 cost: 500,  category: 'cosmetic' },
  { name: 'Legendary Emote',           cost: 500,  category: 'emote' },
  { name: 'Epic Emote',                cost: 300,  category: 'emote' },
  { name: 'Uncommon Emote',            cost: 200,  category: 'emote' },
  { name: 'Lobby Music',               cost: 500,  category: 'emote' },
  { name: 'Loading Screen',            cost: 200,  category: 'cosmetic' },
  { name: 'Spray',                     cost: 300,  category: 'cosmetic' },
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

  search(0, VBUCKS_PACKS.map(() => 0), 0, 0)

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
  const packs = best.qty
    .map((qty, i) => ({ pack: VBUCKS_PACKS[i], qty }))
    .filter((r) => r.qty > 0)
  return { packs, total: best.cost, leftover: best.vbucks - needed }
}

function usdPerVBuck(pack: typeof VBUCKS_PACKS[0]) {
  return (pack.price / pack.vbucks * 100).toFixed(3)
}

export default function VBucksCalculatorPage() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [customVBucks, setCustomVBucks] = useState('')

  const totalFromCart = Object.entries(cart).reduce((acc, [name, qty]) => {
    const item = SHOP_ITEMS.find(i => i.name === name)
    return acc + (item ? item.cost * qty : 0)
  }, 0)

  const customAmount = parseInt(customVBucks) || 0
  const totalNeeded = totalFromCart + customAmount

  const breakdown = totalNeeded > 0 ? cheapestWayToBuy(totalNeeded) : null

  const updateCart = (name: string, delta: number) => {
    setCart(prev => {
      const next = { ...prev, [name]: Math.max(0, (prev[name] ?? 0) + delta) }
      if (next[name] === 0) delete next[name]
      return next
    })
  }

  const categories = [
    { id: 'pass',     label: 'Battle Pass & Crew' },
    { id: 'skin',     label: 'Skins' },
    { id: 'cosmetic', label: 'Cosmetics' },
    { id: 'emote',    label: 'Emotes & Music' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
              <span>/</span>
              <span className="text-foreground">V-Bucks Calculator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              V-Bucks <span className="text-primary">Calculator</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Build a wishlist, see V-Bucks needed, and estimate a low-cost pack combination (USD storefront examples).
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Item picker */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {categories.map(cat => (
                <div key={cat.id} className="rounded-xl border border-border bg-card p-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{cat.label}</h2>
                  <div className="flex flex-col gap-2">
                    {SHOP_ITEMS.filter(i => i.category === cat.id).map(item => (
                      <div key={item.name} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.cost.toLocaleString()} V-Bucks</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCart(item.name, -1)}
                            disabled={!cart[item.name]}
                            className="h-7 w-7 rounded border border-border bg-muted text-foreground font-bold hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                            aria-label={`Remove ${item.name}`}
                          >
                            –
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-foreground tabular-nums">
                            {cart[item.name] ?? 0}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCart(item.name, 1)}
                            className="h-7 w-7 rounded border border-border bg-muted text-foreground font-bold hover:border-primary hover:text-primary transition-colors text-sm"
                            aria-label={`Add ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom amount */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Custom V-Bucks Amount</h2>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={customVBucks}
                  onChange={e => setCustomVBucks(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-muted-foreground">Add a specific number of V-Bucks not covered above.</p>
              </div>
            </div>

            {/* Sidebar summary */}
            <div className="flex flex-col gap-4">
              {/* Cart summary */}
              <div className="rounded-xl border border-border bg-card p-5 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Your Total</h2>
                </div>

                {Object.keys(cart).length === 0 && !customAmount ? (
                  <p className="text-sm text-muted-foreground">Add items from the left to calculate.</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
                      {Object.entries(cart).map(([name, qty]) => {
                        const item = SHOP_ITEMS.find(i => i.name === name)!
                        return (
                          <div key={name} className="flex justify-between text-xs gap-2">
                            <span className="text-muted-foreground truncate">{qty > 1 ? `${qty}× ` : ''}{name}</span>
                            <span className="text-foreground font-medium shrink-0">{(item.cost * qty).toLocaleString()}</span>
                          </div>
                        )
                      })}
                      {customAmount > 0 && (
                        <div className="flex justify-between text-xs gap-2">
                          <span className="text-muted-foreground">Custom</span>
                          <span className="text-foreground font-medium">{customAmount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border pt-3 mb-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-muted-foreground">V-Bucks needed</span>
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
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">Cheapest Way to Buy</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {breakdown.packs.map(({ pack, qty }) => (
                        <div key={pack.vbucks} className="flex justify-between text-sm">
                          <span className="text-foreground">{qty > 1 ? `${qty}× ` : ''}{pack.label}</span>
                          <span className="text-muted-foreground">${(pack.price * qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-foreground">Total cost</span>
                      <span className="font-display text-xl font-bold text-foreground">${breakdown.total.toFixed(2)}</span>
                    </div>
                    {breakdown.leftover > 0 && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        +{breakdown.leftover.toLocaleString()} V-Bucks leftover after purchase.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Pack value table */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">V-Bucks Pack Prices</h2>
                <div className="flex flex-col gap-2">
                  {VBUCKS_PACKS.map(pack => (
                    <div key={pack.vbucks} className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {pack.label}
                          {pack.tag && (
                            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-accent text-accent-foreground">
                              {pack.tag}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">${usdPerVBuck(pack)}¢ per V-Buck</p>
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
                <h2 className="text-sm font-semibold text-foreground mb-2">About V-Bucks pricing</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  V-Bucks are Fortnite&apos;s in-game currency used to buy cosmetics from the Item Shop and unlock Battle Passes.
                  Prices shown reflect the standard USD storefront pricing as of 2026. The <strong className="text-foreground">13,500 V-Bucks pack</strong> gives
                  the best per-V-Buck value at roughly 0.593¢ each versus 0.799¢ for the 1,000 pack — a 26% savings.
                  V-Bucks earned through the Battle Pass or Crew subscription effectively lower your per-V-Buck cost further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
