export type ToolCategoryId =
  | 'all'
  | 'cosmetics'
  | 'stats'
  | 'map'
  | 'calculators'
  | 'weapons'
  | 'settings'
  | 'season'

export type ToolEntry = {
  href: string
  title: string
  description: string
  tags: string[]
  category: Exclude<ToolCategoryId, 'all'>
}

export const TOOL_CATEGORY_META: { id: ToolCategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cosmetics', label: 'Cosmetics' },
  { id: 'stats', label: 'Stats' },
  { id: 'map', label: 'Map & Codes' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'weapons', label: 'Weapons' },
  { id: 'settings', label: 'Settings' },
  { id: 'season', label: 'Season' },
]

export const TOOLS: ToolEntry[] = [
  {
    href: '/free-cosmetics',
    title: 'Free Fortnite Cosmetics',
    description:
      'Track free rewards — Twitch drops, quests, Ranked, Sprite mastery, passes, and account links with end dates.',
    tags: ['Free', 'Cosmetics', 'Drops'],
    category: 'cosmetics',
  },
  {
    href: '/xp-calculator',
    title: 'Fortnite XP Calculator',
    description:
      'Daily XP to hit level 100 or 200, on-pace checkpoints, XP per level, and playtime rates for BR, Reload, LEGO, Festival, and Creative.',
    tags: ['XP', 'Levels', 'Battle Pass'],
    category: 'calculators',
  },
  {
    href: '/season-countdown',
    title: 'Season Countdown',
    description:
      'When does Chapter 7 Season 3 end? Live countdown to August 19, 2026 and Chapter 7 Season 4 start.',
    tags: ['Season', 'Countdown', 'End Date'],
    category: 'season',
  },
  {
    href: '/codes',
    title: 'Creative Map Codes',
    description:
      'Searchable Fortnite Creative island codes — XP maps, horror, 1v1, tycoon, escape rooms, deathruns, and more.',
    tags: ['Codes', 'XP', 'Creative'],
    category: 'map',
  },
  {
    href: '/tools/player-stats',
    title: 'Fortnite Tracker & Stats Checker',
    description:
      'Free Fortnite tracker — look up K/D, wins, win rate, matches, and Solo/Duo/Squad stats by Epic, PlayStation, or Xbox name.',
    tags: ['Tracker', 'Stats', 'K/D'],
    category: 'stats',
  },
  {
    href: '/fortnite-map',
    title: 'Interactive Map',
    description:
      'Shattered Coast POI map with loot ratings, contest filters, and drop tips for Chapter 7 Season 3.',
    tags: ['Map', 'Loot', 'POIs'],
    category: 'map',
  },
  {
    href: '/map-rotation',
    title: 'Map Rotation Timer',
    description:
      'Live Reload map schedule — Venture, Oasis, Elite Stronghold — with countdown to the next island, plus Blitz status.',
    tags: ['Reload', 'Blitz', 'Timer'],
    category: 'map',
  },
  {
    href: '/player-count',
    title: 'Player Count',
    description:
      'Fortnite peak concurrent players for Battle Royale, Reload, OG, Blitz, LEGO, and popular Creative maps — from Epic’s public Data API.',
    tags: ['Players', 'CCU', 'Popular Maps'],
    category: 'stats',
  },
  {
    href: '/map-evolution',
    title: 'Map Evolution',
    description:
      'Slide to compare Fortnite maps across every chapter and season — Chapter 1 through Chapter 7 side by side.',
    tags: ['History', 'Compare', 'Chapters'],
    category: 'map',
  },
  {
    href: '/tools/item-shop',
    title: 'Item Shop Tracker',
    description:
      'Live shop rotation plus newly added cosmetics and a searchable catalog of outfits, emotes, and more.',
    tags: ['Shop', 'Skins', 'Emotes'],
    category: 'cosmetics',
  },
  {
    href: '/tools/loadout-builder',
    title: 'Loadout Builder',
    description:
      'Build a C7S3 hotbar with real item icons — shotgun, AR, SMG, heals, mobility — plus estimated STK/TTK.',
    tags: ['Loadout', 'Weapons', 'TTK'],
    category: 'weapons',
  },
  {
    href: '/tools/fortnite-build-simulator',
    title: 'Build Simulator',
    description:
      'Practice Fortnite-style building in the browser — walls, floors, ramps, cones, mats, move/jump, and collision.',
    tags: ['Building', 'Practice', '3D'],
    category: 'settings',
  },
  {
    href: '/tools/skin-rarity-calculator',
    title: 'Skin Rarity Calculator',
    description:
      'Look up any outfit and see scarcity from shop history — appearances, last seen, Battle Pass exclusives, and OG vault status.',
    tags: ['Skins', 'Rarity', 'OG'],
    category: 'cosmetics',
  },
  {
    href: '/tools/sensitivity-calculator',
    title: 'Sensitivity Calculator',
    description:
      'Convert mouse sensitivity from Valorant, CS2, Apex, and more to Fortnite using cm/360 as a starting point.',
    tags: ['Aim', 'Settings', 'Mouse'],
    category: 'settings',
  },
  {
    href: '/tools/kd-calculator',
    title: 'K/D Calculator',
    description:
      'Calculate Kill/Death ratio, win rate, and kills per game with rough public-lobby comparison ranges.',
    tags: ['Stats', 'K/D', 'Win Rate'],
    category: 'stats',
  },
  {
    href: '/tools/zone-timer',
    title: 'Zone Timer',
    description:
      'Storm circle wait and shrink reference for Chapter 7 Season 3. Start it when a new zone appears so you know when to rotate.',
    tags: ['Storm', 'Rotation', 'Strategy'],
    category: 'season',
  },
  {
    href: '/tools/fps-settings',
    title: 'FPS & Settings Guide',
    description:
      'Graphics, display, and audio presets for competitive, balanced, and quality play — with notes on what actually costs FPS.',
    tags: ['FPS', 'Graphics', 'Settings'],
    category: 'settings',
  },
  {
    href: '/tools/keybinds',
    title: 'Pro Keybinds Reference',
    description:
      'Side-by-side keyboard bind reference for well-known players. Use it as a starting point, not a mandatory layout.',
    tags: ['Keybinds', 'Building', 'Pro'],
    category: 'settings',
  },
  {
    href: '/weapons',
    title: 'All Fortnite Weapons',
    description:
      'Full weapon encyclopedia — current pool plus vaulted history with DPS, damage, fire rate, mag, and reload by rarity.',
    tags: ['Weapons', 'DPS', 'Stats'],
    category: 'weapons',
  },
  {
    href: '/weapon-changes',
    title: 'Weapon Changes',
    description:
      'Fortnite weapon buffs and nerfs by patch — damage, DPS, fire rate, mag, reload, and structure damage with Old / New / Change.',
    tags: ['Balance', 'Buffs', 'Nerfs'],
    category: 'weapons',
  },
  {
    href: '/tools/weapon-damage-calculator',
    title: 'Weapon Damage Calculator',
    description:
      'Shots-to-kill, TTK, and DPS estimates for Chapter 7 Season 3 weapons in the current loot pool sample.',
    tags: ['Weapons', 'Damage', 'TTK'],
    category: 'weapons',
  },
  {
    href: '/tools/vbucks-calculator',
    title: 'V-Bucks Calculator',
    description:
      'Build a wishlist and estimate a low-cost V-Bucks pack combination using common USD storefront prices.',
    tags: ['V-Bucks', 'Skins', 'Shop'],
    category: 'calculators',
  },
  {
    href: '/tools/battle-pass-xp-calculator',
    title: 'Battle Pass XP Calculator',
    description:
      'Check if you can finish the Battle Pass before the season ends. Enter your level and weekly XP sources to project your final level.',
    tags: ['XP', 'Battle Pass', 'Levels'],
    category: 'calculators',
  },
]

export function filterTools(
  tools: ToolEntry[],
  opts: { query?: string; category?: ToolCategoryId; tag?: string | null }
): ToolEntry[] {
  const q = opts.query?.trim().toLowerCase() ?? ''
  const category = opts.category ?? 'all'
  const tag = opts.tag?.trim().toLowerCase() || null

  return tools.filter((tool) => {
    if (category !== 'all' && tool.category !== category) return false
    if (tag && !tool.tags.some((t) => t.toLowerCase() === tag)) return false
    if (!q) return true
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((t) => t.toLowerCase().includes(q)) ||
      tool.category.includes(q)
    )
  })
}
