import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WISDOM_TEAL = '170 40% 30%';

export const WisdomHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textReveal1 = useTransform(scrollYProgress, [0.0, 0.15], [0, 1]);
  const textReveal2 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const textReveal3 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <section id="wisdom-hero" ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern — islamic geometric */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="wisdom-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40,0 L80,40 L40,80 L0,40 Z" fill="none" stroke={`hsl(${WISDOM_TEAL})`} strokeWidth="0.5" />
                <circle cx="40" cy="40" r="12" fill="none" stroke="hsl(43, 85%, 55%)" strokeWidth="0.3" />
                <path d="M20,20 L60,20 L60,60 L20,60 Z" fill="none" stroke={`hsl(${WISDOM_TEAL})`} strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#wisdom-geo)" />
          </svg>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, hsl(${WISDOM_TEAL} / 0.15) 0%, hsl(var(--background)) 70%)`,
          }}
        />

        <motion.div className="relative z-10 text-center max-w-4xl mx-auto px-6" style={{ opacity }}>
          {/* Arabic calligraphy */}
          <motion.p
            className="text-4xl md:text-6xl mb-6 font-body"
            style={{ opacity: textReveal1, color: `hsl(43, 85%, 55%)` }}
            dir="rtl"
          >
            بَيْت الْحِكْمَة
          </motion.p>

          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
            style={{ opacity: textReveal2 }}
          >
            <span className="text-[hsl(170,45%,50%)]">The Library</span>{' '}
            <span className="text-foreground/90">That Lit the World</span>
          </motion.h1>

          <motion.p
            className="text-foreground/60 text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed"
            style={{ opacity: textReveal3 }}
          >
            For 400 years, one building in Baghdad held more knowledge than all of Europe combined.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.4)` }}>
              Scroll to begin
            </span>
            <div className="w-px h-8" style={{ background: `hsl(${WISDOM_TEAL} / 0.3)` }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
