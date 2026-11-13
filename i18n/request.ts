import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './config'
import { getMessages } from './get-messages'

/**
 * Avoid `headers()` here — it opts routes into dynamic rendering and raises
 * Fluid/ISR cost. Prefixed locales get messages from `app/[locale]/layout.tsx`.
 */
export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: await getMessages(defaultLocale),
  }
})
