import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RM } from '@/components/visuals/ramayanaMapData';

export const RamayanaHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.7], [1, 0]);

  return (
    <section id="ramayana-hero-intro" ref={ref} className="relative h-[150vh]" style={{ background: RM.EARTH }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsla(25,85%,52%,0.06), transparent)`,
        }} />

        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
          style={{ color: RM.SAFFRON, opacity: subtitleOpacity }}
        >
          Essay XIII
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] max-w-4xl"
          style={{ color: RM.SANDSTONE, opacity: titleOpacity }}
        >
          The Route
        </motion.h1>

        <motion.p
          className="mt-6 font-body text-lg md:text-xl text-center max-w-xl leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)', opacity: subtitleOpacity }}
        >
          Tracing the Ramayana across 2,500 kilometres of India
        </motion.p>

        <motion.p
          className="mt-2 font-body text-sm text-center"
          style={{ color: 'rgba(255,255,255,0.25)', opacity: subtitleOpacity }}
        >
          Part 1 of 2
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          style={{ opacity: subtitleOpacity }}
        >
          <span className="text-[9px] tracking-[0.2em] uppercase font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: RM.SAFFRON, opacity: 0.4 }}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
