import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ToolsPageContent } from '@/components/tools-page-content'
import { createMetadata } from '@/lib/seo'
import { hreflangAlternates, absoluteLocaleUrl } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Tools – Free Calculators',
  description:
    'Free Fortnite tools: XP calculator, season countdown, player stats lookup, skin rarity calculator, interactive map, item shop tracker, sensitivity converter, V-Bucks calculator, K/D calculator, zone timer, keybinds, FPS settings, and weapon damage calculator.',
  path: '/tools',
  keywords: [
    'fortnite tools',
    'fortnite xp calculator',
    'fortnite season countdown',
    'when does fortnite season end',
    'fortnite map codes',
    'fortnite xp map codes',
    'fortnite creative codes',
    'fortnite stats',
    'fortnite rare skins',
    'fortnite skin rarity calculator',
    'fortnite tracker',
    'fortnite interactive map',
    'fortnite item shop',
    'fortnite sensitivity calculator',
    'fortnite kd calculator',
    'vbucks calculator',
    'fortnite zone timer',
    'fortnite xp calculator',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools'),
    languages: hreflangAlternates('/tools'),
  },
}

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <ToolsPageContent />
      <Footer />
    </>
  )
}
