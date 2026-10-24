'use client'

import { FormEvent, useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from '@/components/link'
import { COSMETIC_TYPES, RARITY_COLORS, type CosmeticItem } from '@/lib/fortnite-api'
import {
  LOCKER_ITEM_CAP,
  isValidLockerSlug,
  sanitizeLockerSlug,
  sanitizeLockerSlugInput,
  type LockerRow,
} from '@/lib/lockers'
import { siteConfig } from '@/lib/site'
import {
  addLockerItemAction,
  removeLockerItemAction,
  updateLockerSettingsAction,
} from '@/app/locker/actions'
import { LockerGrid } from '@/components/LockerGrid'

export function LockerEditor({
  locker,
  items,
}: {
  locker: LockerRow
  items: CosmeticItem[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const owned = useMemo(() => new Set(items.map((i) => i.id.toLowerCase())), [items])

  const [query, setQuery] = useState('')
  const [type, setType] = useState('outfit')
  const [results, setResults] = useState<CosmeticItem[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [displayName, setDisplayName] = useState(locker.display_name)
  const [slug, setSlug] = useState(locker.slug)
  const [isPublic, setIsPublic] = useState(locker.is_public)

  const shareUrl = `${siteConfig.url}/locker/${locker.slug}`

  async function runSearch(e?: FormEvent) {
    e?.preventDefault()
    const name = query.trim()
    if (name.length < 2) {
      setSearchError('Type at least 2 characters.')
      return
    }
    setSearchError(null)
    setSearching(true)
    try {
      const qs = new URLSearchParams({ name })
      if (type) qs.set('type', type)
      const res = await fetch(`/api/fortnite/cosmetics/search?${qs}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Search failed')
      setResults((json.items || []) as CosmeticItem[])
      if (!(json.items || []).length) setSearchError('No cosmetics matched.')
    } catch (err) {
      setResults([])
      setSearchError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setSearching(false)
    }
  }

  function addItem(id: string) {
    setActionError(null)
    startTransition(async () => {
      const result = await addLockerItemAction(id)
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      router.refresh()
    })
  }

  function removeItem(id: string) {
    setActionError(null)
    setRemovingId(id)
    startTransition(async () => {
      const result = await removeLockerItemAction(id)
      setRemovingId(null)
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      router.refresh()
    })
  }

  function saveSettings(e: FormEvent) {
    e.preventDefault()
    setActionError(null)
    const nextSlug = sanitizeLockerSlug(slug)
    if (!isValidLockerSlug(nextSlug)) {
      setActionError(
        'Share slug must be 3–32 letters or numbers. Hyphens are ok in the middle, not at the ends.'
      )
      return
    }
    startTransition(async () => {
      const result = await updateLockerSettingsAction({ displayName, slug: nextSlug, isPublic })
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      router.refresh()
    })
  }

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setActionError('Could not copy the link.')
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Your locker</p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {locker.display_name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} / {LOCKER_ITEM_CAP} items
              {locker.is_public ? ' · public' : ' · unlisted'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyShare()}
              className="rounded-lg border border-border px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:border-primary/60 hover:text-foreground"
            >
              {copied ? 'Copied' : 'Copy share link'}
            </button>
            <Link
              href={`/locker/${locker.slug}`}
              className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/20"
            >
              View public page
            </Link>
          </div>
        </div>

        <form onSubmit={saveSettings} className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Locker name
            </span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={40}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Share slug
            </span>
            <input
              value={slug}
              onChange={(e) => setSlug(sanitizeLockerSlugInput(e.target.value))}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={32}
              aria-invalid={slug.length > 0 && !isValidLockerSlug(sanitizeLockerSlug(slug))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
            <span className="mt-1 block text-[11px] text-muted-foreground">
              Letters and numbers are fine. Hyphens ok in the middle. 3–32 characters.
            </span>
          </label>
          <div className="flex items-end gap-3">
            <label className="flex items-center gap-2 pb-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public
            </label>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground">
          Share URL: <span className="text-foreground">{shareUrl}</span>
        </p>
        {actionError ? <p className="text-sm text-rose-300">{actionError}</p> : null}
      </section>

      <section className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Add to locker
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search a cosmetic, then click <strong className="text-foreground">Add</strong> — or drag
            it down into your locker.
          </p>
        </div>
        <form onSubmit={(e) => void runSearch(e)} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Renegade Raider, Reaper, Drift…"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          >
            {COSMETIC_TYPES.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={searching}
            className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-50"
          >
            {searching ? 'Searching…' : 'Search'}
          </button>
        </form>
        {searchError ? <p className="text-sm text-rose-300">{searchError}</p> : null}
        {actionError ? <p className="text-sm text-rose-300">{actionError}</p> : null}

        {results.length ? (
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {results.map((item) => {
              const have = owned.has(item.id.toLowerCase())
              return (
                <li key={item.id}>
                  <article
                    draggable={!have}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/cosmetic-id', item.id)
                      e.dataTransfer.setData('text/plain', item.id)
                      e.dataTransfer.effectAllowed = 'copy'
                      setDragging(true)
                    }}
                    onDragEnd={() => setDragging(false)}
                    className={`overflow-hidden rounded-lg border ${
                      have
                        ? 'border-emerald-400/40 bg-emerald-500/10'
                        : `${RARITY_COLORS[item.rarityValue] || 'border-border'} ${!have ? 'cursor-grab active:cursor-grabbing' : ''}`
                    }`}
                  >
                    <div className="aspect-square bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.smallImage || item.image || ''}
                        alt=""
                        className="pointer-events-none h-full w-full object-contain p-1.5"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <p className="truncate px-1.5 pt-1 text-[10px] font-semibold text-foreground">
                      {item.name}
                    </p>
                    {have ? (
                      <p className="px-1.5 pb-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        In locker
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addItem(item.id)}
                        disabled={pending}
                        className="m-1.5 w-[calc(100%-0.75rem)] rounded-md bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 disabled:opacity-50"
                      >
                        Add
                      </button>
                    )}
                  </article>
                </li>
              )
            })}
          </ul>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          Your locker
        </h2>
        {dragging ? (
          <p className="text-sm font-semibold text-primary">Drop the item on your locker below.</p>
        ) : null}
        <LockerGrid
          items={items}
          onRemove={removeItem}
          onDropAdd={addItem}
          removingId={removingId}
          dropActive={dragging}
        />
      </section>
    </div>
  )
}
