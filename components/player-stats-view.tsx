'use client'

import { Suspense } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref, type AppLocale } from '@/i18n/config'
import { FortniteIcon } from '@/components/fortnite-icon'
import { PlayerStatsClient } from '@/components/PlayerStatsClient'
import { toolIcon } from '@/lib/site-icons'
import type { StatsAccountType, StatsTimeWindow } from '@/lib/fortnite-stats'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4'] as const

const SHOW_SECTIONS = [
  { h: 'headlineTitle', b: 'headlineBody', icon: '/images/icons/crown.png' },
  { h: 'modeTitle', b: 'modeBody', icon: '/images/loadout/pulse_scanner.png' },
  { h: 'inputTitle', b: 'inputBody', icon: '/images/icons/pickaxe.png' },
  { h: 'bpTitle', b: 'bpBody', icon: '/images/icons/battle_pass.png' },
] as const

const FAQ_KEYS = [
  ['faqs.q1', 'faqs.a1'],
  ['faqs.q2', 'faqs.a2'],
  ['faqs.q3', 'faqs.a3'],
  ['faqs.q4', 'faqs.a4'],
] as const

const RELATED = [
  { href: '/tools/kd-calculator', labelKey: 'relatedKd' as const, icon: '/images/loadout/heavy_impact.png' },
  { href: '/tools/loadout-builder', labelKey: 'relatedLoadout' as const, icon: '/images/loadout/flex_smg.png', enOnly: true },
  { href: '/fortnite-map', labelKey: 'relatedMap' as const, icon: '/images/loadout/pulse_scanner.png' },
  { href: '/tools', labelKey: 'relatedAll' as const, icon: '/images/loadout/mat_wood.png' },
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
          <div className="flex items-start gap-4">
            <FortniteIcon
              src={toolIcon('/tools/player-stats')}
              alt={t('breadcrumb')}
              size="lg"
              frameClassName="mt-1 border-primary/40 bg-primary/10"
            />
            <div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
                {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>{' '}
                {t('titleSuffix')}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
            </div>
          </div>
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
          <div className="mb-3 flex items-center gap-3">
            <FortniteIcon src="/images/icons/crown.png" alt={t('trackerTitle')} size="sm" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {t('trackerTitle')}
            </h2>
          </div>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SHOW_SECTIONS.map((section) => (
              <div
                key={section.h}
                className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
              >
                <FortniteIcon src={section.icon} alt={t(section.h)} size="md" frameClassName="mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    {t(section.h)}
                  </h3>
                  <p>{t(section.b)}</p>
                </div>
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
          <ul className="flex flex-wrap gap-3">
            {RELATED.map((item) => {
              if ('enOnly' in item && item.enOnly && locale !== 'en') return null
              return (
                <li key={item.href}>
                  <Link
                    href={localizeHref(locale, item.href)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <FortniteIcon src={item.icon} alt={t(item.labelKey)} size="sm" frameClassName="border-transparent bg-transparent" />
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
