'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLocale } from 'next-intl'
import { localizeHref, type AppLocale } from '@/i18n/config'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function imageAlt(alt: string, src: string) {
  const trimmed = alt.trim()
  if (trimmed) return trimmed
  const file = src.split('/').pop()?.replace(/\.\w+$/, '') ?? ''
  const fromFile = file.replace(/[-_]+/g, ' ').trim()
  return fromFile || 'Fortnite'
}

function GuideIcon({
  src,
  alt,
  size = 'md',
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14 sm:h-16 sm:w-16' : 'h-11 w-11 sm:h-12 sm:w-12'
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={imageAlt(alt, src)}
      className={`${dim} shrink-0 object-contain drop-shadow-md`}
      loading="lazy"
      width={size === 'lg' ? 64 : size === 'sm' ? 32 : 48}
      height={size === 'lg' ? 64 : size === 'sm' ? 32 : 48}
    />
  )
}

const INLINE_TOKEN = /(\*\*[^*]+\*\*|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/g

function renderInline(text: string, locale: AppLocale): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  const pattern = new RegExp(INLINE_TOKEN.source, 'g')

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }

    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="text-foreground font-semibold">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('![')) {
      const alt = match[2] || ''
      const src = match[3]
      nodes.push(
        <GuideIcon key={key++} src={src} alt={alt} size="sm" />
      )
    } else {
      const label = match[4]
      const href = match[5]
      if (isInternalHref(href)) {
        nodes.push(
          <Link
            key={key++}
            href={localizeHref(locale, href)}
            className="text-primary underline-offset-2 hover:underline"
          >
            {label}
          </Link>
        )
      } else {
        nodes.push(
          <a
            key={key++}
            href={href}
            className="text-primary underline-offset-2 hover:underline"
            rel="noopener noreferrer"
            target={href.startsWith('http') ? '_blank' : undefined}
          >
            {label}
          </a>
        )
      }
    }

    last = match.index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function isTableBlock(block: string) {
  const lines = block.trim().split('\n')
  return lines.length >= 2 && lines[0].trim().startsWith('|') && lines[1].includes('---')
}

function parseTable(block: string) {
  const lines = block
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const cells = (line: string) =>
    line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())

  const headers = cells(lines[0])
  const rows = lines.slice(2).map(cells)
  return { headers, rows }
}

function parseImageLine(line: string): { alt: string; src: string } | null {
  const m = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
  if (!m) return null
  return { alt: m[1], src: m[2] }
}

function parseHeadingWithIcon(trimmed: string): { alt: string; src: string; title: string } | null {
  const m = trimmed.match(/^###\s+!\[([^\]]*)\]\(([^)]+)\)\s*(.*)$/)
  if (!m) return null
  const alt = m[1]
  const src = m[2]
  const rest = m[3].trim()
  return { alt, src, title: rest || alt }
}

function firstLineAndRest(trimmed: string): { first: string; rest: string } {
  const nl = trimmed.indexOf('\n')
  if (nl === -1) return { first: trimmed, rest: '' }
  return { first: trimmed.slice(0, nl).trim(), rest: trimmed.slice(nl + 1).trim() }
}

export function GuideMarkdown({ content }: { content: string }) {
  const locale = useLocale() as AppLocale
  const blocks = content.trim().split(/\n\n+/)

  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('## ')) {
          const { first, rest } = firstLineAndRest(trimmed)
          return (
            <div key={i} className="space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase text-foreground mt-8 mb-3">
                {first.replace(/^##\s+/, '')}
              </h2>
              {rest ? (
                <p className="text-muted-foreground">{renderInline(rest.replace(/\n/g, ' '), locale)}</p>
              ) : null}
            </div>
          )
        }

        if (trimmed.startsWith('### ')) {
          const { first, rest } = firstLineAndRest(trimmed)
          const headingIcon = parseHeadingWithIcon(first)
          return (
            <div key={i} className="space-y-2">
              {headingIcon ? (
                <h3 className="mt-6 mb-2 flex items-center gap-3 font-display text-xl font-bold uppercase text-foreground">
                  <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg border border-border bg-card">
                    <GuideIcon src={headingIcon.src} alt={headingIcon.title} size="md" />
                  </span>
                  <span>{headingIcon.title}</span>
                </h3>
              ) : (
                <h3 className="font-display text-xl font-bold uppercase text-foreground mt-6 mb-2">
                  {renderInline(first.replace(/^###\s+/, ''), locale)}
                </h3>
              )}
              {rest ? (
                <p className="text-muted-foreground">{renderInline(rest.replace(/\n/g, ' '), locale)}</p>
              ) : null}
            </div>
          )
        }

        const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean)
        const imageLines = lines.map(parseImageLine)
        if (imageLines.length > 0 && imageLines.every(Boolean)) {
          const icons = imageLines as { alt: string; src: string }[]
          if (icons.length === 1) {
            return (
              <div
                key={i}
                className="my-3 flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-card p-2"
              >
                <GuideIcon src={icons[0].src} alt={icons[0].alt} size="lg" />
              </div>
            )
          }
          return (
            <div
              key={i}
              className="my-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              role="group"
              aria-label="Featured loadout icons"
            >
              {icons.map((icon) => (
                <div key={icon.src} className="flex flex-col items-center gap-1.5 min-w-[4.5rem]">
                  <GuideIcon src={icon.src} alt={icon.alt} size="lg" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center leading-tight max-w-[5.5rem]">
                    {icon.alt}
                  </span>
                </div>
              ))}
            </div>
          )
        }

        if (isTableBlock(trimmed)) {
          const { headers, rows } = parseTable(trimmed)
          return (
            <div key={i} className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    {headers.map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground"
                      >
                        {renderInline(h, locale)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-border/60 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5 align-top text-muted-foreground">
                          {renderInline(cell, locale)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- '))
          const withIcons = items.some((item) => item.replace(/^\s*-\s+/, '').startsWith('!['))
          return (
            <ul
              key={i}
              className={withIcons ? 'list-none pl-0 space-y-2.5' : 'list-disc pl-5 space-y-1'}
            >
              {items.map((item, j) => {
                const body = item.replace(/^\s*-\s+/, '')
                if (withIcons && body.startsWith('![')) {
                  return (
                    <li key={j} className="flex items-start gap-2.5 leading-relaxed">
                      {renderInline(body, locale)}
                    </li>
                  )
                }
                return <li key={j}>{renderInline(body, locale)}</li>
              })}
            </ul>
          )
        }

        if (/^\d+\.\s/.test(trimmed) || trimmed.split('\n').some((l) => /^\d+\.\s/.test(l.trim()))) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()))
          return (
            <ol key={i} className="list-decimal pl-5 space-y-1">
              {items.map((item, j) => (
                <li key={j}>{renderInline(item.replace(/^\s*\d+\.\s+/, ''), locale)}</li>
              ))}
            </ol>
          )
        }

        return (
          <p key={i} className="text-muted-foreground">
            {renderInline(trimmed.replace(/\n/g, ' '), locale)}
          </p>
        )
      })}
    </div>
  )
}
