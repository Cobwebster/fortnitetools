import { DROP_GUIDES } from '@/lib/drop-guides'
import { formatSeasonLongDate, nextSeasonStartDate, seasonEndDate } from '@/lib/season'

export const RANKED_REVIEWED = '31 Aug 2026'
export const RANKED_REVIEWED_ISO = '2026-08-31'

export const RANK_TIERS = [
  { tier: 'Bronze I–III', who: 'Placement school. Survive, loot, make zone. Kills are extra.' },
  { tier: 'Silver I–III', who: 'You can rotate without dying to storm every game. Still punishable for hot drops.' },
  { tier: 'Gold I–III', who: 'Top-25 should be normal. Start taking cracked fights, not 50/50s off spawn.' },
  { tier: 'Platinum I–III', who: 'Mechanics start to matter. Edits and zone reads separate you from Gold.' },
  { tier: 'Diamond I–III', who: 'All-round. Bad drops and tilt sessions are where Diamond is lost.' },
  { tier: 'Elite', who: 'Lobby quality jumps. Habits from the long guide matter more than a new shotgun.' },
  { tier: 'Champion', who: 'Top band of the ladder. Full competitive mechanics, not pub W-key.' },
  { tier: 'Unreal', who: 'Highest band. Thresholds move by season and region — trust the in-game ladder, not a screenshot from last chapter.' },
] as const

export const LP_RULES = [
  {
    title: 'Placement is the bigger number',
    body: 'A top 10 with one elimination usually beats a 30th with six. Ranked is not pubs. If you are hardstuck, look at average placement before you look at K/D.',
    image: '/images/icons/crown.png',
  },
  {
    title: 'Eliminations are a bonus on top',
    body: 'Late-game elims pay more than spawn-island picks. Cracked third-parties in zone are the Gold–Diamond farm. Running at full-health boxes off drop is how you donate LP.',
    image: '/images/loadout/striker_pump.png',
  },
  {
    title: 'Dying early is expensive',
    body: 'Negative LP on a bad place is the real ranked tax. That is why Heatwave Harbor and Battlewoods are terrible climb drops when the bus is near — not because the loot is bad.',
    image: '/images/loadout/shockwave.png',
  },
] as const

export const RANKED_QUEUES = [
  {
    name: 'Ranked Battle Royale',
    body: 'Override island (C7S4). Same map as pubs, different lobby. Match Overrides can change the ruleset mid-season — check the playlist tile before you assume classic BR.',
    image: 'https://fortnite-api.com/images/map.png',
    alt: 'Chapter 7 Season 4 Override live minimap',
    badge: '/images/icons/crown.png',
  },
  {
    name: 'Ranked Zero Build',
    body: 'Same island, no builds. Cover and mobility matter more. Cafe roofs and open docks from the drop pages get worse, not better.',
    image: 'https://fortnite-api.com/images/map.png',
    alt: 'Override island — Ranked Zero Build uses the same map',
    badge: '/images/icons/glider.png',
  },
  {
    name: 'Ranked Reload',
    body: 'Small rotating islands — not the big BR map. LP still exists; the drop guides on this site do not apply. Use the Reload hub and the rotation timer.',
    image: '/images/map-rotation/oasis.webp',
    alt: 'Reload island art — Oasis, not Override BR',
    badge: '/images/icons/storm.png',
  },
  {
    name: 'Ranked OG',
    body: 'When Epic has the Figment queue up. Chapter 1 island, Chapter 1 loot. Do not bring a C7S4 Override loadout plan.',
    image: '/images/map-evolution/1-11.webp',
    alt: 'Chapter 1 OG island map',
    badge: '/images/loadout/rift.png',
  },
] as const

export const RANKED_DROPS = DROP_GUIDES.map((d) => ({
  slug: d.slug,
  name: d.name,
  contest: d.contest,
  ranked:
    d.contest === 'hot'
      ? 'Pubs / ego. Climb only if you can win the land every time.'
      : d.contest === 'edge'
        ? 'Placement / LP. Leave on time if zone is north.'
        : 'Default climb drop. Repeatable, not a highlight reel.',
  href: `/drops/${d.slug}`,
}))

