'use client'
 
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
 
// ── Mapeia scroll Y para cor RGB da cauda ─────────────────────────────────────
function getTrailColor(scrollY: number, maxScroll: number): [number, number, number] {
  const t = Math.min(scrollY / Math.max(maxScroll, 1), 1)
 
  // Topo: branco frio (255,255,255)
  // Meio: azul violeta suave (180,160,255)
  // Base: violeta quente (160,100,240)
  if (t < 0.5) {
    const s = t / 0.5
    return [
      Math.round(255 - s * 75),   // 255 → 180
      Math.round(255 - s * 95),   // 255 → 160
      Math.round(255),             // 255 → 255
    ]
  } else {
    const s = (t - 0.5) / 0.5
    return [
      Math.round(180 - s * 20),   // 180 → 160
      Math.round(160 - s * 60),   // 160 → 100
      Math.round(255 - s * 15),   // 255 → 240
    ]
  }
}
 
// ── Cauda de cometa ───────────────────────────────────────────────────────────
function CometTrail({ springX, springY }: {
  springX: { get: () => number }
  springY: { get: () => number }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<{ x: number; y: number }[]>([])
  const rafRef = useRef<number>(0)
  const scrollRef = useRef({ y: 0, max: 1 })
 
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
 
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scrollRef.current.max = document.body.scrollHeight - window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
 
    const onScroll = () => {
      scrollRef.current.y = window.scrollY
      scrollRef.current.max = document.body.scrollHeight - window.innerHeight
    }
    window.addEventListener('scroll', onScroll, { passive: true })
 
    const TRAIL_LENGTH = 32
 
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
 
      // Usa a posição do spring (mesma que o star core) — rastro sincronizado
      const x = springX.get()
      const y = springY.get()
 
      trail.current.unshift({ x, y })
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current = trail.current.slice(0, TRAIL_LENGTH)
      }
 
      const pts = trail.current
      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
 
      const [r, g, b] = getTrailColor(scrollRef.current.y, scrollRef.current.max)
 
      for (let i = 0; i < pts.length - 1; i++) {
        const t0 = 1 - i / pts.length
        const t1 = 1 - (i + 1) / pts.length
 
        // Cauda mais fina — máximo 2px na cabeça
        const w0 = t0 * t0 * 2.0
        const w1 = t1 * t1 * 2.0
 
        const alpha0 = t0 * t0 * 0.85
        const alpha1 = t1 * t1 * 0.85
 
        const dx = pts[i + 1].x - pts[i].x
        const dy = pts[i + 1].y - pts[i].y
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const nx = -dy / len
        const ny = dx / len
 
        const x0a = pts[i].x + nx * w0
        const y0a = pts[i].y + ny * w0
        const x0b = pts[i].x - nx * w0
        const y0b = pts[i].y - ny * w0
        const x1a = pts[i + 1].x + nx * w1
        const y1a = pts[i + 1].y + ny * w1
        const x1b = pts[i + 1].x - nx * w1
        const y1b = pts[i + 1].y - ny * w1
 
        const grad = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y)
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha0})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha1})`)
 
        ctx.beginPath()
        ctx.moveTo(x0a, y0a)
        ctx.lineTo(x1a, y1a)
        ctx.lineTo(x1b, y1b)
        ctx.lineTo(x0b, y0b)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
      }
 
      // Brilho suave na cabeça
      const head = pts[0]
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 5)
      glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`)
      glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
      ctx.beginPath()
      ctx.arc(head.x, head.y, 5, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()
 
      rafRef.current = requestAnimationFrame(draw)
    }
 
    draw()
 
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [springX, springY])
 
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
    />
  )
}
 
// ── Cursor principal ──────────────────────────────────────────────────────────
 
export function Cursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
 
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
 
  // Spring único compartilhado com o canvas — rastro e core sempre sincronizados
  const springX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.2 })
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.2 })
 
  const auraX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 1 })
  const auraY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 1 })
 
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'
 
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) {
        setHovered(true)
      }
    }
    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      // Só desativa se o mouse saiu do elemento interativo completamente
      // (não apenas moveu para um filho interno)
      if (
        (e.target as HTMLElement).closest(INTERACTIVE) &&
        !related?.closest(INTERACTIVE)
      ) {
        setHovered(false)
      }
    }
 
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
 
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY])
 
  return (
    <>
      {/* Rastro — recebe o mesmo spring do core */}
      <CometTrail springX={springX} springY={springY} />
 
      {/* Aura atmosférica lenta */}
      <motion.div
        style={{ x: auraX, y: auraY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? 160 : 100,
          height: hovered ? 160 : 100,
          opacity: hovered ? 0.07 : 0.04,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[2] rounded-full bg-violet-300 blur-3xl mix-blend-screen"
      />
 
      {/* Anel de hover */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? 44 : 0,
          height: hovered ? 44 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-violet-300/55"
      />
 
      {/* Star core */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hovered ? 0 : 1,
          scale: clicked ? 2.8 : 1,
          width: 6,
          height: 6,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9),0_0_4px_rgba(196,181,253,0.8)]"
      />
 
      {/* Pulso de clique */}
      {clicked && (
        <motion.div
          style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0.7, scale: 0.4, width: 12, height: 12 }}
          animate={{ opacity: 0, scale: 3.5 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full border border-violet-300/40"
        />
      )}
    </>
  )
}