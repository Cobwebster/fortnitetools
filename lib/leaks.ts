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
    slug: 'hello-neighbor-fortnite-collab',
    title: 'Hello Neighbor x Fortnite Collab Leak — Coming Soon to the Item Shop',
    excerpt:
      'According to leaks on 14 Nov 2026, a Hello Neighbor x Fortnite collaboration is coming soon, with an Item Shop release and an Epic Games Store gift-with-purchase tie-in. An announcement teaser surfaced the same day. No release date or prices yet.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-14',
    readTime: 3,
    featured: true,
    tags: [
      'hello neighbor fortnite',
      'hello neighbor fortnite skin',
      'hello neighbor x fortnite collab',
      'fortnite hello neighbor release date',
      'hello neighbor epic games store gift',
    ],
    content: `
## What leaked on 14 Nov

On the evening of **14 November 2026** (around **5:25pm UK**), leaks said a **Hello Neighbor x Fortnite** collaboration is **coming soon**. Two parts were reported: an **Item Shop** release, and an **Epic Games Store gift‑with‑purchase** — buying a Hello Neighbor game on the Epic Games Store is expected to come with a Fortnite reward. Shortly after, an **announcement teaser** for the collab circulated.

## What this means

Hello Neighbor is the stealth‑horror series about sneaking into a creepy neighbour’s house. The Neighbor is the obvious outfit candidate, but which characters become cosmetics is **not confirmed**. Gift‑with‑purchase deals on the Epic Games Store usually grant a **Fortnite cosmetic** when you buy the partner game on the same Epic account. Track the live flip on the [Item Shop tracker](/tools/item-shop) and the rolling [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks).

## What is not confirmed

- The **release date**
- Which **characters/cosmetics** are included
- **Prices**
- Which **game(s)** qualify for the gift and what the gift item is
- Whether **Epic has officially announced** it yet

**Filed:** 14 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'pirate-hatsune-miku-fortnite-bundle',
    title: 'Cap’n Hatsune Miku Fortnite Bundle — New Emote, Gold Back Bling Free',
    excerpt:
      'Cap’n (Pirate) Hatsune Miku’s Fortnite bundle was revealed for the 14 Nov 2026 shop (7pm ET, midnight UK into 15 Nov), alongside a new emote set to “Miku Miku ni Shite Ageru”. Leaks say the gold back bling is free with Solid Gold Miku for a week from 15 Nov, until Gold Kasane Teto arrives.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-14',
    readTime: 3,
    featured: true,
    image: '/images/guides/capn-hatsune-miku-featured.webp',
    tags: [
      'pirate hatsune miku fortnite',
      'capn hatsune miku fortnite',
      'hatsune miku fortnite bundle',
      'miku miku ni shite ageru fortnite emote',
      'gold hatsune miku back bling',
      'hatsune miku fortnite release date',
    ],
    content: `
## Bundle reveal

Late on **13 November 2026** leaks revealed **Cap’n Hatsune Miku’s** pirate‑themed bundle, listed for the **14 November** shop (US date). Collab shops in Treasure Hunters typically flip at **7:00 PM ET**, which is **midnight UK** rolling into **Sunday 15 November**.

| Zone | Local time |
| --- | --- |
| ET | Sat 14 Nov, **7:00 PM ET** |
| UK/GMT | Sun 15 Nov, **12:00 AM** |
| CET | Sun 15 Nov, **1:00 AM** |

The bundle reportedly includes an **outfit**, **back bling**, **pickaxe**, and **emote** — treat contents as **leaked** until live; full item list / prices are **not confirmed**.

## New Miku emote

A new **Hatsune Miku emote** set to the song **“Miku Miku ni Shite Ageru”** (also known as “Miku Miku ni Shite Ageru♪ [Shite Yan yo]”) was leaked on **14 Nov**. Whether it is sold separately or part of the bundle is **not confirmed**. Our earlier page also mentioned a likely separate “Mesmerizer” emote with a special version — see [Kasane Teto & Friendship Villa](/leaks/kasane-teto-fortnite-music-pass-friendship-villa).

