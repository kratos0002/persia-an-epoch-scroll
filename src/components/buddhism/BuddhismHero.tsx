import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SAFFRON = '30 65% 45%';
const GOLD = '43 70% 55%';

// Lotus petal SVG paths
const PETALS = [
  'M 250 260 Q 250 220 230 180 Q 220 150 250 130 Q 280 150 270 180 Q 250 220 250 260',
  'M 250 260 Q 220 240 190 220 Q 165 210 170 175 Q 200 180 210 200 Q 230 230 250 260',
  'M 250 260 Q 280 240 310 220 Q 335 210 330 175 Q 300 180 290 200 Q 270 230 250 260',
  'M 250 260 Q 210 250 175 250 Q 145 250 145 220 Q 170 220 185 230 Q 215 245 250 260',
  'M 250 260 Q 290 250 325 250 Q 355 250 355 220 Q 330 220 315 230 Q 285 245 250 260',
];

export const BuddhismHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const petalProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  return (
    <section id="buddhism-hero" ref={ref} className="relative h-[200vh]">
      <motion.div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden" style={{ opacity }}>
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={200} cy={200} r={30 + i * 15} fill="none" stroke={`hsl(${SAFFRON})`} strokeWidth={0.5} opacity={0.5} />
            ))}
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, hsl(${SAFFRON} / 0.06) 0%, transparent 60%)`
        }} />

        {/* Lotus SVG */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
          <svg viewBox="100 100 300 200" className="w-full h-full">
            {PETALS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={`hsl(${SAFFRON})`}
                strokeWidth={1.5}
                strokeLinecap="round"
                style={{ pathLength: petalProgress }}
                opacity={0.7}
              />
            ))}
            {/* Center circle */}
            <motion.circle
              cx={250} cy={250} r={8}
              fill={`hsl(${GOLD})`}
              style={{ scale: petalProgress }}
              opacity={0.8}
            />
          </svg>
        </div>

        <motion.p
          className="text-xs tracking-[0.4em] uppercase font-body mb-4"
          style={{ opacity: subtitleOpacity, color: `hsl(${SAFFRON} / 0.6)` }}
        >
          An Epoch Lives Visual Essay
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[0.9] mb-6"
          style={{ opacity: titleOpacity, color: `hsl(${SAFFRON})` }}
        >
          The Path<br />That Split
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl text-center max-w-lg px-6"
          style={{ opacity: subtitleOpacity, color: `hsl(${SAFFRON} / 0.5)` }}
        >
          From one man's awakening under a tree to 500 million followers across a thousand traditions
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: `hsl(${SAFFRON} / 0.3)` }}>
            Scroll to begin
          </span>
          <div className="w-px h-6" style={{ background: `hsl(${SAFFRON} / 0.2)` }} />
        </motion.div>
      </motion.div>
    </section>
  );
};
