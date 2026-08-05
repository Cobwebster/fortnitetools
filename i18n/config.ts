export const locales = ['en', 'es', 'de', 'fr', 'pl', 'pt-BR'] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'en'

/** Locales that use a URL prefix (everything except English). */
export const prefixedLocales = ['es', 'de', 'fr', 'pl', 'pt-BR'] as const

export type PrefixedLocale = (typeof prefixedLocales)[number]

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pl: 'Polski',
  'pt-BR': 'Português (Brasil)',
}

export const localeHtmlLang: Record<AppLocale, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  pl: 'pl',
  'pt-BR': 'pt-BR',
}

/** Nested tool pages under /tools/* that have locale twins. */
export const localizedToolSlugs = [
  'sensitivity-calculator',
  'kd-calculator',
  'zone-timer',
  'vbucks-calculator',
  'battle-pass-xp-calculator',
  'weapon-damage-calculator',
  'fps-settings',
  'keybinds',
  'player-stats',
] as const

export type LocalizedToolSlug = (typeof localizedToolSlugs)[number]

export function isLocalizedToolSlug(value: string): value is LocalizedToolSlug {
  return (localizedToolSlugs as readonly string[]).includes(value)
}

/** Paths that have a translated twin under /{locale}/... */
export const localizedPathnames = ['/', '/tools', '/fortnite-map', '/guides'] as const

/** Published guide article paths with locale twins. */
export const localizedGuidePaths = [
  '/guides',
  '/guides/how-to',
  '/guides/how-to/how-to-refund-fortnite-skins',
  '/guides/how-to/how-to-redeem-fortnite-code',
] as const

export type LocalizedGuidePath = (typeof localizedGuidePaths)[number]

export type LocalizedPathname =
  | (typeof localizedPathnames)[number]
  | `/tools/${LocalizedToolSlug}`
  | LocalizedGuidePath

export function isLocalizableGuidesPath(path: string): boolean {
  return (localizedGuidePaths as readonly string[]).includes(path)
}

export function guideMessageKey(slug: string): 'refund' | 'redeem' | null {
  if (slug === 'how-to-refund-fortnite-skins') return 'refund'
  if (slug === 'how-to-redeem-fortnite-code') return 'redeem'
  return null
}

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value)
}

export function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (prefixedLocales as readonly string[]).includes(value)
}

export function localePrefix(locale: AppLocale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}

/** True for /tools and /tools/<localized-slug>. */
export function isLocalizableToolsPath(path: string): boolean {
  if (path === '/tools') return true
  if (!path.startsWith('/tools/')) return false
  const slug = path.slice('/tools/'.length).split('/')[0]
  return isLocalizedToolSlug(slug)
}

/** Extra root paths with locale twins (outside /tools). */
export const localizedRootPaths = ['/fortnite-map'] as const

export type LocalizedRootPath = (typeof localizedRootPaths)[number]

export function isLocalizableRootPath(path: string): path is LocalizedRootPath {
  return (localizedRootPaths as readonly string[]).includes(path)
}

export function isLocalizablePath(path: string): boolean {
  return (
    path === '/' ||
    isLocalizableToolsPath(path) ||
    isLocalizableRootPath(path) ||
    isLocalizableGuidesPath(path)
  )
}

/** Site pages that stay English-only (legal / admin) — OK to link from any locale. */
export const englishSharedPaths = ['/about', '/privacy', '/terms', '/contact'] as const

export function isEnglishSharedPath(path: string): boolean {
  return (englishSharedPaths as readonly string[]).includes(path)
}

/**
 * On prefixed locales, only keep hrefs that have a translated twin (or shared legal pages).
 * English locale keeps everything.
 * Accepts bare paths (`/tools/...`) or already-localized hrefs (`/es/tools/...`).
 */
export function isLocaleSurfaceHref(locale: AppLocale, href: string): boolean {
  if (locale === defaultLocale) return true
  if (href.startsWith('http://') || href.startsWith('https://')) return true
  const path = stripLocaleFromPathname(href.split('?')[0] || '/')
  if (isEnglishSharedPath(path)) return true
  return isLocalizablePath(path)
}

/** Build a localized URL for home, /tools/*, or other localizable roots. */
export function localizeHref(locale: AppLocale, href: string): string {
  if (href.startsWith('http://') || href.startsWith('https://')) return href

  const path = href.split('?')[0] || '/'
  const query = href.includes('?') ? href.slice(href.indexOf('?')) : ''

  if (path === '/' || path === '') {
    return `${localePrefix(locale) || '/'}${query === '?' ? '' : query}`
  }

  if (isLocalizablePath(path)) {
    return `${localePrefix(locale)}${path}${query}`
  }

  return `${path}${query}`
}

/**
 * When switching language, keep localizable twins; otherwise go to locale home.
 */
export function switchLocalePath(locale: AppLocale, currentPathname: string): string {
  const bare = stripLocaleFromPathname(currentPathname)
  if (isLocalizablePath(bare)) {
    return localizeHref(locale, bare)
  }
  if (bare === '/') return localizeHref(locale, '/')
  return localizeHref(locale, '/')
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return '/'
  if (isPrefixedLocale(parts[0])) {
    const rest = parts.slice(1).join('/')
    return rest ? `/${rest}` : '/'
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export function localeFromPathname(pathname: string): AppLocale {
  const first = pathname.split('/').filter(Boolean)[0]
  if (first && isPrefixedLocale(first)) return first
  return defaultLocale
}

/** Stable message key for a tool href */
export function toolMessageId(href: string): string {
  return href.replace(/^\/tools\//, '').replace(/^\//, '').replace(/\//g, '-')
}

/** Message namespace under tools.* for a slug */
export const toolMessageNamespace: Record<LocalizedToolSlug, string> = {
  'sensitivity-calculator': 'sensitivityCalculator',
  'kd-calculator': 'kdCalculator',
  'zone-timer': 'zoneTimer',
  'vbucks-calculator': 'vbucks',
  'battle-pass-xp-calculator': 'battlePassXp',
  'weapon-damage-calculator': 'weaponDamage',
  'fps-settings': 'fpsSettings',
  keybinds: 'keybinds',
  'player-stats': 'playerStats',
}
