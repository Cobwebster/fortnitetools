/** Treasure Hunters (v43.00) — Epic has not numbered this as “Season 5” on the Battle Pass page. */

export const CURRENT_SEASON = {
  chapter: 7,
  season: 5,
  codename: 'Treasure Hunters',
  label: 'Treasure Hunters',
  shortLabel: 'TH',
  /** v43.00 downtime ended the morning of 1 Nov 2026 UTC. */
  startIso: '2026-11-01T08:00:00.000Z',
  /**
   * Epic told players to keep Saturday 5 December open for the Chapter 7 end event.
   * That is the date this clock uses — not a printed “pass locks at 21:00 UTC” line.
   */
  endIso: '2026-12-05T23:00:00.000Z',
  /**
   * Live minimap from Fortnite-API. Launch day still served the previous Override dump.
   * Crossbones Isle pins land when that feed updates — we do not invent coordinates.
   */
  mapImage: 'https://fortnite-api.com/images/map.png',
  passIcon: '/images/icons/battle_pass.png',
  next: {
    chapter: 8,
    season: 1,
    label: 'Chapter 8',
    startIso: '2026-12-05T23:00:00.000Z',
  },
} as const

/** Override Battle Pass / Null / Admin Panel lock — used by free-cosmetics rows that died at the flip. */
export const OVERRIDE_ENDED_ISO = '2026-11-01T23:00:00.000Z'

export type SeasonCountdownParts = {
  totalMs: number
  elapsedMs: number
  remainingMs: number
  /** 0–100 */
  progressPct: number
  daysRemaining: number
  days: number
  hours: number
  minutes: number
  seconds: number
  ended: boolean
}

export function seasonStartDate() {
  return new Date(CURRENT_SEASON.startIso)
}

export function seasonEndDate() {
  return new Date(CURRENT_SEASON.endIso)
}

export function nextSeasonStartDate() {
  return new Date(CURRENT_SEASON.next.startIso)
}

export function getSeasonCountdown(now = new Date()): SeasonCountdownParts {
  const start = seasonStartDate().getTime()
  const end = seasonEndDate().getTime()
  const t = now.getTime()
  const totalMs = Math.max(1, end - start)
  const elapsedMs = Math.min(totalMs, Math.max(0, t - start))
  const remainingMs = Math.max(0, end - t)
  const ended = remainingMs <= 0
  const progressPct = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100))

  const days = Math.floor(remainingMs / 86_400_000)
  const hours = Math.floor((remainingMs % 86_400_000) / 3_600_000)
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000)
  const seconds = Math.floor((remainingMs % 60_000) / 1000)
  const daysRemaining = ended ? 0 : days > 0 ? days : remainingMs > 0 ? 1 : 0

  return {
    totalMs,
    elapsedMs,
    remainingMs,
    progressPct,
    daysRemaining,
    days,
    hours,
    minutes,
    seconds,
    ended,
  }
}

/** e.g. Sunday, November 1, 2026 */
export function formatSeasonLongDate(date: Date, timeZone = 'UTC') {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone,
  }).format(date)
}

export function pad2(n: number) {
  return String(n).padStart(2, '0')
}
