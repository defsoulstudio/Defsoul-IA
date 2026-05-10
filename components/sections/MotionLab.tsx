'use client'
 
import { motion } from 'framer-motion'
import { useState } from 'react'
 
// ─── Previews ──────────────────────────────────────────────────────────────────
 
function ShaderPreview() {
  return (
    <div className="relative flex h-full items-center justify-center">
      {[130, 86, 44].map((size, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(196,181,253,0.35)' }}
        />
      ))}
      <motion.div
        animate={{ boxShadow: ['0 0 16px 4px rgba(139,92,246,0.2)', '0 0 36px 10px rgba(139,92,246,0.5)', '0 0 16px 4px rgba(139,92,246,0.2)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-5 w-5 rounded-full bg-violet-400/80"
      />
    </div>
  )
}
 
// Rede neural em camadas reais: 2 → 3 → 2
function AIPreview() {
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
    <div className="relative h-full w-full">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {edges.map(({ x1, y1, x2, y2, i }) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(196,181,253,0.28)" strokeWidth="0.6"
            animate={{ opacity: [0.12, 0.55, 0.12] }}
            transition={{ duration: 2.2, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {allNodes.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="3.5"
            fill="rgba(196,181,253,0.75)"
            animate={{ r: [3, 4.5, 3], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, delay: i * 0.22, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
 
function MotionPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <svg className="h-20 w-full" viewBox="0 0 160 60">
        <motion.path
          d="M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10"
          fill="none" stroke="rgba(196,181,253,0.5)" strokeWidth="1.2" strokeLinecap="round"
          animate={{ d: ['M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10', 'M 10 10 C 40 10, 70 50, 80 30 S 120 50, 150 50', 'M 10 50 C 50 50, 60 10, 80 30 S 130 10, 150 10'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle r="3" fill="rgba(196,181,253,0.9)"
          animate={{ cx: [10, 80, 150], cy: [50, 30, 10], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
 
function DepthPreview() {
  return (
    <div className="relative flex h-full items-center justify-center" style={{ perspective: '400px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i}
          animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, -4, 0, 4, 0] }}
          transition={{ duration: 5 + i, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: `${90 - i * 20}px`, height: `${90 - i * 20}px`, border: '1px solid rgba(196,181,253,0.25)', borderRadius: '14px', background: `rgba(139,92,246,${0.03 + i * 0.03})`, transformStyle: 'preserve-3d' }}
        />
      ))}
    </div>
  )
}
 
const cards = [
  { id: '01', title: 'Shader Systems', description: 'GLSL, WebGL & atmosferas renderizadas em tempo real.', Preview: ShaderPreview },
  { id: '02', title: 'AI Interfaces', description: 'Interfaces que respiram dados e sistemas vivos.', Preview: AIPreview },
  { id: '03', title: 'Motion Design', description: 'Curvas, física e sequências cinematográficas.', Preview: MotionPreview },
  { id: '04', title: 'Interactive Depth', description: 'Camadas, parallax e profundidade interativa.', Preview: DepthPreview },
]
 
export function MotionLab() {
  const [hovered, setHovered] = useState<number | null>(null)
 
  return (
    <section id="motion" className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-violet-300" />
          <span className="text-[10px] tracking-[0.35em] text-white/50">MOTION LAB</span>
        </div>
        <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
          Experimentos vivos para interfaces que sentem movimento.
        </h2>
      </motion.div>
 
      <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ id, title, description, Preview }, index) => (
          <motion.div
            key={id}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          >
            <motion.div animate={{ opacity: hovered === index ? 1 : 0 }} transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_65%)]" />
            <motion.div animate={{ opacity: hovered === index ? 1 : 0 }}
              className="absolute inset-0 rounded-[34px] border border-violet-300/30" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
 
            <div className="relative z-10 flex h-[260px] flex-col justify-between">
              <span className="text-xs tracking-[0.3em] text-white/25">{id}</span>
              <div className="flex-1 py-3">
                <Preview />
              </div>
              <div>
                <h3 className="text-2xl font-light text-white">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed tracking-wide text-white/35">{description}</p>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}