export type StatusToneKind = 'ok' | 'warn' | 'bad' | 'unknown'

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
