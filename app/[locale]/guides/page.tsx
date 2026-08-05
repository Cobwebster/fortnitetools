import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuidesHubContent } from '@/components/guides-hub-content'
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
  const hub = (messages as { guides?: { hub?: { metaTitle?: string; metaDescription?: string } } })
    .guides?.hub
  const title = hub?.metaTitle || 'Fortnite Guides'
  const description = hub?.metaDescription || ''

  return {
    title,
    description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, '/guides'),
      languages: hreflangAlternates('/guides'),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(locale, '/guides'),
      locale,
    },
  }
}

export default async function LocaleGuidesPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  return (
    <>
      <Navbar />
      <GuidesHubContent />
      <Footer />
    </>
  )
}
