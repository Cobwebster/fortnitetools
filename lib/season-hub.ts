import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate, seasonEndDate } from '@/lib/season'
import { WEAPONS } from '@/lib/weapons'

/** Calendar date this hub was last checked against live files / lobby MOTDs. */
export const SEASON_HUB_REVIEWED = '31 Aug 2026'
export const SEASON_HUB_REVIEWED_ISO = '2026-08-31'

export const SEASON_MYTHICS = WEAPONS.filter((w) => w.rarity === 'Mythic')

export const SEASON_HUB_LINKS = [
  { href: '/fortnite-map', label: 'Live map' },
  { href: '/drops', label: 'Best drops' },
  { href: '/weapons', label: 'Loot pool' },
  { href: '/tools/loadout-builder', label: 'Loadout builder' },
  { href: '/season-countdown', label: 'Countdown' },
  { href: '/news', label: 'Lobby news' },
  { href: '/sets', label: 'Live sets' },
  { href: '/ranked', label: 'Ranked / LP' },
  { href: '/status', label: 'Is Fortnite down' },
  { href: '/guides/how-to/fortnite-ranked-mode-guide', label: 'Ranked climb guide' },
] as const

export const RESET_WEEK_PLAYBOOK = [
  {
    title: 'Override is live',
    body: `Chapter 7 Season 4 (${CURRENT_SEASON.codename}) flipped on 20 Aug 2026. Lobby MOTD: “Fortnite: Override Is Here!” Match Override Consoles, Sonic / gaming-legend collabs, and new center POIs are in the client. Finish the Override Battle Pass before ${formatSeasonLongDate(seasonEndDate())} — free track does not carry.`,
  },
  {
    title: 'What changed on the island',
    body: 'Live Fortnite-API named POIs now include Green Hill Zone, Reality’s Reign, and Stone Sanctum. Gone from the named list: Frosted Flats, Sinister Strip, Calamari Canyon. The old Zero Point landmark reads as Geno’s Machine. Returning coast/woods names (Heatwave, Battlewoods, Wonkeeland, Latte, Sunken Shores, Lifty, Grove, Sanctuary, Cluster, Chopped Shop) are still there — traffic patterns are not identical to Runners.',
  },
  {
    title: 'Loot & tools honesty',
    body: 'Weapons encyclopedia and loadout builder now track the Override launch pool (8-Bit Shotgun, Mega Buster, Midas’ Masterpiece, classic unvaults). Loot Hack items and Match Overrides still change what you see mid-match — confirm in-game after hotfixes.',
  },
  {
    title: 'Countdown',
    body: `Override is dated through ${formatSeasonLongDate(seasonEndDate())} (UTC schedule used on this site; Epic’s Battle Pass page states November 1). Exact downtime can move a few hours. Use the season countdown tool for remaining time.`,
  },
] as const

export const LIVE_NAMED_POIS = [
  { name: 'Green Hill Zone', href: '/fortnite-map', note: 'New · Sonic biome · hot' },
  { name: "Reality's Reign", href: '/fortnite-map', note: 'New · center · Override traffic' },
  { name: 'Stone Sanctum', href: '/fortnite-map', note: 'New · mid · contested' },
  { name: 'Heatwave Harbor', href: '/drops/heatwave-harbor', note: 'Returning · hot · drop guide (re-check rotates)' },
  { name: 'The Battlewoods', href: '/drops/battlewoods', note: 'Returning · hot · drop guide' },
  { name: 'Wonkeeland', href: '/drops/wonkeeland', note: 'Returning · balanced · ranked default' },
  { name: 'Latte Landing', href: '/drops/latte-landing', note: 'Returning · balanced · ranked' },
  { name: 'Sunken Shores', href: '/drops/sunken-shores', note: 'Returning · edge · placement' },
  { name: 'Lifty Lodge', href: '/fortnite-map', note: 'Returning · snow' },
  { name: 'Golden Grove', href: '/fortnite-map', note: 'Returning · inland' },
  { name: 'Shaken Sanctuary', href: '/fortnite-map', note: 'Returning · woods' },
  { name: 'Cluster Coast', href: '/fortnite-map', note: 'Returning · east edge' },
  { name: 'Chopped Shop', href: '/fortnite-map', note: 'Returning · vehicles' },
  { name: "Geno's Machine", href: '/fortnite-map', note: 'Center landmark · was Zero Point' },
] as const

