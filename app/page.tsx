'use client'

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'

import { Atmosphere } from '@/components/effects/Atmosphere'
import { Particles } from '@/components/effects/Particles'
import { Cursor } from '@/components/effects/Cursor'
import { SmoothScroll } from '@/components/effects/SmoothScroll'
import { BlackHoleShader } from '@/components/effects/BlackHoleShader'
import { Scene } from '@/components/webgl/Scene'

import { Hero } from '@/components/sections/Hero'
import { MotionLab } from '@/components/sections/MotionLab'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

import { Navbar } from '@/components/ui/Navbar'
import { Loader } from '@/components/core/Loader'

export default function Home() {
  const { scrollY } = useScroll()

  const heroY = useTransform(scrollY, [0, 700], [0, -220])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroBlur = useTransform(
    scrollY,
    [0, 500],
    ['blur(0px)', 'blur(16px)']
  )

  return (
    <main className="relative overflow-hidden bg-[#040405] text-white">
      <Loader />

      <Atmosphere />
      <BlackHoleShader />
      <Scene />
      <Particles />
      <Cursor />
      <SmoothScroll />
      <Navbar />

      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          filter: heroBlur,
        }}
      >
        <Hero />
      </motion.div>

      <div className="h-40" />

      <MotionLab />

      <div className="h-52" />

      <Projects />

      <div className="h-52" />

      <Contact />

      <Footer />

      <div className="h-32" />
    </main>
  )
}