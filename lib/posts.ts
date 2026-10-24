export type Category = 'how-to' | 'weapons' | 'season' | 'map'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: Category
  /** Cover art — official Epic loading screen / MOTD / item render when we have one */
  image?: string
  date: string
  readTime: number
  featured?: boolean
  /** Runners / historical guides — keep online, keep out of the index. */
  noindex?: boolean
  tags: string[]
  content: string
}

export const categories: { id: Category; label: string; description: string }[] = [
  {
    id: 'how-to',
    label: 'How-To',
    description:
      'Admin Panel codes, refunds, 2FA, creator codes — the account steps that actually matter in-game.',
  },
  {
    id: 'weapons',
    label: 'Weapons',
    description:
      'Override loot notes plus older Runners tier lists labeled by season. Build a hotbar in the loadout tool when you are picking fights.',
  },
  {
    id: 'season',
    label: 'Season',
    description:
      'Battle Pass timing, Match Overrides, ranked climb habits, and free reward windows for Override.',
  },
  {
    id: 'map',
    label: 'Map',
    description:
      'Green Hill Zone and returning POI drop notes. Reality’s Reign and Stone Sanctum live on the interactive map until they get their own pages.',
  },
]

/** Guides that have translated locale twins. English keeps the full corpus. */
export const localizedGuideSlugs = [
  'how-to-refund-fortnite-skins',
  'how-to-redeem-fortnite-code',
] as const

