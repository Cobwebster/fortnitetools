import { fetchNewCosmetics } from '@/lib/fortnite-api'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 7200

export async function GET() {
  try {
    const data = await fetchNewCosmetics()
    return jsonCached(data, { sMaxAge: 7200, swr: 14_400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load new cosmetics'
    return jsonError(message, 502, { sMaxAge: 60 })
  }
}
