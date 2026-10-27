import { CURRENT_SEASON } from '@/lib/season'
import {
  SPRITE_VARIANT_ORDER,
  SPRITES,
  SPRITES_CAPTURED_AT,
  type SpriteEntry,
} from '@/lib/sprites'

/** Admin Panel sprite codes (kept local to avoid circular imports with lobby-hacks). */
const SPRITE_LOBBY_HACKS: Record<string, { code: string; note?: string }> = {
  'gold-jonesy-sprite': { code: 'JonesyIsGolden' },
  'cheat-master-adventure-sprite': { code: 'Born2Play' },
  'cheat-master-8-bit-sprite': { code: '8BitBlast' },
  'cheat-master-sonic-sprite': { code: 'GottaGoFast' },
  'cheat-master-tails-sprite': { code: 'IWannaFlyHigh' },
  'cheat-master-jonesy-sprite': { code: 'Play4All' },
  'cheat-master-bush-sprite': {
    code: 'GatherAndCraft',
    note: 'Finish the required “Wrixel’s Get Crafty” story quests first.',
  },
}

export type SpriteHowToStep = {
  title: string
  body: string
}

export type SpritePageModel = {
  sprite: SpriteEntry
  ability: string
  abilityScale?: string
  variantBonus?: string
  location: string
  howToGet: SpriteHowToStep[]
  lobbyHack?: { code: string; note?: string }
  familyVariants: SpriteEntry[]
  related: SpriteEntry[]
  faqs: { question: string; answer: string }[]
  description: string
  liveOverride: boolean
}

/** Base companion powers for Override-active families (Oct 2026 coverage). */
const FAMILY_ABILITY: Record<
  string,
  { ability: string; abilityScale?: string; location?: string; live?: boolean }
> = {
  Jonesy: {
    ability:
      'Recover some health or shields a short time after you take damage.',
    abilityScale: 'Heal amount increases with each Sprite level.',
    location: 'Commonly spotted near high and mountainous areas; also starter pick, chests, and Cheat Codes.',
    live: true,
  },
  Bush: {
    ability: 'Grants a bush camouflage on you after a short delay.',
    abilityScale:
      'Time between bush activations shortens with each level. At max level, eliminations can grant a bush instantly.',
    location: 'Starter Sprite option, chests, pumpkins, and Cheat Code chests.',
    live: true,
  },
  Adventure: {
    ability: 'Upgrades a random item in your inventory each time the Sprite levels up.',
    abilityScale: 'Automatically extracts at level 5.',
    location: 'Starter Sprite option, chests, pumpkins, and Cheat Code chests.',
    live: true,
  },
  '8-Bit': {
    ability:
      'Your first chest this match yields an 8-Bit Shotgun, with a score multiplier tied to that weapon.',
    location: 'Cheat Code chests, regular chests, and pumpkins.',
    live: true,
  },
  'Storm Scout': {
    ability: 'Applies Overdrive after you take enough storm damage.',
    abilityScale: 'At max level, also reveals future storm circles.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Onigiri: {
    ability: 'Applies Overdrive after eating or drinking a consumable.',
    abilityScale: 'Overdrive duration increases with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Overshield: {
    ability: 'Grants Overshield that scales with Sprite level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  'Mega Man': {
    ability: 'Slip and slide with reduced friction.',
    abilityScale: 'Slide distance increases with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Birthday: {
    ability: 'Opening chests has a chance to spawn a piece of cake.',
    abilityScale: 'At max level, eliminations can also spawn cake.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  'Dumpster Dive': {
    ability:
      'Food provides bonus healing. Find food when jumping out of props, with a small chance from containers.',
    location: 'Fortnitemares loot pool — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  Morgana: {
    ability: 'Increases the effectiveness of healing items.',
    abilityScale: 'Healing bonus grows with Sprite level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Pond: {
    ability: 'Jump shortly after landing to trigger a Super Jump. Charges refill over time.',
    abilityScale: 'Jump height and charge rate improve with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Sonic: {
    ability: 'Gotta go fast — sprint speed increases with each Sprite level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Tails: {
    ability: 'Hover in mid-air with Tails’ help.',
    abilityScale: 'Hover speed increases with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Shadow: {
    ability: 'Automatically reloads unequipped weapons over time.',
    abilityScale:
      'Reload speed improves with each level. At max level, also reloads the equipped weapon.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  'Crash Bandicoot': {
    ability:
      'Trigger a Whirlwind while airborne that knocks back and damages nearby opponents.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Blinky: {
    ability: 'Grants cloak for a short duration after taking damage.',
    location:
      'Defeat a Pac-Man Ghost on the island, or roll from Cheat Codes / chests / pumpkins.',
    live: true,
  },
  Killswitch: {
    ability:
      'Enter Hangtime with improved accuracy while aiming as you jump or fall.',
    abilityScale: 'Aerial accuracy increases with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Jackrabbit: {
    ability: 'Perform another jump while mid-air.',
    abilityScale: 'Cooldown between jumps decreases with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  'X-Ray': {
    ability: 'Periodically marks nearby enemies.',
    abilityScale: 'Mark speed and ping radius increase with each level.',
    location: 'Cheat Code chests, chests, and pumpkins.',
    live: true,
  },
  Vampire: {
    ability: 'Recover health when you damage an enemy.',
    location: 'Fortnitemares loot pool — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  'The Deer': {
    ability: 'Melee attacks deal more damage.',
    abilityScale: 'Melee bonus increases with each level.',
    location: 'Fortnitemares loot pool — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  'Spooky Dash': {
    ability:
      'Jump in the air to Spooky Dash and phase through some objects. Charges refill over time.',
    location: 'Fortnitemares loot pool — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  Klombo: {
    ability:
      'Grants random items as it levels. Only levels by consuming health or shield items.',
    abilityScale: 'Item quality rises with level. Automatically extracts at level 5.',
    location:
      'Often spotted near high / mountainous POIs (Lifty Lodge, Green Hill Zone, Golden Grove, Stone Sanctum) — still RNG, not a pin.',
    live: true,
  },
  Crown: {
    ability:
      'Only levels by winning matches (faster with Crown Wins). Awards extra Crown Wins after a Victory Royale.',
    abilityScale: 'New Crown variants unlock after mastering prior finishes.',
    location: 'Win matches while carrying Crown; mastery chain unlocks Gold / Cheat Master / etc.',
    live: true,
  },
  Honey: {
    ability:
      'Ranged hits have a chance to spawn bees at the hit location.',
    location: 'Added mid-Override — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  'One Wish Willow': {
    ability:
      'Extract enemies’ equipped Sprites on elimination and push nearby foes when damaged. Removing it marks you on the map.',
    location: 'Added mid-Override — Cheat Codes, chests, and pumpkins.',
    live: true,
  },
  Ironmouse: {
    ability:
      'When health is low: regen, Cloak, and low gravity for a short window.',
    abilityScale: 'Heal amount during the window scales with Sprite level.',
    location: 'Rare Mythic roll — Relic / Sprite Chests and Locator routes when she is live.',
    live: true,
  },
}

