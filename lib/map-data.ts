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

export type ExtractTraffic = 'quiet' | 'medium' | 'hot'

export type ExtractionSiteDef = {
  id: string
  /** Display name on the map */
  name: string
  /** Match Fortnite-API POI name (normalized) */
  nearPoi: string
  /** World-space offset from the POI center (Y+ = south) */
  offsetX?: number
  offsetY?: number
  traffic: ExtractTraffic
  tip: string
}

/**
 * Chapter 7 Season 3 / Runners Extraction Sites.
 * Positions are anchored to live API POI coords + small offsets (pads sit near POIs, not dead-center).
 */
export const EXTRACTION_SITES: ExtractionSiteDef[] = [
  {
    id: 'extract-lifty-lodge',
    name: 'Lifty Lodge Extract',
    nearPoi: 'Lifty Lodge',
    offsetX: 2000,
    offsetY: 14000,
    traffic: 'medium',
    tip: 'South of the lodge slope — loot the ski resort, then extract before rotating inland.',
  },
  {
    id: 'extract-battlewoods',
    name: 'Battlewoods Extract',
    nearPoi: 'The Battlewoods',
    offsetX: 10000,
    offsetY: 9000,
    traffic: 'quiet',
    tip: 'Quieter mid-north pad. Good after a vault / chest clear without center chaos.',
  },
  {
    id: 'extract-wonkeeland',
    name: 'Wonkeeland Extract',
    nearPoi: 'WonkeeLand',
    offsetX: -6000,
    offsetY: 8000,
    traffic: 'quiet',
    tip: 'Northeast self-contained loop: Sprite Chests in POI → extract nearby.',
  },
  {
    id: 'extract-frosted-flats',
    name: 'Frosted Flats Extract',
    nearPoi: 'Frosted Flats',
    offsetX: 8000,
    offsetY: 6000,
    traffic: 'medium',
    tip: 'Natural exit after the underground Epic Sprite Vault — extract before center piles in.',
  },
  {
    id: 'extract-sinister-strip',
    name: 'Sinister Strip Extract',
    nearPoi: 'Sinister Strip',
    offsetX: 5000,
    offsetY: -8000,
    traffic: 'hot',
    tip: 'Highest-traffic extract. Mythics / vault draw constant fights — only use if you own the strip.',
  },
  {
    id: 'extract-calamari',
    name: 'Calamari Canyon Extract',
    nearPoi: 'Calamari Canyon',
    offsetX: 7000,
    offsetY: 5000,
    traffic: 'medium',
    tip: 'West-side exit after canyon / whale vault looting.',
  },
  {
    id: 'extract-cluster-coast',
    name: 'Cluster Coast Extract',
    nearPoi: 'Cluster Coast',
    offsetX: -8000,
    offsetY: -6000,
    traffic: 'medium',
    tip: 'East duck POI exit. Contested early; cleaner once the bus crowd rotates out.',
  },
  {
    id: 'extract-heatwave',
    name: 'Heatwave Harbor Extract',
    nearPoi: 'Heatwave Harbor',
    offsetX: 9000,
    offsetY: -5000,
    traffic: 'hot',
    tip: 'Harbor + Duck Race mythics = constant density. Scout hard before you ping the lobby.',
  },
  {
    id: 'extract-sunken-shores',
    name: 'Sunken Shores Extract',
    nearPoi: 'Sunken Shores',
    offsetX: 6000,
    offsetY: -10000,
    traffic: 'quiet',
    tip: 'One of the safest pads — south coast / gas station area. Prefer for rare / cube banks.',
  },
  {
    id: 'extract-shaken-sanctuary',
    name: 'Shaken Sanctuary Extract',
    nearPoi: 'Shaken Sanctuary',
    offsetX: -7000,
    offsetY: 8000,
    traffic: 'hot',
    tip: 'Often sits in early circles — useful late, dangerous if you arrive cold.',
  },
  {
    id: 'extract-golden-grove',
    name: 'Golden Grove Extract',
    nearPoi: 'Golden Grove',
    offsetX: -5000,
    offsetY: 9000,
    traffic: 'quiet',
    tip: 'Overlooked east-central pad. Strong with Sprite Chest / cube farm routes.',
  },
]

export const extractTrafficLabels: Record<ExtractTraffic, string> = {
  quiet: 'Quieter pad',
  medium: 'Medium traffic',
  hot: 'High traffic',
}

export const extractTrafficColor: Record<ExtractTraffic, string> = {
  quiet: '#5eead4',
  medium: '#fbbf24',
  hot: '#fb7185',
}

export type ResolvedExtractionSite = ExtractionSiteDef & {
  location: { x: number; y: number }
  poiName: string
}

function findPoiByName(
  pois: { name: string; location: { x: number; y: number } }[],
  nearPoi: string
) {
  const target = normalizePoiName(nearPoi)
  const compact = target.replace(/\s/g, '')
  return (
    pois.find((p) => normalizePoiName(p.name) === target) ||
    pois.find((p) => normalizePoiName(p.name).replace(/\s/g, '') === compact) ||
    // "The Battlewoods" vs enrichment key battlewoods
    pois.find((p) => normalizePoiName(p.name).includes(target) || target.includes(normalizePoiName(p.name)))
  )
}

export { findPoiByName }

/** Anchor curated extract pads to live Fortnite-API POI coordinates. */
export function resolveExtractionSites(
  pois: { name: string; location: { x: number; y: number } }[]
): ResolvedExtractionSite[] {
  const out: ResolvedExtractionSite[] = []
  for (const site of EXTRACTION_SITES) {
    const poi = findPoiByName(pois, site.nearPoi)
    if (!poi) continue
    out.push({
      ...site,
      poiName: poi.name,
      location: {
        x: poi.location.x + (site.offsetX ?? 5000),
        y: poi.location.y + (site.offsetY ?? 5000),
      },
    })
  }
  return out
}
