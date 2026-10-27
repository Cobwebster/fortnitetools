import { fetchAllBrCosmetics, fetchShop, type CosmeticItem, type ShopOffer } from '@/lib/fortnite-api'

export type CosmeticStatsRow = {
  id: string
  name: string
  image: string | null
  rarity: string
  type: string
  typeValue: string
  appearances: number
  firstSeen: string | null
  lastSeen: string | null
  daysSinceLastSeen: number | null
  inShop: boolean
  price: number | null
  section: string | null
}

export type CosmeticStatsBucket = {
  key: string
  label: string
  count: number
  pct: number
}

export type CosmeticStatsPayload = {
  generatedAt: string
  source: string
  note: string
  catalogCount: number
  outfitCount: number
  shopOfferCount: number
  boards: {
    mostAppeared: CosmeticStatsRow[]
    longestVaulted: CosmeticStatsRow[]
    recentReturns: CosmeticStatsRow[]
    inShopTonight: CosmeticStatsRow[]
  }
  rarity: CosmeticStatsBucket[]
  seasons: CosmeticStatsBucket[]
  types: CosmeticStatsBucket[]
}

export const COSMETIC_STATS_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What does “most occurrences” mean?',
    answer:
      'How many distinct Item Shop dates Fortnite-API lists in that cosmetic’s shopHistory. It is rotation frequency — not lobby wear rate and not community wishlist tallies.',
  },
  {
    question: 'Where do these boards come from?',
    answer:
      'Shop frequency, vault time, rarity / season / type mix all come from fortnite-api.com. We do not show wishlist, like-rating, or cup-owner tables — those need private account feeds we do not have.',
  },
  {
    question: 'Why are Battle Pass skins missing from shop boards?',
    answer:
      'Items that never sold in the Item Shop have an empty shopHistory. They still count in rarity, season, and type totals.',
  },
  {
    question: 'Where are wishlists, likes, and rarest cup cosmetics?',
    answer:
      'Those require third-party account dumps we do not run, so those three tables are not on this page.',
  },
  {
    question: 'How often do these boards update?',
    answer:
      'The cosmetics catalog refreshes about every six hours. Tonight’s shop board uses the live shop feed (about every five minutes).',
  },
]

const BOARD_LIMIT = 40

const TYPE_LABELS: Record<string, string> = {
  outfit: 'Outfits',
  emote: 'Emotes',
  backpack: 'Back Blings',
  pickaxe: 'Harvesting Tools',
  glider: 'Gliders',
  contrail: 'Contrails',
  wrap: 'Wraps',
  spray: 'Sprays',
  emoji: 'Emojis',
  toy: 'Toys',
  loadingscreen: 'Loading Screens',
  music: 'Music',
  banner: 'Banners',
  pet: 'Pets',
  petcarrier: 'Pet Carriers',
  shoe: 'Kicks',
  car: 'Cars',
  guitar: 'Guitars',
  bass: 'Bass',
  drums: 'Drums',
  microphone: 'Mics',
  keytar: 'Keytars',
  aura: 'Auras',
}

const TYPE_ORDER = [
  'outfit',
  'emote',
  'backpack',
  'pickaxe',
  'glider',
  'contrail',
  'wrap',
  'spray',
  'emoji',
  'toy',
  'loadingscreen',
  'music',
  'banner',
  'shoe',
  'car',
]

const RARITY_ORDER = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'mythic',
  'dark series',
  'frozen series',
  'lava series',
  'shadow series',
  'slurp series',
  'icon series',
  'star wars series',
  'dc series',
  'marvel series',
  'gaming legends series',
  'crew series',
]

function daysBetween(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000)
}

function historyMeta(item: CosmeticItem, now: Date) {
  const history = [...(item.shopHistory || [])].filter(Boolean).sort()
  const appearances = history.length
  const firstSeen = history[0] || null
  const lastSeen = history[history.length - 1] || null
  const lastDate = lastSeen ? new Date(lastSeen) : null
  const daysSinceLastSeen =
    lastDate && !Number.isNaN(lastDate.getTime()) ? Math.max(0, daysBetween(lastDate, now)) : null
  return { appearances, firstSeen, lastSeen, daysSinceLastSeen }
}

function shopIndex(offers: ShopOffer[]) {
  const byId = new Map<string, { price: number; section: string }>()
  for (const offer of offers) {
    for (const item of offer.items) {
      if (!item.id) continue
      if (!byId.has(item.id)) {
        byId.set(item.id, { price: offer.price, section: offer.section })
      }
    }
  }
  return byId
}

