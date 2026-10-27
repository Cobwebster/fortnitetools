import falloffCatalog from '@/lib/weapon-falloff.json'
import { getWeapon } from '@/lib/weapons'
import type { WeaponRarity, WeaponVariantRow } from '@/lib/weapons-catalog'

export const COMBAT_HP = [
  { hp: 100, label: '100 HP', hint: 'no shield' },
  { hp: 150, label: '150 HP', hint: 'half shield' },
  { hp: 200, label: '200 HP', hint: 'full shield' },
  { hp: 250, label: '250 HP', hint: 'overshield' },
] as const

export type FalloffPoint = [number, number]

export type FalloffCurve = {
  points: FalloffPoint[]
  x: number
  cap?: number
}

type RawCatalog = {
  capturedAt: string
  note: string
  weapons: Record<
    string,
    {
      hs: number
      byRarity: Record<string, { points: FalloffPoint[]; x: number; cap?: number }>
    }
  >
}

const payload = falloffCatalog as RawCatalog

export const FALLOFF_CAPTURED_AT = payload.capturedAt
export const FALLOFF_NOTE = payload.note

export function interpolateFalloff(points: FalloffPoint[], meters: number): number {
  if (!points.length) return 0
  if (meters <= points[0]![0]) return points[0]![1]
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1]!
    const [x2, y2] = points[i]!
    if (meters <= x2) {
      if (x2 === x1) return y2
      return y1 + ((y2 - y1) * (meters - x1)) / (x2 - x1)
    }
  }
  return points[points.length - 1]![1]
}

export function shotsToKill(dmg: number, hp: number) {
  if (dmg <= 0) return Infinity
  return Math.max(1, Math.ceil(hp / dmg))
}

export function timeToKill(shots: number, fireRate: number) {
  if (!Number.isFinite(shots) || shots <= 1) return 0
  if (fireRate <= 0) return 0
  return (shots - 1) / fireRate
}

export function formatTtk(seconds: number) {
  if (seconds <= 0) return '0s'
  if (seconds < 10) return `${seconds.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}s`
  return `${seconds.toFixed(1)}s`
}

export type WeaponFalloffPack = {
  hs: number
  logged: boolean
  curveFor: (rarity: WeaponRarity, hipfire: number) => FalloffCurve
}

export function getWeaponFalloff(id: string): WeaponFalloffPack | null {
  const entry = payload.weapons[id]
  if (!entry) return null
  return {
    hs: entry.hs,
    logged: true,
    curveFor(rarity, hipfire) {
      const raw = entry.byRarity[rarity] || entry.byRarity[Object.keys(entry.byRarity)[0]!]
      const hip = raw.points[0]?.[1] || hipfire
      const scale = hip > 0 ? hipfire / hip : 1
      return {
        points: raw.points.map(([m, d]) => [m, round1(d * scale)]),
        x: raw.x,
        cap: raw.cap != null ? round1(raw.cap * scale) : undefined,
      }
    },
  }
}

function round1(n: number) {
  return Math.round(n * 100) / 100
}

export function headshotDamage(body: number, hs: number, cap?: number) {
  const raw = body * hs
  return cap != null ? Math.min(raw, cap) : raw
}

export function resolveHs(id: string, falloffHs?: number) {
  const fromPack = falloffHs ?? getWeaponFalloff(id)?.hs
  if (fromPack && fromPack > 1) return fromPack
  const live = getWeapon(id)?.hs
  return live && live > 1 ? live : undefined
}

export function falloffCaption(curve: FalloffCurve) {
  const hip = curve.points[0]
  if (!hip) return 'No damage curve.'
  let fullUntil = hip[0]
  for (const [m, d] of curve.points) {
    if (Math.abs(d - hip[1]) < 0.05) fullUntil = m
    else break
  }
  const last = curve.points[curve.points.length - 1]!
  const long = curve.points.find((p) => p[0] >= 100) || last
  if (fullUntil >= last[0] - 0.1) {
    return `Listed body damage holds across the ${last[0]}m chart — no falloff logged.`
  }
  return `Full damage up to ${formatMeters(fullUntil)}, ${round1(long[1])} beyond ${formatMeters(long[0])}.`
}

function formatMeters(n: number) {
  return `${Number.isInteger(n) ? n : round1(n)}m`
}

export function ttkForVariant(
  variant: WeaponVariantRow,
  hs: number | undefined,
  hp: number,
  bodyDmg: number
) {
  const bodyShots = shotsToKill(bodyDmg, hp)
  const bodyTtk = timeToKill(bodyShots, variant.fireRate)
  const row = {
    hp,
    bodyDmg,
    bodyShots,
    bodyTtk,
    magCanKill: variant.mag >= bodyShots,
    headDmg: undefined as number | undefined,
    headShots: undefined as number | undefined,
    headTtk: undefined as number | undefined,
  }
  if (hs && hs > 1) {
    row.headDmg = bodyDmg * hs
    row.headShots = shotsToKill(row.headDmg, hp)
    row.headTtk = timeToKill(row.headShots, variant.fireRate)
  }
  return row
}

export function defaultChartRange(category: string) {
  if (category === 'Shotgun') return 30
  if (category === 'Sniper' || category === 'DMR') return 200
  return 130
}
