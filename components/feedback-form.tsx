'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { MessageSquareText, Send } from 'lucide-react'
import {
  submitSuggestionAction,
  type AuthActionState,
} from '@/app/auth/actions'

const initialState: AuthActionState = {}

export function FeedbackForm() {
  const searchParams = useSearchParams()
  const requestLeaderboard = searchParams.get('request') === 'leaderboard'
  const [state, formAction, pending] = useActionState(
    submitSuggestionAction,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  useEffect(() => {
    if (!requestLeaderboard) return
    const el = document.getElementById('feedback')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [requestLeaderboard])

  return (
    <form
      id="feedback"
      ref={formRef}
      action={formAction}
      className="scroll-mt-24 space-y-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/15 p-2.5 text-primary">
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Submit feedback
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {requestLeaderboard
              ? 'Request a leaderboard add — include your exact Epic display name and platform.'
              : 'Suggest a feature, report a problem, request a leaderboard add, or share an idea.'}
          </p>
        </div>
      </div>

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

      <div>
        <label htmlFor="feedback-category" className="mb-1.5 block text-sm font-semibold text-foreground">
          Feedback type
        </label>
        <select
          id="feedback-category"
          name="category"
          defaultValue={requestLeaderboard ? 'leaderboard' : 'suggestion'}
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        >
          <option value="suggestion">Feature suggestion</option>
          <option value="leaderboard">Leaderboard — track my name</option>
          <option value="bug">Bug report</option>
          <option value="other">Other feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="feedback-message" className="mb-1.5 block text-sm font-semibold text-foreground">
          Your feedback
        </label>
        <textarea
          id="feedback-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          defaultValue={
            requestLeaderboard
              ? 'Please add my Epic name to the /stats tracked leaderboards.\n\nEpic name: \nPlatform: Epic / PSN / Xbox\n'
              : undefined
          }
          placeholder="Tell us what you would like to see..."
          className="w-full resize-y rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          10–2,000 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {pending ? 'Sending…' : 'Send feedback'}
      </button>
    </form>
  )
}
