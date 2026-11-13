import type { Metadata } from 'next'
import { siteConfig } from './site'
import { absoluteAssetUrl, videoPageId, videoJsonLd, type PostVideo } from './guide-video'

type MetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  /** Site-relative path or absolute URL for Open Graph / Twitter */
  image?: string
  index?: boolean
  video?: PostVideo
}

function absoluteMetaImage(image?: string): string {
  if (!image) return `${siteConfig.url}${siteConfig.ogImage}`
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  image,
  index = true,
  video,
}: MetaInput): Metadata {
  const url = `${siteConfig.url}${path}`
  const defaultOg = `${siteConfig.url}${siteConfig.ogImage}`
  const shareImage = absoluteMetaImage(image)
  const poster = video ? absoluteAssetUrl(video.poster) : shareImage

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    ...(index
      ? {}
      : {
          robots: { index: false, follow: true },
        }),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      images: video
        ? [
            { url: poster, width: video.width, height: video.height, alt: video.title },
            { url: shareImage !== poster ? shareImage : defaultOg, width: 1200, height: 630, alt: title },
          ]
        : [{ url: shareImage, width: 1200, height: 630, alt: title }],
      ...(video
        ? {
            videos: [
              {
                url: absoluteAssetUrl(video.src),
                secureUrl: absoluteAssetUrl(video.src),
                type: 'video/mp4',
                width: video.width,
                height: video.height,
              },
            ],
          }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [poster],
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
  keywords,
  articleSection,
  video,
}: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string
  keywords?: string[]
  articleSection?: string
  video?: PostVideo
}) {
  const imageUrl =
    image && (image.startsWith('http://') || image.startsWith('https://'))
      ? image
      : `${siteConfig.url}${image || siteConfig.ogImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteConfig.url}${path}`,
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl,
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    ...(articleSection ? { articleSection } : {}),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}${path}`,
    ...(video
      ? {
          video: { '@id': videoPageId(path) },
          associatedMedia: { '@id': videoPageId(path) },
        }
      : {}),
  }
}

export { videoJsonLd }

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function webApplicationJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${siteConfig.url}${path}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}
