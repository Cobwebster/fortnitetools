export type Category = 'guides' | 'weapons' | 'building' | 'season' | 'tools' | 'map'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: Category
  image: string
  date: string
  readTime: number
  featured?: boolean
  tags: string[]
  content: string
}

export const categories: { id: Category; label: string; description: string }[] = [
  { id: 'guides', label: 'Guides', description: 'In-depth strategy guides for every skill level' },
  { id: 'weapons', label: 'Weapons', description: 'Weapon tier lists, stats, and comparisons' },
  { id: 'building', label: 'Building', description: 'Building techniques and edit courses' },
  { id: 'season', label: 'Season', description: 'Current season info, battle pass & patch notes' },
  { id: 'tools', label: 'Tools', description: 'Calculators, trackers, and interactive tools' },
  { id: 'map', label: 'Map', description: 'Map locations, loot spots, and hot drops' },
]

export const posts: Post[] = [
  // ─── BUILDING ──────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-building-guide-beginners',
    title: 'Fortnite Building Guide for Beginners: Master the Basics',
    excerpt:
      'Learn the fundamental building techniques every Fortnite player needs to know. From 90s to box fighting, this guide covers it all.',
    category: 'building',
    image: '/images/guide-building.png',
    date: '2026-07-20',
    readTime: 8,
    featured: true,
    tags: ['building', 'beginner', 'tips', '90s', 'box fight'],
    content: `
## Why Building Matters in Fortnite

Building is the core mechanic that separates Fortnite from every other battle royale. Instead of finding cover, you create it. A player who can build confidently will always have an advantage over one who cannot, regardless of aim or gun choice. If you only focus on one skill to improve, make it building.

## The Four Basic Structures

Every build in Fortnite comes from four pieces. Learn what each one does before trying to combine them.

1. **Walls** – Vertical panels that block incoming damage. Always place a wall before you shoot, heal, or reload.
2. **Ramps (Stairs)** – Diagonal structures for gaining height. High ground wins fights.
3. **Floors** – Horizontal platforms for crossing gaps and protecting against players below you.
4. **Roofs (Pyramids)** – Pyramid-shaped structures placed overhead to block shots from above.

## Your First Priority: The Wall Reflex

Before doing anything else, train yourself to instantly place a wall when you take damage. This one habit will save your life more than any other skill. In your settings, bind your wall to a key you can hit instantly — most players use Q or mouse thumb buttons.

## Essential Techniques for New Players

### The 1x1 Box
Build four walls around yourself and place a pyramid on top. This is your panic shelter. Edit a window or door to peek out, take a shot, and close it back. It costs only 40 wood but can completely reset a gunfight in your favor.

### Ramp Rushing
Build a ramp toward your opponent to gain high ground. Always place a wall behind each ramp section as you push — this protects the ramp from being shot out underneath you.

### The 90s (Gaining Height Fast)
The 90 technique lets you gain height quickly by rotating 90 degrees as you build. The basic pattern: place a floor, then a ramp, then a wall in front of you, then jump and turn 90 degrees and repeat. It sounds complicated but becomes automatic with practice.

### Edit Peeking
Build a wall, then edit a small window in the center. Shoot through it, immediately close the edit. Your opponent has almost no time to react. This is one of the most effective skills in box fights.

## Recommended Keybinds (PC)

- **Wall:** Q
- **Floor:** C or F5
- **Ramp:** Mouse Button 4 or V
- **Roof:** Mouse Button 5 or T
- **Edit:** G or F

On controller, use the bumpers for building pieces and edit with the right stick click or a back paddle if available.

## Where to Practice

The best way to improve building is in Creative mode. Search for "edit course" or "box fight practice" in the island browser. Spend 15–20 minutes a day in a build practice map and you will see improvement within a week. Team Rumble is also good because you can respawn freely and experiment without pressure.

## Common Beginner Mistakes

- **Only using wood** — Wood builds fastest but is the weakest material. Use brick or metal when you have time.
- **Not replacing walls** — When an opponent destroys your wall, immediately rebuild it. Never leave a gap.
- **Building too high without a floor** — Always place a floor before your next ramp level or a sniper can one-shot your feet.
- **Forgetting to edit back** – Leaving a window or door open in your box gives opponents a free shot. Always close your edits.
`,
  },
  {
    slug: 'fortnite-advanced-editing-techniques',
    title: 'Advanced Fortnite Editing Techniques to Outplay Any Opponent',
    excerpt:
      'Take your editing beyond the basics. Learn L-shapes, double edits, ghost peeks, and the pyramid reset to win close-range fights.',
    category: 'building',
    image: '/images/guide-building.png',
    date: '2026-07-12',
    readTime: 10,
    featured: false,
    tags: ['editing', 'advanced', 'box fight', 'double edit', 'ghost peek'],
    content: `
## Why Editing Is the Key to Winning Box Fights

Once two players are boxed up next to each other, the fight is decided almost entirely by who edits faster and smarter. Good aim matters, but a well-timed edit creates a shot that is almost impossible to dodge. This guide covers the edits you need at an intermediate-to-advanced level.

## The Ghost Peek

The ghost peek lets you shoot through a wall without fully committing to stepping out.

**How to do it:** Edit a small square (one tile, lower-center) in a wall. Crouch. Your crosshair will extend just past the wall, letting you aim and shoot. The opponent cannot easily shoot back because almost no part of your body is exposed. Cancel the edit to close the wall immediately after firing.

## The L-Shape Edit

Instead of a simple door or window, edit two adjacent tiles in an L pattern. This creates a wider opening with a corner that gives you more body cover while peeking around the side.

**Why it works:** You are harder to hit because your body is partially behind the unedited part of the wall, while you still have a clear shot at a large portion of your opponent.

## Double Editing

Double editing means editing two pieces in rapid succession — typically the wall in front of you and the floor beneath an opponent simultaneously, or editing your front wall and then a side wall within less than a second.

This is an advanced technique because it requires precise muscle memory. Build a dedicated practice map routine where you edit two pieces repeatedly until the sequence feels automatic.

## The Pyramid Reset

When you are inside a box and your pyramid (roof) gets destroyed, your box is open and you are vulnerable. The pyramid reset is placing a new pyramid instantly as it is destroyed — or placing and immediately editing it to create an angled gap for a downward shot.

**Setup:** Place a pyramid, stand on top, edit the lower two tiles of one side open to create a ramp-shaped gap. This lets you shoot down into an opponent below while remaining mostly covered.

## The Floor Peek

Edit the corner tile of a floor panel. Stand in that corner. You can shoot downward at an enemy below you while the unedited floor still covers most of your body. Very effective after ramp-rushing to high ground.

## Build Your Own Edit Course

To get fast enough for these techniques to matter, practice daily. A typical 20-minute session: 5 minutes on basic edits (wall, floor, pyramid), 10 minutes on L-shapes and ghost peeks, 5 minutes on double edits. Consistency over a few weeks will make a massive difference.
`,
  },

  // ─── WEAPONS ───────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-best-weapons-tier-list-2026',
    title: 'Fortnite Best Weapons Tier List (2026) – Every Gun Ranked',
    excerpt:
      'Our complete weapon tier list ranks every gun in Fortnite from S-tier game-changers to F-tier pickups you should leave on the ground.',
    category: 'weapons',
    image: '/images/guide-weapons.png',
    date: '2026-07-18',
    readTime: 12,
    featured: true,
    tags: ['weapons', 'tier list', 'meta', 'assault rifle', 'shotgun'],
    content: `
## How This Tier List Works

Weapons are ranked based on four factors: damage output, reliability (low spread, consistent hit registration), availability in matches, and how well they perform across different ranges and skill levels. The current patch is used as the basis for all rankings.

## S-Tier — Pick Up Every Time

### Assault Rifles
- **Striker AR** — The most reliable rifle in the game. Accurate at medium range, manageable recoil, and available in most matches. If you see one, take it.
- **Havoc Suppressed AR** — Deals excellent damage and the suppressor makes it harder for opponents to pinpoint your location. Ideal for aggressive plays.

### Shotguns
- **Thunderbolt Shotgun** — Devastating close-range burst. One well-placed shot can eliminate most players from full shields. Essential for box fights.

### SMGs
- **Striker SMG** — Extremely high fire rate with good accuracy while moving. The best weapon for run-and-gun pressure.

## A-Tier — Strong Choices

- **Hammer Assault Rifle** — High burst damage per shot but requires good aim to use at its full potential.
- **Combat SMG** — Slightly lower damage than the Striker SMG but excellent at close range.
- **Heavy Sniper Rifle** — Can break structures in one shot and deal massive headshot damage. Rewarding for accurate players.
- **Shockwave Grenade** — Not a weapon but S-tier utility. Repositions you or launches opponents out of cover.

## B-Tier — Solid but Situational

- **Ranger Pistol** — Surprisingly effective at medium range, especially with the DMR-style zoom. Good as a secondary.
- **Burst AR** — High burst damage but the pause between bursts can get you killed in close fights.
- **Dragon's Breath Shotgun** — Deals fire damage over time, useful for flushing opponents out of structures.

## C-Tier — Use Only If Nothing Better Is Available

- **Hunting Rifle** — No scope, bullet drop, very high skill ceiling. Punishing for inconsistent aimers.
- **Flint-Knock Pistol** — The knockback is fun but the damage is too low to justify using over almost anything else.

## D-Tier — Leave on the Ground

- **Common Pistol** — Low damage, limited range, poor accuracy. Only useful at the very start of a match before anything else is found.

## Building Your Loadout

The ideal Fortnite loadout is: one AR, one shotgun, one SMG, one healing item, one utility item (grenades, shockwaves, or medkits). Adapt to what the game gives you and always prioritize higher-rarity versions of your preferred weapons.
`,
  },
  {
    slug: 'fortnite-shotgun-guide-best-options',
    title: 'Fortnite Shotgun Guide: Which Shotgun Should You Use?',
    excerpt:
      'Shotguns win close-range fights in Fortnite. This guide breaks down every current shotgun, how they handle, and which one suits your playstyle.',
    category: 'weapons',
    image: '/images/guide-weapons.png',
    date: '2026-07-03',
    readTime: 7,
    featured: false,
    tags: ['shotgun', 'weapons', 'close range', 'box fight', 'loadout'],
    content: `
## Why Shotguns Are Essential in Fortnite

Fortnite's close-range meta is built around shotguns. Most final circles and box fights are decided by who connects their shotgun shot first. Even if you prefer an AR-focused playstyle, carrying a shotgun gives you a reliable option when an opponent pushes into your box.

## Current Shotgun Options

### Thunderbolt Shotgun
The current top-tier shotgun. Fires a tight spread of pellets with consistent damage. The gold (legendary) version can deal over 200 damage at point-blank range on a headshot. Pump-style fire means one careful shot followed by a quick build is the core usage pattern.

**Best for:** Box fighters, players who like trading shots with precision.

### Striker Pump Shotgun
A classic pump-action feel. Lower fire rate than automatic options but each shot deals more damage. Rewards players who can hit their first shot and immediately build after.

**Best for:** Experienced players comfortable with the pump timing.

### Maven Auto Shotgun
Automatic shotgun with a higher fire rate. Lower per-shot damage but forgiving if you miss the first pellet. Good for spraying during a push.

**Best for:** Aggressive players who like sustained close-range pressure.

### Dragon's Breath Shotgun
Sets opponents (and their structures) on fire. The fire damage continues ticking for several seconds after the shot. Useful for forcing opponents out of wood structures.

**Best for:** Players who want to pressure builders out of their boxes.

## Shotgun Fundamentals

- **Aim for center-mass, not the head at close range.** Shotgun pellet spread at very close range means a chest shot will land more pellets reliably than trying for a precise headshot.
- **Build after every shot.** Place a wall between you and your opponent while you wait for the shotgun to cycle. This prevents them from retaliating.
- **Never run shotgun only.** Pair with an SMG for targets just outside shotgun range.

## Which Shotgun Should You Choose?

- New to Fortnite? **Maven Auto Shotgun** — forgiving fire rate.
- Intermediate player? **Striker Pump** — trains you to value each shot.
- Competitive/experienced? **Thunderbolt** — highest ceiling when mastered.
`,
  },

  // ─── MAP ───────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-loot-guide-best-spots',
    title: 'Best Loot Spots & Drop Locations in Fortnite (Season Guide)',
    excerpt:
      'Find the hottest drop spots with the best loot quality. We rank every named location so you know exactly where to land each match.',
    category: 'map',
    image: '/images/guide-loot.png',
    date: '2026-07-15',
    readTime: 7,
    featured: false,
    tags: ['loot', 'map', 'drop locations', 'named locations', 'hot drops'],
    content: `
## How to Choose Where to Land

Your drop location sets the tone for the entire match. A good drop gives you weapons quickly, enough loot to build a strong loadout, and a clear rotation path toward the safe zone. A bad drop leaves you running with no shield and a common pistol while the zone closes.

Consider three things when picking a drop: how close is it to the bus path (closer = more competition), how many chests are in the area, and where does the zone typically pull you during endgame.

## Hot Drops — High Risk, High Reward

Hot drops are named locations directly under or near the battle bus path. Expect heavy competition from the moment you land. These spots reward confident fighters who can grab one weapon and immediately engage.

**Why drop hot?**
- Fast eliminations fill your materials and give better loot early
- Forces you to improve under pressure
- Quest objectives often point here

**When to avoid:** If you are still learning the game or need a calmer match to practice building, skip hot drops until your combat is more confident.

## Mid-Tier Drops — Reliable Loot, Moderate Competition

These are named locations slightly off the main bus path. You will typically land with two or three other players, get a chest or floor loot quickly, and have time to build a proper loadout.

Look for locations that have:
- 3–5 chests in a compact area
- A vehicle or launch pad for fast rotation
- Cover like buildings or natural terrain

## Safe Drops — Rotation-Focused Landing

Landing at the edge of the map or at unnamed locations (farms, small camps, isolated buildings) gives you near-guaranteed loot with minimal contest. The trade-off is you will need to rotate earlier and may be low on materials.

**Best for:** Players practicing endgame, quest completions, or warming up.

## Loot Priority on Landing

1. **Any weapon** — before anything else, grab any weapon in case someone is nearby.
2. **Shields** — small shields first (adds 50 shield), big shields (adds 50 more to max 100).
3. **Ammo** — grab more than you think you need. You will use it.
4. **Heals** — medkits, bandages, or campfires.
5. **Upgrade upgrades** — if you find a bench, upgrade your best weapon to gold before leaving.

## Reading the Zone

Always open your map at the start of the match to see the first circle. Your rotation plan should be set before you even land. Give yourself a 2-zone buffer — start moving when there are still two circles left before yours closes. Caught outside the zone while looting is one of the most common causes of early elimination.
`,
  },
  {
    slug: 'fortnite-map-all-locations-guide',
    title: 'Complete Fortnite Map Guide: Every Named Location Explained',
    excerpt:
      'A detailed breakdown of every named location on the current Fortnite map. Learn the layout, best loot routes, and rotation paths.',
    category: 'map',
    image: '/images/guide-map.png',
    date: '2026-07-08',
    readTime: 15,
    featured: false,
    tags: ['map', 'locations', 'rotation', 'POI', 'named locations'],
    content: `
## Reading the Fortnite Map

The Fortnite island changes with every season, but the fundamentals of reading the map stay the same. Named locations (POIs — Points of Interest) appear as labels on the map. Each has a distinct layout, a typical chest count, and a general competitive level.

Understanding the map means knowing not just where to drop, but how to move across it. Rotation — the act of moving from your landing zone toward the safe circle — is one of the most important skills in the game.

## Named Location Breakdown

### Coastal and Shore Locations
Locations near the coast typically have less competition because they are harder to reach from the middle of the island. They often have good chest counts with fewer players contesting them. The trade-off is that rotation can be challenging if the zone pulls inland.

**Tip:** Land coastal when the bus path goes across the island from one coast to the other — you will be far off the path and likely land alone.

### Central Locations (High-Traffic POIs)
The center of the map is always contested because the zone circles frequently over the middle. These locations offer high-tier loot but intense fights. Players who land here need to win early fights or rotate out quickly.

### Elevated Terrain Locations
Locations on hills or high ground offer a built-in advantage — you can see across long distances and snipe incoming players. However, they can also be surrounded, so always plan an escape route down.

## Rotation Fundamentals

### Storm Damage Values
- Early game: 1 damage per second
- Mid game: 3–5 damage per second
- Late game: 10–25 damage per second

Do not rely on healing through storm damage in late circles. One caught rotation in the final five can end your match.

### Using Vehicles
Cars, dirt bikes, and ATVs can speed up rotation dramatically. Learn where vehicles spawn near your drop location — this single piece of map knowledge can save a run every few matches.

### Launch Pads and Rift-to-Gos
Always carry a mobility item if you can. Launch pads allow you to glide from any height and cover large distances quickly. Rift-to-Gos create an instant rift anywhere on the map, letting you teleport and glide out of danger.

## Zone Prediction

Experienced players learn to predict where the zone will circle. The circle always moves toward the exact center of the current safe zone. If the zone is pulling toward the northwest, start your rotation slightly early to get ahead of other players — arriving in zone before opponents means you own the high ground.

## Tips for Map Awareness

- **Always have the minimap visible.** Resize it in settings so it is large enough to read without opening the full map.
- **Track storm sounds.** The storm makes a distinct audio cue as it closes. If you hear it getting louder, check your position.
- **Mark a path, not just a destination.** When you set a waypoint, think about the terrain and buildings on the way there, not just where you are going.
`,
  },

  // ─── SEASON ────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-season-battle-pass-guide',
    title: 'Fortnite Season Battle Pass: All Rewards & How to Level Up Fast',
    excerpt:
      'Everything you need to know about this season\'s battle pass. All rewards revealed, fastest XP methods, and tips for hitting level 100.',
    category: 'season',
    image: '/images/guide-season.png',
    date: '2026-07-10',
    readTime: 10,
    featured: false,
    tags: ['battle pass', 'season', 'XP', 'level up', 'rewards'],
    content: `
## What Is the Fortnite Battle Pass?

The Battle Pass is a seasonal progression system that costs 950 V-Bucks (roughly $7.99 USD) and unlocks a series of cosmetic rewards as you earn XP. Each season typically runs 10–12 weeks and includes around 100 tiers of rewards.

Rewards include character skins, back blings, pickaxes, gliders, wraps, loading screens, emoticons, and V-Bucks. The V-Bucks earned in the pass — typically 1,500 V-Bucks total — effectively cover the cost of next season's pass if you reach the relevant tiers.

## Battle Pass vs. Free Pass

Every player gets the Free Pass automatically. This includes a smaller set of rewards that unlock at specific levels. The paid Battle Pass unlocks every level reward, including the main character skins and the bonus V-Bucks.

## How XP Works

Fortnite uses a single XP track. Every XP you earn goes toward leveling up, and each level unlocks the next reward in the pass. Here is how XP is distributed:

- **Quests** — The biggest XP source. Complete daily quests (smaller XP) and weekly quests (large XP) every week.
- **Milestone Quests** — Long-running objectives like eliminations or distance traveled. Complete these passively over time.
- **Match XP** — Earned for placements (surviving longer), eliminations, and assists.
- **Creative XP** — Playing Creative maps still earns XP, though at a capped rate per day.

## Fastest Ways to Level Up

### 1. Complete All Weekly Quests First
Weekly quests refresh every Thursday. Each one awards significant XP. Complete them immediately when they drop — do not save them. Seven weeks of weekly quests alone can get you to level 100 in most seasons.

### 2. Stack Daily Quests
You can hold up to three daily quests at once. If a daily quest is easy (deal damage, visit locations), complete it immediately to make room for another. If it requires a mode you are not playing, let it expire rather than playing a mode you dislike.

### 3. Play During Double XP Events
Epic Games runs Double XP weekends several times a season. Save your Creative session or a long play session for these windows — the XP multiplied during events is substantial.

### 4. Use a Full Squad
Fortnite awards small XP bonuses for playing with friends in a full squad. Over an entire season this adds up to one or two extra levels.

## Reaching Level 100 Without Paying Extra

If you want every Battle Pass reward including the final skin styles, you need to reach level 100. With consistent weekly quest completion, you should hit this in roughly 6–8 weeks of regular play. You do not need to play every day — just keep up with the weekly quest reset.

## Should You Buy the Battle Pass?

If you play at least two or three times a week during a season, the Battle Pass is good value. You earn back more V-Bucks than you spend, and the cosmetic rewards are tied to each season and never return to the shop. If you play casually (once or twice a month), the free pass is sufficient.
`,
  },

  // ─── TOOLS ─────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-sensitivity-settings-calculator',
    title: 'Fortnite Sensitivity Settings Guide: Find Your Perfect Setup',
    excerpt:
      'Too slow or too fast? This guide walks you through finding your ideal Fortnite sensitivity settings for both mouse & controller so you can aim more consistently.',
    category: 'tools',
    image: '/images/guide-weapons.png',
    date: '2026-07-14',
    readTime: 9,
    featured: false,
    tags: ['settings', 'sensitivity', 'aim', 'controller', 'mouse', 'tools'],
    content: `
## Why Sensitivity Settings Matter

Your sensitivity setting controls how fast your crosshair moves relative to your physical mouse or stick movement. Too high and you overshoot targets. Too low and you cannot track fast-moving players. Finding the right balance is one of the most impactful things you can do outside of pure aim practice.

## Mouse Sensitivity (PC)

Fortnite uses two separate sensitivity values for mouse:

- **Sensitivity X/Y** — Controls camera movement during normal gameplay (building, moving around).
- **Targeting Sensitivity** — Controls how fast you look when aiming down sights (ADS). Usually lower than your regular sensitivity.
- **Scope Sensitivity** — For scoped weapons. Many players lower this further for precision.

### Where to Start

A common starting point for most PC players: 0.07–0.12 on X/Y sensitivity with 800 DPI on your mouse. Multiply these to get your effective DPI (eDPI). Most competitive players sit between 500–1000 eDPI.

**Formula:** Sensitivity × Mouse DPI = eDPI

If you are over 1500 eDPI you are likely overshooting. If you are under 300 eDPI you may be too slow for close-range fights.

### How to Find Your Sensitivity

1. Set your sensitivity to a moderate starting point.
2. Open a Creative aim training map (search "aim training" in Creative).
3. Try to track moving targets for 10 minutes.
4. If you consistently overshoot, lower by 10%. If you feel sluggish, raise by 10%.
5. Repeat until tracking feels natural.
6. Do not change it again for at least two weeks — your muscle memory needs time to adapt.

## Controller Sensitivity

Controller uses a similar but distinct system:

- **Look Sensitivity** — How fast you turn during normal play.
- **ADS Sensitivity** — How fast you aim down sights.
- **Build Mode Sensitivity Multiplier** — Many controller players raise this to look around quickly while building.

### Starting Point for Controller

- Look Sensitivity: 7–9 (out of 10)
- ADS Sensitivity: 5–7
- Build Mode Multiplier: 1.5–2.0

Linear is generally recommended over Exponential input curve for new players because the stick response is more predictable.

## Deadzone Settings

The deadzone controls how much you move the stick before the camera starts moving. If your controller has stick drift, raise the deadzone slightly. If it feels sluggish in the center, lower it.

Most players use a deadzone of 0.10–0.15. Going lower increases the chance of drift-induced camera movement.

## Confirm Your Settings, Then Stop Changing

The biggest mistake players make is constantly adjusting sensitivity. Pick a setting, stick to it for 2–3 weeks minimum, and practice. Sensitivity "feeling off" is usually just unfamiliarity, not an actual problem. Trust the process and let your muscle memory build.

## Visual Settings for Competitive Play

While not sensitivity-related, these visual settings improve your competitive performance:

- **3D Resolution:** 100% (lower only if framerate is badly impacted)
- **View Distance:** Far (see players and vehicles at longer distances)
- **Shadows:** Off (makes enemies easier to see in dark areas)
- **Anti-Aliasing & Post Processing:** Low or Off (cleaner image, higher frames)
- **Textures:** Medium (balance of clarity and performance)
`,
  },
  {
    slug: 'fortnite-tracker-how-to-check-stats',
    title: 'How to Check Your Fortnite Stats with a Tracker',
    excerpt:
      'Track your K/D ratio, win rate, kills per match, and more. Here are the best Fortnite stat tracker tools available and how to use them.',
    category: 'tools',
    image: '/images/guide-season.png',
    date: '2026-07-01',
    readTime: 5,
    featured: false,
    tags: ['stats', 'tracker', 'K/D', 'win rate', 'tools', 'fortnite tracker'],
    content: `
## Why Track Your Fortnite Stats?

Tracking your stats gives you objective data about your performance. Instead of guessing whether you are improving, you can measure your kill-death ratio, average placement, win rate, and kills per match over time. This turns vague feelings about your game into measurable targets.

## What Stats Matter Most

### Kill/Death Ratio (K/D)
Your K/D is kills divided by deaths (or matches entered). A K/D above 1.0 means you are eliminating more players than you are being eliminated by on average. For most players, improving K/D comes from better positioning, not just better aim.

### Win Rate
Win rate is the percentage of matches where you finish in first place. For casual players, 1–3% is average. Players above 10% are playing at a high level.

### Kills Per Match
This tells you how aggressive you are. A high K/D but low kills per match might mean you are surviving by avoiding fights — which is a valid strategy but limits overall improvement.

### Average Placement
How high you finish on average. This reflects your survival skills and zone management as much as combat.

## Best Fortnite Stat Trackers

### Fortnite Tracker (tracker.gg/fortnite)
The most popular and feature-rich tracker. Search any player's Epic username to see their full stats breakdown, including per-season history, ranked stats, recent matches, and comparison tools. Free to use.

### Fortnite.gg
A comprehensive site that also tracks the current shop, patch notes, weapon stats, and in-game news alongside player statistics.

### In-Game Stats
Fortnite's own stats screen (accessible from the lobby) shows your career stats for Battle Royale, Zero Build, and Ranked modes. Useful for a quick glance but less detailed than third-party trackers.

## How to Use Your Stats to Improve

1. **Identify your weakness.** Low average placement? Focus on zone rotation. Low kills? Work on aggression and aim. High deaths per match? Work on building and cover usage.
2. **Set a weekly target.** For example: increase K/D from 0.8 to 1.0 this month. Having a specific number makes practice feel purposeful.
3. **Track after every 20–30 matches.** Daily swings are too noisy. Look at trends over larger sample sizes.

## Note on Privacy

Fortnite stats are public by default. If you do not want your stats to appear in trackers, you can set your account to private in the Epic Games account settings. Note this also hides your progress from your friends.
`,
  },

  // ─── GUIDES ────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-tips-win-more-games',
    title: '10 Fortnite Tips That Will Help You Win More Games',
    excerpt:
      'Practical, actionable tips covering rotations, zone awareness, low-ground vs high-ground, and endgame strategy to improve your win rate.',
    category: 'guides',
    image: '/images/guide-building.png',
    date: '2026-07-05',
    readTime: 6,
    featured: false,
    tags: ['tips', 'strategy', 'win', 'endgame', 'rotation'],
    content: `
## 1. Always Build a Wall Before You Shoot

The most basic habit that separates new players from experienced ones: place a wall the instant you take damage. One wall can block a shot that would otherwise eliminate you, giving you time to heal, reposition, or return fire.

## 2. Manage Your Mats — Do Not Waste Wood

Wood builds fastest but breaks fastest. Use wood for emergency protection in the heat of a fight. Use brick and metal for structures you want to hold for more than a few seconds, especially in endgame. Farm materials throughout the match — aim for 500+ of each type before late game.

## 3. Learn One Drop Spot Well

Trying a new location every match means you constantly have incomplete knowledge of chest spawns, loot routes, and rotation paths. Pick one location and play it 15–20 times. You will land faster, loot faster, and rotate better than anyone who drops there blind.

## 4. High Ground Is Not Always High Ground in Fortnite

While having natural high ground (hills, buildings) is good, it matters less in Fortnite than in shooters without building. Being on a tall ramp 10 stories up is dangerous — one person can shoot it out from below. Maintain height but always have a floor under your ramp and a wall behind you.

## 5. Know the Three Storm Damage Phases

- **Early storm:** 1 damage per second. You can run through it briefly.
- **Mid storm (circles 3–5):** 5–10 damage per second. Only push through with a medkit or bandage bandolier.
- **Late storm:** 25+ damage per second. Do not get caught outside.

## 6. Use Healing Items in Order

When you are damaged, use small shields first if you are below 50 shield, then bandages or big shields. A medkit (full HP restore) should be saved for when you are critically low, not used for 10 points of damage.

## 7. Third-Partying Is a Legitimate Strategy

When you hear a fight nearby, move toward it but do not engage until both players are weakened. Let them trade damage, then push the survivor when they are low and likely to be reloading. Third-partying is not unfair — it is smart resource management.

## 8. Do Not Push a Box You Cannot Win

If an opponent has fully enclosed themselves in a solid box at your level, pushing it directly is dangerous. Instead, try to build above them (pyramid on top of their box), zone them with grenades or fire, or wait for them to edit out and punish their peek. Patience wins more fights than aggression alone.

## 9. Prioritize Storm Readiness Over Extra Loot

One of the most common mid-rank mistakes: staying to loot one more chest and getting caught in the storm. When the zone is closing and you are not in it, stop looting and rotate. Extra mats are useless if you get storm damage eliminated.

## 10. Play a Warm-Up Round Before Your Best Sessions

Your first match of the day is usually your worst. Play Team Rumble or a Creative deathmatch for 10–15 minutes to wake up your aim and build reflexes before jumping into regular matches. Your consistency in sessions two and three will noticeably improve.
`,
  },
  {
    slug: 'fortnite-ranked-mode-guide',
    title: 'Fortnite Ranked Mode Guide: How to Climb and Reach Champion',
    excerpt:
      'Everything you need to know about Fortnite Ranked — how the rank system works, how LP is earned, and the strategies that actually work for climbing.',
    category: 'guides',
    image: '/images/guide-season.png',
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
| Champion | Top 1% of the player base. Full competitive-level mechanics. |
| Unreal | Top 500 or top players globally. Professional-level gameplay. |

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

- **Dropping hot in Ranked** — Hot drops are fine in casual. In Ranked, early deaths cost significant LP. Drop safe.
- **Ignoring placement for kills** — Kills feel satisfying, but a top-5 finish with one elimination earns more LP than a top-20 finish with five.
- **Playing while tilted** — Log off after two or three losing matches in a row. Tilted sessions are where ranks are lost.
- **Using a casual loadout in Ranked** — Always prioritize heals and mobility in Ranked. You need them for safe rotations and endgame survival.
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
