import { WEAPONS, getWeapon, type WeaponStat } from './weapons'

export type LoadoutSlot = 'shotgun' | 'ar' | 'smg' | 'heal' | 'mobility'

export type UtilityItem = {
  id: string
  name: string
  slot: 'heal' | 'mobility'
  rarity: string
  image: string
  note: string
  /** Rough sustain score contribution (heals) or rotate score (utility). */
  score?: number
  /** Suggested stack size when this item is equipped. */
  defaultStack?: number
}

export type MatsState = {
  wood: number
  stone: number
  metal: number
}

export type AmmoState = {
  shells: number
  light: number
  medium: number
  heavy: number
}

export type LoadoutBundle = {
  slots: Record<LoadoutSlot, string>
  mats: MatsState
  ammo: AmmoState
  healStack: number
}

export type UseCaseTag =
  | 'Ranked'
  | 'Pubs'
  | 'Zero Build'
  | 'Contest'
  | 'Zone'
  | 'Duo'
  | 'Fortnitemares'

export type LoadoutPreset = {
  id: string
  name: string
  blurb: string
  tags: UseCaseTag[]
  slots: Record<LoadoutSlot, string>
  mats: MatsState
  ammo?: Partial<AmmoState>
  healStack?: number
}

export type KitAxis = 'close' | 'mid' | 'spray' | 'sustain' | 'rotate' | 'build'

export const MAT_CAP = 500
export const HEAL_STACK_MAX = 6

export const DEFAULT_MATS: MatsState = { wood: 300, stone: 200, metal: 100 }

export const DEFAULT_AMMO: AmmoState = {
  shells: 20,
  light: 120,
  medium: 180,
  heavy: 0,
}

export const MAT_META: {
  key: keyof MatsState
  label: string
  image: string
  color: string
}[] = [
  { key: 'wood', label: 'Wood', image: '/images/loadout/mat_wood.png', color: '#e0a85c' },
  { key: 'stone', label: 'Stone', image: '/images/loadout/mat_stone.png', color: '#c4785e' },
  { key: 'metal', label: 'Metal', image: '/images/loadout/mat_metal.png', color: '#8eb0c8' },
]

export const AMMO_META: {
  key: keyof AmmoState
  label: string
  hint: string
}[] = [
  { key: 'shells', label: 'Shells', hint: 'Shotguns' },
  { key: 'light', label: 'Light', hint: 'Pistols / SMG' },
  { key: 'medium', label: 'Medium', hint: 'ARs' },
  { key: 'heavy', label: 'Heavy', hint: 'Snipers' },
]

export const MAT_PRESETS: { id: string; name: string; blurb: string; mats: MatsState }[] = [
  {
    id: 'contest',
    name: 'Contest drop',
    blurb: 'Wood spike · farm as you fight',
    mats: { wood: 80, stone: 0, metal: 0 },
  },
  {
    id: 'mid',
    name: 'Mid-game',
    blurb: 'Comfortable retakes + pieces',
    mats: { wood: 300, stone: 200, metal: 100 },
  },
  {
    id: 'endgame',
    name: 'Ranked endgame',
    blurb: 'Cap all three · no excuses',
    mats: { wood: 500, stone: 500, metal: 500 },
  },
  {
    id: 'zb',
    name: 'Zero Build',
    blurb: 'Mats unused · cover from natural',
    mats: { wood: 0, stone: 0, metal: 0 },
  },
]

