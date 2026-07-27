/** Fortnite-like build practice sandbox — approximate feel, not Epic-accurate. */

export type PieceType = 'wall' | 'floor' | 'ramp' | 'cone'
export type MatType = 'wood' | 'brick' | 'metal'

export type BuildPiece = {
  id: string
  type: PieceType
  mat: MatType
  cx: number
  cy: number
  cz: number
  rot: 0 | 1 | 2 | 3
  /**
   * Edit mask — which sub-tiles remain after editing.
   * Wall/floor: 9 (3×3). Cone: 4 (2×2). Ramp: 3 (L/M/R strips).
   * `true` = present. Omitted / full = unedited piece.
   */
  tiles?: boolean[]
}

export type MatsState = Record<MatType, number>

/**
 * Fortnite tile ≈ 5.12m. We use CELL world units with a ~1.8-tall player capsule
 * so one tile feels room-scale in the browser sim.
 */
export const CELL = 4

/**
 * Wiki roof/cone: 5.12 × 5.12 × 1.92 m — half a wall tall (wall 3.84).
 * Square pyramid sitting on the tile, not a full-height spike.
 * https://fortnite.fandom.com/wiki/Building
 */
export const CONE_HEIGHT = CELL * 0.5
/** Center → corner of the square base (aligns 4-sided cone to the floor tile). */
export const CONE_BASE_RADIUS = (CELL * Math.SQRT2) / 2

/** Chapter 3+ style reach: build up to 3 tiles away (wiki / community guides). */
export const MAX_BUILD_TILES = 3
export const MAX_BUILD_RANGE = MAX_BUILD_TILES * CELL

/** Soft preferred aim distance before snap (still clamped to max range). */
export const PREFERRED_AIM = CELL * 1.15

export const PIECE_COST = 10
export const MAT_CAP = 500
export const DEFAULT_MATS: MatsState = { wood: MAT_CAP, brick: MAT_CAP, metal: MAT_CAP }

export const MAT_COLORS: Record<MatType, string> = {
  wood: '#e0a85c',
  brick: '#c4785e',
  metal: '#8eb0c8',
}

export const MAT_LABELS: Record<MatType, string> = {
  wood: 'Wood',
  brick: 'Stone',
  metal: 'Metal',
}

export const MAT_ICONS: Record<MatType, string> = {
  wood: '/images/loadout/mat_wood.png',
  brick: '/images/loadout/mat_stone.png',
  metal: '/images/loadout/mat_metal.png',
}

export const PIECE_LABELS: Record<PieceType, string> = {
  wall: 'Wall',
  floor: 'Floor',
  ramp: 'Ramp',
  cone: 'Cone',
}

export const PIECE_KEYS: Record<PieceType, string> = {
  wall: 'Q',
  floor: 'F',
  ramp: 'C',
  cone: 'V',
}

export const MAT_KEYS: Record<MatType, string> = {
  wood: '1',
  brick: '2',
  metal: '3',
}

export const BUILD_BINDS = {
  wall: 'KeyQ',
  floor: 'KeyF',
  ramp: 'KeyC',
  cone: 'KeyV',
  matWood: 'Digit1',
  matBrick: 'Digit2',
  matMetal: 'Digit3',
  rotate: 'KeyR',
  edit: 'KeyG',
  editReset: 'KeyT',
  jump: 'Space',
  sprint: 'ShiftLeft',
  crouch: 'ControlLeft',
  respawn: 'KeyB',
  refill: 'KeyM',
  clearBuilds: 'KeyX',
  infiniteMats: 'KeyI',
} as const

/** Hold LMB turbo interval — close to Fortnite spam pace for practice. */
export const TURBO_BUILD_MS = 55

