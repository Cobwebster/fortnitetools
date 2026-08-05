import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ZoneTimerView } from '@/components/zone-timer-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Zone Timer – Storm Circle Wait & Shrink Times',
  description:
    'Approximate Fortnite storm circle wait and shrink times for every phase. Free zone timer with rotation tips and storm damage reference for Chapter 7 Season 3.',
  path: '/tools/zone-timer',
  keywords: [
    'fortnite zone timer',
    'fortnite storm timer',
    'fortnite circle times',
    'fortnite storm damage',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/zone-timer'),
    languages: hreflangAlternates('/tools/zone-timer'),
  },
}

export default function ZoneTimerPage() {
  return (
    <>
      <Navbar />
      <ZoneTimerView />
      <Footer />
    </>
  )
}
