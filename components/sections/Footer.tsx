'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl border-t border-white/10 pt-12"
      >
        <div className="text-[14vw] font-[300] leading-none tracking-[-0.1em] text-white/5">
          DEFSOUL
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 text-[10px] uppercase tracking-[0.35em] text-white/35 md:flex-row">
          <span>Technology with soul</span>
          <span>Experimental system</span>
          <span>2026</span>
        </div>
      </motion.div>
    </footer>
  )
}