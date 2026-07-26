'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CATALOG_RARITY_BG,
  CATALOG_RARITY_TEXT,
  WEAPON_CATALOG,
  WEAPON_CATEGORY_META,
  catalogByCategory,
  formatMagSize,
  type WeaponCatalogEntry,
  type WeaponCategoryId,
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

function WeaponBlock({ weapon }: { weapon: WeaponCatalogEntry }) {
  return (
    <article
      id={weapon.id}
      className="overflow-hidden rounded-xl border border-border bg-card scroll-mt-24"
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
          </div>
          {weapon.note ? (
            <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{weapon.note}</p>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
                <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{v.dmg}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                  {v.structDmg}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                  {v.fireRate}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                  {formatMagSize(v.mag)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
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

  return (
    <div className="space-y-8">
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
                <WeaponBlock key={w.id} weapon={w} />
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
