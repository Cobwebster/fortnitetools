import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Pro Keybinds Reference',
  description:
    'Compare Fortnite building, editing, and combat keybinds used by pros like Bugha, Clix, Mongraal, Benjyfishy, and MrSavage.',
  path: '/tools/keybinds',
  keywords: [
    'fortnite keybinds',
    'best fortnite keybinds',
    'fortnite pro keybinds',
    'bugha keybinds',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
