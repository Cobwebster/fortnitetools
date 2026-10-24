'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from '@/components/link'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { FortniteIcon } from '@/components/fortnite-icon'
import { toolIcon } from '@/lib/site-icons'
import { addToolFire } from '@/app/tools/fire-actions'
import {
  TOOLS,
  TOOL_CATEGORY_META,
  filterTools,
  type ToolCategoryId,
  type ToolEntry,
} from '@/lib/tools-catalog'
import { toolFireId } from '@/lib/tool-fires'
import {
  defaultLocale,
  isLocalizablePath,
  localizeHref,
  toolMessageId,
  type AppLocale,
} from '@/i18n/config'

type SortMode = 'hottest' | 'catalog'

type LocalizedTool = ToolEntry & { fireId: string }

function ToolCard({
  tool,
  openLabel,
  fires,
  mine,
  loggedIn,
  fireBusy,
  onFire,
  fireLabel,
  firedLabel,
  signInHref,
  signInLabel,
}: {
  tool: LocalizedTool
  openLabel: string
  fires: number
  mine: boolean
  loggedIn: boolean
  fireBusy: boolean
  onFire: () => void
  fireLabel: string
  firedLabel: string
  signInHref: string
  signInLabel: string
}) {
  return (
    <article className="relative flex h-full flex-col rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:bg-card/80">
      {loggedIn ? (
        <button
          type="button"
          onClick={onFire}
          disabled={mine || fireBusy}
          aria-label={mine ? firedLabel : fireLabel}
          title={mine ? firedLabel : fireLabel}
          className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-bold tabular-nums transition-colors ${
            mine
              ? 'border-orange-400/50 bg-orange-500/15 text-orange-200'
              : 'border-border bg-background/80 text-muted-foreground hover:border-orange-400/40 hover:text-orange-200'
          } disabled:cursor-default`}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            🔥
          </span>
          {fires}
        </button>
      ) : (
        <Link
          href={signInHref}
          aria-label={signInLabel}
          title={signInLabel}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-2.5 py-1.5 text-sm font-bold tabular-nums text-muted-foreground hover:border-orange-400/40 hover:text-orange-200"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            🔥
          </span>
          {fires}
        </Link>
      )}

      <Link href={tool.href} className="group flex h-full flex-col p-5 pr-24">
        <div className="flex items-start gap-3">
          <FortniteIcon
            src={toolIcon(tool.href)}
            alt={tool.title}
            size="md"
            frameClassName="group-hover:border-primary/40 group-hover:bg-black/70 transition-colors"
          />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-base font-bold uppercase leading-snug tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-lg">
              {tool.title}
            </h2>
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
          {openLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  )
}

export function ToolsCatalogClient({
  fireCounts,
  myFires,
  loggedIn,
}: {
  fireCounts: Record<string, number>
  myFires: string[]
  loggedIn: boolean
}) {
  const t = useTranslations('catalog')
  const locale = useLocale() as AppLocale
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ToolCategoryId>('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sort, setSort] = useState<SortMode>('hottest')
  const [counts, setCounts] = useState(fireCounts)
  const [mine, setMine] = useState(() => new Set(myFires))
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const catalogOrder = useMemo(() => {
    const map = new Map<string, number>()
    TOOLS.forEach((tool, index) => map.set(toolFireId(tool.href), index))
    return map
  }, [])

  const localizedTools = useMemo(() => {
    const source =
      locale === defaultLocale
        ? TOOLS
        : TOOLS.filter((tool) => isLocalizablePath(tool.href))

    return source.map((tool) => {
      const id = toolMessageId(tool.href)
      return {
        ...tool,
        fireId: id,
        href: localizeHref(locale, tool.href),
        title: t(`items.${id}.title`),
        description: t(`items.${id}.description`),
      }
    })
  }, [t, locale])

  const list = useMemo(() => {
    const filtered = filterTools(localizedTools, { query, category, tag: activeTag })
    if (sort !== 'hottest') return filtered
    return [...filtered].sort((a, b) => {
      const fa = counts[a.fireId] ?? 0
      const fb = counts[b.fireId] ?? 0
      if (fb !== fa) return fb - fa
      return (catalogOrder.get(a.fireId) ?? 99) - (catalogOrder.get(b.fireId) ?? 99)
    })
  }, [localizedTools, query, category, activeTag, sort, counts, catalogOrder])

  const availableTags = useMemo(() => {
    const scoped =
      category === 'all' ? localizedTools : localizedTools.filter((tool) => tool.category === category)
    const tagCounts = new Map<string, number>()
    for (const tool of scoped) {
      for (const tag of tool.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
      }
    }
    return [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
  }, [category, localizedTools])

  const signInHref = `/login?next=${encodeURIComponent('/tools')}`

  function handleFire(id: string) {
    if (!loggedIn || mine.has(id) || pendingId) return
    setPendingId(id)
    startTransition(async () => {
      const result = await addToolFire(id)
      setPendingId(null)
      if (!result.ok) return
      setMine((prev) => new Set(prev).add(id))
      if (!result.already) {
        setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('searchPlaceholder')}
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Tool categories">
          {TOOL_CATEGORY_META.filter(
            (c) =>
              c.id === 'all' || localizedTools.some((tool) => tool.category === c.id)
          ).map((c) => {
            const active = category === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategory(c.id)
                  setActiveTag(null)
                }}
                className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {t(`categories.${c.id}`)}
              </button>
            )
          })}
        </div>

        {availableTags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tag filters">
            {availableTags.map((tag) => {
              const active = activeTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(active ? null : tag)}
                  className={`rounded border px-2 py-1 text-[11px] font-semibold transition-colors ${
                    active
                      ? 'border-primary/60 bg-primary/15 text-primary'
                      : 'border-border/80 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{list.length}</strong> of {localizedTools.length}{' '}
            tools
            {activeTag ? (
              <>
                {' '}
                · tag <strong className="text-foreground">{activeTag}</strong>
              </>
            ) : null}
          </p>
          <div className="flex gap-1" role="group" aria-label={t('sortLabel')}>
            {(['hottest', 'catalog'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSort(mode)}
                className={`rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  sort === mode
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {mode === 'hottest' ? t('sortHottest') : t('sortCatalog')}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{t('fireHint')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tool) => (
          <ToolCard
            key={tool.fireId}
            tool={tool}
            openLabel={t('openTool')}
            fires={counts[tool.fireId] ?? 0}
            mine={mine.has(tool.fireId)}
            loggedIn={loggedIn}
            fireBusy={pendingId === tool.fireId}
            onFire={() => handleFire(tool.fireId)}
            fireLabel={t('fireLabel')}
            firedLabel={t('firedLabel')}
            signInHref={signInHref}
            signInLabel={t('signInToFire')}
          />
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          {t('noResults')}
        </div>
      ) : null}
    </div>
  )
}
