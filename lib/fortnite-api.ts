const API_BASE = 'https://fortnite-api.com'

export type CosmeticVariantOption = {
  tag: string
  name: string
  image: string | null
}

export type CosmeticVariant = {
  channel: string
  type: string
  options: CosmeticVariantOption[]
}

export type CosmeticItem = {
  id: string
  name: string
  description?: string
  type: string
  typeValue: string
  rarity: string
  rarityValue: string
  image: string | null
  smallImage: string | null
  featuredImage: string | null
  added?: string
  set?: string
  setText?: string
  setBackend?: string
  series?: string
  introduction?: string
  chapter?: string
  season?: string
  showcaseVideo?: string | null
  variants?: CosmeticVariant[]
  gameplayTags?: string[]
  path?: string
  dynamicPakId?: string
  /** Shop appearance dates (ISO). Empty when exclusive / never sold, or when flags omit history. */
  shopHistory?: string[]
}

export type ShopPriceInfo = {
  price: number
  regularPrice: number
  section: string
  outDate: string | null
  inDate: string | null
  offerId: string
  isBundle: boolean
  bundleName?: string
  bundleItems?: { id: string; name: string; type: string }[]
  giftable?: boolean
  refundable?: boolean
  banner?: string | null
  offerTag?: string | null
}

export type CosmeticDetail = CosmeticItem & {
  shop: ShopPriceInfo | null
  setItems: CosmeticItem[]
  raw: Record<string, unknown>
}

export type ShopOffer = {
  offerId: string
  name: string
  price: number
  regularPrice: number
  section: string
  outDate: string | null
  inDate: string | null
  items: CosmeticItem[]
  image: string | null
  isBundle: boolean
  giftable?: boolean
  refundable?: boolean
  banner?: string | null
  offerTag?: string | null
}

type ApiLabel = { value?: string; displayValue?: string; backendValue?: string }

type ApiCosmetic = {
  id?: string
  name?: string
  description?: string
  type?: ApiLabel
  rarity?: ApiLabel
  series?: { value?: string; colors?: string[]; backendValue?: string }
  images?: { smallIcon?: string; icon?: string; featured?: string }
  added?: string
  set?: { value?: string; text?: string; backendValue?: string }
  introduction?: { text?: string; chapter?: string; season?: string; backendValue?: number }
  showcaseVideo?: string
  variants?: {
    channel?: string
    type?: string
    options?: { tag?: string; name?: string; image?: string }[]
  }[]
  gameplayTags?: string[]
  path?: string
  dynamicPakId?: string
  shopHistory?: string[]
  [key: string]: unknown
}

type ApiShopEntry = {
  offerId?: string
  regularPrice?: number
  finalPrice?: number
  inDate?: string
  outDate?: string
  layout?: { name?: string; id?: string }
  layoutId?: string
  brItems?: ApiCosmetic[]
  tracks?: { id?: string; title?: string; artist?: string; albumArt?: string }[]
  instruments?: ApiCosmetic[]
  cars?: ApiCosmetic[]
  newDisplayAsset?: {
    renderImages?: { image?: string }[]
  }
  bundle?: { name?: string }
  banner?: { value?: string; displayValue?: string } | string
  offerTag?: { id?: string; text?: string } | string
  giftable?: boolean
  refundable?: boolean
  devName?: string
}

export function normalizeCosmetic(raw: ApiCosmetic): CosmeticItem | null {
  if (!raw?.id || !raw?.name) return null
  const image = raw.images?.featured || raw.images?.icon || raw.images?.smallIcon || null
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    type: raw.type?.displayValue || raw.type?.value || 'Cosmetic',
    typeValue: (raw.type?.value || 'unknown').toLowerCase(),
    rarity: raw.rarity?.displayValue || raw.rarity?.value || 'Unknown',
    rarityValue: (raw.rarity?.value || 'common').toLowerCase(),
    image,
    smallImage: raw.images?.smallIcon || raw.images?.icon || null,
    featuredImage: raw.images?.featured || null,
    added: raw.added,
    set: raw.set?.value,
    setText: raw.set?.text,
    setBackend: raw.set?.backendValue,
    series: raw.series?.value,
    introduction: raw.introduction?.text,
    chapter: raw.introduction?.chapter,
    season: raw.introduction?.season,
    showcaseVideo: raw.showcaseVideo || null,
    variants: (raw.variants || []).map((v) => ({
      channel: v.channel || 'Style',
      type: v.type || 'style',
      options: (v.options || []).map((o) => ({
        tag: o.tag || '',
        name: o.name || o.tag || 'Style',
        image: o.image || null,
      })),
    })),
    gameplayTags: raw.gameplayTags,
    path: raw.path,
    dynamicPakId: raw.dynamicPakId,
    shopHistory: Array.isArray(raw.shopHistory)
      ? raw.shopHistory.filter((d): d is string => typeof d === 'string')
      : undefined,
  }
}

