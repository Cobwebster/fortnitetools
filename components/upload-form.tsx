'use client'

import { useActionState, useEffect, useRef } from 'react'
import Link from '@/components/link'
import { ExternalLink, UploadCloud, Video } from 'lucide-react'
import {
  submitCommunityAction,
  type UploadActionState,
} from '@/app/upload/actions'
import {
  BODY_MAX,
  COMMUNITY_KIND_META,
  DEFAULT_BODY_MIN,
  GUIDE_AUDIENCES,
  GUIDE_BODY_MIN,
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_LABELS,
  GUIDE_DIFFICULTIES,
  GUIDE_MODES,
  RELATED_TOOL_OPTIONS,
  type CommunityKind,
} from '@/lib/community-submissions'

const initialState: UploadActionState = {}

const fieldClass =
  'w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'

export function UploadForm({
  kind,
  defaultCreatorName = '',
  signedIn,
}: {
  kind: CommunityKind
  defaultCreatorName?: string
  signedIn: boolean
}) {
  const meta = COMMUNITY_KIND_META[kind]
  const [state, action, pending] = useActionState(submitCommunityAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const isGuide = kind === 'guide'
  const bodyMin = isGuide ? GUIDE_BODY_MIN : DEFAULT_BODY_MIN

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <input type="hidden" name="kind" value={kind} />

      {!signedIn ? (
        <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
          <p className="font-semibold">Sign in to post</p>
          <p className="mt-1 text-muted-foreground">
            {isGuide
              ? 'Guides go on the public feed. Free account required — then you can promote your YouTube and socials on the same post.'
              : 'The feed is public. Uploads need a free account so we can moderate spam.'}
          </p>
          <Link
            href={`/login?next=${encodeURIComponent(`/upload/${kind}`)}`}
            className="mt-3 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
          >
            Sign in to upload
          </Link>
        </div>
      ) : null}

      {state.error ? (
        <p
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p
          className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
          role="status"
        >
          {state.success}
        </p>
      ) : null}

      {isGuide ? (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Creator-friendly guides</p>
          <p className="mt-1">
            Write a real walkthrough players can follow. Add your YouTube video or socials below —
            we show them on your guide card so readers can subscribe and support you.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="creatorName" className="mb-1.5 block text-sm font-semibold text-foreground">
            Display name / creator name
          </label>
          <input
            id="creatorName"
            name="creatorName"
            required
            minLength={2}
            maxLength={40}
            defaultValue={defaultCreatorName}
            disabled={!signedIn}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-foreground">
            {isGuide ? 'Guide title' : 'Title'}
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            maxLength={120}
            placeholder={meta.placeholders.title}
            disabled={!signedIn}
            className={fieldClass}
          />
        </div>
      </div>

      <KindFields kind={kind} disabled={!signedIn} />

      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-semibold text-foreground">
          {isGuide ? 'Full guide' : 'Details'}
        </label>
        <textarea
          id="body"
          name="body"
          required
          minLength={bodyMin}
          maxLength={BODY_MAX}
          rows={isGuide ? 16 : 5}
          placeholder={meta.placeholders.body}
          disabled={!signedIn}
          className={`${fieldClass} ${isGuide ? 'min-h-[22rem] font-normal leading-relaxed' : ''}`}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {isGuide
            ? `Minimum ${GUIDE_BODY_MIN} characters · up to ${BODY_MAX.toLocaleString()}. Use clear steps; you can mention timestamps if you linked a video.`
            : `At least ${DEFAULT_BODY_MIN} characters · max ${BODY_MAX.toLocaleString()}.`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!signedIn || pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <UploadCloud className="h-4 w-4" aria-hidden="true" />
          {pending ? 'Posting…' : isGuide ? 'Publish guide' : `Post ${meta.label.toLowerCase()}`}
        </button>
        <Link href={meta.relatedHref} className="text-sm font-semibold text-primary hover:underline">
          {meta.relatedLabel}
        </Link>
      </div>
    </form>
  )
}

function KindFields({ kind, disabled }: { kind: CommunityKind; disabled: boolean }) {
  switch (kind) {
    case 'guide':
      return (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-foreground">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue="how-to"
                disabled={disabled}
                className={fieldClass}
              >
                {GUIDE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {GUIDE_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="summary" className="mb-1.5 block text-sm font-semibold text-foreground">
                Meta summary (for Google + feed)
              </label>
              <input
                id="summary"
                name="summary"
                required
                minLength={40}
                maxLength={280}
                disabled={disabled}
                placeholder="What someone searching Google should understand in one line"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="mb-1.5 block text-sm font-semibold text-foreground">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                defaultValue="beginner"
                disabled={disabled}
                className={fieldClass}
              >
                {GUIDE_DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="audience" className="mb-1.5 block text-sm font-semibold text-foreground">
                Audience
              </label>
              <select
                id="audience"
                name="audience"
                defaultValue="casual"
                disabled={disabled}
                className={fieldClass}
              >
                {GUIDE_AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="relatedTool" className="mb-1.5 block text-sm font-semibold text-foreground">
                Related FortniteTools page
              </label>
              <select id="relatedTool" name="relatedTool" disabled={disabled} className={fieldClass}>
                <option value="">None</option>
                {RELATED_TOOL_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="readMinutes" className="mb-1.5 block text-sm font-semibold text-foreground">
                Read time (minutes)
              </label>
              <input
                id="readMinutes"
                name="readMinutes"
                type="number"
                min={1}
                max={60}
                defaultValue={5}
                disabled={disabled}
                className={fieldClass}
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">Modes covered</legend>
            <div className="flex flex-wrap gap-3">
              {GUIDE_MODES.map((mode) => (
                <label key={mode} className="inline-flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="modes"
                    value={mode}
                    defaultChecked={mode === 'br'}
                    disabled={disabled}
                    className="accent-cyan-400"
                  />
                  {mode.replace('_', ' ')}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="tags" className="mb-1.5 block text-sm font-semibold text-foreground">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              name="tags"
              required
              disabled={disabled}
              placeholder="pump, ranked, override, shockwave"
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-muted-foreground">At least 2 tags · max 8</p>
          </div>

          <div>
            <label htmlFor="outline" className="mb-1.5 block text-sm font-semibold text-foreground">
              Step outline
            </label>
            <textarea
              id="outline"
              name="outline"
              required
              minLength={20}
              maxLength={800}
              rows={4}
              disabled={disabled}
              placeholder={'1. Drop path\n2. First fights\n3. Loadout priority\n4. Rotate timing'}
              className={fieldClass}
            />
          </div>

          <fieldset className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 space-y-3">
            <legend className="px-1 text-sm font-bold uppercase tracking-wider text-foreground">
              FAQ (optional · great for Google)
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="faq1q" disabled={disabled} placeholder="FAQ 1 question" className={fieldClass} />
              <input name="faq1a" disabled={disabled} placeholder="FAQ 1 answer" className={fieldClass} />
              <input name="faq2q" disabled={disabled} placeholder="FAQ 2 question" className={fieldClass} />
              <input name="faq2a" disabled={disabled} placeholder="FAQ 2 answer" className={fieldClass} />
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
            <legend className="flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-wider text-primary">
              <Video className="h-4 w-4" aria-hidden="true" />
              Promote your video &amp; socials
            </legend>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              Optional but encouraged. Links show on your public guide page so players can subscribe,
              follow, or hop into your Discord.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <SocialField
                id="youtube"
                name="youtube"
                label="YouTube video or channel"
                placeholder="https://youtube.com/…"
                disabled={disabled}
              />
              <SocialField
                id="twitch"
                name="twitch"
                label="Twitch"
                placeholder="https://twitch.tv/…"
                disabled={disabled}
              />
              <SocialField
                id="tiktok"
                name="tiktok"
                label="TikTok"
                placeholder="https://tiktok.com/@…"
                disabled={disabled}
              />
              <SocialField
                id="twitter"
                name="twitter"
                label="X / Twitter"
                placeholder="https://x.com/…"
                disabled={disabled}
              />
              <SocialField
                id="discord"
                name="discord"
                label="Discord invite"
                placeholder="https://discord.gg/…"
                disabled={disabled}
              />
              <SocialField
                id="website"
                name="website"
                label="Website / Linktree"
                placeholder="https://…"
                disabled={disabled}
              />
            </div>
          </fieldset>
        </div>
      )
    case 'loadout':
      return (
        <div>
          <label htmlFor="loadoutUrl" className="mb-1.5 block text-sm font-semibold text-foreground">
            Loadout share link
          </label>
          <input
            id="loadoutUrl"
            name="loadoutUrl"
            required
            disabled={disabled}
            placeholder="/tools/loadout-builder?sg=…"
            className={fieldClass}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Build it in the loadout builder, copy the inventory link, paste here.
          </p>
        </div>
      )
    case 'drop_spot':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="poi" className="mb-1.5 block text-sm font-semibold text-foreground">
              POI / landing
            </label>
            <input id="poi" name="poi" required disabled={disabled} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="mode" className="mb-1.5 block text-sm font-semibold text-foreground">
              Mode
            </label>
            <select id="mode" name="mode" defaultValue="br" disabled={disabled} className={fieldClass}>
              <option value="br">Battle Royale</option>
              <option value="zero_build">Zero Build</option>
              <option value="ranked">Ranked</option>
              <option value="reload">Reload</option>
            </select>
          </div>
        </div>
      )
    case 'map_code':
    case 'xp_map':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="mapCode" className="mb-1.5 block text-sm font-semibold text-foreground">
              Map code
            </label>
            <input
              id="mapCode"
              name="mapCode"
              required
              disabled={disabled}
              placeholder="1234-5678-9012"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="islandName" className="mb-1.5 block text-sm font-semibold text-foreground">
              Island name (optional)
            </label>
            <input id="islandName" name="islandName" disabled={disabled} className={fieldClass} />
          </div>
        </div>
      )
    case 'keybinds':
      return (
        <div>
          <label htmlFor="layout" className="mb-1.5 block text-sm font-semibold text-foreground">
            Layout type
          </label>
          <select id="layout" name="layout" defaultValue="custom" disabled={disabled} className={fieldClass}>
            <option value="custom">Custom</option>
            <option value="pro_inspired">Pro-inspired</option>
            <option value="controller">Controller</option>
          </select>
        </div>
      )
    case 'fps_preset':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fpsPreset" className="mb-1.5 block text-sm font-semibold text-foreground">
              Preset style
            </label>
            <select
              id="fpsPreset"
              name="fpsPreset"
              defaultValue="competitive"
              disabled={disabled}
              className={fieldClass}
            >
              <option value="competitive">Competitive</option>
              <option value="balanced">Balanced</option>
              <option value="quality">Quality</option>
            </select>
          </div>
          <div>
            <label htmlFor="refresh" className="mb-1.5 block text-sm font-semibold text-foreground">
              Monitor Hz (optional)
            </label>
            <input id="refresh" name="refresh" disabled={disabled} placeholder="144 / 240 / 360" className={fieldClass} />
          </div>
        </div>
      )
    case 'settings':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="platform" className="mb-1.5 block text-sm font-semibold text-foreground">
              Platform
            </label>
            <select id="platform" name="platform" defaultValue="pc" disabled={disabled} className={fieldClass}>
              <option value="pc">PC (mouse)</option>
              <option value="controller">Controller</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          <div>
            <label htmlFor="dpi" className="mb-1.5 block text-sm font-semibold text-foreground">
              DPI (optional)
            </label>
            <input id="dpi" name="dpi" disabled={disabled} placeholder="800" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="sens" className="mb-1.5 block text-sm font-semibold text-foreground">
              Sens / cm/360
            </label>
            <input id="sens" name="sens" disabled={disabled} placeholder="X/Y or cm/360" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="builds" className="mb-1.5 block text-sm font-semibold text-foreground">
              Build / edit multipliers
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input id="builds" name="builds" disabled={disabled} placeholder="Build %" className={fieldClass} />
              <input id="edits" name="edits" disabled={disabled} placeholder="Edit %" className={fieldClass} />
            </div>
          </div>
        </div>
      )
    case 'tip':
      return (
        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-semibold text-foreground">
            Topic
          </label>
          <select id="topic" name="topic" defaultValue="general" disabled={disabled} className={fieldClass}>
            <option value="general">General</option>
            <option value="ranked">Ranked</option>
            <option value="drop">Drops</option>
            <option value="aim">Aim / gunplay</option>
            <option value="builds">Builds / edits</option>
            <option value="zone">Zone / rotates</option>
          </select>
        </div>
      )
    case 'weapon_take':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="weapon" className="mb-1.5 block text-sm font-semibold text-foreground">
              Weapon
            </label>
            <input id="weapon" name="weapon" required disabled={disabled} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="tier" className="mb-1.5 block text-sm font-semibold text-foreground">
              Tier
            </label>
            <select id="tier" name="tier" defaultValue="A" disabled={disabled} className={fieldClass}>
              {['S', 'A', 'B', 'C', 'D'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      )
    case 'clip':
      return (
        <div>
          <label htmlFor="clipUrl" className="mb-1.5 block text-sm font-semibold text-foreground">
            Clip URL
          </label>
          <input
            id="clipUrl"
            name="clipUrl"
            type="url"
            required
            disabled={disabled}
            placeholder="https://…"
            className={fieldClass}
          />
        </div>
      )
    case 'combo':
      return (
        <div>
          <label htmlFor="difficulty" className="mb-1.5 block text-sm font-semibold text-foreground">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue="beginner"
            disabled={disabled}
            className={fieldClass}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      )
    default:
      return null
  }
}

function SocialField({
  id,
  name,
  label,
  placeholder,
  disabled,
}: {
  id: string
  name: string
  label: string
  placeholder: string
  disabled: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {label}
        <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
      </label>
      <input
        id={id}
        name={name}
        type="url"
        disabled={disabled}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  )
}
