import { createClient } from '@/lib/supabase/server'
import {
  isValidLockerSlug,
  slugifyLockerName,
  type LockerRow,
  type LockerWithItems,
} from '@/lib/lockers'

export const LOCKERS_SETUP_HINT =
  'Lockers table is not set up yet. Run supabase/lockers.sql in the Supabase SQL Editor.'

function isMissingTable(error: { message?: string; code?: string } | null) {
  if (!error) return false
  const msg = error.message || ''
  return error.code === '42P01' || (msg.includes('lockers') && msg.includes('does not exist'))
}

function asLocker(row: Record<string, unknown>): LockerRow {
  return {
    user_id: String(row.user_id),
    slug: String(row.slug),
    display_name: String(row.display_name),
    is_public: Boolean(row.is_public),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  preferred: string,
  ignoreUserId?: string
) {
  let candidate = preferred
  for (let i = 0; i < 10; i++) {
    const { data } = await supabase.from('lockers').select('user_id').eq('slug', candidate).maybeSingle()
    if (!data || (ignoreUserId && data.user_id === ignoreUserId)) return candidate
    candidate = `${preferred.slice(0, 20)}-${Math.random().toString(36).slice(2, 6)}`
    if (!isValidLockerSlug(candidate)) {
      candidate = `locker-${Math.random().toString(36).slice(2, 8)}`
    }
  }
  return `locker-${crypto.randomUUID().slice(0, 8)}`
}

export async function getLockerBySlug(slug: string): Promise<LockerWithItems | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('lockers').select('*').eq('slug', slug).maybeSingle()
  if (error) {
    if (isMissingTable(error)) return null
    throw error
  }
  if (!data) return null
  const locker = asLocker(data)
  const { data: items, error: itemError } = await supabase
    .from('locker_items')
    .select('cosmetic_id')
    .eq('user_id', locker.user_id)
    .order('added_at', { ascending: true })
  if (itemError && !isMissingTable(itemError)) throw itemError
  return {
    ...locker,
    itemIds: (items || []).map((row) => String(row.cosmetic_id)),
  }
}

export async function getMyLocker(): Promise<{
  userId: string | null
  locker: LockerWithItems | null
  setupMissing: boolean
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { userId: null, locker: null, setupMissing: false }

  const { data, error } = await supabase.from('lockers').select('*').eq('user_id', user.id).maybeSingle()
  if (error) {
    if (isMissingTable(error)) return { userId: user.id, locker: null, setupMissing: true }
    throw error
  }
  if (!data) return { userId: user.id, locker: null, setupMissing: false }

  const locker = asLocker(data)
  const { data: items, error: itemError } = await supabase
    .from('locker_items')
    .select('cosmetic_id')
    .eq('user_id', user.id)
    .order('added_at', { ascending: true })
  if (itemError) {
    if (isMissingTable(itemError)) return { userId: user.id, locker: null, setupMissing: true }
    throw itemError
  }
  return {
    userId: user.id,
    locker: {
      ...locker,
      itemIds: (items || []).map((row) => String(row.cosmetic_id)),
    },
    setupMissing: false,
  }
}

export async function ensureMyLocker(): Promise<
  { locker: LockerWithItems; error?: undefined } | { locker?: undefined; error: string }
> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sign in to build a locker.' }

  const existing = await getMyLocker()
  if (existing.setupMissing) return { error: LOCKERS_SETUP_HINT }
  if (existing.locker) return { locker: existing.locker }

  const display =
    (user.user_metadata?.display_name as string | undefined)?.trim()?.slice(0, 40) ||
    user.email?.split('@')[0]?.slice(0, 40) ||
    'Locker'
  const slug = await uniqueSlug(supabase, slugifyLockerName(display))

  const { data, error } = await supabase
    .from('lockers')
    .insert({
      user_id: user.id,
      slug,
      display_name: display,
      is_public: true,
    })
    .select('*')
    .single()

  if (error) {
    if (isMissingTable(error)) return { error: LOCKERS_SETUP_HINT }
    return { error: 'Could not create your locker. Try again.' }
  }

  return { locker: { ...asLocker(data), itemIds: [] } }
}

export async function allocateLockerSlug(preferred: string, userId: string) {
  const supabase = await createClient()
  return uniqueSlug(supabase, preferred, userId)
}
