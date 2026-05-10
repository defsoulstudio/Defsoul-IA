'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function Plane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime
    }
  })

  return (
    <mesh scale={[12, 12, 1]}>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;

          uniform float uTime;
          varying vec2 vUv;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv - 0.5;

            float dist = length(uv);
            float angle = atan(uv.y, uv.x);

            float swirl = sin(angle * 6.0 - uTime * 0.35) * 0.012;
            dist += swirl;

            float core = smoothstep(0.17, 0.09, dist);

            float ring =
              smoothstep(0.34, 0.27, dist) -
              smoothstep(0.42, 0.34, dist);

            float glow = smoothstep(0.7, 0.18, dist);

            float stars = step(0.998, random(vUv * 260.0));

            vec3 color = vec3(0.0);

            color += vec3(0.20, 0.16, 0.32) * glow * 0.16;
            color += vec3(0.95, 0.92, 1.0) * ring * 0.18;

            color *= (1.0 - core);
            color += vec3(stars) * 0.16;

            float vignette = smoothstep(1.0, 0.25, dist);
            color *= vignette;

            gl_FragColor = vec4(color, 0.42);
          }
        `}
      />
    </mesh>
  )
}

export function BlackHoleShader() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Canvas>
        <Plane />
      </Canvas>
    </div>
  )
}