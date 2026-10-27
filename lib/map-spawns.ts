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
  'Lifty Lodge',
  'The Battlewoods',
  'WonkeeLand',
  'Frosted Flats',
  'Latte Landing',
  'Sinister Strip',
  'Golden Grove',
  'Shaken Sanctuary',
  'Heatwave Harbor',
  'Calamari Canyon',
  'Cluster Coast',
  'Sunken Shores',
  'Chopped Shop',
]

const COASTAL_POIS = [
  'Heatwave Harbor',
  'Cluster Coast',
  'Sunken Shores',
  'Calamari Canyon',
  'Golden Grove',
]

const NPC_SERVICE =
  'Gold Bar services (Rift / Patch Up / Max Ammo · 500). Which offer is live rotates each match.'

/**
 * Chapter 7 Season 4 Override character pins.
 * Names + POIs from public C7S4 / Fortnitemares coverage (Destructoid 20 Aug 2026,
 * GameRant, Beebom v42.40). Anchored to live Fortnite-API POI coords — not pixel-perfect.
 * Battlewoods / Latte Landing are gone from the named list, so those two vendors
 * use the Fortnitemares POIs those outlets listed instead.
 */
const NPC_POINTS: SpawnPointDef[] = [
  {
    id: 'npc-wrixel',
    layer: 'npcs',
    nearPoi: 'Shaken Sanctuary',
    offsetX: -7000,
    offsetY: -5000,
    label: 'Wrixel',
    note: `Northwest of Shaken Sanctuary, small building. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-phantom',
    layer: 'npcs',
    nearPoi: 'Nightmare Neighborhood',
    offsetX: -6000,
    offsetY: 4000,
    label: 'Phantom',
    note: `Southwest side of Nightmare Neighborhood (Battlewoods pin retired with that named POI). ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-innovation',
    layer: 'npcs',
    nearPoi: 'Freaky Fields',
    offsetX: 1000,
    offsetY: 9000,
    label: 'The Innovation (Slone)',
    note: `South of Freaky Fields (Latte Landing pin retired with that named POI). ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-prophecy',
    layer: 'npcs',
    nearPoi: "Reality's Reign",
    offsetX: 7000,
    offsetY: 8000,
    label: 'The Prophecy (Hope)',
    note: `Southeast of Reality’s Reign. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-bastian',
    layer: 'npcs',
    nearPoi: 'Stone Sanctum',
    offsetX: 800,
    offsetY: 800,
    label: 'Bastian',
    note: `Around the tower in the middle of Stone Sanctum. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-k1tty',
    layer: 'npcs',
    nearPoi: 'Nightmare Neighborhood',
    offsetX: 8000,
    offsetY: -6000,
    label: 'K1ttyW1ns',
    note: `Northeast of Nightmare Neighborhood. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-sonic',
    layer: 'npcs',
    nearPoi: 'Green Hill Zone',
    offsetX: 0,
    offsetY: -2000,
    label: 'Sonic the Hedgehog',
    note: `Hill in the middle of Green Hill Zone. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-grace',
    layer: 'npcs',
    nearPoi: 'Shaken Sanctuary',
    offsetX: -9000,
    offsetY: 1500,
    label: 'Grace Crowne',
    note: `West of Shaken Sanctuary. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-order',
    layer: 'npcs',
    nearPoi: 'Chopped Shop',
    offsetX: 8000,
    offsetY: 7000,
    label: 'The Order',
    note: 'Southeast cliff of Chopped Shop. Hire Scout Specialist · 350 Gold Bars.',
    guaranteed: true,
  },
  {
    id: 'npc-guardian',
    layer: 'npcs',
    nearPoi: 'Stone Sanctum',
    offsetX: -2000,
    offsetY: -10000,
    label: 'The Guardian',
    note: 'North of Stone Sanctum, toward the center swirl. Hire Medic Specialist · 350 Gold Bars.',
    guaranteed: true,
  },
  {
    id: 'npc-peak-scout',
    layer: 'npcs',
    nearPoi: 'Lifty Lodge',
    offsetX: 4000,
    offsetY: 9000,
    label: 'Peak Scout',
    note: `Snowy slope south / southeast of Lifty Lodge. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-singularity',
    layer: 'npcs',
    nearPoi: 'Heatwave Harbor',
    offsetX: 10000,
    offsetY: -12000,
    label: 'The Singularity',
    note: 'Northeast of Heatwave Harbor (toward Stone Sanctum / south of Green Hill). Hire Supply Specialist · 350 Gold Bars.',
    guaranteed: true,
  },
  {
    id: 'npc-mali',
    layer: 'npcs',
    nearPoi: 'Stone Sanctum',
    offsetX: 9000,
    offsetY: -7000,
    label: 'Mali',
    note: `Northeast of Stone Sanctum, southwest of Reality’s Reign. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-vengeance',
    layer: 'npcs',
    nearPoi: 'Golden Grove',
    offsetX: 1500,
    offsetY: -8000,
    label: 'Vengeance Jones',
    note: `North end of Golden Grove, near the cliff. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-freddy',
    layer: 'npcs',
    nearPoi: 'Nightmare Neighborhood',
    offsetX: 0,
    offsetY: 0,
    label: 'Freddy Krueger',
    note: 'Boss at Nightmare Neighborhood. Dumpster Dive Sprite / Freddy’s Nightmare. Can disguise as another character in the POI — interact the suspicious NPC if the boss marker is missing.',
    guaranteed: true,
  },
  {
    id: 'npc-jack-a-nape',
    layer: 'npcs',
    nearPoi: 'Nightmare Neighborhood',
    offsetX: 2000,
    offsetY: 10000,
    label: 'Jack-A-Nape',
    note: `South of Nightmare Neighborhood. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-lucy',
    layer: 'npcs',
    nearPoi: "Geno's Machine",
    offsetX: 0,
    offsetY: 0,
    label: 'Lucy',
    note: `Geno’s Machine landmark. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-knuckles',
    layer: 'npcs',
    nearPoi: 'Green Hill Zone',
    offsetX: -10000,
    offsetY: -8000,
    label: 'Knuckles',
    note: `Northwestern edge of Green Hill Zone. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-geralt',
    layer: 'npcs',
    nearPoi: 'Pac-Man Island',
    offsetX: 1500,
    offsetY: 8000,
    label: 'Geralt of Rivia',
    note: `South of Pac-Man Island. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-champion-focus',
    layer: 'npcs',
    nearPoi: 'Pinky Island',
    offsetX: 8000,
    offsetY: 0,
    label: 'Champion Focus',
    note: `East of Pinky Island. ${NPC_SERVICE}`,
    guaranteed: true,
  },
  {
    id: 'npc-sub-zero',
    layer: 'npcs',
    nearPoi: 'Green Hill Zone',
    offsetX: -8000,
    offsetY: 8000,
    label: 'Sub-Zero',
    note: 'Southwest corner of Green Hill Zone. Duel NPC — not a Gold Bar vendor.',
    guaranteed: true,
  },
  {
    id: 'npc-yeah',
    layer: 'npcs',
    nearPoi: "Reality's Reign",
    offsetX: 0,
    offsetY: -12000,
    label: 'Yeah',
    note: 'Far north of Reality’s Reign. Quest NPC — not a Gold Bar vendor.',
    guaranteed: true,
  },
]

/**
 * Chapter 7 Season 3 (Runners) spawn pins.
 * Anchored to live Fortnite-API POI coords + offsets — approximate planning markers,
 * not pixel-perfect Epic dumps. Sprite chest / vault counts follow community guides.
 */
export const SPAWN_POINTS: SpawnPointDef[] = [
  ...NPC_POINTS,

  // —— Vaults (8 fixed) ——
  { id: 'vault-frosted-epic', layer: 'vaults', nearPoi: 'Frosted Flats', offsetX: 6000, offsetY: 2000, label: 'Epic Sprite Vault', guaranteed: true },
  { id: 'vault-sinister-epic', layer: 'vaults', nearPoi: 'Sinister Strip', offsetX: -3000, offsetY: 4000, label: 'Epic Sprite Vault', guaranteed: true },
  { id: 'vault-heatwave', layer: 'vaults', nearPoi: 'Heatwave Harbor', offsetX: 4000, offsetY: -3000, label: 'Vault', guaranteed: true },
  { id: 'vault-shaken', layer: 'vaults', nearPoi: 'Shaken Sanctuary', offsetX: -5000, offsetY: 3000, label: 'Vault', guaranteed: true },
  { id: 'vault-sunken', layer: 'vaults', nearPoi: 'Sunken Shores', offsetX: 3500, offsetY: -4500, label: 'Vault', guaranteed: true },
  { id: 'vault-battlewoods', layer: 'vaults', nearPoi: 'The Battlewoods', offsetX: 7000, offsetY: 2000, label: 'Vault', guaranteed: true },
  { id: 'vault-wonkee', layer: 'vaults', nearPoi: 'WonkeeLand', offsetX: -4000, offsetY: 5000, label: 'Vault', guaranteed: true },
  { id: 'vault-lifty', layer: 'vaults', nearPoi: 'Lifty Lodge', offsetX: 2500, offsetY: 8000, label: 'Vault', guaranteed: true },

  // —— Sprite Chests (33 community spots by POI density) ——
  ...around('sprite_chests', 'Lifty Lodge', 2, 9000, { seed: 1 }),
  ...around('sprite_chests', 'WonkeeLand', 3, 11000, { seed: 2 }),
  ...around('sprite_chests', 'The Battlewoods', 1, 7000, { seed: 3 }),
  ...around('sprite_chests', 'Latte Landing', 1, 12000, { seed: 4, prefix: 'sprite-collider-beta' }),
  { id: 'sprite-south-wonkee', layer: 'sprite_chests', nearPoi: 'WonkeeLand', offsetX: 2000, offsetY: 16000, label: 'South of Wonkeeland' },
  { id: 'sprite-north-frosted', layer: 'sprite_chests', nearPoi: 'Frosted Flats', offsetX: -1000, offsetY: -14000, label: 'North of Frosted Flats' },
  ...around('sprite_chests', 'Chopped Shop', 1, 6000, { seed: 5 }),
  ...around('sprite_chests', 'Calamari Canyon', 3, 10000, { seed: 6 }),
  { id: 'sprite-zero-point', layer: 'sprite_chests', nearPoi: 'Frosted Flats', offsetX: 18000, offsetY: 22000, label: 'Zero Point' },
  ...around('sprite_chests', 'Frosted Flats', 2, 8000, { seed: 7 }),
  ...around('sprite_chests', 'Golden Grove', 1, 7000, { seed: 8 }),
  { id: 'sprite-south-calamari-0', layer: 'sprite_chests', nearPoi: 'Calamari Canyon', offsetX: 8000, offsetY: 15000, label: 'South of Calamari' },
  { id: 'sprite-south-calamari-1', layer: 'sprite_chests', nearPoi: 'Calamari Canyon', offsetX: -6000, offsetY: 17000, label: 'South of Calamari' },
  ...around('sprite_chests', 'Sinister Strip', 4, 12000, { seed: 9 }),
  ...around('sprite_chests', 'Heatwave Harbor', 3, 11000, { seed: 10 }),
  ...around('sprite_chests', 'Shaken Sanctuary', 3, 10000, { seed: 11 }),
  { id: 'sprite-collider-alpha', layer: 'sprite_chests', nearPoi: 'Shaken Sanctuary', offsetX: -2000, offsetY: -14000, label: 'Collider Corridor Alpha' },
  ...around('sprite_chests', 'Cluster Coast', 1, 7000, { seed: 12 }),
  { id: 'sprite-wettest-bones', layer: 'sprite_chests', nearPoi: 'Sunken Shores', offsetX: 14000, offsetY: -2000, label: 'Wettest Bones Research' },
  { id: 'sprite-crashout', layer: 'sprite_chests', nearPoi: 'Cluster Coast', offsetX: -14000, offsetY: 3000, label: 'Crashout Estates' },
  // Guaranteed vault sprite chests
  ...around('sprite_chests', 'Frosted Flats', 3, 4000, { seed: 20, guaranteed: true, prefix: 'sprite-vault-frosted' }),
  ...around('sprite_chests', 'Sinister Strip', 3, 4000, { seed: 21, guaranteed: true, prefix: 'sprite-vault-sinister' }),

  // —— Rare chests (vault / high-tier POIs) ——
  ...around('rare_chests', 'Frosted Flats', 3, 5000, { seed: 30, guaranteed: true }),
  ...around('rare_chests', 'Sinister Strip', 3, 5000, { seed: 31, guaranteed: true }),
  ...MAJOR_POIS.flatMap((p, i) => around('rare_chests', p, 1, 6500, { seed: 40 + i })),

  // —— Chests (dense planning pins at named POIs) ——
  ...MAJOR_POIS.flatMap((p, i) => around('chests', p, 5, 14000, { seed: 50 + i })),

  // —— Ammo ——
  ...MAJOR_POIS.flatMap((p, i) => around('ammo_boxes', p, 3, 11000, { seed: 70 + i })),

  // —— Machines / pads ——
  ...MAJOR_POIS.flatMap((p, i) => around('vending_machines', p, 1, 5000, { seed: 90 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('mending_machines', p, 1, 7500, { seed: 100 + i })),
  ...['Lifty Lodge', 'Frosted Flats', 'Sinister Strip', 'Heatwave Harbor', 'Shaken Sanctuary', 'WonkeeLand'].flatMap(
    (p, i) => around('launchpads', p, 1, 9000, { seed: 110 + i })
  ),

  // —— Vehicles ——
  ...MAJOR_POIS.flatMap((p, i) => around('cars_sport', p, 1, 10000, { seed: 120 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('cars_suv', p, 1, 13000, { seed: 130 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('boats', p, 2, 16000, { seed: 140 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('offroad_tires', p, 1, 8500, { seed: 150 + i })),
  {
    id: 'batmobile-sinister',
    layer: 'batmobile',
    nearPoi: 'Sinister Strip',
    offsetX: 10000,
    offsetY: -12000,
    label: "Batman's Beach Buggy",
  },
  {
    id: 'batmobile-heatwave',
    layer: 'batmobile',
    nearPoi: 'Heatwave Harbor',
    offsetX: -8000,
    offsetY: 6000,
    label: "Batman's Beach Buggy",
  },
  {
    id: 'batmobile-sunken',
    layer: 'batmobile',
    nearPoi: 'Sunken Shores',
    offsetX: 5000,
    offsetY: 8000,
    label: "Batman's Beach Buggy",
  },

  // —— Mobility / world ——
  ...['Lifty Lodge', 'The Battlewoods', 'Frosted Flats', 'Calamari Canyon', 'Heatwave Harbor'].flatMap(
    (p, i) => around('ziplines', p, 2, 12000, { seed: 160 + i })
  ),
  ...MAJOR_POIS.flatMap((p, i) => around('flushers', p, 1, 6000, { seed: 170 + i })),
  ...['Frosted Flats', 'Sinister Strip', 'Shaken Sanctuary'].flatMap((p, i) =>
    around('teleporters', p, 1, 7000, { seed: 180 + i })
  ),
  ...['Sunken Shores', 'Heatwave Harbor', 'Chopped Shop', 'Cluster Coast'].flatMap((p, i) =>
    around('service_stations', p, 1, 5000, { seed: 190 + i })
  ),
  ...MAJOR_POIS.flatMap((p, i) => around('campfires', p, 2, 9000, { seed: 200 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('noms', p, 2, 10000, { seed: 210 + i })),
  ...['The Battlewoods', 'Golden Grove', 'WonkeeLand', 'Lifty Lodge'].flatMap((p, i) =>
    around('mushrooms', p, 3, 12000, { seed: 220 + i })
  ),
  ...MAJOR_POIS.flatMap((p, i) => around('slurp_barrels', p, 2, 8000, { seed: 230 + i })),
  ...['Heatwave Harbor', 'Sinister Strip', 'Chopped Shop', 'Sunken Shores'].flatMap((p, i) =>
    around('slurp_trucks', p, 1, 11000, { seed: 240 + i })
  ),
  ...COASTAL_POIS.flatMap((p, i) => around('fishing_rods', p, 1, 14000, { seed: 250 + i })),
  ...COASTAL_POIS.flatMap((p, i) => around('fishing_holes', p, 2, 18000, { seed: 260 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('reboot_vans', p, 1, 4000, { seed: 270 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('jobboards_supplydrop', p, 1, 9500, { seed: 280 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('jobboards_treasure', p, 1, 11500, { seed: 290 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('safes', p, 1, 5500, { seed: 300 + i })),
  ...MAJOR_POIS.flatMap((p, i) => around('cash_registers', p, 2, 7500, { seed: 310 + i })),
  ...['The Battlewoods', 'Golden Grove', 'WonkeeLand', 'Latte Landing'].flatMap((p, i) =>
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
