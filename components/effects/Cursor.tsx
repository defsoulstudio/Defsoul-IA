'use client'
 
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
 
export function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
 
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
 
  // ── Aura: mais lenta, sensação de peso atmosférico
  const auraX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.8 })
  const auraY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.8 })
 
  // ── Trail: velocidade média
  const trailX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 0.5 })
  const trailY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 0.5 })
 
  // ── Core: quase imediato, segue o mouse de perto
  const coreX = useSpring(mouseX, { stiffness: 280, damping: 32, mass: 0.2 })
  const coreY = useSpring(mouseY, { stiffness: 280, damping: 32, mass: 0.2 })
 
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
 
    const down = () => setClicked(true)
    const up = () => setClicked(false)
 
    // Detecta hover em qualquer elemento interativo
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true)
      }
    }
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
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
      {/* ── Atmospheric aura — reage a hover expandindo */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 180 : clicked ? 80 : 112,
          height: hovered ? 180 : clicked ? 80 : 112,
          opacity: hovered ? 0.06 : 0.035,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[2] rounded-full bg-violet-200 blur-3xl mix-blend-screen"
      />
 
      {/* ── Soft trail — anel que expande no hover */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 48 : clicked ? 18 : 24,
          height: hovered ? 48 : clicked ? 18 : 24,
          borderColor: hovered ? 'rgba(196,181,253,0.5)' : 'rgba(255,255,255,0.10)',
          backgroundColor: hovered ? 'rgba(196,181,253,0.06)' : 'rgba(255,255,255,0.04)',
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border blur-[2px]"
      />
 
      {/* ── Star core — some no hover, pulsa no click */}
      <motion.div
        style={{
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: hovered ? 0 : 1,
          scale: clicked ? 2.5 : 1,
          boxShadow: clicked
            ? '0 0 28px rgba(255,255,255,0.9)'
            : '0 0 18px rgba(255,255,255,0.75)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-white"
      />
 
      {/* ── Click pulse — anel que explode e some */}
      {clicked && (
        <motion.div
          style={{
            x: coreX,
            y: coreY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0.6, scale: 0.5, width: 12, height: 12 }}
          animate={{ opacity: 0, scale: 3, width: 12, height: 12 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white/30"
        />
      )}
    </>
  )
}