export type LeakCategory = 'shop' | 'gameplay' | 'cosmetics' | 'season' | 'chapter'
export type LeakStatus = 'active' | 'watching' | 'shipped' | 'dead'

export interface LeakPost {
  slug: string
  title: string
  excerpt: string
  category: LeakCategory
  status: LeakStatus
  /** ISO date the leak was first widely reported / we filed it */
  date: string
  /** Optional: when Epic confirmed or when it hit live */
  confirmedDate?: string
  readTime: number
  featured?: boolean
  image?: string
  tags: string[]
  content: string
}

export const leakCategories: {
  id: LeakCategory
  label: string
  description: string
}[] = [
  {
    id: 'shop',
    label: 'Shop',
    description: 'Item Shop, Pirate Shop Access, and free-claim systems.',
  },
  {
    id: 'gameplay',
    label: 'Gameplay',
    description: 'Weapons, timers, Power Hours, and BR systems still in files.',
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics',
    description: 'Sprites, collab kits, and locker rows before they go live.',
  },
  {
    id: 'season',
    label: 'Season',
    description: 'Treasure Hunters calendar and mid-season event teasers.',
  },
  {
    id: 'chapter',
    label: 'Chapter',
    description: 'Chapter 8 and long-horizon file finds — furthest from confirmed.',
  },
]

export const LEAK_STATUS_LABEL: Record<LeakStatus, string> = {
  active: 'Unconfirmed',
  watching: 'Watching',
  shipped: 'Shipped',
  dead: 'Likely cut',
}

export const leaks: LeakPost[] = [
  {
    slug: 'scott-pilgrim-fortnite-collab-leak',
    title: 'Scott Pilgrim x Fortnite? Scott & Ramona Skins Leak (LEGO styles)',
    excerpt:
      '12 Nov files reportedly add two comic/anime‑shaded skins with LEGO styles: a bass‑playing male believed to be Scott Pilgrim and a goggles/hammer‑themed female believed to be Ramona Flowers — plus an emote and 3 pickaxes. Not announced by Epic.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-12',
    readTime: 5,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'scott pilgrim fortnite',
      'ramona flowers fortnite',
      'fortnite scott pilgrim skins',
      'fortnite lego style collab',
      'power of love sword fortnite emote',
    ],
    content: `
## What was reportedly found (12 Nov files)

- Hidden **male skin** thought to be **Scott Pilgrim**
  - **Custom lobby pose** and a **LEGO** style
  - **Bass guitar** cosmetic (Scott plays bass)
  - **Comic/anime‑style shading**
  - An **emote** that uses a **sword prop** with **hearts** floating off it (echoing the “Power of Love” sword), with **Love**, **Energy**, and **Hilt** effects
  - A **back bling** with a matching **hilt effect**
- Hidden **female skin** thought to be **Ramona Flowers**
  - **Custom lobby pose** and **LEGO** style
  - **Goggles Off** style, plus **Blue** and **Teal** styles
  - Comes with **drums**, a **back bling**, and **two pickaxes**; the second pickaxe shows **star** and **speed‑line** effects (fans think this nods to her giant hammer)

## Set overview

- Cosmetics listed across the set: **2 back blings, 3 pickaxes, 1 emote**
- **Release date and price are unknown**. This has not been announced by Epic.

## Confidence & caveats

These are **unconfirmed** collaboration reads based on file labels and effects. Names, looks, and pricing could change before release — or be cut.

Related trackers: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks) · Season beat cadence: [Captain’s Days stack](/leaks/captain-days-content-stack)

**Filed:** 12 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'puss-in-boots-fortnite-collab-leak',
    title: 'Puss in Boots Fortnite Collab Leak — Sidekick Voice Lines, Wolf Warrior Skin',
    excerpt:
      '12 Nov files reportedly add a two‑legged furry Sidekick (feathered hat, Sword & Hat Off styles) with its own emote, voice lines in 12 languages, and Kicks — plus a hooded wolf warrior skin (possibly Death), LEGO style, glowing head/body effects, custom head skeleton. Not announced.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-12',
    readTime: 5,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'puss in boots fortnite',
      'death wolf fortnite',
      'fortnite sidekick leak',
      'fortnite voice lines leak',
      'pirate themed shop tiles',
    ],
    content: `
## What was reportedly found (12 Nov files)

**Sidekick (likely Puss)**
- **Furry, two‑legged Sidekick** with **feather** and **beard** materials
- **Sword** and **Hat Off** styles
- Its **own emote**
- **Voice lines in 12 languages** (happy, angry, etc.)
- Matching **Kicks**

**Male skin (fans think “Death,” the wolf)**
- **Custom lobby pose**
- **Fur** and **tail**, **Hood** style
- **LEGO** style
- **Custom non‑human head skeleton**
- **Glowing head** and **body** effects
- Matching **back bling** and **pickaxe** with custom effects
- **Traversal emote** with a **prop**, **spin** effects, and **music** (special version when used with the skin)

## Bundle & shop

- Files suggest the **Sidekick and the skin are bundled**, with **pirate‑themed shop tiles**
- **Release date/price unknown**. Not announced by Epic.

Links for context: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks) · Season cadence: [Captain’s Days](/leaks/captain-days-content-stack)

**Filed:** 12 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'doki-doki-literature-club-fortnite-leak',
    title: 'Doki Doki Literature Club x Fortnite? 4 Hidden Anime Skins Leaked',
    excerpt:
      '12 Nov update reportedly hides 4 cel‑shaded anime female skins, each with a custom lobby animation; at least 2 with cloth physics and 1 with special hair physics. Sold as a 4‑pack bundle and separately. Fans think DDLC — NOTHING confirmed.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-12',
    readTime: 4,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'doki doki literature club fortnite',
      'ddlc fortnite',
      'anime skins fortnite leak',
      'cel shaded fortnite skins',
      'fortnite four anime skins',
    ],
    content: `
## What was reportedly found (12 Nov files)

- **4 hidden anime / cel‑shaded female skins**
- Each has a **custom lobby animation**
- **At least 2** show **cloth physics** and **1** shows **special hair physics**
- Sell‑through noted as **one bundle of all 4**, plus **individual** purchase options
- **No other cosmetics** were referenced in the same notes

## Is this DDLC?

Fans immediately linked "four anime girls" to **Doki Doki Literature Club** (**Sayori, Natsuki, Yuri, Monika**), but there is **no confirmation** in names, voice, or marketing — treat this as **speculation only** until Epic announces it.

**Release date unknown.** Keep an eye on [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks).

**Filed:** 12 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'fortnite-winterfest-2026-dates',
    title: 'Fortnite Winterfest 2026 Dates Leak (Dec 17–Jan 7) + Seasonal Locker Filter',
    excerpt:
      'According to leaks, Winterfest 2026 runs 17 Dec 2026 to 7 Jan 2027. Files also reference a “Seasonal Locker Filter” with winterfest/christmas tags. Not announced; usual cabin/presents are not confirmed.',
    category: 'season',
    status: 'active',
    date: '2026-11-12',
    readTime: 4,
    image: '/images/guides/treasure-hunters-teaser.jpg',
    tags: [
      'fortnite winterfest 2026 dates',
      'winterfest start date',
      'seasonal locker filter',
      'fortnite christmas event 2026',
      'fortnite winter event dates',
    ],
    content: `