const VARIANT_BONUS: Record<string, string> = {
  Quack:
    'Gives 50% Sprite XP to all other Sprites in your inventory — strong for leveling a full pocket before extract.',
  Gold: 'Gain 3× bonus XP from eliminations while this Sprite is equipped.',
  'Cheat Master':
    'Button Mash — all directional inputs count as correct when entering world Cheat Codes.',
  'Loot Hacker': 'Increases the chance of spawning items from your Loot Hacks.',
  'Bounty Hunter':
    'Chance to find Sprites when eliminating opponents. Only gains Sprite XP from eliminations (unless the Sprite has special XP rules).',
  'Trick or Treat': 'Chance to find candy when opening containers.',
  Cube: 'Rare cube finish of this family — same base power, separate collection entry.',
  Galaxy: 'Galaxy finish — same base power, separate collection entry.',
  Gummy: 'Gummy finish — same base power, separate collection entry.',
  Holofoil: 'Holofoil finish — same base power, separate collection entry.',
  Gem: 'Gem finish — same base power, separate collection entry.',
}

const STARTER_FAMILIES = new Set(['Jonesy', 'Bush', 'Adventure'])

function lobbyHackForSprite(sprite: SpriteEntry) {
  return SPRITE_LOBBY_HACKS[sprite.slug]
}

