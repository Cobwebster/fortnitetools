'use client'

import { useState } from 'react'
import Link from 'next/link'

const DISMISS_KEY = 'ft_cookie_notice'

function readDismissed() {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/** Notice only — Analytics always loads from the root layout. */
export function CookieConsent() {
  const [dismissed, setDismissed] = useState(readDismissed)

  if (dismissed) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 rounded-lg border border-border/80 bg-background/95 px-3.5 py-3 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:px-4">
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
          We use analytics cookies to measure traffic.{' '}
          <Link href="/privacy" className="text-foreground/80 underline-offset-2 hover:text-primary hover:underline">
            Privacy
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(DISMISS_KEY, '1')
            } catch {
              /* private mode */
            }
            setDismissed(true)
          }}
          className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          OK
        </button>
      </div>
    </div>
  )
}
