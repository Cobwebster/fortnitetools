import { NextRequest, NextResponse } from 'next/server'
import { lookupCreatorCode } from '@/lib/creator-code'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || ''
  if (!name.trim()) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }
  try {
    const data = await lookupCreatorCode(name)
    if (!data) return NextResponse.json({ found: false }, { status: 404 })
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lookup failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
