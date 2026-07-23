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
      'It is iconic, but Epic has brought Renegade Raider back to the Item Shop. Appearance count and last-seen date matter more than the name alone — nostalgia does not equal current scarcity.',
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
    scarcity: 'Check last seen',
  },
  {
    name: 'Aerial Assault Trooper',
    note: 'Early Chapter 1 unlock / exclusive vibes — verify current shop history in the tool.',
    scarcity: 'High nostalgia',
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
      'The example above uses Black Knight — a Chapter 1 Season 2 Battle Pass Legendary with zero recorded shop sales — so crawlers and first-time visitors see a complete report without needing to type anything.',
    ],
  },
  {
    heading: 'OG skins, vaulted shop skins, and Battle Pass exclusives',
    body: [
      'OG usually means early Chapter 1 cosmetics tied to Season Shop, Battle Pass, or limited unlocks. Some of those names later returned to the Item Shop, which lowers scarcity even if the skin still feels special culturally.',
      'Vaulted shop skins sit in the middle: they were buyable, but long gaps between appearances make them feel rare again. Battle Pass and many promo outfits often never become standalone shop offers, so their unlock path stays closed after the season or campaign ends.',
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
