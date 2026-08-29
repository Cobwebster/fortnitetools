'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '@/components/link'

const DISMISS_KEY = 'ft_cookie_notice'

function persistDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* private mode */
  }
}

function alreadyDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/** Notice only — Analytics always loads from the root layout. */
export function CookieConsent() {
  const dismissedRef = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (dismissedRef.current || alreadyDismissed()) return
    setVisible(true)
  }, [])

  function dismiss() {
    dismissedRef.current = true
    persistDismissed()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-16 z-[200] flex justify-center p-3 sm:bottom-4 sm:p-4"
    >
      <div className="flex w-full max-w-3xl flex-col gap-3 rounded-lg border border-border/80 bg-background px-3.5 py-3 shadow-lg sm:flex-row sm:items-center sm:gap-4 sm:px-4">
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
          We use analytics cookies to measure traffic.{' '}
          <Link
            href="/privacy"
            onClick={dismiss}
            className="text-foreground/80 underline-offset-2 hover:text-primary hover:underline"
          >
            Privacy
          </Link>
        </p>
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault()
            dismiss()
          }}
          onClick={dismiss}
          className="relative z-[201] shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          OK
        </button>
      </div>
    </div>
  )
}
