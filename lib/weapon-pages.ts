import {
  WEAPON_CATALOG,
  WEAPON_CATEGORY_META,
  formatMagSize,
  getCatalogWeapon,
  type WeaponCatalogEntry,
  type WeaponCategoryId,
  type WeaponRarity,
  type WeaponVariantRow,
} from '@/lib/weapons-catalog'
import { getWeaponChangeHistory, type WeaponChangeHit } from '@/lib/weapon-changes'
import { getWeaponWiki, type WeaponWikiEntry } from '@/lib/weapon-wiki'
import { CURRENT_SEASON } from '@/lib/season'
import { FALLOFF_CAPTURED_AT, falloffCaption, getWeaponFalloff, resolveHs } from '@/lib/weapon-combat'

const HP_TARGETS = [100, 150, 200, 250] as const

const PLANNING_RARITY: WeaponRarity[] = [
  'Legendary',
  'Epic',
  'Rare',
  'Mythic',
  'Exotic',
  'Uncommon',
  'Common',
]

const CATEGORY_ROLE: Record<WeaponCategoryId, string> = {
  AR: 'assault rifle for mid-range fights',
  Shotgun: 'shotgun for box and close-range fights',
  SMG: 'SMG for sprays and piece control',
  Pistol: 'pistol / sidearm',
  DMR: 'DMR for tap mid-to-long range',
  Sniper: 'sniper for long-range picks',
  Bow: 'bow',
  Explosive: 'explosive',
  Other: 'utility / special item',
}

export type WeaponStkRow = {
  hp: number
  bodyShots: number
  bodyTtk: number
  magCanKill: boolean
  headShots?: number
  headTtk?: number
}

export type WeaponGuideLink = { href: string; label: string }

export type WeaponPageModel = {
  weapon: WeaponCatalogEntry
  wiki?: WeaponWikiEntry
  top: WeaponVariantRow
  mythic?: WeaponVariantRow
  live: boolean
  categoryLabel: string
  intro: string[]
  bullets: string[]
  stk: WeaponStkRow[]
  hsMult?: number
  changes: WeaponChangeHit[]
  related: WeaponCatalogEntry[]
  firstLogged?: { date: string; label: string }
  faqs: { question: string; answer: string }[]
  description: string
  guides: WeaponGuideLink[]
}

export function planningVariant(weapon: WeaponCatalogEntry): WeaponVariantRow {
  for (const rarity of PLANNING_RARITY) {
    const row = weapon.variants.find((v) => v.rarity === rarity)
    if (row) return row
  }
  return weapon.variants[0]!
}

function categoryLabel(id: WeaponCategoryId) {
  return WEAPON_CATEGORY_META.find((c) => c.id === id)?.label ?? id
}

function cadence(rate: number): string {
  if (rate <= 0) return 'special / charge timing'
  if (rate <= 0.8) return 'slow pump or bolt cadence'
  if (rate <= 1.2) return 'deliberate single-shot cadence'
  if (rate <= 2) return 'follow-up / auto cadence'
  if (rate <= 3.5) return 'semi-auto cadence'
  if (rate <= 6) return 'full-auto medium cadence'
  if (rate <= 10) return 'spray cadence'
  return 'minigun-class spray'
}

function magPhrase(mag: number, capitalized = false) {
  if (mag >= 100000) return capitalized ? 'An infinite magazine' : 'an infinite magazine'
  return capitalized ? `A ${mag}-round mag` : `a ${mag}-round mag`
}

function formatSeconds(n: number) {
  if (n <= 0) return 'instant'
  return `${n.toFixed(2)}s`
}

function medianCategoryDps(category: WeaponCategoryId): number {
  const vals = WEAPON_CATALOG.filter((w) => w.category === category)
    .map((w) => planningVariant(w).dps)
    .sort((a, b) => a - b)
  if (!vals.length) return 0
  const mid = Math.floor(vals.length / 2)
  return vals.length % 2 ? vals[mid]! : (vals[mid - 1]! + vals[mid]!) / 2
}

function stkFor(dmg: number, fireRate: number, mag: number, hp: number, hs?: number): WeaponStkRow {
  const bodyShots = Math.max(1, Math.ceil(hp / dmg))
  const bodyTtk = fireRate > 0 ? (bodyShots - 1) / fireRate : 0
  const row: WeaponStkRow = {
    hp,
    bodyShots,
    bodyTtk,
    magCanKill: mag >= bodyShots,
  }
  if (hs && hs > 1) {
    const headDmg = dmg * hs
    row.headShots = Math.max(1, Math.ceil(hp / headDmg))
    row.headTtk = fireRate > 0 ? (row.headShots - 1) / fireRate : 0
  }
  return row
}

function vsMedian(dps: number, median: number): string {
  if (!median) return ''
  const pct = Math.round(((dps - median) / median) * 100)
  if (Math.abs(pct) <= 5) return `about even with the encyclopedia median of ${median} DPS for this category`
  if (pct > 0) return `${pct}% above the encyclopedia ${median} DPS median for this category`
  return `${Math.abs(pct)}% below the encyclopedia ${median} DPS median for this category`
}

