# FortniteTools — season / patch update checklist

Private ops list (not a site page). When the user says **check for updates**, **round of updates**, **anything new**, or similar: work this list top-to-bottom, skip sections that clearly do not apply, then report what changed vs what stayed current.

**Last full pass:** 7 Nov 2026 (Treasure Hunters week 2 — map/sprites/calendar + loadout TH refresh)

---

## 0. Sources to open first (live truth)

Do not invent from memory. Pull current state before editing copy.

| Source | What to verify |
| --- | --- |
| [fortnite.com/news](https://www.fortnite.com/news) + in-client MOTD / Compete | Captain’s Days, Treasure Hours, shop drops, cups, event hours |
| `https://fortnite-api.com/v1/map` | Named POI / landmark list + that map.png matches the live island |
| `https://prod.fn-api.cc/v1/sprites` (or current sprites API) | New families, Fortune / Cursed / Gold enabled flags |
| Fortnite-API BR catalog / shop trackers we already use | New weapons, mythics, vaults |
| Epic Battle Pass / season pages | Pass end date, “keep X free” event language |
| Community sprite / schedule sites (fnsprites, etc.) | Only as a cross-check — Epic + API win |
| [x.com/HYPEX](https://x.com/HYPEX) (+ ShiinaBR) | Leak chatter — harvest topics into `/leaks` pages; do not treat as live |

---

## 1. Season clock & hub

- [ ] `lib/season.ts` — `startIso` / `endIso` / `next` / `codename` / map image note
- [ ] `lib/season-hub.ts` — `SEASON_HUB_REVIEWED`, playbook, `LIVE_NAMED_POIS`, change cards, vaulted list, FAQs
- [ ] `/season`, `/season-countdown` layouts + FAQ copy (Captain’s Day dates, end event)
- [ ] Homepage hero / about strings in `messages/en.json` (and sync locales if map/season blurbs changed)
- [ ] `lib/tools-catalog.ts` — **every** season-sensitive tool blurb still names the live season (not the previous one)

---

## 2. Interactive map (`/fortnite-map`)

- [ ] Confirm Fortnite-API POI names match in-game (no previous-island leftovers in UI copy)
- [ ] `lib/map-data.ts` — enrichment for every major named POI + key landmarks; extract pads re-anchored
- [ ] `lib/map-spawns.ts` — `MAJOR_POIS` / `COASTAL_POIS` / vaults / NPC pins use **live** `nearPoi` names
- [ ] `components/fortnite-map-view.tsx` amber notice — must not claim the API is still on the old island
- [ ] `messages/en.json` → `fortniteMap` **and** `messages/fragments/fortniteMap.en.json` (fragment is merge source)
- [ ] Sync other locale `fortniteMap` blocks (or re-run locale patch scripts)
- [ ] `app/fortnite-map/page.tsx` + `layout.tsx` JSON-LD / meta
- [ ] Pirate Shop Access still described as **chest prize, not a pin** (or whatever the season’s “not a POI” prize is)
- [ ] Note vaulted systems honestly (Gold Bars, vending, etc.) if layers remain for planning

---

## 3. Sprites

- [ ] `lib/sprites-catalog.json` — `capturedAt`; new slugs / images under `public/images/sprites/`
- [ ] `lib/sprite-pages.ts` — family ability / location / `live` / `upcoming` for new or gated Sprites
- [ ] `lib/sprites.ts` FAQs / intro body (Fortune, Cursed, Gold, week-captain Sprite)
- [ ] `/sprites` page + layout meta
- [ ] Guides: Wanted Poster / Mastery Monday / Treasure Hours day-of-week (currently `lib/treasure-hunters-posts.ts`)

---

## 4. Calendar & shop (high traffic, goes stale fast)

- [ ] Captain’s Days / weekly content days (dates + which POI / captain / weapon / Sprite)
- [ ] Treasure Hours / Mastery Monday cadence (day of week can move after launch)
- [ ] Item Shop collab dates (7 PM ET drops vs calendar day)
- [ ] Music Pass / side events
- [ ] Cups (Compete tab)
- [ ] Season hub guide + BP/shop + map/loot guides (`lib/posts.ts`, `lib/treasure-hunters-posts.ts` or successors)
- [ ] `/leaks` — add/update leak posts in `lib/leaks.ts` from recent datamines; flip status to shipped/dead; hero season label current

---

## 5. Season-sensitive tools (check every pass)

These change with patches / seasons. Treat as first-class checklist items, not afterthoughts.

### Loadout builder — `/tools/loadout-builder`

- [ ] `lib/weapons.ts` — loadout + damage-calculator combat pool (separate from encyclopedia)
- [ ] `lib/loadout.ts` — `HEALS` / `MOBILITY` / `PRESETS` / `UseCaseTag`; Ranked presets must **not** recommend non-Competitive toys
- [ ] `kitTips` language matches live systems (cannons, vaulted economy, Boss flags)
- [ ] `app/tools/loadout-builder/**` hero + how-to + slot copy; `lib/loadout-seo.ts` FAQs; layout meta
- [ ] Tools-catalog + `messages/en.json` loadout blurbs
- [ ] Icons: `public/images/loadout/` via `scripts/fetch-loadout-icons.mjs` when new items ship

### Weapons encyclopedia & balance — `/weapons`, `/weapon-changes`, damage calculator

- [ ] `lib/weapons-catalog.ts` (+ wiki/pages helpers) — live vs vaulted flags for the current pool
- [ ] `lib/weapon-changes.ts` / `/weapon-changes` — new buff/nerf/vault rows when a patch notes them
- [ ] Damage calculator default / picker still resolves (`lib/weapons.ts` ids); no dead default weapon id
- [ ] Tools-catalog + page meta no longer name the previous season as “live”

### Zone timer — `/tools/zone-timer`

- [ ] Storm wait/shrink timings if Epic published changes
- [ ] Season framing in copy / `messages` (not “Chapter 7 Season 4 Override” after a flip)

### XP / Battle Pass calculator — `/xp-calculator` (+ related BP tools)

- [ ] End date / season name wired to `lib/season.ts` (or explicit copy updated)
- [ ] Pass length assumptions (~80k XP / level, page count) if Epic ships a short pass
- [ ] Tools-catalog blurb

### Ranked hub — `/ranked`

- [ ] New ladder rewards / icons / reset language
- [ ] Non-Competitive item callouts (Shock Rocket, etc.)
- [ ] Last-reviewed date on hub copy

### Reload / map rotation — `/reload`, `/map-rotation`

- [ ] Live Reload island pool + schedule
- [ ] Seasonal overlays (Fortnitemares-style) end dates removed when over
- [ ] Blitz notes if Epic printed changes

### Drops / POI landing pages — `/drops`

- [ ] Named drop pages match the **live** island (archive old POI pages; don’t leave Green Hill as “best drop”)
- [ ] Contest / extract / rotate copy for new hot POIs

### Free cosmetics + Lobby Hacks — `/free-cosmetics`, `/lobby-hacks`

- [ ] Event freebie end dates; kill rows that locked with the previous season
- [ ] Admin Panel / Lobby Hacks — only if the live season still has them; otherwise mark ended / archive
- [ ] Pirate Shop Access / Sprite Mastery / ranked freebies as applicable

### Creative codes — `/codes`

- [ ] Season framing in catalog blurb
- [ ] Cull dead codes if API resolution fails broadly (light pass; not a full scrape every time)

### Modes / status / news

- [ ] `/modes` — playlist catalog if files/API added LTMs
- [ ] `/status` — downtime copy around known flip days; countdown points at live season end
- [ ] `/news` — MOTD ingestion healthy; takes don’t link dead Override tools as current

### Map evolution — `/map-evolution`

- [ ] On island flip: add the new season minimap slide when imagery is available

### Item shop / cosmetics trackers (usually API-driven — light check)

- [ ] `/tools/item-shop`, `/sets`, `/new-cosmetics`, `/cosmetic-stats` — still resolving; no hardcoded previous-season “live” claims in wrappers

---

## 6. Evergreen tools (skip unless broken or user asks)

Do **not** rewrite these on a normal update pass:

| Tool | Why skip |
| --- | --- |
| Build simulator | Mechanics, not loot pool |
| Sensitivity calculator | Cross-game math |
| Keybinds reference | Pro layouts |
| V-Bucks calculator | Pack math / wishlist |
| Skin rarity calculator | Shop-history math |
| Player stats / compare / leaderboards / player count | Live API / polling |
| Creator code checker | Epic slug lookup |
| Locker / lockers / community upload | UGC surfaces |
| Daily jam tracks | Festival daily feed |

Still fix them if they’re erroring or linking to a dead season page.

---

## 7. Content hygiene (don’t ship stale warnings)

Search the repo for leftover island/season language after a flip (update the pattern string each season):

```
Override dump | Green Hill | Lifty Lodge | Reality’s Reign | Stone Sanctum
Fort Fortuna | Lantern Lanes | Baratie Bay
Treasure Hours Sunday | Captain’s Days on 7, 12, 14
as of 1 Nov 2026 that dump
Fortnitemares presets | Override inventory after v42.40
Chapter 7 Season 4 Override   # on live tool surfaces only
```

Fix **live** surfaces (season hub, map, sprites, loadout, weapons tools, TH guides). Leave dated **archive** guides alone unless they wrongly claim to be current.

Also bump “Last reviewed” on any guide or hub you materially change.

---

## 8. After edits

- [ ] Delete any temp rewrite scripts under `scripts/`
- [ ] Quick sanity: map POI names from API ⊆ spawn `nearPoi` set (no silent empty layers)
- [ ] Quick sanity: every loadout `PRESETS` slot id exists in `WEAPONS` / `HEALS` / `MOBILITY`
- [ ] Tell the user: what was new, what was fixed, what is still approximate (e.g. spawn rings, power icons)

---

## Season-flip extras (bigger than a mid-season patch)

When Epic replaces the island or opens a new numbered season:

1. Rewrite `CURRENT_SEASON` and hub playbooks completely
2. Re-anchor **all** map enrichment + spawns (do not leave previous-island `nearPoi`)
3. Archive previous season pages; stop linking them as “live”
4. Sprites: new launch pool + variant schedule
5. **Loadout + weapons.ts + weapons-catalog** full pool swap; new presets; drop previous-season use-case tags
6. Ranked rewards reset copy
7. Free-cosmetics / Lobby Hacks season gate
8. Drops hub + Reload rotation + zone timer + XP calculator framing
9. Homepage + navbar + **tools-catalog** season labels
10. Full `fortniteMap` i18n pass (EN fragment → locales)
11. Map evolution: add new slide when art exists

---

## File cheat sheet

| Area | Primary files |
| --- | --- |
| Season | `lib/season.ts`, `lib/season-hub.ts`, `app/season/**`, `app/season-countdown/**` |
| Map | `lib/map-data.ts`, `lib/map-spawns.ts`, `lib/map-layers.ts`, `components/fortnite-map-view.tsx`, `messages/**/fortniteMap*`, `app/fortnite-map/**` |
| Sprites | `lib/sprites-catalog.json`, `lib/sprites.ts`, `lib/sprite-pages.ts`, `app/sprites/**` |
| Loadout | `lib/loadout.ts`, `lib/weapons.ts`, `lib/loadout-seo.ts`, `app/tools/loadout-builder/**`, `scripts/fetch-loadout-icons.mjs` |
| Weapons | `lib/weapons-catalog.ts`, `lib/weapon-changes.ts`, `lib/weapon-pages.ts`, `app/weapons/**`, `app/weapon-changes/**` |
| Ranked / Reload | ranked hub libs + `lib/reload-hub.ts`, `lib/map-rotation.ts` |
| Freebies | `lib/free-cosmetics.ts`, lobby-hacks pages |
| Guides | `lib/posts.ts`, `lib/treasure-hunters-posts.ts` |
| Catalog | `lib/tools-catalog.ts`, `messages/en.json` home/tool blurbs |
