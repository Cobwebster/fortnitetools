'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import * as THREE from 'three'
import { CELL } from '@/lib/build-simulator'
import { getCloudTexture, getGrassTexture, getTileGridTexture } from './build-materials'

const SUN = [28, 42, 18] as const

const CLOUD_LAYERS: { pos: [number, number, number]; scale: [number, number]; spin: number }[] = [
  { pos: [-38, 46, -62], scale: [42, 16], spin: 0.012 },
  { pos: [48, 52, -44], scale: [50, 18], spin: -0.01 },
  { pos: [-8, 58, -78], scale: [36, 14], spin: 0.008 },
  { pos: [22, 44, 70], scale: [40, 15], spin: -0.014 },
  { pos: [-70, 50, 18], scale: [46, 17], spin: 0.009 },
  { pos: [72, 56, 36], scale: [34, 13], spin: -0.011 },
  { pos: [-52, 40, 64], scale: [38, 14], spin: 0.007 },
  { pos: [8, 62, 8], scale: [28, 11], spin: -0.006 },
]

const HILLS: { a: number; r: number; w: number; h: number; d: number; color: string }[] = [
  { a: 0.05, r: 210, w: 58, h: 11, d: 28, color: '#5a6e62' },
  { a: 0.38, r: 224, w: 70, h: 15, d: 34, color: '#627568' },
  { a: 0.72, r: 206, w: 48, h: 9, d: 26, color: '#54685c' },
  { a: 1.05, r: 232, w: 76, h: 17, d: 36, color: '#5c7064' },
  { a: 1.42, r: 214, w: 54, h: 12, d: 30, color: '#68786a' },
  { a: 1.78, r: 220, w: 64, h: 13, d: 32, color: '#4e6458' },
  { a: 2.15, r: 208, w: 50, h: 10, d: 26, color: '#5a6c60' },
  { a: 2.52, r: 228, w: 72, h: 16, d: 34, color: '#52665a' },
  { a: 2.9, r: 216, w: 60, h: 12, d: 30, color: '#627468' },
  { a: 3.28, r: 204, w: 44, h: 8, d: 24, color: '#586c60' },
  { a: 3.65, r: 236, w: 80, h: 18, d: 38, color: '#5a6a5e' },
  { a: 4.05, r: 212, w: 54, h: 11, d: 28, color: '#66786c' },
  { a: 4.42, r: 226, w: 68, h: 14, d: 32, color: '#506458' },
  { a: 4.8, r: 218, w: 58, h: 12, d: 30, color: '#5c7064' },
  { a: 5.2, r: 230, w: 70, h: 15, d: 34, color: '#64766a' },
  { a: 5.58, r: 208, w: 48, h: 9, d: 26, color: '#54685c' },
  { a: 5.95, r: 222, w: 62, h: 13, d: 30, color: '#5a6e62' },
]

function CloudBillboard({
  pos,
  scale,
  spin,
  map,
}: {
  pos: [number, number, number]
  scale: [number, number]
  spin: number
  map: THREE.Texture
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ camera }) => {
    const m = ref.current
    if (!m) return
    const t = performance.now() * 0.00007
    m.position.set(pos[0] + Math.sin(t + spin * 40) * 8, pos[1], pos[2] + Math.cos(t * 0.7) * 5)
    m.lookAt(camera.position)
  })
  return (
    <mesh ref={ref} position={pos} renderOrder={-1}>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={0.88}
        depthWrite={false}
        fog={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function CloudField() {
  const map = useMemo(() => getCloudTexture(), [])
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.012
  })
  return (
    <group ref={group}>
      {CLOUD_LAYERS.map((c, i) => (
        <CloudBillboard key={i} pos={c.pos} scale={c.scale} spin={c.spin} map={map} />
      ))}
    </group>
  )
}

function HillMesh({
  a,
  r,
  w,
  h,
  d,
  color,
}: {
  a: number
  r: number
  w: number
  h: number
  d: number
  color: string
}) {
  const x = Math.cos(a) * r
  const z = Math.sin(a) * r
  return (
    <mesh position={[x, h * 0.18 - 3.2, z]} scale={[w, h, d]} receiveShadow>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  )
}

export function ArenaEnvironment({ arena }: { arena: number }) {
  const grass = useMemo(() => {
    const t = getGrassTexture().clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(28, 28)
    t.needsUpdate = true
    return t
  }, [])
  const farGrass = useMemo(() => {
    const t = getGrassTexture().clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(64, 64)
    t.needsUpdate = true
    return t
  }, [])
  const tiles = useMemo(() => {
    const t = getTileGridTexture().clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    const n = Math.max(1, Math.round(arena / CELL))
    t.repeat.set(n, n)
    t.needsUpdate = true
    return t
  }, [arena])

  return (
    <>
      <Sky
        sunPosition={SUN}
        turbidity={2.05}
        rayleigh={1.2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <CloudField />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <planeGeometry args={[900, 900]} />
        <meshStandardMaterial color="#2a6a88" roughness={0.22} metalness={0.28} />
      </mesh>

      {HILLS.map((h, i) => (
        <HillMesh key={i} {...h} />
      ))}

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <planeGeometry args={[arena * 3.2, arena * 3.2]} />
        <meshStandardMaterial map={farGrass} color="#4a8a42" roughness={1} />
      </mesh>

      <mesh position={[0, -1.05, arena / 2 + 0.4]}>
        <boxGeometry args={[arena + 2.4, 2.1, 1.2]} />
        <meshStandardMaterial color="#6b5340" roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.05, -arena / 2 - 0.4]}>
        <boxGeometry args={[arena + 2.4, 2.1, 1.2]} />
        <meshStandardMaterial color="#6b5340" roughness={0.95} />
      </mesh>
      <mesh position={[arena / 2 + 0.4, -1.05, 0]}>
        <boxGeometry args={[1.2, 2.1, arena + 2.4]} />
        <meshStandardMaterial color="#624c3a" roughness={0.95} />
      </mesh>
      <mesh position={[-arena / 2 - 0.4, -1.05, 0]}>
        <boxGeometry args={[1.2, 2.1, arena + 2.4]} />
        <meshStandardMaterial color="#624c3a" roughness={0.95} />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[arena, arena]} />
        <meshStandardMaterial map={grass} color="#ffffff" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <planeGeometry args={[arena, arena]} />
        <meshBasicMaterial map={tiles} transparent opacity={0.42} depthWrite={false} />
      </mesh>
    </>
  )
}
