import { CURRENT_SEASON, formatSeasonLongDate, seasonEndDate } from '@/lib/season'

export const STATS_HUB_REVIEWED = '24 Oct 2026'
export const STATS_HUB_REVIEWED_ISO = '2026-10-24'

export const STATS_HUB_LINKS = [
  { href: '/tools/player-stats', label: 'Look up a name' },
  { href: '/tools/player-compare', label: 'Compare two players' },
  { href: '/player-count', label: 'Player count' },
  { href: '/season', label: 'Season hub' },
  { href: '/codes', label: 'Creative codes' },
] as const

export const STATS_HUB_PLAYBOOK = [
  {
    title: 'How we build the player boards',
    body: 'We keep a seed list of Epic display names in data/tracked-players.json, call Fortnite-API on a schedule, and rank whoever still has public stats. Private profiles get skipped. It is a living sample — not every account on earth, and not a scrape of another site.',
  },
  {
    title: 'What the medals mean',
    body: 'Gold / silver / bronze icons mark places 1–3 inside each tracked board (wins, kills, Battle Pass level, time). Everything else is a plain rank number.',
  },
  {
    title: 'Mode popularity is a different question',
    body: 'The CCU tables answer “what lobby is busy right now?” using Epic’s public Ecosystem data. They do not say who has the most wins.',
  },
  {
    title: `Season window (${CURRENT_SEASON.codename})`,
    body: `Override runs through ${formatSeasonLongDate(seasonEndDate())}. When we re-poll, player boards use the current season window from Fortnite-API so Battle Pass level and season stats stay current.`,
  },
  {
    title: 'Want on the board?',
    body: 'Sign in, open account feedback, pick “Leaderboard — track my name,” and send your exact Epic name + platform. We add public profiles to the next poll.',
  },
] as const

export const STATS_HUB_FAQS = [
  {
    question: 'Can I get my Epic name on these leaderboards?',
    answer:
      'Yes. Sign in, open account feedback, choose “Leaderboard — track my name,” and send your exact Epic display name plus platform. Public profiles only.',
  },
  {
    question: 'Is this a scraped third-party ladder?',
    answer:
      'No. We poll Fortnite-API for names we track ourselves. Mode/Creative tables use Epic’s Ecosystem CCU data.',
  },
  {
    question: 'Is this a global wins leaderboard?',
    answer:
      'No. Epic does not publish a worldwide wins ladder through the APIs we use. Ranks only cover the seed list that still has public stats.',
  },
  {
    question: 'How often do player boards update?',
    answer:
      'When we run the poll and publish a new snapshot. Mode popularity refreshes from Epic on its own (~30 minutes).',
  },
  {
    question: 'Where do I check my own stats?',
    answer:
      'Use the player stats lookup — Epic, PlayStation, or Xbox name, lifetime or current season. Manual K/D is on that page if the API is private.',
  },
]
