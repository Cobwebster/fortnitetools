'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import * as THREE from 'three'
import { getCloudTexture, getGrassTexture } from './build-materials'

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

export function ArenaEnvironment({ arena }: { arena: number }) {
  const grass = useMemo(() => {
    const t = getGrassTexture().clone()
    t.repeat.set(16, 16)
    t.needsUpdate = true
    return t
  }, [])
  const farGrass = useMemo(() => {
    const t = getGrassTexture().clone()
    t.repeat.set(48, 48)
    t.needsUpdate = true
    return t
  }, [])

  return (
    <>
      <Sky
        sunPosition={SUN}
        turbidity={3.4}
        rayleigh={0.55}
        mieCoefficient={0.004}
        mieDirectionalG={0.82}
      />
      <CloudField />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <planeGeometry args={[arena * 4, arena * 4]} />
        <meshStandardMaterial map={farGrass} color="#3d7a38" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[arena, arena]} />
        <meshStandardMaterial map={grass} color="#5a9a4c" roughness={0.95} />
      </mesh>
    </>
  )
}
