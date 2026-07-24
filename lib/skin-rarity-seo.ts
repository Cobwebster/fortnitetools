import type { CosmeticItem } from '@/lib/fortnite-api'
import type { SkinRarityReport } from '@/lib/skin-rarity'

/** Hardcoded crawlable example — Black Knight (Ch1 S2 Battle Pass). */
export const STATIC_EXAMPLE_ITEM: CosmeticItem = {
  id: 'CID_035_Athena_Commando_M_Medieval',
  name: 'Black Knight',
  description: 'The odious scourge of Wailing Woods.',
  type: 'Outfit',
  typeValue: 'outfit',
  rarity: 'Legendary',
  rarityValue: 'legendary',
  image:
    'https://fortnite-api.com/images/cosmetics/br/cid_035_athena_commando_m_medieval/icon.png',
  smallImage:
    'https://fortnite-api.com/images/cosmetics/br/cid_035_athena_commando_m_medieval/icon.png',
  featuredImage: null,
  added: '2019-11-20T12:50:29Z',
  set: 'Fort Knights',
  setText: 'Part of the Fort Knights set.',
  introduction: 'Introduced in Chapter 1, Season 2.',
  chapter: '1',
  season: '2',
  gameplayTags: [
    'Cosmetics.Source.Season2.BattlePass.Paid',
    'Cosmetics.Set.FortKnights',
    'Cosmetics.Filter.Season.2',
  ],
  shopHistory: [],
}

/** Frozen report so HTML always includes real numbers for crawlers. */
export const STATIC_EXAMPLE_REPORT: SkinRarityReport = {
  score: 96,
  tier: 'og-exclusive',
  label: 'OG / Exclusive',
  summary:
    'Never sold in the modern Item Shop rotation — classic early-season exclusive. Extremely scarce in locker terms.',
  source: 'battle-pass',
  sourceLabel: 'Battle Pass / season reward',
  appearances: 0,
  firstSeen: null,
  lastSeen: null,
  daysSinceLastSeen: null,
  shopRarity: 'Legendary',
  shopRarityValue: 'legendary',
  typicalVbucks: null,
  neverInShop: true,
}

/** Renegade Raider — Season Shop classic that has returned (snapshot July 2026). */
export const RENEGADE_RAIDER_ITEM: CosmeticItem = {
  id: 'CID_028_Athena_Commando_F',
  name: 'Renegade Raider',
  description: 'Rare renegade style.',
  type: 'Outfit',
  typeValue: 'outfit',
  rarity: 'Rare',
  rarityValue: 'rare',
  image: 'https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/icon.png',
  smallImage: 'https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/icon.png',
  featuredImage: null,
  added: '2019-11-20T12:50:29Z',
  set: 'Storm Scavenger',
  setText: 'Part of the Storm Scavenger set.',
  introduction: 'Introduced in Chapter 1, Season 1.',
  chapter: '1',
  season: '1',
  gameplayTags: ['Cosmetics.Source.ItemShop', 'Cosmetics.Set.StormScavenger'],
  shopHistory: ['2018-09-23T00:00:00Z', '2026-01-31T00:00:00Z'],
}

export const RENEGADE_RAIDER_REPORT: SkinRarityReport = {
  score: 23,
  tier: 'common-rotation',
  label: 'Common rotation',
  summary:
    'Has returned to the shop 84 times. Still check last-seen date — frequent returns usually mean lower scarcity.',
  source: 'item-shop',
  sourceLabel: 'Item Shop',
  appearances: 84,
  firstSeen: '2018-09-23T00:00:00Z',
  lastSeen: '2026-01-31T00:00:00Z',
  daysSinceLastSeen: 174,
  shopRarity: 'Rare',
  shopRarityValue: 'rare',
  typicalVbucks: 1200,
  neverInShop: false,
}

/** Aerial Assault Trooper — same early OG fame, shop returns (snapshot July 2026). */
export const AERIAL_ASSAULT_ITEM: CosmeticItem = {
  id: 'CID_017_Athena_Commando_M',
  name: 'Aerial Assault Trooper',
  description: 'Rare aerial assault style.',
  type: 'Outfit',
  typeValue: 'outfit',
  rarity: 'Rare',
  rarityValue: 'rare',
  image: 'https://fortnite-api.com/images/cosmetics/br/cid_017_athena_commando_m/icon.png',
  smallImage: 'https://fortnite-api.com/images/cosmetics/br/cid_017_athena_commando_m/icon.png',
  featuredImage: null,
  added: '2019-11-20T12:50:29Z',
  set: 'Aerial Assault',
  setText: 'Part of the Aerial Assault set.',
  introduction: 'Introduced in Chapter 1, Season 1.',
  chapter: '1',
  season: '1',
  gameplayTags: ['Cosmetics.Source.ItemShop', 'Cosmetics.Set.AerialAssault'],
  shopHistory: ['2018-09-23T00:00:00Z', '2026-01-31T00:00:00Z'],
}

