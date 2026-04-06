import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TITLE_WORDS = ['The', 'Sacred', 'Anatomy', 'of', 'Bharatavarsha'];

export const ShaktiHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const svgOpacity = useTransform(scrollYProgress, [0.05, 0.55], [1, 0]);
  const svgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const pillsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      id="shakti-hero"
      ref={sectionRef}
      className="relative h-[150vh] md:h-[200vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Atmospheric backgrounds */}
        <div className="shakti-bg shakti-grain absolute inset-0" />
        <div className="shakti-yantra-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--shakti-vermilion)/0.18),transparent_22%),radial-gradient(circle_at_50%_100%,hsl(var(--shakti-plum)/0.2),transparent_55%)]" />

        {/* Durga SVG — atmospheric backdrop behind text */}
        <motion.div
          style={{ opacity: svgOpacity, scale: svgScale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative aspect-square w-[min(70vw,36rem)]">
            <svg viewBox="0 0 600 600" className="h-full w-full">
              <defs>
                <radialGradient id="faceGlow" cx="50%" cy="45%" r="40%">
                  <stop offset="0%" stopColor="hsl(var(--shakti-vermilion) / 0.35)" />
                  <stop offset="100%" stopColor="hsl(var(--shakti-vermilion) / 0)" />
                </radialGradient>
                <radialGradient id="thirdEyeGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--shakti-gold) / 0.9)" />
                  <stop offset="100%" stopColor="hsl(var(--shakti-vermilion) / 0.6)" />
                </radialGradient>
                <linearGradient id="lipGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--shakti-vermilion) / 0.9)" />
                  <stop offset="100%" stopColor="hsl(var(--shakti-plum) / 0.8)" />
                </linearGradient>
              </defs>

              {/* Mandala ring */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (Math.PI * 2 * i) / 16;
                const inner = 220;
                const outer = i % 2 === 0 ? 265 : 245;
                return (
                  <motion.path
                    key={i}
                    d={`M ${300 + Math.cos(angle) * inner} ${290 + Math.sin(angle) * inner} L ${300 + Math.cos(angle + 0.12) * outer} ${290 + Math.sin(angle + 0.12) * outer} L ${300 + Math.cos(angle + 0.24) * inner} ${290 + Math.sin(angle + 0.24) * inner}`}
                    fill="hsl(var(--shakti-vermilion) / 0.15)"
                    stroke="hsl(var(--shakti-vermilion) / 0.25)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.03 }}
                  />
                );
              })}

              <circle cx="300" cy="290" r="180" fill="url(#faceGlow)" />

              {/* Left eyebrow */}
              <motion.path
                d="M175,240 Q220,188 290,208 Q312,214 322,226"
                stroke="hsl(var(--shakti-ink) / 0.85)"
                strokeWidth="8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              {/* Right eyebrow */}
              <motion.path
                d="M425,240 Q380,188 310,208 Q288,214 278,226"
                stroke="hsl(var(--shakti-ink) / 0.85)"
                strokeWidth="8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              />

              {/* Left eye */}
              <motion.path
                d="M200,262 Q255,228 310,262 Q255,290 200,262Z"
                fill="hsl(var(--shakti-ink) / 0.12)" stroke="hsl(var(--shakti-ink) / 0.8)"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <circle cx="255" cy="260" r="16" fill="hsl(var(--shakti-night))" />
              <circle cx="260" cy="254" r="4" fill="hsl(var(--shakti-ink) / 0.6)" />
              <motion.path d="M200,262 Q182,254 170,242" stroke="hsl(var(--shakti-ink) / 0.75)" strokeWidth="3" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
              />

              {/* Right eye */}
              <motion.path
                d="M290,262 Q345,228 400,262 Q345,290 290,262Z"
                fill="hsl(var(--shakti-ink) / 0.12)" stroke="hsl(var(--shakti-ink) / 0.8)"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              />
              <circle cx="345" cy="260" r="16" fill="hsl(var(--shakti-night))" />
              <circle cx="350" cy="254" r="4" fill="hsl(var(--shakti-ink) / 0.6)" />
              <motion.path d="M400,262 Q418,254 430,242" stroke="hsl(var(--shakti-ink) / 0.75)" strokeWidth="3" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.75 }}
              />

              {/* Third eye */}
              <motion.path
                d="M300,175 Q312,202 300,225 Q288,202 300,175Z"
                fill="url(#thirdEyeGrad)" stroke="hsl(var(--shakti-vermilion) / 0.7)" strokeWidth="1.5"
                initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              />
              <motion.circle cx="300" cy="202" r="4" fill="hsl(var(--shakti-vermilion))"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              />

              {/* Sindoor line */}
              <motion.line x1="300" y1="170" x2="300" y2="130"
                stroke="hsl(var(--shakti-vermilion) / 0.5)" strokeWidth="2.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />

              {/* Nose */}
              <motion.path d="M300,278 L294,338 Q290,346 285,342"
                stroke="hsl(var(--shakti-ink) / 0.6)" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              />
              <motion.circle cx="282" cy="343" r="7"
                stroke="hsl(var(--shakti-gold) / 0.8)" strokeWidth="2" fill="none"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              />
              <circle cx="282" cy="343" r="2" fill="hsl(var(--shakti-gold) / 0.7)" />

              {/* Lips */}
              <motion.path
                d="M262,385 Q278,374 300,382 Q322,374 338,385 Q322,390 300,387 Q278,390 262,385Z"
                fill="url(#lipGrad)"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
              <motion.path
                d="M262,385 Q280,408 300,410 Q320,408 338,385 Q322,390 300,387 Q278,390 262,385Z"
                fill="url(#lipGrad)" opacity="0.75"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.75 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              />

              {/* Gold dots */}
              <circle cx="160" cy="288" r="2.5" fill="hsl(var(--shakti-gold) / 0.4)" />
              <circle cx="440" cy="288" r="2.5" fill="hsl(var(--shakti-gold) / 0.4)" />
              <circle cx="155" cy="310" r="1.8" fill="hsl(var(--shakti-gold) / 0.25)" />
              <circle cx="445" cy="310" r="1.8" fill="hsl(var(--shakti-gold) / 0.25)" />

              {/* Trishul */}
              <g transform="translate(300,110)" stroke="hsl(var(--shakti-ink) / 0.12)" strokeWidth="1.5" fill="none">
                <motion.line x1="0" y1="0" x2="0" y2="-35"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                />
                <motion.path d="M0,-35 Q-10,-45 -6,-58"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                />
                <motion.path d="M0,-35 Q10,-45 6,-58"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                />
                <motion.line x1="0" y1="-35" x2="0" y2="-62"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                />
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Text content — layered on top of SVG */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="shakti-chip mb-8 inline-flex"
          >
            Sacred atlas · anatomy as geography
          </motion.p>

          <motion.h1
            style={{ opacity: textOpacity }}
            className="shakti-title text-5xl leading-[0.9] md:text-7xl lg:text-8xl"
          >
            {TITLE_WORDS.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
                {i < TITLE_WORDS.length - 1 && '\u00A0'}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={{ opacity: textOpacity }}
            className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-shakti-ink/78 md:text-xl"
          >
            The body of Sati breaks, the land lights up, and the subcontinent becomes a living map of feminine power rather than a list of temples.
          </motion.p>

          <motion.div
            style={{ opacity: pillsOpacity }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {['52 peethas', '6 modern countries', '4–108 competing canons', 'myth, tantra, pilgrimage'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.07 }}
                className="rounded-full border border-shakti-vermilion/20 bg-shakti-panel/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-shakti-ink/72 backdrop-blur-md"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-shakti-ink/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-6 w-px bg-shakti-vermilion/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
