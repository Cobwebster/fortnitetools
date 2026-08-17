'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Check } from 'lucide-react'
import { localizeHref, type AppLocale } from '@/i18n/config'
import { FortniteIcon } from '@/components/fortnite-icon'
import { toolIcon } from '@/lib/site-icons'

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

const TIER_ICONS: Record<Tier, string> = {
  competitive: '/images/loadout/pepper.png',
  balanced: '/images/loadout/chug_splash.png',
  quality: '/images/loadout/chug_jug.png',
}

const CATEGORY_ICONS: Record<Category | 'all', string> = {
  all: '/images/icons/glider.png',
  display: '/images/loadout/rift.png',
  graphics: '/images/loadout/pulse_scanner.png',
  advanced: '/images/loadout/shield_breaker_emp.png',
  audio: '/images/loadout/shock_rocks.png',
}

const SETTING_ICONS: Record<SettingId, string> = {
  windowMode: '/images/loadout/rift.png',
  resolution: '/images/loadout/extending_focus.png',
  frameRateLimit: '/images/loadout/slap_juice.png',
  motionBlur: '/images/loadout/unstable_bounce_grenade.webp',
  showFps: '/images/loadout/pulse_scanner.png',
  resolution3d: '/images/loadout/seven_sliders.png',
  viewDistance: '/images/icons/map.png',
  shadows: '/images/icons/storm.png',
  antiAliasing: '/images/loadout/flowberry.png',
  textures: '/images/loadout/mat_stone.png',
  effects: '/images/loadout/chaos_exploder.png',
  postProcessing: '/images/loadout/golden_apple.png',
  renderingMode: '/images/loadout/mat_metal.png',
  nvidiaReflex: '/images/loadout/shockwave.png',
  vsync: '/images/loadout/crash_pad.png',
  colorblindMode: '/images/loadout/apple.png',
  soundQuality: '/images/loadout/cluster_clinger.png',
  headphones3d: '/images/loadout/impulse.png',
  subtitles: '/images/loadout/bandages.png',
}

const SEO_ICONS = {
  performance: '/images/loadout/slap_juice.png',
  shadows: '/images/icons/storm.png',
  windows: '/images/loadout/rift.png',
  pros: '/images/icons/crown.png',
} as const

const RELATED = [
  { href: '/tools/sensitivity-calculator', labelKey: 'relatedSens' as const, icon: '/images/loadout/hunting_rifle.png' },
  { href: '/tools/keybinds', labelKey: 'relatedKeybinds' as const, icon: '/images/icons/pickaxe.png' },
  { href: '/tools', labelKey: 'relatedHub' as const, icon: '/images/loadout/mat_wood.png' },
] as const

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
          <div className="flex items-start gap-4">
            <FortniteIcon
              src={toolIcon('/tools/fps-settings')}
              alt={t('breadcrumb')}
              size="lg"
              frameClassName="mt-1 border-primary/40 bg-primary/10"
            />
            <div>
              <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
                {t('titlePrefix')} <span className="text-primary">{t('titleHighlight')}</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('hero')}</p>
            </div>
          </div>
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
                <div className="mb-2 flex items-center gap-3">
                  <FortniteIcon src={TIER_ICONS[id]} alt={t(`tiers.${id}.label`)} size="sm" />
                  <span className="font-display text-sm font-bold uppercase tracking-wide">{t(`tiers.${id}.label`)}</span>
                  {tier === id ? <Check className="ml-auto h-4 w-4 text-primary" /> : null}
                </div>
                <p className="text-xs leading-relaxed">{t(`tiers.${id}.desc`)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(['all', ...CATEGORY_IDS] as const).map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <FortniteIcon
                  src={CATEGORY_ICONS[cat]}
                  alt={cat === 'all' ? t('categoryAll') : t(`categories.${cat}`)}
                  size="xs"
                  frameClassName={active ? 'border-white/30 bg-black/30' : ''}
                />
                {cat === 'all' ? t('categoryAll') : t(`categories.${cat}`)}
              </button>
            )
          })}
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
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors sm:gap-4 sm:px-5 sm:py-4"
                  onClick={() => setExpanded(isOpen ? null : id)}
                  aria-expanded={isOpen}
                >
                  <FortniteIcon src={SETTING_ICONS[id]} alt={t(`settings.${id}.name`)} size="sm" />
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
            {SEO_KEYS.map((key) => (
              <div key={key} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <FortniteIcon src={SEO_ICONS[key]} alt={t(`seo.${key}.h`)} size="md" frameClassName="mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{t(`seo.${key}.h`)}</h3>
                  <p>{t(`seo.${key}.p`)}</p>
                </div>
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

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">{t('relatedTitle')}</h2>
          <ul className="flex flex-wrap gap-3">
            {RELATED.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizeHref(locale, item.href)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <FortniteIcon src={item.icon} alt={t(item.labelKey)} size="sm" frameClassName="border-transparent bg-transparent" />
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
