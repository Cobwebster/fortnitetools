import { siteConfig } from './site'

/** Hosted MP4 on this origin — Google indexes these as page video enhancements. */
export type PostVideo = {
  src: string
  poster: string
  title: string
  description: string
  uploadDate: string
  durationSeconds: number
  width: number
  height: number
  credit?: string
}

export function absoluteAssetUrl(path: string) {
  return `${siteConfig.url}${path}`
}

export function iso8601Duration(seconds: number) {
  const total = Math.max(1, Math.round(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  let out = 'PT'
  if (hours) out += `${hours}H`
  if (minutes) out += `${minutes}M`
  out += `${secs}S`
  return out
}

export function videoPageId(pagePath: string) {
  return `${siteConfig.url}${pagePath}#video`
}

/** VideoObject JSON-LD. contentUrl (the MP4) is what Google needs for a native-file enhancement. */
export function videoJsonLd(video: PostVideo, pagePath: string) {
  const pageUrl = `${siteConfig.url}${pagePath}`
  const thumbnailUrl = absoluteAssetUrl(video.poster)
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': videoPageId(pagePath),
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: iso8601Duration(video.durationSeconds),
    contentUrl: absoluteAssetUrl(video.src),
    url: pageUrl,
    width: video.width,
    height: video.height,
    encodingFormat: 'video/mp4',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    inLanguage: 'en',
    ...(video.credit
      ? {
          author: {
            '@type': 'Person',
            name: video.credit,
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function sitemapVideo(video: PostVideo) {
  return {
    title: video.title,
    thumbnail_loc: absoluteAssetUrl(video.poster),
    description: video.description,
    content_loc: absoluteAssetUrl(video.src),
    duration: Math.round(video.durationSeconds),
    publication_date: video.uploadDate,
    family_friendly: 'yes' as const,
    live: 'no' as const,
    requires_subscription: 'no' as const,
    ...(video.credit ? { tag: video.credit } : {}),
  }
}
