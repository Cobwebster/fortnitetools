/**
 * Curated first-added / vault notes. Only weapons we can date without guessing.
 * Omit a field rather than invent a chapter or year.
 */
export type WeaponWikiEntry = {
  /** When Epic first shipped the gun, if verified. */
  firstAdded?: string
  /** Later vault / unvault notes that are not already in the catalog `note`. */
  vaultHistory?: string
  /** Extra play notes that numbers cannot imply. */
  playstyle?: string
}

export const WEAPON_WIKI: Record<string, WeaponWikiEntry> = {
  assault_rifle: {
    firstAdded:
      'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). The grey-to-gold assault rifle / SCAR line has been Fortnite’s default medium-range gun for most of the game’s life.',
    vaultHistory:
      'Vaulted and unvaulted across later chapters. In Chapter 7 Season 4 Override it is a floor-pool AR after the 20 August 2026 reboot.',
    playstyle:
      'Tap or short burst at mid range. Bloom punishes full-mag sprays; first-shot accuracy is the whole gun.',
  },
  pump_shotgun: {
    firstAdded:
      'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). The original pump is the shotgun every later “striker / havoc / sentinel” pump is measured against.',
    vaultHistory:
      'Rotated in and out for years. Override unvaulted it with v42.10 (3 September 2026); v42.40 left it in the pool.',
    playstyle:
      'One hard pellet dump, then edit or pump-reset. Headshot multiplier on the live Override values is 2.0 — body shots still need a follow-up.',
  },
  tactical_shotgun: {
    firstAdded:
      'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). The original auto-ish close-range shotgun, later replaced by a long line of spas / maven / 8-Bit descendants.',
    vaultHistory: 'Vaulted in the current Override encyclopedia — not in the C7S4 floor pool.',
  },
  hunting_rifle: {
    firstAdded:
      'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). One of the original snipers: bolt hunting rifle, no scope, heavy ammo.',
    vaultHistory:
      'C7S4 Override after v42.40: Loot Hack only — it can appear from hacked chests, not as a guaranteed floor spawn.',
  },
  minigun: {
    firstAdded:
      'Chapter 1 Season 2 (December 2017). Classic spin-up LMG: huge mag, low per-bullet damage, eats an inventory slot.',
    vaultHistory:
      'In Override it is often a Loot Hack / Sprite Dust return rather than a chest staple.',
  },
  dual_pistols: {
    firstAdded:
      'Chapter 1 Season 3 (22 February 2018). Akimbo pistols — two shots per trigger, medium ammo, peaked as a shotgun alternative in early chapters.',
    vaultHistory: 'Override: still listed live, often via Loot Hack / Sprite Dust rather than floor loot.',
  },
  heavy_assault_rifle: {
    firstAdded:
      'Chapter 1 Season 5 (12 July 2018). Slow, heavy-hitting AR — the opposite of the classic 5.5 fire-rate rifle.',
    vaultHistory:
      'Fortnitemares v42.30 unvault (1 October 2026); still in the Override pool after v42.40.',
  },
  drum_gun: {
    firstAdded:
      'Chapter 1 Season 5 (2018), famously as a World Cup / mashup AR+SMG. Later Midas, Jules, Shadow Midas, and Snoop variants reused the drum.',
    vaultHistory:
      'Vaulted from the Override pool (not in the current encyclopedia live list). Use this page for last logged rarity stats only.',
  },
  rocket_launcher: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). Original explosive RPG.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  grenade_launcher: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). Arc grenade projector.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  revolver: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). Slow, heavy pistol.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  submachine_gun: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). The original SMG.',
    vaultHistory:
      'Vaulted in Override — C7S4 has no floor SMG; sidearms (Tactical / Ranger / Duals) cover that slot.',
  },
  bolt_action_sniper_rifle: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). Scoped bolt sniper.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  flare_gun: {
    firstAdded:
      'Chapter 2 Season 3 (June 2020). Marks a location and can ignite; utility more than a fight gun.',
  },
  compact_smg: {
    firstAdded: 'Chapter 1 Season 5 era P90-style SMG. High mag, spray close.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  suppressed_submachine_gun: {
    firstAdded: 'Chapter 1 Season 2 (2018). Quiet SMG that defined early-game sprays for years.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  combat_shotgun: {
    firstAdded: 'Chapter 1 Season 9 / Chapter 2 early — fast pump-like shotgun with tight spread at range.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  charge_shotgun: {
    firstAdded: 'Chapter 2 Season 3 (2020). Hold to charge pellets; released as a skill-shot shotgun.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  lever_action_shotgun: {
    firstAdded: 'Chapter 2 Season 5 (December 2020). Cowboy lever shotgun.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  infantry_rifle: {
    firstAdded: 'Chapter 1 Season 9 (2019). First-shot accurate tap rifle, heavy ammo on some versions.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  heavy_sniper_rifle: {
    firstAdded: 'Chapter 1 Season 7 (2018). 150+ body sniper that also chunks builds.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  hand_cannon: {
    firstAdded: 'Chapter 1 Season 3 (2018). Deagle-style pistol, heavy ammo, huge structure damage.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  burst_assault_rifle: {
    firstAdded: 'Chapter 1 Season 1 — Battle Royale launch (25 July 2017). Three-round burst AR.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  ranger_assault_rifle: {
    firstAdded: 'Chapter 4 Season 1 (December 2022). Hitscan-feeling tap AR that later sat next to the classic AR in several loot pools.',
    vaultHistory: 'Vaulted from Override — not in the current live encyclopedia list.',
  },
  striker_pump_shotgun: {
    firstAdded: 'Chapter 4 Season 1 (December 2022). The C4-era “new pump.”',
    vaultHistory: 'Vaulted in the current Override encyclopedia; classic Pump is the live pump instead.',
  },
  warforged_assault_rifle: {
    firstAdded: 'Chapter 5 Season 1 (December 2023). Myths & Mortals heavy AR line (Ares mythic variant exists separately).',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  gatekeeper_shotgun: {
    firstAdded: 'Chapter 5 Season 1 (December 2023). Myths & Mortals shotgun — fat pellets, slow cadence.',
    vaultHistory:
      'Override v42.40 Loot Hack: can appear from hacked chests, not a guaranteed floor spawn.',
  },
  oni_shotgun: {
    firstAdded: 'Chapter 6 Season 1 (December 2024). Break-action Japanese-theme shotgun, tiny mag, fast reload.',
    vaultHistory: 'C7S4 Override: often via Loot Hack / Sprite Dust.',
  },
  midas_masterpiece: {
    firstAdded:
      'Chapter 7 Season 4 Override (20 August 2026) as Midas’ gold pistol — a season-original, not the Chapter 2 Drum Gun.',
    vaultHistory: 'Vaulted with v42.40 (15 October 2026). Stats on this page are last-logged encyclopedia values.',
    playstyle: 'Was a high-skill sidearm while it lasted; do not expect it in chests after 15 Oct.',
  },
  eight_bit_shotgun: {
    firstAdded:
      'Chapter 7 Season 4 Override (20 August 2026). Arcade / scoreboard auto shotgun — the season’s spray close-range option.',
    playstyle: 'Hold trigger, farm the scoreboard combos, do not treat it like a pump.',
  },
  enhanced_eight_bit_shotgun: {
    firstAdded: 'Enhanced / boss-style 8-Bit Shotgun from the Override era. Same family as the floor 8-Bit.',
    vaultHistory: 'Vaulted in the encyclopedia; live pool uses the standard 8-Bit.',
  },
  mega_buster: {
    firstAdded:
      'Chapter 7 Season 4 Override (20 August 2026) — Mega Man collab. Charge shots, slide dash, reserve ammo only (no pickup ammo).',
    playstyle: 'Charge for the 144-class dump; slide dash is the mobility. Empty reserve = the gun is done.',
  },
  sweeper_shotgun: {
    vaultHistory:
      'Override v42.10 unvault (3 September 2026). v42.40 slightly increased fire rate — confirm the new cadence in-game.',
    playstyle: 'Auto shotgun between 8-Bit and pump: more pellets over time than a pump, less dump than 8-Bit.',
  },
  wood_stake_shotgun: {
    vaultHistory:
      'Seasonal Fortnitemares shotgun. Unvaulted again in Override v42.30 (1 October 2026); still in the pool after v42.40.',
  },
  dual_fiend_hunters: {
    vaultHistory:
      'Fortnitemares v42.30 unvault (1 October 2026); still in the Override pool after v42.40. Akimbo fiend-hunter pistols, not Dual Pistols.',
  },
  pumpkin_launcher: {
    firstAdded: 'Chapter 1 Season 6 Fortnitemares (2018) and later Halloween returns. Seasonal RPG skin with pumpkin projectiles.',
    vaultHistory: 'Vaulted in the current Override encyclopedia.',
  },
  crash_pad_jr: {
    firstAdded:
      'Crash Pad Jr. is the throwable bounce pad (utility), not a gun. Treat the rarity table as item stats, not DPS you fight with.',
  },
  bass_boost: {
    vaultHistory: 'C7S4 Override — often via Loot Hack / Sprite Dust. Festival-adjacent bass item, not a rifle.',
  },
  thornes_vampiric_blade: {
    vaultHistory:
      'v42.40 Loot Hack — Mythic melee from hacked chests (15 October 2026). Not a ranged gun; stats are melee encyclopedia values.',
  },
  tactical_pistol: {
    vaultHistory: 'C7S4 Override floor-pool sidearm. With no SMG in the live pool, this is the default spray pocket gun.',
  },
  ranger_pistol: {
    vaultHistory: 'C7S4 Override floor-pool sidearm. Hits harder per shot than Tactical; similar mag.',
  },
  rapid_fire_smg: {
    vaultHistory: 'Vaulted in the current Override encyclopedia. Logged in 2026 patch history before the season SMG drought.',
  },
}

export function getWeaponWiki(id: string): WeaponWikiEntry | undefined {
  return WEAPON_WIKI[id]
}
