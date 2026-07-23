import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Interactive Map – Shattered Coast POIs, Loot & Drops',
  description:
    'Free Fortnite interactive map for Chapter 7 Season 3. Live Shattered Coast minimap with named POIs, loot ratings, hot drops, landing spots, and rotation tips.',
  path: '/fortnite-map',
  keywords: [
    'fortnite map',
    'fortnite interactive map',
    'shattered coast map',
    'fortnite map locations',
    'fortnite poi map',
    'fortnite loot map',
    'best fortnite landing spots',
    'where to land fortnite',
    'fortnite named locations',
    'chapter 7 season 3 map',
    'fortnite minimap',
    'fortnite drop spots',
  ],
})

export default function FortniteMapLayout({ children }: { children: React.ReactNode }) {
  return children
}
