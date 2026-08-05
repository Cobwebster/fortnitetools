import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { defaultLocale, isAppLocale, type AppLocale } from './config'
import { getMessages } from './get-messages'

export default getRequestConfig(async () => {
  const h = await headers()
  const raw = h.get('x-locale') || defaultLocale
  const locale: AppLocale = isAppLocale(raw) ? raw : defaultLocale
  return {
    locale,
    messages: await getMessages(locale),
  }
})