export const posts: Post[] = [
  // ─── OVERRIDE (C7S4) — Oct 2026 ────────────────────────────────────────────
  {
    slug: 'fortnite-v42-40-last-override-patch',
    title: 'Fortnite v42.40 — Last Override Patch Before Season End',
    excerpt:
      'What actually shipped on 15 October 2026: new Loot Hacks, Midas and Witch Broom vaults, Sweeper fire-rate bump, Honey / One Wish Willow Sprites, Like-for-Like pickups, and a last-week checklist before November 1.',
    category: 'season',
    image: '/images/guides/horror-here.jpg',
    date: '2026-10-24',
    readTime: 11,
    featured: true,
    tags: [
      'fortnite v42.40',
      'fortnite override patch',
      'fortnitemares 2026',
      'midas masterpiece vaulted',
      'loot hacks',
      'chapter 7 season 4 end',
      'sweeper shotgun',
    ],
    content: `
## This is the last Override content drop

**v42.40** went live **15 October 2026**. Epic’s notes call it the final Battle Royale update of Chapter 7 Season 4. Fortnitemares and the Override Battle Pass both still read **through 1 November 2026, Eastern Time**. There is no published hour. Treat the evening of 31 October as the practical deadline if you are in US time zones, and check the in-game Passes tab the day of.

This page is the “so what” for that patch — not a paste of the notes. Season sheet: [Override hub](/season). Clock: [countdown](/season-countdown). Loot numbers: [weapon changes](/weapon-changes).

Last reviewed: **24 October 2026**.

## Loot Hacks this week (not floor loot)

Sprite Dust still buys a Loot Hack that rewrites **your next chests**, not the whole lobby’s floor spawns. v42.40’s board:

| Hack | What it is |
| --- | --- |
| **Thorne’s Vampiric Blade** | Mythic melee return |
| **Finger Guns** | Joke hitscan from earlier Chapter 7 |
| **Gatekeeper Shotgun** | 3-shell shotgun |
| **Hunting Rifle** | Single-shot DMR / sniper feel |
| **Slap Splash** | Slap heal throw |
| **All Sprite Variants** | Lets hacked chests spit Sprite styles |

If you never open the Hack menu, you can play a whole session without seeing Gatekeeper or Finger Guns. That is expected. Floor pool is still Pump / 8-Bit / Sweeper / Heavy AR / Wood Stake / Dual Fiend Hunters / Mega Buster plus Fortnitemares extras like Bonerattler and Freddy’s Nightmare.

## What left the island

**Vaulted in v42.40**
- **Midas’ Masterpiece** — the 1-ammo Mythic pistol from Override launch. Headshot deletes are gone unless it comes back later.
- **Witch Broom** — Fortnitemares pocket mobility from v42.30, already pulled.
- **Match Overrides:** Super Shot, Big Boom, Action Hero, Healing Overdrive.

**Already vaulted in Fortnitemares v42.30 (1 Oct)** — still gone: Drum Gun, Ranger Assault Rifle, Tetris Rift.

Do not copy a loadout screenshot from early October that still has Drum + Midas. The [loadout builder](/tools/loadout-builder) presets were rebuilt for this pool.

## Sweeper Shotgun

Epic’s line is “slightly increased fire rate.” They did not publish a new shots-per-second sheet. We log it as a relative buff on [weapon changes](/weapon-changes) and keep the pre-patch encyclopedia rate until a datamine is honest. Confirm the in-game inspect screen if you are theory-crafting STK.

Sweeper is still the auto shotgun next to Pump and 8-Bit — not a replacement for first-shot Pump in boxes.

## New Sprites

- **Honey Sprite** (Design-A-Sprite winner) — ranged hits can spawn bees at the impact point.
- **One Wish Willow Sprite** (Obsession collab) — steal equipped Sprites on elim and shove nearby players when you take damage. Removing it marks you on the map.

Sprite Mastery’s **last page** is unlocked: extra **Quack Sprites** and a **Pixel Polli** style. Quack feeds bonus Sprite XP to everything you are carrying. Finish that page this week; mastery does not roll into Season 5.

## Like-for-Like weapon upgrades (easy to miss)

Walk over a **higher rarity of the same gun** you are holding and, if **Settings → Game → Combat → Auto Pick Up Weapons** is on, the client swaps you up automatically. That is the whole feature. It does not grab a different weapon off the floor. Turn it off if you hate surprise swaps in a box.

## Match Overrides after the vaults

Consoles still exist. Four combat cartridges are gone. Fortnitemares ones (**Spooky Sprinter, Berserk, Spooky Prop Hunt, More Health, Pumpkin Launching, Sugar Rush**) can still roll. Playbook: [Match Overrides explained](/guides/season/fortnite-match-overrides-explained). Competitive / tournament playlists often strip the mechanic — read the tile.

## Last-week checklist (24 Oct → 1 Nov)

1. **Battle Pass** — unclaimed free-track and premium pages lock. Use the [XP calculator](/xp-calculator). Do not buy tiers on 31 Oct hoping a style appears.
2. **Jack-a-Nape** — 26 Nitemare quests across BR, Horde Rush, and Reload. Outfit is at 26. [Free cosmetics](/free-cosmetics).
3. **Jimothy Sidekick** — extract a Dumpster Dive Sprite. [How-to](/guides/how-to/how-to-get-jimothy-fortnite).
4. **Prophetic Tapestry** — login claim during Fortnitemares.
5. **Null ranked styles** — Champion / Elite / Unreal. [Null guide](/guides/how-to/how-to-get-null-ranked-rewards-fortnite).
6. **Sprite Mastery last page** — Quack + Pixel Polli.
7. **Admin Panel** — remaining Lobby Hack codes. Never V-Bucks. [Admin Panel how-to](/guides/how-to/fortnite-admin-panel-lobby-hack-codes).

## What we are not inventing

Epic has **not named** Chapter 7 Season 5 on the Battle Pass page or in the v42.40 notes. A giant pirate chest east of Sunken Shores is a landmark, not a leak we will treat as a POI guide. When the next season has a public name, the [season hub](/season) gets a new review date — not a speculative island essay the week before.

## FAQ

### Is Override over on 31 October or 1 November?

Epic’s Battle Pass page: **1 November 2026, Eastern Time**, no hour. Community wikis often print 31 October because early-morning Eastern cutoffs land on the previous calendar day out west. Check the Passes tab.

### Did the map change in v42.40?

No named-POI flip. Green Hill Zone, Reality’s Reign, and Stone Sanctum are still the new names. [Live map](/fortnite-map).

### Is Midas’ Masterpiece coming back?

Not in this patch. Vault means vault. We will un-hide it on the weapons page if Epic returns it — we will not keep it in the live loadout picker “just in case.”
`,
  },
  {
    slug: 'how-to-get-jimothy-fortnite',
    title: 'How to Get Jimothy in Fortnite (Free Dumpster Dive Sidekick)',
    excerpt:
      'Jimothy is a free Fortnitemares raccoon Sidekick. Find any Dumpster Dive Sprite, extract it at a physical Extraction Site, then grab him in the Locker before 31 October 2026.',
    category: 'how-to',
    image: '/images/guides/jimothy.png',
    date: '2026-10-24',
    readTime: 7,
    featured: true,
    tags: [
      'how to get jimothy fortnite',
      'jimothy fortnite',
      'jimothy sidekick',
      'dumpster dive sprite',
      'fortnitemares 2026',
      'extract a silly little guy',
      'nightmare neighborhood',
    ],
    content: `
## What Jimothy actually is

**Jimothy** is an Uncommon **Sidekick** — a raccoon that follows you, not a skin, not a Sprite you equip in the hotbar, and not a Battle Pass page. Epic’s locker line is “Looks like a Jimothy.” He shipped with Fortnitemares **v42.30** (1 October 2026) as **Companion_ScrapPaws**. You cannot buy him with V-Bucks during the event.

The unlock is a hidden quest players have been calling **Extract A Silly Little Guy**. It does not always sit in the regular quest list. Completing it once is enough.

Last reviewed: **24 October 2026**. Fortnitemares freebies on this site run **through 31 October 2026**. Override itself still reads **1 November 2026, Eastern Time**. Do this match this week. Tracker: [free cosmetics](/free-cosmetics). Season sheet: [Override hub](/season).

## How to unlock Jimothy (one match)

1. Queue **Battle Royale or Zero Build pubs** (not Creative). Ranked can be picky with Fortnitemares toys — pubs is the clean run.
2. Find a **Dumpster Dive Sprite** (any variant — Gold, Loot Hacker, Bounty Hunter, Trick or Treat, Cheat Master all count as long as the name includes Dumpster Dive / Diver).
3. Carry it to a **physical Extraction Site** on the map. Finish the extract there.
4. Survive until the extract actually completes. Dying with the Sprite still on you does not count.
5. Back in the lobby, open **Locker → Sidekicks**. Jimothy should be sitting there. Equip him.

Do **not** treat a Portable Extractor as a guaranteed shortcut. Independent write-ups that actually tested the hidden quest say the handheld extract plays the animation and **does not** grant Jimothy. If you already used a Portable Extractor and he is missing from the locker, run it again on a real pad.

## Where Dumpster Dive Sprites spawn

There is no shop listing. You have to find one in a match.

**Most reliable farm:** land **Nightmare Neighborhood**, kill **Freddy Krueger**. Coverage is consistent that he drops a Dumpster Dive Sprite. If the boss marker is missing, he can be disguised as another character in the POI — interact / shoot the suspicious NPC instead of rotating out empty. That POI is contested. Have a rotate.

**If you skip the boss:**

- **Pumpkin Chests** (Fortnitemares giant pumpkins)
- **Cheat Codes / Trick or Treat** terminals around the island
- Regular chests and floor Sprite luck (thin — do not plan a whole session on this)

Any Dumpster Dive variant works. You do not need a gold foil.

Admin Panel **Extraction Accelerators** (Lobby Hack codes) make the pad less of a third-party magnet. They do not spawn the Sprite for you. Codes: [Admin Panel how-to](/guides/how-to/fortnite-admin-panel-lobby-hack-codes).

## Extract without throwing the unlock

Public Extraction Sites still advertise on the map (beacon / pad). Clear the area **before** you hit the terminal. The defend window is loud. If the first pad is cooked, rotate with the Sprite — do not Portable-extract “just to be safe” if you came for Jimothy.

Winning the match with the Sprite still on you is reported as a backup by some players. We are not treating that as the main path. The path we will tell you to use is a **physical site**.

The older [Sprite extract guide](/guides/how-to/how-to-extract-sprites-fortnite) is a **Runners (C7S3) archive** for timers and pad etiquette. Use it for the idea of “sites unlock after early storm / one use per pad.” Trust the live Override HUD for the current timer.

## After he is in the locker

Jimothy is a Sidekick, so he lives on the **Sidekicks** tab, not Outfits. Equip him there. Extra reactions / a follow-up Sidekick quest can appear in-client after the unlock — we will not invent a points sheet. If the raccoon is in the locker, you already got the trending reward.

## Last-week honesty

From **24 October** you have **days**. Fortnitemares is the window. We are **not** promising Epic will sell Jimothy in the Item Shop after 31 October. If you want him free, extract this week.

Same-week freebies: [Jack-a-Nape quests and login tapestry](/free-cosmetics) · [Null ranked](/guides/how-to/how-to-get-null-ranked-rewards-fortnite) · [v42.40 last-patch notes](/guides/season/fortnite-v42-40-last-override-patch).

## FAQ

### Can I buy Jimothy with V-Bucks?

Not as the Fortnitemares method. The live path is the Sprite extract. Ignore “free Jimothy generator” sites — those are the same scam pattern as fake V-Bucks codes.

### Does the Portable Extractor work?

Treat it as **no** for this specific quest unless Epic changes it. Several independent tests say a real Extraction Site is required. If portable worked for you, you got lucky or a later patch fixed it — still use a pad if the locker is empty.

### Do I have to extract a specific variant?

No. Any Dumpster Dive / Diver Sprite.

### Is Jimothy a Sprite or a pet?

Sidekick. Different locker tab from Sprites. Extracting the Dumpster Dive Sprite is just the **quest condition**.

### Ranked / Reload / Creative?

Do the extract in a normal BR / Zero Build match where Fortnitemares Sprites and Extraction Sites are actually in the ruleset. Creative maps will not grant the Sidekick.
`,
  },
  {
    slug: 'fortnite-admin-panel-lobby-hack-codes',
    title: 'Fortnite Admin Panel Lobby Hack Codes (Override) — How to Redeem',
    excerpt:
      'How to open the Override Admin Panel, redeem Lobby Hack codes for XP / Sprite Dust / Sprites, and avoid V-Bucks scam sites. Reviewed 24 Oct 2026.',
    category: 'how-to',
    image: '/images/guides/administrator.png',
    date: '2026-09-21',
    readTime: 7,
    featured: true,
    tags: [
      'fortnite admin panel',
      'lobby hack codes',
      'fortnite cheat codes',
      'override',
      'sprite dust',
      'free fortnite rewards',
    ],
    content: `
## What the Admin Panel is

Chapter 7 Season 4 (**Override**) added an **Admin Panel** on the Battle Royale lobby. Epic publishes **Lobby Hack** codes you enter there for free XP, Sprite Dust, Sprites, Gizmos, loading screens, and occasional quest-gated styles — **not V-Bucks**.

Last reviewed: **24 October 2026**. Codes rotate through the season (through ~1 November 2026). Epic can disable a code without notice. This is the last week of Override — redeem leftover XP / Dust strings before downtime.

Track timed freebies on the [free cosmetics tracker](/free-cosmetics). Season context: [Override hub](/season).

## How to redeem a Lobby Hack code

1. Launch Fortnite and stay in the **Battle Royale** lobby (not Creative / Discover).
2. Turn **Ranked off** if the panel is greyed out — codes are a pubs-lobby feature.
3. Open the **⋯ / Admin Panel** control (top-right of the lobby UI).
4. Paste a code from Epic’s blog, patch notes, or a trusted list → **Submit**.
5. Claim any Sprite / dust / item prompts the client shows.

Codes are typically **one redeem per account**. A few Sprite / story rewards require finishing a related story quest first — if Submit fails on a “valid” code, check quest progress.

## What codes usually give

| Reward type | Examples |
| --- | --- |
| XP | Flat Battle Pass XP bursts (e.g. OverrideXP-style grants) |
| Sprite Dust | 2k–5k dust stacks for Sprite upgrades |
| Sprites | Cheat Master / collab Sprites (Sonic, Jonesy, etc.) |
| Match tools | Llama drops, Extraction Accelerators, Cheat Code Locators |
| Cosmetics | Loading screens, sprays, quest-gated styles |

Exact strings change weekly. Do **not** rely on a screenshot from July — redeem whatever Epic is posting *this* patch.

## Sample codes players were redeeming mid-September 2026

These were widely reported active around **17–21 Sep 2026**. Confirm in-client before assuming they still work:

- \`OverrideXP\` — XP grant  
- \`DustInTheWind\` / \`BLINKYINKYPINKYCLYDE\` / \`PlayToLevelUp\` — Sprite Dust  
- \`DestinyAwaits\` — Llama Supply Drops  
- \`GottaGoFast\` / \`IWannaFlyHigh\` — Sonic / Tails Sprites (when still live)  
- \`YourThoughtsAreMine\` — dust + Geno style (quest-gated in some reports)

If a string errors, it is expired, mistyped, already redeemed, or quest-locked — not a “generator” problem.

## Scams to ignore

- Any site selling **“free V-Bucks Admin codes”** is a scam. Lobby Hacks do not print V-Bucks.
- Discord DMs asking you to “verify” by logging into a third-party Epic page.
- Fake redeem sites that ask for your password or 2FA codes.

Real path: **in-game Admin Panel only**. Account security: [enable 2FA](/guides/how-to/how-to-enable-2fa-fortnite).

## FAQ

### Do Admin Panel codes expire with Override?

Seasonal Lobby Hacks are tied to Override. Finish them before the season ends (**1 November 2026** on this site’s calendar). Ongoing account rewards (2FA Boogie Down, LEGO link) live on the [free cosmetics](/free-cosmetics) list separately.

### Can I use codes in Ranked or Creative?

Use the **BR pubs lobby**. Ranked / Creative menus usually hide or block the panel.

### Where should I look for new codes?

Epic patch notes, the official Fortnite blog / social posts, and in-game MOTDs. We list the *method* and end dates on [free cosmetics](/free-cosmetics); we will not mirror every string forever when Epic ships ten new ones a week.
`,
  },
  {
    slug: 'fortnite-override-battle-pass-guide',
    title: 'Fortnite Override Battle Pass Guide (Chapter 7 Season 4)',
    excerpt:
      'Override Battle Pass end date (1 Nov 2026 ET), free vs paid track, Sonic / Gaming Legends notes, and a last-week XP plan before the season locks.',
    category: 'season',
    image: '/images/guides/shapeless-ascendance.png',
    date: '2026-10-24',
    readTime: 9,
    featured: true,
    tags: [
      'override battle pass',
      'chapter 7 season 4',
      'fortnite battle pass',
      'sonic fortnite',
      'battle pass xp',
      'november 1 2026',
    ],
    content: `
## Override Battle Pass at a glance

**Chapter 7 Season 4 (Override)** launched **20 August 2026**. The Battle Pass runs through **1 November 2026** (Epic’s calendar day; this site uses a late-UTC rollover — check the [season countdown](/season-countdown) for remaining time).

Last reviewed: **24 October 2026** (v42.40 is the last Override patch; the pass end date did not move).

Live tools: [season hub](/season) · [XP calculator](/xp-calculator) · [free cosmetics](/free-cosmetics) · [v42.40 last-patch notes](/guides/season/fortnite-v42-40-last-override-patch) · older Runners pass notes stay archived at [Runners Battle Pass guide](/guides/season/fortnite-season-battle-pass-guide).

## Free track vs paid pass

| Track | What you get |
| --- | --- |
| **Free** | Cosmetic + V-Bucks nodes on the free page — finishes with the season |
| **Paid (~950 V-Bucks or Crew)** | Premium pages, headline outfits, most V-Bucks refund nodes, collab styles |

Sonic and other **Gaming Legends** page rewards need the paid track or Crew. Unclaimed rewards **do not carry** into Chapter 7 Season 5.

## What actually levels the pass

1. **Weekly quests** — best reliable XP; clear them on reset day.
2. **Daily quests** — filler; swap modes you hate instead of forcing them.
3. **Match XP** — placement still pays; hot-drop inting does not.
4. **Admin Panel Lobby Hacks** — occasional flat XP codes (see [Admin Panel guide](/guides/how-to/fortnite-admin-panel-lobby-hack-codes)).
5. **Creative XP maps** — useful after weeklies, until daily/weekly Creative caps. Codes rotate — use [/codes](/codes) and the [XP maps archive](/guides/season/best-fortnite-xp-maps) as a starting list, not gospel.

## Practical plan if you are behind (last week of October)

Assume **days**, not weeks, until **1 November**:

1. Open the [XP calculator](/xp-calculator), enter your current level, and be honest about whether weeklies + Creative cap can still hit 100.
2. Buy the pass **only** if you want the exclusive pages you can actually reach — do not buy tiers on 31 Oct hoping a Super Style appears.
3. Prioritize remaining weeklies → Admin Panel XP codes → Creative until capped → Fortnitemares Nitemare quests (~15k XP each) → pubs / ranked.
4. After 100, clear bonus / Super Style pages the same session. Unclaimed nodes lock with the season.

## Collabs and honesty

Override’s public coverage featured **Sonic** and other gaming-legend cosmetics on the pass. Exact unlock levels shift when Epic inserts mid-season pages — trust the **in-game pass UI**, not a July screenshot from Runners.

Shop / set context: [Item Shop](/tools/item-shop) and [sets](/sets).

## FAQ

### When does the Override Battle Pass end?

**1 November 2026.** Use the [countdown](/season-countdown). Downtime can move a few hours.

### Is the Runners Battle Pass guide still useful?

Only as an archive. Skin unlock tables there are **Chapter 7 Season 3**. This page + the XP calculator are the live path.

### Can I finish free track without buying?

Yes — free nodes unlock with levels. Premium Sonic / legend pages need the paid pass or Crew.
`,
  },
  {
    slug: 'fortnite-green-hill-zone-drop-guide',
    title: 'Fortnite Green Hill Zone Drop Guide (Override)',
    excerpt:
      'How to land Green Hill Zone in Chapter 7 Season 4: contest level, loot expectations, rotates toward Reality’s Reign / center, and when to skip it in Ranked.',
    category: 'map',
    image: '/images/map-evolution/41-10.webp',
    date: '2026-09-21',
    readTime: 8,
    featured: true,
    tags: [
      'green hill zone',
      'fortnite drop guide',
      'override map',
      'sonic fortnite',
      'best drops',
      'chapter 7 season 4',
    ],
    content: `
## Green Hill Zone overview

**Green Hill Zone** is a new named POI on the Override island (Chapter 7 Season 4) — the Sonic-flavored biome players search for after the 20 Aug reboot. It is a **hot** landing: strong early loot, high third-party traffic, and rotates that pull toward center / Reality’s Reign.

Last reviewed: **21 September 2026**. Pins and minimap: [interactive Fortnite map](/fortnite-map). Season context: [Override hub](/season).

## Who should land here

| Playlist | Verdict |
| --- | --- |
| Pubs / creative warm-up | Great — learn the biome, chase Sonic fantasy drops |
| Ranked climb | Only if you win POI fights consistently; otherwise prefer [Wonkeeland](/drops/wonkeeland) / [Latte Landing](/drops/latte-landing) |
| Zero Build | Playable, but open slopes punish bad peeks — bring mobility |

Returning hot drops ([Heatwave Harbor](/drops/heatwave-harbor), [Battlewoods](/drops/battlewoods)) still exist. Green Hill is *extra* contested because it is new and branded.

## Drop plan

1. **Bus angle** — Mark Green Hill early. If half the lobby marks it, swing to a side POI or edge of the biome instead of dead-center.
2. **Land high / roof first** when the zone has vertical buildings — claim chests before floor scrap.
3. **Leave with a shotgun + mid** — Override launch pool favors 8-Bit Shotgun / classic pumps and unvault ARs; confirm in the [weapons encyclopedia](/weapons) after hotfixes.
4. **Rotate early** toward zone or Reality’s Reign / Geno’s Machine if storm pulls center — late rotates across open Sonic flats are free damage.

## Rotates and third parties

- Expect third parties from **Reality’s Reign** and inland traffic once mid-game starts.
- Edge players from **Cluster Coast** / east can pinch if zone favors that half.
- Match Overrides can rewrite speed / loot mid-match — do not assume classic BR pace. See [Match Overrides explained](/guides/season/fortnite-match-overrides-explained).

## Loot expectations (honest)

We are not publishing fake chest counts. Treat Green Hill as **high contest, high reward**: enough floor loot and chests to kit a squad if you win the POI, not a free uncontested farm like Sunken Shores.

Spawn layers (chests, vehicles, Sprite-related pins when live): toggle them on the [map](/fortnite-map).

## When to skip Green Hill

- You need LP and your duo cannot win 3+ contested fights before first zone.
- Bus is unfavorable and you would land 15+ seconds late.
- You are learning Override guns — drop [Wonkeeland](/drops/wonkeeland) or [Latte](/drops/latte-landing) for cleaner mid-game practice.

## FAQ

### Is Green Hill Zone on the old Shattered Coast map?

Override rebuilt center / Sonic biomes on the live island. Named list also adds **Reality’s Reign** and **Stone Sanctum**; Frosted Flats / Sinister Strip / Calamari Canyon dropped off the named list. Full list: [map locations](/fortnite-map).

### Where is the dedicated Reality’s Reign guide?

Not shipped yet — use the live map until we write it. Same for Stone Sanctum.
`,
  },
  {
    slug: 'fortnite-match-overrides-explained',
    title: 'Fortnite Match Overrides Explained (Chapter 7 Season 4)',
    excerpt:
      'How Override Consoles work after v42.40: claim race, server-wide vs squad buffs, which Fortnitemares cartridges remain, and the four combat Overrides that left on 15 October.',
    category: 'season',
    image: '/images/guides/override-ready.png',
    date: '2026-10-24',
    readTime: 10,
    featured: false,
    tags: [
      'match overrides',
      'fortnite override',
      'match override console',
      'chapter 7 season 4',
      'loot hack',
      'sonic speed',
      'fortnitemares',
    ],
    content: `
## Match Overrides vs Lobby Hacks (do not mix these up)

Two different “Override” toys. Same season name. Totally different boxes.

| | Admin Panel / Lobby Hack | Match Override Console |
| --- | --- | --- |
| **Where** | Battle Royale lobby UI (Ranked off) | On the island mid-match |
| **What** | Type a code → XP, Sprite Dust, Sprites, loading screens | First squad to a live console picks a **ruleset flip** |
| **Lasts** | Account reward (once per code) | Until that match ends |
| **Guide** | [Admin Panel how-to](/guides/how-to/fortnite-admin-panel-lobby-hack-codes) | This page |

Last reviewed: **24 October 2026** after **v42.40** vaulted Super Shot, Big Boom, Action Hero, and Healing Overdrive. Season context: [Override hub](/season) · [v42.40 notes](/guides/season/fortnite-v42-40-last-override-patch).

## How a console actually works

Consoles look like **retro game-cartridge slots** parked at fixed spots around the Override island. There are **nine** of those slots every match. They are not all live at once.

1. Early storm phases, **one** console powers up at a time (more can wake later — count varies).
2. A **cartridge icon** pops on the map / HUD when it is claimable. Book it.
3. First player to use the terminal gets a pick of **three random Match Overrides**. The other two vanish for that claim.
4. Your name can sit on the console base so the lobby knows who flipped the switch. Effects stick **until the end of that match**.
5. Green check on the icon means someone already claimed it — stop sprinting into a third-party for nothing.

NPC trash near the pads is usually free mats / a distraction, not the real fight. The real fight is every squad that marked the cartridge the same second you did.

## Server-wide vs squad-only (the trap)

Some Overrides rewrite the **whole lobby** (Big Fish turning fishing holes gold, Dynamic Storm speeding the circle when the player count drops, Big Head Mode being Big Head Mode). Others are **squad-only** — Rare / Mythic “Squad …” variants that only buff the claimers.

Squad-only usually means you get marked as **Hackers** on the map for the rest of the match. That is the trade: Sonic Speed for your four, but every third party can see the approximate ping. If you claim Extra Life / Squad Endless Shooter with no mats and no exit, you just painted a target on a bad POI.

**Squad Level Up** is the odd one that hands a Mythic Kingdom Key **without** exposing you the same way — still read the in-game card before you mash confirm.

## What the common Overrides actually change

Epic enables, disables, and Fortnitemares-skins these constantly. Treat this as a **playbook**, not a wiki dump of every cartridge that ever shipped. Confirm the three options on the terminal in your match.

### Mobility / tempo
- **Sonic Speed / Squad Sonic Speed** — sprint ramps. Late walks across Green Hill flats become deaths. Hold high ground or leave early.
- **Infinite Stamina** — same idea, less flashy. Edge rotates suddenly exist.
- **Spooky Sprinter** (Fortnitemares) — cloak while sprinting. Expect quieter flanks and worse audio reads.
- **Action Hero** — **vaulted in v42.40.** If it is not in your three options, that is the patch, not RNG.

### Loot / economy
- **Big Loot** — chests lean Epic / Legendary. Contested POIs get even meaner after the flip.
- **Loot Hack** — next chest spits a Loot Hack item. That is **not** the same as a floor mythic; it changes what you see in the loot table. Cross-check hotfixes on [weapon changes](/weapon-changes) and the [weapons list](/weapons).
- **Big Fish** — every fishing hole goes gold. Mid-game “I will fish edge” suddenly prints loot for the whole server.
- **More XP** — elim / loot / storm survival XP bump. Nice for Battle Pass nights; irrelevant to the gunfight itself. Pass plan: [Override BP guide](/guides/season/fortnite-override-battle-pass-guide).

### Combat / survival
- **Overshield / Recovery** — shield and heal values move. Re-sort slurps vs bigs before you peek. **Healing Overdrive left in v42.40.**
- **Health Siphon / Berserk / More Health** — siphon and low-HP ramps change when you commit. More Health literally deletes normal shield logic — stop hoarding minis the same way.
- **Sharpshooter / Endless Shooter / Pumpkin Launching** — bloom, mag size, or “sometimes your AR also fires a pumpkin.” Box fights and spray ranges stop feeling like classic BR. **Super Shot (periodic rocket while firing) left in v42.40.**
- **Extra Life / Squad Extra Life** — one brink-of-elim respawn. Do not play like you have two lives in a 1v3; the second life is for the rotate you already planned.
- **Hunter Scavenger** — damaged / elim’d players get marked. Third-partying becomes the meta, not a surprise.

### Chaos / seasonal
- **Dynamic Storm** — fewer players → faster storm. Placement games punish greed harder.
- **Big Boom** — **vaulted in v42.40.** Long-fall boom is not in the live cartridge list.
- **Prop Hunt / Spooky Prop Hunt / Sugar Rush / Big Head Mode** — lobby goof modes. Still count as real rulesets for damage and vision; do not AFK because it looks silly.

## Should you race the cartridge?

**Yes, if…**
- You are already kitted and the console is on your rotate (Wonkeeland → center, Latte side pulls, etc.).
- The three options include a **server-wide** that helps everyone (or hurts the lobby in a way you like) and you can leave immediately after claim.
- Pubs / XP night and More XP / Big Loot is free value.

**No / bait, if…**
- You are naked after a hot drop — [Green Hill](/guides/map/fortnite-green-hill-zone-drop-guide) fights first, console second.
- Ranked climb game and the only good pick is a **squad-only** that pings you for the rest of the match. Placement pays LP; map graffiti does not. [Ranked hub](/ranked) · [climb guide](/guides/how-to/fortnite-ranked-mode-guide).
- You hear the claim VO and you are still 20 seconds out — turn mid-rotate and assume the winner is already marked.

## How to play *after* someone else claims

1. **Read the broadcast.** Stop tunneling a 50/50. The name of the Override is the new law.
2. **Re-value your hotbar.** Siphon / More Health / Overshield change what heals you keep. Speed Shooter / Endless Shooter change which AR you trust. Use the [loadout builder](/tools/loadout-builder) between games; in-match just swap slots.
3. **Assume third parties.** Squad-only marks are public grief invitations. If you are the marked squad, leave the console pad — do not emote on it.
4. **Storm math.** Dynamic Storm and Sonic Speed both punish “one more chest.” Look at the [map](/fortnite-map) before you greed.
5. **Competitive playlists.** Tournament / competitive BR rules often **strip** Match Overrides. Pubs and many Ranked lobbies still have them — trust the playlist tile, not this paragraph, every queue.

## Related Override clutter (so the vocab sticks)

- **Loot Hack (item)** — can show up from the Loot Hack Override *or* as seasonal loot language. Still a loot-table thing, not a lobby code.
- **Admin Panel** — lobby only. Never mid-match.
- **POIs** — Green Hill / Reality’s Reign / Stone Sanctum change *where* you fight. Overrides change *how* the server plays once someone hits a cartridge. Drops hub: [/drops](/drops).

## FAQ

### Do Match Overrides give free V-Bucks?

No. Neither Match Overrides nor Lobby Hack codes print V-Bucks. Freebies with end dates live on [free cosmetics](/free-cosmetics).

### Can every squad get an Override in one match?

No. One live console at a time, first claim wins that flip. More consoles can wake later, but you are not entitled to a personal cartridge every game.

### Are Overrides in Reload / Blitz / Ranked?

Core BR pubs are the home. Reload, Blitz, and Ranked follow their own playlist rules — and competitive BR often disables the mechanic entirely. Read the tile. [Reload hub](/reload) when you queue there.

### Why did my favorite Override disappear?

Epic toggles cartridges when they get too spicy (Extra Life, Speed Shooter, Power Pickaxe have all been in and out). **v42.40** specifically pulled Super Shot, Big Boom, Action Hero, and Healing Overdrive. Fortnitemares still injects Spooky Sprinter / Berserk / Prop Hunt / Sugar Rush. If it is not in your three options, it is disabled or unlucky RNG — not a client bug.
`,
  },
  {
    slug: 'how-to-get-null-ranked-rewards-fortnite',
    title: 'How to Get Null Ranked Rewards in Fortnite Override',
    excerpt:
      'Unlock the Null outfit and Skeletal Slingbag / Null’s Scythe styles (Champion Molten, Elite Neon, Unreal Rifted) on the Override Ranked ladder before 1 November 2026.',
    category: 'how-to',
    image: '/images/guides/null.png',
    date: '2026-10-24',
    readTime: 7,
    featured: false,
    tags: [
      'null fortnite',
      'ranked rewards',
      'fortnite ranked',
      'champion rewards',
      'override',
      'unreal',
    ],
    content: `
## Null rewards on the Override ladder

Chapter 7 Season 4 (**Override**) Ranked track includes the **Null** outfit and matching **Skeletal Slingbag** / **Null’s Scythe** styles gated by rank tier — commonly called out as **Champion Molten**, **Elite Neon**, and **Unreal Rifted** in season coverage. Exact cup calendars and kill challenges can shift mid-season; trust the in-game Ranked / Cups screens.

Last reviewed: **24 October 2026**. Ladder ends with the season (**1 November 2026**, Eastern Time). This is the last week — styles lock. Freebies list: [free cosmetics](/free-cosmetics). Climb systems: [ranked hub](/ranked) · [LP guide](/guides/how-to/fortnite-ranked-mode-guide).

## What you are grinding for

| Goal | Typical gate |
| --- | --- |
| Null base / early styles | Mid Ranked tiers + seasonal ranked quests |
| Champion Molten style | Champion |
| Elite Neon style | Elite |
| Unreal Rifted style | Unreal |

These are **rank unlocks**, not Item Shop purchases. You cannot buy the missing style with V-Bucks if the season ends.

## Climb habits that actually unlock styles

1. **Placement over spawn fragging** — early deaths delete LP; Null styles need sustained rank, not highlight clips.
2. **Drop for your rank** — Wonkeeland / Latte for climb games; save Green Hill Zone for pubs until you win that POI cold. [Green Hill guide](/guides/map/fortnite-green-hill-zone-drop-guide).
3. **Finish ranked quests / cups** when they appear in Discover — some seasons split cosmetics across quests and pure LP.
4. **Learn Match Overrides** so you do not throw endgames when rules flip — [explained](/guides/season/fortnite-match-overrides-explained).
5. **Play your mode** — Ranked BR vs Zero Build tracks differ; styles follow the track Epic lists in-client.

## Timeline honesty

From **24 October** you have **days**, not weeks. If you are not already near the rank that unlocks your missing Null style, play for placement every session and do not hot-drop Green Hill. Use the [season countdown](/season-countdown) so you are not unlocking Champion the night Override ends.

## FAQ

### Do Null styles carry to next season?

Ranked cosmetic unlocks stay in your locker once earned. Unearned Override styles are gone when the ladder resets.

### Is Null on the Battle Pass?

No — Null is the **Ranked** reward fantasy this season. Pass cosmetics (Sonic, etc.) are separate — [Override Battle Pass guide](/guides/season/fortnite-override-battle-pass-guide).

### Where do I track other free rewards?

[Free cosmetics tracker](/free-cosmetics) — Twitch drops, Admin Panel, 2FA, and ranked entries with end dates.
`,
  },

  // ─── WEAPONS ───────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-best-weapons-tier-list-2026',
    title: 'Fortnite Chapter 7 Season 3 Weapons Tier List (Runners — archive)',
    excerpt:
      'Archive: late Runners meta on Shattered Coast. Override loot numbers are not fully rewritten — confirm in-game; see the season hub.',
    category: 'weapons',
    image: '/images/guides/secret-weapon.png',
    date: '2026-07-25',
    readTime: 12,
    featured: false,
    noindex: true,
    tags: ['weapons', 'tier list', 'meta', 'chapter 7 season 3', 'runners', 'striker pump', 'flex smg'],
    content: `
> **Archive note (31 Aug 2026):** This list is late **Runners (C7S3)**. **Override** is live — we have not rewritten full DPS sheets yet. Confirm guns in-game; see the [season hub](/season) and [loadout builder](/tools/loadout-builder).

## How this tier list is ranked

Weapons are ranked for Chapter 7 Season 3 (Runners) on the Shattered Coast map. Criteria: fight impact, consistency, how often you find them, and how they pair with mobility (Seven Sliders / Overdrive-style rotates). Epic has already hotfixed this season — treat this as a living guide.

Last reviewed: August 1, 2026.

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

- ![Extending Focus Shotgun](/images/loadout/extending_focus.png) **Extending Focus Shotgun** — Best shotgun *range* in the pool (ADS barrel / tighter spread). Weaker opener than Striker in boxes; keep it for Zero Build peeks and swap to Striker when you can.
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
    title: 'Fortnite Shotgun Guide (Chapter 7 Season 3) (archive)',
    excerpt:
      'Which shotgun to run in Runners season: Striker Pump first, then Maven / Extending Focus — plus Flex SMG pairings and the Chaos Reloader vault note.',
    category: 'weapons',
    image: '/images/loadout/maven_auto.png',
    date: '2026-07-25',
    readTime: 7,
    featured: false,
    noindex: true,
    tags: ['shotgun', 'weapons', 'close range', 'chapter 7 season 3', 'loadout', 'striker pump'],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## Why shotguns still decide close fights

Most box fights and final-circle collisions still end on a shotgun trade. Chapter 7 Season 3’s pool is small: learn **Striker Pump** well, keep Maven / Extending Focus as backups, and always cover mid-range with a **Flex SMG**.

See the full pool ranking in the [weapons tier list](/guides/weapons/fortnite-best-weapons-tier-list-2026), or build a hotbar in the [loadout builder](/tools/loadout-builder).

Last reviewed: August 1, 2026.

## Current shotgun options

### ![Striker Pump Shotgun](/images/loadout/striker_pump.png) Striker Pump Shotgun
Default meta shotgun. Highest fight impact on a clean first shot, fast pull-out, poor range. Build or slide after every pump.

**Best for:** Builds, box fights, and anyone who can land the opener.

### ![Maven Auto Shotgun](/images/loadout/maven_auto.png) Maven Auto Shotgun
Full-auto forgiveness. Lower spike than Striker, better when you are spraying a moving target or playing Zero Build.

**Best for:** Inconsistent aim or messy third-parties.

### ![Extending Focus Shotgun](/images/loadout/extending_focus.png) Extending Focus Shotgun
Longest shotgun reach in the pool — ADS extends the barrel and tightens spread. Weaker first-shot spike than Striker, so it loses most box trades if you treat it like a pump. Use it for mid-range peeks, not as your default Builds shotgun.

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
    title: 'Best Loot Spots on Shattered Coast (Chapter 7 Season 3) (archive)',
    excerpt:
      'Practical drop tiers for Shattered Coast — hot, balanced, and edge POIs — plus landing priority and when to leave.',
    category: 'map',
    image: '/images/map-evolution/39-51.webp',
    date: '2026-07-15',
    readTime: 7,
    featured: false,
    noindex: true,
    tags: ['loot', 'map', 'drop locations', 'named locations', 'hot drops', 'chapter 7 season 3', 'shattered coast'],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


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
    title: 'Fortnite Shattered Coast Map Guide: Every Named POI (archive)',
    excerpt:
      'Named locations on the Chapter 7 Season 3 Shattered Coast island — Lifty Lodge, Battlewoods, Wonkeeland, Heatwave Harbor, and more — with drop and rotation notes.',
    category: 'map',
    image: '/images/map-evolution/40-40.webp',
    date: '2026-07-08',
    readTime: 12,
    featured: false,
    noindex: true,
    tags: ['map', 'locations', 'rotation', 'POI', 'shattered coast', 'chapter 7 season 3'],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## Shattered Coast overview

Chapter 7 Season 3 replaced the mid-chapter island with **Shattered Coast** after the Shattered live event. The Zero Point sits near center, with snow, desert, and coastal biomes around it. Only **Wonkeeland** and **Latte Landing** carried over cleanly from Season 2 — everything else is new or heavily remixed.

Last reviewed: August 2026.

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
    title: 'Fortnite Runners Battle Pass Guide (Chapter 7 Season 3 — archive)',
    excerpt:
      'Archive: Runners Battle Pass cost, skin unlock levels, and XP plan. Override (C7S4) ends November 1, 2026 — use the live XP calculator for the current pass.',
    category: 'season',
    image: '/images/guides/sprite-runners.png',
    date: '2026-07-10',
    readTime: 10,
    featured: false,
    noindex: true,
    tags: ['battle pass', 'season', 'XP', 'level up', 'runners', 'chapter 7 season 3', 'archive'],
    content: `
> **Archive note (31 Aug 2026):** Runners ended at the August 20 reboot. **Override (Chapter 7 Season 4)** is live and ends **November 1, 2026**. Use the [season countdown](/season-countdown) and [Battle Pass XP calculator](/tools/battle-pass-xp-calculator) for the current pass. Skin levels below are historical.

## Runners Battle Pass overview

Chapter 7 Season 3 (**Runners**) ended around **August 19–20, 2026**. The paid pass was typically **800 V-Bucks** (also included with Fortnite Crew). Cosmetics are seasonal — unclaimed rewards disappeared when the season ended.

This page covers skin unlock gates and a realistic XP plan from the Runners era. For a live grind projection on Override, use the [Battle Pass XP calculator](/tools/battle-pass-xp-calculator). Cosmetics in the live pass also show up in the [Item Shop viewer](/tools/item-shop) once they rotate or when you want set context.

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
    image: '/images/guides/beastly-bus.png',
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
    image: '/images/icons/vbucks.png',
    date: '2026-07-23',
    readTime: 11,
    featured: false,
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

Last reviewed: August 2026. Pack prices and pass totals change — use the [V-Bucks calculator](/tools/vbucks-calculator) when you are budgeting a shop wishlist, and the [Battle Pass XP calculator](/tools/battle-pass-xp-calculator) if you are grinding levels for pass rewards.

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
    image: '/images/guides/select-character.png',
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

Last reviewed: August 2026. Pair this with [2FA setup](/guides/how-to/how-to-enable-2fa-fortnite) so a name change session cannot become an account takeover.

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
    image: '/images/guides/visitors-return.png',
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

Last reviewed: August 2026. Related reading: [free V-Bucks methods](/guides/season/how-to-get-free-v-bucks-fortnite) and the [Item Shop tracker](/tools/item-shop).

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
    image: '/images/guides/sanctuary-sitrep.png',
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

Last reviewed: August 2026. Official overview: [Epic account security](https://safety.epicgames.com/en-US/policies/account-security).

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
    image: '/images/guides/hit-by-chaos.png',
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

Last reviewed: August 2026 (Chapter 7 Season 3 / Runners). Patches can change GPU cost — re-test after major updates.

## Step 1 — Turn on Performance Mode

Full walkthrough: [How to turn on Performance Mode in Fortnite](/guides/how-to/how-to-enable-performance-mode-fortnite).

In Fortnite **Settings → Video / Graphics**:

- Set **Rendering Mode** to **Performance** (or **DirectX 12 Performance** if that option is available on your build)
- Apply and **restart** Fortnite when prompted

Performance Mode trades some visual fidelity for a large frame-time improvement on most GPUs, especially mid-range and older cards. Competitive players almost universally prefer it.

DirectX 12 “pretty” modes can look nicer and sometimes scale well on high-end GPUs, but if your goal is raw FPS and clarity for aiming, start with Performance Mode.

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
    title: 'How to Extract Sprites in Fortnite Chapter 7 Season 3 (Runners) (archive)',
    excerpt:
      'Chapter 7 Season 3 Sprite extraction on Shattered Coast: when Extraction Sites unlock, the ~30s defend timer, Portable Extractor, Victory Royale auto-extract, and safe Runners site picks.',
    category: 'how-to',
    image: '/images/guides/sprites-collect.jpg',
    date: '2026-07-26',
    readTime: 9,
    featured: false,
    noindex: true,
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
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## How to extract Sprites in Fortnite Chapter 7 Season 3

In **Chapter 7 Season 3 (Runners)**, finding a Sprite only buffs **this** match. To keep it in your collection (and earn Sprite Dust) on the **Shattered Coast** map, you must **extract** it:

1. Equip the Sprite.
2. Wait until **after the first storm circle closes** — public Extraction Sites unlock then.
3. Go to an **unoccupied** Extraction Site (white beacon / sky beam on the map).
4. Interact with the **control terminal** → survive the ~**30-second** crate inbound window (you broadcast to the lobby).
5. Interact with the **Extraction Crate** the second it lands and deposit your Sprites.

**Shortcuts:** a **Portable Extractor** does a short, quiet extract anywhere; a **Victory Royale** auto-extracts Sprites you are carrying — no site needed.

Last reviewed: August 1, 2026 (Fortnite Chapter 7 Season 3 / Runners). Trust the live in-game UI if Epic tweaks timers or Dust prices.

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
- [Ironmouse Sprite guide](/guides/how-to/how-to-get-ironmouse-sprite-fortnite)
`,
  },
  {
    slug: 'how-to-get-cube-sprites-fortnite',
    title: 'How to Get Cube Sprites in Fortnite (Chapter 7 Season 3) (archive)',
    excerpt:
      'Which cube sprite variants are live right now, where they drop from chests and vaults, how the Sprite Locator works, and the best Shattered Coast farm routes.',
    category: 'how-to',
    image: '/images/guides/welcome-innovation.png',
    date: '2026-07-23',
    readTime: 10,
    featured: false,
    noindex: true,
    tags: [
      'how to get cube sprites in fortnite',
      'fortnite cube sprites',
      'cube sprite fortnite',
      'sprite locator fortnite',
      'chapter 7 season 3 sprites',
      'golden grove sprites',
    ],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## Cube sprites are live — but not every sprite has a cube yet

In Chapter 7 Season 3 (Runners), Epic added **cube** variants of Sprites. These are rare collectible/combat companions that can appear from the same sprite loot pipeline as normal Sprites — chests, Sprite Chests, rare chests, vaults, and Sprite Locator routes.

Not every Sprite in the catalog has a cube version yet. Epic is rolling variants over time. As of the mid-season cube wave covered in community guides (including [this Chapter 7 Season 3 walkthrough](https://www.youtube.com/watch?v=by7oByl8EO8)), the cube set that is actually obtainable right now is limited.

Last reviewed: August 2026. Patch notes can expand the list — if a Sprite suddenly shows a cube style in-game, treat the live client as the source of truth.

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
    slug: 'how-to-get-ironmouse-sprite-fortnite',
    title: 'How to Get the Ironmouse Sprite in Fortnite (C7S3) (archive)',
    excerpt:
      'Ironmouse Fortnite Sprite guide: August 4 return after the early vault, Mythic powers (heal + cloak + low gravity), Relic Chest farm tips, and how to extract her.',
    category: 'how-to',
    image: '/images/guides/ironmouse.png',
    date: '2026-08-01',
    readTime: 9,
    featured: false,
    noindex: true,
    tags: [
      'ironmouse fortnite',
      'ironmouse sprite',
      'how to get ironmouse sprite',
      'fortnite ironmouse collab',
      'ironmouse sprite powers',
      'mythic sprite fortnite',
      'chapter 7 season 3 sprites',
      'ironmouse fortnite release date',
    ],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## Ironmouse is in Fortnite — here’s the short version

**Ironmouse** (the VTuber) got a **Mythic Sprite** collab in Fortnite Chapter 7 Season 3 (Runners). She briefly appeared after the **v41.30** update around **July 30, 2026**, then Epic **vaulted** her because the drop went live too early. Ironmouse herself confirmed the proper launch is her debut anniversary: **Tuesday, August 4, 2026**.

| Fact | Detail |
| --- | --- |
| What it is | Mythic **Ironmouse Sprite** (combat companion), not a confirmed Item Shop skin set yet |
| Official return | **August 4, 2026** |
| How you get her | Random Sprite loot — especially **Sprite Chests**, **Relic Chests** (Renegade Vaults), rare chests; also eliminations / trades |
| What she does | When HP is low: **regen**, **Cloak**, and **low gravity** (heal amount scales with Sprite level) |
| How you keep her | **Extract** in the same match (or win the game while carrying her) |

Last reviewed: August 1, 2026. Trust the live Fortnite client if Epic moves the date or tweaks drop sources.

Pair with: [how to extract Sprites](/guides/how-to/how-to-extract-sprites-fortnite), [cube sprites](/guides/how-to/how-to-get-cube-sprites-fortnite), [interactive map](/fortnite-map), [best loot spots](/guides/map/fortnite-loot-guide-best-spots).

## Why was Ironmouse vaulted?

Players who loaded after the July 30 patch could find and even extract the Ironmouse Sprite for a short window. Epic then removed her from the pool and from collections. Ironmouse said on stream it was an accidental early release / sneak peek, and that she returns on **August 4**.

Dataminer reporting around the vault said early collectors should get her **restored automatically** when she is re-enabled. Epic’s in-game collection UI is the source of truth — if she is missing after August 4, relaunch the client and check again before assuming she is gone forever.

## Ironmouse Sprite powers (why she’s meta)

When your health is low, Ironmouse starts a regen window. During that window you also get:

- **Cloak** (harder to track while you recover)
- **Low gravity** (float / drift out of peeks instead of standing still)

Community breakdowns of the level scaling (heal amount while the ability is up):

| Sprite level | Health restored (approx.) |
| --- | --- |
| Level 1 | 60 |
| Level 2 | 70 |
| Level 3 | 80 |
| Level 4 | 90 |
| Level 5 | 100 |

That package is why people call her one of the strongest **defensive / survival** Sprites in Chapter 7 Season 3 — heal + invisibility + escape movement in one proc. Exact trigger thresholds and timers can shift with hotfixes; read the in-game Sprite tooltip after she is live.

## How to get the Ironmouse Sprite

She is **Mythic**, so expect a low roll rate. Treat every match as a farm attempt.

### 1. Relic Chests in Renegade Vaults (best volume)

Relic Chests inside **Renegade Vaults** are the farm spot most early players hit for Ironmouse. Plan a vault-heavy drop, clear the room, open every Relic / rare chest, then rotate to the next vault if you have keys / access.

Use the [Shattered Coast map](/fortnite-map) and [loot guide](/guides/map/fortnite-loot-guide-best-spots) to pick vault-adjacent POIs instead of empty coastline.

### 2. Sprite Chests and rare chests

Same pipeline as other chase Sprites:

- Prioritize **Sprite Chests** whenever you hear/see them
- Hit **rare chests** in strong POIs
- Keep opening volume — Mythics punish camping one house

### 3. Locators and helper Sprites

If you find a **Sprite Locator** or **Lucky Locator**, use it. Lucky Locator-style tools that bias toward Sprites you do not own are especially valuable for a brand-new Mythic. Some players also equip loot-luck helpers (for example Earth Sprite style bonuses) while chest-routing — treat those as small odds bumps, not guarantees.

### 4. Take it off other players

If someone already has Ironmouse equipped, third-party them. Tracking Sprites (when available in the pool) help you hunt carriers. In squads, call it out the second you see the Mythic icon.

### 5. Trade with friends

Sprite trading (when enabled for her) is the chill path if your duo already extracted one. Trading was reported locked while she was vaulted — expect it to open with the August 4 return.

## Extract immediately — do not die with her

Finding Ironmouse only buffs **this** match until you bank her.

1. Equip her.
2. Prefer a **Portable Extractor** (~quiet, short channel) if you already bought one with Sprite Dust.
3. Otherwise wait until **after first circle**, take an **unoccupied Extraction Site**, survive the ~30s defend, and deposit.
4. Or play for a **Victory Royale** — wins auto-extract carried Sprites.

Full site / Portable Extractor walkthrough: [how to extract Sprites in Chapter 7 Season 3](/guides/how-to/how-to-extract-sprites-fortnite).

In Duos/Trios, if only one of you has a Portable Extractor, hand her off so the safer player banks her — you can trade later.

## Are there Ironmouse skins in the Item Shop?

Dataminers floated possible collab outfits (codenames / mic accessory / LEGO styles) around the same window. **Epic has not firmly confirmed a full Ironmouse skin set** the way the Sprite is confirmed. This guide focuses on the Sprite — check the [Item Shop tracker](/tools/item-shop) on and after August 4 if cosmetics drop.

## FAQ

### When does the Ironmouse Sprite come back?

**August 4, 2026**, tied to Ironmouse’s debut anniversary, after the early vault.

### Is Ironmouse a skin or a Sprite?

The live collab piece players can collect in BR right now is the **Mythic Sprite**. Skins remain unconfirmed / rumored until they appear in the shop UI.

### Can I still get her if I extracted her during the sneak peek?

Likely yes once she is re-enabled — community datamine notes said early collections should restore. Verify in your Sprite book after August 4.

### What’s the fastest way to farm her?

Vault / Relic Chest routes + Sprite Chest volume, then instant extract. Don’t ego-peek with an unextracted Mythic.

### Does she carry into the next season?

Chapter 7 Season 3 Sprite collections are season-scoped. Extract and master her while Runners is live.

## Related guides

- [How to extract Sprites](/guides/how-to/how-to-extract-sprites-fortnite)
- [How to get cube Sprites](/guides/how-to/how-to-get-cube-sprites-fortnite)
- [Interactive Fortnite map](/fortnite-map)
- [Best loot spots](/guides/map/fortnite-loot-guide-best-spots)
- [Free cosmetics tracker](/free-cosmetics)
`,
  },
  {
    slug: 'fortnite-ban-appeal',
    title: 'Fortnite Ban Appeal Guide — How to Appeal an Epic Account Ban',
    excerpt:
      'How to check your Fortnite ban status, find your Sanction ID, submit one official appeal on Epic’s Sanctions and Appeals portal, and what happens after review.',
    category: 'how-to',
    image: '/images/guides/the-return.png',
    date: '2026-07-23',
    readTime: 11,
    featured: false,
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

Last reviewed: August 2026. Always trust the live Epic UI and email over third-party summaries if something changed.

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
    title: 'Best Fortnite XP Maps (August 2026) — How to Level Up Fast (archive)',
    excerpt:
      'Working Creative XP map codes for Chapter 7 Season 3, how to enter island codes, daily/weekly Creative XP caps, and a fast Battle Pass leveling plan.',
    category: 'season',
    image: '/images/guides/fortm.jpg',
    date: '2026-08-01',
    readTime: 10,
    featured: false,
    noindex: true,
    tags: [
      'best fortnite xp maps',
      'fortnite xp map codes',
      'how to level up fast fortnite',
      'fortnite creative xp',
      'fortm code',
      'battle pass xp farm',
    ],
    content: `
> **Archive note (19 Sep 2026):** This guide was written for **Chapter 7 Season 3 (Runners)**. **Override (Chapter 7 Season 4)** is live — treat POI names, loot, and progression loops as historical unless the season hub says otherwise. See [/season](/season), [/fortnite-map](/fortnite-map), and [/weapons](/weapons).


## Fastest way to level the Battle Pass right now

Creative **XP maps** are still the quickest path to Battle Pass levels in Chapter 7 Season 3 — as long as you respect Epic’s Creative XP caps and rotate maps when gains slow. This guide lists working codes, shows how to enter them, and pairs with our live [Creative map codes](/codes) database and [Battle Pass XP calculator](/tools/battle-pass-xp-calculator).

Last reviewed: August 2026. Codes break after patches — if Discover says an island is unavailable or “XP disabled,” swap to another XP-rated code on [/codes](/codes).

## Best Fortnite XP map codes (August 2026)

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
    image: '/images/guides/welcome-guardian.png',
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

Last reviewed: August 2026. Official connection tools live under Epic account settings — [Connections](https://www.epicgames.com/account/connections) on the web, or the first-time Fortnite console prompt.

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
    image: '/images/guides/shards-united.png',
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

Last reviewed: August 2026. Check today’s offerings on the [Item Shop tracker](/tools/item-shop) and budget with the [V-Bucks calculator](/tools/vbucks-calculator).

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
    image: '/images/guides/block-party.png',
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

Last reviewed: August 2026. UI labels move slightly between seasons; look for the player card / report flag.

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
    image: '/images/guides/legendary-llamas.png',
    date: '2026-07-24',
    readTime: 6,
    featured: false,
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

Last reviewed: August 2026. Rare live events can delay a reset; trust the in-game clock if it disagrees with this page.

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
  {
    slug: 'how-to-redeem-fortnite-code',
    title: 'How to Redeem a Fortnite Code (V-Bucks Cards + Creator Codes)',
    excerpt:
      'Redeem V-Bucks gift cards on PC, Switch, PlayStation, and Xbox — plus how Support-A-Creator codes work in the Item Shop and how to avoid wrong-account mistakes.',
    category: 'how-to',
    image: '/images/guides/exalted-reforged.png',
    date: '2026-07-31',
    readTime: 11,
    featured: false,
    tags: [
      'how to redeem fortnite code',
      'redeem v-bucks card',
      'fortnite gift card redeem',
      'fortnite creator code',
      'support a creator code',
      'vbucks card playstation xbox',
      'fortnite.com/vbuckscard',
    ],
    content: `
## Two different “Fortnite codes” (do not mix them up)

Players search “redeem Fortnite code” for two totally different systems:

| Code type | What it does | Where you enter it |
| --- | --- | --- |
| **V-Bucks / Fortnite gift card PIN** | Adds prepaid V-Bucks to an Epic account (platform rules apply) | Official [V-Bucks Card](https://www.fortnite.com/vbuckscard) site — **not** the in-game Item Shop search box |
| **Support-A-Creator / creator code** | Tips a creator a cut of eligible purchases; does **not** give you free V-Bucks | Fortnite **Item Shop → Enter Code** (or the creator-code field at checkout) |

If you bought a retail card and try to type the PIN as a creator code, it will fail. If you type a streamer’s creator tag on the V-Bucks card website, that also fails.

Last reviewed: August 1, 2026. Official V-Bucks card help: [How to redeem a V-Bucks card](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Keep your receipt until the balance shows correctly.

Related: [free V-Bucks (legit only)](/guides/season/how-to-get-free-v-bucks-fortnite), [gift skins](/guides/how-to/how-to-gift-skins-fortnite), [refunds](/guides/how-to/how-to-refund-fortnite-skins), [link consoles](/guides/how-to/how-to-link-epic-games-playstation-xbox-switch).

## Before you redeem anything

1. Sign into the **Epic account that owns your locker** — check skins on [epicgames.com/account](https://www.epicgames.com/account) before pasting a PIN.
2. Confirm the console / Microsoft / PlayStation profile you will select is the one [linked](/guides/how-to/how-to-link-epic-games-playstation-xbox-switch) to that Epic ID.
3. Enable [2FA](/guides/how-to/how-to-enable-2fa-fortnite) so a shared family PC cannot burn your card on the wrong login.
4. Scratch the PIN carefully; do not buy “code checkers” or Discord “redeem bots.”

## How to redeem a V-Bucks card (all platforms start here)

Epic’s flow is web-first. You generally **cannot** finish a retail V-Bucks card by pasting the PIN inside the Fortnite client alone.

1. Open [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) in a browser.
2. Click **Get Started** and sign into the correct Epic Games account (use console login buttons if that is how you normally authenticate).
3. Enter the PIN from the back of the card / digital email — usually **without dashes**.
4. Click **Next**.
5. Choose the **platform / device** you play Fortnite on. Only linked platforms appear — if yours is missing, fix Connections first.
6. Review Epic account name, device, and projected balance, then **Confirm**.

### PC, Nintendo Switch, and mobile

After Confirm, V-Bucks usually post to the Epic wallet for that platform path. Launch Fortnite, open the Item Shop, and verify the balance. Force-quit and relaunch once if the UI lags.

### PlayStation (PS5 / PS4) — secondary code required

Selecting PlayStation generates a **secondary PlayStation Store code** (Epic shows it and/or emails it). You must redeem that code on the **Sony account linked to your Epic**:

1. Finish the fortnite.com/vbuckscard Confirm step with **PlayStation** selected.
2. Copy the secondary code Epic provides.
3. Redeem it in the PlayStation Store (console: Settings / PlayStation Store → Redeem Codes, or Sony’s web redeem page while signed into the correct PSN).
4. Use an **incognito window** if you have multiple PSN logins — redeeming on the wrong Sony ID is the #1 support nightmare.
5. Relaunch Fortnite on that PSN and check V-Bucks.

### Xbox — secondary Microsoft code required

Same two-step pattern as PlayStation:

1. Confirm on fortnite.com/vbuckscard with **Xbox** selected.
2. Copy the secondary **Microsoft / Xbox** prepaid-style code Epic generates.
3. Redeem it on the Microsoft account linked to your Epic (Xbox console redeem UI or Microsoft’s redeem site).
4. Relaunch Fortnite and verify balance.

Epic’s help page explicitly notes Xbox / PlayStation need this secondary redeem step; PC / Switch / mobile generally do not.

## Creator codes (Support-A-Creator) — how they actually work

A creator code does **not** unlock skins or add V-Bucks. It tells Epic which creator should receive a share of **eligible** purchases you make while the code is active.

### How to enter a creator code

1. Launch Fortnite and open the **Item Shop**.
2. Find **Enter Code** / Support-A-Creator (wording varies slightly by patch).
3. Type the creator’s code exactly (often the streamer name or a short tag).
4. Confirm. You should see the creator name applied for a limited time window (Epic rotates how long a code “sticks” — re-enter before big purchases if unsure).
5. Buy Battle Pass, V-Bucks packs (when eligible), Crew, or shop cosmetics as normal.

### Creator code FAQ players get wrong

- **It is not a coupon.** Price stays the same.
- **It is not a V-Bucks card PIN.** Different system.
- **Gifting / some SKUs may be ineligible** depending on Epic’s current SAC rules — if the code does not apply, the purchase can still succeed without supporting anyone.
- **You can change codes** before checkout; last confirmed code usually wins for that session/window.
- Phishing sites that ask you to “verify creator code” with your password are scams — only use the in-game shop field or Epic’s official surfaces.

## Epic Games Store keys vs Fortnite V-Bucks cards

Some retail “Fortnite” products or Epic wallet cards redeem on **epicgames.com** store redeem pages instead of fortnite.com/vbuckscard. If the packaging says **Epic Games Store** / wallet credit, follow the Epic redeem URL printed on the card — do not force it through the V-Bucks card site.

## Common redemption errors and fixes

| Problem | Likely cause | Fix |
| --- | --- | --- |
| “Invalid code” | Typo, already used, wrong product type | Re-check PIN; do not reuse; confirm it is a V-Bucks card not a creator tag |
| Platform missing in list | Console not linked to this Epic | [Link accounts](/guides/how-to/how-to-link-epic-games-playstation-xbox-switch), then retry |
| Balance missing on PS/Xbox | Secondary code never redeemed | Check email / Epic confirmation for the second code; redeem on correct Sony/Microsoft ID |
| V-Bucks on “wrong” locker | Signed into the wrong Epic | Stop; contact Epic with receipt — prevent with locker check *before* Confirm |
| Card says region locked | Regional SKU limits | Redeem from a storefront/account matching the card’s region rules |
| Kids account / parental controls | Purchase restrictions | Guardian must complete console store redeem steps |

## Safety checklist (scam avoidance)

- Only redeem on **fortnite.com** / **epicgames.com** / official console stores
- Never send a PIN to “support” in Discord, Instagram DMs, or “giveaway hosts”
- Never screenshot a full unused PIN publicly
- If a site asks for your password **and** the card PIN together outside Epic’s login, leave
- After redeeming, you can spend with the [V-Bucks calculator](/tools/vbucks-calculator) and check the [Item Shop](/tools/item-shop) before impulse buys

## FAQ

### Can I redeem a V-Bucks card inside Fortnite?

Not as the primary flow. Start at [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Console players then finish on PlayStation Store / Microsoft Store when prompted.

### Do V-Bucks transfer across PC and console?

V-Bucks follow Epic’s platform wallet rules and how you redeemed. Cross-progress cosmetics live on the Epic account, but spending balances can be platform-separated — redeem intentionally for the device you shop on, and read Epic’s on-screen balance preview before Confirm.

### Can I refund a redeemed card?

Generally no once redeemed. Keep the receipt for Epic Support if the PIN fails or posts incorrectly. Cosmetic regret after spending V-Bucks is a different tool — [refunds guide](/guides/how-to/how-to-refund-fortnite-skins).

### How do I support a creator without buying anything?

Entering a code alone does nothing until you make an eligible purchase. Wishlist with the [Item Shop tracker](/tools/item-shop), then buy when ready.
`,
  },
  {
    slug: 'how-to-fix-fortnite-packet-loss-high-ping',
    title: 'How to Fix Fortnite Packet Loss and High Ping',
    excerpt:
      'Diagnose Fortnite lag with Net Debug Stats, then fix packet loss and high ping: Ethernet, region, Wi-Fi, router, ISP routing, and settings that actually matter.',
    category: 'how-to',
    image: '/images/guides/cold-welcome.png',
    date: '2026-07-31',
    readTime: 12,
    featured: false,
    tags: [
      'fortnite packet loss',
      'how to fix fortnite packet loss',
      'fortnite high ping',
      'fortnite lag fix',
      'net debug stats fortnite',
      'fortnite rubberbanding',
      'fortnite matchmaking region',
    ],
    content: `
## Packet loss vs high ping (know which one you have)

| Symptom | What the net stats usually show | How it feels |
| --- | --- | --- |
| **High ping** | Ping stuck high (often 80–200+ ms depending on region) | Delayed shots, slow peeks, “heavy” movement |
| **Packet loss** | Loss % climbing; ping can still look “okay” | Rubberbanding, ghost builds, teleporting opponents, shots that don’t register |
| **Jitter** | Ping swinging wildly | Inconsistent hit reg even when average ping looks fine |
| **Low FPS / hitching** | Net stats fine; FPS counter drops | Stutters that *feel* like lag but are render/CPU — use the [FPS guide](/guides/how-to/how-to-get-better-fps-fortnite) |

You cannot fix network loss with Shadows Off. You cannot fix a 30 FPS laptop with Ethernet alone. Separate the problems.

Last reviewed: August 1, 2026. Epic server outages happen — check Fortnite status / socials before rebuilding your entire network.

Also useful: [Performance Mode](/guides/how-to/how-to-enable-performance-mode-fortnite), [FPS settings tool](/tools/fps-settings), [crossplay / party issues](/guides/how-to/fortnite-crossplay-party-invite-not-working).

## Step 1 — Turn on Net Debug Stats

1. Open Fortnite **Settings**.
2. Go to the **Game** / HUD-related tab (labels move slightly by patch).
3. Enable **Net Debug Stats** (network debug overlay).
4. Queue a match and watch **Ping**, **Packet Loss %**, and related counters during fights — not only in the lobby.

Write down: average ping, highest spike, and whether loss % is 0 most of the time or constantly ticking.

## Step 2 — Quick triage (2 minutes)

Answer these before changing ten settings:

1. **Wi-Fi or Ethernet?** If Wi-Fi, treat cable as the first experiment.
2. **Is anyone downloading / streaming 4K on the same connection?** Pause it and retest.
3. **Is Matchmaking Region on Auto?** Try the closest manual region.
4. **Do Creative / Reload / Ranked all lag the same?** Same everywhere → your path/ISP. Only one mode → could be lobby population / routing quirks, still start with local fixes.
5. **Do other online games lag too?** If yes, Fortnite settings will not save you.

## Step 3 — Fixes that actually move the needle

### 1. Switch to wired Ethernet

Wi-Fi interference (neighbors, microwaves, walls, DFS channel hops) is the most common *home* cause of Fortnite packet loss.

- Use Cat5e/Cat6 from router/modem to PC or console
- Avoid long powerline adapters as a first choice; test direct Ethernet first
- On laptops, disable Wi-Fi while the cable is connected so Windows does not prefer wireless

### 2. Set Matchmaking Region manually

1. Settings → **Matchmaking Region**
2. Pick the closest region (examples players use: **NA-East**, **NA-West**, **Europe**, **Brazil**, etc. — use what Fortnite lists for you)
3. Compare ping *and* loss for 2–3 games each

Sometimes a region with +10 ms ping has cleaner routing (less loss) than Auto’s choice.

### 3. Kill local congestion

- Pause Steam/Epic/Xbox/PlayStation downloads and cloud sync (OneDrive/Google Drive uploading huge folders)
- Stop VPN / “game booster” overlays while testing baseline — some help routing, many add hops. Test **off** first, then on
- Close bandwidth-heavy browsers / 4K streams on the same Wi-Fi
- If your router has **QoS / gaming priority**, enable it for the Fortnite device after baseline testing

### 4. Power-cycle and update the network gear

1. Unplug modem and router for 30–60 seconds
2. Power modem first, wait until online, then router, then PC/console
3. Install router firmware updates from the manufacturer
4. If the ISP gateway is ancient, ask for a replacement or use your own router in proper mode

### 5. Prefer 5 GHz / 6 GHz if you must stay on Wi-Fi

- Sit closer to the AP
- Use 5 GHz/6 GHz instead of crowded 2.4 GHz
- Do not game across mesh nodes that backhaul poorly
- Move the router off the floor and away from microwaves / cordless bases

### 6. DNS is rarely magic — but broken DNS feels like “can’t connect”

If queues fail or shop pages hang while matches are fine, try reputable DNS temporarily (and flush DNS on PC). This does **not** usually fix in-match packet loss.

### 7. Console-specific checks

- **PlayStation / Xbox:** Set a fixed resolution/refresh that is stable; test LAN cable through a USB-C Gigabit adapter if the dock/TV setup is flaky
- Enable console network test / NAT type check — **Strict NAT** causes party/join pain more than ping, but double-NAT setups often cause both (see [party invite guide](/guides/how-to/fortnite-crossplay-party-invite-not-working))
- Keep system software updated

### 8. PC checks that look like net lag

- Cap background recording (Instant Replay) if the encoder stutters frames
- Update NIC drivers / chipset drivers
- Disable VPN adapters you are not using
- Confirm you are not thermal-throttling — use [better FPS checklist](/guides/how-to/how-to-get-better-fps-fortnite)

## Step 4 — Interpret Net Debug Stats like a human

| What you see | Likely layer | Next action |
| --- | --- | --- |
| Loss 0%, ping 20–40 stable | Healthy | Stop “optimizing”; work on aim/FPS |
| Loss spikes only in fights | Local Wi-Fi or CPU hitch | Ethernet + FPS stability |
| Constant 1–5%+ loss | Bad Wi-Fi, bad NIC, ISP path | Cable → router → ISP ticket with timestamps |
| Ping 150+ always | Wrong region or distant routing | Manual region; ISP route complaint |
| Fine at 3pm, awful at 8pm | Congestion (home or ISP) | QoS; schedule downloads; document for ISP |

## Step 5 — When it is Epic or your ISP (not you)

- **Everyone in chat lagging / Fortnite status red:** wait it out; changing DNS will not help
- **Traceroutes die in ISP network:** open a ticket with packet-loss screenshots + times + region
- **Only one friend is unplayable:** their network — send them this guide

Be skeptical of paid “ping reducers” that require admin rights and weird certificates. If you try a gaming VPN/routing tool, A/B test with Net Debug Stats on the same playlist for several matches.

## Settings myth-busting

- **Performance Mode** improves FPS/clarity; it does not repair packet loss. Still turn it on if your PC hitching *feels* like lag — [enable Performance Mode](/guides/how-to/how-to-enable-performance-mode-fortnite).
- **Lowering graphics** does not lower ping.
- **Allow Multithreaded Rendering** / other video toggles are not network fixes.
- **Port forwarding** sometimes helps Strict NAT / party joins; it is not a guaranteed ping cure.

## FAQ

### Can I have packet loss with low ping?

Yes. Ping is delay; loss is missing data. Low ping + loss is a classic Wi-Fi or bad route pattern.

### Why are my builds delaying with 30 ping?

Often packet loss, high jitter, or FPS hitches — not the ping number alone. Turn on Net Debug Stats and the FPS counter together.

### Does moving closer to the router help?

On Wi-Fi, yes. On Ethernet, distance to the router barely matters compared to distance to Epic’s servers / ISP backbone.

### Should Matchmaking Region be Auto?

Auto is fine when it picks correctly. If you travel, use a VPN exit, or see consistent high ping, set the region manually and retest.
`,
  },
  {
    slug: 'fortnite-crossplay-party-invite-not-working',
    title: 'Fortnite Crossplay / Party Invite Not Working (Fixes)',
    excerpt:
      'Fix Fortnite party invites, crossplay lobbies, and join failures across PC, PlayStation, Xbox, and Switch — privacy, NAT, links, and platform blocks.',
    category: 'how-to',
    image: '/images/guides/stars-of-the-show.png',
    date: '2026-07-31',
    readTime: 11,
    featured: false,
    tags: [
      'fortnite party invite not working',
      'fortnite crossplay not working',
      'cant join fortnite party',
      'fortnite invite greyed out',
      'fortnite cross platform party',
      'fortnite nat type',
      'fortnite switch crossplay',
    ],
    content: `
## What “crossplay not working” usually means

Most complaints are one of these:

1. **Invite button missing / greyed out**
2. **Invite sends but friend never gets it**
3. **Friend appears offline / “unavailable”**
4. **Join fails with connection / party error**
5. **Different platforms cannot sit in one party** even though Fortnite is crossplay

Crossplay in Fortnite is real — PC, PlayStation, Xbox, Switch, and mobile can party together when accounts, privacy, and network allow it. The failures are almost always settings or linking, not “Epic deleted crossplay.”

Last reviewed: August 1, 2026.

Pair with: [link Epic to consoles](/guides/how-to/how-to-link-epic-games-playstation-xbox-switch), [mute/block/report](/guides/how-to/how-to-report-mute-block-fortnite), [packet loss / ping](/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping).

## Fast checklist (do this in order)

1. Everyone fully **restarts Fortnite** (not just return to lobby).
2. Confirm you are friends on **Epic** (cross-platform parties key off Epic friends more than console friends alone).
3. Check **Party privacy** is not Private on the leader if others need to join via browse.
4. Confirm nobody is in a **match / queue / tournament** lock that blocks invites.
5. Verify console **cross-platform multiplayer / communications** permissions are allowed (especially Switch / kid accounts).
6. Test with a **wired connection** or phone hotspot to rule out Strict NAT / double-NAT.
7. Confirm both lockers are on the Epic accounts you think — wrong link = “who is this person?” chaos.

## Step-by-step: send a crossplay invite that works

1. Add the player as an **Epic friend** (name search / invite link). Console friends lists alone are not always enough for every crossplay path.
2. Both players sit in the **lobby**, not mid-match.
3. Party leader opens the friends / party panel and sends **Invite**.
4. Invitee accepts from the invite toaster / friends panel.
5. Confirm both names show in the same party widget before queueing.

If invites fail only from one direction, the recipient’s privacy or platform communication settings are the prime suspect.

## Platform settings that block crossplay parties

### PlayStation

- Enable consoles’ cross-platform play / multiplayer permissions for the account
- Check privacy → who can invite you to games / messages
- Make sure Fortnite is allowed online for the PSN account
- If two PSN users share a console, confirm the correct profile launched Fortnite

### Xbox

- Xbox privacy → communication & multiplayer → allow multiplayer / cross-network play as needed
- Guests / child accounts often need adult permission toggles
- Confirm the Microsoft account is the one [linked to Epic](/guides/how-to/how-to-link-epic-games-playstation-xbox-switch)

### Nintendo Switch

- Switch online membership active when required for online play
- User settings → check that cross-platform play for Fortnite is enabled (Nintendo prompts / Epic settings can both matter)
- Airplane mode off; wired USB Ethernet adapters often fix flaky wireless party joins

### PC (Epic / Xbox PC app)

- Disable overlays that break overlays/invites while testing (GPU overlay, third-party “boosters”)
- Sign into the Epic account that owns the friends list you expect
- If using Xbox PC Fortnite builds, keep Microsoft ↔ Epic link healthy

## Party privacy and invite confusion

| Setting | What friends experience |
| --- | --- |
| **Public / open-style party** | Easier for friends to join / find you |
| **Friends only** | Only Epic friends can join — strangers cannot |
| **Private** | Join usually requires a direct invite; browsing may fail |

If your friend says “I can’t join from the friends list,” send a fresh invite after setting privacy to Friends. If you are streaming and getting random joins, tighten privacy instead.

## NAT types, Strict NAT, and double routers

Party join failures with “connection failed” while solos queue fine often mean **NAT / UPnP** issues.

Try this sequence:

1. Enable **UPnP** on the router (or set proper port forwards only if you know your router)
2. Avoid **double NAT** (ISP gateway + second router both doing NAT) — set the second device to Access Point mode when possible
3. Test on a phone **hotspot** — if parties suddenly work, your home NAT/routing is the culprit
4. Consoles: run the platform network test and note NAT type (Open/Moderate/Strict naming varies)

Packet loss and party failures can travel together — see [packet loss guide](/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping).

## Crossplay playlist / mode gotchas

- Some limited-time modes, tournaments, or competitive sessions have **platform or party size restrictions**
- If one player is still on an optional update / hotfix, invites can fail until everyone patches
- A player already queued or in **Fill** with randoms may need to leave party/queue before accepting

## “Invite not working” after blocking / reporting

If you blocked someone, they cannot party with you until unblocked. Review blocks under Fortnite social / Epic settings. Guide: [report, mute, and block](/guides/how-to/how-to-report-mute-block-fortnite).

## Account linking mistakes that look like crossplay bugs

- Friend is on an **alt Epic** created by a rushed console prompt
- You linked the wrong PSN/Xbox years ago and still play on it
- Display names changed — you invited the old name. Update names with [change Fortnite name](/guides/how-to/how-to-change-fortnite-name)

Confirm Epic display names in-party, not only Xbox Gamertags / PSN IDs.

## Fix matrix

| Symptom | Try this first |
| --- | --- |
| Greyed-out invite | Both in lobby; not already in a full party; privacy/permissions |
| Invite sends, nothing received | Recipient privacy + platform communications; re-add Epic friend |
| Join fails immediately | NAT/UPnP; hotspot test; same patch version |
| PC + console cannot party | Epic friendship + console crossplay toggles + links |
| Only Switch fails | Switch online + crossplay permission + Wi-Fi/Ethernet |
| Works yesterday, broken today | Restart, patch, Epic outage check, re-login |

## FAQ

### Is Fortnite crossplay on or off by default?

Fortnite is built around cross-platform play. Individual platform privacy settings can still block you.

### Can PlayStation and Xbox party together?

Yes, through Epic friends / Fortnite party systems when both accounts allow cross-network play.

### Why can we chat but not ready up?

Usually one player is restricted from multiplayer, on a different mode, or soft-locked in a queue. Leave party, reform, select the mode on the leader, then ready.

### Do I need PlayStation Plus / Xbox Game Pass / Nintendo Online?

Online multiplayer on consoles generally needs the platform’s online access requirement for that account. Crossplay does not remove Sony/Microsoft/Nintendo subscription rules.
`,
  },
  {
    slug: 'how-to-enable-performance-mode-fortnite',
    title: 'How to Turn On Performance Mode in Fortnite (PC)',
    excerpt:
      'Enable Fortnite Performance Mode step-by-step, what DirectX 12 Performance means, best companion settings, and fixes when the option is missing.',
    category: 'how-to',
    image: '/images/guides/charge-elites.png',
    date: '2026-07-31',
    readTime: 9,
    featured: false,
    tags: [
      'fortnite performance mode',
      'how to turn on performance mode fortnite',
      'fortnite rendering mode',
      'directx 12 performance fortnite',
      'fortnite low end pc settings',
      'fortnite dx12 vs performance',
    ],
    content: `
## What Performance Mode is

**Performance Mode** is a Fortnite **Rendering Mode** on PC that prioritizes frame rate and visual clarity for aiming over cinematic lighting, shadows, and effects. Competitive and low/mid-range PCs use it because:

- Higher average FPS and better 1% lows in endgames
- Cleaner target visibility (less visual noise)
- Lower GPU load → less heat / throttling on laptops

It is a **PC setting**. Consoles do not have the same Rendering Mode dropdown.

Last reviewed: August 1, 2026. Epic has iterated naming (**Performance**, legacy paths, **DirectX 12 Performance**, etc.). Pick the Performance-oriented option available in your build, apply, and restart.

Deep dive after enabling: [better FPS guide](/guides/how-to/how-to-get-better-fps-fortnite) and the interactive [FPS settings tool](/tools/fps-settings).

## How to turn on Performance Mode (step-by-step)

1. Launch Fortnite on **PC** (Epic Games Launcher or supported PC storefront).
2. From the lobby, open **Settings** (gear icon).
3. Open the **Video** tab.
4. Find **Rendering Mode**.
5. Select **Performance** / **Performance - Lower Graphical Fidelity** / **DirectX 12 Performance** (whatever Performance-focused option your patch lists).
6. Click **Apply**.
7. **Restart Fortnite** when prompted — Rendering Mode changes do not fully apply mid-session.
8. Re-open Settings → Video and confirm the mode stuck.
9. Turn on **Show FPS** and play one real match (not only Creative) to verify stability.

### First companion settings (do these the same session)

| Setting | Recommendation | Why |
| --- | --- | --- |
| Window Mode | **Fullscreen** | Lowest display latency |
| Resolution | Native monitor res (often 1920×1080 competitive) | Clarity without crazy GPU cost |
| 3D Resolution | **100%** | Dropping this blurs enemies |
| VSync | **Off** | Removes extra input lag |
| Frame Rate Limit | Unlimited or a high competitive cap | Stable frame times matter |
| NVIDIA Reflex | **On + Boost** (NVIDIA) | Cuts system latency |
| Shadows | **Off** | Huge FPS reclaim |
| Effects / Post Process | **Low** | Less visual clutter |
| Motion Blur | **Off** | Always |

Full presets: [FPS settings tool](/tools/fps-settings).

## Performance vs DirectX 12 (how to choose)

| Goal | Prefer |
| --- | --- |
| Max FPS / clarity on mid or old GPUs | Performance Mode |
| Newer GPU, want DX12 feature path + still competitive | **DirectX 12 Performance** when listed |
| Screenshots / quality showcase | Non-performance quality modes (expect FPS loss) |

Rule of thumb: if you are dropping below your monitor refresh in stacked endgames, stay on a Performance path. If DX12 Performance stutters after a patch, switch back to standard Performance and update GPU drivers.

## Verify it actually enabled

- Settings → Video still shows the Performance rendering selection after restart
- Visuals look flatter (fewer fancy shadows / effects) — that is expected
- FPS counter rises in the same Creative map / BR drop as before
- Input feels snappier in Fullscreen + Reflex On

If FPS is unchanged, you may still be CPU-bound, resolution-bound, or on Wi-Fi hitches that *feel* like FPS. Check [packet loss vs FPS](/guides/how-to/how-to-fix-fortnite-packet-loss-high-ping).

## Fixes when Performance Mode is missing

1. Confirm you are on **PC Fortnite**, not console.
2. Update Fortnite fully; Rendering Mode options change across seasons.
3. Update **GPU drivers** (clean install if the dropdown is empty/grey).
4. Verify game files in the Epic Games Launcher.
5. Restart the PC after driver installs.
6. Try another Rendering Mode, Apply, restart, then select Performance again.
7. Disable overlays temporarily (GPU overlay, Discord hardware accel) if the settings UI glitches.
8. Ensure Windows is not in a broken GPU fallback (laptop: plug in power; set Fortnite to high-performance GPU).

Unsupported / ancient GPU + OS combos may hide options — that is a hardware limit, not a menu bug.

## Laptop-specific tips

- Plug into power; Windows “Battery saver” tanks clocks
- Use the discrete NVIDIA/AMD GPU for Fortnite in Windows Graphics settings
- Cap FPS near a stable number to reduce heat throttling after enabling Performance Mode
- Elevate the chassis for airflow — Performance Mode cannot beat thermal limits

## Common mistakes

- Changing Rendering Mode **without restarting**
- Lowering **3D Resolution** under 100% for “more FPS” and wondering why tracking feels worse
- Leaving **VSync On** and blaming Performance Mode for input delay
- Expecting Performance Mode to fix **packet loss** — different problem
- Comparing lobby FPS to Chapter 7 endgame FPS

## After Performance Mode: still not enough FPS?

Work the rest of the stack:

1. Shadows Off, Effects Low
2. Fullscreen + Reflex On + Boost
3. Close Chrome / capture overlays
4. Follow the full [FPS checklist](/guides/how-to/how-to-get-better-fps-fortnite)
5. Practice settings on a busy Creative map from the [codes list](/codes)

## FAQ

### Does Performance Mode ban you or look like a cheat?

No. It is an official Epic rendering option.

### Is Performance Mode allowed in tournaments?

Yes — it is a standard competitive setting. Always follow the specific cup ruleset for overlays / software.

### Will I lose view distance information?

You can still set View Distance separately. Do not smash it to Near just because you enabled Performance Mode — information matters in Ranked.

### Should every PC use it?

Almost every competitive PC benefits. Ultra-high-end players who prefer DX12 visuals can A/B test, but most still keep a Performance-oriented mode for ranked.
`,
  },
]

export function getLocalizedPosts(): Post[] {
  return posts.filter((p) =>
    (localizedGuideSlugs as readonly string[]).includes(p.slug)
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

/** Newest first — keeps /guides looking alive for crawlers and humans. */
export function getPostsSorted(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostsByCategory(category: Category): Post[] {
  return getPostsSorted().filter((p) => p.category === category)
}

export function getFeaturedPosts(): Post[] {
  return getPostsSorted().filter((p) => p.featured)
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
