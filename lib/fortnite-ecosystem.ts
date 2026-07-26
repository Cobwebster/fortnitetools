const ECO_BASE = 'https://api.fortnite.com/ecosystem/v1'

export type MetricPoint = {
  value: number | null
  timestamp: string
}

export type IslandMetricsSnapshot = {
  code: string
  title?: string
  creatorCode?: string
  tags?: string[]
  uniquePlayers: number | null
  plays: number | null
  peakCcu: number | null
  /** Max peak CCU across the returned series (up to ~7 days when Epic provides it). */
  maxPeakCcu: number | null
  peakSeries?: MetricPoint[]
}

function seriesValues(series: { value?: number | null; timestamp?: string }[] | undefined): MetricPoint[] {
  if (!Array.isArray(series)) return []
  return series.map((p) => ({
    value: typeof p.value === 'number' ? p.value : null,
    timestamp: String(p.timestamp ?? ''),
  }))
}

function latestValue(series: MetricPoint[]): number | null {
  if (series.length === 0) return null
  const last = [...series].sort((a, b) => a.timestamp.localeCompare(b.timestamp)).at(-1)
  return last?.value ?? null
}

function maxValue(series: MetricPoint[]): number | null {
  const nums = series.map((p) => p.value).filter((v): v is number => typeof v === 'number')
  if (!nums.length) return null
  return Math.max(...nums)
}

export async function fetchIslandMeta(code: string) {
  const res = await fetch(`${ECO_BASE}/islands/${encodeURIComponent(code)}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  return (await res.json()) as {
    code?: string
    title?: string
    creatorCode?: string
    tags?: string[]
    displayName?: string
  }
}

export async function fetchIslandMetrics(
  code: string,
  opts?: { interval?: 'day' | 'hour' | 'minute'; includeSeries?: boolean }
): Promise<IslandMetricsSnapshot | null> {
  const interval = opts?.interval ?? 'day'
  const [meta, metricsRes] = await Promise.all([
    fetchIslandMeta(code).catch(() => null),
    fetch(`${ECO_BASE}/islands/${encodeURIComponent(code)}/metrics?interval=${interval}`, {
      next: { revalidate: 1800 },
    }).catch(() => null),
  ])

  if (!metricsRes?.ok && !meta) return null

  let uniquePlayers: number | null = null
  let plays: number | null = null
  let peakCcu: number | null = null
  let maxPeakCcu: number | null = null
  let peakSeries: MetricPoint[] | undefined

  if (metricsRes?.ok) {
    const json = await metricsRes.json()
    const peaks = seriesValues(json.peakCCU)
    const uniques = seriesValues(json.uniquePlayers)
    const playSeries = seriesValues(json.plays)
    uniquePlayers = latestValue(uniques)
    plays = latestValue(playSeries)
    peakCcu = latestValue(peaks)
    maxPeakCcu = maxValue(peaks)
    if (opts?.includeSeries) peakSeries = peaks
  }

  return {
    code: meta?.code ?? code,
    title: meta?.title,
    creatorCode: meta?.creatorCode,
    tags: meta?.tags,
    uniquePlayers,
    plays,
    peakCcu,
    maxPeakCcu,
    peakSeries,
  }
}

export async function fetchIslandMetricsBatch(
  codes: string[],
  opts?: { interval?: 'day' | 'hour' | 'minute'; includeSeries?: boolean }
) {
  const unique = [...new Set(codes.filter(Boolean))]
  const settled = await Promise.allSettled(unique.map((c) => fetchIslandMetrics(c, opts)))
  const map = new Map<string, IslandMetricsSnapshot>()
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) {
      map.set(result.value.code, result.value)
      // Also index by requested code if slug resolved to a different code
    }
  }
  // Map slug requests (e.g. battle-royale → experience_br) by re-keying misses
  for (let i = 0; i < unique.length; i++) {
    const requested = unique[i]!
    const result = settled[i]
    if (result?.status === 'fulfilled' && result.value && !map.has(requested)) {
      map.set(requested, result.value)
    }
  }
  return map
}
