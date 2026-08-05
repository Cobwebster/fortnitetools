'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { PostCard } from '@/components/post-card'
import { getLocalizedPosts } from '@/lib/posts'
import { guideMessageKey, localizeHref, type AppLocale } from '@/i18n/config'

export function GuidesHubContent() {
  const t = useTranslations('guides.hub')
  const tArticles = useTranslations('guides')
  const locale = useLocale() as AppLocale
  const posts = getLocalizedPosts()

  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('eyebrow')}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('description')}</p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category">
            <ul className="flex flex-wrap gap-2" role="list">
              <li>
                <Link
                  href={localizeHref(locale, '/guides')}
                  className="rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                  aria-current="page"
                >
                  {t('all')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizeHref(locale, '/guides/how-to')}
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
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
          {posts.map((post) => {
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
