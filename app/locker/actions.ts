'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  LOCKER_ITEM_CAP,
  cosmeticExists,
  isValidCosmeticId,
  isValidLockerSlug,
  sanitizeLockerSlug,
} from '@/lib/lockers'
import {
  LOCKERS_SETUP_HINT,
  allocateLockerSlug,
  ensureMyLocker,
  getMyLocker,
} from '@/lib/lockers-db'

export type LockerActionResult = { ok: true; slug?: string } | { ok: false; error: string }

function setupOrFull(error: { message?: string; code?: string }) {
  const msg = error.message || ''
  if (error.code === '42P01' || msg.includes('does not exist')) return LOCKERS_SETUP_HINT
  if (msg.includes('locker_full')) return `Locker is full (${LOCKER_ITEM_CAP} items). Remove something first.`
  return null
}

export async function ensureLockerAction(): Promise<LockerActionResult> {
  const result = await ensureMyLocker()
  if (result.error) return { ok: false, error: result.error }
  revalidatePath('/locker')
  revalidatePath(`/locker/${result.locker.slug}`)
  return { ok: true, slug: result.locker.slug }
}

export async function addLockerItemAction(cosmeticId: string): Promise<LockerActionResult> {
  const id = cosmeticId.trim()
  if (!isValidCosmeticId(id)) return { ok: false, error: 'That is not a Fortnite cosmetic id.' }

  const mine = await getMyLocker()
  if (!mine.userId) return { ok: false, error: 'Sign in to add locker items.' }
  if (mine.setupMissing) return { ok: false, error: LOCKERS_SETUP_HINT }

  let locker = mine.locker
  if (!locker) {
    const created = await ensureMyLocker()
    if (created.error || !created.locker) return { ok: false, error: created.error || 'Could not open locker.' }
    locker = created.locker
  }

  if (locker.itemIds.length >= LOCKER_ITEM_CAP) {
    return { ok: false, error: `Locker is full (${LOCKER_ITEM_CAP} items).` }
  }
  if (locker.itemIds.some((existing) => existing.toLowerCase() === id.toLowerCase())) {
    return { ok: true, slug: locker.slug }
  }

  const cosmetic = await cosmeticExists(id)
  if (!cosmetic) return { ok: false, error: 'Fortnite-API does not know that cosmetic id.' }

  const supabase = await createClient()
  const { error } = await supabase.from('locker_items').insert({
    user_id: mine.userId,
    cosmetic_id: cosmetic.id,
  })
  if (error) {
    const hint = setupOrFull(error)
    if (hint) return { ok: false, error: hint }
    if (error.code === '23505') return { ok: true, slug: locker.slug }
    return { ok: false, error: 'Could not add that item.' }
  }

  revalidatePath('/locker')
  revalidatePath(`/locker/${locker.slug}`)
  return { ok: true, slug: locker.slug }
}

export async function removeLockerItemAction(cosmeticId: string): Promise<LockerActionResult> {
  const mine = await getMyLocker()
  if (!mine.userId || !mine.locker) return { ok: false, error: 'Sign in to edit your locker.' }
  if (mine.setupMissing) return { ok: false, error: LOCKERS_SETUP_HINT }

  const supabase = await createClient()
  const { error } = await supabase
    .from('locker_items')
    .delete()
    .eq('user_id', mine.userId)
    .eq('cosmetic_id', cosmeticId)
  if (error) {
    const hint = setupOrFull(error)
    if (hint) return { ok: false, error: hint }
    return { ok: false, error: 'Could not remove that item.' }
  }

  revalidatePath('/locker')
  revalidatePath(`/locker/${mine.locker.slug}`)
  return { ok: true, slug: mine.locker.slug }
}

export async function updateLockerSettingsAction(form: {
  displayName: string
  slug: string
  isPublic: boolean
}): Promise<LockerActionResult> {
  const mine = await getMyLocker()
  if (!mine.userId) return { ok: false, error: 'Sign in to edit your locker.' }
  if (mine.setupMissing) return { ok: false, error: LOCKERS_SETUP_HINT }

  const created = mine.locker ? { locker: mine.locker } : await ensureMyLocker()
  if ('error' in created && created.error) return { ok: false, error: created.error }
  const locker = created.locker
  if (!locker) return { ok: false, error: 'Could not open locker.' }

  const displayName = form.displayName.trim().slice(0, 40)
  if (displayName.length < 1) return { ok: false, error: 'Give the locker a name.' }

  const slug = sanitizeLockerSlug(form.slug)
  if (!isValidLockerSlug(slug)) {
    return { ok: false, error: 'Slug must be 3–32 letters or numbers (hyphens ok in the middle).' }
  }

  const nextSlug = slug === locker.slug ? slug : await allocateLockerSlug(slug, mine.userId)

  const supabase = await createClient()
  const { error } = await supabase
    .from('lockers')
    .update({
      display_name: displayName,
      slug: nextSlug,
      is_public: form.isPublic,
    })
    .eq('user_id', mine.userId)

  if (error) {
    const hint = setupOrFull(error)
    if (hint) return { ok: false, error: hint }
    if (error.code === '23505') return { ok: false, error: 'That share URL is taken.' }
    return { ok: false, error: 'Could not save locker settings.' }
  }

  revalidatePath('/locker')
  revalidatePath(`/locker/${locker.slug}`)
  revalidatePath(`/locker/${nextSlug}`)
  return { ok: true, slug: nextSlug }
}
