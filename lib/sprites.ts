import catalog from '@/lib/sprites-catalog.json'
import { CURRENT_SEASON } from '@/lib/season'

export type SpriteTheme =
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic'
  | 'gold'
  | 'candy'
  | 'galaxy'
  | 'holofoil'
  | 'cube'
  | 'gem'
  | 'cheatmaster'
  | 'hacker'
  | 'reaper'
  | 'tricktreat'
  | 'quack'

export type SpriteEntry = {
  id: number
  slug: string
  name: string
  shortName: string
  family: string
  variant: string
  theme: SpriteTheme
  image: string
}

type RawCatalog = {
  source: string
  capturedAt: string
  note: string
  sprites: Array<{
    id: number
    slug: string
    name: string
    shortName: string
    family: string
    variant: string
    theme: string
    image: string
  }>
}

const payload = catalog as RawCatalog

export const SPRITES_SOURCE = payload.source
export const SPRITES_CAPTURED_AT = payload.capturedAt
export const SPRITES_NOTE = payload.note

export const SPRITE_VARIANT_ORDER = [
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Gold',
  'Gummy',
  'Galaxy',
  'Holofoil',
  'Cube',
  'Gem',
  'Cheat Master',
  'Loot Hacker',
  'Bounty Hunter',
  'Trick or Treat',
  'Quack',
] as const

export const SPRITE_THEME_STYLES: Record<SpriteTheme, string> = {
  rare: 'border-sky-400/70 bg-sky-500/10',
  epic: 'border-fuchsia-400/70 bg-fuchsia-500/10',
  legendary: 'border-orange-400/70 bg-orange-500/10',
  mythic: 'border-yellow-300/80 bg-yellow-400/15',
  gold: 'border-amber-300/90 bg-amber-400/15',
  candy: 'border-pink-400/70 bg-pink-500/10',
  galaxy: 'border-indigo-400/70 bg-indigo-500/10',
  holofoil: 'border-cyan-300/80 bg-cyan-400/10',
  cube: 'border-violet-500/80 bg-violet-700/20',
  gem: 'border-emerald-400/70 bg-emerald-500/10',
  cheatmaster: 'border-red-500/80 bg-red-600/15',
  hacker: 'border-lime-400/70 bg-lime-500/10',
  reaper: 'border-rose-500/80 bg-rose-700/20',
  tricktreat: 'border-orange-300/80 bg-orange-600/15',
  quack: 'border-yellow-400/80 bg-yellow-500/10',
}

export const SPRITES: SpriteEntry[] = payload.sprites.map((row) => {
  const shortName = row.shortName.replace(/\s+/g, ' ').trim()
  const name = /\bsprite$/i.test(row.name) ? row.name.trim() : `${shortName} Sprite`
  return {
    id: row.id,
    slug: row.slug,
    name,
    shortName,
    family: row.family,
    variant: row.variant,
    theme: row.theme as SpriteTheme,
    image: row.image,
  }
})

export const SPRITE_FAMILIES = [...new Set(SPRITES.map((s) => s.family))].sort((a, b) =>
  a.localeCompare(b)
)

export const SPRITE_COUNTS = {
  total: SPRITES.length,
  families: SPRITE_FAMILIES.length,
  withArt: SPRITES.filter((s) => Boolean(s.image)).length,
}

export const SPRITES_HOWTO = [
  {
    title: 'Companions, not PNG sheets',
    body: `Sprites are Chapter 7 collectible companions (Jonesy, Klombo, Gold / Cheat Master variants, and so on). This page is the picture list — not a texture-extract dump.`,
  },
  {
    title: `${SPRITE_COUNTS.total} icons, ${SPRITE_COUNTS.families} families`,
    body: `Snapshot ${SPRITES_CAPTURED_AT} from the public fortnite.gg tracker. ${CURRENT_SEASON.shortLabel} Override still uses the Sprite loop; mastery does not carry into Treasure Hunters.`,
  },
  {
    title: 'Art is hotlinked',
    body: 'Icons stay on fortnite.gg’s CDN. We do not ship Epic pak files. If an image blanks, their host is down — the name is still in the catalog.',
  },
]

export const SPRITES_FAQS = [
  {
    question: 'What are Fortnite Sprites?',
    answer:
      'Chapter 7 Battle Royale companions you find, carry, and extract. Variants (Gold, Gummy, Galaxy, Holofoil, Cube, Cheat Master, Loot Hacker, and collab skins) count as separate collection entries.',
  },
  {
    question: 'Is /sprites a PNG sprite-sheet dump?',
    answer:
      'No. It is every companion portrait from the live Sprite tracker. Texture sheets from pak files are not hosted here.',
  },
  {
    question: 'How do I extract Sprites in Override?',
    answer:
      'Use Extraction Sites after the first storm, a Portable Extractor, or a Victory Royale auto-extract. The older Runners write-up still covers pad etiquette.',
  },
  {
    question: 'Where do the pictures come from?',
    answer: `A ${SPRITES_CAPTURED_AT} snapshot of fortnite.gg/sprites. Images load from their CDN; names and families are stored here so the gallery still works if their HTML layout changes.`,
  },
]

export function spriteBySlug(slug: string) {
  return SPRITES.find((s) => s.slug === slug) ?? null
}

export function spriteByShortName(name: string) {
  const key = name.replace(/\s+sprite$/i, '').trim().toLowerCase()
  return SPRITES.find((s) => s.shortName.toLowerCase() === key) ?? null
}
