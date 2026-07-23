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
 * Curated Creative island database (SEO + search).
 * Verify codes in Discover — Epic can disable islands anytime.
 */
export const CREATIVE_MAPS: CreativeMap[] = [
  // XP
  {
    id: 'fortm',
    name: 'FortM',
    code: '6163-6465-2983',
    players: '1-4',
    genre: 'xp',
    xpRating: 5,
    tags: ['xp', 'afk', 'farm', 'level up', 'battle pass', 'map codes'],
    description: 'One of the most-searched Fortnite XP map codes — built for fast Creative leveling toward the daily cap.',
    featured: true,
  },
  {
    id: '50-fashion-show',
    name: '50 Fashion Show',
    code: '3399-8889-2099',
    players: '1-16',
    genre: 'xp',
    xpRating: 5,
    tags: ['xp', 'fashion', 'social', 'afk', 'map codes', 'hangout'],
    description: 'Social fashion lobby with excellent XP — great if you hate pure AFK clickers.',
    featured: true,
  },
  {
    id: 'havoc-hotel-3',
    name: 'Havoc Hotel 3',
    code: '7962-7087-3391',
    players: '1-4',
    genre: 'xp',
    xpRating: 5,
    tags: ['xp', 'hotel', 'adventure', 'afk'],
    description: 'Hotel adventure map with rooms and AFK-friendly Creative XP zones.',
  },
  {
    id: 'cars-mega-ramp',
    name: 'Cars Mega Ramp',
    code: '5442-4943-3475',
    players: '1-4',
    genre: 'xp',
    xpRating: 4,
    tags: ['xp', 'cars', 'driving', 'ramp'],
    description: 'Driving mega-ramp XP map — steady Creative XP while you cruise.',
  },
  {
    id: 'sweaty-rvb-xp',
    name: 'Sweaty Red vs Blue',
    code: '6531-4403-0726',
    players: '1-16',
    genre: 'xp',
    xpRating: 4,
    tags: ['xp', 'red vs blue', 'pvp', 'team deathmatch'],
    description: 'Fight-focused Red vs Blue that still farms Creative XP.',
  },
  {
    id: 'prison-escape-afk',
    name: 'Prison Escape AFK',
    code: '7300-0705-2924',
    players: '1-8',
    genre: 'xp',
    xpRating: 4,
    tags: ['xp', 'escape', 'afk', 'prison'],
    description: 'Prison escape / chill lobby often used for AFK Creative XP.',
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
    description: 'Top Fortnite horror map code — psychological phobia levels, jumpscares, 1–4 players.',
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
    description: 'Story horror with Phasmophobia-style pressure — strong “horror map codes” result.',
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
    description: 'Story-driven horror escape — restore power and get out before you get hunted.',
  },
  {
    id: 'tung-zombie-city',
    name: 'Tung Zombie City Survival',
    code: '8308-4634-9351',
    players: '1-8',
    genre: 'horror',
    xpRating: 2,
    tags: ['horror', 'survival', 'pve', 'zombies'],
    creator: 'sigmasigmaboy',
    description: 'Zombie survival horror Creative island from Discover.',
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
    description: 'High-traffic Fortnite 1v1 map code for aim, edits, and piece control.',
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
    description: 'Dedicated 1v1 build-fight practice lobby.',
  },
  {
    id: 'narpz-1v1',
    name: 'Narpz 1v1 (200 Pumps)',
    code: '1766-5528-9828',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'pump', 'practice', 'competitive'],
    creator: 'eckzfnr',
    description: 'Pump-focused 1v1 practice map.',
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
    description: 'Build-fight 1v1s for mechanics warmup.',
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
    description: 'Casual 1v1 / gun-game style practice island.',
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
    description: 'Classic BHE-style 1v1 practice.',
  },
  {
    id: 'pro-motion-1v1',
    name: '1v1 PRO Motion Build Fight',
    code: '5185-0088-1470',
    players: '1-2',
    genre: '1v1',
    xpRating: 3,
    tags: ['1v1', 'build fight', 'motion'],
    creator: 'kasmo',
    description: 'Motion-oriented build fight 1v1s.',
  },

  // Tycoon
  {
    id: 'tiktoker-tycoon',
    name: 'TikToker Tycoon',
    code: '9579-5799-5653',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 5,
    tags: ['tycoon', 'xp', 'afk', 'clicker'],
    description: 'Popular Fortnite tycoon code for AFK / low-effort Creative XP.',
    featured: true,
  },
  {
    id: 'island-tycoon',
    name: 'Island Tycoon',
    code: '2778-7440-3172',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 4,
    tags: ['tycoon', 'xp', 'clicker', 'upgrade'],
    description: 'Classic island tycoon — hit the crate, upgrade, farm XP over longer sessions.',
  },
  {
    id: 'marble-tycoon',
    name: 'Marble Tycoon',
    code: '0579-1278-6667',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 4,
    tags: ['tycoon', 'xp', 'clicker'],
    description: 'Clicker tycoon often cited for high XP-per-minute farms.',
  },
  {
    id: 'squid-tycoon',
    name: 'Squid Game Tycoon',
    code: '5655-2869-7519',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 4,
    tags: ['tycoon', 'xp', 'afk'],
    description: 'Theme tycoon with AFK-friendly XP loops.',
  },
  {
    id: 'drain-the-pound',
    name: 'Drain The Pound',
    code: '0623-3991-3877',
    players: '1-4',
    genre: 'tycoon',
    xpRating: 2,
    tags: ['tycoon', 'adventure', 'exploration'],
    creator: 'fortpixel',
    description: 'Adventure / tycoon hybrid from Discover.',
  },
  {
    id: 'emoji-brainrot-tycoon',
    name: 'Guess Emoji for Brainrots',
    code: '6157-8726-3152',
    players: '1-8',
    genre: 'tycoon',
    xpRating: 2,
    tags: ['tycoon', 'simulator', 'casual'],
    creator: 'craftas',
    description: 'Casual simulator / tycoon-style Discover map.',
  },

  // Escape room
  {
    id: '9999-iq-escape',
    name: '9999 IQ Test Escape Room',
    code: '9068-3104-5533',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape room', 'puzzle', 'iq', 'strategy'],
    creator: 'dummymaps',
    description: 'Puzzle escape room — matches Fortnite escape room codes searches.',
    featured: true,
  },
  {
    id: 'chihuahua-iq-escape',
    name: "Chihuahua's IQ Escape Room",
    code: '6333-2595-7756',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape room', 'puzzle', 'parkour'],
    creator: 'rtdox',
    description: 'IQ / escape-room style Creative puzzle map.',
  },
  {
    id: 'forecraft-escape',
    name: 'FORECRATF 32 Escape Room',
    code: '6121-0261-9857',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape room', 'parkour', 'puzzle'],
    creator: 'pikus',
    description: 'Multi-level escape room / parkour hybrid.',
  },
  {
    id: 'mineblock-escape',
    name: 'Escape Mineblock Creeper',
    code: '4938-1544-4336',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape', 'puzzle', 'casual'],
    creator: 'fejzzicreative',
    description: 'Themed escape map with multiple levels.',
  },
  {
    id: 'escape-the-island',
    name: 'Escape The Island',
    code: '8000-4415-7826',
    players: '1-4',
    genre: 'escape',
    xpRating: 2,
    tags: ['escape', 'roguelike', 'co-op', 'boss'],
    creator: 'pastis',
    description: 'Roguelike co-op escape adventure with boss fights.',
  },

  // Deathrun
  {
    id: 'apex-deathrun',
    name: 'Apex Deathrun 1.0',
    code: '6820-1230-9198',
    players: '1-16',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'hard'],
    creator: 'karatemasterfn',
    description: 'Hard deathrun / parkour Creative map.',
  },
  {
    id: '75-deathrun',
    name: '75+ Levels Easy to Hard Deathrun',
    code: '0929-3486-9461',
    players: '1-16',
    genre: 'deathrun',
    xpRating: 2,
    tags: ['deathrun', 'parkour', 'levels'],
    creator: 'kurtyprod',
    description: 'Long progressive deathrun from easy to hard.',
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
    description: 'Huge hard deathrun for parkour grinders.',
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
    description: 'Medium difficulty parkour / deathrun.',
  },

  // Zone wars / box / practice / pvp / social
  {
    id: 'catch-or-die-zw',
    name: 'Catch Or Die',
    code: '8117-1341-2072',
    players: '1-16',
    genre: 'zonewars',
    xpRating: 2,
    tags: ['zonewars', 'practice', 'pvp', 'funny'],
    creator: 'paifman',
    description: 'Zone Wars flavored practice / PvP Discover map.',
  },
  {
    id: '1v1v1-zonewars',
    name: '1v1v1v1v1v1v1 Zone Wars',
    code: '4691-5124-0108',
    players: '1-16',
    genre: 'zonewars',
    xpRating: 2,
    tags: ['zonewars', '1v1', '2v2', '3v3'],
    creator: 'aurakai',
    description: 'FFA / multi-way Zone Wars style lobby.',
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
    description: 'Realistic Reload FFA / Zone Wars hybrid.',
  },
  {
    id: 'speed-2v2-arena',
    name: 'Speed 2v2 Arena',
    code: '8421-5636-8362',
    players: '1-16',
    genre: 'boxfight',
    xpRating: 3,
    tags: ['box fights', '2v2', 'arena', 'xp', 'practice'],
    description: 'Fast arena / box-fight style practice with active XP.',
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
    description: 'Bridge 2v2 Red vs Blue practice fights.',
  },
  {
    id: 'rvb-close',
    name: 'Red vs Blue End on Target',
    code: '9227-8576-9791',
    players: '1-16',
    genre: 'pvp',
    xpRating: 2,
    tags: ['red vs blue', 'team deathmatch', 'pvp'],
    creator: 'calyven',
    description: 'Team deathmatch Red vs Blue PvP Discover map.',
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
