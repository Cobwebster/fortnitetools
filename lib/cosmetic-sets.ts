import {
  fetchNewCosmetics,
  fetchShop,
  searchCosmetics,
  type CosmeticItem,
} from '@/lib/fortnite-api'

/** Shop-first + current-build sets only. Not a 10k outfit index. */
export const LIVE_SET_CAP = 40

export type LiveSet = {
  slug: string
  name: string
  backend?: string
  setText?: string
  inShop: boolean
  fromNew: boolean
  thumb: string | null
  sampleCount: number
}

export function slugifySetName(name: string) {
  const slug = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'set'
}

function collectFromItems(
  items: CosmeticItem[],
  source: 'shop' | 'new',
  byKey: Map<string, LiveSet>,
  usedSlugs: Set<string>
) {
  for (const item of items) {
    const name = item.set?.trim()
    if (!name) continue
    const key = name.toLowerCase()
    const existing = byKey.get(key)
    if (existing) {
      existing.sampleCount += 1
      if (source === 'shop') existing.inShop = true
      if (source === 'new') existing.fromNew = true
      if (!existing.thumb) existing.thumb = item.featuredImage || item.image || item.smallImage || null
      if (!existing.backend && item.setBackend) existing.backend = item.setBackend
      if (!existing.setText && item.setText) existing.setText = item.setText
      continue
    }
    if (byKey.size >= LIVE_SET_CAP) continue

    let slug = slugifySetName(name)
    if (usedSlugs.has(slug)) {
      const extra = item.setBackend ? slugifySetName(item.setBackend.replace(/^set/i, '')) : ''
      slug = extra && !usedSlugs.has(`${slug}-${extra}`) ? `${slug}-${extra}` : `${slug}-${byKey.size + 1}`
    }
    usedSlugs.add(slug)
    byKey.set(key, {
      slug,
      name,
      backend: item.setBackend,
      setText: item.setText,
      inShop: source === 'shop',
      fromNew: source === 'new',
      thumb: item.featuredImage || item.image || item.smallImage || null,
      sampleCount: 1,
    })
  }
}

export async function fetchLiveSets(): Promise<LiveSet[]> {
  try {
    const [shop, fresh] = await Promise.all([
      fetchShop().catch(() => null),
      fetchNewCosmetics().catch(() => null),
    ])
    const byKey = new Map<string, LiveSet>()
    const usedSlugs = new Set<string>()

    const shopItems = (shop?.offers || []).flatMap((offer) => offer.items)
    collectFromItems(shopItems, 'shop', byKey, usedSlugs)
    collectFromItems(fresh?.all || [], 'new', byKey, usedSlugs)

    return [...byKey.values()]
  } catch {
    return []
  }
}

export function getLiveSet(sets: LiveSet[], slug: string) {
  return sets.find((s) => s.slug === slug)
}

const SET_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function liveSetFromMembers(
  slug: string,
  items: CosmeticItem[],
  flags: { inShop: boolean; fromNew: boolean }
): LiveSet | null {
  const matched = items.filter((item) => item.set && slugifySetName(item.set) === slug)
  const first = matched[0]
  if (!first?.set) return null
  return {
    slug,
    name: first.set,
    backend: first.setBackend,
    setText: first.setText,
    inShop: flags.inShop,
    fromNew: flags.fromNew,
    thumb: first.featuredImage || first.image || first.smallImage || null,
    sampleCount: matched.length,
  }
}

/** Live shop/new list first; otherwise look the slug up in Fortnite-API (real sets should not 404). */
export async function resolveSetBySlug(slug: string): Promise<LiveSet | null> {
  const live = await fetchLiveSets()
  const fromLive = getLiveSet(live, slug)
  if (fromLive) return fromLive
  if (!SET_SLUG_RE.test(slug) || slug.length > 80) return null

  const query = slug.replace(/-/g, ' ').trim()
  if (query.length < 2) return null

  const [items, shop, fresh] = await Promise.all([
    searchCosmetics({ set: query, matchMethod: 'full' }).catch(() => [] as CosmeticItem[]),
    fetchShop().catch(() => null),
    fetchNewCosmetics().catch(() => null),
  ])
  const shopItems = (shop?.offers || []).flatMap((offer) => offer.items)
  const newItems = fresh?.all || []
  return liveSetFromMembers(slug, items, {
    inShop: shopItems.some((item) => item.set && slugifySetName(item.set) === slug),
    fromNew: newItems.some((item) => item.set && slugifySetName(item.set) === slug),
  })
}

