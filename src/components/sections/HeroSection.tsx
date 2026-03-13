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
        {/* Rich Persian gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 40%, hsl(200, 45%, 12%) 0%, hsl(220, 35%, 8%) 50%, hsl(240, 20%, 5%) 100%)',
          }}
        />

        {/* Warm accent glow — top center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 20%, hsl(43, 85%, 55%, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Teal side glow — left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 10% 60%, hsl(180, 50%, 30%, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* Teal side glow — right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 90% 60%, hsl(180, 50%, 30%, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* Hexagonal pattern — more visible */}
        <PersianPattern variant="hexagonal" opacity={0.1} color="hsl(43,85%,55%)" />

        {/* Star pattern layer for richness */}
        <PersianPattern variant="star" opacity={0.06} color="hsl(180,40%,60%)" />

        {/* Vignette to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(220,20%,7%)]" />

        {/* Spinning ornament — more visible */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y }}
        >
          <motion.svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            className="opacity-[0.12] w-[700px] h-[700px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {[0, 45, 90, 135].map(angle => (
              <g key={angle} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 50 L270 230 L250 250 L230 230 Z" fill="hsl(43,85%,55%)" />
                <path d="M250 70 L265 225 L250 240 L235 225 Z" fill="hsl(180,40%,50%)" opacity="0.4" />
                <rect x="245" y="40" width="10" height="30" fill="hsl(43,85%,55%)" rx="2" />
              </g>
            ))}
            <circle cx="250" cy="250" r="20" fill="none" stroke="hsl(43,85%,55%)" strokeWidth="1" opacity="0.3" />
            <circle cx="250" cy="250" r="200" fill="none" stroke="hsl(43,85%,55%)" strokeWidth="0.5" opacity="0.15" />
          </motion.svg>
        </motion.div>

        {/* Decorative corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-[0.15] pointer-events-none">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" fill="hsl(43,85%,55%)" />
            <path d="M12 0 L12 12 L0 12" stroke="hsl(180,40%,60%)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-16 h-16 opacity-[0.15] pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" fill="hsl(43,85%,55%)" />
            <path d="M12 0 L12 12 L0 12" stroke="hsl(180,40%,60%)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        {/* Content — scroll-revealed line by line */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-6 font-body font-semibold"
            style={{
              opacity: textReveal1,
              color: 'hsl(43, 85%, 55%, 0.7)',
            }}
          >
            Epoch Lives Presents
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.15] overflow-visible"
            style={{ opacity: textReveal2 }}
          >
            <motion.span
              className="inline-block px-1"
              style={{
                color: 'hsl(43, 90%, 62%)',
                textShadow: '0 0 40px hsl(43, 90%, 55%, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The
            </motion.span>{' '}
            <motion.span
              className="inline-block italic px-1"
              style={{
                color: 'hsl(220, 75%, 68%)',
                textShadow: '0 0 35px hsl(220, 70%, 60%, 0.25)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Immortal
            </motion.span>{' '}
            <motion.span
              className="inline-block px-1"
              style={{
                color: 'hsl(358, 75%, 60%)',
                textShadow: '0 0 35px hsl(358, 70%, 55%, 0.25)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Empire
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-body max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              opacity: textReveal3,
              color: 'hsl(38, 20%, 85%)',
            }}
          >
            They built the first empire the world had ever seen. They fell. They rose again.
            For 2,500 years, Persia refused to disappear.
          </motion.p>

          <motion.p
            className="text-sm font-body tracking-[0.3em] uppercase"
            style={{
              opacity: textReveal4,
              color: 'hsl(43, 85%, 55%, 0.5)',
            }}
          >
            550 BCE — Present
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: textReveal4 }}
          >
            <span
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: 'hsl(43, 85%, 55%, 0.35)' }}
            >
              Scroll to begin
            </span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-[hsl(43,85%,55%,0.4)] to-transparent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
