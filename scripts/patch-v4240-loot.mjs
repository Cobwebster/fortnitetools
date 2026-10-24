import { readFileSync, writeFileSync } from 'node:fs'

const encPath = new URL('../lib/weapons-encyclopedia.json', import.meta.url)
const changesPath = new URL('../lib/weapon-changes-data.json', import.meta.url)

const encyclopedia = JSON.parse(readFileSync(encPath, 'utf8'))
const byId = new Map(encyclopedia.map((w) => [w.id, w]))

function setVaulted(id, vaulted, note) {
  const w = byId.get(id)
  if (!w) {
    console.error('missing encyclopedia id', id)
    return
  }
  w.vaulted = vaulted
  if (note) w.note = note
}

setVaulted(
  'midas_masterpiece',
  true,
  'Vaulted in v42.40 (15 Oct 2026). Launch Mythic pistol — history only.'
)
setVaulted(
  'sweeper_shotgun',
  false,
  'Override v42.10 unvault. v42.40 slightly increased fire rate — confirm in-game.'
)
setVaulted(
  'wood_stake_shotgun',
  false,
  'Fortnitemares v42.30 unvault. Still in the pool after v42.40.'
)
setVaulted(
  'dual_fiend_hunters',
  false,
  'Fortnitemares v42.30 unvault. Still in the pool after v42.40.'
)
setVaulted(
  'heavy_assault_rifle',
  false,
  'Fortnitemares v42.30 unvault. Still in the pool after v42.40.'
)
setVaulted(
  'gatekeeper_shotgun',
  false,
  'v42.40 Loot Hack — can appear from hacked chests, not a guaranteed floor spawn.'
)
setVaulted(
  'hunting_rifle',
  false,
  'v42.40 Loot Hack — can appear from hacked chests, not a guaranteed floor spawn.'
)
setVaulted(
  'thornes_vampiric_blade',
  false,
  'v42.40 Loot Hack — Mythic melee from hacked chests.'
)
setVaulted(
  'drum_gun',
  true,
  'Vaulted in Fortnitemares v42.30 (1 Oct 2026).'
)
setVaulted(
  'ranger_assault_rifle',
  true,
  'Vaulted in Fortnitemares v42.30 (1 Oct 2026).'
)

writeFileSync(encPath, JSON.stringify(encyclopedia))
console.log('encyclopedia patched')

const changes = JSON.parse(readFileSync(changesPath, 'utf8'))
changes.updatedAt = '2026-10-24'
changes.sourceNote =
  'Compiled from Epic Override patch notes (v42.00–v42.40), Fortnite wiki history, and community trackers. Numbers are reference values — always confirm in-game after updates. Loot-pool rows use In BR loot pool 0/1 for vault/unvault. Relative % rows (Sweeper fire rate, Rebecca’s Guns) reflect Epic’s qualitative notes when absolute sheet values were not published.'

const v4240 = {
  date: '2026-10-15',
  label: 'October 15, 2026 — Override (v42.40)',
  entries: [
    {
      rarity: 'Epic',
      name: 'Sweeper Shotgun',
      stats: [
        { stat: 'Fire Rate (relative)', old: 100, new: 108, change: 8 },
      ],
    },
    {
      rarity: 'Mythic',
      name: "Midas' Masterpiece",
      stats: [{ stat: 'In BR loot pool', old: 1, new: 0, change: -1 }],
    },
    {
      rarity: 'Epic',
      name: 'Witch Broom',
      stats: [{ stat: 'In BR loot pool', old: 1, new: 0, change: -1 }],
    },
    {
      rarity: 'Mythic',
      name: "Thorne's Vampiric Blade",
      stats: [{ stat: 'In BR loot pool', old: 0, new: 1, change: 1 }],
    },
    {
      rarity: 'Epic',
      name: 'Finger Guns',
      stats: [{ stat: 'In BR loot pool', old: 0, new: 1, change: 1 }],
    },
    {
      rarity: 'Legendary',
      name: 'Gatekeeper Shotgun',
      stats: [{ stat: 'In BR loot pool', old: 0, new: 1, change: 1 }],
    },
    {
      rarity: 'Legendary',
      name: 'Hunting Rifle',
      stats: [{ stat: 'In BR loot pool', old: 0, new: 1, change: 1 }],
    },
    {
      rarity: 'Rare',
      name: 'Slap Splash',
      stats: [{ stat: 'In BR loot pool', old: 0, new: 1, change: 1 }],
    },
  ],
}

if (changes.patches[0]?.date === '2026-10-15') {
  changes.patches[0] = v4240
} else {
  changes.patches.unshift(v4240)
}

writeFileSync(changesPath, JSON.stringify(changes, null, 2) + '\n')
console.log('weapon-changes patched', changes.patches[0].label)
