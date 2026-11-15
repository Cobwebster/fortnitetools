import fs from 'node:fs'
import path from 'node:path'

const envPath = path.resolve('.env.local')
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, '')]
    })
)

const base = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SECRET_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
if (!base || !key) {
  console.error('Missing Supabase env')
  process.exit(1)
}

const url =
  base.replace(/\/$/, '') +
  '/rest/v1/lockers?select=slug,display_name,is_public,updated_at&order=updated_at.desc'

const res = await fetch(url, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  },
})
const text = await res.text()
if (!res.ok) {
  console.error('status', res.status, text.slice(0, 500))
  process.exit(1)
}
const rows = JSON.parse(text)
console.log('count', rows.length)

const badPatterns = [
  /\bnigg/i,
  /\bfag/i,
  /\bkike/i,
  /\bspic\b/i,
  /\bchink/i,
  /\btranny/i,
  /\bretard/i,
  /\brape/i,
  /\bpedophil/i,
  /\bpaedophil/i,
  /\bchild\s*porn/i,
  /\bcp\b/i,
  /\bnazi/i,
  /\bhitler/i,
  /\bheil\b/i,
  /\bkkk\b/i,
  /\bkill\s*(yourself|urself|myself)/i,
  /\bkys\b/i,
  /\bsuicide/i,
  /\bgore\b/i,
  /\bslut\b/i,
  /\bwhore\b/i,
  /\bbitch\b/i,
  /\bcunt\b/i,
  /\bfuck/i,
  /\bshit\b/i,
  /\basshole/i,
  /\bdick\b/i,
  /\bcock\b/i,
  /\bpussy\b/i,
  /\bporn\b/i,
  /\bsex\b/i,
  /\bonlyfans/i,
  /\bheroin/i,
  /\bmeth\b/i,
  /\bcocaine/i,
  /\bfentanyl/i,
  /\bjihad/i,
  /\bis[il]s\b/i,
]

const flagged = []
for (const row of rows) {
  const hay = `${row.slug} ${row.display_name}`
  const hits = badPatterns.filter((re) => re.test(hay)).map((re) => String(re))
  if (hits.length) flagged.push({ ...row, hits })
}

console.log('---ALL---')
for (const row of rows) {
  console.log(`${row.is_public ? 'pub' : 'priv'}\t${row.slug}\t${row.display_name}`)
}
console.log('---FLAGGED---')
if (!flagged.length) console.log('(none)')
else for (const row of flagged) console.log(JSON.stringify(row))
