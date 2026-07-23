'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TrendingUp, Minus } from 'lucide-react'

// Rough public-lobby benchmarks for context (not official Epic stats)
const BENCHMARKS = {
  kd:  [
    { label: 'Low',         min: 0,    max: 0.5,  color: 'text-red-400',    bg: 'bg-red-400/10',   border: 'border-red-400/30' },
    { label: 'Average',     min: 0.5,  max: 1.0,  color: 'text-yellow-400', bg: 'bg-yellow-400/10',border: 'border-yellow-400/30' },
    { label: 'Above Avg',   min: 1.0,  max: 2.0,  color: 'text-primary',    bg: 'bg-primary/10',   border: 'border-primary/30' },
    { label: 'Strong',      min: 2.0,  max: 4.0,  color: 'text-green-400',  bg: 'bg-green-400/10', border: 'border-green-400/30' },
    { label: 'Very High',   min: 4.0,  max: 999,  color: 'text-accent',     bg: 'bg-accent/10',    border: 'border-accent/30' },
  ],
  wr: [
    { label: 'Low',         min: 0,    max: 3,    color: 'text-red-400',    bg: 'bg-red-400/10',   border: 'border-red-400/30' },
    { label: 'Average',     min: 3,    max: 7,    color: 'text-yellow-400', bg: 'bg-yellow-400/10',border: 'border-yellow-400/30' },
    { label: 'Above Avg',   min: 7,    max: 15,   color: 'text-primary',    bg: 'bg-primary/10',   border: 'border-primary/30' },
    { label: 'Strong',      min: 15,   max: 25,   color: 'text-green-400',  bg: 'bg-green-400/10', border: 'border-green-400/30' },
    { label: 'Very High',   min: 25,   max: 100,  color: 'text-accent',     bg: 'bg-accent/10',    border: 'border-accent/30' },
  ],
}

function getBenchmark(val: number, type: 'kd' | 'wr') {
  return BENCHMARKS[type].find(b => val >= b.min && val < b.max) ?? BENCHMARKS[type][0]
}

function StatInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-muted px-4 py-3 text-lg font-bold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  )
}

