export const COMMUNITY_KINDS = [
  'guide',
  'loadout',
  'drop_spot',
  'map_code',
  'xp_map',
  'settings',
  'keybinds',
  'fps_preset',
  'tip',
  'weapon_take',
  'clip',
  'combo',
] as const

export const GUIDE_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const
export const GUIDE_AUDIENCES = ['casual', 'ranked', 'controller', 'competitive'] as const
export const GUIDE_MODES = ['br', 'zero_build', 'ranked', 'reload', 'creative'] as const

export const RELATED_TOOL_OPTIONS = [
  { value: '/tools/loadout-builder', label: 'Loadout builder' },
  { value: '/fortnite-map', label: 'Interactive map' },
  { value: '/drops', label: 'Best drops' },
  { value: '/weapons', label: 'Weapons encyclopedia' },
  { value: '/codes', label: 'Map codes' },
  { value: '/ranked', label: 'Ranked hub' },
  { value: '/tools/keybinds', label: 'Keybinds' },
  { value: '/tools/fps-settings', label: 'FPS settings' },
  { value: '/tools/sensitivity-calculator', label: 'Sensitivity calculator' },
  { value: '/tools/fortnite-build-simulator', label: 'Build simulator' },
  { value: '/season', label: 'Season hub' },
  { value: '/free-cosmetics', label: 'Free cosmetics' },
] as const

export type CommunityKind = (typeof COMMUNITY_KINDS)[number]

export type CommunitySubmissionStatus = 'pending' | 'approved' | 'rejected' | 'hidden'

export const BODY_MAX = 12_000
export const GUIDE_BODY_MIN = 200
export const DEFAULT_BODY_MIN = 20

export const GUIDE_CATEGORIES = [
  'how-to',
  'weapons',
  'season',
  'map',
  'ranked',
  'settings',
  'creative',
  'other',
] as const

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number]

export const GUIDE_CATEGORY_LABELS: Record<GuideCategory, string> = {
  'how-to': 'How-to',
  weapons: 'Weapons',
  season: 'Season / Override',
  map: 'Map / drops',
  ranked: 'Ranked',
  settings: 'Settings',
  creative: 'Creative / UEFN',
  other: 'Other',
}

export type CommunitySubmission = {
  id: string
  created_at: string
  user_id: string | null
  creator_name: string
  kind: CommunityKind
  title: string
  body: string
  payload: Record<string, unknown>
  status: CommunitySubmissionStatus
}

export type CommunityKindMeta = {
  kind: CommunityKind
  label: string
  shortLabel: string
  blurb: string
  relatedHref: string
  relatedLabel: string
  icon: string
  featured?: boolean
  placeholders: {
    title: string
    body: string
  }
}

