'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import Link from '@/components/link'
import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import {
  locales,
  localeNames,
  localizeHref,
  type AppLocale,
} from '@/i18n/config'

function FlagSvg({ children, title }: { children: ReactNode; title: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      width={20}
      height={15}
      className="h-[15px] w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10"
      aria-hidden="true"
      role="img"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

const flags: Record<AppLocale, ReactNode> = {
  en: (
    <FlagSvg title="United States">
      <rect width="640" height="480" fill="#b22234" />
      <path
        fill="#fff"
        d="M0 55h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"
      />
      <rect width="256" height="259" fill="#3c3b6e" />
    </FlagSvg>
  ),
  es: (
    <FlagSvg title="Spain">
      <rect width="640" height="480" fill="#c60b1e" />
      <rect y="120" width="640" height="240" fill="#ffc400" />
    </FlagSvg>
  ),
  de: (
    <FlagSvg title="Germany">
      <rect width="640" height="160" fill="#000" />
      <rect y="160" width="640" height="160" fill="#dd0000" />
      <rect y="320" width="640" height="160" fill="#ffce00" />
    </FlagSvg>
  ),
  fr: (
    <FlagSvg title="France">
      <rect width="213.3" height="480" fill="#002395" />
      <rect x="213.3" width="213.4" height="480" fill="#fff" />
      <rect x="426.7" width="213.3" height="480" fill="#ed2939" />
    </FlagSvg>
  ),
  pl: (
    <FlagSvg title="Poland">
      <rect width="640" height="240" fill="#fff" />
      <rect y="240" width="640" height="240" fill="#dc143c" />
    </FlagSvg>
  ),
  'pt-BR': (
    <FlagSvg title="Brazil">
      <rect width="640" height="480" fill="#009c3b" />
      <path fill="#ffdf00" d="M320 48 584 240 320 432 56 240z" />
      <circle cx="320" cy="240" r="96" fill="#002776" />
    </FlagSvg>
  ),
}

const localeShort: Record<AppLocale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  pl: 'PL',
  'pt-BR': 'PT',
}

/** Single language control; all locale homepage links stay in the DOM for crawlers. */
export function LanguageFlagLinks({ className = '' }: { className?: string }) {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale() as AppLocale
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const el = detailsRef.current
    if (!el) return

    const onPointerDown = (event: PointerEvent) => {
      if (!el.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && el.open) el.open = false
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <nav className={`relative ${className}`} aria-label={t('aria')}>
      <details ref={detailsRef} className="group relative">
        <summary
          className="flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden"
          aria-label={t('aria')}
        >
          {flags[locale]}
          <span className="tabular-nums tracking-wide">{localeShort[locale]}</span>
          <ChevronDown
            className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <ul
          className="absolute right-0 z-50 mt-1.5 min-w-[11.5rem] overflow-hidden rounded-md border border-border bg-background py-1 shadow-xl ring-1 ring-border"
          role="list"
        >
          {locales.map((code) => {
            const href = localizeHref(code, '/')
            const active = code === locale
            return (
              <li key={code}>
                <Link
                  href={href}
                  hrefLang={code === 'en' ? 'en' : code}
                  lang={code === 'en' ? 'en' : code}
                  title={localeNames[code]}
                  aria-label={localeNames[code]}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    active
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-foreground'
                  }`}
                  onClick={() => {
                    if (detailsRef.current) detailsRef.current.open = false
                  }}
                >
                  {flags[code]}
                  <span className="flex-1">{localeNames[code]}</span>
                  <span className="text-[10px] font-semibold tabular-nums tracking-wide text-muted-foreground">
                    {localeShort[code]}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </details>
    </nav>
  )
}