## Dates (leaked)

Reports say **Winterfest 2026** runs **17 December 2026 → 7 January 2027**. This window would fall **inside Chapter 8 Season 1** (which is slated to start **5 December 2026** per the [Chapter 8 dates page](/leaks/fortnite-chapter-8-season-2-release-date)).

## New feature reference

Files also reference a **“Seasonal Locker Filter”** tagged **winterfest / christmas / winter**. Its exact behavior is **unknown**; our best read is a **locker filter grouping seasonal cosmetics** (guess, not confirmed).

## Not confirmed

- Epic has **not** announced these dates
- The traditional **cabin / daily presents** are **not confirmed** for 2026

Season context: [Season hub](/season) · [Captain’s Days cadence](/leaks/captain-days-content-stack)

**Filed:** 12 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'fortnite-pirate-chest-prizes-week-3-4',
    title: 'Pirate Chest Prizes Week 3–4 — Gold Miku & Gold Teto, Corvette, Urus',
    excerpt:
      'Leaked prize pools: Week 3 adds Solid Gold Hatsune Miku, Miku’s Takarabako, PPPP Jam Track, May Fortune Find You loading screen, Gold Corvette ZR1; Week 4 adds Solid Gold Kasane Teto, Rogue Wave & Tidewalker back bling, Sea Shanty, Oscar’s Wraps, Gold Lamborghini Urus SE.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-12',
    readTime: 4,
    image: '/images/guides/pirate-shop-access.jpg',
    tags: [
      'fortnite pirate chest prizes week 3',
      'fortnite pirate chest prizes week 4',
      'solid gold hatsune miku',
      'solid gold kasane teto',
      'pirate shop token effects',
    ],
    content: `
## Leaked prize pools

**Week 3**
- **Solid Gold Hatsune Miku** outfit
- **Miku’s Takarabako** Back Bling
- **"PPPP"** Jam Track
- **"May Fortune Find You"** loading screen
- **Gold Chevrolet Corvette ZR1**

**Week 4**
- **Solid Gold Kasane Teto** outfit
- **Rogue Wave** and **Tidewalker** Back Bling
- **"Sea Shanty"** Jam Track
- **"Oscar’s Wraps"** loading screen
- **Gold Lamborghini Urus SE**

## Visual effects update (12 Nov)

In‑game change noted on **12 Nov**: **chest prize drop effects now differ** — a **Pirate Shop Token** prize keeps the **gold** effect, while the **weekly skin prize** now shows a **silver** effect.

## Dates and links

- Exact week start dates were **not** given
- Context: Teto/Miku weekend at Friendship Villa — see [Kasane Teto Music Pass & Friendship Villa](/leaks/kasane-teto-fortnite-music-pass-friendship-villa)
- Previous swap: [Gold Lil’ Uzi Vert Jr.](/leaks/gold-lil-uzi-vert-sprite)
- Odds: [Pirate Shop odds](/leaks/pirate-shop-odds)

**Filed:** 12 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'kasane-teto-fortnite-music-pass-friendship-villa',
    title:
      'Kasane Teto in Fortnite — TWINDRILL DIVA Music Pass Live (Nov 12) & Friendship Villa (Nov 15)',
    excerpt:
      'Kasane Teto’s TWINDRILL DIVA Music Mini‑Pass is live from 12 November 2026 (1,000 V‑Bucks or included with Fortnite Crew) and runs until 20 January 2027. On 15 November, Teto and Cap’n Hatsune Miku arrive at Friendship Villa on Crossbones Isle.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-11',
    confirmedDate: '2026-11-12',
    readTime: 4,
    featured: true,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'kasane teto fortnite',
      'kasane teto fortnite release date',
      'twindrill diva music pass',
      'fortnite music pass kasane teto',
      'friendship villa fortnite',
      'kasane teto fortnite skin',
      'birdbrain fortnite jam track',
    ],
    content: `
## What was reported

Leaks on **11 November 2026** showed the full **Kasane Teto** set — outfit, **Pearto** Back Bling, and a **music‑reactive edit style**. That style sits as the final tier of the upcoming Music Pass. **Epic has since announced** the pass officially as **TWINDRILL DIVA**.

**Now live (12 Nov)** — **TWINDRILL DIVA Music Mini‑Pass**
- Starts **12 November 2026**, ends **20 January 2027**
- Costs **1,000 V‑Bucks** (or is **included with an active Fortnite Crew** subscription)
- **Buying it unlocks the Kasane Teto Outfit immediately**

Pass rewards called out by Epic include:
- **Baguette Bonker** Pickaxe
- **Pearto** Back Bling
- **Hue Futura** Instrument
- **Miku & Teto Slippers** Kicks
- Final‑tier: **Kasane Teto’s music‑reactive style**

Jam Tracks in the pass:
- "**BIRDBRAIN**" (Jamie Paige, OK Glass feat. Kasane Teto)
- "**Shut Up and Dance**" (Walk the Moon)
- "**Chronicles of Destiny**" (The Home of Happy, James Corbin)
- "**Sa‑Sen!**" (MONT, Risa, Musashi)

In **Battle Royale**, on **15 November 2026** Kasane Teto’s crew arrives on **Crossbones Isle**. Players can find **Kasane Teto** and **Cap’n Hatsune Miku** at a new POI named **Friendship Villa** (Treasure Hunters week 3).

