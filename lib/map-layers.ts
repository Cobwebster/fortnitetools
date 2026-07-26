/** Map mode + spawn/quest filter catalog for the interactive map sidebar. */

export type MapModeId =
  | 'br'
  | 'og'
  | 'blitz-venture'
  | 'blitz-stranger-things'
  | 'blitz-starfall'
  | 'blitz-stark'
  | 'reload-venture'
  | 'reload-oasis'
  | 'reload-slurp-rush'
  | 'reload-squid'
  | 'reload-surfcity'
  | 'reload-nitemare'
  | 'reload-elite'

export type MapMode = {
  id: MapModeId
  label: string
  /** Only Battle Royale is wired to Fortnite-API live map data today. */
  available: boolean
  badge?: 'new'
}

export const MAP_MODES: MapMode[] = [
  { id: 'br', label: 'Battle Royale', available: true },
  { id: 'og', label: 'OG', available: false },
  { id: 'blitz-venture', label: 'Blitz - Venture', available: false },
  { id: 'blitz-stranger-things', label: 'Blitz - Stranger Things', available: false },
  { id: 'blitz-starfall', label: 'Blitz - Starfall Island', available: false },
  { id: 'blitz-stark', label: 'Blitz - Stark Island', available: false },
  { id: 'reload-venture', label: 'Reload - Venture', available: false },
  { id: 'reload-oasis', label: 'Reload - Oasis', available: false },
  { id: 'reload-slurp-rush', label: 'Reload - Slurp Rush', available: false },
  { id: 'reload-squid', label: 'Reload - Squid Grounds', available: false },
  { id: 'reload-surfcity', label: 'Reload - Surf City', available: false },
  { id: 'reload-nitemare', label: 'Reload - Nitemare Island', available: false },
  { id: 'reload-elite', label: 'Reload - Elite Stronghold', available: false, badge: 'new' },
]

export type SpawnLayerId =
  | 'extraction_sites'
  | 'batmobile'
  | 'vaults'
  | 'sprite_chests'
  | 'chests'
  | 'rare_chests'
  | 'ammo_boxes'
  | 'vending_machines'
  | 'mending_machines'
  | 'launchpads'
  | 'cars_sport'
  | 'cars_suv'
  | 'boats'
  | 'offroad_tires'
  | 'ziplines'
  | 'flushers'
  | 'teleporters'
  | 'service_stations'
  | 'campfires'
  | 'noms'
  | 'mushrooms'
  | 'slurp_barrels'
  | 'slurp_trucks'
  | 'fishing_rods'
  | 'fishing_holes'
  | 'reboot_vans'
  | 'jobboards_supplydrop'
  | 'jobboards_treasure'
  | 'safes'
  | 'cash_registers'
  | 'bushes'
  | 'dumpsters'

export type SpawnLayer = {
  id: SpawnLayerId
  label: string
  hint?: string
}

export const SPAWN_LAYERS: SpawnLayer[] = [
  { id: 'extraction_sites', label: 'Extraction Sites' },
  { id: 'batmobile', label: "Batman's Beach Buggy" },
  { id: 'vaults', label: 'Vaults' },
  { id: 'sprite_chests', label: 'Sprite Chests' },
  {
    id: 'chests',
    label: 'Chests',
    hint: 'gold outline = high-confidence / dense POI pins',
  },
  { id: 'rare_chests', label: 'Rare Chests' },
  { id: 'ammo_boxes', label: 'Ammo Boxes' },
  { id: 'vending_machines', label: 'Vending Machines' },
  { id: 'mending_machines', label: 'Mending Machines' },
  { id: 'launchpads', label: 'Launch Pads' },
  { id: 'cars_sport', label: 'Cars (Whiplash)' },
  { id: 'cars_suv', label: 'Cars (TrailSmasher)' },
  { id: 'boats', label: 'Motorboats' },
  { id: 'offroad_tires', label: 'Off-Road Tires' },
  { id: 'ziplines', label: 'Ziplines' },
  { id: 'flushers', label: 'Port-a-Potty' },
  { id: 'teleporters', label: 'Teleporters' },
  { id: 'service_stations', label: 'Service Stations' },
  { id: 'campfires', label: 'Campfires' },
  { id: 'noms', label: 'Produce Boxes' },
  { id: 'mushrooms', label: 'Mushrooms' },
  { id: 'slurp_barrels', label: 'Slurp Barrels' },
  { id: 'slurp_trucks', label: 'Slurp Trucks' },
  { id: 'fishing_rods', label: 'Fishing Rods' },
  { id: 'fishing_holes', label: 'Fishing Spots' },
  { id: 'reboot_vans', label: 'Reboot Vans' },
  {
    id: 'jobboards_supplydrop',
    label: 'Job Boards',
    hint: 'Supply Drop',
  },
  {
    id: 'jobboards_treasure',
    label: 'Job Boards',
    hint: 'Treasure',
  },
  { id: 'safes', label: 'Safes' },
  { id: 'cash_registers', label: 'Cash Registers' },
  { id: 'bushes', label: 'Bushes' },
  { id: 'dumpsters', label: 'Dumpsters' },
]

/** Default layers on when the map loads. */
export const DEFAULT_ACTIVE_SPAWNS: SpawnLayerId[] = ['extraction_sites']

export type QuestLayer = {
  id: string
  label: string
  available: boolean
  children?: { id: string; label: string; available: boolean }[]
}

export const QUEST_LAYERS: QuestLayer[] = [
  { id: 'john-wick-dog', label: "John Wick's Dog", available: false },
  {
    id: 'stealth-guardian',
    label: 'Stealth Guardian',
    available: false,
    children: [
      { id: 'stealth-arms', label: 'Arms', available: false },
      { id: 'stealth-torso', label: 'Torso', available: false },
      { id: 'stealth-helmet', label: 'Helmet', available: false },
    ],
  },
]
