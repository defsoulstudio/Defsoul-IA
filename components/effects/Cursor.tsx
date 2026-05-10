'use client'
 
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
 
// ── Rastro tipo cometa via canvas ─────────────────────────────────────────────
 
function CometTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<{ x: number; y: number }[]>([])
  const mouse = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number>(0)
 
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
 
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
 
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
 
    const TRAIL_LENGTH = 22
    const POINT_SIZE = 1.6
 
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
 
      trail.current.unshift({ x: mouse.current.x, y: mouse.current.y })
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current = trail.current.slice(0, TRAIL_LENGTH)
      }
 
      trail.current.forEach((point, i) => {
        const progress = 1 - i / TRAIL_LENGTH
        const alpha = progress * progress * 0.85
        const size = POINT_SIZE * progress
 
        const grad = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size * 3
        )
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
        grad.addColorStop(0.4, `rgba(196, 181, 253, ${alpha * 0.7})`)
        grad.addColorStop(1, `rgba(139, 92, 246, 0)`)
 
        ctx.beginPath()
        ctx.arc(point.x, point.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
 
        ctx.beginPath()
        ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
        ctx.fill()
      })
 
      rafRef.current = requestAnimationFrame(draw)
    }
 
    draw()
 
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])
 
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
 
  const coreX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.15 })
  const coreY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.15 })
 
  const auraX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 1 })
  const auraY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 1 })
 
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true)
      }
    }
    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label')) {
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
      {/* Rastro de cometa via canvas */}
      <CometTrail />
 
      {/* Aura atmosférica */}
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
        style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
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
        style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
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
          style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0.7, scale: 0.4, width: 12, height: 12 }}
          animate={{ opacity: 0, scale: 3.5 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full border border-violet-300/40"
        />
      )}
    </>
  )
}