function isPlaceholderEntry(entry: ApiShopEntry) {
  const name = entry.devName || ''
  return /TBD|SID_Placeholder/i.test(name) && !entry.brItems?.length && !entry.tracks?.length
}

export function normalizeShopOffers(entries: ApiShopEntry[] = []): ShopOffer[] {
  return entries
    .filter((e) => !isPlaceholderEntry(e))
    .map((entry) => {
      const brItems = (entry.brItems || []).map(normalizeCosmetic).filter(Boolean) as CosmeticItem[]
      const instruments = (entry.instruments || []).map(normalizeCosmetic).filter(Boolean) as CosmeticItem[]
      const cars = (entry.cars || []).map(normalizeCosmetic).filter(Boolean) as CosmeticItem[]
      const tracks: CosmeticItem[] = (entry.tracks || []).map((t) => ({
        id: t.id || t.title || 'track',
        name: t.title || 'Jam Track',
        description: t.artist,
        type: 'Jam Track',
        typeValue: 'music',
        rarity: 'Rare',
        rarityValue: 'rare',
        image: t.albumArt || null,
        smallImage: t.albumArt || null,
        featuredImage: t.albumArt || null,
      }))

      const items = [...brItems, ...instruments, ...cars, ...tracks]
      const displayAsset =
        entry.newDisplayAsset?.renderImages?.find((r) => r.image)?.image || null
      const primary = items[0]
      const name =
        entry.bundle?.name ||
        (items.length > 1 ? items.map((i) => i.name).slice(0, 3).join(', ') : primary?.name) ||
        entry.devName?.replace(/^\[VIRTUAL\]\d+ x /, '').split(' for ')[0] ||
        'Shop offer'

      const banner =
        typeof entry.banner === 'string'
          ? entry.banner
          : entry.banner?.displayValue || entry.banner?.value || null
      const offerTag =
        typeof entry.offerTag === 'string'
          ? entry.offerTag
          : entry.offerTag?.text || entry.offerTag?.id || null

      return {
        offerId: entry.offerId || name,
        name,
        price: entry.finalPrice ?? entry.regularPrice ?? 0,
        regularPrice: entry.regularPrice ?? entry.finalPrice ?? 0,
        section: entry.layout?.name || entry.layoutId || 'Featured',
        outDate: entry.outDate || null,
        inDate: entry.inDate || null,
        items,
        image: displayAsset || primary?.image || null,
        isBundle: items.length > 1 || Boolean(entry.bundle),
        giftable: entry.giftable,
        refundable: entry.refundable,
        banner,
        offerTag,
      } satisfies ShopOffer
    })
    .filter((o) => o.items.length > 0 || o.image)
}

export async function fetchShop() {
  const res = await fetch(`${API_BASE}/v2/shop?language=en`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Shop API failed (${res.status})`)
  const json = await res.json()
  return {
    date: json.data?.date as string | undefined,
    vbuckIcon: json.data?.vbuckIcon as string | undefined,
    offers: normalizeShopOffers(json.data?.entries || []),
    rawEntries: (json.data?.entries || []) as ApiShopEntry[],
  }
}

export async function fetchNewCosmetics() {
  const res = await fetch(`${API_BASE}/v2/cosmetics/new?language=en`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) throw new Error(`New cosmetics API failed (${res.status})`)
  const json = await res.json()
  const groups = json.data?.items || {}
  const lastAdditions = json.data?.lastAdditions || {}
  const build = json.data?.build as string | undefined

  const byType: Record<string, CosmeticItem[]> = {}
  for (const [key, list] of Object.entries(groups)) {
    if (!Array.isArray(list)) continue
    byType[key] = (list as ApiCosmetic[])
      .map(normalizeCosmetic)
      .filter(Boolean) as CosmeticItem[]
  }

  const all = Object.values(byType).flat()

  return { build, lastAdditions, byType, all }
}

export async function searchCosmetics(params: {
  name?: string
  type?: string
  rarity?: string
  set?: string
  matchMethod?: 'full' | 'contains' | 'starts' | 'ends'
}) {
  const qs = new URLSearchParams({
    language: 'en',
    // Include paths, gameplay tags, and shop history for rarity / source scoring
    responseFlags: '7',
  })
  if (params.name) {
    qs.set('name', params.name)
    qs.set('matchMethod', params.matchMethod || 'contains')
  }
  if (params.type) {
    qs.set('type', params.type)
    if (!params.name && !params.set) qs.set('matchMethod', 'full')
  }
  if (params.rarity) qs.set('rarity', params.rarity)
  if (params.set) {
    qs.set('set', params.set)
    if (!params.name) qs.set('matchMethod', params.matchMethod || 'full')
  }

  if (!params.name && !params.type && !params.set) {
    return [] as CosmeticItem[]
  }

  const res = await fetch(`${API_BASE}/v2/cosmetics/br/search/all?${qs.toString()}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    if (res.status === 404) return []
    throw new Error(`Search API failed (${res.status})`)
  }
  const json = await res.json()
  const list = Array.isArray(json.data) ? json.data : []
  return list.map(normalizeCosmetic).filter(Boolean) as CosmeticItem[]
}

