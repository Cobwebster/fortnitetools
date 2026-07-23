import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BRAND_ICON } from '@/lib/site-icons'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BRAND_ICON}
          alt=""
          className="mb-6 h-24 w-24 object-contain drop-shadow-lg opacity-90"
          aria-hidden="true"
        />
        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight text-foreground">
          404
        </h1>
        <p className="mt-3 text-xl font-semibold text-foreground">Page Not Found</p>
        <p className="mt-2 text-muted-foreground max-w-md">
          The page you were looking for does not exist. It may have been moved or the URL might be wrong.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/guides"
            className="rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
          >
            Browse Guides
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
