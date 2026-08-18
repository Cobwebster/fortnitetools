import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate, seasonEndDate } from '@/lib/season'
import { WEAPONS } from '@/lib/weapons'

/** Calendar date this hub was last checked against live files / lobby MOTDs. */
export const SEASON_HUB_REVIEWED = '17 Aug 2026'
export const SEASON_HUB_REVIEWED_ISO = '2026-08-17'

export const SEASON_MYTHICS = WEAPONS.filter((w) => w.rarity === 'Mythic')

export const SEASON_HUB_LINKS = [
  { href: '/fortnite-map', label: 'Shattered Coast map' },
  { href: '/drops', label: 'Best drops' },
  { href: '/weapons', label: 'Loot pool' },
  { href: '/tools/loadout-builder', label: 'Loadout builder' },
  { href: '/season-countdown', label: 'Countdown' },
  { href: '/news', label: 'Lobby news' },
  { href: '/sets', label: 'Live sets' },
  { href: '/ranked', label: 'Ranked reset / LP' },
  { href: '/status', label: 'Is Fortnite down' },
  { href: '/guides/how-to/fortnite-ranked-mode-guide', label: 'Ranked climb guide' },
] as const

export const RESET_WEEK_PLAYBOOK = [
  {
    title: 'Tonight (still C7S3)',
    body: 'Play Shattered Coast. Loot pool is the post–16 Jul 2026 hotfix (Hunting Rifle and Flex SMG vaulted). Drop pages, map pins, and the loadout builder are written for this island. Finish the Runners Battle Pass if you still need free-track rewards — they do not carry.',
  },
  {
    title: 'What is actually confirmed for S4',
    body: `Countdown timestamp ${formatSeasonLongDate(nextSeasonStartDate())} (UTC, same as Season 3 end) and the lobby MOTD “Reality Reboots August 20.” Downtime can move a few hours. That is the whole confirmed list in our files.`,
  },
  {
    title: 'What we will not publish yet',
    body: 'S4 POI names, loot pool, boss mythics, Battle Pass layout, or a new ranked LP formula. Leak-site names the night before a reboot are how thin pages get a Google slap. This hub will be rewritten the day the client flips.',
  },
  {
    title: 'Ranked and the Pass',
    body: 'Expect the usual season LP reset — confirm the in-game ranked tab on reboot day. Unclaimed S3 pass rewards lock with the season. Use the XP calculator and Creative codes before the timer, not a guessed S4 track.',
  },
] as const

export const LIVE_NAMED_POIS = [
  { name: 'Heatwave Harbor', href: '/drops/heatwave-harbor', note: 'Hot · loot 5 · drop guide' },
  { name: 'The Battlewoods', href: '/drops/battlewoods', note: 'Hot · mats · drop guide' },
  { name: 'Wonkeeland', href: '/drops/wonkeeland', note: 'Balanced · ranked default · drop guide' },
  { name: 'Latte Landing', href: '/drops/latte-landing', note: 'Balanced · ranked · drop guide' },
  { name: 'Sunken Shores', href: '/drops/sunken-shores', note: 'Edge · placement · drop guide' },
  { name: 'Lifty Lodge', href: '/fortnite-map', note: 'Hot · snow · zipline' },
  { name: 'Frosted Flats', href: '/fortnite-map', note: 'Hot · center staging' },
  { name: 'Sinister Strip', href: '/fortnite-map', note: 'Hot · cars / mythic traffic' },
  { name: 'Golden Grove', href: '/fortnite-map', note: 'Balanced · Latte extract path' },
  { name: 'Shaken Sanctuary', href: '/fortnite-map', note: 'Balanced · woods backup' },
  { name: 'Cluster Coast', href: '/fortnite-map', note: 'Edge · east midpoint' },
  { name: 'Calamari Canyon', href: '/fortnite-map', note: 'Edge · west desert' },
  { name: 'Chopped Shop', href: '/fortnite-map', note: 'Balanced · vehicles' },
  { name: 'The Zero Point', href: '/fortnite-map', note: 'Hot · endgame magnet' },
] as const

