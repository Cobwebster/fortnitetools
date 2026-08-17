'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { FortniteMapClient } from '@/components/FortniteMapClient'
import { defaultLocale, localizeHref, type AppLocale } from '@/i18n/config'

const FAQ_KEYS = [1, 2, 3, 4, 5] as const

export function FortniteMapView() {
  const t = useTranslations('fortniteMap')
  const locale = useLocale() as AppLocale
  const isEnglish = locale === defaultLocale
  const homeHref = localizeHref(locale, '/')
  const guidesHref = localizeHref(locale, '/guides')

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav
            className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href={homeHref} className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t('hero')}
          </p>
          {isEnglish ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {t('preferReading')}{' '}
              <Link
                href="/guides/how-to/how-to-extract-sprites-fortnite"
                className="font-semibold text-primary hover:opacity-80"
              >
                {t('linkExtractSprites')}
              </Link>
              {' · '}
              <Link
                href="/guides/map/fortnite-map-all-locations-guide"
                className="font-semibold text-primary hover:opacity-80"
              >
                {t('linkPoiGuide')}
              </Link>
              {' · '}
              <Link href="/guides/map" className="font-semibold text-primary hover:opacity-80">
                {t('linkMapGuides')}
              </Link>
              {' · '}
              <Link
                href="/guides/map/fortnite-loot-guide-best-spots"
                className="font-semibold text-primary hover:opacity-80"
              >
                {t('linkLandingSpots')}
              </Link>
              {' · '}
              <Link href="/drops" className="font-semibold text-primary hover:opacity-80">
                Drop rotate guides
              </Link>
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              {t('preferReading')}{' '}
              <Link href={guidesHref} className="font-semibold text-primary hover:opacity-80">
                {t('linkLocaleGuides')}
              </Link>
              {' · '}
              <Link
                href={localizeHref(locale, '/tools')}
                className="font-semibold text-primary hover:opacity-80"
              >
                {t('moreAll')}
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <FortniteMapClient />
        <p className="mt-4 text-xs text-muted-foreground">
          {t('apiCreditBefore')}{' '}
          <a
            href="https://fortnite-api.com/"
            className="underline hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Fortnite-API
          </a>
          {t('apiCreditAfter')}
        </p>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('howTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('howBody')}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
              <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <span className="font-semibold text-foreground">{t('howLiveTitle')}</span>
                {' — '}
                {t('howLiveBody')}
              </li>
              <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <span className="font-semibold text-foreground">{t('howExtractTitle')}</span>
                {' — '}
                {t('howExtractBody')}
              </li>
              <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <span className="font-semibold text-foreground">{t('howPoiTitle')}</span>
                {' — '}
                {t('howPoiBody')}
              </li>
              <li className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <span className="font-semibold text-foreground">{t('howLootTitle')}</span>
                {' — '}
                {t('howLootBody')}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('extractTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isEnglish ? (
                <>
                  {t('extractBodyBefore')}{' '}
                  <Link
                    href="/guides/how-to/how-to-extract-sprites-fortnite"
                    className="font-semibold text-primary hover:underline"
                  >
                    {t('extractLink')}
                  </Link>
                  .
                </>
              ) : (
                t('extractBodyLocale')
              )}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('locationsTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('locationsBody')}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {[
                { title: t('hotTitle'), body: t('hotBody') },
                { title: t('balancedTitle'), body: t('balancedBody') },
                { title: t('edgeTitle'), body: t('edgeBody') },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-lg border border-border bg-background/60 px-4 py-4"
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('landingTitle')}
            </h2>
            <div className="mt-4 space-y-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                <span className="font-semibold text-foreground">{t('landingFight')}</span>{' '}
                {t('landingFightBody')}
              </p>
              <p>
                <span className="font-semibold text-foreground">{t('landingRanked')}</span>{' '}
                {t('landingRankedBody')}
              </p>
              <p>
                <span className="font-semibold text-foreground">{t('landingSquads')}</span>{' '}
                {t('landingSquadsBody')}
              </p>
              {isEnglish ? (
                <p>
                  {t('landingMoreBefore')}{' '}
                  <Link
                    href="/guides/map/fortnite-loot-guide-best-spots"
                    className="font-semibold text-primary hover:opacity-80"
                  >
                    {t('landingLootGuide')}
                  </Link>{' '}
                  {t('landingAnd')}{' '}
                  <Link
                    href="/guides/map/fortnite-map-all-locations-guide"
                    className="font-semibold text-primary hover:opacity-80"
                  >
                    {t('landingPoiGuide')}
                  </Link>
                  {' '}and the{' '}
                  <Link href="/drops" className="font-semibold text-primary hover:opacity-80">
                    drop rotate guides
                  </Link>
                  .
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('faqTitle')}
            </h2>
            <div className="mt-5 space-y-4">
              {FAQ_KEYS.map((n) => (
                <article
                  key={n}
                  className="rounded-lg border border-border bg-background/60 px-4 py-4"
                >
                  <h3 className="text-base font-semibold text-foreground">{t(`faqs.q${n}`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`faqs.a${n}`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              {t('moreTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('moreBody')}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary">
              <li>
                <Link href={localizeHref(locale, '/tools/zone-timer')} className="hover:opacity-80">
                  {t('moreZone')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizeHref(locale, '/tools/weapon-damage-calculator')}
                  className="hover:opacity-80"
                >
                  {t('moreDamage')}
                </Link>
              </li>
              {isEnglish ? (
                <li>
                  <Link
                    href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                    className="hover:opacity-80"
                  >
                    {t('moreTier')}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={guidesHref} className="hover:opacity-80">
                    {t('linkLocaleGuides')}
                  </Link>
                </li>
              )}
              <li>
                <Link href={localizeHref(locale, '/tools')} className="hover:opacity-80">
                  {t('moreAll')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