## Free gold back bling

According to leaks, the **gold back bling** comes **free** with the **Solid Gold Hatsune Miku** outfit from the **Treasure Hunt chest prizes** starting **15 November**, for about a week until **Solid Gold Kasane Teto** replaces it. See [Chest prizes week 3–4](/leaks/fortnite-pirate-chest-prizes-week-3-4) and [Pirate Shop odds](/leaks/pirate-shop-odds).

## What is not confirmed

- **Prices** and exact bundle contents
- Whether the **emote** is separate or bundled
- The exact **gold rotation** time

**Filed:** 14 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'ishowspeed-pirate-speedy-fortnite-skin',
    title: 'IShowSpeed Pirate Speedy Fortnite Skin — Out Now, Price (1,500 / 1,800 V-Bucks)',
    excerpt:
      'IShowSpeed’s One Piece–themed Pirate Speedy outfit hit the Fortnite Item Shop at midnight UK on 14 Nov 2026 (7pm ET 13 Nov). The skin costs 1,500 V-Bucks and the full bundle 1,800 V-Bucks.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-13',
    confirmedDate: '2026-11-14',
    readTime: 4,
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'ishowspeed fortnite skin',
      'pirate speedy fortnite',
      'ishowspeed one piece skin release date',
      'ishowspeed fortnite bundle',
      'ishowspeed item shop time',
      'ishowspeed fortnite price',
    ],
    content: `
## Out now — prices

Released **14 November 2026, 00:00 UK** (**7:00 PM ET** on 13 Nov).
**Prices (confirmed):** **1,500 V‑Bucks** for the outfit; **1,800 V‑Bucks** for the full bundle.

## What leaked on 13 Nov

A new IShowSpeed collab skin named **Pirate Speedy** is circulating in today’s update coverage as part of the Treasure Hunters / One Piece mini‑season. A showcase clip and the matching emote reportedly appeared alongside shop metadata.

## Bundle contents (leaked)

- **1 Outfit** — Pirate Speedy
- **1 Back Bling**
- **1 Pickaxe**
- **1 Emote**

## Item Shop timing (past)

This collab landed on the standard reset: **Friday 13 November 2026, 7:00 PM ET** — which was **Saturday 14 November, 12:00 AM (midnight) UK**. Regional times:

| Region | Local time |
| --- | --- |
| PT | Fri 13 Nov, 4:00 PM PT |
| ET | Fri 13 Nov, 7:00 PM ET |
| GMT | Sat 14 Nov, 12:00 AM GMT |
| CET | Sat 14 Nov, 1:00 AM CET |

Track the flip on the [Item Shop tracker](/tools/item-shop) and our rolling [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks).

## Not the old Icon Series skin

This is a **separate** collab outfit from Speed’s **original Icon Series skin** (released December 2025) and is unrelated to **Monkey D. Luffy**.

## Pirate Shop Access token note

Players who already activated a **Pirate Shop Access** token are widely reporting that they can **claim Item Shop cosmetics** with it (real‑money offers and gifting are excluded). Treat that as anecdotal until you see the **Claim** button on your account. New to the system? See [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

## What is not confirmed

- How **long** Pirate Speedy will stay in the shop rotation

**Shipped:** 14 November 2026.
`,
  },
  {
    slug: 'fortnite-overwatch-wave-2-kiriko-widowmaker',
    title: 'Fortnite x Overwatch Wave 2 — Kiriko in Files; Second Hero Teased',
    excerpt:
      'Encrypted Overwatch x Fortnite cosmetics were added in the 13 Nov update. According to leaks, Kiriko is in the files with glowing VFX, physics clothing, a LEGO style, lobby animation, emote with a special Kiriko version, back bling and pickaxe. A second female hero is also present and most signs point to Widowmaker — still speculation. No date or prices.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-13',
    readTime: 4,
    featured: true,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'kiriko fortnite',
      'fortnite overwatch collab wave 2',
      'widowmaker fortnite skin',
      'overwatch wave 2 fortnite',
      'kiriko fortnite release date',
    ],
    content: `
## What today’s update added (13 Nov)

Update files reference a **second Overwatch x Fortnite set**, still encrypted. **Wave 1** (D.Va, Mercy, Tracer, Genji) launched on **14 May 2026**; this looks like **Wave 2**.

## Kiriko — confirmed in the files

- **Outfit** with **glowing** effects on body and head
- **Flowing clothing** with **cloth physics**
- **LEGO** style
- **Custom lobby animation**
- **Emote** that uses a **prop** and has a **special version when used as Kiriko**
- **Glowing back bling**
- **Glowing pickaxe**
- New **Kicks** — fox/kitsune‑themed footwear that leaves **footprints** and a small **trail**

## Who is the second hero? (speculation)

The same encrypted set includes a **second female Overwatch hero**. The trait list (glowing body/headpiece, a **long head attachment** with physics like a ponytail, an **animated pickaxe** with a custom ready sound and trail that may **double as a back bling**, an **animated back bling**, lobby animation, spray, and wrap) **most closely matches Widowmaker**. **Juno** is the other community guess. Treat the identity as **speculation** until decrypted or announced.

## Release date and pricing

There is **no confirmed date** or price info. Encrypted collabs typically appear **within days to a couple of weeks** of their file drop, but timing can slip. Keep an eye on the [Item Shop tracker](/tools/item-shop).

**Filed:** 13 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'scott-pilgrim-fortnite-collab-leak',
    title: 'Scott Pilgrim x Fortnite? Scott & Ramona Skins Leak (LEGO styles)',
    excerpt:
      '12 Nov files reportedly add two comic/anime‑shaded skins with LEGO styles: a bass‑playing male believed to be Scott Pilgrim and a goggles/hammer‑themed female believed to be Ramona Flowers — plus an emote and 3 pickaxes. Not announced by Epic.',
    category: 'cosmetics',
    status: 'active',
    date: '2026-11-12',
    readTime: 5,
    featured: true,
    image: '/images/guides/block-party.webp',
    tags: [
      'scott pilgrim fortnite',
      'scott pilgrim fortnite leak',
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

## Confidence table

| Claim | Status |
| --- | --- |
| Two comic/anime‑shaded skins + LEGO styles in files | Leak |
| Bass / drums / sword‑heart emote / pickaxes attached | Leak |
| Officially Scott Pilgrim vs. the World / Ramona | **Guess** (prop tells are strong, still unannounced) |
| Release date / V‑Buck price | Unknown |

## What to watch next

- Shop calendar rows: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)
- Live confirm after reset: [Item Shop tracker](/tools/item-shop) · [News](/news)
- Same‑day collab chatter: [Doki Doki?](/leaks/doki-doki-literature-club-fortnite-leak) · [Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)

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
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'puss in boots fortnite',
      'puss in boots fortnite leak',
      'death wolf fortnite',
      'fortnite sidekick leak',
      'fortnite voice lines leak',
      'puss in boots fortnite skin',
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

## Confidence table

| Claim | Status |
| --- | --- |
| Furry Sidekick + voice lines + Kicks in files | Leak |
| Hooded wolf warrior skin + LEGO + glow effects | Leak |
| Characters are Puss / Death from *The Last Wish* | **Guess** (strong theming, unannounced) |
| Pirate shop tiles / bundle packaging | Leak read |

## What to watch next

- [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks) · [Item Shop tracker](/tools/item-shop)
- Season cadence: [Captain’s Days](/leaks/captain-days-content-stack)
- Same dump: [Scott Pilgrim](/leaks/scott-pilgrim-fortnite-collab-leak) · [Doki Doki?](/leaks/doki-doki-literature-club-fortnite-leak)

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
    readTime: 5,
    featured: true,
    image: '/images/guides/select-character.webp',
    tags: [
      'doki doki literature club fortnite',
      'doki doki fortnite leak',
      'ddlc fortnite',
      'anime skins fortnite leak',
      'cel shaded fortnite skins',
      'fortnite four anime skins',
    ],
    content: `
