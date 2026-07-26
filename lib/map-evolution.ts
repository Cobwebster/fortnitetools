import catalogJson from '@/lib/map-evolution-catalog.json'

export type MapEvolutionEntry = {
  id: string
  version: string
  chapter: number
  season: number
  seasonLabel: string
  label: string
  shortLabel: string
  image: string
  sourcePath: string
}

export const MAP_EVOLUTION: MapEvolutionEntry[] = catalogJson as MapEvolutionEntry[]

export const MAP_EVOLUTION_CHAPTERS = [
  ...new Set(MAP_EVOLUTION.map((m) => m.chapter)),
].sort((a, b) => a - b)

export function mapsForChapter(chapter: number | 'all') {
  if (chapter === 'all') return MAP_EVOLUTION
  return MAP_EVOLUTION.filter((m) => m.chapter === chapter)
}

export function findMapById(id: string) {
  return MAP_EVOLUTION.find((m) => m.id === id) ?? null
}

/** Default left = first season of chapter 1, right = latest */
export function defaultCompareIds() {
  const left = MAP_EVOLUTION[0]?.id ?? ''
  const right = MAP_EVOLUTION[MAP_EVOLUTION.length - 1]?.id ?? left
  return { left, right }
}
