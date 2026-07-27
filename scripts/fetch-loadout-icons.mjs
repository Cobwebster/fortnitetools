import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const OUT = join(process.cwd(), 'public', 'images', 'loadout')
mkdirSync(OUT, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const FILES = [
  { file: 'business_turret.png', wikiFile: 'Business_Turret_-_Item_-_Fortnite.png' },
  { file: 'pulse_scanner.png', wikiFile: 'Pulse_Scanner_-_Item_-_Fortnite.png' },
  { file: 'guzzle_juice.png', wikiFile: 'Guzzle_Juice_-_Item_-_Fortnite.png' },
  { file: 'chug_jug.png', wikiFile: 'Chug_Jug_-_Item_-_Fortnite.png' },
  { file: 'self_revive.png', wikiFile: 'Self-Revive_Device_-_Item_-_Fortnite.png' },
  { file: 'overdrive_grenade.png', wikiFile: 'Overdrive_Grenade_-_Item_-_Fortnite.png' },
  { file: 'cluster_clinger.png', wikiFile: 'Cluster_Clinger_-_Item_-_Fortnite.png' },
  { file: 'golden_apple.png', wikiFile: 'Golden_Apple_-_Item_-_Fortnite.png' },
  { file: 'shield_breaker_emp.png', wikiFile: 'Shield_Breaker_EMP_-_Item_-_Fortnite.png' },
  { file: 'apple.png', wikiFile: 'Apple_-_Item_-_Fortnite.png' },
  { file: 'pepper.png', wikiFile: 'Pepper_-_Item_-_Fortnite.png' },
]

async function resolveViaApi(wikiFile) {
  const api =
    'https://fortnite.fandom.com/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=' +
    encodeURIComponent('File:' + wikiFile)
  const res = await fetch(api, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (!res.ok) return null
  const json = await res.json()
  const pages = json?.query?.pages || {}
  for (const p of Object.values(pages)) {
    const url = p?.imageinfo?.[0]?.url
    if (url) return url
  }
  return null
}

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'image/*,*/*', Referer: 'https://fortnite.fandom.com/' },
    redirect: 'follow',
  })
  if (!res.ok) return null
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 2000) return null
  if (buf.slice(0, 15).toString().includes('<!')) return null
  return buf
}

const results = []
for (const item of FILES) {
  try {
    // 1) MediaWiki API
    let url = await resolveViaApi(item.wikiFile)
    // 2) Special:FilePath fallback
    if (!url) {
      url = `https://fortnite.fandom.com/wiki/Special:FilePath/${encodeURIComponent(item.wikiFile)}`
    }
    const buf = await download(url)
    if (!buf) {
      // 3) direct Special:FilePath then follow
      const fp = `https://fortnite.fandom.com/wiki/Special:FilePath/${item.wikiFile}`
      const buf2 = await download(fp)
      if (!buf2) {
        results.push({ file: item.file, ok: false, url })
        continue
      }
      writeFileSync(join(OUT, item.file), buf2)
      results.push({ file: item.file, ok: true, bytes: buf2.length, via: 'filepath', url: fp })
      continue
    }
    writeFileSync(join(OUT, item.file), buf)
    results.push({ file: item.file, ok: true, bytes: buf.length, via: 'api/direct', url })
  } catch (e) {
    results.push({ file: item.file, ok: false, reason: String(e) })
  }
}
console.log(JSON.stringify(results, null, 2))
