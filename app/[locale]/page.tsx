import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HomePageContent } from '@/components/home-page-content'
import { isPrefixedLocale, type PrefixedLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/get-messages'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isPrefixedLocale(raw)) return {}
  const locale = raw as PrefixedLocale
  const messages = await getMessages(locale)
  const meta = messages.homeMeta as { title: string; description: string }

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, '/'),
      languages: hreflangAlternates('/'),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteLocaleUrl(locale, '/'),
      locale,
    },
  }
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()

  return (
    <>
      <Navbar />
      <HomePageContent />
      <Footer />
    </>
  )
}
