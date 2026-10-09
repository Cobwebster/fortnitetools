import fs from 'node:fs'

const path = 'lib/weapon-changes-data.json'
const data = JSON.parse(fs.readFileSync(path, 'utf8'))

function dmgRow(rarity, name, oldD, newD, fireRate = null) {
  const stats = [
    { stat: 'Damage', old: oldD, new: newD, change: +(newD - oldD).toFixed(3) },
  ]
  if (fireRate != null) {
    const oldDps = +(oldD * fireRate).toFixed(3)
    const newDps = +(newD * fireRate).toFixed(3)
    stats.push({
      stat: 'DPS',
      old: oldDps,
      new: newDps,
      change: +(newDps - oldDps).toFixed(3),
    })
  }
  return { rarity, name, stats }
}

function poolRow(rarity, name, inPool) {
  return {
    rarity,
    name,
    stats: [
      {
        stat: 'In BR loot pool',
        old: inPool ? 0 : 1,
        new: inPool ? 1 : 0,
        change: inPool ? 1 : -1,
      },
    ],
  }
}

const v4210 = {
  date: '2026-09-03',
  label: 'September 3, 2026 — Override (v42.10)',
  entries: [
    ...[
      ['Common', 84, 87],
      ['Uncommon', 92, 95],
      ['Rare', 100, 103],
      ['Epic', 108, 111],
      ['Legendary', 116, 119],
    ].map(([r, o, n]) => dmgRow(r, 'Pump Shotgun', o, n, 0.7)),
    ...[
      ['Common', 95, 88],
      ['Uncommon', 100, 93],
      ['Rare', 105, 98],
      ['Epic', 110, 103],
      ['Legendary', 116, 108],
    ].map(([r, o, n]) => dmgRow(r, '8-Bit Shotgun', o, n, 1.4)),
    {
      rarity: 'Mythic',
      name: 'Assault Rifle',
      stats: [
        { stat: 'Damage', old: 36, new: 35, change: -1 },
        { stat: 'DPS', old: 198, new: 192.5, change: -5.5 },
        { stat: 'Headshot Multiplier', old: 2, new: 1.5, change: -0.5 },
        { stat: 'Reload Time', old: 2.07, new: 2.2, change: 0.13 },
      ],
    },
    {
      rarity: 'Legendary',
      name: 'Assault Rifle',
      stats: [
        { stat: 'Headshot Multiplier', old: 2, new: 1.5, change: -0.5 },
        { stat: 'Reload Time', old: 2.25, new: 2.35, change: 0.1 },
      ],
    },
    {
      rarity: 'Rare',
      name: 'Mega Buster',
      stats: [{ stat: 'Projectile Speed', old: 100, new: 115, change: 15 }],
    },
    poolRow('Epic', 'Sweeper Shotgun', true),
  ],
}

const epicPump = v4210.entries.find((e) => e.name === 'Pump Shotgun' && e.rarity === 'Epic')
if (epicPump) {
  epicPump.stats.push({ stat: 'Equip Animation', old: 1, new: 0.85, change: -0.15 })
}

const v4230 = {
  date: '2026-10-01',
  label: 'October 1, 2026 — Fortnitemares (v42.30)',
  entries: [
    {
      rarity: 'Epic',
      name: "Rebecca's Guns (SMG)",
      stats: [
        { stat: 'Damage (relative)', old: 100, new: 110, change: 10 },
        { stat: 'Spread', old: 100, new: 90, change: -10 },
        { stat: 'Vertical Recoil', old: 100, new: 90, change: -10 },
      ],
    },
    {
      rarity: 'Epic',
      name: "Rebecca's Guns (Assault Rifle)",
      stats: [
        { stat: 'Spread', old: 100, new: 90, change: -10 },
        { stat: 'Vertical Recoil', old: 100, new: 90, change: -10 },
      ],
    },
    poolRow('Legendary', 'Drum Gun', false),
    poolRow('Legendary', 'Ranger Assault Rifle', false),
    poolRow('Exotic', 'Tetris Rift', false),
    poolRow('Epic', 'Bonerattler SMG', true),
    poolRow('Mythic', "Freddy's Nightmare", true),
    poolRow('Epic', 'Wood Stake Shotgun', true),
    poolRow('Epic', 'Dual Fiend Hunters', true),
    poolRow('Legendary', 'Heavy Assault Rifle', true),
    poolRow('Epic', 'Pumpkin Launcher', true),
  ],
}

data.updatedAt = '2026-10-09'
data.sourceNote =
  'Compiled from Epic Override patch notes (v42.00–v42.30), Fortnite wiki history, and community trackers. Numbers are reference values — always confirm in-game after updates. Loot-pool rows use In BR loot pool 0/1 for vault/unvault. Relative % rows for Rebecca’s Guns reflect Epic’s qualitative notes when absolute sheet values were not published.'

data.patches = data.patches.filter((p) => p.date !== '2026-09-03' && p.date !== '2026-10-01')
data.patches.unshift(v4230, v4210)

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
console.log(
  data.patches
    .slice(0, 4)
    .map((p) => `${p.date} ${p.label} (${p.entries.length})`)
    .join('\n')
)

// Sync encyclopedia live values for key Override guns
const encPath = 'lib/weapons-encyclopedia.json'
const enc = JSON.parse(fs.readFileSync(encPath, 'utf8'))

function setVariants(name, updater) {
  const w = enc.find((x) => x.name === name)
  if (!w) {
    console.warn('encyclopedia miss', name)
    return
  }
  updater(w)
}

setVariants('Pump Shotgun', (w) => {
  w.vaulted = false
  const map = {
    Common: { dmg: 87, dps: 60.9, reload: 5.22 },
    Uncommon: { dmg: 95, dps: 66.5, reload: 4.86 },
    Rare: { dmg: 103, dps: 72.1, reload: 4.5 },
    Epic: { dmg: 111, dps: 77.7, reload: 4.14 },
    Legendary: { dmg: 119, dps: 83.3, reload: 3.78 },
  }
  for (const v of w.variants) {
    const m = map[v.rarity]
    if (!m) continue
    v.dmg = m.dmg
    v.dps = m.dps
    v.reload = m.reload
    v.fireRate = 0.7
  }
})

setVariants('8-Bit Shotgun', (w) => {
  w.vaulted = false
  const map = {
    Common: { dmg: 88, dps: 123.2 },
    Uncommon: { dmg: 93, dps: 130.2 },
    Rare: { dmg: 98, dps: 137.2 },
    Epic: { dmg: 103, dps: 144.2 },
    Legendary: { dmg: 108, dps: 151.2 },
  }
  for (const v of w.variants) {
    const m = map[v.rarity]
    if (!m) continue
    v.dmg = m.dmg
    v.dps = m.dps
    v.fireRate = 1.4
  }
})

setVariants('Drum Gun', (w) => {
  w.vaulted = true
  w.note = 'Vaulted in Fortnitemares v42.30 (1 Oct 2026).'
})
setVariants('Ranger Assault Rifle', (w) => {
  w.vaulted = true
  w.note = 'Vaulted in Fortnitemares v42.30 (1 Oct 2026).'
})
setVariants('Sweeper Shotgun', (w) => {
  w.vaulted = false
  w.note = 'Unvaulted / reworked in Override v42.10 (3 Sep 2026).'
})

fs.writeFileSync(encPath, JSON.stringify(enc))
console.log('encyclopedia synced for Pump, 8-Bit, Drum, Ranger, Sweeper')
