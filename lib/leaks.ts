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
    slug: 'fortnite-first-person-mode-battle-royale-leak',
    title:
      'Fortnite First-Person Battle Royale Mode Leak: Playlists, Codename & What We Know',
    excerpt:
      'Dataminer reports on 27 Nov 2026 point to a first-person mode, possibly for Battle Royale, under the internal codename BrotherBouquet. Leaked playlist rows list Zero Build Solo/Duo/Squad and Build Solo/Squad. Chapter 8 timing chatter is speculation only — no Epic announcement or release date.',
    category: 'gameplay',
    status: 'active',
    date: '2026-11-27',
    readTime: 7,
    featured: true,
    image: '/images/guides/secret-weapon.webp',
    tags: [
      'fortnite first person battle royale',
      'fortnite first person mode leak',
      'brotherbouquet fortnite',
      'fortnite first person br playlists',
      'fortnite zero build first person',
      'fortnite ballistic vs first person br',
      'fortnite first person leak november 2026',
      'fortnite esrb pegi first person',
    ],
    content: `
## What leaked (27 November 2026)

Around **3 PM UK on 27 November 2026**, dataminer reports described Epic working on a **first-person** mode that is **possibly for Battle Royale**, under the internal codename **BrotherBouquet**.

This is a **file / dataminer leak** — not a fortnite.com post, trailer, or MOTD. Playlist names, the BR framing, and the codename can change, or the project can be **cut**, before anything ships. Standard Battle Royale today remains **third-person**.

Some follow-up posts framed the work as arriving **“very soon”** and speculated **Chapter 8**. That timing is **not** in the core playlist dump — treat “ships with Chapter 8” as **speculation**, not a dated leak. Confirmed chapter calendar (separate page): **[Chapter 8 Season 1 on 5 December 2026](/leaks/fortnite-chapter-8-season-2-release-date)**.

## Playlist table (as reported)

| Perspective | Build rules | Queues named in the dump |
| --- | --- | --- |
| First-person (BrotherBouquet) | **Zero Build** | **Solo**, **Duo**, **Squad** |
| First-person (BrotherBouquet) | **Build** | **Solo**, **Squad** |
| Standard BR today | Zero Build / Build | Third-person matchmaking (unchanged) |

Zero Build shows three party sizes; Build only shows Solo and Squad in the same dump (no Duo Build row was named). Incomplete leak grids are common — do **not** treat a missing row as a cancelled playlist.

Still unknown from the same dump:

- Ranked / Arena support
- Map / POI set (current island vs a dedicated FP map)
- Whether FP queues **replace** any third-person tabs or sit **beside** them
- Cross-play, input modes, or platform limits
- Separate loot / FOV / ADS tuning for first-person

## How this would differ from Ballistic and Creative first-person

Fortnite already has first-person play — just **not** as standard Battle Royale.

| Product | Camera | Format | Status |
| --- | --- | --- | --- |
| **Battle Royale (live)** | Third-person | 100-player island drop, Build / Zero Build | Live |
| **[Ballistic](https://www.fortnite.com/news/fortnite-goes-first-person-with-ballistic-a-tactical-5v5-shooter-launching-in-early-access-dec-11)** | First-person | **5v5** round-based tactical (plant / defend Rift Point Device), **no builds** | Live (early access since **11 Dec 2024**) |
| **[UEFN / Creative FP](https://www.fortnite.com/news/fortnite-first-person-now-available-as-an-experimental-feature-in-uefn-and-creative)** | First-person | Creator islands using the First Person Camera Mode device | Live for published islands |
| **BrotherBouquet (leak)** | First-person | Reported **BR** Build / Zero Build playlists | **Unconfirmed** |

If BrotherBouquet is real, it is the first time Epic’s **core Battle Royale matchmaking** would offer a first-person viewpoint — a different product bucket from Ballistic’s short rounds or Creative’s island picker.

## What first-person BR would change for players (context only)

Nothing below is confirmed tuning — only why the leak matters if it ships:

- **Awareness** — no over-the-shoulder peek the same way; corner fights and builds read differently
- **Aim / tracking** — closer to traditional FPS feel; controller aim-assist behaviour would need its own pass (see recent [aim assist notes](/leaks/fortnite-aim-assist-update-november-2026) for how Epic already tweaks pad assist in third-person)
- **Builds** — piece placement and cone peeks are built around third-person visibility today; a Build FP playlist implies Epic is willing to retune that feel, not just flip a camera flag
- **Discovery** — a parallel FP tab keeps third-person mains intact; a replacement tab would be a much bigger product bet (leak does **not** say which)

## Age-rating listing note (reported, not proof)

Fortnite’s age-rating listings were **reportedly updated on 18 November 2026** to **ESRB Teen** / **PEGI 12**. That report circulated **alongside** this leak. A rating refresh can happen for many reasons (other modes, store copy, regional paperwork) and is **not** proof that a first-person Battle Royale mode is shipping.

## Confidence

| Claim | Status |
| --- | --- |
| Internal work on a first-person mode (codename **BrotherBouquet**) | Leak |
| Mode is **possibly** Battle Royale | Leak |
| Zero Build Solo / Duo / Squad + Build Solo / Squad rows | Leak |
| Ships with / in Chapter 8 | **Speculation only** |
| Replaces third-person BR | **Unknown** |
| Epic announcement / release date | **None** |

## Quick FAQ

**Is Fortnite getting a first-person Battle Royale mode?**
**Possibly**, per **27 Nov 2026** dataminer reports (codename **BrotherBouquet**). Epic has **not** confirmed it — present as a **leak**.

**When does it release?**
**Unknown.** No ship day was attached to the core leak. “Chapter 8 / very soon” chatter is **speculation**.

**Will it have Build and Zero Build?**
Leaked rows list **Zero Build** Solo / Duo / Squad and **Build** Solo / Squad. That can still change.

**Is this just Ballistic again?**
**No.** Ballistic is a **5v5 tactical** mode. This leak points at **Battle Royale** playlist rows.

**Can I play first-person Fortnite now?**
**Yes, elsewhere:** [Ballistic](https://www.fortnite.com/news/fortnite-goes-first-person-with-ballistic-a-tactical-5v5-shooter-launching-in-early-access-dec-11) (first-person 5v5) and **Creative / UEFN** islands using the [First Person Camera Mode](https://www.fortnite.com/news/fortnite-first-person-now-available-as-an-experimental-feature-in-uefn-and-creative). Standard Battle Royale remains **third-person**.

## What to watch next

1. Any **Epic** blog, trailer, or MOTD naming a first-person Battle Royale playlist
2. Whether BrotherBouquet rows survive later dumps or vanish
3. Chapter 8 reveal window around **[5 December](/leaks/fortnite-chapter-8-season-2-release-date)** — watch for official mode talk, but do not assume this leak is tied to it
4. [News](/news) · [Modes](/modes) once Epic publishes something real

**Filed:** 27 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'fortnite-pirate-shop-access-cheaters-banned-items-removed',
    title:
      'Fortnite Pirate Shop Access Cheaters Banned: Access and Items Removed',
    excerpt:
      'Official Fortnite Status (25 Nov 2026): anyone who cheated for Pirate Shop Access — or partied with someone who did — lost Access and items bought with it; cheaters are being banned. Squad Fill-only matches with a cheater are not affected.',
    category: 'gameplay',
    status: 'shipped',
    date: '2026-11-25',
    confirmedDate: '2026-11-25',
    readTime: 6,
    featured: true,
    image: '/images/guides/pirate-shop-access.jpg',
    tags: [
      'pirate shop access cheaters banned',
      'fortnite pirate shop access removed',
      'pirate shop token cheat ban',
      'fortnite cheaters banned pirate shop',
      'pirate shop access items removed',
      'fortnite status pirate shop',
      'squad fill pirate shop access',
    ],
    content: `
## What Epic said (25 November)

On **25 November 2026** around **6:46 PM UK**, the **Fortnite Status** account posted an **official** statement on Pirate Shop Access abuse.

The rules are clear: **using cheats of any kind is against the rules**. Anyone who **cheated to get Pirate Shop Access**, or **partied up with someone who did**, has **lost that access** and **any items bought with it**. Players who were **simply matched with a cheater through Squad Fill** are **not affected**. Players who cheated are also **being banned from Fortnite**.

This is a **shipped** enforcement action from Epic — not a leak.

## What Pirate Shop Access is

**Pirate Shop Access** (also called the Pirate Shop Token) is the rare **Treasure Hunt** prize that unlocks the Pirate Shop for the season. In a normal Battle Royale match it rolls at **1 in 137,500** per chest — full table on the [Pirate Shop odds](/leaks/pirate-shop-odds) page. Scheduled [Treasure Hours / Power Hours](/leaks/pirate-shop-power-hours) temporarily boost Access and other chest prizes.

