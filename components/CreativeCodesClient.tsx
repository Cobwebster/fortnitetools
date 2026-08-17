'use client'

import { FormEvent, useMemo, useState } from 'react'
import {
  CREATIVE_GENRES,
  fortniteIslandUrl,
  genreLabel,
  xpStars,
  type CreativeGenre,
  type CreativeMapLive,
} from '@/lib/creative-codes'
import { Check, Copy, ExternalLink, Search, Users } from 'lucide-react'

type Props = {
  maps: CreativeMapLive[]
  initialGenre?: CreativeGenre | 'all'
}

function MapThumb({ map }: { map: CreativeMapLive }) {
  const [broken, setBroken] = useState(false)
  const showImg = map.screenshot && !broken

  return (
    <div className="relative aspect-video overflow-hidden bg-zinc-900">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={map.screenshot!}
          alt={`${map.name} Fortnite Creative map`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {genreLabel(map.genre)}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        {genreLabel(map.genre)}
      </span>
      <span className="absolute bottom-2 left-2 right-2 truncate font-mono text-[11px] font-semibold tracking-wider text-white drop-shadow">
        {map.code}
      </span>
    </div>
  )
}

function MapCard({ map }: { map: CreativeMapLive }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(map.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <MapThumb map={map} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-wide text-foreground leading-snug">
            {map.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{map.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            XP {xpStars(map.xpRating)}
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <Users className="h-3 w-3" />
            {map.players}
          </span>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <code className="flex-1 text-sm font-semibold tracking-wider text-foreground">{map.code}</code>
            <button
              type="button"
              onClick={() => void copyCode()}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label={`Copy code ${map.code}`}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            {typeof map.liveUniquePlayers === 'number' ? (
              <span>
                <strong className="text-foreground">{map.liveUniquePlayers.toLocaleString()}</strong> unique
              </span>
            ) : null}
            {typeof map.livePeakCcu === 'number' ? (
              <span>
                Peak <strong className="text-foreground">{map.livePeakCcu.toLocaleString()}</strong>
              </span>
            ) : null}
            {map.creator ? <span>@{map.creator}</span> : null}
          </div>

          <a
            href={fortniteIslandUrl(map)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Open on Fortnite.com <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function CreativeCodesClient({ maps, initialGenre = 'xp' }: Props) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<CreativeGenre | 'all'>(initialGenre)

  const availableGenres = useMemo(() => {
    const present = new Set(maps.map((m) => m.genre))
    return CREATIVE_GENRES.filter((g) => g.id === 'all' || present.has(g.id as CreativeGenre))
  }, [maps])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return maps
      .filter((m) => {
        if (genre !== 'all') {
          const tagHit = m.tags.some(
            (t) => t.toLowerCase() === genre || t.toLowerCase().includes(genre)
          )
          if (m.genre !== genre && !tagHit) return false
        }
        if (!q) return true
        const hay = [m.name, m.code, m.creator, m.description, m.genre, ...m.tags]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return hay.includes(q) || m.code.replace(/-/g, '').includes(q.replace(/-/g, ''))
      })
      .sort((a, b) => {
        const ap = a.liveUniquePlayers ?? -1
        const bp = b.liveUniquePlayers ?? -1
        if (bp !== ap) return bp - ap
        return b.xpRating - a.xpRating
      })
  }, [maps, query, genre])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div>
          <label htmlFor="codes-search" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Search
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="codes-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, code, 1v1, horror, tycoon…"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Genre filters">
          {availableGenres.map((g) => {
            const active = genre === g.id
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGenre(g.id)}
                className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {g.label}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">{filtered.length}</strong>
          {genre !== 'all' ? ` ${genreLabel(genre as CreativeGenre).toLowerCase()}` : ''} maps
        </p>
      </form>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          Nothing matched. Try All, or paste a code.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((map) => (
            <MapCard key={`${map.id}-${map.code}`} map={map} />
          ))}
        </div>
      )}
    </div>
  )
}
