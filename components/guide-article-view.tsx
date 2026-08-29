'use client'

import Image from 'next/image'
import Link from '@/components/link'
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { PostCard } from '@/components/post-card'
import { GuideMarkdown } from '@/components/guide-markdown'
import { getCategoryLabel, formatDate, type Post } from '@/lib/posts'
import { guideMessageKey, localizeHref, type AppLocale } from '@/i18n/config'

type Props = {
  post: Post
  recommended: Post[]
  prevPost?: Post
  nextPost?: Post
}

export function GuideArticleView({ post, recommended, prevPost, nextPost }: Props) {
  const t = useTranslations('guides.hub')
  const tGuides = useTranslations('guides')
  const locale = useLocale() as AppLocale
  const key = guideMessageKey(post.slug)
  const title = key ? tGuides(`${key}.title`) : post.title
  const excerpt = key ? tGuides(`${key}.excerpt`) : post.excerpt
  const content = key ? tGuides(`${key}.content`) : post.content

  const guidesHref = localizeHref(locale, '/guides')
  const categoryHref = localizeHref(locale, `/guides/${post.category}`)
  const homeHref = localizeHref(locale, '/')

  return (
    <main>
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
            <li>
              <Link href={homeHref} className="hover:text-primary transition-colors">
                {t('home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={guidesHref} className="hover:text-primary transition-colors">
                {t('eyebrow')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="hover:text-primary transition-colors">
                {getCategoryLabel(post.category)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-foreground font-medium max-w-[200px]">{title}</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
            {post.image ? (
              <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
                <Image
                  src={post.image}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  itemProp="image"
                />
              </div>
            ) : null}

            <header className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={categoryHref}
                  className="rounded bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
                >
                  {getCategoryLabel(post.category)}
                </Link>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('minRead', { minutes: post.readTime })}
                </span>
              </div>
              <h1
                className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-4xl text-balance"
                itemProp="headline"
              >
                {title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground" itemProp="description">
                {excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={post.date} itemProp="datePublished">
                  {formatDate(post.date)}
                </time>
                <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">FortniteTools.com</span>
                </span>
              </div>
            </header>

            <div className="mt-8 prose prose-invert prose-lg max-w-none" itemProp="articleBody">
              {content ? (
                <GuideMarkdown content={content} />
              ) : (
                <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                  <p className="text-muted-foreground">{t('comingSoon')}</p>
                </div>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <nav
              aria-label="Article navigation"
              className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8"
            >
              {prevPost ? (
                <Link
                  href={localizeHref(locale, `/guides/${prevPost.category}/${prevPost.slug}`)}
                  className="group flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t('previous')}
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {guideMessageKey(prevPost.slug)
                      ? tGuides(`${guideMessageKey(prevPost.slug)}.title`)
                      : prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={localizeHref(locale, `/guides/${nextPost.category}/${nextPost.slug}`)}
                  className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors text-right"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {t('next')} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {guideMessageKey(nextPost.slug)
                      ? tGuides(`${guideMessageKey(nextPost.slug)}.title`)
                      : nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>

          <aside className="space-y-8">
            {recommended.length > 0 && (
              <section aria-labelledby="related-heading">
                <h2
                  id="related-heading"
                  className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4"
                >
                  {t('related')}
                </h2>
                <div className="flex flex-col gap-3">
                  {recommended.map((p) => {
                    const k = guideMessageKey(p.slug)
                    return (
                      <PostCard
                        key={p.slug}
                        post={p}
                        locale={locale}
                        title={k ? tGuides(`${k}.title`) : undefined}
                        excerpt={k ? tGuides(`${k}.excerpt`) : undefined}
                      />
                    )
                  })}
                </div>
              </section>
            )}

            <section aria-labelledby="categories-sidebar-heading">
              <h2
                id="categories-sidebar-heading"
                className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4"
              >
                {t('browseCategories')}
              </h2>
              <nav>
                <ul className="flex flex-col gap-2" role="list">
                  <li>
                    <Link
                      href={localizeHref(locale, '/guides/how-to')}
                      className="block rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                    >
                      {t('howTo')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
