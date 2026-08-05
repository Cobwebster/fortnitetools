import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { isPrefixedLocale, defaultLocale } from '@/i18n/config'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const first = request.nextUrl.pathname.split('/').filter(Boolean)[0]
  const locale = first && isPrefixedLocale(first) ? first : defaultLocale

  // Preserve redirects from auth middleware; clone headers onto them
  response.headers.set('x-locale', locale)

  // If somehow a non-locale first segment matched [locale] only — handled in page notFound

  // Avoid caching wrong locale on shared CDNs for localized HTML
  if (locale !== defaultLocale) {
    response.headers.set('Vary', 'Cookie, Accept-Language')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
