'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Check, Info } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'

type Tier = 'competitive' | 'balanced' | 'quality'
type Impact = 'high' | 'medium' | 'low'
type Category = 'display' | 'graphics' | 'advanced' | 'audio'

const TIER_IDS: Tier[] = ['competitive', 'balanced', 'quality']
const CATEGORY_IDS: Category[] = ['display', 'graphics', 'advanced', 'audio']

const SETTING_IDS = [
  'windowMode',
  'resolution',
  'frameRateLimit',
  'motionBlur',
  'showFps',
  'resolution3d',
  'viewDistance',
  'shadows',
  'antiAliasing',
  'textures',
  'effects',
  'postProcessing',
  'renderingMode',
  'nvidiaReflex',
  'vsync',
  'colorblindMode',
  'soundQuality',
  'headphones3d',
  'subtitles',
] as const

type SettingId = (typeof SETTING_IDS)[number]

const SETTING_CATEGORY: Record<SettingId, Category> = {
  windowMode: 'display',
  resolution: 'display',
  frameRateLimit: 'display',
  motionBlur: 'display',
  showFps: 'display',
  resolution3d: 'graphics',
  viewDistance: 'graphics',
  shadows: 'graphics',
  antiAliasing: 'graphics',
  textures: 'graphics',
  effects: 'graphics',
  postProcessing: 'graphics',
  renderingMode: 'graphics',
  nvidiaReflex: 'advanced',
  vsync: 'advanced',
  colorblindMode: 'advanced',
  soundQuality: 'audio',
  headphones3d: 'audio',
  subtitles: 'audio',
}

const SETTING_IMPACT: Record<SettingId, Impact> = {
  windowMode: 'high',
  resolution: 'high',
  frameRateLimit: 'medium',
  motionBlur: 'high',
  showFps: 'low',
  resolution3d: 'high',
  viewDistance: 'medium',
  shadows: 'high',
  antiAliasing: 'medium',
  textures: 'low',
  effects: 'medium',
  postProcessing: 'medium',
  renderingMode: 'high',
  nvidiaReflex: 'high',
  vsync: 'high',
  colorblindMode: 'medium',
  soundQuality: 'medium',
  headphones3d: 'high',
  subtitles: 'low',
}

const IMPACT_COLORS: Record<Impact, string> = {
  high: 'text-accent border-accent/30 bg-accent/10',
  medium: 'text-primary border-primary/30 bg-primary/10',
  low: 'text-muted-foreground border-border bg-muted/50',
}

const SEO_KEYS = ['performance', 'shadows', 'windows', 'pros'] as const

const FAQ_KEYS = [
  ['faqs.q1', 'faqs.a1'],
  ['faqs.q2', 'faqs.a2'],
  ['faqs.q3', 'faqs.a3'],
  ['faqs.q4', 'faqs.a4'],
  ['faqs.q5', 'faqs.a5'],
] as const

export function FpsSettingsView() {
  const t = useTranslations('tools.fpsSettings')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [tier, setTier] = useState<Tier>('competitive')
  const [expanded, setExpanded] = useState<SettingId | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')

  const filtered = activeCategory === 'all' ? SETTING_IDS : SETTING_IDS.filter((id) => SETTING_CATEGORY[id] === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-12">
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
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
            {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {t('presetTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {TIER_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTier(id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  tier === id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-sm font-bold uppercase tracking-wide">{t(`tiers.${id}.label`)}</span>
                  {tier === id && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-xs leading-relaxed">{t(`tiers.${id}.desc`)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('categoryAll')}
          </button>
          {CATEGORY_IDS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filtered.map((id) => {
            const impact = SETTING_IMPACT[id]
            const recommended = t(`settings.${id}.${tier}`)
            const isOpen = expanded === id
            return (
              <div key={id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-foreground">{t(`settings.${id}.name`)}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${IMPACT_COLORS[impact]}`}>
                        {t(`impactLabels.${impact}`)}
                      </span>
                      <span className="text-xs text-muted-foreground">{t(`categories.${SETTING_CATEGORY[id]}`)}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {recommended}
                    </span>
                    <Info className={`h-4 w-4 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-border bg-muted/20 px-5 py-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(`settings.${id}.why`)}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      <span className="text-muted-foreground">
                        {t('settingsCol.competitive')}: <span className="font-semibold text-foreground">{t(`settings.${id}.competitive`)}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {t('settingsCol.balanced')}: <span className="font-semibold text-foreground">{t(`settings.${id}.balanced`)}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {t('settingsCol.quality')}: <span className="font-semibold text-foreground">{t(`settings.${id}.quality`)}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">{t('seoTitle')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
            {SEO_KEYS.map((key) => (
              <div key={key}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{t(`seo.${key}.h`)}</h3>
                <p>{t(`seo.${key}.p`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">{t('faqTitle')}</h2>
          <div className="space-y-5">
            {FAQ_KEYS.map(([q, a]) => (
              <div key={q}>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{t(q)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(a)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-10 space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">{t('relatedTitle')}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('relatedBefore')}{' '}
            <Link href={localizeHref(locale, '/tools/sensitivity-calculator')} className="text-primary hover:underline">
              {t('relatedSens')}
            </Link>
            {t('relatedMid1')}{' '}
            <Link href={localizeHref(locale, '/tools/keybinds')} className="text-primary hover:underline">
              {t('relatedKeybinds')}
            </Link>
            {t('relatedMid2')}{' '}
            <Link href={toolsHref} className="text-primary hover:underline">
              {t('relatedHub')}
            </Link>
            {t('relatedAfter')}
          </p>
        </section>
      </div>
    </main>
  )
}
