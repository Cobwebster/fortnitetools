/** Real Fortnite sprite icons for site chrome (tools hub, categories, brand). */

import { stripLocaleFromPathname } from '@/i18n/config'

/** Brand mark — not reused for individual tools. */
export const BRAND_ICON = '/images/loadout/striker_pump.png'

export const CATEGORY_ICONS = {
  'how-to': '/images/loadout/medkit.png',
  weapons: '/images/loadout/warforged_ar.png',
  season: '/images/icons/battle_pass.png',
  map: '/images/icons/map.png',
} as const

export type CategoryIconId = keyof typeof CATEGORY_ICONS

/**
 * One unique sprite per tool path (no shared images across tools).
 * Category icons above may match a related tool intentionally only when
 * those tiles never share a screen — keep tool map/season distinct from categories.
 */
export const TOOL_ICONS: Record<string, string> = {
  '/tools': '/images/loadout/mat_wood.png',
  '/tools/player-stats': '/images/icons/crown.png',
  '/fortnite-map': '/images/loadout/pulse_scanner.png',
  '/map-rotation': '/images/icons/storm.png',
  '/map-evolution': '/images/loadout/rift.png',
  '/player-count': '/images/loadout/business_turret.png',
  '/tools/item-shop': '/images/loadout/golden_apple.png',
  '/tools/loadout-builder': '/images/loadout/flex_smg.png',
  '/tools/fortnite-build-simulator': '/images/loadout/mat_stone.png',
  '/tools/sensitivity-calculator': '/images/loadout/hunting_rifle.png',
  '/tools/kd-calculator': '/images/loadout/heavy_impact.png',
  '/tools/zone-timer': '/images/loadout/shockwave.png',
  '/tools/fps-settings': '/images/icons/glider.png',
  '/tools/keybinds': '/images/icons/pickaxe.png',
  '/tools/weapon-damage-calculator': '/images/loadout/surgical_burst.png',
  '/weapons': '/images/loadout/maven_auto.png',
  '/weapon-changes': '/images/loadout/chaos_exploder.png',
  '/season-countdown': '/images/loadout/pepper.png',
  '/xp-calculator': '/images/icons/xp.png',
  '/free-cosmetics': '/images/loadout/flowberry.png',
  '/tools/vbucks-calculator': '/images/icons/vbucks.png',
  '/tools/skin-rarity-calculator': '/images/loadout/seven_sliders.png',
  '/codes': '/images/loadout/launch_pad.png',
  '/news': '/images/loadout/grappler.png',
  '/modes': '/images/loadout/overdrive_grenade.png',
  '/new-cosmetics': '/images/loadout/slap_juice.png',
  '/creator-code': '/images/loadout/chug_splash.png',
  '/season': '/images/loadout/self_revive.png',
  '/drops': '/images/loadout/cluster_clinger.png',
  '/sets': '/images/loadout/apple.png',
  '/tools/battle-pass-xp-calculator': '/images/loadout/chug_jug.png',
}

export function toolIcon(href: string): string {
  const path = stripLocaleFromPathname(href.split('?')[0] || '/')
  return TOOL_ICONS[path] ?? BRAND_ICON
}
