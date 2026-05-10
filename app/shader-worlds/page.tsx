'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  size: 1 + ((i * 17) % 3),
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  duration: 2 + (i % 12) * 0.18,
}))

export default function ShaderWorldsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020203] text-white">
      {/* background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-3xl"
        />

        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      {/* navbar */}
      <div className="fixed left-1/2 top-6 z-[999] w-[92%] max-w-6xl -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 py-4 backdrop-blur-3xl">
          <Link
            href="/"
            className="text-[11px] tracking-[0.35em] text-white/65 transition-opacity duration-500 hover:opacity-100"
          >
            ← BACK TO CORE
          </Link>

          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-violet-300" />

            <span className="text-[10px] tracking-[0.3em] text-white/35">
              SHADER WORLD ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* badge */}
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
          className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 backdrop-blur-xl"
        >
          <div className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,1)]" />

          <span className="text-[10px] tracking-[0.35em] text-white/45">
            SHADER WORLDS
          </span>
        </motion.div>

        {/* title */}
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />

          <span className="relative block">
            Universos
          </span>

          <span className="relative block bg-gradient-to-r from-white via-zinc-200 to-violet-200 bg-clip-text text-transparent">
            renderizados.
          </span>
        </motion.h1>

        {/* description */}
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
          Explorando distorções espaciais,
          partículas e atmosferas digitais cinematográficas
          através de sistemas visuais vivos.
        </motion.p>

        {/* portal */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative mt-24 flex items-center justify-center"
        >
          <div className="absolute h-[420px] w-[420px] rounded-full border border-violet-200/10" />

          <div className="absolute h-[280px] w-[280px] rounded-full border border-white/10" />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute h-[180px] w-[180px] rounded-full bg-violet-300/[0.12] blur-3xl"
          />

          <div className="relative h-40 w-40 rounded-full border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,255,255,0.05)]" />
        </motion.div>
      </div>
    </main>
  )
}