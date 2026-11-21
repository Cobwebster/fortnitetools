import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_PREFIXES = [
  'https://fortnite-api.com/images/',
  'https://cdn.fortnite-api.com/',
]

export const revalidate = 3600

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  if (target.protocol !== 'https:' || !ALLOWED_PREFIXES.some((p) => raw.startsWith(p))) {
    return NextResponse.json({ error: 'Url not allowed' }, { status: 400 })
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: { Accept: 'image/*' },
      next: { revalidate: 3600 },
    })
    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream ${upstream.status}` },
        { status: 502 }
      )
    }
    const buf = await upstream.arrayBuffer()
    const contentType = upstream.headers.get('content-type') || 'image/png'
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
