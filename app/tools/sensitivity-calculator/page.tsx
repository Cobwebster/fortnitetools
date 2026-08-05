import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SensitivityCalculatorView } from '@/components/sensitivity-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Sensitivity Calculator – Convert from Valorant, CS2, Apex',
  description:
    'Convert mouse sensitivity to Fortnite from Valorant, CS2, Apex, Warzone, and more using cm/360. Free eDPI calculator for Chapter 7 Season 3.',
  path: '/tools/sensitivity-calculator',
  keywords: [
    'fortnite sensitivity calculator',
    'valorant to fortnite sens',
    'cs2 to fortnite sensitivity',
    'fortnite edpi',
    'cm/360 fortnite',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/sensitivity-calculator'),
    languages: hreflangAlternates('/tools/sensitivity-calculator'),
  },
}

export default function SensitivityCalculatorPage() {
  return (
    <>
      <Navbar />
      <SensitivityCalculatorView />
      <Footer />
    </>
  )
}
