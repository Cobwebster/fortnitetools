import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ToolsPageContent } from '@/components/tools-page-content'
import { isPrefixedLocale, type PrefixedLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/get-messages'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isPrefixedLocale(raw)) return {}
  const locale = raw as PrefixedLocale
  const messages = await getMessages(locale)
  const page = messages.toolsPage as { metaTitle: string; metaDescription: string }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: absoluteLocaleUrl(locale, '/tools'),
      languages: hreflangAlternates('/tools'),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteLocaleUrl(locale, '/tools'),
      locale,
    },
  }
}

export default async function LocaleToolsPage({ params }: Props) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()

  return (
    <>
      <Navbar />
      <ToolsPageContent />
      <Footer />
    </>
  )
}
