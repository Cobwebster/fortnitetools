'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const CONSENT_KEY = 'ft_cookie_consent'
export const GA_MEASUREMENT_ID = 'G-2XQ18341NM'

type Consent = 'accepted' | 'declined'

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    if (value === 'accepted' || value === 'declined') return value
  } catch {
    /* private mode */
  }
  return null
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* private mode */
  }
}

function AnalyticsScripts() {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}

/** Subtle cookie bar + GA load only after accept. */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
    setReady(true)
  }, [])

  function choose(value: Consent) {
    writeConsent(value)
    setConsent(value)
  }

  if (!ready) return null

  return (
    <>
      {consent === 'accepted' ? <AnalyticsScripts /> : null}

      {consent === null ? (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 rounded-lg border border-border/80 bg-background/95 px-3.5 py-3 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:px-4">
            <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              We use optional cookies for analytics (and ads if enabled) to improve the site.{' '}
              <Link href="/privacy" className="text-foreground/80 underline-offset-2 hover:text-primary hover:underline">
                Privacy
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => choose('declined')}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
