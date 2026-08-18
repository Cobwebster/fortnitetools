import { ROTATION_MODES } from '@/lib/map-rotation'

export const RELOAD_REVIEWED = '18 Aug 2026'

export const RELOAD_ISLANDS = ROTATION_MODES.find((m) => m.id === 'reload')?.maps ?? []

export const MODE_COMPARE = [
  {
    mode: 'Battle Royale',
    href: '/fortnite-map',
    players: '100 (typical pubs)',
    respawn: 'No — one life',
    island: 'Shattered Coast (C7S3). S4 island TBD until the reboot.',
    storm: 'Full BR circles — use the zone timer',
    pickWhen: 'Ranked LP, mythics, the current Battle Pass island, placement games.',
  },
  {
    mode: 'Reload',
    href: '/reload',
    players: 'Usually smaller than BR; Springfield is 50',
    respawn: 'Yes — you drop back in until the late game',
    island: 'Rotating 20-minute pool: Oasis, Slurp Rush, Springfield',
    storm: 'Faster than BR. Games end sooner; loot is the Reload pool, not Shattered Coast.',
    pickWhen: 'Warm-up, more fights per hour, a specific small island, Ranked Reload when that queue is up.',
  },
  {
    mode: 'Blitz Royale',
    href: '/map-rotation',
    players: '32',
    respawn: 'No-build sprint — not Reload respawn',
    island: 'Currently a single map (Venture). Multi-map Blitz is usually 10-minute slots.',
    storm: 'Aggressive. Matches are short on purpose.',
    pickWhen: 'You want a 5–8 minute no-build game, not a BR or Reload session.',
  },
  {
    mode: 'OG',
    href: '/modes',
    players: 'BR-style on the Figment / Chapter 1 island',
    respawn: 'No (standard OG BR)',
    island: 'Chapter 1 layout — not the Reload rotation and not Shattered Coast',
    storm: 'OG circle timings, OG loot',
    pickWhen: 'Nostalgia pubs or Ranked OG. Do not confuse “old map” with Reload’s Venture-style islands.',
  },
] as const

export const RELOAD_WHY = [
  {
    title: 'Respawn is the whole mode',
    body: 'You are not playing Battle Royale with extra lives taped on. Early deaths are cheap. Late deaths are not — Reload still ends in a real storm. If you W-key every respawn and never loot heals, you will still die 12th with 11 kills and wonder why it felt empty.',
  },
  {
    title: 'The island is small on purpose',
    body: 'Oasis, Slurp Rush, and Springfield are not Shattered Coast. Rotates are short. Third parties are constant. A “quiet edge drop” from the BR map does not exist here the same way. You are choosing a POI for the first 90 seconds, not a 15-minute edge hold.',
  },
  {
    title: 'You cannot pick the map',
    body: 'Epic keeps one Reload island live at a time so queues stay full. That is why the rotation timer exists. If you want Springfield’s Confidential / John Wick Sprite window, you queue in the :40 slot — you do not select it in Discover.',
  },
] as const

export const RELOAD_ISLAND_PLAY = [
  {
    id: 'oasis',
    name: 'Oasis',
    slot: ':00 – :20',
    play: 'Desert spacing. Mid-range ARs matter more than they do on Springfield’s streets. Hotel / Palms-style hubs are the contest; if you hate open sand, wait for Slurp or Springfield instead of forcing Oasis every hour.',
    skip: 'Skip if you only have a shotgun and no AR — you will get farmed crossing dunes. Skip the last two minutes if you wanted Slurp swamp fights; finish the match or wait.',
  },
  {
    id: 'slurp-rush',
    name: 'Slurp Rush',
    slot: ':20 – :40',
    play: 'Chapter 2 Slurp geography: swamp, stacks, docks. Slurp pickups stretch fights. Expect third parties on every noise. This is the “more gunfights” slot, not the placement slot.',
    skip: 'Skip if you are warming up for ranked BR and you need building space — the swamp eats boxes. Queue Oasis or wait for pubs.',
  },
  {
    id: 'springfield',
    name: 'Springfield',
    slot: ':40 – :00',
    play: '50-player Simpsons island. Tight streets. The Confidential is the no-combat POI — treat it as a loot/Sprite stop, not a box-fight arena. Queue a couple of minutes early; a match started at :39 can still be Slurp Rush.',
    skip: 'Skip if you wanted 100-player chaos. This is the crowded-feeling small island, not BR density.',
  },
] as const

export const RELOAD_VS_BR_LOOT = {
  title: 'Reload loot is not the BR pool',
  body: 'Do not build a Shattered Coast hotbar and expect it on Oasis. Reload ships its own floor/chest pool on the small islands. Mythics and Duck Race traffic from C7S3 BR do not transfer. If you care about Surgical Burst / Striker Pump numbers, that is the BR weapons page and loadout builder — not this mode.',
} as const

export const RELOAD_XP = {
  title: 'Does Reload count for the Battle Pass?',
  body: 'Yes. Reload is a core playlist, not a Creative island with a fake multiplier. You get match XP, quest progress that is not island-gated, and the usual rest bonus. It still loses to a dedicated XP Creative code if you are only grinding levels before the season lock — use the XP calculator if you are short. Do not queue Reload expecting Shattered Coast milestone quests (extracts, Duck Race, named POI visits) to complete; those are BR island quests.',
} as const

export const RELOAD_FAQS = [
  {
    question: 'What is Fortnite Reload?',
    answer:
      'Reload (playlist flag BlastBerry) is respawn Battle Royale on a rotating set of small islands. You drop in again after an early death. Matches are shorter than Shattered Coast BR. The live island changes every 20 minutes — Oasis, Slurp Rush, Springfield as of 18 Aug 2026.',
  },
  {
    question: 'Is Reload the same as Blitz?',
    answer:
      'No. Blitz is a 32-player no-build sprint (Forbidden Fruit) on a compact island — currently Venture, not on the 20-minute Reload clock. Reload lets you respawn. Blitz does not play like that. OG is a third thing: Chapter 1 BR, not a Reload slot.',
  },
  {
    question: 'Can I choose which Reload map to play?',
    answer:
      'No. One island is live globally at a time so matchmaking does not split. Check the rotation timer and queue inside that map’s 20-minute window. Matches already in progress finish on the old island.',
  },
  {
    question: 'Does Reload give Battle Pass XP?',
    answer:
      'Yes — Reload is a core playlist and counts toward the pass the same way other BR-family modes do. Rates still lose to a dedicated XP Creative island if you are only grinding levels. Use the XP calculator if you are short before the season lock.',
  },
  {
    question: 'Is there Ranked Reload?',
    answer:
      'When Epic enables it, Ranked Reload is a separate Habanero queue — same small islands, LP instead of pub sandbox. It is not the Shattered Coast ranked map. Check Discover; the modes catalog labels Ranked when the playlist id contains Habanero.',
  },
  {
    question: 'Why is this page not the rotation timer?',
    answer:
      'The timer at /map-rotation answers “what map is on right now.” This page answers what Reload is, how it differs from BR and Blitz, and which island to queue for. Use both.',
  },
]
