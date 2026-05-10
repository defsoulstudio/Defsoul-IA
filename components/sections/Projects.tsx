'use client'
 
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Magnetic } from '@/components/ui/Magnetic'
 
// ─── Visuais de fundo por módulo ───────────────────────────────────────────────
 
// Motion Systems: linhas de easing se desenhando
function MotionSystemsVisual({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 opacity-40">
      <svg className="h-48 w-48" viewBox="0 0 100 100">
        {/* trilhas de easing */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M 10 ${70 - i * 20} C 35 ${70 - i * 20}, 65 ${30 - i * 20}, 90 ${30 - i * 20}`}
            fill="none"
            stroke="rgba(196,181,253,0.35)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="80"
            animate={active ? { strokeDashoffset: [80, 0] } : { strokeDashoffset: 80 }}
            transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
          />
        ))}
        {/* ponto correndo */}
        <motion.circle
          r="2.5" fill="rgba(196,181,253,0.9)"
          animate={{ cx: [10, 90], cy: [70, 30], opacity: active ? [0.6, 1] : 0 }}
          transition={{ duration: 1.4, repeat: active ? Infinity : 0, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
      </svg>
    </div>
  )
}
 
// AI Interfaces: rede neural em camadas flutuando
function AIInterfacesVisual({ active }: { active: boolean }) {
  const layers = [
    [{ x: 20, y: 35 }, { x: 20, y: 65 }],
    [{ x: 50, y: 22 }, { x: 50, y: 50 }, { x: 50, y: 78 }],
    [{ x: 80, y: 35 }, { x: 80, y: 65 }],
  ]
  type Edge = { x1: number; y1: number; x2: number; y2: number; i: number }
  const edges: Edge[] = []
  layers[0].forEach((a) => layers[1].forEach((b) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, i: edges.length })))
  layers[1].forEach((a) => layers[2].forEach((b) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, i: edges.length })))
  const allNodes = layers.flat()
 
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-6 opacity-35">
      <svg className="h-44 w-44" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {edges.map(({ x1, y1, x2, y2, i }) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(196,181,253,0.4)" strokeWidth="0.7"
            animate={{ opacity: active ? [0.2, 0.7, 0.2] : 0.2 }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {allNodes.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="4"
            fill="rgba(196,181,253,0.7)"
            animate={{ r: active ? [3.5, 5.5, 3.5] : 3.5, opacity: active ? [0.5, 1, 0.5] : 0.5 }}
            transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
 
// Shader Worlds: anéis orbitais com distorção
function ShaderWorldsVisual({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-35">
      <div className="relative h-44 w-44 flex items-center justify-center">
        {[100, 70, 44].map((size, i) => (
          <motion.div key={i}
            animate={{
              rotate: active ? (i % 2 === 0 ? 360 : -360) : 0,
              scale: active ? [1, 1.06, 1] : 1,
            }}
            transition={{ rotate: { duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }, scale: { duration: 2 + i, repeat: Infinity, ease: 'easeInOut' } }}
            style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid rgba(196,181,253,${0.2 + i * 0.08})` }}
          />
        ))}
        <motion.div
          animate={{ boxShadow: active ? ['0 0 12px 3px rgba(139,92,246,0.2)', '0 0 30px 8px rgba(139,92,246,0.5)', '0 0 12px 3px rgba(139,92,246,0.2)'] : '0 0 12px 3px rgba(139,92,246,0.15)' }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-4 w-4 rounded-full bg-violet-400/80"
        />
      </div>
    </div>
  )
}
 
