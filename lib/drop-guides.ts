import { EXTRACTION_SITES, type ContestLevel, type ExtractTraffic } from '@/lib/map-data'

export type DropGuide = {
  slug: string
  name: string
  nearPoi: string
  contest: ContestLevel
  loot: 1 | 2 | 3 | 4 | 5
  chests: string
  biome: string
  excerpt: string
  why: string
  skipWhen: string
  bus: string
  landing: string
  split: string[]
  extract: { name: string; traffic: ExtractTraffic; tip: string }
  sprites: string
  thirdParty: string
  adjacent: string
  rotates: { title: string; body: string }[]
  leaveWhen: string
  loadoutNote: string
  zb: string
  reviewed: string
}

function extractFor(nearPoi: string) {
  const site =
    EXTRACTION_SITES.find((s) => s.nearPoi.toLowerCase() === nearPoi.toLowerCase()) ||
    EXTRACTION_SITES.find((s) => nearPoi.toLowerCase().includes(s.nearPoi.toLowerCase().replace(/^the /, '')))
  return site
    ? { name: site.name, traffic: site.traffic, tip: site.tip }
    : { name: 'Nearest extract', traffic: 'medium' as const, tip: 'Scout the pad on the map before you ping.' }
}

/** Five named-POI drop pages — rotate / extract / third-party, not pin dumps. */
export const DROP_GUIDES: DropGuide[] = [
  {
    slug: 'heatwave-harbor',
    name: 'Heatwave Harbor',
    nearPoi: 'Heatwave Harbor',
    contest: 'hot',
    loot: 5,
    chests: 'Very High',
    biome: 'Industrial port / high-rises',
    excerpt:
      'Highest chest density on Shattered Coast — win one tower, extract or leave before the harbor stacks. Duck-race mythics make this a third-party magnet.',
    why: 'You drop Heatwave when you want a full hotbar in 90 seconds and you accept a 50/50. Floor loot plus stacked chests in the towers beats every other named POI on this island. Mythic / Duck Race traffic is the tax: people who did not land with you still rotate here because the extract ping is loud.',
    skipWhen:
      'Skip it in ranked if you are climbing and the bus is over the port. Skip it in a placement custom if you cannot win a stairwell. Skip it if you already have a Sprite bank and only need zone — the pad is marked hot for a reason.',
    bus: 'Bus-near (over the water or the port) is 20–40 players. Bus-far (you glide a long time from north snow or west desert) is still 8–15 because the POI is famous. If the bus never comes close, you can land an edge high-rise and treat it like a loot stop instead of a war.',
    landing:
      'Land on a high-rise roof on the edge of the POI, not the dock floor. The floor is where everyone who missed a roof fights with grey SMGs. First weapon off a chest or floor spawn on that roof, then take the stairwell you just cleared. Do not zip to the opposite tower until you have 50+ shield — that zip is a highlight reel for whoever already looted.',
    split: [
      'Solo / duo: one building. Roof → floor-2 chests → car or extract if you already have cubes. Greeding a second tower is how you get cracked with no heals.',
      'Trio / squad: two towers that share a zip or stair, not opposite sides of the port. Call the extract before anyone pings it.',
      'Zero Build: cranes and containers, not the open dock. Heavy Impact on the waterline farms anyone who sprints the pier.',
    ],
    extract: extractFor('Heatwave Harbor'),
    sprites:
      'Harbor extract is a Sprite dump, not a farm. You ping, the lobby hears you, and Duck Race mythics already pulled people. If you landed here to bank cubes, you picked the wrong pad — Sunken Shores and Wonkeeland exist for that. Only extract at Heatwave when you own a tower and the pad is visually empty.',
    thirdParty:
      'Rotates in from Chopped Shop (cars on the west road) and Golden Grove (east inland). After the first fight, assume a second team is already on a roof watching the extract. If you hear a mythic or vault ping, leave the pad — sitting on it is how 8-kill games become 12th place. Reset west toward Calamari if zone allows; do not re-peek the same stair.',
    adjacent:
      'West: Chopped Shop (mobility / cars) then Calamari Canyon (edge desert). East: Golden Grove (quieter extract, Sprite-chest pocket). North: Sinister Strip (hot, cars). South: water — do not endgame on the dock. Zero Point is a long inland rotate; you needed a vehicle two circles ago.',
    rotates: [
      {
        title: 'Early (circles 1–2)',
        body: 'If you win the harbor, take a vehicle west toward Calamari or north toward Sinister Strip depending on zone. Walking the open dock is a sniper ad. If zone is already inland, skip extract and drive Golden Grove before circle 2 closes.',
      },
      {
        title: 'Mid (circles 3–4)',
        body: 'Harbor is a terrible hold once storm comes in from the sea. You get pinched between water and whoever took Golden Grove. Rotate inland through Grove if zone is center/north. If the Grove overlook is held, go around via Chopped Shop — do not 50/50 the street.',
      },
      {
        title: 'Endgame pull to Zero Point',
        body: 'You are on the wrong side of the island. Seven Sliders or a car beat one more chest. Teams who landed Frosted Flats / Battlewoods are already staged. Your job is to arrive with heals, not with a third shotgun.',
      },
    ],
    leaveWhen:
      'Shotgun + heals and you lost the roof, or a third party tags the extract, or you hear two other teams still in towers after 60 seconds. Harbor greed is how placement games die.',
    loadoutNote:
      'Close-to-mid fights: Striker Pump or Extending Focus plus Surgical Burst or Warforged. Stinger if you win a stair. Heals before a second mythic. Build the hotbar in the loadout builder if you want STK numbers — grey Rapid Fire on the dock does not beat a roof Striker.',
    zb: 'Zero Build Heatwave is a cover game. Play containers, crane bases, and interior stairwells. Do not peek the waterline. Shockwaves / Sliders matter more than a third gun because you cannot box the extract ping.',
    reviewed: '2026-08-17',
  },
  {
    slug: 'battlewoods',
    name: 'The Battlewoods',
    nearPoi: 'The Battlewoods',
    contest: 'hot',
    loot: 4,
    chests: 'High',
    biome: 'Central forest / mats',
    excerpt:
      'Center wood drop. Fast mats, constant mid-game traffic, and a quieter extract on the mid-north slope if you do not greed the Zero Point.',
    why: 'Battlewoods is the mats-and-fights drop. You are already near Frosted Flats and Zero Point, so circle 3–4 does not require a two-minute car. Wood is everywhere. That is also why every mid-game W-keyer walks through here — you are landing in a hallway, not a pocket.',
    skipWhen:
      'Skip it if two other teams land with you and you need LP. Skip it if zone is already pulling south to Heatwave — the walk is long without a car. Skip it if you wanted a quiet Sprite bank; the extract is quieter than the clearing, not quieter than Sunken Shores.',
    bus: 'Bus over center = war. Bus from a coast = still 6–12 because people love woods. Land the tree-line cabin on the side the bus is leaving so you are not the third party into the clearing in the first 10 seconds.',
    landing:
      'Land a tree-line cabin, not the central clearing. First 15 seconds: any shotgun, then wood. Players who chest-greed in the open while a second duo holds a ridge lose the 50/50 even with better loot. Campfires exist — use them before you peek the next cabin.',
    split: [
      'Solo: one cabin cluster. Two chests and a campfire, then look at zone before touching center.',
      'Duo: cabins that share a ridge. Do not split across the clearing “to cover more chests.”',
      'Ranked: two other teams land with you → take the mats and leave toward Shaken Sanctuary. LP is not in the last chest.',
    ],
    extract: extractFor('The Battlewoods'),
    sprites:
      'The mid-north extract is one of the quieter pads on the island — after a vault / chest clear, not during the first fight. Bank cubes here if you won the drop and zone still loves center. Do not ping the pad while a Frosted Flats team is already shooting the trees.',
    thirdParty:
      'Frosted Flats and Zero Point players third-party every woods fight that lasts more than 30 seconds. If you crack someone and they run toward the flats, do not chase into the magnet. Reset on the extract slope or rotate west into Calamari if zone allows. Shaken Sanctuary is the backup drop if woods is overloaded on spawn island.',
    adjacent:
      'North: Frosted Flats (endgame staging) then Lifty Lodge (snow, zipline). East/center: Zero Point. West: Calamari Canyon. South: Golden Grove then Heatwave. Sanctuary sits as a quieter central backup if you abort the woods land.',
    rotates: [
      {
        title: 'Zone loves center',
        body: 'You are already there. Loot, extract if you have Sprites, then take a ridge toward Frosted Flats instead of sitting in the trees for circle 4. Trees have no height once builds go up on the flats.',
      },
      {
        title: 'Zone pulls south / harbor',
        body: 'Leave immediately. Woods → Golden Grove → Heatwave is a long walk without a car. Do not farm the last cabin. If you have no mobility, you will die in storm with mats and no shotgun ammo.',
      },
      {
        title: 'Zone pulls north snow',
        body: 'Lifty Lodge is the next named. Take the ridge, not the valley — valley is where third parties sit. Lodge roof + zipline is the leave, not another woods fight.',
      },
    ],
    leaveWhen:
      'Mats + a loadout, or the first fight drew a third team, or you hear Zero Point shots while you are still chesting. Center woods are a rotate, not a home.',
    loadoutNote:
      'Shotgun range: Striker Pump with Surgical Burst or Warforged. Maven Auto if you win a close cabin. Shockwaves / Sliders for the leave — you will get sprayed from a ridge if you walk. Skip Lancehead as a primary here; the fights are too close.',
    zb: 'Zero Build woods is third-party hell. Play cabin interiors and ridge lips. Do not take a 30-second spray in the clearing. Mobility items are the ranked loadout, not a third AR.',
    reviewed: '2026-08-17',
  },
  {
    slug: 'wonkeeland',
    name: 'Wonkeeland',
    nearPoi: 'WonkeeLand',
    contest: 'balanced',
    loot: 4,
    chests: 'High',
    biome: 'Returning landmark / northeast',
    excerpt:
      'Learn one building split and repeat it. Quiet extract nearby, Sprite-chest loop, and less bus chaos than harbor or woods — strong ranked default.',
    why: 'Wonkeeland is the repeatable ranked drop on Shattered Coast. Contest is usually 1–2 teams, chests are high enough for a full hotbar, and the extract is next to the POI so you can bank Sprites without a two-POI rotate. You trade “lucky mythic” for consistency.',
    skipWhen:
      'Skip the interior if three teams land — it is a death funnel. Skip the drop entirely if you wanted center endgame staging and the bus is already over Frosted Flats; you will still have to rotate inland. Skip it if you are specifically hunting Duck Race mythics (that is harbor / strip).',
    bus: 'Northeast self-contained. Bus over Wonkeeland is still not a harbor stack. Bus from south coast is a long glide — you arrive after the first chests are gone, so land sheds, not the scripted interior.',
    landing:
      'Pick one interior path (ground-floor chests → stairs → roof) and run it every game. Do not improvise into the neighbor building because you heard a chest. If three teams land, take the outer sheds and leave — fighting the funnel for the last white AR is how you donate LP.',
    split: [
      'Solo: the path you practiced. Two minutes, then extract or coast.',
      'Duo: one interior, one roof watch. Swap if the roof gets tagged. Do not both loot downstairs.',
      'Sprite farm: chests in POI → nearby extract. That loop is why this drop has a map pin.',
    ],
    extract: extractFor('WonkeeLand'),
    sprites:
      'This is the northeast Sprite loop: loot the landmark, walk to the quieter extract, bank, then decide zone. Do it before you peek Frosted Flats. Cubes in the bag beat one more chest when a late rotate from Latte shows up.',
    thirdParty:
      'Northeast is self-contained until someone rotates from Latte Landing (coast) or Frosted Flats (inland). You hear shots from the flats, you do not peek that skyline — you finish loot and extract or take the coast south. Third parties arrive late here. Overstaying is the actual risk, not the first fight.',
    adjacent:
      'South along the coast: Latte Landing. Inland west: Frosted Flats / Zero Point. North: snow edge toward Lifty. Golden Grove is the midpoint on a long south rotate — do not take a full team there unless you have height.',
    rotates: [
      {
        title: 'Zone center / flats',
        body: 'Short rotate inland. Hit extract first if you have cubes. Arrive at Frosted Flats with shields. The team that lands woods and W-keys you on the skyline wins if you peek broke.',
      },
      {
        title: 'Zone south',
        body: 'Long rotate. Need a car or Sliders. Golden Grove is the midpoint — pre-aim the overlook, do not sprint the street. Heatwave after that is a hot POI; only continue if storm forces it.',
      },
      {
        title: 'Zone snow / lodge',
        body: 'North along the edge. Lower contest than cutting through Battlewoods. Lodge zipline is the leave once you have loot.',
      },
    ],
    leaveWhen:
      'Loadout complete, or a second team is still in the POI after about 90 seconds, or you already banked Sprites and zone is inland. Consistency beats one more chest.',
    loadoutNote:
      'You can afford to look for Extending Focus + an AR (Surgical Burst or Warforged). This is not a W-key spawn — pick the shotgun you actually hit with. Heals + one mobility before you start the flats rotate.',
    zb: 'The interior funnel is worse in Zero Build. Play sheds and roof angles. If two teams commit inside, leave — you cannot box the stair.',
    reviewed: '2026-08-17',
  },
  {
    slug: 'latte-landing',
    name: 'Latte Landing',
    nearPoi: 'Latte Landing',
    contest: 'balanced',
    loot: 3,
    chests: 'Medium–High',
    biome: 'Returning coastal / ranked default',
    excerpt:
      'The ranked drop when you want fights without harbor chaos. Coastal rotate inland, enough loot for a full hotbar if you do not greed the cafe roof.',
    why: 'Latte is the ranked default when Wonkeeland is contested on the bus or you want a slightly hotter fight than sheds. Loot is medium–high — enough for a hotbar if you do not ego the cafe. The inland road through Golden Grove is a known rotate, which is both the strength (you always know the path) and the third-party problem.',
    skipWhen:
      'Skip the cafe roof if two other teams are already there. Skip the whole POI if you need a quiet Sprite bank (no dedicated extract — you have to walk to Grove). Skip it if zone is already north snow and you have no boat; the coast hop to Wonkeeland in the open is a pinch.',
    bus: 'Coastal. Bus along the east/south water = 8–15. Bus from Lifty / west desert = you arrive late; take outer buildings, not the cafe. Three teams on the roof is a ranked leave, not a clip.',
    landing:
      'Land the side building away from the bus line. Cafe roof is the ego fight — take it only if you already have a shotgun. First 30 seconds: weapon, smalls, then count teams. Three teams = beach chests and a boat/car inland. Do not third-party the cafe from the sand; you have no cover.',
    split: [
      'Solo ranked: outer buildings. Skip the cafe if you hear two other teams.',
      'Duo: cafe + adjacent house. Not cafe + far dock — you cannot trade.',
      'Placement game: loot the coast and leave toward Golden Grove before circle 2. Do not wait for a mythic that is not here.',
    ],
    extract: extractFor('Golden Grove'),
    sprites:
      'Latte has no dedicated extract on our pad list. The clean bank is Golden Grove’s quieter east-central pad after you rotate inland. Plan that as part of the drop, not a surprise. Sitting on the cafe roof “waiting for a pad” is how you get third-partied with cubes in the backpack.',
    thirdParty:
      'Wonkeeland (north coast) and Heatwave (south/west via Grove) both third-party the cafe roof. Grove itself is the checkpoint — teams from woods and harbor meet there. If you win the roof, leave on the inland road. Emoting on Latte is a ranked throw.',
    adjacent:
      'North: Wonkeeland (scripted landmark, quieter extract). Inland: Golden Grove (overlook, Sprite pad). Further inland: Battlewoods / Zero Point. South toward Heatwave is a hot rotate — only with mobility and storm as the reason.',
    rotates: [
      {
        title: 'Zone inland / woods',
        body: 'Road through Golden Grove. Pre-aim the overlook. Do not sprint the street. If Grove is held, take the long way around rather than donating LP to a height team.',
      },
      {
        title: 'Zone harbor',
        body: 'You are rotating into the highest-loot POI on the island, late. Only do this with a car/Sliders and storm behind you. Harbor extract is not your friend if you arrive after the first fight.',
      },
      {
        title: 'Zone north / Wonkeeland',
        body: 'Short coast hop. Easy with a boat. Easy to get pinched if you walk the beach. If Wonkeeland already extracted, you are walking into a team that has a full loadout.',
      },
    ],
    leaveWhen:
      'Heals + a primary, or the cafe fight is drawing a third team, or circle 2 is inland and you are still on the dock. Ranked LP is the rotate, not the roof.',
    loadoutNote:
      'Ranked default: Striker + Surgical Burst, heals, one mobility. Check the ranked guide if you are still W-keying every drop — placement still pays more LP than a cafe 20-bomb that dies 40th. Zone timer on the second monitor if you throw rotates.',
    zb: 'Cafe roof is worse in Zero Build. Play the side house and the road ditch. Do not stand on the roof for the screenshot.',
    reviewed: '2026-08-17',
  },
  {
    slug: 'sunken-shores',
    name: 'Sunken Shores',
    nearPoi: 'Sunken Shores',
    contest: 'edge',
    loot: 3,
    chests: 'Medium',
    biome: 'South coast / placement',
    excerpt:
      'South-edge drop for LP games. Safer extract, longer rotates inland, and you only stay if zone loves the coast.',
    why: 'You drop Sunken Shores to be alive in circle 4, not to pad elims. The extract is one of the quieter pads (gas-station / south coast). Loot is medium — slower than harbor, safer than woods. The whole drop is a bet that you will leave on time when zone is north.',
    skipWhen:
      'Skip it if you need a mythic or a 10-kill sandbox. Skip it if zone is already calling north of Golden Grove on circle 1 and you have no car/boat/Sliders. Skip it if you hate long rotates — this is the long rotate.',
    bus: 'South edge. Bus rarely dumps 20 people here. 1–3 teams is normal. If a sweaty trio lands with you, take the opposite cluster and leave first — you are not here to win the POI, you are here to win the game.',
    landing:
      'Land the gas-station / shore cluster, not a random cliff. Edge loot is slower: weapon, heals, mobility, then extract. If another team lands with you, opposite building, leave first. Do not chase them into Cluster Coast “for loot.”',
    split: [
      'Solo: one cluster, then extract. The pad here is preferred for rare / cube banks.',
      'Duo: shore + station. Do not split a kilometer apart “for loot” — you cannot trade, and the rotate is the point.',
      'Cube / Sprite bank: extract before rotating into Cluster Coast traffic. Coast east is a midpoint, not a second home.',
    ],
    extract: extractFor('Sunken Shores'),
    sprites:
      'Quiet pad. Bank here before you ever look at Cluster Coast or Heatwave. If you rotate first and extract later, you will ping in front of people who already landed hot and are driving south with mythics.',
    thirdParty:
      'Early contest is low. Late third parties come from Cluster Coast (east) and Heatwave (north) when zone pulls south. If you hear cars from the harbor, you are no longer quiet. Hold a building with an exit, not the open sand. Let Lifty players die in storm — chasing them is not your ranked job.',
    adjacent:
      'East: Cluster Coast (edge, longer inland rotate, medium extract traffic). North: Heatwave Harbor (hot). Inland: Golden Grove then woods / Zero Point. Water south is not an endgame hold.',
    rotates: [
      {
        title: 'Zone stays south',
        body: 'You won the drop. Extract, then take a building on the inland side of the POI. Do not sit on the waterline for endgame — storm and Heavy Impact both farm the sand.',
      },
      {
        title: 'Zone pulls center / north',
        body: 'Leave on circle 1. This is the long rotate. Car, boat, or Sliders. Cluster Coast is a midpoint — do not take a 50/50 there unless storm forces it. Grove is the next checkpoint; treat it like Latte players do.',
      },
      {
        title: 'Storm on the coast',
        body: 'You played the edge correctly. People rotating from Lifty and woods will die. Your job is not to chase them for elims that pay less LP than a top 10.',
      },
    ],
    leaveWhen:
      'Loadout done, or zone is north of Golden Grove, or you hear harbor cars. Greed on the south coast is how you die in storm with 8 kills and a minus LP.',
    loadoutNote:
      'You may not find a mythic. Grey-to-purple Striker + any AR is enough. Zone timer matters more than DPS. Prioritize Shockwaves / Sliders / a boat over a third gun. Open the zone timer when the first circle appears.',
    zb: 'Open sand is a sniper farm. Play station interior and rocks. Mobility is the entire loadout. Do not hold the waterline.',
    reviewed: '2026-08-17',
  },
]

