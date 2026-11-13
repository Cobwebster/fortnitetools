'use client'

import { useState } from 'react'
import Link from '@/components/link'
import { SITE_CREATOR_CODE, SITE_CREATOR_CODE_LIVE } from '@/lib/site'
import { cn } from '@/lib/utils'

type Variant = 'strip' | 'nav' | 'page' | 'support'
type SupportKind = 'guide' | 'tool' | 'map' | 'leak'

const SUPPORT_COPY: Record<SupportKind, string> = {
  guide:
    'If this guide helped you, consider using our creator code on your next Fortnite purchase to support the site.',
  tool:
    'If this tool helped you, consider using our creator code on your next Fortnite purchase to support the site.',
  map:
    'If this interactive map helped you, consider using our creator code on your next Fortnite purchase to support the site.',
  leak:
    'Use our creator code to support our leak finding — keeps these write-ups coming.',
}

export function CreatorCodeChip({
  variant,
  kind = 'tool',
  className,
}: {
  variant: Variant
  /** Used when variant is `support`. */
  kind?: SupportKind
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(SITE_CREATOR_CODE)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can fail in locked-down embeds — leave label unchanged
    }
  }

  if (!SITE_CREATOR_CODE_LIVE) return null

  if (variant === 'strip') {
    return (
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-primary/25 bg-primary/10 px-3 py-1.5 text-center text-xs sm:text-sm',
          className
        )}
      >
        <Link
          href="/creator-code"
          className="font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Support us
        </Link>
        <span className="text-muted-foreground" aria-hidden="true">
          ·
        </span>
        <span className="text-muted-foreground">use creator code</span>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`Copy creator code ${SITE_CREATOR_CODE}`}
          className="inline-flex items-center rounded-md border border-primary/40 bg-background/80 px-2 py-0.5 font-display text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:border-primary hover:bg-primary/15"
        >
          {copied ? 'Copied!' : SITE_CREATOR_CODE}
        </button>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`Copy creator code ${SITE_CREATOR_CODE}`}
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    )
  }

  if (variant === 'nav') {
    return (
      <button
        type="button"
        onClick={copyCode}
        aria-label={`Copy creator code ${SITE_CREATOR_CODE}`}
        title={`Creator code ${SITE_CREATOR_CODE} — click to copy`}
        className={cn(
          'inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:border-primary/60 hover:bg-primary/15 sm:gap-1.5 sm:px-2.5 sm:py-2 sm:text-sm',
          className
        )}
      >
        <span className="text-[9px] font-semibold normal-case tracking-normal text-muted-foreground sm:text-[10px]">
          Creator code
        </span>
        <span className="font-display">{copied ? 'Copied!' : SITE_CREATOR_CODE}</span>
      </button>
    )
  }

  if (variant === 'support') {
    return (
      <aside
        className={cn(
          'flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-3 sm:px-5',
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-muted-foreground">{SUPPORT_COPY[kind]}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Item Shop → Enter Code →{' '}
            <Link href="/creator-code" className="font-semibold text-primary hover:underline">
              {SITE_CREATOR_CODE}
            </Link>
            . Price stays the same.
          </p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`Copy creator code ${SITE_CREATOR_CODE}`}
          className="inline-flex shrink-0 items-center rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-display text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/15"
        >
          {copied ? 'Copied!' : `Copy ${SITE_CREATOR_CODE}`}
        </button>
      </aside>
    )
  }

  // page callout
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-xl border border-primary/35 bg-primary/10 px-4 py-3',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Our code</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Support FortniteTools in the Item Shop — Enter Code →{' '}
          <span className="font-semibold text-foreground">{SITE_CREATOR_CODE}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={copyCode}
        aria-label={`Copy creator code ${SITE_CREATOR_CODE}`}
        className="inline-flex shrink-0 items-center rounded-lg border border-primary/40 bg-background px-3 py-2 font-display text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/15"
      >
        {copied ? 'Copied!' : `Copy ${SITE_CREATOR_CODE}`}
      </button>
    </div>
  )
}
