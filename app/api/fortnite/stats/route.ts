import { NextRequest, NextResponse } from 'next/server'
import {
  FortniteStatsError,
  fetchPlayerStats,
  type StatsAccountType,
  type StatsTimeWindow,
} from '@/lib/fortnite-stats'

export const dynamic = 'force-dynamic'

const ACCOUNT_TYPES = new Set(['epic', 'psn', 'xbl'])
const WINDOWS = new Set(['lifetime', 'season'])

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const name = searchParams.get('name') || ''
  const accountTypeRaw = (searchParams.get('accountType') || 'epic').toLowerCase()
  const timeWindowRaw = (searchParams.get('timeWindow') || 'lifetime').toLowerCase()

  const accountType = (ACCOUNT_TYPES.has(accountTypeRaw) ? accountTypeRaw : 'epic') as StatsAccountType
  const timeWindow = (WINDOWS.has(timeWindowRaw) ? timeWindowRaw : 'lifetime') as StatsTimeWindow

  try {
    const data = await fetchPlayerStats({ name, accountType, timeWindow, includeImage: true })
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof FortniteStatsError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    const message = error instanceof Error ? error.message : 'Failed to load stats'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
