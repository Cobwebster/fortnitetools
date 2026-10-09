'use server'

import { createClient } from '@/lib/supabase/server'
import {
  COMMUNITY_KIND_META,
  DEFAULT_BODY_MIN,
  GUIDE_AUDIENCES,
  GUIDE_BODY_MIN,
  GUIDE_CATEGORIES,
  GUIDE_DIFFICULTIES,
  GUIDE_MODES,
  RELATED_TOOL_OPTIONS,
  isCommunityKind,
  isPlausibleMapCode,
  isSafeHttpUrl,
  optionalSafeUrl,
  sanitizeBody,
  sanitizeCreatorName,
  sanitizeTitle,
  type CommunityKind,
} from '@/lib/community-submissions'
import { buildLoadoutSharePath, parseLoadoutSearch } from '@/lib/loadout'

export type UploadActionState = {
  error?: string
  success?: string
}

function buildPayload(kind: CommunityKind, formData: FormData): Record<string, unknown> | { error: string } {
  switch (kind) {
    case 'guide': {
      const category = String(formData.get('category') || 'other')
      const summary = String(formData.get('summary') || '').trim().slice(0, 280)
      const difficulty = String(formData.get('difficulty') || 'beginner')
      const audience = String(formData.get('audience') || 'casual')
      const relatedTool = String(formData.get('relatedTool') || '').trim()
      const outline = String(formData.get('outline') || '').trim().slice(0, 800)
      const tagsRaw = String(formData.get('tags') || '')
      const modes = formData.getAll('modes').map(String)
      const readMinutes = Math.min(
        60,
        Math.max(1, Number(formData.get('readMinutes') || 5) || 5)
      )
      const faq1q = String(formData.get('faq1q') || '').trim().slice(0, 160)
      const faq1a = String(formData.get('faq1a') || '').trim().slice(0, 600)
      const faq2q = String(formData.get('faq2q') || '').trim().slice(0, 160)
      const faq2a = String(formData.get('faq2a') || '').trim().slice(0, 600)

      if (!(GUIDE_CATEGORIES as readonly string[]).includes(category)) {
        return { error: 'Pick a guide category.' }
      }
      if (summary.length < 40) {
        return { error: 'Summary needs at least 40 characters (Google-friendly description).' }
      }
      if (!(GUIDE_DIFFICULTIES as readonly string[]).includes(difficulty)) {
        return { error: 'Pick a difficulty.' }
      }
      if (!(GUIDE_AUDIENCES as readonly string[]).includes(audience)) {
        return { error: 'Pick a target audience.' }
      }
      const validModes = modes.filter((m) => (GUIDE_MODES as readonly string[]).includes(m))
      if (validModes.length === 0) {
        return { error: 'Select at least one game mode this guide covers.' }
      }
      if (outline.length < 20) {
        return { error: 'Add a short step outline (what the reader will learn).' }
      }
      if (
        relatedTool &&
        !RELATED_TOOL_OPTIONS.some((t) => t.value === relatedTool)
      ) {
        return { error: 'Pick a related FortniteTools page from the list.' }
      }

      const tags = tagsRaw
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length >= 2 && t.length <= 32)
        .slice(0, 8)
      if (tags.length < 2) {
        return { error: 'Add at least 2 comma-separated tags (e.g. pump, ranked, override).' }
      }

      const youtube = optionalSafeUrl(String(formData.get('youtube') || ''))
      const twitch = optionalSafeUrl(String(formData.get('twitch') || ''))
      const tiktok = optionalSafeUrl(String(formData.get('tiktok') || ''))
      const twitter = optionalSafeUrl(String(formData.get('twitter') || ''))
      const discord = optionalSafeUrl(String(formData.get('discord') || ''))
      const website = optionalSafeUrl(String(formData.get('website') || ''))

      if (
        youtube === null ||
        twitch === null ||
        tiktok === null ||
        twitter === null ||
        discord === null ||
        website === null
      ) {
        return { error: 'Social / promo links must be full http(s) URLs.' }
      }

      const socials = { youtube, twitch, tiktok, twitter, discord, website }
      const hasPromo = Object.values(socials).some(Boolean)
      const faqs = [
        faq1q && faq1a ? { q: faq1q, a: faq1a } : null,
        faq2q && faq2a ? { q: faq2q, a: faq2a } : null,
      ].filter(Boolean)

      return {
        category,
        summary,
        difficulty,
        audience,
        modes: validModes,
        tags,
        outline,
        related_tool: relatedTool || undefined,
        read_minutes: readMinutes,
        faqs,
        ...socials,
        promotes_socials: hasPromo,
      }
    }
    case 'loadout': {
      const rawPath = String(formData.get('loadoutUrl') || '').trim()
      let url: URL
      try {
        url = new URL(rawPath, 'https://www.fortnitetools.com')
      } catch {
        return { error: 'Paste a valid FortniteTools loadout link.' }
      }
      if (url.pathname !== '/tools/loadout-builder') {
        return { error: 'Loadout links must come from /tools/loadout-builder.' }
      }
      const parsed = parseLoadoutSearch(url.search)
      if (!parsed) return { error: 'Build a loadout before submitting the link.' }
      return { loadout_url: buildLoadoutSharePath(parsed) }
    }
    case 'drop_spot': {
      const poi = String(formData.get('poi') || '').trim().slice(0, 80)
      const mode = String(formData.get('mode') || 'br')
      if (poi.length < 2) return { error: 'Add a POI or landing name.' }
      if (!['br', 'zero_build', 'ranked', 'reload'].includes(mode)) {
        return { error: 'Pick a valid playlist mode.' }
      }
      return { poi, mode }
    }
    case 'map_code':
    case 'xp_map': {
      const code = String(formData.get('mapCode') || '').trim().toUpperCase()
      const islandName = String(formData.get('islandName') || '').trim().slice(0, 80)
      if (!isPlausibleMapCode(code)) {
        return { error: 'Enter a Creative map code (e.g. 1234-5678-9012).' }
      }
      return {
        code,
        island_name: islandName || undefined,
        map_type: kind === 'xp_map' ? 'xp' : 'practice',
      }
    }
    case 'keybinds': {
      const layout = String(formData.get('layout') || 'custom')
      if (!['custom', 'pro_inspired', 'controller'].includes(layout)) {
        return { error: 'Pick a keybind layout type.' }
      }
      return { layout }
    }
    case 'fps_preset': {
      const preset = String(formData.get('fpsPreset') || 'competitive')
      const refresh = String(formData.get('refresh') || '').trim().slice(0, 20)
      if (!['competitive', 'balanced', 'quality'].includes(preset)) {
        return { error: 'Pick competitive, balanced, or quality.' }
      }
      return { preset, refresh: refresh || undefined }
    }
    case 'settings': {
      const platform = String(formData.get('platform') || 'pc')
      const dpi = String(formData.get('dpi') || '').trim().slice(0, 20)
      const sens = String(formData.get('sens') || '').trim().slice(0, 40)
      const builds = String(formData.get('builds') || '').trim().slice(0, 40)
      const edits = String(formData.get('edits') || '').trim().slice(0, 40)
      if (!['pc', 'controller', 'mobile'].includes(platform)) {
        return { error: 'Pick PC, controller, or mobile.' }
      }
      return {
        platform,
        dpi: dpi || undefined,
        sens: sens || undefined,
        builds: builds || undefined,
        edits: edits || undefined,
      }
    }
    case 'tip': {
      const topic = String(formData.get('topic') || 'general')
      if (!['general', 'ranked', 'drop', 'aim', 'builds', 'zone'].includes(topic)) {
        return { error: 'Pick a tip topic.' }
      }
      return { topic }
    }
    case 'weapon_take': {
      const weapon = String(formData.get('weapon') || '').trim().slice(0, 60)
      const tier = String(formData.get('tier') || 'A')
      if (weapon.length < 2) return { error: 'Name the weapon.' }
      if (!['S', 'A', 'B', 'C', 'D'].includes(tier)) {
        return { error: 'Pick a tier from S–D.' }
      }
      return { weapon, tier, season: 'C7S4 Override' }
    }
    case 'clip': {
      const url = String(formData.get('clipUrl') || '').trim()
      if (!isSafeHttpUrl(url)) return { error: 'Paste a full http(s) clip URL.' }
      const host = new URL(url).hostname.replace(/^www\./, '')
      let platform = 'other'
      if (host.includes('youtu')) platform = 'youtube'
      else if (host.includes('twitch')) platform = 'twitch'
      else if (host.includes('tiktok')) platform = 'tiktok'
      return { url, platform }
    }
    case 'combo': {
      const difficulty = String(formData.get('difficulty') || 'beginner')
      if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
        return { error: 'Pick a difficulty.' }
      }
      return { difficulty }
    }
    default:
      return { error: 'Unknown submission type.' }
  }
}

