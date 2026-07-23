'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Check, Info } from 'lucide-react'

type Tier = 'competitive' | 'balanced' | 'quality'

const TIERS: { id: Tier; label: string; desc: string }[] = [
  { id: 'competitive', label: 'Competitive / Max FPS', desc: 'Lowest settings. Prioritises frame rate — common among competitive players.' },
  { id: 'balanced',    label: 'Balanced',             desc: 'Good frame rate with reasonable visuals. Solid default for mid-range PCs.' },
  { id: 'quality',     label: 'Quality / Casual',     desc: 'Higher visuals, lower FPS. For players who care more about how the game looks.' },
]

type Setting = {
  category: string
  name: string
  competitive: string
  balanced: string
  quality: string
  why: string
  impact: 'high' | 'medium' | 'low'
}

const SETTINGS: Setting[] = [
  // Display
  { category: 'Display',   name: 'Window Mode',           competitive: 'Fullscreen',        balanced: 'Fullscreen',         quality: 'Fullscreen',        why: 'Fullscreen gives the lowest input latency. Never use Windowed or Borderless in a competitive context.', impact: 'high' },
  { category: 'Display',   name: 'Resolution',            competitive: '1920×1080',          balanced: '1920×1080',          quality: '2560×1440',         why: 'Higher resolution costs GPU performance. 1080p is the standard for competitive play.', impact: 'high' },
  { category: 'Display',   name: 'Frame Rate Limit',      competitive: 'Unlimited or 240',   balanced: 'Monitor refresh',    quality: 'Monitor refresh',   why: 'Uncapped FPS reduces latency even above your monitor\'s refresh rate due to how GPU rendering buffers work.', impact: 'medium' },
  { category: 'Display',   name: 'Motion Blur',           competitive: 'Off',               balanced: 'Off',                quality: 'Off',               why: 'Motion blur has zero gameplay benefit and actively obscures enemies during fast movement. Always turn this off regardless of preset.', impact: 'high' },
  { category: 'Display',   name: 'Show FPS',              competitive: 'On',                balanced: 'On',                 quality: 'Off',               why: 'Knowing your current FPS helps you identify drops during fights or in crowded areas.', impact: 'low' },
  // Graphics Quality
  { category: 'Graphics',  name: '3D Resolution',         competitive: '100%',              balanced: '100%',               quality: '100%',              why: 'Never lower 3D resolution below 100% — it makes enemies look blurry and is the single biggest visual hit to clarity.', impact: 'high' },
  { category: 'Graphics',  name: 'View Distance',         competitive: 'Medium or Far',     balanced: 'Far',                quality: 'Epic',              why: 'Medium is fine for most fights. Setting this too low can hide distant players and storm details.', impact: 'medium' },
  { category: 'Graphics',  name: 'Shadows',               competitive: 'Off',               balanced: 'Low',                quality: 'Medium',            why: 'Shadows are the single biggest FPS cost in Fortnite. Turning them off can gain 30–60 FPS on most GPUs.', impact: 'high' },
  { category: 'Graphics',  name: 'Anti-Aliasing',         competitive: 'Off or FXAA',       balanced: 'FXAA',               quality: 'TAA',               why: 'TAA softens the image, which can make spotting enemies slightly harder. FXAA is a good middle ground.', impact: 'medium' },
  { category: 'Graphics',  name: 'Textures',              competitive: 'Low',               balanced: 'Medium',             quality: 'High or Epic',      why: 'Textures mostly cost VRAM, not frame rate. On GPUs with 6GB+ VRAM, Medium textures cost almost nothing.', impact: 'low' },
  { category: 'Graphics',  name: 'Effects',               competitive: 'Low',               balanced: 'Medium',             quality: 'Epic',              why: 'Effects control explosion and storm visuals. Low is recommended to reduce visual noise during fights.', impact: 'medium' },
  { category: 'Graphics',  name: 'Post Processing',       competitive: 'Low',               balanced: 'Low',                quality: 'Medium',            why: 'Post processing adds lens effects and colour grading. Low improves clarity and saves GPU resources.', impact: 'medium' },
  { category: 'Graphics',  name: 'Rendering Mode',        competitive: 'Performance',       balanced: 'Performance',        quality: 'DirectX 12',        why: 'Performance mode bypasses Unreal Engine\'s renderer for a massive FPS boost, especially on older hardware. Use it unless you want ray tracing.', impact: 'high' },
  // Advanced
  { category: 'Advanced',  name: 'NVIDIA Reflex',         competitive: 'On + Boost',        balanced: 'On',                 quality: 'On',                why: 'NVIDIA Reflex reduces system latency by up to 50ms on supported GPUs (GTX 900 series and above). Always enable it.', impact: 'high' },
  { category: 'Advanced',  name: 'VSync',                 competitive: 'Off',               balanced: 'Off',                quality: 'Off',               why: 'VSync caps FPS to your monitor refresh and adds input lag. It should be off in all scenarios — screen tearing is preferable to added latency.', impact: 'high' },
  { category: 'Advanced',  name: 'Colorblind Mode',       competitive: 'Deuteranope 5–8',   balanced: 'Off',                quality: 'Off',               why: 'Many pros use Deuteranope at strength 5–8 — it makes enemy outlines and loot contrast more visible, even for players without colour blindness.', impact: 'medium' },
  // Audio
  { category: 'Audio',     name: 'Sound Quality',         competitive: 'Low',               balanced: 'Medium',             quality: 'High',              why: 'Lower sound quality actually makes footsteps and chest audio pop out more clearly. High quality adds reverb that can mask enemy sounds.', impact: 'medium' },
  { category: 'Audio',     name: '3D Headphones',         competitive: 'On',                balanced: 'On',                 quality: 'On',                why: 'Enables binaural audio processing for accurate directional sound. Critical for hearing exactly which direction footsteps come from.', impact: 'high' },
  { category: 'Audio',     name: 'Subtitles',             competitive: 'Off',               balanced: 'Off',                quality: 'Off',               why: 'Subtitles add UI clutter with no gameplay benefit in Fortnite.', impact: 'low' },
]

