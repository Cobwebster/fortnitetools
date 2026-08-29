'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  COSMETIC_TYPES,
  RARITY_COLORS,
  type CosmeticItem,
  type ShopOffer,
} from '@/lib/fortnite-api'
import Link from '@/components/link'
import { Search, RefreshCw, ShoppingBag, Sparkles, Library, Star, Heart } from 'lucide-react'
import { CosmeticDetailDrawer } from '@/components/CosmeticDetailDrawer'
import {
  formatShopCountdown,
  isLeavingTonight,
  loadShopWishlist,
  msUntilShopReset,
  saveShopWishlist,
  syncWishlistWithShop,
  upsertWishlistItem,
  wishlistIds,
  type ShopWishlistItem,
} from '@/lib/shop-wishlist'

type Tab = 'shop' | 'new' | 'browse' | 'wishlist'

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
  videoLabel,
  noImageLabel,
  onClick,
  wished,
  onToggleWish,
  leaving,
  back,
  leavingLabel = 'Leaving tonight',
  backLabel = 'Back',
}: {
  name: string
  type: string
  rarity: string
  rarityValue: string
  image: string | null
  price?: number
  footer?: string
  hasVideo?: boolean
  videoLabel: string
  noImageLabel: string
  onClick?: () => void
  wished?: boolean
  onToggleWish?: () => void
  leaving?: boolean
  back?: boolean
  leavingLabel?: string
  backLabel?: string
}) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden bg-card text-left transition-colors hover:border-primary/60">
      {onToggleWish ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleWish()
          }}
          aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-2 top-2 z-10 rounded-md border p-1.5 ${
            wished
              ? 'border-amber-400/60 bg-amber-400/20 text-amber-200'
              : 'border-white/15 bg-black/55 text-white/80 hover:text-white'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${wished ? 'fill-current' : ''}`} />
        </button>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-square bg-muted/40">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="h-full w-full object-contain p-3" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">{noImageLabel}</div>
          )}
          {typeof price === 'number' && price > 0 && (
            <div className="absolute bottom-2 right-2 rounded-md bg-background/90 border border-border px-2 py-0.5 text-xs font-bold text-foreground">
              {price.toLocaleString()} V
            </div>
          )}
          {hasVideo && (
            <div className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              {videoLabel}
            </div>
          )}
          {leaving && (
            <div className="absolute bottom-2 left-2 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              {leavingLabel}
            </div>
          )}
          {back && !leaving && (
            <div className="absolute bottom-2 left-2 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              {backLabel}
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
    </div>
  )
}

export function ItemShopClient() {
  const t = useTranslations('tools.itemShop')
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
  const [wishlist, setWishlist] = useState<ShopWishlistItem[]>([])
  const [resetMs, setResetMs] = useState(0)

  useEffect(() => {
    setWishlist(loadShopWishlist())
  }, [])

  useEffect(() => {
    const tick = () => setResetMs(msUntilShopReset())
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [])

  const wishedSet = useMemo(() => wishlistIds(wishlist), [wishlist])

  const persistWishlist = useCallback((next: ShopWishlistItem[]) => {
    setWishlist(next)
    saveShopWishlist(next)
  }, [])

  const toggleWish = useCallback(
    (item: Omit<ShopWishlistItem, 'addedAt' | 'missedShop'>) => {
      persistWishlist(upsertWishlistItem(wishlist, item))
    },
    [persistWishlist, wishlist]
  )

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
      if (!res.ok) throw new Error(data.error || t('errors.loadShop'))
      const offers = (data.offers || []) as ShopOffer[]
      setShopOffers(offers)
      setShopDate(data.date || null)
      const inShop = new Set<string>()
      for (const offer of offers) {
        for (const item of offer.items) inShop.add(item.id.toLowerCase())
      }
      persistWishlist(syncWishlistWithShop(loadShopWishlist(), inShop))
    } catch (e) {
      setError(e instanceof Error ? e.message : t('errors.loadShop'))
    } finally {
      setLoading(false)
    }
  }, [t, persistWishlist])

  const loadNew = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/fortnite/cosmetics/new')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('errors.loadNew'))
      setNewItems(data.all || [])
      setNewMeta({
        build: data.build,
        lastBr: data.lastAdditions?.br || data.lastAdditions?.all,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : t('errors.loadNew'))
    } finally {
      setLoading(false)
    }
  }, [t])

  const runBrowse = useCallback(async () => {
    const name = query.trim()
    if (!name && !browseType) {
      setError(t('browse.errorEmpty'))
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
      if (!res.ok) throw new Error(data.error || t('errors.search'))
      setBrowseItems(data.items || [])
      setBrowseCount(data.count || 0)
      setBrowseTruncated(Boolean(data.truncated))
    } catch (e) {
      setError(e instanceof Error ? e.message : t('errors.search'))
    } finally {
      setLoading(false)
    }
  }, [query, browseType, browseRarity, t])

  useEffect(() => {
    if ((tab === 'shop' || tab === 'wishlist') && shopOffers.length === 0) loadShop()
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

  const leavingTonight = useMemo(
    () => shopOffers.filter((o) => isLeavingTonight(o.outDate)),
    [shopOffers]
  )

  const wishlistInShop = useMemo(() => {
    return wishlist
      .map((w) => {
        const offer = shopOffers.find((o) =>
          o.items.some((i) => i.id.toLowerCase() === w.id.toLowerCase())
        )
        return offer ? { wish: w, offer } : null
      })
      .filter((row): row is { wish: ShopWishlistItem; offer: ShopOffer } => Boolean(row))
  }, [wishlist, shopOffers])

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
    { id: 'shop', label: t('tabs.shop'), icon: ShoppingBag },
    { id: 'new', label: t('tabs.new'), icon: Sparkles },
    { id: 'browse', label: t('tabs.browse'), icon: Library },
    {
      id: 'wishlist',
      label: wishlist.length ? `${t('tabs.wishlist')} (${wishlist.length})` : t('tabs.wishlist'),
      icon: Heart,
    },
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
            if (tab === 'shop' || tab === 'wishlist') loadShop()
            else if (tab === 'new') loadNew()
            else runBrowse()
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          {t('refresh')}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">{t('clickHint')}</p>

      {tab === 'shop' && shopOffers.length > 0 && (
        <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t('live.newItemsIn')}
            </p>
            <p className="font-display text-3xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-4xl">
              {formatShopCountdown(resetMs)}
            </p>
            <p className="text-xs text-muted-foreground">{t('live.resetHint')}</p>
          </div>
          {leavingTonight.length > 0 && (
            <p className="text-sm font-semibold text-rose-300">
              {t('live.leavingCount', { count: leavingTonight.length })}
            </p>
          )}
        </div>
      )}

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
                    {t('shop.shopDateLabel')} <span className="text-foreground">{formatDate(shopDate)}</span>
                  </>
                ) : (
                  t('shop.loadingRotation')
                )}
                {shopOffers.length > 0 && (
                  <>
                    {' '}
                    · {shopOffers.length} {t('shop.offersSuffix')}
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  value={shopQuery}
                  onChange={(e) => setShopQuery(e.target.value)}
                  placeholder={t('shop.filterPlaceholder')}
                  className="w-full sm:w-56 rounded-lg border border-border bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <select
                value={shopType}
                onChange={(e) => setShopType(e.target.value)}
                className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="all">{t('shop.allTypes')}</option>
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

          {leavingTonight.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                {t('live.leavingTonight')}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {leavingTonight.slice(0, 12).map((offer) => {
                  const primary = offer.items[0]
                  const openId = primary?.id || `offer:${offer.offerId}`
                  return (
                    <div key={`leave-${offer.offerId}`} className="w-36 shrink-0">
                      <ItemCard
                        name={offer.name}
                        type={primary?.type || offer.section}
                        rarity={primary?.rarity || 'Rare'}
                        rarityValue={primary?.rarityValue || 'rare'}
                        image={offer.image || primary?.image || primary?.smallImage}
                        price={offer.price}
                        videoLabel={t('shop.video')}
                        noImageLabel={t('drawer.noImage')}
                        leaving
                        wished={Boolean(primary && wishedSet.has(primary.id.toLowerCase()))}
                        onToggleWish={
                          primary
                            ? () =>
                                toggleWish({
                                  id: primary.id,
                                  name: offer.name,
                                  type: primary.type,
                                  image: offer.image || primary.image,
                                  price: offer.price,
                                  rarityValue: primary.rarityValue,
                                })
                            : undefined
                        }
                        onClick={() => openItem(openId)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {wishlistInShop.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-200">
                {t('live.wishlistInShop')}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {wishlistInShop.map(({ wish, offer }) => (
                  <div key={`wish-${wish.id}`} className="w-36 shrink-0">
                    <ItemCard
                      name={wish.name}
                      type={wish.type}
                      rarity={wish.rarityValue}
                      rarityValue={wish.rarityValue}
                      image={offer.image || wish.image}
                      price={offer.price}
                      videoLabel={t('shop.video')}
                      noImageLabel={t('drawer.noImage')}
                      back={wish.back}
                      wished
                      onToggleWish={() =>
                        toggleWish({
                          id: wish.id,
                          name: wish.name,
                          type: wish.type,
                          image: wish.image,
                          price: wish.price,
                          rarityValue: wish.rarityValue,
                        })
                      }
                      onClick={() => openItem(wish.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && shopOffers.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('shop.loading')}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredShop.map((offer) => {
                const primary = offer.items[0]
                const openId = primary?.id || `offer:${offer.offerId}`
                const leaving = isLeavingTonight(offer.outDate)
                return (
                  <ItemCard
                    key={offer.offerId}
                    name={offer.name}
                    type={offer.isBundle ? `${t('shop.bundlePrefix')} · ${offer.section}` : primary?.type || offer.section}
                    rarity={primary?.rarity || 'Rare'}
                    rarityValue={primary?.rarityValue || 'rare'}
                    image={offer.image || primary?.image || primary?.smallImage}
                    price={offer.price}
                    footer={
                      leaving
                        ? t('live.leavingTonight')
                        : offer.outDate
                          ? t('shop.leaves', { date: formatDate(offer.outDate) ?? '' })
                          : offer.section
                    }
                    hasVideo={offer.items.some((i) => Boolean(i.showcaseVideo))}
                    videoLabel={t('shop.video')}
                    noImageLabel={t('drawer.noImage')}
                    leaving={leaving}
                    wished={Boolean(primary && wishedSet.has(primary.id.toLowerCase()))}
                    onToggleWish={
                      primary
                        ? () =>
                            toggleWish({
                              id: primary.id,
                              name: offer.name,
                              type: primary.type,
                              image: offer.image || primary.image,
                              price: offer.price,
                              rarityValue: primary.rarityValue,
                            })
                        : undefined
                    }
                    onClick={() => openItem(openId)}
                  />
                )
              })}
            </div>
          )}
          {!loading && filteredShop.length === 0 && (
            <p className="text-sm text-muted-foreground">{t('shop.noMatch')}</p>
          )}
        </>
      )}

      {tab === 'new' && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t('new.description')}
              {newMeta.lastBr ? (
                <>
                  {' '}
                  {t('new.lastAddition', { date: formatDate(newMeta.lastBr) ?? '' })}
                </>
              ) : null}
              {newMeta.build ? (
                <>
                  {' '}
                  {t('new.build', { build: newMeta.build })}
                </>
              ) : null}
            </p>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">{t('new.allNew', { count: newItems.length })}</option>
              {COSMETIC_TYPES.filter((ct) => ct.value).map((ct) => {
                const count = newItems.filter((i) => i.typeValue === ct.value).length
                if (!count) return null
                return (
                  <option key={ct.value} value={ct.value}>
                    {ct.label} ({count})
                  </option>
                )
              })}
            </select>
          </div>

          {loading && newItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('new.loading')}</p>
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
                  footer={item.added ? t('new.added', { date: formatDate(item.added) ?? '' }) : item.introduction}
                  hasVideo={Boolean(item.showcaseVideo)}
                  videoLabel={t('shop.video')}
                  noImageLabel={t('drawer.noImage')}
                  wished={wishedSet.has(item.id.toLowerCase())}
                  onToggleWish={() =>
                    toggleWish({
                      id: item.id,
                      name: item.name,
                      type: item.type,
                      image: item.image || item.smallImage,
                      price: shopOffers.find((o) => o.items.some((i) => i.id === item.id))?.price ?? null,
                      rarityValue: item.rarityValue,
                    })
                  }
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
                {t('browse.searchLabel')}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="browse-q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('browse.searchPlaceholder')}
                  className="w-full rounded-lg border border-border bg-muted pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="browse-type" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {t('browse.typeLabel')}
              </label>
              <select
                id="browse-type"
                value={browseType}
                onChange={(e) => setBrowseType(e.target.value)}
                className="w-full sm:w-44 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {COSMETIC_TYPES.map((ct) => (
                  <option key={ct.value || 'all'} value={ct.value}>
                    {ct.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="browse-rarity" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {t('browse.rarityLabel')}
              </label>
              <select
                id="browse-rarity"
                value={browseRarity}
                onChange={(e) => setBrowseRarity(e.target.value)}
                className="w-full sm:w-44 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">{t('browse.anyRarity')}</option>
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
              {t('browse.searchBtn')}
            </button>
          </form>
          <p className="text-xs text-muted-foreground">
            {t('browse.hint')}
            {browseCount > 0 && (
              <>
                {' '}
                {t('browse.showing', { shown: browseItems.length, count: browseCount })}
                {browseTruncated ? t('browse.capped') : ''}.
              </>
            )}
          </p>
          {loading ? (
            <p className="text-sm text-muted-foreground">{t('browse.searching')}</p>
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
                  videoLabel={t('shop.video')}
                  noImageLabel={t('drawer.noImage')}
                  wished={wishedSet.has(item.id.toLowerCase())}
                  onToggleWish={() =>
                    toggleWish({
                      id: item.id,
                      name: item.name,
                      type: item.type,
                      image: item.image || item.smallImage,
                      price: shopOffers.find((o) => o.items.some((i) => i.id === item.id))?.price ?? null,
                      rarityValue: item.rarityValue,
                    })
                  }
                  onClick={() => openItem(item.id)}
                />
              ))}
            </div>
          )}
          {!loading && browseItems.length === 0 && (
            <p className="text-sm text-muted-foreground">{t('browse.emptyPrompt')}</p>
          )}
        </>
      )}

      {tab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm text-muted-foreground max-w-2xl">{t('wishlist.description')}</p>
            <Link
              href="/tools/vbucks-calculator"
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t('wishlist.vbucksLink')}
            </Link>
          </div>
          {wishlist.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('wishlist.empty')}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {wishlist.map((wish) => {
                const inShop = wishlistInShop.some((row) => row.wish.id === wish.id)
                return (
                  <ItemCard
                    key={wish.id}
                    name={wish.name}
                    type={wish.type}
                    rarity={wish.rarityValue}
                    rarityValue={wish.rarityValue}
                    image={wish.image}
                    price={wish.price ?? undefined}
                    footer={
                      inShop
                        ? wish.back
                          ? t('wishlist.back')
                          : t('wishlist.inShop')
                        : t('wishlist.notInShop')
                    }
                    videoLabel={t('shop.video')}
                    noImageLabel={t('drawer.noImage')}
                    back={inShop && wish.back}
                    wished
                    onToggleWish={() =>
                      toggleWish({
                        id: wish.id,
                        name: wish.name,
                        type: wish.type,
                        image: wish.image,
                        price: wish.price,
                        rarityValue: wish.rarityValue,
                      })
                    }
                    onClick={() => openItem(wish.id)}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      <CosmeticDetailDrawer
        cosmeticId={selectedId}
        onClose={closeItem}
        onSelectId={openItem}
        wished={Boolean(selectedId && wishedSet.has(selectedId.toLowerCase()))}
        onToggleWish={(item) => toggleWish(item)}
      />
    </div>
  )
}
