import { NextRequest, NextResponse } from 'next/server'
import { searchCosmetics } from '@/lib/fortnite-api'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = searchParams.get('name')?.trim() || undefined
  const type = searchParams.get('type')?.trim() || undefined
  const rarity = searchParams.get('rarity')?.trim() || undefined

  if (!name && !type) {
    return NextResponse.json(
      { error: 'Provide a name search and/or cosmetic type.' },
      { status: 400 }
    )
  }

  try {
    const items = await searchCosmetics({ name, type, rarity })
    return NextResponse.json({
      count: items.length,
      items: items.slice(0, 240),
      truncated: items.length > 240,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