export const HUD_CONTROLS: { keys: string; action: string }[] = [
  { keys: 'Click / hold', action: 'Place · turbo-build while held' },
  { keys: 'Q F C V', action: 'Select piece + place (while locked)' },
  { keys: 'RMB', action: 'Break aimed piece (cascade unsupported)' },
  { keys: 'G hold', action: 'Edit — select tiles to remove, release to confirm' },
  { keys: 'T / Esc', action: 'Reset edit to full · cancel edit' },
  { keys: 'WASD · Shift · Ctrl', action: 'Move · sprint · crouch' },
  { keys: 'Space', action: 'Jump' },
  { keys: '1 2 3 · R', action: 'Mats · rotate 90°' },
  { keys: 'B · M · X · I', action: 'Respawn · refill · clear builds · infinite mats' },
]

export type Vec3 = { x: number; y: number; z: number }

export type PlacementDraft = Omit<BuildPiece, 'id' | 'mat'>

export type PlacementResult = {
  draft: PlacementDraft
  /** Piece center in world space (for range checks / debug). */
  center: Vec3
  /** Distance from player feet to piece center. */
  distance: number
  inRange: boolean
}

export function pieceKey(p: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>) {
  return `${p.type}:${p.cx}:${p.cy}:${p.cz}:${p.rot}`
}

export function snapToCell(world: number) {
  return Math.floor(world / CELL)
}

export function cellCenter(cx: number, cy: number, cz: number): [number, number, number] {
  return [(cx + 0.5) * CELL, cy * CELL, (cz + 0.5) * CELL]
}

export function pieceWorldCenter(draft: PlacementDraft): Vec3 {
  const [x, y, z] = cellCenter(draft.cx, draft.cy, draft.cz)
  if (draft.type === 'floor') return { x, y: y + 0.08, z }
  if (draft.type === 'cone') return { x, y: y + CONE_HEIGHT / 2, z }
  return { x, y: y + CELL / 2, z }
}

export function canAfford(mats: MatsState, mat: MatType, infinite: boolean) {
  return infinite || mats[mat] >= PIECE_COST
}

export function spendMats(mats: MatsState, mat: MatType, infinite: boolean): MatsState {
  if (infinite) return mats
  return { ...mats, [mat]: Math.max(0, mats[mat] - PIECE_COST) }
}

export function clampMats(mats: MatsState): MatsState {
  return {
    wood: Math.min(MAT_CAP, Math.max(0, mats.wood)),
    brick: Math.min(MAT_CAP, Math.max(0, mats.brick)),
    metal: Math.min(MAT_CAP, Math.max(0, mats.metal)),
  }
}

function lookRot(lookDir: { x: number; z: number }): 0 | 1 | 2 | 3 {
  const yaw = Math.atan2(lookDir.x, lookDir.z)
  return (Math.round(((yaw + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 2)) % 4) as 0 | 1 | 2 | 3
}

function len2(a: Vec3, b: Vec3) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / l, y: v.y / l, z: v.z / l }
}

/**
 * Fortnite-style aim point:
 * - Trace from eyes along look
 * - Hard cap at MAX_BUILD_RANGE (3 tiles)
 * - If looking at ground within range, snap to that ground hit
 * - Else use a point along the look vector (not infinite horizon)
 */
export function aimPointWithinRange(eye: Vec3, lookDir: Vec3): Vec3 {
  const dir = normalize(lookDir)
  const maxT = MAX_BUILD_RANGE

  // Ground plane y ≈ 0 (arena floor). Only accept if within build range.
  if (Math.abs(dir.y) > 0.02) {
    const tGround = (0.05 - eye.y) / dir.y
    if (tGround > 0.35 && tGround <= maxT) {
      return {
        x: eye.x + dir.x * tGround,
        y: 0.05,
        z: eye.z + dir.z * tGround,
      }
    }
  }

  // Prefer a short aim in front; never beyond max range.
  const t = Math.min(PREFERRED_AIM, maxT)
  return {
    x: eye.x + dir.x * t,
    y: eye.y + dir.y * t,
    z: eye.z + dir.z * t,
  }
}

