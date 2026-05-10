'use client'

import { motion } from 'framer-motion'

const links = ['Core', 'Modules', 'Motion', 'Contact']

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-1/2 top-4 z-[999] w-[92%] max-w-6xl -translate-x-1/2 md:top-6"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-700 md:px-6 md:py-4">
        <a href="#core" className="flex items-center gap-3">
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_22px_rgba(196,181,253,1)]"
          />

          <span className="text-[10px] tracking-[0.28em] text-white/70 md:text-[11px] md:tracking-[0.35em]">
            DEFSOUL
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-[11px] tracking-[0.28em] text-white/42 transition-colors duration-500 hover:text-white"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 md:h-2 md:w-2" />

          <span className="text-[9px] tracking-[0.2em] text-white/35 md:text-[10px] md:tracking-[0.25em]">
            ONLINE
          </span>
        </div>
      </div>
    </motion.header>
  )
}