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
  'the $.$. rocky': {
    contest: 'hot',
    loot: 5,
    chests: 'Very High',
    mobility: 'Battleship deck / cannons',
    tip: 'A$AP Rocky Boss ship. Shock Rocket + Lil’ Flacko can drop — pubs / Zero Build only for the launcher.',
    tags: ['boss', 'asap rocky', 'shock rocket'],
    guideHref: '/guides/how-to/how-to-get-shock-rocket-fortnite',
  },
  'arlong park': {
    contest: 'hot',
    loot: 5,
    chests: 'Very High',
    mobility: 'Island bridge / cannons',
    tip: 'Fish-man stronghold. Expect early fights; leave with a shotgun + mid before third parties stack.',
    tags: ['one piece', 'hot'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  loguetown: {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Harbor streets',
    tip: 'Busy harbor town. Good loot if you win the land; bad climb drop when the bus is near.',
    tags: ['one piece', 'harbor'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  "fortune's fort": {
    contest: 'hot',
    loot: 4,
    chests: 'High',
    mobility: 'Fort walls / cannons',
    tip: 'Week-2 fort (Lil Uzi / Cuddle Team Leader claim). Contested after the 8 Nov Captain’s Day.',
    tags: ['lil uzi', 'fort', 'captain day'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'rubber resort': {
    contest: 'balanced',
    loot: 4,
    chests: 'High',
    mobility: 'Duck yacht / coastal',
    tip: 'Resort POI. Miku & Teto take it over on the 15 Nov Captain’s Day.',
    tags: ['resort', 'miku'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'windmill village': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium–High',
    mobility: 'Island link / cannons',
    tip: 'Quieter One Piece village on paper — still 80 players. Solid ranked default.',
    tags: ['one piece', 'ranked'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'lantern landing': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Lantern maze streets',
    tip: 'Maze of lantern-lit streets (Epic also called Lantern Lanes). Pick an exit before another squad cuts you off.',
    tags: ['maze', 'mid'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'loot lagoon': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium–High',
    mobility: 'Coast / river mouth',
    tip: 'Northern lagoon loot pocket. Leave with mobility before mid-game traffic piles in.',
    tags: ['coast', 'loot'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'plunder port': {
    contest: 'balanced',
    loot: 4,
    chests: 'High',
    mobility: 'Two docked ships',
    tip: 'Clear both ships, then cannon out. Contested when the bus loves the south.',
    tags: ['ships', 'port'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'busy bay': {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Connected islands',
    tip: 'South-east bay. Live API label — may overlap Baratie Bay / waterfront fantasy from Epic’s notes.',
    tags: ['bay', 'south'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'cursed cavern': {
    contest: 'edge',
    loot: 3,
    chests: 'Medium',
    mobility: 'Crater / mountain',
    tip: 'Central-east crater. Quieter land, longer rotates — watch for third parties off Wanted Poster digs.',
    tags: ['cave', 'edge'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'the chest': {
    contest: 'edge',
    loot: 3,
    chests: 'Medium',
    mobility: 'Islets / cannons',
    tip: 'Small island group. Edge loot — do not farm forever if zone is opposite.',
    tags: ['islets', 'edge'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  baratie: {
    contest: 'balanced',
    loot: 3,
    chests: 'Medium',
    mobility: 'Floating restaurant',
    tip: 'Landmark near Busy Bay. Epic’s notes also said Baratie Bay for the waterfront.',
    tags: ['one piece', 'landmark'],
    guideHref: '/guides/map/fortnite-crossbones-isle-map-loot',
  },
  'boogie boat': {
    contest: 'edge',
    loot: 2,
    chests: 'Low–Medium',
    mobility: 'Coastal barge',
    tip: 'Party barge landmark. Edge loot — rotate early if zone pulls inland.',
    tags: ['landmark', 'coast'],
  },
  "giant's battlefield": {
    contest: 'edge',
    loot: 2,
    chests: 'Low–Medium',
    mobility: 'Open ground',
    tip: 'Landmark fight space. Weak for ranking up loot; fine for third-party sightlines.',
    tags: ['landmark'],
  },
  henry: {
    contest: 'edge',
    loot: 2,
    chests: 'Low',
    mobility: 'Landmark only',
    tip: 'Small landmark pin — do not treat as a full POI clear.',
    tags: ['landmark'],
  },
  'the salty skull': {
    contest: 'edge',
    loot: 2,
    chests: 'Low–Medium',
    mobility: 'Coastal landmark',
    tip: 'Skull landmark on the dump. Edge ring for placement, not a hot drop.',
    tags: ['landmark', 'coast'],
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

/** Percent on fortnite-api.com/images/map.png (north up, Fortnite Y+ is south). */
export function worldToMapPercent(x: number, y: number): { x: number; y: number } {
  return {
    x: ((x + MAP_HALF) / (MAP_HALF * 2)) * 100,
    y: ((y + MAP_HALF) / (MAP_HALF * 2)) * 100,
  }
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
 * Treasure Hunters extract planning pads — POI-anchored, not Epic pad coordinates.
 * Gold Bars are vaulted; pads still matter for banking Sprites. Trust in-game UI over these rings.
 */
export const EXTRACTION_SITES: ExtractionSiteDef[] = [
  {
    id: 'extract-windmill',
    name: 'Windmill Village Extract',
    nearPoi: 'Windmill Village',
    offsetX: 6000,
    offsetY: 8000,
    traffic: 'quiet',
    tip: 'Quieter island exit after a village clear — good for banking a rare Sprite.',
  },
  {
    id: 'extract-rubber',
    name: 'Rubber Resort Extract',
    nearPoi: 'Rubber Resort',
    offsetX: -5000,
    offsetY: 7000,
    traffic: 'medium',
    tip: 'Resort edge pad. Hotter after the Miku / Teto Captain’s Day.',
  },
  {
    id: 'extract-lantern',
    name: 'Lantern Landing Extract',
    nearPoi: 'Lantern Landing',
    offsetX: 7000,
    offsetY: -6000,
    traffic: 'medium',
    tip: 'Exit the lantern maze before another squad cuts the only street.',
  },
  {
    id: 'extract-plunder',
    name: 'Plunder Port Extract',
    nearPoi: 'Plunder Port',
    offsetX: -8000,
    offsetY: -5000,
    traffic: 'medium',
    tip: 'South docks exit after clearing both ships.',
  },
  {
    id: 'extract-lagoon',
    name: 'Loot Lagoon Extract',
    nearPoi: 'Loot Lagoon',
    offsetX: 5000,
    offsetY: -8000,
    traffic: 'quiet',
    tip: 'North coast exit — placement-friendly if zone loves that half.',
  },
  {
    id: 'extract-rocky',
    name: '$.$. Rocky Extract',
    nearPoi: 'The $.$. Rocky',
    offsetX: 9000,
    offsetY: 4000,
    traffic: 'hot',
    tip: 'Boss ship traffic. Only ping extract if you own the deck.',
  },
  {
    id: 'extract-arlong',
    name: 'Arlong Park Extract',
    nearPoi: 'Arlong Park',
    offsetX: -6000,
    offsetY: 9000,
    traffic: 'hot',
    tip: 'Stronghold exit — contested early; cleaner once the land fight ends.',
  },
  {
    id: 'extract-cursed',
    name: 'Cursed Cavern Extract',
    nearPoi: 'Cursed Cavern',
    offsetX: 4000,
    offsetY: 6000,
    traffic: 'quiet',
    tip: 'Crater pad for Wanted Poster digs that land mid-island.',
  },
  {
    id: 'extract-fortuna',
    name: "Fortune's Fort Extract",
    nearPoi: "Fortune's Fort",
    offsetX: -7000,
    offsetY: 5000,
    traffic: 'hot',
    tip: 'Week-2 fort traffic after 8 Nov. Bank Lil’ Uzi Vert Jr. digs off the walls, not mid-courtyard.',
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

export function findPoiByName(
  pois: { name: string; location: { x: number; y: number } }[],
  nearPoi: string
) {
  const target = normalizePoiName(nearPoi)
  const compact = target.replace(/\s/g, '')
  return (
    pois.find((p) => normalizePoiName(p.name) === target) ||
    pois.find((p) => normalizePoiName(p.name).replace(/\s/g, '') === compact) ||
    pois.find(
      (p) =>
        normalizePoiName(p.name).includes(target) || target.includes(normalizePoiName(p.name))
    )
  )
}

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
