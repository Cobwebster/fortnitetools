'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from '@/components/link'
import {
  CATALOG_RARITY_BG,
  CATALOG_RARITY_TEXT,
  WEAPON_CATALOG,
  WEAPON_CATEGORY_META,
  catalogByCategory,
  formatMagSize,
  type WeaponCatalogEntry,
  type WeaponCategoryId,
  type WeaponRarity,
  type WeaponVariantRow,
} from '@/lib/weapons-catalog'

function WeaponIcon({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="h-12 w-12 object-contain drop-shadow-md"
      loading="lazy"
    />
  )
}

function findWeapon(id: string | null) {
  if (!id) return null
  return WEAPON_CATALOG.find((w) => w.id === id) ?? null
}

function defaultRarity(weapon: WeaponCatalogEntry): WeaponRarity {
  const preferred: WeaponRarity[] = ['Legendary', 'Epic', 'Rare', 'Mythic', 'Exotic', 'Uncommon', 'Common']
  for (const r of preferred) {
    if (weapon.variants.some((v) => v.rarity === r)) return r
  }
  return weapon.variants[0]!.rarity
}

function variantAt(weapon: WeaponCatalogEntry, rarity: WeaponRarity): WeaponVariantRow | null {
  return weapon.variants.find((v) => v.rarity === rarity) ?? null
}

type StatKey = 'dps' | 'dmg' | 'structDmg' | 'fireRate' | 'mag' | 'reload'

const COMPARE_STATS: { key: StatKey; label: string; lowerBetter?: boolean; format: (n: number) => string }[] =
  [
    { key: 'dps', label: 'DPS', format: (n) => String(n) },
    { key: 'dmg', label: 'Damage', format: (n) => String(n) },
    { key: 'structDmg', label: 'Struct', format: (n) => String(n) },
    { key: 'fireRate', label: 'Fire Rate', format: (n) => String(n) },
    { key: 'mag', label: 'Mag', format: formatMagSize },
    { key: 'reload', label: 'Reload', lowerBetter: true, format: (n) => `${n.toFixed(2)}s` },
  ]

function toneFor(a: number, b: number, lowerBetter?: boolean): 'win' | 'lose' | 'tie' {
  if (a === b) return 'tie'
  const aBetter = lowerBetter ? a < b : a > b
  return aBetter ? 'win' : 'lose'
}

