import fs from 'fs'

const path = process.argv[2] || 'c:/Users/Willi/Downloads/weapons-fortnite.txt'
const raw = fs.readFileSync(path, 'utf8')
const lines = raw.split(/\r?\n/)

const CATEGORY_MAP = {
  'Assault Rifles': 'AR',
  Shotguns: 'Shotgun',
  SMGs: 'SMG',
  Pistols: 'Pistol',
  DMRs: 'DMR',
  Snipers: 'Sniper',
  Bows: 'Bow',
  Explosives: 'Explosive',
  Other: 'Other',
}
const RARITIES = new Set([
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Exotic',
])
const SKIP = new Set([
  'All Fortnite Weapons',
  'All WeaponsCompareChanges',
  'Vaulted Weapons',
  'Premium',
  'Sign In',
])

function slug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
}

function parseStats(line) {
  const parts = line
    .trim()
    .split(/\t+/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (parts.length >= 6) {
    return {
      dps: +parts[0],
      dmg: +parts[1],
      structDmg: +parts[2],
      fireRate: +parts[3],
      mag: +parts[4],
      reload: +parts[5],
    }
  }
  const p2 = line.trim().split(/\s+/)
  if (p2.length >= 6 && p2.every((x, i) => i >= 6 || /^-?\d/.test(x))) {
    return {
      dps: +p2[0],
      dmg: +p2[1],
      structDmg: +p2[2],
      fireRate: +p2[3],
      mag: +p2[4],
      reload: +p2[5],
    }
  }
  return null
}

function sig(v) {
  return [v.dps, v.dmg, v.structDmg, v.fireRate, v.mag, v.reload].join('|')
}

let vaulted = false
let category = null
let expectingStatsFor = null
let currentName = null
const weapons = new Map()

function ensureWeapon(name) {
  const id = slug(name)
  if (!weapons.has(id)) {
    weapons.set(id, {
      id,
      name,
      category,
      seenLive: false,
      liveBags: new Map(),
      vaultBags: new Map(),
    })
  }
  const w = weapons.get(id)
  if (!vaulted) {
    w.seenLive = true
    if (category) w.category = category
  } else if (!w.category && category) {
    w.category = category
  } else if (vaulted && !w.seenLive && category) {
    w.category = category
  }
  return w
}

function addVariant(w, rarity, stats) {
  const bags = vaulted ? w.vaultBags : w.liveBags
  if (!bags.has(rarity)) bags.set(rarity, new Map())
  const bag = bags.get(rarity)
  const s = sig(stats)
  if (!bag.has(s)) bag.set(s, { count: 0, stats })
  bag.get(s).count++
}

for (const line of lines) {
  const t = line.trim()
  if (!t) continue
  if (t === 'Vaulted Weapons') {
    vaulted = true
    category = null
    expectingStatsFor = null
    continue
  }
  if (CATEGORY_MAP[t]) {
    category = CATEGORY_MAP[t]
    expectingStatsFor = null
    continue
  }
  if (t.startsWith('Name') && t.includes('Rarity')) {
    expectingStatsFor = null
    continue
  }
  if (SKIP.has(t)) continue
  if (t.includes('Sign In') || t.includes('SpritesMap') || t.includes('Notifications')) continue
  if (RARITIES.has(t)) {
    expectingStatsFor = t
    continue
  }
  const stats = parseStats(t)
  if (stats && expectingStatsFor && Number.isFinite(stats.dmg) && currentName) {
    const w = ensureWeapon(currentName)
    addVariant(w, expectingStatsFor, stats)
    expectingStatsFor = null
    continue
  }
  if (/^[A-Za-z0-9]/.test(t) && !RARITIES.has(t) && !CATEGORY_MAP[t]) {
    if (t.length > 80 || t.includes('http')) continue
    // Skip pure-number lines mistaken as names
    if (/^\d/.test(t)) continue
    currentName = t
    expectingStatsFor = null
    if (category) ensureWeapon(t)
  }
}

const RARITY_ORDER = [
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Exotic',
]

const IMAGE_MAP = {
  stinger_smg: '/images/loadout/stinger_smg.png',
  surgical_burst_rifle: '/images/loadout/surgical_burst.png',
  warforged_assault_rifle: '/images/loadout/warforged_ar.png',
  chaos_exploder_rifle: '/images/loadout/chaos_exploder.png',
  extending_focus_shotgun: '/images/loadout/extending_focus.png',
  striker_pump_shotgun: '/images/loadout/striker_pump.png',
  maven_auto_shotgun: '/images/loadout/maven_auto.png',
  chaos_reloader_shotgun: '/images/loadout/chaos_reloader.png',
  rapid_fire_smg: '/images/loadout/rapid_fire_smg.png',
  flex_smg: '/images/loadout/flex_smg.png',
  lancehead_pistol: '/images/loadout/lancehead.png',
  ranger_pistol: '/images/loadout/ranger_pistol.png',
  bank_shot: '/images/loadout/bank_shot.png',
  bank_shot_pistol: '/images/loadout/bank_shot.png',
  hunting_rifle: '/images/loadout/hunting_rifle.png',
  heavy_impact_sniper_rifle: '/images/loadout/heavy_impact.png',
  heavy_impact_sniper: '/images/loadout/heavy_impact.png',
  crash_pad_jr: '/images/loadout/crash_pad.png',
  shockwave_hammer: '/images/loadout/shockwave.png',
}

const CAT_FALLBACK = {
  AR: '/images/loadout/warforged_ar.png',
  Shotgun: '/images/loadout/striker_pump.png',
  SMG: '/images/loadout/flex_smg.png',
  Pistol: '/images/loadout/ranger_pistol.png',
  DMR: '/images/loadout/hunting_rifle.png',
  Sniper: '/images/loadout/heavy_impact.png',
  Bow: '/images/loadout/hunting_rifle.png',
  Explosive: '/images/loadout/impulse.png',
  Other: '/images/loadout/medkit.png',
}

function pickVariants(bags) {
  const variants = []
  for (const rarity of RARITY_ORDER) {
    const bag = bags.get(rarity)
    if (!bag || bag.size === 0) continue
    let best = null
    for (const entry of bag.values()) {
      if (
        !best ||
        entry.count > best.count ||
        (entry.count === best.count && entry.stats.dmg > best.stats.dmg)
      ) {
        best = entry
      }
    }
    variants.push({ rarity, ...best.stats })
  }
  return variants
}

const out = []
for (const w of weapons.values()) {
  if (!w.category) continue
  const useLive = w.seenLive && w.liveBags.size > 0
  const variants = pickVariants(useLive ? w.liveBags : w.vaultBags)
  if (variants.length === 0) continue
  out.push({
    id: w.id,
    name: w.name,
    category: w.category,
    vaulted: !useLive,
    image: IMAGE_MAP[w.id] || CAT_FALLBACK[w.category] || '/images/loadout/warforged_ar.png',
    variants,
  })
}

const catOrder = [
  'AR',
  'Shotgun',
  'SMG',
  'Pistol',
  'DMR',
  'Sniper',
  'Bow',
  'Explosive',
  'Other',
]
out.sort((a, b) => {
  if (a.vaulted !== b.vaulted) return a.vaulted ? 1 : -1
  const ca = catOrder.indexOf(a.category) - catOrder.indexOf(b.category)
  if (ca) return ca
  return a.name.localeCompare(b.name)
})

const active = out.filter((w) => !w.vaulted)
const vaultedList = out.filter((w) => w.vaulted)
console.log('total', out.length, 'active', active.length, 'vaulted', vaultedList.length)
console.log(
  'active:',
  active.map((w) => w.name).join(' | ')
)

const jsonPath = new URL('../lib/weapons-encyclopedia.json', import.meta.url)
fs.writeFileSync(jsonPath, JSON.stringify(out))
console.log('wrote', jsonPath.pathname, (fs.statSync(jsonPath).size / 1024).toFixed(1) + 'kb')
