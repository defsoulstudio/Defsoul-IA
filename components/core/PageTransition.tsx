'use client'
 
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
 
export function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
 
  return (
    // FIX: AnimatePresence é obrigatório para o exit rodar.
    // mode="wait" garante que a saída termina antes da entrada começar.
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 28,
          filter: 'blur(16px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }}
        exit={{
          opacity: 0,
          y: -28,
          filter: 'blur(16px)',
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}