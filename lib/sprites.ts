import catalog from '@/lib/sprites-catalog.json'

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
  | 'fortune'
  | 'cursed'

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

export const SPRITES_CAPTURED_AT = payload.capturedAt
export const SPRITES_NOTE = payload.note

export const SPRITE_VARIANT_ORDER = [
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Fortune',
  'Cursed',
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
  fortune: 'border-teal-300/80 bg-teal-400/15',
  cursed: 'border-purple-700/80 bg-purple-950/40',
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
    body: `Sprites are Chapter 7 collectible companions. Treasure Hunters (1 Nov 2026) added a new roster — Halfpeel'd, Lil' Flacko, Plundarrgh, Transponder Snail, and the rest — each with its own ability page.`,
  },
  {
    title: `${SPRITE_COUNTS.total} icons, ${SPRITE_COUNTS.families} families`,
    body: `Catalog snapshot ${SPRITES_CAPTURED_AT}. Hunt Wanted Posters for Sprite Treasure Maps, then dig buried Sprite Chests on Crossbones Isle. Fortune finishes are live; Cursed is in the menu; Gold returns 12 Nov.`,
  },
  {
    title: 'Icons hosted here',
    body: 'Every portrait in this gallery is served from FortniteTools. We do not ship Epic pak texture sheets.',
  },
]

export const SPRITES_FAQS = [
  {
    question: 'What are Fortnite Sprites?',
    answer:
      'Chapter 7 Battle Royale companions you find, carry, and extract. Treasure Hunters finishes (Fortune, Cursed) and older ones (Gold, Gummy, Galaxy, Holofoil, Cube, Cheat Master, Loot Hacker, Quack) each count as a separate collection entry.',
  },
  {
    question: 'What are the 12 new Treasure Hunters Sprites?',
    answer:
      "Launch twelve (1 Nov 2026): Halfpeel'd, Re-Pete, Barry O'Fish, Chester, Exmarks, Wayfinder, Kelper, Sweet Dreams, Lil' Squibbly, Lil' Flacko, Plundarrgh, and Transponder Snail. Most also have Fortune and Cursed variants. Lil' Uzi Vert Jr. is dated for a later Captain's Day.",
  },
  {
    question: 'Is /sprites a PNG sprite-sheet dump?',
    answer:
      'No. It is every companion portrait in our Sprite catalog, plus a detail page per Sprite for abilities and how to get them. Texture sheets from pak files are not hosted here.',
  },
  {
    question: 'How do I get Sprites in Treasure Hunters?',
    answer:
      "Tear down a Wanted Poster for a Sprite Treasure Map, follow it, and dig the buried Sprite Chest. Regular chests can also roll a Sprite. Extract (pad, Portable Extractor, or a win) to bank it. Lil' Flacko can drop from the A$AP Rocky fight on the $.$. Rocky.",
  },
  {
    question: 'Where do the pictures come from?',
    answer: `A ${SPRITES_CAPTURED_AT} companion catalog we maintain. Names, families, and icons are all hosted on FortniteTools.`,
  },
]

export function spriteBySlug(slug: string) {
  return SPRITES.find((s) => s.slug === slug) ?? null
}

export function spriteByShortName(name: string) {
  const key = name.replace(/\s+sprite$/i, '').trim().toLowerCase()
  return SPRITES.find((s) => s.shortName.toLowerCase() === key) ?? null
}
