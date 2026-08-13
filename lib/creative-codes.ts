export type CreativeGenre =
  | 'xp'
  | 'horror'
  | '1v1'
  | 'tycoon'
  | 'escape'
  | 'deathrun'
  | 'zonewars'
  | 'boxfight'
  | 'practice'
  | 'pvp'
  | 'social'
  | 'other'

export type CreativeMap = {
  id: string
  name: string
  code: string
  /** Displayed player range, e.g. "1-4" or "1-16" */
  players: string
  genre: CreativeGenre
  /** Curated XP farming potential 1–5 (not an official Epic rating). */
  xpRating: 1 | 2 | 3 | 4 | 5
  tags: string[]
  creator?: string
  description: string
  /** Optional screenshot URL when we have a stable public asset. */
  screenshot?: string | null
  featured?: boolean
}

export type CreativeMapLive = CreativeMap & {
  liveUniquePlayers?: number | null
  livePlays?: number | null
  livePeakCcu?: number | null
  liveTitle?: string | null
}

export const CREATIVE_GENRES: {
  id: CreativeGenre | 'all'
  label: string
  searchLabel: string
}[] = [
  { id: 'all', label: 'All', searchLabel: 'Fortnite map codes' },
  { id: 'xp', label: 'XP Maps', searchLabel: 'Fortnite XP map codes' },
  { id: 'horror', label: 'Horror', searchLabel: 'Fortnite horror map codes' },
  { id: '1v1', label: '1v1', searchLabel: 'Fortnite 1v1 map codes' },
  { id: 'tycoon', label: 'Tycoon', searchLabel: 'Fortnite tycoon codes' },
  { id: 'escape', label: 'Escape Room', searchLabel: 'Fortnite escape room codes' },
  { id: 'deathrun', label: 'Deathrun', searchLabel: 'Fortnite deathrun codes' },
  { id: 'zonewars', label: 'Zone Wars', searchLabel: 'Fortnite zone wars codes' },
  { id: 'boxfight', label: 'Box Fights', searchLabel: 'Fortnite box fight codes' },
  { id: 'practice', label: 'Practice', searchLabel: 'Fortnite practice map codes' },
  { id: 'pvp', label: 'PvP', searchLabel: 'Fortnite PvP map codes' },
  { id: 'social', label: 'Social', searchLabel: 'Fortnite social map codes' },
]

/**
 * Curated Creative islands that still resolve on Epic’s public island API.
 * Thumbnails are official Discover art (Epic creator CDN). Drop codes that 404.
 */
