import { NextResponse } from 'next/server'
import { fetchNewCosmetics } from '@/lib/fortnite-api'

export const revalidate = 600

export async function GET() {
  try {
    const data = await fetchNewCosmetics()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load new cosmetics'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
