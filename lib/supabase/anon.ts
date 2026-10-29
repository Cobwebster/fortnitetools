import { createClient } from '@supabase/supabase-js'

/** Cookie-less anon client for build-time public reads (no session, no ISR opt-out). */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
