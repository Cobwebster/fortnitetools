/** Fortnite Festival daily Jam Tracks (Music Library rotation). */

export type JamTrackDifficulty = {
  vocals?: number
  bass?: number
  guitar?: number
  drums?: number
  plasticVocals?: number
  plasticBass?: number
  plasticGuitar?: number
  plasticDrums?: number
}

export type JamTrack = {
  id: string
  title: string
  artist: string
  cover: string | null
  bpm: number | null
  duration: string | null
  releaseYear: number | null
  difficulties: JamTrackDifficulty
  createdAt: string | null
  lastFeatured: string | null
  previewUrl: string | null
  isNew: boolean
  isFeatured: boolean
}

export type DailyJamTracksSnapshot = {
  updatedAt: string | null
  seasonEnd: string | null
  dayKey: string
  nextRefreshAt: string
  featured: JamTrack[]
  recent: JamTrack[]
  newTracks: JamTrack[]
  totalCatalog: number
}

type RawTrack = {
  id?: string
  title?: string
  artist?: string
  cover?: string | null
  bpm?: number | null
  duration?: string | null
  releaseYear?: number | null
  difficulties?: JamTrackDifficulty
  createdAt?: string | null
  lastFeatured?: string | null
  previewUrl?: string | null
}

type RawCatalog = {
  _metadata?: { seasonEnd?: string; lastUpdated?: string }
  [key: string]: RawTrack | { seasonEnd?: string; lastUpdated?: string } | undefined
}

const TRACKS_URL = 'https://fnfestival.co/data/tracks.json'
const NEW_WINDOW_DAYS = 10
const RECENT_WINDOW_DAYS = 7

export function utcDayKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export function nextUtcMidnight(d = new Date()) {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0)
  )
}

function daysBetween(isoDay: string, today: string) {
  const a = Date.parse(`${isoDay}T00:00:00.000Z`)
  const b = Date.parse(`${today}T00:00:00.000Z`)
  if (!Number.isFinite(a) || !Number.isFinite(b)) return Number.POSITIVE_INFINITY
  return Math.round((b - a) / 86_400_000)
}

function normalize(raw: RawTrack, today: string): JamTrack | null {
  if (!raw?.title || !raw?.artist) return null
  const id = String(raw.id || raw.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
  const createdDay = raw.createdAt?.slice(0, 10) || null
  const featuredDay = raw.lastFeatured?.slice(0, 10) || null
  const isFeatured = featuredDay === today
  const isNew =
    Boolean(createdDay) && daysBetween(createdDay!, today) >= 0 && daysBetween(createdDay!, today) <= NEW_WINDOW_DAYS

  return {
    id,
    title: raw.title.trim(),
    artist: raw.artist.trim(),
    cover: raw.cover || null,
    bpm: typeof raw.bpm === 'number' ? raw.bpm : null,
    duration: raw.duration || null,
    releaseYear: typeof raw.releaseYear === 'number' ? raw.releaseYear : null,
    difficulties: raw.difficulties || {},
    createdAt: raw.createdAt || null,
    lastFeatured: raw.lastFeatured || null,
    previewUrl: raw.previewUrl || null,
    isNew,
    isFeatured,
  }
}

export async function fetchDailyJamTracks(): Promise<DailyJamTracksSnapshot> {
  const today = utcDayKey()
  const res = await fetch(TRACKS_URL, {
    next: { revalidate: 1800 },
    headers: { Accept: 'application/json', 'User-Agent': 'FortniteTools/1.0' },
  })
  if (!res.ok) {
    throw new Error(`Jam tracks fetch failed (${res.status})`)
  }
  const data = (await res.json()) as RawCatalog
  const meta = data._metadata
  const tracks: JamTrack[] = []

  for (const [key, value] of Object.entries(data)) {
    if (key === '_metadata' || !value || typeof value !== 'object') continue
    const row = value as RawTrack
    const track = normalize({ ...row, id: row.id || key }, today)
    if (track) tracks.push(track)
  }

  const featured = tracks
    .filter((t) => t.isFeatured)
    .sort((a, b) => a.title.localeCompare(b.title))

  const newTracks = tracks
    .filter((t) => t.isNew)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '') || a.title.localeCompare(b.title))

  const recent = tracks
    .filter((t) => {
      if (t.isFeatured || !t.lastFeatured) return false
      const day = t.lastFeatured.slice(0, 10)
      const age = daysBetween(day, today)
      return age > 0 && age <= RECENT_WINDOW_DAYS
    })
    .sort((a, b) => (b.lastFeatured || '').localeCompare(a.lastFeatured || '') || a.title.localeCompare(b.title))

  return {
    updatedAt: meta?.lastUpdated || null,
    seasonEnd: meta?.seasonEnd || null,
    dayKey: today,
    nextRefreshAt: nextUtcMidnight().toISOString(),
    featured,
    recent,
    newTracks,
    totalCatalog: tracks.length,
  }
}

export const JAM_TRACKS_FAQS = [
  {
    question: 'What are Fortnite Daily Jam Tracks?',
    answer:
      'Every day at 00:00 UTC, Festival’s Music Library features a free rotation of Jam Tracks on Main Stage and Battle Stage. You can pick those songs without owning them in the Item Shop.',
  },
  {
    question: 'When do Daily Jam Tracks refresh?',
    answer:
      'The featured rotation refreshes daily at midnight UTC (00:00). The countdown on this page counts down to that reset.',
  },
  {
    question: 'Can I play the YouTube video for a Jam Track?',
    answer:
      'Yes. Click a track card to open the player. We embed a YouTube search result for that song so you can listen while you decide what to queue in Festival.',
  },
  {
    question: 'Are featured Jam Tracks free forever?',
    answer:
      'No. Featured tracks are free to select for that day only. Owning a Jam Track in your locker is separate — buy it in the Item Shop if you want it permanently.',
  },
  {
    question: 'What are New vs Featured Jam Tracks?',
    answer:
      'New tracks usually landed in the shop / catalog recently and often sit in the featured rotation for several days. Featured is today’s free Music Library pool. Recently rotated tracks were featured in the last week but are not free today.',
  },
]
