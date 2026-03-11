import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const VERMILLION = 'hsl(5, 75%, 50%)';
const PAPER = 'hsl(40, 25%, 95%)';

export const SamuraiHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 1, 1]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5], [0, 1, 1]);
  const lineWidth = useTransform(scrollYProgress, [0.05, 0.25], ['0%', '100%']);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section id="samurai-hero" ref={ref} className="relative h-[200vh]" style={{ background: PAPER }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Subtle grid lines like ruled ledger paper */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${(i + 1) * 3.33}%`,
                height: '1px',
                background: 'hsl(25, 15%, 50%)',
              }}
            />
          ))}
          {/* Vertical margin line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '12%',
              width: '1px',
              background: VERMILLION,
              opacity: 0.3,
            }}
          />
        </div>

        {/* Main title — brush-drawn feel */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-center leading-[0.95] max-w-4xl"
          style={{ color: INK, opacity: titleOpacity }}
        >
          Stipends, Bonds,{' '}
          <br className="hidden md:block" />
          and the Death of a Class
        </motion.h1>

        {/* Vermillion divider line */}
        <motion.div
          className="h-[2px] mt-6 mb-6"
          style={{
            width: lineWidth,
            maxWidth: '240px',
            background: VERMILLION,
          }}
        />

        <motion.p
          className="font-body text-lg md:text-xl text-center max-w-xl leading-relaxed"
          style={{ color: FADED, opacity: subtitleOpacity }}
        >
          The samurai class was not destroyed by war but by accounting: stipends converted to bonds, 
          domains merged into prefectures, privilege replaced by institutions.
        </motion.p>

        <motion.p
          className="mt-4 font-display text-sm tracking-[0.3em] uppercase"
          style={{ color: VERMILLION, opacity: subtitleOpacity }}
        >
          1603 — 1877
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-3"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body" style={{ color: FADED }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: FADED }}
            animate={{ scaleY: [1, 0.5, 1], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