export async function fetchSetMembers(set: LiveSet): Promise<CosmeticItem[]> {
  let items = await searchCosmetics({ set: set.name, matchMethod: 'full' }).catch(() => [] as CosmeticItem[])
  if (items.length <= 1 && set.backend) {
    const byBackend = await searchCosmetics({ set: set.backend, matchMethod: 'full' }).catch(
      () => [] as CosmeticItem[]
    )
    if (byBackend.length > items.length) items = byBackend
  }
  return items
}

export function summarizeSetMembers(items: CosmeticItem[]) {
  const byType: Record<string, number> = {}
  let withHistory = 0
  let exclusive = 0
  const days: string[] = []
  for (const item of items) {
    const type = item.type || 'Cosmetic'
    byType[type] = (byType[type] || 0) + 1
    const history = item.shopHistory || []
    if (history.length) {
      withHistory += 1
      days.push(...history)
    } else {
      exclusive += 1
    }
  }
  days.sort()
  return {
    total: items.length,
    byType,
    withHistory,
    exclusive,
    firstShop: days[0] || null,
    lastShop: days[days.length - 1] || null,
  }
}

export function formatSetDay(iso: string | null) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export const SETS_HOWTO = [
  {
    title: 'What makes the list',
    body: 'Shop offers first (whatever is in tonight’s Item Shop and has a set name), then cosmetics from the current game build’s “new” list that belong to a set you do not already have. Cap 40. Items with no set tag never get a URL.',
  },
  {
    title: 'What a set page is for',
    body: 'See the members (outfit, back bling, pickaxe, wrap, jam track, car…) and a shop-history count per item. Click a tile for styles. This is not a price list and not a locker database.',
  },
  {
    title: 'The index vs a set URL',
    body: '/sets only lists tonight’s shop plus current-build new sets (cap 40). A real set slug still opens if Fortnite-API knows the name — it is not limited to that live list.',
  },
] as const

export const SETS_INDEX_FAQS = [
  {
    question: 'Why are there only a few dozen Fortnite sets here?',
    answer:
      'This is a live browser for tonight’s Item Shop sets plus sets on cosmetics added in the current game build — capped at 40 so we do not ship a URL per outfit. Full locker catalogs belong in Epic’s client, not an index of 10k pages.',
  },
  {
    question: 'Why did a set page 404?',
    answer:
      'The slug is not a Fortnite-API set name (typo, old nickname, or not a set). The /sets index is a live cap of shop + new-build sets; a missing card there does not mean the set URL is gone.',
  },
  {
    question: 'Is shop history the same as rarity?',
    answer:
      'History on each member is the Fortnite-API appearance list (same flags as the rarity tool). A long history usually means the item has sold often; zero history usually means Battle Pass, exclusive, or not released. A set page is not a V-Bucks tracker — tonight’s prices stay on the Item Shop.',
  },
  {
    question: 'Is “new build” the same as in the shop?',
    answer:
      'No. Epic often ships cosmetics in a pak before they go on sale. A set can show “new build” and still be unpurchasable. “In shop” means it is in tonight’s rotation.',
  },
  {
    question: 'Do you have a page for every Fortnite skin?',
    answer:
      'No. Per-cosmetic index pages are a thin-content trap. Look up a name in the skin rarity calculator or open a tile from the Item Shop / new cosmetics pages.',
  },
]

export const SET_DETAIL_FAQS = [
  {
    question: 'Can I buy these from this page?',
    answer:
      'No. If a member is in tonight’s shop, the Item Shop tracker has the V-Bucks price. This page is the set roster plus shop-history counts.',
  },
  {
    question: 'Why is an item missing?',
    answer:
      'The catalog search uses the set’s display name (and backend name if needed). Jam tracks, cars, and some bundle-only tiles sometimes live on the shop payload instead. Check the Item Shop if the roster looks short.',
  },
  {
    question: 'Will this URL stay up?',
    answer:
      'If Fortnite-API still has a set with this name, the page stays. The /sets index only highlights shop and new-build sets (cap 40) so we do not list every cosmetic set ever shipped.',
  },
]