/**
 * Snap aim → grid cell + facing (Fortnite hologram lock).
 * Then pull the cell toward the player if somehow still out of range.
 */
export function resolvePlacement(
  type: PieceType,
  eye: Vec3,
  lookDir: Vec3,
  playerFeet: Vec3,
  rotOffset: number = 0
): PlacementResult {
  const aim = aimPointWithinRange(eye, lookDir)

  let cx = snapToCell(aim.x)
  let cz = snapToCell(aim.z)
  let cy = snapToCell(Math.max(0, aim.y + 0.02))
  if (cy < 0) cy = 0

  const flat = Math.hypot(lookDir.x, lookDir.z)
  const nx = flat > 0.001 ? lookDir.x / flat : 0
  const nz = flat > 0.001 ? lookDir.z / flat : -1

  // Walls: tile in front; height follows look for 90s.
  // Ramps: FN ramp-rush — place ahead, stepping up a tier as you run up.
  if (type === 'wall') {
    const ahead = CELL * 0.7
    cx = snapToCell(playerFeet.x + nx * ahead)
    cz = snapToCell(playerFeet.z + nz * ahead)
    if (lookDir.y > 0.18) {
      const up = eye.y + lookDir.y * CELL * 1.35
      cy = snapToCell(Math.max(0, up - CELL * 0.35))
    } else if (lookDir.y < -0.4) {
      cy = snapToCell(Math.max(0, aim.y))
    } else {
      cy = snapToCell(Math.max(0, playerFeet.y + 0.2))
    }
  } else if (type === 'ramp') {
    const standCx = snapToCell(playerFeet.x)
    const standCz = snapToCell(playerFeet.z)
    const standCy = snapToCell(Math.max(0, playerFeet.y - 0.02))
    // Place into the next tile in look direction (run-forward ramp rush).
    const ahead = CELL * 0.85
    cx = snapToCell(playerFeet.x + nx * ahead)
    cz = snapToCell(playerFeet.z + nz * ahead)
    const movedHoriz = cx !== standCx || cz !== standCz
    // How far up the current cell you are (0 = floor, 1 = ceiling).
    const climbT = (playerFeet.y - standCy * CELL) / CELL

    if (lookDir.y > 0.22) {
      // Look up → next tier (90s / retakes)
      cy = standCy + 1
    } else if (lookDir.y < -0.4) {
      cy = Math.max(0, standCy - (climbT < 0.25 ? 1 : 0))
    } else if (movedHoriz && climbT > 0.28) {
      // Running up a ramp: next piece is one forward AND one up.
      cy = standCy + 1
    } else if (movedHoriz && climbT > 0.08) {
      // Early on the slope — still prefer the upper-forward cell so chains connect.
      cy = standCy + 1
    } else {
      cy = standCy
    }
    if (cy < 0) cy = 0
  } else if (type === 'floor' || type === 'cone') {
    if (lookDir.y > 0.2) {
      // Ceiling / cone above — box fight staple
      cx = snapToCell(playerFeet.x + nx * CELL * 0.15)
      cz = snapToCell(playerFeet.z + nz * CELL * 0.15)
      cy = snapToCell(Math.max(0, playerFeet.y + CELL * 0.9))
    } else if (lookDir.y < -0.2) {
      cx = snapToCell(playerFeet.x + nx * CELL * 0.35)
      cz = snapToCell(playerFeet.z + nz * CELL * 0.35)
      cy = snapToCell(Math.max(0, playerFeet.y + 0.05))
    } else {
      cx = snapToCell(playerFeet.x + nx * CELL * 0.85)
      cz = snapToCell(playerFeet.z + nz * CELL * 0.85)
      cy = snapToCell(Math.max(0, playerFeet.y + 0.15))
    }
  }

  const base = lookRot(lookDir)
  const rot = ((base + (rotOffset % 4) + 4) % 4) as 0 | 1 | 2 | 3
  let draft: PlacementDraft =
    type === 'floor' ? { type, cx, cy, cz, rot: 0 } : { type, cx, cy, cz, rot }

  // Pull toward player until center is within max range (FN never places miles out).
  let center = pieceWorldCenter(draft)
  let distance = len2(center, playerFeet)
  let guard = 0
  while (distance > MAX_BUILD_RANGE + 0.35 && guard < 8) {
    const dx = Math.sign(playerFeet.x - center.x)
    const dz = Math.sign(playerFeet.z - center.z)
    const dy = Math.sign(playerFeet.y - center.y)
    if (Math.abs(playerFeet.x - center.x) > CELL * 0.4) draft = { ...draft, cx: draft.cx + dx }
    else if (Math.abs(playerFeet.z - center.z) > CELL * 0.4) draft = { ...draft, cz: draft.cz + dz }
    else if (Math.abs(playerFeet.y - center.y) > CELL * 0.4) {
      draft = { ...draft, cy: Math.max(0, draft.cy + dy) }
    } else break
    center = pieceWorldCenter(draft)
    distance = len2(center, playerFeet)
    guard++
  }

  const inRange = distance <= MAX_BUILD_RANGE + 0.5
  return { draft, center, distance, inRange }
}

