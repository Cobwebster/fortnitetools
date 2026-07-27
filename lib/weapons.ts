/** Chapter 7 Season 3 (Runners) active BR loot pool — body-shot planning values. */
export type WeaponStat = {
  id: string
  name: string
  category: 'AR' | 'Shotgun' | 'SMG' | 'Pistol' | 'Sniper'
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
  dmg: number
  hs: number
  fireRate: number
  mag: number
  reload: number
  image: string
  /** Optional note shown in pickers (boss drop, Zero Build, etc.) */
  note?: string
}

/**
 * Active Battle Royale combat guns for C7S3 (post July 16 Hot Bat Summer).
 * Hunting Rifle + Flex SMG vaulted 16 Jul 2026 — not listed.
 */
export const WEAPONS: WeaponStat[] = [
  // ── ARs ──────────────────────────────────────────────────────────────
  {
    id: 'surgical_burst',
    name: 'Surgical Burst Rifle',
    category: 'AR',
    rarity: 'Epic',
    dmg: 33,
    hs: 1.5,
    fireRate: 3.75,
    mag: 30,
    reload: 2.4,
    image: '/images/loadout/surgical_burst.png',
  },
  {
    id: 'voidblade_burst',
    name: "The Voidblade's Burst Rifle",
    category: 'AR',
    rarity: 'Mythic',
    dmg: 35,
    hs: 1.5,
    fireRate: 3.75,
    mag: 30,
    reload: 2.2,
    image: '/images/loadout/surgical_burst.png',
    note: 'Boss drop · Voidblade',
  },
  {
    id: 'warforged_ar',
    name: 'Warforged Assault Rifle',
    category: 'AR',
    rarity: 'Rare',
    dmg: 35,
    hs: 1.5,
    fireRate: 5.0,
    mag: 30,
    reload: 2.5,
    image: '/images/loadout/warforged_ar.png',
  },
  {
    id: 'harley_warforged',
    name: "Harley Quinn's Warforged AR",
    category: 'AR',
    rarity: 'Mythic',
    dmg: 37,
    hs: 1.5,
    fireRate: 5.0,
    mag: 30,
    reload: 2.3,
    image: '/images/loadout/warforged_ar.png',
    note: 'Boss drop · High Tide Harley',
  },
  {
    id: 'chaos_exploder',
    name: 'Chaos Exploder Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 28,
    hs: 1.5,
    fireRate: 3.2,
    mag: 25,
    reload: 2.8,
    image: '/images/loadout/chaos_exploder.png',
  },

  // ── Shotguns ─────────────────────────────────────────────────────────
  {
    id: 'extending_focus',
    name: 'Extending Focus Shotgun',
    category: 'Shotgun',
    rarity: 'Epic',
    dmg: 82,
    hs: 1.5,
    fireRate: 1.35,
    mag: 6,
    reload: 4.2,
    image: '/images/loadout/extending_focus.png',
  },
  {
    id: 'reacher_extending',
    name: 'Reacher Extending Shotgun',
    category: 'Shotgun',
    rarity: 'Mythic',
    dmg: 88,
    hs: 1.5,
    fireRate: 1.35,
    mag: 6,
    reload: 3.9,
    image: '/images/loadout/extending_focus.png',
    note: 'Boss drop · Skeletor',
  },
  {
    id: 'striker_pump',
    name: 'Striker Pump Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 105,
    hs: 1.75,
    fireRate: 0.75,
    mag: 5,
    reload: 4.8,
    image: '/images/loadout/striker_pump.png',
  },
  {
    id: 'maven_auto',
    name: 'Maven Auto Shotgun',
    category: 'Shotgun',
    rarity: 'Rare',
    dmg: 68,
    hs: 1.5,
    fireRate: 1.8,
    mag: 8,
    reload: 4.0,
    image: '/images/loadout/maven_auto.png',
  },
  {
    id: 'wolfe_maven',
    name: "Wolfe's Maven Auto Shotgun",
    category: 'Shotgun',
    rarity: 'Mythic',
    dmg: 72,
    hs: 1.5,
    fireRate: 1.8,
    mag: 8,
    reload: 3.7,
    image: '/images/loadout/maven_auto.png',
    note: 'Boss drop · Wolfe',
  },
  // Chaos Reloader vaulted mid-season — not listed.

  // ── SMGs ─────────────────────────────────────────────────────────────
  {
    id: 'stinger_smg',
    name: 'Stinger SMG',
    category: 'SMG',
    rarity: 'Rare',
    dmg: 19,
    hs: 1.5,
    fireRate: 12.0,
    mag: 30,
    reload: 2.0,
    image: '/images/loadout/stinger_smg.png',
  },
  {
    id: 'rapid_fire_smg',
    name: 'Rapid Fire SMG',
    category: 'SMG',
    rarity: 'Epic',
    dmg: 17,
    hs: 1.5,
    fireRate: 15.0,
    mag: 32,
    reload: 1.9,
    image: '/images/loadout/rapid_fire_smg.png',
  },
  {
    id: 'catwoman_rapid_fire',
    name: "Catwoman's Rapid Fire SMG",
    category: 'SMG',
    rarity: 'Mythic',
    dmg: 18,
    hs: 1.5,
    fireRate: 15.0,
    mag: 32,
    reload: 1.7,
    image: '/images/loadout/rapid_fire_smg.png',
    note: 'Boss drop · Coastal Catwoman',
  },

  // ── Pistols ──────────────────────────────────────────────────────────
  {
    id: 'lancehead',
    name: 'Lancehead Pistol',
    category: 'Pistol',
    rarity: 'Legendary',
    dmg: 38,
    hs: 2.0,
    fireRate: 3.2,
    mag: 21,
    reload: 2.1,
    image: '/images/loadout/lancehead.png',
  },
  {
    id: 'baba_yaga',
    name: '9mm Baba Yaga',
    category: 'Pistol',
    rarity: 'Mythic',
    dmg: 40,
    hs: 2.0,
    fireRate: 3.2,
    mag: 21,
    reload: 1.9,
    image: '/images/loadout/lancehead.png',
    note: 'Mythic Lancehead · rescue Dog',
  },
  {
    id: 'ranger_pistol',
    name: 'Ranger Pistol',
    category: 'Pistol',
    rarity: 'Rare',
    dmg: 24,
    hs: 1.75,
    fireRate: 6.5,
    mag: 16,
    reload: 1.8,
    image: '/images/loadout/ranger_pistol.png',
  },
  {
    id: 'poison_ivy_ranger',
    name: "Poison Ivy's Ranger Pistol",
    category: 'Pistol',
    rarity: 'Mythic',
    dmg: 26,
    hs: 1.75,
    fireRate: 6.5,
    mag: 16,
    reload: 1.6,
    image: '/images/loadout/ranger_pistol.png',
    note: 'Boss drop · Chlorophyll Ivy',
  },
  {
    id: 'bank_shot',
    name: 'Bank Shot Pistol',
    category: 'Pistol',
    rarity: 'Epic',
    dmg: 36,
    hs: 1.75,
    fireRate: 2.8,
    mag: 12,
    reload: 2.2,
    image: '/images/loadout/bank_shot.png',
  },

  // ── Snipers ──────────────────────────────────────────────────────────
  {
    id: 'heavy_impact',
    name: 'Heavy Impact Sniper Rifle',
    category: 'Sniper',
    rarity: 'Legendary',
    dmg: 120,
    hs: 2.5,
    fireRate: 0.4,
    mag: 3,
    reload: 3.2,
    image: '/images/loadout/heavy_impact.png',
  },
  {
    id: 'mighty_impact',
    name: 'Mighty Impact Sniper Rifle',
    category: 'Sniper',
    rarity: 'Mythic',
    dmg: 128,
    hs: 2.5,
    fireRate: 0.4,
    mag: 3,
    reload: 2.9,
    image: '/images/loadout/heavy_impact.png',
    note: 'Mythic · vault pedestal',
  },
]

