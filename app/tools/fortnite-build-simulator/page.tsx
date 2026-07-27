import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EPIC_DISCLAIMER } from '@/lib/site'
import { BUILD_SIM_FAQS, BUILD_SIM_SEO_SECTIONS } from '@/lib/build-simulator-seo'
import { BuildSimulatorClient } from './build-simulator-client'

export default function FortniteBuildSimulatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-3 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Build Simulator</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Fortnite <span className="text-primary">Build Simulator</span>
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Free in-browser Fortnite building practice — turbo-build walls, floors, ramps, and cones, edit tile
              patterns, break pieces, and move in first person. Built for warm-ups and muscle memory, not a 1:1 Creative
              physics clone.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <BuildSimulatorClient />

          <div className="mt-14 max-w-3xl space-y-12">
            {BUILD_SIM_SEO_SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section>
              <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Fortnite Build Simulator FAQ
              </h2>
              <dl className="space-y-5">
                {BUILD_SIM_FAQS.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-sm font-semibold text-foreground">{faq.question}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <p className="text-sm leading-relaxed text-muted-foreground">
              More practice tools:{' '}
              <Link href="/tools/keybinds" className="text-primary hover:underline">
                Fortnite keybinds
              </Link>
              ,{' '}
              <Link href="/codes" className="text-primary hover:underline">
                Creative codes
              </Link>
              , and the{' '}
              <Link href="/tools" className="text-primary hover:underline">
                full tools list
              </Link>
              .
            </p>
          </div>

          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">{EPIC_DISCLAIMER}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
