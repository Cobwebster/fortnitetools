'use client'

import { useEffect, useState } from 'react'
import { X, ExternalLink, Package, Film } from 'lucide-react'
import {
  RARITY_COLORS,
  type CosmeticDetail,
  type CosmeticItem,
} from '@/lib/fortnite-api'

function rarityClass(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function MiniCard({
  item,
  onClick,
  active,
}: {
  item: CosmeticItem
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-lg border overflow-hidden transition-colors ${
        active ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="aspect-square bg-muted/40">
        {item.image || item.smallImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image || item.smallImage || ''}
            alt={item.name}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">No art</div>
        )}
      </div>
      <div className="p-2">
        <p className="text-xs font-semibold text-foreground line-clamp-2">{item.name}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{item.type}</p>
      </div>
    </button>
  )
}

type Props = {
  cosmeticId: string | null
  onClose: () => void
  onSelectId: (id: string) => void
}

export function CosmeticDetailDrawer({ cosmeticId, onClose, onSelectId }: Props) {
  const [detail, setDetail] = useState<CosmeticDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showRaw, setShowRaw] = useState(false)
  const [variantPreview, setVariantPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!cosmeticId) {
      setDetail(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setShowRaw(false)
    setVariantPreview(null)

    fetch(`/api/fortnite/cosmetics/${encodeURIComponent(cosmeticId)}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load')
        if (!cancelled) setDetail(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [cosmeticId])

  useEffect(() => {
    if (!cosmeticId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cosmeticId, onClose])

  if (!cosmeticId) return null

  const heroImage = variantPreview || detail?.featuredImage || detail?.image || detail?.smallImage
  const isEmote = detail?.typeValue === 'emote' || detail?.typeValue === 'emoji'
  const setTotalEstimate = detail
    ? [detail, ...detail.setItems].length
    : 0

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close detail"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={detail?.name || 'Cosmetic detail'}
        className="relative z-[81] flex h-full w-full max-w-xl flex-col border-l border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cosmetic detail</p>
            <h2 className="font-display text-lg font-bold uppercase text-foreground truncate">
              {detail?.name || (loading ? 'Loading…' : 'Item')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {loading && (
            <p className="text-sm text-muted-foreground">Loading full cosmetic data from Fortnite-API…</p>
          )}
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {detail && (
            <>
              {/* Hero + video */}
              <div className="space-y-3">
                <div className={`rounded-xl border overflow-hidden ${rarityClass(detail.rarityValue)}`}>
                  <div className="aspect-square bg-muted/30">
                    {heroImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={heroImage} alt={detail.name} className="h-full w-full object-contain p-4" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>
                    )}
                  </div>
                </div>

                {detail.showcaseVideo && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Film className="h-4 w-4 text-primary" aria-hidden="true" />
                      {isEmote ? 'Emote / dance preview' : 'Showcase video'}
                    </div>
                    <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
                      <iframe
                        title={`${detail.name} showcase`}
                        src={`https://www.youtube-nocookie.com/embed/${detail.showcaseVideo}?rel=0`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${detail.showcaseVideo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Open on YouTube <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {!detail.showcaseVideo && isEmote && (
                  <p className="text-xs text-muted-foreground">
                    No official showcase video is attached to this emote in the API.
                  </p>
                )}
              </div>

              {/* Meta */}
              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-muted-foreground">{detail.description || 'No description.'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {detail.type}
                  </span>
                  <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${rarityClass(detail.rarityValue)}`}>
                    {detail.rarity}
                  </span>
                  {detail.series && (
                    <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
                      {detail.series}
                    </span>
                  )}
                </div>
              </div>

              {/* Price / shop */}
              <section className="rounded-xl border border-border bg-card p-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Shop price</h3>
                {detail.shop ? (
                  <>
                    <p className="font-display text-3xl font-bold text-primary">
                      {detail.shop.price.toLocaleString()}{' '}
                      <span className="text-base text-muted-foreground">V-Bucks</span>
                    </p>
                    {detail.shop.regularPrice > detail.shop.price && (
                      <p className="text-xs text-muted-foreground">
                        Regular {detail.shop.regularPrice.toLocaleString()} V · on sale
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Section: {detail.shop.section}
                      {detail.shop.outDate ? ` · Leaves ${formatDate(detail.shop.outDate)}` : ''}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {typeof detail.shop.giftable === 'boolean' && (
                        <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {detail.shop.giftable ? 'Giftable' : 'Not giftable'}
                        </span>
                      )}
                      {typeof detail.shop.refundable === 'boolean' && (
                        <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {detail.shop.refundable ? 'Refundable' : 'Not refundable'}
                        </span>
                      )}
                      {detail.shop.banner && (
                        <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                          {detail.shop.banner}
                        </span>
                      )}
                      {detail.shop.offerTag && (
                        <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
                          {detail.shop.offerTag}
                        </span>
                      )}
                    </div>
                    {detail.shop.isBundle && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs font-semibold text-foreground mb-1">
                          Sold in bundle{detail.shop.bundleName ? `: ${detail.shop.bundleName}` : ''}
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          {detail.shop.bundleItems?.map((b) => (
                            <li key={b.id}>
                              <button
                                type="button"
                                className="hover:text-primary"
                                onClick={() => onSelectId(b.id)}
                              >
                                {b.name} <span className="opacity-60">({b.type})</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Not in today&apos;s Item Shop. Historical prices aren&apos;t always in the live API — check when it returns.
                  </p>
                )}
              </section>

              {/* Set */}
              {(detail.set || detail.setItems.length > 0) && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" aria-hidden="true" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {detail.set ? `${detail.set} set` : 'Related set'} ({setTotalEstimate} items)
                    </h3>
                  </div>
                  {detail.setText && (
                    <p className="text-xs text-muted-foreground">{detail.setText}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    <MiniCard item={detail} onClick={() => {}} active />
                    {detail.setItems.map((item) => (
                      <MiniCard key={item.id} item={item} onClick={() => onSelectId(item.id)} />
                    ))}
                  </div>
                </section>
              )}

              {/* Variants / styles */}
              {detail.variants && detail.variants.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Styles & variants</h3>
                  {detail.variants.map((variant) => (
                    <div key={`${variant.channel}-${variant.type}`} className="space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        {variant.channel} · {variant.type}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {variant.options.map((opt) => (
                          <button
                            key={opt.tag || opt.name}
                            type="button"
                            onClick={() => opt.image && setVariantPreview(opt.image)}
                            className={`rounded-lg border p-2 text-left transition-colors ${
                              variantPreview === opt.image
                                ? 'border-primary'
                                : 'border-border hover:border-primary/40'
                            }`}
                          >
                            {opt.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={opt.image} alt={opt.name} className="aspect-square w-full object-contain mb-1" />
                            ) : null}
                            <p className="text-[11px] font-medium text-foreground line-clamp-2">{opt.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Full metadata */}
              <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Full details</h3>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  {[
                    ['ID', detail.id],
                    ['Type', detail.type],
                    ['Rarity', detail.rarity],
                    ['Series', detail.series || '—'],
                    ['Set', detail.set || '—'],
                    ['Introduced', detail.introduction || '—'],
                    ['Chapter / Season', detail.chapter && detail.season ? `Ch. ${detail.chapter} S${detail.season}` : '—'],
                    ['Added to API', formatDate(detail.added)],
                    ['Showcase video', detail.showcaseVideo || '—'],
                    ['Dynamic pak', detail.dynamicPakId || '—'],
                    ['Path', detail.path || '—'],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex justify-between gap-4 border-b border-border/50 pb-1.5 last:border-0">
                      <dt className="text-muted-foreground shrink-0">{label}</dt>
                      <dd className="text-foreground text-right break-all font-mono text-xs">{value}</dd>
                    </div>
                  ))}
                </dl>

                {detail.gameplayTags && detail.gameplayTags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Gameplay tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.gameplayTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowRaw((v) => !v)}
                  className="mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  {showRaw ? 'Hide' : 'Show'} raw API JSON
                </button>
                {showRaw && (
                  <pre className="mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-[10px] text-muted-foreground">
                    {JSON.stringify(detail.raw, null, 2)}
                  </pre>
                )}
              </section>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
