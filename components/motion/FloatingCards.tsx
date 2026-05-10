'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const cards = [
  {
    label: 'EASING',
    title: 'Fluid entrance',
  },
  {
    label: 'DEPTH',
    title: 'Layered motion',
  },
  {
    label: 'PHYSICS',
    title: 'Magnetic response',
  },
]

function InteractiveCard({
  label,
  title,
  index,
}: {
  label: string
  title: string
  index: number
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    ['10deg', '-10deg']
  )

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    ['-10deg', '10deg']
  )

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
  })

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
  })

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const x =
      (e.clientX - rect.left) / width - 0.5

    const y =
      (e.clientY - rect.top) / height - 0.5

    mouseX.set(x)
    mouseY.set(y)

    glowX.set((e.clientX - rect.left) / width * 100)
    glowY.set((e.clientY - rect.top) / height * 100)
  }

  const reset = () => {
    mouseX.set(0)
    mouseY.set(0)

    glowX.set(50)
    glowY.set(50)
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        filter: 'blur(14px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {
          duration: 1,
          delay: index * 0.12,
        },
        y: {
          duration: 4 + index,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        filter: {
          duration: 1,
          delay: index * 0.12,
        },
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.025]
        p-6
        text-left
        backdrop-blur-2xl
      "
    >
      {/* spotlight */}
      <motion.div
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.14), transparent 55%)`
          ),
        }}
        className="absolute inset-0"
      />

      {/* glow */}
      <motion.div
        animate={{
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)]"
      />

      {/* top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        style={{
          transform: 'translateZ(40px)',
        }}
        className="relative z-10"
      >
        <span className="text-[10px] tracking-[0.35em] text-violet-200/55">
          {label}
        </span>

        <h3 className="mt-10 text-2xl font-light tracking-[-0.04em] text-white">
          {title}
        </h3>

        <div className="mt-6 h-px w-14 bg-gradient-to-r from-white/40 to-transparent" />
      </div>
    </motion.div>
  )
}

export function FloatingCards() {
  return (
    <div className="relative mt-20 grid w-full max-w-5xl gap-5 md:grid-cols-3">
      {cards.map((card, index) => (
        <InteractiveCard
          key={card.title}
          label={card.label}
          title={card.title}
          index={index}
        />
      ))}
    </div>
  )
}