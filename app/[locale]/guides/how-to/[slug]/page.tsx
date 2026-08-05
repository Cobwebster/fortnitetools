import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuideArticleView } from '@/components/guide-article-view'
import { getLocalizedPosts, getPostBySlug, localizedGuideSlugs } from '@/lib/posts'
import { assertPrefixedLocale } from '@/i18n/tool-metadata'
import { getMessages } from '@/i18n/get-messages'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'
import {
  guideMessageKey,
  isPrefixedLocale,
  localizeHref,
  type PrefixedLocale,
} from '@/i18n/config'
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return localizedGuideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isPrefixedLocale(raw)) return {}
  const locale = raw as PrefixedLocale
  const post = getPostBySlug(slug)
  const key = guideMessageKey(slug)
  if (!post || !key) return {}

  const messages = await getMessages(locale)
  const article = (messages as { guides?: Record<string, { metaTitle?: string; metaDescription?: string; title?: string; excerpt?: string }> })
    .guides?.[key]
  const path = `/guides/${post.category}/${post.slug}`
  const title = article?.metaTitle || article?.title || post.title
  const description = article?.metaDescription || article?.excerpt || post.excerpt

  return {
    title,
    description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, path),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(locale, path),
      locale,
      type: 'article',
    },
  }
}

export default async function LocaleGuideArticlePage({ params }: Props) {
  const { locale: raw, slug } = await params
  const locale = assertPrefixedLocale(raw)
  const post = getPostBySlug(slug)
  const key = guideMessageKey(slug)
  if (!post || !key || post.category !== 'how-to') notFound()

  const messages = await getMessages(locale)
  const article = (messages as { guides?: Record<string, { title?: string; excerpt?: string }> }).guides?.[key]
  const title = article?.title || post.title
  const excerpt = article?.excerpt || post.excerpt
  const path = `/guides/${post.category}/${post.slug}`

  const localized = getLocalizedPosts()
  const postIndex = localized.findIndex((p) => p.slug === post.slug)
  const prevPost = localized[postIndex - 1]
  const nextPost = localized[postIndex + 1]
  const recommended = localized.filter((p) => p.slug !== post.slug).slice(0, 2)

  const articleLd = articleJsonLd({
    title,
    description: excerpt,
    path: localizeHref(locale, path),
    datePublished: post.date,
    image: post.image,
  })

  const crumbsLd = breadcrumbJsonLd([
    { name: 'Home', path: localizeHref(locale, '/') },
    { name: 'Guides', path: localizeHref(locale, '/guides') },
    { name: 'How-To', path: localizeHref(locale, '/guides/how-to') },
    { name: title, path: localizeHref(locale, path) },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
      <Navbar />
      <GuideArticleView
        post={post}
        recommended={recommended}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      <Footer />
    </>
  )
}
