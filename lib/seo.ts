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
  tags?: string[]
  index?: boolean
  video?: PostVideo
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
  tags,
  index = true,
  video,
}: MetaInput): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = `${siteConfig.url}${siteConfig.ogImage}`
  const poster = video ? absoluteAssetUrl(video.poster) : ogImage

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
            { url: ogImage, width: 1200, height: 630, alt: siteConfig.name },
          ]
        : [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
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
  image,
  video,
}: {
  title: string
  description: string
  path: string
  datePublished: string
  image?: string
  video?: PostVideo
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteConfig.url}${path}`,
    datePublished,
    image: `${siteConfig.url}${image || siteConfig.ogImage}`,
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
