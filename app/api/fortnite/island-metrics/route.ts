import { NextResponse } from 'next/server'
import { fetchIslandMetrics } from '@/lib/fortnite-ecosystem'

export const revalidate = 1800

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')?.trim()
  if (!code) {
    return NextResponse.json({ error: 'Missing island code' }, { status: 400 })
  }

  try {
    const snap = await fetchIslandMetrics(code, { interval: 'day' })
    if (!snap) {
      return NextResponse.json({ error: 'Island not found or no metrics yet' }, { status: 404 })
    }
    return NextResponse.json({
      code: snap.code,
      title: snap.title || code,
      creatorCode: snap.creatorCode ?? null,
      kind: snap.creatorCode === 'epic' || code.startsWith('experience_') ? 'epic' : 'creative',
      peakCcu: snap.peakCcu,
      maxPeakCcu: snap.maxPeakCcu,
      uniquePlayers: snap.uniquePlayers,
      plays: snap.plays,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lookup failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
