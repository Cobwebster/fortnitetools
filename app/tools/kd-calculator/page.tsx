import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { KDCalculatorView } from '@/components/kd-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite K/D Calculator – Kill/Death Ratio & Win Rate',
  description:
    'Calculate your Fortnite Kill/Death ratio, win rate, and kills per game. Free K/D calculator with pub-lobby context ranges and a K/D projector.',
  path: '/tools/kd-calculator',
  keywords: [
    'fortnite kd calculator',
    'fortnite kill death ratio',
    'fortnite win rate calculator',
    'what is a good kd fortnite',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/kd-calculator'),
    languages: hreflangAlternates('/tools/kd-calculator'),
  },
}

export default function KDCalculatorPage() {
  return (
    <>
      <Navbar />
      <KDCalculatorView />
      <Footer />
    </>
  )
}
