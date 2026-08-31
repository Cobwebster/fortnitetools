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
 * Active Battle Royale combat guns for C7S4 Override (post Aug 20–26 hotfixes).
 * Runners pool vaulted. Some returns (Minigun, Dual Pistols, Oni) often need Loot Hack.
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
    id: 'ranger_assault_rifle',
    name: 'Ranger Assault Rifle',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 37,
    hs: 1.5,
    fireRate: 4.0,
    mag: 25,
    reload: 2.25,
    image: '/images/loadout/warforged_ar.png',
    note: 'Slower · accurate',
  },
  {
    id: 'drum_gun',
    name: 'Drum Gun',
    category: 'AR',
    rarity: 'Legendary',
    dmg: 24,
    hs: 1.5,
    fireRate: 8.3,
    mag: 30,
    reload: 2.7,
    image: '/images/loadout/warforged_ar.png',
    note: 'Spray / pressure',
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

  // ── Pistols / sidearms (no floor SMG this season) ─────────────────────
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
  {
    id: 'midas_masterpiece',
    name: "Midas' Masterpiece",
    category: 'Pistol',
    rarity: 'Mythic',
    dmg: 125,
    hs: 2.5,
    fireRate: 1.0,
    mag: 1,
    reload: 2.6,
    image: '/images/loadout/bank_shot.png',
    note: '1/match · headshot deletes · limited ammo',
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
