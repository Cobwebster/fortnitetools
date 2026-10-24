/**
 * Pull aggregate 🔥 counts from Supabase and bake them into data/tool-fires.json.
 * Public /tools pages never SELECT the votes table — they read this file + repo seeds.
 *
 *   npm run snapshot:tool-fires
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local
 * after you run supabase/tool-fires.sql.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_PATH = path.join(ROOT, 'data', 'tool-fires.json')

async function loadEnvLocal() {
  try {
    const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
    const text = raw.replace(/^\uFEFF/, '')
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq <= 0) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (!(key in process.env) || !process.env[key]) process.env[key] = val
    }
  } catch {
    /* optional */
  }
}

async function main() {
  await loadEnvLocal()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or publishable key in .env.local')
    process.exit(1)
  }

  const res = await fetch(`${url}/rest/v1/rpc/tool_fire_counts`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: '{}',
  })

  const json = await res.json().catch(() => null)
  if (!res.ok) {
    console.error('tool_fire_counts failed:', res.status, json)
    console.error('Did you run supabase/tool-fires.sql?')
    process.exit(1)
  }

  const counts = {}
  const rows = Array.isArray(json) ? json : []
  for (const row of rows) {
    const id = typeof row.tool_id === 'string' ? row.tool_id : ''
    const n = Number(row.fires)
    if (!id || !Number.isFinite(n)) continue
    counts[id] = Math.max(0, Math.floor(n))
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: 'supabase rpc tool_fire_counts',
    counts,
  }

  await writeFile(OUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  console.log(
    `Wrote ${OUT_PATH} (${Object.keys(counts).length} tools, ${Object.values(counts).reduce((a, b) => a + b, 0)} fires)`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
