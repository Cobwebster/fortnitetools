import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { VBucksCalculatorView } from '@/components/vbucks-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite V-Bucks Calculator – Cheapest Pack Combo (2026)',
  description:
    'Build a Fortnite wishlist and estimate the cheapest V-Bucks pack combo after the March 2026 price change (800 / 2,400 / 4,500 / 12,500 packs).',
  path: '/tools/vbucks-calculator',
  keywords: [
    'vbucks calculator',
    'fortnite vbucks',
    'fortnite pack calculator',
    'how much are v-bucks',
    'cheapest v-bucks pack',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/vbucks-calculator'),
    languages: hreflangAlternates('/tools/vbucks-calculator'),
  },
}

export default function VBucksCalculatorPage() {
  return (
    <>
      <Navbar />
      <VBucksCalculatorView />
      <Footer />
    </>
  )
}