## What was reportedly found (12 Nov files)

Dataminer dump for a hidden cosmetics set:

- **4 anime / cel‑shaded female skins**
- Each has a **custom lobby animation**
- **At least 2** show **cloth physics**; **1** shows **special hair physics**
- Sell‑through: **one 4‑pack bundle** plus **individual** purchase options
- Notes referenced **no pickaxes / back blings / wraps** in the same set — skins only

## Is this Doki Doki Literature Club?

Fans mapped “four anime girls” onto **DDLC** (**Monika, Sayori, Yuri, Natsuki**). That read is **community speculation** — the leak posts themselves do **not** confirm character names, voice lines, or Team Salvato marketing.

Same‑day dump also floated **Scott Pilgrim** and **Puss in Boots** as separate hidden sets with stronger prop/effect tells — see:

- [Scott Pilgrim / Ramona leak](/leaks/scott-pilgrim-fortnite-collab-leak)
- [Puss in Boots / wolf warrior leak](/leaks/puss-in-boots-fortnite-collab-leak)

## Confidence

| Claim | Status |
| --- | --- |
| Four cel‑shaded female skins in files | Leak |
| Custom lobby poses + cloth / hair physics | Leak |
| Sold as 4‑pack + singles, no extra cosmetics | Leak |
| Actually DDLC characters | **Guess only** |
| Release date / price | Unknown |

