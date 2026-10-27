import { CURRENT_SEASON } from '@/lib/season'

/** Calendar date this Creative codes hub was last checked. */
export const CREATIVE_CODES_REVIEWED = '24 Oct 2026'

export const CREATIVE_CODES_FAQS = [
  {
    question: 'How do I enter a Fortnite Creative map code?',
    answer:
      'In Fortnite open Discover, hit the search icon, paste the 12-digit code (XXXX-XXXX-XXXX), then Play. Private match if you are XP farming. You can also open the Fortnite.com island link from a card on this page.',
  },
  {
    question: 'What are the best Fortnite XP map codes right now?',
    answer:
      'Start with FortM (6163-6465-2983) in a private lobby. If XP slows or the island is packed, rotate to Marble Tycoon, Squid Game Tycoon, or Prison Escape. Filter this page to XP Maps and sort by live unique players — codes break after patches.',
  },
  {
    question: 'Is there a Creative XP cap?',
    answer:
      'Yes. Epic caps how much Battle Pass XP you can earn from Creative / UEFN islands each day (and there is a larger weekly allowance). When your pass bar stops moving on a farm map, switch to BR weeklies, Admin Panel XP codes, or stop for the day. Use the XP calculator to see if you can still finish Override before 1 November 2026.',
  },
  {
    question: 'Do horror maps give XP?',
    answer:
      'Sometimes. Face Your Fears and Midnight Anomalies are listed because they are actually scary, not because they are farms. Check the in-game XP badge on the island details before grinding them for levels.',
  },
  {
    question: 'Where are the 1v1 and Zone Wars codes?',
    answer:
      'Use the 1v1 filter for Ranked Aim Edit Piece and build-fight warmups. Zone Wars and Pillars maps (including viral brainrot islands) sit under Zone Wars / PvP. Box Fights cover short arena reps.',
  },
  {
    question: 'Why did a code stop working?',
    answer:
      'Creators unpublish islands, Epic disables XP, or Discover search fails on a mistyped string. We only keep codes that still resolve on Epic’s public island API — if a card disappears after a refresh, the island is gone.',
  },
  {
    question: 'Are these official Epic codes?',
    answer:
      'The islands are made by Creative / UEFN creators. We only list codes that still resolve on Epic’s public island API, with Discover art when we have a stable thumbnail. FortniteTools is a fan site, not an Epic product.',
  },
  {
    question: 'Admin Panel Lobby Hack codes vs Creative map codes?',
    answer:
      'Different systems. Lobby Hack codes are typed in the Override Admin Panel for Sprite Dust / XP / Sprites. Creative map codes load islands in Discover. Copy lobby strings on the Lobby Hacks page.',
  },
]

export const CREATIVE_CODES_PLAYBOOK = [
  {
    title: 'Copy → Discover → Play',
    body: 'Tap Copy on a card, open Discover search in Fortnite, paste with dashes, then Play. Private lobby for XP farms so randoms cannot grief your session.',
  },
  {
    title: 'Respect the Creative XP cap',
    body: `${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) still caps Creative XP. When the pass stops moving, finish BR weeklies or redeem Admin Panel XP codes instead of sitting on a dead farm.`,
  },
  {
    title: 'Rotate when gains slow',
    body: 'One map forever usually plateaus. Keep FortM, a tycoon, and a prison / adventure farm as a three-island rotation. Live unique / peak numbers on the cards help you skip empty or broken lobbies.',
  },
  {
    title: 'Warm up before Ranked',
    body: '1v1 aim/edit maps and Zone Wars beat jumping straight into Ranked cold. Use Box Fights for short piece-control reps, then queue.',
  },
] as const

export const CREATIVE_CODES_GENRE_GUIDES = [
  {
    id: 'xp',
    title: 'XP Maps',
    body: 'Battle Pass leveling islands — FortM, tycoons, prison escapes. Private lobby, watch the daily Creative cap, then swap.',
  },
  {
    id: '1v1',
    title: '1v1 / Practice',
    body: 'Aim, edit, and build-fight warmups before Ranked or cups. Ranked Aim Edit Piece is the default starter.',
  },
  {
    id: 'zonewars',
    title: 'Zone Wars & Pillars',
    body: 'Storm-close fights and viral pillars / brainrot lobbies. Great for mid-game practice, loud for focus grinding.',
  },
  {
    id: 'horror',
    title: 'Horror & Escape',
    body: 'Story jumpscares and co-op escapes. Pick these for fun first — XP is a bonus if the island still awards it.',
  },
  {
    id: 'deathrun',
    title: 'Deathrun / Parkour',
    body: 'From short extreme courses to 200-stage slogs. Not an XP meta — use when you want movement reps.',
  },
  {
    id: 'tycoon',
    title: 'Tycoons',
    body: 'Clicker / upgrade loops (Marble, Squid, Star Wars, brainrot). Often the chillest path to the Creative cap.',
  },
] as const

export const CREATIVE_CODES_LINKS = [
  { href: '/guides/season/best-fortnite-xp-maps', label: 'XP leveling guide' },
  { href: '/xp-calculator', label: 'Battle Pass XP calculator' },
  { href: '/player-count', label: 'Live Creative CCU' },
  { href: '/stats', label: 'Player stats hub' },
  { href: '/lobby-hacks', label: 'Lobby Hacks' },
  { href: '/season-countdown', label: 'Season countdown' },
] as const
