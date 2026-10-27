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
  /** Epoch ms when placed — drives HP build-up + yellow phase. */
  placedAt?: number
  /** Accumulated pickaxe / break damage. */
  damage?: number
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
  wall: 'Z',
  floor: 'X',
  ramp: 'C',
  cone: 'V',
}

export const MAT_KEYS: Record<MatType, string> = {
  wood: 'RMB',
  brick: 'RMB',
  metal: 'RMB',
}

export const MAT_CYCLE: MatType[] = ['wood', 'brick', 'metal']

export function nextMat(mat: MatType): MatType {
  return MAT_CYCLE[(MAT_CYCLE.indexOf(mat) + 1) % MAT_CYCLE.length]
}

export const PIECE_CYCLE: PieceType[] = ['wall', 'floor', 'ramp', 'cone']

export function nextPiece(type: PieceType, dir: 1 | -1): PieceType {
  const i = PIECE_CYCLE.indexOf(type)
  return PIECE_CYCLE[(i + dir + PIECE_CYCLE.length) % PIECE_CYCLE.length]
}

/** Epic Standard PC preset (building under WASD) + combat harvest. */
export const BUILD_BINDS = {
  wall: 'KeyZ',
  floor: 'KeyX',
  ramp: 'KeyC',
  cone: 'KeyV',
  harvest: 'KeyF',
  harvestAlt: 'Digit1',
  rotate: 'KeyR',
  edit: 'KeyG',
  jump: 'Space',
  sprint: 'ShiftLeft',
  crouch: 'ControlLeft',
  respawn: 'KeyB',
  refill: 'KeyM',
  clearBuilds: 'Delete',
  infiniteMats: 'KeyI',
} as const

/** Hold LMB turbo interval — close to Fortnite spam pace for practice. */
export const TURBO_BUILD_MS = 55

/** Community-known piece HP (not a datamined dump). Wood finishes first. */
export const MAT_HP: Record<MatType, { max: number; start: number; buildMs: number }> = {
  wood: { max: 150, start: 100, buildMs: 4000 },
  brick: { max: 300, start: 90, buildMs: 10000 },
  metal: { max: 400, start: 90, buildMs: 18000 },
}

export const PICKAXE_DAMAGE = 50
export const PICKAXE_SWING_MS = 420
export const PHASE_MS = 620

export function pieceHpNow(piece: Pick<BuildPiece, 'mat' | 'placedAt' | 'damage'>, now = Date.now()) {
  const spec = MAT_HP[piece.mat]
  const age = Math.max(0, now - (piece.placedAt ?? now))
  const t = Math.min(1, age / spec.buildMs)
  const built = spec.start + (spec.max - spec.start) * t
  return Math.max(0, Math.round(built - (piece.damage ?? 0)))
}

export function pieceMaxHp(mat: MatType) {
  return MAT_HP[mat].max
}

export function isPhasing(piece: Pick<BuildPiece, 'placedAt'>, now = Date.now()) {
  if (!piece.placedAt) return false
  return now - piece.placedAt < PHASE_MS
}

export type PlacementHint = {
  /** Camera-relative strafe: −1 left, +1 right. */
  strafe: number
  /** Camera-relative forward: −1 back, +1 forward. */
  forward: number
  airborne: boolean
}