export const COMMUNITY_KIND_META: Record<CommunityKind, CommunityKindMeta> = {
  guide: {
    kind: 'guide',
    label: 'Player guide',
    shortLabel: 'Guides',
    blurb:
      'Write a full guide readers can use — and link your YouTube, Twitch, TikTok, or socials so fans find you.',
    relatedHref: '/guides',
    relatedLabel: 'Browse site guides',
    icon: '/images/loadout/medkit.png',
    featured: true,
    placeholders: {
      title: 'e.g. How to crack boxes with Pump + Shockwave on Override',
      body: 'Write the full guide here — steps, loadout notes, common mistakes, when it works…',
    },
  },
  loadout: {
    kind: 'loadout',
    label: 'Loadout',
    shortLabel: 'Loadouts',
    blurb: 'Share a full hotbar + mats plan from the loadout builder.',
    relatedHref: '/tools/loadout-builder',
    relatedLabel: 'Open loadout builder',
    icon: '/images/loadout/flex_smg.png',
    placeholders: {
      title: 'e.g. Ranked endgame Pump kit',
      body: 'When do you run this? Contest drop, mid-game, or late zone?',
    },
  },
  xp_map: {
    kind: 'xp_map',
    label: 'XP map code',
    shortLabel: 'XP maps',
    blurb: 'Creative XP / AFK / quest maps for Battle Pass grinding.',
    relatedHref: '/codes',
    relatedLabel: 'Map codes hub',
    icon: '/images/icons/xp.png',
    placeholders: {
      title: 'e.g. Fast Override weekly XP',
      body: 'How long to cap? Any death-run / AFK notes? Confirm it still awards XP…',
    },
  },
  keybinds: {
    kind: 'keybinds',
    label: 'Keybind layout',
    shortLabel: 'Keybinds',
    blurb: 'Share builds, edits, and crouch binds that actually feel good.',
    relatedHref: '/tools/keybinds',
    relatedLabel: 'Pro keybinds reference',
    icon: '/images/icons/pickaxe.png',
    placeholders: {
      title: 'e.g. Two-button edit + wall on Q',
      body: 'List wall / floor / stair / cone / edit / crouch and why you switched…',
    },
  },
  fps_preset: {
    kind: 'fps_preset',
    label: 'FPS / graphics preset',
    shortLabel: 'FPS presets',
    blurb: 'Competitive, balanced, or quality graphics notes for your setup.',
    relatedHref: '/tools/fps-settings',
    relatedLabel: 'FPS settings guide',
    icon: '/images/icons/glider.png',
    placeholders: {
      title: 'e.g. 360Hz competitive low',
      body: 'Resolution, view distance, effects, NVIDIA/AMD notes…',
    },
  },
  drop_spot: {
    kind: 'drop_spot',
    label: 'Drop spot',
    shortLabel: 'Drops',
    blurb: 'Name a POI, loot path, and why it prints for pubs or Ranked.',
    relatedHref: '/drops',
    relatedLabel: 'Drop guides',
    icon: '/images/loadout/pulse_scanner.png',
    placeholders: {
      title: 'e.g. Green Hill Zone — east pads',
      body: 'Loot route, fight odds, rotate out…',
    },
  },
  map_code: {
    kind: 'map_code',
    label: 'Creative map code',
    shortLabel: 'Map codes',
    blurb: 'Submit a UEFN / Creative code worth grinding this week.',
    relatedHref: '/codes',
    relatedLabel: 'Map codes hub',
    icon: '/images/loadout/launch_pad.png',
    placeholders: {
      title: 'e.g. Piece control warm-up',
      body: 'What is the map good for? Edits, aim, zone wars…',
    },
  },
  settings: {
    kind: 'settings',
    label: 'Settings share',
    shortLabel: 'Settings',
    blurb: 'Sens, builds/edits, or FPS preset that actually feels good.',
    relatedHref: '/tools/sensitivity-calculator',
    relatedLabel: 'Sens calculator',
    icon: '/images/icons/pickaxe.png',
    placeholders: {
      title: 'e.g. Controller mid-sens Ranked',
      body: 'Any deadzone / boost notes teammates should know…',
    },
  },
  tip: {
    kind: 'tip',
    label: 'Gameplay tip',
    shortLabel: 'Tips',
    blurb: 'Short Override advice — rotates, reclaim, third-party timing.',
    relatedHref: '/season',
    relatedLabel: 'Season hub',
    icon: '/images/loadout/shockwave.png',
    placeholders: {
      title: 'e.g. Leave POI with Shockwaves before second zone',
      body: 'Explain the tip in a few sentences…',
    },
  },
  weapon_take: {
    kind: 'weapon_take',
    label: 'Weapon take',
    shortLabel: 'Weapons',
    blurb: 'Your season ranking take — Pump, 8-Bit, Drum, Mega Buster, etc.',
    relatedHref: '/weapons',
    relatedLabel: 'Weapons encyclopedia',
    icon: '/images/loadout/striker_pump.png',
    placeholders: {
      title: 'e.g. Pump still S-tier after v42.10',
      body: 'Why you run it over 8-Bit / Oni…',
    },
  },
  clip: {
    kind: 'clip',
    label: 'Clip / VOD',
    shortLabel: 'Clips',
    blurb: 'Link a YouTube, Twitch, or TikTok play worth learning from.',
    relatedHref: '/upload',
    relatedLabel: 'Community feed',
    icon: '/images/loadout/batman_grapnel.png',
    placeholders: {
      title: 'e.g. Triple pump reclaim on Shattered Coast',
      body: 'What should people watch for in the clip?',
    },
  },
  combo: {
    kind: 'combo',
    label: 'Build / edit tip',
    shortLabel: 'Combos',
    blurb: 'Piece control, edit course ideas, or build-sim drills.',
    relatedHref: '/tools/fortnite-build-simulator',
    relatedLabel: 'Build simulator',
    icon: '/images/loadout/mat_stone.png',
    placeholders: {
      title: 'e.g. Pre-edit cone into ramp reclaim',
      body: 'Steps, common mistakes, when to use it…',
    },
  },
}

export function isCommunityKind(value: string): value is CommunityKind {
  return (COMMUNITY_KINDS as readonly string[]).includes(value)
}

export function formatSubmissionDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function payloadString(payload: Record<string, unknown>, key: string) {
  const value = payload[key]
  return typeof value === 'string' ? value : ''
}

export function sanitizeCreatorName(raw: string) {
  return raw.trim().slice(0, 40)
}

export function sanitizeTitle(raw: string) {
  return raw.trim().slice(0, 120)
}

export function sanitizeBody(raw: string) {
  return raw.trim().slice(0, BODY_MAX)
}

export function optionalSafeUrl(raw: string) {
  const value = raw.trim()
  if (!value) return undefined
  if (!isSafeHttpUrl(value)) return null
  return value
}

export function isSafeInternalPath(path: string) {
  return path.startsWith('/') && !path.startsWith('//')
}

export function isSafeHttpUrl(url: string) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/** Creative island codes look like 1234-5678-9012 (digits + dashes). */
export function isPlausibleMapCode(code: string) {
  const cleaned = code.trim().toUpperCase()
  return /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(cleaned) || /^[A-Z0-9-]{6,20}$/.test(cleaned)
}
