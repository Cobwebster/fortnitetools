import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { VBucksCalculatorView } from '@/components/vbucks-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite V-Bucks Calculator – Pack Combinations',
  description:
    'Build a Fortnite wishlist and estimate a low-cost V-Bucks pack combination using common USD storefront prices.',
  path: '/tools/vbucks-calculator',
  keywords: ['vbucks calculator', 'fortnite vbucks', 'fortnite pack calculator'],
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
