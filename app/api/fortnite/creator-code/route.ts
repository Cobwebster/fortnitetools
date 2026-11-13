import { NextRequest } from 'next/server'
import { lookupCreatorCode } from '@/lib/creator-code'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 3600

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || ''
  if (!name.trim()) {
    return jsonError('Missing name', 400, { sMaxAge: 300 })
  }
  try {
    const data = await lookupCreatorCode(name)
    if (!data) {
      return jsonCached({ found: false }, { status: 404, sMaxAge: 600, swr: 3600 })
    }
    return jsonCached(data, { sMaxAge: 3600, swr: 86_400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lookup failed'
    return jsonError(message, 502, { sMaxAge: 30 })
  }
}
