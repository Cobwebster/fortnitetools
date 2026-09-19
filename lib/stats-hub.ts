import { CURRENT_SEASON, formatSeasonLongDate, seasonEndDate } from '@/lib/season'

export const STATS_HUB_REVIEWED = '20 Sep 2026'
export const STATS_HUB_REVIEWED_ISO = '2026-09-20'

export const STATS_HUB_LINKS = [
  { href: '/tools/player-stats', label: 'Player stats lookup' },
  { href: '/tools/player-compare', label: 'Compare two players' },
  { href: '/player-count', label: 'Player count detail' },
  { href: '/map-rotation', label: 'Reload rotation' },
  { href: '/season', label: 'Season hub' },
  { href: '/codes', label: 'Creative codes' },
] as const

export const STATS_HUB_PLAYBOOK = [
  {
    title: 'Tracked player boards (our poll)',
    body: 'Wins, kills, Battle Pass level, and time boards rank Epic accounts we poll ourselves through Fortnite-API — the same source as the player stats lookup. It is a growing sample, not every Fortnite account on earth. Private profiles are skipped.',
  },
  {
    title: 'Mode popularity (peak CCU)',
    body: 'Separate tables rank Epic modes and Creative islands by peak concurrent players from Epic’s public Ecosystem Data API. Those answer “what is busy,” not “who has the most wins.”',
  },
  {
    title: `Override season context (${CURRENT_SEASON.shortLabel})`,
    body: `${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) runs through ${formatSeasonLongDate(seasonEndDate())}. Player boards use the current season window from Fortnite-API when we re-poll the seed list.`,
  },
  {
    title: 'Look up any name',
    body: 'Not on the tracked list? Use the player stats tracker for Epic / PlayStation / Xbox — lifetime or current season — without needing a global ladder.',
  },
] as const

export const STATS_HUB_FAQS = [
  {
    question: 'Can I get my Epic name on the FortniteTools leaderboards?',
    answer:
      'Yes. Sign in (or create an account), open account feedback, choose “Leaderboard — track my name,” and send your exact Epic display name plus platform. We review requests and add public profiles to the tracked poll that powers /stats.',
  },
  {
    question: 'Are these the same leaderboards as fortnite.gg?',
    answer:
      'No. We do not scrape fortnite.gg. Player boards are built by polling Fortnite-API for a seed list of Epic names we maintain. Mode/Creative boards use Epic’s Ecosystem peak CCU data. Both are ours.',
  },
  {
    question: 'Is this a global Fortnite wins leaderboard?',
    answer:
      'No. Epic does not publish a worldwide wins ladder through the APIs we use. Our player ranks only cover accounts in data/tracked-players.json that still have public stats. Grow the list and re-poll to expand coverage.',
  },
  {
    question: 'How often do player leaderboards update?',
    answer:
      'When we run the poll script and publish a new snapshot. Mode popularity tables refresh from Epic about every 30 minutes on their own.',
  },
  {
    question: 'What do the mode / Creative tables show?',
    answer:
      'Epic modes (Battle Royale, Reload, OG, Blitz, LEGO, Festival, Racing) and high-traffic Creative maps, sorted by latest peak concurrent players (Peak CCU).',
  },
  {
    question: 'Where can I check my personal Fortnite stats?',
    answer:
      'Open the player stats tool, enter an Epic, PlayStation, or Xbox name, and choose lifetime or current season.',
  },
  {
    question: 'Is this the same as the player count page?',
    answer:
      '/stats is the hub for tracked player boards plus mode popularity. /player-count focuses on Epic CCU and island lookup. Same CCU source; player boards live on /stats.',
  },
]
