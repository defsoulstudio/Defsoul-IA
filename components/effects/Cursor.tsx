'use client'

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import { useEffect } from 'react'

export function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 28,
    mass: 0.45,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 28,
    mass: 0.45,
  })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* atmospheric aura */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[2] h-28 w-28 rounded-full bg-violet-200/[0.035] blur-3xl mix-blend-screen"
      />

      {/* soft trail feeling */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border border-white/10 bg-white/[0.04] blur-sm"
      />

      {/* star core */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.75)]"
      />
    </>
  )
}