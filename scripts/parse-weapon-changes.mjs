/**
 * Parse scripts/weapon-changes-source.md → lib/weapon-changes-data.json
 * Year assignment walks newest → oldest; when month increases (e.g. Jan → Dec), year--.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const sourcePath = path.join(__dirname, 'weapon-changes-source.md')
const outPath = path.join(root, 'lib', 'weapon-changes-data.json')

const MONTHS = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}

const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'exotic']

function capitalizeRarity(r) {
  return r.charAt(0).toUpperCase() + r.slice(1)
}

function parseNum(raw) {
  const t = String(raw).trim().replace(/,/g, '')
  if (t === '' || t === '—' || t === '-') return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

function parseChange(raw) {
  const t = String(raw).trim().replace(/^\+/, '')
  return parseNum(t)
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

const text = fs.readFileSync(sourcePath, 'utf8')
const lines = text.split(/\r?\n/)

/** @type {Map<string, { date: string, label: string, entries: any[] }>} */
const byDate = new Map()

let year = 2026
let prevMonth = 13
let currentKey = null

const weaponHeaderRe =
  /^\|\s*\|\s*((?:common|uncommon|rare|epic|legendary|mythic|exotic)\s+.+?)\s*\|\s*\|\s*\|\s*$/i

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  const dateMatch = line.match(/^##\s+([A-Za-z]+)\s+(\d{1,2})\s*$/)
  if (dateMatch) {
    const monthName = dateMatch[1].toLowerCase()
    const day = Number(dateMatch[2])
    const month = MONTHS[monthName]
    if (!month) continue
    if (month > prevMonth) year -= 1
    prevMonth = month
    const date = `${year}-${pad2(month)}-${pad2(day)}`
    const label = `${dateMatch[1]} ${day}, ${year}`
    currentKey = date
    if (!byDate.has(date)) {
      byDate.set(date, { date, label, entries: [] })
    }
    continue
  }

  if (!currentKey) continue

  const weaponMatch = line.match(weaponHeaderRe)
  if (!weaponMatch) continue

  const title = weaponMatch[1].trim()
  const lower = title.toLowerCase()
  let rarity = null
  let name = title
  for (const r of RARITIES) {
    if (lower.startsWith(r + ' ')) {
      rarity = capitalizeRarity(r)
      name = title.slice(r.length).trim()
      break
    }
  }
  if (!rarity) continue

  // Skip header rows until we hit a real stat
  const stats = []
  let j = i + 1
  // optional | --- | and | Old | New | Change |
  while (j < lines.length && lines[j].startsWith('|')) {
    const row = lines[j]
    if (/^\|\s*-+/.test(row) || /\|\s*Old\s*\|/i.test(row)) {
      j++
      continue
    }
    if (weaponHeaderRe.test(row) || /^##\s+/.test(row)) break

    const cells = row
      .split('|')
      .map((c) => c.trim())
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)

    // Expected: [stat, old, new, change]
    if (cells.length >= 4 && cells[0] && !/^old$/i.test(cells[0])) {
      const oldV = parseNum(cells[1])
      const newV = parseNum(cells[2])
      const changeV = parseChange(cells[3])
      if (oldV !== null || newV !== null) {
        stats.push({
          stat: cells[0],
          old: oldV,
          new: newV,
          change: changeV ?? (oldV !== null && newV !== null ? +(newV - oldV).toFixed(4) : null),
        })
      }
    }
    j++
  }

  if (stats.length) {
    byDate.get(currentKey).entries.push({ rarity, name, stats })
  }
}

const patches = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date))

const payload = {
  updatedAt: new Date().toISOString().slice(0, 10),
  sourceNote:
    'Compiled from public Fortnite balance history (Epic patch notes / community trackers). Numbers are reference values — always confirm in-game after updates.',
  patches,
}

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n')
console.log(
  `Wrote ${patches.length} patches, ${patches.reduce((n, p) => n + p.entries.length, 0)} weapon rows → ${path.relative(root, outPath)}`
)
