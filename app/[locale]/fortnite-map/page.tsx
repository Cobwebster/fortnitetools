import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteMapView } from '@/components/fortnite-map-view'
import { assertPrefixedLocale } from '@/i18n/tool-metadata'
import { getMessages } from '@/i18n/get-messages'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'
import { isPrefixedLocale, type PrefixedLocale } from '@/i18n/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isPrefixedLocale(raw)) return {}
  const locale = raw as PrefixedLocale
  const messages = await getMessages(locale)
  const map = (messages as { fortniteMap?: { metaTitle?: string; metaDescription?: string } })
    .fortniteMap
  const title = map?.metaTitle || 'Fortnite Interactive Map'
  const description = map?.metaDescription || ''
  return {
    title,
    description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, '/fortnite-map'),
      languages: hreflangAlternates('/fortnite-map'),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(locale, '/fortnite-map'),
      locale,
    },
  }
}

export default async function LocaleFortniteMapPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  return (
    <>
      <Navbar />
      <FortniteMapView />
      <Footer />
    </>
  )
}
