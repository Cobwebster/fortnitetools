import { NextRequest, NextResponse } from 'next/server'
import { fetchCosmeticDetail } from '@/lib/fortnite-api'

export const revalidate = 600

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Missing cosmetic id' }, { status: 400 })
  }

  try {
    const detail = await fetchCosmeticDetail(id)
    if (!detail) {
      return NextResponse.json({ error: 'Cosmetic not found' }, { status: 404 })
    }
    return NextResponse.json(detail)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load cosmetic'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
