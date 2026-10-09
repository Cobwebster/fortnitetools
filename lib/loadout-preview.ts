import {
  LOADOUT_SLOTS,
  getUtility,
  parseLoadoutSearch,
  type LoadoutSlot,
} from '@/lib/loadout'
import { getWeapon } from '@/lib/weapons'

export type LoadoutPreviewItem = {
  slot: LoadoutSlot
  id: string
  name: string
  image: string
}

/** Resolve a share path / query into five hotbar items for cards. */
export function previewFromLoadoutUrl(urlOrPath: string): LoadoutPreviewItem[] {
  if (!urlOrPath) return []
  let search = ''
  try {
    if (urlOrPath.includes('?')) {
      search = urlOrPath.slice(urlOrPath.indexOf('?'))
    } else if (urlOrPath.startsWith('sg=') || urlOrPath.includes('&sg=')) {
      search = `?${urlOrPath}`
    } else {
      const u = new URL(urlOrPath, 'https://www.fortnitetools.com')
      search = u.search
    }
  } catch {
    return []
  }

  const bundle = parseLoadoutSearch(search)
  if (!bundle) return []

  return LOADOUT_SLOTS.map((slot) => {
    const id = bundle.slots[slot]
    const weapon = getWeapon(id)
    const util = getUtility(id)
    const item = weapon || util
    return {
      slot,
      id,
      name: item?.name || id,
      image: item?.image || '/images/loadout/flex_smg.png',
    }
  })
}