export const RANKED_RESET = {
  title: 'When does Fortnite ranked reset?',
  live: `Chapter 7 Season 4 (Override) ranked is the live ladder. Season ends ${formatSeasonLongDate(seasonEndDate())}. Your Bronze–Unreal rank and LP are S4 until the next flip.`,
  incoming: `Chapter 7 Season 5 is dated ${formatSeasonLongDate(nextSeasonStartDate())} (UTC). Fortnite almost always resets ranked LP at a season boundary. Confirm the ranked tab in-game on reboot day — we will not invent a new point formula.`,
  after: 'After a reset you typically land in a lower band with some soft seed from last season. The exact seed changes. Screenshot your rank before downtime if you care; the client is the source of truth after.',
} as const

export const RANKED_VS_GUIDE = {
  thisPage:
    'This URL is the season sheet: which Override drops still make sense for climb games, which queues exist, and how placement vs elims pay. Search “Fortnite ranked reset” should land here, not on a 3,000-word climb essay.',
  longGuide:
    'The June 28, 2026 climb article is Bronze → Unreal habits: w-key vs placement, tilt, loadouts, and what changes at Gold/Diamond/Elite. It is not a reset clock. Link both; do not paste one into the other.',
  modes:
    '/modes is every playlist id in the game files, including Festival and LEGO. A Habanero row in that catalog means the files still contain the queue — not that matchmaking is healthy tonight.',
} as const

export const LAST_NIGHT = [
  {
    title: 'Learn Match Overrides before you blame LP',
    body: 'Override can flip rulesets mid-season. If the playlist tile says something weird and you still drop Heatwave like classic BR, that is on you — not the ladder.',
  },
  {
    title: 'Finish the Pass on a schedule',
    body: 'Unclaimed Override free-track rewards lock when the season ends (November 1). If you are level 87, the XP calculator and Creative codes matter more than one more Diamond lobby.',
  },
  {
    title: 'Returning POIs ≠ identical traffic',
    body: 'Wonkeeland / Latte still have drop pages. Green Hill Zone, Reality’s Reign, and Stone Sanctum do not yet. Treat new names as contested until you have your own reps.',
  },
] as const

export const RANKED_NOT = [
  {
    title: 'Not pubs with a badge',
    body: 'Loot pool is the same island, but the incentive is not. Pubs reward clips. Ranked rewards still being alive in circle 4.',
  },
  {
    title: 'Not FNCS / cash cups',
    body: 'Those are tournament playlists with their own formats. Ranked is the always-on ladder. We do not fake a competitive calendar — Epic’s events service is not a public feed we can poll.',
  },
  {
    title: 'Not the modes catalog',
    body: '/modes is every playlist id in the game files, including Festival and LEGO. This page is how the ranked ladder works this season: LP, reset, and where to land.',
  },
] as const

export const RANKED_FAQS = [
  {
    question: 'When does Fortnite ranked reset?',
    answer: `Override ranked already reset at the August 20 reboot. The next expected ladder flip is with Chapter 7 Season 5 (${formatSeasonLongDate(nextSeasonStartDate())} UTC). Confirm the ranked screen after downtime. Last reviewed ${RANKED_REVIEWED}.`,
  },
  {
    question: 'Do I keep my rank into Season 5?',
    answer:
      'You do not keep S4 LP as-is. There is usually a soft seed so Unreal does not wake up in Bronze I, but you will not log in at the same division. Do not spend the last day of the season “protecting” a badge that is about to roll.',
  },
  {
    question: 'How does Fortnite ranked LP work?',
    answer:
      'Placement first, eliminations second, early death expensive. A consistent top 10 climbs faster than a 5 K/D that dies 35th. The long climb guide covers Bronze through Unreal habits; this page is the season version.',
  },
  {
    question: 'Where should I drop in ranked?',
    answer:
      'Returning POIs: Wonkeeland or Latte Landing for climb games, Sunken Shores for placement, Heatwave / Battlewoods only if you can win the POI. New Override names (Green Hill Zone, Reality’s Reign, Stone Sanctum) do not have dedicated drop pages yet — scout them in pubs first.',
  },
  {
    question: 'Is Ranked Reload the same map as Ranked BR?',
    answer:
      'No. Ranked BR is the big island. Ranked Reload is the 20-minute small-island rotation. LP does not transfer between them as one shared number in a way you should plan around — play the queue you queued.',
  },
  {
    question: 'Why is ranked harder than my K/D suggests?',
    answer:
      'Pubs pad K/D. Ranked pads placement. If your tracker looks godlike and Diamond feels impossible, you are probably dying 20th with kills. Open the stats tracker, then read the climb guide’s Gold–Diamond section.',
  },
]