/** Active C7S4 heals / consumables (floor + chests + Loot Hack returns). */
export const HEALS: UtilityItem[] = [
  {
    id: 'medkit',
    name: 'Med Kit',
    slot: 'heal',
    rarity: 'Uncommon',
    image: '/images/loadout/medkit.png',
    note: 'Full HP restore · slow channel',
    score: 4,
    defaultStack: 2,
  },
  {
    id: 'bandages',
    name: 'Bandages',
    slot: 'heal',
    rarity: 'Common',
    image: '/images/loadout/bandages.png',
    note: '+15 HP · stackable',
    score: 2,
    defaultStack: 5,
  },
  {
    id: 'apple',
    name: 'Apple',
    slot: 'heal',
    rarity: 'Common',
    image: '/images/loadout/apple.png',
    note: '+15 HP · produce boxes',
    score: 1,
    defaultStack: 3,
  },
  {
    id: 'golden_apple',
    name: 'Golden Apple',
    slot: 'heal',
    rarity: 'Legendary',
    image: '/images/loadout/golden_apple.png',
    note: 'Big HP + shield burst · rare find',
    score: 5,
    defaultStack: 1,
  },
  {
    id: 'pepper',
    name: 'Pepper',
    slot: 'heal',
    rarity: 'Uncommon',
    image: '/images/loadout/pepper.png',
    note: '+10 HP + short speed · produce boxes',
    score: 2,
    defaultStack: 3,
  },
  {
    id: 'small_pot',
    name: 'Small Shield Potion',
    slot: 'heal',
    rarity: 'Uncommon',
    image: '/images/loadout/small_pot.png',
    note: '+50 shield (caps at 50)',
    score: 4,
    defaultStack: 3,
  },
  {
    id: 'big_pot',
    name: 'Shield Potion',
    slot: 'heal',
    rarity: 'Rare',
    image: '/images/loadout/big_pot.png',
    note: '+50 shield (to 100)',
    score: 5,
    defaultStack: 2,
  },
  {
    id: 'chug_splash',
    name: 'Chug Splash',
    slot: 'heal',
    rarity: 'Rare',
    image: '/images/loadout/chug_splash.png',
    note: 'AoE HP + shield · often Loot Hack',
    score: 5,
    defaultStack: 3,
  },
  {
    id: 'chug_jug',
    name: 'Chug Jug',
    slot: 'heal',
    rarity: 'Legendary',
    image: '/images/loadout/chug_jug.png',
    note: 'Full HP + shield · long drink',
    score: 5,
    defaultStack: 1,
  },
  {
    id: 'guzzle_juice',
    name: 'Guzzle Juice',
    slot: 'heal',
    rarity: 'Epic',
    image: '/images/loadout/guzzle_juice.png',
    note: 'Fast HP sip · fight sustain',
    score: 4,
    defaultStack: 2,
  },
  {
    id: 'flowberry',
    name: 'FlowBerry',
    slot: 'heal',
    rarity: 'Rare',
    image: '/images/loadout/flowberry.png',
    note: 'Heal / mobility hybrid',
    score: 3,
    defaultStack: 2,
  },
  {
    id: 'slap_juice',
    name: 'Slap Juice',
    slot: 'heal',
    rarity: 'Rare',
    image: '/images/loadout/slap_juice.png',
    note: 'Overshield + stamina window',
    score: 4,
    defaultStack: 2,
  },
  {
    id: 'self_revive',
    name: 'Self-Revive Device',
    slot: 'heal',
    rarity: 'Legendary',
    image: '/images/loadout/self_revive.png',
    note: 'Self-rez when downed',
    score: 3,
    defaultStack: 1,
  },
]

/**
 * Mobility + fight utility for the 5th hotbar slot.
 * Override / Fortnitemares pool — confirm in-game after hotfixes.
 */
