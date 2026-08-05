/**
 * Full translations for tools.* namespaces (es, de, fr, pl, pt-BR).
 * Deep-merges complete hand-written translation trees over each locale's
 * tools.<namespace> so locale tool pages are not mostly English.
 * English messages/en.json is never modified by this script.
 *
 * Run: node scripts/translate-tools-full.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const locales = ['es', 'de', 'fr', 'pl', 'pt-BR']
const namespaces = [
  'sensitivityCalculator',
  'battlePassXp',
  'kdCalculator',
  'playerStats',
  'vbucks',
  'weaponDamage',
  'zoneTimer',
  'fpsSettings',
  'keybinds',
]

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v)
}

function deepMerge(target, src) {
  for (const key of Object.keys(src)) {
    const sv = src[key]
    if (isPlainObject(sv)) {
      if (!isPlainObject(target[key])) target[key] = {}
      deepMerge(target[key], sv)
    } else {
      target[key] = sv
    }
  }
  return target
}

function collectStrings(obj, prefix = '') {
  const out = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (isPlainObject(v)) out.push(...collectStrings(v, path))
    else if (typeof v === 'string') out.push([path, v])
  }
  return out
}

function countIdentical(enObj, locObj, minLen = 15) {
  let n = 0
  for (const [path, enVal] of collectStrings(enObj)) {
    if (enVal.length < minLen) continue
    const parts = path.split('.')
    let cur = locObj
    for (const p of parts) {
      cur = cur?.[p]
    }
    if (typeof cur === 'string' && cur === enVal) n++
  }
  return n
}

// Load namespace translation bundles from scripts/tool-translations/*.json
const translationsDir = join(__dirname, 'tool-translations')
const translations = {}
for (const file of readdirSync(translationsDir).filter((f) => f.endsWith('.json'))) {
  const ns = file.replace(/\.json$/, '')
  translations[ns] = JSON.parse(readFileSync(join(translationsDir, file), 'utf8'))
}

for (const locale of locales) {
  const path = join(root, `messages/${locale}.json`)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  if (!data.tools) data.tools = {}
  for (const ns of namespaces) {
    if (!data.tools[ns]) data.tools[ns] = {}
    const t = translations[ns]?.[locale]
    if (t) deepMerge(data.tools[ns], t)
  }
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log('translated tools.* (full) for', locale)
}

// Verify fr.tools.playerStats
const en = JSON.parse(readFileSync(join(root, 'messages/en.json'), 'utf8'))
const fr = JSON.parse(readFileSync(join(root, 'messages/fr.json'), 'utf8'))
const psEn = en.tools.playerStats
const psFr = fr.tools.playerStats
const identical = countIdentical(psEn, psFr, 15)
console.log('\n--- verify fr.tools.playerStats ---')
console.log('strings still identical to en (len>=15):', identical)
console.log('titleSuffix:', psFr.titleSuffix)
console.log('hero:', psFr.hero)
console.log('trackerBody:', psFr.trackerBody)
console.log('faqs.q1:', psFr.faqs?.q1)
