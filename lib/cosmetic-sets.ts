import { unstable_cache } from 'next/cache'
import {
  fetchBrCosmeticsLite,
  fetchNewCosmetics,
  fetchShop,
  searchCosmetics,
  type CosmeticItem,
} from '@/lib/fortnite-api'

/**
 * Cap for sitemap + static params. Keep these equal: sitemap URLs that are not
 * prebuilt become on-demand ISR writes (the main Vercel write-unit burn).
 * Full catalog search still lives on /sets.
 */
export const SETS_SITEMAP_CAP = 800
export const SETS_STATIC_PARAMS_CAP = SETS_SITEMAP_CAP

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

function itemThumb(item: CosmeticItem) {
  return item.featuredImage || item.image || item.smallImage || null
}

function isOutfit(item: CosmeticItem) {
  return item.typeValue === 'outfit' || item.type.toLowerCase() === 'outfit'
}

type SetDraft = LiveSet & { thumbIsOutfit: boolean }

/** Prefer outfit (main skin) art; keep non-outfit only until an outfit arrives. */
function applyThumb(draft: SetDraft, item: CosmeticItem) {
  const next = itemThumb(item)
  if (!next) return
  if (isOutfit(item)) {
    draft.thumb = next
    draft.thumbIsOutfit = true
    return
  }
  if (!draft.thumb || !draft.thumbIsOutfit) {
    draft.thumb = draft.thumb ?? next
  }
}

function upsertSet(
  byKey: Map<string, SetDraft>,
  usedSlugs: Set<string>,
  item: CosmeticItem,
  flags?: { inShop?: boolean; fromNew?: boolean }
) {
  const name = item.set?.trim()
  if (!name) return
  const key = name.toLowerCase()
  const existing = byKey.get(key)
  if (existing) {
    existing.sampleCount += 1
    if (flags?.inShop) existing.inShop = true
    if (flags?.fromNew) existing.fromNew = true
    applyThumb(existing, item)
    if (!existing.backend && item.setBackend) existing.backend = item.setBackend
    if (!existing.setText && item.setText) existing.setText = item.setText
    return
  }

  let slug = slugifySetName(name)
  if (usedSlugs.has(slug)) {
    const extra = item.setBackend ? slugifySetName(item.setBackend.replace(/^set/i, '')) : ''
    slug = extra && !usedSlugs.has(`${slug}-${extra}`) ? `${slug}-${extra}` : `${slug}-${byKey.size + 1}`
  }
  usedSlugs.add(slug)
  const draft: SetDraft = {
    slug,
    name,
    backend: item.setBackend,
    setText: item.setText,
    inShop: Boolean(flags?.inShop),
    fromNew: Boolean(flags?.fromNew),
    thumb: itemThumb(item),
    sampleCount: 1,
    thumbIsOutfit: isOutfit(item),
  }
  byKey.set(key, draft)
}

function sortSets(sets: LiveSet[]) {
  return [...sets].sort((a, b) => {
    // Page 1 should lead with current-build new sets, then tonight’s shop.
    if (a.fromNew !== b.fromNew) return a.fromNew ? -1 : 1
    if (a.inShop !== b.inShop) return a.inShop ? -1 : 1
    if (b.sampleCount !== a.sampleCount) return b.sampleCount - a.sampleCount
    return a.name.localeCompare(b.name)
  })
}

/**
 * Build the slim set index. Raw BR catalog is 17MB+ (over Next’s 2MB fetch cache), so we
 * fetch no-store, shrink to LiveSet[], and cache that list via unstable_cache below.
 */
async function buildCatalogSets(): Promise<LiveSet[]> {
  try {
    const [catalog, shop, fresh] = await Promise.all([
      fetchBrCosmeticsLite().catch(() => [] as CosmeticItem[]),
      fetchShop().catch(() => null),
      fetchNewCosmetics().catch(() => null),
    ])

    const shopItems = (shop?.offers || []).flatMap((offer) => offer.items)
    const newItems = fresh?.all || []
    const shopKeys = new Set(
      shopItems.map((item) => item.set?.trim().toLowerCase()).filter(Boolean) as string[]
    )
    const newKeys = new Set(
      newItems.map((item) => item.set?.trim().toLowerCase()).filter(Boolean) as string[]
    )

    const byKey = new Map<string, SetDraft>()
    const usedSlugs = new Set<string>()

    for (const item of catalog) {
      const key = item.set?.trim().toLowerCase()
      upsertSet(byKey, usedSlugs, item, {
        inShop: key ? shopKeys.has(key) : false,
        fromNew: key ? newKeys.has(key) : false,
      })
    }

    // Shop / new-build may include set members not yet reflected in the cached catalog.
    for (const item of shopItems) upsertSet(byKey, usedSlugs, item, { inShop: true })
    for (const item of newItems) upsertSet(byKey, usedSlugs, item, { fromNew: true })

    return sortSets(
      [...byKey.values()].map(({ thumbIsOutfit: _drop, ...set }) => set)
    )
  } catch {
    return []
  }
}

