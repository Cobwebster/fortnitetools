'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthActionState = {
  error?: string
  success?: string
}

function cleanNext(raw: string | null | undefined) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/account'
  return raw
}

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const next = cleanNext(String(formData.get('next') || '/account'))

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function registerAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const displayName = String(formData.get('displayName') || '').trim()

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  const supabase = await createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: displayName ? { display_name: displayName } : undefined,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // If email confirmation is disabled, session exists immediately.
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/account')
  }

  return {
    success: 'Check your email to confirm your account, then log in.',
  }
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updateProfileAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const displayName = String(formData.get('displayName') || '').trim()
  const password = String(formData.get('password') || '')
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in.' }
  }

  if (displayName) {
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    })
    if (error) return { error: error.message }
  }

  if (password) {
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters.' }
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) return { error: error.message }
  }

  if (!displayName && !password) {
    return { error: 'Nothing to update.' }
  }

  revalidatePath('/account')
  return { success: 'Account updated.' }
}

export async function submitSuggestionAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const category = String(formData.get('category') || '')
  const message = String(formData.get('message') || '').trim()
  const allowedCategories = ['suggestion', 'bug', 'other']

  if (!allowedCategories.includes(category)) {
    return { error: 'Choose a valid feedback type.' }
  }
  if (message.length < 10) {
    return { error: 'Feedback must be at least 10 characters.' }
  }
  if (message.length > 2000) {
    return { error: 'Feedback must be 2,000 characters or fewer.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to submit feedback.' }
  }

  const { error } = await supabase.from('suggestions').insert({
    user_id: user.id,
    category,
    message,
  })

  if (error) {
    return { error: 'Could not submit feedback. Please try again.' }
  }

  return { success: 'Thanks! Your feedback has been submitted.' }
}
