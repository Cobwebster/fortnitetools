import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from './config'

/**
 * next-intl routing config. English stays unprefixed (`as-needed`).
 * App routes stay hybrid: EN at root, prefixed locales under app/[locale].
 */
export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
})
