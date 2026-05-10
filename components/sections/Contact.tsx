'use client'

import { motion } from 'framer-motion'

export function Contact() {
  return (
    <section id="contact" className="relative z-10 flex min-h-screen items-center px-6 py-32">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 80, filter: 'blur(18px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="rounded-[36px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl md:p-14"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-violet-300" />

            <span className="text-[10px] tracking-[0.35em] text-white/45">
              TRANSMISSION
            </span>
          </div>

          <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
            Vamos criar algo que pareça impossível de ignorar.
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-8 text-white/45 md:text-base">
            Se você tem uma ideia, marca, sistema ou experiência que precisa
            ganhar presença digital, envie um sinal.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="mailto:contato@defsoulstudio.com"
              className="rounded-full border border-white/10 bg-white px-7 py-4 text-xs uppercase tracking-[0.3em] text-black transition hover:bg-white/80"
            >
              Enviar sinal
            </a>

            <a
              href="https://wa.me/5512981462722"
              target="_blank"
              className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur-xl transition hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>

        <footer className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[0.3em] text-white/30 md:flex-row">
          <span>Defsoul Studio</span>
          <span>Technology with soul</span>
          <span>System online</span>
        </footer>
      </div>
    </section>
  )
}