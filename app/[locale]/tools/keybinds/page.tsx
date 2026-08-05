import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { KeybindsView } from '@/components/keybinds-view'
import {
  assertPrefixedLocale,
  generateToolLocaleMetadata,
} from '@/i18n/tool-metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateToolLocaleMetadata(locale, 'keybinds')
}

export default async function LocaleKeybindsPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  return (
    <>
      <Navbar />
      <KeybindsView />
      <Footer />
    </>
  )
}