export function getDropGuide(slug: string) {
  return DROP_GUIDES.find((g) => g.slug === slug)
}

export function dropGuidePath(slug: string) {
  return `/drops/${slug}`
}

export function formatDropReviewed(iso: string) {
  const date = new Date(`${iso}T00:00:00.000Z`)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    date
  )
}

export const DROP_PICKER = [
  {
    title: 'Ranked climb (LP)',
    body: 'Wonkeeland or Latte Landing. Sunken Shores if you are throwing games by dying 40th with 6 kills. Harbor and woods are lobby-control drops — they cost LP when the bus is near.',
  },
  {
    title: 'Loot and fights',
    body: 'Heatwave Harbor if you can win a tower. Battlewoods if you want mats and you accept mid-game traffic. Neither is a “best drop” for placement.',
  },
  {
    title: 'Sprite / cube bank',
    body: 'Wonkeeland (loop next to POI) or Sunken Shores (quiet south pad). Harbor extract is a magnet. Latte has no dedicated pad — you walk to Golden Grove.',
  },
  {
    title: 'Zone already looks north / snow',
    body: 'Do not commit Sunken Shores without mobility. Wonkeeland still works. Woods is closer to Lifty if you can win the land.',
  },
] as const

export const DROP_INDEX_FAQS = [
  {
    question: 'Are these the same as the Fortnite map pin tooltips?',
    answer:
      'No. The interactive map keeps short contest / loot / extract notes on each pin. These drop pages are landing-and-rotate guides: how to split the POI, when to extract, where third parties come from, and when to leave. Use the map for pins; use these pages when you search “best drop [POI].”',
  },
  {
    question: 'Will these drops still be true in Chapter 7 Season 4?',
    answer:
      'They describe Shattered Coast as it plays in late Chapter 7 Season 3 (last reviewed 17 Aug 2026). When the island reboots, treat POI names and paths as stale until we rewrite them. The season hub tracks that flip — we will not invent S4 landings the night before.',
  },
  {
    question: 'Which drop is best for ranked?',
    answer:
      'Latte Landing and Wonkeeland are the balanced defaults. Sunken Shores is the placement / LP edge. Heatwave Harbor and Battlewoods are for lobby control, not clean climb games. Ranked still pays placement more than elims — see the ranked guide.',
  },
  {
    question: 'Where should I land if I want mythics?',
    answer:
      'Mythics in C7S3 are boss / vault versions of the live guns (Voidblade, Harley, Skeletor, Wolfe, Catwoman, Dog, Ivy, vault-pedestal sniper). Harbor and Sinister Strip pull that traffic. These five pages are named-POI rotates, not a boss-route spreadsheet. Check the season hub and weapons page for the live mythic list.',
  },
  {
    question: 'Do I still need the loot-spots and all-locations guides?',
    answer:
      'Yes. Those two map guides cover the whole island in article form. These five URLs exist so “best drop Heatwave Harbor” is not a pin dump. Linked from the map pins and from /drops.',
  },
]

