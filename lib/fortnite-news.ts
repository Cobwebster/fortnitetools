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
    question: 'What is this Fortnite news page?',
    answer:
      'Live Battle Royale lobby headlines — the same tiles you see when you boot the game — with a short FortniteTools note under each one that points at the map, shop, free cosmetics, or countdown when that is more useful than the promo copy.',
  },
  {
    question: 'How often does this update?',
    answer:
      'Whenever Epic swaps the lobby tab (content drops, collabs, season timers). We refresh on a short cycle so you are not stuck on yesterday’s tile. The timestamp under the heading is when that lobby set last changed.',
  },
  {
    question: 'Is this the same as Epic’s patch notes?',
    answer:
      'No. Lobby headlines are short promos for modes, cosmetics, and seasonal hooks. Full balance changes still live on Epic’s blog — and on our weapon-change tracker when we have numbers.',
  },
  {
    question: 'Why add a FortniteTools note under each tile?',
    answer:
      'Lobby copy is marketing. The note is the “so what” — jump to the live shop, map, freebies tracker, or countdown instead of screenshot-hunting the same tile on five sites.',
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

  if (/fortnitemare|nitemare|halloween|jack-a-nape|jimothy/.test(hay)) {
    notes.push(
      'Fortnitemares freebies (Jack-a-Nape quests, Jimothy extract, login loading screen) sit on the free cosmetics tracker with end dates — lobby art alone will not tell you the cutoff.'
    )
    links.push({ href: '/free-cosmetics', label: 'Free cosmetics tracker' }, { href: '/season', label: 'Season hub' })
  }
  if (/sprite/.test(hay)) {
    notes.push(
      'Sprites and Sprite Dust still come from Admin Panel Lobby Hacks and map extracts — timed Override freebies are on the free cosmetics tracker.'
    )
    links.push(
      { href: '/guides/how-to/how-to-extract-sprites-fortnite', label: 'Sprite extract guide' },
      { href: '/free-cosmetics', label: 'Free cosmetics tracker' }
    )
  }
  if (/ironmouse|twitch drop|admin panel|lobby hack/.test(hay)) {
    notes.push(
      'Timed free cosmetics (Twitch drops, Admin Panel codes, Ranked Null) are listed with end dates on the free cosmetics tracker.'
    )
    links.push({ href: '/free-cosmetics', label: 'Free cosmetics tracker' })
  }
  if (/seven slider|chaos exploder|extending focus|gear up|weapon|bonerattler|freddy/.test(hay)) {
    notes.push(
      'If the lobby is pushing a new gun or mobility item, check the live loot pool and build a hotbar instead of trusting one promo screenshot.'
    )
    links.push(
      { href: '/weapons', label: 'Weapon encyclopedia' },
      { href: '/tools/loadout-builder', label: 'Loadout builder' }
    )
  }
  if (/override|chapter 7 season 4|green hill|reality.?s reign|stone sanctum/.test(hay)) {
    notes.push(
      'Override drop calls belong on the interactive map — lobby tiles rarely name the POI that actually matters for loot.'
    )
    links.push({ href: '/fortnite-map', label: 'Interactive map' }, { href: '/drops', label: 'Best drops' })
  }
  if (/runners|chapter 7 season 3|shattered coast|extract\. survive/.test(hay)) {
    notes.push(
      'Older Runners / Shattered Coast tiles are archive flavor now — Override map layers are what you want for live drops.'
    )
    links.push({ href: '/fortnite-map', label: 'Interactive map' })
  }
  if (/august 20|season 4|reboot|chapter 7 season 4|reality reboot|november 1|season end/.test(hay)) {
    notes.push(
      'Season rollover is on the countdown we keep dated here. Lobby art often lands a day or two before the island actually flips.'
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
  if (/smuggler|star wars|hondo|millennium|reload|horde rush|blitz/.test(hay)) {
    notes.push(
      'Playlist / collab modes live beside BR in Discover — they are not the main Battle Royale loot pool. Map codes cover Creative islands.'
    )
    links.push({ href: '/modes', label: 'Game modes' }, { href: '/codes', label: 'Creative map codes' })
  }

  if (notes.length === 0) {
    notes.push(
      'Treat this as a headline, then jump to the live shop, map, or tracker if you actually need numbers.'
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
