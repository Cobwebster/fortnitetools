/** Fortnite Reload / Blitz map rotation schedules (clock-aligned). */

export type RotationModeId = 'reload' | 'blitz'

export type RotationMap = {
  id: string
  name: string
  theme: string
  /** Optional accent for cards */
  accent: string
  /** Island / promo art used as the card background. */
  image: string
  badge?: 'new'
}

export type RotationMode = {
  id: RotationModeId
  label: string
  /** Minutes each map stays live. Ignored when only one map. */
  slotMinutes: number
  maps: RotationMap[]
  note?: string
}

/**
 * Curated from community trackers (fortnite.gg / lobby timers).
 * Epic does not publish a public rotation API — update this when the live pool changes.
 */
export const ROTATION_MODES: RotationMode[] = [
  {
    id: 'reload',
    label: 'Reload',
    slotMinutes: 20,
    maps: [
      {
        id: 'oasis',
        name: 'Oasis',
        theme: 'Desert island — Paradise Palms, hotel hub, mid-range arid POIs',
        accent: '#fbbf24',
        image: '/images/map-rotation/oasis.webp',
      },
      {
        id: 'slurp-rush',
        name: 'Slurp Rush',
        theme: 'Chapter 2 Slurp island — Slurpy Swamp, Steamy Stacks, Dirty Docks',
        accent: '#2dd4bf',
        image: '/images/map-rotation/slurp-rush.webp',
      },
      {
        id: 'springfield',
        name: 'Springfield',
        theme: 'The Simpsons Reload island — The Confidential, 50-player lobbies',
        accent: '#f59e0b',
        image: '/images/map-rotation/springfield.webp',
        badge: 'new',
      },
    ],
  },
  {
    id: 'blitz',
    label: 'Blitz',
    slotMinutes: 10,
    maps: [
      {
        id: 'blitz-venture',
        name: 'Venture',
        theme: 'Blitz Royale — compact no-build Chapter 1 layout',
        accent: '#f87171',
        image: '/images/map-rotation/venture.webp',
      },
    ],
    note: 'Blitz is currently on a single map. When Epic enables multiple maps, they usually rotate every 10 minutes.',
  },
]

export type RotationSlotView = {
  index: number
  map: RotationMap
  start: Date
  end: Date
  /** ms until this slot starts (0 if live or past in the current cycle view) */
  startsInMs: number
  isLive: boolean
}

export type RotationSnapshot = {
  mode: RotationMode
  now: Date
  current: RotationMap
  next: RotationMap
  remainingMs: number
  currentStart: Date
  currentEnd: Date
  nextStart: Date
  nextEnd: Date
  /** Upcoming slots starting with the live one (one full cycle) */
  cycle: RotationSlotView[]
  rotating: boolean
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

/** Local wall-clock HH:MM */
export function formatClock(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export function formatClockRange(start: Date, end: Date) {
  return `${formatClock(start)} – ${formatClock(end)}`
}

/** mm:ss remaining (or H:mm:ss if ≥ 1h) */
export function formatRemaining(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}`
  return `${pad2(m)}:${pad2(s)}`
}

function atMinutes(base: Date, hour: number, minute: number) {
  const d = new Date(base)
  d.setHours(hour, minute, 0, 0)
  return d
}

/**
 * Reload/Blitz slots align to clock minutes (same worldwide — minutes are timezone-invariant).
 * e.g. 20-min × 3 maps → :00–:20, :20–:40, :40–:60 every hour.
 */
export function getRotationSnapshot(modeId: RotationModeId, now = new Date()): RotationSnapshot {
  const mode = ROTATION_MODES.find((m) => m.id === modeId) ?? ROTATION_MODES[0]
  const maps = mode.maps
  const rotating = maps.length > 1
  const slot = rotating ? mode.slotMinutes : 60

  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const millis = now.getMilliseconds()
  const hour = now.getHours()

  const slotsPerHour = Math.max(1, Math.floor(60 / slot))
  const slotIndexInHour = Math.min(Math.floor(minutes / slot), slotsPerHour - 1)
  const mapIndex = rotating ? slotIndexInHour % maps.length : 0

  const slotStartMin = slotIndexInHour * slot
  const slotEndMin = slotStartMin + slot

  const currentStart = atMinutes(now, hour, slotStartMin)
  let currentEnd = atMinutes(now, hour, slotEndMin)
  if (slotEndMin >= 60) {
    currentEnd = atMinutes(now, hour, 0)
    currentEnd.setHours(hour + 1)
  }

  const elapsedInSlotMs = (minutes - slotStartMin) * 60_000 + seconds * 1000 + millis
  const remainingMs = Math.max(0, slot * 60_000 - elapsedInSlotMs)

  const current = maps[mapIndex]
  const nextIndex = rotating ? (mapIndex + 1) % maps.length : 0
  const next = maps[nextIndex]

  const nextStart = new Date(currentEnd)
  const nextEnd = new Date(nextStart.getTime() + slot * 60_000)

  const cycle: RotationSlotView[] = []
  let cursor = new Date(currentStart)
  for (let i = 0; i < maps.length; i++) {
    const idx = rotating ? (mapIndex + i) % maps.length : 0
    const start = new Date(cursor)
    const end = new Date(start.getTime() + slot * 60_000)
    const isLive = i === 0
    cycle.push({
      index: i,
      map: maps[idx],
      start,
      end,
      startsInMs: isLive ? 0 : start.getTime() - now.getTime(),
      isLive,
    })
    cursor = end
  }

  return {
    mode,
    now,
    current,
    next,
    remainingMs,
    currentStart,
    currentEnd,
    nextStart,
    nextEnd,
    cycle,
    rotating,
  }
}

export function getMode(id: RotationModeId) {
  return ROTATION_MODES.find((m) => m.id === id) ?? ROTATION_MODES[0]
}
