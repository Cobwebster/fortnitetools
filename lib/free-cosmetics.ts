export type FreeCosmeticCategory =
  | 'twitch'
  | 'quest'
  | 'ranked'
  | 'pass'
  | 'collab'
  | 'account'
  | 'other'

export type FreeCosmeticReward = {
  /** Fortnite-API cosmetic id (BR). */
  id: string
  name: string
}

export type FreeCosmeticOffer = {
  id: string
  title: string
  /** End of offer (UTC). Omit for ongoing / no stated end. */
  endsIso?: string
  /** Short human end label, e.g. "27 July" */
  endsLabel?: string
  howTo: string
  details?: string[]
  href?: string
  hrefLabel?: string
  category: FreeCosmeticCategory
  rewards?: FreeCosmeticReward[]
}

export function cosmeticIconUrl(id: string) {
  return `https://fortnite-api.com/images/cosmetics/br/${id.toLowerCase()}/smallicon.png`
}

/** Free Fortnite cosmetics / rewards tracker — update when Epic refreshes promos. */
export const FREE_COSMETIC_OFFERS: FreeCosmeticOffer[] = [
  {
    id: 'twitch-cuddles-chaos',
    title: 'Twitch Drop — Cuddles and Chaos',
    endsIso: '2026-07-27T23:59:00.000Z',
    endsLabel: '27 July',
    howTo: 'Watch any Fortnite Cuddles and Chaos stream on Twitch for 30 minutes.',
    href: 'https://www.twitch.tv/directory/category/fortnite?filter=drops',
    hrefLabel: 'Twitch Fortnite drops',
    category: 'twitch',
  },
  {
    id: 'twitch-fortnite-1h',
    title: 'Twitch Drop — Watch Fortnite',
    endsIso: '2026-07-27T23:59:00.000Z',
    endsLabel: '27 July',
    howTo: 'Watch Fortnite on Twitch for 1 hour (drops-enabled streams).',
    href: 'https://www.twitch.tv/directory/category/fortnite?filter=drops',
    hrefLabel: 'Twitch Fortnite drops',
    category: 'twitch',
  },
  {
    id: 'music-pass',
    title: 'Music Pass',
    endsIso: '2026-07-29T23:59:00.000Z',
    endsLabel: '29 July',
    howTo: 'Earn XP to level the Music Pass — every 160,000 XP is one Music Pass level.',
    category: 'pass',
  },
  {
    id: 'elite-stronghold',
    title: 'Elite Stronghold',
    endsIso: '2026-07-30T23:59:00.000Z',
    endsLabel: '30 July',
    howTo: 'Complete 12 quests on the Elite Stronghold Reload map.',
    category: 'quest',
  },
  {
    id: 'map-mastery-reload',
    title: 'Map Mastery (Reload)',
    endsIso: '2026-07-30T23:59:00.000Z',
    endsLabel: '30 July',
    howTo: 'Complete quests on all 3 current Reload maps (4 quests each — 12 total for every reward).',
    category: 'quest',
  },
  {
    id: 'crown-vr-reload',
    title: '(Crown) Victory Royale — Reload',
    endsIso: '2026-07-30T23:59:00.000Z',
    endsLabel: '30 July',
    howTo: 'Get a Victory Royale in Reload or Zero Build Reload. Win with a crown for an extra emote.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'thing-from-beneath',
    title: 'The Thing From Beneath',
    endsIso: '2026-08-06T23:59:00.000Z',
    endsLabel: '6 August',
    howTo: 'Defeat the Thing From Beneath, or fish using Flint-Knock bait for the build.',
    details: ['Defeat it on Expert mode for the decor.'],
    category: 'quest',
  },
  {
    id: 'kickoff-yeddy-mobile',
    title: 'Kickoff Yeddy Mobile',
    endsIso: '2026-08-09T23:59:00.000Z',
    endsLabel: '9 August',
    howTo: 'Level up 1 time while in a party on mobile.',
    category: 'quest',
    rewards: [{ id: 'Character_SnowyCoast', name: 'Kickoff Yeddy' }],
  },
  {
    id: 'parts-power-machinist',
    title: 'Parts, Power and the Machinist',
    endsIso: '2026-08-13T23:59:00.000Z',
    endsLabel: '13 August',
    howTo: 'Load into LEGO Odyssey for a free build. Speak to the Machinist daily for new decor.',
    details: [
      'Daily Machinist decor: 16 July – 29 July.',
      'Catch up missed days: 30 July – 13 August.',
    ],
    category: 'quest',
  },
  {
    id: 'ranked-cups',
    title: 'Ranked Cups',
    endsIso: '2026-08-18T23:59:00.000Z',
    endsLabel: '18 August',
    howTo: 'Play Ranked Cups — each item has a different top-player requirement based on your rank.',
    details: ['The second backbling is Reload Cup only.'],
    category: 'ranked',
  },
  {
    id: 'hot-bat-summer',
    title: 'Hot Bat Summer',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Complete weekly quests to earn rewards.',
    details: ['Do 4 quests from each drop to earn an umbrella.'],
    category: 'quest',
    rewards: [
      { id: 'LoadingScreen_CH7S3_KeyArt', name: 'Hot Bat Summer' },
      { id: 'Glider_DiscoButler', name: 'Zap-Brella' },
      { id: 'Character_TideCompost', name: 'Beach Bod Batman' },
      { id: 'Backpack_TideCompost', name: 'Batman Floatie' },
      { id: 'EID_TideCompost', name: "Surf's Up!" },
    ],
  },
  {
    id: 'mobile-quests-aug',
    title: 'Mobile Quests',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Complete 2 quests on mobile: invite a friend to Fortnite, and gain 1 level.',
    category: 'quest',
  },
  {
    id: 'sprite-mastery',
    title: 'Sprite Mastery',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Master Sprites to unlock free backblings and a glider.',
    details: [
      '1 mastered — backbling',
      '7 mastered — style',
      '10 / 12 / 14 / 16 / 19 mastered — backblings',
      '21 mastered — glider',
      '22 / 24 / 28 mastered — backblings',
      '30 / 60 mastered — gliders',
      '70 mastered — emote',
    ],
    href: '/guides/how-to/how-to-extract-sprites-fortnite',
    hrefLabel: 'Extract guide',
    category: 'quest',
    rewards: [
      { id: 'Backpack_ExtractionFrame', name: 'Extraction Frame' },
      { id: 'Backpack_ExtractionFrame_PixieParts', name: "The Guardian's Friend Frame!" },
      { id: 'Backpack_ExtractionFrame_CopperMoggy', name: "Slone's Extraction Frame" },
      { id: 'Backpack_ExtractionFrame_HydroDrift', name: "Wolfe's Extraction Frame" },
      { id: 'Backpack_ExtractionFrame_LemonWrath', name: "The Voidblade's Extraction Frame" },
      { id: 'Backpack_ExtractionFrame_LivelySugar', name: "Dylan's Extraction Frame" },
      { id: 'Backpack_ExtractionFrame_LocalTalent', name: "PJ's Extraction Frame" },
      { id: 'Backpack__ExtractionFrame_AlpacaLean', name: "John Wick's Extraction Frame" },
      { id: 'Backpack_ColdTrophy', name: 'Sprite Mastery Pod' },
      { id: 'EID_SpriteSender', name: 'Sprite Party' },
    ],
  },
  {
    id: 'crown-vr-br',
    title: '(Crown) Victory Royale — BR',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Get a Victory Royale in BR or Zero Build BR. Win with a crown for an extra emote.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'ranked-100-kills',
    title: 'Ranked BR / Reload — 100 Kills',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Get 100 kills in Ranked BR or Ranked Reload.',
    category: 'ranked',
  },
  {
    id: 'ranked-br-all-ranks',
    title: 'Ranked Battle Royale',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Play one match in each rank. Gold+ each give a reward; Elite+ adds an emote.',
    category: 'ranked',
  },
  {
    id: 'battle-pass-free',
    title: 'Battle Pass',
    endsIso: '2026-08-20T23:59:00.000Z',
    endsLabel: '20 August',
    howTo: 'Earn levels to unlock free-track V-Bucks and cosmetics in the Battle Pass.',
    href: '/xp-calculator',
    hrefLabel: 'XP calculator',
    category: 'pass',
    rewards: [
      { id: 'Character_PixieParts_Lava', name: 'The Guardian' },
      { id: 'Backpack_PixieParts_Lava', name: 'Sprite Seat' },
      { id: 'LoadingScreen_S41Narrative', name: 'Welcome, The Guardian' },
    ],
  },
  {
    id: 'ranked-reload-ranks',
    title: 'Ranked Reload',
    endsIso: '2026-08-30T23:59:00.000Z',
    endsLabel: '30 August',
    howTo: 'Play one match of all ranks from Gold upward.',
    details: [
      'Elite unlocks an extra emote.',
      'Elite also unlocks challenges for an extra wrap.',
      'Unreal unlocks a pickaxe style.',
    ],
    category: 'ranked',
  },
  {
    id: 'crown-vr-og',
    title: '(Crown) Victory Royale — OG',
    endsIso: '2026-09-02T23:59:00.000Z',
    endsLabel: '2 September',
    howTo: 'Get a Victory Royale in OG or Zero Build OG. Win with a crown for an extra emote.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'og-pass',
    title: 'OG Pass',
    endsIso: '2026-09-02T23:59:00.000Z',
    endsLabel: '2 September',
    howTo: 'Gain XP and earn rewards from the OG Pass free track.',
    category: 'pass',
  },
  {
    id: 'lego-pass',
    title: 'LEGO Pass',
    endsIso: '2026-09-03T23:59:00.000Z',
    endsLabel: '3 September',
    howTo: 'Earn XP to level up your LEGO Pass and claim free-track rewards.',
    category: 'pass',
  },
  {
    id: 'rocket-league-cup',
    title: 'Rocket League Cup',
    endsIso: '2026-09-23T23:59:00.000Z',
    endsLabel: '23 September',
    howTo:
      'Play Rocket League tournaments for points you can spend on tournament drops (chance at Fortnite-transfer cosmetics).',
    category: 'collab',
  },
  {
    id: 'rocket-pass-s23',
    title: 'Season 23 Rocket Pass',
    endsIso: '2026-09-23T23:59:00.000Z',
    endsLabel: '23 September',
    howTo: 'Progress free Rocket Pass tiers — free rewards around tiers 27 and 43 (Crew gets premium track).',
    category: 'collab',
  },
  {
    id: 'arenas-boxfights',
    title: 'Arenas Boxfights',
    endsIso: '2026-09-24T23:59:00.000Z',
    endsLabel: '24 September',
    howTo: 'Win rounds of Arenas Boxfights.',
    details: [
      '125 rounds — emoticon',
      '300 rounds — spray',
      '750 rounds — pickaxe',
    ],
    category: 'quest',
  },
  {
    id: 'mydisney-link',
    title: 'Link a MyDisney Account',
    endsIso: '2026-10-31T23:59:00.000Z',
    endsLabel: '31 October',
    howTo: 'Link your MyDisney account with your Epic Games account for a free backbling.',
    category: 'account',
    rewards: [{ id: 'Backpack_MonkeyPatentRipe', name: 'Mickey Mouse TSUM' }],
  },
  {
    id: 'epic-giftcard-2026',
    title: 'Redeem an Epic Games Gift Card',
    endsIso: '2026-12-31T23:59:00.000Z',
    endsLabel: '31 December',
    howTo: 'Redeem an Epic Games gift card before 2027 (not a V-Bucks card) for the promo reward.',
    category: 'account',
  },
  {
    id: 'mobile-festival-quests',
    title: 'Mobile Quests — Festival',
    howTo: 'Play Fortnite on mobile and complete Festival Main Stage quests.',
    details: [
      '2 challenges — New Heart Jam Track',
      '4 challenges — Keytarcade Keytar, pickaxe, and backbling',
    ],
    category: 'quest',
    rewards: [
      { id: 'Backpack_VintageConsole_Keytar', name: 'Keytarcade' },
      { id: 'Pickaxe_VintageConsole_Keytar', name: 'Keytarcade' },
    ],
  },
  {
    id: 'vr-blitz-1',
    title: 'Victory Royale — Blitz',
    howTo: 'Get a Victory Royale in Blitz Royale.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'vr-blitz-3',
    title: 'Victory Royale ×3 — Blitz',
    howTo: 'Get a Victory Royale 3 times in Blitz.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'login-rewards',
    title: 'Login Rewards',
    howTo: 'Log into Fortnite to claim login rewards when available.',
    category: 'other',
  },
  {
    id: 'rl-new-driver',
    title: 'New Driver Challenges (Rocket League)',
    howTo: 'Complete New Driver Challenges Stage 2 in Rocket League (unlocked after the tutorial).',
    category: 'collab',
  },
  {
    id: 'survey-sir-beurre',
    title: 'Survey — Sir Beurre',
    howTo: 'Sign up to receive Epic email surveys to earn the Sir Beurre back bling.',
    category: 'account',
    rewards: [{ id: 'Backpack_ButterVehicle', name: 'Sir Beurre' }],
  },
  {
    id: 'rl-drops',
    title: 'Rocket League Drops',
    howTo:
      'Earn drops via Rocket Pass or weekly / seasonal challenges — drops can contain cosmetics that transfer to Fortnite.',
    category: 'collab',
  },
  {
    id: 'default-account',
    title: 'Default',
    howTo: 'Make an Epic account and log into Fortnite for starter defaults.',
    category: 'account',
    rewards: [
      { id: 'CID_001_Athena_Commando_F_Default', name: 'Recruit' },
      { id: 'CID_005_Athena_Commando_M_Default', name: 'Recruit' },
      { id: 'CID_002_Athena_Commando_F_Default', name: 'Recruit' },
      { id: 'CID_006_Athena_Commando_M_Default', name: 'Recruit' },
      { id: 'DefaultPickaxe', name: 'Default Pickaxe' },
    ],
  },
  {
    id: 'true-explorers',
    title: 'True Explorers Quest Pack',
    howTo: 'Claim the True Explorers Quest Pack in the Item Shop and complete the LEGO Fortnite challenges.',
    category: 'quest',
    rewards: [{ id: 'Character_VitalInventor', name: 'Trailblazer Tai' }],
  },
  {
    id: 'lego-account-link',
    title: 'LEGO Account',
    howTo: 'Connect your Epic Games and LEGO accounts for 2 free skins and a backbling.',
    category: 'account',
    rewards: [
      { id: 'Character_VitalInventorBlock', name: 'Explorer Emilie' },
      { id: 'CID_978_Athena_Commando_M_FancyCandy', name: 'Mr. Dappermint' },
    ],
  },
  {
    id: 'postparty-clip',
    title: 'Postparty',
    howTo: 'Share your first clip from the Postparty app.',
    category: 'other',
    rewards: [{ id: 'SPID_379_PostpartyReward', name: 'Postparty Confetti' }],
  },
  {
    id: '2fa-boogie-down',
    title: 'Free Emote — Enable 2FA',
    howTo: 'Enable two-factor authentication on your Epic account to get the Boogie Down emote.',
    category: 'account',
    rewards: [{ id: 'EID_BoogieDown', name: 'Boogie Down' }],
  },
  {
    id: 'lego-expert',
    title: 'LEGO Expert',
    howTo: 'Defeat bosses, then interact with level 10 villages to earn decor.',
    details: [
      'Each biome has its own village and boss.',
      'Dragon statues require defeating that specific dragon.',
    ],
    category: 'quest',
  },
]

