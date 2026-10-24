export type StatusToneKind = 'ok' | 'warn' | 'bad' | 'unknown'

/** Real Fortnite sprites — no generic status dots. */
export const STATUS_TONE_ICONS: Record<StatusToneKind, { src: string; alt: string }> = {
  ok: { src: '/images/icons/umbrella.png', alt: 'Victory Royale umbrella' },
  warn: { src: '/images/icons/storm.png', alt: 'Storm cloud' },
  bad: { src: '/images/loadout/shockwave.png', alt: 'Shockwave grenade' },
  unknown: { src: '/images/loadout/pulse_scanner.png', alt: 'Pulse Scanner' },
}

/** Map Epic component / indicator status strings to a UI tone. Safe for server + client. */
export function componentStatusTone(status: string): StatusToneKind {
  const s = status.toLowerCase()
  if (s.includes('operational') || s === 'none') return 'ok'
  if (s.includes('degraded') || s.includes('partial') || s.includes('maintenance') || s.includes('minor')) {
    return 'warn'
  }
  if (s.includes('major') || s.includes('critical') || s.includes('outage') || s.includes('down')) {
    return 'bad'
  }
  return 'unknown'
}
