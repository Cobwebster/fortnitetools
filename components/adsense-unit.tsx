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
export function AdSenseUnit({ variant, className }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const { slot, format, label } = ADSENSE_VARIANTS[variant]
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
      {process.env.NODE_ENV !== 'production' ? (
        <p className="px-3 py-8 text-center text-xs text-muted-foreground/60">{label}</p>
      ) : (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(!multiplex ? { 'data-full-width-responsive': 'true' } : {})}
        />
      )}
    </aside>
  )
}
