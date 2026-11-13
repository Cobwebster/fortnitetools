import { NextRequest } from 'next/server'
import {
  FortniteStatsError,
  fetchPlayerStats,
  type StatsAccountType,
  type StatsTimeWindow,
} from '@/lib/fortnite-stats'
import { jsonCached, jsonError } from '@/lib/http-cache'

const ACCOUNT_TYPES = new Set(['epic', 'psn', 'xbl'])
const WINDOWS = new Set(['lifetime', 'season'])

/** Edge-cache identical lookups; avoid regenerating on every poll. */
export const revalidate = 300

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const name = searchParams.get('name') || ''
  const accountTypeRaw = (searchParams.get('accountType') || 'epic').toLowerCase()
  const timeWindowRaw = (searchParams.get('timeWindow') || 'lifetime').toLowerCase()

  const accountType = (ACCOUNT_TYPES.has(accountTypeRaw) ? accountTypeRaw : 'epic') as StatsAccountType
  const timeWindow = (WINDOWS.has(timeWindowRaw) ? timeWindowRaw : 'lifetime') as StatsTimeWindow

  try {
    const data = await fetchPlayerStats({ name, accountType, timeWindow, includeImage: true })
    return jsonCached(data, { sMaxAge: 300, swr: 900 })
  } catch (error) {
    if (error instanceof FortniteStatsError) {
      return jsonError(error.message, error.status, {
        sMaxAge: error.status === 404 ? 600 : 30,
      })
    }
    const message = error instanceof Error ? error.message : 'Failed to load stats'
    return jsonError(message, 502, { sMaxAge: 30 })
  }
}