export const SEASON_CHANGE_CARDS = [
  {
    id: 'island',
    title: 'Island',
    live: `Still Shattered Coast (${CURRENT_SEASON.shortLabel} / ${CURRENT_SEASON.codename}). Named POIs, Extraction Sites, and the five drop pages describe this island. Map image and coordinates still load from live Fortnite-API data.`,
    incoming:
      'Chapter 7 Season 4 island is not in our map files yet. Lobby MOTD: “Reality Reboots August 20.” Do not treat S3 POI names as S4 drops until the client flips. When it does, pins and drop URLs get a rewrite the same day.',
    extra:
      'If you are searching “new Fortnite map” this week, the honest answer is: not yet. Compare older islands on Map Evolution; plan tonight’s drop on the interactive map.',
    href: '/fortnite-map',
    linkLabel: 'Open map',
  },
  {
    id: 'loot',
    title: 'Loot pool',
    live: 'C7S3 post–16 Jul 2026 hotfix: Surgical Burst, Warforged, Chaos Exploder; Extending Focus, Striker Pump, Maven Auto; Stinger and Rapid Fire SMGs; Lancehead, Ranger, Bank Shot; Heavy Impact sniper. Hunting Rifle and Flex SMG are vaulted — they are not on the weapons page or in the loadout builder.',
    incoming: 'S4 loot is unlisted until the reboot. Grey–gold names on this site stay S3 until we rewrite the pool. Do not theory-craft a vault list from a datamine screenshot.',
    extra:
      'Mid-season already moved this pool once (Hot Bat Summer, 16 Jul). Treat “what I used in June” as stale even before S4. Body-shot STK lives on the weapons page and loadout builder.',
    href: '/weapons',
    linkLabel: 'Current guns',
  },
  {
    id: 'mythics',
    title: 'Mythics',
    live: 'Boss / vault versions of the live guns: Voidblade burst, Harley Warforged, Skeletor Extending, Wolfe Maven, Coastal Catwoman Rapid Fire, Dog Lancehead (9mm Baba Yaga), Chlorophyll Ivy Ranger, vault-pedestal Mighty Impact.',
    incoming: 'S4 mythics are not in game files we ship. If a leak site names them before 20 Aug, wait for the live pool. Harbor / Strip traffic on this island is still the C7S3 mythic magnet.',
    extra:
      'These are not floor loot. You take a boss or a vault pedestal, then you become the third-party. Drop pages call that out for Heatwave; they are not a boss-route spreadsheet.',
    href: '/tools/loadout-builder',
    linkLabel: 'Build a hotbar',
  },
  {
    id: 'ranked',
    title: 'Ranked',
    live: 'Habanero ranked queues are up on the current island. LP still weights placement over elims. Rank is still S3 until the season flip. Balanced drops (Wonkeeland, Latte) and the edge (Sunken Shores) are the climb landings — not harbor.',
    incoming:
      'Expect the usual season LP reset when S4 goes live. Confirm the in-game ranked screen on 20 Aug — we will not invent a new point formula here. Modes catalog still labels Ranked when the playlist id contains Habanero.',
    extra:
      'Common throw: hot drop in ranked, die 40th with 6 kills, donate LP. The ranked guide is the habit page; this hub is only the season-boundary note.',
    href: '/guides/how-to/fortnite-ranked-mode-guide',
    linkLabel: 'Ranked habits',
  },
  {
    id: 'pass',
    title: 'Battle Pass free track',
    live: `The Runners pass ends with the season (${formatSeasonLongDate(seasonEndDate())}). Unclaimed free-track and premium rewards are gone after the lock. Supercharged / daily XP still matter this week if you are short.`,
    incoming: `S4 Battle Pass pages are not in our files yet. ${CURRENT_SEASON.next.label} starts ${formatSeasonLongDate(nextSeasonStartDate())} (UTC schedule). Grind XP before the timer, not after. Do not buy levels for a pass that is about to lock unless you still need a specific S3 style.`,
    extra:
      'Free cosmetics that are not the pass (Twitch, Ranked cups, Sprite mastery) have their own end dates on the free-cosmetics tracker. Those windows are not the same as the season lock.',
    href: '/xp-calculator',
    linkLabel: 'XP planner',
  },
] as const

export const VAULTED_THIS_SEASON = [
  { name: 'Hunting Rifle', when: 'Vaulted 16 Jul 2026 (Hot Bat Summer hotfix)' },
  { name: 'Flex SMG', when: 'Vaulted 16 Jul 2026 — still used as the loadout-builder icon, not in the BR pool' },
  { name: 'Chaos Reloader', when: 'Vaulted mid-season — not listed on the weapons page' },
] as const

export const SEASON_HUB_FAQS = [
  {
    question: 'When does Fortnite Chapter 7 Season 4 start?',
    answer: `${CURRENT_SEASON.next.label} is scheduled for ${formatSeasonLongDate(nextSeasonStartDate())} (same timestamp as the Season 3 end). The lobby MOTD says “Reality Reboots August 20” — downtime can shift a few hours. Use the countdown for remaining time.`,
  },
  {
    question: 'What changed in Chapter 7 Season 4?',
    answer:
      'As of 17 Aug 2026, nothing in our loot, map, or mythic tables has flipped yet. This hub lists what is still true in Season 3 and what is only confirmed as an incoming reboot. We will rewrite island / loot / mythics the day the client updates — we will not invent S4 POIs.',
  },
  {
    question: 'What is the current Fortnite map?',
    answer:
      'Shattered Coast (Chapter 7 Season 3 / Runners). Named locations include Heatwave Harbor, Battlewoods, Wonkeeland, Latte Landing, Sunken Shores, Lifty Lodge, Frosted Flats, Sinister Strip, Golden Grove, and the rest listed below. S4’s island is not in the files we ship.',
  },
  {
    question: 'Does ranked reset for Season 4?',
    answer:
      'Fortnite ranked almost always resets LP at a season boundary. Treat that as the default, then confirm the ranked tab in-game on reboot day. This page will say so explicitly once we have seen the live screen.',
  },
  {
    question: 'Can I still finish the Season 3 Battle Pass?',
    answer: `Only until ${formatSeasonLongDate(seasonEndDate())}. The free track does not carry. If you are short on levels, use the XP calculator and Creative codes — not a guessed S4 pass layout.`,
  },
  {
    question: 'Is Flex SMG still in the game?',
    answer:
      'Not in the C7S3 BR pool after 16 Jul 2026. Hunting Rifle went with it. If a creator VOD still uses Flex, it is pre-hotfix or Reload/OG. The weapons page is the live list.',
  },
]
