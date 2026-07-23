'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, Link2, Copy } from 'lucide-react'
import {
  DEFAULT_LOADOUT,
  HEALS,
  LOADOUT_SLOTS,
  MOBILITY,
  PRESETS,
  SLOT_META,
  buildLoadoutSharePath,
  loadoutsEqual,
  parseLoadoutSearch,
  utilityForSlot,
  weaponsForSlot,
  type LoadoutSlot,
  type UtilityItem,
} from '@/lib/loadout'
import {
  RARITY_BORDER,
  RARITY_TEXT,
  calcWeaponStats,
  getWeapon,
  type WeaponStat,
} from '@/lib/weapons'

type Selection = Record<LoadoutSlot, string>

function ItemIcon({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`object-contain drop-shadow-md ${className}`} loading="lazy" />
  )
}

function HotbarSlot({
  slot,
  active,
  weapon,
  utility,
  onClick,
}: {
  slot: LoadoutSlot
  active: boolean
  weapon?: WeaponStat
  utility?: UtilityItem
  onClick: () => void
}) {
  const item = weapon || utility
  const rarity = item?.rarity || 'Common'
  const meta = SLOT_META[slot]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-square flex-col items-center justify-end rounded-lg border-2 p-1.5 transition-all ${
        active ? 'border-primary ring-2 ring-primary/40 scale-[1.03]' : RARITY_BORDER[rarity] || RARITY_BORDER.Common
      } bg-gradient-to-b from-black/40 to-black/70 hover:brightness-110`}
    >
      <span className="absolute left-1.5 top-1 text-[9px] font-bold uppercase tracking-wider text-white/70">
        {meta.label.split(' ')[0]}
      </span>
      {item ? (
        <ItemIcon src={item.image} alt={item.name} className="h-[70%] w-[70%]" />
      ) : (
        <span className="mb-6 text-[10px] text-white/40">Empty</span>
      )}
      <span className="w-full truncate px-0.5 text-center text-[10px] font-semibold text-white">
        {item?.name || meta.hint}
      </span>
    </button>
  )
}

function syncAddressBar(selection: Selection) {
  if (typeof window === 'undefined') return
  const path = loadoutsEqual(selection, DEFAULT_LOADOUT)
    ? '/tools/loadout-builder'
    : buildLoadoutSharePath(selection)
  const next = `${path}${window.location.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) {
    window.history.replaceState(null, '', next)
  }
}

