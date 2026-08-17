import type { Metadata } from 'next'
import { SitePage } from '@/components/site-page'
import { LoginForm } from '@/components/auth-forms'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Log in',
  description: 'Sign in to your FortniteTools account.',
  path: '/login',
  keywords: ['fortnitetools login', 'fortnite tools account'],
  index: false,
})

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams

  return (
    <SitePage title="Log in" description="Sign in to manage your FortniteTools account.">
      <div className="mx-auto max-w-md space-y-4 not-prose">
        {params.error === 'auth' ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            Auth link expired or invalid. Try signing in again.
          </p>
        ) : null}
        <LoginForm next={params.next} />
      </div>
    </SitePage>
  )
}
