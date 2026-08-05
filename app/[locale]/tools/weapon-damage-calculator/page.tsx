import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponDamageCalculatorView } from '@/components/weapon-damage-calculator-view'
import { assertPrefixedLocale, generateToolLocaleMetadata } from '@/i18n/tool-metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateToolLocaleMetadata(locale, 'weapon-damage-calculator')
}

export default async function LocaleWeaponDamagePage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)
  return (
    <>
      <Navbar />
      <WeaponDamageCalculatorView />
      <Footer />
    </>
  )
}
