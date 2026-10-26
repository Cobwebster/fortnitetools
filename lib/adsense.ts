/** Manual AdSense units. Auto ads stay enabled via the root-layout script. */
export const ADSENSE_CLIENT = 'ca-pub-4663468510887622'

export const ADSENSE_SLOTS = {
  /** Multiplex — end of guides / long articles */
  endOfBlog: '9868308194',
  /** Display — guides in-content */
  blogAd: '6914841796',
  /** Display — individual tool pages */
  inToolPage: '1208691720',
  /** Display — tools hub */
  toolsPage: '6461018402',
} as const

export type AdSenseVariant = 'blog' | 'endOfBlog' | 'inTool' | 'toolsPage'

export const ADSENSE_VARIANTS: Record<
  AdSenseVariant,
  { slot: string; format: 'auto' | 'autorelaxed'; label: string }
> = {
  blog: { slot: ADSENSE_SLOTS.blogAd, format: 'auto', label: 'blog-ad' },
  endOfBlog: { slot: ADSENSE_SLOTS.endOfBlog, format: 'autorelaxed', label: 'endofblog' },
  inTool: { slot: ADSENSE_SLOTS.inToolPage, format: 'auto', label: 'in-tool-page-ad' },
  toolsPage: { slot: ADSENSE_SLOTS.toolsPage, format: 'auto', label: 'tools-page-ad' },
}
