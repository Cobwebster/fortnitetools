import data from '@/lib/weapon-spawn-rates-data.json'
import { catalogIdForWeaponName, getCatalogWeapon } from '@/lib/weapons-catalog'

export type SpawnModeId = 'br' | 'ranked' | 'zb' | 'reload' | 'blitz' | 'og'

export type SpawnSourceKey = 'chest' | 'floor' | 'rareChest' | 'supply'

export type SpawnWeaponRow = {
  id: string
  name: string
  category: string
  image: string
  chest: number | null
  floor: number | null
  rareChest: number | null
  supply: number | null
  /** Encyclopedia page id when we have a matching catalog entry */
  catalogId?: string
}

export type SpawnModeMeta = {
  id: SpawnModeId
  label: string
  available: boolean
}

type RawMode = {
  label: string
  available: boolean
  sameAs?: string
  weapons?: SpawnWeaponRow[]
}

const RAW = data as {
  season: string
  patch: string
  capturedAt: string
  note: string
  modes: Record<string, RawMode>
}

export const SPAWN_SOURCE_META: {
  key: SpawnSourceKey
  label: string
  short: string
}[] = [
  { key: 'chest', label: 'Chests', short: 'Chest' },
  { key: 'floor', label: 'Floor loot', short: 'Floor' },
  { key: 'rareChest', label: 'Rare chests', short: 'Rare' },
  { key: 'supply', label: 'Supply drops', short: 'Supply' },
]

export const SPAWN_MODE_ORDER: SpawnModeId[] = [
  'br',
  'ranked',
  'zb',
  'reload',
  'blitz',
  'og',
]

export const SPAWN_RATES_META = {
  season: RAW.season,
  patch: RAW.patch,
  capturedAt: RAW.capturedAt,
  note: RAW.note,
} as const

function resolveCatalogId(name: string, id: string): string | undefined {
  const byName = catalogIdForWeaponName(name)
  if (byName) return byName
  if (getCatalogWeapon(id)) return id
  return undefined
}

function normalizeWeapons(rows: SpawnWeaponRow[] | undefined): SpawnWeaponRow[] {
  return (rows ?? []).map((w) => ({
    ...w,
    catalogId: resolveCatalogId(w.name, w.id),
  }))
}

export function getSpawnModeMeta(): SpawnModeMeta[] {
  return SPAWN_MODE_ORDER.map((id) => {
    const mode = RAW.modes[id]
    return {
      id,
      label: mode?.label ?? id,
      available: Boolean(mode?.available),
    }
  })
}

export function getSpawnWeaponsForMode(mode: SpawnModeId): SpawnWeaponRow[] {
  const entry = RAW.modes[mode]
  if (!entry?.available) return []
  const sourceId = (entry.sameAs as SpawnModeId | undefined) ?? mode
  const source = RAW.modes[sourceId]
  return normalizeWeapons(source?.weapons)
}

export function getSpawnRowByWeaponId(
  weaponId: string,
  mode: SpawnModeId = 'br'
): SpawnWeaponRow | undefined {
  return getSpawnWeaponsForMode(mode).find((w) => w.id === weaponId)
}

export function getSpawnRowByCatalogId(
  catalogId: string,
  mode: SpawnModeId = 'br'
): SpawnWeaponRow | undefined {
  return getSpawnWeaponsForMode(mode).find(
    (w) => w.catalogId === catalogId || w.id === catalogId
  )
}

export function getSpawnRowByName(
  name: string,
  mode: SpawnModeId = 'br'
): SpawnWeaponRow | undefined {
  const needle = name.trim().toLowerCase()
  return getSpawnWeaponsForMode(mode).find((w) => w.name.toLowerCase() === needle)
}

export function formatSpawnPct(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—'
  if (value > 0 && value < 0.1) return '<0.1%'
  if (Number.isInteger(value)) return `${value}%`
  return `${value.toFixed(1)}%`
}

export function sortSpawnWeapons(
  rows: SpawnWeaponRow[],
  source: SpawnSourceKey = 'chest'
): SpawnWeaponRow[] {
  return [...rows].sort((a, b) => {
    const av = a[source] ?? -1
    const bv = b[source] ?? -1
    if (bv !== av) return bv - av
    return a.name.localeCompare(b.name)
  })
}
