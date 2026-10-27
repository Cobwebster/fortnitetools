import { CURRENT_SEASON } from '@/lib/season'
import { spriteByShortName } from '@/lib/sprites'

export type LobbyHackCategory = 'sprites' | 'locker' | 'consumables' | 'effects'

export type LobbyHack = {
  code: string
  reward: string
  category: LobbyHackCategory
  /** Extra redeem requirement (story quest, hidden step). */
  note?: string
  /** Lobby transforms / music can usually be reused. */
  repeatable?: boolean
  image?: string
}

export const LOBBY_HACKS_CAPTURED_AT = '2026-10-27'
export const LOBBY_HACKS_REVIEWED = '27 Oct 2026'

export const LOBBY_HACK_CATEGORY_META: {
  id: LobbyHackCategory | 'all'
  label: string
  hint: string
}[] = [
  { id: 'all', label: 'All', hint: 'Every Override Admin Panel string on this list' },
  { id: 'sprites', label: 'Sprites', hint: 'Companion unlocks — duplicates usually convert to Sprite Dust' },
  { id: 'locker', label: 'Loading screens & locker', hint: 'Back bling, sprays, styles, loading screens' },
  { id: 'consumables', label: 'Consumable resources', hint: 'XP, Sprite Dust, Llamas, locators, snacks' },
  { id: 'effects', label: 'Fun effects', hint: 'Lobby transforms and music — often reusable' },
]

function spriteHack(code: string, reward: string, note?: string): LobbyHack {
  const art = spriteByShortName(reward)
  return {
    code,
    reward,
    category: 'sprites',
    note,
    image: art?.image,
  }
}

export const LOBBY_HACKS: LobbyHack[] = [
  spriteHack('JonesyIsGolden', 'Gold Jonesy Sprite'),
  spriteHack('Born2Play', 'Cheat Master Adventure Sprite'),
  spriteHack('8BitBlast', 'Cheat Master 8-Bit Sprite'),
  spriteHack('GottaGoFast', 'Cheat Master Sonic Sprite'),
  spriteHack('IWannaFlyHigh', 'Cheat Master Tails Sprite'),
  spriteHack('Play4All', 'Cheat Master Jonesy Sprite'),
  spriteHack(
    'GatherAndCraft',
    'Cheat Master Bush Sprite',
    'Finish the required “Wrixel’s Get Crafty” story quests first.'
  ),

  {
    code: 'WeAreTheWorldChampionsToday',
    reward: 'FNCS Sentry Back Bling',
    category: 'locker',
  },
  { code: '9Years', reward: '9th Birthday Sprite Spray', category: 'locker' },
  { code: 'SAYH12WR1X3L', reward: 'Wrixel’s Hero Portrait Spray', category: 'locker' },
  {
    code: 'YourThoughtsAreMine',
    reward: 'Void Master Geno style + 5,000 Sprite Dust',
    category: 'locker',
    note: 'Progress to the final “Geno: The Ultimate Reality” story quest, then shoot Geno’s shield and let him eliminate you to complete a hidden quest.',
  },
  { code: 'BeMoreAlien', reward: 'Override Ready Loading Screen', category: 'locker' },
  { code: 'ReachYourImpossible', reward: 'Block Party Loading Screen', category: 'locker' },

  { code: 'VeryScaryPumpkin', reward: '3 Snack-O’-Lanterns', category: 'consumables' },
  { code: 'IThinkTheKeyFoundMeChat', reward: '1 Extraction Accelerator', category: 'consumables' },
  { code: 'BoneRattler', reward: '4 Spicy Tacos', category: 'consumables' },
  { code: 'WhoCrackedTheCode', reward: '40,000 XP', category: 'consumables' },
  { code: 'DustySprites', reward: '5,000 Sprite Dust', category: 'consumables' },
  { code: 'AlmostScaringSeason', reward: '2 Cheat Code Locators', category: 'consumables' },
  { code: 'PlayToLevelUp', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'ChatFindMeAnotherCode', reward: '2 Cheat Code Locators', category: 'consumables' },
  { code: 'NOCTURNEOP55N1', reward: '2 Extraction Accelerators', category: 'consumables' },
  { code: 'DestinyAwaits', reward: '2 Llama Supply Drops', category: 'consumables' },
  { code: 'BlinkyInkyPinkyClyde', reward: '5,000 Sprite Dust', category: 'consumables' },
  { code: 'BeamMeUp', reward: '2 Extraction Accelerators', category: 'consumables' },
  { code: 'DustInTheWind', reward: '5,000 Sprite Dust', category: 'consumables' },
  { code: 'NoProLlama', reward: '1 Llama Supply Drop', category: 'consumables' },
  { code: 'WhereIsTheDustyTree', reward: '5,000 Sprite Dust', category: 'consumables' },
  { code: 'ChatWhereDoYouFindTheKey', reward: '2 Extraction Accelerators', category: 'consumables' },
  { code: 'InvalidCheat', reward: '2 Cheat Code Locators', category: 'consumables' },
  { code: 'H0p0nVC', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'OverrideXP', reward: '40,000 XP', category: 'consumables' },
  { code: 'Magilume', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'Chispambo', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'Abgestaubt', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'PerlimPinPin', reward: '2,000 Sprite Dust', category: 'consumables' },
  { code: 'SurviveTheNight', reward: '2 Cheat Code Locators', category: 'consumables' },
  { code: 'FindItChat', reward: '2 Cheat Code Locators', category: 'consumables' },
  { code: 'TakeYourHeart', reward: '2 Extraction Accelerators', category: 'consumables' },
  { code: 'PerfectOrder', reward: '4 Spicy Tacos', category: 'consumables' },
  {
    code: 'O2Override',
    reward: '1 Llama Supply Drop & 1 Portable Extractor',
    category: 'consumables',
  },

  { code: 'B1gbodysw3rve', reward: 'Plays Lil Krazy by Yeat', category: 'effects', repeatable: true },
  { code: 'Pr1vat3j3t', reward: 'Plays Marching by Yeat', category: 'effects', repeatable: true },
  {
    code: 'LUHLEAKYZ',
    reward: 'Plays Timë Passed by Yeat',
    category: 'effects',
    repeatable: true,
  },
  {
    code: 'CrowsAreAfraid',
    reward: 'Turns you into a Scarecrow',
    category: 'effects',
    repeatable: true,
  },
  {
    code: 'S7H-50P-R03',
    reward: 'Plays Geno’s story quest',
    category: 'effects',
    repeatable: true,
    note: 'Finish the required “Geno: The Ultimate Reality” story quest first.',
  },
  {
    code: 'PumpkinSpiceLife',
    reward: 'Turns you into a Pumpkin',
    category: 'effects',
    repeatable: true,
  },
  { code: 'PowerOut', reward: 'FNAF Jumpscare', category: 'effects', repeatable: true },
  { code: 'BRB', reward: 'Turns you into a toilet', category: 'effects', repeatable: true },
  {
    code: 'InsertCoinToContinue',
    reward: 'Turns you into an arcade machine',
    category: 'effects',
    repeatable: true,
  },
  {
    code: 'DontBlockMe',
    reward: 'Turns you into a Tetrimino',
    category: 'effects',
    repeatable: true,
  },
  {
    code: 'LetsBlockAndRoll',
    reward: 'Turns you into a Tetrimino',
    category: 'effects',
    repeatable: true,
  },
]

