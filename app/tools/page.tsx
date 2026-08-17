import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ToolsPageContent } from '@/components/tools-page-content'
import { createMetadata } from '@/lib/seo'
import { hreflangAlternates, absoluteLocaleUrl } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Tools – Map, Tracker, Shop & Practice',
  description:
    'Free Fortnite tools for the current season: interactive map, stats tracker, Item Shop, build simulator, loadout builder, weapon encyclopedia, and season guides.',
  path: '/tools',
  keywords: [
    'fortnite tools',
    'fortnite interactive map',
    'fortnite tracker',
    'fortnite item shop',
    'fortnite build simulator',
    'fortnite loadout builder',
    'fortnite weapons',
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
