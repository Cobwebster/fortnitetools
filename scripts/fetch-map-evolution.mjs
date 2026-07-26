/**
 * Download one Fortnite map per chapter/season from fortnite-archives
 * and convert to compressed WebP for /map-evolution.
 *
 * Source: https://github.com/yaelbrinkert/fortnite-archives (fan archive)
 * Run: node scripts/fetch-map-evolution.mjs
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'map-evolution')
const MANIFEST_URL =
  'https://raw.githubusercontent.com/yaelbrinkert/fortnite-archives/main/manifest.json'
const RAW_BASE =
  'https://raw.githubusercontent.com/yaelbrinkert/fortnite-archives/main'

/** Human labels for non-numeric / special seasons */
const SEASON_LABEL = {
  '1-10': 'Season X',
  '4-5': 'Season OG',
  '5-5': 'Season Remix',
  '6-3': 'Mini Season 1',
  '6-5': 'Mini Season 2',
}

function seasonLabel(chapter, season) {
  return SEASON_LABEL[`${chapter}-${season}`] ?? `Season ${season}`
}

function shortLabel(chapter, season) {
  const special = {
    '1-10': 'C1 SX',
    '4-5': 'C4 OG',
    '5-5': 'C5 Remix',
    '6-3': 'C6 MS1',
    '6-5': 'C6 MS2',
  }
  return special[`${chapter}-${season}`] ?? `C${chapter} S${season}`
}

function slugify(version) {
  return String(version)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function pickVersions(manifest) {
  const byKey = new Map()
  for (const v of manifest.versions) {
    if (!v.hasMap || !v.mapFile || !v.path) continue
    // Prefer a normal water stage for C2S3 if present later; otherwise keep highest version
    const key = `${v.chapter}-${v.season}`
    const prev = byKey.get(key)
    if (
      !prev ||
      String(v.version).localeCompare(String(prev.version), undefined, { numeric: true }) > 0
    ) {
      byKey.set(key, v)
    }
  }
  return [...byKey.values()].sort(
    (a, b) => a.chapter - b.chapter || a.season - b.season
  )
}

async function download(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  console.log('Fetching archive manifest…')
  const manifest = JSON.parse((await download(MANIFEST_URL)).toString('utf8'))
  const picks = pickVersions(manifest)
  console.log(`Selected ${picks.length} season maps`)

  const catalog = []

  for (const pick of picks) {
    const id = slugify(pick.version)
    const fileName = `${id}.webp`
    const outPath = path.join(OUT_DIR, fileName)
    const srcUrl = `${RAW_BASE}/${pick.path
      .split('/')
      .map(encodeURIComponent)
      .join('/')}/${encodeURIComponent(pick.mapFile)}`

    const entry = {
      id,
      version: String(pick.version),
      chapter: pick.chapter,
      season: pick.season,
      seasonLabel: seasonLabel(pick.chapter, pick.season),
      label: `Chapter ${pick.chapter} ${seasonLabel(pick.chapter, pick.season)}`,
      shortLabel: shortLabel(pick.chapter, pick.season),
      image: `/images/map-evolution/${fileName}`,
      sourcePath: `${pick.path}/${pick.mapFile}`,
    }

    if (existsSync(outPath)) {
      console.log(`skip  ${entry.version} (exists)`)
      catalog.push(entry)
      continue
    }

    process.stdout.write(`get   ${entry.version}… `)
    try {
      const buf = await download(srcUrl)
      await sharp(buf)
        .resize(1536, 1536, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(outPath)
      const { size } = await sharp(outPath).metadata().then(async () => {
        const st = await readFile(outPath)
        return { size: st.length }
      })
      console.log(`ok ${(size / 1024).toFixed(0)} KB`)
      catalog.push(entry)
    } catch (err) {
      console.log(`FAIL ${err.message}`)
    }
  }

  const catalogPath = path.join(ROOT, 'lib', 'map-evolution-catalog.json')
  await writeFile(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8')
  console.log(`Wrote ${catalog.length} entries → lib/map-evolution-catalog.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