/** @deprecated use resolvePlacement — kept name for fewer call-site renames if any remain */
export function proposePlacement(
  type: PieceType,
  hitPoint: Vec3,
  lookDir: Vec3,
  rotOffset: number = 0
): PlacementDraft {
  // Legacy path: treat hit as eye-less aim; caller should migrate to resolvePlacement.
  const eye = {
    x: hitPoint.x - lookDir.x * PREFERRED_AIM,
    y: hitPoint.y - lookDir.y * PREFERRED_AIM,
    z: hitPoint.z - lookDir.z * PREFERRED_AIM,
  }
  return resolvePlacement(type, eye, lookDir, { x: eye.x, y: 0, z: eye.z }, rotOffset).draft
}

export type GhostValidity = 'valid' | 'blocked' | 'oorange' | 'nomats' | 'unsupported'

/**
 * Wiki: structures must connect to the ground (terrain) or to another structure
 * that itself has a path to the ground — otherwise they cannot be created / collapse.
 * https://fortnite.fandom.com/wiki/Building
 */
export function touchesTerrain(p: Pick<BuildPiece, 'type' | 'cy'>): boolean {
  // Any piece in the ground-level cell sits on the arena floor.
  return p.cy === 0
}

/** Two pieces share a cell or an orthogonal neighbor cell (6-connected + same cell). */
export function piecesAdjacent(
  a: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>,
  b: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'>
): boolean {
  const dx = Math.abs(a.cx - b.cx)
  const dy = Math.abs(a.cy - b.cy)
  const dz = Math.abs(a.cz - b.cz)
  // Same tile (e.g. wall + floor / ramp in one cell)
  if (dx === 0 && dy === 0 && dz === 0) return true
  // Orthogonal neighbors (including stacked vertically)
  if (dx + dy + dz === 1) return true

  // Wall on a face also "touches" the cell it faces (one step in rot direction)
  if (a.type === 'wall') {
    const [fx, fz] = wallFaceOffset(a.rot)
    if (a.cx + fx === b.cx && a.cy === b.cy && a.cz + fz === b.cz) return true
  }
  if (b.type === 'wall') {
    const [fx, fz] = wallFaceOffset(b.rot)
    if (b.cx + fx === a.cx && b.cy === a.cy && b.cz + fz === a.cz) return true
  }

  // Ramp high-end touches forward, above, and forward+up (FN ramp chains).
  if (a.type === 'ramp' && rampTouchesCell(a, b)) return true
  if (b.type === 'ramp' && rampTouchesCell(b, a)) return true

  return false
}

