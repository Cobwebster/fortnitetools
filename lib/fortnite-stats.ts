const API_BASE = 'https://fortnite-api.com'

export type StatsAccountType = 'epic' | 'psn' | 'xbl'
export type StatsTimeWindow = 'lifetime' | 'season'

export type PlaylistStats = {
  score: number | null
  scorePerMin: number | null
  scorePerMatch: number | null
  wins: number | null
  top3: number | null
  top5: number | null
  top6: number | null
  top10: number | null
  top12: number | null
  top25: number | null
  kills: number | null
  killsPerMin: number | null
  killsPerMatch: number | null
  deaths: number | null
  kd: number | null
  matches: number | null
  winRate: number | null
  minutesPlayed: number | null
  playersOutlived: number | null
  lastModified: string | null
}

export type InputStats = {
  overall: PlaylistStats | null
  solo: PlaylistStats | null
  duo: PlaylistStats | null
  trio: PlaylistStats | null
  squad: PlaylistStats | null
  ltm: PlaylistStats | null
}

export type PlayerStatsResult = {
  account: { id: string; name: string }
  battlePass: { level: number; progress: number } | null
  image: string | null
  timeWindow: StatsTimeWindow
  accountType: StatsAccountType
  inputs: {
    all: InputStats | null
    keyboardMouse: InputStats | null
    gamepad: InputStats | null
    touch: InputStats | null
  }
}

function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

function str(v: unknown): string | null {
  return typeof v === 'string' && v.length > 0 ? v : null
}

function normalizePlaylist(raw: unknown): PlaylistStats | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  return {
    score: num(r.score),
    scorePerMin: num(r.scorePerMin),
    scorePerMatch: num(r.scorePerMatch),
    wins: num(r.wins),
    top3: num(r.top3),
    top5: num(r.top5),
    top6: num(r.top6),
    top10: num(r.top10),
    top12: num(r.top12),
    top25: num(r.top25),
    kills: num(r.kills),
    killsPerMin: num(r.killsPerMin),
    killsPerMatch: num(r.killsPerMatch),
    deaths: num(r.deaths),
    kd: num(r.kd),
    matches: num(r.matches),
    winRate: num(r.winRate),
    minutesPlayed: num(r.minutesPlayed),
    playersOutlived: num(r.playersOutlived),
    lastModified: str(r.lastModified),
  }
}

function normalizeInput(raw: unknown): InputStats | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  return {
    overall: normalizePlaylist(r.overall),
    solo: normalizePlaylist(r.solo),
    duo: normalizePlaylist(r.duo),
    trio: normalizePlaylist(r.trio),
    squad: normalizePlaylist(r.squad),
    ltm: normalizePlaylist(r.ltm),
  }
}

export class FortniteStatsError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export function getFortniteApiKey(): string | null {
  return process.env.FORTNITE_API_KEY?.trim() || null
}

export async function fetchPlayerStats(options: {
  name: string
  accountType?: StatsAccountType
  timeWindow?: StatsTimeWindow
  includeImage?: boolean
}): Promise<PlayerStatsResult> {
  const key = getFortniteApiKey()
  if (!key) {
    throw new FortniteStatsError(
      'Player stats are not configured yet. Add FORTNITE_API_KEY to the server environment.',
      503
    )
  }

  const name = options.name.trim()
  if (!name || name.length > 32) {
    throw new FortniteStatsError('Enter a valid Epic display name (1–32 characters).', 400)
  }

  const accountType = options.accountType || 'epic'
  const timeWindow = options.timeWindow || 'lifetime'
  const params = new URLSearchParams({
    name,
    accountType,
    timeWindow,
  })
  if (options.includeImage !== false) {
    params.set('image', 'all')
  }

  const res = await fetch(`${API_BASE}/v2/stats/br/v2?${params}`, {
    headers: { Authorization: key },
    next: { revalidate: 60 },
  })

  const json = (await res.json().catch(() => null)) as {
    status?: number
    error?: string
    data?: Record<string, unknown>
  } | null

  if (!res.ok || !json?.data) {
    const status = res.status === 404 ? 404 : res.status === 403 ? 403 : res.status >= 400 ? res.status : 502
    const message =
      json?.error ||
      (status === 404
        ? 'Player not found. Check the spelling, platform, or whether their stats are private.'
        : status === 403
          ? 'Stats are private or the API key cannot access this account.'
          : 'Could not load Fortnite stats right now. Try again in a moment.')
    throw new FortniteStatsError(message, status)
  }

  const data = json.data
  const account = (data.account || {}) as Record<string, unknown>
  const battlePass = (data.battlePass || null) as Record<string, unknown> | null
  const stats = (data.stats || {}) as Record<string, unknown>

  return {
    account: {
      id: String(account.id || ''),
      name: String(account.name || name),
    },
    battlePass: battlePass
      ? {
          level: num(battlePass.level) ?? 0,
          progress: num(battlePass.progress) ?? 0,
        }
      : null,
    image: str(data.image),
    timeWindow,
    accountType,
    inputs: {
      all: normalizeInput(stats.all),
      keyboardMouse: normalizeInput(stats.keyboardMouse),
      gamepad: normalizeInput(stats.gamepad),
      touch: normalizeInput(stats.touch),
    },
  }
}

export function formatStat(n: number | null | undefined, digits = 0): string {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
}

export const PLAYLIST_LABELS: Record<keyof InputStats, string> = {
  overall: 'Overall',
  solo: 'Solo',
  duo: 'Duo',
  trio: 'Trio',
  squad: 'Squad',
  ltm: 'LTM',
}

export const INPUT_LABELS = {
  all: 'All inputs',
  keyboardMouse: 'Keyboard & Mouse',
  gamepad: 'Controller',
  touch: 'Touch',
} as const
