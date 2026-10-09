'use client'

import { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import Link from '@/components/link'
import {
  Check,
  Link2,
  Copy,
  UploadCloud,
  X,
  Package,
  Crosshair,
  Sparkles,
  RefreshCw,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {
  submitLoadoutAction,
  type LoadoutSubmissionState,
} from './actions'
import {
  AMMO_META,
  DEFAULT_BUNDLE,
  HEALS,
  HEAL_STACK_MAX,
  LOADOUT_SLOTS,
  MAT_CAP,
  MAT_META,
  MAT_PRESETS,
  MOBILITY,
  PRESETS,
  SLOT_META,
  buildLoadoutSharePath,
  bundlesEqual,
  getUtility,
  kitTips,
  matPieces,
  parseLoadoutSearch,
  presetToBundle,
  scoreKit,
  suggestedAmmoForSlots,
  utilityForSlot,
  weaponsForSlot,
  type AmmoState,
  type KitAxis,
  type LoadoutBundle,
  type LoadoutSlot,
  type MatsState,
  type UseCaseTag,
  type UtilityItem,
} from '@/lib/loadout'
import {
  RARITY_BORDER,
  RARITY_TEXT,
  calcWeaponStats,
  getWeapon,
  type WeaponStat,
} from '@/lib/weapons'

const initialSubmissionState: LoadoutSubmissionState = {}

const AXIS_LABEL: Record<KitAxis, string> = {
  close: 'Close',
  mid: 'Mid',
  spray: 'Spray',
  sustain: 'Sustain',
  rotate: 'Rotate',
  build: 'Mats',
}

const USE_CASE_FILTERS: Array<UseCaseTag | 'All'> = [
  'All',
  'Ranked',
  'Pubs',
  'Contest',
  'Zone',
  'Zero Build',
  'Duo',
  'Fortnitemares',
]

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
  healStack,
  onClick,
}: {
  slot: LoadoutSlot
  active: boolean
  weapon?: WeaponStat
  utility?: UtilityItem
  healStack?: number
  onClick: () => void
}) {
  const item = weapon || utility
  const rarity = item?.rarity || 'Common'
  const meta = SLOT_META[slot]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex aspect-square flex-col items-center justify-end rounded-xl border-2 p-1.5 transition-all duration-200 ${
        active
          ? 'border-cyan-300 ring-2 ring-cyan-300/50 scale-[1.04] shadow-[0_0_24px_rgba(103,232,249,0.25)]'
          : RARITY_BORDER[rarity] || RARITY_BORDER.Common
      } bg-gradient-to-b from-slate-800/90 via-slate-950 to-black hover:brightness-110`}
    >
      <span className="absolute left-1.5 top-1 flex h-4 w-4 items-center justify-center rounded bg-black/60 text-[9px] font-bold text-white/80">
        {meta.key}
      </span>
      {slot === 'heal' && healStack ? (
        <span className="absolute right-1.5 top-1 rounded bg-emerald-500/90 px-1 text-[9px] font-bold text-black">
          ×{healStack}
        </span>
      ) : null}
      {item ? (
        <ItemIcon
          src={item.image}
          alt={item.name}
          className="h-[68%] w-[68%] transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        <span className="mb-6 text-[10px] text-white/40">Empty</span>
      )}
      <span className="w-full truncate px-0.5 text-center text-[10px] font-semibold text-white">
        {item?.name || meta.hint}
      </span>
    </button>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-display text-sm font-bold text-foreground">{value.toFixed(0)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-300 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function syncAddressBar(bundle: LoadoutBundle) {
  if (typeof window === 'undefined') return
  const path = bundlesEqual(bundle, DEFAULT_BUNDLE)
    ? '/tools/loadout-builder'
    : buildLoadoutSharePath(bundle)
  const next = `${path}${window.location.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) {
    window.history.replaceState(null, '', next)
  }
}

