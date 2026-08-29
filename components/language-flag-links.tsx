'use client'

import type { ReactNode } from 'react'
import Link from '@/components/link'
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

/** Crawlable flag links to each language homepage. */
export function LanguageFlagLinks({ className = '' }: { className?: string }) {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale() as AppLocale

  return (
    <nav
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={t('aria')}
    >
      {locales.map((code) => {
        const href = localizeHref(code, '/')
        const active = code === locale
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code === 'en' ? 'en' : code}
            title={localeNames[code]}
            aria-label={localeNames[code]}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted ${
              active ? 'bg-primary/15 ring-1 ring-primary/40' : ''
            }`}
          >
            {flags[code]}
          </Link>
        )
      })}
    </nav>
  )
}
