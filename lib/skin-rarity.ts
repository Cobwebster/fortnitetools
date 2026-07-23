import type { CosmeticItem } from '@/lib/fortnite-api'

/** Typical Item Shop outfit prices by rarity tier (V-Bucks). */
export const RARITY_VBUCKS: Record<string, number> = {
  uncommon: 800,
  rare: 1200,
  epic: 1500,
  legendary: 2000,
  mythic: 0,
  exotic: 0,
  iconic: 2000,
  gaminglegends: 1500,
  marvel: 1500,
  dc: 1500,
  starwars: 1500,
  dark: 1500,
  frozen: 1500,
  lava: 1500,
  shadow: 1500,
  slurp: 1500,
}

export type ScarcityTier =
  | 'og-exclusive'
  | 'ultra-rare'
  | 'very-rare'
  | 'rare'
  | 'uncommon'
  | 'common-rotation'
  | 'unknown'

export type CosmeticSource =
  | 'item-shop'
  | 'battle-pass'
  | 'starter-pack'
  | 'promo'
  | 'crew'
  | 'unknown'

export type SkinRarityReport = {
  score: number
  tier: ScarcityTier
  label: string
  summary: string
  source: CosmeticSource
  sourceLabel: string
  appearances: number
  firstSeen: string | null
  lastSeen: string | null
  daysSinceLastSeen: number | null
  shopRarity: string
  shopRarityValue: string
  typicalVbucks: number | null
  neverInShop: boolean
}

const TIER_META: Record<
  ScarcityTier,
  { label: string; min: number }
> = {
  'og-exclusive': { label: 'OG / Exclusive', min: 90 },
  'ultra-rare': { label: 'Ultra rare', min: 78 },
  'very-rare': { label: 'Very rare', min: 62 },
  rare: { label: 'Rare sighting', min: 45 },
  uncommon: { label: 'Uncommon rotation', min: 28 },
  'common-rotation': { label: 'Common rotation', min: 0 },
  unknown: { label: 'Unknown', min: 0 },
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)))
}

function daysBetween(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000)
}

export function detectCosmeticSource(tags: string[] | undefined): CosmeticSource {
  const list = tags || []
  const joined = list.join(' ').toLowerCase()
  if (/crew/.test(joined)) return 'crew'
  if (/starterpack|starter.?pack/.test(joined)) return 'starter-pack'
  if (/promo|twitch|giveaway|contest/.test(joined)) return 'promo'
  if (/itemshop|seasonshop/.test(joined)) return 'item-shop'
  if (/battlepass|battle.?pass|source\.season/.test(joined)) return 'battle-pass'
  return 'unknown'
}

function sourceLabel(source: CosmeticSource): string {
  switch (source) {
    case 'item-shop':
      return 'Item Shop'
    case 'battle-pass':
      return 'Battle Pass / season reward'
    case 'starter-pack':
      return 'Starter Pack'
    case 'promo':
      return 'Promo / exclusive drop'
    case 'crew':
      return 'Fortnite Crew'
    default:
      return 'Unknown source'
  }
}

function tierFromScore(score: number, neverInShop: boolean, earlyExclusive: boolean): ScarcityTier {
  if (neverInShop && earlyExclusive) return 'og-exclusive'
  if (score >= TIER_META['og-exclusive'].min) return neverInShop ? 'og-exclusive' : 'ultra-rare'
  if (score >= TIER_META['ultra-rare'].min) return 'ultra-rare'
  if (score >= TIER_META['very-rare'].min) return 'very-rare'
  if (score >= TIER_META.rare.min) return 'rare'
  if (score >= TIER_META.uncommon.min) return 'uncommon'
  return 'common-rotation'
}

/**
 * Estimate collectibility / scarcity from shop history + source tags.
 * Not a real-money price — shop color rarity is separate.
 */
