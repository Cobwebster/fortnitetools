import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — do not remove. Use getUser (not getSession) for auth checks.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isAuthPage = path === '/login' || path === '/register'
  const isProtected = path === '/account' || path.startsWith('/account/')

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    const next = `${path}${request.nextUrl.search || ''}`
    url.search = ''
    url.searchParams.set('next', next)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && user) {
    const next = request.nextUrl.searchParams.get('next')
    const url = request.nextUrl.clone()
    if (next && next.startsWith('/') && !next.startsWith('//')) {
      const [pathname, qs] = next.split('?')
      url.pathname = pathname || '/account'
      url.search = qs ? `?${qs}` : ''
    } else {
      url.pathname = '/account'
      url.search = ''
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
