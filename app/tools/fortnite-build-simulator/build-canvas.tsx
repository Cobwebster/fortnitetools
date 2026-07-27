'use client'

import { Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Physics,
  RigidBody,
  CuboidCollider,
  CapsuleCollider,
  useRapier,
  type RapierRigidBody,
} from '@react-three/rapier'
import * as THREE from 'three'
import {
  CELL,
  CONE_BASE_RADIUS,
  CONE_HEIGHT,
  TURBO_BUILD_MS,
  canAfford,
  cellCenter,
  evaluateGhost,
  pieceKey,
  resolvePlacement,
  type BuildPiece,
  type MatType,
  type PieceType,
} from '@/lib/build-simulator'
import {
  aimedEditTileIndex,
  editTileSize,
  editTileWorldCenter,
  findAimedPiece,
  fullEditTiles,
  withDefaultTiles,
} from '@/lib/build-edits'
import { getMatTexture, MAT_METALNESS, MAT_ROUGHNESS } from './build-materials'
import { useSim } from './sim-context'

const ARENA = 80
const EYE = 1.55
const EYE_CROUCH = 1.05
/** Tuned for Fortnite-ish training pace on a 4u tile (not Epic-accurate). */
const MOVE = 9.2
const SPRINT = 13.8
const CROUCH_MUL = 0.55
const JUMP = 8.6
const AIR_CONTROL = 0.55
const GRAVITY = -22
const SLOPE_FOLLOW = 1
/** Half-thickness of the walkable ramp wedge (local Y before tilt). */
const RAMP_COLLIDER_HALF_THICK = 0.7
const COYOTE_MS = 110
const JUMP_BUFFER_MS = 120
const LOOK_SENS = 0.00255

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null }
  static getDerivedStateFromError(err: Error) {
    return { error: err?.message || 'WebGL failed to start' }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full min-h-[480px] items-center justify-center bg-zinc-900 p-6 text-center text-sm text-red-300">
          Build simulator failed to load: {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}

export function BuildCanvas() {
  return (
    <CanvasErrorBoundary>
      <div className="relative h-full w-full min-h-[480px] bg-[#6fa8d4]">
        <Canvas
          className="absolute inset-0 h-full w-full touch-none"
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.75]}
          camera={{ fov: 75, near: 0.1, far: 250, position: [0, 3, 14] }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor('#6fa8d4', 1)
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.05
            gl.shadowMap.type = THREE.PCFShadowMap
            camera.lookAt(0, 1, 0)
          }}
        >
          <color attach="background" args={['#6fa8d4']} />
          <fog attach="fog" args={['#8eb9d9', 55, 140]} />
          <hemisphereLight args={['#d8ecff', '#3d5a3a', 0.85]} />
          <ambientLight intensity={0.45} />
          <directionalLight
            castShadow
            intensity={1.25}
            position={[28, 42, 18]}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />

          {/* Always-visible ground (no physics wait) */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[ARENA, ARENA]} />
            <meshStandardMaterial color="#3f7a48" roughness={0.95} />
          </mesh>
          <gridHelper args={[ARENA, ARENA / CELL, '#2f5a36', '#3a6842']} position={[0, 0.02, 0]} />

          <Suspense fallback={<LoadingMarker />}>
            <Physics gravity={[0, GRAVITY, 0]}>
              <GroundCollider />
              <PlayerController />
              <PlacedPieces />
              <PlacementGhost />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}

function LoadingMarker() {
  return (
    <mesh position={[0, 1.5, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
  )
}

function GroundCollider() {
  return (
    <RigidBody type="fixed" colliders={false} position={[0, -0.25, 0]}>
      <CuboidCollider args={[ARENA / 2, 0.25, ARENA / 2]} />
    </RigidBody>
  )
}

function useKeyMap() {
  const keys = useRef<Record<string, boolean>>({})
  useEffect(() => {
    const blockScrollKeys = new Set([
      'Space',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'PageUp',
      'PageDown',
    ])
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true
      if (blockScrollKeys.has(e.code) && (document.pointerLockElement || e.code === 'Space')) {
        e.preventDefault()
      }
    }
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false
    }
    const blur = () => {
      keys.current = {}
    }
    window.addEventListener('keydown', down, { passive: false })
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', blur)
    }
  }, [])
  return keys
}

