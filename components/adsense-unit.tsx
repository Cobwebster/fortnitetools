'use client'

import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADSENSE_VARIANTS, type AdSenseVariant } from '@/lib/adsense'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type Props = {
  variant: AdSenseVariant
  className?: string
}

/**
 * Manual in-content unit. The adsbygoogle.js library loads once from the root layout.
 */
const ADBLOCK_MESSAGE = 'Please disable Adblock to keep this site free.'

export function AdSenseUnit({ variant, className }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const { slot, format } = ADSENSE_VARIANTS[variant]
  const multiplex = format === 'autorelaxed'

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const el = insRef.current
    if (!el) return
    if (el.getAttribute('data-adsbygoogle-status') === 'done') return
    if (el.dataset.adQueued === '1') return
    el.dataset.adQueued = '1'
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      /* already filled */
    }
  }, [slot, format])

  return (
    <aside
      className={cn(
        'w-full rounded-lg border border-border/50 bg-card/30',
        multiplex ? 'min-h-[280px]' : 'min-h-[100px]',
        className
      )}
      aria-label="Advertisement"
    >
      <p className="px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
        Advertisement
      </p>
      <div className={cn('relative', multiplex ? 'min-h-[280px]' : 'min-h-[100px]')}>
        <p className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-4 text-center text-xs text-muted-foreground/70">
          {ADBLOCK_MESSAGE}
        </p>
        {process.env.NODE_ENV !== 'production' ? (
          <div className={multiplex ? 'h-[280px]' : 'h-[100px]'} aria-hidden="true" />
        ) : (
          <ins
            ref={insRef}
            className="adsbygoogle relative z-10"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format}
            {...(!multiplex ? { 'data-full-width-responsive': 'true' } : {})}
          />
        )}
      </div>
    </aside>
  )
}
