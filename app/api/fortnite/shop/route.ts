import { fetchShop } from '@/lib/fortnite-api'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 7200

export async function GET() {
  try {
    const data = await fetchShop()
    return jsonCached(data, { sMaxAge: 7200, swr: 14_400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load shop'
    return jsonError(message, 502, { sMaxAge: 60 })
  }
}
