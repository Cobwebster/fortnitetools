import { getSeedLoadoutSubmissions, SEED_LOADOUT_IDS } from '@/lib/community-seed'
import { VERIFIED_COMMUNITY_SUBMISSIONS } from '@/lib/community-verified'
import {
  COMMUNITY_KINDS,
  type CommunityKind,
  type CommunitySubmission,
} from '@/lib/community-submissions'

/**
 * Public feed is 100% static:
 * - Showcase loadouts → lib/community-seed.ts
 * - Verified player posts → lib/community-verified.ts
 * Supabase is never read for rendering. Forms only INSERT pending rows for your review.
 */

function publishedPosts(): CommunitySubmission[] {
  return VERIFIED_COMMUNITY_SUBMISSIONS.filter(
    (item) =>
      item.status === 'approved' &&
      (COMMUNITY_KINDS as readonly string[]).includes(item.kind) &&
      !SEED_LOADOUT_IDS.has(item.id)
  )
}

function composeFeed(kind?: CommunityKind, limit = 40): CommunitySubmission[] {
  const verified = publishedPosts()
  const showcases = getSeedLoadoutSubmissions()

  if (kind === 'loadout') {
    const realLoadouts = verified.filter((i) => i.kind === 'loadout')
    return [...showcases, ...realLoadouts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
  }

  if (kind) {
    return verified
      .filter((i) => i.kind === kind)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
  }

  return [...verified, ...showcases]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}

export async function fetchCommunityFeed(options?: {
  kind?: CommunityKind
  limit?: number
}): Promise<{ items: CommunitySubmission[]; error: string | null }> {
  const limit = options?.limit ?? 40
  return { items: composeFeed(options?.kind, limit), error: null }
}

export async function fetchCommunityById(
  id: string
): Promise<CommunitySubmission | null> {
  const seed = getSeedLoadoutSubmissions().find((s) => s.id === id)
  if (seed) return seed

  const verified = publishedPosts().find((s) => s.id === id)
  return verified ?? null
}

export async function fetchCommunityCounts(): Promise<Partial<Record<CommunityKind, number>>> {
  const counts: Partial<Record<CommunityKind, number>> = {
    loadout: getSeedLoadoutSubmissions().length,
  }
  for (const item of publishedPosts()) {
    counts[item.kind] = (counts[item.kind] ?? 0) + 1
  }
  return counts
}