function toRow(
  item: CosmeticItem,
  meta: ReturnType<typeof historyMeta>,
  inShop: Map<string, { price: number; section: string }>
): CosmeticStatsRow {
  const shop = inShop.get(item.id)
  return {
    id: item.id,
    name: item.name,
    image: item.smallImage || item.image,
    rarity: item.series || item.rarity,
    type: item.type,
    typeValue: item.typeValue,
    appearances: meta.appearances,
    firstSeen: meta.firstSeen,
    lastSeen: meta.lastSeen,
    daysSinceLastSeen: meta.daysSinceLastSeen,
    inShop: Boolean(shop),
    price: shop?.price ?? null,
    section: shop?.section ?? null,
  }
}

function typeLabel(typeValue: string, fallback: string) {
  return TYPE_LABELS[typeValue] || fallback || typeValue
}

function rarityBucket(item: CosmeticItem): { key: string; label: string } {
  if (item.series) {
    return { key: item.series.toLowerCase(), label: item.series }
  }
  return { key: (item.rarity || 'Unknown').toLowerCase(), label: item.rarity || 'Unknown' }
}

function seasonLabel(item: CosmeticItem): string {
  const chapter = (item.chapter || '').trim()
  const season = (item.season || '').trim()
  if (!chapter && !season) return 'Unspecified'
  const se = season.toUpperCase()
  if (se === 'OG' || se === 'REMIX') return `Season ${se}`
  if (chapter === '6' && season === '5') return 'Chapter 6, Season MS1'
  if (chapter === '6' && season === '6') return 'Chapter 6, Season MS2'
  if (/^MS\d+$/i.test(season) && chapter) return `Chapter ${chapter}, Season ${se}`
  const chNum = Number(chapter)
  const seNum = se === 'X' ? 10 : Number(season)
  if ((chNum === 1 || !chapter) && Number.isFinite(seNum) && seNum >= 1 && seNum <= 10) {
    return seNum === 10 ? 'Season X' : `Season ${seNum}`
  }
  if (chapter && season) return `Chapter ${chapter}, Season ${season}`
  return item.introduction || season || `Chapter ${chapter}`
}

function seasonRank(item: CosmeticItem): number {
  const chapter = (item.chapter || '').trim()
  const season = (item.season || '').trim()
  if (!chapter && !season) return -1
  const se = season.toUpperCase()
  if (se === 'OG') return 4.9
  if (se === 'REMIX') return 5.9
  if (chapter === '6' && season === '5') return 6.025
  if (chapter === '6' && season === '6') return 6.045
  const ms = se.match(/^MS(\d+)$/)
  const chNum = Number(chapter) || 0
  if (ms) {
    const n = Number(ms[1])
    if (n === 1) return chNum + 0.025
    if (n === 2) return chNum + 0.045
    return chNum + 0.02 + n / 1000
  }
  const seNum = se === 'X' ? 10 : Number(season)
  const chapterNum = chNum > 0 ? chNum : Number.isFinite(seNum) && seNum <= 10 ? 1 : 0
  const seasonNum = Number.isFinite(seNum) ? seNum : 0
  return chapterNum + seasonNum / 100
}

function toBuckets(
  counts: Map<string, { label: string; count: number; rank?: number }>,
  total: number,
  order?: string[]
): CosmeticStatsBucket[] {
  const rows = [...counts.entries()].map(([key, v]) => ({
    key,
    label: v.label,
    count: v.count,
    pct: total > 0 ? Math.round((v.count / total) * 10_000) / 100 : 0,
    rank: v.rank,
  }))
  rows.sort((a, b) => {
    if (order) {
      const ai = order.indexOf(a.key)
      const bi = order.indexOf(b.key)
      if (ai !== -1 || bi !== -1) {
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      }
    }
    if (a.rank != null && b.rank != null && a.rank !== b.rank) return b.rank - a.rank
    return b.count - a.count || a.label.localeCompare(b.label)
  })
  return rows.map(({ key, label, count, pct }) => ({ key, label, count, pct }))
}