## What to watch next

- Bundle/pricing still blank — track [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks) and [Item Shop](/tools/item-shop)
- Lobby MOTD / blog confirmation: [News](/news)
- Same‑day dump siblings: [Scott Pilgrim](/leaks/scott-pilgrim-fortnite-collab-leak) · [Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)

**Release date unknown.** Status: **Unconfirmed**. Filed 12 November 2026.
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
    featured: true,
    image: '/images/guides/cold-welcome.webp',
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

## Quick facts

| Item | Leaked value |
| --- | --- |
| Winterfest 2026 window | **17 Dec 2026 – 7 Jan 2027** |
| Chapter 8 Season 1 (context) | **5 Dec 2026** (separate leak) |
| Seasonal Locker Filter tags | winterfest / christmas / winter |
| Cabin / daily presents | **Not confirmed** |

## What to watch next

- [Season hub](/season) · [Chapter 8 calendar leak](/leaks/fortnite-chapter-8-season-2-release-date)
- Live announce path: [News](/news)
- Mid‑season cadence: [Captain’s Days](/leaks/captain-days-content-stack)

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
    image: '/images/guides/capn-hatsune-miku-featured.webp',
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
    image: '/images/guides/kasane-teto-featured.webp',
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
    image: '/images/guides/lil-uzi-vert-featured.webp',
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
    image: '/images/guides/lil-uzi-vert-featured.webp',
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
    image: '/images/guides/solid-gold-lil-uzi-featured.webp',
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
      'Upcoming Item Shop Leaks — Pirate Miku, Shohei Ohtani, Madison Beer, Kaiju No. 8',
    excerpt:
      '14 Nov refresh — IShowSpeed (Pirate Speedy) and One Piece’s Buggy skin landed; leaked next: Cap’n Hatsune Miku + ICON emote refresh (14 Nov US date), Shohei Ohtani + Gotham City Summer (15 Nov), Madison Beer, Kaiju No. 8 and The Odyssey (16 Nov).',
    category: 'shop',
    status: 'watching',
    date: '2026-11-07',
    readTime: 4,
    featured: true,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'fortnite item shop leaks',
      'ishowspeed pirate speedy',
      'katseye pinky up emote',
      'jason voorhees fortnite',
      'nemia fortnite',
      'zoro sanji chopper shop',
      'fortnite star wars leak',
      'honkai star rail fortnite',
      'shohei ohtani fortnite',
      'madison beer fortnite',
      'kaiju no 8 fortnite',
      'buggy fortnite skin',
    ],
    content: `
## 14 November 2026 — Shop reset and leaked schedule

- Tonight’s reset (**midnight UK 14 Nov** / **7pm ET 13 Nov**): new **Buggy** (One Piece) outfit and **IShowSpeed** skin & emote — see [Pirate Speedy](/leaks/ishowspeed-pirate-speedy-fortnite-skin) and [Buggy POI](/leaks/brutal-beachhead-buggy-poi)
- **Leaked schedule** (US dates; collab nights usually flip ~7pm ET = midnight UK the next calendar day):
  - **14 Nov:** **Cap’n Hatsune Miku** ([page](/leaks/pirate-hatsune-miku-fortnite-bundle)); **ICON emotes** refresh
  - **15 Nov:** **Shohei Ohtani**; **Gotham City Summer** (likely the same set as the earlier‑leaked Beach Bod Batman)
  - **16 Nov:** **Madison Beer**; **Kaiju No. 8**; **The Odyssey**
- Also: [Hello Neighbor x Fortnite](/leaks/hello-neighbor-fortnite-collab) is “coming soon” to the shop.

## 13 November 2026 — Shop reset (12:00am UK / 7:00pm ET 12 Nov)

- **KATSEYE “Pinky Up”** **ICON Series emote** dropped in tonight’s reset (KATSEYE x Fortnite)
- **Lil Uzi Vert** — a **new outfit** and a **full bundle** are in the shop (see [Lil Uzi Vert Jam Tracks](/leaks/lil-uzi-vert-fortnite-jam-tracks) for the wider set)
- **Jason Voorhees** returned
- **Upcoming (no date):** new **Hope**, **Kitsune**, and **Whale** Kicks
- **Released next:** **Pirate Speedy (IShowSpeed)** — landed **12:00am UK, Saturday 14 Nov** (see [Pirate Speedy page](/leaks/ishowspeed-pirate-speedy-fortnite-skin))
- Also in today’s files: an **encrypted Overwatch Wave 2** set — details on [Kiriko / Widowmaker wave 2](/leaks/fortnite-overwatch-wave-2-kiriko-widowmaker)

## Upcoming shop dates (leaked 11 Nov)

Leaked/unconfirmed shop schedule — **times and prices unknown**:

- **12 November 2026:** **Kasane Teto** Music Pass items (see [Kasane Teto page](/leaks/kasane-teto-fortnite-music-pass-friendship-villa)); **Lil Uzi Vert** Icon Series outfits
- **13 November 2026:** **Buggy** (One Piece) — POI context: [Buggy POI](/leaks/brutal-beachhead-buggy-poi); **Volkswagen Golf II GTI** (car)
- **15 November 2026:** **Beach Bod Batman**
- **16 November 2026:** **The Odyssey**; **High Stakes Summer**; **Golden Tactical Pack**

## Earlier (7 Nov dump)

A long 7 Nov stack included **Nemia**, **Ben 10** returns, **Brainrot** returns, **Tung Tung Tung Sahur**, **ICON emotes** refresh, **Gothic Lookbook**; then **Chopper (1,500 VB)** and a **Zoro, Sanji & Chopper (3,200 VB)** bundle. Later callouts included **Deadpool** mashups, **Bugatti Centodieci**, **Samurai Star Wars**, and **Honkai Star Rail**. Treat all as **leaked/unconfirmed** — confirm on the live [Item Shop tracker](/tools/item-shop).

## How to use this

Shop leaks shuffle. Treat the list as a **watch order**, then confirm on the live [Item Shop tracker](/tools/item-shop) after reset (**~00:00 UTC** / Epic’s 7 PM ET collab drops for some Treasure Hunters sets).

  Epic’s own Treasure Hunters shop calendar still owns the big collab nights (A$AP 5 Nov, Straw Hat pieces 7 Nov, **Lil Uzi Vert 12 Nov**, Buggy 13 Nov, Miku/Teto 14 Nov).

**Filed:** 7 November 2026. **Updated:** 14 November 2026.
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
      'Two Treasure Hours on 14 Nov 2026: 7–9pm UK and 2–4am UK (15 Nov), with Pirate Shop Access expected at 1.5× and Gold Outfit at 7.5×. Past 7 Nov window ran 2.0× Access / 10× Gold.',
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
      'treasure hours today',
    ],
    content: `