function PlayerController() {
  const body = useRef<RapierRigidBody>(null)
  const { camera, gl } = useThree()
  const { world, rapier } = useRapier()
  const {
    setLocked,
    tryPlace,
    destroyPiece,
    selectedPieceRef,
    rotOffsetRef,
    rotatePiece,
    piecesRef,
    matsRef,
    selectedMatRef,
    infiniteRef,
    editSessionRef,
    beginEdit,
    confirmEdit,
    setTileSelected,
    setHoverEditTile,
    respawnToken,
  } = useSim()
  const keys = useKeyMap()
  const yaw = useRef(0)
  const pitch = useRef(0)
  const grounded = useRef(false)
  const lmbHeld = useRef(false)
  const jumpPressed = useRef(false)
  const lookDir = useRef(new THREE.Vector3(0, 0, -1))
  const ready = useRef(false)
  const lockCooldownUntil = useRef(0)
  const groundNormal = useRef(new THREE.Vector3(0, 1, 0))
  const lastTurboAt = useRef(0)
  const coyoteUntil = useRef(0)
  const jumpBufferUntil = useRef(0)
  /** Drag paint: true = select for removal, false = deselect. */
  const editPaintSelect = useRef<boolean | null>(null)
  const lastPaintIdx = useRef(-1)
  const lastRespawnToken = useRef(respawnToken)
  const eyeY = useRef(EYE)

  const attemptPlace = (pieceOverride?: PieceType) => {
    const rb = body.current
    if (!rb || document.pointerLockElement !== gl.domElement) return false
    if (editSessionRef.current) return false
    const t = rb.translation()
    const dir = lookDir.current
    const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const feet = { x: t.x, y: t.y, z: t.z }
    const piece = pieceOverride ?? selectedPieceRef.current
    const result = resolvePlacement(
      piece,
      eye,
      { x: dir.x, y: dir.y, z: dir.z },
      feet,
      rotOffsetRef.current
    )
    const occupied = piecesRef.current.some((p) => pieceKey(p) === pieceKey(result.draft))
    const canPay = canAfford(matsRef.current, selectedMatRef.current, infiniteRef.current)
    const { ok } = evaluateGhost({
      result,
      occupied,
      canPay,
      existing: piecesRef.current,
    })
    if (!ok) return false
    return tryPlace(result.draft)
  }

  const paintSelectTile = () => {
    const session = editSessionRef.current
    if (!session || editPaintSelect.current == null) return
    const piece = piecesRef.current.find((p) => p.id === session.pieceId)
    if (!piece) return
    const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const dir = lookDir.current
    const idx = aimedEditTileIndex(piece, eye, { x: dir.x, y: dir.y, z: dir.z })
    if (idx < 0 || idx === lastPaintIdx.current) return
    if (!session.baseTiles[idx]) return
    lastPaintIdx.current = idx
    setTileSelected(idx, editPaintSelect.current)
  }

  useEffect(() => {
    const el = gl.domElement
    const onClick = () => {
      if (document.pointerLockElement === el) return
      if (performance.now() < lockCooldownUntil.current) return
      try {
        const result = el.requestPointerLock()
        if (result && typeof (result as Promise<void>).catch === 'function') {
          ;(result as Promise<void>).catch(() => {})
        }
      } catch {
        /* ignore SecurityError */
      }
    }
    const onLockChange = () => {
      const lockedNow = document.pointerLockElement === el
      setLocked(lockedNow)
      if (!lockedNow) {
        lockCooldownUntil.current = performance.now() + 700
        lmbHeld.current = false
        editPaintSelect.current = null
      }
    }
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== el) return
      yaw.current -= e.movementX * LOOK_SENS
      pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current - e.movementY * LOOK_SENS))
    }
    const onMouseDown = (e: MouseEvent) => {
      if (document.pointerLockElement !== el) return
      if (e.button === 0) {
        lmbHeld.current = true
        lastTurboAt.current = 0
        if (editSessionRef.current) {
          const session = editSessionRef.current
          const piece = piecesRef.current.find((p) => p.id === session.pieceId)
          if (piece) {
            const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
            const dir = lookDir.current
            const idx = aimedEditTileIndex(piece, eye, { x: dir.x, y: dir.y, z: dir.z })
            if (idx >= 0 && session.baseTiles[idx]) {
              editPaintSelect.current = !session.selected[idx]
              lastPaintIdx.current = -1
              paintSelectTile()
            }
          }
        } else {
          attemptPlace()
          lastTurboAt.current = performance.now()
        }
      } else if (e.button === 2) {
        e.preventDefault()
        if (editSessionRef.current) return
        const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
        const dir = lookDir.current
        const aimed = findAimedPiece(eye, { x: dir.x, y: dir.y, z: dir.z }, piecesRef.current)
        if (aimed) destroyPiece(aimed.id)
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        lmbHeld.current = false
        editPaintSelect.current = null
        lastPaintIdx.current = -1
      }
    }
    const onContextMenu = (e: Event) => {
      if (document.pointerLockElement === el) e.preventDefault()
    }
    const onWheel = (e: WheelEvent) => {
      if (document.pointerLockElement !== el) return
      e.preventDefault()
      rotatePiece(e.deltaY > 0 ? 1 : -1)
    }
    const onEditDown = () => {
      if (document.pointerLockElement !== el) return
      if (editSessionRef.current) return
      const dir = lookDir.current
      const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
      const aimed = findAimedPiece(eye, { x: dir.x, y: dir.y, z: dir.z }, piecesRef.current)
      if (aimed) beginEdit(aimed.id)
    }
    const onEditUp = () => {
      if (document.pointerLockElement !== el) return
      if (editSessionRef.current) confirmEdit()
    }
    const onPlaceKey = (ev: Event) => {
      if (document.pointerLockElement !== el) return
      const detail = (ev as CustomEvent<{ piece: PieceType }>).detail
      if (!detail?.piece) return
      requestAnimationFrame(() => attemptPlace(detail.piece))
    }
    el.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    el.addEventListener('contextmenu', onContextMenu)
    el.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('buildsim-edit-down', onEditDown)
    window.addEventListener('buildsim-edit-up', onEditUp)
    window.addEventListener('buildsim-place-key', onPlaceKey)
    return () => {
      el.removeEventListener('click', onClick)
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('contextmenu', onContextMenu)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('buildsim-edit-down', onEditDown)
      window.removeEventListener('buildsim-edit-up', onEditUp)
      window.removeEventListener('buildsim-place-key', onPlaceKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, setLocked, rotatePiece, camera, beginEdit, confirmEdit, destroyPiece, tryPlace, setTileSelected])

  useEffect(() => {
    if (respawnToken === lastRespawnToken.current) return
    lastRespawnToken.current = respawnToken
    const rb = body.current
    if (!rb) return
    rb.setTranslation({ x: 0, y: 3, z: 12 }, true)
    rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
    yaw.current = 0
    pitch.current = -0.18
  }, [respawnToken])

  useFrame(() => {
    const rb = body.current
    if (!rb) return

    if (!ready.current) {
      ready.current = true
      yaw.current = 0
      pitch.current = -0.18
    }

    const t = rb.translation()
    const k = keys.current
    const crouching = !!(k.ControlLeft || k.ControlRight)
    const targetEye = crouching ? EYE_CROUCH : EYE
    eyeY.current += (targetEye - eyeY.current) * 0.22

    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')
    camera.quaternion.setFromEuler(euler)
    camera.position.set(t.x, t.y + eyeY.current, t.z)
    lookDir.current.set(0, 0, -1).applyQuaternion(camera.quaternion)

    const now = performance.now()

    try {
      // Probe from mid-capsule; longer reach so ramps stay grounded.
      const ray = new rapier.Ray({ x: t.x, y: t.y + 0.75, z: t.z }, { x: 0, y: -1, z: 0 })
      const hit = world.castRayAndGetNormal(ray, 1.55, true, undefined, undefined, undefined, rb)
      if (hit && hit.timeOfImpact < 0.95) {
        grounded.current = true
        groundNormal.current.set(hit.normal.x, hit.normal.y, hit.normal.z)
        // Walls ≈ vertical; 45° ramp normals are ~0.71 — keep those as ground.
        if (hit.normal.y < 0.45) {
          grounded.current = false
          groundNormal.current.set(0, 1, 0)
        }
      } else {
        grounded.current = false
        groundNormal.current.set(0, 1, 0)
      }
    } catch {
      grounded.current = t.y < 2.2
      groundNormal.current.set(0, 1, 0)
    }

    if (grounded.current) coyoteUntil.current = now + COYOTE_MS

    const vel = rb.linvel()
    const lockedNow = document.pointerLockElement === gl.domElement
    let mx = 0
    let mz = 0
    if (lockedNow) {
      if (k.KeyW) mz -= 1
      if (k.KeyS) mz += 1
      if (k.KeyA) mx -= 1
      if (k.KeyD) mx += 1
    }
    let speed = k.ShiftLeft || k.ShiftRight ? SPRINT : MOVE
    if (crouching) speed *= CROUCH_MUL
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current)
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current)
    const wish = new THREE.Vector3()
    wish.addScaledVector(forward, -mz)
    wish.addScaledVector(right, mx)
    if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(speed)

    const ascending = vel.y > 0.5
    const canJump = (grounded.current || now < coyoteUntil.current) && !ascending

    if (grounded.current && !ascending) {
      if (wish.lengthSq() > 0 && SLOPE_FOLLOW) {
        const n = groundNormal.current
        const onSlope = n.y < 0.985
        const dot = wish.x * n.x + wish.y * n.y + wish.z * n.z
        let px = wish.x - n.x * dot
        let py = wish.y - n.y * dot
        let pz = wish.z - n.z * dot
        const plen = Math.hypot(px, py, pz) || 1
        // Slight boost on slopes so 45° ramps don't feel sticky.
        const climb = onSlope ? 1.12 : 1
        px = (px / plen) * speed * climb
        py = (py / plen) * speed * climb
        pz = (pz / plen) * speed * climb
        // Push OUT of the surface (old code stuck into it and buried the capsule).
        const skin = onSlope ? 0.35 : 0.05
        rb.setLinvel({ x: px + n.x * skin, y: py + n.y * skin, z: pz + n.z * skin }, true)
      } else {
        rb.setLinvel({ x: 0, y: Math.min(vel.y, 0), z: 0 }, true)
      }
    } else if (wish.lengthSq() > 0) {
      rb.setLinvel(
        {
          x: vel.x * (1 - AIR_CONTROL) + wish.x * AIR_CONTROL,
          y: vel.y,
          z: vel.z * (1 - AIR_CONTROL) + wish.z * AIR_CONTROL,
        },
        true
      )
    }

    if (lockedNow && k.Space) {
      if (!jumpPressed.current) jumpBufferUntil.current = now + JUMP_BUFFER_MS
      jumpPressed.current = true
    } else {
      jumpPressed.current = false
    }

    if (lockedNow && canJump && now < jumpBufferUntil.current) {
      const jx = wish.lengthSq() > 0 ? wish.x : vel.x
      const jz = wish.lengthSq() > 0 ? wish.z : vel.z
      rb.setLinvel({ x: jx, y: JUMP, z: jz }, true)
      grounded.current = false
      coyoteUntil.current = 0
      jumpBufferUntil.current = 0
    }

    const half = ARENA / 2 - 1
    if (Math.abs(t.x) > half || Math.abs(t.z) > half || t.y < -5) {
      rb.setTranslation({ x: 0, y: 3, z: 12 }, true)
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }

    // Turbo-build / edit select while LMB held
    if (lockedNow && lmbHeld.current) {
      if (editSessionRef.current) {
        paintSelectTile()
      } else if (now - lastTurboAt.current >= TURBO_BUILD_MS) {
        if (attemptPlace()) lastTurboAt.current = now
        else lastTurboAt.current = now
      }
    }

    // Hover tile for blue-grid highlight
    if (lockedNow && editSessionRef.current) {
      const session = editSessionRef.current
      const piece = piecesRef.current.find((p) => p.id === session.pieceId)
      if (piece) {
        const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
        const dir = lookDir.current
        setHoverEditTile(aimedEditTileIndex(piece, eye, { x: dir.x, y: dir.y, z: dir.z }))
      }
    } else {
      setHoverEditTile(-1)
    }
  })

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={[0, 3, 12]}
      enabledRotations={[false, false, false]}
      linearDamping={0.02}
      friction={0}
      mass={1}
      ccd
      lockRotations
    >
      {/* Slightly narrower capsule = less wedging into ramp edges */}
      <CapsuleCollider args={[0.48, 0.28]} position={[0, 0.9, 0]} friction={0} restitution={0} />
    </RigidBody>
  )
}

