import {
  fetchCosmeticById,
  normalizeCosmetic,
  type CosmeticItem,
} from '@/lib/fortnite-api'

export const LOCKER_ITEM_CAP = 300

export const LOCKER_SLUG_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/

export const LOCKER_COSMETIC_ID_RE = /^[A-Za-z0-9._-]{3,96}$/

export const RESERVED_LOCKER_SLUGS = new Set([
  'edit',
  'me',
  'new',
  'settings',
  'account',
  'api',
  'login',
  'register',
  'share',
])

export type LockerRow = {
  user_id: string
  slug: string
  display_name: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export type LockerWithItems = LockerRow & {
  itemIds: string[]
}

export const LOCKER_TYPE_TABS: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'outfit', label: 'Outfits' },
  { value: 'backpack', label: 'Back Blings' },
  { value: 'pickaxe', label: 'Harvesting Tools' },
  { value: 'glider', label: 'Gliders' },
  { value: 'contrail', label: 'Contrails' },
  { value: 'wrap', label: 'Wraps' },
  { value: 'banner', label: 'Banners' },
  { value: 'emote', label: 'Emotes' },
  { value: 'emoji', label: 'Emoticons' },
  { value: 'spray', label: 'Sprays' },
  { value: 'toy', label: 'Toys' },
  { value: 'music', label: 'Lobby Music' },
  { value: 'loadingscreen', label: 'Loading Screens' },
  { value: 'shoe', label: 'Kicks' },
  { value: 'car', label: 'Cars' },
]

/** Live input: lowercase, spaces/junk → hyphen. Trailing hyphen allowed while typing. */
export function sanitizeLockerSlugInput(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+/, '')
    .slice(0, 32)
}

/** Final slug: no leading/trailing hyphens. */
export function sanitizeLockerSlug(raw: string) {
  return sanitizeLockerSlugInput(raw).replace(/-+$/g, '')
}

export function slugifyLockerName(name: string) {
  const base = sanitizeLockerSlug(name).slice(0, 24)
  if (base.length >= 3 && LOCKER_SLUG_RE.test(base) && !RESERVED_LOCKER_SLUGS.has(base)) {
    return base
  }
  return `locker-${Math.random().toString(36).slice(2, 8)}`
}

export function isValidLockerSlug(slug: string) {
  return LOCKER_SLUG_RE.test(slug) && !RESERVED_LOCKER_SLUGS.has(slug)
}

export function isValidCosmeticId(id: string) {
  return LOCKER_COSMETIC_ID_RE.test(id)
}

export function cosmeticIconFallback(id: string) {
  return `https://fortnite-api.com/images/cosmetics/br/${id.toLowerCase()}/smallicon.png`
}

function placeholderCosmetic(id: string): CosmeticItem {
  const image = cosmeticIconFallback(id)
  return {
    id,
    name: id,
    type: 'Cosmetic',
    typeValue: 'unknown',
    rarity: 'Common',
    rarityValue: 'common',
    image,
    smallImage: image,
    featuredImage: null,
  }
}

const RESOLVE_BATCH = 12

/** Resolve stored Fortnite-API ids one-by-one (each response is small enough to cache). */
export async function resolveLockerCosmetics(ids: string[]): Promise<CosmeticItem[]> {
  if (!ids.length) return []
  const resolved: CosmeticItem[] = []
  for (let i = 0; i < ids.length; i += RESOLVE_BATCH) {
    const batch = ids.slice(i, i + RESOLVE_BATCH)
    const items = await Promise.all(
      batch.map(async (id) => {
        try {
          const raw = await fetchCosmeticById(id)
          return (raw && normalizeCosmetic(raw)) || placeholderCosmetic(id)
        } catch {
          return placeholderCosmetic(id)
        }
      })
    )
    resolved.push(...items)
  }
  return resolved
}

export async function cosmeticExists(id: string): Promise<CosmeticItem | null> {
  if (!isValidCosmeticId(id)) return null
  const raw = await fetchCosmeticById(id)
  if (!raw) return null
  return normalizeCosmetic(raw)
}

export function tabsForItems(items: CosmeticItem[]) {
  const present = new Set(items.map((i) => i.typeValue))
  return LOCKER_TYPE_TABS.filter((tab) => tab.value === 'all' || present.has(tab.value))
}
