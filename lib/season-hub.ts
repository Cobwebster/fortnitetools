import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate, seasonEndDate } from '@/lib/season'
import { WEAPONS } from '@/lib/weapons'

/** Calendar date this hub was last checked against live files / lobby MOTDs. */
export const SEASON_HUB_REVIEWED = '26 Oct 2026'
export const SEASON_HUB_REVIEWED_ISO = '2026-10-26'

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
  { href: '/guides/season/fortnite-treasure-hunters', label: 'Treasure Hunters' },
  { href: '/guides/season/fortnite-override-battle-pass-guide', label: 'Override Battle Pass' },
  { href: '/guides/season/fortnite-v42-40-last-override-patch', label: 'v42.40 last patch' },
  { href: '/guides/how-to/how-much-is-fortnite-battle-pass', label: 'Pass cost (800)' },
  { href: '/guides/how-to/how-to-redeem-fortnite-code', label: 'Redeem a code' },
  { href: '/guides/how-to/how-to-refund-fortnite-skins', label: 'Refund skins' },
  { href: '/guides/how-to/fortnite-admin-panel-lobby-hack-codes', label: 'Admin Panel codes' },
  { href: '/guides/how-to/fortnite-ranked-mode-guide', label: 'Ranked climb guide' },
] as const

export const RESET_WEEK_PLAYBOOK = [
  {
    title: 'Last week of Override',
    body: `Chapter 7 Season 4 (${CURRENT_SEASON.codename}) is in its final week. Epic’s Battle Pass page still reads “Ends November 1, 2026 Eastern Time.” Fortnitemares runs to the same calendar day. Claim Null ranked styles, Jack-a-Nape quests, Sprite Mastery, and unclaimed pass rewards before downtime — none of that carries.`,
  },
  {
    title: 'Treasure Hunters is the name Epic posted',
    body: 'On 24 October 2026 the official Fortnite account posted a teaser captioned “The greatest adventure of all! 11.1” with a Treasure Hunters title card. Hours later it posted a Fortnite × One Piece logo teaser. Epic has not published an island sheet, a loot pool, a Battle Pass track, or a downtime hour. Write-up: Treasure Hunters guide. Queue day: status page and countdown.',
  },
  {
    title: 'What v42.40 actually changed',
    body: '15 Oct was the last Override content patch. New Loot Hacks: Thorne’s Vampiric Blade, Finger Guns, Gatekeeper Shotgun, Hunting Rifle, Slap Splash, all Sprite variants. Vaulted: Midas’ Masterpiece, Witch Broom, plus Super Shot / Big Boom / Action Hero / Healing Overdrive cartridges. Sweeper Shotgun fire rate went up slightly. Honey Sprite and One Wish Willow Sprite are live; Sprite Mastery is on its last page.',
  },
  {
    title: 'Island (still the Override map)',
    body: 'Named POIs did not flip in v42.40. Green Hill Zone, Reality’s Reign, and Stone Sanctum are still the new names. Frosted Flats, Sinister Strip, and Calamari Canyon stay off the named list. A giant pirate chest landmark sits east of Sunken Shores — scenery until Treasure Hunters ships and Epic names whatever replaces it.',
  },
  {
    title: 'Countdown',
    body: `Override is dated through ${formatSeasonLongDate(seasonEndDate())} (UTC schedule used on this site; Epic’s Battle Pass page states November 1, Eastern Time). Exact downtime can move a few hours. Use the season countdown for remaining time and the status page when the client is in a queue. Treasure Hunters is the name on Epic’s 11.1 teaser — not a numbered “Season 5” on that post.`,
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
    incoming: `${CURRENT_SEASON.next.label} is the name on Epic’s 24 Oct teaser (dated 11.1). No island, POI list, or map screenshot has been published. Do not invent the next island.`,
    extra:
      'Five drop pages still cover returning POIs — treat mid-game rotates as “re-check in client.” A pirate-chest landmark east of Sunken Shores showed up with v42.40; it is not a new named POI. Map Evolution still archives older seasons; live POIs are on the interactive map.',
    href: '/fortnite-map',
    linkLabel: 'Open map',
  },
  {
    id: 'loot',
    title: 'Loot pool',
    live: 'After v42.40: Pump (post–v42.10), 8-Bit, Sweeper (fire-rate bump), Heavy AR, Wood Stake, Dual Fiend Hunters, Mega Buster, Bonerattler SMG / Freddy’s Nightmare still in the Fortnitemares mix. Drum Gun, Ranger AR, and Midas’ Masterpiece are vaulted. Gatekeeper, Hunting Rifle, Finger Guns, and Thorne’s blade are Loot Hacks this week — not guaranteed floor loot.',
    incoming: 'No more Override content patches are scheduled. Next loot flip is the Treasure Hunters boundary — we will not invent that pool.',
    extra:
      'Like-for-Like auto-upgrades (walk over a higher rarity of the gun you already hold) shipped in v42.40 if Auto Pick Up Weapons is on. Match Overrides still rewrite rules mid-match; Super Shot, Big Boom, Action Hero, and Healing Overdrive were pulled in this patch.',
    href: '/weapons',
    linkLabel: 'Weapons page',
  },
  {
    id: 'mythics',
    title: 'Mythics',
    live: 'Midas’ Masterpiece left in v42.40. Freddy’s Nightmare (Krueger drop at Nightmare Neighborhood) is the Fortnitemares highlight. Enhanced 8-Bit Shotgun (Eggman) was vaulted shortly after launch. Thorne’s Vampiric Blade is a Loot Hack, not a floor spawn.',
    incoming: 'Do not expect another Override mythic before November 1. Next-season boss loot is not announced.',
    extra:
      'Loot Hack / Sprite Dust can still surface Gatekeeper, Hunting Rifle, Finger Guns, Slap Splash, and Sprite variants from hacked chests.',
    href: '/tools/loadout-builder',
    linkLabel: 'Loadout builder',
  },
  {
    id: 'ranked',
    title: 'Ranked',
    live: 'You are still on the Override ladder. Claim Null Champion / Elite / Unreal styles before the flip — they lock with the season. Placement still beats spawn-island K/D. Wonkeeland and Latte remain the climb defaults.',
    incoming: 'Next ranked reset is expected at the Override → Treasure Hunters boundary around November 1. Confirm the ranked tab in-game after downtime — we will not invent a new LP formula.',
    extra:
      'Ranked Reload is still the small-island rotation — not the Override BR map. Modes catalog labels Habanero rows; Discover is source of truth for which queue is up.',
    href: '/ranked',
    linkLabel: 'Ranked hub',
  },
  {
    id: 'pass',
    title: 'Battle Pass',
    live: `Override Battle Pass is live (Sonic and other Gaming Legends styles in public coverage). Ends with the season (${formatSeasonLongDate(seasonEndDate())}). Unclaimed rewards lock — use the XP calculator if you are short.`,
    incoming: `The ${CURRENT_SEASON.next.label} pass is not published. Do not buy levels for a future track that does not exist yet.`,
    extra:
      'Fortnitemares Jack-a-Nape quests and Jimothy Sidekick also end with the event (through 31 Oct / 1 Nov). Jimothy how-to: extract a Dumpster Dive Sprite at a physical Extraction Site. Track dates on free cosmetics, not on the pass UI.',
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
  { name: 'Drum Gun / Ranger Assault Rifle / Tetris Rift', when: 'Vaulted with Fortnitemares v42.30 (1 Oct 2026)' },
  { name: "Midas' Masterpiece / Witch Broom", when: 'Vaulted in v42.40 (15 Oct 2026)' },
  { name: 'Super Shot / Big Boom / Action Hero / Healing Overdrive (Match Overrides)', when: 'Disabled in v42.40' },
] as const

export const SEASON_HUB_FAQS = [
  {
    question: 'When does Fortnite Chapter 7 Season 4 end?',
    answer: `${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) is scheduled through ${formatSeasonLongDate(seasonEndDate())} (UTC timestamp we publish; Epic’s Battle Pass page states November 1). Use the countdown for remaining time. Downtime can shift a few hours.`,
  },
  {
    question: 'What is new in Fortnite Override?',
    answer:
      'Match Override Consoles, Green Hill Zone / Reality’s Reign / Stone Sanctum, Sonic and other Gaming Legends on the Battle Pass, Sprites, and Fortnitemares through 1 November. Last content patch is v42.40 (15 Oct 2026). Last reviewed 26 Oct 2026. Treasure Hunters is the name Epic posted for 11.1.',
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
    question: 'When does Fortnite Treasure Hunters start?',
    answer: `Epic’s 24 Oct teaser dates Treasure Hunters as 11.1 (1 November), the same calendar day the Override Battle Pass ends. This site’s clock uses ${formatSeasonLongDate(nextSeasonStartDate())} UTC as a placeholder. Epic has not posted an hour. Island, loot, and pass contents are not published — a pirate-chest landmark east of Sunken Shores is still scenery.`,
  },
  {
    question: 'Are the old drop guides still valid?',
    answer:
      'Returning POI pages still describe those landings, but Override traffic and mid-game rotates need a client check. New POIs (Green Hill, Reality’s Reign, Stone Sanctum) do not have dedicated /drops pages yet — use the interactive map.',
  },
]
