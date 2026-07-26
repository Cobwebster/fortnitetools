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
      'Current Runners meta on Shattered Coast — Striker Pump, Flex SMG, Surgical Burst Rifle ranked, plus what to skip (Lancehead) after mid-season balance.',
    category: 'weapons',
    date: '2026-07-25',
    readTime: 12,
    featured: true,
    tags: ['weapons', 'tier list', 'meta', 'chapter 7 season 3', 'runners', 'striker pump', 'flex smg'],
    content: `
## How this tier list is ranked

Weapons are ranked for Chapter 7 Season 3 (Runners) on the Shattered Coast map. Criteria: fight impact, consistency, how often you find them, and how they pair with mobility (Seven Sliders / Overdrive-style rotates). Epic has already hotfixed this season — treat this as a living guide.

Last reviewed: July 25, 2026.

Pair this with the [loadout builder](/tools/loadout-builder), the [weapon damage calculator](/tools/weapon-damage-calculator), and the [shotgun guide](/guides/weapons/fortnite-shotgun-guide-best-options).

![Striker Pump](/images/loadout/striker_pump.png)
![Flex SMG](/images/loadout/flex_smg.png)
![Surgical Burst](/images/loadout/surgical_burst.png)
![Seven Sliders](/images/loadout/seven_sliders.png)

## S-Tier — prioritize these

### ![Striker Pump Shotgun](/images/loadout/striker_pump.png) Striker Pump Shotgun
The close-range king after mid-season balance. High per-shot damage, fast pull-out, two-shot potential on cracked / full-shield targets at Legendary. Short range by design — always pair with a Flex SMG.

### ![Flex SMG](/images/loadout/flex_smg.png) Flex SMG
Best spray / mid-close weapon in the pool. Hipfire melts; ADS slows the fire rate but helps tracking. Prefer this over Stinger when both are available.

### ![Surgical Burst Rifle](/images/loadout/surgical_burst.png) Surgical Burst Rifle
Cleanest mid/long AR. Low recoil, weak falloff, rewards burst discipline. Full-auto comfort players can fall back to Warforged if bursts feel awkward.

### ![Seven Sliders](/images/loadout/seven_sliders.png) Seven Sliders (utility)
Not a gun, but fight-changing. Slide reposition + ADS slow-mo. Fuel drain was cut mid-season (~1.5× longer), so they stay S-tier mobility when you find them.

## A-Tier — strong defaults

- ![Hunting Rifle](/images/loadout/hunting_rifle.png) **Hunting Rifle** — Hitscan-feeling long picks for marksmen; high headshot punish, unforgiving if you miss.
- ![Maven Auto Shotgun](/images/loadout/maven_auto.png) **Maven Auto Shotgun** — Forgiving spray shotgun; solid Zero Build / messy peeks when you miss Striker’s first pellet.
- ![Stinger SMG](/images/loadout/stinger_smg.png) **Stinger SMG** — Still a strong shotgun partner; slightly behind Flex on range and overall feel.
- ![Warforged Assault Rifle](/images/loadout/warforged_ar.png) **Warforged Assault Rifle** — Reliable full-auto AR when Surgical Burst is missing (unvault / hitscan tweaks mid-season made it a real alternative again).
- ![Shockwave Grenade](/images/loadout/shockwave.png) **Overdrive Grenades / Shockwaves** — Vertical + rotate tools that win endgames as often as a third gun.

## B-Tier — usable, not preferred

- ![Extending Focus Shotgun](/images/loadout/extending_focus.png) **Extending Focus Shotgun** — Best shotgun *range* in the pool, but the three-shot / spread pattern is less consistent than Striker for raw fight wins. Fine for Zero Build peeks; swap to Striker in box fights when you can.
- ![Rapid Fire SMG](/images/loadout/rapid_fire_smg.png) **Rapid Fire SMG** — High rate, weaker bullets; cleanup only.
- ![Ranger Pistol](/images/loadout/ranger_pistol.png) **Ranger Pistol** — Early secondary; replace with Flex / Stinger.
- ![Chaos Exploder Rifle](/images/loadout/chaos_exploder.png) **Chaos Exploder Rifle** — Nerfed hard (weaker up close). Splash flush is still okay; do not force it over Surgical Burst or Warforged.

## C / D — leave on the floor when you can

- ![Lancehead Pistol](/images/loadout/lancehead.png) **Lancehead Pistol** (and Mythic Baba Yaga variants) — Community consensus is avoid: awkward recoil and poor return vs Flex/Stinger.
- ![Bank Shot Pistol](/images/loadout/bank_shot.png) **Bank Shot Pistol** — Niche ricochet toy; inconsistent in open BR.
- **Business Turret** — Almost never worth a slot.

## Vault note — Chaos Reloader Shotgun

### ![Chaos Reloader Shotgun](/images/loadout/chaos_reloader.png) Chaos Reloader Shotgun

Chaos Reloader (auto-reload while stowed, huge body DPS, terrible range) dominated early Runners box fights and was **vaulted / pulled from standard BR loot** in a mid-season hotfix. If it appears in an LTM or returns later, it is still a close-range monster — otherwise default **Striker Pump**. Always trust the in-game loot pool over old screenshots.

## Suggested loadouts

![Striker Pump](/images/loadout/striker_pump.png)
![Flex SMG](/images/loadout/flex_smg.png)
![Surgical Burst](/images/loadout/surgical_burst.png)

**Aggressive / default meta:** Striker Pump + Flex SMG + Surgical Burst + heals + Seven Sliders (or Shockwaves).

**Zone / placement:** Surgical Burst or Hunting Rifle + Maven / Extending Focus + mobility + dual heals. Skip ego peeks.

**If Flex is contested:** Striker + Stinger + Warforged is still a winning hotbar.

## Notes

Mythics from bosses sit above their base versions when available. Always prefer higher rarity of the same gun when the choice is equal. Sketch the hotbar in the [loadout builder](/tools/loadout-builder).
`,
  },
  {
    slug: 'fortnite-shotgun-guide-best-options',
    title: 'Fortnite Shotgun Guide (Chapter 7 Season 3)',
    excerpt:
      'Which shotgun to run in Runners season: Striker Pump first, then Maven / Extending Focus — plus Flex SMG pairings and the Chaos Reloader vault note.',
    category: 'weapons',
    date: '2026-07-25',
    readTime: 7,
    featured: false,
    tags: ['shotgun', 'weapons', 'close range', 'chapter 7 season 3', 'loadout', 'striker pump'],
    content: `
## Why shotguns still decide close fights

Most box fights and final-circle collisions still end on a shotgun trade. Chapter 7 Season 3’s pool is small: learn **Striker Pump** well, keep Maven / Extending Focus as backups, and always cover mid-range with a **Flex SMG**.

See the full pool ranking in the [weapons tier list](/guides/weapons/fortnite-best-weapons-tier-list-2026), or build a hotbar in the [loadout builder](/tools/loadout-builder).

Last reviewed: July 25, 2026.

## Current shotgun options

### ![Striker Pump Shotgun](/images/loadout/striker_pump.png) Striker Pump Shotgun
Default meta shotgun. Highest fight impact on a clean first shot, fast pull-out, poor range. Build or slide after every pump.

**Best for:** Builds, box fights, and anyone who can land the opener.

### ![Maven Auto Shotgun](/images/loadout/maven_auto.png) Maven Auto Shotgun
Full-auto forgiveness. Lower spike than Striker, better when you are spraying a moving target or playing Zero Build.

**Best for:** Inconsistent aim or messy third-parties.

### ![Extending Focus Shotgun](/images/loadout/extending_focus.png) Extending Focus Shotgun
Longest shotgun reach in the pool (barrel/spread identity). Three-shot pattern is less reliable than Striker for raw deletes — good for mid-range peeks, not the automatic S-tier pick early-season guides claimed.

**Best for:** Zero Build peeks and players who hate pump timing.

### ![Chaos Reloader Shotgun](/images/loadout/chaos_reloader.png) Chaos Reloader Shotgun (vault note)
Was the early-season boxfight king (stowed auto-reload + huge body damage). **Removed from standard BR loot mid-season.** If it shows up in an LTM or returns, take it for endgame boxes; otherwise ignore old tier lists that still rank it S.

## Fundamentals that still win

- Crack with shotgun, finish with **Flex SMG** (Stinger if no Flex).
- Place cover after every pump shot.
- Do not chase beyond shotgun range without an AR (Surgical Burst / Warforged).

## Quick pick

![Striker Pump](/images/loadout/striker_pump.png)
![Maven Auto](/images/loadout/maven_auto.png)
![Extending Focus](/images/loadout/extending_focus.png)
![Flex SMG](/images/loadout/flex_smg.png)

- Default meta: **Striker Pump**
- New / inconsistent aim: **Maven Auto**
- Range-focused / Zero Build: **Extending Focus**
- Spray partner: **Flex SMG**
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
  {
    slug: 'how-to-extract-sprites-fortnite',
    title: 'How to Extract Sprites in Fortnite Chapter 7 Season 3 (Runners)',
    excerpt:
      'Chapter 7 Season 3 Sprite extraction on Shattered Coast: when Extraction Sites unlock, the ~30s defend timer, Portable Extractor, Victory Royale auto-extract, and safe Runners site picks.',
    category: 'how-to',
    date: '2026-07-26',
    readTime: 9,
    featured: true,
    tags: [
      'how to extract sprites fortnite',
      'how to extract sprites chapter 7 season 3',
      'fortnite chapter 7 season 3 sprites',
      'fortnite runners sprite extraction',
      'fortnite extraction sites',
      'portable extractor fortnite',
      'sprite dust fortnite',
      'shattered coast extraction sites',
      'chapter 7 season 3 sprites',
      'runners sprites',
    ],
    content: `
## How to extract Sprites in Fortnite Chapter 7 Season 3

In **Chapter 7 Season 3 (Runners)**, finding a Sprite only buffs **this** match. To keep it in your collection (and earn Sprite Dust) on the **Shattered Coast** map, you must **extract** it:

1. Equip the Sprite.
2. Wait until **after the first storm circle closes** — public Extraction Sites unlock then.
3. Go to an **unoccupied** Extraction Site (white beacon / sky beam on the map).
4. Interact with the **control terminal** → survive the ~**30-second** crate inbound window (you broadcast to the lobby).
5. Interact with the **Extraction Crate** the second it lands and deposit your Sprites.

**Shortcuts:** a **Portable Extractor** does a short, quiet extract anywhere; a **Victory Royale** auto-extracts Sprites you are carrying — no site needed.

Last reviewed: July 26, 2026 (Fortnite Chapter 7 Season 3 / Runners). Trust the live in-game UI if Epic tweaks timers or Dust prices.

Pair with: [cube sprites guide](/guides/how-to/how-to-get-cube-sprites-fortnite), [interactive map](/fortnite-map), [loot spots](/guides/map/fortnite-loot-guide-best-spots), [Runners Battle Pass](/guides/season/fortnite-season-battle-pass-guide).

## Why Sprite extraction matters in Runners (C7S3)

Sprites are the core Chapter 7 Season 3 progression loop. Sprites you only carry die with you. Extraction:

- Banks the Sprite into your **permanent collection**
- Lets you **summon** it later with Sprite Dust in future Chapter 7 Season 3 matches
- Awards **Sprite Dust** and feeds **Mastery** progress (duplicates still help)

Variants (Gold, Gummy, Galaxy, Holofoil, Cube, etc.) usually count as separate collection entries — extract the chase pieces carefully. Cube hunting details: [how to get cube sprites](/guides/how-to/how-to-get-cube-sprites-fortnite).

## Chapter 7 Season 3 Extraction Sites — step-by-step

### 1. Get and equip a Sprite

On Shattered Coast, sources include Sprite Chests, regular chests, floor loot, eliminations, bosses (Boss Sprite), vault rooms, and Sprite Locator routes. Equip it — equipped Sprites are the ones that matter for combat buffs and mastery tracking in Runners.

### 2. Wait for first circle (sites unlock)

Chapter 7 Season 3 Extraction Sites are **locked at match start**. Do not waste the drop fighting over a dark terminal. Loot, find a Sprite, then extract after the first storm circle closes.

### 3. Pick an unoccupied Shattered Coast site

Open the map: white beacon icons mark Extraction Sites. A used site is **occupied for the rest of that match** (one successful use per site). Always have a backup pad on your rotate.

Sites sit near named POIs across the Chapter 7 Season 3 island — use the [map](/fortnite-map) and [POI guide](/guides/map/fortnite-map-all-locations-guide) to plan. High-traffic examples: **Sinister Strip** (center / mythic pressure). Quieter examples players favor: **Sunken Shores**, **Wonkeeland**, **Battlewoods**, **Golden Grove** — still scout before you ping the lobby.

### 4. Scout, then activate

The pad is open and loud. Clear campers **before** you touch the terminal. Activating:

- Calls the Extraction Crate (~**30 seconds**)
- Turns your map presence into an obvious “someone is extracting” signal (red icon + alert)

Build immediately. Treat it like a hold objective, not a quick tap.

### 5. Deposit fast when the crate lands

The deposit window is short. Sprint to the crate, interact, dump **all** Sprites you want to bank in one visit. Do not inventory-fumble while it is open.

You get Sprite Dust when it seals. Then leave — the pad is spent for that match.

## Portable Extractor in Chapter 7 Season 3

Every Extraction Site also has a **Sprite Dust Services** terminal. The important daily buy for Runners collectors:

| Purchase | Typical use |
| --- | --- |
| **Portable Extractor** (~2,000 Sprite Dust, often **1/day**) | Short (~5s), **silent** extract from almost anywhere — best for cubes, Mythics, Galaxy / first-time Legendaries |
| Weapon rarity bumps / daily XP (when offered) | Optional Dust sinks mid-match |

Use Portable Extractor when a public 30-second defend is too risky. Buy it early in a Chapter 7 Season 3 session if you plan a cube / rare hunt — see [how to get cube sprites](/guides/how-to/how-to-get-cube-sprites-fortnite).

Exact Dust prices and daily reset time can shift; confirm on the in-game Services UI.

## Victory Royale = auto-extract (Runners)

If you win a Chapter 7 Season 3 match while carrying Sprites, they bank **automatically**. In endgame with a chase Sprite, playing for the win is often safer than rotating to a lit pad under third parties.

## Safest vs sweatest Extraction Sites (Shattered Coast)

| Prefer when… | Sites / approach |
| --- | --- |
| Solo / rare Sprite / low mats | Outer pads (south / northeast loops), or Portable Extractor |
| You already wiped the POI | Nearby site after a clean vault / Sprite Chest clear |
| Contested center | Avoid Sinister Strip extracts unless you own the area |

Common Chapter 7 Season 3 mistakes:

- Activating before scouting
- Standing in the open for the full 30 seconds with no builds
- Missing the crate interact window
- Extracting a common duplicate while a cube sits unprotected — bank the chase piece first when you can

## Sprite Dust after you extract (C7S3)

In Runners, Dust is the season currency for summoning banked Sprites next match and for Services buys (Portable Extractor, etc.). You also progress Dust / mastery through chests, elims, and successful extracts.

Spending Dust to **summon** is separate from **extracting**. Extract first → collection entry → summon later when you want that buff again. Pass context: [Fortnite Runners Battle Pass guide](/guides/season/fortnite-season-battle-pass-guide).

## FAQ — Chapter 7 Season 3 Sprite extraction

### Can I extract Sprites before the first storm circle in Chapter 7 Season 3?

No — public Extraction Sites on Shattered Coast stay locked until after the first circle closes.

### Can two squads use the same Extraction Site in one Runners match?

No. Once used successfully, that site is occupied for the match. Rotate to another pad or use a Portable Extractor.

### Do I lose the Sprite if I die during the 30-second wait?

Yes if you have not deposited yet. The Sprite can drop for whoever loots you — they can extract it themselves.

### Does extracting a Sprite I already own still help in C7S3?

Yes — Dust and mastery / quest progress still apply. Chase variants you are missing should get the safer extract method.

### Is Creative / XP maps a way to extract Chapter 7 Season 3 Sprites?

No. Sprite extraction is Battle Royale on Shattered Coast only. For Creative leveling see [XP map codes](/codes) and the [XP maps guide](/guides/season/best-fortnite-xp-maps).

## Related Chapter 7 Season 3 guides

- [How to get cube sprites (Chapter 7 Season 3)](/guides/how-to/how-to-get-cube-sprites-fortnite)
- [Interactive Fortnite map](/fortnite-map)
- [Best loot spots on Shattered Coast](/guides/map/fortnite-loot-guide-best-spots)
- [Shattered Coast POIs](/guides/map/fortnite-map-all-locations-guide)
- [Runners Battle Pass guide](/guides/season/fortnite-season-battle-pass-guide)
`,
  },
  {
    slug: 'how-to-get-cube-sprites-fortnite',
    title: 'How to Get Cube Sprites in Fortnite (Chapter 7 Season 3)',
    excerpt:
      'Which cube sprite variants are live right now, where they drop from chests and vaults, how the Sprite Locator works, and the best Shattered Coast farm routes.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 10,
    featured: true,
    tags: [
      'how to get cube sprites in fortnite',
      'fortnite cube sprites',
      'cube sprite fortnite',
      'sprite locator fortnite',
      'chapter 7 season 3 sprites',
      'golden grove sprites',
    ],
    content: `
## Cube sprites are live — but not every sprite has a cube yet

In Chapter 7 Season 3 (Runners), Epic added **cube** variants of Sprites. These are rare collectible/combat companions that can appear from the same sprite loot pipeline as normal Sprites — chests, Sprite Chests, rare chests, vaults, and Sprite Locator routes.

Not every Sprite in the catalog has a cube version yet. Epic is rolling variants over time. As of the mid-season cube wave covered in community guides (including [this Chapter 7 Season 3 walkthrough](https://www.youtube.com/watch?v=by7oByl8EO8)), the cube set that is actually obtainable right now is limited.

Last reviewed: July 2026. Patch notes can expand the list — if a Sprite suddenly shows a cube style in-game, treat the live client as the source of truth.

Use the [interactive map](/fortnite-map) and [loot guide](/guides/map/fortnite-loot-guide-best-spots) to plan high-chest drops while you hunt.

## Which cube sprites exist right now?

Community coverage of the current wave lists these **cube variants** as available:

| Cube sprite | Notes |
| --- | --- |
| Boss Sprite | High-value combat Sprite; also a common “almost cube” tease when vaults open |
| Earth Sprite | Elemental / earth-themed cube variant |
| Fishy Sprite | Aquatic-themed cube variant |
| Batman Sprite | Collab Sprite cube variant |
| Grim Sprite | Already a rare family — cube version is a chase piece |
| Punk Sprite | Style / punk-themed cube variant |
| Dream Sprite | Dream-themed cube variant |
| Fire Sprite | Fire-themed cube variant (holofoil fire also exists as a separate foil chase) |

Everything else in the Sprite book is expected later. Do not waste hours assuming every Sprite can roll cube today.

Other foil / special treatments (for example **Holofoil Fire Sprite**) can also drop from the same chest types. Holofoil is not the same as cube — still rare, just a different chase.

## How cube sprites actually drop

Cube Sprites are not a separate questline with a pin on the map. They come from the Sprite loot table with a **low roll chance**:

- Regular chests
- **Sprite Chests** (priority targets)
- **Rare chests** (blue-named / high-tier POI loot — higher chance than grey junk, still not guaranteed)
- Vault loot rooms (often packed with Sprite Chests + rare chests)
- World Sprite spawns (including some “guaranteed Sprite in the water / set piece” spots)

RNG is brutal. A full Golden Grove clear with zero cubes is normal. Treat every match as a farm attempt, not a guarantee.

## Method 1 — Chest and Sprite Chest farm (primary)

1. Drop on the **outskirts** or a mid-contest POI with dense chests so you can open volume safely.
2. Prioritize **Sprite Chests** whenever you hear / see them — they are the dedicated Sprite container.
3. Hit **rare chests** next. Named locations with stronger loot tables (often associated with the “blue name” high-value POI treatment in-season) are better than random woodland greys.
4. Keep moving. Cubes are a low-percentage roll; **open more chests** beats camping one house forever.

High-chest habits from our Shattered Coast guides still apply: land, clear, rotate to the next dense cluster, extract or bank when inventory is full of Sprites you care about.

## Method 2 — Sprite Locator

The **Sprite Locator** is the seasonal tool that pings Sprite opportunities. Before the cube update, Locator routes mostly fed base Sprites. After Epic’s update, Locator-linked chests can roll **variant Sprites**, including cubes, at a meaningfully better relative rate than ignoring Locator entirely.

Practical use:

1. Grab a Sprite Locator when you find one.
2. Impulse / rotate to the marked chest or Sprite opportunity.
3. Clear the ping completely (Sprite Chest + nearby rares) before chasing the next fight.

Locator does not guarantee a cube. It raises the number of *valid Sprite rolls* you take per match.

## Method 3 — Golden Grove underground + rare chest loop

**Golden Grove** is a strong Chapter 7 Season 3 farm pocket for Sprite hunters:

- Underground / interior loot path with a high chest count
- A reliable world Sprite spawn in the water area (often contested by other collectors)
- A **guaranteed rare chest** on the back side of the loop in typical match spawns

Clear Grove → leave with mats and Sprite rolls → rotate toward a vault if you found a key. Full POI context: [Shattered Coast locations guide](/guides/map/fortnite-map-all-locations-guide) and live markers on the [Fortnite map](/fortnite-map).

## Method 4 — Vaults

Vault keys turn a normal farm into a jackpot room. Vault interiors commonly stack:

- Sprite Chests
- Rare chests
- High-tier loot that keeps you alive for the next rotate

If a vault opens Boss Sprite instead of cube, that is still useful power for fighting other collectors — but it is not the cube chase. Extract or keep hunting.

## Method 5 — Player trades and contested takes

Because cubes just released, ownership is uneven.

**Trading:** Some players swap rare Sprites (cube, Zero Point, Grim, etc.) in lobbies / Discord / friend groups. Only trade with people you trust; Fortnite has no official safe Sprite escrow. Never share account logins for a “trade.”

**Contested takes:** If someone in the pre-game lobby clearly shows a cube Sprite loadout, following their bus exit and winning the fight is a legitimate — if sweaty — method. Safe extraction zones stop fights inside the bubble, so do not expect to third-party someone mid-deposit inside the safe circle.

## Extraction and Sprite Dust

When you decide to bank progress, follow the full [how to extract Sprites](/guides/how-to/how-to-extract-sprites-fortnite) walkthrough: public pads unlock after the first circle, ~30s defend timer, Portable Extractor for rare / cube pieces, or win the match for auto-extract.

Use quieter pads or a Portable Extractor for cubes you still need — dying with an unextracted cube loses the drop. Extracting a duplicate still progresses Sprite Dust.

## Farm route checklist (one match)

1. Drop Golden Grove, Latte Landing, Wonkeeland, or another dense mid-POI from the [loot guide](/guides/map/fortnite-loot-guide-best-spots)
2. Open every Sprite Chest first, then rares
3. Use Sprite Locator pings immediately
4. If you find a vault key, rotate to the vault before late circle
5. Extract duplicates for dust; keep missing cubes until a safe extract ([extraction guide](/guides/how-to/how-to-extract-sprites-fortnite))
6. Queue again — volume wins

## FAQ

### Are cube sprites guaranteed from rare chests?

No. Rare chests and Sprite Chests improve your odds versus random greys. They do not guarantee a cube.

### Why can’t I find cube versions of every Sprite?

Epic has not shipped cube variants for the full Sprite roster yet. Only the live list above (Boss, Earth, Fishy, Batman, Grim, Punk, Dream, Fire) is confirmed in the current wave.

### Is holofoil the same as cube?

No. Holofoil is a different special treatment. Both can be rare chase drops from the same containers.

### Do Creative maps give cube sprites?

No. This is a Battle Royale / seasonal Sprite systems hunt on Shattered Coast, not a Creative island code. For Creative XP maps see the [codes database](/codes).

### What’s the fastest way if I only have 30 minutes?

Sprint Locator + Sprite Chest volume on high-chest POIs, then vault if keyed. Skip long mid-map third parties unless the enemy is visibly carrying a cube you need.

## Related guides and tools

- [How to extract Sprites](/guides/how-to/how-to-extract-sprites-fortnite)
- [Interactive Fortnite map](/fortnite-map)
- [Best loot spots](/guides/map/fortnite-loot-guide-best-spots)
- [All Shattered Coast locations](/guides/map/fortnite-map-all-locations-guide)
- [Ranked mode tips](/guides/how-to/fortnite-ranked-mode-guide) if you are farming in Ranked lobbies

Community video walkthrough used as a Chapter 7 Season 3 reference: [How to find cube sprites](https://www.youtube.com/watch?v=by7oByl8EO8).
`,
  },
  {
    slug: 'fortnite-ban-appeal',
    title: 'Fortnite Ban Appeal Guide — How to Appeal an Epic Account Ban',
    excerpt:
      'How to check your Fortnite ban status, find your Sanction ID, submit one official appeal on Epic’s Sanctions and Appeals portal, and what happens after review.',
    category: 'how-to',
    date: '2026-07-23',
    readTime: 11,
    featured: true,
    tags: [
      'fortnite ban appeal',
      'how to appeal fortnite ban',
      'epic games sanction appeal',
      'fortnite banned account',
      'sanction id fortnite',
      'epic safety center appeal',
    ],
    content: `
## Short answer: appeal only through Epic’s Sanctions and Appeals portal

If your Fortnite / Epic account is banned or sanctioned, the official path is Epic’s **Sanctions and Appeals** flow on the Safety Center — not random Discord “unban services,” not paid recovery sellers, and usually not a generic Player Support chat asking them to override moderation.

Epic’s own help articles state that player and creator bans can be reviewed and appealed in the [Sanctions and Appeals portal](https://safety.epicgames.com/sanctions-and-appeals), using the **Sanction ID** from your ban email, while signed into the **correct** Epic account. You can check status and duration from [safety.epicgames.com](https://safety.epicgames.com/) → Sanctions and Appeals → My Sanctions & Appeals.

Last reviewed: July 2026. Always trust the live Epic UI and email over third-party summaries if something changed.

## What a Fortnite / Epic ban usually means

Epic issues sanctions when accounts break [community / safety rules](https://safety.epicgames.com/) — cheating, toxicity, fraud, account sharing abuse, and related violations. Players typically get an **email** describing:

- The type of sanction
- Duration (temporary vs permanent)
- The rule category violated
- A **Sanction ID** (Epic’s lookup form expects a **32-character** ID, often UUID-shaped)

An **account ban** can disable the Epic account and remove access to games, virtual items, and balances tied to that account. Epic also notes that action may extend across multiple accounts you own if they enforce multi-account sanctions.

This guide covers **appealing a sanction decision**. It does not teach you how to evade bans with new accounts — that violates Epic rules and can make things worse.

## Step 1 — Confirm you are actually banned (and for how long)

1. Open [https://safety.epicgames.com/](https://safety.epicgames.com/)
2. Choose **Sanctions and Appeals**
3. Open **Go to my Sanctions & Appeals** / [My Sanctions and Appeals](https://safety.epicgames.com/sanctions-and-appeals/my-sanctions-and-appeals)
4. Sign in with the Epic account that received the email
5. Review active sanctions, status, and duration

**Alternative:** On the same page, paste the **Sanction ID** from your email into the Sanction ID search (must be 32 characters).

Epic also documents this flow in [How can I view my Fortnite ban status or duration?](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_PlayerBehavior/how-can-i-view-my-fortnite-ban-status-or-duration-a000094575).

If nothing appears, you may be on the wrong Epic login (common on consoles with multiple linked emails). Fix the login before writing an appeal.

## Step 2 — Gather what you need before appealing

| Item | Why you need it |
| --- | --- |
| Ban / sanction email | Contains Sanction ID, rule category, and timing |
| Correct Epic login | Appeals must be filed on the sanctioned account |
| Sanction ID (32 characters) | Lookup / appeal targeting |
| Honest timeline | What you were doing around the date of the report |
| Evidence (optional) | Screenshots, match IDs, proof of compromise — only if relevant |

If you believe the account was **stolen** and then banned for cheating, say that clearly and secure the account first: change password, enable [two-factor authentication](/guides/how-to/how-to-enable-2fa-fortnite), revoke unknown devices/sessions.

## Step 3 — Submit the Fortnite ban appeal (one per sanction)

Epic’s Sanctions and Appeals policy ([overview](https://safety.epicgames.com/sanctions-and-appeals)):

- You may submit **one appeal per eligible sanction**
- Appeals are reviewed by a **human moderator**
- Epic may contact you for more information
- Outcomes are notified by **email** and visible on the Sanctions and Appeals page
- Possible results: **upheld** (ban stands), **lifted** (sanction removed as inaccurate), or **modified** (different/more suitable sanction)
- Sanctions that were already **modified** after a previous review generally **cannot** be appealed again
- You can typically appeal during the life of the sanction (or longer if required by law); the decision email/UI states the window

### How to file

1. Sign in at [My Sanctions and Appeals](https://safety.epicgames.com/sanctions-and-appeals/my-sanctions-and-appeals)
2. Locate the sanction (list view or Sanction ID search)
3. Choose the appeal option for that eligible sanction
4. Write a clear, factual appeal (see template below)
5. Submit once — do not spam duplicate tickets hoping for a different bot answer

Epic’s Fortnite help page on bans ([Why is my Fortnite account banned?](https://www.epicgames.com/help/en-US/fortnite-battle-royale-c-202300000001636/player-behavior-c-202300000001720/why-is-my-fortnite-account-banned-a202300000012186)) also points creators and players to this same portal with the Sanction ID from email.

## What to write in a ban appeal (that does not waste the one shot)

Good appeals are short, factual, and specific. Bad appeals are insults, walls of “I swear I’m innocent,” or pasted ChatGPT essays with no dates.

### Useful structure

1. **Sanction ID** and approximate date of the email
2. **What you believe happened** in one paragraph (wrongful report, compromised account, mistaken hardware ID, etc.)
3. **Facts Epic can check** — platforms you play on, whether anyone else had the password, whether you used any third-party software
4. **What you already fixed** — password reset, 2FA enabled, removed shady overlays
5. **Polite close** — ask for a human review; do not threaten chargebacks as leverage

### Example tone (edit hard — do not copy blank)

“Sanction ID: [paste]. I received this on [date]. I play on [PC/PS/Xbox] only. I did not knowingly use cheats. Around that date my account email showed [login from unknown region / shared PC / sibling access]. I have since changed my password and enabled authenticator 2FA. Please review whether this sanction was applied in error or due to unauthorized use. Happy to provide more detail if needed.”

If you **did** break the rules, an appeal that lies usually fails. Some players instead wait out a temporary ban and clean up security habits.

## Temporary ban vs permanent ban

| Situation | What to expect |
| --- | --- |
| Temporary ban | Status page shows an end date; appeal still possible while active if eligible |
| Permanent account ban | Access disabled; appeal is the primary official challenge path |
| Chat / competitive / mode restrictions | May appear as narrower sanctions — still use the same portal |
| Hardware / device blocks | Harder cases; still use official appeal, not “HWID spoof” sellers |

FortniteTools cannot see your Sanction ID or overturn bans. Only Epic can.

## Scams that target banned players

Heavy search interest around “Fortnite ban appeal” attracts predators:

- Discord/Telegram “admins” who unban for a fee
- Sites asking for your Epic password to “submit the appeal for you”
- Fake Epic emails with phishing Sanction portals
- Account sellers offering a “clean” replacement account

Epic will not ask you to pay a stranger to appeal. Use [safety.epicgames.com](https://safety.epicgames.com/) and your real Epic login only. Related reading: [how to enable 2FA](/guides/how-to/how-to-enable-2fa-fortnite) and [free V-Bucks scam warnings](/guides/season/how-to-get-free-v-bucks-fortnite).

## After you submit — timeline and outcomes

Epic says appeals go to human moderation. Timing varies. Watch:

- The email on the Epic account
- The Sanctions and Appeals status page

| Outcome | Meaning |
| --- | --- |
| Upheld | Original sanction was judged appropriate |
| Lifted | Sanction removed as inaccurately applied |
| Modified | Different sanction applied; that modified result may not be appealable again |

Do not create alternate accounts to bypass an active ban while an appeal is pending — that can become additional violations.

## Common problems

### “I never got a ban email”

Check spam, filters, and every email ever linked to Epic / console logins. Use Sanction ID search if you have the ID from an in-game or launcher message. Confirm you are signed into the banned account on the Safety Center.

### “Player Support said they can’t help”

For many sanction appeals, the dedicated Sanctions and Appeals portal is the correct channel. Support may redirect you there rather than reversing moderation in a normal ticket.

### “My appeal button is missing”

Possible reasons: sanction not eligible, appeal already used, sanction is the result of a prior modification, or you are on the wrong account. Re-read the decision email for eligibility language.

### “I was banned for cheating but I only used overlays”

Some overlays and injectors trip anti-cheat. Remove them, appeal with honesty if you believe it was a false positive, and do not install “FPS unlocker” malware marketed to banned players.

## FAQ

### How many times can I appeal a Fortnite ban?

Epic’s policy is **one appeal per eligible sanction**. Use it carefully.

### Can I appeal after the ban ends?

Epic states you can appeal throughout the duration of the sanction unless law requires a longer window. Temporary bans that already expired may no longer need an appeal — check the portal.

### Will appealing refund my V-Bucks or skins?

A successful lift restores access to the account as Epic configures it. Permanent bans that stay upheld generally mean you do not keep that locker. Separate shop refunds are a different system — see [how to refund Fortnite skins](/guides/how-to/how-to-refund-fortnite-skins).

### Is FortniteTools affiliated with Epic?

No. We are an independent fan site. We explain the public process and link official pages; we cannot process appeals.

## Official links checklist

1. [Sanctions and Appeals overview](https://safety.epicgames.com/sanctions-and-appeals)
2. [My Sanctions and Appeals](https://safety.epicgames.com/sanctions-and-appeals/my-sanctions-and-appeals)
3. [View ban status / duration (Epic Help)](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_PlayerBehavior/how-can-i-view-my-fortnite-ban-status-or-duration-a000094575)
4. [Why is my Fortnite account banned? (Epic Help)](https://www.epicgames.com/help/en-US/fortnite-battle-royale-c-202300000001636/player-behavior-c-202300000001720/why-is-my-fortnite-account-banned-a202300000012186)
5. Secure the account afterward with [Epic 2FA](/guides/how-to/how-to-enable-2fa-fortnite)
`,
  },
  {
    slug: 'best-fortnite-xp-maps',
    title: 'Best Fortnite XP Maps (July 2026) — How to Level Up Fast',
    excerpt:
      'Working Creative XP map codes for Chapter 7 Season 3, how to enter island codes, daily/weekly Creative XP caps, and a fast Battle Pass leveling plan.',
    category: 'season',
    date: '2026-07-24',
    readTime: 10,
    featured: true,
    tags: [
      'best fortnite xp maps',
      'fortnite xp map codes',
      'how to level up fast fortnite',
      'fortnite creative xp',
      'fortm code',
      'battle pass xp farm',
    ],
    content: `
## Fastest way to level the Battle Pass right now

Creative **XP maps** are still the quickest path to Battle Pass levels in Chapter 7 Season 3 — as long as you respect Epic’s Creative XP caps and rotate maps when gains slow. This guide lists working codes, shows how to enter them, and pairs with our live [Creative map codes](/codes) database and [Battle Pass XP calculator](/tools/battle-pass-xp-calculator).

Last reviewed: July 2026. Codes break after patches — if Discover says an island is unavailable or “XP disabled,” swap to another XP-rated code on [/codes](/codes).

## Best Fortnite XP map codes (July 2026)

| Map | Code | Style | Why use it |
| --- | --- | --- | --- |
| FortM | 6163-6465-2983 | Fast NPC / AFK-style | Often the speed pick for hitting the daily Creative cap |
| 50 Fashion Show | 3399-8889-2099 | Social + XP | High XP without pure AFK boredom |
| Havoc Hotel 3 | 7962-7087-3391 | Adventure + AFK zone | Rooms to clear plus a chill AFK area |
| TikToker Tycoon | 9579-5799-5653 | Tycoon clicker | Low-effort AFK farm once set up |
| Cars Mega Ramp | 5442-4943-3475 | Passive driving | Steady XP while you cruise |
| Sweaty Red vs Blue | 6531-4403-0726 | Active PvP | XP plus fights if you hate clickers |
| Island Tycoon | 2778-7440-3172 | Tycoon | Longer session upgrades |

Copy any code from the table, or open the filtered XP list on [Fortnite map codes → XP Maps](/codes).

## How to enter a Fortnite Creative map code

1. Launch Fortnite and open the **Play** / Discover area.
2. Tap the **search** icon (Discover search).
3. Paste the island code exactly, including dashes (\`XXXX-XXXX-XXXX\`).
4. Select the matching island → **Play**.
5. For AFK / NPC farms, set the lobby to **Private** so randoms cannot grief your setup.

That is not a “redeem code” like a V-Bucks card — you are loading a Creative island. XP awards while you play (until Creative caps).

## Creative XP caps (read this before grinding 4 hours)

Epic calibrates Creative XP. Practical rules players hit every season:

- There is a **daily Creative XP cap** — after it, Creative maps stop advancing the Battle Pass until reset.
- There is also a larger **weekly Creative XP** allowance (community guides often cite roughly ~60 Battle Pass levels / week when you max Creative — exact numbers shift; watch your pass bar).
- Playing **one map forever** often slows down. Rotate 2–3 XP maps when returns drop.
- After Creative is capped for the day, switch to **BR dailies / weeklies**, LEGO / other modes if they still pay XP, or stop.

Use the [XP calculator](/tools/battle-pass-xp-calculator) to see whether your remaining weeks can finish the pass.

## Best leveling plan for a busy day (30–60 minutes)

1. Finish **Battle Royale daily quests** first (they expire).
2. Load **FortM** (or your current fastest XP code) in a **private** lobby until daily Creative XP slows or stops.
3. If you still need levels, swap to Fashion Show / Havoc Hotel / a tycoon code.
4. Check the [Battle Pass guide](/guides/season/fortnite-season-battle-pass-guide) for season end timing.

## AFK vs active XP maps

| Type | Pros | Cons |
| --- | --- | --- |
| AFK / tycoon / FortM | Fast cap, low effort | Gets patched; boring; private lobby recommended |
| Fashion / hotel / combat | More fun, still strong XP | Slower than pure NPC farms |
| Horror / story maps | Fun, sometimes XP | Not optimized farms — see [horror codes](/codes) |

## FAQ

### What is the best Fortnite XP map right now?

Start with **FortM (\`6163-6465-2983\`)** and verify it still awards XP in Discover. Keep Fashion Show and Havoc Hotel as backups.

### Do XP maps get you banned?

Playing official Creative / UEFN islands for XP is normal. Third-party injectors, “XP glitch” EXEs, and account sharers are not. Stick to Discover codes.

### Why did my XP stop on the map?

You likely hit the daily Creative cap, the map is under Epic calibration (XP disabled), or that island’s payout was nerfed. Switch codes or modes.

### Where do I find more codes?

Browse and filter XP maps on [/codes](/codes), or read our Creative SEO sections there for genre lists.
`,
  },
  {
    slug: 'how-to-link-epic-games-playstation-xbox-switch',
    title: 'How to Link Epic Games to PlayStation, Xbox, and Switch',
    excerpt:
      'Step-by-step: connect your Epic account to PS5/PS4, Xbox, and Nintendo Switch for cross-progress, shared V-Bucks, and the correct Fortnite locker.',
    category: 'how-to',
    date: '2026-07-24',
    readTime: 9,
    featured: false,
    tags: [
      'how to link epic to playstation',
      'link epic xbox fortnite',
      'link nintendo switch epic games',
      'fortnite cross progress',
      'epic connected accounts',
    ],
    content: `
## Why linking matters

Fortnite progress lives on your **Epic Games account**. Linking PlayStation, Xbox, or Nintendo lets you:

- Carry the same locker / Battle Pass across devices
- Sign in with the console account you already use
- Avoid creating a second empty Epic account by accident

Last reviewed: July 2026. Official connection tools live under Epic account settings — [Connections](https://www.epicgames.com/account/connections) on the web, or the first-time Fortnite console prompt.

## Before you link (read this)

- Decide which Epic account owns the **skins you care about**. Linking does not merge two full lockers into one.
- Enable [2FA](/guides/how-to/how-to-enable-2fa-fortnite) on the Epic account you will keep.
- Unlink only when you understand you may lose console access to that Epic until you reconnect.
- Epic generally allows **one primary connection per platform type** — if another PSN/Xbox/Nintendo was linked before, you may see “another account was previously connected” errors.

## How to link Epic to PlayStation (PS5 / PS4)

1. On PlayStation, launch **Fortnite**.
2. When prompted to link / sign in to Epic, choose **Sign in with Epic** (or create only if you truly need a new account).
3. Sign in with the Epic email that owns your skins.
4. Approve the PlayStation Network connection.
5. Confirm on [Epic → Connections](https://www.epicgames.com/account/connections) that PlayStation shows as connected.

**Already in Fortnite on PS?** You can also start from the Epic website: Connections → Connect PlayStation → follow Sony’s authorize screen → relaunch Fortnite.

If the wrong Epic account linked: stop playing on it, contact Epic Support / use connection help articles carefully — do not buy a “merge service.”

## How to link Epic to Xbox

1. Launch Fortnite on Xbox and sign in with your **Xbox Gamertag**.
2. Follow the Epic link prompt and sign into the correct Epic account.
3. Or use [Epic Connections](https://www.epicgames.com/account/connections) → Connect Xbox → authorize with Microsoft.
4. Relaunch Fortnite and check the locker matches.

Xbox Game Pass / Microsoft Store PC Fortnite also uses the Xbox ↔ Epic link. Keep the same Microsoft account across devices.

## How to link Epic to Nintendo Switch

1. On Switch, open Fortnite and choose the Epic sign-in / link flow.
2. You will usually get a **code** or browser page — open it on a phone/PC, sign into Epic, enter the code.
3. Confirm Nintendo shows under Epic Connections.
4. Restart Fortnite on Switch.

Switch players often create orphan Epic accounts by mashing through prompts. Always verify the email on epicgames.com matches the locker you expect.

## Fix common link errors

### “Another [platform] account was previously connected”

That Epic ID already used a different PSN/Xbox/Nintendo. You cannot casually attach a second one. Options: sign in with the originally linked console account, or follow Epic’s official unlink / support path for eligible cases.

### “I have two lockers”

You created two Epic accounts. There is **no self-serve locker merge**. Pick one primary account, secure it, and stop progressing the empty one.

### Console name vs Epic display name

Linking does not rename you. Change the Epic display name separately — [how to change Fortnite name](/guides/how-to/how-to-change-fortnite-name).

## After linking checklist

- Confirm skins on each device
- Turn on 2FA
- Set the same [creator code](https://www.fortnite.com/) habits / privacy settings
- Look yourself up on the [Fortnite stats tracker](/tools/player-stats) with the Epic display name

## FAQ

### Does linking share V-Bucks?

V-Bucks balance is on the Epic account (with platform purchase caveats). Purchases made on a console storefront may be restricted to that ecosystem’s rules — but cosmetics unlock on the linked Epic locker for play.

### Can I unlink later?

Yes from Epic Connections, with consequences for how you sign in on that console. Unlink only intentionally.
`,
  },
  {
    slug: 'how-to-gift-skins-fortnite',
    title: 'How to Gift Skins in Fortnite (Requirements + Steps)',
    excerpt:
      'Gift Item Shop skins in Fortnite: 2FA, friendship timer, daily gift limits, Buy as Gift steps, and why you cannot send locker items.',
    category: 'how-to',
    date: '2026-07-24',
    readTime: 8,
    featured: false,
    tags: [
      'how to gift skins in fortnite',
      'fortnite gift skin',
      'buy as a gift fortnite',
      'fortnite gifting requirements',
      'gift v-bucks skin',
    ],
    content: `
## You gift from the Item Shop — not from your locker

Fortnite gifting purchases a **currently available Item Shop** cosmetic for a friend. You cannot mail a skin you already own out of your locker.

Official flow is documented in Epic Help: [How do I send a Gift in Battle Royale?](https://www.epicgames.com/help/en-US/c-202300000001636/c-202300000001723/a202300000016633).

Last reviewed: July 2026. Check today’s offerings on the [Item Shop tracker](/tools/item-shop) and budget with the [V-Bucks calculator](/tools/vbucks-calculator).

## Gifting requirements checklist

| Requirement | Detail |
| --- | --- |
| Two-factor authentication | Sender must have [2FA enabled](/guides/how-to/how-to-enable-2fa-fortnite) |
| Account level | Career account level typically **2+** (not Battle Pass tier) |
| Friendship | Must be **Epic Friends for at least ~48 hours** |
| Daily limit | Commonly **up to 5 gifts per 24 hours** (confirm in-game if Epic adjusts) |
| Recipient | Must not already own the item; gifts enabled in their settings |
| Refunds | Gifts are generally **non-refundable** via Cancel Purchase / Return Tickets |

If **Buy as a Gift** is greyed out, walk this table top to bottom.

## How to gift a skin (step-by-step)

1. Enable 2FA on your Epic account if you have not already.
2. Add your friend on Epic and wait out the friendship timer if you just connected.
3. Open Fortnite → **Item Shop**.
4. Select the outfit / emote / wrap you want to send.
5. Choose **Gift** / **Buy as a Gift** (wording varies slightly by update).
6. Pick the recipient — Epic recommends using their **Epic display name**, not only a console gamertag.
7. Confirm the V-Bucks purchase.

Epic notes that some **dynamically priced bundles** cannot be gifted if the receiver already owns part of the bundle.

## Can they receive gifts?

Recipients can disable gift receiving in settings. If you cannot select them:

- Ask them to enable receiving gifts
- Confirm you are friends on **Epic**, not only a platform party list
- Confirm they do not already own the cosmetic

## Gift scams to ignore

- “Gift me first and I’ll gift back” from strangers
- Discord bots that need your login to “send a gift”
- Paying real money outside Epic for a “gifted” OG skin

If a gift purchase was a mistake on your side, see [refund rules](/guides/how-to/how-to-refund-fortnite-skins) — gifted items are usually excluded.

## FAQ

### Can I gift V-Bucks directly?

Not as a raw currency transfer. You gift shop items priced in V-Bucks.

### Can I gift Battle Pass?

Passes and many pass-related products are often blocked from the gift tools. Stick to eligible Item Shop cosmetics.

### When does the shop rotate so I can gift a returning skin?

Daily reset — details in [when does the Item Shop reset?](/guides/how-to/when-does-fortnite-item-shop-reset).
`,
  },
  {
    slug: 'how-to-report-mute-block-fortnite',
    title: 'How to Report, Mute, and Block in Fortnite',
    excerpt:
      'Report toxic players, mute voice/text chat, and block users in Fortnite — plus what happens after a report and how to stay safe.',
    category: 'how-to',
    date: '2026-07-24',
    readTime: 7,
    featured: false,
    tags: [
      'how to report someone fortnite',
      'how to mute in fortnite',
      'how to block someone fortnite',
      'fortnite report player',
      'fortnite voice chat mute',
    ],
    content: `
## Three different tools: mute, block, report

| Action | What it does | When to use |
| --- | --- | --- |
| **Mute** | Stops you hearing / seeing that player’s voice or text | Toxicity you can ignore mid-match |
| **Block** | Stronger personal filter / friendship barrier | Repeat harassers, scammers in whispers |
| **Report** | Sends conduct to Epic for review | Cheating, hate speech, harassment, scams |

Reporting does not kick them instantly. Epic reviews signals with their safety systems — see [Epic Safety Center](https://safety.epicgames.com/).

Last reviewed: July 2026. UI labels move slightly between seasons; look for the player card / report flag.

## How to mute someone in Fortnite

### During a match

1. Open the **players / report** menu (console: typically Options/Menu → reporting players list; PC: often Esc or the in-game social/report UI).
2. Select the player.
3. Choose **Mute** for voice, text, or both if offered.
4. Confirm.

You can also lower global voice chat or switch voice channels in **Settings → Audio / Voice Chat** if the whole lobby is unbearable.

### In the lobby / social panel

Open your friends / recent players list → select the player → mute options if available.

## How to block someone

1. Open their player profile from recent players, friends, or party UI.
2. Choose **Block**.
3. Confirm.

Blocked players should stop most social contact. Unblock later from Epic account / in-game social settings if you change your mind.

## How to report a player

1. Open the player’s card (in-match report list, career, or recent players).
2. Select **Report**.
3. Pick the closest category (cheating, abusive chat, harassment, inappropriate content, etc.).
4. Add a short optional note if the UI allows — facts beat essays.
5. Submit.

For cheating, report as soon as you have a clear match context. Do not spam duplicate reports on the same fight expecting faster bans.

## What happens after you report?

Epic may warn, mute, restrict modes, or ban accounts that break rules. You usually will **not** get a public “we banned them” message. That silence is normal.

If **you** were banned and believe it was wrong, use the [ban appeal guide](/guides/how-to/fortnite-ban-appeal) — do not create ban-evasion accounts.

## Extra safety settings worth enabling

- Turn on [2FA](/guides/how-to/how-to-enable-2fa-fortnite)
- Limit who can whisper / party invite you in privacy settings
- Never share login codes with “Epic Support” in chat
- Treat free V-Bucks DMs as scams — [free V-Bucks guide](/guides/season/how-to-get-free-v-bucks-fortnite)

## FAQ

### Can I report after the match?

Yes — use recent players / career when the in-match list is gone.

### Does reporting soft-ban them for me only?

No. Mute/block are personal filters. Report is for Epic enforcement.

### Voice chat still hears them after mute

Double-check you muted the correct player, that party chat is not a different channel, and that game volume vs voice chat sliders are not confused.
`,
  },
  {
    slug: 'when-does-fortnite-item-shop-reset',
    title: 'When Does the Fortnite Item Shop Reset? (Time Zones)',
    excerpt:
      'Fortnite Item Shop refresh time: 00:00 UTC daily, converted to ET/PT/UK/EU, plus how to check today’s shop and About Shop in-game.',
    category: 'how-to',
    date: '2026-07-24',
    readTime: 6,
    featured: true,
    tags: [
      'when does fortnite item shop reset',
      'fortnite item shop refresh time',
      'what time does the item shop update',
      'fortnite shop reset utc',
      'item shop time et',
    ],
    content: `
## Short answer

Epic states the in-game Item Shop and Web Shop refresh at around **00:00 GMT / UTC** every day — one global rotation for everyone. Official article: [When does Fortnite’s Item Shop refresh?](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Gameplay/when-does-fortnite-s-item-shop-refresh-a000094323).

In the shop UI, open **About Shop** for Epic’s timezone notes if you are unsure.

Last reviewed: July 2026. Rare live events can delay a reset; trust the in-game clock if it disagrees with this page.

## Item Shop reset in your time zone

| Region / zone | Typical daily reset |
| --- | --- |
| UTC / GMT | 12:00 AM (midnight) |
| Eastern (ET) | 7:00 PM (previous calendar evening vs UTC day) |
| Central (CT) | 6:00 PM |
| Mountain (MT) | 5:00 PM |
| Pacific (PT) | 4:00 PM |
| UK (GMT/BST) | Midnight GMT; 1:00 AM during British Summer Time |
| Central Europe (CET/CEST) | 1:00 AM / 2:00 AM depending on DST |

Because the shop is **global**, players in the Americas often see the new rotation in the afternoon/evening, while Europe sees it overnight/early morning.

## How to see today’s shop immediately after reset

1. Wait for 00:00 UTC (or your local equivalent above).
2. Open Fortnite → **Item Shop**, or refresh the [Fortnite Item Shop tracker](/tools/item-shop) on this site.
3. Epic’s Web Shop also updates on the same cadence.

Wishlist mentally, then gift eligible items using [how to gift skins](/guides/how-to/how-to-gift-skins-fortnite).

## Does the shop reset twice a day?

Not as a standard rule. Some special tabs or event modules can update on different schedules, but the main Featured / Daily rotation is the midnight UTC refresh.

## FAQ

### What time does the Item Shop update in EST?

**7:00 PM Eastern** under standard offset from 00:00 UTC (watch daylight saving: Eastern shifts between EST/EDT, but Epic’s anchor stays UTC midnight).

### Why is my shop different from a friend’s?

It should not be — same global catalog. Cache / still loading after reset is the usual cause. Relog or wait a minute past 00:00 UTC.

### Can I refund something I panic-bought after reset?

Maybe — [Cancel Purchase / Return Tickets guide](/guides/how-to/how-to-refund-fortnite-skins).
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
