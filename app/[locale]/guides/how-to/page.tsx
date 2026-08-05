import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuidesCategoryContent } from '@/components/guides-category-content'
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
  const hub = (messages as { guides?: { hub?: { categoryTitle?: string; categoryDescription?: string } } })
    .guides?.hub
  const title = hub?.categoryTitle || 'Fortnite How-To Guides'
  const description = hub?.categoryDescription || ''

  return {
    title,
    description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, '/guides/how-to'),
      languages: hreflangAlternates('/guides/how-to'),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(locale, '/guides/how-to'),
      locale,
    },
  }
}

export default async function LocaleGuidesHowToPage({ params }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  return (
    <>
      <Navbar />
      <GuidesCategoryContent category="how-to" />
      <Footer />
    </>
  )
}
