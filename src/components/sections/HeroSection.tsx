import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PersianPattern } from '@/components/visuals/PersianPattern';

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const textReveal1 = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const textReveal2 = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const textReveal3 = useTransform(scrollYProgress, [0.12, 0.24], [0, 1]);
  const textReveal4 = useTransform(scrollYProgress, [0.2, 0.32], [0, 1]);

  return (
    <section id="hero" ref={ref} className="relative h-[250vh]">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Background pattern */}
        <PersianPattern variant="hexagonal" opacity={0.04} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

        {/* Spinning ornament */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y }}
        >
          <motion.svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            className="opacity-[0.04] w-[600px] h-[600px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 45, 90, 135].map(angle => (
              <g key={angle} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 50 L270 230 L250 250 L230 230 Z" fill="hsl(43,85%,55%)" />
                <rect x="245" y="40" width="10" height="30" fill="hsl(43,85%,55%)" rx="2" />
              </g>
            ))}
          </motion.svg>
        </motion.div>

        {/* Content — scroll-revealed line by line */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase text-[hsl(43,85%,55%,0.5)] mb-6 font-body"
            style={{ opacity: textReveal1 }}
          >
            Epoch Lives Presents
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-gold leading-[1.1]"
            style={{ opacity: textReveal2 }}
          >
            The Immortal Empire
          </motion.h1>

          <motion.p
            className="text-foreground/60 text-xl md:text-2xl font-body max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ opacity: textReveal3 }}
          >
            2,500 years of Persia — from Cyrus the Great to the modern Islamic Republic.
            One civilization's unbroken thread through human history.
          </motion.p>

          <motion.p
            className="text-foreground/30 text-sm font-body tracking-widest uppercase"
            style={{ opacity: textReveal4 }}
          >
            550 BCE — Present
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: textReveal4 }}
          >
            <span className="text-foreground/20 text-xs font-body tracking-widest uppercase">Scroll to begin</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-[hsl(43,85%,55%,0.3)] to-transparent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