## What the 12 Nov update also added

- **Cap’n Hatsune Miku** bundle references: **emote** (likely “Mesmerizer,” with a **special version when used with her**), **back bling**, **pickaxe**, and **mic**
- **Teto/Miku NPC interactions** were added
- **Leekcapper** (Miku’s item) and the **Flapjack Rifle** join the loot pool with this weekend’s enable
- A **third Map Fragment** lands the same weekend
- **Gold Teto** and **Gold Miku** come via chest prizes — see: [Chest prizes week 3–4](/leaks/fortnite-pirate-chest-prizes-week-3-4)

## What this means

- The Music Pass hits right alongside the season’s collab cadence. For the same 12 Nov reset, see the [Lil Uzi Vert Jam Tracks](/leaks/lil-uzi-vert-fortnite-jam-tracks).
- Friendship Villa should show up on Crossbones Isle map pins once it flips — keep an eye on the [interactive map](/fortnite-map) and the [season hub](/season) for the enable. Captain week context lives on [Captain’s Days](/leaks/captain-days-content-stack).

## What is not confirmed

- Exact unlock time in UK timezones
- What Teto or Miku drop at Friendship Villa, or whether there are quests/weapons there
- Whether separate Item Shop Teto cosmetics appear

## Sources

- Epic Games: Kasane Teto headlines the next Fortnite Music Pass — https://www.fortnite.com/news/kasane-teto-headlines-the-next-fortnite-music-pass

**Filed:** 11 November 2026. **Updated / confirmed:** 12 November 2026. Status: **Shipped** (watching for the 15 Nov POI flip).
`,
  },
  {
    slug: 'fortnite-chapter-8-season-2-release-date',
    title: 'Fortnite Chapter 8 Season 1 & Season 2 Release Dates (Dec 5 & Mar 4)',
    excerpt:
      'According to leaks on 10 Nov 2026, Chapter 8 Season 1 is scheduled for 5 December 2026 and Season 2 for 4 March 2027 — putting Season 1 at roughly 89 days. These come from Epic scheduling, not a public announcement, and could still shift.',
    category: 'chapter',
    status: 'watching',
    date: '2026-11-10',
    readTime: 3,
    featured: true,
    image: '/images/guides/hit-by-chaos.webp',
    tags: [
      'fortnite chapter 8 release date',
      'fortnite chapter 8 season 1 release date',
      'fortnite chapter 8 season 2 release date',
      'when does chapter 8 start fortnite',
      'fortnite c8s2',
    ],
    content: `
## What was reported

According to leaks on **10 November 2026**, **Chapter 8 Season 1** is scheduled for **5 December 2026** and **Chapter 8 Season 2** for **4 March 2027**. That puts Chapter 8 Season 1 at roughly **89 days**.

These dates are described as coming from Epic's internal scheduling rather than a public blog or Status post and could still change.

## What this means

Timing-wise, this points to **Treasure Hunters** (Chapter 7) wrapping around early December with downtime leading into Chapter 8. Exact end times and maintenance windows were not included in the reports. Season context lives on the [season hub](/season); Chapter 8 gameplay shaping so far: [Chapter 8 finishing moves](/leaks/chapter-8-finishing-moves).

## Date summary

| Season | Date |
| --- | --- |
| Chapter 8 Season 1 | 5 December 2026 |
| Chapter 8 Season 2 | 4 March 2027 |

## What is not confirmed

- Exact launch time or downtime window
- Any live event or end-of-chapter event
- Chapter 8 theme and battle pass contents
- Whether these dates move

**Filed:** 10 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'lil-uzi-vert-fortnite-jam-tracks',
    title: 'Lil Uzi Vert Fortnite Jam Tracks — Poured, Say It Was & What You Sayin’ (Nov 12)',
    excerpt:
      'According to leaks on 10 Nov 2026, three Lil Uzi Vert Jam Tracks — Poured, Say It Was, and What You Saying — are slated for 12 November 2026. On 11 Nov, leaks also showed a new Lil Uzi Vert outfit, and the leaked shop schedule lists Lil Uzi Vert Icon Series outfits for 12 November 2026. Name/price still unannounced.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-10',
    readTime: 3,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'lil uzi vert jam tracks fortnite',
      'lil uzi vert fortnite festival',
      'poured fortnite jam track',
      'say it was fortnite',
      'what you saying fortnite',
      'new lil uzi vert fortnite skin',
    ],
    content: `
## What was reported

According to leaks on **10 November 2026**, three **Lil Uzi Vert Jam Tracks** are slated to arrive on **12 November 2026**:

- **Poured**
- **Say It Was**
- **What You Saying**

That timing matches Epic’s **Item Shop calendar** slot for the **Lil Uzi Vert** set on **12 November** (**7 PM ET** — midnight UK rolling into **13 November**), already noted on our [Pink Star Lil Uzi Vert outfit](/leaks/pink-star-lil-uzi-vert-outfit) page.

## Jam Tracks 101

Jam Tracks are playable songs in **Fortnite Festival** and can also be equipped as **lobby music** or used in other supported modes. Pricing and bundles vary by track and were not part of the reports referenced here.

## Also noted (11 Nov update)

Leaks on **11 November 2026** showed a **new Lil Uzi Vert outfit** in the works, and the **leaked shop schedule lists Lil Uzi Vert Icon Series outfits for 12 November 2026** (same day as these Jam Tracks). **Name and V‑Bucks price remain unannounced**.

## Also added (12 Nov update)

Update files on **12 November 2026** include a fresh **Lil Uzi Vert set** beyond the tracks:
- **2 outfits** (one **Reactive**)
- **2 emotes** — "**XO Tour Lif3**" and "**What You Sayin’**"
- **2 back blings**
- **Pickaxe**
- **Guitar**
- **Wrap**
- **Loading screen**

## Links

- [Pink Star Lil Uzi Vert outfit](/leaks/pink-star-lil-uzi-vert-outfit)
- [Lil Uzi Vert Stronghold update](/leaks/lil-uzi-vert-stronghold-update)
- Live tracker: [Item Shop](/tools/item-shop)

## What is not confirmed

- V-Bucks prices for the Jam Tracks
- Whether the tracks ship bundled or individually
- The second outfit’s name, look, price, or date

**Filed:** 10 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'brutal-beachhead-buggy-poi',
    title: 'Brutal Beachhead Returns as Buggy’s POI in Fortnite',
    excerpt:
      'According to leaks, Brutal Beachhead is coming back soon as Buggy’s named POI — a circus-striped ship and tent overhaul matching the One Piece collab. An exact enable date has not been given.',
    category: 'season',
    status: 'watching',
    date: '2026-11-08',
    readTime: 3,
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'brutal beachhead fortnite',
      'buggy fortnite poi',
      'buggy one piece fortnite',
      'fortnite brutal beachhead leak',
      'treasure hunters buggy',
    ],
    content: `
