import { CURRENT_SEASON } from '@/lib/season'

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

export const FREE_COSMETICS_REVIEWED = '9 Oct 2026'

/** Free Fortnite cosmetics / rewards tracker — Override (C7S4). Update when Epic refreshes promos. */
export const FREE_COSMETIC_OFFERS: FreeCosmeticOffer[] = [
  {
    id: 'fortnitemares-nitemare-quests',
    title: 'Fortnitemares — Jack-a-Nape quests',
    endsIso: '2026-10-31T23:59:00.000Z',
    endsLabel: '31 October',
    howTo:
      'Complete 26 Nitemare quests across BR / Zero Build, Horde Rush, and Reload. Milestones unlock Wind-Up Key, Monkey Biz, Jack’s Tambourine, and the free Jack-a-Nape outfit at 26.',
    details: [
      'Progress carries across modes — mix BR, Horde Rush, and Nitemare Island Reload.',
      'Waves drop through October (Oct 1 + Oct 8 batches live). Finish before 31 Oct.',
      'Each quest also grants ~15k XP toward the Override Battle Pass.',
    ],
    href: '/season',
    hrefLabel: 'Season hub',
    category: 'quest',
    rewards: [
      { id: 'LoadingScreen_HiHat', name: 'The Clockwork Ape' },
      { id: 'Backpack_HiHat', name: 'Wind-Up Key' },
      { id: 'Emoticon_HiHat', name: 'Monkey Biz' },
      { id: 'Pickaxe_HiHat', name: "Jack's Tambourine" },
      { id: 'Emoticon_HiHat2', name: 'Tambourine Surprise' },
      { id: 'Character_HiHat', name: 'Jack-a-Nape' },
    ],
  },
  {
    id: 'fortnitemares-jimothy',
    title: 'Fortnitemares — Jimothy Sidekick',
    endsIso: '2026-10-31T23:59:00.000Z',
    endsLabel: '31 October',
    howTo:
      'Find a Dumpster Diver Sprite on the island and extract it (Extraction Sites or a Portable Extractor) to unlock the free Jimothy Sidekick.',
    details: [
      'Extraction Accelerators from Admin Panel codes make the pull safer.',
    ],
    category: 'quest',
    rewards: [{ id: 'Companion_ScrapPaws', name: 'Jimothy' }],
  },
  {
    id: 'fortnitemares-login-tapestry',
    title: 'Fortnitemares — Prophetic Tapestry',
    endsIso: '2026-10-31T23:59:00.000Z',
    endsLabel: '31 October',
    howTo: 'Log into Fortnite during Fortnitemares and claim the free Prophetic Tapestry loading screen.',
    category: 'other',
    rewards: [{ id: 'LoadingScreen_S42_Narrative3', name: 'Prophetic Tapestry' }],
  },
  {
    id: 'twitch-ironmouse',
    title: 'Twitch Drop — ironmouse',
    endsIso: '2026-09-30T23:59:00.000Z',
    endsLabel: '30 September',
    howTo:
      'Link Epic ↔ Twitch, then watch ironmouse’s live Fortnite streams. 30 minutes = Chibi Ironmouse Spray; 60 minutes = Guitar Processing Unit (guitar + matching back bling + pickaxe). Claim in Twitch Drops inventory.',
    details: [
      'Ended 30 September 2026. Kept here so completed marks stay honest.',
      'Watch for the next Fortnite-category Twitch drop window — we will re-list when Epic posts one.',
    ],
    href: 'https://www.twitch.tv/ironmouse',
    hrefLabel: 'twitch.tv/ironmouse',
    category: 'twitch',
  },
  {
    id: 'admin-panel-lobby-hacks',
    title: 'Admin Panel — Lobby Hack codes',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo:
      'In the Override lobby (Ranked OFF), open the Admin Panel and enter Epic Lobby Hack codes for free XP, Sprite Dust, Sprites, Gizmos, loading screens, and Fortnitemares lobby effects.',
    details: [
      'Oct 1 Fortnitemares drop included CrowsAreAfraid / PumpkinSpiceLife (lobby transforms), IThinkTheKeyFoundMeChat (Extraction Accelerator), plus quest-gated dust codes.',
      'Codes work once per account (reusable lobby transforms are the exception). Sprite duplicates usually convert to Sprite Dust.',
      'Never V-Bucks — any “free V-Bucks code” site is a scam.',
    ],
    href: '/guides/how-to/fortnite-admin-panel-lobby-hack-codes',
    hrefLabel: 'Admin Panel guide',
    category: 'quest',
  },
  {
    id: 'battle-pass-free-override',
    title: 'Battle Pass free track (Override)',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo:
      'Earn levels on the Chapter 7 Season 4 Battle Pass free track for V-Bucks and cosmetics (pass purchase unlocks the premium pages).',
    details: [
      'Season ends 1 November 2026 (ET). Use the XP calculator to plan the grind.',
      'Sonic and other premium page rewards need the paid pass or Crew.',
    ],
    href: '/guides/season/fortnite-override-battle-pass-guide',
    hrefLabel: 'Override Battle Pass guide',
    category: 'pass',
  },
  {
    id: 'ranked-null-override',
    title: 'Ranked — Null rewards',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo:
      'Climb Ranked for the Null outfit and matching Skeletal Slingbag / Null’s Scythe styles (Champion Molten, Elite Neon, Unreal Rifted).',
    details: [
      'Exact cup calendars and kill challenges shift mid-season — check Ranked / Cups in Discover.',
      'Styles unlock by rank tier, not Item Shop purchase.',
    ],
    href: '/guides/how-to/how-to-get-null-ranked-rewards-fortnite',
    hrefLabel: 'Null ranked guide',
    category: 'ranked',
  },
  {
    id: 'ranked-play-all-ranks',
    title: 'Ranked BR — play each rank',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo:
      'Play Ranked Battle Royale at Gold and above when Epic’s seasonal ranked quests are live — higher ranks usually unlock emotes and wraps.',
    category: 'ranked',
  },
  {
    id: 'crown-vr-br-override',
    title: '(Crown) Victory Royale — BR',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo:
      'Win a Victory Royale in Battle Royale or Zero Build. Win while holding a crown when the seasonal crown quest is active for an extra emoticon.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'crown-vr-reload-override',
    title: '(Crown) Victory Royale — Reload',
    endsIso: CURRENT_SEASON.endIso,
    endsLabel: '1 November',
    howTo: 'Win in Reload or Zero Build Reload. Crown wins may grant an extra emoticon when the quest is active.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
  },
  {
    id: 'vr-blitz-1',
    title: 'Victory Royale — Blitz',
    howTo: 'Get a Victory Royale in Blitz Royale when the mode is in the playlist.',
    category: 'quest',
    rewards: [
      { id: 'Solo_Umbrella', name: 'The Umbrella' },
      { id: 'Emoji_VictoryRoyale', name: 'Victory Royale' },
    ],
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
    howTo: 'Progress free Rocket Pass tiers — free rewards around mid/late tiers (Crew gets premium track).',
    category: 'collab',
  },
  {
    id: 'arenas-boxfights',
    title: 'Arenas Boxfights',
    endsIso: '2026-09-24T23:59:00.000Z',
    endsLabel: '24 September',
    howTo: 'Win rounds of Arenas Boxfights for emoticon / spray / pickaxe milestones when the playlist is live.',
    details: [
      'Typical milestones: ~125 rounds emoticon, ~300 spray, ~750 pickaxe — confirm in-quest.',
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
    howTo: 'Redeem an Epic Games gift card before 2027 (not a V-Bucks card) for the promo reward when the offer is live.',
    category: 'account',
  },
  {
    id: 'login-rewards',
    title: 'Login Rewards',
    howTo: 'Log into Fortnite to claim login rewards when Epic runs a login calendar.',
    category: 'other',
  },
  {
    id: 'rl-new-driver',
    title: 'New Driver Challenges (Rocket League)',
    howTo: 'Complete New Driver Challenges Stage 2 in Rocket League (unlocked after the tutorial).',
    category: 'collab',
  },
  {
    id: 'rl-drops',
    title: 'Rocket League Drops',
    howTo:
      'Earn drops via Rocket Pass or weekly / seasonal challenges — drops can contain cosmetics that transfer to Fortnite.',
    category: 'collab',
  },
  {
    id: 'survey-sir-beurre',
    title: 'Survey — Sir Beurre',
    howTo: 'Sign up to receive Epic email surveys to earn the Sir Beurre back bling when surveys are offered.',
    category: 'account',
    rewards: [{ id: 'Backpack_ButterVehicle', name: 'Sir Beurre' }],
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
    howTo: 'Claim the True Explorers Quest Pack in the Item Shop (when listed) and complete the LEGO Fortnite challenges.',
    category: 'quest',
    rewards: [{ id: 'Character_VitalInventor', name: 'Trailblazer Tai' }],
  },
  {
    id: 'lego-account-link',
    title: 'LEGO Account',
    howTo: 'Connect your Epic Games and LEGO accounts for free skins and a backbling.',
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
    howTo: 'Defeat bosses, then interact with level 10 villages to earn decor in LEGO Fortnite.',
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