Squads are widely reported to **share** the prize when one teammate finds it, which is why party-based abuse mattered for this crackdown. Epic had already warned that going AFK in squad fills so randoms farm the token for you can earn a [matchmaking ban](/leaks/pirate-shop-afk-squad-fill-ban). Legitimate steps stay the same: open BR chests yourself — [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

## How the cheat worked (widely reported)

In the days before the Status post, reports described cheaters attaching themselves to a **cannon** and **teleporting** around the map to every chest. The cannon’s weight **instantly broke chests open**, so they could farm Pirate Shop Access tokens extremely fast. Some players **paid cheaters** to join their games or parties to benefit from that farm.

That pattern is active cheating — outside normal play and outside the earlier AFK-fill warning — and Fortnite Status has answered it with removals and bans.

## Who is affected / who is safe

| Situation | Outcome (per Fortnite Status) |
| --- | --- |
| You **cheated** to get Pirate Shop Access | Access removed · items bought with it removed · **banned from Fortnite** |
| You **partied** with someone who cheated to get Access | Access removed · items bought with it removed |
| You only matched a cheater via **Squad Fill** | **Not affected** |

## What we do not know yet

Fortnite Status did **not** spell out an appeals process, a ban-length schedule, or whether removed items can ever return through a later legitimate roll. Those details are **unknown** until Epic says more.

## Related pages

- [Pirate Shop odds](/leaks/pirate-shop-odds)
- [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours)
- [AFK Squad Fill matchmaking ban](/leaks/pirate-shop-afk-squad-fill-ban)
- How-to: [Pirate Shop Access guide](/guides/how-to/how-to-get-pirate-shop-access-fortnite)

## Quick FAQ

**Will I lose items if a cheater was in my Squad Fill?**
**No** — Fortnite Status says players who were simply matched with a cheater through Squad Fill are **not** affected.

**Can I get Pirate Shop Access back?**
If Access was removed because you cheated or partied with a cheater, Epic has **not** said you can get it back that way. A later **legitimate** chest roll is still how Access works for everyone else — see [odds](/leaks/pirate-shop-odds). Whether a stripped account can roll Access again is **unknown**.

**Are cheaters banned?**
**Yes** — Fortnite Status says players who cheated are being **banned from Fortnite**. Ban length and appeals are **unknown**.

**Shipped:** 25 November 2026 (Fortnite Status, ~6:46 PM UK).
`,
  },
  {
    slug: 'fortnite-crew-changes-december-2026-neko-final-crew-skin',
    title:
      'Fortnite Crew Changes 5 December — N.E.K.O. Is the Final Crew Pack Skin',
    excerpt:
      'Epic’s official Crew overhaul lands 5 December 2026: tiered monthly V-Bucks (1,000–1,600), OG Pass ends, XP boosts for you and your squad, and Crew Pack outfits end with December’s N.E.K.O. — the last Crew Pack outfit ever. N.E.K.O. became viewable in-game on 25 Nov.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-25',
    confirmedDate: '2026-11-25',
    readTime: 7,
    featured: true,
    image: '/images/guides/select-character.webp',
    tags: [
      'fortnite crew changes december 5',
      'last fortnite crew skin',
      'neko crew skin fortnite',
      'fortnite og pass ending',
      'december 2026 crew pack',
      'n.e.k.o. fortnite',
      'fortnite crew vbucks tiers',
      'fortnite crew legacy styles',
    ],
    content: `
## What’s happening

On **25 November 2026** around **6 PM UK**, the **N.E.K.O.** outfit became **viewable in-game**. It is the **December 2026 Fortnite Crew Pack** outfit — and, per Epic’s official announcement, the **last Crew Pack outfit** Fortnite will ship.

The same day, Epic published **[Big Changes to Fortnite Crew Launching December 5](https://www.fortnite.com/news/big-changes-to-fortnite-crew-launching-december-5)**. The overhaul starts **5 December 2026**. That date also lines up with **[Chapter 8 Season 1](/leaks/fortnite-chapter-8-season-2-release-date)** and **[Community Day](/leaks/fortnite-community-day-golden-umbrella)**.

## N.E.K.O. — December 2026 Crew Pack (final outfit)

**N.E.K.O.** is a **Crew Series** outfit in the **N.E.K.O.** set. In-game selectable styles include **N.E.K.O.**, **T.Y.G.R.**, **G.O.L.D.I.E.**, **P.E.A.R.L.**, **I.C.Y.**, and **O.R.I.O.N.**, plus a **Hood** on/off option. Epic’s post is clear: **Crew Pack outfits are ending**, and **December’s pack is the final one**.

Epic’s FAQ adds that the **final December Crew Pack will be granted for subscribers throughout all of December** — so you do not need to be subscribed only on day one of the month to receive it if you stay (or join) as a Crew member during December.

Fortnite Crew remains **$11.99 USD**. That price is **not** changing with the 5 December update.

## What changes on 5 December (official)

Epic lists four headline changes:

1. **Monthly V-Bucks** start at **1,000** and rise the longer you stay subscribed, topping out at **1,600** at **12 months**.
2. **OG Pass ends on 5 December** with a dramatic conclusion at the end of **Chapter 1: OG Season X**. The **next era of Fortnite OG** drops in **late 2027**.
3. **+20% XP** for the Crew subscriber, and **+10% XP** for squad members playing with you.
4. **Crew Pack outfits end** with December’s pack; **all Legacy Styles** for Crew Pack outfits you already own **will be granted**.

### What is not changing

Epic is explicit about the keepers:

- **Price** stays **$11.99 USD**
- The **Fortnite Battle Pass**, **Music Pass**, **LEGO Pass**, and **Rocket Pass Premium** are **still included** with Crew

Pass calendar Epic called out through year-end: **Music Mini-Pass** (12 Nov), then **LEGO Mini-Pass** and the **Fortnite Battle Pass** both on **5 December**.

## V-Bucks tiers (official)

| Tier | Tenure | Monthly V-Bucks |
| --- | --- | --- |
| **Core** | 1–2 months | **1,000** |
| **Bronze** | 3–5 months | **1,200** |
| **Silver** | 6–11 months | **1,400** |
| **Gold** | 12+ months | **1,600** |

If you previously subscribed and want credit for past tenure, Epic says: **resubscribe between 6 December and 31 December 2026 at 11:59 PM ET**, and your starting tier will reflect your **most recent continuous subscription period over the past 12 months**. Check the **in-game Crew tab on 5 December** for your starting tier.

Already subscribed? Epic says you **do not need to do anything** to keep the subscription when the changes roll out.

## XP boosts

Crew members earn **+20% Fortnite XP**. Party up, and members **without** Crew get a **+10%** boost while playing with you. Epic’s FAQ: Crew XP boosts **do not stack** with each other, and neither do party boosts — players without Crew get **one** 10% boost no matter how many Crew members are in the party.

## Legacy Styles for outfits you already own

Epic’s wording: **All Legacy Styles will be granted in December** for Crew Packs (**Outfits, Pickaxes, and Back Blings**) you own, **whether or not you’re currently subscribed**. You keep the Crew cosmetics you already unlocked; the December grant fills in remaining Legacy Styles for packs you own.

## Same day: Chapter 8 & Community Day

**5 December 2026** is crowded:

- **Crew changes** go live (official)
- **[Chapter 8 Season 1](/leaks/fortnite-chapter-8-season-2-release-date)** is the reported chapter start
- **[Community Day](/leaks/fortnite-community-day-golden-umbrella)** — Golden Community ’Brella login reward, Golden Jonesy Twitch Drops, and the chapter wrap window

Plan V-Bucks, Battle Pass, and login rewards around that single calendar day.

## FAQ

**Is N.E.K.O. the last Crew skin?**
**Yes.** Epic states Crew Pack outfits are ending and **December’s pack is the final one**. N.E.K.O. is that December 2026 Crew Pack outfit.

**When do Crew changes start?**
**5 December 2026**, per Epic’s official post.

**How many V-Bucks will Crew give?**
**1,000** per month at Core (1–2 months), rising to **1,200** (Bronze), **1,400** (Silver), and **1,600** at Gold (**12+ months**).

**Is OG Pass ending?**
**Yes.** Epic says OG Pass ends **5 December** with a conclusion at the end of **Chapter 1: OG Season X**. The next era of Fortnite OG is set for **late 2027**.

**Do I keep my old Crew skins / styles?**
You keep what you own. Epic will **grant all remaining Legacy Styles in December** for Crew Pack Outfits, Pickaxes, and Back Blings you already own — even if you are not currently subscribed.

**Filed / updated:** 25 November 2026. Status: **Watching** (official announcement; N.E.K.O. viewable, Crew changes go live 5 Dec).
`,
  },
  {
    slug: 'fortnite-golden-week-november-2026',
    title:
      'Fortnite Golden Week Starts 28 November — All Gold Outfits Back in Chests',
    excerpt:
      'Epic announced Golden Week for 28 Nov–5 Dec 2026: every Captain week’s golden goods return to chests, 2× Sprite Dust and XP, and 15× Gold Outfit odds during 28 Nov Treasure Hours. Leads into Community Day on 5 December.',
    category: 'gameplay',
    status: 'watching',
    date: '2026-11-24',
    confirmedDate: '2026-11-23',
    readTime: 6,
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'fortnite golden week',
      'gold outfits back in chests fortnite',
      'treasure hours 28 november odds',
      'fortnite golden week 2026',
      'fortnite 15x gold outfits',
      'golden charlotte fortnite',
      'fortnite 2x sprite dust',
    ],
    content: `
## What Epic announced

On **23 November 2026**, Epic officially announced **Golden Week** for Fortnite Treasure Hunters. It starts **Saturday 28 November 2026 at 9 AM ET** (**2 PM UK**) and runs through the **end-of-chapter event on 5 December**. That is the final week of **Chapter 7**, and Epic’s own post points players onward to **Community Day on 5 December** (“hop aboard for Community Day on 12/5”).

Golden Week refreshes the treasure pool and **unvaults** previous Captain weeks’ golden goods back into **chests**. Alongside the loot shuffle, Epic is running **2× Sprite Dust** and **2× Sprite XP** for the whole week (Mastery Monday benefits all week), with more Sprite chests on the map and Sprite variants appearing more often.

## What’s back in chests

According to Epic, **all Gold Outfits**, **Vehicles**, **Back Blings / Pickaxes**, **Jam Tracks**, and **Loading Screens** from earlier Captain weeks return to the chest pool. New treasure such as the **Solid Gold Captain X** outfit is also in the mix (Epic says it arrives a day early relative to the usual Captain cadence).

Because the pool is fuller, Epic says the chance that a chest holds **any** treasure rises from **1 in 62** to **1 in 21** (excluding duplicates you already own). Squadmates can still roll treasure at those rates even if you already own the item. Each **specific** treasure keeps its standard rate unless Epic lists a multiplier for that category.

Gold Outfits also get a **2× base drop-rate boost** for the whole of Golden Week, with **higher** multipliers during Treasure Hours.

## Treasure Hours on 28 November — odds

Epic published the **28 November Treasure Hours** multipliers:

- **Gold Outfits: 15×** (vs the usual Treasure Hours **7.5×**; Epic notes this as 7.5× with the 2× Golden Week boost stacked)
- **Vehicles & Decals: 10×** (unchanged from the usual Treasure Hours vehicle boost)
- **Pirate Shop Access: 1.5×** (same as recent Access boost windows)

**All Gold Outfits** are in the chests during Golden Week — not just the current weekly prize. For context on earlier weekly gold prizes, see [Pirate Chest Prizes Week 3–4](/leaks/fortnite-pirate-chest-prizes-week-3-4) (**Gold Miku** in week 3, **Solid Gold Kasane Teto** in week 4) and the [Gold Lil Uzi Vert sprite](/leaks/gold-lil-uzi-vert-sprite) page. Base odds live on [Pirate Shop odds](/leaks/pirate-shop-odds); prior Treasure Hours windows are on [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours).

Exact Treasure Hours clock times for 28 Nov follow the recent Saturday pattern (**2–4 PM ET / 7–9 PM UK** and **9–11 PM ET / 2–4 AM UK Sunday**) unless Epic posts a different MOTD — confirm in-client when the day opens.

## Golden Series & Golden Charlotte (24 Nov)

On **24 November 2026**, a **Golden Series** was added in-game, and **Golden Charlotte** became **free for Battle Pass owners**. Charlotte’s anime Battle Pass look (Charlotte-Sensei) is part of the Treasure Hunters pass lineup; the gold variant is a separate free grant for owners, not an Item Shop purchase.

## How to take part

1. Play **Battle Royale** from **28 Nov 9 AM ET / 2 PM UK** onward and open **chests** (and Sprite chests) as usual.
2. Prioritise **Treasure Hours** on **28 Nov** if you are hunting Gold Outfits — that is when the **15×** outfit multiplier is live.
3. Keep grinding Sprites for the week-long **2× Dust / 2× XP**.
4. Plan ahead for **[Community Day on 5 December](/leaks/fortnite-community-day-golden-umbrella)** — Golden Week leads straight into that login / Twitch Drops day.

Pirate Shop Access remains a separate chest prize with its own **1.5×** Treasure Hours boost. Guide: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite) · feature page: [Pirate Shop Access](/leaks/pirate-shop-access-feature).

## Quick FAQ

**When does Fortnite Golden Week start?**
**Saturday 28 November 2026 at 9 AM ET** (**2 PM UK**), through the **5 December** end-of-chapter event.

**Are all gold outfits in chests?**
**Yes** — Epic says every Gold Outfit from previous Captain weeks is back in the pool, plus new gold treasure such as Solid Gold Captain X.

**What are the 28 Nov Treasure Hours outfit odds?**
**15×** for Gold Outfits (vs usual **7.5×**). Vehicles & Decals stay **10×**; Pirate Shop Access stays **1.5×**.

**Does Golden Week include 2× XP?**
**Yes** — Epic is applying Mastery Monday benefits all week: **2× Sprite Dust** and **2× Sprite XP**.

**What comes after Golden Week?**
**[Community Day on 5 December](/leaks/fortnite-community-day-golden-umbrella)** — Golden Community ’Brella for logging in, Golden Jonesy via Twitch Drops, and the Chapter wrap.

**Filed:** 24 November 2026. Status: **Watching**.

`,
  },
  {
    slug: 'fortnite-treasure-hunter-hope-gilded-hunter-hope-bonus-skins',
    title:
      'Free Treasure Hunter Hope & Gilded Hunter Hope — V-Bucks Bonus & Pirate Shop Access',
    excerpt:
      'Buy 800 V-Bucks for Treasure Hunter Hope or 2,400 for Gilded Hunter Hope (both thresholds) — purchases from 1 Nov through 5 Dec count. Activating Pirate Shop Access by 5 Dec 3 PM ET / 8 PM UK also grants both skins (up to 72 hours). Gift cards and V-Bucks bundles do not count.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-24',
    readTime: 6,
    featured: true,
    image: '/images/guides/select-character.webp',
    tags: [
      'treasure hunter hope fortnite',
      'gilded hunter hope how to get',
      'fortnite free hope skin v-bucks',
      'treasure hunter hope free',
      'gilded hunter hope fortnite',
      'fortnite hope bonus skins',
      'pirate shop access hope skins',
    ],
    content: `
## What’s on offer

Fortnite is running a **bonus skins** promotion tied to **V-Bucks purchases** and **Pirate Shop Access** during Treasure Hunters. The two outfits are **Treasure Hunter Hope** and **Gilded Hunter Hope** — anime-styled looks for **Hope**, a long-running Fortnite original character who has appeared across recent chapters and seasons.

Neither skin is sold as a normal Item Shop tile. You unlock them by hitting purchase thresholds or by activating Pirate Shop Access before the season ends.

## V-Bucks thresholds

- Buy **800 V-Bucks** → unlock **Treasure Hunter Hope**
- Buy **2,400 V-Bucks** → unlock **Gilded Hunter Hope** (and **Treasure Hunter Hope** as well, because **2,400** covers both thresholds)

Purchases made from **1 November through 5 December 2026** count. Totals are **cumulative** on the same Epic account: if earlier buys since 1 Nov already sum to **2,400+**, you may already own both; if you are part-way there, one more pack that pushes you over the line can unlock the missing skin(s). For example, if you already bought **1,600**, an **800** pack can finish the **2,400** total and grant both.

**V-Bucks purchases stack across all platforms** on the same Epic account — PC, console, and mobile tallies add together.

## What does not count

**Gift cards** and **bundles that include V-Bucks** do **not** count toward the thresholds. Only direct V-Bucks purchases that Epic’s promotion tracks apply. If you are buying specifically for these skins, use a plain V-Bucks pack rather than a gift card or a mixed content bundle.

## Free route: Pirate Shop Access

Activating **Pirate Shop Access** by **5 December 2026 at 3 PM ET** (**8 PM UK**) also grants **both** Hope skins. Delivery can take **up to 72 hours** after you activate Access, so do not expect an instant Locker update the second the token clears.

If you already redeemed Access earlier in the season, you should still receive both outfits under this promotion — wait out the delivery window before buying V-Bucks just for the skins. How Access works: [Pirate Shop Access feature](/leaks/pirate-shop-access-feature) · step-by-step: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

## Dates and times (UK / ET)

| Milestone | ET | UK (GMT) |
| --- | --- | --- |
| Purchases start counting | **1 Nov 2026** | **1 Nov 2026** |
| Access deadline for both skins | **5 Dec 3 PM ET** | **5 Dec 8 PM UK** |
| Season / promo end context | Chapter wrap **5 Dec** | same day |

Item Shop still resets at **00:00 UK**; that reset clock is separate from the Access deadline above.

## How to claim

1. Check your Locker after any qualifying V-Bucks purchase or Access activation — skins may appear automatically once Epic’s grant job runs.
2. If nothing shows, wait up to **72 hours** (especially for the Access path).
3. Confirm you used a **qualifying V-Bucks purchase** (not a gift card / V-Bucks-in-bundle) if you are on the spend path.
4. Make sure every platform purchase is on the **same Epic account**.

## Context

Hope’s bonus skins sit alongside the season’s wider gold push — [Golden Week](/leaks/fortnite-golden-week-november-2026) from **28 Nov**, weekly gold chest prizes, and [Community Day](/leaks/fortnite-community-day-golden-umbrella) on **5 Dec**. Gilded Hunter Hope is a gold-styled variant; it is **not** described as a Pirate Chest drop in the facts we have, so treat chests and this promo as separate tracks.

## Quick FAQ

**How do I get Treasure Hunter Hope for free?**
Either buy **800 V-Bucks** (cumulative from 1 Nov) or activate **Pirate Shop Access** by **5 Dec 3 PM ET / 8 PM UK**. Access grants both skins.

**Does 2,400 V-Bucks give both skins?**
**Yes** — **2,400** covers the **800** and **2,400** thresholds, so you get Treasure Hunter Hope and Gilded Hunter Hope.

**Do gift cards count?**
**No.** Gift cards and bundles that include V-Bucks do not count.

**Do purchases on different platforms add up?**
**Yes**, if they are on the **same Epic account**.

**How long after Pirate Shop Access do the skins arrive?**
Up to **72 hours**.

**Filed:** 24 November 2026. Status: **Watching**.

`,
  },
  {
    slug: 'fortnite-community-day-golden-umbrella',
    title:
      'Fortnite Community Day 5 December — Golden Jonesy, Golden Umbrella & More',
    excerpt:
      'Community Day is 5 December 2026. Golden Jonesy via Twitch Drops from 5 Dec 9 AM ET (2 PM UK) to 7 Dec 9 AM ET (2 PM UK); Golden Community Umbrella and more for logging in on 5 Dec from 9 AM ET until the end-of-chapter event wraps. Golden Week starts 28 Nov.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-24',
    readTime: 5,
    featured: true,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'fortnite community day',
      'fortnite golden umbrella',
      'fortnite community day rewards',
      'free fortnite umbrella',
      'fortnite community day date',
      'golden jonesy fortnite',
      'fortnite twitch drops golden jonesy',
    ],
    content: `
## Update — 24 November

**Community Day is confirmed for Saturday 5 December 2026.** Epic’s Golden Week / Community Day post lays out the rewards and windows below. Earlier “next week / week of 30 Nov” reporting is superseded by this date.

## What’s confirmed for 5 December

**Golden Community Umbrella (’Brella) and more** — log in on **5 December** any time from **9 AM ET** (**2 PM UK**) until the **end-of-chapter event wraps**. Epic has not published the event’s exact end minute yet, so treat “until it wraps” as the live window.

**Golden Jonesy outfit** — earn it via **Twitch Drops** from **5 December 9 AM ET** (**2 PM UK**) to **7 December 9 AM ET** (**2 PM UK**). Watch eligible Fortnite streams with drops enabled and link your Epic account as usual.

[Chapter 8 Season 1](/leaks/fortnite-chapter-8-season-2-release-date) still starts **5 December 2026**, so Community Day lands on the same calendar day as the chapter wrap / new season transition.

## Golden Week lead-in

**[Golden Week](/leaks/fortnite-golden-week-november-2026)** starts **28 November 2026 at 9 AM ET** (**2 PM UK**) and runs through the end-of-chapter event on **5 December**. All prior Captain-week gold goods return to chests, with **2× Sprite Dust / 2× Sprite XP** and boosted Treasure Hours on **28 Nov**. Epic frames Golden Week as the runway into Community Day.

## The golden umbrella

The new glider is the **Golden Community ’Brella** — a gold take on the Community ’Brella design from the first Community Day. It is earned by **logging in during the 5 Dec window**, not sold as an Item Shop purchase.

## What last Community Day gave (guide only)

The first Fortnite Community Day ran on **Saturday 30 May 2026** during Chapter 7 Season 2. Logging in between **9 AM ET on 30 May** and **9 AM ET on 31 May** unlocked:

- The free **Community 'Brella** — an all‑black common umbrella glider (in‑game description: "Squad up, together.") with a **"Prime (May 30)"** style
- The silver **Reflector** wrap (originally from the 2020 Silver Surfer set files; never released before)

Battle Pass / Crew owners also received an office‑style tie variant of **The Foundation (Reforged)**. Winning a Battle Royale match that day unlocked the **Lemmie Axe** pickaxe, **Space Blaster** wrap, and **Loons** back bling. Twitch drops covered Metal Menace bundle accessories.

Treat the May list as **last time’s rewards** — useful context, not a copy-paste sheet for 5 December beyond what Epic has already named (Golden ’Brella, Golden Jonesy, “and more”).

## How to make sure you get it

1. **Log in** on **5 December** from **9 AM ET / 2 PM UK** until the end-of-chapter event ends for the **Golden Community ’Brella** and more.
2. For **Golden Jonesy**, enable Twitch Drops and watch eligible streams between **5 Dec 9 AM ET** and **7 Dec 9 AM ET**.
3. Watch the [News](/news) hub and in‑game MOTD for any extra surprise rewards Epic adds closer to the day.

## Quick FAQ

**Is the golden umbrella free?**
**Yes** — log in during the **5 December** Community Day window.

**When is Fortnite Community Day?**
**Saturday 5 December 2026**, from **9 AM ET / 2 PM UK** until the end-of-chapter event wraps.

**How do I get Golden Jonesy?**
**Twitch Drops** from **5 Dec 9 AM ET** to **7 Dec 9 AM ET** (same times in UK: **2 PM** start / end).

**What is Golden Week?**
The final treasure week starting **28 Nov** — details on the [Golden Week page](/leaks/fortnite-golden-week-november-2026).

**Filed:** 23 November 2026. **Updated:** 24 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'fortnite-aim-assist-update-november-2026',
    title:
      'Fortnite Aim Assist Update (Nov 2026): PC Controller Buff & Precision Changes',
    excerpt:
      'Epic’s aim assist changes reported 23 Nov 2026: more consistent close-range assist, a small PC controller buff to match consoles, and less sticky precision tracking on fast-moving targets. How to tweak strength in Settings.',
    category: 'gameplay',
    status: 'shipped',
    date: '2026-11-23',
    confirmedDate: '2026-11-23',
    readTime: 3,
    image: '/images/guides/secret-weapon.webp',
    tags: [
      'fortnite aim assist update',
      'fortnite aim assist nerf',
      'fortnite pc controller aim assist',
      'fortnite precision aim assist',
      'fortnite aim assist settings',
    ],
    content: `
## What changed

Epic’s aim assist changes, reported on **23 November 2026**, adjust how controller assist feels in close fights and how precision tracking sticks to fast targets. No patch number or percentage figures were published with the notes summarised here — just the behaviour changes below.

## More consistent close range

Aim assist is now **more consistent at close range**. In practice that should make shotgun and SMG fights feel steadier when you are already on top of an opponent: less of the old “sometimes sticky, sometimes floaty” variance when both players are in each other’s face.

That does **not** mean every close fight is easier. Consistency cuts both ways — opponents on controller get the same closer‑range stabilisation. Expect fewer wild swings from assist alone and more of the outcome decided by movement, peeks, and shot timing.

## PC controller now matches consoles

**PC controller** aim assist received a **small buff** so its strength **matches consoles**. Previously, PC controller assist was **weaker** than console assist. If you play Fortnite with a pad on PC, this is the change aimed at you: parity with console strength rather than a brand‑new PC‑only system.

Console players should not expect a large console‑side buff from this line item — the headline is bringing PC pad strength up to the console baseline.

## Precision assist is less sticky on fast targets

**Precision** aim assist is less “sticky” on **fast‑moving** targets. The **maximum tracking speed is unchanged**, but you may need **larger right‑stick movements** to stay on quick targets.

Read that as a trade‑off, not a simple nerf or buff: tracking ceiling stays the same, but the stick work to hold a strafing or jump‑peeking opponent is more on you. Slow, predictable peeks should feel closer to before; high‑speed tracking will feel less magnetised.

## How to adjust aim assist strength

From Epic’s help article:

1. Open **Settings**
2. Go to **Controller** options
3. Open **Sensitivity**
4. Set **Use Advanced Options** to **ON**
5. Set **Aim Assist strength**
6. Hit **Apply**

Not all settings appear on every platform. If you do not see Advanced Options or Aim Assist strength, check you are on a controller profile and that your platform exposes those toggles.

After tweaking, run a few Creative or Team Rumble fights before ranked — small strength changes feel bigger once precision stickiness is reduced.

## Quick FAQ

**Was aim assist nerfed or buffed?**
Both, depending on the layer: **close‑range consistency** improved, **PC controller** got a **small buff** toward console parity, and **precision** tracking on **fast** targets feels **less sticky** (same max tracking speed, more stick input needed).

**Does PC controller aim assist now match console?**
According to Epic’s notes as reported, **yes** — PC controller strength was brought in line with consoles.

**How do I change aim assist strength?**
**Settings → Controller → Sensitivity → Use Advanced Options ON → Aim Assist strength → Apply.** Availability varies by platform.

**Shipped / reported:** 23 November 2026.
`,
  },
  {
    slug: 'fortnite-crash-spyro-persona-5-royal-return-dates',
    title:
      'Crash Bandicoot, Spyro & Persona 5 Royal Return to Fortnite: Shop Dates (22–25 Nov)',
    excerpt:
      'Crash Bandicoot & Spyro, Overwatch Wave 1, and Privateer Oscar landed with the 22 Nov reset. Cardamom Sidekick landed 23 Nov. Persona 5 Royal actually returned with the 25 Nov shop (00:00 UK) — a day later than the 24 Nov window first expected from Epic’s reel.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-25',
    readTime: 5,
    featured: true,
    image: '/images/guides/crash-bandicoot-featured.webp',
    tags: [
      'crash bandicoot fortnite return',
      'spyro fortnite return',
      'persona 5 fortnite return',
      'joker fortnite skin return',
      'fortnite item shop november 22',
      'fortnite item shop november 25',
      'privateer oscar fortnite skin',
      'overwatch wave 1 fortnite return',
    ],
    content: `
## 25 Nov update — Persona 5 Royal returned

**Persona 5 Royal** returned with the **25 November 2026** Item Shop reset (**00:00 UK** / **7 PM ET on 24 Nov**) — **one day later** than the **24 Nov** window first expected from Epic’s shop reel. Live shop data lists the **Persona 5 Royal Bundle** at **3,800 V‑Bucks**, with **Joker** and **Panther** at **1,800** each and **Morgana** Sidekick at **1,500**. Full 25 Nov shop rundown: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks). Confirm leave timers on the [Item Shop tracker](/tools/item-shop).

## 22 Nov update — Crash, Spyro, Wave 1 & Oscar landed a day late

According to the leaked **22 November** shop, **Crash Bandicoot & Spyro**, **Overwatch Wave 1**, and **Privateer Oscar** (now as a full bundle) arrived with the **22 Nov** reset — **one day later** than the first **21 Nov** reports. **Gorillaz** and **ICON Lachlan & Rubius** were also in that shop.

Leaks on **18–19 November** had originally put Crash, Spyro, Privateer Oscar, and Wave 1 on the **21 November** reset. After that reset: Crash, Spyro, and Privateer Oscar were **not** in the live shop, and Wave 1 outfits did **not** return as standalone BR rows that day — **D.Va / Mercy / Tracer / Genji** only showed as **Rocket Racing car skins** inside the **Porsche Cayenne Turbo Electric + Overwatch** pack. **Kiriko & Widowmaker** (Wave 2) remain live — [Kiriko & Widowmaker](/leaks/fortnite-overwatch-wave-2-kiriko-widowmaker).

Times below are the daily **Item Shop reset at 00:00 UK (GMT)** = **7:00 PM ET the previous evening**. Confirm tiles on the [Item Shop tracker](/tools/item-shop).

## At a glance — late November

| Date (UK reset) | What’s slated | Status |
| --- | --- | --- |
| Sat **21 Nov** | Overwatch Wave 2 — **Kiriko & Widowmaker** | **Shipped** · [page](/leaks/fortnite-overwatch-wave-2-kiriko-widowmaker) |
| Sat **21 Nov** | **Crash & Spyro** · **Privateer Oscar** · Wave 1 BR return | **Missed 21 Nov** — landed **22 Nov** |
| Sun **22 Nov** | Crash & Spyro · Privateer Oscar bundle · Wave 1 · Gorillaz · Lachlan & Rubius | **Landed** (leaked shop) |
| Mon **23 Nov** | **Cardamom** Sidekick (plus Phineas & Ferb / PotC / Harvest) | **Landed** · [shop page](/leaks/upcoming-item-shop-leaks) |
| Tue **24 Nov** | **Persona 5 Royal** (Epic reel expectation) | **Missed 24 Nov** — landed **25 Nov** |
| Wed **25 Nov** | **Persona 5 Royal** return | **Landed** · [shop page](/leaks/upcoming-item-shop-leaks) |

## Crash Bandicoot & Spyro — 22 Nov return

First drop: **28 Aug 2026** → left **11 Sep 2026**. **Crash** = outfit (+ **Crash Classic** / **LEGO** styles). **Spyro** = **Sidekick**, not an outfit.

Last shop menu (reference only; confirm return prices on the [Item Shop tracker](/tools/item-shop)):
- Crash outfit (with Bandicoot wrap) — **1,500 V‑Bucks**
- Spyro Sidekick — **1,500**
- **Wumpa Mace** pickaxe — **800**
- **Aku Aku** back bling — **600**
- Bandicoot wrap — **500**
- Crash’s Victory emote — **500**
- Full bundle — **3,000**

## Persona 5 Royal — returned 25 Nov

Epic’s **18 Nov** next‑wave reel had pointed at **24 November**; the set actually returned on **25 November** (**00:00 UK**). First sold **25 Sep 2026** (7pm ET); previously last seen around **early October 2026**.

Catalogue: **Joker**, **Ann Takamaki (Panther)**, transformation / Showtime emotes, **Shujin Academy** / **Carmen’s Heart** back blings, **Silver Dagger** / **Carmen’s Heart Flail** pickaxes, Eyes wraps, **Morgana** Sidekick, **Morgana Slippers**, Festival kit pieces, **"Life Will Change"** Jam Track. Current **Persona 5 Royal Bundle** price: **3,800 V‑Bucks**.

## Privateer Oscar + Captain’s Day

Oscar was first leaked for the **21 Nov** shop ahead of **Captain’s Day** on **22 Nov**, then landed as a **full bundle** with the **22 Nov** reset according to the leaked shop. Buying the outfit is **not required** for Captain’s Day. Cadence: [Captain’s Days](/leaks/captain-days-content-stack).

## Quick FAQ

**Did Crash and Spyro return on 21 Nov?**
**No** — they missed that reset and landed with the **22 Nov** shop according to leaks.

**Did Persona 5 Royal return on 24 Nov?**
**No** — it returned with the **25 Nov** shop (**00:00 UK**), a day after the reel expectation.

**Do I need Oscar for Captain’s Day?**
**No.** See [Captain’s Days](/leaks/captain-days-content-stack).

**Is Spyro a skin?**
**Sidekick**, not a wearable outfit. **Crash** is the outfit.

**Updated:** 25 November 2026.
`,
  },
  {
    slug: 'jurassic-park-jeep-wrangler-fortnite',
    title: 'Jurassic Park x Jeep Wrangler Fortnite Collab — Out Now (Car Body)',
    excerpt:
      'Shipped: Jurassic Jeep Wrangler is live as a Rocket Racing / car body with Staff and Tour wheels. Body offer around 2,000 V-Bucks; individual wheels 400. Still in the 21 Nov shop rotation.',
    category: 'shop',
    status: 'shipped',
    date: '2026-11-17',
    confirmedDate: '2026-11-18',
    readTime: 2,
    featured: true,
    image: '/images/guides/jurassic-jeep-wrangler-featured.webp',
    tags: [
      'jurassic park fortnite',
      'jurassic park jeep fortnite',
      'fortnite jeep wrangler',
      'fortnite item shop 18 november',
      'jurassic jeep wrangler fortnite',
    ],
    content: `
## Out now

**Jurassic Jeep® Wrangler** hit the Item Shop with the **18 November 2026** reset (**00:00 UK** / **7:00 PM ET on 17 Nov**). Still listed in the **21 Nov** shop feed.

Live tiles: [Item Shop tracker](/tools/item-shop).

## What’s in it (confirmed)

| Offer | Contents | V‑Bucks (shop feed) |
| --- | --- | --- |
| Jurassic Jeep® Wrangler | Car **body** + wheel | **~2,000** |
| Jurassic Jeep® Wrangler wheel | Default wheel | **400** |
| Staff wheel | Style wheel | **400** |
| Tour wheel | Style wheel | **400** |

This is a **vehicle / Rocket Racing body**, not a BR outfit. No Jurassic Park character skins shipped with this drop.

## Still open

- How long the Jeep stays in rotation
- Whether Epic adds more Jurassic cosmetics later

## Links

- [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)
- [Item Shop tracker](/tools/item-shop)

**Shipped:** 18 November 2026. **Updated:** 21 November 2026.
`,
  },
  {
    slug: 'fortnite-game-awards-2026-nominations',
    title: 'Fortnite at The Game Awards 2026: Best Ongoing Game Nomination',
    excerpt:
      'Fortnite is nominated for Best Ongoing Game at The Game Awards 2026 alongside Arc Raiders, No Man’s Sky, Final Fantasy XIV, and The Witcher 3: Wild Hunt. No Best Community Support nomination.',
    category: 'season',
    status: 'watching',
    date: '2026-11-17',
    readTime: 2,
    image: '/images/guides/stars-of-the-show.webp',
    tags: [
      'fortnite game awards 2026',
      'best ongoing game 2026',
      'the game awards 2026 nominees',
      'fortnite best ongoing game',
    ],
    content: `
## Nomination (official)

Fortnite is nominated for **Best Ongoing Game** at **The Game Awards 2026**.

**Category nominees:**
- Fortnite
- Arc Raiders
- No Man’s Sky
- Final Fantasy XIV
- The Witcher 3: Wild Hunt

Fortnite did **not** receive a **Best Community Support** nomination.

No ceremony predictions here — update if Epic or TGA post new details that matter for players.

**Updated:** 21 November 2026.
`,
  },
  {
    slug: 'hello-neighbor-fortnite-collab',
    title: 'Hello Neighbor x Fortnite — Confirmed Coming Soon (Theodore Teased)',
    excerpt:
      'Official: Hello Neighbor is coming to Fortnite. Epic Games Store and Neighbor Games teased Theodore Peterson on 14 Nov 2026; coverage also points at an EGS gift-with-purchase plus a possible Item Shop route. No release date, prices, or full cosmetic roster yet — still not in the shop as of 26 Nov.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-14',
    confirmedDate: '2026-11-14',
    readTime: 5,
    featured: true,
    tags: [
      'hello neighbor fortnite',
      'hello neighbor fortnite skin',
      'hello neighbor x fortnite collab',
      'fortnite hello neighbor release date',
      'hello neighbor epic games store gift',
      'theodore peterson fortnite',
      'hello neighbor fortnite when',
    ],
    content: `
## Status — 26 November

**Hello Neighbor x Fortnite is confirmed as coming soon** — not a pure datamine guess. As of **26 November 2026** there is still **no** live Item Shop tile, **no** public V‑Buck price, and **no** dated shop day from Epic. Treat every “drops on X date” post as speculation until tiles appear on the [Item Shop tracker](/tools/item-shop).

## What was announced (14 Nov)

On **14 November 2026**, the **Epic Games Store** posted a short teaser framed like a Fortnite loading screen, with **Theodore Peterson** (the Neighbor) climbing through a window. The official **Hello Neighbor / Neighbor Games** account followed up asking where Theodore is dropping and stating **Hello Neighbor is coming to Fortnite**. Publisher **tinyBuild** amplified the same tease.

That moves this out of “encrypted set only” territory: the **IP crossover is official**. What is **not** official yet is the exact cosmetic list, the shop day, or the EGS offer fine print.

## How you might unlock it

Coverage of the same-day tease points at two possible routes (details still incomplete):

1. **Epic Games Store gift‑with‑purchase** — buy / claim a Hello Neighbor title (or related offer) on EGS → Fortnite reward  
2. **Item Shop** — a paid V‑Buck row if Epic also sells the set normally  

Neither path has a published start date, qualifying SKU list, or reward name from Epic’s Fortnite news blog yet. Similar recent GWP-style collabs on this site: **[Ember & Blade](/leaks/upcoming-item-shop-leaks)** (flagged for **1 Dec** as EGS GWP **or** **1,500** V‑Bucks).

## Who is Theodore?

**Theodore Peterson** is the Neighbor — purple sweater, moustache, the antagonist from the Hello Neighbor games. The teaser and key art put him front and centre, so he is the safe headline expectation for whatever ships. Epic has **not** said whether he is:

- a playable **Outfit**
- an **NPC** / limited-time map presence
- only a **promotional** cosmetic via EGS

Do not buy V‑Bucks or an EGS game solely on fan bundle mockups — wait for Epic’s offer text.

## What is still unknown

| Claim | Status |
| --- | --- |
| Hello Neighbor is coming to Fortnite | **Confirmed** (EGS + Neighbor Games, 14 Nov) |
| Theodore is the teaser focus | **Confirmed** in the tease |
| Exact release date | **Unknown** |
| Full cosmetic roster / prices | **Unknown** |
| EGS GWP rules (which purchase, what reward) | **Unconfirmed** |
| Item Shop row in addition to GWP | **Unconfirmed** |
| Tie-in to **5 Dec** chapter wrap | **Speculation only** — same calendar week is crowded ([Community Day](/leaks/fortnite-community-day-golden-umbrella) / [Chapter 8](/leaks/fortnite-chapter-8-season-2-release-date)), but Epic has not linked Hello Neighbor to that day |

## What to ignore

- Viral “Hello Neighbor Fortnite trailers” that are Blender / UEFN fan edits  
- Fake early-access codes or “free unlock” Creative maps  
- Specific shop dates that are not on Epic, EGS, or the live tracker  

## Quick FAQ

**Is Hello Neighbor coming to Fortnite?**
**Yes** — officially teased as **coming soon** on **14 Nov 2026**.

**When does it release?**
**Not announced.** Still absent from the live shop as of **26 Nov**.

**Is Theodore a skin?**
**Expected** to headline the collab, but Epic has not published an outfit card yet.

**Is it free?**
Possibly via an **EGS gift‑with‑purchase** — or paid in the Item Shop — or both. Rules are not published.

**Will it land before Chapter 8?**
Unknown. Do not assume a **5 Dec** drop just because the chapter flips that day.

## What to watch next

1. EGS store page / Fortnite news for the real GWP terms  
2. Live tiles on the [Item Shop tracker](/tools/item-shop)  
3. Rolling calendar: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)

**Filed:** 14 November 2026. **Updated:** 26 November 2026. Status: **Watching** (crossover confirmed; cosmetics / date pending).
`,
  },
  {
    slug: 'pirate-hatsune-miku-fortnite-bundle',
    title: 'Cap’n Hatsune Miku Fortnite Bundle — Out Now (2,200 V-Bucks), Emote 500',
    excerpt:
      'Cap’n Hatsune Miku is live in the Item Shop: outfit + Miku’s Treasure for 1,500 V-Bucks, full Miku Sets Sail! bundle 2,200 (saves 1,900 vs singles). Emote Miku Miku ni Shite Ageru♪ is 500. Shop data lists the section through 14 Dec 2026. Friendship Villa + Solid Gold Miku chests are the BR beat.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-14',
    confirmedDate: '2026-11-15',
    readTime: 6,
    featured: true,
    image: '/images/guides/capn-hatsune-miku-hero.webp',
    tags: [
      'pirate hatsune miku fortnite',
      'capn hatsune miku fortnite',
      'hatsune miku fortnite price',
      'capn hatsune miku price',
      'hatsune miku fortnite bundle',
      'miku miku ni shite ageru fortnite emote',
      'miku sets sail fortnite',
      'hatsune miku fortnite release date',
    ],
    content: `
## Out now

**Cap’n Hatsune Miku** (set: **Miku Sets Sail!**) flipped with the shop reset at **00:00 UK on 15 November 2026** (**7:00 PM ET / 4:00 PM PT on 14 Nov**). Icon Series pirate-captain look — in-game line: “All aboard the friend ship!” — with an **Emissive** style option for the glow.

Confirm live tiles and leave times on the [Item Shop tracker](/tools/item-shop).

## Prices (confirmed)

| Offer | What’s in it | V‑Bucks |
| --- | --- | --- |
| Cap’n Hatsune Miku | Outfit + **Miku’s Treasure** back bling | **1,500** |
| Cap’n Hatsune Miku **bundle** | Outfit, Treasure, **Miku’s Anchor Floatie**, **Miku Miku ni Shite Ageru♪**, **Miku’s Mic**, **CONNECT:COMMUNE** Jam Track | **2,200** (was 4,100) |
| Miku Miku ni Shite Ageru♪ | Emote (also in the big bundle) | **500** |
| Miku’s Anchor Floatie | Pickaxe | **800** |
| Miku’s Mic | Mic / Festival kit pieces | **800** |
| CONNECT:COMMUNE | Jam Track (FLAVOR FOLEY ft. Hatsune Miku) | **500** |
| Miku’s Treasure | Back bling alone | **400** |
| Miku’s Beam Wheels | Car wheels | **700** |
| Hatsune Miku Cyclone Bundle | Car body pack (separate from the outfit bundle) | **1,500** |

**Bundle math:** buying the main extras à la carte lands around **4,100 V‑Bucks**; the **2,200** bundle saves about **1,900**. Outfit-only shoppers can stay on the **1,500** offer. Short on V‑Bucks? [V‑Bucks calculator](/tools/vbucks-calculator).

## How long is she in shop?

Shop feed data currently lists the Hatsune Miku section through **14 December 2026** (leave at that day’s reset — **7:00 PM ET**). Epic can change rotations; treat the date as the plan, not a promise.

## Friendship Villa + Week 3 captains

Same weekend, **Hatsune Miku & Kasane Teto** take over BR: **Friendship Villa** on Crossbones Isle, arrival trailer/key art around **2:00 PM UK on 15 Nov**. Full beat: [Kasane Teto & Friendship Villa](/leaks/kasane-teto-fortnite-music-pass-friendship-villa) · [map](/fortnite-map).

## Solid Gold Miku from chests (not the shop skin)

**Week 3 Treasure Prizes** include **Solid Gold Hatsune Miku** and **Miku’s Takarabako** as **chest** rewards — separate from Cap’n Miku in the Item Shop. Details: [chest prizes week 3–4](/leaks/fortnite-pirate-chest-prizes-week-3-4) · odds: [Pirate Shop odds](/leaks/pirate-shop-odds).

## Not the 2025 Miku outfit

The original **Hatsune Miku** (Jan 2025) is a different cosmetic. Cap’n is a **new** outfit — owning the old one does not unlock this look.

## Pirate Shop Access

If your **Pirate Shop Access** window is active, look for **Claim** on eligible shop rows in-client. Guide: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

## Related

- [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)
- [TWINDRILL DIVA / Kasane Teto Music Pass](/leaks/kasane-teto-fortnite-music-pass-friendship-villa)
- [Captain’s Days stack](/leaks/captain-days-content-stack)

**Shipped:** 15 November 2026.
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
    image: '/images/guides/pirate-speedy-featured.webp',
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

**Prices (confirmed):** **1,500 V‑Bucks** for the outfit; **1,800 V‑Bucks** for the full bundle. Check the [Item Shop tracker](/tools/item-shop) if the row is still up.

## Bundle contents

- **Outfit** — Pirate Speedy / Pirate D. Speedy
- **Back Bling** — Speed’s Coin
- **Pickaxe** — Speed’s Pirate Blade
- **Emote** — IShowFlip

Live tiles: [Item Shop tracker](/tools/item-shop) · rolling list: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks).

## Not the old Icon Series skin

This is a **separate** collab outfit from Speed’s **original Icon Series skin** (December 2025) and is unrelated to **Monkey D. Luffy**.

## Pirate Shop Access

If you have an active **Pirate Shop Access** window, look for the **Claim** button in-game. Guide: [How to get Pirate Shop Access](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

**Shipped:** 14 November 2026.
`,
  },
  {
    slug: 'fortnite-overwatch-wave-2-kiriko-widowmaker',
    title: 'Kiriko & Widowmaker Fortnite — Out Now (Overwatch Wave 2 Prices)',
    excerpt:
      'Out now: Kiriko and Widowmaker went live with the 21 Nov 00:00 UK reset (7 PM ET on 20 Nov) after an evening trailer on the 20th. Outfit rows 1,600 V-Bucks each; combined Widowmaker & Kiriko bundle 2,400 (was 5,000). Perfect Night (LE SSERAFIM) Jam Track is 500. Still in the 21 Nov shop.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-13',
    confirmedDate: '2026-11-21',
    readTime: 4,
    featured: true,
    image: '/images/guides/kiriko-featured.webp',
    tags: [
      'kiriko fortnite',
      'fortnite overwatch collab wave 2',
      'widowmaker fortnite skin',
      'overwatch wave 2 fortnite',
      'kiriko fortnite release date',
      'widowmaker fortnite',
      'kiriko widowmaker fortnite release date',
      'overwatch fortnite november 20',
      'perfect night fortnite jam track',
      'le sserafim fortnite',
      'kiriko fortnite emote',
      'overwatch wave 1 fortnite return',
    ],
    content: `
## Out now — 21 November

**Kiriko** and **Widowmaker** (Overwatch Wave 2) flipped with the **21 November 2026** Item Shop reset (**00:00 UK** / **7:00 PM ET on 20 Nov**) following a release trailer on the evening of **20 Nov**. Still live in the **21 Nov** shop.

Confirm tiles: [Item Shop tracker](/tools/item-shop).

## Prices (confirmed)

| Offer | What’s in it | V‑Bucks |
| --- | --- | --- |
| Kiriko | Outfit + **Kiriko’s Kitsune** + **Kiriko’s Kunai** | **1,600** |
| Widowmaker | Outfit + **Widowmaker’s Fang** + **Widow’s Kiss** | **1,600** |
| Widowmaker & Kiriko bundle | Both outfits + kits + **Kitsune Slippers** + **Ofuda Whirlwind** + **Widowmaker’s Salute** | **2,400** (was **5,000**) |
| Ofuda Whirlwind | Emote | **300** |
| Kitsune Slippers | Kicks | **1,000** |
| Kiriko’s Kitsune | Back bling | **400** |
| Kiriko’s Kunai | Pickaxe | **500** |
| Widowmaker’s Salute | Wrap | **500** |
| Widowmaker’s Fang + Widow’s Kiss | Pickaxe + back bling | **800** |
| Perfect Night | Jam Track — **LE SSERAFIM** | **500** |
| Porsche Cayenne Turbo Electric + Overwatch | Car pack (includes Wave 1 **car skins**) | **2,400** |

## Wave 1 note (21 Nov)

Standalone **D.Va / Mercy / Tracer / Genji** BR outfits did **not** return on **21 Nov**. Those names appear as **Rocket Racing car skins** inside the Porsche + Overwatch pack. Crash / Spyro / Oscar also missed that reset — [watch page](/leaks/fortnite-crash-spyro-persona-5-royal-return-dates).

## File history (pre-ship)

Wave 2 first showed in **13 Nov** files. Pre-launch dumps listed glowing Kiriko kit, kitsune kicks with footprints, cloth physics / LEGO style, and Widowmaker as the second hero (earlier guesses had floated Juno).

**Shipped:** 21 November 2026. **Updated:** 21 November 2026.
`,
  },
  {
    slug: 'scott-pilgrim-fortnite-collab-leak',
    title:
      'Scott Pilgrim x Fortnite: Official Shop Date 29 Nov UK (Scott & Ramona)',
    excerpt:
      'Official: Epic’s weekly Item Shop preview dates Scott Pilgrim & Ramona Flowers for “November 28” US — that is 7 PM ET on 28 Nov / 00:00 UK on 29 Nov 2026. Graphic-novel looks confirmed in the 24 Nov trailer. Named file cosmetics include Power of Love, Scott’s Bass, Large Hammer, Titanium Baseball Bat, Love’s Level Up. Prices still unannounced. Scott Pilgrim Cup (25 Nov) could unlock Scott early.',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-25',
    confirmedDate: '2026-11-24',
    readTime: 7,
    featured: true,
    image: '/images/guides/block-party.webp',
    tags: [
      'scott pilgrim fortnite',
      'scott pilgrim fortnite leak',
      'scott pilgrim fortnite trailer',
      'ramona flowers fortnite',
      'ramona flowers fortnite skin',
      'scott pilgrim fortnite release date',
      'fortnite scott pilgrim skins',
      'scott pilgrim cup fortnite',
      'fortnite lego style collab',
      'power of love sword fortnite emote',
    ],
    content: `
## Update — 27 November: official shop date (29 Nov UK)

**Scott Pilgrim** and **Ramona Flowers** are **officially** dated by Epic’s **weekly Item Shop preview** (posted **26 November 2026**) for **“November 28”** on Epic’s **US** shop card:

- **7 PM ET on 28 November 2026**
- = **00:00 UK on 29 November 2026**

Earlier outlet posts that said **8 PM ET on 29 Nov** (**1 AM UK on 30 Nov**) are **superseded** by Epic’s preview dating — confirm the in-game countdown when the tab appears. The set is **not** in the live **27 Nov 00:00 UK** shop yet (that window shipped **[Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)** instead). **V-Bucks prices** are still **unannounced**.

On **25 November 2026**, Fortnite Competitive ran a **Scott Pilgrim Cup**. Top finishers can earn the **Scott Pilgrim** outfit, **Scott’s 1-UP** Back Bling, and a **Scott!** emoticon **early**, before the shop drop. Formats reported: Solo / Duos across Reload (Mobile) and Battle Royale / Zero Build. Eligibility notes from outlet coverage of the Compete tab: age **13+**, account level **50+**, and **2FA** enabled. Exact session times and reward thresholds vary by region — check the **Compete** tab in-game.

A **full in-game showcase** of Scott and Ramona also circulated on the evening of **24 November**, after Epic’s trailer.

## Creator background (24 Nov)

Creator **Bryan Lee O’Malley** shared how the collab came together: talks between **Epic** and **Universal** started in **2024**, and the actual work came together over the past **~6 months**. Whether there is a **Wave 2** is up to Epic, not him. Context: in **July 2024** he had publicly said he told Universal to pursue a Fortnite collab if they wanted to.

## Update — 24 November: official trailer

Around **2 PM UK on 24 November 2026**, Epic released the **official Scott Pilgrim x Fortnite trailer** and revealed the **Scott Pilgrim** and **Ramona Flowers** outfits with **in-game images**. These are the **graphic novel** looks, not live-action likenesses.

## Earlier teaser — 23 Nov

Around **5:10 PM UK on 23 November 2026**, teaser artwork showed **Scott Pilgrim** and **Ramona Flowers** in their anime‑style look skydiving, with the tagline **"Romanticizing the dive."** That was the first public teaser after the file leak; the **24 Nov** trailer is the official confirmation.

## What was reportedly found (12 Nov files)

- Hidden **male skin** (now confirmed as **Scott Pilgrim**)
  - **Custom lobby pose** and a **LEGO** style
  - **Bass guitar** cosmetic (Scott plays bass)
  - **Comic/anime‑style shading**
  - An **emote** that uses a **sword prop** with **hearts** floating off it (echoing the “Power of Love” sword), with **Love**, **Energy**, and **Hilt** effects
  - A **back bling** with a matching **hilt effect**
- Hidden **female skin** (now confirmed as **Ramona Flowers**)
  - **Custom lobby pose** and **LEGO** style
  - **Goggles Off** style, plus **Blue** and **Teal** styles
  - Comes with **drums**, a **back bling**, and **two pickaxes**; the second pickaxe shows **star** and **speed‑line** effects

## Named cosmetics (in new cosmetics / files)

Outfits and matching gear already named in Fortnite’s cosmetics feed (added **24 November 2026**):

| Item | Type |
| --- | --- |
| **Scott Pilgrim** | Outfit |
| **Ramona Flowers** | Outfit |
| **The Power of Love** | Pickaxe |
| **Scott's Bass** | Pickaxe / back bling rows |
| **Large Hammer** | Pickaxe |
| **Titanium Baseball Bat** | Pickaxe |
| **Ramona's Drumsticks** | Pickaxe / back bling rows |
| **Power of Love Portal** | Back bling |
| **Scott's 1-UP!** | Back bling |
| **Subspace Suitcase** | Back bling |
| **Love's Level Up** | Emote |
| **Scott!** | Emoticon |

Trailer / showcase still support **LEGO** styles, Ramona **Goggles Off** / colour styles, and comic-style shading. Exact shop bundling waits on live tiles. **Prices** are **not announced**.

## Confidence table

| Claim | Status |
| --- | --- |
| Official Scott Pilgrim & Ramona Flowers outfits | **Confirmed** (Epic trailer, 24 Nov) |
| Shop: Epic “November 28” US = **00:00 UK 29 Nov** | **Official** dating (preview) |
| Named pickaxes / blings / Love's Level Up in cosmetics feed | **In files** |
| Scott Pilgrim Cup early unlocks | **Reported** (25 Nov Compete) |
| Exact V‑Buck price / leave timer | **Not announced** |

## FAQ

**When is Scott Pilgrim coming to Fortnite?**
**00:00 UK on 29 November 2026** (**7 PM ET on 28 Nov**), per Epic’s Item Shop preview. Confirm the in-game timer. Competitive players may unlock **Scott** early via the **25 Nov** Cup.

**Is the 8 PM ET on 29 Nov time still right?**
Treat that as an **older outlet clock**. Prefer Epic’s **“November 28”** US preview card → **29 Nov 00:00 UK**.

**How much will it cost?**
**Not announced.** Wait for the [Item Shop tracker](/tools/item-shop).

**Graphic novel or live-action?**
**Graphic novel** looks — confirmed in Epic’s trailer.

## What to watch next

- Live tiles at the **29 Nov 00:00 UK** reset: [Item Shop tracker](/tools/item-shop)
- Calendar: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)
- Same‑week: [DDLC 28 Nov UK](/leaks/doki-doki-literature-club-fortnite-leak) · [Puss shipped](/leaks/puss-in-boots-fortnite-collab-leak)

**Filed:** 12 November 2026. **Updated:** 27 November 2026. Status: **Watching**.
`,
  },
  {
    slug: 'puss-in-boots-fortnite-collab-leak',
    title:
      'Puss in Boots x Fortnite — Death Outfit & Puss Sidekick Now in the Item Shop',
    excerpt:
      'Shipped: Puss in Boots live since 00:00 UK 27 Nov 2026. Bundle 2,400 V-Bucks; Death+Sickles 1,500; Sidekick 1,500; Slippers 1,000; Sickles 500; Stalking Death 400; Bounty in Boots 300. Listed through 3 Dec 23:59 UTC.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-26',
    confirmedDate: '2026-11-27',
    readTime: 6,
    featured: true,
    image: '/images/guides/treasure-hunters.jpg',
    tags: [
      'puss in boots fortnite',
      'puss in boots fortnite leak',
      'death wolf fortnite',
      'fortnite sidekick',
      'puss in boots fortnite skin',
      'death fortnite outfit',
      'puss in boots fortnite 27 november',
      'puss in boots fortnite price',
      'puss in boots fortnite 2400',
      'death fortnite back bling',
    ],
    content: `
## Update — 27 November: shipped

**Puss in Boots x Fortnite is live.** Epic posted a **release promo on 26 November 2026** saying the collab was available that night, and the set hit the Item Shop at **00:00 UK on 27 November 2026** (**7 PM ET on 26 Nov**). Live shop data lists the set under a **Puss In Boots** tab through **3 December 2026, 23:59 UTC** (**6:59 PM ET**). Confirm leave timers on the [Item Shop tracker](/tools/item-shop).

Shop calendar: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks).

## Path to ship (file history)

**Death (Puss in Boots)** and the **Puss in Boots** Sidekick first appeared in Fortnite’s **new cosmetics** feed on **25 November 2026**. A **teaser trailer** and **in-game showcase** circulated the same day. The set was **not** in the **26 Nov 00:00 UK** rotation; it landed on the next reset (**27 Nov 00:00 UK**). Showcase detail that held: the **Puss Sidekick** has its **own emote** and **voice lines** (happy / angry moods among them), matching earlier file reports of lines in **12 languages**.

## Why Death is the outfit and Puss is the Sidekick

*Puss in Boots: The Last Wish* gives Fortnite two very different body types:

- **Death** — tall hooded wolf → fits a normal **Outfit** skeleton (fur, tail, hood, custom head)
- **Puss** — small bipedal cat → fits Fortnite’s **Sidekick** companion slot (follows you; not a playable skin)

Epic has used the same split before: **Spyro**, **Morgana** (Persona), and other licensed critters as Sidekicks while a humanoid lead takes the outfit row. So “Puss in Boots collab” here does **not** mean Puss is a wearable skin — **Death** is the locker outfit; **Puss** is the companion.

## What’s in the set

**Death outfit**
- The wolf **Death** look from *The Last Wish* (earlier file label: “Wolf Warrior”)
- Matching **back bling** (**Bounty in Boots**) and **pickaxe** (**Death's Sickles**)
- **Custom lobby pose** · **LEGO** style · **Hood** style
- **Glowing** head / body effects · custom non‑human head skeleton
- **Stalking Death** traversal emote (special version when used with Death)

**Puss Sidekick**
- Furry two‑legged companion (feather / beard materials)
- Matching **Puss in Slippers** kicks
- Styles: **Sword**, **Hat Off**
- Its **own emote**
- **Voice lines in 12 languages**, moods such as **happy** and **angry**

## Live prices (27 Nov shop)

From the live Item Shop feed. The **Puss in Boots Bundle** is **2,400 V-Bucks** (shop “regular” sum **4,700** if you bought the separate rows — about **2,300** saved on paper).

| Offer | Contents | V-Bucks |
| --- | --- | --- |
| **Puss in Boots Bundle** | Death + Sickles + Puss Sidekick + Slippers + Stalking Death + Bounty in Boots | **2,400** |
| **Death (Puss in Boots)** | Outfit **+ Death's Sickles** | **1,500** |
| **Puss in Boots** | Sidekick alone | **1,500** |
| **Puss in Slippers** | Kicks | **1,000** |
| **Death's Sickles** | Pickaxe alone | **500** |
| **Stalking Death** | Emote | **400** |
| **Bounty in Boots** | Back bling | **300** |

**Leaving (shop listing):** **3 December 2026, 23:59 UTC** — two days before the **[5 Dec](/leaks/fortnite-community-day-golden-umbrella)** chapter wrap / Community Day cluster. Timers can still change; trust the in-game leave clock.

**Pirate Shop Access note:** Access can cover a Sidekick you do not already own — it does **not** grant the Death outfit for free. Legitimate Access path: [Pirate Shop Access](/leaks/pirate-shop-access-feature) · [how-to](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

## Confidence table

| Claim | Status |
| --- | --- |
| Death / Puss in Item Shop | **Shipped** (27 Nov 00:00 UK) |
| Epic release promo (26 Nov) | **Official** |
| Bundle **2,400** · Death+Sickles **1,500** · Sidekick **1,500** | **Live** |
| Leaves **3 Dec 23:59 UTC** | **Live shop outDate** |
| Furry Sidekick + voice lines + Kicks | **Shipped** |

## Quick FAQ

**Is Puss in Boots a Fortnite skin?**
**Death** is the **outfit**. **Puss** is a **Sidekick** (companion), not a wearable skin.

**Is it in the shop yet?**
**Yes** — live since **00:00 UK on 27 November 2026**.

**How much does the bundle cost?**
**2,400 V-Bucks** for the full **Puss in Boots Bundle**. Death + Sickles is **1,500** alone; Sidekick is **1,500** alone.

**When does it leave?**
Shop listing shows **3 December 2026, 23:59 UTC** — confirm in-client.

**What is a Sidekick?**
A companion cosmetic that follows your character. It is not an outfit and does not replace your skin.

## Related

- Live tiles: [Item Shop tracker](/tools/item-shop) · calendar: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)
- Same-week collabs: [Scott Pilgrim](/leaks/scott-pilgrim-fortnite-collab-leak) · [Doki Doki Literature Club](/leaks/doki-doki-literature-club-fortnite-leak)

**Filed:** 12 November 2026. **Shipped:** 27 November 2026. Status: **Shipped**.
`,
  },
  {
    slug: 'doki-doki-literature-club-fortnite-leak',
    title:
      'Doki Doki Literature Club x Fortnite: Confirmed for 28 Nov (UK) Item Shop',
    excerpt:
      'Official: Epic’s weekly Item Shop preview (26 Nov 2026) showed Monika, Sayori, Yuri and Natsuki releasing “November 27” (US date) — that is 7 PM ET on 27 Nov / 00:00 UK on 28 Nov 2026. Outfits segment only; V-Bucks pricing and extras unannounced. In-game Monika look (27 Nov): “A really, really convincing Club President.”',
    category: 'cosmetics',
    status: 'watching',
    date: '2026-11-24',
    confirmedDate: '2026-11-26',
    readTime: 6,
    featured: true,
    image: '/images/guides/select-character.webp',
    tags: [
      'doki doki literature club fortnite',
      'doki doki fortnite',
      'ddlc fortnite',
      'ddlc fortnite confirmed',
      'anime skins fortnite',
      'cel shaded fortnite skins',
      'sayori natsuki yuri monika fortnite',
      'ddlc fortnite release date',
      'monika fortnite skin',
      'ddlc fortnite 28 november',
    ],
    content: `
## Update — 27 November: official shop date (28 Nov UK)

**Doki Doki Literature Club x Fortnite is officially confirmed.** Epic’s **weekly Item Shop preview** video — posted on Fortnite’s official social channels on **26 November 2026** — showed the **Doki Doki Literature Club** outfits **Monika**, **Sayori**, **Yuri**, and **Natsuki** releasing on **“November 27”** (Epic’s **US** shop date).

Timezone read (same rule as other Epic preview cards): an item Epic dates **November 27** lands at **7 PM ET on 27 November** = **00:00 UK on 28 November 2026**. The collab was **not** in the **00:00 UK on 27 November** shop — that earlier leak clock was wrong.

In the preview, the DDLC segment is labelled **“Outfits”**, while some other collabs in the same video were labelled **“Bundle”**. **V-Bucks pricing** and any **extra items** (back blings, pickaxes, emotes) are **not announced**.

On **27 November 2026**, a new **in-game look** at **Monika** also surfaced, with her description line: **“A really, really convincing Club President.”**

Status is **watching** (officially confirmed, awaiting the **28 Nov 00:00 UK** reset). Confirm on the [Item Shop tracker](/tools/item-shop).

## What’s confirmed (roster)

The preview names the four club members as outfits:

| Outfit | Role in DDLC | Fortnite note |
| --- | --- | --- |
| **Monika** | Club president | Official preview + in-game description (27 Nov) |
| **Sayori** | Club member | Official preview |
| **Natsuki** | Club member | Official preview |
| **Yuri** | Club member | Official preview |

No Sidekick, jam track, or Festival kit was shown in the preview segment summarised here. Compare fuller kits like [Persona 5 Royal](/leaks/fortnite-crash-spyro-persona-5-royal-return-dates) or [Scott Pilgrim](/leaks/scott-pilgrim-fortnite-collab-leak).

## File history (how we got here)

Earlier leaks on **24 November 2026** first pinned the collab to **Sayori**, **Natsuki**, **Yuri**, and **Monika**. A **26 Nov** leak had pointed at the **27 Nov 00:00 UK** shop — that window **did not** include DDLC. Epic’s preview then locked the **US “November 27”** card, which maps to **00:00 UK on 28 Nov**.

Pre-name dataminer notes (12 Nov) described **4 anime / cel‑shaded** female skins with custom lobby poses, cloth / hair physics on some rows, and sell-through as a pack plus individuals. Those file notes are historical context; the **official** confirmation is the **26 Nov** shop preview.

## Why this collab matters in Fortnite

**Doki Doki Literature Club** (Team Salvato) is a visual novel whose cast is almost entirely the four club members above. Shipping **all four leads as outfits** is the full main cast — unusual for anime/game crossovers that often drop one hero skin and a thin accessory pack.

Treasure Hunters has already leaned hard into **anime / cel-shaded** locker rows (Hope bonus skins, Golden Charlotte, Persona returns, etc.). DDLC fits that lane.

## Pricing & extras — still open

- The preview labels DDLC as **“Outfits”**, not **“Bundle”** — that may mean outfits-only sell-through, but Epic has not published a price card
- **V-Bucks pricing** is **unannounced**
- Extra cosmetics (back blings, pickaxes, emotes) are **not announced** — do not invent them
- Wait for live tiles on the [Item Shop tracker](/tools/item-shop)

## Timing against the chapter calendar

DDLC lands **00:00 UK on 28 November 2026** — still **before** Treasure Hunters wraps on **[5 December](/leaks/fortnite-community-day-golden-umbrella)**, ahead of [Chapter 8 Season 1](/leaks/fortnite-chapter-8-season-2-release-date), [Crew changes / N.E.K.O.](/leaks/fortnite-crew-changes-december-2026-neko-final-crew-skin), and Community Day login rewards.

Same-week collab pages:

- [Scott Pilgrim / Ramona](/leaks/scott-pilgrim-fortnite-collab-leak) — **official trailer**; shop dated **29 Nov**
- [Puss in Boots / Death](/leaks/puss-in-boots-fortnite-collab-leak) — **shipped** **27 Nov 00:00 UK**
- Shop calendar: [Upcoming Item Shop leaks](/leaks/upcoming-item-shop-leaks)

## Confidence

| Claim | Status |
| --- | --- |
| Monika, Sayori, Yuri, Natsuki outfits | **Official** (Epic Item Shop preview, 26 Nov) |
| Shop: Epic “November 27” US = **00:00 UK 28 Nov** | **Official** dating |
| Not in **27 Nov 00:00 UK** shop | **Confirmed** (missed that reset) |
| Preview segment labelled **“Outfits”** | **Official** preview |
| V-Bucks price / extra cosmetics | **Not announced** |
| Monika description line (27 Nov) | **In-game** look |

## Quick FAQ

**Is Doki Doki Literature Club coming to Fortnite?**
**Yes — officially.** Epic’s weekly Item Shop preview showed the four outfits.

**Which DDLC characters are in the set?**
**Monika, Sayori, Yuri, and Natsuki.**

**When does it release?**
Epic’s card says **“November 27”** (US) → **7 PM ET on 27 Nov** = **00:00 UK on 28 November 2026**. It was **not** in the **27 Nov 00:00 UK** shop.

**Will there be pickaxes or back blings?**
**Not announced.** The preview labelled the segment **“Outfits”**; extras and V-Bucks prices are unknown until tiles appear.

**Is the price known?**
**No.** Wait for the [Item Shop tracker](/tools/item-shop).

## What to watch next

1. Live shop tiles at the **28 Nov 00:00 UK** reset on the [Item Shop tracker](/tools/item-shop)
2. Whether Epic adds late tools / emotes beyond the four outfits
3. [News](/news) for any further official wording

**Filed:** 12 November 2026. **Updated:** 27 November 2026. Status: **Watching** (confirmed, awaiting shop).
`,
  },
  {
    slug: 'fortnite-winterfest-2026-dates',
    title: 'Fortnite Winterfest 2026 Dates Leak (Dec 17–Jan 7) + Seasonal Locker Filter',
    excerpt:
      'According to leaks, Winterfest 2026 runs 17 Dec 2026 to 7 Jan 2027. A present list also leaked: 2 outfits, 2 collab pickaxes + 2 matching back blings, 1 contrail, 1 emoji, 3 sprays. Files reference a “Seasonal Locker Filter” with winterfest/christmas tags. Not announced; rewards could still change.',
    category: 'season',
    status: 'active',
    date: '2026-11-12',
    readTime: 4,
    featured: true,
    image: '/images/guides/cold-welcome.webp',
    tags: [
      'fortnite winterfest 2026 dates',
      'fortnite winterfest 2026 presents',
      'winterfest 2026 rewards',
      'winterfest start date',
      'seasonal locker filter',
      'fortnite christmas event 2026',
      'fortnite winter event dates',
    ],
    content: `
## Dates (leaked)

Reports say **Winterfest 2026** runs **17 December 2026 → 7 January 2027**. This window would fall **inside Chapter 8 Season 1** (which is slated to start **5 December 2026** per the [Chapter 8 dates page](/leaks/fortnite-chapter-8-season-2-release-date)).

## Winterfest 2026 presents (leaked)

According to **leaks on 14 Nov 2026**, the **planned Winterfest 2026 presents** are:
- **2 outfits**
- **2 pickaxes** from a **collaboration**
- **2 back blings** that match those collab pickaxes
- **1 contrail**
- **1 emoji**
- **3 sprays**

More presents are likely (for example an **emote** and **glider**), and rewards could still **change before release** — this is what is currently planned. The **collab partner** and the **item names** are **not known**.

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

**Filed:** 12 November 2026. **Updated:** 15 November 2026. Status: **Unconfirmed**.
`,
  },
  {
    slug: 'fortnite-pirate-chest-prizes-week-3-4',
    title:
      'Pirate Chest Prizes Week 4 Live — Solid Gold Kasane Teto, Gold Blades & Urus SE (Week 3 Gold Miku)',
    excerpt:
      'Week 4 Pirate Chest Prizes went live ~2pm UK (9am ET) Sun 22 Nov: Solid Gold Kasane Teto, Solid Gold High Tide and Wavecut blades, Oscar’s Wraps loading screen, and Lamborghini Urus SE. Week 3 (15 Nov) still covers Solid Gold Hatsune Miku, Takarabako, PPPP, May Fortune Find You, and the Gold Corvette ZR1.',
    category: 'cosmetics',
    status: 'shipped',
    date: '2026-11-12',
    confirmedDate: '2026-11-22',
    readTime: 5,
    image: '/images/guides/capn-hatsune-miku-hero.webp',
    tags: [
      'fortnite pirate chest prizes week 3',
      'fortnite pirate chest prizes week 4',
      'fortnite chest prizes week 4',
      'solid gold hatsune miku',
      'solid gold kasane teto',
      'solid gold kasane teto fortnite',
      'gold teto fortnite how to get',
      'solid gold miku fortnite',
      'solid gold high tide and wavecut',
      'oscars wraps loading screen',
      'pppp jam track fortnite',
      'fortnite week 3 treasure prizes',
      'pirate shop token effects',
    ],
    content: `
## Week 4 Treasure Prizes — live 22 Nov

Went live around **2:00 PM UK** (**9:00 AM ET**) on **Sunday 22 November 2026**. Epic also released a **Treasure Hunters Week 4** trailer that afternoon.

Official Week 4 prize art shows four rewards:
- **Solid Gold Kasane Teto** outfit — flavour text: "Your favorite chimera, all in gold!"
- **Solid Gold High Tide and Wavecut** — a pair of gold blades; flavour text: "Treasured blades made even more desirable."
- **Oscar's Wraps** loading screen — a free Oscar loading screen ("Geno's personal privateer", art by Golden Wolf), arriving the same day as Oscar's Captain's Day weekend
- **Lamborghini Urus SE** car

Earlier leaks had also listed **Rogue Wave** and **Tidewalker** back blings and a **"Sea Shanty"** Jam Track for Week 4. Those items are **not** shown in the official Week 4 prize art, so treat them as **unconfirmed / not shown** rather than confirmed prizes.

Odds and how chest rolls work: [Pirate Shop odds](/leaks/pirate-shop-odds). Captain weekend context: [Captain’s Days](/leaks/captain-days-content-stack).

## Week 3 Treasure Prizes — live 15 Nov 2026

Went live around **2:00 PM UK** (**9:00 AM ET**) on **Sunday 15 November 2026**.

Prizes in the Week 3 pool:
- **Solid Gold Hatsune Miku** outfit
- **Miku's Takarabako** back bling
- **PPPP** Jam Track ("TAK - PPPP ft. Hatsune Miku and Kasane Teto") — a brand‑new Jam Track obtainable **free** through Treasure Prizes
- **May Fortune Find You** loading screen
- **Gold Chevrolet Corvette ZR1** car

Also that afternoon:
- **Mini Hatsune Miku** Sprite and the **Leekcapper** item went live around **2pm UK** (Leekcapper was bugged for roughly two hours and became properly available about **4:20pm UK**)
- A new Sprite named **"Zee"** went live around **2:15pm UK**

## Rotation dates

Weekly Treasure / Pirate Chest Prizes rotate at **2:00 PM UK** (**9:00 AM ET**) on Sundays.

| Week | Live from | Status |
| --- | --- | --- |
| **Week 3** | **15 November 2026** | Shipped |
| **Week 4** | **22 November 2026** | Shipped |

## Visual effects update (12 Nov)

In‑game change noted on **12 Nov**: **chest prize drop effects now differ** — a **Pirate Shop Token** prize keeps the **gold** effect, while the **weekly skin prize** now shows a **silver** effect.

## Context and links

- Friendship Villa / Teto‑Miku weekend: [Kasane Teto Music Pass & Friendship Villa](/leaks/kasane-teto-fortnite-music-pass-friendship-villa)
- Previous gold swap: [Gold Lil’ Uzi Vert Jr.](/leaks/gold-lil-uzi-vert-sprite)
- Odds: [Pirate Shop odds](/leaks/pirate-shop-odds)
- Treasure Hours context (Week 3 Gold Miku boost windows): [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours)

## Quick FAQ

**How do you get Solid Gold Kasane Teto?**
It is a **chance‑based prize** from Pirate / Treasure Chests during **Week 4**. See the [Pirate Shop odds](/leaks/pirate-shop-odds) page for how chest rolls work.

**Is Solid Gold Kasane Teto free?**
Yes in the sense that it is **earned in‑game** from chests — it is **not** sold as an Item Shop offer.

**When did Week 4 go live?**
Around **2:00 PM UK** (**9:00 AM ET**) on **Sunday 22 November 2026**.

**Are Rogue Wave, Tidewalker, and Sea Shanty confirmed?**
**No.** Earlier leaks listed them for Week 4, but they do **not** appear in the official Week 4 prize art.

**Filed:** 12 November 2026. **Updated:** 22 November 2026. Status: **Shipped** (Week 3 and Week 4 both live).
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

## 15 Nov takeover went live

On **15 November 2026** the **Hatsune Miku & Kasane Teto** takeover **went live** — Epic released an **arrival trailer** and **artwork** at **2:00 PM UK**. The new **PPPP** Jam Track featuring both is a **free Treasure Prize** — see [chest prizes](/leaks/fortnite-pirate-chest-prizes-week-3-4).

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

**Filed:** 11 November 2026. **Updated / confirmed:** 12 November 2026. **Updated:** 15 November 2026. Status: **Shipped** (Friendship Villa arrived 15 Nov).
`,
  },
  {
    slug: 'fortnite-chapter-8-season-2-release-date',
    title: 'Fortnite Chapter 8 Season 1 & Season 2 Release Dates (Dec 5 & Mar 4)',
    excerpt:
      'Chapter 8 Season 1 still dated 5 Dec 2026; Season 2 still 4 Mar 2027 (~89 days) per scheduling leaks. v43.11 (24 Nov) was the final Chapter 7 update for the end event / Community Day. Same crowded 5 Dec: Crew overhaul, N.E.K.O., Community Day rewards. Art-direction chatter points at a Chapter 4–like stylised look — unconfirmed.',
    category: 'chapter',
    status: 'watching',
    date: '2026-11-25',
    readTime: 5,
    featured: true,
    image: '/images/guides/hit-by-chaos.webp',
    tags: [
      'fortnite chapter 8 release date',
      'fortnite chapter 8 season 1 release date',
      'fortnite chapter 8 season 2 release date',
      'when does chapter 8 start fortnite',
      'fortnite c8s2',
      'fortnite chapter 8 graphics',
      'fortnite chapter 7 end date',
      'treasure hunters end date',
    ],
    content: `
## Date summary

| Milestone | Date | Confidence |
| --- | --- | --- |
| **Chapter 8 Season 1** | **5 December 2026** | Scheduling leak (10 Nov) — still holding through late-Nov updates |
| **Chapter 8 Season 2** | **4 March 2027** | Same scheduling leak (~**89 days** for C8S1) |
| Final Chapter 7 patch (**v43.11**) | **24 November 2026**, **9 AM UTC** / **4 AM ET** | Shipped |
| Treasure Hunters / Community Day wrap day | **5 December 2026** | Epic-confirmed Community Day date |

These season start dates are described as coming from **Epic’s internal scheduling**, not a public fortnite.com blog timestamp. They can still move.

## Update — 25 November

**5 December 2026** is also when Epic’s official **[Fortnite Crew changes](/leaks/fortnite-crew-changes-december-2026-neko-final-crew-skin)** land — tiered monthly V‑Bucks (1,000–1,600), **OG Pass ends**, XP boosts, and **N.E.K.O.** as the **final Crew Pack outfit**.

If you care about Crew tenure tiers, Epic’s resubscribe credit window for past tenure is **6–31 December 2026** — details on the Crew page.

## Update — 24 November: last Chapter 7 patch

**v43.11**, the **final update of Chapter 7**, rolled out on **24 November 2026 at 9 AM UTC** (**4 AM ET**). It is aimed at the **end event** and **[Community Day](/leaks/fortnite-community-day-golden-umbrella)**, plus **bug fixes**. **No new cosmetics** are expected from this patch itself — shop collabs that week (Scott Pilgrim trailer, Puss / DDLC leak chatter) are separate Item Shop tracks.

**Chapter 8 Season 1** remains slated for **5 December 2026** after that patch.

## What was reported (10 Nov)

According to leaks on **10 November 2026**:

- **Chapter 8 Season 1** → **5 December 2026**
- **Chapter 8 Season 2** → **4 March 2027**

That spacing is roughly **89 days** for Season 1 — a normal-length Fortnite season, not a mini. Treasure Hunters (the late Chapter 7 stretch) is the runway into that launch, not a replacement for it.

## Crowded calendar: 28 Nov → 5 Dec

Plan V-Bucks, logins, and Crew around the same week — these are **different systems** landing on overlapping days:

| When | What | Page |
| --- | --- | --- |
| **28 Nov 9 AM ET** | **[Golden Week](/leaks/fortnite-golden-week-november-2026)** starts — all gold chest goods back, 2× Sprite Dust/XP, 15× Gold Outfits in Treasure Hours | Gameplay |
| **5 Dec** | **[Community Day](/leaks/fortnite-community-day-golden-umbrella)** — Golden Community ’Brella (login) + Golden Jonesy (Twitch Drops) | Cosmetics |
| **5 Dec** | **Chapter 8 Season 1** (leaked start) + expected chapter transition / downtime | This page |
| **5 Dec** | **[Crew overhaul](/leaks/fortnite-crew-changes-december-2026-neko-final-crew-skin)** + Battle Pass / LEGO Mini-Pass cadence Epic called out | Crew |

Exact maintenance / live-event minutes for the chapter flip are **not** in the scheduling leak. Watch in-client timers and [News](/news) / [Status](/status) closer to the day.

## What this means for players

1. **Finish Treasure Hunters goals** (Pirate Shop Access, Hope bonus skins, gold chests) before the **5 Dec** Access / promo deadlines where they apply — see [Hope bonus skins](/leaks/fortnite-treasure-hunter-hope-gilded-hunter-hope-bonus-skins).
2. **Log in on Community Day** even if you are mostly waiting for Chapter 8 cosmetics — the Golden ’Brella is a login reward, not a shop tile.
3. **Do not assume** Chapter 8 Battle Pass contents from C7 themes. Theme, POIs, and pass rows are still unconfirmed.
4. Season context hub: [/season](/season). Early Chapter 8 systems chatter: [finishing moves](/leaks/chapter-8-finishing-moves).

## What will Chapter 8 look like?

According to a report on **23 November 2026**, Chapter 8’s visuals are expected to look **closer to Chapter 4’s art style**, and **more stylised than Chapter 7**. That is a **report**, not an Epic confirmation.

Chapter 4 was the first chapter to launch on **Unreal Engine 5.1** with Nanite/Lumen‑era visuals (December 2022). The comparison here is about overall look and stylisation, not a “Nanite checklist” or a promise that C8 copies C4 POIs.

Epic has **not** shown Chapter 8 concept art or a season trailer yet. Treat the Chapter 4 comparison as unconfirmed until Epic posts visuals.

## What is not confirmed

- Exact launch hour or downtime / queue window on 5 Dec
- Live-event script or end-of-chapter show length
- Chapter 8 theme, map, mythics, or Battle Pass contents
- Official art direction / POI names
- Whether the **5 Dec / 4 Mar** dates move

## Quick FAQ

**When does Fortnite Chapter 8 start?**
**5 December 2026** for **Season 1**, according to the scheduling leak that has held through late November updates.

**When is Chapter 8 Season 2?**
**4 March 2027** in the same leak (~**89 days** after Season 1).

**Is v43.11 the Chapter 8 update?**
**No** — **v43.11** is the **final Chapter 7** patch (24 Nov) for the end event / Community Day prep. Chapter 8 is the **5 Dec** transition.

**Is the Chapter 8 date official?**
**Not via a public “Chapter 8 launches at…” blog line** in the sources we are tracking — it is a **scheduling leak**, while Community Day / Crew / Golden Week pieces on the same calendar **are** Epic-confirmed.

**Will Chapter 8 look like Chapter 4?**
Only a **report** says a more stylised, Chapter 4–like direction. Wait for Epic art.

**Filed:** 10 November 2026. **Updated:** 26 November 2026. Status: **Watching**.
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

Related: [Pirate Shop Access cheaters banned — Access and items removed](/leaks/fortnite-pirate-shop-access-cheaters-banned-items-removed) (Fortnite Status, 25 Nov).

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
    image: '/images/guides/lil-uzi-vert-featured.webp',
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
      'Upcoming Fortnite Item Shop Leaks — 27 Nov Puss Live, DDLC 28 Nov, Scott 29 Nov',
    excerpt:
      '27 Nov 00:00 UK shop: Puss in Boots collab live (2,400 V-Bucks bundle), 10 Chapter 7 Highlights shop tabs, winter-themed and original (default-era) outfits returned. Coming: DDLC officially 28 Nov 00:00 UK, Scott Pilgrim 28 Nov US = 00:00 UK 29 Nov, Ember & Blade 1 Dec.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-27',
    readTime: 5,
    featured: true,
    image: '/images/guides/kiriko-featured.webp',
    tags: [
      'fortnite item shop leaks',
      'fortnite item shop november 27',
      'fortnite item shop november 26',
      'fortnite item shop november 25',
      'fortnite item shop november 22',
      'fortnite item shop november 23',
      'puss in boots fortnite shop',
      'chapter 7 highlights fortnite',
      'kizuna ai fortnite',
      'john cena fortnite',
      'nfl fortnite touchdown time',
      'becky lynch fortnite',
      'bianca belair fortnite',
      'pomni fortnite',
      'jax fortnite',
      'amazing digital circus fortnite',
      'persona 5 fortnite',
      'addison rae fortnite',
      'thegrefg fortnite',
      'mrsavage fortnite',
      'she did it again fortnite',
      'tyla zara larsson fortnite',
      'phineas and ferb fortnite return',
      'privateer oscar fortnite bundle',
      'crash bandicoot fortnite',
      'mainframe break pack discount',
    ],
    content: `
## Update — 27 November

### 27 November shop (00:00 UK)

Live Item Shop for the **27 November 2026** reset (**00:00 UK** / **7 PM ET on 26 Nov**):

- **[Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)** collab arrived — **Puss in Boots Bundle 2,400** V-Bucks (Death+Sickles **1,500**, Sidekick **1,500**, Slippers **1,000**, Sickles alone **500**, Stalking Death **400**, Bounty in Boots **300**); listed through **3 Dec 23:59 UTC**
- **10 “Chapter 7 Highlights”** shop tabs were added
- **Winter-themed** outfits returned
- **Original (default-era)** outfits returned

Confirm every tile and price on the [Item Shop tracker](/tools/item-shop).

### Coming soon

- **[Doki Doki Literature Club](/leaks/doki-doki-literature-club-fortnite-leak)** — **officially** **28 November 2026** at **00:00 UK** (Epic preview “November 27” US date = **7 PM ET on 27 Nov**) — Monika, Sayori, Yuri, Natsuki
- **[Scott Pilgrim](/leaks/scott-pilgrim-fortnite-collab-leak)** — officially dated by Epic as **28 Nov** US = **00:00 UK on 29 Nov** (Scott & Ramona)
- **Ember & Blade x Fortnite** — **1 December**: EGS gift‑with‑purchase **or** **1,500 V-Bucks** in the Item Shop
- **[Hello Neighbor](/leaks/hello-neighbor-fortnite-collab)** — officially teased **coming soon** (EGS + Theodore); no shop day yet

## 26 November shop

### 26 November shop (00:00 UK)

Live Item Shop for the **26 November 2026** reset (**00:00 UK** / **7 PM ET on 25 Nov**):

- **Kizuna AI** returned — first time in about **126 days**
- **NFL “Touchdown Time”** items returned — gone between roughly **289** and **1,085 days** depending on the item
- **WWE**: **John Cena** returned (about **449 days**); **Becky Lynch** & **Bianca Belair** returned (about **478 days**)
- Carry-overs still up: **Pomni** & **Jax** (Amazing Digital Circus), **Persona 5 Royal**, **Crash Bandicoot & Spyro**, **Addison Rae**
- **[Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)** — **not** in this rotation; landed the next reset (**27 Nov 00:00 UK**)

### Store discount text (hotfix)

Epic hotfixed in new store copy: **“Discount for new and select returning players; full price applies to all others.”** It is currently only used on the **Mainframe Break Pack**, which is **50% off ($4.49)** for new and some returning players.

## 25 November shop

Item Shop for the **25 November 2026** reset (**00:00 UK** / **7 PM ET on 24 Nov**):

- **Pomni** & **Jax** from **The Amazing Digital Circus** return
- **ICON Series emotes** refresh
- **Persona 5 Royal** returns — [return dates page](/leaks/fortnite-crash-spyro-persona-5-royal-return-dates)
- **Addison Rae** returns
- **Hoppers** return
- **TheGrefg** & **MrSavage** Icon Series items return
- **Tyla** & **Zara Larsson** — **"She Did It Again"** emote (new Icon Series dance, **500** V‑Bucks)

## 24 November shop

Item Shop for the **24 November 2026** reset (**00:00 UK** / **7 PM ET on 23 Nov**):

- **Lucien West** returns
- **One Punch Man** returns
- **Ferrari** skins and cars return

## 23 November shop

Leaked Item Shop for the **23 November 2026** reset (**00:00 UK** / **7pm ET on 22 Nov**). Confirm every tile and price on the [Item Shop tracker](/tools/item-shop) — prices below are **not** known from the leak grid alone.

- **Phineas and Ferb collab returns** — leaked grid includes **Buff Perry** and **Dr. Doofenshmirtz** outfits, **Perry the Inaction Figure**, and the **Doof's High Kicks** emote
- **Pirates of the Caribbean returns** — Jack Sparrow‑themed items including **Jack's Ship**, **Jack's Compass**, **Jack's Prize**, **Jack Sparrow's Sword**, **Jack's Cutlass and Bane**, and **Skull and Crossed Swords**
- **Harvest Season** (autumn) set — including **Baba Yaga**, **The Autumn Queen**, **Cobb**, **Hayseed**, **Sunflower**, and **Haystacks** outfits, plus **Oakworn Wings**, **Wand of Oak**, **Bark Basher**, **Rootcarver**, and a **Pumpkin Season** wrap
- **Nemia** and **Lexa Hexbringer** returned in the same reset
- **Cardamom** Sidekick — a white ferret/stoat‑like pet — went on sale for the **first time** with this reset

## 22 November shop

Leaked Item Shop for the **22 November 2026** reset (**00:00 UK** / **7pm ET on 21 Nov**). Confirm on the [Item Shop tracker](/tools/item-shop).

- **New Privateer Oscar bundle** — pirate Oscar outfit (white‑tiger captain look) with a matching set. Items in the leaked shop grid around it include **Privateer's Pistols**, **Brawler's Bounty Blades**, and the **Hunter of the Seas** wrap, plus an emote and a banner/icon in the bundle art. Lands alongside Oscar's Captain's Day weekend. Prices not known.
- **Overwatch Wave 1 return** — **D.Va**, **Genji**, **Mercy**, **Tracer**, with items such as Mercy's Valkyrie Wings, Tracer's Pulse Bomb, Tracer's Pulse Knives, Caduceus Pickaxe, Ryū Ichimonji, Tokki's Slicer, Travel Tokki Model, Mark of Mercy wrap, and the Blinkin' Amazing and Mercy's Reach emotes
- **Crash Bandicoot & Spyro return** — Crash Bandicoot outfit, Spyro the Dragon, Aku Aku, Crash's Wumpa Mace, Bandicoot wrap, Crash's Victory emote
- **Gorillaz return** — 2D, Murdoc, Noodle, and Russel outfits, with 2D's Megaphone, 2D's Mic, Noodle's Case, Noodle's Axe, Murdoc's Bass, One‑Eyed Octopus, Gorillaz Camo wrap
- **ICON Series: Lachlan** and **Rubius** outfits

Crash/Spyro, Privateer Oscar, and Overwatch Wave 1 — which earlier reports pointed at **21 Nov** and which missed that reset — landed **one day later** on **22 Nov** according to the leaked shop. Full date context: [Crash, Spyro & Persona 5 return dates](/leaks/fortnite-crash-spyro-persona-5-royal-return-dates).

## 21 November shop

Confirm every tile on the [Item Shop tracker](/tools/item-shop).

- **Kiriko & Widowmaker** debuted with this reset (**21 Nov 00:00 UK** / **7 PM ET on 20 Nov**) — [prices](/leaks/fortnite-overwatch-wave-2-kiriko-widowmaker)
- **Ice Spice** returned — items include **Rap Princess Ice Spice** (**1,500**), **Ice Spice Mini** (**300**), **In Ha Mood** (**500**), **Iced Out Mic** (**800**)
- **ICON emotes refresh** — multiple music emotes rotated in
- **"Shake It"** emote (**500**) — Metro Station
- **Perfect Night** (LE SSERAFIM) Jam Track — **500**
- **The Kid LAROI** still up from the **20 Nov** return
- **Jurassic Jeep® Wrangler** car body still up — [page](/leaks/jurassic-park-jeep-wrangler-fortnite)
- **Crash / Spyro / Privateer Oscar** — **not** in this reset (landed **22 Nov** instead)

Season beat: **Friendship Villa** (Miku + Teto) — [Kasane Teto page](/leaks/kasane-teto-fortnite-music-pass-friendship-villa).

## Watch list

| Date | What was flagged | Status |
| --- | --- | --- |
| **21 Nov (shop)** | Crash & Spyro · Privateer Oscar · Wave 1 BR return | **Missed 21 Nov** — landed **22 Nov** · [context](/leaks/fortnite-crash-spyro-persona-5-royal-return-dates) |
| **22 Nov (shop)** | Privateer Oscar bundle · Wave 1 · Crash & Spyro · Gorillaz · Lachlan & Rubius | **Landed 22 Nov** (leaked shop) |
| **23 Nov (shop)** | Phineas & Ferb · PotC · Harvest Season · Nemia/Lexa · **Cardamom** Sidekick | **Landed 23 Nov** (leaked shop) |
| **24 Nov (shop)** | **Lucien West** · **One Punch Man** · **Ferrari** skins & cars | **Landed 24 Nov** |
| **25 Nov (shop)** | Digital Circus · Persona 5 Royal · Addison Rae · Hoppers · TheGrefg & MrSavage · **She Did It Again** | **Landed 25 Nov** |
| **26 Nov (00:00 UK shop)** | Kizuna AI · NFL Touchdown Time · John Cena · Becky Lynch & Bianca Belair · carry-overs | **Landed** — **Puss not in this shop** |
| **27 Nov (00:00 UK)** | **Puss in Boots** · Chapter 7 Highlights tabs · winter + original outfits | **Landed** · [Puss page](/leaks/puss-in-boots-fortnite-collab-leak) |
| **28 Nov (00:00 UK)** | **DDLC** four outfits | **Official** · [page](/leaks/doki-doki-literature-club-fortnite-leak) |
| **29 Nov (00:00 UK)** | **Scott Pilgrim** / Ramona (Epic **28 Nov** US date) | **Official** dating · [page](/leaks/scott-pilgrim-fortnite-collab-leak) |
| **TBD** | **Hello Neighbor** / Theodore | Official tease · [page](/leaks/hello-neighbor-fortnite-collab) |
| **1 Dec** | **Ember & Blade** collab outfit | EGS GWP or **1,500** V-Bucks |

## Already shipped (recent)

- **27 Nov (00:00 UK):** **[Puss in Boots](/leaks/puss-in-boots-fortnite-collab-leak)** (**2,400** V-Bucks bundle) · **10 Chapter 7 Highlights** shop tabs · winter-themed + original (default-era) outfits
- **26 Nov (00:00 UK):** Kizuna AI · NFL Touchdown Time · John Cena · Becky Lynch & Bianca Belair · carry-overs (Digital Circus · Persona · Crash/Spyro · Addison) · Mainframe Break Pack discount text live
- **25 Nov:** Pomni & Jax (Digital Circus) · Persona 5 Royal · Addison Rae · Hoppers · TheGrefg & MrSavage · **She Did It Again** emote · ICON emotes refresh · **Death/Puss added to new cosmetics**
- **24 Nov:** Lucien West · One Punch Man · Ferrari skins & cars
- **23 Nov:** Phineas & Ferb · Pirates of the Caribbean · Harvest Season · Nemia & Lexa Hexbringer · **Cardamom** Sidekick (new)
- **22 Nov:** Privateer Oscar bundle · Overwatch Wave 1 · Crash & Spyro · Gorillaz · ICON Lachlan & Rubius
- **21 Nov:** **Kiriko & Widowmaker** (Overwatch Wave 2) · **Ice Spice** returned · ICON emotes refresh · Metro Station **"Shake It"** emote
- **20 Nov:** **The Kid LAROI** return · Kim Kardashian / Cowboy Bebop / Sidekick Squad / StW packs (same window)
- **19 Nov:** **Regular Show** · ICON emotes · Lazarbeam & CourageJD
- **18 Nov:** **Naruto**, **Bruno Mars**, **Jurassic Jeep Wrangler**
- **17 Nov:** **Kaiju No. 8** / **The Odyssey** / **Madison Beer** · Summer High Stakes
- **15 Nov:** **Cap’n Hatsune Miku**
- **12 Nov:** **Kasane Teto** Music Pass + **Lil Uzi Vert** Icon sets

## How to use this

Watch order only — confirm after reset (**~00:00 UK** / Epic’s **7 PM ET** collab drops). Prices: [Item Shop tracker](/tools/item-shop). Season: [Treasure Hunters guide](/guides/season/fortnite-treasure-hunters) · [Captain’s Days](/leaks/captain-days-content-stack).

**Updated:** 27 November 2026.
`,
  },
  {
    slug: 'usopp-slingshot-nerf',
    title: 'Usopp’s Slingshot Nerfed Again — 16 Nov Hotfix Stats (Plus Devil Fruit Buffs)',
    excerpt:
      'Second nerf on 16 Nov: Slingshot body 75–90 → 68–83, headshot ~131–190 → ~129–188, full charge now 1.0s (was 0.7s), charge time 1.05s (was 0.75s). Flame‑Flame and Gum‑Gum were buffed; exotic drop chances increased. Full tables below (7 Nov first nerf retained).',
    category: 'gameplay',
    status: 'shipped',
    date: '2026-11-07',
    confirmedDate: '2026-11-16',
    readTime: 3,
    image: '/images/guides/usopp-slingshot-featured.webp',
    tags: [
      'usopp slingshot nerf',
      'fortnite treasure hunters balance',
      'fortnite weapon nerf',
      'usopp slingshot nerf again',
      'fortnite hotfix 16 november',
      'flame flame fruit buff',
      'gum gum fruit buff',
      'fortnite exotic drop chance',
    ],
    content: `
## Second nerf — 16 Nov 2026 hotfix

### Usopp’s Slingshot

| Stat | Before | After |
| --- | --- | --- |
| Body damage (Uncommon–Mythic) | 75–90 | **68–83** |
| Headshot (approx., Uncommon–Mythic) | ~131–190 | **~129–188** |
| Full charge time | 0.7s | **1.0s** |
| Charge time | 0.75s | **1.05s** |

### Flame‑Flame Fruit (buffs)

| Change | Before | After |
| --- | --- | --- |
| Damage (per hit, tiered) | 9–15 | **12–16** |
| Damage falloff range | 75m | **150m** |
| Fire Fist building damage | 95 | **105** |

### Gum‑Gum Fruit (buffs)

| Change | Before | After |
| --- | --- | --- |
| Uncharged damage | 50 | **60** |
| Uncharged building damage | 50 | **60** |
| Air attack (uncharged) building damage | 100 | **125** |

### Exotic drop chances (increased)

- Any **Exotic** from chests and rare chests: **+100%**
- **Super Flint‑Knock Pistol**: **+150%**
- **A$AP Rocky’s Shock Rocket**: **+150%**
- **Lil Uzi Vert’s Lil’ SMG**: **+2–7%** (see one early gameplay page: [Lil Uzi Vert SMG gameplay](/leaks/lil-uzi-vert-smg-gameplay))

—

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
    title:
      'Fortnite Treasure Hours: 28 Nov Golden Week Odds (15× Outfits) & Past Windows',
    excerpt:
      'Next: Golden Week Treasure Hours on 28 Nov with 15× Gold Outfits (Epic). Past: two Treasure Hours on Sat 21 Nov — 2–4pm ET (7–9pm UK) and 9–11pm ET (2–4am UK Sun) at 1.5× Token / 7.5× Gold. Full Golden Week rundown on the Golden Week page.',
    category: 'shop',
    status: 'watching',
    date: '2026-11-24',
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
      'treasure hours november 21',
      'fortnite token boost times',
      'solid gold hatsune miku boost',
      'pirate shop token boost',
    ],
    content: `
## Update — 24 November

**Golden Week Treasure Hours on 28 November** boost **Gold Outfits to 15×** (vs the usual Treasure Hours **7.5×**), with **Vehicles & Decals at 10×** and **Pirate Shop Access at 1.5×**. Full schedule, pool details, and Community Day lead-in: [Fortnite Golden Week](/leaks/fortnite-golden-week-november-2026).

## What are Power Hours?
Short, scheduled windows later in the season that temporarily boost the chance to roll the **Pirate Shop Access** prize from Battle Royale chests.

## 2× Treasure Hours — Saturday 21 Nov 2026
According to leaks (reported **20 Nov 2026**), the next **two Treasure Hours** land on **Saturday 21 November** and will boost both the **Pirate Shop Token (Access)** and the **weekly gold outfit** (this week: **Solid Gold Hatsune Miku** — see [Pirate Chest Prizes Week 3–4](/leaks/fortnite-pirate-chest-prizes-week-3-4)).

**Expected multipliers** (match the **14 Nov** in‑game numbers, to be confirmed live):
- **Pirate Shop Token:** **1.5×**
- **Weekly Gold Outfit:** **7.5×**

| Window | ET | UK (GMT) |
| --- | --- | --- |
| First | Sat 21 Nov **2–4pm ET** | Sat 21 Nov **7–9pm** |
| Second | Sat 21 Nov **9–11pm ET** | Sun 22 Nov **2–4am** |

## 2× Treasure Hours — 14 Nov 2026 (past)
Two boosted windows on **Saturday 14 November 2026**. The **first window was extended by 2 hours on the day**, and the **second** started on schedule at about **2am UK** (**9pm ET** Sat **14 Nov**) for two hours. **In‑game multipliers confirmed:** **Pirate Shop Access token 1.5×** and **Weekly Gold Outfit 7.5×**.

| Window | ET | UK (GMT) |
| --- | --- | --- |
| First | Sat 14 Nov **2–6pm ET** | Sat 14 Nov **7–11pm** |
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

## Quick FAQ

**When are today’s boost windows in UK time?**
Today’s slots are **7–9pm UK** and **2–4am UK (Sun 22 Nov)**.

**What is boosted?**
The **Pirate Shop Token (Access)** and the **weekly gold outfit** (**Solid Gold Hatsune Miku** this week), plus other Treasure prizes per window.

**Are the multipliers confirmed?**
They are **expected** to match **14 Nov** (**1.5× Token**, **7.5× Gold**) and will be **confirmed in‑game** via Status / the MOTD when live.

We’ll keep this page updated — future Power Hours windows and multipliers will be added here when Epic announces them.

**Filed:** 4 November 2026. **Updated:** 24 November 2026. Status: **Watching** — confirm multipliers in‑client when the windows open.
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
    image: '/images/guides/privateer-oscar-featured.webp',
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
      '14 Nov Treasure Hours ran (one window extended to 7–11pm UK). Leaked next: 21–22 November at 7.5× Gold Outfit / 1.5× Pirate Shop Access / 10× Vehicle & Decal. Confirm live multipliers in Status / MOTD.',
    category: 'season',
    status: 'watching',
    date: '2026-11-02',
    confirmedDate: '2026-11-14',
    readTime: 2,
    image: '/images/guides/treasure-hunters.jpg',
    tags: ['fortnite treasure hours', 'fortune sprites', 'power hour'],
    content: `
## What are Treasure Hours?
Epic’s live weekend-style boost windows (Fortune Sprites plus Treasure Hunt prize multipliers). They are not the same as the rarer Pirate Shop Power Hours 2.0× Access windows — those live on [Pirate Shop Power Hours](/leaks/pirate-shop-power-hours).

## 14 November 2026 (shipped)

The **14 Nov** windows ran. Reports said the first UK evening window was **extended to 7–11pm UK**, with in-game multipliers around **Pirate Shop Access 1.5×** and **Weekly Gold Outfit 7.5×** — always trust Status / MOTD for the live numbers.

## What’s next (leaked)

| Window (UK) | Notes |
| --- | --- |
| Sat **21 Nov**, 7:00–9:00pm | Leaked |
| Sun **22 Nov**, 2:00–4:00am | Leaked |

Leaked multipliers for those slots: **Gold Outfit 7.5×**, **Pirate Shop Access 1.5×**, **Vehicle & Decal 10×**.

Links: [Pirate Shop odds](/leaks/pirate-shop-odds) · [Pirate Shop Access guide](/guides/how-to/how-to-get-pirate-shop-access-fortnite).

**Updated:** 15 November 2026.
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