function pieceTransform(piece: Pick<BuildPiece, 'cx' | 'cy' | 'cz' | 'rot'>) {
  const [x, y, z] = cellCenter(piece.cx, piece.cy, piece.cz)
  const yaw = (piece.rot * Math.PI) / 2
  return { x, y, z, yaw }
}

function resolveTiles(
  piece: Pick<BuildPiece, 'type'> & { tiles?: boolean[] },
  override?: boolean[]
): boolean[] {
  if (override) return override
  if (piece.tiles && piece.tiles.length) return piece.tiles
  return fullEditTiles(piece.type)
}

function MatSurface({
  matType,
  ghost,
  ghostValid,
  color,
}: {
  matType: MatType
  ghost?: boolean
  ghostValid?: boolean
  color?: string
}) {
  const map = ghost ? null : getMatTexture(matType)
  const ghostColor = ghostValid === false ? '#f87171' : '#7dd3fc'
  const ghostEmissive = ghostValid === false ? '#ef4444' : '#38bdf8'
  return (
    <meshStandardMaterial
      map={map ?? undefined}
      color={color ?? (ghost ? ghostColor : '#ffffff')}
      transparent={!!ghost || !!color}
      opacity={ghost ? 0.5 : color ? 0.55 : 1}
      depthWrite={!ghost && !color}
      roughness={ghost ? 0.45 : MAT_ROUGHNESS[matType]}
      metalness={ghost ? 0.05 : MAT_METALNESS[matType]}
      emissive={ghost ? ghostEmissive : color ? color : '#000000'}
      emissiveIntensity={ghost ? 0.35 : color ? 0.25 : 0}
    />
  )
}

