'use client'

import Link from '@/components/link'
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
            ? 'block h-9 rounded-md bg-primary/20 px-4 py-2'
            : 'inline-block h-9 w-[5.5rem] rounded-md bg-primary/20'
        }
        aria-hidden
      />
    )
  }

  if (user) {
    const label =
      (user.user_metadata?.display_name as string | undefined)?.trim() || 'Account'
    if (mobile) {
      return (
        <Link
          href="/account"
          className="block rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
          onClick={onNavigate}
        >
          {label}
        </Link>
      )
    }
    return (
      <Link
        href="/account"
        className="inline-flex items-center rounded-md border border-primary/45 bg-primary/10 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/15 hover:border-primary transition-colors"
      >
        {label}
      </Link>
    )
  }

  if (mobile) {
    return (
      <>
        <Link
          href="/login"
          className="block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground shadow-[0_0_20px_-4px] shadow-primary/50 hover:opacity-90 transition-opacity"
          onClick={onNavigate}
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="mt-1 block rounded-md border border-border bg-muted px-4 py-2 text-center text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          onClick={onNavigate}
        >
          Sign up
        </Link>
      </>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/register"
        className="hidden lg:inline-flex rounded-md px-2.5 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
      >
        Sign up
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_18px_-3px] shadow-primary/55 hover:opacity-90 transition-opacity"
      >
        Sign in
      </Link>
    </div>
  )
}
