import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PersianPattern } from '@/components/visuals/PersianPattern';

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="hero" ref={ref} className="relative h-[200vh]">
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Animated geometric background */}
        <PersianPattern variant="hexagonal" opacity={0.06} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        {/* Spinning ornament */}
        <motion.div className="absolute animate-spin-slow opacity-[0.04]" style={{ y }}>
          <svg width="600" height="600" viewBox="0 0 600 600">
            <g transform="translate(300,300)">
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M0,-250 C30,-200 30,-150 0,-100 C-30,-150 -30,-200 0,-250"
                  fill="none"
                  stroke="hsl(43 85% 55%)"
                  strokeWidth="1"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={`r${i}`}
                  x="-2" y="-180" width="4" height="60"
                  fill="hsl(43 85% 55%)"
                  opacity="0.3"
                  transform={`rotate(${i * 45})`}
                />
              ))}
            </g>
          </svg>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Epoch Lives branding */}
          <motion.p
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-persian-gold/60 mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Epoch Lives Presents
          </motion.p>

          {/* Main title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gradient-gold">The History</span>
            <br />
            <span className="text-foreground/90">of Persia</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-body text-persian-sand/70 font-light mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            2,500 Years of Civilization
          </motion.p>

          {/* Timeline span */}
          <motion.div
            className="flex items-center justify-center gap-6 text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <span className="font-display text-lg">550 BCE</span>
            <div className="w-24 md:w-40 h-px bg-gradient-to-r from-persian-gold/40 via-persian-gold/20 to-persian-gold/40" />
            <span className="font-display text-lg">2020s CE</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span className="text-xs tracking-widest uppercase text-muted-foreground/40 font-body">Scroll to begin</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-persian-gold/40 to-transparent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