## What was reported

According to leaks on 8 November 2026, **Brutal Beachhead is returning soon as Buggy’s POI**.

The leaked look is a circus-and-ship overhaul of the old beachhead: red-and-white striped tents, carnival bunting, and a huge tilted ship hull painted in matching circus stripes, with Buggy’s clown-skull Jolly Roger flying over the lot. It reads as Buggy the Clown’s Big Top rather than the military landing that used to sit there.

## What this means

Buggy is the next One Piece crossover beat after the Straw Hats. Epic’s Treasure Hunters shop calendar already pointed at a **Buggy** Item Shop night on **13 November** — that shop date is separate from when the named POI itself might flip. A captain POI usually becomes the place to find that week’s boss, loot, or quests, the same pattern as other Treasure Hunters captain spots (for example [Lil Uzi Vert’s Stronghold](/leaks/lil-uzi-vert-stronghold-update)).

Map / season context: [interactive map](/fortnite-map) · [season hub](/season) · [One Piece set](/sets/one-piece)

## What is not confirmed

- An exact in-game enable date or time (the leak only said “soon”)
- Whether Buggy is a boss you can fight there, what he drops, or if the rename is only cosmetic
- Whether the map change lands with the 13 November shop row or on a different day
- Loot tables, vaults, or quests tied to the location