export function LoadoutBuilderClient() {
  const [selection, setSelection] = useState<Selection>(DEFAULT_LOADOUT)
  const [activeSlot, setActiveSlot] = useState<LoadoutSlot>('shotgun')
  const [targetHP, setTargetHP] = useState(200)
  const [headshot, setHeadshot] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle')
  const shareResetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Read shared loadout from URL once on mount — never inject params on the clean landing URL.
  useEffect(() => {
    const fromUrl = parseLoadoutSearch(window.location.search)
    if (fromUrl) setSelection(fromUrl)
    setHydrated(true)
  }, [])

  // Only write query params after hydration, and only when the kit differs from the default landing loadout.
  useEffect(() => {
    if (!hydrated) return
    syncAddressBar(selection)
  }, [selection, hydrated])

  useEffect(() => {
    return () => {
      if (shareResetRef.current) clearTimeout(shareResetRef.current)
    }
  }, [])

  const activeWeapons = weaponsForSlot(activeSlot)
  const activeUtility = utilityForSlot(activeSlot)
  const isCustom = !loadoutsEqual(selection, DEFAULT_LOADOUT)

  const combatWeapons = useMemo(() => {
    return (['shotgun', 'ar', 'smg'] as LoadoutSlot[])
      .map((slot) => getWeapon(selection[slot]))
      .filter(Boolean) as WeaponStat[]
  }, [selection])

  const stats = useMemo(() => {
    return combatWeapons.map((w) => ({
      weapon: w,
      ...calcWeaponStats(w, targetHP, headshot),
    }))
  }, [combatWeapons, targetHP, headshot])

  const heal = HEALS.find((h) => h.id === selection.heal)
  const mobility = MOBILITY.find((m) => m.id === selection.mobility)

  function updateSelection(next: Selection) {
    setSelection(next)
  }

  function pickItem(id: string) {
    updateSelection({ ...selection, [activeSlot]: id })
  }

  async function shareLoadout() {
    const path = buildLoadoutSharePath(selection)
    const url = `${window.location.origin}${path}`

    try {
      await navigator.clipboard.writeText(url)
      setShareStatus('copied')
    } catch {
      setShareStatus('idle')
      return
    }

    if (shareResetRef.current) clearTimeout(shareResetRef.current)
    shareResetRef.current = setTimeout(() => setShareStatus('idle'), 2200)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => updateSelection({ ...p.slots })}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-left hover:border-primary/50 transition-colors"
            >
              <span className="block text-xs font-bold uppercase tracking-wider text-foreground">{p.name}</span>
              <span className="text-[11px] text-muted-foreground">{p.blurb}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
          <button
            type="button"
            onClick={shareLoadout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
          >
            {shareStatus === 'copied' ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {shareStatus === 'copied' ? 'Link copied' : 'Copy loadout link'}
          </button>
          <p className="text-[11px] text-muted-foreground sm:text-right max-w-[16rem]">
            {isCustom ? (
              <span className="inline-flex items-center gap-1">
                <Link2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                Shareable link is in the address bar
              </span>
            ) : (
              'Build or change a kit, then share a link with teammates'
            )}
          </p>
        </div>
      </div>

      {/* Hotbar */}
      <section className="rounded-2xl border border-border bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-inner">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/80">Inventory preview</h2>
          <p className="text-[11px] text-white/50">Click a slot, then pick an item below</p>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {LOADOUT_SLOTS.map((slot) => (
            <HotbarSlot
              key={slot}
              slot={slot}
              active={activeSlot === slot}
              weapon={getWeapon(selection[slot])}
              utility={[...HEALS, ...MOBILITY].find((u) => u.id === selection[slot])}
              onClick={() => setActiveSlot(slot)}
            />
          ))}
        </div>
      </section>

      {/* Picker */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold uppercase text-foreground">
              Choose {SLOT_META[activeSlot].label}
            </h2>
            <p className="text-xs text-muted-foreground">{SLOT_META[activeSlot].hint}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {LOADOUT_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setActiveSlot(slot)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  activeSlot === slot
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {SLOT_META[slot].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {activeWeapons.map((w) => {
            const selected = selection[activeSlot] === w.id
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => pickItem(w.id)}
                className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
                  selected ? 'border-primary bg-primary/10' : `${RARITY_BORDER[w.rarity]} hover:border-primary/40`
                }`}
              >
                <ItemIcon src={w.image} alt={w.name} className="h-12 w-12 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{w.name}</p>
                  <p className={`text-[10px] font-bold uppercase ${RARITY_TEXT[w.rarity]}`}>{w.rarity}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {w.dmg} dmg · {w.fireRate}/s
                  </p>
                </div>
              </button>
            )
          })}
          {activeUtility.map((u) => {
            const selected = selection[activeSlot] === u.id
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => pickItem(u.id)}
                className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
                  selected
                    ? 'border-primary bg-primary/10'
                    : `${RARITY_BORDER[u.rarity] || RARITY_BORDER.Common} hover:border-primary/40`
                }`}
              >
                <ItemIcon src={u.image} alt={u.name} className="h-12 w-12 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{u.note}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Combat math */}
      <section className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-bold uppercase text-foreground">Loadout STK / TTK</h2>
          <div className="flex flex-wrap gap-2">
            {[100, 150, 200].map((hp) => (
              <button
                key={hp}
                type="button"
                onClick={() => setTargetHP(hp)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  targetHP === hp ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {hp} HP
              </button>
            ))}
            <button
              type="button"
              onClick={() => setHeadshot((v) => !v)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                headshot ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {headshot ? 'Headshots ON' : 'Body shots'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2">Weapon</th>
                <th className="px-3 py-2">Dmg/shot</th>
                <th className="px-3 py-2">STK</th>
                <th className="px-3 py-2">TTK</th>
                <th className="px-3 py-2">DPS</th>
                <th className="px-3 py-2">Mag OK?</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(({ weapon, effectiveDmg, shotsToKill, timeToKill, effectiveDps, magCanKill }) => (
                <tr key={weapon.id} className="border-b border-border/60 last:border-0">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <ItemIcon src={weapon.image} alt="" className="h-10 w-10" />
                      <span className="font-medium text-foreground">{weapon.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-foreground">{effectiveDmg.toFixed(1)}</td>
                  <td className="px-3 py-2 font-display text-lg font-bold text-primary">{shotsToKill}</td>
                  <td className="px-3 py-2 text-foreground">{timeToKill.toFixed(2)}s</td>
                  <td className="px-3 py-2 text-muted-foreground">{effectiveDps.toFixed(0)}</td>
                  <td className={`px-3 py-2 ${magCanKill ? 'text-green-400' : 'text-destructive'}`}>
                    {magCanKill ? 'Yes' : 'Needs reload'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-lg border border-border bg-muted/30 p-3 flex gap-3 items-center">
            {heal && <ItemIcon src={heal.image} alt={heal.name} className="h-12 w-12" />}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Heals</p>
              <p className="font-semibold text-foreground">{heal?.name}</p>
              <p className="text-xs text-muted-foreground">{heal?.note}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3 flex gap-3 items-center">
            {mobility && <ItemIcon src={mobility.image} alt={mobility.name} className="h-12 w-12" />}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Mobility</p>
              <p className="font-semibold text-foreground">{mobility?.name}</p>
              <p className="text-xs text-muted-foreground">{mobility?.note}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Stats are approximate for Chapter 7 Season 3 planning. Epic balance patches change numbers — confirm in-game.
          Dig deeper per gun in the{' '}
          <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
            weapon damage calculator
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
