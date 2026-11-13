import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { isPrefixedLocale, defaultLocale } from '@/i18n/config'

/** Paths that need a Supabase session refresh / auth redirect. */
function needsAuthSession(pathname: string): boolean {
  return (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/account' ||
    pathname.startsWith('/account/') ||
    pathname === '/locker' ||
    pathname.startsWith('/locker/') ||
    pathname === '/lockers' ||
    pathname.startsWith('/lockers/') ||
    pathname === '/upload' ||
    pathname.startsWith('/upload/')
  )
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public traffic: no Supabase round-trip (was the main Fluid CPU + cookie/CDN tax).
  const response = needsAuthSession(pathname)
    ? await updateSession(request)
    : NextResponse.next()

  const first = pathname.split('/').filter(Boolean)[0]
  const locale = first && isPrefixedLocale(first) ? first : defaultLocale
  response.headers.set('x-locale', locale)

  if (locale !== defaultLocale) {
    response.headers.set('Vary', 'Cookie, Accept-Language')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Skip static assets + API proxies. APIs set their own Cache-Control;
     * running auth middleware on /api/* was burning invocations on shop/stats polls.
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|mp4|webm)$).*)',
  ],
}
