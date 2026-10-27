'use client'

import * as THREE from 'three'
import type { MatType } from '@/lib/build-simulator'

/** Procedural maps inspired by Fortnite prefab readability — not Epic assets. */

function makeCanvas(size = 256) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  return { canvas, ctx, size }
}

function toTexture(canvas: HTMLCanvasElement, wrap: THREE.Wrapping = THREE.RepeatWrapping) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = wrap
  tex.wrapT = wrap
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function grassMap() {
  const { canvas, ctx, size } = makeCanvas(512)
  const rnd = mulberry32(0x6f2a11)
  ctx.fillStyle = '#4e9444'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 140; i++) {
    const x = rnd() * size
    const y = rnd() * size
    const r = 8 + rnd() * 22
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rnd() > 0.5 ? 'rgba(72, 148, 62, 0.45)' : 'rgba(42, 108, 48, 0.4)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  for (let i = 0; i < 9000; i++) {
    const x = rnd() * size
    const y = rnd() * size
    ctx.strokeStyle = rnd() > 0.55 ? 'rgba(28, 78, 26, 0.28)' : 'rgba(186, 214, 96, 0.16)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (rnd() - 0.5) * 2.2, y - 2 - rnd() * 4)
    ctx.stroke()
  }
  return toTexture(canvas)
}

function cloudMap() {
  const { canvas, ctx, size } = makeCanvas(512)
  ctx.clearRect(0, 0, size, size)
  const blobs: [number, number, number][] = [
    [0.5, 0.56, 0.3],
    [0.34, 0.54, 0.22],
    [0.66, 0.52, 0.24],
    [0.44, 0.42, 0.17],
    [0.58, 0.4, 0.15],
    [0.26, 0.6, 0.13],
    [0.74, 0.58, 0.14],
    [0.5, 0.66, 0.16],
  ]
  for (const [ux, uy, ur] of blobs) {
    const x = ux * size
    const y = uy * size
    const r = ur * size
    const g = ctx.createRadialGradient(x, y * 0.96, r * 0.12, x, y, r)
    g.addColorStop(0, 'rgba(255,255,255,0.95)')
    g.addColorStop(0.4, 'rgba(236, 244, 255, 0.58)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  return toTexture(canvas, THREE.ClampToEdgeWrapping)
}

let grassTex: THREE.CanvasTexture | null = null
let cloudTex: THREE.CanvasTexture | null = null

export function getGrassTexture() {
  if (!grassTex) grassTex = grassMap()
  return grassTex
}

export function getCloudTexture() {
  if (!cloudTex) cloudTex = cloudMap()
  return cloudTex
}

function tileGridMap() {
  const { canvas, ctx, size } = makeCanvas(512)
  ctx.clearRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
  ctx.lineWidth = 2
  ctx.strokeRect(1.5, 1.5, size - 3, size - 3)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(size / 2, 0)
  ctx.lineTo(size / 2, size)
  ctx.moveTo(0, size / 2)
  ctx.lineTo(size, size / 2)
  ctx.stroke()
  return toTexture(canvas)
}

let gridTex: THREE.CanvasTexture | null = null

export function getTileGridTexture() {
  if (!gridTex) gridTex = tileGridMap()
  return gridTex
}

/** Fortnite wood reads as plywood sheets in a timber frame — not Minecraft planks. */
function woodMap() {
  const { canvas, ctx, size } = makeCanvas()
  const rnd = mulberry32(0xc4a06a)
  ctx.fillStyle = '#c9944c'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 420; i++) {
    ctx.fillStyle = rnd() > 0.5 ? 'rgba(168, 110, 48, 0.22)' : 'rgba(232, 190, 118, 0.18)'
    ctx.fillRect(rnd() * size, rnd() * size, 6 + rnd() * 18, 4 + rnd() * 10)
  }

  const panels = 3
  const pw = size / panels
  for (let p = 0; p < panels; p++) {
    const x = p * pw
    ctx.fillStyle = p % 2 === 0 ? 'rgba(90, 50, 18, 0.08)' : 'rgba(255, 230, 170, 0.07)'
    ctx.fillRect(x, 0, pw, size)
    ctx.fillStyle = 'rgba(70, 42, 16, 0.45)'
    ctx.fillRect(x + pw - 2, 0, 2, size)
    ctx.strokeStyle = 'rgba(110, 68, 28, 0.22)'
    ctx.lineWidth = 1
    for (let g = 0; g < 14; g++) {
      const gx = x + 8 + ((g * 17) % (pw - 16))
      ctx.beginPath()
      ctx.moveTo(gx, 0)
      ctx.bezierCurveTo(gx + 3, size * 0.35, gx - 4, size * 0.7, gx + 1, size)
      ctx.stroke()
    }
  }

  const vignette = ctx.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.72)
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(70, 40, 12, 0.16)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)
  return toTexture(canvas)
}