export async function submitCommunityAction(
  _prev: UploadActionState,
  formData: FormData
): Promise<UploadActionState> {
  const kindRaw = String(formData.get('kind') || '')
  if (!isCommunityKind(kindRaw)) {
    return { error: 'Choose a valid upload type.' }
  }
  const kind = kindRaw

  const creatorName = sanitizeCreatorName(String(formData.get('creatorName') || ''))
  const title = sanitizeTitle(String(formData.get('title') || ''))
  const body = sanitizeBody(String(formData.get('body') || ''))

  if (creatorName.length < 2) {
    return { error: 'Display name must be at least 2 characters.' }
  }
  if (title.length < 3) {
    return { error: 'Title must be at least 3 characters.' }
  }
  const minBody = kind === 'guide' ? GUIDE_BODY_MIN : DEFAULT_BODY_MIN
  if (body.length < minBody) {
    return {
      error:
        kind === 'guide'
          ? `Guides need at least ${GUIDE_BODY_MIN} characters — write the real steps, not a teaser.`
          : 'Write at least 20 characters so the post is useful.',
    }
  }

  const payloadResult = buildPayload(kind, formData)
  if ('error' in payloadResult) return { error: payloadResult.error }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sign in to upload. Account creation is free and quick.' }
  }

  // Inbox only — public site never reads this table. You verify in Table Editor,
  // then paste approved rows into lib/community-verified.ts.
  const { error } = await supabase.from('community_submissions').insert({
    user_id: user.id,
    creator_name: creatorName,
    kind,
    title,
    body,
    payload: payloadResult,
    status: 'pending',
  })

  if (error) {
    if (error.message?.includes('community_submissions') || error.code === '42P01') {
      return {
        error:
          'Community uploads table is not set up yet. Run supabase/community-ugc.sql in the Supabase SQL Editor.',
      }
    }
    return { error: 'Could not save your upload. Please try again.' }
  }

  return {
    success: `${COMMUNITY_KIND_META[kind].label} submitted for review. It goes live after we verify it.`,
  }
}