export function assessSkinRarity(item: CosmeticItem, now = new Date()): SkinRarityReport {
  const history = [...(item.shopHistory || [])].filter(Boolean).sort()
  const appearances = history.length
  const firstSeen = history[0] || null
  const lastSeen = history[history.length - 1] || null
  const lastDate = lastSeen ? new Date(lastSeen) : null
  const daysSinceLastSeen =
    lastDate && !Number.isNaN(lastDate.getTime()) ? Math.max(0, daysBetween(lastDate, now)) : null

  const source = detectCosmeticSource(item.gameplayTags)
  const neverInShop = appearances === 0
  const chapterNum = Number.parseInt(item.chapter || '', 10)
  const seasonNum = Number.parseInt(item.season || '', 10)
  const earlyExclusive =
    neverInShop &&
    ((Number.isFinite(chapterNum) && chapterNum <= 1 && Number.isFinite(seasonNum) && seasonNum <= 5) ||
      /chapter\s*1|season\s*[1-5]\b/i.test(item.introduction || ''))

  let score = 40

  if (neverInShop) {
    score = source === 'battle-pass' || source === 'promo' || source === 'starter-pack' ? 82 : 70
    if (earlyExclusive) score = 96
    else if (source === 'crew') score = 55
    else if (source === 'item-shop') score = 72 // tagged shop but no history yet / vaulted weirdness
  } else {
    // Fewer appearances → higher scarcity
    if (appearances <= 1) score = 88
    else if (appearances <= 3) score = 80
    else if (appearances <= 6) score = 70
    else if (appearances <= 12) score = 58
    else if (appearances <= 25) score = 45
    else if (appearances <= 50) score = 32
    else if (appearances <= 100) score = 20
    else score = 12

    // Long absences boost rarity even if it returned once
    if (daysSinceLastSeen != null) {
      if (daysSinceLastSeen >= 900) score += 18
      else if (daysSinceLastSeen >= 540) score += 12
      else if (daysSinceLastSeen >= 270) score += 7
      else if (daysSinceLastSeen >= 90) score += 3
      else if (daysSinceLastSeen <= 14) score -= 8
    }
  }

  if (source === 'promo') score += 6
  if (source === 'starter-pack') score += 4

  score = clamp(score)

  const tier = tierFromScore(score, neverInShop, earlyExclusive)
  const label = TIER_META[tier].label
  const shopRarityValue = (item.rarityValue || 'common').toLowerCase()
  const typical = RARITY_VBUCKS[shopRarityValue]
  const typicalVbucks = typeof typical === 'number' && typical > 0 ? typical : null

  let summary: string
  if (neverInShop && earlyExclusive) {
    summary =
      'Never sold in the modern Item Shop rotation — classic early-season exclusive. Extremely scarce in locker terms.'
  } else if (neverInShop) {
    summary =
      'No recorded Item Shop appearances. Usually Battle Pass, Crew, starter pack, or promo unlock — not something you can buy on a normal shop day.'
  } else if (daysSinceLastSeen != null && daysSinceLastSeen >= 540) {
    summary = `Seen in the shop ${appearances} time${appearances === 1 ? '' : 's'}, but last appeared about ${Math.round(daysSinceLastSeen / 30)} months ago. Long vault time makes it feel rare.`
  } else if (appearances <= 5) {
    summary = `Only ${appearances} recorded shop appearance${appearances === 1 ? '' : 's'} — short rotation history compared with most cosmetics.`
  } else {
    summary = `Has returned to the shop ${appearances} times. Still check last-seen date — frequent returns usually mean lower scarcity.`
  }

  return {
    score,
    tier,
    label,
    summary,
    source,
    sourceLabel: sourceLabel(source),
    appearances,
    firstSeen,
    lastSeen,
    daysSinceLastSeen,
    shopRarity: item.rarity || 'Unknown',
    shopRarityValue,
    typicalVbucks,
    neverInShop,
  }
}

export const SCARCITY_TIER_STYLES: Record<ScarcityTier, string> = {
  'og-exclusive': 'border-amber-400/50 bg-amber-400/15 text-amber-200',
  'ultra-rare': 'border-rose-400/50 bg-rose-400/10 text-rose-300',
  'very-rare': 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300',
  rare: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  uncommon: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  'common-rotation': 'border-slate-400/40 bg-slate-400/10 text-slate-300',
  unknown: 'border-border bg-muted text-muted-foreground',
}

export function formatShopDate(iso: string | null | undefined) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
