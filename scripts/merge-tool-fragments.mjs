/**
 * Merges messages/fragments/*.en.json into messages/en.json under tools.<namespace>
 * then deep-clones tools.* into es/de/fr/pl/pt-BR (keeping existing chrome overrides).
 *
 * Run: node scripts/merge-tool-fragments.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const fragDir = join(root, 'messages/fragments')
const locales = ['es', 'de', 'fr', 'pl', 'pt-BR']

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {}
      deepMerge(target[k], v)
    } else {
      target[k] = v
    }
  }
  return target
}

function clone(o) {
  return JSON.parse(JSON.stringify(o))
}

const enPath = join(root, 'messages/en.json')
const en = JSON.parse(readFileSync(enPath, 'utf8'))
en.tools = en.tools || {}

if (existsSync(fragDir)) {
  for (const file of readdirSync(fragDir)) {
    if (!file.endsWith('.en.json')) continue
    const ns = basename(file, '.en.json')
    const frag = JSON.parse(readFileSync(join(fragDir, file), 'utf8'))
    // Page-level namespaces (not under tools.*)
    if (ns === 'fortniteMap' || ns === 'guides') {
      en[ns] = frag
      console.log('merged root fragment', ns)
      continue
    }
    en.tools[ns] = frag
    console.log('merged fragment', ns)
  }
}

writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n')

// Ensure locale files have tools.* (English fallback until translated overlays applied)
for (const loc of locales) {
  const path = join(root, `messages/${loc}.json`)
  if (!existsSync(path)) {
    console.warn('missing', loc)
    continue
  }
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.tools = deepMerge(data.tools || {}, clone(en.tools))
  if (en.fortniteMap) {
    data.fortniteMap = deepMerge(data.fortniteMap || {}, clone(en.fortniteMap))
  }
  if (en.guides) {
    data.guides = deepMerge(data.guides || {}, clone(en.guides))
  }
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log('synced tools.* into', loc)
}

console.log('done')