export async function fetchCosmeticById(id: string): Promise<ApiCosmetic | null> {
  const res = await fetch(
    `${API_BASE}/v2/cosmetics/br/${encodeURIComponent(id)}?language=en&responseFlags=0x7`,
    { next: { revalidate: 3600 } }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Cosmetic API failed (${res.status})`)
  const json = await res.json()
  return (json.data || null) as ApiCosmetic | null
}

function findShopPrice(cosmeticId: string, offers: ShopOffer[]): ShopPriceInfo | null {
  for (const offer of offers) {
    const hit = offer.items.find((i) => i.id.toLowerCase() === cosmeticId.toLowerCase())
    if (!hit) continue
    return {
      price: offer.price,
      regularPrice: offer.regularPrice,
      section: offer.section,
      outDate: offer.outDate,
      inDate: offer.inDate,
      offerId: offer.offerId,
      isBundle: offer.isBundle,
      bundleName: offer.isBundle ? offer.name : undefined,
      bundleItems: offer.items.map((i) => ({ id: i.id, name: i.name, type: i.type })),
      giftable: offer.giftable,
      refundable: offer.refundable,
      banner: offer.banner,
      offerTag: offer.offerTag,
    }
  }
  return null
}

export async function fetchCosmeticDetail(id: string): Promise<CosmeticDetail | null> {
  const [raw, shop] = await Promise.all([fetchCosmeticById(id), fetchShop().catch(() => null)])
  if (!raw) return null

  const item = normalizeCosmetic(raw)
  if (!item) return null

  let setItems: CosmeticItem[] = []
  if (item.set) {
    setItems = await searchCosmetics({ set: item.set, matchMethod: 'full' })
    // Prefer set backend if name search is thin
    if (setItems.length <= 1 && item.setBackend) {
      const byBackend = await searchCosmetics({ set: item.setBackend, matchMethod: 'full' })
      if (byBackend.length > setItems.length) setItems = byBackend
    }
  }

  return {
    ...item,
    shop: shop ? findShopPrice(item.id, shop.offers) : null,
    setItems: setItems.filter((s) => s.id !== item.id),
    raw: raw as Record<string, unknown>,
  }
}

export const COSMETIC_TYPES = [
  { value: '', label: 'All types' },
  { value: 'outfit', label: 'Outfits' },
  { value: 'emote', label: 'Emotes' },
  { value: 'backpack', label: 'Back Blings' },
  { value: 'pickaxe', label: 'Pickaxes' },
  { value: 'glider', label: 'Gliders' },
  { value: 'wrap', label: 'Wraps' },
  { value: 'shoe', label: 'Kicks' },
  { value: 'contrail', label: 'Contrails' },
  { value: 'spray', label: 'Sprays' },
  { value: 'emoji', label: 'Emojis' },
  { value: 'loadingscreen', label: 'Loading Screens' },
  { value: 'music', label: 'Music / Jam Tracks' },
] as const

export const RARITY_COLORS: Record<string, string> = {
  common: 'border-slate-500/40 bg-slate-500/10 text-slate-300',
  uncommon: 'border-green-500/40 bg-green-500/10 text-green-400',
  rare: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  epic: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
  legendary: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  mythic: 'border-yellow-400/50 bg-yellow-400/10 text-yellow-300',
  exotic: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
  iconic: 'border-rose-400/40 bg-rose-400/10 text-rose-300',
  gaminglegends: 'border-indigo-400/40 bg-indigo-400/10 text-indigo-300',
  marvel: 'border-red-500/40 bg-red-500/10 text-red-400',
  dc: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  starwars: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
  dark: 'border-violet-600/40 bg-violet-600/10 text-violet-300',
  frozen: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200',
  lava: 'border-orange-500/40 bg-orange-500/10 text-orange-400',
  shadow: 'border-zinc-400/40 bg-zinc-400/10 text-zinc-300',
  slurp: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
}
