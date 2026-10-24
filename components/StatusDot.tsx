import { STATUS_TONE_ICONS, type StatusToneKind } from '@/lib/status-tone'

export function StatusDot({ tone }: { tone: StatusToneKind }) {
  const icon = STATUS_TONE_ICONS[tone]
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon.src}
      alt=""
      title={icon.alt}
      className="h-6 w-6 shrink-0 object-contain drop-shadow-sm"
      aria-hidden
    />
  )
}
