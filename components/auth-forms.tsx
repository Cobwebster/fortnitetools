'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import {
  loginAction,
  registerAction,
  updateProfileAction,
  type AuthActionState,
} from '@/app/auth/actions'

const initial: AuthActionState = {}

const fieldClass =
  'w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'

const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

function AuthMessage({ state }: { state: AuthActionState }) {
  if (state.error) {
    return (
      <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
        {state.error}
      </p>
    )
  }
  if (state.success) {
    return (
      <p className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary" role="status">
        {state.success}
      </p>
    )
  }
  return null
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next || '/account'} />
      <AuthMessage state={state} />
      <div>
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className={labelClass}>
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="pt-2 text-center text-base text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-lg font-bold text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initial)

  return (
    <form action={formAction} className="space-y-4">
      <AuthMessage state={state} />
      <div>
        <label htmlFor="register-name" className={labelClass}>
          Display name <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="register-name"
          name="displayName"
          type="text"
          autoComplete="nickname"
          maxLength={40}
          className={fieldClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="register-email" className={labelClass}>
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="register-password" className={labelClass}>
          Password
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className={fieldClass}
          placeholder="At least 6 characters"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Creating account…' : 'Create account'}
      </button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export function ProfileForm({
  email,
  displayName,
}: {
  email: string
  displayName: string
}) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initial)

  return (
    <form action={formAction} className="space-y-4">
      <AuthMessage state={state} />
      <div>
        <label className={labelClass}>Email</label>
        <p className="rounded-md border border-border bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
          {email}
        </p>
      </div>
      <div>
        <label htmlFor="profile-name" className={labelClass}>
          Display name
        </label>
        <input
          id="profile-name"
          name="displayName"
          type="text"
          defaultValue={displayName}
          maxLength={40}
          className={fieldClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="profile-password" className={labelClass}>
          New password <span className="font-normal text-muted-foreground">(leave blank to keep)</span>
        </label>
        <input
          id="profile-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          className={fieldClass}
          placeholder="At least 6 characters"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
