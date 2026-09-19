import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type LeaderboardEntry = {
  rank: number
  name: string
  accountId: string
  value: number
  bpLevel: number | null
  kd: number | null
}

export type StatsLeaderboardSnapshot = {
  generatedAt: string
  source: string
  note: string
  timeWindow: string
  accountType: string
  trackedCount: number
  failedCount: number
  boards: {
    level: LeaderboardEntry[]
    wins: LeaderboardEntry[]
    kills: LeaderboardEntry[]
    time: LeaderboardEntry[]
  }
}

const DATA_PATH = path.join(process.cwd(), 'data', 'stats-leaderboard.json')

export async function loadStatsLeaderboard(): Promise<StatsLeaderboardSnapshot | null> {
  try {
    const raw = await readFile(DATA_PATH, 'utf8')
    return JSON.parse(raw) as StatsLeaderboardSnapshot
  } catch {
    return null
  }
}

export function formatPlayTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return `${h.toLocaleString('en-US')}H ${m}M`
}

export function formatBoardValue(
  board: 'level' | 'wins' | 'kills' | 'time',
  value: number
): string {
  if (board === 'time') return formatPlayTime(value)
  return value.toLocaleString('en-US')
}

export const LEADERBOARD_BOARD_META = [
  {
    id: 'wins' as const,
    title: 'BR Wins',
    column: 'Wins',
    blurb: 'Season wins among accounts we track (Fortnite-API overall).',
  },
  {
    id: 'kills' as const,
    title: 'BR Kills',
    column: 'Kills',
    blurb: 'Season eliminations among the same tracked set.',
  },
  {
    id: 'level' as const,
    title: 'Battle Pass Level',
    column: 'Level',
    blurb: 'Current Battle Pass level from the same poll.',
  },
  {
    id: 'time' as const,
    title: 'BR Time Played',
    column: 'Time',
    blurb: 'Season minutes played, shown as hours and minutes.',
  },
]