function wallFaceOffset(rot: 0 | 1 | 2 | 3): [number, number] {
  // Matches piece mesh: rot 0 → +Z face of cell
  if (rot === 0) return [0, 1]
  if (rot === 1) return [1, 0]
  if (rot === 2) return [0, -1]
  return [-1, 0]
}

/** Climb direction for a ramp (same facing as wall rot). */
function rampClimbOffset(rot: 0 | 1 | 2 | 3): [number, number] {
  return wallFaceOffset(rot)
}

/** Does this ramp's geometry touch the other piece's cell? */
function rampTouchesCell(
  ramp: Pick<BuildPiece, 'cx' | 'cy' | 'cz' | 'rot'>,
  other: Pick<BuildPiece, 'cx' | 'cy' | 'cz'>
): boolean {
  const [fx, fz] = rampClimbOffset(ramp.rot)
  // Cell above the ramp
  if (other.cx === ramp.cx && other.cy === ramp.cy + 1 && other.cz === ramp.cz) return true
  // Cell forward (same height)
  if (other.cx === ramp.cx + fx && other.cy === ramp.cy && other.cz === ramp.cz + fz) return true
  // Cell forward + up — continuous ramp rush staircase
  if (other.cx === ramp.cx + fx && other.cy === ramp.cy + 1 && other.cz === ramp.cz + fz) return true
  // Also the cell behind+down so chains stay mutual
  if (other.cx === ramp.cx - fx && other.cy === ramp.cy - 1 && other.cz === ramp.cz - fz) return true
  return false
}

/** All piece keys that have a connection path to terrain. */
export function supportedPieceKeys(pieces: BuildPiece[]): Set<string> {
  const supported = new Set<string>()
  const queue: BuildPiece[] = []

  for (const p of pieces) {
    if (touchesTerrain(p)) {
      supported.add(pieceKey(p))
      queue.push(p)
    }
  }

  while (queue.length) {
    const cur = queue.shift()!
    for (const p of pieces) {
      const k = pieceKey(p)
      if (supported.has(k)) continue
      if (piecesAdjacent(cur, p)) {
        supported.add(k)
        queue.push(p)
      }
    }
  }
  return supported
}

/**
 * Would this draft be supported if added? (touch terrain or touch a supported piece)
 */
export function wouldBeSupported(draft: PlacementDraft, existing: BuildPiece[]): boolean {
  if (touchesTerrain(draft)) return true
  const supported = supportedPieceKeys(existing)
  for (const p of existing) {
    if (!supported.has(pieceKey(p))) continue
    if (piecesAdjacent(draft, p)) return true
  }
  return false
}

export function evaluateGhost(opts: {
  result: PlacementResult
  occupied: boolean
  canPay: boolean
  /** Existing world pieces — used for support / connectivity. */
  existing: BuildPiece[]
}): { ok: boolean; reason: GhostValidity } {
  if (!opts.result.inRange) return { ok: false, reason: 'oorange' }
  if (opts.occupied) return { ok: false, reason: 'blocked' }
  if (!opts.canPay) return { ok: false, reason: 'nomats' }
  if (!wouldBeSupported(opts.result.draft, opts.existing)) {
    return { ok: false, reason: 'unsupported' }
  }
  return { ok: true, reason: 'valid' }
}

export const BUILD_SIM_V2_NOTES = [
  'Piece HP build-up + yellow phasing',
  'Timed drills (90s, box-fight scenarios, piece-count goals)',
  'Edit-on-release setting + stair pattern presets',
  'Pickaxe harvest for mats',
  'Custom keybind remapping',
] as const

export const PHYSICS_PARITY_NOTE =
  'Practice sandbox tuned for Fortnite building muscle memory: turbo-build (hold click), Q/F/C/V place, RMB break with support cascade, G-edit with drag paint, 3-tile range, grid snap, coyote jump. Not Epic-accurate (no piece HP / turbo settings parity).'
