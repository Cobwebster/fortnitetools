import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Cosmetic Sets – Search Every Skin Set',
  description:
    'Search the full Fortnite Battle Royale set catalog — outfits, back blings, pickaxes, and more. Filter by tonight’s Item Shop or new-build cosmetics, then open a set for shop-history counts.',
  path: '/sets',
  keywords: [
    'fortnite sets',
    'fortnite skin sets',
    'fortnite cosmetic sets',
    'fortnite set browser',
    'fortnite item shop sets',
    'search fortnite sets',
  ],
})

export default function SetsLayout({ children }: { children: React.ReactNode }) {
  return children
}
