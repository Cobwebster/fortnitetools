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
  PICKAXE_DAMAGE,
  PICKAXE_SWING_MS,
  TURBO_BUILD_MS,
  canAfford,
  cellCenter,
  evaluateGhost,
  isPhasing,
  pieceHpNow,
  pieceKey,
  pieceMaxHp,
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
import { Billboard } from '@react-three/drei'
import { getMatTexture, MAT_METALNESS, MAT_ROUGHNESS } from './build-materials'
import { ArenaEnvironment } from './build-env'
import { useSim } from './sim-context'

const ARENA = 80
const EYE = 1.55
const EYE_CROUCH = 1.05
/** ~1.3 tiles/s walk, ~1.7 sprint on a 4u tile — closer to BR than the old 3.5 tiles/s. */
const MOVE = 5.3
const SPRINT = 6.9
const CROUCH_MUL = 0.42
const JUMP = 7.15
const AIR_CONTROL = 0.26
const GRAVITY = -30
const SLOPE_FOLLOW = 1
/** Half-thickness of the walkable ramp wedge (local Y before tilt). */
const RAMP_COLLIDER_HALF_THICK = 0.7
const COYOTE_MS = 90
const JUMP_BUFFER_MS = 100
const LOOK_SENS = 0.0024
const RAMP_CLIMB = 1.06

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
          camera={{ fov: 75, near: 0.1, far: 360, position: [0, 3, 14] }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor('#87b7dc', 1)
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.08
            gl.shadowMap.type = THREE.PCFShadowMap
            camera.lookAt(0, 1, 0)
          }}
        >
          <color attach="background" args={['#87b7dc']} />
          <fog attach="fog" args={['#9ec6e4', 70, 210]} />
          <hemisphereLight args={['#e8f4ff', '#4a6b3a', 0.9]} />
          <ambientLight intensity={0.42} />
          <directionalLight
            castShadow
            intensity={1.35}
            position={[28, 42, 18]}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />

          <ArenaEnvironment arena={ARENA} />
          <gridHelper args={[ARENA, ARENA / CELL, '#3d6e42', '#4a7c48']} position={[0, 0.03, 0]} />

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
    damagePiece,
    setAimedPieceId,
    swingPickaxe,
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
    placementHintRef,
    editSession,
    locked,
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
  const lastPickaxeAt = useRef(0)
  const rmbHeld = useRef(false)
  const pickaxeGroup = useRef<THREE.Group>(null)
  const pickaxeSwing = useRef(0)
  const wishRef = useRef({ forward: 0, strafe: 0 })
  const lastAimedId = useRef<string | null>(null)

  const placementHint = () => ({
    strafe: wishRef.current.strafe,
    forward: wishRef.current.forward,
    airborne: !grounded.current,
  })

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
      rotOffsetRef.current,
      placementHint()
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

  const tryPickaxe = () => {
    if (document.pointerLockElement !== gl.domElement) return
    if (editSessionRef.current) return
    const now = performance.now()
    if (now - lastPickaxeAt.current < PICKAXE_SWING_MS) return
    lastPickaxeAt.current = now
    pickaxeSwing.current = 1
    swingPickaxe()
    const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const dir = lookDir.current
    const aimed = findAimedPiece(eye, { x: dir.x, y: dir.y, z: dir.z }, piecesRef.current)
    if (aimed) damagePiece(aimed.id, PICKAXE_DAMAGE)
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
        rmbHeld.current = false
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
        rmbHeld.current = true
        tryPickaxe()
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        lmbHeld.current = false
        editPaintSelect.current = null
        lastPaintIdx.current = -1
      }
      if (e.button === 2) rmbHeld.current = false
    }
    const onContextMenu = (e: Event) => {
      if (document.pointerLockElement === el) e.preventDefault()
    }
    const onWheel = (e: WheelEvent) => {
      const locked = document.pointerLockElement === el
      const arena = el.closest('[data-build-sim]')
      const overArena = arena?.contains(e.target as Node) ?? false
      // Pointer-lock often delivers wheel on document, not the canvas — block page scroll either way.
      if (!locked && !overArena) return
      e.preventDefault()
      if (locked) rotatePiece(e.deltaY > 0 ? 1 : -1)
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
    document.addEventListener('wheel', onWheel, { passive: false })
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
      document.removeEventListener('wheel', onWheel)
      window.removeEventListener('buildsim-edit-down', onEditDown)
      window.removeEventListener('buildsim-edit-up', onEditUp)
      window.removeEventListener('buildsim-place-key', onPlaceKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, setLocked, rotatePiece, camera, beginEdit, confirmEdit, damagePiece, tryPlace, setTileSelected])

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
    wishRef.current = { forward: -mz, strafe: mx }
    placementHintRef.current = {
      strafe: mx,
      forward: -mz,
      airborne: !grounded.current,
    }

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
        const climb = onSlope ? RAMP_CLIMB : 1
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

    if (lockedNow && !editSessionRef.current) {
      const eye = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
      const aimed = findAimedPiece(eye, { x: lookDir.current.x, y: lookDir.current.y, z: lookDir.current.z }, piecesRef.current)
      const nextId = aimed?.id ?? null
      if (nextId !== lastAimedId.current) {
        lastAimedId.current = nextId
        setAimedPieceId(nextId)
      }
      if (rmbHeld.current) tryPickaxe()
    } else if (lastAimedId.current !== null) {
      lastAimedId.current = null
      setAimedPieceId(null)
    }

    const axe = pickaxeGroup.current
    if (axe) {
      if (axe.parent !== camera) camera.add(axe)
      axe.visible = lockedNow && !editSessionRef.current
      pickaxeSwing.current = Math.max(0, pickaxeSwing.current - 0.085)
      const s = pickaxeSwing.current
      axe.rotation.set(-0.18 - s * 1.15, 0.22, 0.42 + s * 0.85)
      axe.position.set(0.32, -0.28 - s * 0.1, -0.48)
    }
  })

  return (
    <>
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
        <CapsuleCollider args={[0.48, 0.28]} position={[0, 0.9, 0]} friction={0} restitution={0} />
      </RigidBody>
      <group ref={pickaxeGroup} visible={locked && !editSession}>
        <mesh position={[0, -0.08, 0]} rotation={[0.35, 0.1, 0.15]} castShadow>
          <cylinderGeometry args={[0.016, 0.02, 0.52, 7]} />
          <meshStandardMaterial color="#3a2416" roughness={0.75} />
        </mesh>
        <mesh position={[0.01, 0.2, 0.02]} rotation={[0.1, 0.2, 0.55]} castShadow>
          <boxGeometry args={[0.26, 0.07, 0.045]} />
          <meshStandardMaterial color="#9aa8b5" metalness={0.72} roughness={0.28} />
        </mesh>
        <mesh position={[0.12, 0.22, 0.03]} rotation={[0.1, 0.2, 0.2]}>
          <coneGeometry args={[0.045, 0.1, 4]} />
          <meshStandardMaterial color="#c5d0d8" metalness={0.65} roughness={0.32} />
        </mesh>
      </group>
    </>
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
  phasing,
}: {
  matType: MatType
  ghost?: boolean
  ghostValid?: boolean
  color?: string
  phasing?: boolean
}) {
  if (phasing) {
    return (
      <meshStandardMaterial
        color="#f4d35e"
        transparent
        opacity={0.46}
        depthWrite={false}
        roughness={0.32}
        metalness={0.08}
        emissive="#f0c14b"
        emissiveIntensity={0.95}
      />
    )
  }
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

function TrimMat() {
  return <meshStandardMaterial color="#1c1610" roughness={0.62} metalness={0.22} />
}

/** Render only remaining edit tiles (doors / windows / half-stairs, etc.). */
function PieceMesh({
  piece,
  ghost,
  ghostValid = true,
  tilesOverride,
  editPreview,
  now,
}: {
  piece: Pick<BuildPiece, 'type' | 'cx' | 'cy' | 'cz' | 'rot'> & {
    mat?: MatType
    tiles?: boolean[]
    placedAt?: number
  }
  ghost?: boolean
  ghostValid?: boolean
  tilesOverride?: boolean[]
  /** When true, missing draft tiles show as red outlines. */
  editPreview?: boolean
  now?: number
}) {
  const matType = piece.mat ?? 'wood'
  const { x, y, z, yaw } = pieceTransform(piece)
  const t = piece.type
  const tiles = resolveTiles(piece, tilesOverride)
  const allPresent = tiles.every(Boolean)
  const phasing = !ghost && isPhasing(piece, now)
  const showTrim = !ghost && !phasing && !editPreview && allPresent

  const mat = (extra?: { color?: string }) => (
    <MatSurface
      matType={matType}
      ghost={ghost}
      ghostValid={ghostValid}
      color={extra?.color}
      phasing={phasing}
    />
  )

  if (t === 'floor') {
    const tw = (CELL - 0.08) / 3
    const td = (CELL - 0.08) / 3
    const edge = CELL * 0.48
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
              <boxGeometry args={[tw + 0.02, on ? 0.14 : 0.04, td + 0.02]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
        {showTrim && (
          <>
            <mesh position={[0, 0.09, edge]}><boxGeometry args={[CELL * 0.98, 0.1, 0.1]} /><TrimMat /></mesh>
            <mesh position={[0, 0.09, -edge]}><boxGeometry args={[CELL * 0.98, 0.1, 0.1]} /><TrimMat /></mesh>
            <mesh position={[edge, 0.09, 0]}><boxGeometry args={[0.1, 0.1, CELL * 0.98]} /><TrimMat /></mesh>
            <mesh position={[-edge, 0.09, 0]}><boxGeometry args={[0.1, 0.1, CELL * 0.98]} /><TrimMat /></mesh>
          </>
        )}
      </group>
    )
  }

  if (t === 'wall') {
    const offset = CELL / 2 - 0.08
    const tw = (CELL - 0.08) / 3
    const th = CELL / 3
    const half = CELL * 0.46
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
              <boxGeometry args={[tw - 0.08, th - 0.08, on ? 0.12 : 0.05]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
        {showTrim && (
          <>
            <mesh position={[-half, 0, offset]}><boxGeometry args={[0.14, CELL * 0.98, 0.2]} /><TrimMat /></mesh>
            <mesh position={[half, 0, offset]}><boxGeometry args={[0.14, CELL * 0.98, 0.2]} /><TrimMat /></mesh>
            <mesh position={[0, half, offset]}><boxGeometry args={[CELL * 0.98, 0.14, 0.2]} /><TrimMat /></mesh>
            <mesh position={[0, -half, offset]}><boxGeometry args={[CELL * 0.98, 0.14, 0.2]} /><TrimMat /></mesh>
          </>
        )}
      </group>
    )
  }

  if (t === 'ramp') {
    const stripW = (CELL - 0.08) / 3
    const railX = CELL * 0.46
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
              <boxGeometry args={[stripW - 0.08, on ? 0.16 : 0.06, CELL * Math.SQRT2]} />
              {mat(on ? undefined : { color: '#f87171' })}
            </mesh>
          )
        })}
        {showTrim && (
          <>
            <mesh position={[-railX, 0, 0]} rotation={[-Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.14, 0.22, CELL * Math.SQRT2]} />
              <TrimMat />
            </mesh>
            <mesh position={[railX, 0, 0]} rotation={[-Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.14, 0.22, CELL * Math.SQRT2]} />
              <TrimMat />
            </mesh>
          </>
        )}
      </group>
    )
  }

  // Cone / roof: squat square pyramid (wiki 5.12×5.12×1.92 — half wall height).
  if (allPresent && !editPreview) {
    return (
      <group position={[x, y + CONE_HEIGHT / 2, z]}>
        <mesh castShadow={!ghost} receiveShadow={!ghost} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[CONE_BASE_RADIUS * 0.92, CONE_HEIGHT, 4]} />
          {mat()}
        </mesh>
        {showTrim && (
          <mesh position={[0, -CONE_HEIGHT / 2 + 0.06, 0]}>
            <boxGeometry args={[CELL * 0.96, 0.12, CELL * 0.96]} />
            <TrimMat />
          </mesh>
        )}
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

function useNow(ms = 80) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return now
}

