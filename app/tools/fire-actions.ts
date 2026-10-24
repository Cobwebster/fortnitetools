'use server'

import { createClient } from '@/lib/supabase/server'
import { isToolFireId } from '@/lib/tool-fires'

export type FireActionResult = {
  ok: boolean
  already?: boolean
  error?: string
}

export async function addToolFire(toolId: string): Promise<FireActionResult> {
  if (!isToolFireId(toolId)) {
    return { ok: false, error: 'Unknown tool.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, error: 'Sign in to 🔥 a tool.' }
  }

  const { data, error } = await supabase.rpc('add_tool_fire', { p_tool_id: toolId })

  if (error) {
    const msg = error.message || ''
    if (msg.includes('add_tool_fire') || error.code === '42883' || error.code === '42P01') {
      return {
        ok: false,
        error: 'Fires table is not set up yet. Run supabase/tool-fires.sql in the Supabase SQL Editor.',
      }
    }
    if (msg.includes('not_authenticated')) {
      return { ok: false, error: 'Sign in to 🔥 a tool.' }
    }
    return { ok: false, error: 'Could not save that fire. Try again.' }
  }

  if (data === 'already') {
    return { ok: true, already: true }
  }

  return { ok: true }
}
