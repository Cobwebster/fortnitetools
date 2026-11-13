import { NextRequest } from 'next/server'
import { searchCosmetics } from '@/lib/fortnite-api'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 86400

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = searchParams.get('name')?.trim() || undefined
  const type = searchParams.get('type')?.trim() || undefined
  const rarity = searchParams.get('rarity')?.trim() || undefined

  if (!name && !type) {
    return jsonError('Provide a name search and/or cosmetic type.', 400, { sMaxAge: 300 })
  }

  try {
    const items = await searchCosmetics({ name, type, rarity })
    return jsonCached(
      {
        count: items.length,
        items: items.slice(0, 240),
        truncated: items.length > 240,
      },
      { sMaxAge: 86_400, swr: 172_800 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed'
    return jsonError(message, 502, { sMaxAge: 60 })
  }
}
