'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Magnetic } from '@/components/ui/Magnetic'

const modules = [
  {
    label: 'MODULE 01',
    title: 'Motion Systems',
    description:
      'Microinterações, transições e experiências cinematográficas.',
    href: '/motion-systems',
  },
  {
    label: 'MODULE 02',
    title: 'AI Interfaces',
    description:
      'Interfaces inspiradas em inteligência artificial e sistemas vivos.',
    href: '/ai-interfaces',
  },
  {
    label: 'MODULE 03',
    title: 'Shader Worlds',
    description:
      'Atmosferas WebGL, distorções espaciais e universos renderizados.',
    href: '/shader-worlds',
  },
  {
    label: 'MODULE 04',
    title: 'Brand Atmospheres',
    description:
      'Construção de universos visuais para marcas digitais.',
    href: '#',
  },
]

export function Projects() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="modules"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-violet-300" />

          <span className="text-[10px] tracking-[0.35em] text-white/45">
            EXPERIENCE MODULES
          </span>
        </div>

        <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
          Um sistema para explorar experiências digitais vivas.
        </h2>
      </motion.div>

      <div className="mt-24 grid items-stretch gap-6 md:grid-cols-2">
        {modules.map((module, index) => {
          const isActive = active === index

          return (
            <Magnetic key={module.title}>
              <Link
                href={module.href}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-2xl transition-all duration-700 hover:border-violet-200/20 hover:bg-white/[0.04] hover:shadow-[0_0_80px_rgba(255,255,255,0.03)] md:p-10"
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/[0.04] blur-3xl" />
                  </motion.div>

                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.35em] text-violet-200/55">
                      {module.label}
                    </span>

                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : 10,
                      }}
                      transition={{ duration: 0.4 }}
                      className="text-[10px] tracking-[0.3em] text-white/35"
                    >
                      ENTER
                    </motion.span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <motion.h3
                      whileHover={{ x: 4 }}
                      className="inline-block text-4xl font-light tracking-[-0.04em] text-white"
                    >
                      {module.title}
                    </motion.h3>

                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                      className="mt-6 max-w-xl text-sm leading-8 text-white/40 md:text-base"
                    >
                      {module.description}
                    </motion.p>

                    <div className="mt-8 flex items-center gap-4">
                      <motion.div
                        animate={{
                          width: isActive ? '120px' : '60px',
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-px bg-gradient-to-r from-white/40 to-transparent"
                      />

                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -8,
                        }}
                        transition={{ duration: 0.4 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_14px_rgba(196,181,253,0.8)]"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Magnetic>
          )
        })}
      </div>
    </section>
  )
}