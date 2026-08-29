'use client'

import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { categories } from '@/lib/posts'
import { BRAND_ICON } from '@/lib/site-icons'
import { EPIC_DISCLAIMER } from '@/lib/site'
import {
  defaultLocale,
  isLocaleSurfaceHref,
  localizeHref,
  type AppLocale,
} from '@/i18n/config'

const CAT_KEYS: Record<string, 'catHowTo' | 'catWeapons' | 'catSeason' | 'catMap'> = {
  'how-to': 'catHowTo',
  weapons: 'catWeapons',
  season: 'catSeason',
  map: 'catMap',
}

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')
  const guidesHref = localizeHref(locale, '/guides')
  const isEnglish = locale === defaultLocale

  const allToolLinks = [
    { href: toolsHref, label: t('allTools') },
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
    { href: '/free-cosmetics', label: t('freeCosmetics') },
    { href: '/xp-calculator', label: t('xpCalculator') },
    { href: '/season-countdown', label: t('seasonCountdown') },
    { href: localizeHref(locale, '/tools/player-stats'), label: t('fortniteTracker') },
    { href: '/codes', label: t('mapCodes') },
    { href: localizeHref(locale, '/fortnite-map'), label: t('interactiveMap') },
    { href: '/map-rotation', label: t('mapRotation') },
    { href: '/map-evolution', label: t('mapEvolution') },
    { href: '/player-count', label: t('playerCount') },
    { href: localizeHref(locale, '/tools/loadout-builder'), label: t('loadoutBuilder') },
    { href: localizeHref(locale, '/tools/fortnite-build-simulator'), label: t('buildSimulator') },
    { href: localizeHref(locale, '/tools/item-shop'), label: t('itemShop') },
    { href: localizeHref(locale, '/tools/skin-rarity-calculator'), label: t('skinRarity') },
    { href: '/weapons', label: t('allWeapons') },
    { href: '/weapon-changes', label: t('weaponChanges') },
    { href: localizeHref(locale, '/tools/weapon-damage-calculator'), label: t('damageCalc') },
    { href: localizeHref(locale, '/tools/sensitivity-calculator'), label: t('sensitivity') },
    { href: localizeHref(locale, '/tools/vbucks-calculator'), label: t('vbucks') },
    { href: localizeHref(locale, '/tools/battle-pass-xp-calculator'), label: t('xpCalculator') },
    { href: localizeHref(locale, '/tools/kd-calculator'), label: t('kdCalculator') },
    { href: localizeHref(locale, '/tools/zone-timer'), label: t('zoneTimer') },
    { href: localizeHref(locale, '/tools/fps-settings'), label: t('fpsSettings') },
    { href: localizeHref(locale, '/tools/keybinds'), label: t('keybinds') },
  ]

  const toolLinks = allToolLinks.filter((item) => isLocaleSurfaceHref(locale, item.href))

  const categoryLinks = (
    isEnglish ? categories : categories.filter((c) => c.id === 'how-to' || c.id === 'map')
  ).map((cat) => ({
    id: cat.id,
    href:
      cat.id === 'map'
        ? localizeHref(locale, '/fortnite-map')
        : localizeHref(locale, `/guides/${cat.id}`),
    label: CAT_KEYS[cat.id] ? t(CAT_KEYS[cat.id]) : cat.label,
  }))

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Link href={homeHref} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_ICON}
                alt="FortniteTools"
                className="h-9 w-9 object-contain drop-shadow-sm"
              />
              <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                Fortnite<span className="text-primary">Tools</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('tagline')}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('categories')}
            </h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {categoryLinks.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('guides')}
            </h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              <li>
                <Link
                  href={guidesHref}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('allGuides')}
                </Link>
              </li>
              {isEnglish ? (
                <>
                  <li>
                    <Link
                      href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('weaponsTier')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides/map/fortnite-loot-guide-best-spots"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('bestLoot')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides/map"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('mapGuides')}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={localizeHref(locale, '/guides/how-to/how-to-refund-fortnite-skins')}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('refundGuide')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref(locale, '/guides/how-to/how-to-redeem-fortnite-code')}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('redeemGuide')}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('tools')}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2" role="list">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{t('site')}</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('otherSites')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3" role="list">
              <li>
                <a
                  href="https://www.craftmc.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    CraftMC.net
                  </span>
                  <span className="block text-xs text-muted-foreground">{t('craftmcDesc')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.robloxtools.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    RobloxTools.net
                  </span>
                  <span className="block text-xs text-muted-foreground">{t('robloxDesc')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4 sm:px-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-200/90 mb-1.5">
            {t('disclaimerTitle')}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{EPIC_DISCLAIMER}</p>
        </div>

        <div className="mt-6 border-t border-border pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FortniteTools.com. All rights reserved. {t('copyrightAlso')}{' '}
            <a
              href="https://www.craftmc.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              {t('minecraft')}
            </a>{' '}
            {t('and')}{' '}
            <a
              href="https://www.robloxtools.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              {t('roblox')}
            </a>{' '}
            {t('toolsSites')}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t('privacyShort')}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t('termsShort')}
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              {t('contact')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
