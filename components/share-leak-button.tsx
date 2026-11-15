'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  url: string
  title: string
  text?: string
  className?: string
}

export function ShareLeakButton({ url, title, text, className }: Props) {
  const [copied, setCopied] = useState(false)

  async function share() {
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, text: text || title, url })
        return
      }
    } catch (err) {
      // User cancelled share sheet — don't fall through to copy
      if (err instanceof DOMException && err.name === 'AbortError') return
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground',
        className
      )}
      aria-label={copied ? 'Link copied' : 'Share this leak'}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : <Share2 className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? 'Copied' : 'Share this leak'}
    </button>
  )
}
