import { NextRequest } from 'next/server'
import { fetchCosmeticDetail } from '@/lib/fortnite-api'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 86400

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params
  if (!id) {
    return jsonError('Missing cosmetic id', 400, { sMaxAge: 300 })
  }

  try {
    const detail = await fetchCosmeticDetail(id)
    if (!detail) {
      return jsonError('Cosmetic not found', 404, { sMaxAge: 3600 })
    }
    return jsonCached(detail, { sMaxAge: 86_400, swr: 172_800 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load cosmetic'
    return jsonError(message, 502, { sMaxAge: 60 })
  }
}
