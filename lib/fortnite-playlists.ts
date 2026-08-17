const API_BASE = 'https://fortnite-api.com'

export type ModeCategory =
  | 'br'
  | 'zerobuild'
  | 'ranked'
  | 'reload'
  | 'og'
  | 'ltm'
  | 'blitz'
  | 'festival'
  | 'lego'
  | 'racing'
  | 'creative'
  | 'other'

export type ModePlaylist = {
  id: string
  name: string
  subName: string | null
  description: string | null
  category: ModeCategory
  gameType: string
  minPlayers: number
  maxPlayers: number
  maxTeamSize: number
  isDefault: boolean
  isTournament: boolean
  image: string | null
  added: string | null
}

export const MODE_CATEGORY_META: { id: ModeCategory | 'all'; label: string; blurb: string }[] = [
  { id: 'all', label: 'All', blurb: 'Canonical lobby playlists after dropping test, bot, and QA rows.' },
  { id: 'br', label: 'Battle Royale', blurb: 'Classic build BR — Solo through Squads on the current island.' },
  { id: 'zerobuild', label: 'Zero Build', blurb: 'Same island, no building. Team sizes match BR.' },
  { id: 'ranked', label: 'Ranked', blurb: 'Habanero / Arena ranked queues. Names in the files are often just “Solo” — we prefix Ranked.' },
  { id: 'reload', label: 'Reload', blurb: 'BlastBerry respawn BR. Duplicate island variants collapse to the newest row per team size.' },
  { id: 'og', label: 'OG', blurb: 'Figment playlists — Chapter 1-style OG, including ranked OG when present.' },
  { id: 'ltm', label: 'LTMs', blurb: 'Limited modes Epic still ships in the files (Floor is Lava, Team Rumble, Solid Gold…).' },
  { id: 'blitz', label: 'Blitz', blurb: 'Forbidden Fruit / Blitz-style shorter matches when Epic has them enabled.' },
  { id: 'festival', label: 'Festival', blurb: 'Main Stage and Jam Stage.' },
  { id: 'lego', label: 'LEGO', blurb: 'Juno / LEGO Fortnite experiences.' },
  { id: 'racing', label: 'Rocket Racing', blurb: 'Del Mar racing queues.' },
  { id: 'creative', label: 'Creative', blurb: 'Playground / Creative matchmaking shells — island codes live on the codes page.' },
  { id: 'other', label: 'Other', blurb: 'Social / leftover rows that still look player-facing.' },
]

export const PLAYLIST_FAQS = [
  {
    question: 'Is this the live lobby list?',
    answer:
      'It is Epic’s playlist catalog from game files (via Fortnite-API), cleaned of bot, test, and QA ids. A mode can still exist in the files after it left the lobby. Cross-check Discover in-game if a tile looks stale.',
  },
  {
    question: 'Why do so many playlists say Solo or Duos?',
    answer:
      'Ranked and OG reuse the same display names as casual BR. We label Ranked when the playlist id contains Habanero (Epic’s ranked flag) and group OG / Reload by game type.',
  },
  {
    question: 'What is Reload vs Blitz vs OG?',
    answer:
      'Reload (BlastBerry) is respawn BR on rotating small islands — see the map rotation timer. OG (Figment) is the Chapter 1-style island. Blitz (Forbidden Fruit) is the faster queue when Epic has it up. Player counts for those modes are on the player-count page.',
  },
]

const JUNK =
  /bot|test|qa_|aiprofiling|pie|playtest|prototype|\[ph\]|helios|sandbox|profiling|beanstalk|vkedit|shootersftue|itemtest|paprikaplaytest|eventsandbox|coffeemuffin|disarmed|_alt$|foxtrot|deliver_|fm_build|defaultpie|_23$|_100_30|_80_40/i

type RawPlaylist = {
  id?: string
  name?: string
  subName?: string
  description?: string
  gameType?: string
  minPlayers?: number
  maxPlayers?: number
  maxTeams?: number
  maxTeamSize?: number
  isDefault?: boolean
  isTournament?: boolean
  images?: { showcase?: string; missionIcon?: string }
  added?: string
}

function isJunk(raw: RawPlaylist) {
  const id = raw.id || ''
  const name = raw.name || ''
  if (!name.trim()) return true
  if (JUNK.test(id) || JUNK.test(name)) return true
  if (/_Bots_/i.test(id)) return true
  if (/MATCHMAKING/i.test(name)) return true
  if (/beantest|testin/i.test(name)) return true
  return false
}

export function playlistCategory(raw: RawPlaylist): ModeCategory {
  const id = raw.id || ''
  const gt = raw.gameType || ''
  if (/habanero/i.test(id) || gt === 'EFortGameType::BRArena') return 'ranked'
  if (gt === 'EFortGameType::BlastBerry') return 'reload'
  if (gt === 'EFortGameType::Figment') return 'og'
  if (gt === 'EFortGameType::ZeroBuild') return 'zerobuild'
  if (gt === 'EFortGameType::BR') return 'br'
  if (gt === 'EFortGameType::BRLTM') return 'ltm'
  if (gt === 'EFortGameType::ForbiddenFruit') return 'blitz'
  if (gt.includes('Festival')) return 'festival'
  if (gt === 'EFortGameType::Juno') return 'lego'
  if (gt === 'EFortGameType::DelMar') return 'racing'
  if (/creative|playground/i.test(gt)) return 'creative'
  if (gt === 'EFortGameType::Social' && /papaya|party/i.test(`${id}${raw.name}`)) return 'other'
  return 'other'
}

