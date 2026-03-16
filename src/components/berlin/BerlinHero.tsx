import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BL } from '@/components/visuals/berlinMapData';

export const BerlinHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const lineLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="berlin-hero" ref={ref} className="relative h-[200vh]" style={{ background: BL.PRUSSIAN }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Survey grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${BL.GRID_BLUE}08 1px, transparent 1px),
              linear-gradient(to bottom, ${BL.GRID_BLUE}08 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Africa silhouette with partition line drawing across */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 800 800" className="w-[60vmin] h-[60vmin] opacity-[0.06]">
            {/* Simplified Africa outline */}
            <path
              d="M400 80 Q440 100 460 160 Q500 180 520 220 Q540 200 560 220 Q560 260 540 300 Q560 340 540 380 Q520 420 520 460 Q500 500 480 540 Q460 560 440 600 Q420 640 380 680 Q360 700 340 680 Q320 640 300 600 Q280 560 260 520 Q240 480 240 440 Q220 400 220 360 Q200 320 220 280 Q240 240 260 220 Q280 200 300 180 Q320 160 340 140 Q360 120 380 100 Z"
              fill={BL.GRID_BLUE}
              stroke="none"
            />
          </svg>

          {/* The arbitrary line — draws itself diagonally across Africa */}
          <motion.svg viewBox="0 0 800 800" className="absolute w-[60vmin] h-[60vmin]">
            <motion.line
              x1="250" y1="200" x2="520" y2="600"
              stroke={BL.RED_WAX}
              strokeWidth="2"
              strokeDasharray="500"
              strokeDashoffset={useTransform(lineLength, v => 500 - v * 500)}
            />
          </motion.svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-xs tracking-[0.35em] uppercase mb-6 font-body font-semibold"
          >
            <span style={{ color: BL.GRID_BLUE }}>November 1884</span>
            <span style={{ color: BL.MUTED }}> · </span>
            <span style={{ color: BL.BRASS }}>Berlin</span>
          </motion.p>

          <motion.h1
            style={{ opacity: titleOpacity }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
          >
            <span style={{ color: BL.VELLUM }}>The Architecture</span>
            <br />
            <span style={{ color: BL.MUTED }} className="text-3xl md:text-5xl lg:text-6xl font-normal italic">of</span>
            <br />
            <span style={{ color: BL.RED_WAX }}>Partition</span>
          </motion.h1>

          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            <span style={{ color: BL.GRID_BLUE }}>
              Fourteen nations sat around a table in Berlin. No African was invited.
              They drew lines on a map of a continent they had never surveyed —
              and those lines still draw blood today.
            </span>
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: BL.MUTED }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: BL.MUTED }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
