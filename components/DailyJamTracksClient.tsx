'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DailyJamTracksSnapshot, JamTrack } from '@/lib/jam-tracks'

type TabId = 'featured' | 'new' | 'recent'

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function youtubeSearchUrl(track: JamTrack) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.artist} ${track.title}`)}`
}

function TrackCard({
  track,
  active,
  onSelect,
}: {
  track: JamTrack
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group overflow-hidden rounded-xl border text-left transition-colors ${
        active
          ? 'border-primary ring-1 ring-primary/40'
          : 'border-border bg-card hover:border-primary/60'
      }`}
    >
      <div className="relative aspect-square bg-muted">
        {track.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={track.cover}
            alt=""
            width={200}
            height={200}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No art</div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/35 group-hover:opacity-100">
          <span className="rounded-full border border-white/40 bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Play
          </span>
        </div>
        {(track.isNew || track.isFeatured) && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {track.isNew ? (
              <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                New
              </span>
            ) : null}
            {track.isFeatured ? (
              <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Featured
              </span>
            ) : null}
          </div>
        )}
      </div>
      <div className="space-y-0.5 px-2.5 py-2">
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground group-hover:text-primary">
          {track.title}
        </p>
        <p className="line-clamp-1 text-[11px] text-muted-foreground">{track.artist}</p>
      </div>
    </button>
  )
}

export function DailyJamTracksClient({ snapshot }: { snapshot: DailyJamTracksSnapshot }) {
  const [tab, setTab] = useState<TabId>('featured')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<JamTrack | null>(snapshot.featured[0] ?? snapshot.newTracks[0] ?? null)
  const [remainingMs, setRemainingMs] = useState(0)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [watchUrl, setWatchUrl] = useState<string | null>(null)
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      setRemainingMs(Math.max(0, new Date(snapshot.nextRefreshAt).getTime() - Date.now()))
    }
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [snapshot.nextRefreshAt])

  useEffect(() => {
    if (!selected) {
      setEmbedUrl(null)
      setWatchUrl(null)
      return
    }
    let cancelled = false
    setLoadingVideo(true)
    setVideoError(null)
    setEmbedUrl(null)
    setWatchUrl(youtubeSearchUrl(selected))

    const params = new URLSearchParams({
      title: selected.title,
      artist: selected.artist,
    })
    fetch(`/api/jam-track-youtube?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('resolve failed')
        return res.json() as Promise<{
          videoId?: string | null
          embedUrl?: string
          searchEmbed?: string
          watchUrl?: string
        }>
      })
      .then((data) => {
        if (cancelled) return
        if (data.embedUrl) {
          setEmbedUrl(data.embedUrl)
          setWatchUrl(data.watchUrl || youtubeSearchUrl(selected))
        } else if (data.searchEmbed) {
          setEmbedUrl(`${data.searchEmbed}&autoplay=1`)
          setWatchUrl(data.watchUrl || youtubeSearchUrl(selected))
        } else {
          setVideoError('Could not load a YouTube embed. Open the search link instead.')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVideoError('Could not load a YouTube embed. Open the search link instead.')
          setEmbedUrl(
            `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(
              `${selected.artist} ${selected.title}`
            )}&autoplay=1`
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingVideo(false)
      })

    return () => {
      cancelled = true
    }
  }, [selected])

  const list = useMemo(() => {
    const base =
      tab === 'featured' ? snapshot.featured : tab === 'new' ? snapshot.newTracks : snapshot.recent
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(
      (t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
    )
  }, [tab, snapshot, query])

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'featured', label: 'Featured today', count: snapshot.featured.length },
    { id: 'new', label: 'New', count: snapshot.newTracks.length },
    { id: 'recent', label: 'Recently rotated', count: snapshot.recent.length },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Next Music Library refresh (UTC midnight)
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-6xl">
            {formatRemaining(remainingMs)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {snapshot.featured.length} featured · {snapshot.newTracks.length} new · catalog{' '}
            {snapshot.totalCatalog} · day {snapshot.dayKey}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-black">
          {selected ? (
            <div className="flex h-full min-h-[240px] flex-col">
              <div className="aspect-video w-full bg-black">
                {loadingVideo && !embedUrl ? (
                  <div className="flex h-full items-center justify-center text-sm text-white/70">
                    Loading YouTube…
                  </div>
                ) : embedUrl ? (
                  <iframe
                    key={embedUrl}
                    title={`${selected.title} on YouTube`}
                    src={embedUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/70">
                    {videoError || 'Pick a track to play'}
                  </div>
                )}
              </div>
              <div className="space-y-1 border-t border-white/10 px-4 py-3">
                <p className="font-semibold text-white">{selected.title}</p>
                <p className="text-sm text-white/70">{selected.artist}</p>
                <div className="flex flex-wrap gap-3 pt-1 text-xs text-white/60">
                  {selected.duration ? <span>{selected.duration}</span> : null}
                  {selected.bpm ? <span>{selected.bpm} BPM</span> : null}
                  {selected.releaseYear ? <span>{selected.releaseYear}</span> : null}
                  {watchUrl ? (
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open on YouTube
                    </a>
                  ) : null}
                </div>
                {selected.previewUrl ? (
                  <audio controls preload="none" className="mt-2 w-full" src={selected.previewUrl}>
                    Spotify preview
                  </audio>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[240px] items-center justify-center text-sm text-white/60">
              No tracks in today’s snapshot.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jam track lists">
          {tabs.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {t.label} ({t.count})
              </button>
            )
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title or artist…"
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none lg:max-w-xs"
          aria-label="Search Jam Tracks"
        />
      </div>

      {list.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No tracks match that filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {list.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              active={selected?.id === track.id}
              onSelect={() => setSelected(track)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
