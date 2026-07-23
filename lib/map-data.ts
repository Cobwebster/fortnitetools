export type ContestLevel = 'hot' | 'balanced' | 'edge'

export type PoiEnrichment = {
  contest: ContestLevel
  loot: 1 | 2 | 3 | 4 | 5
  chests: string
  mobility: string
  tip: string
  tags: string[]
  guideHref?: string
}

/** Extra gameplay notes keyed by normalized POI name from Fortnite-API. */
export const poiEnrichment: Record<string, PoiEnrichment> = {
  'lifty lodge': {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Large zipline near main building',
    tip: 'Win the lodge roof, then zipline out before third parties stack the snow.',
    tags: ['snow', 'height', 'zipline'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'frosted flats': {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Center rotates / vehicles nearby',
    tip: 'Great staging for center endgames; leave with shields before circle 3.',
    tags: ['center', 'zero point', 'endgame'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'the battlewoods': {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Short walks to center / Frosted Flats',
    tip: 'Land for mats and fights; do not greed loot when zone pulls opposite.',
    tags: ['wood', 'center', 'contested'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  battlewoods: {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Short walks to center / Frosted Flats',
    tip: 'Land for mats and fights; do not greed loot when zone pulls opposite.',
    tags: ['wood', 'center', 'contested'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  wonkeeland: {
    contest: 'balanced',
    loot: 4,
    chests: 'High',
    mobility: 'Reliable landmark routes',
    tip: 'Learn one building split and commit — consistency beats random hot drops.',
    tags: ['returning', 'landmark'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'latte landing': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium–High',
    mobility: 'Coastal rotates inland',
    tip: 'Strong ranked drop when you want fights without full hot-drop chaos.',
    tags: ['returning', 'balanced'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  'sinister strip': {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Open strip lanes / cars',
    tip: 'Bus-near = warzone. Off-bus = excellent mid-tier loot stop.',
    tags: ['dark voyager', 'hot drop'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'golden grove': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Coast → inland paths',
    tip: 'Treat as a two-chest-and-go spot if contest spikes.',
    tags: ['semi-contested', 'loot pocket'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  'shaken sanctuary': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Central rotates',
    tip: 'Good backup drop if Battlewoods / Frosted Flats are overloaded.',
    tags: ['story', 'quieter'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'heatwave harbor': {
    contest: 'hot',
    loot: 5,
    chests: 'Very High',
    mobility: 'Port / high-rises / vehicles',
    tip: 'Win one tower, then rotate early; harbor third parties are constant.',
    tags: ['industrial', 'vertical', 'contested'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  'cluster coast': {
    contest: 'edge',
    loot: 3,
    chests: 'Medium',
    mobility: 'Long inland rotates',
    tip: 'Grab mobility before committing to a deep edge hold.',
    tags: ['edge', 'runners', 'southeast'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'sunken shores': {
    contest: 'edge',
    loot: 3,
    chests: 'Medium',
    mobility: 'South edge rotates',
    tip: 'Best for placement games when zone loves the south.',
    tags: ['south', 'edge', 'placement'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  'calamari canyon': {
    contest: 'edge',
    loot: 2,
    chests: 'Low–Medium',
    mobility: 'Desert crossings / cars',
    tip: 'Loot fast and rotate; do not farm forever in open desert.',
    tags: ['desert', 'placement'],
    guideHref: '/guides/map/fortnite-map-all-locations-guide',
  },
  'chopped shop': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Vehicle / mod landmark',
    tip: 'Land for mobility first, then rotate with the zone.',
    tags: ['vehicles', 'mobility'],
    guideHref: '/guides/map/fortnite-loot-guide-best-spots',
  },
  'the zero point': {
    contest: 'hot',
    loot: 3,
    chests: 'Medium',
    mobility: 'Center of island',
    tip: 'Endgame magnet — rotate early if you want the power position.',
    tags: ['center', 'endgame'],
  },
}

export const contestLabels: Record<ContestLevel, string> = {
  hot: 'Hot drop',
  balanced: 'Balanced',
  edge: 'Edge / quiet',
}

export const lootLabel = (n: number) => '●'.repeat(n) + '○'.repeat(5 - n)

export function normalizePoiName(name: string) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEnrichment(name: string): PoiEnrichment | undefined {
  const key = normalizePoiName(name)
  if (poiEnrichment[key]) return poiEnrichment[key]
  // Handle WonkeeLand / LAtte Landing casing quirks from API
  const compact = key.replace(/\s/g, '')
  for (const [k, v] of Object.entries(poiEnrichment)) {
    if (k.replace(/\s/g, '') === compact) return v
  }
  return undefined
}

/** Half-extent of the Fortnite world used to align fortnite-api.com map.png */
export const MAP_HALF = 150000

/**
 * Convert Fortnite world coords → Leaflet CRS.Simple lat/lng.
 * Fortnite Y increases south; we flip so north is up on the map image.
 */
export function worldToLatLng(x: number, y: number): [number, number] {
  return [-y, x]
}