function stoneMap() {
  const { canvas, ctx, size } = makeCanvas()
  ctx.fillStyle = '#6d5348'
  ctx.fillRect(0, 0, size, size)

  const rows = 8
  const cols = 4
  const bh = size / rows
  const bw = size / cols
  const tones = ['#c56a48', '#b45c3e', '#d07854', '#a8523a', '#c86e50']
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : bw / 2
    for (let c = -1; c <= cols; c++) {
      const x = c * bw + offset
      const y = r * bh
      ctx.fillStyle = tones[(r * 5 + c + 7) % tones.length]
      ctx.fillRect(x + 1, y + 1, bw - 2, bh - 2)
      ctx.strokeStyle = '#5a463e'
      ctx.lineWidth = 2
      ctx.strokeRect(x + 0.5, y + 0.5, bw - 1, bh - 1)
      ctx.fillStyle = 'rgba(255, 200, 160, 0.12)'
      ctx.fillRect(x + 2, y + 2, bw * 0.45, 2)
    }
  }
  return toTexture(canvas)
}

function metalMap() {
  const { canvas, ctx, size } = makeCanvas()
  const base = ctx.createLinearGradient(0, 0, size, 0)
  base.addColorStop(0, '#6d8498')
  base.addColorStop(0.5, '#97aec0')
  base.addColorStop(1, '#62788c')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)

  const ribs = 12
  const rw = size / ribs
  for (let i = 0; i < ribs; i++) {
    const x = i * rw
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(20,36,52,0.16)'
    ctx.fillRect(x, 0, rw * 0.55, size)
    ctx.fillStyle = 'rgba(18, 28, 40, 0.28)'
    ctx.fillRect(x + rw * 0.55, 0, 2, size)
  }
  for (let y = 18; y < size; y += 36) {
    for (let x = 10; x < size; x += rw) {
      ctx.fillStyle = '#d2dee8'
      ctx.beginPath()
      ctx.arc(x, y, 2.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#3a4a58'
      ctx.beginPath()
      ctx.arc(x, y, 1.1, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  return toTexture(canvas)
}

const cache: Partial<Record<MatType, THREE.CanvasTexture>> = {}

export function getMatTexture(mat: MatType): THREE.CanvasTexture {
  if (!cache[mat]) {
    cache[mat] = mat === 'wood' ? woodMap() : mat === 'brick' ? stoneMap() : metalMap()
  }
  return cache[mat]!
}

export const MAT_ROUGHNESS: Record<MatType, number> = {
  wood: 0.84,
  brick: 0.9,
  metal: 0.32,
}

export const MAT_METALNESS: Record<MatType, number> = {
  wood: 0.02,
  brick: 0.04,
  metal: 0.7,
}

/** Timber / masonry / steel frame around Fortnite-style prefabs. */
export const TRIM_HEX: Record<MatType, string> = {
  wood: '#5a381c',
  brick: '#4e3c36',
  metal: '#3a4652',
}
