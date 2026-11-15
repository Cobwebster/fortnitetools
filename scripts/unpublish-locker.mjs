import fs from 'node:fs'

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node scripts/unpublish-locker.mjs <slug>')
  process.exit(1)
}

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, '')]
    })
)

const base = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, '')
const key = env.SUPABASE_SECRET_KEY
const res = await fetch(`${base}/rest/v1/lockers?slug=eq.${encodeURIComponent(slug)}`, {
  method: 'PATCH',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({ is_public: false }),
})
console.log(res.status, await res.text())
