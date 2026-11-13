import { fetchIslandMetrics } from '@/lib/fortnite-ecosystem'
import { jsonCached, jsonError } from '@/lib/http-cache'

export const revalidate = 86400

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')?.trim()
  if (!code) {
    return jsonError('Missing island code', 400, { sMaxAge: 300 })
  }

  try {
    const snap = await fetchIslandMetrics(code, { interval: 'day' })
    if (!snap) {
      return jsonError('Island not found or no metrics yet', 404, { sMaxAge: 3600 })
    }
    return jsonCached(
      {
        code: snap.code,
        title: snap.title || code,
        creatorCode: snap.creatorCode ?? null,
        kind: snap.creatorCode === 'epic' || code.startsWith('experience_') ? 'epic' : 'creative',
        peakCcu: snap.peakCcu,
        maxPeakCcu: snap.maxPeakCcu,
        uniquePlayers: snap.uniquePlayers,
        plays: snap.plays,
      },
      { sMaxAge: 86_400, swr: 172_800 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lookup failed'
    return jsonError(message, 502, { sMaxAge: 60 })
  }
}