function WeaponPicker({
  label,
  value,
  excludeId,
  includeVaulted,
  onChange,
}: {
  label: string
  value: string | null
  excludeId: string | null
  includeVaulted: boolean
  onChange: (id: string | null) => void
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const selected = findWeapon(value)

  const options = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return WEAPON_CATALOG.filter((w) => {
      if (!includeVaulted && w.vaulted) return false
      if (excludeId && w.id === excludeId) return false
      if (!needle) return true
      return (
        w.name.toLowerCase().includes(needle) ||
        w.category.toLowerCase().includes(needle)
      )
    }).slice(0, 40)
  }, [q, excludeId, includeVaulted])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open])

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          setOpen((o) => !o)
          setQ('')
        }}
        className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-left transition-colors hover:border-primary/50"
      >
        {selected ? (
          <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
              <WeaponIcon src={selected.image} alt={selected.name} />
            </div>
            <span className="min-w-0 flex-1 truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
              {selected.name}
            </span>
          </>
        ) : (
          <span className="py-2 text-sm text-muted-foreground">Pick a weapon…</span>
        )}
      </button>

      {open ? (
        <div
          id={listId}
          className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-card shadow-xl"
        >
          <input
            autoFocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name…"
            className="w-full border-b border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <ul className="max-h-64 overflow-y-auto py-1" role="listbox">
            {selected ? (
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted/40"
                  onClick={() => {
                    onChange(null)
                    setOpen(false)
                  }}
                >
                  Clear selection
                </button>
              </li>
            ) : null}
            {options.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={w.id === value}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-muted/50"
                  onClick={() => {
                    onChange(w.id)
                    setOpen(false)
                    setQ('')
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt={w.name} width={28} height={28} className="h-7 w-7 object-contain" />
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{w.name}</span>
                  {w.vaulted ? (
                    <span className="text-[10px] font-bold uppercase text-rose-300">Vaulted</span>
                  ) : null}
                </button>
              </li>
            ))}
            {options.length === 0 ? (
              <li className="px-3 py-4 text-center text-xs text-muted-foreground">No matches</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function ComparePanel({
  leftId,
  rightId,
  includeVaulted,
  onLeft,
  onRight,
  onSwap,
  onClear,
}: {
  leftId: string | null
  rightId: string | null
  includeVaulted: boolean
  onLeft: (id: string | null) => void
  onRight: (id: string | null) => void
  onSwap: () => void
  onClear: () => void
}) {
  const left = findWeapon(leftId)
  const right = findWeapon(rightId)
  const [leftRarity, setLeftRarity] = useState<WeaponRarity | null>(null)
  const [rightRarity, setRightRarity] = useState<WeaponRarity | null>(null)

  useEffect(() => {
    setLeftRarity(left ? defaultRarity(left) : null)
  }, [left])

  useEffect(() => {
    setRightRarity(right ? defaultRarity(right) : null)
  }, [right])

  const leftV = left && leftRarity ? variantAt(left, leftRarity) : null
  const rightV = right && rightRarity ? variantAt(right, rightRarity) : null
  const ready = Boolean(leftV && rightV)

  return (
    <section
      id="compare"
      className="scroll-mt-24 space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Compare weapons
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick any two guns — or tap Compare on a card below — then match rarities side by side.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSwap}
            disabled={!leftId && !rightId}
            className="rounded-lg border border-border px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-40"
          >
            Swap
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!leftId && !rightId}
            className="rounded-lg border border-border px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-40"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <WeaponPicker
          label="Weapon A"
          value={leftId}
          excludeId={rightId}
          includeVaulted={includeVaulted}
          onChange={onLeft}
        />
        <div className="hidden shrink-0 pt-8 text-center font-display text-sm font-bold uppercase tracking-widest text-muted-foreground lg:block">
          VS
        </div>
        <WeaponPicker
          label="Weapon B"
          value={rightId}
          excludeId={leftId}
          includeVaulted={includeVaulted}
          onChange={onRight}
        />
      </div>

      {left && right ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {left.name} rarity
            </span>
            <select
              value={leftRarity ?? ''}
              onChange={(e) => setLeftRarity(e.target.value as WeaponRarity)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            >
              {left.variants.map((v) => (
                <option key={v.rarity} value={v.rarity}>
                  {v.rarity}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {right.name} rarity
            </span>
            <select
              value={rightRarity ?? ''}
              onChange={(e) => setRightRarity(e.target.value as WeaponRarity)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            >
              {right.variants.map((v) => (
                <option key={v.rarity} value={v.rarity}>
                  {v.rarity}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      {ready && left && right && leftV && rightV ? (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
                <th className="px-4 py-2.5 font-semibold">Stat</th>
                <th className="px-3 py-2.5 font-semibold text-right">
                  <span className="inline-flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={left.image} alt={left.name} className="h-5 w-5 object-contain" />
                    <span className="max-w-[140px] truncate">{left.name}</span>
                  </span>
                </th>
                <th className="px-3 py-2.5 font-semibold text-right">
                  <span className="inline-flex items-center gap-2 justify-end">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={right.image} alt={right.name} className="h-5 w-5 object-contain" />
                    <span className="max-w-[140px] truncate">{right.name}</span>
                  </span>
                </th>
              </tr>
              <tr className="border-b border-border/60 text-[10px] text-muted-foreground">
                <td className="px-4 py-1.5">Rarity</td>
                <td className="px-3 py-1.5 text-right">
                  <span
                    className={`inline-flex rounded border px-1.5 py-0.5 text-[10px] font-bold ${CATALOG_RARITY_BG[leftV.rarity]} ${CATALOG_RARITY_TEXT[leftV.rarity]}`}
                  >
                    {leftV.rarity}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-right">
                  <span
                    className={`inline-flex rounded border px-1.5 py-0.5 text-[10px] font-bold ${CATALOG_RARITY_BG[rightV.rarity]} ${CATALOG_RARITY_TEXT[rightV.rarity]}`}
                  >
                    {rightV.rarity}
                  </span>
                </td>
              </tr>
            </thead>
            <tbody>
              {COMPARE_STATS.map((stat) => {
                const a = leftV[stat.key]
                const b = rightV[stat.key]
                const aTone = toneFor(a, b, stat.lowerBetter)
                const bTone = toneFor(b, a, stat.lowerBetter)
                const cell = (tone: 'win' | 'lose' | 'tie') =>
                  tone === 'win'
                    ? 'text-emerald-400 font-semibold'
                    : tone === 'lose'
                      ? 'text-foreground/70'
                      : 'text-foreground font-semibold'
                return (
                  <tr key={stat.key} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-2.5 text-foreground">{stat.label}</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${cell(aTone)}`}>
                      {stat.format(a)}
                    </td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${cell(bTone)}`}>
                      {stat.format(b)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
            Higher is better except Reload (lower is better). Green = stronger on that row.
          </p>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          Select two weapons to see DPS, damage, fire rate, mag, and reload side by side.
        </p>
      )}
    </section>
  )
}

function WeaponBlock({
  weapon,
  compareSlot,
  onCompare,
}: {
  weapon: WeaponCatalogEntry
  compareSlot: 'a' | 'b' | null
  onCompare: (id: string) => void
}) {
  return (
    <article
      id={weapon.id}
      className={`overflow-hidden rounded-xl border bg-card scroll-mt-24 ${
        compareSlot
          ? 'border-primary/70 ring-1 ring-primary/40'
          : 'border-border'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-background">
          <WeaponIcon src={weapon.image} alt={weapon.name} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              {weapon.name}
            </h3>
            {weapon.vaulted ? (
              <span className="rounded border border-rose-400/40 bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                Vaulted
              </span>
            ) : null}
            {compareSlot ? (
              <span className="rounded border border-primary/50 bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Compare {compareSlot.toUpperCase()}
              </span>
            ) : null}
          </div>
          {weapon.note ? (
            <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{weapon.note}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onCompare(weapon.id)}
          className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            compareSlot
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground'
          }`}
        >
          {compareSlot ? 'Selected' : 'Compare'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
              <th className="px-4 py-2.5 font-semibold">Rarity</th>
              <th className="px-3 py-2.5 font-semibold text-right">DPS</th>
              <th className="px-3 py-2.5 font-semibold text-right">Dmg</th>
              <th className="px-3 py-2.5 font-semibold text-right">Struct</th>
              <th className="px-3 py-2.5 font-semibold text-right">Fire Rate</th>
              <th className="px-3 py-2.5 font-semibold text-right">Mag</th>
              <th className="px-4 py-2.5 font-semibold text-right">Reload</th>
            </tr>
          </thead>
          <tbody>
            {weapon.variants.map((v) => (
              <tr key={v.rarity} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex rounded border px-2 py-0.5 text-xs font-bold ${CATALOG_RARITY_BG[v.rarity]} ${CATALOG_RARITY_TEXT[v.rarity]}`}
                  >
                    {v.rarity}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-foreground">
                  {v.dps}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-foreground">{v.dmg}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                  {v.structDmg}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                  {v.fireRate}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                  {formatMagSize(v.mag)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                  {v.reload.toFixed(2)}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export function WeaponsCatalogClient() {
  const [category, setCategory] = useState<WeaponCategoryId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [hideVaulted, setHideVaulted] = useState(true)
  const [leftId, setLeftId] = useState<string | null>(null)
  const [rightId, setRightId] = useState<string | null>(null)

  const liveTotal = useMemo(() => WEAPON_CATALOG.filter((w) => !w.vaulted).length, [])
  const vaultedTotal = useMemo(() => WEAPON_CATALOG.filter((w) => w.vaulted).length, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogByCategory(category).filter((w) => {
      if (hideVaulted && w.vaulted) return false
      if (!q) return true
      return (
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.note?.toLowerCase().includes(q)
      )
    })
  }, [category, query, hideVaulted])

  const grouped = useMemo(() => {
    if (category !== 'all') return [{ id: category, label: category, items: list }] as const
    return WEAPON_CATEGORY_META.filter((c) => c.id !== 'all').map((c) => ({
      id: c.id,
      label: c.label,
      items: list.filter((w) => w.category === c.id),
    }))
  }, [category, list])

  function slotFor(id: string): 'a' | 'b' | null {
    if (id === leftId) return 'a'
    if (id === rightId) return 'b'
    return null
  }

  function addToCompare(id: string) {
    if (id === leftId) {
      setLeftId(null)
      return
    }
    if (id === rightId) {
      setRightId(null)
      return
    }
    if (!leftId) {
      setLeftId(id)
    } else if (!rightId) {
      setRightId(id)
    } else {
      // Replace B when both filled
      setRightId(id)
    }
    // Scroll compare into view once both are set
    if (leftId || rightId) {
      requestAnimationFrame(() => {
        document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <div className="space-y-8">
      <ComparePanel
        leftId={leftId}
        rightId={rightId}
        includeVaulted={!hideVaulted}
        onLeft={setLeftId}
        onRight={setRightId}
        onSwap={() => {
          setLeftId(rightId)
          setRightId(leftId)
        }}
        onClear={() => {
          setLeftId(null)
          setRightId(null)
        }}
      />

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Search weapons
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hammer AR, Sentinel Pump, Striker…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <button
            type="button"
            onClick={() => setHideVaulted((v) => !v)}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${
              hideVaulted
                ? 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground'
                : 'border-rose-400/60 bg-rose-500/15 text-rose-200 hover:border-rose-400 hover:bg-rose-500/25'
            }`}
          >
            {hideVaulted ? `Show vaulted (${vaultedTotal})` : 'Hide vaulted'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Weapon categories">
          {WEAPON_CATEGORY_META.map((c) => {
            const active = category === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Showing <strong className="text-foreground">{list.length}</strong>
          {hideVaulted
            ? ` of ${liveTotal} current-pool weapons`
            : ` of ${WEAPON_CATALOG.length} weapons (${liveTotal} current · ${vaultedTotal} vaulted)`}
          {' · '}
          <a href="#compare" className="text-primary hover:underline">
            Compare two guns
          </a>
          {' · '}
          <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
            Damage calculator
          </Link>
          {' · '}
          <Link href="/tools/loadout-builder" className="text-primary hover:underline">
            Loadout builder
          </Link>
        </p>
      </div>

      {grouped.map((group) =>
        group.items.length === 0 ? null : (
          <section key={String(group.id)} className="space-y-4">
            {category === 'all' ? (
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {group.label}
              </h2>
            ) : null}
            <div className="space-y-4">
              {group.items.map((w) => (
                <WeaponBlock
                  key={w.id}
                  weapon={w}
                  compareSlot={slotFor(w.id)}
                  onCompare={addToCompare}
                />
              ))}
            </div>
          </section>
        )
      )}

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          No weapons matched. Clear search or show vaulted.
        </div>
      ) : null}
    </div>
  )
}