function PieceHpBar({ piece, now }: { piece: BuildPiece; now: number }) {
  const { x, y, z } = pieceTransform(piece)
  const hp = pieceHpNow(piece, now)
  const max = pieceMaxHp(piece.mat)
  const pct = Math.max(0, Math.min(1, hp / max))
  const lift =
    piece.type === 'floor' ? 0.5 : piece.type === 'cone' ? CONE_HEIGHT + 0.4 : CELL * 0.58
  const fill = pct > 0.45 ? '#4ade80' : pct > 0.2 ? '#fbbf24' : '#f87171'
  return (
    <Billboard position={[x, y + lift, z]}>
      <mesh>
        <planeGeometry args={[1.55, 0.16]} />
        <meshBasicMaterial color="#0b0b0b" transparent opacity={0.72} depthTest={false} />
      </mesh>
      <mesh position={[-(1.4 * (1 - pct)) / 2, 0, 0.002]} scale={[pct || 0.001, 1, 1]}>
        <planeGeometry args={[1.4, 0.09]} />
        <meshBasicMaterial color={fill} depthTest={false} />
      </mesh>
    </Billboard>
  )
}

function PlacedPieces() {
  const { pieces, editSession, hoverEditTile, aimedPieceId } = useSim()
  const now = useNow(80)
  return (
    <>
      {pieces.map((p) => {
        const editing = editSession?.pieceId === p.id
        const phasing = isPhasing(p, now)
        const showHp = !editing && (aimedPieceId === p.id || (p.damage ?? 0) > 0)
        return (
          <group key={p.id}>
            {!editing && <PieceMesh piece={p} now={now} />}
            {editing && editSession && (
              <EditGridOverlay
                piece={p}
                baseTiles={editSession.baseTiles}
                selected={editSession.selected}
                hover={hoverEditTile}
              />
            )}
            {!phasing && <PieceCollider piece={withDefaultTiles(p)} />}
            {showHp && <PieceHpBar piece={p} now={now} />}
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
    placementHintRef,
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
      rotOffsetRef.current,
      placementHintRef.current
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
