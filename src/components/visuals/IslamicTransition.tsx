import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const IslamicTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Phase 1 — Crimson wash fades to solid black
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.7, 0.85],
    [
      'hsl(350 55% 12%)',
      'hsl(350 55% 6%)',
      'hsl(0 0% 4%)',
      'hsl(160 45% 8%)',
      'hsl(160 45% 6%)',
    ]
  );

  // Phase 2 — Text reveals (tightened ranges so they appear earlier)
  const yearOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  const yearY = useTransform(scrollYProgress, [0.15, 0.22], [20, 0]);

  const line1Opacity = useTransform(scrollYProgress, [0.22, 0.30], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.22, 0.30], [30, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.30, 0.40], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.30, 0.40], [30, 0]);

  // Phase 3 — Epilogue + teal glow
  const epilogueOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const epilogueY = useTransform(scrollYProgress, [0.42, 0.52], [20, 0]);

  // Vignette darkening
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.7]);

  // Teal glow emergence
  const tealGlow = useTransform(scrollYProgress, [0.4, 0.7], [0, 0.25]);

  // Fade out all text toward end for clean handoff
  const contentFade = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ background: bgColor }}
      >
        {/* Vignette overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 0% / 0.8) 100%)',
          }}
        />

        {/* Teal glow from below */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: tealGlow,
            background:
              'radial-gradient(ellipse at center bottom, hsl(160 45% 38% / 0.6) 0%, transparent 55%)',
          }}
        />

        {/* Text content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          style={{ opacity: contentFade }}
        >
          {/* Year */}
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-6 font-body text-white/60"
            style={{ opacity: yearOpacity, y: yearY }}
          >
            633 CE.
          </motion.p>

          {/* The empire falls */}
          <motion.p
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-white/90"
            style={{ opacity: line1Opacity, y: line1Y }}
          >
            The empire falls.
          </motion.p>

          {/* But Persia does not */}
          <motion.p
            className="font-display text-4xl md:text-6xl font-bold mb-12 text-[hsl(40,50%,75%)]"
            style={{ opacity: line2Opacity, y: line2Y }}
          >
            But Persia does not.
          </motion.p>

          {/* Epilogue */}
          <motion.p
            className="font-body text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed"
            style={{ opacity: epilogueOpacity, y: epilogueY }}
          >
            Within two centuries, Persians would dominate the intellectual life of the entire Islamic world.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