export const CREATIVE_MAPS: CreativeMap[] = [
  {
    id: 'fortm',
    name: 'FortM',
    code: '6163-6465-2983',
    players: '1-4',
    genre: 'xp',
    xpRating: 5,
    tags: ['xp', 'afk', 'farm', 'level up', 'battle pass'],
    creator: 'poobie',
    description: 'The usual XP farm — load a private match and grind toward the daily Creative cap.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/bRXUJdMVLihLIoRCDU/image/landscape_comp.jpeg',
    featured: true,
  },
  {
    id: 'prison-breakout-v2',
    name: 'Prison Breakout V2',
    code: '6531-4403-0726',
    players: '1-16',
    genre: 'xp',
    xpRating: 4,
    tags: ['xp', 'prison', 'escape', 'pve'],
    creator: 'breakoutgames',
    description: 'Break out, loot, and loop — still a solid Creative XP session if FortM is packed.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/EAkWreHivKZYwntQgp/image/landscape_comp_b.jpeg',
  },
  {
    id: 'prison-escape-roguelike',
    name: 'Prison Escape',
    code: '7300-0705-2924',
    players: '1-8',
    genre: 'xp',
    xpRating: 4,
    tags: ['xp', 'escape', 'roguelike', 'prison'],
    creator: 'itemi',
    description: 'Roguelike prison runs with Creative XP while you push deeper each attempt.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/ehubtCzgioHoXTfdJZ/image/landscape_comp.jpeg',
  },

  // Horror
  {
    id: 'face-your-fears',
    name: 'Face Your Fears',
    code: '8124-4632-3952',
    players: '1-4',
    genre: 'horror',
    xpRating: 3,
    tags: ['horror', 'story', 'jumpscare', 'first person', 'phobia'],
    creator: 'isaac_ll',
    description: 'Phobia rooms and jumpscares — turn the volume up, play with 1–4 people.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/TXZipSEspbkuCWKlhm/image/landscape_comp_b.jpeg',
    featured: true,
  },
  {
    id: 'midnight-anomalies',
    name: 'Midnight Anomalies',
    code: '7045-9107-6028',
    players: '1-4',
    genre: 'horror',
    xpRating: 3,
    tags: ['horror', 'survival', 'first person', 'escape'],
    creator: 'bigwahed',
    description: 'Story horror with that Phasmophobia-style “something is in here with you” pressure.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/eNtFIIBLUGBaODMSzD/image/landscape_comp_b.jpeg',
    featured: true,
  },
  {
    id: 'resident-evil-requiem',
    name: 'Resident Evil: Requiem',
    code: '2666-5423-3834',
    players: '1-6',
    genre: 'horror',
    xpRating: 3,
    tags: ['horror', 'escape', 'story', 'survival'],
    creator: 'yuri-gunz',
    description: 'Restore power and get out before whatever is hunting you catches up.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/CDJBUdfyaHUMqtMGES/image/landscape_comp_b.jpeg',
  },

  // 1v1
  {
    id: 'ranked-aim-edit-1v1',
    name: 'Ranked Aim Edit Piece 1v1',
    code: '4859-7673-2109',
    players: '1-2',
    genre: '1v1',
    xpRating: 4,
    tags: ['1v1', 'aim', 'edit', 'practice', 'piece control', 'warmup'],
    creator: 'jogo',
    description: 'Aim, edits, and piece control in a private 1v1 — the usual warmup.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/IvckcztksCqDodBFeS/image/landscape_comp.jpeg',
    featured: true,
  },
  {
    id: 'crpzz-1v1',
    name: 'CRPZZ 1v1 Build Fight',
    code: '4197-9357-9781',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'build fight', 'practice', 'competitive'],
    creator: 'sgarufato',
    description: 'Straight 1v1 build fights — no extra modes, just pieces.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/PFeWZXYRFWwUZOpekD/image/landscape_comp.jpeg',
  },
  {
    id: 'locotq-1v1',
    name: 'LocoTQ 1v1 Build Fights',
    code: '4374-4875-8305',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'building', 'practice'],
    creator: 'locotq',
    description: 'Another clean build-fight 1v1 if CRPZZ is full.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/uMePXinbhDSpZVpBPv/image/landscape_comp.jpeg',
  },
  {
    id: 'better-1v1',
    name: 'Better 1v1',
    code: '5790-7362-9919',
    players: '1-2',
    genre: '1v1',
    xpRating: 2,
    tags: ['1v1', 'gun game', 'practice'],
    creator: 'foel',
    description: 'Casual 1v1 / gun-game — good when you don’t want a sweat lobby.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/PMtVFkcvLWZtVWpMiM/image/landscape_comp.jpeg',
  },
  {
    id: 'bhe-1v1',
    name: 'Classic BHE 1v1',
    code: '4740-2481-2825',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'practice', 'pvp'],
    creator: 'zimo999',
    description: 'Old-school BHE 1v1 layout for piece control.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/WQXwIpsOSsMSReesTK/image/landscape_comp.jpeg',
  },
  {
    id: 'pro-motion-1v1',
    name: '1v1 PRO Motion',
    code: '5185-0088-1470',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'build fight', 'motion'],
    creator: 'kasmo',
    description: 'Build fights with more movement space than a box.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/wlngvaaSrMNRsMHvCX/image/landscape_comp.jpeg',
  },

  // Tycoon
  {
    id: 'marble-tycoon',
    name: 'Marble Tycoon',
    code: '0579-1278-6667',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 5,
    tags: ['tycoon', 'xp', 'clicker'],
    creator: 'frostmouse',
    description: 'Hit the box, upgrade, repeat. Easy Creative XP if you don’t want a PvP farm.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/yNWtBbHBUpOATOlXCS/image/landscape_comp_b.jpeg',
    featured: true,
  },
  {
    id: 'squid-tycoon',
    name: 'Squid Game Tycoon',
    code: '5655-2869-7519',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 4,
    tags: ['tycoon', 'xp', 'afk'],
    creator: 'frostmouse',
    description: 'Same tycoon loop with the Squid Game dressing — AFK-friendly XP.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/NyqjkcosivrJoluBUt/image/landscape_comp.jpeg',
  },
  {
    id: 'drain-the-pond',
    name: 'Drain The Pond',
    code: '0623-3991-3877',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 2,
    tags: ['tycoon', 'adventure', 'exploration'],
    creator: 'fortpixel',
    description: 'Explore and drain the pond — more adventure than a pure clicker.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/UIacpamFkdkkvwYTDW/image/landscape_comp_b.jpeg',
  },

  // Escape
  {
    id: 'escape-the-island',
    name: 'Escape The Island',
    code: '8000-4415-7826',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape', 'roguelike', 'co-op', 'boss'],
    creator: 'pastis',
    description: 'Co-op roguelike escape with boss fights — bring friends.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/KWNVtUaAFMfVhaVISX/image/landscape_comp.jpeg',
    featured: true,
  },

  // Deathrun
  {
    id: 'apex-deathrun',
    name: '12 Levels Extreme Hard Parkour',
    code: '6820-1230-9198',
    players: '1-16',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'hard'],
    creator: 'karatemasterfn',
    description: 'Short, nasty parkour — twelve hard levels, not a 200-stage slog.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/nwAUEDGSzawKBMyFjN/image/landscape_comp.jpeg',
  },
  {
    id: '75-deathrun',
    name: '90+ Levels Easy to Hard Deathrun',
    code: '0929-3486-9461',
    players: '1-16',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'levels'],
    creator: 'kurtyprod',
    description: 'Starts easy and ramps up — good if you want a long parkour session.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/HDWkmYuNCocchhwygH/image/landscape_comp.jpeg',
  },
  {
    id: '200-hard-deathrun',
    name: '200+ Hard Deathrun',
    code: '9289-6196-9750',
    players: '1-16',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'hard'],
    creator: 'vkmstudios',
    description: 'Huge hard deathrun if you actually like suffering through 200 stages.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/LDzvbCDQphkeHvDois/image/landscape_comp.jpeg',
  },
  {
    id: 'pet-rescue-parkour',
    name: 'Pet Rescue Parkour',
    code: '0497-3990-0584',
    players: '1-8',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'medium'],
    creator: 'tyonite',
    description: 'Medium parkour with a pet-rescue theme — less brutal than the 200+ maps.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/RUzbLbieWdhQYJhfry/image/landscape_comp.jpeg',
  },

  // Zone wars / box / practice
  {
    id: 'catch-or-die-zw',
    name: 'Catch Or Die',
    code: '8117-1341-2072',
    players: '1-16',
    genre: 'zonewars',
    xpRating: 2,
    tags: ['zonewars', 'practice', 'pvp', 'funny'],
    creator: 'paifman',
    description: 'Chaotic Zone Wars-style fights — more silly than ranked scrims.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/LSSGewsSaUgAIbnhJd/image/landscape_comp.jpeg',
  },
  {
    id: '1v1v1-zonewars',
    name: '1v1v1v1 Zone Wars',
    code: '4691-5124-0108',
    players: '1-16',
    genre: 'zonewars',
    xpRating: 2,
    tags: ['zonewars', '1v1', '2v2', '3v3'],
    creator: 'aurakai',
    description: 'Free-for-all Zone Wars — everyone drops, storm closes, last one standing.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/UgAOXnjkoOcfpXyysc/image/landscape_comp.jpeg',
  },
  {
    id: 'realistic-reload-ffa',
    name: 'Realistic 1v1v1 Reload',
    code: '4310-6752-3293',
    players: '1-16',
    genre: 'zonewars',
    xpRating: 2,
    tags: ['zonewars', '1v1', 'reload', 'pvp'],
    creator: 'sof1',
    description: 'Reload-style FFA with realistic loot — closer to pubs than a box fight.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/zCpsHUKggDQYbsItVc/image/landscape_comp.jpeg',
  },
  {
    id: 'speed-2v2-arena',
    name: 'Blitz 2v2 Arena',
    code: '8421-5636-8362',
    players: '1-16',
    genre: 'boxfight',
    xpRating: 3,
    tags: ['box fights', '2v2', 'arena', 'xp', 'practice'],
    creator: 'swissmaps',
    description: 'Fast 2v2 arena / pool wars — good for short fight reps.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/tLbqTweUBwtHQqDRcd/image/landscape_comp.jpeg',
  },
  {
    id: 'bridge-2v2',
    name: 'The Bridge Red vs Blue 2v2',
    code: '0775-4223-7904',
    players: '1-4',
    genre: 'boxfight',
    xpRating: 2,
    tags: ['2v2', 'bridge', 'building', 'practice'],
    creator: 'fullcardedvader',
    description: 'Classic bridge 2v2 — build across, take the fight in the middle.',
    screenshot: 'https://cdn-0001.qstv.on.epicgames.com/uhhxyAOVoGmqWkEFxc/image/landscape_comp.jpeg',
  },
]

