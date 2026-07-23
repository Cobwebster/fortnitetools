import Link from 'next/link'
import type { ReactNode } from 'react'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

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
    } else {
      const label = match[2]
      const href = match[3]
      if (isInternalHref(href)) {
        nodes.push(
          <Link key={key++} href={href} className="text-primary underline-offset-2 hover:underline">
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

export function GuideMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/)

  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="font-display text-2xl font-bold uppercase text-foreground mt-8 mb-3">
              {trimmed.replace(/^##\s+/, '')}
            </h2>
          )
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="font-display text-xl font-bold uppercase text-foreground mt-6 mb-2">
              {trimmed.replace(/^###\s+/, '')}
            </h3>
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
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-border/60 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5 align-top text-muted-foreground">
                          {renderInline(cell)}
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
          return (
            <ul key={i} className="list-disc pl-5 space-y-1">
              {items.map((item, j) => (
                <li key={j}>{renderInline(item.replace(/^\s*-\s+/, ''))}</li>
              ))}
            </ul>
          )
        }

        if (/^\d+\.\s/.test(trimmed) || trimmed.split('\n').some((l) => /^\d+\.\s/.test(l.trim()))) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()))
          return (
            <ol key={i} className="list-decimal pl-5 space-y-1">
              {items.map((item, j) => (
                <li key={j}>{renderInline(item.replace(/^\s*\d+\.\s+/, ''))}</li>
              ))}
            </ol>
          )
        }

        return (
          <p key={i} className="text-muted-foreground">
            {renderInline(trimmed.replace(/\n/g, ' '))}
          </p>
        )
      })}
    </div>
  )
}
