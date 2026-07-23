/** Chapter 7 Season 3 (Runners) loot pool — approximate body-shot values for planning. */
export type WeaponStat = {
  id: string
  name: string
  category: 'AR' | 'Shotgun' | 'SMG' | 'Pistol' | 'Sniper'
  rarity: 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'
  dmg: number
  hs: number
  fireRate: number
  mag: number
  reload: number
  image: string
}

export const WEAPONS: WeaponStat[] = [
  { id: 'surgical_burst', name: 'Surgical Burst Rifle', category: 'AR', rarity: 'Epic', dmg: 33, hs: 1.5, fireRate: 3.75, mag: 30, reload: 2.4, image: '/images/loadout/surgical_burst.png' },
  { id: 'warforged_ar', name: 'Warforged Assault Rifle', category: 'AR', rarity: 'Rare', dmg: 35, hs: 1.5, fireRate: 5.0, mag: 30, reload: 2.5, image: '/images/loadout/warforged_ar.png' },
  { id: 'chaos_exploder', name: 'Chaos Exploder Rifle', category: 'AR', rarity: 'Legendary', dmg: 28, hs: 1.5, fireRate: 3.2, mag: 20, reload: 2.8, image: '/images/loadout/chaos_exploder.png' },
  { id: 'extending_focus', name: 'Extending Focus Shotgun', category: 'Shotgun', rarity: 'Epic', dmg: 82, hs: 1.5, fireRate: 1.35, mag: 6, reload: 4.2, image: '/images/loadout/extending_focus.png' },
  { id: 'striker_pump', name: 'Striker Pump Shotgun', category: 'Shotgun', rarity: 'Legendary', dmg: 105, hs: 1.75, fireRate: 0.75, mag: 5, reload: 4.8, image: '/images/loadout/striker_pump.png' },
  { id: 'maven_auto', name: 'Maven Auto Shotgun', category: 'Shotgun', rarity: 'Rare', dmg: 68, hs: 1.5, fireRate: 1.8, mag: 8, reload: 4.0, image: '/images/loadout/maven_auto.png' },
  { id: 'chaos_reloader', name: 'Chaos Reloader Shotgun', category: 'Shotgun', rarity: 'Epic', dmg: 157, hs: 1.2, fireRate: 1.2, mag: 1, reload: 1.8, image: '/images/loadout/chaos_reloader.png' },
  { id: 'stinger_smg', name: 'Stinger SMG', category: 'SMG', rarity: 'Rare', dmg: 19, hs: 1.5, fireRate: 12.0, mag: 30, reload: 2.0, image: '/images/loadout/stinger_smg.png' },
  { id: 'rapid_fire_smg', name: 'Rapid Fire SMG', category: 'SMG', rarity: 'Epic', dmg: 17, hs: 1.5, fireRate: 15.0, mag: 32, reload: 1.9, image: '/images/loadout/rapid_fire_smg.png' },
  { id: 'flex_smg', name: 'Flex SMG', category: 'SMG', rarity: 'Epic', dmg: 17, hs: 1.5, fireRate: 12.5, mag: 38, reload: 2.1, image: '/images/loadout/flex_smg.png' },
  { id: 'lancehead', name: 'Lancehead Pistol', category: 'Pistol', rarity: 'Legendary', dmg: 38, hs: 2.0, fireRate: 3.2, mag: 21, reload: 2.1, image: '/images/loadout/lancehead.png' },
  { id: 'ranger_pistol', name: 'Ranger Pistol', category: 'Pistol', rarity: 'Rare', dmg: 24, hs: 1.75, fireRate: 6.5, mag: 16, reload: 1.8, image: '/images/loadout/ranger_pistol.png' },
  { id: 'bank_shot', name: 'Bank Shot Pistol', category: 'Pistol', rarity: 'Epic', dmg: 36, hs: 1.75, fireRate: 2.8, mag: 12, reload: 2.2, image: '/images/loadout/bank_shot.png' },
  { id: 'hunting_rifle', name: 'Hunting Rifle', category: 'Sniper', rarity: 'Rare', dmg: 105, hs: 2.0, fireRate: 0.75, mag: 1, reload: 2.6, image: '/images/loadout/hunting_rifle.png' },
  { id: 'heavy_impact', name: 'Heavy Impact Sniper', category: 'Sniper', rarity: 'Legendary', dmg: 120, hs: 2.5, fireRate: 0.4, mag: 3, reload: 3.2, image: '/images/loadout/heavy_impact.png' },
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
  Uncommon: 'text-green-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-amber-400',
}

export const RARITY_BORDER: Record<string, string> = {
  Uncommon: 'border-green-400/50 bg-green-400/10',
  Rare: 'border-blue-400/50 bg-blue-400/10',
  Epic: 'border-purple-400/50 bg-purple-400/10',
  Legendary: 'border-amber-400/50 bg-amber-400/10',
  Common: 'border-slate-400/40 bg-slate-400/10',
}
