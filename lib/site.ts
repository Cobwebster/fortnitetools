export const siteConfig = {
  name: 'FortniteTools',
  domain: 'www.fortnitetools.com',
  url: 'https://www.fortnitetools.com',
  description:
    'Treasure Hunters map, player stats, Item Shop, weapons, Fortnite leaks, and season hubs — plus loadout builder, build practice, and guides.',
  ogImage: '/images/map-evolution/40-40.webp',
  contactEmail: 'thederpywhale@hotmail.com',
} as const

/** Support-A-Creator slug for FortniteTools — enter in Item Shop → Enter Code. */
export const SITE_CREATOR_CODE = 'TOOLS' as const

/** Flip to `true` when Epic approves the TOOLS Support-A-Creator code. */
export const SITE_CREATOR_CODE_LIVE = true

export const EPIC_DISCLAIMER =
  'FortniteTools is an independent fan site. We are not affiliated with, endorsed by, sponsored by, or connected to Epic Games, Inc. Fortnite® is a trademark of Epic Games, Inc. All game assets and trademarks belong to their respective owners.'

