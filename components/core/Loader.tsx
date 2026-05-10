'use client'

import { motion } from 'framer-motion'

export function Loader() {
  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
        pointerEvents: 'none',
      }}
      transition={{
        duration: 1.4,
        delay: 1.6,
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020203]"
    >
      <div className="relative flex flex-col items-center">
        {/* glow */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute h-40 w-40 rounded-full bg-violet-300/[0.08] blur-3xl"
        />

        {/* core */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-24 w-24 rounded-full border border-violet-200/20" />

          <div className="absolute h-16 w-16 rounded-full border border-white/10" />

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
            }}
            className="h-3 w-3 rounded-full bg-violet-200 shadow-[0_0_24px_rgba(196,181,253,1)]"
          />
        </motion.div>

        {/* text */}
        <motion.span
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="mt-14 text-[11px] tracking-[0.45em] text-white/35"
        >
          INITIALIZING DEFSOUL
        </motion.span>
      </div>
    </motion.div>
  )
}