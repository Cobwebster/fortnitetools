import { toolMessageId } from '@/i18n/config'
import { TOOLS } from '@/lib/tools-catalog'
import snapshot from '@/data/tool-fires.json'

export type ToolFireSnapshot = {
  generatedAt: string | null
  source: string
  counts: Record<string, number>
}

/** Stable id stored in Supabase — same as catalog message keys. */
export function toolFireId(href: string): string {
  return toolMessageId(href)
}

export const TOOL_FIRE_IDS = TOOLS.map((tool) => toolFireId(tool.href))

const TOOL_FIRE_ID_SET = new Set(TOOL_FIRE_IDS)

export function isToolFireId(value: string): boolean {
  return TOOL_FIRE_ID_SET.has(value)
}

function hash32(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Starter 🔥 totals — Zipf decay (steep head, long tail) plus a small per-id wobble
 * so consecutive ranks are not a ladder. Snapshot extras still add on top.
 */
function seedFireCount(id: string, rank: number): number {
  const zipf = 61 / (rank + 1) ** 0.7
  const wobble = (hash32(id) % 7) - 3
  return Math.max(3, Math.round(zipf) + wobble)
}

export const TOOL_FIRE_SEEDS: Record<string, number> = Object.fromEntries(
  TOOLS.map((tool, index) => {
    const id = toolFireId(tool.href)
    return [id, seedFireCount(id, index)]
  })
)

const baked = snapshot as ToolFireSnapshot

export function getPublishedToolFireCounts(): Record<string, number> {
  const out: Record<string, number> = { ...TOOL_FIRE_SEEDS }
  for (const [id, n] of Object.entries(baked.counts || {})) {
    if (!isToolFireId(id)) continue
    const extra = typeof n === 'number' && Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0
    out[id] = (out[id] ?? 0) + extra
  }
  return out
}

export function getToolFireSnapshotMeta() {
  return {
    generatedAt: baked.generatedAt,
    source: baked.source,
  }
}
