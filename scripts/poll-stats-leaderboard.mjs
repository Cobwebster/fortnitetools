/**
 * Poll Fortnite-API for tracked Epic names and write our own leaderboard snapshot.
 *
 * Uses the same public stats endpoint as /tools/player-stats — we do not scrape third-party ladders.
 * Snapshot is JSON (git-friendly). Run periodically and commit when you want boards to refresh.
 *
 *   npm run poll:stats-leaderboard
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SEED_PATH = path.join(ROOT, 'data', 'tracked-players.json')
const OUT_PATH = path.join(ROOT, 'data', 'stats-leaderboard.json')
const API_BASE = 'https://fortnite-api.com'
const DELAY_MS = 650

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function num(v) {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

/** Load KEY=VALUE from .env.local (strips UTF-8 BOM Windows sometimes adds). */
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

async function fetchSeasonOverall(name, key, accountType, timeWindow) {
  const params = new URLSearchParams({
    name,
    accountType,
    timeWindow,
  })
  const res = await fetch(`${API_BASE}/v2/stats/br/v2?${params}`, {
    headers: { Authorization: key },
  })
  const json = await res.json().catch(() => null)
  if (!res.ok || !json?.data) {
    return {
      ok: false,
      name,
      error: json?.error || `HTTP ${res.status}`,
      status: res.status,
    }
  }
  const data = json.data
  const account = data.account || {}
  const battlePass = data.battlePass || null
  const overall = data.stats?.all?.overall || null
  return {
    ok: true,
    accountId: String(account.id || ''),
    name: String(account.name || name),
    bpLevel: num(battlePass?.level),
    wins: num(overall?.wins),
    kills: num(overall?.kills),
    deaths: num(overall?.deaths),
    kd: num(overall?.kd),
    matches: num(overall?.matches),
    minutesPlayed: num(overall?.minutesPlayed),
    score: num(overall?.score),
    lastModified: overall?.lastModified || null,
  }
}

function rankBy(players, key, limit = 25) {
  return [...players]
    .filter((p) => typeof p[key] === 'number')
    .sort((a, b) => b[key] - a[key])
    .slice(0, limit)
    .map((p, i) => ({
      rank: i + 1,
      name: p.name,
      accountId: p.accountId,
      value: p[key],
      bpLevel: p.bpLevel,
      kd: p.kd,
    }))
}

async function main() {
  await loadEnvLocal()
  const key = process.env.FORTNITE_API_KEY?.trim()
  if (!key) {
    console.error('Missing FORTNITE_API_KEY in .env.local')
    process.exit(1)
  }

  const seed = JSON.parse(await readFile(SEED_PATH, 'utf8'))
  const names = [...new Set((seed.names || []).map((n) => String(n).trim()).filter(Boolean))]
  const accountType = seed.accountType || 'epic'
  const timeWindow = seed.timeWindow || 'season'

  console.log(`Polling ${names.length} names (${timeWindow} / ${accountType})…`)

  const players = []
  const errors = []

  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    process.stdout.write(`[${i + 1}/${names.length}] ${name}… `)
    try {
      const row = await fetchSeasonOverall(name, key, accountType, timeWindow)
      if (row.ok) {
        players.push(row)
        console.log(`ok  wins=${row.wins ?? '—'} kills=${row.kills ?? '—'}`)
      } else {
        errors.push({ name, error: row.error, status: row.status })
        console.log(`fail  ${row.error}`)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      errors.push({ name, error: msg })
      console.log(`fail  ${msg}`)
    }
    if (i < names.length - 1) await sleep(DELAY_MS)
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: 'fortnite-api.com/v2/stats/br/v2',
    note: 'Tracked-account sample only — ranks among names we poll, not every Fortnite player.',
    timeWindow,
    accountType,
    trackedCount: players.length,
    failedCount: errors.length,
    players: players.map((p) => ({
      accountId: p.accountId,
      name: p.name,
      bpLevel: p.bpLevel,
      wins: p.wins,
      kills: p.kills,
      deaths: p.deaths,
      kd: p.kd,
      matches: p.matches,
      minutesPlayed: p.minutesPlayed,
      score: p.score,
      lastModified: p.lastModified,
    })),
    boards: {
      level: rankBy(players, 'bpLevel'),
      wins: rankBy(players, 'wins'),
      kills: rankBy(players, 'kills'),
      time: rankBy(players, 'minutesPlayed'),
    },
    errors,
  }

  await mkdir(path.dirname(OUT_PATH), { recursive: true })
  await writeFile(OUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  console.log(`\nWrote ${OUT_PATH} (${players.length} players, ${errors.length} failures)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
