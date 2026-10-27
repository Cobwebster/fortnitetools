import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const cache = new Map<string, { videoId: string; expires: number }>()
const TTL_MS = 7 * 24 * 60 * 60 * 1000

function extractVideoIds(html: string) {
  const ids: string[] = []
  const re = /"videoId":"([a-zA-Z0-9_-]{11})"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    ids.push(m[1])
  }
  return [...new Set(ids)]
}

async function resolveVideoId(query: string) {
  const key = query.toLowerCase().trim()
  const hit = cache.get(key)
  if (hit && hit.expires > Date.now()) return hit.videoId

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    next: { revalidate: 86_400 },
  })
  if (!res.ok) return null
  const html = await res.text()
  const ids = extractVideoIds(html)
  const videoId = ids[0] || null
  if (videoId) cache.set(key, { videoId, expires: Date.now() + TTL_MS })
  return videoId
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || '').trim()
  const artist = (searchParams.get('artist') || '').trim()
  const q = (searchParams.get('q') || '').trim() || [artist, title, 'official audio'].filter(Boolean).join(' ')

  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  try {
    const videoId = await resolveVideoId(q)
    if (!videoId) {
      return NextResponse.json(
        {
          videoId: null,
          searchEmbed: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(q)}`,
          watchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
        },
        { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
      )
    }
    return NextResponse.json(
      {
        videoId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
    )
  } catch {
    return NextResponse.json({ error: 'Resolve failed' }, { status: 502 })
  }
}
