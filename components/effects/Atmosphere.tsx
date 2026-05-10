'use client'

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

export function Atmosphere() {
  const { scrollY } = useScroll()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, {
    stiffness: 22,
    damping: 24,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 22,
    damping: 24,
  })

  const layerFarX = useTransform(smoothX, (v) => v * 0.25)
  const layerFarY = useTransform(smoothY, (v) => v * 0.25)

  const layerMidX = useTransform(smoothX, (v) => v * 0.55)
  const layerMidY = useTransform(smoothY, (v) => v * 0.55)

  const layerNearX = useTransform(smoothX, (v) => v * 1.1)
  const layerNearY = useTransform(smoothY, (v) => v * 1.1)

  const scrollGlow = useTransform(
    scrollY,
    [0, 2000],
    [0.08, 0.24]
  )

  const scrollScale = useTransform(
    scrollY,
    [0, 2000],
    [1, 1.28]
  )

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const { innerWidth, innerHeight } = window

    const x = (e.clientX - innerWidth / 2) / 42
    const y = (e.clientY - innerHeight / 2) / 42

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* base */}
      <div className="absolute inset-0 bg-[#020203]" />

      {/* holographic grid */}
      <motion.div
        animate={{
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage:
            'radial-gradient(circle at center, white, transparent 85%)',
        }}
      />

      {/* violet field */}
      <motion.div
        style={{
          x: layerFarX,
          y: layerFarY,
          opacity: scrollGlow,
          scale: scrollScale,
        }}
        className="absolute left-[-180px] top-[-160px] h-[620px] w-[620px] rounded-full bg-violet-400/[0.055] blur-3xl"
      />

      {/* white glow */}
      <motion.div
        style={{
          x: layerMidX,
          y: layerMidY,
          opacity: scrollGlow,
          scale: scrollScale,
        }}
        className="absolute bottom-[-260px] right-[-160px] h-[720px] w-[720px] rounded-full bg-white/[0.022] blur-3xl"
      />

      {/* core atmosphere */}
      <motion.div
        style={{
          x: layerNearX,
          y: layerNearY,
        }}
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/[0.03] blur-3xl"
      />

      {/* lens */}
      <motion.div
        style={{
          x: layerNearX,
          y: layerNearY,
        }}
        className="absolute left-1/2 top-[42%] h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-3xl"
      />

      {/* detail lines */}
      <motion.div
        animate={{
          opacity: [0.08, 0.22, 0.08],
          x: [-40, 40, -40],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-[30%] h-px w-[520px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <motion.div
        animate={{
          opacity: [0.04, 0.16, 0.04],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[20%] top-1/2 h-[420px] w-px bg-gradient-to-b from-transparent via-violet-200/20 to-transparent"
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.78)_100%)]" />

      {/* cinematic darkness */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.78),transparent_24%,transparent_72%,rgba(0,0,0,0.88))]" />

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.008] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}