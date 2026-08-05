import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { KeybindsView } from '@/components/keybinds-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Pro Keybinds – Competitive Player Keyboard Layouts',
  description:
    'Compare approximate keyboard bindings used by well-known competitive Fortnite players for building, editing, and combat, with tips for picking your own layout.',
  path: '/tools/keybinds',
  keywords: [
    'fortnite keybinds',
    'fortnite pro keybinds',
    'best fortnite keybinds',
    'fortnite keyboard settings',
    'fortnite building keybinds',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/keybinds'),
    languages: hreflangAlternates('/tools/keybinds'),
  },
}

export default function KeybindsPage() {
  return (
    <>
      <Navbar />
      <KeybindsView />
      <Footer />
    </>
  )
}
