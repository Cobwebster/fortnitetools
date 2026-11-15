'use client'

import { useEffect } from 'react'

const HEADER_SELECTOR = '#site-header'
const PAD_PX = 12

function headerOffsetPx() {
  const header = document.querySelector(HEADER_SELECTOR)
  if (!(header instanceof HTMLElement)) return 112
  return Math.ceil(header.getBoundingClientRect().height) + PAD_PX
}

function setCssVar(px: number) {
  document.documentElement.style.setProperty('--site-header-height', `${px}px`)
}

/** AdSense Auto side rails use this class on a position:fixed <ins>. */
function sideRailNodes(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>('ins.adsbygoogle-noablate, ins.adsbygoogle')
  ).filter((el) => {
    if (el.closest(HEADER_SELECTOR) || el.closest('[role="dialog"]')) return false
    const style = window.getComputedStyle(el)
    if (style.position !== 'fixed') return false
    const rect = el.getBoundingClientRect()
    // Rails are narrow vertical units hugging a side — skip anchors / in-page units
    if (rect.width < 80 || rect.width > 400) return false
    if (rect.height < 80) return false
    return rect.left <= 120 || rect.right >= window.innerWidth - 120
  })
}

function applyRailOffset(el: HTMLElement, offset: number) {
  const top = `${offset}px`
  const maxH = `calc(100vh - ${offset}px - 8px)`
  // AdSense writes top with !important — we must match that or it wins.
  if (el.style.getPropertyValue('top') !== top || el.style.getPropertyPriority('top') !== 'important') {
    el.style.setProperty('top', top, 'important')
  }
  el.style.setProperty('max-height', maxH, 'important')
  el.style.setProperty('overflow', 'hidden', 'important')

  const host = el.querySelector<HTMLElement>('[id$="_host"]')
  if (host) {
    host.style.setProperty('max-height', maxH, 'important')
    host.style.setProperty('overflow', 'hidden', 'important')
  }
  const iframe = el.querySelector('iframe')
  if (iframe) {
    iframe.style.setProperty('max-height', maxH, 'important')
  }
}

function patchRails() {
  const offset = headerOffsetPx()
  setCssVar(offset)
  for (const el of sideRailNodes()) applyRailOffset(el, offset)
}

/**
 * Keeps AdSense Auto side-rail ads below the sticky navbar + creator strip.
 * AdSense rewrites `top` with !important on scroll, so we re-assert after layout.
 */
export function SiteHeaderOffset() {
  useEffect(() => {
    let raf = 0
    let scheduled = false
    const schedule = () => {
      if (scheduled) return
      scheduled = true
      raf = requestAnimationFrame(() => {
        scheduled = false
        patchRails()
      })
    }

    schedule()
    const timers = [300, 800, 1600, 3200, 6000, 10000].map((ms) => window.setTimeout(schedule, ms))

    const header = document.querySelector(HEADER_SELECTOR)
    const ro = header ? new ResizeObserver(schedule) : null
    if (header) ro?.observe(header)

    const mo = new MutationObserver(schedule)
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    })

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('orientationchange', schedule)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      ro?.disconnect()
      mo.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
    }
  }, [])

  return null
}
