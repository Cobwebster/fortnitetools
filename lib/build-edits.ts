/**
 * Fortnite-style edit grids:
 * - Enter edit → piece becomes a blue tile grid
 * - Select tiles to REMOVE, confirm applies (classic BR)
 * - Walls/floors 3×3, cones 2×2, ramps L/M/R strips
 * https://fortnite.fandom.com/wiki/Building
 */

import {
  CELL,
  CONE_HEIGHT,
  MAX_BUILD_RANGE,
  cellCenter,
  type BuildPiece,
  type PieceType,
} from './build-simulator'

export type EditGridKind = '3x3' | '2x2' | '3col'

export function editGridKind(type: PieceType): EditGridKind {
  if (type === 'cone') return '2x2'
  if (type === 'ramp') return '3col'
  return '3x3'
}

export function editTileCount(type: PieceType): number {
  const k = editGridKind(type)
  if (k === '2x2') return 4
  if (k === '3col') return 3
  return 9
}

export function editGridDims(type: PieceType): { cols: number; rows: number } {
  const k = editGridKind(type)
  if (k === '2x2') return { cols: 2, rows: 2 }
  if (k === '3col') return { cols: 3, rows: 1 }
  return { cols: 3, rows: 3 }
}

/** Full unedited piece — every tile present. */
export function fullEditTiles(type: PieceType): boolean[] {
  return Array.from({ length: editTileCount(type) }, () => true)
}

export function isFullEdit(tiles: boolean[] | undefined, type: PieceType): boolean {
  const full = fullEditTiles(type)
  if (!tiles || tiles.length !== full.length) return true
  return tiles.every((t, i) => t === full[i])
}

export function hasAnyTile(tiles: boolean[]): boolean {
  return tiles.some(Boolean)
}

export function cloneTiles(tiles: boolean[]): boolean[] {
  return tiles.slice()
}

export function emptySelection(type: PieceType): boolean[] {
  return Array.from({ length: editTileCount(type) }, () => false)
}

/** Apply FN select-to-remove: selected tiles are cut from the base. */
export function applyEditSelection(baseTiles: boolean[], selected: boolean[]): boolean[] {
  return baseTiles.map((on, i) => on && !selected[i])
}

export function withDefaultTiles(piece: BuildPiece): BuildPiece {
  if (piece.tiles && piece.tiles.length === editTileCount(piece.type)) return piece
  return { ...piece, tiles: fullEditTiles(piece.type) }
}

export function pieceAimBounds(piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>): {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
} {
  const [x, y, z] = cellCenter(piece.cx, piece.cy, piece.cz)
  const h = CELL * 0.55
  if (piece.type === 'floor') {
    return {
      min: { x: x - h, y: y - 0.2, z: z - h },
      max: { x: x + h, y: y + 0.35, z: z + h },
    }
  }
  if (piece.type === 'cone') {
    return {
      min: { x: x - h, y: y - 0.1, z: z - h },
      max: { x: x + h, y: y + CONE_HEIGHT + 0.1, z: z + h },
    }
  }
  return {
    min: { x: x - h, y: y - 0.1, z: z - h },
    max: { x: x + h, y: y + CELL + 0.1, z: z + h },
  }
}

function rayAabb(
  origin: { x: number; y: number; z: number },
  dir: { x: number; y: number; z: number },
  min: { x: number; y: number; z: number },
  max: { x: number; y: number; z: number },
  maxT: number
): number | null {
  let tmin = 0
  let tmax = maxT
  const axes: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z']
  for (const a of axes) {
    const o = origin[a]
    const d = dir[a]
    if (Math.abs(d) < 1e-8) {
      if (o < min[a] || o > max[a]) return null
      continue
    }
    let t1 = (min[a] - o) / d
    let t2 = (max[a] - o) / d
    if (t1 > t2) {
      const tmp = t1
      t1 = t2
      t2 = tmp
    }
    tmin = Math.max(tmin, t1)
    tmax = Math.min(tmax, t2)
    if (tmin > tmax) return null
  }
  return tmin >= 0 ? tmin : tmax >= 0 ? 0 : null
}

