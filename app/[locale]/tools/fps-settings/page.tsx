import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FpsSettingsView } from '@/components/fps-settings-view'
import {
  assertPrefixedLocale,
  generateToolLocaleMetadata,
} from '@/i18n/tool-metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateToolLocaleMetadata(locale, 'fps-settings')
}

export default async function LocaleFpsSettingsPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  return (
    <>
      <Navbar />
      <FpsSettingsView />
      <Footer />
    </>
  )
}
