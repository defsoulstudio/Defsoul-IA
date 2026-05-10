'use client'
 
import { motion } from 'framer-motion'
import { useState } from 'react'
 
// ─── Previews animados para cada card ─────────────────────────────────────────
 
function ShaderPreview() {
  return (
    <div className="relative flex h-full items-center justify-center">
      {[1, 0.65, 0.4].map((scale, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [scale, scale * 1.12, scale],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
          style={{ position: 'absolute' }}
          className="rounded-full border border-violet-300/40"
          css-width={`${scale * 100}%`}
        >
          <div
            style={{
              width: `${scale * 130}px`,
              height: `${scale * 130}px`,
              borderRadius: '50%',
              border: '1px solid rgba(196, 181, 253, 0.35)',
            }}
          />
        </motion.div>
      ))}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px 4px rgba(139, 92, 246, 0.25)',
            '0 0 40px 10px rgba(139, 92, 246, 0.5)',
            '0 0 20px 4px rgba(139, 92, 246, 0.25)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-6 w-6 rounded-full bg-violet-400/80"
      />
    </div>
  )
}
 
function AIPreview() {
  const nodes = [
    { x: 50, y: 20 },
    { x: 20, y: 55 },
    { x: 80, y: 55 },
    { x: 35, y: 85 },
    { x: 65, y: 85 },
  ]
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4],
  ]
 
  return (
    <div className="relative h-full w-full">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(196,181,253,0.3)"
            strokeWidth="0.5"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="3"
            fill="rgba(196,181,253,0.7)"
            animate={{
              r: [2.5, 4, 2.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )
}
 
function MotionPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <svg className="h-24 w-full" viewBox="0 0 160 60">
        {/* linha de bezier animada */}
        <motion.path
          d="M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10"
          fill="none"
          stroke="rgba(196,181,253,0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{
            d: [
              'M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10',
              'M 10 10 C 40 10, 70 50, 80 30 S 120 50, 150 50',
              'M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* ponto correndo na curva */}
        <motion.circle
          r="3"
          fill="rgba(196,181,253,0.9)"
          animate={{
            cx: [10, 80, 150],
            cy: [50, 30, 10],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  )
}
 
function DepthPreview() {
  return (
    <div className="relative flex h-full items-center justify-center perspective-[400px]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            rotateY: [0, 8, 0, -8, 0],
            rotateX: [0, -4, 0, 4, 0],
          }}
          transition={{
            duration: 5 + i,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: `${90 - i * 20}px`,
            height: `${90 - i * 20}px`,
            border: '1px solid rgba(196,181,253,0.25)',
            borderRadius: '14px',
            background: `rgba(139,92,246,${0.03 + i * 0.03})`,
            transformStyle: 'preserve-3d',
          }}
        />
      ))}
    </div>
  )
}
 
// ─── Data ──────────────────────────────────────────────────────────────────────
 
const cards = [
  {
    id: '01',
    title: 'Shader Systems',
    description: 'GLSL, WebGL & atmosferas renderizadas em tempo real.',
    Preview: ShaderPreview,
  },
  {
    id: '02',
    title: 'AI Interfaces',
    description: 'Interfaces que respiram dados e sistemas vivos.',
    Preview: AIPreview,
  },
  {
    id: '03',
    title: 'Motion Design',
    description: 'Curvas, física e sequências cinematográficas.',
    Preview: MotionPreview,
  },
  {
    id: '04',
    title: 'Interactive Depth',
    description: 'Camadas, parallax e profundidade interativa.',
    Preview: DepthPreview,
  },
]
 
// ─── Component ─────────────────────────────────────────────────────────────────
 
export function MotionLab() {
  const [hovered, setHovered] = useState<number | null>(null)
 
  return (
    <section
      id="motion"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-32"
    >
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
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
        {cards.map(({ id, title, description, Preview }, index) => (
          <motion.div
            key={id}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          >
            {/* glow on hover */}
            <motion.div
              animate={{ opacity: hovered === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_65%)]"
            />
 
            {/* border glow on hover */}
            <motion.div
              animate={{ opacity: hovered === index ? 1 : 0 }}
              className="absolute inset-0 rounded-[34px] border border-violet-300/30"
            />
 
            {/* noise */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
 
            <div className="relative z-10 flex h-[260px] flex-col justify-between">
              <span className="text-xs tracking-[0.3em] text-white/25">{id}</span>
 
              {/* preview animado */}
              <div className="flex-1 py-4">
                <Preview />
              </div>
 
              <div>
                <h3 className="text-2xl font-light text-white">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/35 tracking-wide">
                  {description}
                </p>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}