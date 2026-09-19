import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Zone Timer (Chapter 7 Season 4)',
  description:
    'Storm circle wait and shrink reference timer for Fortnite Chapter 7 Season 4 (Override). Start it when a new zone appears so you know when to rotate.',
  path: '/tools/zone-timer',
  keywords: [
    'fortnite zone timer',
    'fortnite storm timer',
    'fortnite circle times',
    'fortnite rotation timer',
    'chapter 7 season 4',
    'fortnite override',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