// Brand Atmospheres: paleta de identidade visual
function BrandVisual({ active }: { active: boolean }) {
  const swatches = [
    'rgba(139,92,246,0.7)',
    'rgba(196,181,253,0.6)',
    'rgba(255,255,255,0.15)',
    'rgba(79,51,168,0.5)',
  ]
 
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 opacity-40">
      <div className="flex flex-col gap-2">
        {swatches.map((color, i) => (
          <motion.div key={i}
            animate={{ width: active ? ['40px', '72px', '40px'] : '40px', opacity: active ? [0.5, 1, 0.5] : 0.4 }}
            transition={{ duration: 1.8 + i * 0.3, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '10px', borderRadius: '6px', background: color, width: '40px' }}
          />
        ))}
        {/* tipografia simulada */}
        <motion.div
          animate={{ opacity: active ? [0.3, 0.7, 0.3] : 0.25 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 flex flex-col gap-1"
        >
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
          <div className="h-1 w-10 rounded-full bg-white/12" />
        </motion.div>
      </div>
    </div>
  )
}
 
// ─── Data ──────────────────────────────────────────────────────────────────────
 
const modules = [
  {
    label: 'MODULE 01',
    title: 'Motion Systems',
    description: 'Microinterações, transições e experiências cinematográficas.',
    href: '/motion-systems',
    Visual: MotionSystemsVisual,
  },
  {
    label: 'MODULE 02',
    title: 'AI Interfaces',
    description: 'Interfaces inspiradas em inteligência artificial e sistemas vivos.',
    href: '/ai-interfaces',
    Visual: AIInterfacesVisual,
  },
  {
    label: 'MODULE 03',
    title: 'Shader Worlds',
    description: 'Atmosferas WebGL, distorções espaciais e universos renderizados.',
    href: '/shader-worlds',
    Visual: ShaderWorldsVisual,
  },
  {
    label: 'MODULE 04',
    title: 'Brand Atmospheres',
    description: 'Construção de universos visuais para marcas digitais.',
    href: '#',
    Visual: BrandVisual,
  },
]
 
// ─── Component ─────────────────────────────────────────────────────────────────
 
export function Projects() {
  const [active, setActive] = useState<number | null>(null)
 
  return (
    <section id="modules" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-violet-300" />
          <span className="text-[10px] tracking-[0.35em] text-white/45">EXPERIENCE MODULES</span>
        </div>
        <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
          Um sistema para explorar experiências digitais vivas.
        </h2>
      </motion.div>
 
      <div className="mt-24 grid gap-6 md:grid-cols-2">
        {modules.map(({ label, title, description, href, Visual }, index) => {
          const isActive = active === index
 
          return (
            <Magnetic key={title}>
              <motion.div
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="
                  group relative min-h-[340px] overflow-hidden
                  rounded-[38px] border border-white/10
                  bg-white/[0.025] p-8 backdrop-blur-2xl
                  transition-all duration-700
                  hover:border-violet-200/20 hover:bg-white/[0.04]
                  hover:shadow-[0_0_80px_rgba(255,255,255,0.03)]
                  md:p-10
                "
              >
                {/* glow central */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/[0.04] blur-3xl" />
                </motion.div>
 
                {/* visual temático */}
                <Visual active={isActive} />
 
                {/* linha topo */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
 
                {/* conteúdo */}
                <div style={{ transform: 'translateZ(40px)' }} className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.35em] text-violet-200/55">{label}</span>
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                      transition={{ duration: 0.4 }}
                      className="text-[10px] tracking-[0.3em] text-white/35"
                    >
                      ENTER
                    </motion.span>
                  </div>
 
                  <div>
                    <Link href={href}>
                      <motion.div whileHover={{ x: 4 }} className="inline-block text-4xl font-light tracking-[-0.04em] text-white">
                        {title}
                      </motion.div>
                    </Link>
 
                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                      className="mt-6 max-w-xl text-sm leading-8 text-white/40 md:text-base"
                    >
                      {description}
                    </motion.p>
 
                    <div className="mt-8 flex items-center gap-4">
                      <motion.div
                        animate={{ width: isActive ? '120px' : '60px' }}
                        transition={{ duration: 0.5 }}
                        className="h-px bg-gradient-to-r from-white/40 to-transparent"
                      />
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                        transition={{ duration: 0.4 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_14px_rgba(196,181,253,0.8)]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Magnetic>
          )
        })}
      </div>
    </section>
  )
}