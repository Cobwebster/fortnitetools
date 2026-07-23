import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Best Fortnite FPS & Graphics Settings',
  description:
    'Competitive Fortnite graphics, display, and performance settings explained — with presets for low-end, balanced, and high-refresh PCs.',
  path: '/tools/fps-settings',
  keywords: [
    'best fortnite settings',
    'fortnite fps settings',
    'fortnite performance mode',
    'fortnite graphics settings',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