export async function loadCosmeticStats(): Promise<CosmeticStatsPayload> {
  const now = new Date()
  const [catalog, shop] = await Promise.all([
    fetchAllBrCosmetics(),
    fetchShop().catch(() => ({ offers: [] as ShopOffer[], date: undefined })),
  ])

  const inShop = shopIndex(shop.offers)
  const outfits = catalog.filter((c) => c.typeValue === 'outfit')

  const withHistory = catalog
    .map((item) => {
      const meta = historyMeta(item, now)
      return { item, meta, row: toRow(item, meta, inShop) }
    })
    .filter((x) => x.meta.appearances > 0)

  const mostAppeared = [...withHistory]
    .sort((a, b) => b.meta.appearances - a.meta.appearances || a.item.name.localeCompare(b.item.name))
    .slice(0, BOARD_LIMIT)
    .map((x) => x.row)

  const longestVaulted = [...withHistory]
    .filter((x) => !x.row.inShop && x.meta.daysSinceLastSeen != null && x.meta.daysSinceLastSeen >= 30)
    .sort(
      (a, b) =>
        (b.meta.daysSinceLastSeen || 0) - (a.meta.daysSinceLastSeen || 0) ||
        a.item.name.localeCompare(b.item.name)
    )
    .slice(0, BOARD_LIMIT)
    .map((x) => x.row)

  const recentReturns = [...withHistory]
    .filter(
      (x) =>
        x.meta.daysSinceLastSeen != null &&
        x.meta.daysSinceLastSeen <= 14 &&
        x.meta.appearances >= 3
    )
    .sort(
      (a, b) =>
        (a.meta.daysSinceLastSeen || 0) - (b.meta.daysSinceLastSeen || 0) ||
        b.meta.appearances - a.meta.appearances
    )
    .slice(0, BOARD_LIMIT)
    .map((x) => x.row)

  const inShopTonight = catalog
    .filter((item) => inShop.has(item.id))
    .map((item) => toRow(item, historyMeta(item, now), inShop))
    .sort((a, b) => (b.price || 0) - (a.price || 0) || a.name.localeCompare(b.name))
    .slice(0, BOARD_LIMIT)

  const rarityCounts = new Map<string, { label: string; count: number }>()
  const seasonCounts = new Map<string, { label: string; count: number; rank: number }>()
  const typeCounts = new Map<string, { label: string; count: number }>()

  for (const item of catalog) {
    const rarity = rarityBucket(item)
    const r = rarityCounts.get(rarity.key) || { label: rarity.label, count: 0 }
    r.count += 1
    rarityCounts.set(rarity.key, r)

    const sLabel = seasonLabel(item)
    const sKey = sLabel.toLowerCase()
    const s = seasonCounts.get(sKey) || { label: sLabel, count: 0, rank: seasonRank(item) }
    s.count += 1
    seasonCounts.set(sKey, s)

    const tKey = item.typeValue || 'unknown'
    const t = typeCounts.get(tKey) || { label: typeLabel(tKey, item.type), count: 0 }
    t.count += 1
    typeCounts.set(tKey, t)
  }

  const total = catalog.length

  return {
    generatedAt: shop.date || `${now.toISOString().slice(0, 10)}T00:00:00.000Z`,
    source: 'fortnite-api.com/v2/cosmetics/br + /v2/shop',
    note: 'Shop rotation and catalog mix from Fortnite-API — not locker wear rates, wishlists, or cup owner dumps.',
    catalogCount: total,
    outfitCount: outfits.length,
    shopOfferCount: shop.offers.length,
    boards: {
      mostAppeared,
      longestVaulted,
      recentReturns,
      inShopTonight,
    },
    rarity: toBuckets(rarityCounts, total, RARITY_ORDER),
    seasons: toBuckets(seasonCounts, total),
    types: toBuckets(typeCounts, total, TYPE_ORDER),
  }
}

export function formatShopDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function rarityBarClass(key: string) {
  if (key.includes('legendary') || key.includes('icon') || key.includes('star wars')) return 'bg-amber-400'
  if (key.includes('epic') || key.includes('dark') || key.includes('gaming')) return 'bg-fuchsia-400'
  if (key.includes('rare') || key.includes('dc') || key.includes('frozen')) return 'bg-sky-400'
  if (key.includes('uncommon') || key.includes('slurp')) return 'bg-lime-400'
  if (key.includes('marvel') || key.includes('lava') || key.includes('crew')) return 'bg-red-400'
  if (key.includes('shadow') || key.includes('common')) return 'bg-zinc-400'
  if (key.includes('mythic')) return 'bg-yellow-300'
  return 'bg-primary'
}
