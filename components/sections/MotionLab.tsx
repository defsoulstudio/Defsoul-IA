'use client'

import { motion } from 'framer-motion'

const experiments = [
  {
    number: '01',
    title: 'Sistemas de sombreamento',
    description: 'GLSL, WebGL e atmosferas renderizadas em tempo real.',
    type: 'shader',
  },
  {
    number: '02',
    title: 'Interfaces de IA',
    description: 'Sistemas visuais inspirados em inteligência artificial.',
    type: 'ai',
  },
  {
    number: '03',
    title: 'Design de movimento',
    description: 'Curvas, físicas e sequências cinematográficas.',
    type: 'motion',
  },
  {
    number: '04',
    title: 'Profundidade interativa',
    description: 'Camadas, paralaxe e profundidade interativa.',
    type: 'depth',
  },
]

export function MotionLab() {
  return (
    <section
      id="motion"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-violet-300" />

          <span className="text-[10px] tracking-[0.35em] text-white/45">
            LABORATÓRIO DE MOVIMENTO
          </span>
        </div>

        <h2 className="max-w-6xl text-5xl font-[300] leading-[0.92] tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
          Experimentos vivos para interfaces que sentem movimento.
        </h2>
      </motion.div>

      <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {experiments.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 70,
              filter: 'blur(14px)',
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 1,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="group relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl transition duration-700 hover:border-violet-200/25 hover:bg-white/[0.055]"
          >
            <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)]" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[12px] tracking-[0.25em] text-white/35">
                {item.number}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center opacity-70">
              {item.type === 'shader' && (
                <div className="relative h-28 w-28 rounded-full border border-violet-200/15">
                  <div className="absolute inset-6 rounded-full border border-violet-200/15" />
                  <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_28px_rgba(196,181,253,0.9)]" />
                </div>
              )}

              {item.type === 'ai' && (
                <div className="relative h-28 w-28">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-4 w-4 rounded-full bg-violet-200/60"
                      style={{
                        left: `${20 + ((i * 31) % 60)}%`,
                        top: `${18 + ((i * 23) % 58)}%`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-8 rounded-full bg-violet-200/50 blur-sm" />
                </div>
              )}

              {item.type === 'motion' && (
                <div className="relative mt-10 h-20 w-40">
                  <div className="absolute left-0 top-1/2 h-px w-full bg-violet-200/45" />
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200" />
                </div>
              )}

              {item.type === 'depth' && (
                <div className="relative h-28 w-28">
                  <div className="absolute inset-4 rounded-2xl border border-violet-200/25" />
                  <div className="absolute inset-7 rounded-2xl border border-violet-200/20" />
                  <div className="absolute inset-10 rounded-xl border border-violet-200/15" />
                </div>
              )}
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="max-w-[220px] text-2xl font-[300] leading-tight tracking-[-0.05em] text-white">
                {item.title}
              </h3>

              <p className="mt-4 max-w-[230px] text-sm leading-6 text-white/45">
                {item.description}
              </p>

              <div className="mt-6 h-px w-14 bg-gradient-to-r from-white/40 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}