'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Particles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 4 + 1
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -120],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute rounded-full bg-white/30 blur-[1px]"
            style={{
              width: size,
              height: size,
              transform: `translateX(${x}px) translateY(${y}px)`,
            }}
          />
        )
      })}
    </div>
  )
}