export const AERIAL_ASSAULT_REPORT: SkinRarityReport = {
  score: 23,
  tier: 'common-rotation',
  label: 'Common rotation',
  summary:
    'Has returned to the shop 84 times. Still check last-seen date — frequent returns usually mean lower scarcity.',
  source: 'item-shop',
  sourceLabel: 'Item Shop',
  appearances: 84,
  firstSeen: '2018-09-23T00:00:00Z',
  lastSeen: '2026-01-31T00:00:00Z',
  daysSinceLastSeen: 174,
  shopRarity: 'Rare',
  shopRarityValue: 'rare',
  typicalVbucks: 1200,
  neverInShop: false,
}

/** Galaxy — Samsung promo exclusive (never normal shop). */
export const GALAXY_ITEM: CosmeticItem = {
  id: 'CID_175_Athena_Commando_M_Celestial',
  name: 'Galaxy',
  description: 'A skin as vast as the cosmos.',
  type: 'Outfit',
  typeValue: 'outfit',
  rarity: 'Epic',
  rarityValue: 'epic',
  image: 'https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/icon.png',
  smallImage: 'https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/icon.png',
  featuredImage: null,
  added: '2019-11-20T12:50:29Z',
  set: 'Galaxy',
  setText: 'Part of the Galaxy set.',
  introduction: 'Introduced in Chapter 1, Season 5.',
  chapter: '1',
  season: '5',
  gameplayTags: [
    'Cosmetics.Source.Promo',
    'Cosmetics.Source.Platform.Samsung',
    'Cosmetics.Set.Galaxy',
  ],
  shopHistory: [],
}

export const GALAXY_REPORT: SkinRarityReport = {
  score: 96,
  tier: 'og-exclusive',
  label: 'OG / Exclusive',
  summary:
    'Never sold in the modern Item Shop rotation — classic early-season exclusive. Extremely scarce in locker terms.',
  source: 'promo',
  sourceLabel: 'Promo / exclusive drop',
  appearances: 0,
  firstSeen: null,
  lastSeen: null,
  daysSinceLastSeen: null,
  shopRarity: 'Epic',
  shopRarityValue: 'epic',
  typicalVbucks: 1500,
  neverInShop: true,
}

export const STATIC_SKIN_EXAMPLES = [
  {
    heading: 'Example: How rare is Black Knight?',
    intro:
      'Black Knight is one of the most-searched rare Fortnite skins. It unlocked from the Chapter 1 Season 2 Battle Pass, sits at Legendary shop-color rarity, and has never been sold as a normal Item Shop outfit.',
    item: STATIC_EXAMPLE_ITEM,
    report: STATIC_EXAMPLE_REPORT,
  },
  {
    heading: 'Is Renegade Raider rare?',
    intro:
      'Renegade Raider is culturally OG, but Epic has brought it back to the Item Shop many times. Appearance count and last-seen date matter more than the Season 1 name — nostalgia is not the same as current scarcity.',
    item: RENEGADE_RAIDER_ITEM,
    report: RENEGADE_RAIDER_REPORT,
  },
  {
    heading: 'Is Aerial Assault Trooper rare?',
    intro:
      'Aerial Assault Trooper shares Renegade’s early Chapter 1 fame. It has also returned to the shop repeatedly — treat it as a rotation skin unless the vault gap grows long again.',
    item: AERIAL_ASSAULT_ITEM,
    report: AERIAL_ASSAULT_REPORT,
  },
  {
    heading: 'Is Galaxy rare?',
    intro:
      'Galaxy was a Samsung promo exclusive, not a normal V-Bucks purchase. Zero recorded Item Shop sales keeps it in OG / Exclusive territory — a true unlock-path scarce skin.',
    item: GALAXY_ITEM,
    report: GALAXY_REPORT,
  },
] as const

