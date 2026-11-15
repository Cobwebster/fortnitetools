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

function looksLikeAdShell(el: HTMLElement) {
  if (el.closest(HEADER_SELECTOR) || el.closest('[role="dialog"]')) return false
  if (el.id === 'site-header' || el.tagName === 'HEADER' || el.tagName === 'NAV') return false

  const cls = typeof el.className === 'string' ? el.className : ''
  if (
    el.tagName === 'INS' ||
    cls.includes('adsbygoogle') ||
    cls.includes('google') ||
    el.id.includes('google') ||
    el.querySelector(
      'iframe[src*="googlesyndication"], iframe[id*="google_ads"], ins.adsbygoogle, .adsbygoogle'
    )
  ) {
    return true
  }
  return false
}

/** AdSense auto side-rails: fixed/sticky, hug left or right, not full-width anchors. */
function isAdSenseFixedRail(el: HTMLElement) {
  if (!looksLikeAdShell(el)) return false
  const style = window.getComputedStyle(el)
  if (style.position !== 'fixed' && style.position !== 'sticky') return false

  const rect = el.getBoundingClientRect()
  if (rect.height < 40 || rect.width < 40) return false
  const sideHug = rect.left <= 16 || rect.right >= window.innerWidth - 16
  const notFullBleed = rect.width < window.innerWidth * 0.45
  return sideHug && notFullBleed
}

function applyRailOffset(el: HTMLElement, offset: number) {
  const top = `${offset}px`
  if (el.style.top === top) return
  el.style.setProperty('top', top, 'important')
  el.style.setProperty('max-height', `calc(100vh - ${offset}px - 8px)`, 'important')
}

function walkAndPatch(root: ParentNode, offset: number) {
  if (root instanceof HTMLElement && isAdSenseFixedRail(root)) {
    applyRailOffset(root, offset)
  }
  if (!(root instanceof Element) && !(root instanceof DocumentFragment)) return

  const candidates = root.querySelectorAll<HTMLElement>(
    'ins.adsbygoogle, .adsbygoogle, [id*="google"], [class*="google"], iframe[src*="googlesyndication"]'
  )
  for (const node of candidates) {
    let cur: HTMLElement | null = node
    // Walk up a few parents — AdSense wraps the iframe in fixed shells
    for (let i = 0; i < 6 && cur; i++) {
      if (isAdSenseFixedRail(cur)) applyRailOffset(cur, offset)
      cur = cur.parentElement
    }
  }
}

function patchRails() {
  const offset = headerOffsetPx()
  setCssVar(offset)
  walkAndPatch(document.body, offset)
}

/**
 * Keeps AdSense auto side-rail ads (and our sticky panels via CSS var) below
 * the sticky navbar + creator strip so they don't tuck under the header.
 */
export function SiteHeaderOffset() {
  useEffect(() => {
    let raf = 0
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(patchRails)
    }

    schedule()
    // AdSense injects asynchronously — re-check a few times after load
    const timers = [400, 1200, 3000, 6000].map((ms) => window.setTimeout(schedule, ms))

    const header = document.querySelector(HEADER_SELECTOR)
    const ro = header ? new ResizeObserver(schedule) : null
    if (header) ro?.observe(header)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          schedule()
          return
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', schedule)
    window.addEventListener('orientationchange', schedule)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      ro?.disconnect()
      mo.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
    }
  }, [])

  return null
}