export const MOBILITY: UtilityItem[] = [
  {
    id: 'sonic_sneakers',
    name: 'Sonic Power Sneakers',
    slot: 'mobility',
    rarity: 'Mythic',
    image: '/images/loadout/seven_sliders.png',
    note: 'Spin Dash / Spin Attack · Override',
    score: 5,
  },
  {
    id: 'overdrive_grenade',
    name: 'Overdrive Grenade',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/overdrive_grenade.png',
    note: 'Speed / overdrive throw · unvault',
    score: 4,
  },
  {
    id: 'bass_boost',
    name: 'Bass Boost',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/impulse.png',
    note: 'Knock / boost · often Loot Hack',
    score: 3,
  },
  {
    id: 'shockwave',
    name: 'Shockwave Grenade',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/shockwave.png',
    note: 'Knock + rotate without fall damage',
    score: 5,
  },
  {
    id: 'shock_rocks',
    name: 'Shockwave Rocks',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/shock_rocks.png',
    note: 'Stackable knock · farm / chests',
    score: 4,
  },
  {
    id: 'crash_pad_jr',
    name: 'Crash Pad Jr.',
    slot: 'mobility',
    rarity: 'Uncommon',
    image: '/images/loadout/crash_pad.png',
    note: 'Bounce pad · vertical escape',
    score: 3,
  },
  {
    id: 'unstable_bounce',
    name: 'Unstable Bounce Grenade',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/unstable_bounce_grenade.webp',
    note: 'Chaotic bounce rotate',
    score: 3,
  },
  {
    id: 'launch_pad',
    name: 'Launch Pad',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/launch_pad.png',
    note: 'Glider redeploy rotate',
    score: 4,
  },
  {
    id: 'impulse',
    name: 'Impulse Grenade',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/impulse.png',
    note: 'Knock teammates / yourself',
    score: 3,
  },
  {
    id: 'grappler',
    name: 'Grappler',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/grappler.png',
    note: 'Swing mobility',
    score: 4,
  },
  {
    id: 'batman_grapnel',
    name: 'Batman Grapnel Gun',
    slot: 'mobility',
    rarity: 'Mythic',
    image: '/images/loadout/batman_grapnel.png',
    note: 'Mythic swing · limited charges',
    score: 5,
  },
  {
    id: 'rift',
    name: 'Rift-to-Go',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/rift.png',
    note: 'Sky rotate · high ground',
    score: 5,
  },
  {
    id: 'cluster_clinger',
    name: 'Cluster Clinger',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/cluster_clinger.png',
    note: 'Stick bomb · box clear',
    score: 2,
  },
  {
    id: 'shield_breaker_emp',
    name: 'Shield Breaker EMP',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/shield_breaker_emp.png',
    note: 'Strip shields · fight opener',
    score: 3,
  },
  {
    id: 'pulse_scanner',
    name: 'Pulse Scanner',
    slot: 'mobility',
    rarity: 'Rare',
    image: '/images/loadout/pulse_scanner.png',
    note: 'Info ping · third-party radar',
    score: 2,
  },
  {
    id: 'business_turret',
    name: 'Business Turret',
    slot: 'mobility',
    rarity: 'Epic',
    image: '/images/loadout/business_turret.png',
    note: 'Deployable pressure · hold angles',
    score: 2,
  },
]

export const SLOT_META: Record<
  LoadoutSlot,
  { label: string; hint: string; key: string; weaponCategories?: WeaponStat['category'][] }