export function fortniteIslandUrl(map: Pick<CreativeMap, 'code' | 'creator'>) {
  if (map.creator) return `https://www.fortnite.com/@${encodeURIComponent(map.creator)}/${map.code}`
  return `https://www.fortnite.com/creative/island-codes/${map.code}`
}

export function genreLabel(genre: CreativeGenre) {
  return CREATIVE_GENRES.find((g) => g.id === genre)?.label ?? genre
}

export function filterCreativeMaps(
  maps: CreativeMap[],
  opts: { query?: string; genre?: CreativeGenre | 'all' }
) {
  const q = opts.query?.trim().toLowerCase() ?? ''
  const genre = opts.genre ?? 'all'
  return maps.filter((m) => {
    if (genre !== 'all' && m.genre !== genre) return false
    if (!q) return true
    const hay = [m.name, m.code, m.creator, m.description, m.genre, ...m.tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(q) || m.code.replace(/-/g, '').includes(q.replace(/-/g, ''))
  })
}

/** Dedupe by code (same island may appear under XP + social, etc.). */
export function uniqueMapsByCode(maps: CreativeMap[]) {
  const seen = new Set<string>()
  return maps.filter((m) => {
    if (seen.has(m.code)) return false
    seen.add(m.code)
    return true
  })
}

export function xpStars(rating: number) {
  return '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating))
}
