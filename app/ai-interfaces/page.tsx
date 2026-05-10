'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const nodes = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: 12 + ((i * 19) % 76),
  y: 18 + ((i * 31) % 64),
  delay: (i % 9) * 0.12,
}))

export default function AIInterfacesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020203] text-white">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.18, 0.42, 0.18],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.08] blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.86)_100%)]" />

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            animate={{
              opacity: [0.15, 0.75, 0.15],
              scale: [1, 1.7, 1],
            }}
            transition={{
              duration: 3.2,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute h-1 w-1 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.65)]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          />
        ))}
      </div>

      <div className="fixed left-1/2 top-6 z-[999] w-[92%] max-w-6xl -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 py-4 backdrop-blur-3xl">
          <Link href="/" className="text-[11px] tracking-[0.35em] text-white/65">
            ← BACK TO CORE
          </Link>

          <span className="text-[10px] tracking-[0.3em] text-white/35">
            AI INTERFACE ACTIVE
          </span>
        </div>
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1 }}
          className="mb-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 backdrop-blur-xl"
        >
          <span className="text-[10px] tracking-[0.35em] text-white/45">
            AI INTERFACES
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80, filter: 'blur(18px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl text-6xl font-[300] leading-[0.85] md:text-[9rem]"
        >
          <span className="block">Interfaces</span>
          <span className="block bg-gradient-to-r from-white via-zinc-200 to-violet-200 bg-clip-text text-transparent">
            conscientes.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.2 }}
          className="mt-12 max-w-2xl text-sm leading-9 text-white/38 md:text-base"
        >
          Sistemas que parecem escutar, reagir e organizar informações como
          uma presença digital viva.
        </motion.p>
      </section>
    </main>
  )
}