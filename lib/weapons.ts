/** Treasure Hunters (v43.00) BR combat guns for loadout / STK planning — body-shot values. */
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
 * Active Battle Royale combat guns for Treasure Hunters (Crossbones Isle).
 * Planning numbers — confirm in-game after hotfixes. Powers (Gum-Gum, Flame-Flame,
 * Shock Rocket, etc.) live in the loadout utility slot, not this list.
 * Override toys (8-Bit, Mega Buster, Wood Stake, Dual Fiend Hunters) are vaulted.
 */
export const WEAPONS: WeaponStat[] = [
  // ── ARs ──────────────────────────────────────────────────────────────
  {
    id: 'hammer_ar',
    name: 'Hammer Assault Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 32,
    hs: 1.5,
    fireRate: 5.7,
    mag: 20,
    reload: 2.3,
    image: '/images/loadout/hammer_ar.png',
    note: 'Unvault · TH floor',
  },
  {
    id: 'bundlebuss',
    name: 'Bundlebuss Repeater Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 28,
    hs: 1.5,
    fireRate: 7.2,
    mag: 30,
    reload: 2.4,
    image: '/images/loadout/warforged_ar.png',
    note: 'Fully auto · medium range · also Reload',
  },
  {
    id: 'assault_rifle',
    name: 'Assault Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 36,
    hs: 1.5,
    fireRate: 5.5,
    mag: 30,
    reload: 2.25,
    image: '/images/loadout/warforged_ar.png',
    note: 'Classic AR · still in TH planning pool',
  },

  // ── Shotguns ─────────────────────────────────────────────────────────
  {
    id: 'sentinel_pump',
    name: 'Sentinel Pump Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 110,
    hs: 1.75,
    fireRate: 0.75,
    mag: 5,
    reload: 3.6,
    image: '/images/loadout/sentinel_pump.png',
    note: 'Unvault · TH pump',
  },
  {
    id: 'auto_shotgun',
    name: 'Auto Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 78,
    hs: 1.5,
    fireRate: 1.5,
    mag: 8,
    reload: 4.8,
    image: '/images/loadout/auto_shotgun.png',
    note: 'Unvault · spray pump alternative',
  },
  {
    id: 'gilded_dragoon',
    name: 'Gilded Dragoon Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 125,
    hs: 1.75,
    fireRate: 0.85,
    mag: 3,
    reload: 3.2,
    image: '/images/loadout/striker_pump.png',
    note: 'Single-fire · small mag · big damage · also Reload',
  },
  {
    id: 'pump_shotgun',
    name: 'Pump Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 116,
    hs: 2.0,
    fireRate: 0.7,
    mag: 5,
    reload: 3.78,
    image: '/images/loadout/striker_pump.png',
    note: 'Classic pump · use if you loot it',
  },

  // ── SMGs ─────────────────────────────────────────────────────────────
  {
    id: 'machine_smg',
    name: 'Machine SMG',
    category: 'SMG',
    rarity: 'Legendary',
    dmg: 18,
    hs: 1.5,
    fireRate: 12,
    mag: 40,
    reload: 2.1,
    image: '/images/loadout/machine_smg.png',
    note: 'Unvault · close spray',
  },
  {
    id: 'tactical_smg',
    name: 'Tactical SMG',
    category: 'SMG',
    rarity: 'Legendary',
    dmg: 20,
    hs: 1.5,
    fireRate: 10,
    mag: 30,
    reload: 2.0,
    image: '/images/loadout/tactical_smg.png',
    note: 'Unvault · also Blitz',
  },

  // ── Pistols / sidearms ──────────────────────────────────────────────
  {
    id: 'sidearm_pistol',
    name: 'Sidearm Pistol',
    category: 'Pistol',
    rarity: 'Rare',
    dmg: 28,
    hs: 1.75,
    fireRate: 6.5,
    mag: 16,
    reload: 1.4,
    image: '/images/loadout/sidearm_pistol.png',
    note: 'Unvault · cleanup',
  },
  {
    id: 'flint_knock',
    name: 'Flint-Knock Pistol',
    category: 'Pistol',
    rarity: 'Rare',
    dmg: 86,
    hs: 2.0,
    fireRate: 0.55,
    mag: 1,
    reload: 2.0,
    image: '/images/loadout/flint_knock.png',
    note: 'Unvault · knock + crack',
  },
  {
    id: 'tactical_pistol',
    name: 'Tactical Pistol',
    category: 'Pistol',
    rarity: 'Legendary',
    dmg: 28,
    hs: 1.5,
    fireRate: 6.8,
    mag: 15,
    reload: 1.3,
    image: '/images/loadout/ranger_pistol.png',
    note: 'Still a solid cleanup if you find it',
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
