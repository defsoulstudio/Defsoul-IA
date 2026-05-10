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
 
            // swirl mais pronunciado
            float swirl = sin(angle * 6.0 - uTime * 0.45) * 0.022;
            dist += swirl;
 
            // core negro
            float core = smoothstep(0.17, 0.07, dist);
 
            // anel de acreção mais brilhante e espesso
            float ring =
              smoothstep(0.32, 0.22, dist) -
              smoothstep(0.44, 0.34, dist);
 
            // halo externo mais visível
            float glow = smoothstep(0.72, 0.12, dist);
 
            // segundo halo suave
            float outerGlow = smoothstep(0.85, 0.3, dist) * 0.4;
 
            // estrelas mais densas e brilhantes
            float stars = step(0.994, random(vUv * 280.0));
 
            vec3 color = vec3(0.0);
 
            // halo violeta externo
            color += vec3(0.30, 0.18, 0.52) * glow * 0.38;
            color += vec3(0.18, 0.10, 0.35) * outerGlow;
 
            // anel branco-violeta
            color += vec3(1.0, 0.95, 1.0) * ring * 0.55;
 
            // destaque quente no anel (laranja suave)
            color += vec3(0.9, 0.55, 0.25) * ring * 0.18;
 
            // mascara core
            color *= (1.0 - core);
 
            // estrelas
            color += vec3(stars) * 0.35;
 
            // vignette suave
            float vignette = smoothstep(1.0, 0.18, dist);
            color *= vignette;
 
            gl_FragColor = vec4(color, 0.72);
          }
        `}
      />
    </mesh>
  )
}
 
export function BlackHoleShader() {
  return (
    // opacity subiu de 70 → 88, mais presença no hero
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.88]">
      <Canvas>
        <Plane />
      </Canvas>
    </div>
  )
}