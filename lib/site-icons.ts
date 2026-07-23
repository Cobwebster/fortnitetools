/** Real Fortnite sprite icons for site chrome (tools hub, categories, brand). */

export const BRAND_ICON = '/images/loadout/striker_pump.png'

export const CATEGORY_ICONS = {
  guides: '/images/loadout/medkit.png',
  weapons: '/images/loadout/warforged_ar.png',
  season: '/images/icons/battle_pass.png',
  map: '/images/icons/map.png',
} as const

export type CategoryIconId = keyof typeof CATEGORY_ICONS

/** Tool hub / featured tool sprites — prefer item art over generic Lucide icons. */
export const TOOL_ICONS: Record<string, string> = {
  '/tools/player-stats': '/images/icons/crown.png',
  '/fortnite-map': '/images/icons/map.png',
  '/tools/item-shop': '/images/icons/vbucks.png',
  '/tools/loadout-builder': '/images/loadout/striker_pump.png',
  '/tools/sensitivity-calculator': '/images/loadout/hunting_rifle.png',
  '/tools/kd-calculator': '/images/icons/crown.png',
  '/tools/zone-timer': '/images/icons/storm.png',
  '/tools/fps-settings': '/images/icons/glider.png',
  '/tools/keybinds': '/images/icons/pickaxe.png',
  '/tools/weapon-damage-calculator': '/images/loadout/warforged_ar.png',
  '/tools/vbucks-calculator': '/images/icons/vbucks.png',
  '/tools/battle-pass-xp-calculator': '/images/icons/xp.png',
}

export function toolIcon(href: string): string {
  return TOOL_ICONS[href] ?? BRAND_ICON
}
