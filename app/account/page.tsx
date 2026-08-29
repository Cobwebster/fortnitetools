import type { Metadata } from 'next'
import Link from '@/components/link'
import { redirect } from 'next/navigation'
import { CalendarDays, CheckCircle2, LogOut, Sparkles, UploadCloud, UserRound } from 'lucide-react'
import { SitePage } from '@/components/site-page'
import { ProfileForm } from '@/components/auth-forms'
import { FeedbackForm } from '@/components/feedback-form'
import { logoutAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Account',
    description: 'Manage your FortniteTools account settings.',
    path: '/account',
  }),
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/account')
  }

  const displayName =
    (user.user_metadata?.display_name as string | undefined)?.trim() || ''
  const memberSince = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(user.created_at))
  const greetingName = displayName || user.email?.split('@')[0] || 'player'

  return (
    <SitePage title="Dashboard" description="Your FortniteTools account hub.">
      <div className="space-y-6 not-prose">
        <section className="relative overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/15 via-card to-card p-6 sm:p-8">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="rounded-xl border border-primary/25 bg-primary/15 p-3 text-primary">
              <Sparkles className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Player dashboard
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-foreground">
                Welcome, {greetingName}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                More account features are coming soon.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3" aria-label="Account overview">
          <div className="rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">Active member</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <CalendarDays className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Member since
            </p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">{memberSince}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <UserRound className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Profile
            </p>
            <p className="mt-1 truncate font-display text-lg font-bold text-foreground">
              {displayName || 'Not set'}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5 overflow-hidden rounded-xl border border-primary/30 bg-linear-to-r from-primary/15 via-card to-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/15 p-2.5 text-primary">
              <UploadCloud className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Community loadouts
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                Submit your favorite loadout
              </h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Build a hotbar, generate its share link, then upload it for our upcoming community showcase.
              </p>
            </div>
          </div>
          <Link
            href="/tools/loadout-builder"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Build and submit
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <FeedbackForm />
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                Profile settings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Update your name or password.
              </p>
            </div>
            <ProfileForm email={user.email ?? ''} displayName={displayName} />
          </section>
        </div>

        <section className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">Finished for now?</h2>
            <p className="text-sm text-muted-foreground">You can securely sign out of this device.</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </section>
      </div>
    </SitePage>
  )
}
