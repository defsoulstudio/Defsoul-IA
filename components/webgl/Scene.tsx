'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

function Core() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const mouseX = state.mouse.x * 0.8
    const mouseY = state.mouse.y * 0.8

    meshRef.current.rotation.x +=
      0.003 + (mouseY - meshRef.current.rotation.x) * 0.04

    meshRef.current.rotation.y +=
      0.004 + (mouseX - meshRef.current.rotation.y) * 0.04

    const scale =
      1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04

    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <Float
      speed={1.8}
      rotationIntensity={0.6}
      floatIntensity={1.8}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 12]} />

        <MeshDistortMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={0.35}
          roughness={0.12}
          metalness={0.42}
          distort={0.45}
          speed={2.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

export function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-65">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.35} />

        <pointLight
          position={[3, 2, 4]}
          intensity={2.8}
          color="#ffffff"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={1.6}
          color="#8b5cf6"
        />

        <pointLight
          position={[0, 4, 2]}
          intensity={1.4}
          color="#ffffff"
        />

        <Core />

        <EffectComposer>
          <Bloom
            intensity={0.35}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.75}
          />

          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0008, 0.0008]}
          />

          <Vignette
            eskil={false}
            offset={0.18}
            darkness={0.55}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}