import NextLink from 'next/link'
import type { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof NextLink>

/**
 * App-wide Next.js Link with prefetch disabled.
 * Default Link prefetch was burning Vercel edge requests on hover / viewport
 * for pages users never open (especially locale / nav chrome).
 */
export function Link({ prefetch = false, ...props }: LinkProps) {
  return <NextLink {...props} prefetch={prefetch} />
}

export default Link
