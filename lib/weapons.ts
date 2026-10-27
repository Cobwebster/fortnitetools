/** Chapter 7 Season 4 (Override) active BR loot pool — body-shot planning values. */
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
 * Active Battle Royale combat guns for C7S4 Override after v42.40 (15 Oct 2026).
 * Drum Gun, Ranger AR, and Midas’ Masterpiece are vaulted. Some returns
 * (Minigun, Dual Pistols, Oni, Gatekeeper, Hunting Rifle) often need Loot Hack.
 * Mega Buster is Explosive in the encyclopedia — listed here as AR slot for hotbar planning.
 */
export const WEAPONS: WeaponStat[] = [
  // ── ARs ──────────────────────────────────────────────────────────────
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
    note: 'Classic AR unvault',
  },
  {
    id: 'heavy_assault_rifle',
    name: 'Heavy Assault Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 44,
    hs: 2.0,
    fireRate: 3.75,
    mag: 25,
    reload: 2.52,
    image: '/images/loadout/warforged_ar.png',
    note: 'Fortnitemares unvault',
  },
  {
    id: 'mega_buster',
    name: 'Mega Buster',
    category: 'AR',
    rarity: 'Rare',
    dmg: 48,
    hs: 1.0,
    fireRate: 2.6,
    mag: 75,
    reload: 0,
    image: '/images/loadout/chaos_exploder.png',
    note: 'Base shot · charge up to 144 · slide dash',
  },
  {
    id: 'minigun',
    name: 'Minigun',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 21,
    hs: 1.0,
    fireRate: 12.0,
    mag: 999,
    reload: 4.5,
    image: '/images/loadout/chaos_exploder.png',
    note: 'Often Loot Hack',
  },

  // ── Shotguns ─────────────────────────────────────────────────────────
  {
    id: 'eight_bit_shotgun',
    name: '8-Bit Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 116,
    hs: 1.5,
    fireRate: 1.4,
    mag: 10,
    reload: 2.52,
    image: '/images/loadout/maven_auto.png',
    note: 'Auto · scoreboard combos',
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
    note: 'Classic pump · C7S4 high-tier values',
  },
  {
    id: 'sweeper_shotgun',
    name: 'Sweeper Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 82.5,
    hs: 1.5,
    fireRate: 1.53,
    mag: 7,
    reload: 5.2,
    image: '/images/loadout/maven_auto.png',
    note: 'Auto · v42.40 fire-rate bump (confirm in-game)',
  },
  {
    id: 'wood_stake_shotgun',
    name: 'Wood Stake Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 101,
    hs: 1.5,
    fireRate: 1.3,
    mag: 4,
    reload: 3.85,
    image: '/images/loadout/striker_pump.png',
    note: 'Fortnitemares unvault',
  },
  {
    id: 'oni_shotgun',
    name: 'Oni Shotgun',
    category: 'Shotgun',
    rarity: 'Legendary',
    dmg: 105.3,
    hs: 1.5,
    fireRate: 1.35,
    mag: 2,
    reload: 1.98,
    image: '/images/loadout/striker_pump.png',
    note: 'Break-action · often Loot Hack',
  },

  // ── SMGs ─────────────────────────────────────────────────────────────
  {
    id: 'rebeccas_guns',
    name: "Rebecca's Guns",
    category: 'SMG',
    rarity: 'Legendary',
    dmg: 10,
    hs: 1.5,
    fireRate: 12,
    mag: 40,
    reload: 1.44,
    image: '/images/loadout/flex_smg.png',
    note: 'Dual-wield AR/SMG — SMG spray mode',
  },

  // ── Pistols / sidearms ──────────────────────────────────────────────
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
  },
  {
    id: 'dual_pistols',
    name: 'Dual Pistols',
    category: 'Pistol',
    rarity: 'Legendary',
    dmg: 43,
    hs: 1.75,
    fireRate: 2.2,
    mag: 18,
    reload: 2.7,
    image: '/images/loadout/ranger_pistol.png',
    note: 'Often Loot Hack',
  },
  {
    id: 'dual_fiend_hunters',
    name: 'Dual Fiend Hunters',
    category: 'Pistol',
    rarity: 'Legendary',
    dmg: 34,
    hs: 1.5,
    fireRate: 4.0,
    mag: 16,
    reload: 2.61,
    image: '/images/loadout/ranger_pistol.png',
    note: 'Fortnitemares unvault',
  },
  {
    id: 'ranger_pistol',
    name: 'Ranger Pistol',
    category: 'Pistol',
    rarity: 'Legendary',
    dmg: 30,
    hs: 1.75,
    fireRate: 6.6,
    mag: 15,
    reload: 1.35,
    image: '/images/loadout/ranger_pistol.png',
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
