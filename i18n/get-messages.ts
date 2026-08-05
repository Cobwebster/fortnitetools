import type { AppLocale } from './config'

export async function getMessages(locale: AppLocale) {
  switch (locale) {
    case 'es':
      return (await import('../messages/es.json')).default
    case 'de':
      return (await import('../messages/de.json')).default
    case 'fr':
      return (await import('../messages/fr.json')).default
    case 'pl':
      return (await import('../messages/pl.json')).default
    case 'pt-BR':
      return (await import('../messages/pt-BR.json')).default
    case 'en':
    default:
      return (await import('../messages/en.json')).default
  }
}