function ResultCard({ label, value, benchmark, sublabel }: { label: string; value: string; benchmark: ReturnType<typeof getBenchmark>; sublabel?: string }) {
  return (
    <div className={`rounded-xl border ${benchmark.border} ${benchmark.bg} p-5 flex flex-col gap-2`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={`font-display text-5xl font-bold ${benchmark.color}`}>{value}</span>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${benchmark.bg} ${benchmark.color} border ${benchmark.border}`}>
          {benchmark.label}
        </span>
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  )
}

const CONTEXT_RANGES = [
  { name: 'Typical pubs', kd: '0.6–1.2', wr: '2–8%' },
  { name: 'Strong pubs', kd: '2–4', wr: '10–20%' },
  { name: 'High-level pubs', kd: '5+', wr: '20%+' },
  { name: 'Ranked (same K/D)', kd: 'Usually lower', wr: 'Placement-weighted' },
]

export default function KDCalculatorPage() {
  const [kills, setKills] = useState('')
  const [deaths, setDeaths] = useState('')
  const [wins, setWins] = useState('')
  const [matches, setMatches] = useState('')

  // projected stats
  const [projKills, setProjKills] = useState('')
  const [projMatches, setProjMatches] = useState('')

  const stats = useMemo(() => {
    const k = parseFloat(kills)
    const d = parseFloat(deaths)
    const w = parseFloat(wins)
    const m = parseFloat(matches)

    if (Number.isNaN(k) || Number.isNaN(d) || d <= 0) return null

    const kd = k / d
    const wr = m > 0 && !Number.isNaN(w) ? (w / m) * 100 : null
    const kpg = m > 0 ? k / m : null

    return { kd, wr, kpg }
  }, [kills, deaths, wins, matches])

  const projected = useMemo(() => {
    const pk = parseFloat(projKills)
    const pm = parseFloat(projMatches)
    const currentKills = parseFloat(kills)
    const currentDeaths = parseFloat(deaths)
    if (!stats || Number.isNaN(pk) || Number.isNaN(pm) || pm <= 0) return null
    if (Number.isNaN(currentKills) || Number.isNaN(currentDeaths)) return null
    // Assume ~1 death per future match (solo BR approximation)
    const newKills = currentKills + pk * pm
    const newDeaths = currentDeaths + pm
    return newKills / newDeaths
  }, [projKills, projMatches, stats, kills, deaths])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-foreground">K/D Calculator</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">K/D Calculator</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Calculate your Kill/Death ratio, win rate, and kills per game. Rough public-lobby ranges are shown for context — not official Epic rankings.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

            {/* Inputs */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground mb-5">Your Stats</h2>
                <div className="flex flex-col gap-4">
                  <StatInput label="Total Kills" value={kills} onChange={setKills} placeholder="e.g. 1240" />
                  <StatInput label="Total Deaths" value={deaths} onChange={setDeaths} placeholder="e.g. 800" />
                  <StatInput label="Total Wins" value={wins} onChange={setWins} placeholder="e.g. 45 (optional)" />
                  <StatInput label="Total Matches" value={matches} onChange={setMatches} placeholder="e.g. 600 (optional)" />
                </div>
              </div>

              {/* Projector */}
              {stats && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground mb-1">K/D Projector</h2>
                  <p className="text-xs text-muted-foreground mb-4">What would your K/D be if you avg X kills over Y future games?</p>
                  <div className="flex flex-col gap-3">
                    <StatInput label="Avg kills / game" value={projKills} onChange={setProjKills} placeholder="e.g. 4" />
                    <StatInput label="Future games" value={projMatches} onChange={setProjMatches} placeholder="e.g. 100" />
                    {projected !== null && (
                      <div className="mt-1 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Projected K/D</span>
                        <span className={`font-display text-2xl font-bold ${getBenchmark(projected, 'kd').color}`}>{projected.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {stats ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Kill / Death Ratio"
                      value={stats.kd.toFixed(2)}
                      benchmark={getBenchmark(stats.kd, 'kd')}
                      sublabel="avg player: 0.78"
                    />
                    {stats.wr !== null && (
                      <ResultCard
                        label="Win Rate"
                        value={`${stats.wr.toFixed(1)}%`}
                        benchmark={getBenchmark(stats.wr, 'wr')}
                        sublabel="rough pub context"
                      />
                    )}
                    {stats.kpg !== null && (
                      <ResultCard
                        label="Kills / Game"
                        value={stats.kpg.toFixed(2)}
                        benchmark={getBenchmark(stats.kpg, 'kd')}
                        sublabel="rough range only"
                      />
                    )}
                  </div>

                  {/* K/D explanation */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">K/D Breakdown</h3>
                    <div className="flex flex-col gap-2">
                      {BENCHMARKS.kd.map(b => (
                        <div key={b.label} className={`flex items-center justify-between rounded-lg px-3 py-2 ${stats.kd >= b.min && stats.kd < b.max ? `${b.bg} border ${b.border}` : ''}`}>
                          <div className="flex items-center gap-2">
                            {stats.kd >= b.min && stats.kd < b.max
                              ? <TrendingUp className={`h-3.5 w-3.5 ${b.color}`} />
                              : <Minus className="h-3.5 w-3.5 text-muted-foreground/30" />
                            }
                            <span className={`text-sm font-medium ${stats.kd >= b.min && stats.kd < b.max ? b.color : 'text-muted-foreground'}`}>{b.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{b.max === 999 ? `${b.min}+` : `${b.min} – ${b.max}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground text-sm">
                  Enter your kills and deaths to see your stats
                </div>
              )}

              {/* Context ranges */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Rough Context Ranges</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  Not official Epic percentiles — just ballpark ranges so the number has meaning. Ranked and input type change the picture a lot.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Context</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">K/D</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Win %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {CONTEXT_RANGES.map(p => (
                        <tr key={p.name}>
                          <td className="py-2 font-medium text-foreground">{p.name}</td>
                          <td className="py-2 text-right text-muted-foreground">{p.kd}</td>
                          <td className="py-2 text-right text-muted-foreground">{p.wr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SEO content */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">What Is a Good K/D in Fortnite?</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">The Average Player</h3>
                <p>Many public-lobby players sit around a 0.7–1.0 K/D. Below 1.0 is common in a 100-player battle royale where only one squad (or player) wins. Mode, input, and season matter more than a single career number.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">What Strong Looks Like</h3>
                <p>A 2.0+ K/D in pubs usually means you win a lot of fights. Competitive players can post much higher numbers in soft lobbies and much lower numbers in stacked ranked. Treat tracker pages as snapshots, not permanent skill ranks.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">How to Find Your Stats</h3>
                <p>Your career stats are available in the Fortnite main menu under Career &gt; Profile. You can also use third-party stat trackers like Fortnite Tracker or Tracker.gg to get detailed breakdowns by season, mode, and input type.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">K/D vs Win Rate</h3>
                <p>K/D and win rate measure different skills. A high K/D with a low win rate means you are aggressive but struggle to close out final circles. A high win rate with a lower K/D means you are playing smart, rotating safely, and picking your fights — which is actually the better approach for ranking up.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