**Filed:** 8 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'pirate-shop-afk-squad-fill-ban',
    title: 'AFK Squad Fill for Pirate Shop Token = Matchmaking Ban',
    excerpt:
      'Fortnite warns that going AFK in squad fills so randoms find the Pirate Shop Token for you can get you matchmaking banned. Hot from tonight’s dump — don’t AFK farm carries.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-07',
    readTime: 3,
    featured: true,
    image: '/images/guides/pirate-shop-access.jpg',
    tags: [
      'pirate shop token afk ban',
      'fortnite matchmaking ban',
      'pirate shop access squad fill',
      'fortnite afk ban',
    ],
    content: `
## What just dropped

Tonight’s post, straight:

> **Fortnite warns that going AFK in squad fills to let randoms find the Pirate Shop Token for you can get you matchmaking banned**

That’s the AFK-carry meta: queue **squad fill**, stand still, hope a random opens enough chests that the **Pirate Shop Access / Token** rolls and the whole party gets it. Epic is saying that pattern can eat a **matchmaking ban**.

## Why people were doing it

- Squads are widely reported to **share** the Treasure Hunt prize when one teammate finds it
- The token is absurdly rare, so players farm volume any way they can
- AFK tools, paid carries, and “I’ll sit while you chest” fills blew up alongside the black-market account listings

Epic / Fortnite Status already hit the other side of this week: **equal odds**, **no buying accounts**, **no fake tools**. This warning is the matchmaking version of the same crackdown.

## What not to do

| Move | Risk |
| --- | --- |
| AFK in squad fill while randoms open chests | **Matchmaking ban** (tonight’s warning) |
| Buy an account that “already has” Pirate Shop Access | Scam + ToS — prize is not transferable |
| UEFN / Creative “token farm” islands | Already getting banned / scrubbed |
| Paid AFK software / carry services | ToS ban territory |

## What to do instead

Play the matches. Open chests yourself in BR. Steps: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

Still watching later-season odds boosts: [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours).

**Filed:** 7 November 2026 (same-day post). Status: **Watching** until Epic prints it on Status / MOTD.
`,
  },
  {
    slug: 'pirate-shop-odds',
    title: 'Fortnite Pirate Shop Odds — Official Chest Drop Rates',
    excerpt:
      'Epic published Treasure Hunt chest odds: Pirate Shop Access is 1 in 137,500, Weekly Gold Outfit 1 in 1,562,500. Treasure Hours and a Nov 7–8 night window boost Access and Gold further.',
    category: 'shop',
    status: 'shipped',
    date: '2026-11-07',
    confirmedDate: '2026-11-07',
    readTime: 4,
    featured: true,
    image: '/images/guides/pirate-shop-access.jpg',
    tags: [
      'fortnite pirate shop odds',
      'pirate shop access odds',
      'fortnite gold outfit odds',
      'treasure hours boost',
      'pirate shop token chance',
    ],
    content: `
## Official base odds (Fortnite Status, 7 Nov)

Per-chest Treasure Hunt rates in a normal match — **constant since season launch**, except during Treasure Hours:

| Prize | Odds |
| --- | --- |
| Weekly Gold Outfit | **1 : 1,562,500** |
| **Pirate Shop Access** | **1 : 137,500** |
| Weekly Vehicle & Decal | **1 : 7,813** |
| Weekly Pickaxe or Back Bling | **1 : 568** |
| Weekly Jam Track | **1 : 391** |
| Weekly Loading Screen | **1 : 272** |
| Gizmo (any) | **1 : 127** |

Gold Outfit is rarer than Pirate Shop Access. Other than **Gizmos**, you cannot roll the same treasure twice.

## Treasure Hours multipliers

Earlier 7 Nov window:
- Pirate Shop Access: **1.5×** (~1 : 91,667)
- Weekly Gold Outfit: **7.5×**
- Weekly Vehicle & Decal: **10×**

7 Nov window — **9–11 PM ET** (**02:00–04:00 UK on 8 Nov**):
- Pirate Shop Access: **2.0×** (~1 : 68,750)
- Weekly Gold Outfit: **10.0×**

Status said future Hours may go higher and they will announce it.

Canonical how-to: [Pirate Shop Access guide](/guides/how-to/how-to-get-pirate-shop-access-fortnite).  
Also: [Power Hours — 7 Nov window](/leaks/pirate-shop-power-hours) · [AFK ban](/leaks/pirate-shop-afk-squad-fill-ban)

**Shipped:** 7 November 2026 (Fortnite Status).
`,
  },
  {
    slug: 'lil-uzi-vert-stronghold-update',
    title: 'Lil Uzi Vert Takes the Stronghold — Lil’ SMG + Lil’ Uzi Vert Jr. Sprite',
    excerpt:
      'Nov 8 Stronghold takeover: Lil’ SMG ramps fire rate the longer you hold and adds move speed; Lil’ Uzi Vert Jr. Sprite fires a Chug Splash effect when you restore shields.',
    category: 'gameplay',
    status: 'watching',
    date: '2026-11-07',
    readTime: 5,
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'lil uzi vert fortnite',
      'lil smg fortnite',
      'lil uzi vert jr sprite',
      'lil uzi stronghold',
      'fortnite treasure hunters leaks',
    ],
    content: `
## The drop (7 Nov posts)

Dataminer write-ups for **tomorrow’s** Lil Uzi Vert window:

> **Lil Uzi Vert takes over the Stronghold, Nov 8**
>
> - **Lil’ Uzi Vert’s Lil’ SMG** — spits **faster the longer you hold** the trigger and gives a **movement speed** boost
> - **Lil’ Uzi Vert Jr. Sprite** — triggers a **Chug Splash** effect when **restoring shields**

That pairs with Epic’s week-two calendar (Lil Uzi + Cuddle Team Leader claiming a fort / **Lil’ Uzi’s Stronghold** on Crossbones Isle) plus “new weapons, strange new Sprites.”

## Kit breakdown

| Piece | Claim | Confidence |
| --- | --- | --- |
| Stronghold takeover **8 Nov** | Calendar + datamine | High |
| Lil’ SMG ramp fire rate | Datamine ability text | Medium–high — verify tooltip in-client |
| Lil’ SMG move-speed while firing | Datamine | Medium–high |
| Lil’ Uzi Vert Jr. Sprite Chug Splash on shield restore | Datamine / Sprite files | Medium–high |
| Exact damage / mag / cooldown numbers | Not in the short post | Wait for live tooltips |
| Boss drop vs floor loot for the SMG | Pattern guess (like Shock Rocket) | Low until it ships |

## Related pages

- Early exotic SMG gameplay clip: [Lil Uzi Vert SMG gameplay leak](/leaks/lil-uzi-vert-smg-gameplay)
- Gold prize swap: [Gold Lil’ Uzi Vert Jr.](/leaks/gold-lil-uzi-vert-sprite)
- After it is live: [loadout builder](/tools/loadout-builder) · [sprites](/sprites) · [season hub](/season)

**Filed:** 7 November 2026. Status: **Watching** (flips to Shipped when tooltips match).
`,
  },
  {
    slug: 'lil-uzi-vert-smg-gameplay',
    title: 'Lil Uzi Vert Exotic SMG Gameplay Leak',
    excerpt:
      'Nov 1 gameplay clip of Lil Uzi Vert’s exotic SMG in a live match — the first look at the gun before the Stronghold week named it Lil’ SMG.',
    category: 'gameplay',
    status: 'watching',
    date: '2026-11-01',
    readTime: 4,
    featured: true,
    image: '/images/guides/secret-weapon.webp',
    tags: [
      'lil uzi vert smg',
      'fortnite exotic smg leak',
      'lil smg fortnite',
      'fortnite weapon leak',
    ],
    content: `
## What shipped in the leak

On **1 November 2026** (Treasure Hunters launch day), a dataminer posted **“LIL UZI VERT’s SMG EXOTIC GAMEPLAY”** — actual in-match footage, not just an icon dump.

Takeaways from that clip + follow-up posts:

- Labeled **exotic** — special perk gun, not a skin wrap on a normal SMG
- Tied to the **Lil Uzi Vert** collab week
- Later posts name it **Lil’ SMG** with **ramping fire rate** + **move speed** ([Stronghold update](/leaks/lil-uzi-vert-stronghold-update))

## Why it mattered on day one

Launch-day Epic marketing already teased Lil Uzi as a later captain, but the **gun feel** was still a file find. The clip is what moved it from “maybe a skin” to “this is a boss / exotic SMG.”

## Current status

| Claim | Status |
| --- | --- |
| Exotic SMG exists in files / was playable in a build | Leaked Nov 1 |
| Named Lil’ SMG with ramp + move speed | Follow-up datamine (7 Nov) |
| Live in BR loot / boss drop | Verify after Stronghold enable |
| Final damage / mag | Check [weapons](/weapons) / [loadout builder](/tools/loadout-builder) once live |

**Filed:** 1 November 2026.
`,
  },
  {
    slug: 'gold-lil-uzi-vert-sprite',
    title: 'Gold Lil’ Uzi Vert Replaces Gold A$AP Rocky — Now Live',
    excerpt:
      'Gold Lil’ Uzi Vert and the Diamond and Gold back bling replaced Gold A$AP Rocky in the Treasure Hunt chest prizes on 8 November 2026. Pirate Shop Access stays in the pool. A So Kawaii loading screen also joined the prize list.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-07',
    confirmedDate: '2026-11-08',
    readTime: 3,
    featured: true,
    image: '/images/guides/sprites-collect.webp',
    tags: [
      'gold lil uzi vert',
      'gold asap rocky fortnite',
      'fortnite gold chest prize',
      'pirate shop token stays',
    ],
    content: `
## Live swap (8 Nov)

Filed 7 Nov as “one more day” on Gold A$AP Rocky; on **8 November 2026** (around 13:59 UTC / 1:59pm UK) leaks said the replacement was minutes away, then that **Lil Uzi Vert had replaced A$AP Rocky** in the chest prizes.

## What’s live now

- Gold outfit: **Solid Gold Lil Uzi Vert** (diamonds-and-gold flavor)
- Back bling: **Diamond and Gold**
- A **So Kawaii** loading screen (pink / anime-style; flavor text credits artist Golden Wolf) also entered the prize pool around the same time
- **Pirate Shop Access** / Token stays in the weekly Treasure Hunt pool

## Farm notes

- Open **BR chests** — no fixed POI for gold outfits
- Squads are widely reported to share a Treasure Hunt prize
- Guides and odds: [Pirate Shop Access guide](/guides/how-to/how-to-get-pirate-shop-access-fortnite) · [sprites](/sprites) · [Pirate Shop odds](/leaks/pirate-shop-odds)

**Shipped:** 8 November 2026.
`,
  },
  {
    slug: 'upcoming-item-shop-leaks',
    title:
      'Upcoming Item Shop Leaks — Teto Music Pass, Lil Uzi, Buggy, VW Golf GTI, Beach Bod Batman',
    excerpt:
      'New rows added for 11 Nov: Kasane Teto Music Pass items and Lil Uzi Vert outfits (12 Nov), Buggy + Volkswagen Golf II GTI (13 Nov), Beach Bod Batman (15 Nov), and The Odyssey / High Stakes Summer / Golden Tactical Pack (16 Nov). Leaked/unconfirmed — times and prices unknown.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-07',
    readTime: 4,
    featured: true,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'fortnite item shop leaks',
      'nemia fortnite',
      'zoro sanji chopper shop',
      'fortnite star wars leak',
      'honkai star rail fortnite',
    ],
    content: `
## Upcoming shop dates (leaked 11 Nov)

Leaked/unconfirmed shop schedule — **times and prices unknown**:

- **12 November 2026:** **Kasane Teto** Music Pass items (see [Kasane Teto page](/leaks/kasane-teto-fortnite-music-pass-friendship-villa)); **Lil Uzi Vert** Icon Series outfits
- **13 November 2026:** **Buggy** (One Piece) — POI context: [Buggy POI](/leaks/brutal-beachhead-buggy-poi); **Volkswagen Golf II GTI** (car)
- **15 November 2026:** **Beach Bod Batman**
- **16 November 2026:** **The Odyssey**; **High Stakes Summer**; **Golden Tactical Pack**

## Tonight / tomorrow rows (7 Nov dump)

Dataminer shop posts stacked a lot of rows in one night:

**Tonight**
- New **Nemia** skin / full bundle (**1,200 VB** listed on the solo drop post)
- **Ben 10** skins return
- **Brainrot** skins return
- **Tung Tung Tung Sahur** returns
- **ICON emotes** refresh
- **Gothic Lookbook**

**Now live (8 Nov)**
- **Chopper** — **1,500 V-Bucks**
- **Zoro, Sanji & Chopper** bundle — **3,200 V-Bucks**
- Individual Zoro / Sanji solo prices were not listed in the same posts — check live tracker

**Tomorrow**
- **Deadpool** mashups
- **Bugatti Centodieci**

**Nov 8**
- **Samurai Star Wars**
- **Honkai Star Rail**

## How to use this

Shop leaks shuffle. Treat the list as a **watch order**, then confirm on the live [Item Shop tracker](/tools/item-shop) after reset (**~00:00 UTC** / Epic’s 7 PM ET collab drops for some Treasure Hunters sets).

  Epic’s own Treasure Hunters shop calendar still owns the big collab nights (A$AP 5 Nov, Straw Hat pieces 7 Nov, **Lil Uzi Vert 12 Nov**, Buggy 13 Nov, Miku/Teto 14 Nov).

**Filed:** 7 November 2026.
`,
  },
  {
    slug: 'usopp-slingshot-nerf',
    title: 'Usopp’s Slingshot Nerf — Full Damage Table',
    excerpt:
      'Usopp’s Slingshot got hit: body up to −3, headshots up to −10, long/max range trimmed. Full before/after table from the 7 Nov balance dump.',
    category: 'gameplay',
    status: 'shipped',
    date: '2026-11-07',
    confirmedDate: '2026-11-07',
    readTime: 3,
    image: '/images/guides/secret-weapon.webp',
    tags: [
      'usopp slingshot nerf',
      'fortnite treasure hunters balance',
      'fortnite weapon nerf',
    ],
    content: `
## The patch dump

| Stat | Before | After |
| --- | --- | --- |
| Body | 93 / 89 / 85 / 81 / 77 | **90 / 86 / 82 / 78 / 75** (up to −3) |
| Headshot | 198 / 160 / 153 / 146 / 139 | **190 / 150 / 144 / 136 / 131** (up to −10) |
| Long range | 88 / 85 / 81 / 77 / 73 | **86 / 82 / 78 / 74 / 71** (up to −3) |
| Max range | 84 / 80 / 77 / 73 / 69 | **82 / 78 / 74 / 72 / 67** (up to −3) |

Headshots took the biggest cut. If your hotbar still ran Usopp as a poke / snipe hybrid, rebuild in the [loadout builder](/tools/loadout-builder) and check [weapon changes](/weapon-changes).

**Shipped:** 7 November 2026.
`,
  },
  {
    slug: 'vault-chests-require-key',
    title: 'Vault Chests Now Need a Key — No More Breaking Them Open',
    excerpt:
      'You can no longer break or open chests inside vaults without using a key. Short systems change from the mid-week Treasure Hunters dump.',
    category: 'gameplay',
    status: 'shipped',
    date: '2026-11-07',
    confirmedDate: '2026-11-07',
    readTime: 2,
    image: '/images/guides/treasure-hunters-teaser.jpg',
    tags: [
      'fortnite vault chests key',
      'fortnite treasure hunters leak',
      'crossbones isle vaults',
    ],
    content: `
## The change

> You can **no longer break/open chests inside vaults without using a key**

Pre-change, some lobbies smashed vault chests through props / damage. That route is closed — bring a **key** or skip the room.

Map context: [interactive map](/fortnite-map) · season loot notes: [season hub](/season)

**Shipped:** 7 November 2026.
`,
  },
  {
    slug: 'pirate-shop-power-hours',
    title: 'Pirate Shop Power Hours — Confirmed 2× Access & 10× Gold Outfit Boost',
    excerpt:
      'Confirmed past window: 7 Nov 2026, 9–11pm ET (02:00–04:00 UK on 8 Nov) with Pirate Shop Access at 2.0× and Weekly Gold Outfit at 10.0×. Earlier Treasure Hours used 1.5× Access / 7.5× Gold / 10× Vehicle.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-04',
    confirmedDate: '2026-11-07',
    readTime: 4,
    featured: true,
    image: '/images/guides/pirate-shop-access.jpg',
    tags: [
      'pirate shop power hours',
      'pirate shop access odds',
      'fortnite power hour',
      'pirate shop 2x boost',
      'treasure hours 2.0x',
    ],
    content: `
## What are Power Hours?
Short, scheduled windows later in the season that temporarily boost the chance to roll the **Pirate Shop Access** prize from Battle Royale chests.

## Confirmed Treasure Hours multipliers
Weekend Treasure Hours previously boosted other Treasure Hunt prizes (on top of the base odds):
- **Pirate Shop Access:** 1.5×
- **Weekly Gold Outfit:** 7.5×
- **Weekly Vehicle & Decal:** 10×

## Confirmed 7 Nov window (past)
**7 Nov 2026, 9–11pm ET** (**02:00–04:00 UK on 8 Nov**)
- **Pirate Shop Access:** **2.0×**
- **Weekly Gold Outfit:** **10.0×**

Full base table: [Pirate Shop odds](/leaks/pirate-shop-odds).  
How-to guide: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

We’ll keep this page updated — future Power Hours windows and multipliers will be added here when Epic announces them.

**Filed:** 4 November 2026. **Updated / confirmed:** 7 November 2026. Status: **Watching** for future announced windows.
`,
  },
  {
    slug: 'chapter-8-finishing-moves',
    title: 'Chapter 8 Finishing Moves — Finish Downed Players',
    excerpt:
      'Synced finishing moves for knocked players, multiple animations, and “Finish Downed Players” quests — framed as Chapter 8 work, not Treasure Hunters.',
    category: 'chapter',
    status: 'active',
    date: '2026-11-03',
    readTime: 4,
    featured: true,
    image: '/images/guides/hit-by-chaos.webp',
    tags: [
      'fortnite finishing moves',
      'fortnite chapter 8 leaks',
      'finish downed players',
    ],
    content: `
## What was posted (3 Nov)

- Finish **knocked / downed** players
- Both players lock into a **synced animation**
- **Multiple** finisher animations can be added
- **“Finish Downed Players”** quests in the same find

Framed as **Chapter 8** work. Not a Treasure Hunters enable.

Shop cosmetics for finishers = community guess only. Wait for a trailer / patch notes.

**Filed:** 3 November 2026.
`,
  },
  {
    slug: 'pink-star-lil-uzi-vert-outfit',
    title: 'Pink Star Lil Uzi Vert Outfit in the Files',
    excerpt:
      'v43.00 files include “Pink Star Lil Uzi Vert” as an Icon Series outfit ahead of the Nov 12 shop drop. Bundle price and full set still unannounced by Epic.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-01',
    readTime: 3,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'pink star lil uzi vert',
      'lil uzi vert fortnite skin',
      'fortnite icon series leak',
    ],
    content: `
## File find

Datamines on Treasure Hunters launch listed an Icon Series outfit string: **Pink Star Lil Uzi Vert**.

Epic’s shop calendar puts the **Lil Uzi Vert** set on **12 November, 7 PM ET**. Epic has not published the final marketing name, styles, or V-Bucks price in the posts we track — the file string is the leak; the date is Epic.

## Timeline

| Date | What |
| --- | --- |
| 1 Nov | Outfit string in v43.00 files |
| 8 Nov | Stronghold / Lil’ SMG / Sprite week ([update post](/leaks/lil-uzi-vert-stronghold-update)) |
| 10 Nov | Leaks said another Lil Uzi Vert outfit is planned (details unknown) |
| 12 Nov | Item Shop set (Epic calendar) |
| 12 Nov | Jam Tracks "Poured", "Say It Was", "What You Saying" — see [Jam Tracks page](/leaks/lil-uzi-vert-fortnite-jam-tracks) |

Track live rows: [Item Shop](/tools/item-shop) · [new cosmetics](/new-cosmetics)

**Filed:** 1 November 2026.
`,
  },
  {
    slug: 'pirate-crews-asap-lil-uzi',
    title: 'Pirate Crews Leak — A$AP Rocky, Lil Uzi Vert, Then Luffy',
    excerpt:
      'Pre-season: hunters / pirate crews with flags for A$AP Rocky and Lil Uzi Vert, Jones & Hope, then Teto/Miku, Luffy’s crew last. Became Treasure Hunters.',
    category: 'season',
    status: 'shipped',
    date: '2026-10-22',
    confirmedDate: '2026-11-01',
    readTime: 3,
    image: '/images/guides/treasure-hunters-teaser.jpg',
    tags: [
      'fortnite pirate crews leak',
      'asap rocky lil uzi fortnite',
      'treasure hunters leak',
    ],
    content: `
## Pre-season post (22 Oct)

> Next season has different **Hunters / Pirate Crews** hunting for the chest and/or something

Named early: **A$AP Rocky** and **Lil Uzi Vert** crews with flags, plus **Jones** and **Hope**. Teto (and maybe Miku) guessed next; **Luffy’s Crew** last.

That arc basically **is** Treasure Hunters — weekly captains, Straw Hats + Rocky first, Lil Uzi / Miku / Teto later, Crossbones Isle chest hunt.

Archive receipt. Live playbook: [Treasure Hunters guide](/guides/season/fortnite-treasure-hunters) · [season hub](/season)

**Shipped as season fantasy:** 1 November 2026.
`,
  },
  {
    slug: 'captain-days-content-stack',
    title: 'Stacked Captain’s Days — Weapons, Sprites & Weekly Captains',
    excerpt:
      'Pre-enable dump of Captain Days, Straw Hat powers, A$AP Shock Rocket on the $.$. Rocky, then Lil Uzi / Miku / Teto weeks plus Mastery Mondays and Treasure Hours.',
    category: 'season',
    status: 'shipped',
    date: '2026-11-01',
    confirmedDate: '2026-11-01',
    readTime: 4,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'fortnite captain days',
      'asap rocky shock rocket',
      'luffy gum gum fruit',
      'treasure hunters leaks',
    ],
    content: `
## The stack that circulated at launch

**Captain Days** called out with new weapons, Sprites, and map changes each window.

**Weapons / powers named in the dump**
- Luffy’s Gum-Gum Fruit
- Ace’s Flame-Flame Fruit
- Zoro’s Three Sword Style
- Usopp’s Slingshot
- A$AP Rocky’s **Shock Rocket** (challenge him on the **$.$. Rocky** battleship)

**Captain order**
- Straw Hats + A$AP Rocky at launch
- Then **Lil Uzi Vert**, Cap’n Hatsune Miku, Kasane Teto

**Weekly events**
- Mastery Mondays + Treasure Hours Sundays
- Captain weapons at match start + boosted drops
- Hidden loot including Captain X’s mega chest

Most of this is now **live season structure**. Lil Uzi week details: [Stronghold update](/leaks/lil-uzi-vert-stronghold-update). Usopp got nerfed mid-week: [Slingshot nerf](/leaks/usopp-slingshot-nerf).

**Shipped (as season systems):** November 2026.
`,
  },
  {
    slug: 'pirate-shop-access-feature',
    title: 'Pirate Shop Access — Free Item Shop Leak That Shipped',
    excerpt:
      'Archive of the Pirate Shop Access leak that shipped 1 Nov. Base chest odds are now public: Access is 1 in 137,500 — see the odds page.',
    category: 'shop',
    status: 'shipped',
    date: '2026-10-31',
    confirmedDate: '2026-11-01',
    readTime: 3,
    image: '/images/guides/pirate-shop-found-by-snowslept.jpg',
    tags: [
      'pirate shop access leak',
      'free fortnite item shop',
      'treasure hunt prize',
    ],
    content: `
## Original leak wording

> **FREE FORTNITE ITEM SHOPS FEATURE LEAKED**
>
> - Opening chests in Battle Royale can roll a Treasure Hunt prize
> - The “Pirate Shop” is in the prize pool every week
> - Access base chest odds: **1 in 137,500** — see [Pirate Shop odds](/leaks/pirate-shop-odds)

Epic shipped it **1 Nov** as **Pirate Shop Access** (14-day free V-Bucks claims, two year tokens).

→ [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite)  
→ Still watching: [Power Hours](/leaks/pirate-shop-power-hours) · [AFK ban warning](/leaks/pirate-shop-afk-squad-fill-ban)

**Shipped:** 1 November 2026.
`,
  },
  {
    slug: 'cursed-sprites-files',
    title: 'Cursed Sprites in the Files — Shipped on Captain’s Day',
    excerpt:
      'Cursed Sprite variants sat disabled at launch, then enabled with the 7 Nov Captain’s Day wave (including Cursed Lil’ Uzi Vert Jr.).',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-01',
    confirmedDate: '2026-11-07',
    readTime: 3,
    image: '/images/guides/sprites-collect.webp',
    tags: ['cursed sprites fortnite', 'lil uzi vert jr cursed', 'captain day sprites'],
    content: `
## Leak → live

Launch files held **Cursed** finishes disabled. Epic enabled them **7 November** with Captain’s Day. Lists included Cursed Lil’ Uzi Vert Jr. alongside the rest of the Treasure Hunters Cursed set.

Live catalog: [sprites](/sprites)

**Shipped:** 7 November 2026.
`,
  },
  {
    slug: 'treasure-hours-fortune-sprites',
    title: 'Treasure Hours Fortune Sprite Boost',
    excerpt:
      'Next Treasure Hours are 14 November 2026. The leaked schedule lists 7–9pm UK on 14 Nov and 2–4am UK on 15 Nov, plus later windows on 21–22 November, at 7.5× Gold Outfit / 1.5× Pirate Shop Access / 10× Vehicle & Decal.',
    category: 'season',
    status: 'shipped',
    date: '2026-11-02',
    confirmedDate: '2026-11-04',
    readTime: 2,
    image: '/images/guides/treasure-hunters.jpg',
    tags: ['fortnite treasure hours', 'fortune sprites', 'power hour'],
    content: `
## What are Treasure Hours?
Epic’s live weekend-style boost windows (Fortune Sprites plus Treasure Hunt prize multipliers). They are not the same as the rarer Pirate Shop Power Hours 2.0× Access windows — those live on [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours).

## What’s next (leaked)
According to leaks on **8 November 2026**, the **next Treasure Hours are 14 November 2026**.

The leaked schedule listed these UK (GMT) windows, all with **Gold Outfit 7.5×**, **Pirate Shop Access 1.5×**, and **Vehicle & Decal 10×**:
- Saturday 14 November 2026, 7:00–9:00pm UK (2:00–4:00pm ET)
- Sunday 15 November 2026, 2:00–4:00am UK (Saturday 14 November, 9:00–11:00pm ET)
- Saturday 21 November 2026, 7:00–9:00pm UK
- Sunday 22 November 2026, 2:00–4:00am UK

Phrase the times as leaked/reported, not as an Epic blog announcement, unless you independently find Epic MOTD/Status text that matches.

Links: [Pirate Shop odds](/leaks/pirate-shop-odds) · [Pirate Shop Access guide](/guides/how-to/how-to-get-pirate-shop-access-fortnite).
`,
  },
]

