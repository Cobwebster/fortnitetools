import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BattlePassXpCalculatorView } from '@/components/battle-pass-xp-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Battle Pass XP Calculator – Will You Finish In Time?',
  description:
    "Calculate whether you'll finish the Fortnite Battle Pass before Chapter 7 Season 3 ends. Enter your level and pick weekly XP sources to see your projected finish level.",
  path: '/tools/battle-pass-xp-calculator',
  keywords: [
    'fortnite battle pass xp calculator',
    'fortnite xp calculator',
    'fortnite battle pass level calculator',
    'chapter 7 season 3 battle pass',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/battle-pass-xp-calculator'),
    languages: hreflangAlternates('/tools/battle-pass-xp-calculator'),
  },
}

export default function BattlePassXpCalculatorPage() {
  return (
    <>
      <Navbar />
      <BattlePassXpCalculatorView />
      <Footer />
    </>
  )
}
