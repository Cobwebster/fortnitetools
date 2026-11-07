import { findPoiByName } from '@/lib/map-data'
import type { SpawnLayerId } from '@/lib/map-layers'

export type SpawnPointDef = {
  id: string
  layer: SpawnLayerId
  /** Match Fortnite-API POI / landmark name */
  nearPoi: string
  offsetX?: number
  offsetY?: number
  label?: string
  /** Extra popup copy (NPC services, hire cost, etc.) */
  note?: string
  /** Guaranteed / high-confidence spawn (e.g. vault sprite chests) */
  guaranteed?: boolean
}

export type ResolvedSpawnPoint = SpawnPointDef & {
  location: { x: number; y: number }
  poiName: string
}

/** Deterministic ring offsets around a POI center (world units). */
function ring(count: number, radius: number, seed = 0): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = []
  for (let i = 0; i < count; i++) {
    const a = ((i + seed * 0.37) / count) * Math.PI * 2
    out.push({
      x: Math.round(Math.cos(a) * radius),
      y: Math.round(Math.sin(a) * radius),
    })
  }
  return out
}

function around(
  layer: SpawnLayerId,
  nearPoi: string,
  count: number,
  radius: number,
  opts?: { prefix?: string; guaranteed?: boolean; seed?: number }
): SpawnPointDef[] {
  const prefix = opts?.prefix ?? layer
  return ring(count, radius, opts?.seed ?? 0).map((o, i) => ({
    id: `${prefix}-${nearPoi.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`,
    layer,
    nearPoi,
    offsetX: o.x,
    offsetY: o.y,
    guaranteed: opts?.guaranteed,
  }))
}

const MAJOR_POIS = [
  'The $.$. Rocky',
  'Arlong Park',
  'Loguetown',
  "Fortune's Fort",
  'Rubber Resort',
  'Windmill Village',
  'Lantern Landing',
  'Loot Lagoon',
  'Plunder Port',
  'Busy Bay',
  'Cursed Cavern',
  'The Chest',
]

const COASTAL_POIS = [
  'The $.$. Rocky',
  'Plunder Port',
  'Busy Bay',
  'Loot Lagoon',
  'Rubber Resort',
  'Windmill Village',
]

const NPC_SERVICE =
  'Follower services are free in Treasure Hunters (Gold Bars vaulted). Offers still rotate — confirm the NPC prompt.'

/**
 * Treasure Hunters NPC pins — Override / Fortnitemares vendors left with that island.
 * Only keep Boss / captain anchors we can name from Epic notes until a full NPC sheet ships.
 */
const NPC_POINTS: SpawnPointDef[] = [
  {
    id: 'npc-asap-rocky',
    layer: 'npcs',
    nearPoi: 'The $.$. Rocky',
    offsetX: 0,
    offsetY: 0,
    label: 'A$AP Rocky',
    note: 'Boss on the battleship. Can drop Shock Rocket (non-Competitive) and Lil’ Flacko. Not guaranteed.',
    guaranteed: true,
  },
]

/**
 * Treasure Hunters spawn pins.
 * Anchored to live Fortnite-API Crossbones Isle POI coords + offsets — approximate
 * planning markers, not pixel-perfect Epic dumps. Vending machines are vaulted;
 * Gold Bars are vaulted (follower services free).
 */
