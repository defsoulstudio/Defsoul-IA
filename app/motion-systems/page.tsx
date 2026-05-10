'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { KineticOrb } from '@/components/motion/KineticOrb'
import { FloatingCards } from '@/components/motion/FloatingCards'

const trails = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: 18 + ((i * 17) % 64),
  delay: (i % 6) * 0.18,
  width: 120 + ((i * 37) % 260),
}))

export default function MotionSystemsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020203] text-white">
      {/* background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.2, 0.46, 0.2],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.08] blur-3xl"
        />

        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            animate={{
              x: ['-30vw', '130vw'],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: 4.5 + trail.id * 0.08,
              delay: trail.delay,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
            style={{
              top: `${trail.top}%`,
              width: `${trail.width}px`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      {/* navbar */}
      <div className="fixed left-1/2 top-6 z-[999] w-[92%] max-w-6xl -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 py-4 backdrop-blur-3xl">
          <Link
            href="/"
            className="text-[11px] tracking-[0.35em] text-white/65"
          >
            ← BACK TO CORE
          </Link>

          <span className="text-[10px] tracking-[0.3em] text-white/35">
            MOTION SYSTEM ACTIVE
          </span>
        </div>
      </div>

      {/* content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1,
          }}
          className="mb-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 backdrop-blur-xl"
        >
          <span className="text-[10px] tracking-[0.35em] text-white/45">
            MOTION SYSTEMS
          </span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 80,
            filter: 'blur(18px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative max-w-6xl text-6xl font-[300] leading-[0.85] md:text-[9rem]"
        >
          <span className="block">
            Movimento
          </span>

          <span className="block bg-gradient-to-r from-white via-zinc-200 to-violet-200 bg-clip-text text-transparent">
            com intenção.
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
            filter: 'blur(12px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1.8,
            delay: 0.2,
          }}
          className="mt-12 max-w-2xl text-sm leading-9 text-white/38 md:text-base"
        >
          Interações, transições e ritmos visuais que
          transformam movimento em linguagem.
        </motion.p>

        <KineticOrb />

        <FloatingCards />
      </section>
    </main>
  )
}