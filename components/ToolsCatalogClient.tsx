'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/link'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { FortniteIcon } from '@/components/fortnite-icon'
import { toolIcon } from '@/lib/site-icons'
import {
  TOOLS,
  TOOL_CATEGORY_META,
  filterTools,
  type ToolCategoryId,
  type ToolEntry,
} from '@/lib/tools-catalog'
import {
  defaultLocale,
  isLocalizablePath,
  localizeHref,
  toolMessageId,
  type AppLocale,
} from '@/i18n/config'

function ToolCard({ tool, openLabel }: { tool: ToolEntry; openLabel: string }) {
  return (
    <article className="relative flex h-full flex-col rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:bg-card/80">
      <Link href={tool.href} className="group flex h-full flex-col p-5">
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

export function ToolsCatalogClient() {
  const t = useTranslations('catalog')
  const locale = useLocale() as AppLocale
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ToolCategoryId>('all')

  const localizedTools = useMemo(() => {
    const source =
      locale === defaultLocale
        ? TOOLS
        : TOOLS.filter((tool) => isLocalizablePath(tool.href))

    return source.map((tool) => {
      const id = toolMessageId(tool.href)
      return {
        ...tool,
        href: localizeHref(locale, tool.href),
        title: t(`items.${id}.title`),
        description: t(`items.${id}.description`),
      }
    })
  }, [t, locale])

  const list = useMemo(
    () => filterTools(localizedTools, { query, category }),
    [localizedTools, query, category]
  )

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
                onClick={() => setCategory(c.id)}
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

        <p className="text-xs text-muted-foreground">
          Showing <strong className="text-foreground">{list.length}</strong> of {localizedTools.length}{' '}
          tools
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((tool) => (
          <ToolCard key={tool.href} tool={tool} openLabel={t('openTool')} />
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
