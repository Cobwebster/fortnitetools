import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function SitePage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">{title}</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </section>
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose-site space-y-6 text-sm leading-relaxed text-muted-foreground">
          {children}
        </article>
      </main>
      <Footer />
    </>
  )
}
