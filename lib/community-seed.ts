import {
  PRESETS,
  buildLoadoutSharePath,
  presetToBundle,
} from '@/lib/loadout'
import type { CommunityKind, CommunitySubmission } from '@/lib/community-submissions'

/**
 * Static showcase loadouts — hardcoded in the repo, never read from Supabase.
 * Real player uploads stay in the DB; these only fill the board with known-good kits.
 */
const SEED_LOADOUT_META: {
  presetId: string
  id: string
  creator: string
  title: string
  body: string
  daysAgo: number
}[] = [
  {
    presetId: 'aggressive',
    id: 'a1000000-0000-4000-8000-000000000001',
    creator: 'NovaDrop',
    title: 'Aggressive pubs — 8-Bit + Heavy AR',
    body: 'Hot drop kit: 8-Bit Shotgun, Heavy Assault Rifle, Tactical Pistol, Small Pots, Sonic sneakers. Spray first, rotate second.',
    daysAgo: 2,
  },
  {
    presetId: 'box',
    id: 'a1000000-0000-4000-8000-000000000002',
    creator: 'BoxTheory',
    title: 'Classic Pump box fight kit',
    body: 'Pump Shotgun, Assault Rifle, Ranger Pistol, Big Pots, Shockwaves. First-shot pump kit for box fights.',
    daysAgo: 4,
  },
  {
    presetId: 'zero-build',
    id: 'a1000000-0000-4000-8000-000000000003',
    creator: 'NaturalCover',
    title: 'Zero Build — Grappler + Sweeper',
    body: 'Sweeper Shotgun, Assault Rifle, Tactical Pistol, Slap Juice, Grappler. Zero mats — natural cover and swing mobility only.',
    daysAgo: 5,
  },
  {
    presetId: 'fortnitemares',
    id: 'a1000000-0000-4000-8000-000000000004',
    creator: 'SpookQueue',
    title: 'Fortnitemares Wood Stake + Rift',
    body: 'Wood Stake Shotgun, Heavy AR, Dual Fiend Hunters, Chug Jug, Rift-to-Go. Event pressure kit with a sky rotate.',
    daysAgo: 1,
  },
  {
    presetId: 'mega-buster',
    id: 'a1000000-0000-4000-8000-000000000005',
    creator: 'ChargeShot',
    title: 'Mega Buster lane',
    body: '8-Bit Shotgun, Mega Buster, Tactical Pistol, Guzzle Juice, Overdrive. Charge lanes + cleanup sidearm.',
    daysAgo: 3,
  },
]

function daysAgoIso(days: number) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - days)
  d.setUTCHours(15, 30, 0, 0)
  return d.toISOString()
}

export function getSeedLoadoutSubmissions(): CommunitySubmission[] {
  return SEED_LOADOUT_META.map((seed) => {
    const preset = PRESETS.find((p) => p.id === seed.presetId)
    if (!preset) {
      return null
    }
    const path = buildLoadoutSharePath(presetToBundle(preset))
    return {
      id: seed.id,
      created_at: daysAgoIso(seed.daysAgo),
      user_id: null,
      creator_name: seed.creator,
      kind: 'loadout' as CommunityKind,
      title: seed.title,
      body: seed.body,
      payload: {
        loadout_url: path,
        seeded: true,
        preset_id: seed.presetId,
      },
      status: 'approved' as const,
    }
  }).filter(Boolean) as CommunitySubmission[]
}

export const SEED_LOADOUT_IDS = new Set(SEED_LOADOUT_META.map((s) => s.id))
