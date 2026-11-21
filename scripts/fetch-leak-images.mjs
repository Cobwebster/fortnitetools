import { existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'images', 'guides')

async function grab(file, url) {
  const dest = join(OUT, file)
  if (existsSync(dest)) {
    console.log('skip', file)
    return
  }
  const res = await fetch(url)
  if (!res.ok) {
    console.log('fail', file, res.status)
    return
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf).webp({ quality: 82, effort: 4 }).toFile(dest)
  console.log('ok', file)
}

const r = await fetch(
  'https://fortnite-api.com/v2/cosmetics/br/search/all?language=en&name=Usopp&matchMethod=contains'
)
const j = await r.json()
const hit =
  (j.data || []).find((d) => /slingshot/i.test(d.name)) || (j.data || [])[0]
if (hit?.images?.featured || hit?.images?.icon) {
  await grab(
    'usopp-slingshot-featured.webp',
    hit.images.featured || hit.images.icon
  )
} else {
  console.log('no usopp hit')
}
