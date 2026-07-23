import { WEAPONS, type WeaponStat } from './weapons'

export type LoadoutSlot = 'shotgun' | 'ar' | 'smg' | 'heal' | 'mobility'

export type UtilityItem = {
  id: string
  name: string
  slot: 'heal' | 'mobility'
  rarity: string
  image: string
  note: string
}

export const HEALS: UtilityItem[] = [
  { id: 'medkit', name: 'Med Kit', slot: 'heal', rarity: 'Uncommon', image: '/images/loadout/medkit.png', note: 'Full HP restore · slow channel' },
  { id: 'big_pot', name: 'Shield Potion', slot: 'heal', rarity: 'Rare', image: '/images/loadout/big_pot.png', note: '+50 shield (to 100)' },
  { id: 'small_pot', name: 'Small Shield Potion', slot: 'heal', rarity: 'Uncommon', image: '/images/loadout/small_pot.png', note: '+50 shield (caps at 50)' },
  { id: 'bandages', name: 'Bandages', slot: 'heal', rarity: 'Common', image: '/images/loadout/bandages.png', note: '+15 HP · stackable' },
  { id: 'chug_splash', name: 'Chug Splash', slot: 'heal', rarity: 'Rare', image: '/images/loadout/chug_splash.png', note: 'AoE HP + shield splash' },
  { id: 'flowberry', name: 'FlowBerry', slot: 'heal', rarity: 'Rare', image: '/images/loadout/flowberry.png', note: 'Seasonal heal / mobility hybrid' },
  { id: 'slap_juice', name: 'Slap Juice', slot: 'heal', rarity: 'Rare', image: '/images/loadout/slap_juice.png', note: 'Overshield + infinite stamina window' },
]

export const MOBILITY: UtilityItem[] = [
  { id: 'seven_sliders', name: 'Seven Sliders', slot: 'mobility', rarity: 'Epic', image: '/images/loadout/seven_sliders.png', note: 'Slide reposition + ADS slow-mo' },
  { id: 'shock_rocks', name: 'Shock Rocks', slot: 'mobility', rarity: 'Epic', image: '/images/loadout/shock_rocks.png', note: 'Triple midair jump · rotate / fight' },
  { id: 'shockwave', name: 'Shockwave Grenade', slot: 'mobility', rarity: 'Epic', image: '/images/loadout/shockwave.png', note: 'Knock + rotate without fall damage' },
  { id: 'crash_pad', name: 'Crash Pad', slot: 'mobility', rarity: 'Rare', image: '/images/loadout/crash_pad.png', note: 'Bounce pad · vertical escape' },
  { id: 'launch_pad', name: 'Launch Pad', slot: 'mobility', rarity: 'Epic', image: '/images/loadout/launch_pad.png', note: 'Glider redeploy rotate' },
  { id: 'impulse', name: 'Impulse Grenade', slot: 'mobility', rarity: 'Rare', image: '/images/loadout/impulse.png', note: 'Knock teammates / yourself' },
]

export const SLOT_META: Record<
  LoadoutSlot,
  { label: string; hint: string; weaponCategories?: WeaponStat['category'][] }
> = {
  shotgun: { label: 'Shotgun', hint: 'Close range', weaponCategories: ['Shotgun'] },
  ar: { label: 'AR / Rifle', hint: 'Mid–long', weaponCategories: ['AR', 'Sniper'] },
  smg: { label: 'SMG / Sidearm', hint: 'Cleanup', weaponCategories: ['SMG', 'Pistol'] },
  heal: { label: 'Heals', hint: 'Sustain' },
  mobility: { label: 'Mobility', hint: 'Rotate / fight' },
}

export function weaponsForSlot(slot: LoadoutSlot): WeaponStat[] {
  const cats = SLOT_META[slot].weaponCategories
  if (!cats) return []
  return WEAPONS.filter((w) => cats.includes(w.category))
}

export function utilityForSlot(slot: LoadoutSlot): UtilityItem[] {
  if (slot === 'heal') return HEALS
  if (slot === 'mobility') return MOBILITY
  return []
}

export const PRESETS: {
  id: string
  name: string
  blurb: string
  slots: Record<LoadoutSlot, string>
}[] = [
  {
    id: 'aggressive',
    name: 'Aggressive',
    blurb: 'Crack → spray → mid pressure',
    slots: {
      shotgun: 'extending_focus',
      ar: 'surgical_burst',
      smg: 'stinger_smg',
      heal: 'small_pot',
      mobility: 'seven_sliders',
    },
  },
  {
    id: 'box',
    name: 'Box / Pump',
    blurb: 'First-shot punish in builds',
    slots: {
      shotgun: 'striker_pump',
      ar: 'warforged_ar',
      smg: 'lancehead',
      heal: 'big_pot',
      mobility: 'shockwave',
    },
  },
  {
    id: 'zone',
    name: 'Zone / Placement',
    blurb: 'Safer mid-game + rotate tools',
    slots: {
      shotgun: 'maven_auto',
      ar: 'surgical_burst',
      smg: 'rapid_fire_smg',
      heal: 'medkit',
      mobility: 'launch_pad',
    },
  },
]

export const LOADOUT_SLOTS: LoadoutSlot[] = ['shotgun', 'ar', 'smg', 'heal', 'mobility']

/** Short query keys for shareable loadout URLs. */
export const LOADOUT_PARAM_KEYS: Record<LoadoutSlot, string> = {
  shotgun: 'sg',
  ar: 'ar',
  smg: 'smg',
  heal: 'heal',
  mobility: 'mob',
}

export const DEFAULT_LOADOUT: Record<LoadoutSlot, string> = { ...PRESETS[0].slots }

function validIdsForSlot(slot: LoadoutSlot): Set<string> {
  if (slot === 'heal') return new Set(HEALS.map((h) => h.id))
  if (slot === 'mobility') return new Set(MOBILITY.map((m) => m.id))
  return new Set(weaponsForSlot(slot).map((w) => w.id))
}

export function loadoutsEqual(a: Record<LoadoutSlot, string>, b: Record<LoadoutSlot, string>) {
  return LOADOUT_SLOTS.every((slot) => a[slot] === b[slot])
}

/** Parse share params from a query string. Returns null if no loadout params present. */
export function parseLoadoutSearch(search: string): Record<LoadoutSlot, string> | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const hasAny = LOADOUT_SLOTS.some((slot) => params.has(LOADOUT_PARAM_KEYS[slot]))
  if (!hasAny) return null

  const next: Record<LoadoutSlot, string> = { ...DEFAULT_LOADOUT }
  for (const slot of LOADOUT_SLOTS) {
    const raw = params.get(LOADOUT_PARAM_KEYS[slot])
    if (!raw) continue
    if (validIdsForSlot(slot).has(raw)) next[slot] = raw
  }
  return next
}

export function buildLoadoutQuery(selection: Record<LoadoutSlot, string>): string {
  const params = new URLSearchParams()
  for (const slot of LOADOUT_SLOTS) {
    params.set(LOADOUT_PARAM_KEYS[slot], selection[slot])
  }
  return params.toString()
}

export function buildLoadoutSharePath(selection: Record<LoadoutSlot, string>): string {
  return `/tools/loadout-builder?${buildLoadoutQuery(selection)}`
}
