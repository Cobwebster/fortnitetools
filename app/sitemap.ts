import type { MetadataRoute } from 'next'
import { posts, categories } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const toolRoutes: MetadataRoute.Sitemap = [
    '/season-countdown',
    '/xp-calculator',
    '/free-cosmetics',
    '/fortnite-map',
    '/map-rotation',
    '/map-evolution',
    '/tools',
    '/weapons',
    '/weapon-changes',
    '/tools/player-stats',
    '/codes',
    '/tools/item-shop',
    '/tools/skin-rarity-calculator',
    '/tools/loadout-builder',
    '/tools/sensitivity-calculator',
    '/tools/vbucks-calculator',
    '/tools/battle-pass-xp-calculator',
    '/tools/weapon-damage-calculator',
    '/tools/kd-calculator',
    '/tools/fps-settings',
    '/tools/keybinds',
    '/tools/zone-timer',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/fortnite-map' || path === '/map-rotation' || path === '/map-evolution' || path === '/codes' || path === '/weapons' || path === '/weapon-changes' || path === '/season-countdown' || path === '/xp-calculator' || path === '/free-cosmetics' || path === '/tools/item-shop' || path === '/tools/loadout-builder' || path === '/tools/player-stats' || path === '/tools/skin-rarity-calculator' ? 0.95 : 0.85,
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
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
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