/**
 * Full BR cosmetic-set index (cached slim list — not the 17–38MB raw catalog).
 * Use for /sets search and detail resolution.
 */
export const fetchCatalogSets = unstable_cache(buildCatalogSets, ['fortnite-catalog-sets-v2'], {
  // Daily — list carries inShop/fromNew flags used by /sets UI.
  revalidate: 86400,
  tags: ['fortnite-sets'],
})

/** @deprecated Prefer fetchCatalogSets — kept as alias for call sites that meant “sets index”. */
export async function fetchLiveSets(): Promise<LiveSet[]> {
  return fetchCatalogSets()
}

/** Shop + current-build sets only (for “tonight” strips / static params). */
export async function fetchHighlightedSets(): Promise<LiveSet[]> {
  const all = await fetchCatalogSets()
  const highlighted = all.filter((s) => s.inShop || s.fromNew)
  return highlighted.length ? highlighted : all.slice(0, 48)
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
  const first = matched[0] ?? items.find((item) => Boolean(item.set))
  if (!first?.set) return null
  const name = first.set
  const members = matched.length
    ? matched
    : items.filter((item) => item.set?.toLowerCase() === name.toLowerCase())
  const outfit = members.find(isOutfit) ?? members[0] ?? first
  return {
    slug: slugifySetName(name) === slug ? slug : slugifySetName(name),
    name,
    backend: first.setBackend,
    setText: first.setText,
    inShop: flags.inShop,
    fromNew: flags.fromNew,
    thumb: itemThumb(outfit),
    sampleCount: members.length || items.length,
  }
}

/** Catalog first; otherwise Fortnite-API set search (real sets should not 404). */
export async function resolveSetBySlug(slug: string): Promise<LiveSet | null> {
  if (!SET_SLUG_RE.test(slug) || slug.length > 80) return null

  const catalog = await fetchCatalogSets()
  const fromCatalog = getLiveSet(catalog, slug)
  if (fromCatalog) return fromCatalog

  const query = slug.replace(/-/g, ' ').trim()
  if (query.length < 2) return null

  const [fullHits, containsHits, shop, fresh] = await Promise.all([
    searchCosmetics({ set: query, matchMethod: 'full' }).catch(() => [] as CosmeticItem[]),
    searchCosmetics({ set: query, matchMethod: 'contains' }).catch(() => [] as CosmeticItem[]),
    fetchShop().catch(() => null),
    fetchNewCosmetics().catch(() => null),
  ])
  const items = fullHits.length ? fullHits : containsHits
  const shopItems = (shop?.offers || []).flatMap((offer) => offer.items)
  const newItems = fresh?.all || []
  return liveSetFromMembers(slug, items, {
    inShop: shopItems.some((item) => item.set && slugifySetName(item.set) === slug),
    fromNew: newItems.some((item) => item.set && slugifySetName(item.set) === slug),
  })
}

async function loadSetMembers(slug: string, name: string, backend?: string) {
  let items = await searchCosmetics({ set: name, matchMethod: 'full' }).catch(
    () => [] as CosmeticItem[]
  )
  if (items.length <= 1 && backend) {
    const byBackend = await searchCosmetics({ set: backend, matchMethod: 'full' }).catch(
      () => [] as CosmeticItem[]
    )
    if (byBackend.length > items.length) items = byBackend
  }
  if (items.length <= 1) {
    const loose = await searchCosmetics({ set: name, matchMethod: 'contains' }).catch(
      () => [] as CosmeticItem[]
    )
    const filtered = loose.filter(
      (item) => item.set && slugifySetName(item.set) === slug
    )
    if (filtered.length > items.length) items = filtered
  }
  return items
}

