import { CURRENT_SEASON, formatSeasonLongDate, nextSeasonStartDate, seasonEndDate } from '@/lib/season'
import { WEAPONS } from '@/lib/weapons'

/** Calendar date this hub was last checked against live files / lobby MOTDs. */
export const SEASON_HUB_REVIEWED = '16 Nov 2026'
export const SEASON_HUB_REVIEWED_ISO = '2026-11-16'

export const SEASON_MYTHICS = WEAPONS.filter((w) => w.rarity === 'Mythic')

export const SEASON_HUB_LINKS = [
  { href: '/guides/season/fortnite-treasure-hunters', label: 'Treasure Hunters hub' },
  { href: '/guides/how-to/how-to-get-pirate-shop-access-fortnite', label: 'Pirate Shop Access' },
  { href: '/guides/how-to/how-to-get-shock-rocket-fortnite', label: 'Shock Rocket / A$AP Rocky' },
  { href: '/guides/how-to/how-to-hunt-sprites-treasure-hunters', label: 'Wanted Posters / Sprites' },
  { href: '/guides/season/fortnite-treasure-hunters-battle-pass', label: 'Battle Pass & shop' },
  { href: '/guides/map/fortnite-crossbones-isle-map-loot', label: 'Crossbones Isle loot' },
  { href: '/fortnite-map', label: 'Live map' },
  { href: '/sprites', label: 'Sprites' },
  { href: '/weapons', label: 'Weapons encyclopedia' },
  { href: '/tools/loadout-builder', label: 'Loadout builder' },
  { href: '/season-countdown', label: 'Countdown (5 Dec event)' },
  { href: '/news', label: 'Lobby news' },
  { href: '/ranked', label: 'Ranked / LP' },
  { href: '/status', label: 'Is Fortnite down' },
  { href: '/guides/how-to/how-much-is-fortnite-battle-pass', label: 'Pass cost (800)' },
  { href: '/guides/how-to/how-to-redeem-fortnite-code', label: 'Redeem a code' },
  { href: '/guides/how-to/how-to-refund-fortnite-skins', label: 'Refund skins' },
  { href: '/guides/how-to/fortnite-ranked-mode-guide', label: 'Ranked climb guide' },
] as const

export const RESET_WEEK_PLAYBOOK = [
  {
    title: 'Mastery Monday — today (16 Nov)',
    body: 'Every Monday from 9 AM ET: 2× Sprite XP and Sprite Dust, with more Wanted Posters / Sprite Chests. Best day to bank Mini Miku, Squiplash, or catch-up masters. Does not boost Pirate Shop Access odds.',
  },
  {
    title: 'Captain’s Day just landed — Miku & Teto (15 Nov)',
    body: 'Friendship Villa hosts Hatsune Miku and Kasane Teto (peaceful Captains — no boss fight). Leekcapper + Flapjack Rifle joined the loot pool. Sprites: Mini Miku, Squiplash, and secret rare Zee. Third Map Fragment is live this weekend.',
  },
  {
    title: 'Next Captain’s Day — Oscar (~22 Nov)',
    body: 'Epic’s season calendar points at Sunday 22 Nov for Oscar. Expect Frenzy Auto Shotgun callouts, Gold Sprite finishes for recent families (including Mini Miku / Squiplash on the Nov 22 list), and Sir Oscar the Second Sprite when that window opens. Trust Compete / MOTD for the exact hour.',
  },
  {
    title: 'Pirate Shop Access is live',
    body: 'Rare BR chest prize at official 1 : 137,500 (higher in Treasure Hours). Two activations (2026 / 2027), 14-day V-Bucks shop claims. Real-money, gifting, and pass levels excluded. Gold chest FX marks the token (silver = weekly skin). How-to on the Pirate Shop Access guide.',
  },
  {
    title: 'Sprites are Wanted Posters',
    body: 'Tear down a poster → Sprite Treasure Map → buried Sprite Chest. Master 40 Sprites for Navigator’s Nosedive. Cursed finishes water-damage you; Fortune reveals chests.',
  },
  {
    title: 'Countdown',
    body: `Epic told you to keep Saturday 5 December open for the Chapter 7 end event. This site’s clock runs through ${formatSeasonLongDate(seasonEndDate())}. Exact downtime can move. Use the season countdown and the status page if the client queues.`,
  },
] as const

