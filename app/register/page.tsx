import type { Metadata } from 'next'
import { SitePage } from '@/components/site-page'
import { RegisterForm } from '@/components/auth-forms'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Create account',
  description: 'Create a FortniteTools account to save preferences and access member features.',
  path: '/register',
  keywords: ['fortnitetools register', 'fortnite tools sign up'],
  index: false,
})

export default function RegisterPage() {
  return (
    <SitePage
      title="Create account"
      description="Register with email and password. Confirmation may be required depending on your project settings."
    >
      <div className="mx-auto max-w-md not-prose">
        <RegisterForm />
      </div>
    </SitePage>
  )
}
