import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BURNT = 'hsl(15, 75%, 50%)';

export const MongolIndiaHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="mi-hero" ref={ref} className="relative h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Background — stylized mountain range */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mi-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(220, 25%, 6%)" />
              <stop offset="100%" stopColor="hsl(220, 20%, 12%)" />
            </linearGradient>
            <linearGradient id="mi-mtn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(25, 20%, 25%)" />
              <stop offset="100%" stopColor="hsl(220, 20%, 10%)" />
            </linearGradient>
          </defs>
          <rect fill="url(#mi-sky)" width="1440" height="900" />
          {/* Hindu Kush silhouette */}
          <motion.path
            d="M0 600 L120 380 L240 450 L360 320 L480 400 L600 280 L720 350 L840 250 L960 330 L1080 280 L1200 360 L1320 300 L1440 400 L1440 900 L0 900 Z"
            fill="url(#mi-mtn)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />
          {/* Foreground ridge */}
          <motion.path
            d="M0 700 L200 580 L400 650 L600 550 L800 620 L1000 500 L1200 580 L1440 520 L1440 900 L0 900 Z"
            fill="hsl(220, 20%, 8%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Floating embers */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: '30%',
            background: BURNT,
          }}
          animate={{
            y: [0, -200 - Math.random() * 300],
            opacity: [0, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-6"
          style={{ color: BURNT, opacity: 0.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Mongol Invasions of India · 1221–1327
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
          style={{ color: 'hsl(40, 25%, 90%)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          The Wall<br />
          <span style={{ color: BURNT }}>That Held</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
          style={{ color: 'hsl(40, 25%, 70%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          They conquered Persia. Baghdad. China. Russia. Nothing stopped them.
          Then they turned toward India — and something held.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.span
            className="text-lg"
            style={{ color: 'hsl(40, 25%, 50%)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
};