export function findAimedPiece(
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number },
  pieces: BuildPiece[],
  maxRange: number = MAX_BUILD_RANGE
): BuildPiece | null {
  const len = Math.hypot(lookDir.x, lookDir.y, lookDir.z) || 1
  const dir = { x: lookDir.x / len, y: lookDir.y / len, z: lookDir.z / len }
  let best: BuildPiece | null = null
  let bestT = maxRange + 0.01
  for (const p of pieces) {
    const b = pieceAimBounds(p)
    const t = rayAabb(eye, dir, b.min, b.max, maxRange)
    if (t != null && t < bestT) {
      bestT = t
      best = p
    }
  }
  return best
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function tileIndexFromUV(type: PieceType, u: number, v: number): number {
  const uu = Math.min(0.999, Math.max(0, u))
  const vv = Math.min(0.999, Math.max(0, v))
  const kind = editGridKind(type)
  if (kind === '2x2') {
    const col = uu < 0.5 ? 0 : 1
    const row = vv < 0.5 ? 0 : 1
    return row * 2 + col
  }
  if (kind === '3col') {
    if (uu < 1 / 3) return 0
    if (uu < 2 / 3) return 1
    return 2
  }
  const col = Math.floor(uu * 3)
  const row = Math.floor(vv * 3)
  return row * 3 + col
}

/**
 * Ray → edit UV on the actual piece face (wall plane / floor plane / ramp face).
 */
export function editUVFromRay(
  piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>,
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number }
): { u: number; v: number; t: number } | null {
  const len = Math.hypot(lookDir.x, lookDir.y, lookDir.z) || 1
  const dir = { x: lookDir.x / len, y: lookDir.y / len, z: lookDir.z / len }
  const [cx, cy, cz] = cellCenter(piece.cx, piece.cy, piece.cz)
  const yaw = (piece.rot * Math.PI) / 2
  const cos = Math.cos(yaw)
  const sin = Math.sin(yaw)

  // Local axes after yaw: +X right, +Y up, +Z forward (wall face direction)
  const right = { x: cos, y: 0, z: -sin }
  const forward = { x: sin, y: 0, z: cos }

  if (piece.type === 'wall') {
    const faceDist = CELL / 2 - 0.08
    const px = cx + forward.x * faceDist
    const py = cy + CELL / 2
    const pz = cz + forward.z * faceDist
    const denom = dir.x * forward.x + dir.y * 0 + dir.z * forward.z
    if (Math.abs(denom) < 1e-5) return null
    const t = ((px - eye.x) * forward.x + (py - eye.y) * 0 + (pz - eye.z) * forward.z) / denom
    if (t < 0.05 || t > MAX_BUILD_RANGE) return null
    const hx = eye.x + dir.x * t - cx
    const hy = eye.y + dir.y * t - cy
    const hz = eye.z + dir.z * t - cz
    const localX = hx * right.x + hz * right.z
    const localY = hy
    const u = (localX + CELL / 2) / CELL
    const v = 1 - localY / CELL
    if (u < -0.05 || u > 1.05 || v < -0.05 || v > 1.05) return null
    return { u: clamp01(u), v: clamp01(v), t }
  }

  if (piece.type === 'floor') {
    const planeY = cy + 0.08
    if (Math.abs(dir.y) < 1e-5) return null
    const t = (planeY - eye.y) / dir.y
    if (t < 0.05 || t > MAX_BUILD_RANGE) return null
    const hx = eye.x + dir.x * t - cx
    const hz = eye.z + dir.z * t - cz
    const localX = hx * right.x + hz * right.z
    const localZ = hx * forward.x + hz * forward.z
    const u = (localX + CELL / 2) / CELL
    const v = (localZ + CELL / 2) / CELL
    if (u < -0.05 || u > 1.05 || v < -0.05 || v > 1.05) return null
    return { u: clamp01(u), v: clamp01(v), t }
  }

  if (piece.type === 'ramp') {
    // Approximate UV on the ramp slope (45° rising +local Z)
    const tAabb = rayAabb(eye, dir, pieceAimBounds(piece).min, pieceAimBounds(piece).max, MAX_BUILD_RANGE)
    if (tAabb == null) return null
    const hx = eye.x + dir.x * tAabb - cx
    const hz = eye.z + dir.z * tAabb - cz
    const localX = hx * right.x + hz * right.z
    return { u: clamp01((localX + CELL / 2) / CELL), v: 0.5, t: tAabb }
  }

  // cone — top-down
  const planeY = cy + CONE_HEIGHT * 0.35
  if (Math.abs(dir.y) < 1e-5) {
    const tAabb = rayAabb(eye, dir, pieceAimBounds(piece).min, pieceAimBounds(piece).max, MAX_BUILD_RANGE)
    if (tAabb == null) return null
    const hx = eye.x + dir.x * tAabb - cx
    const hz = eye.z + dir.z * tAabb - cz
    return {
      u: clamp01((hx + CELL / 2) / CELL),
      v: clamp01((hz + CELL / 2) / CELL),
      t: tAabb,
    }
  }
  const t = (planeY - eye.y) / dir.y
  if (t < 0.05 || t > MAX_BUILD_RANGE) return null
  const hx = eye.x + dir.x * t - cx
  const hz = eye.z + dir.z * t - cz
  return {
    u: clamp01((hx + CELL / 2) / CELL),
    v: clamp01((hz + CELL / 2) / CELL),
    t,
  }
}

