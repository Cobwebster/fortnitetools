import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  isPrefixedLocale,
  toolMessageNamespace,
  type AppLocale,
  type LocalizedToolSlug,
  type PrefixedLocale,
} from '@/i18n/config'
import { getMessages } from '@/i18n/get-messages'
import { absoluteLocaleUrl, hreflangAlternates, toolPath } from '@/i18n/pathnames'

type ToolMeta = {
  metaTitle?: string
  metaDescription?: string
  title?: string
  description?: string
}

export async function generateToolLocaleMetadata(
  localeRaw: string,
  slug: LocalizedToolSlug
): Promise<Metadata> {
  if (!isPrefixedLocale(localeRaw)) return {}
  const locale = localeRaw as PrefixedLocale
  const messages = await getMessages(locale)
  const ns = toolMessageNamespace[slug]
  const tools = (messages as { tools?: Record<string, ToolMeta> }).tools
  const tool = tools?.[ns] ?? {}
  const path = toolPath(slug)
  const title = tool.metaTitle || tool.title || slug
  const description = tool.metaDescription || tool.description || ''

  return {
    title,
    description,
    alternates: {
      canonical: absoluteLocaleUrl(locale, path),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(locale, path),
      locale,
    },
  }
}

export function assertPrefixedLocale(locale: string): PrefixedLocale {
  if (!isPrefixedLocale(locale)) notFound()
  return locale
}

export async function getToolMessages(locale: AppLocale, slug: LocalizedToolSlug) {
  const messages = await getMessages(locale)
  const ns = toolMessageNamespace[slug]
  return (messages as { tools?: Record<string, ToolMeta> }).tools?.[ns] ?? {}
}
