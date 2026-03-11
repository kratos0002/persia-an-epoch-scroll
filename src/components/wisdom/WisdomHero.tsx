import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WISDOM_TEAL = '170 40% 30%';

// SVG path data for simplified بيت الحكمة calligraphy strokes
const CALLIGRAPHY_PATHS = [
  // Stylized strokes inspired by Arabic calligraphy — flowing curves
  'M120,200 C140,180 180,160 220,170 C260,180 280,200 300,190 C320,180 340,160 360,170',
  'M140,220 C160,230 200,240 240,230 C280,220 300,210 340,220',
  'M180,250 C200,260 240,270 280,260 C320,250 340,240 380,250',
  // Dots and marks
  'M200,180 C205,175 210,180 205,185 C200,180 200,180 200,180',
  'M300,170 C305,165 310,170 305,175 C300,170 300,170 300,170',
  // Second word
  'M420,190 C440,170 480,160 520,170 C560,180 580,200 600,190',
  'M440,220 C460,230 500,240 540,230 C580,220 600,210 620,220',
  'M460,250 C480,260 520,270 560,260 C600,250 620,240 640,250',
  'M500,180 C505,175 510,180 505,185 C500,180 500,180 500,180',
];

export const WisdomHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Each calligraphy path draws based on scroll
  const strokeProgress = CALLIGRAPHY_PATHS.map((_, i) => {
    const start = i * 0.03;
    const end = start + 0.15;
    return useTransform(scrollYProgress, [start, Math.min(end, 0.4)], [0, 1]);
  });

  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);

  return (
    <section id="wisdom-hero" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Geometric pattern bg */}
        <div className="absolute inset-0 opacity-[0.03]">
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

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, hsl(${WISDOM_TEAL} / 0.15) 0%, hsl(var(--background)) 70%)`,
          }}
        />

        <motion.div className="relative z-10 text-center max-w-4xl mx-auto px-6" style={{ opacity }}>
          {/* Scroll-driven calligraphy drawing */}
          <div className="relative h-32 md:h-40 mb-8">
            <svg viewBox="100 150 580 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {CALLIGRAPHY_PATHS.map((path, i) => (
                <motion.path
                  key={i}
                  d={path}
                  fill="none"
                  stroke="hsl(43, 85%, 55%)"
                  strokeWidth={i === 3 || i === 4 || i === 8 ? 4 : 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    pathLength: strokeProgress[i],
                  }}
                  initial={{ pathLength: 0 }}
                />
              ))}
            </svg>
          </div>

          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
            style={{ opacity: titleOpacity }}
          >
            <span style={{ color: `hsl(170, 45%, 50%)` }}>The Library</span>{' '}
            <span className="text-foreground/90">That Lit the World</span>
          </motion.h1>

          <motion.p
            className="text-foreground/60 text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed"
            style={{ opacity: subtitleOpacity }}
          >
            For 400 years, one building in Baghdad held more knowledge than all of Europe combined.
          </motion.p>

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