function displayName(raw: RawPlaylist, category: ModeCategory) {
  let name = (raw.name || 'Playlist').trim()
  if (category === 'ranked' && !/ranked/i.test(name)) {
    name = `Ranked ${name}`
  }
  const sub = raw.subName?.trim()
  if (sub && !name.toLowerCase().includes(sub.toLowerCase()) && !/^(solo|duos|trios|squads)$/i.test(sub)) {
    return `${name} · ${sub}`
  }
  return name
}

function normalize(raw: RawPlaylist): ModePlaylist | null {
  if (!raw.id || isJunk(raw)) return null
  const category = playlistCategory(raw)
  if (category === 'other' && !raw.images?.showcase && !/papaya|party|creative/i.test(`${raw.id}${raw.name}`)) {
    return null
  }
  if (category === 'racing' && /QA_/i.test(raw.id || '')) return null
  if (category === 'ranked' && raw.gameType === 'EFortGameType::BRArena' && !raw.images?.showcase) return null

  return {
    id: raw.id,
    name: displayName(raw, category),
    subName: raw.subName || null,
    description: raw.description?.trim() || null,
    category,
    gameType: raw.gameType || 'unknown',
    minPlayers: raw.minPlayers ?? 1,
    maxPlayers: raw.maxPlayers ?? 0,
    maxTeamSize: raw.maxTeamSize ?? 1,
    isDefault: Boolean(raw.isDefault),
    isTournament: Boolean(raw.isTournament),
    image: raw.images?.showcase || raw.images?.missionIcon || null,
    added: raw.added || null,
  }
}

function teamLabel(size: number) {
  if (size <= 1) return 'solo'
  if (size === 2) return 'duo'
  if (size === 3) return 'trio'
  if (size === 4) return 'squad'
  return `t${size}`
}

function dedupeKey(p: ModePlaylist) {
  const baseName = p.name.replace(/^ranked\s+/i, '').toLowerCase()
  return `${p.category}|${teamLabel(p.maxTeamSize)}|${p.maxPlayers}|${baseName}`
}

function score(p: ModePlaylist) {
  let n = 0
  if (p.image) n += 8
  if (p.isDefault) n += 3
  if (p.description) n += 1
  if (p.added) n += Date.parse(p.added) / 1e12
  if (/ropesmile|dashberry|matchmist/i.test(p.id)) n += 2
  if (/_alt|qa_/i.test(p.id)) n -= 5
  return n
}

function dedupe(list: ModePlaylist[]) {
  const map = new Map<string, ModePlaylist>()
  for (const p of list) {
    const key = dedupeKey(p)
    const existing = map.get(key)
    if (!existing || score(p) > score(existing)) map.set(key, p)
  }
  return [...map.values()].sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category)
    if (a.maxTeamSize !== b.maxTeamSize) return a.maxTeamSize - b.maxTeamSize
    return a.name.localeCompare(b.name)
  })
}

export function teamSizeLabel(size: number) {
  if (size <= 1) return 'Solo'
  if (size === 2) return 'Duos'
  if (size === 3) return 'Trios'
  if (size === 4) return 'Squads'
  if (size === 5) return 'Quints'
  return `Team of ${size}`
}

/** Real Fortnite sprites — team size (matches the tracker playlist icons). */
export function teamSizeIcon(size: number) {
  if (size <= 1) return '/images/loadout/hunting_rifle.png'
  if (size === 2) return '/images/loadout/flex_smg.png'
  if (size === 3) return '/images/loadout/warforged_ar.png'
  if (size === 4) return '/images/loadout/striker_pump.png'
  if (size === 5) return '/images/loadout/chaos_exploder.png'
  return '/images/loadout/business_turret.png'
}

export const MODE_CATEGORY_ICONS: Record<ModeCategory | 'all', string> = {
  all: '/images/icons/map.png',
  br: '/images/icons/map.png',
  zerobuild: '/images/icons/glider.png',
  ranked: '/images/icons/crown.png',
  reload: '/images/icons/storm.png',
  og: '/images/loadout/rift.png',
  ltm: '/images/loadout/golden_apple.png',
  blitz: '/images/loadout/overdrive_grenade.png',
  festival: '/images/icons/battle_pass.png',
  lego: '/images/loadout/mat_wood.png',
  racing: '/images/loadout/grappler.png',
  creative: '/images/loadout/launch_pad.png',
  other: '/images/loadout/pulse_scanner.png',
}

export async function fetchPlaylists(): Promise<ModePlaylist[]> {
  const res = await fetch(`${API_BASE}/v1/playlists?language=en`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Playlists API failed (${res.status})`)
  const json = await res.json()
  const list = Array.isArray(json.data) ? (json.data as RawPlaylist[]) : []
  return dedupe(list.map(normalize).filter((p): p is ModePlaylist => Boolean(p)))
}
