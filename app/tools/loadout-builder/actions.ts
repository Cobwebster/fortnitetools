'use server'

import { createClient } from '@/lib/supabase/server'
import {
  buildLoadoutSharePath,
  parseLoadoutSearch,
} from '@/lib/loadout'

export type LoadoutSubmissionState = {
  error?: string
  success?: string
}

export async function submitLoadoutAction(
  _previousState: LoadoutSubmissionState,
  formData: FormData
): Promise<LoadoutSubmissionState> {
  const creatorName = String(formData.get('creatorName') || '').trim()
  const loadoutName = String(formData.get('loadoutName') || '').trim()
  const submittedPath = String(formData.get('loadoutPath') || '')

  if (creatorName.length < 2 || creatorName.length > 40) {
    return { error: 'Your name must be between 2 and 40 characters.' }
  }
  if (loadoutName.length < 3 || loadoutName.length > 80) {
    return { error: 'Loadout name must be between 3 and 80 characters.' }
  }

  let submittedUrl: URL
  try {
    submittedUrl = new URL(submittedPath, 'https://www.fortnitetools.com')
  } catch {
    return { error: 'That is not a valid FortniteTools loadout link.' }
  }

  if (submittedUrl.pathname !== '/tools/loadout-builder') {
    return { error: 'That is not a valid FortniteTools loadout link.' }
  }

  const parsedLoadout = parseLoadoutSearch(submittedUrl.search)
  if (!parsedLoadout) {
    return { error: 'Build a loadout before submitting it.' }
  }
  const canonicalPath = buildLoadoutSharePath(parsedLoadout)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to submit a loadout.' }
  }

  const { error } = await supabase.from('loadout_submissions').insert({
    user_id: user.id,
    creator_name: creatorName,
    loadout_name: loadoutName,
    loadout_url: canonicalPath,
  })

  if (error) {
    return { error: 'Could not submit your loadout. Please try again.' }
  }

  return {
    success: 'Loadout submitted! It will be ready for moderation when community pages launch.',
  }
}