export function LoadoutBuilderClient() {
  const [bundle, setBundle] = useState<LoadoutBundle>(DEFAULT_BUNDLE)
  const [activeSlot, setActiveSlot] = useState<LoadoutSlot>('shotgun')
  const [useCase, setUseCase] = useState<(typeof USE_CASE_FILTERS)[number]>('All')
  const [targetHP, setTargetHP] = useState(200)
  const [headshot, setHeadshot] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle')
  const [submissionOpen, setSubmissionOpen] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(false)
  const [creatorName, setCreatorName] = useState('')
  const [submissionState, submissionAction, submissionPending] = useActionState(
    submitLoadoutAction,
    initialSubmissionState
  )
  const shareResetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fromUrl = parseLoadoutSearch(window.location.search)
    if (fromUrl) setBundle(fromUrl)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    syncAddressBar(bundle)
  }, [bundle, hydrated])

  useEffect(() => {
    return () => {
      if (shareResetRef.current) clearTimeout(shareResetRef.current)
    }
  }, [])

  useEffect(() => {
    if (window.location.hash !== '#submit-loadout') return

    const supabase = createClient()
    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const profileName =
        (user.user_metadata?.display_name as string | undefined)?.trim() || ''
      setCreatorName(profileName)
      setSubmissionOpen(true)
    })
  }, [])

  const activeWeapons = weaponsForSlot(activeSlot)
  const activeUtility = utilityForSlot(activeSlot)
  const isCustom = !bundlesEqual(bundle, DEFAULT_BUNDLE)

  const filteredPresets = useMemo(() => {
    if (useCase === 'All') return PRESETS
    return PRESETS.filter((p) => p.tags.includes(useCase))
  }, [useCase])

  const combatWeapons = useMemo(() => {
    return (['shotgun', 'ar', 'smg'] as LoadoutSlot[])
      .map((slot) => getWeapon(bundle.slots[slot]))
      .filter(Boolean) as WeaponStat[]
  }, [bundle.slots])

  const stats = useMemo(() => {
    return combatWeapons.map((w) => ({
      weapon: w,
      ...calcWeaponStats(w, targetHP, headshot),
    }))
  }, [combatWeapons, targetHP, headshot])

  const heal = HEALS.find((h) => h.id === bundle.slots.heal)
  const mobility = MOBILITY.find((m) => m.id === bundle.slots.mobility)
  const scores = useMemo(() => scoreKit(bundle), [bundle])
  const tips = useMemo(() => kitTips(bundle), [bundle])
  const pieces = useMemo(() => matPieces(bundle.mats), [bundle.mats])
  const readiness = useMemo(() => {
    const vals = Object.values(scores)
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 20)
  }, [scores])

  function updateBundle(next: LoadoutBundle) {
    setBundle(next)
  }

  function pickItem(id: string) {
    const slots = { ...bundle.slots, [activeSlot]: id }
    const next: LoadoutBundle = {
      ...bundle,
      slots,
      ammo: suggestedAmmoForSlots(slots),
    }
    if (activeSlot === 'heal') {
      const u = getUtility(id)
      next.healStack = u?.defaultStack ?? bundle.healStack
    }
    updateBundle(next)
  }

  function setMats(mats: MatsState) {
    updateBundle({ ...bundle, mats: { ...mats } })
  }

  function setMatKey(key: keyof MatsState, value: number) {
    setMats({ ...bundle.mats, [key]: Math.min(MAT_CAP, Math.max(0, value)) })
  }

  function setAmmoKey(key: keyof AmmoState, value: number) {
    updateBundle({
      ...bundle,
      ammo: { ...bundle.ammo, [key]: Math.min(999, Math.max(0, value)) },
    })
  }

  function applyPreset(id: string) {
    const preset = PRESETS.find((p) => p.id === id)
    if (!preset) return
    updateBundle(presetToBundle(preset))
  }

  async function shareLoadout() {
    const path = buildLoadoutSharePath(bundle)
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

  async function openSubmissionForm() {
    setCheckingAuth(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const next = `${window.location.pathname}${window.location.search}#submit-loadout`
      window.location.assign(`/login?next=${encodeURIComponent(next)}`)
      return
    }

    const profileName =
      (user.user_metadata?.display_name as string | undefined)?.trim() || ''
    setCreatorName(profileName)
    setSubmissionOpen(true)
    setCheckingAuth(false)
  }

  return (
    <div className="space-y-8">
      {/* Use-case presets */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Use cases</p>
            <h2 className="font-display text-xl font-bold uppercase text-foreground">
              Start from a real scenario
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {USE_CASE_FILTERS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setUseCase(tag)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  useCase === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPresets.map((p) => {
            const active = bundlesEqual(bundle, presetToBundle(p))
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  active
                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(103,232,249,0.12)]'
                    : 'border-border bg-card hover:border-primary/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">{p.name}</span>
                  <span className="shrink-0 text-[10px] font-semibold uppercase text-muted-foreground">
                    {p.mats.wood + p.mats.stone + p.mats.metal} mats
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{p.blurb}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-muted-foreground">
          {isCustom ? (
            <span className="inline-flex items-center gap-1">
              <Link2 className="h-3 w-3 shrink-0" aria-hidden="true" />
              Shareable inventory link is in the address bar
            </span>
          ) : (
            'Pick a use case or edit slots — mats and ammo ride along in the share link'
          )}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
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
            {shareStatus === 'copied' ? 'Link copied' : 'Copy inventory link'}
          </button>
          <button
            type="button"
            onClick={openSubmissionForm}
            disabled={checkingAuth}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            {checkingAuth ? 'Checking…' : 'Upload to site'}
          </button>
        </div>
      </div>

      {submissionOpen ? (
        <section
          id="submit-loadout"
          className="relative rounded-xl border border-primary/30 bg-linear-to-br from-primary/10 via-card to-card p-5 sm:p-6"
        >
          <button
            type="button"
            onClick={() => setSubmissionOpen(false)}
            className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close submission form"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="mb-5 pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Community loadouts
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase text-foreground">
              Submit this inventory
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hotbar, mats, ammo, and heal stacks — saved for the upcoming community showcase.
            </p>
          </div>

          <form action={submissionAction} className="grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="loadoutPath" value={buildLoadoutSharePath(bundle)} />

            {submissionState.error ? (
              <p
                className="sm:col-span-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {submissionState.error}
              </p>
            ) : null}
            {submissionState.success ? (
              <p
                className="sm:col-span-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
                role="status"
              >
                {submissionState.success}
              </p>
            ) : null}

            <div>
              <label htmlFor="creator-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                Your name
              </label>
              <input
                id="creator-name"
                name="creatorName"
                type="text"
                required
                minLength={2}
                maxLength={40}
                defaultValue={creatorName}
                placeholder="Display name"
                className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label htmlFor="loadout-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                Loadout name
              </label>
              <input
                id="loadout-name"
                name="loadoutName"
                type="text"
                required
                minLength={3}
                maxLength={80}
                placeholder="e.g. Ranked endgame kit"
                className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="loadout-url" className="mb-1.5 block text-sm font-semibold text-foreground">
                Inventory link
              </label>
              <input
                id="loadout-url"
                type="text"
                readOnly
                value={buildLoadoutSharePath(bundle)}
                className="w-full truncate rounded-md border border-border bg-background/50 px-3 py-2.5 text-xs text-muted-foreground"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submissionPending}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <UploadCloud className="h-4 w-4" aria-hidden="true" />
                {submissionPending ? 'Submitting…' : 'Submit loadout'}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {/* Inventory stage */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.12),_transparent_55%),linear-gradient(180deg,#0b1220_0%,#020617_100%)] p-5 shadow-inner sm:p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
              <Package className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/90">
                Full inventory
              </h2>
              <p className="text-[11px] text-white/50">
                Hotbar · mats · ammo · heal stacks — click a slot to re-loot
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Readiness</p>
              <p className="font-display text-2xl font-bold text-cyan-300">{readiness}%</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Pieces</p>
              <p className="font-display text-2xl font-bold text-white">{pieces.total}</p>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-5 gap-2 sm:gap-3">
          {LOADOUT_SLOTS.map((slot) => (
            <HotbarSlot
              key={slot}
              slot={slot}
              active={activeSlot === slot}
              weapon={getWeapon(bundle.slots[slot])}
              utility={getUtility(bundle.slots[slot])}
              healStack={slot === 'heal' ? bundle.healStack : undefined}
              onClick={() => setActiveSlot(slot)}
            />
          ))}
        </div>

        {/* Mats strip */}
        <div className="relative mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Materials</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {MAT_PRESETS.map((mp) => (
                  <button
                    key={mp.id}
                    type="button"
                    onClick={() => setMats(mp.mats)}
                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white"
                    title={mp.blurb}
                  >
                    {mp.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {MAT_META.map((mat) => {
                const value = bundle.mats[mat.key]
                const pct = (value / MAT_CAP) * 100
                return (
                  <div key={mat.key} className="flex items-center gap-3">
                    <ItemIcon src={mat.image} alt={mat.label} className="h-9 w-9 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-white">{mat.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/40">
                            ~{Math.floor(value / 10)} pieces
                          </span>
                          <input
                            type="number"
                            min={0}
                            max={MAT_CAP}
                            value={value}
                            onChange={(e) => setMatKey(mat.key, Number(e.target.value))}
                            className="w-16 rounded border border-white/15 bg-black/50 px-1.5 py-0.5 text-right text-xs font-bold text-white outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={MAT_CAP}
                        step={10}
                        value={value}
                        onChange={(e) => setMatKey(mat.key, Number(e.target.value))}
                        className="w-full accent-cyan-400"
                        aria-label={`${mat.label} materials`}
                      />
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: mat.color }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-black/35 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-rose-300" aria-hidden="true" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Ammo</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateBundle({ ...bundle, ammo: suggestedAmmoForSlots(bundle.slots) })
                  }
                  className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70 hover:bg-white/10"
                >
                  <RefreshCw className="h-3 w-3" aria-hidden="true" />
                  Auto
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {AMMO_META.map((a) => (
                  <label
                    key={a.key}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-white/60">
                      {a.label}
                    </span>
                    <span className="mb-1 block text-[10px] text-white/35">{a.hint}</span>
                    <input
                      type="number"
                      min={0}
                      max={999}
                      value={bundle.ammo[a.key]}
                      onChange={(e) => setAmmoKey(a.key, Number(e.target.value))}
                      className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-sm font-bold text-white outline-none focus:border-cyan-400"
                    />
                  </label>
                ))}
              </div>
            </div>

            {activeSlot === 'heal' || heal ? (
              <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/80">
                  Heal stack
                </h3>
                <div className="flex items-center gap-3">
                  {heal ? <ItemIcon src={heal.image} alt={heal.name} className="h-10 w-10" /> : null}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{heal?.name}</p>
                    <input
                      type="range"
                      min={1}
                      max={HEAL_STACK_MAX}
                      value={bundle.healStack}
                      onChange={(e) =>
                        updateBundle({
                          ...bundle,
                          healStack: Number(e.target.value),
                        })
                      }
                      className="mt-2 w-full accent-emerald-400"
                      aria-label="Heal stack size"
                    />
                  </div>
                  <span className="font-display text-2xl font-bold text-emerald-300">
                    ×{bundle.healStack}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Kit scorecard + tips */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl font-bold uppercase text-foreground">Kit scorecard</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Relative planning scores from your hotbar, heals, utility, and mats — not an Epic rating.
          </p>
          <div className="mt-4 space-y-3">
            {(Object.keys(AXIS_LABEL) as KitAxis[]).map((axis) => (
              <ScoreBar key={axis} label={AXIS_LABEL[axis]} value={scores[axis]} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl font-bold uppercase text-foreground">Coach notes</h2>
          <ul className="mt-4 space-y-3">
            {tips.map((tip) => (
              <li
                key={tip}
                className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              {heal ? <ItemIcon src={heal.image} alt={heal.name} className="h-11 w-11" /> : null}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Heals</p>
                <p className="text-sm font-semibold text-foreground">
                  {heal?.name} ×{bundle.healStack}
                </p>
                <p className="text-[11px] text-muted-foreground">{heal?.note}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              {mobility ? (
                <ItemIcon src={mobility.image} alt={mobility.name} className="h-11 w-11" />
              ) : null}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Utility</p>
                <p className="text-sm font-semibold text-foreground">{mobility?.name}</p>
                <p className="text-[11px] text-muted-foreground">{mobility?.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Picker */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold uppercase text-foreground">
              Choose {SLOT_META[activeSlot].label}
            </h2>
            <p className="text-xs text-muted-foreground">
              {SLOT_META[activeSlot].hint}
              {' · '}
              <span className="text-foreground">
                {activeWeapons.length + activeUtility.length} options
              </span>
            </p>
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
            const selected = bundle.slots[activeSlot] === w.id
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
                  <p className="truncate text-sm font-semibold text-foreground">{w.name}</p>
                  <p className={`text-[10px] font-bold uppercase ${RARITY_TEXT[w.rarity]}`}>{w.rarity}</p>
                  {w.note ? (
                    <p className="line-clamp-1 text-[11px] text-muted-foreground">{w.note}</p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      {w.dmg} dmg · {w.fireRate}/s
                    </p>
                  )}
                </div>
              </button>
            )
          })}
          {activeUtility.map((u) => {
            const selected = bundle.slots[activeSlot] === u.id
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
                  <p className="truncate text-sm font-semibold text-foreground">{u.name}</p>
                  <p className="line-clamp-2 text-[11px] text-muted-foreground">{u.note}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Combat math */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
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
                      <ItemIcon src={weapon.image} alt={weapon.name} className="h-10 w-10" />
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

        <p className="text-xs text-muted-foreground">
          Stats and mat piece estimates are for Chapter 7 Season 4 planning (~10 mats per piece). Epic balance
          patches change numbers — confirm in-game. Dig deeper per gun in the{' '}
          <Link href="/weapons" className="text-primary hover:underline">
            weapon damage calculator
          </Link>
          {' '}or practice piece spam in the{' '}
          <Link href="/tools/fortnite-build-simulator" className="text-primary hover:underline">
            build simulator
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
