import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TelegraphLine } from '@/components/visuals/TelegraphLine';

const NAVY = 'hsl(220, 25%, 8%)';
const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';
const ASH = 'hsl(220, 10%, 45%)';

export const RebellionHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="rebellion-hero" ref={ref} className="relative h-[200vh]" style={{ background: NAVY }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Telegraph line visual behind title */}
        <div className="absolute inset-0 opacity-30">
          <TelegraphLine />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-xs tracking-[0.35em] uppercase mb-6 font-body font-semibold"
          >
            <span style={{ color: WIRE }}>1857</span>
            <span style={{ color: ASH }}> · </span>
            <span style={{ color: AMBER }}>North India</span>
          </motion.p>

          <motion.h1
            style={{ opacity: titleOpacity }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
          >
            <span style={{ color: WIRE }}>The Signal</span>
            <br />
            <span style={{ color: ASH }} className="text-3xl md:text-5xl lg:text-6xl font-normal italic">and the</span>
            <br />
            <span style={{ color: AMBER }}>Fire</span>
          </motion.h1>

          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            <span style={{ color: 'hsl(220, 10%, 60%)' }}>
              Two signals raced across North India. The telegraph carried British orders at the speed of electricity. The rebellion spread at the speed of a horse.
            </span>
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: ASH }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: ASH }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
