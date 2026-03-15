import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HZ } from '@/components/visuals/hormuzMapData';

export const HormuzHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="hormuz-hero" ref={ref} className="relative h-[150vh]" style={{ background: HZ.NAVY }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Water ripple lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${30 + i * 8}%`,
                background: `linear-gradient(90deg, transparent 0%, ${HZ.TEAL}40 30%, ${HZ.TEAL}20 50%, ${HZ.TEAL}40 70%, transparent 100%)`,
              }}
              animate={{ x: [i % 2 === 0 ? -40 : 40, i % 2 === 0 ? 40 : -40] }}
              transition={{ duration: 6 + i * 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: HZ.SMOKE }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          >
            Essay XII
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: HZ.PARCHMENT }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Throat of<br />
            <em className="italic" style={{ color: HZ.TEAL }}>the World</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: HZ.SMOKE, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            Every empire that ever ruled the East held this strait. Every one that lost it fell.
          </motion.p>
        </motion.div>

        {/* 21 miles indicator */}
        <motion.div
          className="absolute bottom-24 flex items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2.2 }}
        >
          <div className="w-16 h-px" style={{ background: HZ.AMBER }} />
          <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: HZ.AMBER }}>21 miles</span>
          <div className="w-16 h-px" style={{ background: HZ.AMBER }} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 2.5 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: HZ.SMOKE }}>Scroll</span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: HZ.SMOKE }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
