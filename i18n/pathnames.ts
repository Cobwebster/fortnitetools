import {
  defaultLocale,
  locales,
  localePrefix,
  localizedToolSlugs,
  type AppLocale,
  type LocalizedPathname,
  type LocalizedToolSlug,
} from './config'
import { siteConfig } from '@/lib/site'

export function absoluteLocaleUrl(locale: AppLocale, pathname: LocalizedPathname | string): string {
  const path = pathname === '/' ? '' : pathname
  const prefix = localePrefix(locale)
  if (!prefix && pathname === '/') return siteConfig.url
  return `${siteConfig.url}${prefix}${path}`
}

/** hreflang alternates + x-default → English. */
export function hreflangAlternates(pathname: LocalizedPathname | string) {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = absoluteLocaleUrl(locale, pathname)
  }
  languages['x-default'] = absoluteLocaleUrl(defaultLocale, pathname)
  return languages
}

export function toolPath(slug: LocalizedToolSlug): `/tools/${LocalizedToolSlug}` {
  return `/tools/${slug}`
}

export function allLocalizedToolPaths(): `/tools/${LocalizedToolSlug}`[] {
  return localizedToolSlugs.map(toolPath)
}