export const SEASON_CHANGE_CARDS = [
  {
    id: 'island',
    title: 'Island',
    live: `Override island is live. New named POIs: Green Hill Zone, Reality’s Reign, Stone Sanctum. Several Runners names (Frosted Flats, Sinister Strip, Calamari Canyon) are gone from the named list. Interactive map pins load from live Fortnite-API coordinates.`,
    incoming: `${CURRENT_SEASON.next.label} is not announced beyond the Override end date (${formatSeasonLongDate(nextSeasonStartDate())} UTC schedule). Do not invent the next island.`,
    extra:
      'Five drop pages still cover returning POIs — treat mid-game rotates as “re-check in client” until we rewrite paths for Override traffic. Map Evolution still archives older seasons; live POIs are on the interactive map.',
    href: '/fortnite-map',
    linkLabel: 'Open map',
  },
  {
    id: 'loot',
    title: 'Loot pool',
    live: 'Override launch pool: 8-Bit Shotgun, Mega Buster, Midas’ Masterpiece, plus unvaults (Pump, Assault Rifle, Ranger AR, Drum Gun, pistols; Oni/Minigun often via Loot Hack). Runners guns (Striker Pump, Surgical Burst, Warforged, Rapid Fire, etc.) are vaulted. See /weapons and /weapon-changes for Aug 20–26 hotfixes.',
    incoming: 'Kingdom Key and Cyberpunk Rebecca guns are called out for later — not inventing them as live until they ship.',
    extra:
      'Match Overrides rewrite match rules mid-game (speed, loot, heal, etc.). That is not the same as a mythic drop — plan fights knowing the lobby can flip mid-match.',
    href: '/weapons',
    linkLabel: 'Weapons page',
  },
  {
    id: 'mythics',
    title: 'Mythics',
    live: 'Midas’ Masterpiece is the standout launch Mythic pistol (limited ammo, headshot deletes). Enhanced 8-Bit Shotgun (Eggman) was vaulted shortly after launch. Old Runners boss mythics are gone.',
    incoming: 'More collab mythics may arrive mid-season. We will not invent drop locations the night before.',
    extra:
      'Loot Hack / Sprite Dust can surface extra guns that are not on the floor pool.',
    href: '/tools/loadout-builder',
    linkLabel: 'Loadout builder',
  },
  {
    id: 'ranked',
    title: 'Ranked',
    live: 'Ranked LP reset with the Aug 20 season boundary. You are on the Override ladder now. Placement still beats spawn-island K/D. Returning balanced drops (Wonkeeland, Latte) remain sensible climb landings while we map Green Hill / Reality’s Reign contest.',
    incoming: 'Next ranked reset is expected at the Override → S5 boundary. Confirm the ranked tab in-game near season end.',
    extra:
      'Ranked Reload is still the small-island rotation — not the Override BR map. Modes catalog labels Habanero rows; Discover is source of truth for which queue is up.',
    href: '/ranked',
    linkLabel: 'Ranked hub',
  },
  {
    id: 'pass',
    title: 'Battle Pass',
    live: `Override Battle Pass is live (Sonic and other Gaming Legends styles in public coverage). Ends with the season (${formatSeasonLongDate(seasonEndDate())}). Unclaimed rewards lock — use the XP calculator if you are short.`,
    incoming: `${CURRENT_SEASON.next.label} pass is not published. Do not buy levels for a future track that does not exist yet.`,
    extra:
      'Free cosmetics outside the pass (Twitch, Ranked cups, etc.) keep their own end dates on the free-cosmetics tracker.',
    href: '/xp-calculator',
    linkLabel: 'XP planner',
  },
] as const

export const VAULTED_THIS_SEASON = [
  { name: 'Frosted Flats (named POI)', when: 'Removed from live named list with Override (20 Aug 2026)' },
  { name: 'Sinister Strip (named POI)', when: 'Removed from live named list with Override' },
  { name: 'Calamari Canyon (named POI)', when: 'Removed from live named list with Override' },
  { name: 'Runners Battle Pass', when: 'Locked at the Aug 20 reboot — free track does not carry' },
  { name: 'Striker Pump / Surgical Burst / Warforged / Rapid Fire (and most C7S3 guns)', when: 'Vaulted with Override loot flip' },
  { name: 'Enhanced 8-Bit Shotgun (Eggman Mythic)', when: 'Vaulted shortly after Aug 20 launch hotfix' },
] as const

export const SEASON_HUB_FAQS = [
  {
    question: 'When does Fortnite Chapter 7 Season 4 end?',
    answer: `${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) is scheduled through ${formatSeasonLongDate(seasonEndDate())} (UTC timestamp we publish; Epic’s Battle Pass page states November 1). Use the countdown for remaining time. Downtime can shift a few hours.`,
  },
  {
    question: 'What is new in Fortnite Override?',
    answer:
      'Match Override Consoles that rewrite match rules, new named POIs (Green Hill Zone, Reality’s Reign, Stone Sanctum), Gaming Legends collabs (Sonic and others), and a new Battle Pass. Lobby MOTD: “Fortnite: Override Is Here!” Last reviewed 31 Aug 2026 against live map + news tiles.',
  },
  {
    question: 'What is the current Fortnite map?',
    answer:
      'Override-era Shattered Coast with new center / Sonic biomes. Live named locations include Green Hill Zone, Reality’s Reign, Stone Sanctum, plus returning POIs like Heatwave Harbor, Battlewoods, Wonkeeland, Latte Landing, and Sunken Shores. Frosted Flats, Sinister Strip, and Calamari Canyon are no longer on the named list.',
  },
  {
    question: 'Did ranked reset for Season 4?',
    answer:
      'Yes — expect the usual season-boundary LP reset at the Aug 20 flip. Soft seed from last season is normal; you do not keep S3 LP as-is. Confirm the ranked tab in-game.',
  },
  {
    question: 'When does Chapter 7 Season 5 start?',
    answer: `${CURRENT_SEASON.next.label} is dated ${formatSeasonLongDate(nextSeasonStartDate())} on this site (same as Override end). Theme and island are not announced here — we will not invent them.`,
  },
  {
    question: 'Are the old drop guides still valid?',
    answer:
      'Returning POI pages still describe those landings, but Override traffic and mid-game rotates need a client check. New POIs (Green Hill, Reality’s Reign, Stone Sanctum) do not have dedicated /drops pages yet — use the interactive map.',
  },
]
