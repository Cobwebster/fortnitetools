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
  badge?: 'new'
  icon?: 'discord'
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function NewBadge({ compact }: { compact?: boolean }) {
  return (
    <span
      className={
        compact
          ? 'relative inline-flex items-center rounded-[3px] bg-primary px-1 py-px text-[8px] font-black uppercase leading-none tracking-[0.12em] text-primary-foreground shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_55%,transparent)]'
          : 'relative inline-flex items-center rounded-[4px] bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase leading-none tracking-[0.14em] text-primary-foreground shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_50%,transparent)]'
      }
      aria-hidden="true"
    >
      <span className="absolute inset-0 animate-ping rounded-[inherit] bg-primary/40" />
      <span className="relative">New</span>
    </span>
  )
}

function NavLinkItem({
  link,
  compact,
}: {
  link: NavLink
  compact?: boolean
}) {
  const hasBadge = link.badge === 'new'
  const isIconOnly = link.icon === 'discord'
  const className = compact
    ? hasBadge
      ? 'inline-flex items-center gap-1.5 rounded-md border border-primary/35 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/15'
      : isIconOnly
        ? 'inline-flex items-center justify-center rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-[#5865F2] transition-colors'
        : link.emphasis
          ? 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-muted transition-colors'
          : 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors'
    : hasBadge
      ? 'inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/15 hover:border-primary/60'
      : isIconOnly
        ? 'inline-flex items-center justify-center rounded-md px-2.5 py-2 text-muted-foreground hover:bg-muted hover:text-[#5865F2] transition-colors'
        : link.emphasis
          ? 'px-2.5 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-muted'
          : 'px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted'

  const content = isIconOnly ? (
    <DiscordIcon className={compact ? 'h-4 w-4' : 'h-[1.125rem] w-[1.125rem]'} />
  ) : (
    <>
      <span>{link.label}</span>
      {hasBadge ? <NewBadge compact={compact} /> : null}
    </>
  )

  const ariaLabel = isIconOnly
    ? link.label
    : hasBadge
      ? `${link.label} (new)`
      : undefined

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        title={isIconOnly ? link.label : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className} aria-label={ariaLabel}>
      {content}
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
    { href: '/stats', label: t('stats'), badge: 'new', emphasis: true },
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
    { href: '/cosmetic-stats', label: t('cosmeticStats') },
    { href: '/sets', label: t('sets') },
    { href: '/creator-code', label: t('creatorCode') },
    { href: '/codes', label: t('codes') },
    { href: '/free-cosmetics', label: t('freeCosmetics') },
    { href: '/season-countdown', label: t('countdown') },
    { href: '/weapons', label: t('weapons') },
    { href: 'https://discord.gg/Tj9GPyCQC4', label: t('discord'), external: true, icon: 'discord' },
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
    { href: 'https://discord.gg/Tj9GPyCQC4', label: t('discord'), external: true, icon: 'discord' },
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
