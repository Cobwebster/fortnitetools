import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { VBucksCalculatorView } from '@/components/vbucks-calculator-view'
import { assertPrefixedLocale, generateToolLocaleMetadata } from '@/i18n/tool-metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateToolLocaleMetadata(locale, 'vbucks-calculator')
}

export default async function LocaleVBucksPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)
  return (
    <>
      <Navbar />
      <VBucksCalculatorView />
      <Footer />
    </>
  )
}