/** Cached per set — cuts Fortnite-API search spam on ISR regenerations. */
export async function fetchSetMembers(set: LiveSet): Promise<CosmeticItem[]> {
  const cached = unstable_cache(
    () => loadSetMembers(set.slug, set.name, set.backend),
    ['set-members-v1', set.slug],
    { revalidate: 604800, tags: ['fortnite-sets', `set-${set.slug}`] }
  )
  return cached()
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
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export type SetEditorial = {
  hero: string
  paragraphs: string[]
  highlights: { name: string; type: string; rarity: string; blurb: string }[]
  faqs: { question: string; answer: string }[]
  metaDescription: string
}

function isOutfitItem(item: CosmeticItem) {
  return item.typeValue === 'outfit' || item.type.toLowerCase() === 'outfit'
}

function historyLen(item: CosmeticItem) {
  return item.shopHistory?.length ?? 0
}

/**
 * Build indexable copy from the same member payload the set grid / drawer uses
 * (descriptions, introduction, shop history) — no extra API calls.
 */
export function buildSetEditorial(
  set: LiveSet,
  members: CosmeticItem[],
  summary: ReturnType<typeof summarizeSetMembers>
): SetEditorial {
  const outfits = members.filter(isOutfitItem)
  const leadOutfits = outfits.slice(0, 4)
  const outfitNames = leadOutfits.map((o) => o.name)
  const typeBits = Object.entries(summary.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([type, n]) => `${n} ${type}${n === 1 ? '' : 's'}`)

  const introTexts = [
    ...new Set(
      members
        .map((m) => m.introduction?.trim())
        .filter((t): t is string => Boolean(t))
    ),
  ]
  const chapters = [
    ...new Set(
      members
        .map((m) =>
          m.chapter && m.season ? `Chapter ${m.chapter} Season ${m.season}` : null
        )
        .filter((t): t is string => Boolean(t))
    ),
  ]

  const withHist = members
    .filter((m) => historyLen(m) > 0)
    .sort((a, b) => historyLen(b) - historyLen(a))
  const mostShopped = withHist[0]
  const leastShopped = withHist.length > 1 ? withHist[withHist.length - 1] : null

  const heroParts: string[] = []
  if (set.setText) heroParts.push(set.setText.replace(/\.\s*$/, ''))
  if (outfitNames.length === 1) {
    heroParts.push(`Headliner outfit: ${outfitNames[0]}`)
  } else if (outfitNames.length > 1) {
    heroParts.push(`Outfits in this set include ${outfitNames.join(', ')}`)
  }
  if (typeBits.length) {
    heroParts.push(`Roster: ${typeBits.join(', ')}`)
  }
  const hero =
    heroParts.join('. ') +
    (heroParts.length ? '.' : `The Fortnite ${set.name} set roster and shop-history counts.`)

  const paragraphs: string[] = []

  if (leadOutfits.length) {
    const lines = leadOutfits
      .map((o) => {
        const desc = o.description?.trim()
        const intro = o.introduction?.trim()
        const hist = historyLen(o)
        const bits = [
          `**${o.name}** (${o.rarity} Outfit)`,
          desc || null,
          intro || null,
          hist
            ? `${hist} Item Shop day${hist === 1 ? '' : 's'} logged`
            : 'No shop history yet (pass, exclusive, or unreleased)',
        ].filter(Boolean)
        return bits.join(' — ')
      })
      .join(' ')
    paragraphs.push(lines.replace(/\*\*/g, ''))
  }

  if (chapters.length || introTexts.length) {
    paragraphs.push(
      [
        chapters.length
          ? `Members of the ${set.name} set were introduced across ${chapters.join('; ')}.`
          : null,
        introTexts[0] && !chapters.length ? introTexts[0] : null,
        set.inShop
          ? 'At least one tile from this set is in tonight’s Item Shop — open the shop tracker for live V-Bucks prices.'
          : 'Nothing from this set is in tonight’s Item Shop rotation right now; shop-history counts below still show how often members have returned before.',
      ]
        .filter(Boolean)
        .join(' ')
    )
  } else {
    paragraphs.push(
      set.inShop
        ? `The ${set.name} set has ${summary.total} catalog member${summary.total === 1 ? '' : 's'} and is marked in tonight’s Item Shop.`
        : `The ${set.name} set has ${summary.total} catalog member${summary.total === 1 ? '' : 's'} on Fortnite-API. It is not in tonight’s shop unless a member returns later.`
    )
  }

  if (summary.withHistory || summary.exclusive) {
    const histLine = [
      summary.withHistory
        ? `${summary.withHistory} member${summary.withHistory === 1 ? '' : 's'} have Item Shop history`
        : null,
      summary.exclusive
        ? `${summary.exclusive} show no shop days (Battle Pass, exclusive, or not sold yet)`
        : null,
      summary.firstShop && summary.lastShop
        ? `Earliest logged shop day ${formatSetDay(summary.firstShop)}; most recent ${formatSetDay(summary.lastShop)}`
        : null,
      mostShopped
        ? `${mostShopped.name} leads returns with ${historyLen(mostShopped)} shop day${historyLen(mostShopped) === 1 ? '' : 's'}`
        : null,
      leastShopped && leastShopped.id !== mostShopped?.id
        ? `${leastShopped.name} is among the quieter returns (${historyLen(leastShopped)} day${historyLen(leastShopped) === 1 ? '' : 's'})`
        : null,
    ]
      .filter(Boolean)
      .join('. ')
    if (histLine) paragraphs.push(histLine + '.')
  }

  const series = [...new Set(members.map((m) => m.series).filter(Boolean))] as string[]
  if (series.length) {
    paragraphs.push(
      `Series tags on this set: ${series.join(', ')}. Series is Epic’s special rarity track (Icon, Marvel, Gaming Legends, etc.) — separate from Common–Legendary.`
    )
  }

  const highlights = [...members]
    .filter((m) => m.description?.trim() || isOutfitItem(m))
    .sort((a, b) => {
      const ao = isOutfitItem(a) ? 0 : 1
      const bo = isOutfitItem(b) ? 0 : 1
      if (ao !== bo) return ao - bo
      return historyLen(b) - historyLen(a)
    })
    .slice(0, 6)
    .map((m) => ({
      name: m.name,
      type: m.type,
      rarity: m.rarity,
      blurb:
        m.description?.trim() ||
        m.introduction?.trim() ||
        (historyLen(m)
          ? `${historyLen(m)} Item Shop appearance${historyLen(m) === 1 ? '' : 's'} logged.`
          : 'No shop history on Fortnite-API.'),
    }))

  const faqs: { question: string; answer: string }[] = [
    {
      question: `What is in the Fortnite ${set.name} set?`,
      answer: typeBits.length
        ? `Fortnite-API lists ${summary.total} member${summary.total === 1 ? '' : 's'}: ${typeBits.join(', ')}.${
            outfitNames.length
              ? ` Outfit${outfitNames.length === 1 ? '' : 's'}: ${outfitNames.join(', ')}.`
              : ''
          }`
        : `Open the roster grid for every cosmetic tagged with the ${set.name} set name.`,
    },
    ...(mostShopped
      ? [
          {
            question: `Which ${set.name} cosmetic returns most often?`,
            answer: `${mostShopped.name} (${mostShopped.type}) has the most logged Item Shop days in this set (${historyLen(mostShopped)}). Counts come from Fortnite-API shop history — same source as the rarity tool.`,
          },
        ]
      : []),
    ...(chapters.length
      ? [
          {
            question: `When was the ${set.name} set added?`,
            answer: `Introduction text on members points to ${chapters.join(' and ')}. Individual cosmetics in a collab can ship in different seasons — check each tile.`,
          },
        ]
      : []),
    ...SET_DETAIL_FAQS,
  ]

  const metaDescription = [
    set.setText?.replace(/\.\s*$/, '') || `Fortnite ${set.name} set`,
    outfitNames.length ? `Outfits: ${outfitNames.slice(0, 3).join(', ')}` : null,
    typeBits.slice(0, 4).join(', ') || null,
    summary.lastShop ? `Last shop ${formatSetDay(summary.lastShop)}` : null,
    set.inShop ? 'In tonight’s Item Shop' : null,
  ]
    .filter(Boolean)
    .join('. ')
    .slice(0, 158)

  return { hero, paragraphs, highlights, faqs, metaDescription }
}

export const SETS_HOWTO = [
  {
    title: 'Search the catalog',
    body: 'Type a set or collab name — the index covers every Fortnite-API BR set with a set tag, not just tonight’s shop. Results sort with New build first, then In shop.',
  },
  {
    title: 'What a set page is for',
    body: 'See the members (outfit, back bling, pickaxe, wrap, jam track, car…) and a shop-history count per item. Click a tile for styles. This is not a price list and not a locker database.',
  },
  {
    title: 'Shop vs full index',
    body: '“In shop” means something from that set is in tonight’s Item Shop. “New build” means a member shipped in the current pak. Everything else is still searchable for item lookup.',
  },
] as const

export const SETS_INDEX_FAQS = [
  {
    question: 'How many Fortnite sets are listed?',
    answer:
      'Every Battle Royale cosmetic set Fortnite-API tags with a set name — typically well over a thousand. Search filters the grid; shop and new-build badges highlight what is live tonight.',
  },
  {
    question: 'Why did a set page 404?',
    answer:
      'The slug is not a Fortnite-API set name (typo, old nickname, or the cosmetic has no set tag). Try searching from /sets or open the set from the Item Shop browse footer when a cosmetic lists one.',
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
      'No — we index sets, not one URL per cosmetic. Search sets here, or look up a single item in the skin rarity calculator / Item Shop browse.',
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
      'If Fortnite-API still has a set with this name, the page stays. The /sets index searches the full catalog so older collabs stay findable even when they are not in tonight’s shop.',
  },
]
