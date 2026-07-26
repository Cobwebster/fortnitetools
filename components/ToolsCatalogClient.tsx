'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FortniteIcon } from '@/components/fortnite-icon'
import { toolIcon } from '@/lib/site-icons'
import {
  TOOLS,
  TOOL_CATEGORY_META,
  filterTools,
  type ToolCategoryId,
  type ToolEntry,
} from '@/lib/tools-catalog'

function ToolCard({ tool }: { tool: ToolEntry }) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-card/80"
    >
      <div className="flex items-start gap-3">
        <FortniteIcon
          src={toolIcon(tool.href)}
          alt=""
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
        Open tool
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}

export function ToolsCatalogClient() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ToolCategoryId>('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const list = useMemo(
    () => filterTools(TOOLS, { query, category, tag: activeTag }),
    [query, category, activeTag]
  )

  const availableTags = useMemo(() => {
    const scoped =
      category === 'all' ? TOOLS : TOOLS.filter((t) => t.category === category)
    const counts = new Map<string, number>()
    for (const tool of scoped) {
      for (const tag of tool.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
  }, [category])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Search tools
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="XP, map, skins, K/D, sensitivity…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Tool categories">
          {TOOL_CATEGORY_META.map((c) => {
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
                {c.label}
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

        <p className="text-xs text-muted-foreground">
          Showing <strong className="text-foreground">{list.length}</strong> of {TOOLS.length} tools
          {activeTag ? (
            <>
              {' '}
              · tag <strong className="text-foreground">{activeTag}</strong>
            </>
          ) : null}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
          No tools matched. Clear search or reset filters.
        </div>
      ) : null}
    </div>
  )
}