export function getWeapon(id: string) {
  return WEAPONS.find((w) => w.id === id)
}

export function calcWeaponStats(weapon: WeaponStat, hp: number, headshot: boolean) {
  const effectiveDmg = headshot ? weapon.dmg * weapon.hs : weapon.dmg
  const shotsToKill = Math.ceil(hp / effectiveDmg)
  const bodyDps = weapon.dmg * weapon.fireRate
  const effectiveDps = effectiveDmg * weapon.fireRate
  const timeToKill = (shotsToKill - 1) / weapon.fireRate
  const magCanKill = weapon.mag >= shotsToKill
  return { effectiveDmg, shotsToKill, bodyDps, effectiveDps, timeToKill, magCanKill }
}

export const RARITY_TEXT: Record<string, string> = {
  Common: 'text-slate-300',
  Uncommon: 'text-green-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-amber-400',
  Mythic: 'text-yellow-300',
  Exotic: 'text-cyan-300',
}

export const RARITY_BORDER: Record<string, string> = {
  Common: 'border-slate-400/40 bg-slate-400/10',
  Uncommon: 'border-green-400/50 bg-green-400/10',
  Rare: 'border-blue-400/50 bg-blue-400/10',
  Epic: 'border-purple-400/50 bg-purple-400/10',
  Legendary: 'border-amber-400/50 bg-amber-400/10',
  Mythic: 'border-yellow-300/50 bg-yellow-300/10',
  Exotic: 'border-cyan-300/50 bg-cyan-300/10',
}
