const API_BASE = 'https://fortnite-api.com'

export type NewsMotd = {
  id: string
  title: string
  tabTitle: string
  body: string
  image: string | null
  tileImage: string | null
  hidden: boolean
  sortingPriority: number
}

export type StwMessage = {
  title: string
  body: string
  image: string | null
}

export type NewsTake = {
  note: string
  links: { href: string; label: string }[]
}

export type NewsPayload = {
  brDate: string | null
  brHash: string | null
  brCollage: string | null
  motds: NewsMotd[]
  stwDate: string | null
  stwMessages: StwMessage[]
}

export const NEWS_FAQS = [
  {
    question: 'Where does this Fortnite news come from?',
    answer:
      'The tiles are the same Battle Royale (and Save the World) messages Epic puts in the lobby. We load them from Fortnite-API’s public news endpoint and add notes that point at our map, shop, weapons, and countdown tools — not a rewrite of Epic’s patch notes.',
  },
  {
    question: 'How often does the Fortnite news tab update?',
    answer:
      'Whenever Epic swaps lobby MOTDs — often around a content drop, collab, or season countdown. This page revalidates about every 10 minutes. The date under the heading is Epic’s last news payload, not our last site deploy.',
  },
  {
    question: 'Is lobby news the same as a patch blog?',
    answer:
      'No. MOTDs are short in-game ads for modes, cosmetics, and seasonal hooks. Full balance changes still live on Epic’s blog and in our weapon-change tracker when we have numbers.',
  },
]

function asMotd(raw: Record<string, unknown>): NewsMotd | null {
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  const body = typeof raw.body === 'string' ? raw.body.trim() : ''
  if (!title || !body) return null
  if (raw.hidden === true) return null
  return {
    id: typeof raw.id === 'string' ? raw.id : title,
    title,
    tabTitle: typeof raw.tabTitle === 'string' ? raw.tabTitle : title,
    body,
    image: typeof raw.image === 'string' ? raw.image : null,
    tileImage: typeof raw.tileImage === 'string' ? raw.tileImage : null,
    hidden: false,
    sortingPriority: typeof raw.sortingPriority === 'number' ? raw.sortingPriority : 0,
  }
}

function uniqueLinks(links: { href: string; label: string }[]) {
  const seen = new Set<string>()
  return links.filter((link) => {
    if (seen.has(link.href)) return false
    seen.add(link.href)
    return true
  })
}

/** Original FortniteTools notes — not a paraphrase of the MOTD body. */
export function newsTake(motd: NewsMotd): NewsTake {
  const hay = `${motd.title} ${motd.body}`.toLowerCase()
  const links: { href: string; label: string }[] = []
  const notes: string[] = []

  if (/sprite/.test(hay)) {
    notes.push(
      'Sprite mastery is the free cosmetic track this season — extract at marked sites, then tick off backblings on the free cosmetics list before the window closes.'
    )
    links.push(
      { href: '/guides/how-to/how-to-extract-sprites-fortnite', label: 'Sprite extract guide' },
      { href: '/free-cosmetics', label: 'Free cosmetics tracker' }
    )
  }
  if (/seven slider|chaos exploder|extending focus|gear up|weapon/.test(hay)) {
    notes.push(
      'If the lobby is pushing a new gun or mobility item, check the current loot-pool encyclopedia and a hotbar in the loadout builder instead of trusting a single MOTD screenshot.'
    )
    links.push(
      { href: '/weapons', label: 'Weapon encyclopedia' },
      { href: '/tools/loadout-builder', label: 'Loadout builder' }
    )
  }
  if (/runners|chapter 7 season 3|shattered coast|extract\. survive/.test(hay)) {
    notes.push(
      'Runners still uses Shattered Coast extracts — drop ratings and pin layers are on the interactive map, not in this tile.'
    )
    links.push({ href: '/fortnite-map', label: 'Interactive map' })
  }
  if (/august 20|season 4|reboot|chapter 7 season 4|reality reboot/.test(hay)) {
    notes.push(
      'Season rollover is the countdown we keep dated on this site. Lobby art often lands a day or two before the island actually flips.'
    )
    links.push(
      { href: '/season-countdown', label: 'Season countdown' },
      { href: '/status', label: 'Is Fortnite down' },
      { href: '/ranked', label: 'Ranked reset' }
    )
  }
  if (/shop|outfit|bundle|item shop|cosmetic/.test(hay)) {
    links.push({ href: '/tools/item-shop', label: 'Item Shop' }, { href: '/new-cosmetics', label: 'New cosmetics' })
  }
  if (/smuggler|star wars|hondo|millennium/.test(hay)) {
    notes.push(
      'Collab modes like this usually sit beside BR in Discover — they are not the Battle Royale loot pool. Use map codes if you are looking for Creative islands instead.'
    )
    links.push({ href: '/codes', label: 'Creative map codes' })
  }

  if (notes.length === 0) {
    notes.push(
      'Treat lobby news as a headline, then jump to the live shop, map, or tracker if you actually need numbers.'
    )
    links.push(
      { href: '/tools/item-shop', label: 'Item Shop' },
      { href: '/fortnite-map', label: 'Interactive map' },
      { href: '/tools/player-stats', label: 'Player tracker' }
    )
  }

  return { note: notes[0], links: uniqueLinks(links).slice(0, 4) }
}

export async function fetchFortniteNews(): Promise<NewsPayload> {
  const res = await fetch(`${API_BASE}/v2/news?language=en`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) throw new Error(`News API failed (${res.status})`)
  const json = await res.json()
  const br = json.data?.br ?? {}
  const stw = json.data?.stw ?? {}
  const motds = Array.isArray(br.motds)
    ? (br.motds as Record<string, unknown>[])
        .map(asMotd)
        .filter((m): m is NewsMotd => Boolean(m))
        .sort((a, b) => b.sortingPriority - a.sortingPriority)
    : []
  const stwMessages: StwMessage[] = Array.isArray(stw.messages)
    ? (stw.messages as Record<string, unknown>[])
        .map((raw) => ({
          title: typeof raw.title === 'string' ? raw.title : 'Save the World',
          body: typeof raw.body === 'string' ? raw.body : '',
          image: typeof raw.image === 'string' ? raw.image : null,
        }))
        .filter((m) => m.body)
    : []

  return {
    brDate: typeof br.date === 'string' ? br.date : null,
    brHash: typeof br.hash === 'string' ? br.hash : null,
    brCollage: typeof br.image === 'string' ? br.image : null,
    motds,
    stwDate: typeof stw.date === 'string' ? stw.date : null,
    stwMessages,
  }
}
