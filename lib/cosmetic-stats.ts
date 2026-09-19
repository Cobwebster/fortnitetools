import { fetchAllBrCosmetics, fetchShop, type CosmeticItem, type ShopOffer } from '@/lib/fortnite-api'

export type CosmeticStatsRow = {
  id: string
  name: string
  image: string | null
  rarity: string
  typeValue: string
  appearances: number
  firstSeen: string | null
  lastSeen: string | null
  daysSinceLastSeen: number | null
  inShop: boolean
  price: number | null
  section: string | null
}

export type CosmeticStatsPayload = {
  generatedAt: string
  source: string
  note: string
  outfitCount: number
  shopOfferCount: number
  boards: {
    mostAppeared: CosmeticStatsRow[]
    longestVaulted: CosmeticStatsRow[]
    recentReturns: CosmeticStatsRow[]
    inShopTonight: CosmeticStatsRow[]
  }
}

export const COSMETIC_STATS_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What does “most appeared” mean?',
    answer:
      'How many distinct Item Shop dates Fortnite-API lists in that cosmetic’s shopHistory. It is shop rotation popularity — not how many players wear the skin in lobby.',
  },
  {
    question: 'Is this the same as fortnite.gg Most Used / Cosmetic Stats?',
    answer:
      'Same idea (shop frequency and vault time), different data path. We compute boards from fortnite-api.com shop history and today’s shop — we do not scrape fortnite.gg.',
  },
  {
    question: 'Why are Battle Pass skins missing from most-appeared?',
    answer:
      'Items that never sold in the Item Shop have an empty shopHistory. They show up in exclusive rarity tools, not on shop-frequency boards.',
  },
  {
    question: 'How often do these boards update?',
    answer:
      'The cosmetics catalog refreshes about every six hours. Tonight’s shop board uses the live shop feed (about every five minutes).',
  },
  {
    question: 'Can I check one skin’s history?',
    answer:
      'Yes — use the skin rarity calculator for a single outfit, or open the Item Shop tracker for tonight’s prices.',
  },
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
    rarity: item.rarity,
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

const BOARD_LIMIT = 40

export async function loadCosmeticStats(): Promise<CosmeticStatsPayload> {
  const now = new Date()
  const [catalog, shop] = await Promise.all([
    fetchAllBrCosmetics(),
    fetchShop().catch(() => ({ offers: [] as ShopOffer[], date: undefined })),
  ])

  const inShop = shopIndex(shop.offers)
  const outfits = catalog.filter((c) => c.typeValue === 'outfit')

  const withHistory = outfits
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

  const inShopTonight = outfits
    .filter((item) => inShop.has(item.id))
    .map((item) => toRow(item, historyMeta(item, now), inShop))
    .sort((a, b) => (b.price || 0) - (a.price || 0) || a.name.localeCompare(b.name))
    .slice(0, BOARD_LIMIT)

  return {
    generatedAt: now.toISOString(),
    source: 'fortnite-api.com/v2/cosmetics/br + /v2/shop',
    note: 'Shop rotation stats from official cosmetics shopHistory — not locker wear rates and not scraped third-party boards.',
    outfitCount: outfits.length,
    shopOfferCount: shop.offers.length,
    boards: {
      mostAppeared,
      longestVaulted,
      recentReturns,
      inShopTonight,
    },
  }
}

export function formatShopDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