export function relatedWeapons(weapon: WeaponCatalogEntry, limit = 4): WeaponCatalogEntry[] {
  const top = planningVariant(weapon)
  return WEAPON_CATALOG.filter((w) => w.id !== weapon.id && w.category === weapon.category)
    .map((w) => ({ w, delta: Math.abs(planningVariant(w).dps - top.dps) }))
    .sort((a, b) => {
      if (a.w.vaulted !== b.w.vaulted && !weapon.vaulted) {
        return a.w.vaulted ? 1 : -1
      }
      return a.delta - b.delta
    })
    .slice(0, limit)
    .map((x) => x.w)
}

export function relatedGuides(category: WeaponCategoryId): WeaponGuideLink[] {
  const links: WeaponGuideLink[] = [
    { href: '/guides/weapons/fortnite-best-weapons-tier-list-2026', label: 'Weapons tier list' },
    { href: '/tools/weapon-damage-calculator', label: 'Damage calculator' },
    { href: '/tools/loadout-builder', label: 'Loadout builder' },
    { href: '/weapon-changes', label: 'Buffs & nerfs' },
    { href: '/weapons', label: 'All weapons' },
  ]
  if (category === 'Shotgun') {
    links.unshift({
      href: '/guides/weapons/fortnite-shotgun-guide-best-options',
      label: 'Shotgun guide',
    })
  }
  return links
}