> = {
  shotgun: { label: 'Shotgun', hint: 'Close range', key: '1', weaponCategories: ['Shotgun'] },
  ar: { label: 'AR / Rifle', hint: 'Mid–long', key: '2', weaponCategories: ['AR', 'Sniper'] },
  smg: { label: 'SMG / Sidearm', hint: 'Cleanup', key: '3', weaponCategories: ['SMG', 'Pistol'] },
  heal: { label: 'Heals', hint: 'Sustain', key: '4' },
  mobility: { label: 'Utility', hint: 'Move / gadgets', key: '5' },
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

export function getUtility(id: string): UtilityItem | undefined {
  return [...HEALS, ...MOBILITY].find((u) => u.id === id)
}

export const PRESETS: LoadoutPreset[] = [
  {
    id: 'aggressive',
    name: 'Aggressive pubs',
    blurb: '8-Bit spray → Drum mid → Sonic rotate',
    tags: ['Pubs', 'Contest'],
    slots: {
      shotgun: 'eight_bit_shotgun',
      ar: 'drum_gun',
      smg: 'tactical_pistol',
      heal: 'small_pot',
      mobility: 'sonic_sneakers',
    },
    mats: { wood: 200, stone: 50, metal: 0 },
    ammo: { shells: 30, light: 150, medium: 200, heavy: 0 },
    healStack: 3,
  },
  {
    id: 'box',
    name: 'Box / Pump',
    blurb: 'Classic pump crack + AR hold',
    tags: ['Ranked', 'Pubs'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'assault_rifle',
      smg: 'ranger_pistol',
      heal: 'big_pot',
      mobility: 'shockwave',
    },
    mats: { wood: 400, stone: 300, metal: 200 },
    ammo: { shells: 25, light: 120, medium: 200, heavy: 0 },
    healStack: 2,
  },
  {
    id: 'zone',
    name: 'Zone / Placement',
    blurb: 'Safer mid-game + Overdrive rotate',
    tags: ['Zone', 'Ranked'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'ranger_assault_rifle',
      smg: 'dual_pistols',
      heal: 'medkit',
      mobility: 'overdrive_grenade',
    },
    mats: { wood: 500, stone: 400, metal: 300 },
    ammo: { shells: 20, light: 100, medium: 220, heavy: 0 },
    healStack: 2,
  },
  {
    id: 'ranked-endgame',
    name: 'Ranked endgame',
    blurb: 'Full mats · Shockwaves · bigs · no greed',
    tags: ['Ranked', 'Zone'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'ranger_assault_rifle',
      smg: 'tactical_pistol',
      heal: 'chug_splash',
      mobility: 'shockwave',
    },
    mats: { wood: 500, stone: 500, metal: 500 },
    ammo: { shells: 30, light: 150, medium: 250, heavy: 0 },
    healStack: 3,
  },
  {
    id: 'contest-drop',
    name: 'Contested POI',
    blurb: 'First shotgun + smalls · farm wood while fighting',
    tags: ['Contest', 'Pubs'],
    slots: {
      shotgun: 'eight_bit_shotgun',
      ar: 'assault_rifle',
      smg: 'ranger_pistol',
      heal: 'small_pot',
      mobility: 'shock_rocks',
    },
    mats: { wood: 80, stone: 0, metal: 0 },
    ammo: { shells: 15, light: 60, medium: 90, heavy: 0 },
    healStack: 2,
  },
  {
    id: 'zero-build',
    name: 'Zero Build',
    blurb: 'Natural cover kit · mobility over mats',
    tags: ['Zero Build'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'ranger_assault_rifle',
      smg: 'midas_masterpiece',
      heal: 'slap_juice',
      mobility: 'grappler',
    },
    mats: { wood: 0, stone: 0, metal: 0 },
    ammo: { shells: 25, light: 40, medium: 200, heavy: 0 },
    healStack: 2,
  },
  {
    id: 'duo-support',
    name: 'Duo support',
    blurb: 'Splashes + scan · you refill, they crack',
    tags: ['Duo', 'Ranked'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'assault_rifle',
      smg: 'tactical_pistol',
      heal: 'chug_splash',
      mobility: 'pulse_scanner',
    },
    mats: { wood: 400, stone: 300, metal: 200 },
    ammo: { shells: 20, light: 120, medium: 200, heavy: 0 },
    healStack: 4,
  },
  {
    id: 'fortnitemares',
    name: 'Fortnitemares',
    blurb: 'Drum Gun pressure + classic Pump',
    tags: ['Fortnitemares', 'Pubs'],
    slots: {
      shotgun: 'pump_shotgun',
      ar: 'drum_gun',
      smg: 'dual_pistols',
      heal: 'chug_jug',
      mobility: 'rift',
    },
    mats: { wood: 350, stone: 250, metal: 150 },
    ammo: { shells: 25, light: 100, medium: 220, heavy: 0 },
    healStack: 1,
  },
  {
    id: 'mega-buster',
    name: 'Mega Buster lane',
    blurb: 'Charge shots + sidearm cleanup',
    tags: ['Pubs', 'Contest'],
    slots: {
      shotgun: 'eight_bit_shotgun',
      ar: 'mega_buster',
      smg: 'tactical_pistol',
      heal: 'guzzle_juice',
      mobility: 'overdrive_grenade',
    },
    mats: { wood: 250, stone: 150, metal: 50 },
    ammo: { shells: 20, light: 150, medium: 0, heavy: 0 },
    healStack: 2,
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

const MAT_PARAM_KEYS: Record<keyof MatsState, string> = {
  wood: 'mw',
  stone: 'ms',
  metal: 'mm',
}

const AMMO_PARAM_KEYS: Record<keyof AmmoState, string> = {
  shells: 'as',
  light: 'al',
  medium: 'am',
  heavy: 'ah',
}

const HEAL_STACK_PARAM = 'hs'

export const DEFAULT_LOADOUT: Record<LoadoutSlot, string> = { ...PRESETS[0].slots }

export const DEFAULT_BUNDLE: LoadoutBundle = {
  slots: { ...DEFAULT_LOADOUT },
  mats: { ...DEFAULT_MATS },
  ammo: { ...DEFAULT_AMMO },
  healStack: HEALS.find((h) => h.id === DEFAULT_LOADOUT.heal)?.defaultStack ?? 3,
}

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min
  return Math.min(max, Math.max(min, Math.round(n)))
}

function validIdsForSlot(slot: LoadoutSlot): Set<string> {
  if (slot === 'heal') return new Set(HEALS.map((h) => h.id))
  if (slot === 'mobility') return new Set(MOBILITY.map((m) => m.id))
  return new Set(weaponsForSlot(slot).map((w) => w.id))
}

export function loadoutsEqual(a: Record<LoadoutSlot, string>, b: Record<LoadoutSlot, string>) {
  return LOADOUT_SLOTS.every((slot) => a[slot] === b[slot])
}

export function matsEqual(a: MatsState, b: MatsState) {
  return a.wood === b.wood && a.stone === b.stone && a.metal === b.metal
}

export function ammoEqual(a: AmmoState, b: AmmoState) {
  return (
    a.shells === b.shells &&
    a.light === b.light &&
    a.medium === b.medium &&
    a.heavy === b.heavy
  )
}

export function bundlesEqual(a: LoadoutBundle, b: LoadoutBundle) {
  return (
    loadoutsEqual(a.slots, b.slots) &&
    matsEqual(a.mats, b.mats) &&
    ammoEqual(a.ammo, b.ammo) &&
    a.healStack === b.healStack
  )
}

export function suggestedAmmoForSlots(slots: Record<LoadoutSlot, string>): AmmoState {
  const next: AmmoState = { shells: 0, light: 0, medium: 0, heavy: 0 }
  for (const slot of ['shotgun', 'ar', 'smg'] as LoadoutSlot[]) {
    const w = getWeapon(slots[slot])
    if (!w) continue
    if (w.category === 'Shotgun') next.shells = Math.max(next.shells, 25)
    else if (w.category === 'SMG' || w.category === 'Pistol') next.light = Math.max(next.light, 150)
    else if (w.category === 'Sniper') next.heavy = Math.max(next.heavy, 12)
    else next.medium = Math.max(next.medium, 200)
  }
  if (next.shells === 0) next.shells = 15
  if (next.light === 0 && next.medium === 0) next.medium = 120
  return next
}

export function presetToBundle(preset: LoadoutPreset): LoadoutBundle {
  const heal = HEALS.find((h) => h.id === preset.slots.heal)
  return {
    slots: { ...preset.slots },
    mats: { ...preset.mats },
    ammo: { ...DEFAULT_AMMO, ...suggestedAmmoForSlots(preset.slots), ...preset.ammo },
    healStack: clampInt(preset.healStack ?? heal?.defaultStack ?? 2, 1, HEAL_STACK_MAX),
  }
}

export function scoreKit(bundle: LoadoutBundle): Record<KitAxis, number> {
  const shotgun = getWeapon(bundle.slots.shotgun)
  const ar = getWeapon(bundle.slots.ar)
  const side = getWeapon(bundle.slots.smg)
  const heal = getUtility(bundle.slots.heal)
  const util = getUtility(bundle.slots.mobility)

  const close = shotgun
    ? clampInt((shotgun.dmg / 130) * 5 + (shotgun.fireRate > 1 ? 0.5 : 0), 1, 5)
    : 1
  const mid = ar
    ? clampInt(
        ar.category === 'Sniper' ? 4.5 : (ar.dmg * ar.fireRate) / 45,
        1,
        5
      )
    : 1
  const spray = side
    ? clampInt((side.dmg * side.fireRate) / 40 + (side.mag >= 15 ? 0.5 : 0), 1, 5)
    : 1
  const sustain = clampInt(
    (heal?.score ?? 1) * 0.7 + Math.min(bundle.healStack, 4) * 0.4,
    1,
    5
  )
  const rotate = util?.score ?? 1
  const matTotal = bundle.mats.wood + bundle.mats.stone + bundle.mats.metal
  const build =
    matTotal === 0
      ? 1
      : clampInt(1 + (matTotal / 1500) * 4 + (bundle.mats.metal >= 300 ? 0.5 : 0), 1, 5)

  return { close, mid, spray, sustain, rotate, build }
}

export function kitTips(bundle: LoadoutBundle): string[] {
  const scores = scoreKit(bundle)
  const tips: string[] = []
  if (scores.sustain <= 2) {
    tips.push('Shields are thin — swap heals to smalls/bigs or bump the heal stack before you third-party.')
  }
  if (scores.rotate <= 2) {
    tips.push('Utility is light for rotates. Shockwaves, Overdrive, or a Grappler save more fights than a fourth gun.')
  }
  if (scores.build <= 2 && scores.build > 1) {
    tips.push('Mats are low for Ranked boxes — farm wood/stone before you hard-commit a POI.')
  }
  if (scores.build === 1) {
    tips.push('Zero-mat kit: play natural cover and keep mobility hot. Do not take long build fights.')
  }
  if (scores.close >= 4 && scores.mid <= 2) {
    tips.push('Close game is strong — your mid tags may lose peeks. Consider a more accurate AR or Ranger.')
  }
  if (bundle.ammo.shells < 10) {
    tips.push('Shell count is dangerous for multi-fight paths. Loot ammo boxes before the next contest.')
  }
  if (tips.length === 0) {
    tips.push('Balanced kit — still confirm floor loot and Match Overrides in-game before you lock the plan.')
  }
  return tips.slice(0, 3)
}

export function matPieces(mats: MatsState) {
  return {
    wood: Math.floor(mats.wood / 10),
    stone: Math.floor(mats.stone / 10),
    metal: Math.floor(mats.metal / 10),
    total: Math.floor((mats.wood + mats.stone + mats.metal) / 10),
  }
}

/** Parse share params from a query string. Returns null if no loadout params present. */
export function parseLoadoutSearch(search: string): LoadoutBundle | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const hasSlots = LOADOUT_SLOTS.some((slot) => params.has(LOADOUT_PARAM_KEYS[slot]))
  const hasMats = (Object.keys(MAT_PARAM_KEYS) as (keyof MatsState)[]).some((k) =>
    params.has(MAT_PARAM_KEYS[k])
  )
  const hasAmmo = (Object.keys(AMMO_PARAM_KEYS) as (keyof AmmoState)[]).some((k) =>
    params.has(AMMO_PARAM_KEYS[k])
  )
  const hasHealStack = params.has(HEAL_STACK_PARAM)
  if (!hasSlots && !hasMats && !hasAmmo && !hasHealStack) return null

  const slots: Record<LoadoutSlot, string> = { ...DEFAULT_LOADOUT }
  for (const slot of LOADOUT_SLOTS) {
    const raw = params.get(LOADOUT_PARAM_KEYS[slot])
    if (!raw) continue
    if (validIdsForSlot(slot).has(raw)) slots[slot] = raw
  }

  const mats: MatsState = { ...DEFAULT_MATS }
  for (const key of Object.keys(MAT_PARAM_KEYS) as (keyof MatsState)[]) {
    const raw = params.get(MAT_PARAM_KEYS[key])
    if (raw == null || raw === '') continue
    mats[key] = clampInt(Number(raw), 0, MAT_CAP)
  }

  const ammo: AmmoState = { ...suggestedAmmoForSlots(slots) }
  for (const key of Object.keys(AMMO_PARAM_KEYS) as (keyof AmmoState)[]) {
    const raw = params.get(AMMO_PARAM_KEYS[key])
    if (raw == null || raw === '') continue
    ammo[key] = clampInt(Number(raw), 0, 999)
  }

  const heal = HEALS.find((h) => h.id === slots.heal)
  let healStack = heal?.defaultStack ?? 2
  if (hasHealStack) {
    healStack = clampInt(Number(params.get(HEAL_STACK_PARAM)), 1, HEAL_STACK_MAX)
  }

  return { slots, mats, ammo, healStack }
}

export function buildLoadoutQuery(bundle: LoadoutBundle): string {
  const params = new URLSearchParams()
  for (const slot of LOADOUT_SLOTS) {
    params.set(LOADOUT_PARAM_KEYS[slot], bundle.slots[slot])
  }
  for (const key of Object.keys(MAT_PARAM_KEYS) as (keyof MatsState)[]) {
    params.set(MAT_PARAM_KEYS[key], String(bundle.mats[key]))
  }
  for (const key of Object.keys(AMMO_PARAM_KEYS) as (keyof AmmoState)[]) {
    params.set(AMMO_PARAM_KEYS[key], String(bundle.ammo[key]))
  }
  params.set(HEAL_STACK_PARAM, String(bundle.healStack))
  return params.toString()
}

export function buildLoadoutSharePath(bundle: LoadoutBundle | Record<LoadoutSlot, string>): string {
  const full: LoadoutBundle =
    'slots' in bundle
      ? bundle
      : {
          slots: bundle,
          mats: { ...DEFAULT_MATS },
          ammo: suggestedAmmoForSlots(bundle),
          healStack: HEALS.find((h) => h.id === bundle.heal)?.defaultStack ?? 2,
        }
  return `/tools/loadout-builder?${buildLoadoutQuery(full)}`
}
