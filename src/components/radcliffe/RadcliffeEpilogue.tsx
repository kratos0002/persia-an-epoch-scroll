import React from 'react';
import { motion } from 'framer-motion';

export const RadcliffeEpilogue = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'hsl(30 5% 8%)' }}>
    {/* The permanent scar */}
    <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-radcliffe-red/60" />

    {/* Torn paper edges */}
    <div className="absolute left-0 top-0 h-full w-[calc(50%-20px)]" style={{ background: 'hsl(38 30% 85% / 0.03)' }} />
    <div className="absolute right-0 top-0 h-full w-[calc(50%-20px)]" style={{ background: 'hsl(38 30% 85% / 0.03)' }} />

    <div className="text-center relative z-10 px-6">
      <motion.h2
        className="font-display text-3xl md:text-5xl font-bold text-radcliffe-cream/80 uppercase tracking-[0.12em] mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        The Persistence of the Line
      </motion.h2>

      <motion.div
        className="w-[1px] h-24 bg-radcliffe-red/40 mx-auto mb-8"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        viewport={{ once: true }}
      />

      <motion.div
        className="space-y-2 font-survey text-[0.7rem] text-radcliffe-cream/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
      >
        <p>India-Pakistan border: 3,323 km</p>
        <p>India-Bangladesh border: 4,096 km</p>
        <p>Combined population of border states: ~600 million</p>
      </motion.div>

      <motion.p
        className="mt-12 font-body italic text-radcliffe-cream/20 max-w-md mx-auto text-sm leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        viewport={{ once: true }}
      >
        The Radcliffe Line did not just divide two nations; it inaugurated a permanent state of border tension. The "sloppy surgery" of 1947 remains a living reality.
      </motion.p>
    </div>
  </section>
);
