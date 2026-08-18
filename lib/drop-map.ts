import { findPoiByName, worldToMapPercent } from '@/lib/map-data'

export const LIVE_BR_MAP = 'https://fortnite-api.com/images/map.png'

export const CONTEST_COLOR: Record<string, string> = {
  hot: '#ff6b4a',
  balanced: '#3dd6c6',
  edge: '#7aa2ff',
}

/** Fallback world coords if the live map API is unreachable — C7S3 Shattered Coast, fetched 18 Aug 2026. */
export const DROP_POI_COORDS: Record<string, { x: number; y: number }> = {
  'heatwave-harbor': { x: -84784, y: 57568 },
  battlewoods: { x: -30948, y: -39412 },
  wonkeeland: { x: 67188, y: -52715 },
  'latte-landing': { x: 27425, y: -77048 },
  'sunken-shores': { x: -16446, y: 89340 },
}

export type MapPoi = { name: string; location: { x: number; y: number } }

export async function loadMapPois(): Promise<MapPoi[]> {
  try {
    const res = await fetch('https://fortnite-api.com/v1/map?language=en', {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json.data?.pois) ? (json.data.pois as MapPoi[]) : []
  } catch {
    return []
  }
}

export function dropMapFocus(slug: string, nearName: string, pois: MapPoi[]) {
  const live = findPoiByName(pois, nearName)
  const fallback = DROP_POI_COORDS[slug]
  const loc = live?.location ?? fallback
  if (!loc) return { x: 50, y: 50 }
  return worldToMapPercent(loc.x, loc.y)
}
