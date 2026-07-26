import { CREATIVE_MAPS } from '@/lib/creative-codes'
import { fetchIslandMetricsBatch, type IslandMetricsSnapshot } from '@/lib/fortnite-ecosystem'

/** Official Epic experiences (slug or playlist code). */
export const EPIC_PLAYER_COUNT_MODES: {
  id: string
  code: string
  title: string
  kind: 'epic'
}[] = [
  { id: 'br', code: 'experience_br', title: 'Battle Royale', kind: 'epic' },
  { id: 'reload', code: 'experience_reload', title: 'Reload', kind: 'epic' },
  { id: 'og', code: 'experience_og', title: 'Fortnite OG', kind: 'epic' },
  { id: 'blitz', code: 'experience_blitz', title: 'Blitz Royale', kind: 'epic' },
  { id: 'lego', code: 'lego-fortnite-odyssey', title: 'LEGO Fortnite Odyssey', kind: 'epic' },
  { id: 'brick-life', code: 'lego-fortnite-brick-life', title: 'LEGO Fortnite Brick Life', kind: 'epic' },
  { id: 'festival', code: 'festival-main-stage', title: 'Festival Main Stage', kind: 'epic' },
  { id: 'festival-jam', code: 'festival-jam-stage', title: 'Festival Jam Stage', kind: 'epic' },
  { id: 'racing', code: 'rocket-racing', title: 'Rocket Racing', kind: 'epic' },
]

/**
 * High-traffic Creative islands people search for ("popular Fortnite maps").
 * Codes verified against Epic's public Ecosystem API — update when metas shift.
 */
export const POPULAR_CREATIVE_SEEDS: {
  code: string
  title: string
  note?: string
}[] = [
  { code: '3225-0366-8885', title: 'STEAL THE BRAINROT', note: 'Viral tycoon' },
  { code: '7875-7934-3852', title: 'GO UP FOR BRAINROTS', note: 'Viral tycoon' },
  { code: '7865-8305-9184', title: 'Star Wars Droid Tycoon', note: 'Star Wars tycoon' },
  { code: '3305-1551-7747', title: 'GO GOATED! Zone Wars', note: 'Zone Wars' },
  { code: '9315-9888-6217', title: 'Brainrot Pillars Zone Wars', note: 'Pillars' },
  { code: '7552-8375-6108', title: 'PILLARS | FIGHT FOR BRAINROTS', note: 'Pillars' },
]

export type PlayerCountRow = {
  code: string
  title: string
  creatorCode: string | null
  kind: 'epic' | 'creative'
  peakCcu: number | null
  maxPeakCcu: number | null
  uniquePlayers: number | null
  plays: number | null
  note?: string
}

function toRow(
  kind: 'epic' | 'creative',
  fallbackTitle: string,
  snap: IslandMetricsSnapshot | undefined,
  code: string,
  note?: string
): PlayerCountRow | null {
  if (!snap) {
    return {
      code,
      title: fallbackTitle,
      creatorCode: null,
      kind,
      peakCcu: null,
      maxPeakCcu: null,
      uniquePlayers: null,
      plays: null,
      note,
    }
  }
  return {
    code: snap.code || code,
    title: snap.title || fallbackTitle,
    creatorCode: snap.creatorCode ?? null,
    kind,
    peakCcu: snap.peakCcu,
    maxPeakCcu: snap.maxPeakCcu,
    uniquePlayers: snap.uniquePlayers,
    plays: snap.plays,
    note,
  }
}

export function formatPlayers(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('en-US')
}

export function formatCompact(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`
  return String(n)
}

export async function loadPlayerCountData() {
  const creativeSeedCodes = new Set(POPULAR_CREATIVE_SEEDS.map((s) => s.code))
  const catalogCodes = CREATIVE_MAPS.map((m) => m.code)
  const epicCodes = EPIC_PLAYER_COUNT_MODES.map((m) => m.code)

  const allCodes = [...new Set([...epicCodes, ...creativeSeedCodes, ...catalogCodes])]
  const metrics = await fetchIslandMetricsBatch(allCodes, { interval: 'day' })

  const epicRows: PlayerCountRow[] = EPIC_PLAYER_COUNT_MODES.map((m) => {
    const snap = metrics.get(m.code) ?? [...metrics.values()].find((s) => s.title === m.title)
    return toRow('epic', m.title, snap, m.code)!
  }).sort((a, b) => (b.peakCcu ?? 0) - (a.peakCcu ?? 0))

  const creativeTitleByCode = new Map<string, { title: string; note?: string }>()
  for (const s of POPULAR_CREATIVE_SEEDS) {
    creativeTitleByCode.set(s.code, { title: s.title, note: s.note })
  }
  for (const m of CREATIVE_MAPS) {
    if (!creativeTitleByCode.has(m.code)) {
      creativeTitleByCode.set(m.code, { title: m.name, note: m.genre })
    }
  }

  /** Drop quiet catalog maps so "Popular" isn't padded with 2–10 CCU islands. */
  const MIN_POPULAR_PEAK_CCU = 100

  const creativeRows: PlayerCountRow[] = [...creativeTitleByCode.entries()]
    .map(([code, meta]) => toRow('creative', meta.title, metrics.get(code), code, meta.note)!)
    .filter((r) => {
      const peak = r.peakCcu ?? 0
      if (creativeSeedCodes.has(r.code)) return peak > 0 || (r.uniquePlayers ?? 0) > 0
      return peak >= MIN_POPULAR_PEAK_CCU
    })
    .sort((a, b) => (b.peakCcu ?? 0) - (a.peakCcu ?? 0))
    .slice(0, 20)

  const totalTrackedPeak = [...epicRows, ...creativeRows].reduce(
    (sum, r) => sum + (r.peakCcu ?? 0),
    0
  )

  return {
    updatedAt: new Date().toISOString(),
    epicRows,
    creativeRows,
    totalTrackedPeak,
    sourceNote:
      'Peak concurrent players and unique players come from Epic’s public Fortnite Ecosystem Data API (latest available day). This is not a live “online now” lobby total — Epic publishes peak CCU / unique players per island, not a single global online count.',
  }
}

export const PLAYER_COUNT_FAQS = [
  {
    question: 'How many people play Fortnite right now?',
    answer:
      'Epic does not publish one official “players online now” number. Sites that show a live total usually sum peak concurrent players across Battle Royale, Reload, OG, Blitz, LEGO, Festival, and Creative islands from Epic’s public Data API.',
  },
  {
    question: 'What do Peak CCU and Unique Players mean?',
    answer:
      'Peak CCU is the highest concurrent player count Epic recorded for that island in the latest reported day. Unique Players is how many distinct accounts played it that day. Both come from Epic’s Fortnite Ecosystem Data API.',
  },
  {
    question: 'What are the most popular Fortnite maps right now?',
    answer:
      'Battle Royale is usually first by a wide margin, followed by Reload and large Creative hits (tycoons, pillars, Zone Wars). This page ranks Epic modes and a curated Creative list by the latest peak concurrent players.',
  },
  {
    question: 'How often does this Fortnite player count update?',
    answer:
      'We refresh from Epic’s public API about every 30 minutes. Epic’s own metrics can lag by up to a day for some islands, and history is limited to roughly the last week.',
  },
]
