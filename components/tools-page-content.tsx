'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ToolsCatalogClient } from '@/components/ToolsCatalogClient'
import { defaultLocale, localizeHref, type AppLocale } from '@/i18n/config'

export function ToolsPageContent() {
  const t = useTranslations('toolsPage')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const isEnglish = locale === defaultLocale

  const aboutBlocks = [
    ...(isEnglish
      ? ([{ title: t('aboutSkinRarityTitle'), body: t('aboutSkinRarity') }] as const)
      : []),
    { title: t('aboutSensTitle'), body: t('aboutSens') },
    { title: t('aboutVbucksTitle'), body: t('aboutVbucks') },
    { title: t('aboutBpTitle'), body: t('aboutBp') },
    { title: t('aboutDamageTitle'), body: t('aboutDamage') },
    { title: t('aboutTrackerTitle'), body: t('aboutTracker') },
  ]

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
            {t('titlePrefix')} <span className="text-primary">{t('title')}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ToolsCatalogClient />
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
            {t('aboutTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutBlocks.map((block) => (
              <div key={block.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  {block.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
