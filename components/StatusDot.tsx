import type { StatusToneKind } from '@/lib/status-tone'

export function StatusDot({ tone }: { tone: StatusToneKind }) {
  const cls =
    tone === 'ok'
      ? 'bg-emerald-400'
      : tone === 'warn'
        ? 'bg-amber-400'
        : tone === 'bad'
          ? 'bg-rose-500'
          : 'bg-muted-foreground'
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${cls}`} aria-hidden />
}
