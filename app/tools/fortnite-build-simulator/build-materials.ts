'use client'

import * as THREE from 'three'
import type { MatType } from '@/lib/build-simulator'

/** Original procedural maps inspired by Fortnite wood / stone / metal readability — not Epic assets. */

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
  ctx.fillStyle = '#4c8f42'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 90; i++) {
    const x = rnd() * size
    const y = rnd() * size
    const r = 16 + rnd() * 48
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rnd() > 0.45 ? 'rgba(70, 150, 58, 0.55)' : 'rgba(38, 110, 42, 0.5)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  for (let i = 0; i < 2200; i++) {
    const x = rnd() * size
    const y = rnd() * size
    ctx.strokeStyle = rnd() > 0.5 ? 'rgba(32, 82, 28, 0.32)' : 'rgba(196, 220, 110, 0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (rnd() - 0.5) * 5, y - 3 - rnd() * 7)
    ctx.stroke()
  }

  const shade = ctx.createLinearGradient(0, 0, size, size)
  shade.addColorStop(0, 'rgba(255,255,255,0.05)')
  shade.addColorStop(1, 'rgba(20,50,18,0.1)')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, size, size)
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

function woodMap() {
  const { canvas, ctx, size } = makeCanvas()
  ctx.fillStyle = '#c4a06a'
  ctx.fillRect(0, 0, size, size)

  const plankH = size / 4
  for (let row = 0; row < 4; row++) {
    const y = row * plankH
    ctx.fillStyle = row % 2 === 0 ? '#b89058' : '#d0ae78'
    ctx.fillRect(0, y, size, plankH - 2)
    ctx.fillStyle = '#8a6840'
    ctx.fillRect(0, y + plankH - 2, size, 2)
    for (let i = 0; i < 3; i++) {
      const x = ((i * 87 + row * 41) % (size - 20)) + 10
      ctx.fillStyle = 'rgba(90, 60, 30, 0.35)'
      ctx.fillRect(x, y + 4, 2, plankH - 10)
      ctx.fillStyle = '#6b4e32'
      ctx.beginPath()
      ctx.arc(x + 1, y + plankH / 2, 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.strokeStyle = 'rgba(120, 80, 40, 0.25)'
    ctx.lineWidth = 1
    for (let g = 0; g < 5; g++) {
      ctx.beginPath()
      ctx.moveTo(0, y + 6 + g * 8)
      ctx.bezierCurveTo(size * 0.3, y + 4 + g * 8, size * 0.7, y + 10 + g * 8, size, y + 6 + g * 8)
      ctx.stroke()
    }
  }
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, 'rgba(255,255,255,0.08)')
  grad.addColorStop(1, 'rgba(80,50,20,0.12)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return toTexture(canvas)
}

function stoneMap() {
  const { canvas, ctx, size } = makeCanvas()
  ctx.fillStyle = '#9a6a55'
  ctx.fillRect(0, 0, size, size)

  const rows = 6
  const cols = 4
  const bh = size / rows
  const bw = size / cols
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : bw / 2
    for (let c = -1; c <= cols; c++) {
      const x = c * bw + offset
      const y = r * bh
      const tones = ['#b07a62', '#8f5f4a', '#a36c55', '#c08970']
      ctx.fillStyle = tones[(r * 3 + c + 5) % tones.length]
      ctx.fillRect(x + 1, y + 1, bw - 2, bh - 2)
      ctx.strokeStyle = '#6e5248'
      ctx.lineWidth = 2
      ctx.strokeRect(x + 0.5, y + 0.5, bw - 1, bh - 1)
      ctx.fillStyle = 'rgba(60,40,30,0.2)'
      for (let s = 0; s < 4; s++) {
        ctx.fillRect(x + 6 + ((s * 17) % (bw - 12)), y + 4 + ((s * 11) % (bh - 8)), 2, 2)
      }
    }
  }
  return toTexture(canvas)
}

function metalMap() {
  const { canvas, ctx, size } = makeCanvas()
  const base = ctx.createLinearGradient(0, 0, size, 0)
  base.addColorStop(0, '#7a8fa3')
  base.addColorStop(0.5, '#9aafc0')
  base.addColorStop(1, '#6d8296')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)

  const ribs = 10
  const rw = size / ribs
  for (let i = 0; i < ribs; i++) {
    const x = i * rw
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(30,45,60,0.18)'
    ctx.fillRect(x, 0, rw * 0.55, size)
    ctx.fillStyle = 'rgba(20,30,40,0.25)'
    ctx.fillRect(x + rw * 0.55, 0, 2, size)
  }
  for (let y = 16; y < size; y += 32) {
    for (let x = 12; x < size; x += rw) {
      ctx.fillStyle = '#c5d4e0'
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#4a5a68'
      ctx.beginPath()
      ctx.arc(x, y, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.strokeStyle = 'rgba(40,55,70,0.55)'
  ctx.lineWidth = 6
  ctx.strokeRect(3, 3, size - 6, size - 6)
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
  wood: 0.82,
  brick: 0.88,
  metal: 0.35,
}

export const MAT_METALNESS: Record<MatType, number> = {
  wood: 0.02,
  brick: 0.04,
  metal: 0.72,
}
