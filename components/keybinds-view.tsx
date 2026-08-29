'use client'

import { Fragment, useState } from 'react'
import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref, type AppLocale } from '@/i18n/config'

type Category = 'building' | 'combat' | 'inventory'

type Player = {
  name: string
  team: string
  keybinds: Record<string, string>
}

const ACTION_IDS = [
  'wall',
  'floor',
  'ramp',
  'roof',
  'stair',
  'edit',
  'repair',
  'crouch',
  'jump',
  'sprint',
  'reload',
  'interact',
  'slot1',
  'slot2',
  'slot3',
  'slot4',
  'slot5',
  'map',
  'inventory',
  'ping',
] as const

type ActionId = (typeof ACTION_IDS)[number]

const ACTION_CATEGORY: Record<ActionId, Category> = {
  wall: 'building',
  floor: 'building',
  ramp: 'building',
  roof: 'building',
  stair: 'building',
  edit: 'building',
  repair: 'building',
  crouch: 'combat',
  jump: 'combat',
  sprint: 'combat',
  reload: 'combat',
  interact: 'combat',
  slot1: 'inventory',
  slot2: 'inventory',
  slot3: 'inventory',
  slot4: 'inventory',
  slot5: 'inventory',
  map: 'inventory',
  inventory: 'inventory',
  ping: 'inventory',
}

const CATEGORY_IDS: Category[] = ['building', 'combat', 'inventory']

const PROS: Player[] = [
  {
    name: 'Bugha',
    team: 'Sentinels',
    keybinds: { wall: 'Q', floor: 'C', ramp: 'V', roof: 'MB4', stair: '–', edit: 'F', repair: 'H', crouch: 'L-Ctrl', jump: 'Space', sprint: 'L-Shift', reload: 'R', interact: 'E', slot1: '1', slot2: '2', slot3: '3', slot4: '4', slot5: '5', map: 'M', inventory: 'Tab', ping: 'Z' },
  },
  {
    name: 'Clix',
    team: 'NRG',
    keybinds: { wall: 'Q', floor: 'C', ramp: 'V', roof: 'F', stair: 'T', edit: 'G', repair: 'H', crouch: 'L-Ctrl', jump: 'Space', sprint: 'L-Shift', reload: 'R', interact: 'E', slot1: '1', slot2: '2', slot3: '3', slot4: '4', slot5: '5', map: 'M', inventory: 'Tab', ping: 'Z' },
  },
  {
    name: 'Mongraal',
    team: 'FaZe',
    keybinds: { wall: 'Q', floor: 'Z', ramp: 'C', roof: 'V', stair: '–', edit: 'F', repair: 'H', crouch: 'L-Ctrl', jump: 'Space', sprint: 'L-Shift', reload: 'R', interact: 'E', slot1: '1', slot2: '2', slot3: '3', slot4: '4', slot5: '5', map: 'M', inventory: 'Tab', ping: 'X' },
  },
  {
    name: 'Benjyfishy',
    team: 'NIP',
    keybinds: { wall: 'Q', floor: 'C', ramp: 'V', roof: 'T', stair: 'F', edit: 'G', repair: 'H', crouch: 'L-Ctrl', jump: 'Space', sprint: 'L-Shift', reload: 'R', interact: 'E', slot1: '1', slot2: '2', slot3: '3', slot4: '4', slot5: '5', map: 'M', inventory: 'Tab', ping: 'Z' },
  },
  {
    name: 'MrSavage',
    team: 'NRG',
    keybinds: { wall: 'Q', floor: 'C', ramp: 'V', roof: 'F', stair: 'T', edit: 'G', repair: 'H', crouch: 'L-Ctrl', jump: 'Space', sprint: 'L-Shift', reload: 'R', interact: 'E', slot1: '1', slot2: '2', slot3: '3', slot4: '4', slot5: '5', map: 'M', inventory: 'Tab', ping: 'Z' },
  },
]

function isUnique(action: string, value: string, players: Player[]) {
  const vals = players.map((p) => p.keybinds[action])
  return vals.filter((v) => v === value).length === 1
}

const TIP_IDS = ['qWall', 'sideMouse', 'editClose', 'crouchCtrl', 'avoidNumbers', 'personalise'] as const

const SEO_KEYS = ['whyMatter', 'controller'] as const

const FAQ_KEYS = [
  ['faqs.q1', 'faqs.a1'],
  ['faqs.q2', 'faqs.a2'],
  ['faqs.q3', 'faqs.a3'],
  ['faqs.q4', 'faqs.a4'],
  ['faqs.q5', 'faqs.a5'],
] as const

const KBD = ({ children }: { children: string }) => (
  <span className="inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-bold text-foreground min-w-[2rem]">
    {children}
  </span>
)

export function KeybindsView() {
  const t = useTranslations('tools.keybinds')
  const locale = useLocale() as AppLocale
  const homeHref = localizeHref(locale, '/')
  const toolsHref = localizeHref(locale, '/tools')

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [highlighted, setHighlighted] = useState<ActionId | null>(null)

  const filteredActions = activeCategory === 'all' ? ACTION_IDS : ACTION_IDS.filter((id) => ACTION_CATEGORY[id] === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="sticky left-0 bg-card px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-36">
                  {t('actionHeader')}
                </th>
                {PROS.map((p) => (
                  <th
                    key={p.name}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap min-w-[110px]"
                  >
                    <div className="font-bold text-foreground">{p.name}</div>
                    <div className="text-muted-foreground font-normal">{p.team}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORY_IDS.filter((cat) => activeCategory === 'all' || cat === activeCategory).map((cat) => (
                <Fragment key={cat}>
                  <tr className="bg-muted/30">
                    <td colSpan={PROS.length + 1} className="px-5 py-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t(`categories.${cat}`)}</span>
                    </td>
                  </tr>
                  {filteredActions
                    .filter((id) => ACTION_CATEGORY[id] === cat)
                    .map((id) => (
                      <tr
                        key={id}
                        className={`border-t border-border/50 transition-colors cursor-default ${
                          highlighted === id ? 'bg-primary/5' : 'hover:bg-muted/20'
                        }`}
                        onMouseEnter={() => setHighlighted(id)}
                        onMouseLeave={() => setHighlighted(null)}
                      >
                        <td className="sticky left-0 bg-card px-5 py-3 font-medium text-foreground whitespace-nowrap">
                          {t(`actions.${id}.label`)}
                        </td>
                        {PROS.map((p) => {
                          const val = p.keybinds[id] ?? '–'
                          const unique = isUnique(id, val, PROS)
                          return (
                            <td key={p.name} className="px-4 py-3 text-center">
                              <span className={unique ? 'opacity-50' : ''}>
                                <KBD>{val}</KBD>
                              </span>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{t('uniqueHint')}</p>

        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIP_IDS.map((id) => (
            <div key={id} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{t(`tips.${id}.title`)}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{t(`tips.${id}.body`)}</p>
            </div>
          ))}
        </section>

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
            <Link href={localizeHref(locale, '/tools/fps-settings')} className="text-primary hover:underline">
              {t('relatedFps')}
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
