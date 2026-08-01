export const CREATIVE_CODES_FAQS = [
  {
    question: 'How do I enter a Fortnite Creative map code?',
    answer:
      'Open Fortnite → Discover → search icon → paste the 12-digit island code (XXXX-XXXX-XXXX) → select the island → play. You can also open the Fortnite.com island link from this page on a signed-in browser.',
  },
  {
    question: 'What are the best Fortnite XP map codes right now?',
    answer:
      'In August 2026 start with FortM (6163-6465-2983), then 50 Fashion Show, Havoc Hotel 3, TikToker Tycoon / Island Tycoon, and Cars Mega Ramp. This page defaults to the XP Maps filter — copy a code, load Discover, and rotate when Creative XP slows (daily cap).',
  },
  {
    question: 'Do Fortnite horror map codes still give XP?',
    answer:
      'Many horror islands award Creative XP while you play, but rates vary and Epic can change XP eligibility. Check the in-game XP badge on the island details and treat horror maps as entertainment first.',
  },
  {
    question: 'Where can I find Fortnite 1v1 map codes?',
    answer:
      'Use the 1v1 filter on this page for aim, edit, and build-fight practice codes. Ranked Aim Edit Piece 1v1 and dedicated build-fight practice lobbies are the usual starting points for mechanics warmup.',
  },
  {
    question: 'What is a Fortnite tycoon code?',
    answer:
      'Tycoon islands are clicker / upgrade maps — hit a box, earn currency, unlock stations. They are popular for AFK-friendly Creative XP, but always verify the code still loads in Discover.',
  },
  {
    question: 'Are these Creative codes official from Epic Games?',
    answer:
      'Island codes are created by Fortnite Creative / UEFN creators. FortniteTools is an independent fan site. We curate searchable codes and pull public engagement metrics when available — not an Epic product.',
  },
]

/** Crawlable August 2026 XP money-section — keep codes in sync with CREATIVE_MAPS. */
export const BEST_XP_MAP_CODES_AUGUST_2026 = [
  {
    name: 'FortM',
    code: '6163-6465-2983',
    note: 'Most-searched XP farm — private lobby recommended for the daily Creative cap.',
  },
  {
    name: '50 Fashion Show',
    code: '3399-8889-2099',
    note: 'Social fashion lobby with strong XP if you hate pure AFK clickers.',
  },
  {
    name: 'Havoc Hotel 3',
    code: '7962-7087-3391',
    note: 'Hotel rooms plus AFK-friendly Creative XP zones.',
  },
  {
    name: 'Cars Mega Ramp',
    code: '5442-4943-3475',
    note: 'Steady driving XP while you cruise the mega-ramp.',
  },
  {
    name: 'Sweaty Red vs Blue',
    code: '6531-4403-0726',
    note: 'Active PvP that still farms Creative XP.',
  },
  {
    name: 'Prison Escape AFK',
    code: '7300-0705-2924',
    note: 'Chill escape / AFK lobby often used to finish the daily cap.',
  },
] as const

export const CREATIVE_CODES_SEO_SECTIONS = [
  {
    heading: 'Creative XP caps & how to level up fast',
    body: [
      'XP map codes are still the fastest Creative path to Battle Pass levels in Chapter 7 Season 3. This page opens on the XP Maps filter by default so you can copy FortM and the other high-rated farms without digging.',
      'Creative XP is capped daily — rotate maps when gains slow, then finish BR dailies. For a full walkthrough (how to enter a code, caps, and a 30-minute plan), read our Best Fortnite XP maps guide. Pair with the Battle Pass XP calculator to see if you can finish the pass before season end.',
    ],
  },
  {
    heading: 'Fortnite map codes — how this database works',
    body: [
      'Players search constantly for Fortnite map codes, XP map codes, horror map codes, 1v1 map codes, tycoon codes, and escape room codes. This page is a searchable Creative island list with code, player range, genre, curated XP rating, and live unique-player metrics when Epic’s public ecosystem API returns them.',
      'Screenshots are not always available from public endpoints, so cards emphasize code, genre, and engagement. Always confirm an island still appears in Discover before relying on it for Battle Pass XP.',
    ],
  },
  {
    heading: 'Fortnite horror map codes',
    body: [
      'Horror islands lean on jumpscares, story chapters, first-person cameras, and co-op escapes. Face Your Fears and Midnight Anomalies are common “horror map codes” searches because they feel closer to dedicated horror games than BR pubs.',
      'Turn graphics and volume up when creators recommend it — a lot of the scare design depends on audio and lighting.',
    ],
  },
  {
    heading: 'Fortnite 1v1 map codes',
    body: [
      '1v1 codes are for aim, edits, piece control, and build fights without matchmaking queues. Use them as warmups before Ranked or to settle friendlies with a clean private fight ruleset.',
      'If a 1v1 lobby is full or outdated, try another build-fight code from the 1v1 filter — creators publish replacements often.',
    ],
  },
  {
    heading: 'Fortnite tycoon codes & escape room codes',
    body: [
      'Tycoon codes are the clicker genre: generate money, buy upgrades, optionally AFK. Escape room codes focus on puzzles, IQ tests, and co-op doors — sometimes mixed with parkour or light horror.',
      'Both genres change quickly. If a code 404s in Discover, search the map name or pick another curated entry from the matching filter chip.',
    ],
  },
] as const
