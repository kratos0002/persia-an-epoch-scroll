import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IB, ALL_COORDS } from '@/components/visuals/battutaMapData';
import { PortolanCompassRose } from './PortolanCompassRose';
import { RhumbLinesCSS } from './RhumbLineBackground';
import { ShaderLayer } from '@/components/visuals/ShaderLayer';
import { useTextHeight, useContainerWidth } from '@/hooks/usePretext';

/* ── Title metrics — Pretext-measured at lg-breakpoint sizes to reserve
   space and kill webfont CLS when Cormorant Garamond swaps in. The H1/H2
   themselves stay responsive via Tailwind text-* utilities; we only need
   a stable min-height floor so the surrounding flex column doesn't shift. */
const H1_FONT_LG = '700 96px "Cormorant Garamond"';
const H2_FONT_LG = '700 60px "Cormorant Garamond"';
const H1_TITLE = 'The Global Odyssey';
const H2_TITLE = 'of Ibn Battuta';
const TITLE_LH = 0.95;

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

  // Reserve space for the title block at the largest breakpoint via Pretext.
  // Even at smaller breakpoints, the floor ensures the flex column doesn't
  // jump when Cormorant Garamond swaps in.
  const { ref: titleFrameRef, width: titleWidth } = useContainerWidth<HTMLDivElement>();
  const h1Metrics = useTextHeight(H1_TITLE, H1_FONT_LG, titleWidth || 800, 96 * TITLE_LH);
  const h2Metrics = useTextHeight(H2_TITLE, H2_FONT_LG, titleWidth || 800, 60 * TITLE_LH);

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
          overflow: 'hidden',
        }}>
          {/* WebGL paper-fiber atmosphere replaces the static CSS noise classes */}
          <ShaderLayer kind="paper" intensity={0.38} zIndex={0} />
          {/* Legacy CSS atmosphere kept for graceful degradation if WebGL is unavailable */}
          <div className="absolute inset-0 battuta-vellum-grain" style={{ opacity: 0.4 }} />
          <div className="absolute inset-0 battuta-foxing" style={{ opacity: 0.6 }} />
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

        {/* Title frame — minHeight reserved via Pretext to kill CLS on font swap */}
        <motion.div
          ref={titleFrameRef}
          className="relative px-10 py-4 z-10"
          style={{ opacity: titleOpacity }}
        >
          {/* Saffron border frame */}
          <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: `${IB.SAFFRON}40` }} />
          <div className="absolute inset-[4px] border pointer-events-none" style={{ borderColor: `${IB.HENNA}30` }} />

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] max-w-5xl battuta-gilt"
            style={{
              color: IB.INK,
              minHeight: h1Metrics.height || undefined, // floor: lg-breakpoint single-line height
            }}>
            {H1_TITLE}
          </h1>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-[0.95] mt-2"
            style={{
              color: IB.SAFFRON,
              minHeight: h2Metrics.height || undefined,
            }}>
            {H2_TITLE}
          </h2>
        </motion.div>

        {/* SCALE PUNCH — three big numbers, hero-weight typography. The whole
            essay is about an unimaginable scale; the reader should feel it
            in the very first viewport, not buried in a subtitle. */}
        <motion.div
          className="mt-10 md:mt-12 relative z-10 w-full max-w-4xl px-4"
          style={{ opacity: subtitleOpacity }}
        >
          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {[
              { value: '117,000', unit: 'km' },
              { value: '29', unit: 'years' },
              { value: '44', unit: 'nations' },
            ].map((stat, i) => (
              <motion.div
                key={stat.unit}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-display font-bold battuta-gilt leading-none"
                  style={{
                    color: IB.HENNA,
                    fontSize: 'clamp(40px, 6vw, 86px)',
                    letterSpacing: '-0.018em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.32em] font-body font-semibold"
                  style={{ color: IB.SAFFRON_DIM, opacity: 0.85 }}
                >
                  {stat.unit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* One short evocative line — the long Rihla quote is reserved for
            the Epilogue where it lands harder after the journey. */}
        <motion.p
          className="mt-10 md:mt-12 font-body italic text-center relative z-10"
          style={{
            color: IB.SAFFRON_DIM,
            opacity: subtitleOpacity,
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            letterSpacing: '0.01em',
          }}
        >
          Before steam. Before maps. Before nations.
        </motion.p>

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
