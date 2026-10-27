'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from '@/components/link'
import {
  CATALOG_RARITY_BG,
  CATALOG_RARITY_TEXT,
  type WeaponCatalogEntry,
  type WeaponRarity,
  type WeaponVariantRow,
} from '@/lib/weapons-catalog'
import {
  COMBAT_HP,
  FALLOFF_CAPTURED_AT,
  defaultChartRange,
  falloffCaption,
  formatTtk,
  getWeaponFalloff,
  headshotDamage,
  interpolateFalloff,
  resolveHs,
  shotsToKill,
  timeToKill,
  type FalloffCurve,
} from '@/lib/weapon-combat'

function polyline(points: [number, number][], maxX: number, maxY: number) {
  return points
    .map(([m, d]) => {
      const x = 44 + (m / maxX) * 440
      const y = 170 - (d / maxY) * 150
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

function CombatChart({
  curve,
  hs,
  meters,
  onMeters,
}: {
  curve: FalloffCurve
  hs: number
  meters: number
  onMeters: (n: number) => void
}) {
  const showHead = hs > 1
  const maxX = Math.max(curve.x, 1)
  const bodyVals = curve.points.map((p) => p[1])
  const headVals = showHead ? curve.points.map((p) => headshotDamage(p[1], hs, curve.cap)) : bodyVals
  const maxY = Math.max(...bodyVals, ...headVals, 1) * 1.12
  const bodyLine = polyline(curve.points, maxX, maxY)
  const headLine = showHead
    ? polyline(
        curve.points.map(([m, d]) => [m, headshotDamage(d, hs, curve.cap)]),
        maxX,
        maxY
      )
    : ''
  const bodyNow = interpolateFalloff(curve.points, meters)
  const headNow = showHead ? headshotDamage(bodyNow, hs, curve.cap) : bodyNow
  const probeX = 44 + (meters / maxX) * 440

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(maxX * t))
  const yTicks = [0, 0.5, 1].map((t) => Math.round(maxY * t))

  return (
    <div className="space-y-3">
      <svg
        viewBox="0 0 500 200"
        className="h-auto w-full cursor-crosshair overflow-visible touch-none"
        role="img"
        aria-label="Damage by distance"
        onPointerDown={(e) => {
          const box = e.currentTarget.getBoundingClientRect()
          const x = Math.min(484, Math.max(44, ((e.clientX - box.left) / box.width) * 500))
          onMeters(Math.round(((x - 44) / 440) * maxX))
        }}
        onPointerMove={(e) => {
          const box = e.currentTarget.getBoundingClientRect()
          const x = Math.min(484, Math.max(44, ((e.clientX - box.left) / box.width) * 500))
          onMeters(Math.round(((x - 44) / 440) * maxX))
        }}
      >
        {ticks.map((m) => {
          const x = 44 + (m / maxX) * 440
          return (
            <g key={m}>
              <line x1={x} y1={20} x2={x} y2={170} stroke="currentColor" className="text-border" strokeWidth="1" />
              <text x={x} y={188} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {m}m
              </text>
            </g>
          )
        })}
        {yTicks.map((d) => {
          const y = 170 - (d / maxY) * 150
          return (
            <text key={d} x={36} y={y + 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {d}
            </text>
          )
        })}
        {showHead ? <polyline points={headLine} fill="none" stroke="#38bdf8" strokeWidth="2.5" /> : null}
        <polyline points={bodyLine} fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5" />
        <line
          x1={probeX}
          y1={20}
          x2={probeX}
          y2={170}
          stroke="currentColor"
          className="text-foreground/40"
          strokeWidth="1"
        />
        {showHead ? (
          <circle cx={probeX} cy={170 - (headNow / maxY) * 150} r="4" fill="#38bdf8" />
        ) : null}
        <circle cx={probeX} cy={170 - (bodyNow / maxY) * 150} r="4" className="fill-primary" />
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <p className="text-muted-foreground">
          <span className="mr-3 inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-3 rounded-sm bg-primary" /> Body {bodyNow.toFixed(1)}
          </span>
          {showHead ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded-sm bg-sky-400" /> Head {headNow.toFixed(1)}
            </span>
          ) : null}
          <span className="ml-3 tabular-nums text-foreground">{meters}m</span>
        </p>
        <input
          type="range"
          min={0}
          max={Math.round(maxX)}
          value={meters}
          onChange={(e) => onMeters(Number(e.target.value))}
          className="w-40 accent-[var(--primary)]"
          aria-label="Distance in meters"
        />
      </div>
    </div>
  )
}

export function WeaponCombatPanel({
  weapon,
  initialRarity,
}: {
  weapon: WeaponCatalogEntry
  initialRarity: WeaponRarity
}) {
  const pack = getWeaponFalloff(weapon.id)
  const hs = resolveHs(weapon.id, pack?.hs)
  const [rarity, setRarity] = useState<WeaponRarity>(initialRarity)
  const variant: WeaponVariantRow =
    weapon.variants.find((v) => v.rarity === rarity) ?? weapon.variants[0]!

  const curve = useMemo(() => {
    if (pack) return pack.curveFor(variant.rarity, variant.dmg)
    const maxX = defaultChartRange(weapon.category)
    return {
      points: [
        [0, variant.dmg],
        [maxX, variant.dmg],
      ] as [number, number][],
      x: maxX,
    }
  }, [pack, variant, weapon.category])

  const [meters, setMeters] = useState(0)
  const maxX = curve.x
  useEffect(() => {
    setMeters((m) => Math.min(maxX, Math.max(0, m)))
  }, [maxX])
  const clamped = Math.min(maxX, Math.max(0, meters))
  const bodyAt = pack ? interpolateFalloff(curve.points, clamped) : variant.dmg
  const headAt = hs ? headshotDamage(bodyAt, hs, curve.cap) : undefined

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1.5">
        {weapon.variants.map((v) => (
          <button
            key={v.rarity}
            type="button"
            onClick={() => setRarity(v.rarity)}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
              v.rarity === variant.rarity
                ? `${CATALOG_RARITY_BG[v.rarity]} ${CATALOG_RARITY_TEXT[v.rarity]}`
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {v.rarity}
          </button>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Time to kill
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {variant.rarity} at {clamped}m · {bodyAt.toFixed(1)} body
            {headAt != null ? ` / ${headAt.toFixed(1)} head` : ''}. TTK is (shots − 1) / fire rate,
            every pellet on a standing HP pool.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <th className="px-4 py-2 text-left font-bold">Target</th>
                <th className="px-3 py-2 text-right font-bold">Body</th>
                {hs ? <th className="px-4 py-2 text-right font-bold">Headshots</th> : null}
              </tr>
            </thead>
            <tbody>
              {COMBAT_HP.map((row) => {
                const bodyShots = shotsToKill(bodyAt, row.hp)
                const bodyTtk = timeToKill(bodyShots, variant.fireRate)
                const headShots = headAt != null ? shotsToKill(headAt, row.hp) : null
                const headTtk = headShots != null ? timeToKill(headShots, variant.fireRate) : null
                return (
                  <tr key={row.hp} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-2.5">
                      <p className="font-semibold text-foreground">{row.label}</p>
                      <p className="text-[11px] text-muted-foreground">{row.hint}</p>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <p className="font-semibold tabular-nums text-primary">{formatTtk(bodyTtk)}</p>
                      <p className="text-[11px] tabular-nums text-muted-foreground">
                        {bodyShots === 1 ? '1 shot' : `${bodyShots} shots`}
                      </p>
                    </td>
                    {hs ? (
                      <td className="px-4 py-2.5 text-right">
                        <p className="font-semibold tabular-nums text-sky-300">{formatTtk(headTtk ?? 0)}</p>
                        <p className="text-[11px] tabular-nums text-muted-foreground">
                          {headShots === 1 ? '1 shot' : `${headShots} shots`}
                        </p>
                      </td>
                    ) : null}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Damage by distance
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {pack ? falloffCaption(curve) : 'No logged falloff curve — hipfire body/head at every meter.'}{' '}
            {pack ? `Snapshot ${FALLOFF_CAPTURED_AT}.` : null}
          </p>
        </div>
        <div className="px-4 py-4">
          <CombatChart curve={curve} hs={hs ?? 1} meters={clamped} onMeters={setMeters} />
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Custom HP in the{' '}
        <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
          weapon damage calculator
        </Link>
        . Bloom, builds, and healing still beat the sheet.
      </p>
    </div>
  )
}
