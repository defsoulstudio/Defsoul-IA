'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const cards = [
  {
    id: '01',
    title: 'Shader Systems',
  },
  {
    id: '02',
    title: 'AI Interfaces',
  },
  {
    id: '03',
    title: 'Motion Design',
  },
  {
    id: '04',
    title: 'Interactive Depth',
  },
]

export function MotionLab() {
  const [hovered, setHovered] = useState<number | null>(
    null
  )

  return (
    <section
      id="motion"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-32"
    >
      {/* heading */}
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          filter: 'blur(10px)',
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
        }}
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-violet-300" />

          <span className="text-[10px] tracking-[0.35em] text-white/50">
            MOTION LAB
          </span>
        </div>

        <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
          Experimentos vivos para interfaces que sentem movimento.
        </h2>
      </motion.div>

      {/* cards */}
      <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            initial={{
              opacity: 0,
              y: 60,
              filter: 'blur(10px)',
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 1,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          >
            {/* glow */}
            <motion.div
              animate={{
                opacity: hovered === index ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_65%)]"
            />

            {/* border glow */}
            <motion.div
              animate={{
                opacity: hovered === index ? 1 : 0,
              }}
              className="absolute inset-0 rounded-[34px] border border-violet-300/30"
            />

            {/* noise */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10 flex h-[240px] flex-col justify-between">
              <span className="text-xs tracking-[0.3em] text-white/25">
                {card.id}
              </span>

              <div>
                <h3 className="text-2xl font-light text-white">
                  {card.title}
                </h3>

                <div className="mt-6 h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}