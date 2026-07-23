export type Category = 'how-to' | 'weapons' | 'season' | 'map'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: Category
  /** Optional; omit when we don't have a real Fortnite asset */
  image?: string
  date: string
  readTime: number
  featured?: boolean
  tags: string[]
  content: string
}

export const categories: { id: Category; label: string; description: string }[] = [
  { id: 'how-to', label: 'How-To', description: 'Account, settings, and practical how-to guides' },
  { id: 'weapons', label: 'Weapons', description: 'Current-season weapon tier lists and loadouts' },
  { id: 'season', label: 'Season', description: 'Battle Pass and season progression' },
  { id: 'map', label: 'Map', description: 'Shattered Coast POIs, drops, and rotations' },
]

export const posts: Post[] = [
  // ─── WEAPONS ───────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-best-weapons-tier-list-2026',
    title: 'Fortnite Chapter 7 Season 3 Weapons Tier List',
    excerpt:
      'Current Shattered Coast loot pool ranked for Runners season — Surgical Burst, Extending Focus Shotgun, Striker Pump, Stinger SMG, and more.',
    category: 'weapons',
    date: '2026-07-18',
    readTime: 12,
    featured: true,
    tags: ['weapons', 'tier list', 'meta', 'chapter 7 season 3', 'runners'],
    content: `
## How this tier list is ranked

Weapons are ranked for Chapter 7 Season 3 (Runners) on the Shattered Coast map. Criteria: fight impact, consistency, how often you find them, and how they pair with Seven Sliders / movement plays. Epic patches mid-season — treat this as a living guide, not a permanent meta bible.

Last reviewed: July 2026.

Pair this with the [loadout builder](/tools/loadout-builder) to sketch a full hotbar, the [weapon damage calculator](/tools/weapon-damage-calculator) for approximate TTK, and the [shotgun guide](/guides/weapons/fortnite-shotgun-guide-best-options) for close-range picks.

## S-Tier — prioritize these

### Extending Focus Shotgun
The season-defining shotgun. Hipfire covers close pressure; ADS tightens the spread for mid-range chip. Pair it with an SMG or Lancehead when someone peeks outside shotgun distance.

### Surgical Burst Rifle
Low recoil, weak falloff, strong at range. If you can land bursts, this is the cleanest mid/long fight winner in the current pool.

### Striker Pump Shotgun
High per-shot damage for box fights and hard peeks. Rewards first-shot accuracy. Still one of the best "one clean hit then build" options.

### Seven Sliders (utility)
Not a gun, but S-tier for fights. Slide reposition + ADS slow-mo creates free angles. Grab them whenever you can.

## A-Tier — strong defaults

- **Maven Auto Shotgun** — Forgiving spray shotgun when you miss the first pump pellet.
- **Stinger SMG** — Best close-range spray partner after a shotgun crack.
- **Lancehead Pistol** — High rarity sidearm with a large mag; the reload mag throw adds free chip.
- **Warforged Assault Rifle** — Reliable full-auto AR when you cannot find Surgical Burst.
- **Chaos Exploder Rifle** — Explosive pressure against boxed or stacked teams (watch for balance patches).

## B-Tier — situational

- **Rapid Fire SMG** — High fire rate, weaker per bullet; good cleanup, worse at range.
- **Ranger Pistol** — Fine early secondary, usually replaced later.
- **Bank Shot Pistol** — Niche ricochet pistol; fun in Creative, inconsistent in open BR when available.
- **Heavy Impact Sniper** — Strong third-party / rotate poke when it is in the pool. (Older “Hunting Rifle” naming shows up in community talk — use the in-game name.)

## C-Tier — early loot only

Common/uncommon versions of the pool still beat empty slots, but swap up ASAP. Do not hold a grey pistol over a rare Stinger or Maven.

## Suggested loadouts

**Aggressive:** Extending Focus or Striker Pump + Stinger SMG + Surgical Burst or Warforged AR + heals + Seven Sliders.

**Zone / placement:** Surgical Burst + shotgun of choice + mobility + dual heals. Skip ego peeks; win on positioning.

## Notes

Mythics from bosses (Mythic Burst, Mythic Extending Focus, Mythic Lancehead) sit above their base versions when available. Always prefer higher rarity of the same gun when the choice is equal.
`,
  },
  {
    slug: 'fortnite-shotgun-guide-best-options',
    title: 'Fortnite Shotgun Guide (Chapter 7 Season 3)',
    excerpt:
      'Which shotgun to run in Runners season: Extending Focus, Striker Pump, Maven Auto, and how to pair them with SMGs.',
    category: 'weapons',
    date: '2026-07-03',
    readTime: 7,
    featured: false,
    tags: ['shotgun', 'weapons', 'close range', 'chapter 7 season 3', 'loadout'],
    content: `
## Why shotguns still decide close fights

Most box fights and final-circle collisions still end on a shotgun trade. Chapter 7 Season 3 narrowed the shotgun pool, which makes the choice simpler: learn two guns well instead of five.

See the full pool ranking in the [weapons tier list](/guides/weapons/fortnite-best-weapons-tier-list-2026), or build a full hotbar in the [loadout builder](/tools/loadout-builder).

## Current shotgun options

### Extending Focus Shotgun
Season standout. Hipfire for close pressure; ADS for tighter mid-range pellets. Strong default for both Builds and Zero Build.

**Best for:** Players who want one shotgun that covers push and peek ranges.

### Striker Pump Shotgun
Classic high-damage pump. Lower fire rate, higher punish on a clean first shot. Build or slide after every shot.

**Best for:** Confident first-shot aimers and box fighters.

### Maven Auto Shotgun
Full-auto forgiveness. Lower per-shot spike than Striker, better when you are spraying a moving target.

**Best for:** Aggressive players who miss the first pellet often.

### Chaos Reloader Shotgun
Reload-while-stowed shotgun when it appears in the current pool or LTMs. Useful early if you find it; swap to Extending Focus / Striker when those are available. Always trust the in-game loot pool over older patch notes.

## Fundamentals that still win

- Crack with shotgun, finish with Stinger / Rapid Fire SMG.
- Place cover after every pump shot.
- Do not chase beyond shotgun range without an AR or Lancehead.

## Quick pick

- New / inconsistent aim: **Maven Auto**
- Default meta pick: **Extending Focus**
- High mechanical confidence: **Striker Pump**
`,
  },

  // ─── MAP ───────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-loot-guide-best-spots',
    title: 'Best Loot Spots on Shattered Coast (Chapter 7 Season 3)',
    excerpt:
      'Practical drop tiers for Shattered Coast — hot, balanced, and edge POIs — plus landing priority and when to leave.',
    category: 'map',
    date: '2026-07-15',
    readTime: 7,
    featured: true,
    tags: ['loot', 'map', 'drop locations', 'named locations', 'hot drops', 'chapter 7 season 3', 'shattered coast'],
    content: `
## How to choose a drop

Your landing spot decides the first two minutes. Pick for **contest level**, **loot density**, and a **rotation path** toward the first circle — not just the biggest POI name on the map.

Use the [interactive Fortnite map](/fortnite-map) before you queue if you want chest ratings and contest filters on Shattered Coast. For named POI notes, see the [Shattered Coast map guide](/guides/map/fortnite-map-all-locations-guide).

## Hot drops (fight reps)

Expect contested chests when the bus is near. Good for aim practice and early mats; bad if you need a clean ranked placement game.

| POI | Why land here | Leave when |
| --- | --- | --- |
| Heatwave Harbor | Dense chests, towers, vehicles | You win one vertical fight and have shields |
| The Battlewoods | Fast wood + center pressure | Zone pulls opposite of your loot path |
| Sinister Strip | Open fight lanes when bus-near | Third parties stack the strip |
| Lifty Lodge | Height + zipline exit | Roof fight is decided |
| Frosted Flats | Center staging near Zero Point | Circle 3 approaches without full heals |

## Balanced drops

Usually a few contests, enough loot for a full loadout, and a calmer leave than harbor/woods.

- **Wonkeeland** — Learn one building split and repeat it.
- **Latte Landing** — Strong ranked drop when you want fights without full hot-drop chaos.
- **Golden Grove** — Semi-contested pocket; two chests and go if it spikes.
- **Shaken Sanctuary** — Backup when Battlewoods / Frosted Flats are overloaded.
- **Chopped Shop** — Prioritize mobility/vehicles, then rotate with zone.

## Edge / placement drops

Lower density, longer rotates. Best when you are climbing ranked or practicing endgame.

- **Cluster Coast** — Grab mobility before a deep edge hold.
- **Sunken Shores** — South edge; strong when zone loves the coast.
- **Calamari Canyon** — Desert loot-and-leave; do not farm forever in the open.

## Landing priority (first 30 seconds)

1. **Any weapon** — survive the immediate contest.
2. **Shields** — smalls/bigs before greed mats.
3. **Ammo + heals** — you will burn both on rotate.
4. **Mobility** — cars, pads, or a clean path inland.
5. **Upgrade** — only if the bench is on your leave path.

## When to leave

Open the map before you land and mark a path, not just a POI. Start rotating with a buffer — greed one more chest in late circles is still one of the most common early deaths. Pair this with the [zone timer](/tools/zone-timer) if you want storm wait/shrink reference while you practice rotates.

## Keep it honest

POI power shifts with hotfixes. Treat in-game labels as truth, and use this page as a Shattered Coast drop framework — not a permanent ranking of every landmark Epic ever ships.
`,
  },
  {
    slug: 'fortnite-map-all-locations-guide',
    title: 'Fortnite Shattered Coast Map Guide: Every Named POI',
    excerpt:
      'Named locations on the Chapter 7 Season 3 Shattered Coast island — Lifty Lodge, Battlewoods, Wonkeeland, Heatwave Harbor, and more — with drop and rotation notes.',
    category: 'map',
    date: '2026-07-08',
    readTime: 12,
    featured: false,
    tags: ['map', 'locations', 'rotation', 'POI', 'shattered coast', 'chapter 7 season 3'],
    content: `
## Shattered Coast overview

Chapter 7 Season 3 replaced the mid-chapter island with **Shattered Coast** after the Shattered live event. The Zero Point sits near center, with snow, desert, and coastal biomes around it. Only **Wonkeeland** and **Latte Landing** carried over cleanly from Season 2 — everything else is new or heavily remixed.

Last reviewed: July 2026.

Explore live markers on the [interactive map](/fortnite-map), or jump to [best loot spots](/guides/map/fortnite-loot-guide-best-spots) for drop tiers.

## Named POIs (Chapter 7 Season 3)

### Lifty Lodge
Northwest snowy lodge with strong vertical fights and a large zipline near the main building. Good mats and height; contested when the bus crosses the north edge.

### Battlewoods
Central wooded POI rebuilt from Battlewood Boulevard energy. Excellent early wood. Expect mid-game traffic because it sits near the map core.

### Latte Landing
Returning Season 2 POI. Reliable named loot with slightly less chaos than center drops when the bus misses it.

### Wonkeeland
Returning quirky POI. Still a strong landmark drop with recognizable loot routes — learn one building path and stick to it.

### Frosted Flats
Close to the Zero Point with Ice King leftovers (including a FrosDeez storefront vibe). High rotation value, high third-party risk.

### Sinister Strip
Dark Voyager remake of Sandy Strip — propaganda props and open fight lanes. Hot when the bus runs the strip; otherwise a strong mid-tier loot stop.

### Golden Grove
Named coastal/grove POI on the new island. Treat it as a semi-contested loot pocket — land for chests, leave with a plan before circle 3.

### Shaken Sanctuary
Former New Sanctuary area after the Foundation story beat. Less vault power than last season; still usable for quiet loot if contested POIs are stacked.

### Cluster Coast
Southeast Cluster-themed POI tied to the Runners pass aesthetic. Edge drop potential with longer rotates inland.

### Sunken Shores
Southern remake of Squibbly Shores. Edge loot + long rotates when zone loves north/center.

### Heatwave Harbor
Industrial harbor with high-rises and port structures. Good verticality and mid-game staging if you win the early fight.

### Calamari Canyon
Desert biome west of the Zero Point. Lower density feel than harbor/woods — useful for placement games.

### Chopped Shop
Vehicle-mod themed landmark. Prioritize it when you want cars/mobility early, then rotate with the zone.

## Drop tiers (practical)

**Hot / fight reps:** Battlewoods, Sinister Strip, Lifty Lodge (when bus-near), Heatwave Harbor.

**Balanced:** Wonkeeland, Latte Landing, Golden Grove, Frosted Flats.

**Edge / placement:** Cluster Coast, Sunken Shores, Calamari Canyon, quiet Chopped Shop rotates.

## Rotation basics that still matter

- Open the map before you land and mark a path, not just a POI name.
- Storm DPS ramps hard late — do not greed one more chest in circle 5+.
- Carry mobility (Seven Sliders, vehicles, launch pads) because Shattered Coast spreads loot across longer gaps.
- Arrive early to high ground near Zero Point / Frosted Flats when endgame pulls center.

## Keep this page honest

POI names and power spots shift with hotfixes and mid-season map updates. If Epic adds or renames a landmark, we will refresh this list — until then, use in-game map labels as the source of truth.
`,
  },

  // ─── SEASON ────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-season-battle-pass-guide',
    title: 'Fortnite Runners Battle Pass Guide (Chapter 7 Season 3)',
    excerpt:
      'Runners Battle Pass cost, skin unlock levels, and a practical XP plan to finish before the season ends.',
    category: 'season',
    date: '2026-07-10',
    readTime: 10,
    featured: false,
    tags: ['battle pass', 'season', 'XP', 'level up', 'runners', 'chapter 7 season 3'],
    content: `
## Runners Battle Pass overview

Chapter 7 Season 3 (**Runners**) ends around **August 19, 2026**. The paid pass is typically **800 V-Bucks** (also included with Fortnite Crew). Cosmetics are seasonal — unclaimed rewards disappear when the season ends.

This page covers skin unlock gates and a realistic XP plan. For a live grind projection, use the [Battle Pass XP calculator](/tools/battle-pass-xp-calculator). Cosmetics in the pass also show up in the [Item Shop viewer](/tools/item-shop) once they rotate or when you want set context.

## Outfit unlock levels

Runners returned **level-gated** skins (you cannot freely start every page at level 1 like some earlier Chapter 7 passes). Approximate gates:

| Outfit | Unlock window |
| --- | --- |
| The Guardian | On Battle Pass purchase |
| The Voidblade / Cluster | Level 10 or 20 (pick one first; the other follows) |
| Heatwave PJ / Wolfe | Level 35 or 45 |
| Dylan / Vanguard Slone | Level 60 or 70 |
| John Wick (Pen & Ink) | Level 85 |

Bonus styles and Super Styles sit on later pages after you clear core rewards. Launch-week exclusives (for example Gold Huntress Dylan) were time-limited at the start of the season — if you missed the window, those styles are gone.

## Free track vs paid pass

Everyone gets the free track. The paid pass unlocks the full outfit pages, most V-Bucks nodes, and the headline cosmetics. Exact V-Bucks totals can shift with mid-season pages — check the in-game pass for the live number.

## XP that actually moves the needle

- **Weekly quests** — highest reliable XP; clear them when they refresh.
- **Daily quests** — steady filler; swap hard ones instead of forcing modes you hate.
- **Match XP** — placement and survival still matter, especially in ranked.
- **Alt modes** — LEGO / Festival / Racing can help, but many sources are **capped**. Confirm current caps in-game before planning around them.

## Practical level-100 plan

1. Buy the pass early if you want the season cosmetics.
2. Finish weekly quests every reset before grinding Creative for “fun XP.”
3. Track weeks remaining in the [XP calculator](/tools/battle-pass-xp-calculator) instead of guessing.
4. Save long sessions for official **XP multiplier** events when Epic runs them.
5. After level 100, clear bonus pages before the season clock hits zero.

## Should you buy it?

If you play a few times a week through August, the pass is usually worth it for the exclusive outfits. If you only hop on once or twice a month, the free track is enough — do not buy tiers hoping to “catch up” in the last week unless you specifically want John Wick / Slone cosmetics.
`,
  },

  // ─── GUIDES ────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-ranked-mode-guide',
    title: 'Fortnite Ranked Mode Guide: How to Climb and Reach Champion',
    excerpt:
      'How Fortnite Ranked LP works, and climb strategies from Bronze through Champion.',
    category: 'how-to',
    date: '2026-06-28',
    readTime: 11,
    featured: true,
    tags: ['ranked', 'competitive', 'climbing', 'champion', 'LP', 'placement'],
    content: `
## How Fortnite Ranked Mode Works

Fortnite Ranked is a separate playlist from casual Battle Royale. Your rank is displayed as a tier (Bronze, Silver, Gold, Platinum, Diamond, Elite, Champion, Unreal) and a division within each tier (I, II, III). Moving up requires earning League Points (LP).

## How LP Is Earned

LP is awarded based on two factors: **placement** and **eliminations**.

- Placement is the bigger driver. Surviving long earns more LP than dying early with a few kills.
- Eliminations add bonus LP on top of placement. An early elimination is worth less LP than a late-game elimination.
- Negative LP (loss deduction) happens when you place poorly. Early deaths with no eliminations cost the most LP.

### The Implication

Ranked Fortnite rewards survival more than aggression. This is different from casual play. A player who finishes top 10 every match without many eliminations will climb faster than a player who averages 5 kills but dies in position 30.

## Rank Tier Breakdown

| Tier | Description |
|------|-------------|
| Bronze | Starting rank. Basic positioning and looting skills needed. |
| Silver | You understand zone management and basic building. |
| Gold | Consistent top-25 placements, active gunfight management. |
| Platinum | Solid mechanics. Zone reads and build/edit starting to matter. |
| Diamond | Strong all-round game. Edits, fights, and rotations all matter. |
| Elite | High-skill players. Most streamers and competitive players sit here. |
| Champion | Top band of the player base. Full competitive-level mechanics. |
| Unreal | Highest rank band. Extremely tough lobbies; thresholds change by season/region. |

## Strategies for Each Stage of Climbing

### Bronze to Gold — Focus on Survival First
Do not rush fights. Land at a safe location, loot fully, and rotate to zone early. Avoid third-party fights and fights you are not confident in winning. Your priority is top-25 placements, not eliminations.

### Gold to Diamond — Add Controlled Aggression
At this level you need to balance placement with eliminations. Start taking fights on weakened opponents (third-party situations), push players who are storm-panicking during rotation, and use high-ground positioning to get free shots in the zone.

### Diamond to Elite — Mechanic Consistency
Mistakes in build fights, edit errors, and missed shots become costly here. Practice build/edit mechanics daily. Learn to recognize when a fight is disadvantageous and disengage rather than commit. Read the zone two circles ahead, not one.

### Elite to Champion — Everything Matters
At Elite and above, the competition knows rotation, positioning, and fighting mechanics. The difference is execution under pressure. Eliminate tilt (playing on emotion after a bad game), keep sessions to 2–3 hours before taking a break, and review close losses to find patterns.

## Common Ranked Mistakes to Avoid

- **Dropping hot in Ranked** — Hot drops are fine in casual. In Ranked, early deaths cost significant LP. Prefer balanced or edge POIs from the [loot guide](/guides/map/fortnite-loot-guide-best-spots) or [interactive map](/fortnite-map).
- **Ignoring placement for kills** — Kills feel satisfying, but a top-5 finish with one elimination earns more LP than a top-20 finish with five.
- **Playing while tilted** — Log off after two or three losing matches in a row. Tilted sessions are where ranks are lost.
- **Using a casual loadout in Ranked** — Always prioritize heals and mobility in Ranked. You need them for safe rotations and endgame survival. Use the [zone timer](/tools/zone-timer) while you practice rotate timing.
`,
  },

  // ─── HOW-TO GUIDES (account / currency / performance) ─────────────────────
  {
    slug: 'how-to-get-free-v-bucks-fortnite',
    title: 'How to Get Free V-Bucks in Fortnite (Legitimate Methods Only)',
    excerpt:
      'Every real way to earn free V-Bucks in 2026 — free Battle Pass track, Save the World Founders, Microsoft Rewards, and the scams you must avoid.',
    category: 'season',
    date: '2026-07-23',
    readTime: 11,
    featured: true,
    tags: [
      'free v bucks',
      'how to get free v bucks',
      'fortnite v-bucks',
      'save the world founders',
      'battle pass',
      'v bucks scam',
    ],
    content: `
## Short answer: free V-Bucks exist — generators do not

There is **no website, Discord bot, or “V-Bucks generator”** that can add currency to your Epic account. Those pages steal logins, push malware, or phish payment details. Epic’s own [account security guidance](https://safety.epicgames.com/en-US/policies/account-security) warns players not to trust offers that ask for your Epic password on third-party sites.

What *does* work is slower and official: seasonal Battle Pass V-Bucks nodes, Save the World **Founder** quests (if you already own Founders), occasional Epic promotions, and platform reward programs that pay out in store credit you can spend on V-Bucks packs.

Last reviewed: July 2026. Pack prices and pass totals change — use the [V-Bucks calculator](/tools/vbucks-calculator) when you are budgeting a shop wishlist, and the [Battle Pass XP calculator](/tools/battle-pass-xp-calculator) if you are grinding levels for pass rewards.

## Method 1 — Free Battle Pass track (everyone)

Every season includes a **free reward track**. As you earn XP and level up, you unlock cosmetics and a small pile of V-Bucks without buying the premium pass.

| Path | Who can use it | What you get |
| --- | --- | --- |
| Free Battle Pass track | All BR players | Limited V-Bucks nodes + free cosmetics |
| Premium Battle Pass | Players who buy the pass (often ~800 V-Bucks in recent seasons, or included with Crew) | More V-Bucks nodes + full cosmetic pages |
| Fortnite Crew | Subscribers | Pass + Crew Pack + monthly V-Bucks allowance (not “free,” but strong value) |

**Practical tip:** The free track alone will not fund a Legendary skin every week. Treat it as a drip of currency toward one intentional purchase, not unlimited shopping. Exact V-Bucks totals shift between seasons — open the in-game Battle Pass and count the V-Bucks icons on the free page.

If you already bought the premium pass once, finishing it often returns **more V-Bucks than the pass cost**, which can self-fund the next season if you complete the track. That is still not “free forever,” but it is the most common legitimate loop players use.

See the [Runners Battle Pass guide](/guides/season/fortnite-season-battle-pass-guide) for Chapter 7 Season 3 unlock context.

## Method 2 — Save the World Founders (legacy earners only)

Save the World can still pay **daily V-Bucks** — but only if your account is a **Founder** (you purchased Save the World / Founders access before Epic locked that earn path for new buyers).

Important 2026 reality check:

- Save the World going free-to-play does **not** unlock V-Bucks farming for brand-new accounts.
- New STW players typically earn **X-Ray Tickets** for llamas, not transferable Battle Royale V-Bucks.
- Founders can still complete Daily Quests, Mission Alerts, and related Founder rewards for V-Bucks that spend in BR / Item Shop.

If you never owned Founders, you cannot buy your way into “Founder V-Bucks” through normal storefronts anymore. Third-party “Founders account” listings are a common scam vector — avoid them.

## Method 3 — Microsoft Rewards / platform credit (indirect)

Microsoft Rewards (Xbox / Bing / Game Pass ecosystem) lets some players redeem points for **Xbox / Microsoft Store gift credit**, which can then buy Fortnite V-Bucks packs on Xbox or PC (Microsoft Store version). This is not an in-game cheat — it is a real rewards program with daily caps and region rules.

Other platforms sometimes run similar store credit promotions. Always redeem through the official store (Microsoft, PlayStation, Nintendo, Epic), never through a random “V-Bucks code” seller on social media.

## Method 4 — Occasional Epic promotions and refunds (not farming)

Epic occasionally gives small V-Bucks amounts via login events, compensation, or Creator Code partnerships. These are unpredictable. Do not plan a skin budget around them.

If you bought the wrong Item Shop cosmetic, you may recover V-Bucks through Cancel Purchase or Return Tickets — that is a refund, not a farm. Full steps: [How to refund Fortnite skins](/guides/how-to/how-to-refund-fortnite-skins).

## What never works (and will get you banned or hacked)

- V-Bucks generators, “inspect element” tricks, and YouTube “working 2026” tutorials that ask you to download a file
- Discord DMs offering free skins if you “verify” on a fake Epic login page
- Sharing your account so someone can “gift you” V-Bucks
- Buying discounted V-Bucks from unofficial key sites

If an offer sounds faster than playing the game, assume it is theft.

## How to spend free V-Bucks wisely

1. Decide the skin or pass you actually want before the shop rotates.
2. Check typical outfit prices with the [V-Bucks calculator](/tools/vbucks-calculator) (Uncommon ~800, Rare ~1,200, Epic ~1,500, Legendary / Icon often ~2,000).
3. Track today’s rotation on the [Item Shop tracker](/tools/item-shop).
4. Enable [two-factor authentication](/guides/how-to/how-to-enable-2fa-fortnite) before you store currency — compromised accounts lose V-Bucks permanently more often than “generators” ever add them.

## FAQ

### Can I get unlimited free V-Bucks without Founders?

No. Without Founders STW earnings, you are limited to free pass nodes, rare promotions, and outside reward programs. Anyone promising unlimited free V-Bucks is lying.

### Do Creative XP maps give V-Bucks?

No. Creative maps give **XP** toward Battle Pass levels. Levels can unlock V-Bucks nodes that already exist on the pass — the map itself does not print currency. Browse [Creative map codes](/codes) if you need XP farms, then cash those levels into pass rewards.

### Is Fortnite Crew “free V-Bucks”?

No — it is a paid subscription that includes monthly V-Bucks and the Battle Pass. It can be cheaper than buying packs à la carte, but it still costs real money.
`,
  },
  {
    slug: 'how-to-change-fortnite-name',
    title: 'How to Change Your Fortnite Name (Epic Display Name Guide)',
    excerpt:
      'Change your Fortnite / Epic display name for free every 14 days, plus what console players must know about PSN, Xbox, and Switch names.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 9,
    featured: false,
    tags: [
      'how to change fortnite name',
      'change epic display name',
      'fortnite username',
      'psn fortnite name',
      'xbox gamertag fortnite',
    ],
    content: `
## What “Fortnite name” actually means

Fortnite does not have a separate username you edit inside the lobby menu. Your BR name comes from your **Epic Games display name**, and on some consoles it can also be influenced by your **platform ID** (PlayStation Network Online ID, Xbox Gamertag, or Nintendo nickname) depending on how friends see you and how accounts are linked.

This guide covers the Epic display name change that applies across Epic titles, then the console caveats that confuse most players.

Last reviewed: July 2026. Pair this with [2FA setup](/guides/how-to/how-to-enable-2fa-fortnite) so a name change session cannot become an account takeover.

## Rules for Epic display names

| Rule | Detail |
| --- | --- |
| Cost | Free |
| Cooldown | About **every 14 days** (two weeks) after a successful change |
| Length | Typically **3–16 characters** (Epic enforces current limits in the form) |
| Where to edit | Epic Games website / account settings — **not** inside Fortnite’s settings menu |
| Scope | Applies across Epic Games products that use your display name |
| Restrictions | Must follow Epic naming / community rules (no impersonation, hate, or banned terms) |

If the edit control is greyed out, you are still inside the cooldown from your last change. Waiting it out is the only fix.

## Step-by-step: change your Epic display name

1. Open a browser and go to [Epic Games Account](https://www.epicgames.com/account) (or sign in through the Epic Games Launcher account pages).
2. Sign in with the same Epic account you use for Fortnite. Console players who “just press A on Xbox” still have an Epic account behind the scenes — use the linked login method if email/password fails.
3. Open **Account** / **Account info** settings.
4. Find **Display Name** and choose **Edit**.
5. Enter a new name that follows the character limit and Epic’s rules.
6. Confirm. You should see a success message and the two-week cooldown clock starts from confirmation.
7. Fully restart Fortnite (close the game, not just return to lobby). Most players see the new name within a few minutes; friends lists can lag briefly.

You cannot finish this flow if your email is unverified — verify the account email first under account security.

## PC, mobile, and Switch players

On PC, Android/iOS (where available), and often Nintendo Switch sessions that show the Epic name, the Epic display name change is enough. One edit updates how you appear in Epic-connected lobbies.

## PlayStation players

Sony Online IDs are separate from Epic display names.

- Your **first** PSN Online ID change is typically free; later changes are paid through PlayStation (prices vary by region / PS Plus).
- Friends who know you primarily through PSN may still see platform-related naming depending on privacy and link settings.
- Changing only the Epic display name may not “feel” like it worked if you expected the PSN ID on every UI surface.

If your goal is the big letters on your PlayStation profile, change the PSN Online ID in PlayStation account settings, then confirm Fortnite still shows the Epic name you want in cross-play lobbies.

## Xbox players

Xbox Gamertags are also separate.

- Microsoft usually includes **one free Gamertag change**, then charges for later changes (check current Xbox account pricing in your region).
- Fortnite still has an Epic display name underneath. Change both only if you care about both ecosystems looking consistent.

## Common problems and fixes

### “I changed it but Fortnite still shows the old name”

Force-quit the game and relaunch. Sign out/in on Epic if needed. Ask a friend to refresh their friends list. Do not spam additional changes — you will burn the cooldown.

### “Edit is locked”

You changed the name fewer than ~14 days ago. Check the cooldown message on the Epic account page.

### “Name taken” / rejected

Someone else has that exact display name, or it violates Epic rules (impersonation, banned words, special character limits). Try a variation instead of third-party “name sniper” services — those are scams.

### “Wrong account”

Console players often create a second Epic account by accident when linking. Confirm the email on [epicgames.com/account](https://www.epicgames.com/account) matches the Fortnite locker you care about (skins do not move when you rename — they stay on the account ID).

## What renaming does not do

- It does **not** reset stats, Ranked progress, or V-Bucks
- It does **not** wipe your locker
- It does **not** create a “fresh account” for matchmaking
- It does **not** bypass bans or hardware bans

If you want a clean competitive identity, rename carefully once, enable [2FA](/guides/how-to/how-to-enable-2fa-fortnite), and keep the same account. Creating new accounts to dodge penalties violates Epic rules.

## After you rename

Update creator codes, Discord nicknames, tracker profiles, and clan tags so teammates can find you. Look up your new name on the [player stats tool](/tools/player-stats) to confirm trackers resolve the right account.
`,
  },
  {
    slug: 'how-to-refund-fortnite-skins',
    title: 'How to Refund Fortnite Skins and Item Shop Purchases',
    excerpt:
      'Official Epic refund rules: Cancel Purchase within 24 hours, Return Tickets within 30 days, what cannot be refunded, and how to get V-Bucks back.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 10,
    featured: false,
    tags: [
      'how to refund fortnite skins',
      'fortnite return ticket',
      'cancel purchase fortnite',
      'refund v-bucks',
      'item shop refund',
    ],
    content: `
## Two official tools: Cancel Purchase and Return Tickets

Epic lets you reverse many **V-Bucks Item Shop cosmetic purchases** without emailing support — if you act inside the windows and the item is eligible.

This guide follows Epic’s Fortnite Battle Royale billing help on canceling or refunding Item Shop purchases made with V-Bucks. Policies can be updated; if the in-game UI disagrees with this page, trust the game and Epic Help.

Last reviewed: July 2026. Related reading: [free V-Bucks methods](/guides/season/how-to-get-free-v-bucks-fortnite) and the [Item Shop tracker](/tools/item-shop).

## Quick comparison

| Tool | Time window | Extra limit | Best for |
| --- | --- | --- | --- |
| **Cancel Purchase** | Within **24 hours** of buying | Item must be **unused / unequipped** in every mode | Accidental same-day buy |
| **Return Ticket** | Item bought within last **30 days** | Tickets are limited (see below) | Mistakes you notice after 24 hours |
| **Real-money refund request** | Separate Epic refund flow | For cash purchases of V-Bucks / packs, not every cosmetic | Bought the wrong V-Bucks pack with money |

Purchases made inside **developer-made Creative islands** cannot use Cancel Purchase or Return Tickets.

## What you generally cannot refund with Cancel Purchase / Return Tickets

Epic’s help article lists categories that are not returnable through these tools, including:

- Battle Passes / Festival and other passes
- Pass levels and premium reward tracks
- Cosmetic **bundles** (Return Tickets may require returning the whole eligible bundle together when bundles are allowed — follow the in-game prompt)
- **Gifted** purchases
- Level Up Quest Packs
- Save the World loot llamas / certain STW shop items
- Developer island purchases

If your regret is a Battle Pass, Epic’s cosmetic refund tools will not reverse it. Spend V-Bucks carefully using the [V-Bucks calculator](/tools/vbucks-calculator) before you confirm.

## How to Cancel Purchase (24-hour undo)

Use this when you bought the wrong skin a few minutes ago and never equipped it.

1. Launch Fortnite and open your **Locker** / purchase history entry for the item (path labels can read **Cancel Purchase** on the item details).
2. Select the item you just bought.
3. Choose **Cancel Purchase** if the button is available.
4. Confirm. The cosmetic is removed and V-Bucks return to your balance.

### Cancel Purchase fails when

- More than 24 hours passed
- You equipped or used the item in any mode (including Creative / Festival / LEGO where applicable)
- The item type is on the non-refundable list
- You already canceled that purchase once (Epic notes each item can only be canceled one time; rebuying may show a reminder)

## How to use a Return Ticket (30-day window)

If Cancel Purchase is gone, check for a **Return Ticket**.

Epic’s published ticket rules (verify on your account — Epic has adjusted grants over the years):

- Accounts are provisioned with Return Tickets (commonly described as starting with **3**)
- You typically receive **1 new ticket every 365 days**
- You can hold a limited maximum at once (commonly **3**)

### Steps

1. Open the item in your locker / refund UI.
2. Choose the Return Ticket option when offered.
3. Confirm. V-Bucks return and the item leaves your account.
4. For eligible bundles, return the full set together when the UI requires it.

Return Tickets are precious. Do not burn one on a 200 V-Bucks spray if you might misclick a 2,000 V-Bucks outfit later.

## Real-money purchases (V-Bucks packs, Crew, etc.)

If you spent **real currency** on V-Bucks packs or subscriptions and need a cash refund, use Epic’s **Refund Request** flow on the Epic Games website — not the in-game Return Ticket button. Platform storefronts (PlayStation, Xbox, Nintendo) may also require refunds through Sony / Microsoft / Nintendo instead of Epic, depending on where you paid.

## Gifted skins

Gifts are typically **non-refundable** through Cancel Purchase / Return Tickets. If you were scammed via a gift trade, that is an account-security issue — enable [2FA](/guides/how-to/how-to-enable-2fa-fortnite) and contact Epic Support with order details. Do not use account sharers to “force refund.”

## Smart habits so you refund less often

- Preview styles in the shop before buying
- Check set pieces on the [Item Shop tracker](/tools/item-shop)
- Avoid buying while stream overlays or friends spam “buy it” pressure
- Keep at least one Return Ticket banked
- Never equip a questionable purchase until you are sure — equipping can kill Cancel Purchase eligibility

## FAQ

### Do refunded V-Bucks come back instantly?

Usually yes, on-screen after confirmation. Restart the client if the balance UI lags.

### Can I refund a skin from last season?

Only if it is still inside the Return Ticket **30-day** purchase window and eligible. Older locker items outside that window stay on the account.

### Does refunding affect my account standing?

Using the official Cancel Purchase / Return Ticket tools as designed is normal. Chargebacks on real-money purchases can lock purchasing and risk account action — use Epic’s official refund request instead of disputing with your bank as a first step.
`,
  },
  {
    slug: 'how-to-enable-2fa-fortnite',
    title: 'How to Enable 2FA on Fortnite (Epic Two-Factor Authentication)',
    excerpt:
      'Turn on Epic Games two-factor authentication with an authenticator app, SMS, or email — protect your locker and claim the Boogie Down thank-you reward.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 8,
    featured: false,
    tags: [
      'how to enable 2fa fortnite',
      'fortnite two factor authentication',
      'epic games 2fa',
      'boogie down emote',
      'fortnite account security',
    ],
    content: `
## Why 2FA matters more than another skin

Fortnite lockers are phishing targets. Password reuse and fake “free V-Bucks” login pages empty accounts daily. **Two-factor authentication (2FA)** adds a one-time code after your password so a stolen password alone is not enough.

Epic documents 2FA under account security: codes can arrive by **authenticator app**, **SMS**, or **email**. Enabling 2FA also unlocks the **Boogie Down** emote in Fortnite as a thank-you reward, and 2FA is required for products like Fortnite competitive / tournament participation, Support-A-Creator tooling, and other Epic developer surfaces.

Last reviewed: July 2026. Official overview: [Epic account security](https://safety.epicgames.com/en-US/policies/account-security).

## Before you start

- Use a device you control (not a school / hotel shared PC)
- Have access to your Epic account email
- Prefer an **authenticator app** (Google Authenticator, Microsoft Authenticator, Authy, etc.) over SMS when possible — SIM-swap attacks target phone numbers
- Write down backup / recovery codes if Epic shows them and store them offline

## Step-by-step: enable Epic 2FA

1. Go to [Epic Games Account password & security](https://www.epicgames.com/account/password) while signed in.
2. Find **Two-Factor Authentication**.
3. Choose a method:
   - **Authenticator app** (recommended)
   - **SMS**
   - **Email**
4. Follow the prompts to scan a QR code or enter a phone/email challenge code.
5. Confirm with the 6-digit code your method generates.
6. Save any backup codes Epic displays.
7. Launch Fortnite and check your locker for **Boogie Down** after the reward grants (it can take a short sync delay).

If authenticator setup fails, try another browser, disable aggressive ad blockers on epicgames.com, and ensure the device clock is set to automatic time (TOTP codes drift if the clock is wrong).

## Which 2FA method should you pick?

| Method | Pros | Cons |
| --- | --- | --- |
| Authenticator app | Strong, works offline once seeded | Lose the phone without backups = recovery pain |
| SMS | Easy | Weaker against SIM swap; needs signal |
| Email | Easy if you already guard the inbox | Anyone with mailbox access gets in |

Best practice for serious accounts: authenticator app + secured email + unique password (password manager).

## After 2FA is on

- Never approve a login you did not start
- Epic staff will not DM you asking for the 6-digit code
- Stop using the same password on other sites — [change compromised passwords](https://www.epicgames.com/account/password) immediately
- Review connected consoles / apps under account connections
- Be careful with [display name changes](/guides/how-to/how-to-change-fortnite-name) on shared networks — finish security first

## Competitive and Creator requirements

If you want to play in official tournaments or use certain Creator tools, Epic requires 2FA. Enable it days before an event — do not discover a locked setting five minutes before cup registration.

## Recovering when you lose 2FA access

If you wipe a phone without moving the authenticator:

1. Try backup codes if you saved them.
2. Use Epic’s account recovery / disabled 2FA support flow from a trusted device and email you still control.
3. Do not pay third-party “recovery services.”

Prevention beats recovery: keep backup codes in a password manager secure note or paper in a safe place.

## 2FA myths

### “2FA slows queue times”

No. It only challenges logins and sensitive account actions.

### “SMS is fine forever”

SMS is better than nothing, but authenticator apps are safer for high-value lockers.

### “I already have console 2FA so Epic is covered”

PlayStation / Xbox / Nintendo 2FA protects those storefronts. Your **Epic** password still needs Epic 2FA for launcher, PC, and cross-progress account theft scenarios.

## Related security habits

Avoid free V-Bucks phishing covered in [how to get free V-Bucks](/guides/season/how-to-get-free-v-bucks-fortnite). Keep purchase tools honest with official [refund rules](/guides/how-to/how-to-refund-fortnite-skins). If an account was already drained, enable 2FA on whatever access you regain, change the password, and contact Epic Support with purchase IDs — do not buy “recovery software.”
`,
  },
  {
    slug: 'how-to-get-better-fps-fortnite',
    title: 'How to Get Better FPS in Fortnite (Settings + PC Checklist)',
    excerpt:
      'Raise Fortnite FPS with Performance Mode, shadow settings, NVIDIA Reflex, resolution choices, and a practical hardware checklist for Chapter 7.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 12,
    featured: true,
    tags: [
      'how to get better fps fortnite',
      'fortnite performance mode',
      'fortnite low latency',
      'fortnite settings fps',
      'fortnite stuttering fix',
    ],
    content: `
## What “better FPS” actually means in Fortnite

Higher frames per second only help if they are **stable**. A PC that oscillates between 240 and 90 FPS in endgame feels worse than a locked 144. This guide prioritizes:

1. Rendering mode and the settings that cost the most GPU time
2. System latency (input feel)
3. OS / GPU driver hygiene
4. When hardware — not settings — is the bottleneck

For clickable presets, use the interactive [FPS & settings tool](/tools/fps-settings). This article explains *why* those presets work so you can adapt them to your monitor and hardware.

Last reviewed: July 2026 (Chapter 7 Season 3 / Runners). Patches can change GPU cost — re-test after major updates.

## Step 1 — Turn on Performance Mode

In Fortnite **Settings → Video / Graphics**:

- Set **Rendering Mode** to **Performance** (not DirectX 12) unless you specifically need DX12 features
- Apply and **restart** Fortnite when prompted

Performance Mode trades some visual fidelity for a large frame-time improvement on most GPUs, especially mid-range and older cards. Competitive players almost universally prefer it.

DirectX 12 can look nicer and sometimes scale well on high-end GPUs, but if your goal is raw FPS and clarity for aiming, start with Performance Mode.

## Step 2 — High-impact video settings

These are the biggest “free FPS” toggles for most PCs:

| Setting | Competitive recommendation | Why it matters |
| --- | --- | --- |
| Window Mode | Fullscreen | Lowest display latency vs borderless |
| Resolution | Native of your monitor (often 1920×1080 for competitive) | Higher res costs GPU heavily |
| 3D Resolution | 100% | Lowering it blurs enemies — bad trade |
| Shadows | Off | Frequently the largest single FPS gain |
| View Distance | Medium or Far | Too low hides info; Epic is expensive |
| Effects | Low | Less explosion / storm visual noise |
| Post Processing | Low | Clarity + GPU savings |
| Anti-Aliasing | Off or FXAA | TAA softens the image |
| Textures | Low–Medium | Mostly VRAM; raise if you have headroom |
| Motion Blur | Off | Always — hurts tracking |
| VSync | Off | Adds input lag |
| Frame Rate Limit | Unlimited or match a high competitive cap | Uncapped can reduce latency; watch GPU heat |
| NVIDIA Reflex | On + Boost (supported NVIDIA GPUs) | Cuts system latency |
| Show FPS | On while tuning | You cannot optimize blind |

Full preset tables live in the [FPS settings tool](/tools/fps-settings) (Competitive / Balanced / Quality).

## Step 3 — Audio settings that help fights (not FPS, but clarity)

FPS guides ignore audio, then players “feel” worse because they cannot hear footsteps.

- **3D Headphones**: On
- **Sound Quality**: Low or Medium often makes footsteps clearer than “High” with heavy reverb
- Mute music / lobby tracks if they distract

## Step 4 — Windows and GPU checklist

Settings inside Fortnite cannot fix a thermal throttle.

1. Update GPU drivers from NVIDIA / AMD / Intel — clean install if you stutter after a game patch.
2. Use a wired Ethernet connection when possible; unstable Wi-Fi causes hitching that looks like FPS loss.
3. Close Chrome / Discord hardware acceleration / overlays if you are GPU-bound. Test NVIDIA Overlay / Xbox Game Bar on vs off.
4. Set Fortnite to **High** process priority only while testing (Task Manager) — not a miracle, but useful for diagnosis.
5. Ensure the monitor cable is DisplayPort / HDMI capable of your refresh rate; confirm Windows Advanced Display shows 144 / 240 / 360 Hz.
6. Cap background recording (GeForce Experience Instant Replay) if the encoder steals frames.
7. Keep GPU and CPU temperatures reasonable under load — dust and bad air flow cause late-game drops more often than “bad settings.”

## Step 5 — Match settings to your hardware class

### Low-end / laptop integrated graphics

- Performance Mode
- 1080p or lower if necessary (try 1600×900 before tanking 3D resolution)
- Shadows Off, Effects Low, View Distance Medium
- Cap FPS near your average to reduce heat throttling (for example 60–90)

### Mid-range (popular competitive laptops / budget desktops)

- Performance Mode + 1080p
- Shadows Off, Reflex On + Boost
- Aim for a stable number at or above your monitor refresh

### High-end

- Still consider Performance Mode for clarity
- You can raise textures / view distance if FPS headroom remains in stacked endgames
- Prioritize **1% lows** in creative zone wars / real matches over lobby FPS bragging rights

## Creative practice maps vs BR FPS

Lobby and Creative FPS are not the same as late-game Chapter 7 endgame with builds, SMGs, and storm effects. Test changes in a real Ranked or pub endgame, or a stacked Creative fight map from the [codes database](/codes).

## Input feel beyond FPS

- Raise polling rate on mouse (500–1000 Hz) if the CPU can handle it
- Turn off mouse acceleration in Windows
- Use fullscreen exclusive
- Keep a sensible sensitivity — jerky high sens feels like “lag.” Convert settings with the [sensitivity calculator](/tools/sensitivity-calculator)

## Troubleshooting stutter (not low average FPS)

| Symptom | Likely cause | Try this |
| --- | --- | --- |
| Hitch every few seconds | Overlay, disk, shader compile | Disable overlays; allow shaders to compile on a quiet boot |
| Fine in Creative, bad in BR | CPU bottleneck in simulation | Lower effects / view distance; close background apps |
| FPS drops when looking at storms / water | Effects / shadows cost | Effects Low, Shadows Off |
| High FPS but input delay | VSync, borderless, Reflex off | Fullscreen, VSync Off, Reflex On + Boost |

## FAQ

### Does lowering everything to Low always help?

No. Dropping **3D Resolution** below 100% hurts target clarity more than it helps most players. Shadows and Effects are better first cuts.

### Should I use DLSS / FSR in Fortnite?

If your build offers upscaling options in the current patch, test carefully — competitive players usually prefer native clarity in Performance Mode over soft upscaling. If an upscaler lets you hold a higher refresh rate *and* you still see enemies cleanly, keep it; otherwise skip it.

### Is 240 FPS worth it on a 144 Hz monitor?

Frame times can still feel smoother and reduce latency even above refresh, but GPU heat rises. Many players cap slightly above refresh (for example 162 on 144 Hz) as a compromise.

## Next steps

1. Apply the Competitive preset in the [FPS settings tool](/tools/fps-settings)
2. Restart Fortnite after Rendering Mode changes
3. Verify refresh rate in Windows
4. Play two real matches before changing five more settings at once — isolate variables
`,
  },
]


export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured)
}

export function getCategoryLabel(category: Category): string {
  return categories.find((c) => c.id === category)?.label ?? category
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