export const DROP_GUIDE_FAQS: Record<string, { question: string; answer: string }[]> = {
  'heatwave-harbor': [
    {
      question: 'Is Heatwave Harbor the best drop in Fortnite right now?',
      answer:
        'It is the highest chest-density named POI on Shattered Coast, not the best ranked drop. You contest 20–40 players when the bus is near. Take it for loot and fights; take Latte or Wonkeeland if you need LP.',
    },
    {
      question: 'Should I use the Heatwave Harbor extract?',
      answer:
        'Only if you own a tower and the pad is clear. The extract is marked hot because Duck Race mythics pull the lobby. A car inland is often safer than pinging the pad.',
    },
    {
      question: 'Where do I rotate after winning Heatwave Harbor?',
      answer:
        'Vehicle west to Calamari or north to Sinister Strip if zone is coastal; inland through Golden Grove if zone is center. Do not walk the dock. Zero Point is a late rotate — mobility two circles ago, not one more chest.',
    },
  ],
  battlewoods: [
    {
      question: 'Is Battlewoods too contested for ranked?',
      answer:
        'Often yes if the bus is over center. It is a mats-and-fights drop. If two other teams land with you, take wood and leave toward Shaken Sanctuary instead of greed-looting the clearing.',
    },
    {
      question: 'Where do third parties come from at Battlewoods?',
      answer:
        'Frosted Flats and Zero Point. Any woods fight that lasts more than half a minute gets watched. Reset on the quieter mid-north extract slope instead of chasing into the flats.',
    },
    {
      question: 'Is Battlewoods good if zone pulls south?',
      answer:
        'No. Leave on circle 1. Woods to Grove to Heatwave is a long walk without a car. The last cabin is not worth dying in storm.',
    },
  ],
  wonkeeland: [
    {
      question: 'Why drop Wonkeeland every game?',
      answer:
        'One building script, quieter extract, Sprite-chest loop, and usually 1–2 teams instead of a harbor stack. That consistency is why it is a ranked default on this island.',
    },
    {
      question: 'When should I leave Wonkeeland?',
      answer:
        'When the hotbar is full or a second team is still in the POI after about 90 seconds. Overstaying is the risk here — third parties arrive late from Latte and the flats.',
    },
    {
      question: 'Is Wonkeeland good for Sprites?',
      answer:
        'Yes. Chests in the landmark then the nearby quieter extract is the northeast loop. Bank before you peek Frosted Flats.',
    },
  ],
  'latte-landing': [
    {
      question: 'Is Latte Landing good for ranked Fortnite?',
      answer:
        'Yes — fights without harbor chaos. Land the side building, skip the cafe roof if two other teams are already there, and rotate inland through Golden Grove before circle 2 in a placement game.',
    },
    {
      question: 'Does Latte Landing have its own extract?',
      answer:
        'Not on our pad list. The clean leave is Golden Grove’s quieter east-central extract after you rotate inland. Do not sit on the cafe roof waiting for a pad that is not there.',
    },
    {
      question: 'Should I take the Latte cafe roof?',
      answer:
        'Only if you already have a shotgun and the roof is not a 3-team pile. Outer buildings are the ranked play. The roof is a clip, not LP.',
    },
  ],
  'sunken-shores': [
    {
      question: 'Is Sunken Shores too far for a good game?',
      answer:
        'It is an edge drop. You trade early loot speed for a quieter extract and a live circle-4. Leave on circle 1 if zone is north of Golden Grove — the long rotate is the whole point of the landing.',
    },
    {
      question: 'When does Sunken Shores stop being quiet?',
      answer:
        'When you hear cars from Heatwave or Cluster Coast after zone pulls south. Then it is a hold with an exit, not an open-sand farm.',
    },
    {
      question: 'Should I drop Sunken Shores for mythics?',
      answer:
        'No. You may not find one. Grey-to-purple Striker plus an AR is the loadout. This drop is for placement and a quiet Sprite pad.',
    },
  ],
}
