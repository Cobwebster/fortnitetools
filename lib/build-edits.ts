/**
 * Fortnite edit grids (wiki / GamesRadar building guide — Epic does not publish source):
 * - Tap G to enter, LMB paints tiles to REMOVE, tap G to confirm, RMB resets
 * - Blue tiles = remaining. Invalid leftover shapes stay red and cannot confirm.
 * - Walls/floors 3×3. Pyramids 2×2 (any subset). Stairs 2×2 corners (full / half / L / U).
 * https://fortnite.fandom.com/wiki/Building
 */

import {
  CELL,
  CONE_HEIGHT,
  MAX_BUILD_RANGE,
  aimPointWithinRange,
  cellCenter,
  type BuildPiece,
  type PieceType,
} from './build-simulator'

export type EditGridKind = '3x3' | '2x2'

export function editGridKind(type: PieceType): EditGridKind {
  if (type === 'cone' || type === 'ramp') return '2x2'
  return '3x3'
}

export function editTileCount(type: PieceType): number {
  return editGridKind(type) === '2x2' ? 4 : 9
}

export function editGridDims(type: PieceType): { cols: number; rows: number } {
  return editGridKind(type) === '2x2' ? { cols: 2, rows: 2 } : { cols: 3, rows: 3 }
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

function is4Connected(tiles: boolean[], cols: number, rows: number): boolean {
  const start = tiles.findIndex(Boolean)
  if (start < 0) return true
  const seen = new Set<number>([start])
  const stack = [start]
  const idx = (c: number, r: number) => r * cols + c
  while (stack.length) {
    const i = stack.pop()!
    const c = i % cols
    const r = Math.floor(i / cols)
    for (const [dc, dr] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ] as const) {
      const nc = c + dc
      const nr = r + dr
      if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue
      const j = idx(nc, nr)
      if (!tiles[j] || seen.has(j)) continue
      seen.add(j)
      stack.push(j)
    }
  }
  return seen.size === tiles.filter(Boolean).length
}

/**
 * Stairs: full (4), half (2 edge-adjacent), quarter-turn / half-turn (3).
 * Diagonals and single tiles have no stair mesh.
 */
function isValidRampTiles(tiles: boolean[]): boolean {
  const on = tiles.map(Boolean)
  const n = on.filter(Boolean).length
  if (n === 0 || n === 3 || n === 4) return true
  if (n !== 2) return false
  const pairs: [number, number][] = [
    [0, 1],
    [2, 3],
    [0, 2],
    [1, 3],
  ]
  return pairs.some(([a, b]) => on[a] && on[b])
}

/** Empty leftover = destroy (valid). Scattered leftover tiles cannot confirm. */
export function isValidEditTiles(type: PieceType, tiles: boolean[]): boolean {
  if (!hasAnyTile(tiles)) return true
  if (type === 'cone') return true
  if (type === 'ramp') return isValidRampTiles(tiles)
  const { cols, rows } = editGridDims(type)
  return is4Connected(tiles, cols, rows)
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

export type AimedHit = {
  piece: BuildPiece
  t: number
  point: { x: number; y: number; z: number }
}

export function findAimedHit(
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number },
  pieces: BuildPiece[],
  maxRange: number = MAX_BUILD_RANGE
): AimedHit | null {
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
  if (!best) return null
  return {
    piece: best,
    t: bestT,
    point: { x: eye.x + dir.x * bestT, y: eye.y + dir.y * bestT, z: eye.z + dir.z * bestT },
  }
}

export function findAimedPiece(
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number },
  pieces: BuildPiece[],
  maxRange: number = MAX_BUILD_RANGE
): BuildPiece | null {
  return findAimedHit(eye, lookDir, pieces, maxRange)?.piece ?? null
}

/**
 * Fortnite hologram follows the crosshair onto the grid: hit a piece or the
 * ground, then nudge a hair along look so the snap lands on the face you meant.
 */
export function resolveBuildAim(
  eye: { x: number; y: number; z: number },
  lookDir: { x: number; y: number; z: number },
  pieces: BuildPiece[]
): { x: number; y: number; z: number } {
  const len = Math.hypot(lookDir.x, lookDir.y, lookDir.z) || 1
  const dir = { x: lookDir.x / len, y: lookDir.y / len, z: lookDir.z / len }
  const hit = findAimedHit(eye, lookDir, pieces)
  let groundT: number | null = null
  if (Math.abs(dir.y) > 0.02) {
    const t = (0.04 - eye.y) / dir.y
    if (t > 0.2 && t <= MAX_BUILD_RANGE) groundT = t
  }
  if (hit && (groundT == null || hit.t <= groundT + 0.08)) {
    const push = 0.18
    return {
      x: hit.point.x + dir.x * push,
      y: hit.point.y + dir.y * push,
      z: hit.point.z + dir.z * push,
    }
  }
  if (groundT != null) {
    return {
      x: eye.x + dir.x * groundT,
      y: 0.04,
      z: eye.z + dir.z * groundT,
    }
  }
  return aimPointWithinRange(eye, lookDir)
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
    const tAabb = rayAabb(eye, dir, pieceAimBounds(piece).min, pieceAimBounds(piece).max, MAX_BUILD_RANGE)
    if (tAabb == null) return null
    const hx = eye.x + dir.x * tAabb - cx
    const hz = eye.z + dir.z * tAabb - cz
    const localX = hx * right.x + hz * right.z
    const localZ = hx * forward.x + hz * forward.z
    return {
      u: clamp01((localX + CELL / 2) / CELL),
      v: clamp01((localZ + CELL / 2) / CELL),
      t: tAabb,
    }
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
    const localZ = (v - 0.5) * CELL
    return {
      x: cx + right.x * localX + forward.x * localZ,
      y: cy + CELL / 2 + localZ,
      z: cz + right.z * localX + forward.z * localZ,
      yaw,
    }
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
  const h = (CELL * 0.92) / rows
  return { w, h }
}
