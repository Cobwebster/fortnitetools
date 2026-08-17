import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Best Fortnite Drops – Shattered Coast Landing Guides',
  description:
    'Five named-POI drop pages for Shattered Coast with contest, bus, extract, Sprite notes, third-party angles, and rotate paths — not a pin dump. Heatwave Harbor, Battlewoods, Wonkeeland, Latte Landing, Sunken Shores. Last reviewed 17 Aug 2026.',
  path: '/drops',
  keywords: [
    'best fortnite drop',
    'fortnite best landing spots',
    'heatwave harbor drop',
    'battlewoods fortnite',
    'wonkeeland drop',
    'latte landing ranked',
    'sunken shores fortnite',
    'shattered coast drops',
  ],
})

export default function DropsLayout({ children }: { children: React.ReactNode }) {
  return children
}