export const LOBBY_HACK_COUNTS = {
  total: LOBBY_HACKS.length,
  sprites: LOBBY_HACKS.filter((h) => h.category === 'sprites').length,
  locker: LOBBY_HACKS.filter((h) => h.category === 'locker').length,
  consumables: LOBBY_HACKS.filter((h) => h.category === 'consumables').length,
  effects: LOBBY_HACKS.filter((h) => h.category === 'effects').length,
  questLocked: LOBBY_HACKS.filter((h) => Boolean(h.note)).length,
}

export const LOBBY_HACKS_HOWTO = [
  {
    title: 'BR pubs lobby',
    body: 'Stay in Battle Royale with Ranked off. Creative / Discover / Ranked usually hide the Admin Panel.',
  },
  {
    title: 'Open Admin Panel',
    body: 'Use the ⋯ / Admin Panel control (top-right of the lobby UI), paste a code, Submit. One redeem per account for XP / Dust / Sprites.',
  },
  {
    title: 'Click copies + marks used',
    body: 'Tap a code on this page to copy it and flag it in this browser. Used marks do not sync to Epic — unmark if you misclick.',
  },
]

export const LOBBY_HACKS_FAQS = [
  {
    question: 'How do I redeem Fortnite Lobby Hack codes?',
    answer:
      'Launch Fortnite, sit in the Battle Royale pubs lobby (Ranked off), open Admin Panel, paste the string, Submit. Claim whatever prompt the client shows.',
  },
  {
    question: 'Do Lobby Hack codes give free V-Bucks?',
    answer:
      'No. Override Admin Panel codes grant XP, Sprite Dust, Sprites, match tools, locker items, and lobby effects. Any site selling “free V-Bucks Admin codes” is a scam.',
  },
  {
    question: 'Why does a valid-looking code fail?',
    answer:
      'Already redeemed, mistyped, retired by Epic, or quest-locked. GatherAndCraft needs Wrixel’s Get Crafty. YourThoughtsAreMine and S7H-50P-R03 need the Geno story line.',
  },
  {
    question: 'When do Override Lobby Hacks expire?',
    answer: `Seasonal Admin Panel strings are tied to ${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}), scheduled through 1 November 2026. Epic can disable a code without notice — redeem leftovers this week.`,
  },
  {
    question: 'Does “mark as used” sync to my Epic account?',
    answer:
      'No. It only saves in this browser so you can see what you already copied. In-game progress still comes from Epic.',
  },
  {
    question: 'Are lobby transforms one-time?',
    answer:
      'Music and body-swap effects are usually reusable. This page still marks them used when you copy so the list stays tidy — tap Used to unmark.',
  },
]

export function categoryCount(id: LobbyHackCategory | 'all') {
  if (id === 'all') return LOBBY_HACKS.length
  return LOBBY_HACKS.filter((h) => h.category === id).length
}