/** Render only remaining edit tiles (doors / windows / half-stairs, etc.). */
function PieceMesh({
  piece,
  ghost,
  ghostValid = true,
  tilesOverride,
  editPreview,
}: {
  piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'> & { mat?: MatType; tiles?: boolean[] }
  ghost?: boolean
  ghostValid?: boolean
  tilesOverride?: boolean[]
  /** When true, missing draft tiles show as red outlines. */
  editPreview?: boolean
}) {
  const matType = piece.mat ?? 'wood'
  const { x, y, z, yaw } = pieceTransform(piece)
  const t = piece.type
  const tiles = resolveTiles(piece, tilesOverride)
  const allPresent = tiles.every(Boolean)

  const mat = (extra?: { color?: string }) => (
    <MatSurface matType={matType} ghost={ghost} ghostValid={ghostValid} color={extra?.color} />
  )

  if (t === 'floor') {
    const tw = (CELL - 0.08) / 3
    const td = (CELL - 0.08) / 3
    return (
      <group position={[x, y + 0.08, z]}>
        {tiles.map((on, i) => {
          if (!on && !editPreview) return null
          const col = i % 3
          const row = Math.floor(i / 3)
          const lx = (col - 1) * tw
          const lz = (row - 1) * td
          return (
            <mesh
              key={i}
              castShadow={!ghost && on}
              receiveShadow={!ghost && on}
              position={[lx, 0, lz]}
            >
              <boxGeometry args={[tw + 0.02, on ? 0.16 : 0.04, td + 0.02]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
      </group>
    )
  }

  if (t === 'wall') {
    const offset = CELL / 2 - 0.08
    const tw = (CELL - 0.08) / 3
    const th = CELL / 3
    return (
      <group position={[x, y + CELL / 2, z]} rotation={[0, yaw, 0]}>
        {tiles.map((on, i) => {
          if (!on && !editPreview) return null
          const col = i % 3
          const row = Math.floor(i / 3)
          const lx = (col - 1) * tw
          const ly = (1 - row) * th
          return (
            <mesh
              key={i}
              castShadow={!ghost && on}
              receiveShadow={!ghost && on}
              position={[lx, ly, offset]}
            >
              <boxGeometry args={[tw - 0.04, th - 0.04, on ? 0.16 : 0.05]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
      </group>
    )
  }

  if (t === 'ramp') {
    const stripW = (CELL - 0.08) / 3
    return (
      <group position={[x, y + CELL / 2, z]} rotation={[0, yaw, 0]}>
        {tiles.map((on, i) => {
          if (!on && !editPreview) return null
          const lx = (i - 1) * stripW
          return (
            <mesh
              key={i}
              castShadow={!ghost && on}
              receiveShadow={!ghost && on}
              position={[lx, 0, 0]}
              rotation={[-Math.PI / 4, 0, 0]}
            >
              <boxGeometry args={[stripW - 0.05, on ? 0.2 : 0.06, CELL * Math.SQRT2]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
      </group>
    )
  }

  // Cone / roof: squat square pyramid (wiki 5.12×5.12×1.92 — half wall height).
  if (allPresent && !editPreview) {
    return (
      <group position={[x, y + CONE_HEIGHT / 2, z]}>
        <mesh castShadow={!ghost} receiveShadow={!ghost} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[CONE_BASE_RADIUS, CONE_HEIGHT, 4]} />
          {mat()}
        </mesh>
      </group>
    )
  }
  // Partial 2×2 edits ≈ raised corners (quarter-pyramids).
  const corner = CELL * 0.28
  const cornerR = CONE_BASE_RADIUS * 0.52
  return (
    <group position={[x, y + CONE_HEIGHT / 2, z]}>
      {tiles.map((on, i) => {
        if (!on && !editPreview) return null
        const col = i % 2
        const row = Math.floor(i / 2)
        const lx = (col === 0 ? -1 : 1) * corner
        const lz = (row === 0 ? -1 : 1) * corner
        const h = on ? CONE_HEIGHT : CONE_HEIGHT * 0.25
        return (
          <mesh
            key={i}
            castShadow={!ghost && on}
            receiveShadow={!ghost && on}
            position={[lx, on ? 0 : -CONE_HEIGHT * 0.2, lz]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <coneGeometry args={[cornerR, h, 4]} />
            {mat(on ? undefined : { color: '#f87171' })}
          </mesh>
        )
      })}
    </group>
  )
}

function PieceCollider({ piece }: { piece: BuildPiece }) {
  const { x, y, z, yaw } = pieceTransform(piece)
  const t = piece.type
  const tiles = resolveTiles(withDefaultTiles(piece))

  if (t === 'floor') {
    const tw = (CELL - 0.08) / 3
    const td = (CELL - 0.08) / 3
    return (
      <RigidBody type="fixed" colliders={false} position={[x, y + 0.08, z]}>
        {tiles.map((on, i) => {
          if (!on) return null
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <CuboidCollider
              key={i}
              args={[(tw + 0.02) / 2, 0.08, (td + 0.02) / 2]}
              position={[(col - 1) * tw, 0, (row - 1) * td]}
            />
          )
        })}
      </RigidBody>
    )
  }
  if (t === 'wall') {
    const offset = CELL / 2 - 0.08
    const tw = (CELL - 0.08) / 3
    const th = CELL / 3
    return (
      <RigidBody type="fixed" colliders={false} position={[x, y + CELL / 2, z]} rotation={[0, yaw, 0]}>
        {tiles.map((on, i) => {
          if (!on) return null
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <CuboidCollider
              key={i}
              args={[(tw - 0.04) / 2, (th - 0.04) / 2, 0.08]}
              position={[(col - 1) * tw, (1 - row) * th, offset]}
            />
          )
        })}
      </RigidBody>
    )
  }
  if (t === 'ramp') {
    const stripW = (CELL - 0.08) / 3
    // Thick tilted wedge (not stair steps) — capsules wedge into step faces and sink.
    // Shift collider along -normal so the walkable face matches the thin visual mesh.
    const meshHalf = 0.1
    const sink = RAMP_COLLIDER_HALF_THICK - meshHalf
    const ny = Math.SQRT1_2
    return (
      <RigidBody type="fixed" colliders={false} position={[x, y + CELL / 2, z]} rotation={[0, yaw, 0]}>
        {tiles.map((on, strip) => {
          if (!on) return null
          const lx = (strip - 1) * stripW
          return (
            <CuboidCollider
              key={strip}
              args={[(stripW + 0.06) / 2, RAMP_COLLIDER_HALF_THICK, (CELL * Math.SQRT2) / 2]}
              position={[lx, -sink * ny, sink * ny]}
              rotation={[-Math.PI / 4, 0, 0]}
              friction={0.45}
              restitution={0}
            />
          )
        })}
      </RigidBody>
    )
  }
  // Cone / roof — short pyramid collider (half tile tall).
  if (tiles.every(Boolean)) {
    return (
      <RigidBody type="fixed" colliders={false} position={[x, y + CONE_HEIGHT / 2, z]}>
        <CuboidCollider args={[CELL * 0.4, CONE_HEIGHT / 2, CELL * 0.4]} />
      </RigidBody>
    )
  }
  const corner = CELL * 0.28
  return (
    <RigidBody type="fixed" colliders={false} position={[x, y + CONE_HEIGHT / 2, z]}>
      {tiles.map((on, i) => {
        if (!on) return null
        const col = i % 2
        const row = Math.floor(i / 2)
        return (
          <CuboidCollider
            key={i}
            args={[CELL * 0.18, CONE_HEIGHT / 2, CELL * 0.18]}
            position={[(col === 0 ? -1 : 1) * corner, 0, (row === 0 ? -1 : 1) * corner]}
          />
        )
      })}
    </RigidBody>
  )
}

/** Fortnite blue edit grid — select tiles to remove. */
function EditGridOverlay({
  piece,
  baseTiles,
  selected,
  hover,
}: {
  piece: BuildPiece
  baseTiles: boolean[]
  selected: boolean[]
  hover: number
}) {
  const { w, h } = editTileSize(piece.type)
  const isWall = piece.type === 'wall'
  const isRamp = piece.type === 'ramp'

  return (
    <group>
      {baseTiles.map((on, i) => {
        if (!on) return null
        const c = editTileWorldCenter(piece, i)
        const isSel = selected[i]
        const isHover = hover === i
        const color = isSel ? '#e0f2fe' : isHover ? '#7dd3fc' : '#38bdf8'
        const opacity = isSel ? 0.92 : isHover ? 0.75 : 0.55
        return (
          <mesh
            key={i}
            position={[c.x, c.y, c.z]}
            rotation={
              isWall
                ? [0, c.yaw, 0]
                : isRamp
                  ? [-Math.PI / 4, c.yaw, 0]
                  : [-Math.PI / 2, c.yaw, 0]
            }
          >
            <planeGeometry args={[w * 0.92, isRamp ? w * 1.2 : h * 0.92]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function PlacedPieces() {
  const { pieces, editSession, hoverEditTile } = useSim()
  return (
    <>
      {pieces.map((p) => {
        const editing = editSession?.pieceId === p.id
        return (
          <group key={p.id}>
            {!editing && <PieceMesh piece={p} />}
            {editing && editSession && (
              <EditGridOverlay
                piece={p}
                baseTiles={editSession.baseTiles}
                selected={editSession.selected}
                hover={hoverEditTile}
              />
            )}
            <PieceCollider piece={withDefaultTiles(p)} />
          </group>
        )
      })}
    </>
  )
}

function PlacementGhost() {
  const { camera, gl } = useThree()
  const {
    selectedMat,
    piecesRef,
    matsRef,
    infiniteRef,
    selectedMatRef,
    selectedPieceRef,
    rotOffsetRef,
    editSession,
  } = useSim()
  const group = useRef<THREE.Group>(null)
  const lastKey = useRef('')
  const lastOk = useRef(true)
  const look = useRef(new THREE.Vector3())
  const playerBody = useRef({ x: 0, y: 0, z: 0 })
  const [ghost, setGhost] = useState<BuildPiece | null>(null)
  const [ghostOk, setGhostOk] = useState(true)

  useFrame(() => {
    const g = group.current
    if (document.pointerLockElement !== gl.domElement || editSession) {
      if (g) g.visible = false
      return
    }
    if (g) g.visible = true

    camera.getWorldDirection(look.current)
    const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    playerBody.current = { x: eye.x, y: eye.y - 1.55, z: eye.z }

    const result = resolvePlacement(
      selectedPieceRef.current,
      eye,
      { x: look.current.x, y: look.current.y, z: look.current.z },
      playerBody.current,
      rotOffsetRef.current
    )
    const key = pieceKey(result.draft)
    const occupied = piecesRef.current.some((p) => pieceKey(p) === key)
    const canPay = canAfford(matsRef.current, selectedMatRef.current, infiniteRef.current)
    const { ok } = evaluateGhost({
      result,
      occupied,
      canPay,
      existing: piecesRef.current,
    })

    if (key !== lastKey.current || ok !== lastOk.current) {
      lastKey.current = key
      lastOk.current = ok
      setGhost({
        ...result.draft,
        id: key,
        mat: selectedMatRef.current,
        tiles: fullEditTiles(result.draft.type),
      })
      setGhostOk(ok)
    }
  })

  if (!ghost) return null
  return (
    <group ref={group}>
      <PieceMesh piece={{ ...ghost, mat: selectedMat }} ghost ghostValid={ghostOk} />
    </group>
  )
}
