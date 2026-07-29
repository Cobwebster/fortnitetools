'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function AuthNavLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setReady(true)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setReady(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!ready) {
    return (
      <span
        className={
          mobile
            ? 'block px-3 py-2 text-sm text-muted-foreground'
            : 'px-3 py-2 text-sm text-muted-foreground'
        }
        aria-hidden
      >
        …
      </span>
    )
  }

  if (user) {
    const label =
      (user.user_metadata?.display_name as string | undefined)?.trim() || 'Account'
    if (mobile) {
      return (
        <Link
          href="/account"
          className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
          onClick={onNavigate}
        >
          {label}
        </Link>
      )
    }
    return (
      <Link
        href="/account"
        className="rounded-md border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
      >
        Account
      </Link>
    )
  }

  if (mobile) {
    return (
      <>
        <Link
          href="/login"
          className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
          onClick={onNavigate}
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="mt-1 block rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          onClick={onNavigate}
        >
          Sign up
        </Link>
      </>
    )
  }

  return (
    <Link
      href="/login"
      className="rounded-md border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
    >
      Sign in
    </Link>
  )
}
