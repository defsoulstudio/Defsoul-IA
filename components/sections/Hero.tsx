'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section
      id="core"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-5 py-32 sm:px-6 md:py-40"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl md:mb-10 md:px-6"
        >
          <div className="h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.8)]" />

          <span className="text-[9px] tracking-[0.28em] text-white/45 sm:text-[10px] sm:tracking-[0.35em]">
            DEFSOUL STUDIO
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />

          <h1 className="hero-title relative max-w-6xl text-[4.2rem] font-[300] leading-[0.82] text-white sm:text-[5.6rem] md:text-[8rem] lg:text-[9rem]">
            <span className="block">Technology</span>

            <span className="block bg-gradient-to-r from-white via-zinc-200 to-violet-200 bg-clip-text text-transparent">
              with soul.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 max-w-xl text-sm leading-8 text-white/40 sm:text-base md:mt-12 md:max-w-2xl md:leading-9"
        >
          Criando experiências digitais cinematográficas, interfaces
          atmosféricas e universos visuais vivos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 180 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 0.4,
          }}
          className="mt-12 h-px max-w-[60vw] bg-gradient-to-r from-transparent via-white/40 to-transparent md:mt-16"
        />
      </div>
    </section>
  )
}