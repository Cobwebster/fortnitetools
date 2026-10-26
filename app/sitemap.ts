import type { MetadataRoute } from 'next'
import { posts, categories } from '@/lib/posts'
import { siteConfig } from '@/lib/site'
import { localizedGuidePaths, localizedToolSlugs, prefixedLocales } from '@/i18n/config'
import { fetchLiveSets } from '@/lib/cosmetic-sets'
import { DROP_GUIDES } from '@/lib/drop-guides'
import { SEASON_HUB_REVIEWED_ISO } from '@/lib/season-hub'
import { WEAPON_CATALOG } from '@/lib/weapons-catalog'
import { guidesPageHref, guidesTotalPages } from '@/lib/guides-pagination'
import { listPublicLockers } from '@/lib/lockers-db'

const FLAGSHIP = new Set([
  '/fortnite-map',
  '/stats',
  '/weapons',
  '/weapon-changes',
  '/ranked',
  '/status',
  '/season',
  '/season-countdown',
  '/codes',
  '/free-cosmetics',
  '/tools/item-shop',
  '/tools/player-stats',
  '/tools/loadout-builder',
  '/tools/fortnite-build-simulator',
  '/tools/skin-rarity-calculator',
  '/upload',
  '/map-rotation',
  '/drops',
  '/xp-calculator',
])

const CALC_OR_THIN = new Set([
  '/tools/sensitivity-calculator',
  '/tools/vbucks-calculator',
  '/tools/fps-settings',
  '/tools/keybinds',
  '/tools/zone-timer',
  '/player-count',
  '/map-evolution',
  '/creator-code',
])

const GSC_PUSH_GUIDES = new Set([
  'how-to-redeem-fortnite-code',
  'how-to-refund-fortnite-skins',
  'how-much-is-fortnite-battle-pass',
  'fortnite-treasure-hunters',
])

function toolPriority(path: string): number {
  if (FLAGSHIP.has(path) || path.startsWith('/drops/')) return 0.9
  if (CALC_OR_THIN.has(path)) return 0.55
  return 0.7
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const liveSets = await fetchLiveSets()
  const hubModified = new Date(SEASON_HUB_REVIEWED_ISO)

  const localeRoutes: MetadataRoute.Sitemap = prefixedLocales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: hubModified,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${base}/${locale}/tools`,
      lastModified: hubModified,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    {
      url: `${base}/${locale}/fortnite-map`,
      lastModified: hubModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...localizedGuidePaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: hubModified,
      changeFrequency: 'weekly' as const,
      priority: path === '/guides' ? 0.75 : 0.6,
    })),
    ...localizedToolSlugs
      .filter(
        (slug) =>
          slug !== 'kd-calculator' &&
          slug !== 'battle-pass-xp-calculator' &&
          slug !== 'weapon-damage-calculator'
      )
      .map((slug) => ({
        url: `${base}/${locale}/tools/${slug}`,
        lastModified: hubModified,
        changeFrequency: 'weekly' as const,
        priority: slug === 'player-stats' ? 0.8 : 0.55,
      })),
  ])

  const toolPaths = [
    '/fortnite-map',
    '/stats',
    '/weapons',
    '/weapon-changes',
    '/ranked',
    '/status',
    '/season',
    '/codes',
    '/free-cosmetics',
    '/drops',
    ...DROP_GUIDES.map((g) => `/drops/${g.slug}`),
    '/tools/item-shop',
    '/tools/player-stats',
    '/tools/player-compare',
    '/tools/loadout-builder',
    '/tools/fortnite-build-simulator',
    '/tools/skin-rarity-calculator',
    '/upload',
    '/upload/guide',
    '/upload/loadout',
    '/upload/drop_spot',
    '/upload/map_code',
    '/upload/xp_map',
    '/upload/settings',
    '/upload/keybinds',
    '/upload/fps_preset',
    '/upload/tip',
    '/upload/weapon_take',
    '/upload/clip',
    '/upload/combo',
    '/upload/post/a1000000-0000-4000-8000-000000000001',
    '/upload/post/a1000000-0000-4000-8000-000000000002',
    '/upload/post/a1000000-0000-4000-8000-000000000003',
    '/upload/post/a1000000-0000-4000-8000-000000000004',
    '/upload/post/a1000000-0000-4000-8000-000000000005',
    '/xp-calculator',
    '/season-countdown',
    '/player-count',
    '/news',
    '/modes',
    '/reload',
    '/new-cosmetics',
    '/cosmetic-stats',
    '/sets',
    '/locker',
    '/lockers',
    ...liveSets.map((s) => `/sets/${s.slug}`),
    '/creator-code',
    '/map-rotation',
    '/map-evolution',
    '/tools',
    '/tools/sensitivity-calculator',
    '/tools/vbucks-calculator',
    '/tools/fps-settings',
    '/tools/keybinds',
    '/tools/zone-timer',
  ]

  const toolRoutes: MetadataRoute.Sitemap = toolPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: hubModified,
    changeFrequency:
      path === '/news' ||
      path === '/status' ||
      path === '/season-countdown' ||
      path === '/tools/item-shop'
        ? ('daily' as const)
        : ('weekly' as const),
    priority: toolPriority(path),
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: hubModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/guides`,
      lastModified: hubModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/about`,
      lastModified: hubModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/privacy`,
      lastModified: hubModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: hubModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      lastModified: hubModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/guides/${cat.id}`,
    lastModified: hubModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const guidePageRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, guidesTotalPages() - 1) },
    (_, i) => ({
      url: `${base}${guidesPageHref(i + 2)}`,
      lastModified: hubModified,
      changeFrequency: 'weekly' as const,
      priority: 0.55,
    })
  )

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${base}/guides/${post.category}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: GSC_PUSH_GUIDES.has(post.slug) ? 0.85 : post.featured ? 0.75 : 0.6,
    }))

  const weaponRoutes: MetadataRoute.Sitemap = WEAPON_CATALOG.map((w) => ({
    url: `${base}/weapons/${w.id}`,
    lastModified: hubModified,
    changeFrequency: 'weekly' as const,
    priority: w.vaulted ? 0.4 : 0.55,
  }))

  const publicLockers = await listPublicLockers(200).catch(() => [])
  const lockerRoutes: MetadataRoute.Sitemap = publicLockers.map((locker) => ({
    url: `${base}/locker/${locker.slug}`,
    lastModified: new Date(locker.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...localeRoutes,
    ...categoryRoutes,
    ...guidePageRoutes,
    ...postRoutes,
    ...weaponRoutes,
    ...lockerRoutes,
  ]
}