export function buildWeaponPage(id: string): WeaponPageModel | null {
  const weapon = getCatalogWeapon(id)
  if (!weapon) return null

  const wiki = getWeaponWiki(weapon.id)
  const top = planningVariant(weapon)
  const mythic = weapon.variants.find((v) => v.rarity === 'Mythic')
  const live = !weapon.vaulted
  const changes = getWeaponChangeHistory(weapon.name)
  const firstLogged = changes.length ? { date: changes[changes.length - 1]!.date, label: changes[changes.length - 1]!.label } : undefined
  const falloff = getWeaponFalloff(weapon.id)
  const hsMult = resolveHs(weapon.id, falloff?.hs)
  const stk = HP_TARGETS.map((hp) => stkFor(top.dmg, top.fireRate, top.mag, hp, hsMult))
  const related = relatedWeapons(weapon)
  const label = categoryLabel(weapon.category)
  const rarities = weapon.variants.map((v) => v.rarity).join(', ')
  const median = medianCategoryDps(weapon.category)
  const magLabel = formatMagSize(top.mag)
  const stk150 = stk.find((r) => r.hp === 150)!

  const intro: string[] = []
  intro.push(
    live
      ? `The ${weapon.name} is a Fortnite ${CATEGORY_ROLE[weapon.category]} in the ${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) loot pool after v42.40 (15 October 2026).`
      : `The ${weapon.name} is a Fortnite ${CATEGORY_ROLE[weapon.category]} that is vaulted — it is not in the ${CURRENT_SEASON.shortLabel} Override BR pool after v42.40. This page keeps the last encyclopedia stats so old VODs and loadouts still have numbers.`
  )
  if (weapon.note) intro.push(weapon.note)

  intro.push(
    `At ${top.rarity}, it deals ${top.dmg} body damage at ${top.fireRate} shots per second (${top.dps} DPS), with ${magPhrase(top.mag)} and ${top.reload.toFixed(2)}s reload. Structure damage is ${top.structDmg}. Rarities in the encyclopedia: ${rarities}.`
  )

  if (mythic && mythic.rarity !== top.rarity) {
    intro.push(
      `The Mythic row is ${mythic.dmg} body / ${mythic.dps} DPS / ${formatMagSize(mythic.mag)} mag — boss or medallion loot, not what you should plan a floor drop around.`
    )
  }

  const medianLine = vsMedian(top.dps, median)
  if (medianLine) {
    intro.push(`${weapon.name}’s ${top.rarity} DPS of ${top.dps} is ${medianLine}.`)
  }

  if (firstLogged && !wiki?.firstAdded) {
    intro.push(
      `Earliest balance row on FortniteTools is ${firstLogged.label} (${firstLogged.date}). That is when we logged it — not necessarily when Epic first added it.`
    )
  }

  const bullets: string[] = []
  bullets.push(
    `${cadence(top.fireRate)} — ${top.fireRate} fire rate at ${top.rarity}.`
  )
  bullets.push(
    `Against 150 HP at hipfire it is ${stk150.bodyShots} body shot${stk150.bodyShots === 1 ? '' : 's'} (${formatSeconds(stk150.bodyTtk)} TTK)${
      stk150.headShots
        ? `, or ${stk150.headShots} headshot${stk150.headShots === 1 ? '' : 's'} at ${hsMult}× (${formatSeconds(stk150.headTtk!)})`
        : ''
    }. ${stk150.magCanKill ? `${magPhrase(top.mag, true)} can finish 150 HP without a reload.` : `${magPhrase(top.mag, true)} cannot finish 150 HP in one dump — you reload mid-fight or swap.`}`
  )
  if (falloff) {
    bullets.push(
      `Logged damage-by-distance curve: ${falloffCaption(falloff.curveFor(top.rarity, top.dmg))} Time-to-kill on this page updates with the meter slider.`
    )
  } else {
    bullets.push(
      'No logged falloff curve for this gun — the damage-by-distance chart is a flat hipfire line until we snapshot one.'
    )
  }
  if (top.reload === 0) {
    bullets.push('Reload is 0s in the encyclopedia (charge, reserve, or special cycle — not a normal mag swap).')
  } else if (top.reload >= 4) {
    bullets.push(`Slow ${top.reload.toFixed(2)}s reload — empty mag is a long punish.`)
  } else if (top.reload <= 1.5) {
    bullets.push(`Fast ${top.reload.toFixed(2)}s reload — you can dump and restock in a box fight.`)
  }
  if (weapon.category === 'Shotgun' && top.fireRate <= 1) {
    bullets.push('Pump-class: one pellet dump, then reset. Do not spray this like an auto.')
  }
  if (weapon.category === 'Shotgun' && top.fireRate > 1.2) {
    bullets.push('Auto / follow-up shotgun: hold or mash rather than treating it like a classic pump.')
  }
  if (weapon.note?.toLowerCase().includes('loot hack')) {
    bullets.push('Not a guaranteed floor spawn — Loot Hack / Sprite Dust is the realistic way it appears.')
  }
  if (wiki?.playstyle) bullets.push(wiki.playstyle)

  const faqs = [
    {
      question: `Is the ${weapon.name} in Fortnite right now?`,
      answer: live
        ? `Yes — it is in the ${CURRENT_SEASON.shortLabel} Override encyclopedia live list after v42.40.${weapon.note ? ` ${weapon.note}` : ''}`
        : `No — it is vaulted in the current Override loot pool. The rarity table on this page is last-logged encyclopedia data, not a promise it will unvault.`,
    },
    {
      question: `How much damage does the ${weapon.name} do?`,
      answer: `${top.rarity} body damage is ${top.dmg} (${top.dps} DPS at ${top.fireRate} fire rate). Structure damage is ${top.structDmg}. Other rarities: ${rarities}.`,
    },
    {
      question: `How many shots to kill with the ${weapon.name}?`,
      answer: `At ${top.rarity} hipfire, body TTK is ${stk.map((r) => `${formatSeconds(r.bodyTtk)} (${r.bodyShots} ${r.bodyShots === 1 ? 'shot' : 'shots'}) vs ${r.hp} HP`).join(', ')}. ${
        hsMult
          ? `Headshot multiplier is ${hsMult}×.`
          : 'Headshot TTK is omitted unless we have a multiplier for this gun.'
      } The combat table also tracks 250 HP overshield and recalculates as you drag distance.`,
    },
    {
      question: `Does the ${weapon.name} lose damage with range?`,
      answer: falloff
        ? `${falloffCaption(falloff.curveFor(top.rarity, top.dmg))} Hipfire on the rarity table stays the encyclopedia body number; the chart is our ${FALLOFF_CAPTURED_AT} falloff snapshot scaled to that row.`
        : `We have not logged a falloff curve for ${weapon.name} yet, so the chart is a flat hipfire line. Do not assume class-default drop-off.`,
    },
    {
      question: `When was the ${weapon.name} added to Fortnite?`,
      answer: wiki?.firstAdded
        ? wiki.firstAdded
        : firstLogged
          ? `We do not invent a chapter date for this gun. The earliest patch row we logged is ${firstLogged.label} (${firstLogged.date}). ${weapon.note ? weapon.note : ''}`.trim()
          : `We do not have a verified first-added chapter for ${weapon.name}, so this page does not fake one. ${weapon.note ? weapon.note : 'Use the rarity table and vaulted flag as the facts we do have.'}`,
    },
    {
      question: `What rarity is the ${weapon.name}?`,
      answer: `The encyclopedia lists ${rarities}. Planning numbers on this page use ${top.rarity} unless you pick another row in the table.`,
    },
  ]

  const poolBit = live ? 'in the Override loot pool' : 'vaulted'
  const description = `${weapon.name} Fortnite stats — ${top.rarity} ${top.dmg} dmg, ${top.dps} DPS, ${top.fireRate} fire rate, ${magLabel} mag. ${poolBit}. TTK vs 100/150/200/250, damage by distance, patch history.`

  return {
    weapon,
    wiki,
    top,
    mythic: mythic && mythic.rarity !== top.rarity ? mythic : undefined,
    live,
    categoryLabel: label,
    intro,
    bullets,
    stk,
    hsMult,
    changes,
    related,
    firstLogged,
    faqs,
    description,
    guides: relatedGuides(weapon.category),
  }
}

export function allWeaponIds() {
  return WEAPON_CATALOG.map((w) => w.id)
}
