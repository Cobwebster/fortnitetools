import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const OUT = join(process.cwd(), 'public', 'images', 'loadout')
mkdirSync(OUT, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

/** Treasure Hunters items — skip if file already exists unless force=1 */
const FILES = [
  { file: 'hammer_ar.png', wikiFile: 'Hammer_Assault_Rifle_-_Weapon_-_Fortnite.png' },
  { file: 'bundlebuss.png', wikiFile: 'Bundlebuss_Repeater_Rifle_-_Weapon_-_Fortnite.png' },
  { file: 'sentinel_pump.png', wikiFile: 'Sentinel_Pump_Shotgun_-_Weapon_-_Fortnite.png' },
  { file: 'auto_shotgun.png', wikiFile: 'Auto_Shotgun_-_Weapon_-_Fortnite.png' },
  { file: 'gilded_dragoon.png', wikiFile: 'Gilded_Dragoon_Shotgun_-_Weapon_-_Fortnite.png' },
  { file: 'machine_smg.png', wikiFile: 'Machine_SMG_-_Weapon_-_Fortnite.png' },
  { file: 'tactical_smg.png', wikiFile: 'Tactical_SMG_-_Weapon_-_Fortnite.png' },
  { file: 'sidearm_pistol.png', wikiFile: 'Sidearm_Pistol_-_Weapon_-_Fortnite.png' },
  { file: 'flint_knock.png', wikiFile: 'Flint-Knock_Pistol_-_Weapon_-_Fortnite.png' },
  { file: 'shock_rocket.png', wikiFile: "A$AP_Rocky's_Shock_Rocket_-_Weapon_-_Fortnite.png" },
  { file: 'gum_gum_fruit.png', wikiFile: 'Gum-Gum_Fruit_-_Item_-_Fortnite.png' },
  { file: 'flame_flame_fruit.png', wikiFile: 'Flame-Flame_Fruit_-_Item_-_Fortnite.png' },
  { file: 'zoro_three_sword.png', wikiFile: "Zoro's_Three_Sword_Style_-_Item_-_Fortnite.png" },
  { file: 'usopp_slingshot.png', wikiFile: "Usopp's_Slingshot_-_Weapon_-_Fortnite.png" },
  { file: 'explosive_cannon_ball.png', wikiFile: 'Explosive_Cannon_Ball_-_Item_-_Fortnite.png' },
  { file: 'nami_tangerine.png', wikiFile: "Nami's_Tangerine_-_Item_-_Fortnite.png" },
  { file: 'meat_on_a_stick.png', wikiFile: 'Meat_on_a_Stick_-_Item_-_Fortnite.png' },
  { file: 'slurp_juice.png', wikiFile: 'Slurp_Juice_-_Item_-_Fortnite.png' },
  { file: 'port_a_bunker.png', wikiFile: 'Port-A-Bunker_-_Item_-_Fortnite.png' },
  { file: 'shield_bubble_jr.png', wikiFile: 'Shield_Bubble_Jr._-_Item_-_Fortnite.png' },
  { file: 'zipline_deployer.png', wikiFile: 'Zipline_Deployer_-_Item_-_Fortnite.png' },
]

const force = process.env.FORCE === '1'

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
  const dest = join(OUT, item.file)
  if (!force && existsSync(dest)) {
    results.push({ file: item.file, ok: true, skipped: true })
    continue
  }
  try {
    let url = await resolveViaApi(item.wikiFile)
    if (!url) {
      url = `https://fortnite.fandom.com/wiki/Special:FilePath/${encodeURIComponent(item.wikiFile)}`
    }
    let buf = await download(url)
    if (!buf) {
      const fp = `https://fortnite.fandom.com/wiki/Special:FilePath/${item.wikiFile}`
      buf = await download(fp)
      if (!buf) {
        results.push({ file: item.file, ok: false, url })
        continue
      }
      writeFileSync(dest, buf)
      results.push({ file: item.file, ok: true, bytes: buf.length, via: 'filepath' })
      continue
    }
    writeFileSync(dest, buf)
    results.push({ file: item.file, ok: true, bytes: buf.length, via: 'api/direct', url })
  } catch (e) {
    results.push({ file: item.file, ok: false, reason: String(e) })
  }
}
console.log(JSON.stringify(results, null, 2))
