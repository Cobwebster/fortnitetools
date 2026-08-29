'use client'

import Link from '@/components/link'
import { useTranslations, useLocale } from 'next-intl'
import { FortniteIcon } from '@/components/fortnite-icon'
import { PostCard } from '@/components/post-card'
import { getLocalizedPosts, type Category } from '@/lib/posts'
import { CATEGORY_ICONS } from '@/lib/site-icons'
import { guideMessageKey, localizeHref, type AppLocale } from '@/i18n/config'

export function GuidesCategoryContent({ category }: { category: Category }) {
  const t = useTranslations('guides.hub')
  const tArticles = useTranslations('guides')
  const locale = useLocale() as AppLocale
  const catPosts = getLocalizedPosts().filter((p) => p.category === category)

  return (
    <main>
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
            <li>
              <Link href={localizeHref(locale, '/')} className="hover:text-primary transition-colors">
                {t('home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={localizeHref(locale, '/guides')}
                className="hover:text-primary transition-colors"
              >
                {t('eyebrow')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium">{t('howTo')}</li>
          </ol>
        </div>
      </nav>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <FortniteIcon
              src={CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] ?? CATEGORY_ICONS['how-to']}
              alt={t('categoryTitle')}
              size="lg"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t('categoryEyebrow')}
              </p>
              <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
                {t('categoryTitle')}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t('categoryDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category">
            <ul className="flex flex-wrap gap-2" role="list">
              <li>
                <Link
                  href={localizeHref(locale, '/guides')}
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                >
                  {t('all')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizeHref(locale, '/guides/how-to')}
                  className="rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                  aria-current="page"
                >
                  {t('howTo')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catPosts.map((post) => {
            const key = guideMessageKey(post.slug)
            return (
              <PostCard
                key={post.slug}
                post={post}
                featured
                locale={locale}
                title={key ? tArticles(`${key}.title`) : undefined}
                excerpt={key ? tArticles(`${key}.excerpt`) : undefined}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}
