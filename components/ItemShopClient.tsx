'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  COSMETIC_TYPES,
  RARITY_COLORS,
  type CosmeticItem,
  type ShopOffer,
} from '@/lib/fortnite-api'
import { Search, RefreshCw, ShoppingBag, Sparkles, Library } from 'lucide-react'
import { CosmeticDetailDrawer } from '@/components/CosmeticDetailDrawer'

type Tab = 'shop' | 'new' | 'browse'

function rarityClass(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function ItemCard({
  name,
  type,
  rarity,
  rarityValue,
  image,
  price,
  footer,
  hasVideo,
  onClick,
}: {
  name: string
  type: string
  rarity: string
  rarityValue: string
  image: string | null
  price?: number
  footer?: string
  hasVideo?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-border overflow-hidden bg-card text-left transition-colors hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-square bg-muted/40">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-full w-full object-contain p-3" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
        )}
        {typeof price === 'number' && price > 0 && (
          <div className="absolute bottom-2 right-2 rounded-md bg-background/90 border border-border px-2 py-0.5 text-xs font-bold text-foreground">
            {price.toLocaleString()} V
          </div>
        )}
        {hasVideo && (
          <div className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
            Video
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{name}</h3>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{type}</span>
          <span className={`text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 border ${rarityClass(rarityValue)}`}>
            {rarity}
          </span>
        </div>
        {footer ? <p className="text-[11px] text-muted-foreground pt-0.5">{footer}</p> : null}
      </div>
    </button>
  )
}

export function ItemShopClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('id')

  const [tab, setTab] = useState<Tab>('shop')
  const [shopOffers, setShopOffers] = useState<ShopOffer[]>([])
  const [shopDate, setShopDate] = useState<string | null>(null)
  const [newItems, setNewItems] = useState<CosmeticItem[]>([])
  const [newMeta, setNewMeta] = useState<{ build?: string; lastBr?: string }>({})
  const [browseItems, setBrowseItems] = useState<CosmeticItem[]>([])
  const [browseCount, setBrowseCount] = useState(0)
  const [browseTruncated, setBrowseTruncated] = useState(false)

  const [shopType, setShopType] = useState('all')
  const [shopQuery, setShopQuery] = useState('')
  const [newType, setNewType] = useState('all')
  const [query, setQuery] = useState('')
  const [browseType, setBrowseType] = useState('outfit')
  const [browseRarity, setBrowseRarity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openItem = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('id', id)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const closeItem = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('id')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  const loadShop = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/fortnite/shop')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load shop')
      setShopOffers(data.offers || [])
      setShopDate(data.date || null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load shop')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadNew = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/fortnite/cosmetics/new')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load new cosmetics')
      setNewItems(data.all || [])
      setNewMeta({
        build: data.build,
        lastBr: data.lastAdditions?.br || data.lastAdditions?.all,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load new cosmetics')
    } finally {
      setLoading(false)
    }
  }, [])

  const runBrowse = useCallback(async () => {
    const name = query.trim()
    if (!name && !browseType) {
      setError('Enter a search term or pick a type.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (name) params.set('name', name)
      if (browseType) params.set('type', browseType)
      if (browseRarity) params.set('rarity', browseRarity)
      const res = await fetch(`/api/fortnite/cosmetics/search?${params}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setBrowseItems(data.items || [])
      setBrowseCount(data.count || 0)
      setBrowseTruncated(Boolean(data.truncated))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [query, browseType, browseRarity])

  useEffect(() => {
    if (tab === 'shop' && shopOffers.length === 0) loadShop()
    if (tab === 'new' && newItems.length === 0) loadNew()
  }, [tab, shopOffers.length, newItems.length, loadShop, loadNew])

  const filteredShop = useMemo(() => {
    const q = shopQuery.trim().toLowerCase()
    return shopOffers.filter((offer) => {
      const types = offer.items.map((i) => i.typeValue)
      const typeOk = shopType === 'all' || types.includes(shopType)
      if (!typeOk) return false
      if (!q) return true
      return (
        offer.name.toLowerCase().includes(q) ||
        offer.items.some((i) => i.name.toLowerCase().includes(q)) ||
        offer.section.toLowerCase().includes(q)
      )
    })
  }, [shopOffers, shopQuery, shopType])

  const filteredNew = useMemo(() => {
    if (newType === 'all') return newItems
    return newItems.filter((i) => i.typeValue === newType)
  }, [newItems, newType])

  const typeCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const offer of shopOffers) {
      for (const item of offer.items) {
        map.set(item.typeValue, (map.get(item.typeValue) || 0) + 1)
      }
    }
    return map
  }, [shopOffers])

  const tabs: { id: Tab; label: string; icon: typeof ShoppingBag }[] = [
    { id: 'shop', label: "Today's Shop", icon: ShoppingBag },
    { id: 'new', label: 'New / Incoming', icon: Sparkles },
    { id: 'browse', label: 'Browse Catalog', icon: Library },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              tab === id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (tab === 'shop') loadShop()
            else if (tab === 'new') loadNew()
            else runBrowse()
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Click any outfit, emote, or cosmetic for the full set, V-Bucks price (if in shop), styles, and dance/emote video when available.
      </p>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {tab === 'shop' && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {shopDate ? (
                  <>
                    Shop date: <span className="text-foreground">{formatDate(shopDate)}</span>
                  </>
                ) : (
                  'Loading current rotation…'
                )}
                {shopOffers.length > 0 && <> · {shopOffers.length} offers</>}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  value={shopQuery}
                  onChange={(e) => setShopQuery(e.target.value)}
                  placeholder="Filter shop…"
                  className="w-full sm:w-56 rounded-lg border border-border bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <select
                value={shopType}
                onChange={(e) => setShopType(e.target.value)}
                className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="all">All types</option>
                {[...typeCounts.entries()]
                  .sort((a, b) => b[1] - a[1])
                  .map(([value, count]) => (
                    <option key={value} value={value}>
                      {value} ({count})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {loading && shopOffers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading Item Shop…</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredShop.map((offer) => {
                const primary = offer.items[0]
                const openId = primary?.id
                return (
                  <ItemCard
                    key={offer.offerId}
                    name={offer.name}
                    type={offer.isBundle ? `Bundle · ${offer.section}` : primary?.type || offer.section}
                    rarity={primary?.rarity || 'Rare'}
                    rarityValue={primary?.rarityValue || 'rare'}
                    image={offer.image}
                    price={offer.price}
                    footer={offer.outDate ? `Leaves ${formatDate(offer.outDate)}` : offer.section}
                    hasVideo={offer.items.some((i) => Boolean(i.showcaseVideo))}
                    onClick={() => openId && openItem(openId)}
                  />
                )
              })}
            </div>
          )}
          {!loading && filteredShop.length === 0 && (
            <p className="text-sm text-muted-foreground">No offers match this filter.</p>
          )}
        </>
      )}

      {tab === 'new' && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm text-muted-foreground max-w-2xl">
              Recently added / datamined cosmetics from Fortnite-API (often includes unreleased items before they hit the shop).
              {newMeta.lastBr ? (
                <>
                  {' '}
                  Last BR addition: <span className="text-foreground">{formatDate(newMeta.lastBr)}</span>.
                </>
              ) : null}
              {newMeta.build ? (
                <>
                  {' '}
                  Build: <span className="text-foreground font-mono text-xs">{newMeta.build}</span>.
                </>
              ) : null}
            </p>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">All new ({newItems.length})</option>
              {COSMETIC_TYPES.filter((t) => t.value).map((t) => {
                const count = newItems.filter((i) => i.typeValue === t.value).length
                if (!count) return null
                return (
                  <option key={t.value} value={t.value}>
                    {t.label} ({count})
                  </option>
                )
              })}
            </select>
          </div>

          {loading && newItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading new cosmetics…</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredNew.map((item) => (
                <ItemCard
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  rarity={item.rarity}
                  rarityValue={item.rarityValue}
                  image={item.image || item.smallImage}
                  footer={item.added ? `Added ${formatDate(item.added)}` : item.introduction}
                  hasVideo={Boolean(item.showcaseVideo)}
                  onClick={() => openItem(item.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'browse' && (
        <>
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault()
              runBrowse()
            }}
          >
            <div className="flex-1">
              <label htmlFor="browse-q" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Search name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="browse-q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Solid Snake, Orange Justice, Renegade…"
                  className="w-full rounded-lg border border-border bg-muted pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="browse-type" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Type
              </label>
              <select
                id="browse-type"
                value={browseType}
                onChange={(e) => setBrowseType(e.target.value)}
                className="w-full sm:w-44 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {COSMETIC_TYPES.map((t) => (
                  <option key={t.value || 'all'} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="browse-rarity" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Rarity
              </label>
              <select
                id="browse-rarity"
                value={browseRarity}
                onChange={(e) => setBrowseRarity(e.target.value)}
                className="w-full sm:w-44 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Any rarity</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
                <option value="mythic">Mythic</option>
                <option value="exotic">Exotic</option>
                <option value="gaminglegends">Gaming Legends</option>
                <option value="marvel">Marvel</option>
                <option value="dc">DC</option>
                <option value="starwars">Star Wars</option>
                <option value="icon">Icon Series</option>
              </select>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Search catalog
            </button>
          </form>
          <p className="text-xs text-muted-foreground">
            Try &quot;Solid Snake&quot; then open the outfit to see the full Sneaking set. Emotes with a Video badge play the official dance clip.
            {browseCount > 0 && (
              <>
                {' '}
                Showing {browseItems.length} of {browseCount}
                {browseTruncated ? ' (capped)' : ''}.
              </>
            )}
          </p>
          {loading ? (
            <p className="text-sm text-muted-foreground">Searching…</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {browseItems.map((item) => (
                <ItemCard
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  rarity={item.rarity}
                  rarityValue={item.rarityValue}
                  image={item.image || item.smallImage}
                  footer={item.set || item.introduction}
                  hasVideo={Boolean(item.showcaseVideo)}
                  onClick={() => openItem(item.id)}
                />
              ))}
            </div>
          )}
          {!loading && browseItems.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Search by name (e.g. &quot;Solid Snake&quot;) or pick Outfits / Emotes to browse.
            </p>
          )}
        </>
      )}

      <CosmeticDetailDrawer cosmeticId={selectedId} onClose={closeItem} onSelectId={openItem} />
    </div>
  )
}