## What are Power Hours?
Short, scheduled windows later in the season that temporarily boost the chance to roll the **Pirate Shop Access** prize from Battle Royale chests.

## 2× Treasure Hours — 14 Nov 2026
Two boosted windows on **Saturday 14 November 2026**, with leaked/expected boosts of **Pirate Shop Access token 1.5×** and **Weekly Gold Outfit 7.5×** (expected, not confirmed multipliers):

| Window | ET | UK (GMT) |
| --- | --- | --- |
| First | Sat 14 Nov **2–4pm ET** | Sat 14 Nov **7–9pm** |
| Second | Sat 14 Nov **9–11pm ET** | Sun 15 Nov **2–4am** |

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

**Filed:** 4 November 2026. **Updated:** 14 November 2026. Status: **Watching** for future announced windows.
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
    image: '/images/guides/pink-star-lil-uzi-featured.webp',
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
      'A guides-style index of individual Fortnite leak write-ups — collab chatter, shop rows, Sprites, gameplay, and Chapter 8 file finds. Each leak has its own page with status (unconfirmed, watching, shipped, or likely cut). It is not Epic patch notes.',
  },
  {
    question: 'Are these leaks guaranteed to ship?',
    answer:
      'No. Files get vaulted, renamed, delayed, or deleted. When something goes live we flip the page to Shipped and point at news, map, sprites, shop, or loadout tools instead.',
  },
  {
    question: 'What do Unconfirmed, Watching, Shipped, and Likely cut mean?',
    answer:
      'Unconfirmed = file find or community report with no Epic announce. Watching = partially live or waiting on a known window. Shipped = confirmed in-game or by Epic. Likely cut = files removed or the beat never landed.',
  },
  {
    question: 'When is Fortnite Winterfest 2026 according to leaks?',
    answer:
      'Leaks point to 17 December 2026 through 7 January 2027, overlapping Chapter 8 Season 1. Epic has not announced those dates, and cabin/presents are not confirmed.',
  },
  {
    question: 'Is Doki Doki Literature Club coming to Fortnite?',
    answer:
      'Unknown. 12 Nov files reportedly hide four cel-shaded anime female skins sold as a 4-pack. Fans mapped them to DDLC, but names and licensing are not confirmed — treat it as speculation until Epic announces.',
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

export type LeakRelatedLink = { href: string; label: string; note: string }

/** Live tools / hubs to surface beside a leak by category */
export function getLeakRelatedLinks(category: LeakCategory): LeakRelatedLink[] {
  switch (category) {
    case 'shop':
      return [
        { href: '/tools/item-shop', label: 'Item Shop tracker', note: 'Confirm after reset' },
        { href: '/news', label: 'News', note: 'Lobby MOTD / blogs' },
        { href: '/guides', label: 'Guides', note: 'How-tos once live' },
      ]
    case 'cosmetics':
      return [
        { href: '/tools/item-shop', label: 'Item Shop tracker', note: 'Shop rows' },
        { href: '/sprites', label: 'Sprites', note: 'Season collectibles' },
        { href: '/news', label: 'News', note: 'Official confirms' },
      ]
    case 'gameplay':
      return [
        { href: '/weapons', label: 'Weapons', note: 'Live loadouts' },
        { href: '/fortnite-map', label: 'Map', note: 'POI enables' },
        { href: '/news', label: 'News', note: 'Patch notes' },
      ]
    case 'season':
      return [
        { href: '/season', label: 'Season hub', note: 'Calendar & beats' },
        { href: '/fortnite-map', label: 'Map', note: 'Named locations' },
        { href: '/news', label: 'News', note: 'Epic posts' },
      ]
    case 'chapter':
      return [
        { href: '/season', label: 'Season hub', note: 'Current chapter context' },
        { href: '/season-countdown', label: 'Season countdown', note: 'Timing helpers' },
        { href: '/news', label: 'News', note: 'When Epic talks' },
      ]
  }
}

export function getLeakModifiedDate(leak: LeakPost): string {
  return leak.confirmedDate ?? leak.date
}

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
