'use client'

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import { useEffect } from 'react'

export function KineticOrb() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, {
    stiffness: 60,
    damping: 22,
  })

  const y = useSpring(mouseY, {
    stiffness: 60,
    damping: 22,
  })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      mouseX.set((e.clientX - centerX) / 18)
      mouseY.set((e.clientY - centerY) / 18)
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{ x, y }}
      className="relative mt-24 flex h-[320px] w-[320px] items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[320px] w-[320px] rounded-full border border-white/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[220px] w-[220px] rounded-full border border-violet-200/15"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.45, 0.9, 0.45],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute h-[140px] w-[140px] rounded-full bg-violet-300/[0.12] blur-3xl"
      />

      <div className="relative h-16 w-16 rounded-full border border-white/10 bg-black/50 shadow-[0_0_70px_rgba(255,255,255,0.06)] backdrop-blur-3xl" />
    </motion.div>
  )
}