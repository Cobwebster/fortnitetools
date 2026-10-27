'use client'

import type { MatType } from '@/lib/build-simulator'

let ctx: AudioContext | null = null

function ac() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!C) return null
    ctx = new C()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  freqEnd?: number
) {
  const c = ac()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, c.currentTime)
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), c.currentTime + dur)
  g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start()
  o.stop(c.currentTime + dur + 0.02)
}

function thud(dur: number, gain: number, cutoff: number) {
  const c = ac()
  if (!c) return
  const n = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * dur)), c.sampleRate)
  const d = n.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
  const src = c.createBufferSource()
  src.buffer = n
  const f = c.createBiquadFilter()
  f.type = 'lowpass'
  f.frequency.setValueAtTime(cutoff, c.currentTime)
  const g = c.createGain()
  g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
  src.connect(f)
  f.connect(g)
  g.connect(c.destination)
  src.start()
}

export function sfxPlace(mat: MatType) {
  if (mat === 'wood') {
    thud(0.09, 0.16, 900)
    tone(170, 0.08, 'triangle', 0.07, 80)
  } else if (mat === 'brick') {
    thud(0.11, 0.18, 520)
    tone(120, 0.09, 'sine', 0.08, 60)
  } else {
    thud(0.07, 0.12, 1400)
    tone(480, 0.05, 'square', 0.03, 220)
    tone(210, 0.06, 'triangle', 0.045)
  }
}

export function sfxEdit() {
  tone(880, 0.05, 'sine', 0.045, 1320)
}

export function sfxSwing() {
  tone(210, 0.06, 'sawtooth', 0.04, 90)
}

export function sfxBreak() {
  tone(160, 0.1, 'square', 0.07, 55)
  tone(70, 0.12, 'triangle', 0.06)
}

export function sfxReset() {
  tone(640, 0.04, 'sine', 0.03)
}