export const SKIN_RARITY_FAQS = [
  {
    question: 'What makes a Fortnite skin rare?',
    answer:
      'Shop color rarity (Rare, Epic, Legendary) is only the Item Shop tier and V-Bucks price. True scarcity usually comes from few shop appearances, long vault times, or never being sold (Battle Pass, Crew, starter packs, and early OG exclusives like Black Knight).',
  },
  {
    question: 'How rare is the Black Knight skin in Fortnite?',
    answer:
      'Black Knight came from the Chapter 1 Season 2 Battle Pass and has never been a normal Item Shop purchase. Our scarcity score rates it as OG / Exclusive — among the hardest classic outfits to obtain today.',
  },
  {
    question: 'Is Renegade Raider still a rare Fortnite skin?',
    answer:
      'Iconic, yes — scarce today, no. Renegade Raider has dozens of Item Shop returns (80+ appearances in our snapshot) and last appeared in early 2026, so our scarcity score places it in common rotation. Search it above for the live count.',
  },
  {
    question: 'Is Aerial Assault Trooper rare?',
    answer:
      'Same story as Renegade: early Chapter 1 nostalgia with many later shop returns. Check last-seen and appearance count in this calculator — the name alone overstates current scarcity.',
  },
  {
    question: 'Is the Galaxy skin rare in Fortnite?',
    answer:
      'Yes for unlockability. Galaxy was a Samsung promo exclusive and has never been a normal Item Shop sale, so our score rates it OG / Exclusive — similar scarcity class to classic Battle Pass exclusives.',
  },
  {
    question: 'Does this calculator show skin value in real money?',
    answer:
      'No. It estimates scarcity from shop history and source tags. Trading accounts or real-money prices is against Epic rules and is not something we track or endorse.',
  },
  {
    question: 'Are Battle Pass skins rarer than shop skins?',
    answer:
      'Often yes for unlockability: Battle Pass rewards usually never appear as standalone shop purchases. That does not automatically mean they are more desirable than a vaulted shop skin with only a handful of returns.',
  },
  {
    question: 'How do I check if my Fortnite skin is rare?',
    answer:
      'Search the outfit name in this tool. You will see shop appearances, first and last seen dates, source (Item Shop vs Battle Pass), color tier, and a 0–100 scarcity score you can compare across skins.',
  },
]

export const RARE_SKIN_EXAMPLES = [
  {
    name: 'Black Knight',
    note: 'Chapter 1 Season 2 Battle Pass — never a normal shop sale.',
    scarcity: 'OG / Exclusive',
  },
  {
    name: 'Renegade Raider',
    note: 'Season 1 classic. Still famous, but it has returned to the shop in later years.',
    scarcity: 'Common rotation (check last seen)',
  },
  {
    name: 'Aerial Assault Trooper',
    note: 'Early Chapter 1 unlock vibes — many shop returns; verify live history in the tool.',
    scarcity: 'Common rotation (check last seen)',
  },
  {
    name: 'Galaxy',
    note: 'Samsung promo exclusive — not purchasable with V-Bucks in the regular rotation.',
    scarcity: 'Promo exclusive',
  },
  {
    name: 'Honor Guard',
    note: 'Honor pack / region exclusives often skip the daily shop entirely.',
    scarcity: 'Pack exclusive',
  },
  {
    name: 'Travis Scott',
    note: 'Icon Series collab — rarity tier is Icon; scarcity depends on how often it rotates back.',
    scarcity: 'Icon Series',
  },
] as const

export const SKIN_RARITY_SEO_SECTIONS = [
  {
    heading: 'Shop color rarity vs real rarity',
    body: [
      'When players Google “rare Fortnite skins,” they often mix two different ideas. The blue / purple / orange / gold label on a cosmetic is Item Shop rarity — it mainly sets the V-Bucks price when that item is for sale (for example Rare outfits around 1,200 V-Bucks and Legendary around 2,000).',
      'Collectibility is different. A Legendary skin that returns every other week is easy to buy. A Rare Battle Pass reward from early Chapter 1 that never hit the shop can be far harder to own, even if its color tier looks “lower.”',
    ],
  },
  {
    heading: 'What this Fortnite skin rarity calculator checks',
    body: [
      'Search any outfit by name. We pull live cosmetics data, including shop appearance history when available, then score scarcity from appearance count, how long the skin has been vaulted, and whether it came from the Item Shop, Battle Pass, Crew, starter packs, or promos.',
      'Static examples above cover Black Knight, Renegade Raider, Aerial Assault Trooper, and Galaxy so crawlers and first-time visitors see complete reports without typing — then use the live search for any other outfit.',
    ],
  },
  {
    heading: 'OG skins, vaulted shop skins, and Battle Pass exclusives',
    body: [
      'OG usually means early Chapter 1 cosmetics tied to Season Shop, Battle Pass, or limited unlocks. Some of those names later returned to the Item Shop (Renegade Raider, Aerial Assault Trooper), which lowers scarcity even if the skin still feels special culturally.',
      'Vaulted shop skins sit in the middle: they were buyable, but long gaps between appearances make them feel rare again. Battle Pass and many promo outfits (Galaxy) often never become standalone shop offers, so their unlock path stays closed after the season or campaign ends.',
    ],
  },
  {
    heading: 'How to use the scarcity score',
    body: [
      'Scores run from 0 (common rotation) to 100 (ultra scarce / OG exclusive). Use them to compare skins, not to price accounts. FortniteTools does not estimate real-money value, and buying or selling accounts violates Epic’s rules.',
      'If you only care what is available today, switch to our Item Shop tracker. If you are planning spends, the V-Bucks calculator helps map outfit tiers to pack costs.',
    ],
  },
] as const
