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
  { id: 'weapons', label: 'Weapons' },
  { id: 'settings', label: 'Settings' },
  { id: 'season', label: 'Season' },
  { id: 'calculators', label: 'Calculators' },
]

/** Order: interactive / data tools first; calculators last. */
export const TOOLS: ToolEntry[] = [
  {
    href: '/tools/fortnite-build-simulator',
    title: 'Build Simulator',
    description:
      'Practice Fortnite-style building in the browser — walls, floors, ramps, cones, mats, move/jump, and collision.',
    tags: ['Building', 'Practice', '3D'],
    category: 'settings',
  },
  {
    href: '/fortnite-map',
    title: 'Interactive Map',
    description:
      'Live Override POI map with loot ratings, contest filters, and drop tips for Chapter 7 Season 4.',
    tags: ['Map', 'Loot', 'POIs'],
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
    href: '/tools/player-compare',
    title: 'Player Compare',
    description:
      'Compare two Fortnite players side by side — wins, K/D, win rate, kills, and matches for season or lifetime.',
    tags: ['Compare', 'Tracker', 'K/D'],
    category: 'stats',
  },
  {
    href: '/upload',
    title: 'Community Uploads',
    description:
      'Player guides (YouTube/socials welcome), loadouts, XP maps, keybinds, FPS presets, drops, tips, and more — public UGC feed.',
    tags: ['Community', 'UGC', 'Guides'],
    category: 'season',
  },
  {
    href: '/tools/loadout-builder',
    title: 'Loadout Builder',
    description:
      'Override inventory after v42.40 — hotbar without Midas/Drum, mats, ammo, Fortnitemares presets, kit scorecard, and STK/TTK. Share one link with the lobby.',
    tags: ['Loadout', 'Mats', 'TTK'],
    category: 'weapons',
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
    href: '/cosmetic-stats',
    title: 'Cosmetic Stats',
    description:
      'Fortnite outfit shop stats — most Item Shop appearances, longest vaults, recent returns, and what’s live tonight.',
    tags: ['Shop History', 'Vaulted', 'Skins'],
    category: 'cosmetics',
  },
  {
    href: '/season',
    title: 'Override Season Hub',
    description:
      'New POIs, Match Overrides, ranked notes, and Battle Pass timing through November 1.',
    tags: ['Season', 'Loot', 'Ranked'],
    category: 'season',
  },
  {
    href: '/drops',
    title: 'Best Drops',
    description:
      'Named-POI landing pages with contest, extract, third-party, and rotate paths — Heatwave Harbor, Battlewoods, Wonkeeland, Latte Landing, Sunken Shores.',
    tags: ['Drops', 'POI', 'Map'],
    category: 'map',
  },
  {
    href: '/sets',
    title: 'Live Cosmetic Sets',
    description:
      'Tonight’s Item Shop sets plus current-build sets, capped, with shop history. Not a page per outfit.',
    tags: ['Sets', 'Shop', 'Skins'],
    category: 'cosmetics',
  },
  {
    href: '/news',
    title: 'Fortnite News',
    description:
      'Live Battle Royale lobby headlines with FortniteTools takes that point at the map, shop, freebies, and season countdown.',
    tags: ['News', 'Lobby', 'Season'],
    category: 'season',
  },
  {
    href: '/modes',
    title: 'Game Modes',
    description:
      'Playlist catalog from game files — BR, Zero Build, Ranked, Reload, OG, LTMs, Festival, LEGO, and Rocket Racing.',
    tags: ['Modes', 'Ranked', 'Reload'],
    category: 'season',
  },
  {
    href: '/new-cosmetics',
    title: 'New Cosmetics',
    description:
      'Cosmetics added in the current game build — outfits, emotes, jam tracks, and cars. New is not the same as in the shop tonight.',
    tags: ['Skins', 'New', 'Leaks'],
    category: 'cosmetics',
  },
  {
    href: '/creator-code',
    title: 'Creator Code Checker',
    description:
      'Look up a Support-A-Creator slug to see if it is ACTIVE and which Epic account it maps to.',
    tags: ['Creator', 'Shop', 'Codes'],
    category: 'cosmetics',
  },
  {
    href: '/map-rotation',
    title: 'Map Rotation Timer',
    description:
      'Live Reload map schedule — Oasis, Slurp Rush, Springfield — with countdown to the next island, plus Blitz status.',
    tags: ['Reload', 'Blitz', 'Timer'],
    category: 'map',
  },
  {
    href: '/reload',
    title: 'Fortnite Reload',
    description:
      'What Reload is: respawn BR on Oasis, Slurp Rush, and Springfield, vs Battle Royale and Blitz. Fortnitemares overlay through 1 Nov. Last reviewed 24 Oct 2026.',
    tags: ['Reload', 'Modes', 'Maps'],
    category: 'season',
  },
  {
    href: '/ranked',
    title: 'Fortnite Ranked',
    description:
      'LP, Null ranked styles, Override climb drops, and Match Overrides after v42.40. Last reviewed 24 Oct 2026.',
    tags: ['Ranked', 'LP', 'Reset'],
    category: 'season',
  },
  {
    href: '/status',
    title: 'Is Fortnite Down?',
    description:
      'Live Online / Issues / Down read from Epic’s board, lobby downtime headlines, and the Override season countdown. No fake ping map.',
    tags: ['Status', 'Servers', 'Downtime'],
    category: 'season',
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
    href: '/weapons',
    title: 'All Fortnite Weapons',
    description:
      'Override encyclopedia after v42.40 — Pump, 8-Bit, Sweeper, Heavy AR, plus vaulted history (Midas, Drum Gun) with DPS, damage, fire rate, mag, and reload.',
    tags: ['Weapons', 'DPS', 'Stats'],
    category: 'weapons',
  },
  {
    href: '/weapon-changes',
    title: 'Weapon Changes',
    description:
      'Fortnite weapon buffs and nerfs through v42.40 — Sweeper fire rate, Midas vault, Fortnitemares pool flips, with Old / New / Change.',
    tags: ['Balance', 'Buffs', 'Nerfs'],
    category: 'weapons',
  },
  {
    href: '/free-cosmetics',
    title: 'Free Fortnite Cosmetics',
    description:
      'Track free Override rewards — ironmouse Twitch Drops, Admin Panel Lobby Hacks, Ranked Null, Battle Pass free track, and account links with end dates.',
    tags: ['Free', 'Cosmetics', 'Drops'],
    category: 'cosmetics',
  },
  {
    href: '/codes',
    title: 'Creative Map Codes',
    description:
      'Override Creative island codes — XP farms, 1v1 warmups, Zone Wars, horror, deathruns, and viral tycoons that still resolve on Epic’s API.',
    tags: ['Codes', 'XP', 'Creative'],
    category: 'map',
  },
  {
    href: '/stats',
    title: 'Fortnite Player Stats',
    description:
      'Tracked Fortnite player stats leaderboards — season wins, kills, Battle Pass level, and time from accounts we poll — plus mode popularity by peak CCU.',
    tags: ['Player Stats', 'Leaderboard', 'CCU'],
    category: 'stats',
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
    href: '/season-countdown',
    title: 'Season Countdown',
    description:
      'When does Chapter 7 Season 4 (Override) end? Live countdown to November 1, 2026 and Chapter 7 Season 5 start.',
    tags: ['Season', 'Countdown', 'End Date'],
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
    href: '/tools/zone-timer',
    title: 'Zone Timer',
    description:
      'Storm circle wait and shrink reference for Chapter 7 Season 4. Start it when a new zone appears so you know when to rotate.',
    tags: ['Storm', 'Rotation', 'Strategy'],
    category: 'season',
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
    href: '/tools/skin-rarity-calculator',
    title: 'Skin Rarity Calculator',
    description:
      'Look up any outfit and see scarcity from shop history — appearances, last seen, Battle Pass exclusives, and OG vault status.',
    tags: ['Skins', 'Rarity', 'OG'],
    category: 'cosmetics',
  },
  {
    href: '/xp-calculator',
    title: 'Fortnite XP Calculator',
    description:
      'Daily XP pace, weekly quest planner, and playtime estimates so you know if you can finish the Override pass.',
    tags: ['XP', 'Levels', 'Battle Pass'],
    category: 'calculators',
  },
  {
    href: '/locker',
    title: 'Fortnite Locker',
    description:
      'Make and share your own Fortnite locker. Sign in, add cosmetics, send the link.',
    tags: ['Locker', 'Skins', 'Share'],
    category: 'cosmetics',
  },
  {
    href: '/lockers',
    title: 'Player Lockers',
    description:
      'Browse public Fortnite lockers other players built and shared — real share links, not a scraped Epic inventory.',
    tags: ['Locker', 'Skins', 'Community'],
    category: 'cosmetics',
  },
  {
    href: '/tools/vbucks-calculator',
    title: 'V-Bucks Calculator',
    description:
      'Build a wishlist and estimate a low-cost V-Bucks pack combo from common USD storefront prices.',
    tags: ['V-Bucks', 'Skins', 'Shop'],
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
