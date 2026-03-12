import React from 'react';
import { motion } from 'framer-motion';
import { STRATA } from '@/components/visuals/constantinopleData';

export const BedrockEpilogue: React.FC = () => (
  <section id="bedrock" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'hsl(25, 10%, 8%)' }}>
    {/* Compressed strata visual */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
      <div className="max-w-xs mx-auto">
        {STRATA.slice(0, -1).map((s, i) => (
          <motion.div
            key={s.id}
            className="h-6 w-full"
            style={{ background: `hsl(${s.color})` }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.7, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>

    {/* Grain */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px',
    }} />

    <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
      <motion.p
        className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-6"
        style={{ color: 'hsl(25 20% 45%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Bedrock · 25m below surface
      </motion.p>

      <motion.h2
        className="font-display text-4xl md:text-6xl font-bold mb-8"
        style={{ color: 'hsl(40 25% 85%)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Every city is a dig.
      </motion.h2>

      <motion.div
        className="space-y-6 font-body text-lg leading-relaxed"
        style={{ color: 'hsl(40 25% 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p>
          Pull back. Let the layers compress. Nine civilizations, stacked in 25 meters of earth.
          Greek fishhooks beneath Roman aqueducts beneath Byzantine gold beneath Ottoman tile
          beneath modern concrete.
        </p>
        <p>
          Every city you walk through is this. London is Roman beneath medieval beneath
          Georgian beneath Victorian beneath glass. Mexico City is Aztec beneath Spanish
          beneath modern. Cairo is pharaonic beneath Coptic beneath Islamic beneath British.
        </p>
        <p className="font-display text-xl italic" style={{ color: 'hsl(40 25% 80%)' }}>
          The ground remembers what the surface forgets.
        </p>
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold transition-colors"
          style={{ color: 'hsl(40 25% 55%)' }}
        >
          ← Return to surface
        </a>
      </motion.div>
    </div>
  </section>
);
