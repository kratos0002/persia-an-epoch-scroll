import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const AMBER = 'hsl(35, 80%, 50%)';

export const HormuzHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="hormuz-hero" ref={ref} className="relative h-[150vh]" style={{ background: NAVY }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle water shimmer lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full"
              style={{
                height: '1px',
                top: `${30 + i * 7}%`,
                background: `linear-gradient(90deg, transparent, hsla(195, 55%, 35%, ${0.04 + i * 0.008}), transparent)`,
              }}
              animate={{ x: ['-15%', '15%', '-15%'] }}
              transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Radial glow from center */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 55%, hsla(195, 55%, 35%, 0.08), transparent)`,
          }}
        />

        <div className="absolute inset-0" style={{ background: `${NAVY}dd` }} />

        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Essay XII
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: PARCHMENT }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Throat of<br />
            <em className="italic" style={{ color: TEAL }}>the World</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: SMOKE, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            Every empire that ever ruled the East held this strait.
            Every one that lost it fell.
          </motion.p>
        </motion.div>

        {/* Strait width indicator */}
        <motion.div
          className="absolute bottom-24 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-px" style={{ background: AMBER }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: AMBER }}>
              21 miles
            </span>
            <div className="w-16 h-px" style={{ background: AMBER }} />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: SMOKE }}>Scroll</span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: SMOKE }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
