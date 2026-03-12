import React from 'react';
import { motion } from 'framer-motion';
import { IndiaMap } from '@/components/visuals/IndiaMap';

export const IndiaHero: React.FC = () => (
  <section id="patchwork" className="relative min-h-[120vh] flex items-center justify-center overflow-hidden" style={{ background: INDIA_COLORS.background }}>
    {/* Grain overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px',
    }} />

    {/* Map in background */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <div className="w-[80%] max-w-lg">
        <IndiaMap era="patchwork" />
      </div>
    </div>

    <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
      <motion.p
        className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-6"
        style={{ color: 'hsl(40, 30%, 55%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        A Visual Essay on the Making of a Nation
      </motion.p>

      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-4"
        style={{ color: 'hsl(40, 30%, 88%)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        The Mosaic Republic
      </motion.h1>

      <motion.p
        className="font-display text-xl md:text-2xl italic mb-6"
        style={{ color: 'hsl(40, 25%, 60%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        How 565 became 28
      </motion.p>

      <motion.p
        className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-6"
        style={{ color: 'hsl(40, 20%, 60%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        On the eve of independence, India was not one country but a mosaic of 565 princely states and British provinces. What followed was the largest peaceful political integration in human history.
      </motion.p>

      <motion.div
        className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        {[
          { n: '565', label: 'Princely States' },
          { n: '17', label: 'British Provinces' },
          { n: '77', label: 'Years of Redrawing' },
        ].map(item => (
          <div key={item.label} className="text-center">
            <div className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'hsl(40, 60%, 55%)' }}>{item.n}</div>
            <div className="text-[10px] tracking-[0.15em] uppercase font-body mt-1" style={{ color: 'hsl(40, 20%, 50%)' }}>{item.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="mt-12 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: 'hsl(40, 25%, 45%)' }}>
          Scroll to witness
        </span>
        <motion.span
          className="text-xl"
          style={{ color: 'hsl(40, 30%, 50%)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >↓</motion.span>
      </motion.div>
    </div>
  </section>
);

const INDIA_COLORS = { background: 'hsl(220, 20%, 10%)' };
