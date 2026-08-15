/** Local shop wishlist — shared by the Item Shop and V-Bucks calculator. */

export const SHOP_WISHLIST_KEY = 'ft-shop-wishlist-v1'

export type ShopWishlistItem = {
  id: string
  name: string
  type: string
  image: string | null
  price: number | null
  rarityValue: string
  addedAt: number
  /** True after a shop load where this id was not for sale. */
  missedShop?: boolean
  /** True when the item returned after being absent. */
  back?: boolean
}

export function loadShopWishlist(): ShopWishlistItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(SHOP_WISHLIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ShopWishlistItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((i) => i && typeof i.id === 'string' && typeof i.name === 'string')
  } catch {
    return []
  }
}

export function saveShopWishlist(items: ShopWishlistItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SHOP_WISHLIST_KEY, JSON.stringify(items.slice(0, 80)))
}

export function upsertWishlistItem(
  list: ShopWishlistItem[],
  item: Omit<ShopWishlistItem, 'addedAt' | 'missedShop'>
): ShopWishlistItem[] {
  if (list.some((i) => i.id === item.id)) {
    return list.filter((i) => i.id !== item.id)
  }
  return [{ ...item, addedAt: Date.now() }, ...list].slice(0, 80)
}

/** Mark missed / back after a shop fetch. */
export function syncWishlistWithShop(list: ShopWishlistItem[], inShopIds: Set<string>): ShopWishlistItem[] {
  let changed = false
  const next = list.map((item) => {
    const inShop = inShopIds.has(item.id.toLowerCase())
    if (inShop) {
      if (item.missedShop) {
        changed = true
        return { ...item, missedShop: false, back: true }
      }
      return item
    }
    if (!item.missedShop || item.back) {
      changed = true
      return { ...item, missedShop: true, back: false }
    }
    return item
  })
  return changed ? next : list
}

export function wishlistIds(list: ShopWishlistItem[]) {
  return new Set(list.map((i) => i.id.toLowerCase()))
}

export function nextShopResetUtc(now = new Date()) {
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0)
  )
}

export function msUntilShopReset(now = new Date()) {
  return Math.max(0, nextShopResetUtc(now).getTime() - now.getTime())
}

export function formatShopCountdown(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${h}:${pad(m)}:${pad(s)}`
}

/** Leaves at or before the next 00:00 UTC shop refresh. */
export function isLeavingTonight(outDate: string | null | undefined, now = new Date()) {
  if (!outDate) return false
  const out = new Date(outDate).getTime()
  if (Number.isNaN(out)) return false
  return out <= nextShopResetUtc(now).getTime() + 90_000
}
