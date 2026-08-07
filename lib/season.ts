/** Chapter 7 Season 3 (Runners) schedule — update when Epic announces the next end date. */

export const CURRENT_SEASON = {
  chapter: 7,
  season: 3,
  codename: 'Runners',
  label: 'Chapter 7 Season 3',
  shortLabel: 'C7S3',
  /** Approximate public start (UTC). */
  startIso: '2026-06-06T00:00:00.000Z',
  /**
   * Expected season rollover (UTC). Epic often flips mid-morning Americas time;
   * date is the search-critical signal — time may shift by a few hours.
   */
  endIso: '2026-08-19T08:00:00.000Z',
  /** Season-specific art we ship (C7S3 Shattered Coast map — no official Runners logo on site). */
  mapImage: '/images/map-evolution/41-10.webp',
  passIcon: '/images/icons/battle_pass.png',
  next: {
    chapter: 7,
    season: 4,
    label: 'Chapter 7 Season 4',
    startIso: '2026-08-19T08:00:00.000Z',
  },
} as const

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

/** e.g. Wednesday, August 19, 2026 */
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