export const LEAKS_FAQS = [
  {
    question: 'What is the FortniteTools leaks hub?',
    answer:
      'A guides-style index of individual Fortnite leak write-ups — shop, Sprites, gameplay, and Chapter 8 file finds. Each leak has its own page with status (unconfirmed, watching, shipped, or likely cut). It is not Epic patch notes.',
  },
  {
    question: 'Are these leaks guaranteed to ship?',
    answer:
      'No. Files get vaulted, renamed, delayed, or deleted. When something goes live we flip the page to Shipped and point at news, map, sprites, shop, or loadout tools instead.',
  },
  {
    question: 'Where should I go once a leak is real?',
    answer:
      'Lobby news, the season hub, sprites catalog, item shop tracker, and loadout builder. Leak pages stay as receipts; live tools and guides are the playbook.',
  },
  {
    question: 'Is FortniteTools affiliated with Epic or dataminers?',
    answer:
      'No. Independent fan site. We summarize public datamine and press reports in our own words and mark confidence clearly.',
  },
]

export function getLeakBySlug(slug: string): LeakPost | undefined {
  return leaks.find((l) => l.slug === slug)
}

export function getLeaksSorted(): LeakPost[] {
  return [...leaks].sort((a, b) => b.date.localeCompare(a.date))
}

export function getLeaksByCategory(category: LeakCategory): LeakPost[] {
  return getLeaksSorted().filter((l) => l.category === category)
}

export function getLeakCategoryLabel(category: LeakCategory): string {
  return leakCategories.find((c) => c.id === category)?.label ?? category
}

export function formatLeakDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