export const HUD_CONTROLS: { keys: string; action: string }[] = [
  { keys: 'Z X C V', action: 'Wall · floor · stairs · roof (build mode)' },
  { keys: 'LMB hold', action: 'Place / turbo-build (build mode)' },
  { keys: 'RMB', action: 'Cycle wood / stone / metal · reset edit' },
  { keys: 'F / 1', action: 'Pickaxe — LMB swing, 50 dmg' },
  { keys: 'G', action: 'Edit — tap in, LMB paint holes, tap G to confirm' },
  { keys: 'R', action: 'Rotate piece 90°' },
  { keys: 'WASD · Shift · Ctrl · Space', action: 'Move · sprint · crouch · jump' },
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
export const BUILD_FOV = 80

export function resolvePlacement(
  type: PieceType,
  eye: Vec3,
  lookDir: Vec3,
  playerFeet: Vec3,
  rotOffset: number = 0,
  hint?: PlacementHint,
  /** Crosshair grid hit (piece/ground). When set, hologram follows look — not a wall glued to your toes. */
  aimOverride?: Vec3
): PlacementResult {
  const aim = aimOverride ?? aimPointWithinRange(eye, lookDir)

  let cx = snapToCell(aim.x)
  let cz = snapToCell(aim.z)
  let cy = snapToCell(Math.max(0, aim.y + 0.02))
  if (cy < 0) cy = 0

  const flat = Math.hypot(lookDir.x, lookDir.z)
  const nx = flat > 0.001 ? lookDir.x / flat : 0
  const nz = flat > 0.001 ? lookDir.z / flat : -1
  const standCx = snapToCell(playerFeet.x)
  const standCz = snapToCell(playerFeet.z)
  const standCy = snapToCell(Math.max(0, playerFeet.y - 0.02))
  const climbT = (playerFeet.y - standCy * CELL) / CELL
  const airborne = hint?.airborne ?? false
  const strafe = hint?.strafe ?? 0
  const goingFwd = (hint?.forward ?? 0) > 0.25
  const lookingUp = lookDir.y > 0.18
  const lookingDown = lookDir.y < -0.42
  const turning90 = airborne && (Math.abs(strafe) > 0.35 || lookingUp)

  // Default: snap the aimed point to the grid (Fortnite hologram).
  // 90s / look-up still steal the cell so retakes close the box while airborne.
  if (type === 'wall') {
    if (turning90) {
      cx = standCx
      cz = standCz
      cy = standCy + (climbT > 0.22 || lookDir.y > 0.22 ? 1 : 0)
      if (Math.abs(strafe) > 0.55 && !lookingUp) {
        const rightX = nz
        const rightZ = -nx
        const side = Math.sign(strafe)
        cx = snapToCell(playerFeet.x + rightX * side * CELL * 0.55)
        cz = snapToCell(playerFeet.z + rightZ * side * CELL * 0.55)
      }
    } else if (lookingUp) {
      cx = snapToCell(playerFeet.x + nx * CELL * 0.55)
      cz = snapToCell(playerFeet.z + nz * CELL * 0.55)
      const up = eye.y + lookDir.y * CELL * 1.35
      cy = snapToCell(Math.max(0, up - CELL * 0.35))
    } else if (cx === standCx && cz === standCz && !lookingDown) {
      cx = snapToCell(playerFeet.x + nx * CELL * 0.7)
      cz = snapToCell(playerFeet.z + nz * CELL * 0.7)
      cy = snapToCell(Math.max(0, playerFeet.y + 0.2))
    } else {
      cy = snapToCell(Math.max(0, lookingDown ? aim.y : playerFeet.y + 0.15))
    }
  } else if (type === 'ramp') {
    if (turning90 || lookingUp || (airborne && goingFwd)) {
      const ahead = turning90 || lookingUp ? CELL * 0.35 : CELL * 0.85
      cx = snapToCell(playerFeet.x + nx * ahead)
      cz = snapToCell(playerFeet.z + nz * ahead)
      const movedHoriz = cx !== standCx || cz !== standCz
      cy = standCy + 1
      if (!movedHoriz && (turning90 || lookingUp)) {
        cx = standCx
        cz = standCz
      }
    } else if (lookingDown) {
      cy = Math.max(0, standCy - (climbT < 0.25 ? 1 : 0))
    } else if ((cx !== standCx || cz !== standCz) && climbT > 0.08) {
      cy = standCy + 1
    } else {
      cy = Math.max(cy, standCy)
    }
    if (cy < 0) cy = 0
  } else if (type === 'floor' || type === 'cone') {
    if (lookingUp || (airborne && lookDir.y > 0.05)) {
      cx = standCx
      cz = standCz
      cy = standCy + 1
    } else if (lookingDown) {
      cy = snapToCell(Math.max(0, playerFeet.y + 0.05))
    } else {
      cy = snapToCell(Math.max(0, playerFeet.y + 0.12))
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
  'Timed drills (90s, box-fight scenarios, piece-count goals)',
  'Stair pattern presets + bind remapping',
  'Pickaxe harvest for mats (not just structure damage)',
] as const

export const PHYSICS_PARITY_NOTE =
  'Browser practice sandbox: Standard binds (Z/X/C/V builds, G tap-to-edit, RMB cycle mats / reset edit, F pickaxe), turbo-build, piece HP (wood 150 / stone 300 / metal 400), yellow phase-through, 3-tile range. Edit leftover tiles must stay connected (stairs: full / half / L / U). Movement is Fortnite-like, not Epic-accurate. Visuals are original lookalikes — not Epic pak textures.'
