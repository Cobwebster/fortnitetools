import { NextResponse } from 'next/server'

/** CDN-friendly JSON for route handlers (cuts Fast Origin Transfer). */
export function jsonCached(
  data: unknown,
  {
    status = 200,
    sMaxAge,
    swr,
  }: {
    status?: number
    /** Edge/CDN TTL seconds */
    sMaxAge: number
    /** Stale-while-revalidate seconds (defaults to 2× sMaxAge) */
    swr?: number
  }
) {
  const stale = swr ?? sMaxAge * 2
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${stale}`,
    },
  })
}

export function jsonError(
  message: string,
  status: number,
  { sMaxAge = 60, swr = 300 }: { sMaxAge?: number; swr?: number } = {}
) {
  return jsonCached({ error: message }, { status, sMaxAge, swr })
}
