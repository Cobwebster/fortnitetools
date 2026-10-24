import encyclopedia from '@/lib/weapons-encyclopedia.json'

export type WeaponRarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Mythic'
  | 'Exotic'

export type WeaponCategoryId =
  | 'AR'
  | 'Shotgun'
  | 'SMG'
  | 'Pistol'
  | 'DMR'
  | 'Sniper'
  | 'Bow'
  | 'Explosive'
  | 'Other'

export type WeaponVariantRow = {
  rarity: WeaponRarity
  dmg: number
  structDmg: number
  fireRate: number
  mag: number
  reload: number
  dps: number
}

export type WeaponCatalogEntry = {
  id: string
  name: string
  category: WeaponCategoryId
  image: string
  /** Not in the current BR loot pool */
  vaulted?: boolean
  note?: string
  variants: WeaponVariantRow[]
}

const RARITY_ORDER: WeaponRarity[] = [
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Exotic',
]

/** Full Fortnite weapons encyclopedia (current pool + vaulted history). */
export const WEAPON_CATALOG: WeaponCatalogEntry[] = encyclopedia as WeaponCatalogEntry[]

const CATALOG_BY_ID = new Map(WEAPON_CATALOG.map((w) => [w.id, w]))

function normalizeWeaponName(name: string) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const CATALOG_ID_BY_NAME = new Map(
  WEAPON_CATALOG.map((w) => [normalizeWeaponName(w.name), w.id] as const)
)

export function getCatalogWeapon(id: string): WeaponCatalogEntry | undefined {
  return CATALOG_BY_ID.get(id)
}

/** Exact name match only — "Pump Shotgun" must not resolve to "Striker Pump Shotgun". */
export function catalogIdForWeaponName(name: string): string | undefined {
  return CATALOG_ID_BY_NAME.get(normalizeWeaponName(name))
}

export const WEAPON_CATEGORY_META: {
  id: WeaponCategoryId | 'all'
  label: string
}[] = [
  { id: 'all', label: 'All Weapons' },
  { id: 'AR', label: 'Assault Rifles' },
  { id: 'Shotgun', label: 'Shotguns' },
  { id: 'SMG', label: 'SMGs' },
  { id: 'Pistol', label: 'Pistols' },
  { id: 'DMR', label: 'DMRs' },
  { id: 'Sniper', label: 'Snipers' },
  { id: 'Bow', label: 'Bows' },
  { id: 'Explosive', label: 'Explosives' },
  { id: 'Other', label: 'Other' },
]

export function catalogByCategory(category: WeaponCategoryId | 'all') {
  return category === 'all'
    ? WEAPON_CATALOG
    : WEAPON_CATALOG.filter((w) => w.category === category)
}

export function sortRarities(a: WeaponRarity, b: WeaponRarity) {
  return RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b)
}

export function formatMagSize(mag: number) {
  if (mag >= 100000) return '∞'
  return String(mag)
}

export const CATALOG_RARITY_TEXT: Record<WeaponRarity, string> = {
  Common: 'text-slate-300',
  Uncommon: 'text-green-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-amber-400',
  Mythic: 'text-yellow-300',
  Exotic: 'text-cyan-300',
}

export const CATALOG_RARITY_BG: Record<WeaponRarity, string> = {
  Common: 'border-slate-400/40 bg-slate-400/10',
  Uncommon: 'border-green-400/50 bg-green-400/10',
  Rare: 'border-blue-400/50 bg-blue-400/10',
  Epic: 'border-purple-400/50 bg-purple-400/10',
  Legendary: 'border-amber-400/50 bg-amber-400/10',
  Mythic: 'border-yellow-300/50 bg-yellow-300/10',
  Exotic: 'border-cyan-300/50 bg-cyan-300/10',
}
