const ECO_BASE = 'https://api.fortnite.com/ecosystem/v1'

export type IslandMetricsSnapshot = {
  code: string
  title?: string
  creatorCode?: string
  tags?: string[]
  uniquePlayers: number | null
  plays: number | null
  peakCcu: number | null
}

function latestValue(series: { value?: number; timestamp?: string }[] | undefined): number | null {
  if (!Array.isArray(series) || series.length === 0) return null
  const last = [...series].sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp))).at(-1)
  return typeof last?.value === 'number' ? last.value : null
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
  }
}

export async function fetchIslandMetrics(code: string): Promise<IslandMetricsSnapshot | null> {
  const [meta, metricsRes] = await Promise.all([
    fetchIslandMeta(code).catch(() => null),
    fetch(`${ECO_BASE}/islands/${encodeURIComponent(code)}/metrics?interval=day`, {
      next: { revalidate: 1800 },
    }).catch(() => null),
  ])

  if (!metricsRes?.ok && !meta) return null

  let uniquePlayers: number | null = null
  let plays: number | null = null
  let peakCcu: number | null = null

  if (metricsRes?.ok) {
    const json = await metricsRes.json()
    uniquePlayers = latestValue(json.uniquePlayers)
    plays = latestValue(json.plays)
    peakCcu = latestValue(json.peakCCU)
  }

  return {
    code,
    title: meta?.title,
    creatorCode: meta?.creatorCode,
    tags: meta?.tags,
    uniquePlayers,
    plays,
    peakCcu,
  }
}

export async function fetchIslandMetricsBatch(codes: string[]) {
  const unique = [...new Set(codes)]
  const settled = await Promise.allSettled(unique.map((c) => fetchIslandMetrics(c)))
  const map = new Map<string, IslandMetricsSnapshot>()
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) {
      map.set(result.value.code, result.value)
    }
  }
  return map
}
