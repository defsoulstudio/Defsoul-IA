'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

import { ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
}

export function Magnetic({
  children,
}: MagneticProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    ['12deg', '-12deg']
  )

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    ['-12deg', '12deg']
  )

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
  })

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
  })

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const x =
      (e.clientX - rect.left) / width - 0.5

    const y =
      (e.clientY - rect.top) / height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const reset = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.015,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}