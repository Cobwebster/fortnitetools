'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref, type AppLocale } from '@/i18n/config'
import { PlayerStatsClient } from '@/components/PlayerStatsClient'
import type { StatsAccountType, StatsTimeWindow } from '@/lib/fortnite-stats'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4'] as const

const SHOW_KEYS = [
  { h: 'headlineTitle', b: 'headlineBody' },
  { h: 'modeTitle', b: 'modeBody' },
  { h: 'inputTitle', b: 'inputBody' },
  { h: 'bpTitle', b: 'bpBody' },
] as const

const FAQ_KEYS = [
  ['faqs.q1', 'faqs.a1'],
  ['faqs.q2', 'faqs.a2'],
  ['faqs.q3', 'faqs.a3'],
  ['faqs.q4', 'faqs.a4'],
] as const

export function PlayerStatsView({
  initialName = '',
  initialAccountType = 'epic',
  initialTimeWindow = 'lifetime',
  configured,
}: {
  initialName?: string
  initialAccountType?: StatsAccountType
  initialTimeWindow?: StatsTimeWindow
  configured: boolean
}) {
  const t = useTranslations('tools.playerStats')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <Link href={toolsHref} className="hover:text-primary transition-colors">
              {t('tools')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t('breadcrumb')}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
            {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span> {t('titleSuffix')}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Suspense
          fallback={
            <div className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
              {t('loadingFallback')}
            </div>
          }
        >
          <PlayerStatsClient
            initialName={initialName}
            initialAccountType={initialAccountType}
            initialTimeWindow={initialTimeWindow}
            configured={configured}
          />
        </Suspense>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
            {t('trackerTitle')}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">{t('trackerBody')}</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-muted-foreground max-w-3xl">
            {STEP_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
            {t('showTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
            {SHOW_KEYS.map((section) => (
              <div key={section.h}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{t(section.h)}</h3>
                <p>{t(section.b)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
            {t('faqTitle')}
          </h2>
          <div className="space-y-5 max-w-3xl">
            {FAQ_KEYS.map(([q, a]) => (
              <div key={q}>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{t(q)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(a)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">
            {t('relatedTitle')}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li>
              <Link href={localizeHref(locale, '/tools/kd-calculator')} className="text-primary hover:underline">
                {t('relatedKd')}
              </Link>
            </li>
            {locale === 'en' ? (
              <li>
                <Link href={localizeHref(locale, '/tools/loadout-builder')} className="text-primary hover:underline">
                  {t('relatedLoadout')}
                </Link>
              </li>
            ) : null}
            <li>
              <Link href={localizeHref(locale, '/fortnite-map')} className="text-primary hover:underline">
                {t('relatedMap')}
              </Link>
            </li>
            <li>
              <Link href={toolsHref} className="text-primary hover:underline">
                {t('relatedAll')}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
