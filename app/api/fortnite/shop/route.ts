import { NextResponse } from 'next/server'
import { fetchShop } from '@/lib/fortnite-api'

export const revalidate = 300

export async function GET() {
  try {
    const data = await fetchShop()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load shop'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
