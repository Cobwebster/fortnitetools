import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponDamageCalculatorView } from '@/components/weapon-damage-calculator-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Weapon Damage Calculator – STK & TTK',
  description:
    'Shots-to-kill, TTK, and DPS estimates for Chapter 7 Season 3 weapons in the current loot pool sample.',
  path: '/tools/weapon-damage-calculator',
  keywords: ['fortnite damage calculator', 'fortnite ttk', 'fortnite shots to kill'],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/weapon-damage-calculator'),
    languages: hreflangAlternates('/tools/weapon-damage-calculator'),
  },
}

export default function WeaponDamageCalculatorPage() {
  return (
    <>
      <Navbar />
      <WeaponDamageCalculatorView />
      <Footer />
    </>
  )
}
