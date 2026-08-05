import { notFound } from 'next/navigation'
import { DocumentLang } from '@/components/document-lang'
import { IntlProvider } from '@/components/intl-provider'
import { isPrefixedLocale, prefixedLocales, type PrefixedLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/get-messages'

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isPrefixedLocale(raw)) notFound()
  const locale = raw as PrefixedLocale
  const messages = await getMessages(locale)

  return (
    <IntlProvider locale={locale} messages={messages}>
      <DocumentLang locale={locale} />
      {children}
    </IntlProvider>
  )
}
