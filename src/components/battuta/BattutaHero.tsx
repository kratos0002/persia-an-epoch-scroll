import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IB, ALL_COORDS } from '@/components/visuals/battutaMapData';
import { PortolanCompassRose } from './PortolanCompassRose';
import { RhumbLinesCSS } from './RhumbLineBackground';

/**
 * Hero section — "The Departure Folio"
 * Full-viewport vellum atlas page with a detailed compass rose,
 * rhumb lines, ghost route, and leather binding frame.
 */
export const BattutaHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.7], [1, 0]);

  // Convert ALL_COORDS to an SVG path for the ghost route
  const routePathData = ALL_COORDS.map((c, i) => {
    // Map [lat, lng] to a simple x,y for background
    const x = ((c[1] + 10) / 135) * 100; // lng range roughly -10 to 125
    const y = ((50 - c[0]) / 60) * 100;  // lat range roughly -10 to 50
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <section id="battuta-hero" ref={ref} className="relative h-[150vh]">
      {/* Leather binding frame */}
      <div className="absolute inset-0" style={{ background: IB.LEATHER }}>
        <div className="absolute inset-3 md:inset-6" style={{
          background: IB.PARCHMENT,
          boxShadow: `inset 0 0 40px hsl(34, 30%, 70%), inset 0 0 0 2px ${IB.SAFFRON}30`,
        }}>
          {/* Vellum grain */}
          <div className="absolute inset-0 battuta-vellum-grain" />
          {/* Age spots */}
          <div className="absolute inset-0 battuta-foxing" />
        </div>
      </div>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Rhumb line background */}
        <RhumbLinesCSS color={IB.SAFFRON} opacity={0.03} position="50% 50%" />

        {/* Ghost route drawn across the background */}
        <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ opacity: titleOpacity }}>
          <svg viewBox="-5 -5 110 110" className="absolute w-[80vw] h-[80vh] opacity-[0.06]" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d={routePathData}
              fill="none"
              stroke={IB.SAFFRON}
              strokeWidth={0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 6, delay: 1, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Large portolan compass rose — slowly rotating */}
        <div className="absolute pointer-events-none">
          <PortolanCompassRose size={420} color={IB.SAFFRON} opacity={0.07} animated points={32} />
        </div>

        {/* Arabic watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: titleOpacity }}
        >
          <motion.span
            style={{
              fontSize: 'clamp(280px, 40vw, 520px)',
              fontWeight: 900,
              color: IB.SAFFRON,
              opacity: 0.03,
              lineHeight: 1,
              userSelect: 'none',
              direction: 'rtl' as const,
              fontFamily: "'Amiri', serif",
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          >
            بطوطة
          </motion.span>
        </motion.div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, hsla(38,80%,55%,0.06), transparent)`,
        }} />

        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 relative z-10"
          style={{ color: IB.SAFFRON, opacity: subtitleOpacity }}
        >
          Essay XV
        </motion.p>

        {/* Title frame */}
        <motion.div className="relative px-10 py-4 z-10" style={{ opacity: titleOpacity }}>
          {/* Saffron border frame */}
          <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: `${IB.SAFFRON}40` }} />
          <div className="absolute inset-[4px] border pointer-events-none" style={{ borderColor: `${IB.HENNA}30` }} />

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] max-w-5xl battuta-gilt"
            style={{ color: IB.INK }}>
            The Global Odyssey
          </h1>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-[0.95] mt-2"
            style={{ color: IB.SAFFRON }}>
            of Ibn Battuta
          </h2>
        </motion.div>

        <motion.p
          className="mt-6 font-body text-lg md:text-xl text-center max-w-xl leading-relaxed relative z-10"
          style={{ color: IB.INK_LIGHT, opacity: subtitleOpacity }}
        >
          117,000 kilometres across the 14th-century world
        </motion.p>

        <motion.p
          className="mt-2 font-body text-sm text-center relative z-10"
          style={{ color: IB.SAND, opacity: subtitleOpacity }}
        >
          29 years · 44 modern nations · One man
        </motion.p>

        {/* Opening quote with quill accent */}
        <motion.div
          className="mt-5 relative z-10 max-w-md text-center"
          style={{ opacity: subtitleOpacity }}
        >
          {/* Small quill glyph */}
          <motion.span
            className="block text-xl mb-2"
            style={{ color: IB.SAFFRON, opacity: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2, delay: 2 }}
          >
            ✦
          </motion.span>
          <motion.p
            className="font-body text-[11px] tracking-wide italic"
            style={{ color: IB.SAFFRON_DIM }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, delay: 2 }}
          >
            "I set out alone, having neither a fellow-traveller in whose companionship I might find cheer, nor caravan whose part I might join..."
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2 z-10"
          style={{ opacity: subtitleOpacity }}
        >
          <span className="text-[9px] tracking-[0.2em] uppercase font-body" style={{ color: IB.SAND, opacity: 0.4 }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: IB.SAFFRON, opacity: 0.4 }}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
