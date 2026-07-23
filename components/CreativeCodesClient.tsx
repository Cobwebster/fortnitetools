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
}

function GenreArt({ genre, name }: { genre: CreativeGenre; name: string }) {
  const tones: Record<CreativeGenre, string> = {
    xp: 'from-amber-500/30 via-yellow-600/10 to-background',
    horror: 'from-red-900/50 via-violet-950/40 to-background',
    '1v1': 'from-sky-500/25 via-blue-900/20 to-background',
    tycoon: 'from-emerald-500/25 via-teal-900/20 to-background',
    escape: 'from-fuchsia-500/20 via-purple-900/25 to-background',
    deathrun: 'from-orange-500/25 via-rose-900/20 to-background',
    zonewars: 'from-cyan-500/20 via-slate-900/30 to-background',
    boxfight: 'from-indigo-500/25 via-slate-900/20 to-background',
    practice: 'from-lime-500/20 via-slate-900/20 to-background',
    pvp: 'from-rose-500/25 via-red-950/30 to-background',
    social: 'from-pink-500/25 via-rose-900/20 to-background',
    other: 'from-slate-500/20 via-slate-900/30 to-background',
  }
  return (
    <div className={`relative aspect-[16/10] bg-gradient-to-br ${tones[genre]} border-b border-border`}>
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_35%)]" />
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{genreLabel(genre)}</p>
        <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground line-clamp-2">{name}</p>
      </div>
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
    <article className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      {map.screenshot ? (
        <div className="relative aspect-[16/10] bg-muted/40 border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={map.screenshot} alt={`${map.name} Creative map`} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : (
        <GenreArt genre={map.genre} name={map.name} />
      )}

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground">
            {genreLabel(map.genre)}
          </span>
          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-primary/30 bg-primary/10 text-primary">
            XP {xpStars(map.xpRating)}
          </span>
          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground">
            <Users className="h-3 w-3" />
            {map.players}
          </span>
        </div>

        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-wide text-foreground leading-snug">
            {map.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{map.description}</p>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <code className="flex-1 text-sm font-semibold tracking-wider text-foreground">{map.code}</code>
            <button
              type="button"
              onClick={() => void copyCode()}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label={`Copy code ${map.code}`}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            {typeof map.liveUniquePlayers === 'number' ? (
              <span>
                <strong className="text-foreground">{map.liveUniquePlayers.toLocaleString()}</strong> unique players
                (recent)
              </span>
            ) : null}
            {typeof map.livePeakCcu === 'number' ? (
              <span>
                Peak CCU <strong className="text-foreground">{map.livePeakCcu.toLocaleString()}</strong>
              </span>
            ) : null}
            {map.creator ? <span>Creator @{map.creator}</span> : null}
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

export function CreativeCodesClient({ maps }: Props) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<CreativeGenre | 'all'>('all')

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
      <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <div>
          <label htmlFor="codes-search" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Search map codes
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="codes-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="XP, horror, 1v1, tycoon, escape room, or paste a code…"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Genre filters">
          {CREATIVE_GENRES.map((g) => {
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
          Showing <strong className="text-foreground">{filtered.length}</strong> maps
          {genre !== 'all' ? ` in ${genreLabel(genre as CreativeGenre)}` : ''}.
        </p>
      </form>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          No maps matched. Try another genre chip or a shorter search.
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
