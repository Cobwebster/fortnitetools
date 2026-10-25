import { createClient } from '@/lib/supabase/server'
import {
  LOCKER_DIRECTORY_LIMIT,
  LOCKER_PREVIEW_COUNT,
  isValidLockerSlug,
  slugifyLockerName,
  type LockerRow,
  type LockerWithItems,
  type PublicLockerCard,
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

type LockerItemEmbed = {
  cosmetic_id?: string
  added_at?: string
}

function cardsFromRows(
  rows: {
    slug: string
    display_name: string
    updated_at: string
    locker_items?: LockerItemEmbed[] | null
  }[]
): PublicLockerCard[] {
  return rows
    .map((row) => {
      const itemIds = (row.locker_items || [])
        .slice()
        .sort((a, b) => String(a.added_at || '').localeCompare(String(b.added_at || '')))
        .map((item) => String(item.cosmetic_id || ''))
        .filter(Boolean)
      return {
        slug: String(row.slug),
        displayName: String(row.display_name),
        updatedAt: String(row.updated_at),
        itemCount: itemIds.length,
        previewIds: itemIds.slice(0, LOCKER_PREVIEW_COUNT),
      }
    })
}

/** Public lockers that actually have cosmetics — directory + sitemap. */
export async function listPublicLockers(
  limit = LOCKER_DIRECTORY_LIMIT
): Promise<PublicLockerCard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lockers')
    .select('slug, display_name, updated_at, locker_items(cosmetic_id, added_at)')
    .eq('is_public', true)
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error) {
    if (isMissingTable(error)) return []
    const fallback = await listPublicLockersFallback(supabase, limit)
    if (fallback) return fallback
    throw error
  }

  return cardsFromRows(data || [])
}

async function listPublicLockersFallback(
  supabase: Awaited<ReturnType<typeof createClient>>,
  limit: number
): Promise<PublicLockerCard[] | null> {
  const { data: lockers, error } = await supabase
    .from('lockers')
    .select('user_id, slug, display_name, updated_at')
    .eq('is_public', true)
    .order('updated_at', { ascending: false })
    .limit(limit)
  if (error) {
    if (isMissingTable(error)) return []
    return null
  }
  if (!lockers?.length) return []

  const { data: items, error: itemError } = await supabase
    .from('locker_items')
    .select('user_id, cosmetic_id, added_at')
    .in(
      'user_id',
      lockers.map((row) => row.user_id)
    )
  if (itemError) {
    if (isMissingTable(itemError)) return []
    return null
  }

  const byUser = new Map<string, LockerItemEmbed[]>()
  for (const item of items || []) {
    const userId = String(item.user_id)
    const list = byUser.get(userId) || []
    list.push({ cosmetic_id: String(item.cosmetic_id), added_at: String(item.added_at) })
    byUser.set(userId, list)
  }

  return cardsFromRows(
    lockers.map((row) => ({
      slug: String(row.slug),
      display_name: String(row.display_name),
      updated_at: String(row.updated_at),
      locker_items: byUser.get(String(row.user_id)) || [],
    }))
  )
}