export function aimedEditTileIndex(
  piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>,
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number }
): number {
  const uv = editUVFromRay(piece, eye, lookDir)
  if (!uv) return -1
  return tileIndexFromUV(piece.type, uv.u, uv.v)
}

/** World-space center of an edit tile (for overlay meshes). */
export function editTileWorldCenter(
  piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>,
  index: number
): { x: number; y: number; z: number; yaw: number } {
  const [cx, cy, cz] = cellCenter(piece.cx, piece.cy, piece.cz)
  const yaw = (piece.rot * Math.PI) / 2
  const { cols, rows } = editGridDims(piece.type)
  const col = index % cols
  const row = Math.floor(index / cols)
  const u = (col + 0.5) / cols
  const v = (row + 0.5) / rows
  const cos = Math.cos(yaw)
  const sin = Math.sin(yaw)
  const right = { x: cos, z: -sin }
  const forward = { x: sin, z: cos }

  if (piece.type === 'wall') {
    const localX = (u - 0.5) * CELL
    const localY = (1 - v) * CELL
    const face = CELL / 2 - 0.02
    return {
      x: cx + right.x * localX + forward.x * face,
      y: cy + localY,
      z: cz + right.z * localX + forward.z * face,
      yaw,
    }
  }
  if (piece.type === 'ramp') {
    const localX = (u - 0.5) * CELL
    return { x: cx + right.x * localX, y: cy + CELL / 2, z: cz + right.z * localX, yaw }
  }
  // floor / cone
  const localX = (u - 0.5) * CELL
  const localZ = (v - 0.5) * CELL
  const y =
    piece.type === 'floor' ? cy + 0.2 : cy + CONE_HEIGHT * 0.45
  return {
    x: cx + right.x * localX + forward.x * localZ,
    y,
    z: cz + right.z * localX + forward.z * localZ,
    yaw,
  }
}

export function editTileSize(type: PieceType): { w: number; h: number } {
  const { cols, rows } = editGridDims(type)
  const w = (CELL * 0.92) / cols
  const h = type === 'ramp' ? CELL * 0.9 : (CELL * 0.92) / rows
  return { w, h }
}
