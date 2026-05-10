'use client'
 
import { motion } from 'framer-motion'
 
// ─── Marquee strip ──────────────────────────────────────────────────────────────
 
const marqueeItems = [
  'Technology with soul',
  '✦',
  'Motion systems',
  '✦',
  'Shader worlds',
  '✦',
  'AI interfaces',
  '✦',
  'Brand atmospheres',
  '✦',
  'Defsoul Studio',
  '✦',
]
 
function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems]
 
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/[0.06] py-4">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex w-max gap-10"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-white/20"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
 
// ─── Footer ────────────────────────────────────────────────────────────────────
 
export function Footer() {
  return (
    <>
      <Marquee />
 
      <footer className="relative z-10 overflow-hidden px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl border-t border-white/10 pt-10"
        >
          <div className="text-[14vw] font-[300] leading-none tracking-[-0.1em] text-white/5">
            DEFSOUL
          </div>
 
          <div className="mt-6 flex flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.35em] text-white/35 md:flex-row">
            <span>Technology with soul</span>
            <span>Experimental system</span>
            <span>2026</span>
          </div>
        </motion.div>
      </footer>
    </>
  )
}