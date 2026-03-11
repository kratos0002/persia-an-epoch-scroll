import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MIDNIGHT = 'hsl(225, 30%, 7%)';
const BLUE = 'hsl(220, 65%, 45%)';
const WHITE = 'hsl(0, 0%, 95%)';
const RED = 'hsl(0, 65%, 48%)';
const SMOKE = 'hsl(220, 8%, 35%)';

export const NapoleonHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="napoleon-hero" ref={ref} className="relative h-[150vh]" style={{ background: MIDNIGHT }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Tricolor bands */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Blue band — bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{ background: BLUE, height: '33.3%' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* White band — middle */}
          <motion.div
            className="absolute left-0 right-0"
            style={{ background: WHITE, height: '33.4%', top: '33.3%', opacity: 0.08 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Red band — top */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{ background: RED, height: '33.3%' }}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0" style={{ background: `${MIDNIGHT}cc` }} />

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Essay VI
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: WHITE }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Rise and Fall<br />
            <em className="italic" style={{ color: 'hsl(43, 70%, 50%)' }}>of Napoleon</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: SMOKE, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            One man reorganized Europe. Then Europe closed in.
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