export const LIVE_NAMED_POIS = [
  { name: 'The $.$. Rocky', href: '/guides/how-to/how-to-get-shock-rocket-fortnite', note: 'Boss ship · Shock Rocket / Lil’ Flacko' },
  { name: 'Arlong Park', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'One Piece · fish-man stronghold' },
  { name: "Fortune's Fort", href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Week-2 fort · Lil Uzi / Cuddle Team Leader' },
  { name: 'Friendship Villa', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: '15 Nov Captain’s Day · Miku & Teto (peaceful)' },
  { name: 'Rubber Resort', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Duck yacht · resort coast' },
  { name: 'Loguetown', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Harbor town · contested' },
  { name: 'Lantern Landing', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Lantern maze (Epic also said Lantern Lanes)' },
  { name: 'Plunder Port', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Two docked ships' },
  { name: 'Busy Bay', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'South-east bay · Baratie landmark nearby' },
  { name: 'Loot Lagoon', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Lagoon loot dens' },
  { name: 'Windmill Village', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Quieter village drop' },
  { name: 'Cursed Cavern', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Cave POI · mid-fight third parties' },
  { name: 'The Chest', href: '/guides/map/fortnite-crossbones-isle-map-loot', note: 'Named chest landmark' },
  { name: 'Wanted Posters', href: '/guides/how-to/how-to-hunt-sprites-treasure-hunters', note: 'Not a POI · Sprite hunt loop' },
] as const

export const SEASON_CHANGE_CARDS = [
  {
    id: 'island',
    title: 'Island',
    live: 'Crossbones Isle. 80-player Battle Royale. Cannons to launch across. Headline names: Arlong Park, Windmill Village, The $.$. Rocky, Fortune’s Fort. Full live list is on the map & loot guide.',
    incoming: `Oscar’s Captain’s Day is next (~22 Nov). Chapter 7 end event is dated ${formatSeasonLongDate(nextSeasonStartDate())}.`,
    extra:
      'Friendship Villa hosted Miku & Teto on 15 Nov. Pirate Shop Access is still a chest prize, not a pin. Interactive map follows Fortnite-API.',
    href: '/guides/map/fortnite-crossbones-isle-map-loot',
    linkLabel: 'Map & loot guide',
  },
  {
    id: 'loot',
    title: 'Loot pool',
    live: 'Gum-Gum / Flame-Flame / Zoro / Usopp powers, Bundlebuss, Gilded Dragoon, Hammer AR, pumps / SMGs, Wanted Posters, Explosive Cannon Balls (non-Competitive). Shock Rocket is a Boss drop. Live since 15 Nov: Flapjack Rifle + Leekcapper. Lever Action / Special Buggy Ball from Buggy’s week.',
    incoming: 'Oscar’s ~22 Nov Captain’s Day calls out Frenzy Auto Shotgun. Confirm Compete / MOTD for the exact enable hour.',
    extra:
      'Gold Bars vaulted — follower services free, vending machines gone. Boss weapons are a guaranteed Boss elim drop as of v43.10.',
    href: '/guides/map/fortnite-crossbones-isle-map-loot',
    linkLabel: 'Loot sheet',
  },
  {
    id: 'mythics',
    title: 'Boss / mythic-style',
    live: 'A$AP Rocky on The $.$. Rocky can drop Shock Rocket and Lil’ Flacko. Buggy’s Beachhead held Special Buggy Ball + Lever Action (12 Nov). Miku & Teto (15 Nov) are peaceful Captains at Friendship Villa — Leekcapper / Flapjack are loot-pool adds, not a boss mythic.',
    incoming: 'Next weekly captain: Oscar (~22 Nov). Map Fragments (third is live) / Captain X’s mega chest stay lightly documented.',
    extra: 'Pirate Shop Access is a chest prize, not a Boss drop. Shock Rocket stays pubs / ZB only.',
    href: '/guides/how-to/how-to-get-shock-rocket-fortnite',
    linkLabel: 'Shock Rocket how-to',
  },
  {
    id: 'ranked',
    title: 'Ranked',
    live: 'New ranked season on Crossbones Isle. Rewards Epic named: Gold AHOY! emoticon, Platinum By Order of Geno loading screen, Diamond This Must Be the Spot spray, Elite Par-Rot back bling, Unreal Double-Duty Duelist pickaxe. New Elite / Champion / Unreal icons.',
    incoming: 'Zoro Cup (6 Nov) and Buggy Cup (13 Nov) windows may still show results on Compete. Watch for Oscar-week cups.',
    extra:
      'Null was Override and locked. Shock Rocket is not in Competitive. Placement still beats spawn-island K/D.',
    href: '/ranked',
    linkLabel: 'Ranked hub',
  },
  {
    id: 'pass',
    title: 'Battle Pass',
    live: 'Treasure Hunters Battle Pass is live: Portgas D. Ace, Nico Robin, anime Jonesy / Cuddle Team Leader / Charlotte. Gift the pass and both of you get Dark Kawaii Team Leader. Cap’n Hatsune Miku is Item Shop; Teto headlines Festival Music Pass.',
    incoming: `Epic’s Chapter 7 end event is ${formatSeasonLongDate(seasonEndDate())}. Unclaimed nodes will not outlive that flip.`,
    extra:
      'Pirate Shop can claim the V-Bucks pass purchase when active — not level packs. Sprite Mastery is a separate Treasure-tab track (40 masters = Navigator’s Nosedive). Mastery Monday = 2× XP/Dust.',
    href: '/guides/season/fortnite-treasure-hunters-battle-pass',
    linkLabel: 'Pass & shop guide',
  },
] as const

export const VAULTED_THIS_SEASON = [
  { name: 'Override island / Green Hill Zone / Reality’s Reign / Stone Sanctum', when: 'Replaced by Crossbones Isle on 1 Nov 2026' },
  { name: 'Gold Bars', when: 'Vaulted in v43.00 — follower services are free' },
  { name: 'Vending Machines', when: 'Removed in v43.00 (Pocket-O-Matic stays in Zero Build)' },
  { name: 'Override Battle Pass / Null ranked styles', when: 'Locked at the 1 Nov flip' },
  { name: 'Match Override Consoles / Fortnitemares loot', when: 'Left with Override / 31 Oct event end' },
  { name: 'Shock Rocket in Competitive', when: 'Item exists in pubs; Epic marked it non-Competitive' },
] as const

export const SEASON_HUB_FAQS = [
  {
    question: 'When does Fortnite Treasure Hunters end?',
    answer: `Epic told players to keep Saturday 5 December open for the Chapter 7 end event. This site’s countdown uses ${formatSeasonLongDate(seasonEndDate())}. Trust the Passes tab if the client shows a different lock time.`,
  },
  {
    question: 'What is new in Fortnite Treasure Hunters?',
    answer:
      'Crossbones Isle (80 players), One Piece powers, Boss Captains (A$AP, Buggy, peaceful Miku & Teto at Friendship Villa), Sprites via Wanted Posters (Mini Miku / Squiplash / Zee with 15 Nov; Lil’ Uzi Vert Jr. since 8 Nov), Flapjack Rifle + Leekcapper, Treasure Hunters Battle Pass, Pirate Shop Access, and a new ranked track. Last reviewed 16 Nov 2026.',
  },
  {
    question: 'What is the current Fortnite map?',
    answer:
      'Crossbones Isle. Live API names include The $.$. Rocky, Arlong Park, Fortune’s Fort, Rubber Resort, Loguetown, Lantern Landing, Plunder Port, Busy Bay, Loot Lagoon, Windmill Village, Cursed Cavern, and The Chest. The interactive map follows Fortnite-API.',
  },
  {
    question: 'Did ranked reset?',
    answer:
      'Yes — a new ranked season started with Treasure Hunters. You do not keep Override LP or Null styles. Confirm the ranked tab in-game.',
  },
  {
    question: 'Where is the Pirate Shop?',
    answer:
      'It is not a POI. Pirate Shop Access is a rare Battle Royale chest prize. How-to is the Pirate Shop Access guide.',
  },
  {
    question: 'Are Override drop guides still valid?',
    answer:
      'No. Green Hill / Wonkeeland / Latte pages describe the previous island. Use the Crossbones Isle map & loot guide and in-game names.',
  },
]
