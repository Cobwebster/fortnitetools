'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import {
  LOBBY_HACKS,
  LOBBY_HACK_CATEGORY_META,
  categoryCount,
  type LobbyHack,
  type LobbyHackCategory,
} from '@/lib/lobby-hacks'

const STORAGE_KEY = 'ft-lobby-hacks-used'

type FilterId = LobbyHackCategory | 'all'

function loadUsed(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

function saveUsed(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

function HackRow({
  hack,
  used,
  copied,
  onCopy,
  onToggleUsed,
}: {
  hack: LobbyHack
  used: boolean
  copied: boolean
  onCopy: () => void
  onToggleUsed: () => void
}) {
  return (
    <article
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors sm:px-4 ${
        used ? 'border-border/60 bg-card/50' : 'border-border bg-card hover:border-primary/40'
      }`}
    >
      {hack.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hack.image}
          alt=""
          width={48}
          height={48}
          className={`h-12 w-12 shrink-0 rounded-md border border-border/80 bg-black/40 object-contain ${
            used ? 'opacity-50' : ''
          }`}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={onCopy}
          className={`block max-w-full truncate text-left font-mono text-sm font-bold tracking-tight sm:text-base ${
            used ? 'text-muted-foreground line-through' : 'text-primary'
          }`}
          aria-label={`Copy ${hack.code}${used ? '' : ' and mark used'}`}
        >
          {hack.code}
        </button>
        <p className={`truncate text-xs sm:text-sm ${used ? 'text-muted-foreground' : 'text-foreground'}`}>
          {hack.reward}
          {hack.repeatable ? ' · reusable' : ''}
        </p>
        {hack.note ? <p className="mt-0.5 text-[11px] leading-snug text-amber-300/90">{hack.note}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-bold uppercase tracking-wider ${
            copied
              ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300'
              : 'border-border bg-muted/40 text-foreground hover:border-primary/50'
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={onToggleUsed}
          className={`hidden h-9 rounded-md border px-2.5 text-[11px] font-bold uppercase tracking-wider sm:inline-flex sm:items-center ${
            used
              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
              : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={used}
        >
          {used ? 'Used' : 'Mark'}
        </button>
      </div>
    </article>
  )
}

export function LobbyHacksClient() {
  const [used, setUsed] = useState<Set<string>>(new Set())
  const [ready, setReady] = useState(false)
  const [filter, setFilter] = useState<FilterId>('all')
  const [hideUsed, setHideUsed] = useState(false)
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    setUsed(loadUsed())
    setReady(true)
  }, [])

  function persist(next: Set<string>) {
    setUsed(next)
    saveUsed(next)
  }

  async function copyHack(hack: LobbyHack) {
    try {
      await navigator.clipboard.writeText(hack.code)
    } catch {
      // clipboard can fail in insecure contexts — still mark used
    }
    const next = new Set(used)
    next.add(hack.code)
    persist(next)
    setCopied(hack.code)
    window.setTimeout(() => setCopied((cur) => (cur === hack.code ? null : cur)), 1600)
  }

  function toggleUsed(code: string) {
    const next = new Set(used)
    if (next.has(code)) next.delete(code)
    else next.add(code)
    persist(next)
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LOBBY_HACKS.filter((h) => {
      if (filter !== 'all' && h.category !== filter) return false
      if (hideUsed && used.has(h.code)) return false
      if (!q) return true
      return h.code.toLowerCase().includes(q) || h.reward.toLowerCase().includes(q)
    })
  }, [filter, hideUsed, query, used])

  const usedCount = ready ? used.size : 0

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <strong className="tabular-nums text-foreground">{usedCount}</strong> / {LOBBY_HACKS.length}{' '}
          marked used in this browser
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={hideUsed}
              onChange={(e) => setHideUsed(e.target.checked)}
              className="accent-[var(--primary)]"
            />
            Hide used
          </label>
          {usedCount ? (
            <button
              type="button"
              onClick={() => persist(new Set())}
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Clear marks
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {LOBBY_HACK_CATEGORY_META.map((cat) => {
          const active = filter === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                active
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}{' '}
              <span className="tabular-nums opacity-70">{categoryCount(cat.id)}</span>
            </button>
          )
        })}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search code or reward…"
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        aria-label="Search lobby hack codes"
      />

      <p className="text-xs text-muted-foreground">
        Click a code to copy it and mark it as used.
        {filter !== 'all'
          ? ` ${LOBBY_HACK_CATEGORY_META.find((c) => c.id === filter)?.hint}`
          : null}
      </p>

      <div className="space-y-2">
        {rows.map((hack) => (
          <HackRow
            key={hack.code}
            hack={hack}
            used={used.has(hack.code)}
            copied={copied === hack.code}
            onCopy={() => copyHack(hack)}
            onToggleUsed={() => toggleUsed(hack.code)}
          />
        ))}
        {!rows.length ? (
          <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
            No codes match. Clear search or show used.
          </p>
        ) : null}
      </div>
    </div>
  )
}
