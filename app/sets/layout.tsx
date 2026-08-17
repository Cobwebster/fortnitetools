import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Item Shop Sets – Live Rotation & Current Season',
  description:
    'Tonight’s Fortnite Item Shop sets plus sets from cosmetics added in the current game build. Capped at 40 live URLs with shop-history counts — not a page per outfit. Last reviewed with C7S3 shop data.',
  path: '/sets',
  keywords: [
    'fortnite item shop sets',
    'fortnite skin sets',
    'fortnite current shop sets',
    'fortnite cosmetic sets',
    'fortnite set browser',
  ],
})

export default function SetsLayout({ children }: { children: React.ReactNode }) {
  return children
}
