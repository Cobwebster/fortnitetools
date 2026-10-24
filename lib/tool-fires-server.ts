import { createClient } from '@/lib/supabase/server'
import { getPublishedToolFireCounts, isToolFireId } from '@/lib/tool-fires'

export type ToolFirePageState = {
  counts: Record<string, number>
  mine: string[]
  loggedIn: boolean
}

/** Counts from the baked snapshot. Own votes are the only live Supabase read. */
export async function loadToolFirePageState(): Promise<ToolFirePageState> {
  const counts = getPublishedToolFireCounts()
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { counts, mine: [], loggedIn: false }

    const { data, error } = await supabase.from('tool_fires').select('tool_id')
    if (error || !data) return { counts, mine: [], loggedIn: true }

    return {
      counts,
      mine: data.map((row) => row.tool_id).filter((id): id is string => typeof id === 'string' && isToolFireId(id)),
      loggedIn: true,
    }
  } catch {
    return { counts, mine: [], loggedIn: false }
  }
}