export const SPAWN_POINTS: SpawnPointDef[] = [
  ...NPC_POINTS,

  // —— Vaults (planning rings on hot POIs) ——
  { id: 'vault-rocky', layer: 'vaults', nearPoi: 'The $.$. Rocky', offsetX: 5000, offsetY: 2000, label: 'Vault', guaranteed: true },
  { id: 'vault-arlong', layer: 'vaults', nearPoi: 'Arlong Park', offsetX: -4000, offsetY: 3000, label: 'Vault', guaranteed: true },
  { id: 'vault-fort', layer: 'vaults', nearPoi: "Fortune's Fort", offsetX: 3000, offsetY: -4000, label: 'Vault', guaranteed: true },
  { id: 'vault-loguetown', layer: 'vaults', nearPoi: 'Loguetown', offsetX: 6000, offsetY: 2000, label: 'Vault', guaranteed: true },
  { id: 'vault-rubber', layer: 'vaults', nearPoi: 'Rubber Resort', offsetX: -3500, offsetY: 4500, label: 'Vault', guaranteed: true },
  { id: 'vault-plunder', layer: 'vaults', nearPoi: 'Plunder Port', offsetX: 4000, offsetY: -5000, label: 'Vault', guaranteed: true },

  // —— Sprite Chests (Wanted Poster digs still beat these rings) ——
  ...MAJOR_POIS.flatMap((p, i) => around('sprite_chests', p, 2, 10000, { seed: 1 + i })),
  ...around('sprite_chests', 'The $.$. Rocky', 2, 5000, { seed: 20, guaranteed: true, prefix: 'sprite-boss-ship' }),
  ...around('sprite_chests', "Fortune's Fort", 2, 5000, { seed: 21, guaranteed: true, prefix: 'sprite-uzi-fort' }),

  // —— Rare chests ——
  ...around('rare_chests', 'The $.$. Rocky', 2, 5000, { seed: 30, guaranteed: true }),
  ...around('rare_chests', 'Arlong Park', 2, 5000, { seed: 31, guaranteed: true }),
  ...MAJOR_POIS.flatMap((p, i) => around('rare_chests', p, 1, 6500, { seed: 40 + i })),

  // —— Chests / ammo ——
  ...MAJOR_POIS.flatMap((p, i) => around('chests', p, 5, 14000, { seed: 50 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('ammo_boxes', p, 3, 11000, { seed: 70 + i })),

  // —— Machines / pads (vending vaulted — pins kept for Zero Build Pocket-O-Matic planning) ——
  ...MAJOR_POIS.flatMap((p, i) => around('vending_machines', p, 1, 5000, { seed: 90 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('mending_machines', p, 1, 7500, { seed: 100 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('launchpads', p, 1, 9000, { seed: 110 + i })),

  // —— Vehicles ——
  ...MAJOR_POIS.flatMap((p, i) => around('cars_sport', p, 1, 10000, { seed: 120 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('cars_suv', p, 1, 13000, { seed: 130 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('boats', p, 2, 16000, { seed: 140 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('offroad_tires', p, 1, 8500, { seed: 150 + i })),

  // —— Mobility / world ——
  ...MAJOR_POIS.flatMap((p, i) => around('ziplines', p, 2, 12000, { seed: 160 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('flushers', p, 1, 6000, { seed: 170 + i })),
  ...['Lantern Landing', 'Cursed Cavern', 'Loguetown'].flatMap((p, i) =>
    around('teleporters', p, 1, 7000, { seed: 180 + i })
  ),
  ...COASTAL_POIS.flatMap((p, i) => around('service_stations', p, 1, 5000, { seed: 190 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('campfires', p, 2, 9000, { seed: 200 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('noms', p, 2, 10000, { seed: 210 + i })),
  ...['Windmill Village', 'Rubber Resort', 'Loot Lagoon', 'Cursed Cavern'].flatMap((p, i) =>
    around('mushrooms', p, 3, 12000, { seed: 220 + i })
  ),
  ...MAJOR_POIS.flatMap((p, i) => around('slurp_barrels', p, 2, 8000, { seed: 230 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('slurp_trucks', p, 1, 11000, { seed: 240 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('fishing_rods', p, 1, 14000, { seed: 250 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('fishing_holes', p, 2, 18000, { seed: 260 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('reboot_vans', p, 1, 4000, { seed: 270 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('jobboards_supplydrop', p, 1, 9500, { seed: 280 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('jobboards_treasure', p, 1, 11500, { seed: 290 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('safes', p, 1, 5500, { seed: 300 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('cash_registers', p, 2, 7500, { seed: 310 + i })),
  ...['Windmill Village', 'Rubber Resort', 'Cursed Cavern', 'Lantern Landing'].flatMap((p, i) =>
    around('bushes', p, 3, 13000, { seed: 320 + i })
  ),
  ...MAJOR_POIS.flatMap((p, i) => around('dumpsters', p, 2, 8500, { seed: 330 + i })),
]

export const SPAWN_LAYER_COLOR: Record<SpawnLayerId, string> = {
  npcs: '#f472b6',
  extraction_sites: '#fbbf24',
  batmobile: '#1e293b',
  vaults: '#f59e0b',
  sprite_chests: '#ec4899',
  chests: '#eab308',
  rare_chests: '#a855f7',
  ammo_boxes: '#94a3b8',
  vending_machines: '#22d3ee',
  mending_machines: '#34d399',
  launchpads: '#60a5fa',
  cars_sport: '#f87171',
  cars_suv: '#fb923c',
  boats: '#38bdf8',
  offroad_tires: '#a3a3a3',
  ziplines: '#c4b5fd',
  flushers: '#86efac',
  teleporters: '#e879f9',
  service_stations: '#fdba74',
  campfires: '#f97316',
  noms: '#4ade80',
  mushrooms: '#a78bfa',
  slurp_barrels: '#2dd4bf',
  slurp_trucks: '#14b8a6',
  fishing_rods: '#67e8f9',
  fishing_holes: '#06b6d4',
  reboot_vans: '#3b82f6',
  jobboards_supplydrop: '#818cf8',
  jobboards_treasure: '#fbbf24',
  safes: '#facc15',
  cash_registers: '#84cc16',
  bushes: '#22c55e',
  dumpsters: '#78716c',
}

/** Real Fortnite item / UI icons for map pins + sidebar (not colored dots). */
export const SPAWN_LAYER_ICON: Record<SpawnLayerId, string> = {
  npcs: '/images/guides/select-character.webp',
  extraction_sites: '/images/loadout/pulse_scanner.png',
  batmobile: '/images/loadout/batman_grapnel.png',
  vaults: '/images/loadout/mat_metal.png',
  sprite_chests: '/images/loadout/shock_rocks.png',
  chests: '/images/loadout/mat_wood.png',
  rare_chests: '/images/loadout/golden_apple.png',
  ammo_boxes: '/images/loadout/heavy_impact.png',
  vending_machines: '/images/loadout/chug_jug.png',
  mending_machines: '/images/loadout/medkit.png',
  launchpads: '/images/loadout/launch_pad.png',
  cars_sport: '/images/loadout/overdrive_grenade.png',
  cars_suv: '/images/loadout/chaos_exploder.png',
  boats: '/images/loadout/unstable_bounce_grenade.webp',
  offroad_tires: '/images/loadout/mat_stone.png',
  ziplines: '/images/loadout/grappler.png',
  flushers: '/images/loadout/rift.png',
  teleporters: '/images/loadout/rift.png',
  service_stations: '/images/loadout/business_turret.png',
  campfires: '/images/loadout/pepper.png',
  noms: '/images/loadout/apple.png',
  mushrooms: '/images/loadout/flowberry.png',
  slurp_barrels: '/images/loadout/slap_juice.png',
  slurp_trucks: '/images/loadout/guzzle_juice.png',
  fishing_rods: '/images/loadout/impulse.png',
  fishing_holes: '/images/loadout/chug_splash.png',
  reboot_vans: '/images/loadout/self_revive.png',
  jobboards_supplydrop: '/images/icons/glider.png',
  jobboards_treasure: '/images/icons/crown.png',
  safes: '/images/icons/vbucks.png',
  cash_registers: '/images/icons/xp.png',
  bushes: '/images/loadout/bandages.png',
  dumpsters: '/images/loadout/cluster_clinger.png',
}

export const POI_CONTEST_ICON: Record<'hot' | 'balanced' | 'edge', string> = {
  hot: '/images/icons/crown.png',
  balanced: '/images/icons/map.png',
  edge: '/images/icons/glider.png',
}

export const MAP_LANDMARK_ICON = '/images/icons/pickaxe.png'
export const MAP_EXTRACT_ICON = '/images/loadout/pulse_scanner.png'

export function resolveSpawnPoints(
  pois: { name: string; location: { x: number; y: number } }[]
): ResolvedSpawnPoint[] {
  const out: ResolvedSpawnPoint[] = []
  for (const point of SPAWN_POINTS) {
    const poi = findPoiByName(pois, point.nearPoi)
    if (!poi) continue
    out.push({
      ...point,
      poiName: poi.name,
      location: {
        x: poi.location.x + (point.offsetX ?? 0),
        y: poi.location.y + (point.offsetY ?? 0),
      },
    })
  }
  return out
}

export function countSpawnsByLayer(points: ResolvedSpawnPoint[]) {
  const counts: Partial<Record<SpawnLayerId, number>> = {}
  for (const p of points) {
    counts[p.layer] = (counts[p.layer] ?? 0) + 1
  }
  return counts
}
