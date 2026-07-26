import { getSeasonCountdown } from '@/lib/season'

/** Flat XP cost per Battle Pass level (Chapter 7 Season 3). */
export const XP_PER_LEVEL = 80_000

/** Super styles / bonus track commonly run to 200. */
export const XP_LEVEL_CAP = 200

export type PlaytimeMode = {
  id: string
  name: string
  /** Approximate account XP granted per minute of play. */
  xpPerMinute: number
  /** Weekly playtime XP cap (0 = no separate weekly playtime cap listed). */
  weeklyLimit: number
}

/** Community-reference playtime XP rates — Epic changes these mid-season. */
export const PLAYTIME_MODES: PlaytimeMode[] = [
  { id: 'br', name: 'Battle Royale', xpPerMinute: 350, weeklyLimit: 4_000_000 },
  { id: 'reload', name: 'Reload', xpPerMinute: 2_000, weeklyLimit: 4_000_000 },
  { id: 'blitz', name: 'Blitz', xpPerMinute: 850, weeklyLimit: 4_000_000 },
  { id: 'ballistic', name: 'Ballistic', xpPerMinute: 2_400, weeklyLimit: 4_000_000 },
  { id: 'og', name: 'OG', xpPerMinute: 950, weeklyLimit: 4_000_000 },
  { id: 'lego_odyssey', name: 'LEGO Odyssey', xpPerMinute: 2_700, weeklyLimit: 4_000_000 },
  { id: 'lego_brick', name: 'LEGO Brick Life', xpPerMinute: 2_750, weeklyLimit: 4_000_000 },
  { id: 'festival_main', name: 'Festival Main Stage', xpPerMinute: 1_050, weeklyLimit: 4_000_000 },
  { id: 'festival_jam', name: 'Festival Jam Stage', xpPerMinute: 2_850, weeklyLimit: 4_000_000 },
  { id: 'creative', name: 'Creative', xpPerMinute: 2_850, weeklyLimit: 0 },
]

export function clampLevel(n: number, max = XP_LEVEL_CAP) {
  if (!Number.isFinite(n)) return 1
  return Math.min(max, Math.max(1, Math.floor(n)))
}

/** XP required to go from `fromLevel` to `toLevel` (level starts, no partial progress). */
export function xpBetweenLevels(fromLevel: number, toLevel: number) {
  const from = clampLevel(fromLevel)
  const to = clampLevel(toLevel)
  if (to <= from) return 0
  return (to - from) * XP_PER_LEVEL
}

export function totalXpToLevel(level: number) {
  return xpBetweenLevels(1, level)
}

/** On-pace account level for a season target (slightly ahead of pure linear progress). */
export function onPaceLevel(targetLevel: number, progressPct = getSeasonCountdown().progressPct) {
  const target = clampLevel(targetLevel)
  const buffered = Math.min(100, Math.max(0, progressPct + 2.2))
  return Math.max(1, Math.min(target, Math.round((target * buffered) / 100)))
}

export function dailyXpNeeded(currentLevel: number, targetLevel: number, daysRemaining: number) {
  const xp = xpBetweenLevels(currentLevel, targetLevel)
  const days = Math.max(1, daysRemaining)
  return Math.ceil(xp / days)
}

export function formatXp(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n))
}

export function minutesForXp(xp: number, xpPerMinute: number) {
  if (xpPerMinute <= 0) return Infinity
  return xp / xpPerMinute
}

export function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes)) return '—'
  if (minutes < 60) return `${Math.ceil(minutes)} min`
  const h = Math.floor(minutes / 60)
  const m = Math.ceil(minutes % 60)
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export type XpLevelRow = {
  level: number
  xpToNext: number
  totalXp: number
}

export function buildXpPerLevelTable(maxLevel = XP_LEVEL_CAP): XpLevelRow[] {
  const rows: XpLevelRow[] = []
  for (let level = 1; level < maxLevel; level++) {
    rows.push({
      level,
      xpToNext: XP_PER_LEVEL,
      totalXp: level * XP_PER_LEVEL,
    })
  }
  return rows
}
