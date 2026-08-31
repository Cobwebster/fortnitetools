'use client'

import Image from 'next/image'
import Link from '@/components/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FortniteIcon } from '@/components/fortnite-icon'
import { MapEvolutionTeaser } from '@/components/map-evolution-teaser'
import { PostCard } from '@/components/post-card'
import { posts, categories, getFeaturedPosts, getLocalizedPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'
import { CATEGORY_ICONS, toolIcon } from '@/lib/site-icons'
import {
  defaultLocale,
  localizeHref,
  type AppLocale,
} from '@/i18n/config'

const CAT_KEYS: Record<string, 'catHowTo' | 'catWeapons' | 'catSeason' | 'catMap'> = {
  'how-to': 'catHowTo',
  weapons: 'catWeapons',
  season: 'catSeason',
  map: 'catMap',
}

const EN_POPULAR_TOOLS = [
  { href: '/tools/fortnite-build-simulator', key: 'toolBuildSim' as const },
  { href: '/fortnite-map', key: 'toolMap' as const },
  { href: '/tools/player-stats', key: 'toolStatsTracker' as const },
  { href: '/tools/loadout-builder', key: 'toolLoadout' as const },
  { href: '/tools/item-shop', key: 'toolItemShop' as const },
  { href: '/season', key: 'toolSeason' as const },
  { href: '/drops', key: 'toolDrops' as const },
  { href: '/news', key: 'toolNews' as const },
  { href: '/modes', key: 'toolModes' as const },
  { href: '/reload', key: 'toolReload' as const },
  { href: '/ranked', key: 'toolRanked' as const },
  { href: '/status', key: 'toolStatus' as const },
  { href: '/new-cosmetics', key: 'toolNewCosmetics' as const },
  { href: '/sets', key: 'toolSets' as const },
  { href: '/map-rotation', key: 'toolRotation' as const },
  { href: '/map-evolution', key: 'toolMapEvolution' as const },
  { href: '/weapons', key: 'toolWeapons' as const },
  { href: '/free-cosmetics', key: 'toolFreeCosmetics' as const },
  { href: '/codes', key: 'toolMapCodes' as const },
  { href: '/player-count', key: 'toolPlayerCount' as const },
  { href: '/season-countdown', key: 'toolCountdown' as const },
]

/** Locale popular strip — lead with map/tracker/settings; skip calc-first impression. */
const LOCALE_POPULAR_TOOLS = [
  { href: '/fortnite-map', key: 'toolMap' as const },
  { href: '/tools/player-stats', key: 'toolStatsTracker' as const },
  { href: '/tools/fps-settings', key: 'toolFps' as const },
  { href: '/tools/keybinds', key: 'toolKeybinds' as const },
  { href: '/tools/zone-timer', key: 'toolZone' as const },
  { href: '/tools/sensitivity-calculator', key: 'toolSensitivity' as const },
]

export function HomePageContent() {
  const t = useTranslations('home')
  const locale = useLocale() as AppLocale
  const isEnglish = locale === defaultLocale
  const featuredPosts = (isEnglish ? getFeaturedPosts() : getLocalizedPosts()).slice(0, 4)
  const recentPosts = isEnglish
    ? posts.filter((p) => !p.featured).slice(0, 2)
    : []
  const toolsHref = localizeHref(locale, '/tools')
  const guidesHref = localizeHref(locale, '/guides')
  const secondaryCtaHref = isEnglish
    ? '/guides/weapons/fortnite-best-weapons-tier-list-2026'
    : guidesHref

  const browseCategories = isEnglish
    ? categories
    : categories.filter((c) => c.id === 'how-to' || c.id === 'map')

  const popularTools = isEnglish ? EN_POPULAR_TOOLS : LOCALE_POPULAR_TOOLS

  return (
    <main>
      <section
        className="relative flex min-h-[520px] items-end overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt={t('heroAlt')}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1
              id="hero-heading"
              className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
            >
              Fortnite<span className="text-primary">Tools</span>
            </h1>
            <p className="mt-5 text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {t('heroSubtitle')}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t('heroBody')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={toolsHref}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {t('ctaTools')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
              >
                {isEnglish ? t('ctaTierList') : t('ctaGuides')}
              </Link>
              {isEnglish ? (
                <Link
                  href="/tools/loadout-builder"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                >
                  {t('ctaLoadout')}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="categories-heading"
      >
        <h2 id="categories-heading" className="sr-only">
          {t('browseCategories')}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {browseCategories.map((cat) => (
            <Link
              key={cat.id}
              href={
                cat.id === 'map'
                  ? localizeHref(locale, '/fortnite-map')
                  : cat.id === 'weapons'
                    ? '/weapons'
                    : localizeHref(locale, `/guides/${cat.id}`)
              }
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
            >
              <FortniteIcon
                src={CATEGORY_ICONS[cat.id]}
                alt={CAT_KEYS[cat.id] ? t(CAT_KEYS[cat.id]) : cat.label}
                size="md"
                frameClassName="border-transparent bg-transparent group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {CAT_KEYS[cat.id] ? t(CAT_KEYS[cat.id]) : cat.label}
              </span>
            </Link>
          ))}
          {isEnglish ? (
            <Link
              href="/weapon-changes"
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
            >
              <FortniteIcon
                src={toolIcon('/weapon-changes')}
                alt={t('weaponChanges')}
                size="md"
                frameClassName="border-transparent bg-transparent group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('weaponChanges')}
              </span>
            </Link>
          ) : (
            <Link
              href={toolsHref}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
            >
              <FortniteIcon
                src={toolIcon('/tools')}
                alt={t('allTools')}
                size="md"
                frameClassName="border-transparent bg-transparent group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('allTools')}
              </span>
            </Link>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        aria-labelledby="tools-heading"
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="tools-heading"
            className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
          >
            {t('popularTools')}
          </h2>
          <Link
            href={toolsHref}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          >
            {t('allTools')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {popularTools.map((tool) => (
            <Link
              key={tool.href}
              href={localizeHref(locale, tool.href)}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center transition-colors hover:border-primary/60 hover:bg-muted"
            >
              <FortniteIcon
                src={toolIcon(tool.href)}
                alt={t(tool.key)}
                size="md"
                frameClassName="group-hover:border-primary/40 transition-colors"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t(tool.key)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {isEnglish ? <MapEvolutionTeaser /> : null}

      <section
        className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        aria-labelledby="featured-heading"
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="featured-heading"
            className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
          >
            {t('featuredGuides')}
          </h2>
          <Link
            href={guidesHref}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          >
            {t('viewAll')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} featured locale={locale} />
          ))}
        </div>
      </section>

      {recentPosts.length > 0 ? (
        <section
          className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
          aria-labelledby="recent-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="recent-heading"
              className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
            >
              {t('latestArticles')}
            </h2>
            <Link
              href={guidesHref}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              {t('viewAll')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {isEnglish ? (
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Last reviewed 31 Aug 2026</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              Built for the live season — not a widget farm
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                FortniteTools is a solo fan project. Pages get a date when the loot pool, island, or shop rules change.
                The useful stuff is the map, tracker, shop, loadout builder, build practice, and the Chapter 7 Season 4
                (Override) hubs — not a new calculator for every search query.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I do not publish per-skin encyclopedias, leak dumps, or translated copies of the same form. If a helper
                exists, it is because I use it in-game. Corrections:{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-foreground">
                {t('blurbToolsTitle')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('blurbTools')}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-foreground">
                {t('blurbGuidesTitle')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('blurbGuides')}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-foreground">
                {t('blurbSeasonTitle')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('blurbSeason')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