const IMPACT_LABELS: Record<Setting['impact'], string> = {
  high: 'High Impact',
  medium: 'Medium Impact',
  low: 'Low Impact',
}
const IMPACT_COLORS: Record<Setting['impact'], string> = {
  high:   'text-accent border-accent/30 bg-accent/10',
  medium: 'text-primary border-primary/30 bg-primary/10',
  low:    'text-muted-foreground border-border bg-muted/50',
}

const CATEGORIES = Array.from(new Set(SETTINGS.map(s => s.category)))

export default function FPSSettingsPage() {
  const [tier, setTier] = useState<Tier>('competitive')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All' ? SETTINGS : SETTINGS.filter(s => s.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-foreground">FPS & Settings Guide</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
              Best Fortnite <span className="text-primary">Settings</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every graphics, display, and audio setting explained — with competitive, balanced, and quality presets. Filter by what matters most to your PC and playstyle.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

          {/* Tier selector */}
          <div className="mb-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Choose Your Preset</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TIERS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    tier === t.id
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-sm font-bold uppercase tracking-wide">{t.label}</span>
                    {tier === t.id && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs leading-relaxed">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Settings table */}
          <div className="flex flex-col gap-2">
            {filtered.map(setting => {
              const recommended = setting[tier]
              const isOpen = expanded === setting.name
              return (
                <div key={setting.name} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : setting.name)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-foreground">{setting.name}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${IMPACT_COLORS[setting.impact]}`}>
                          {IMPACT_LABELS[setting.impact]}
                        </span>
                        <span className="text-xs text-muted-foreground">{setting.category}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {recommended}
                      </span>
                      <Info className={`h-4 w-4 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border bg-muted/20 px-5 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{setting.why}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs">
                        <span className="text-muted-foreground">Competitive: <span className="font-semibold text-foreground">{setting.competitive}</span></span>
                        <span className="text-muted-foreground">Balanced: <span className="font-semibold text-foreground">{setting.balanced}</span></span>
                        <span className="text-muted-foreground">Quality: <span className="font-semibold text-foreground">{setting.quality}</span></span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* SEO content */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">How to Get More FPS in Fortnite</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Enable Performance Mode</h3>
                <p>The single biggest FPS gain available in Fortnite is switching to Performance rendering mode under Advanced Graphics. This bypasses Unreal Engine&apos;s DirectX renderer and can double frame rates on some systems. It requires a one-time asset download of around 3–5 GB.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Turn Off Shadows First</h3>
                <p>Shadows are the most GPU-intensive setting in Fortnite. Disabling shadows entirely — setting them to Off — typically gains 30 to 60 FPS on mid-range hardware. This is the first thing to do if you are experiencing frame rate issues during builds or large team fights.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Windows Settings That Help</h3>
                <p>Outside of Fortnite, make sure your GPU is set to Maximum Performance in NVIDIA or AMD control panel, Game Mode is enabled in Windows, and that the game is running with High priority in Task Manager. Also ensure your monitor is set to its maximum refresh rate in Windows Display settings.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Why Pros Use Low Settings</h3>
                <p>Many competitive players use low graphics settings because higher FPS can reduce input latency. At 240 FPS, a frame is ~4ms; at 60 FPS, ~16ms. That difference is noticeable for aim and building — but comfort and visuals still matter if you are not chasing tournament latency.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
