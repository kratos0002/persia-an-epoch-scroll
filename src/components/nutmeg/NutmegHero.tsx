import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const NutmegHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="nutmeg-hero" ref={ref} className="relative h-[150vh]" style={{ background: OCEAN }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Ocean wave pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full"
              style={{
                height: '2px',
                top: `${40 + i * 8}%`,
                background: `linear-gradient(90deg, transparent, rgba(100, 180, 220, ${0.03 + i * 0.01}), transparent)`,
              }}
              animate={{ x: ['-10%', '10%', '-10%'] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: `${OCEAN}dd` }} />

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Essay XI
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: PARCHMENT }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Spice That<br />
            <em className="italic" style={{ color: SPICE }}>Built Empires</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: SMOKE, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            One seed. Ten thousand dead. And a trade that shaped the modern world.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 2 }}
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
