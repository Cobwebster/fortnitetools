import type { CommunitySubmission } from '@/lib/community-submissions'

/**
 * Verified community posts that render on the site.
 * Supabase is inbox-only (status=pending). After you review a row in Table Editor,
 * paste it here — the public site never reads the database for /upload.
 *
 * Example:
 * {
 *   id: '…uuid from supabase…',
 *   created_at: '2026-10-09T12:00:00.000Z',
 *   user_id: null,
 *   creator_name: 'PlayerName',
 *   kind: 'guide',
 *   title: '…',
 *   body: '…',
 *   payload: { summary: '…', category: 'how-to', … },
 *   status: 'approved',
 * }
 */
export const VERIFIED_COMMUNITY_SUBMISSIONS: CommunitySubmission[] = [
  // Paste verified rows below.
]
