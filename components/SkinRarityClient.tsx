'use client'

import { FormEvent, useMemo, useState } from 'react'
import type { CosmeticItem } from '@/lib/fortnite-api'
import { SCARCITY_TIER_STYLES, assessSkinRarity } from '@/lib/skin-rarity'
import { SkinRarityReportPanel } from '@/components/skin-rarity-report'
import { Search, Sparkles, Loader2 } from 'lucide-react'

const EXAMPLES = [
  { name: 'Renegade Raider' },
  { name: 'Black Knight' },
  { name: 'Aerial Assault Trooper' },
  { name: 'Travis Scott' },
]

export function SkinRarityClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CosmeticItem[]>([])
  const [selected, setSelected] = useState<CosmeticItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [userSearched, setUserSearched] = useState(false)

  const report = useMemo(
    () => (selected ? assessSkinRarity(selected) : null),
    [selected]
  )

  async function runSearch(name: string) {
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError('Type at least 2 characters.')
      return
    }
    setError(null)
    setUserSearched(true)
    setPending(true)
    try {
      const qs = new URLSearchParams({
        name: trimmed,
        type: 'outfit',
      })
      const res = await fetch(`/api/fortnite/cosmetics/search?${qs}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Search failed')
      const items = (json.items || []) as CosmeticItem[]
      const q = trimmed.toLowerCase()
      items.sort((a, b) => {
        const aExact = a.name.toLowerCase() === q ? 0 : 1
        const bExact = b.name.toLowerCase() === q ? 0 : 1
        if (aExact !== bExact) return aExact - bExact
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
        if (aStarts !== bStarts) return aStarts - bStarts
        return a.name.localeCompare(b.name)
      })
      setResults(items)
      setSelected(items[0] || null)
      if (!items.length) setError('No outfits matched that name. Try a shorter search.')
    } catch (e) {
      setResults([])
      setSelected(null)
      setError(e instanceof Error ? e.message : 'Search failed')
    } finally {
      setPending(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void runSearch(query)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <label htmlFor="skin-search" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Skin name
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="skin-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Renegade Raider, Black Knight…"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Check rarity
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.name}
              type="button"
              onClick={() => {
                setQuery(ex.name)
                void runSearch(ex.name)
              }}
              className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
            >
              {ex.name}
            </button>
          ))}
        </div>
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      </form>

      {userSearched && selected && report ? (
        <SkinRarityReportPanel item={selected} report={report} />
      ) : null}

      {results.length > 1 ? (
        <section aria-label="Matching outfits">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground mb-3">
            Other matches
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {results.slice(0, 24).map((item) => {
              const r = assessSkinRarity(item)
              const active = selected?.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item)}
                  className={`rounded-xl border text-left overflow-hidden bg-card transition-colors ${
                    active ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-square bg-muted/40">
                    {item.smallImage || item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.smallImage || item.image || ''}
                        alt=""
                        className="h-full w-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="p-2.5 space-y-1">
                    <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{item.name}</p>
                    <span
                      className={`inline-block text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 border ${SCARCITY_TIER_STYLES[r.tier]}`}
                    >
                      {r.label} · {r.score}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}