function howToGetSteps(sprite: SpriteEntry, lobbyHack?: { code: string; note?: string }): SpriteHowToStep[] {
  const steps: SpriteHowToStep[] = []
  const family = sprite.family
  const variant = sprite.variant

  if (STARTER_FAMILIES.has(family) && (variant === 'Rare' || variant === 'Epic')) {
    steps.push({
      title: 'Starter pick',
      body: `${family} is one of the Override starter Sprites. Pick it at match start if your collection is empty.`,
    })
  }

  if (lobbyHack) {
    steps.push({
      title: `Lobby Hack · ${lobbyHack.code}`,
      body: lobbyHack.note
        ? `Redeem in the Override Admin Panel (Ranked OFF). ${lobbyHack.note}`
        : 'Redeem in the Override Admin Panel (Ranked OFF). Duplicates usually convert to Sprite Dust.',
    })
  }

  if (variant === 'Quack') {
    steps.push({
      title: 'Sprite Mastery (Quack page)',
      body: 'Quack finishes unlock from the last Sprite Mastery page in Override. Finish that page before Season 5 — mastery does not roll into Treasure Hunters.',
    })
  }

  if (variant === 'Gold' && family !== 'Crown') {
    steps.push({
      title: 'Hush Boss / Gold rolls',
      body: 'Gold finishes can drop from defeating the Hush Boss, Gold Cheat Code chests, or rare chest / pumpkin rolls.',
    })
  }

  if (variant === 'Cube') {
    steps.push({
      title: 'Cube loot table',
      body: 'Cube finishes are low-percentage rolls from Sprite Chests, rare chests, vaults, and Locator routes — not a separate map pin.',
    })
  }

  if (family === 'Blinky') {
    steps.push({
      title: 'Pac-Man Ghost',
      body: 'Defeat a Pac-Man Ghost on the island for a Blinky chance, or roll the family from Cheat Codes / chests.',
    })
  }

  if (family === 'Crown') {
    steps.push({
      title: 'Win to level · master to unlock finishes',
      body: 'Crown only gains XP from Victory Royales (faster with Crown Wins). Higher finishes unlock by mastering the previous Crown variant.',
    })
  }

  steps.push({
    title: 'Cheat Codes, chests & pumpkins',
    body: 'Priority farm: Cheat Code chests (blue → Rare, purple → Epic/Legendary, gold → Mythic / variants). Regular chests and Fortnitemares pumpkins are lower odds.',
  })

  steps.push({
    title: 'Extract to keep it',
    body: 'Finding a Sprite only buffs this match. Extract at an Extraction Site or with a Portable Extractor (or win the match) to bank it in your collection and earn Sprite Dust.',
  })

  return steps
}

function fallbackAbility(family: string): string {
  return `${family} is in our Chapter 7 Sprite catalog. Open the in-game Sprite tooltip for the live Override power — seasonal rotations can vault older families.`
}

export function spritesByFamily(family: string): SpriteEntry[] {
  const order = new Map(SPRITE_VARIANT_ORDER.map((v, i) => [v, i]))
  return SPRITES.filter((s) => s.family === family).sort((a, b) => {
    const ai = order.get(a.variant as (typeof SPRITE_VARIANT_ORDER)[number]) ?? 99
    const bi = order.get(b.variant as (typeof SPRITE_VARIANT_ORDER)[number]) ?? 99
    if (ai !== bi) return ai - bi
    return a.shortName.localeCompare(b.shortName)
  })
}

export function allSpriteSlugs() {
  return SPRITES.map((s) => s.slug)
}

export function buildSpritePage(slug: string): SpritePageModel | null {
  const sprite = SPRITES.find((s) => s.slug === slug)
  if (!sprite) return null

  const fam = FAMILY_ABILITY[sprite.family]
  const ability = fam?.ability ?? fallbackAbility(sprite.family)
  const abilityScale = fam?.abilityScale
  const variantBonus = VARIANT_BONUS[sprite.variant]
  const location =
    fam?.location ??
    'No unique POI pin — farm Cheat Code chests, Sprite Chests, pumpkins, and Locator tools across the island.'
  const lobbyHack = lobbyHackForSprite(sprite)
  const howToGet = howToGetSteps(sprite, lobbyHack)
  const familyVariants = spritesByFamily(sprite.family)
  const related = SPRITES.filter(
    (s) => s.variant === sprite.variant && s.family !== sprite.family
  ).slice(0, 8)

  const faqs = [
    {
      question: `How do I get the ${sprite.name}?`,
      answer: howToGet.map((s) => s.body).join(' '),
    },
    {
      question: `What does the ${sprite.family} Sprite do?`,
      answer: abilityScale ? `${ability} ${abilityScale}` : ability,
    },
    ...(variantBonus
      ? [
          {
            question: `What does the ${sprite.variant} finish add?`,
            answer: variantBonus,
          },
        ]
      : []),
    {
      question: 'Do I keep Sprites after the match?',
      answer:
        'Only if you extract (Extraction Site, Portable Extractor) or win. Unextracted Sprites stay match-only.',
    },
  ]

  const bonusBit = variantBonus ? ` ${sprite.variant} bonus: ${variantBonus}` : ''
  const description = `${sprite.name} in Fortnite ${CURRENT_SEASON.shortLabel}: ${ability}${bonusBit} How to get it, where it shows up, and every ${sprite.family} variant.`

  return {
    sprite,
    ability,
    abilityScale,
    variantBonus,
    location,
    howToGet,
    lobbyHack,
    familyVariants,
    related,
    faqs,
    description: description.slice(0, 160),
    liveOverride: Boolean(fam?.live),
  }
}

export const SPRITE_PAGES_REVIEWED = SPRITES_CAPTURED_AT
