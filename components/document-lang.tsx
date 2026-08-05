'use client'

import { useEffect } from 'react'
import type { AppLocale } from '@/i18n/config'
import { localeHtmlLang } from '@/i18n/config'

/** Nested layouts cannot set <html lang>; sync document language for prefixed locales. */
export function DocumentLang({ locale }: { locale: AppLocale }) {
  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale]
  }, [locale])
  return null
}
