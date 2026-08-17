const API_BASE = 'https://fortnite-api.com'

export type CreatorCodeResult = {
  code: string
  accountId: string | null
  accountName: string | null
  status: string
  verified: boolean
}

export const CREATOR_CODE_EXAMPLES = ['ninja', 'clix', 'bugha', 'sypherpk', 'tfue'] as const

export const CREATOR_CODE_FAQS = [
  {
    question: 'What does a Support-A-Creator code actually do?',
    answer:
      'It routes a cut of eligible Item Shop purchases (and some other SKUs Epic currently marks as SAC-eligible) to the creator while the code is active on your account. The price you pay does not change. It does not add V-Bucks, unlock skins, or redeem a gift-card PIN.',
  },
  {
    question: 'Where do I enter a creator code in Fortnite?',
    answer:
      'Launch Fortnite → Item Shop → Enter Code (wording shifts slightly by patch). Confirm until you see the creator name. Re-enter before a Battle Pass / Crew / big bundle if you have not shopped in a while — Epic’s “stick” window is not infinite.',
  },
  {
    question: 'Why would a code show inactive or not found?',
    answer:
      'The slug never existed, the creator left or paused Support-A-Creator, they changed tags, or you typed a clan tag / Epic display name instead of the SAC slug. Use the exact string from their bio or overlay, then look it up here before you checkout.',
  },
  {
    question: 'Is this the same as a V-Bucks card or a Creative map code?',
    answer:
      'No. Gift-card PINs go on Epic’s V-Bucks card site (consoles often need a second Sony/Microsoft redeem). 12-digit island codes go in Discover. This page only checks Support-A-Creator slugs.',
  },
  {
    question: 'Does “verified” on this lookup mean Epic endorsed them?',
    answer:
      'It is Fortnite-API’s verified flag on the SAC record, not a FortniteTools ranking and not a promise that every SKU in the shop will apply. If the in-game field rejects the code, trust the game.',
  },
]

export async function lookupCreatorCode(name: string): Promise<CreatorCodeResult | null> {
  const code = name.trim()
  if (!code) return null
  const qs = new URLSearchParams({ name: code })
  const res = await fetch(`${API_BASE}/v2/creatorcode?${qs.toString()}`, {
    next: { revalidate: 0 },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Creator code lookup failed (${res.status})`)
  const json = await res.json()
  const data = json.data
  if (!data) return null
  return {
    code: typeof data.code === 'string' ? data.code : code,
    accountId: data.account?.id ?? null,
    accountName: data.account?.name ?? null,
    status: typeof data.status === 'string' ? data.status : 'UNKNOWN',
    verified: Boolean(data.verified),
  }
}
