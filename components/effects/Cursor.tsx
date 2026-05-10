'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function getTrailColor(
  scrollY: number,
  maxScroll: number
): [number, number, number] {
  const t = Math.min(scrollY / Math.max(maxScroll, 1), 1)

  if (t < 0.5) {
    const s = t / 0.5
    return [
      Math.round(255 - s * 75),
      Math.round(255 - s * 95),
      255,
    ]
  }

  const s = (t - 0.5) / 0.5

  return [
    Math.round(180 - s * 20),
    Math.round(160 - s * 60),
    Math.round(255 - s * 15),
  ]
}

function CometTrail({
  springX,
  springY,
}: {
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
      scrollRef.current.max =
        document.body.scrollHeight - window.innerHeight
    }

    const onScroll = () => {
      scrollRef.current.y = window.scrollY
      scrollRef.current.max =
        document.body.scrollHeight - window.innerHeight
    }

    resize()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })

    const TRAIL_LENGTH = 14

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const x = springX.get()
      const y = springY.get()

      trail.current.unshift({ x, y })

      if (trail.current.length > TRAIL_LENGTH) {
        trail.current = trail.current.slice(0, TRAIL_LENGTH)
      }

      const points = trail.current

      if (points.length < 2) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const [r, g, b] = getTrailColor(
        scrollRef.current.y,
        scrollRef.current.max
      )

      for (let i = 0; i < points.length - 1; i++) {
        const t0 = 1 - i / points.length
        const t1 = 1 - (i + 1) / points.length

        const w0 = t0 * t0 * 1.0
        const w1 = t1 * t1 * 1.0

        const alpha0 = t0 * t0 * 0.45
        const alpha1 = t1 * t1 * 0.45

        const dx = points[i + 1].x - points[i].x
        const dy = points[i + 1].y - points[i].y
        const length = Math.sqrt(dx * dx + dy * dy) || 1

        const nx = -dy / length
        const ny = dx / length

        const x0a = points[i].x + nx * w0
        const y0a = points[i].y + ny * w0
        const x0b = points[i].x - nx * w0
        const y0b = points[i].y - ny * w0

        const x1a = points[i + 1].x + nx * w1
        const y1a = points[i + 1].y + ny * w1
        const x1b = points[i + 1].x - nx * w1
        const y1b = points[i + 1].y - ny * w1

        const gradient = ctx.createLinearGradient(
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y
        )

        gradient.addColorStop(
          0,
          `rgba(${r}, ${g}, ${b}, ${alpha0})`
        )
        gradient.addColorStop(
          1,
          `rgba(${r}, ${g}, ${b}, ${alpha1})`
        )

        ctx.beginPath()
        ctx.moveTo(x0a, y0a)
        ctx.lineTo(x1a, y1a)
        ctx.lineTo(x1b, y1b)
        ctx.lineTo(x0b, y0b)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
      }

      const head = points[0]

      const glow = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        2.5
      )

      glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.35)`)
      glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

      ctx.beginPath()
      ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2)
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

export function Cursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const springX = useSpring(mouseX, {
    stiffness: 260,
    damping: 28,
    mass: 0.2,
  })

  const springY = useSpring(mouseY, {
    stiffness: 260,
    damping: 28,
    mass: 0.2,
  })

  const auraX = useSpring(mouseX, {
    stiffness: 55,
    damping: 18,
    mass: 1,
  })

  const auraY = useSpring(mouseY, {
    stiffness: 55,
    damping: 18,
    mass: 1,
  })

  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches

    if (isMobile) return

    setEnabled(true)

    const down = () => setClicked(true)
    const up = () => setClicked(false)

    const interactive =
      'a, button, [role="button"], input, textarea, select, label'

    let currentlyHovered = false

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const element = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null

      const isOver = !!element?.closest(interactive)

      if (isOver !== currentlyHovered) {
        currentlyHovered = isOver
        setHovered(isOver)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      <CometTrail springX={springX} springY={springY} />

      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 140 : 80,
          height: hovered ? 140 : 80,
          opacity: hovered ? 0.055 : 0.032,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed left-0 top-0 z-[2] rounded-full bg-violet-300 blur-3xl mix-blend-screen"
      />

      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 38 : 0,
          height: hovered ? 38 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-violet-300/45"
      />

      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: hovered ? 0 : 1,
          scale: clicked ? 2.2 : 1,
          width: 5,
          height: 5,
        }}
        transition={{
          duration: 0.18,
          ease: 'easeOut',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.85),0_0_4px_rgba(196,181,253,0.7)]"
      />

      {clicked && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{
            opacity: 0.55,
            scale: 0.4,
            width: 10,
            height: 10,
          }}
          animate={{
            opacity: 0,
            scale: 2.6,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full border border-violet-300/30"
        />
      )}
    </>
  )
}