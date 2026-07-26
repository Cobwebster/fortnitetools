import data from '@/lib/weapon-changes-data.json'
import { WEAPON_CATALOG, type WeaponRarity } from '@/lib/weapons-catalog'

export type WeaponChangeStat = {
  stat: string
  old: number | null
  new: number | null
  change: number | null
}

export type WeaponChangeEntry = {
  rarity: WeaponRarity
  name: string
  stats: WeaponChangeStat[]
  image?: string
}

export type WeaponChangePatch = {
  date: string
  label: string
  entries: WeaponChangeEntry[]
}

type RawPayload = {
  updatedAt: string
  sourceNote: string
  patches: {
    date: string
    label: string
    entries: {
      rarity: string
      name: string
      stats: WeaponChangeStat[]
    }[]
  }[]
}

const payload = data as RawPayload

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const IMAGE_BY_NAME = (() => {
  const map = new Map<string, string>()
  for (const w of WEAPON_CATALOG) {
    map.set(normalizeName(w.name), w.image)
  }
  return map
})()

function resolveImage(name: string): string | undefined {
  const key = normalizeName(name)
  if (IMAGE_BY_NAME.has(key)) return IMAGE_BY_NAME.get(key)
  // Soft match: catalog name contained in change name or vice versa
  for (const [catalogName, image] of IMAGE_BY_NAME) {
    if (key.includes(catalogName) || catalogName.includes(key)) return image
  }
  return undefined
}

function dedupeEntries(entries: WeaponChangeEntry[]): WeaponChangeEntry[] {
  const seen = new Set<string>()
  const out: WeaponChangeEntry[] = []
  for (const e of entries) {
    const fingerprint = `${e.rarity}|${e.name}|${e.stats
      .map((s) => `${s.stat}:${s.old}:${s.new}`)
      .join(';')}`
    if (seen.has(fingerprint)) continue
    seen.add(fingerprint)
    out.push(e)
  }
  return out
}

export const WEAPON_CHANGES_UPDATED_AT = payload.updatedAt
export const WEAPON_CHANGES_SOURCE_NOTE = payload.sourceNote

export const WEAPON_CHANGE_PATCHES: WeaponChangePatch[] = payload.patches.map((p) => ({
  date: p.date,
  label: p.label,
  entries: dedupeEntries(
    p.entries.map((e) => ({
      rarity: e.rarity as WeaponRarity,
      name: e.name,
      stats: e.stats,
      image: resolveImage(e.name),
    }))
  ),
}))

export const WEAPON_CHANGE_ENTRY_COUNT = WEAPON_CHANGE_PATCHES.reduce(
  (n, p) => n + p.entries.length,
  0
)

export function formatChangeValue(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—'
  if (Number.isInteger(n)) return String(n)
  const rounded = Math.round(n * 1000) / 1000
  return String(rounded)
}

export function formatDelta(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—'
  if (n === 0) return '0'
  const abs = formatChangeValue(Math.abs(n))
  return n > 0 ? `+${abs}` : `-${abs}`
}

/** Stats where lower is better (reload, equip, etc.) — invert buff/nerf color. */
const LOWER_IS_BETTER = new Set([
  'reload time',
  'equip animation',
  'ads time',
  'spread',
  'bloom',
  'vertical recoil',
  'horizontal recoil',
])

export function changeTone(
  stat: string,
  change: number | null | undefined
): 'buff' | 'nerf' | 'neutral' {
  if (change == null || change === 0) return 'neutral'
  const lowerBetter = LOWER_IS_BETTER.has(stat.toLowerCase())
  const isBuff = lowerBetter ? change < 0 : change > 0
  return isBuff ? 'buff' : 'nerf'
}
