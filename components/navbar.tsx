'use client'

import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { AuthNavLinks } from '@/components/auth-nav-links'
import { LanguageFlagLinks } from '@/components/language-flag-links'
import { BRAND_ICON } from '@/lib/site-icons'
import {
  defaultLocale,
  isLocaleSurfaceHref,
  localizeHref,
  type AppLocale,
} from '@/i18n/config'

type NavLink = {
  href: string
  label: string
  emphasis?: boolean
  external?: boolean
}

function NavLinkItem({
  link,
  compact,
}: {
  link: NavLink
  compact?: boolean
}) {
  const className = compact
    ? link.emphasis
      ? 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-muted transition-colors'
      : 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors'
    : link.emphasis
      ? 'px-2.5 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-muted'
      : 'px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted'

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const toolsHref = localizeHref(locale, '/tools')
  const homeHref = localizeHref(locale, '/')
  const guidesHref = localizeHref(locale, '/guides')
  const isEnglish = locale === defaultLocale

  const englishPrimary: NavLink[] = [
    { href: toolsHref, label: t('tools'), emphasis: true },
    { href: '/tools/fortnite-build-simulator', label: t('buildSim') },
    { href: localizeHref(locale, '/tools/player-stats'), label: t('playerTracker') },
    { href: localizeHref(locale, '/fortnite-map'), label: t('map') },
    { href: localizeHref(locale, '/tools/item-shop'), label: t('itemShop') },
  ]

  const englishSecondary: NavLink[] = [
    { href: '/season', label: t('season') },
    { href: '/drops', label: t('drops') },
    { href: '/news', label: t('news') },
    { href: '/modes', label: t('modes') },
    { href: '/reload', label: t('reload') },
    { href: '/ranked', label: t('ranked') },
    { href: '/status', label: t('status') },
    { href: '/new-cosmetics', label: t('newCosmetics') },
    { href: '/sets', label: t('sets') },
    { href: '/creator-code', label: t('creatorCode') },
    { href: '/codes', label: t('codes') },
    { href: '/free-cosmetics', label: t('freeCosmetics') },
    { href: '/season-countdown', label: t('countdown') },
    { href: '/weapons', label: t('weapons') },
    { href: 'https://discord.gg/Tj9GPyCQC4', label: t('discord'), external: true },
  ]

  const localePrimary: NavLink[] = [
    { href: toolsHref, label: t('tools'), emphasis: true },
    { href: localizeHref(locale, '/tools/player-stats'), label: t('playerTracker') },
    { href: localizeHref(locale, '/tools/kd-calculator'), label: t('kd') },
    { href: localizeHref(locale, '/tools/sensitivity-calculator'), label: t('sensitivity') },
    { href: localizeHref(locale, '/fortnite-map'), label: t('map') },
  ]

  const localeSecondary: NavLink[] = [
    { href: localizeHref(locale, '/tools/vbucks-calculator'), label: t('vbucks') },
    { href: localizeHref(locale, '/tools/battle-pass-xp-calculator'), label: t('bpXp') },
    { href: localizeHref(locale, '/tools/weapon-damage-calculator'), label: t('damage') },
    { href: localizeHref(locale, '/tools/zone-timer'), label: t('zone') },
    { href: localizeHref(locale, '/tools/fps-settings'), label: t('fps') },
    { href: localizeHref(locale, '/tools/keybinds'), label: t('keybinds') },
    { href: 'https://discord.gg/Tj9GPyCQC4', label: t('discord'), external: true },
  ]

  const primary = (isEnglish ? englishPrimary : localePrimary).filter(
    (link) => link.external || isLocaleSurfaceHref(locale, link.href)
  )
  const secondary = (isEnglish ? englishSecondary : localeSecondary).filter(
    (link) => link.external || isLocaleSurfaceHref(locale, link.href)
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bar 1 — brand, primary links, flags, actions */}
        <nav className="flex h-14 items-center justify-between gap-3 sm:h-16" aria-label={t('mainNav')}>
          <Link href={homeHref} className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND_ICON}
              alt="FortniteTools"
              className="h-9 w-9 object-contain drop-shadow-sm sm:h-10 sm:w-10"
            />
            <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground sm:text-xl">
              Fortnite<span className="text-primary">Tools</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-0.5 lg:gap-1" role="list">
            {primary.map((link) => (
              <li key={link.href}>
                <NavLinkItem link={link} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageFlagLinks className="hidden md:flex" />
            <div className="hidden md:block">
              <AuthNavLinks />
            </div>
            <Link
              href={guidesHref}
              className="hidden sm:inline-flex rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity sm:px-4 sm:text-sm"
            >
              {isEnglish ? t('allGuides') : t('guides')}
            </Link>
            <div className="flex items-center gap-2 md:hidden">
              <LanguageFlagLinks />
              <AuthNavLinks />
            </div>
          </div>
        </nav>

        {/* Bar 2 — remaining links (desktop) + full wrap on mobile */}
        <nav
          className="flex flex-wrap items-center gap-1 border-t border-border py-2"
          aria-label={t('mobileNav')}
        >
          <ul className="flex flex-wrap gap-1 md:hidden" role="list">
            {[
              ...primary,
              ...secondary,
              {
                href: guidesHref,
                label: isEnglish ? t('allGuides') : t('guides'),
                emphasis: true,
              },
            ].map((link) => (
              <li key={`m-${link.href}`}>
                <NavLinkItem link={link} compact />
              </li>
            ))}
          </ul>
          <ul className="hidden md:flex flex-wrap gap-1" role="list">
            {secondary.map((link) => (
              <li key={`d-${link.href}`}>
                <NavLinkItem link={link} compact />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