export const FREE_COSMETIC_CATEGORY_LABEL: Record<FreeCosmeticCategory, string> = {
  twitch: 'Twitch',
  quest: 'Quests',
  ranked: 'Ranked',
  pass: 'Passes',
  collab: 'Collabs',
  account: 'Account',
  other: 'Other',
}

export function offerRemaining(endsIso: string | undefined, now = new Date()) {
  if (!endsIso) return null
  const end = new Date(endsIso).getTime()
  const ms = end - now.getTime()
  if (ms <= 0) return { ended: true as const, days: 0, hours: 0, minutes: 0, ms: 0 }
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  return { ended: false as const, days, hours, minutes, ms }
}

export function formatRemaining(parts: NonNullable<ReturnType<typeof offerRemaining>>) {
  if (parts.ended) return 'Ended'
  if (parts.days > 0) return `${parts.days}d ${parts.hours}h`
  if (parts.hours > 0) return `${parts.hours}h ${parts.minutes}m`
  return `${parts.minutes}m`
}

export function sortOffersByUrgency(offers: FreeCosmeticOffer[], now = new Date()) {
  return [...offers].sort((a, b) => {
    const ra = offerRemaining(a.endsIso, now)
    const rb = offerRemaining(b.endsIso, now)
    if (!a.endsIso && !b.endsIso) return a.title.localeCompare(b.title)
    if (!a.endsIso) return 1
    if (!b.endsIso) return -1
    if (ra?.ended && !rb?.ended) return 1
    if (!ra?.ended && rb?.ended) return -1
    return (ra?.ms ?? 0) - (rb?.ms ?? 0)
  })
}
