import type { MetadataRoute } from 'next'
import { posts, categories } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fortnitetools.com'

  const toolRoutes: MetadataRoute.Sitemap = [
    '/tools',
    '/tools/sensitivity-calculator',
    '/tools/vbucks-calculator',
    '/tools/battle-pass-xp-calculator',
    '/tools/weapon-damage-calculator',
    '/tools/kd-calculator',
    '/tools/fps-settings',
    '/tools/keybinds',
    '/tools/zone-timer',
  ].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/guides`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/guides/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/guides/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...toolRoutes, ...categoryRoutes, ...postRoutes]
}
