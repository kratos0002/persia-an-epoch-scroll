import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IB } from '@/components/visuals/battutaMapData';
import { CompassRose } from './CompassRose';

export const BattutaHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.7], [1, 0]);

  return (
    <section id="battuta-hero" ref={ref} className="relative h-[150vh]" style={{ background: IB.LEATHER }}>
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
      />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Arabic watermark — ابن بطوطة */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: titleOpacity }}
        >
          <motion.span
            style={{
              fontSize: 'clamp(280px, 40vw, 520px)',
              fontWeight: 900,
              color: IB.SAFFRON,
              opacity: 0.04,
              lineHeight: 1,
              userSelect: 'none',
              direction: 'rtl',
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          >
            بطوطة
          </motion.span>
        </motion.div>

        {/* Compass rose behind title */}
        <div className="absolute pointer-events-none">
          <CompassRose size={240} color={IB.SAFFRON} opacity={0.06} animated />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, hsla(38,80%,55%,0.06), transparent)`,
        }} />

        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
          style={{ color: IB.SAFFRON, opacity: subtitleOpacity }}
        >
          Essay XV
        </motion.p>

        {/* Title frame */}
        <motion.div
          className="relative px-10 py-4"
          style={{ opacity: titleOpacity }}
        >
          {/* Saffron border frame */}
          <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: `${IB.SAFFRON}40` }} />
          <div className="absolute inset-[4px] border pointer-events-none" style={{ borderColor: `${IB.HENNA}30` }} />

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] max-w-5xl"
            style={{ color: IB.PARCHMENT }}
          >
            The Global Odyssey
          </h1>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-[0.95] mt-2"
            style={{ color: IB.SAFFRON }}
          >
            of Ibn Battuta
          </h2>
        </motion.div>

        <motion.p
          className="mt-6 font-body text-lg md:text-xl text-center max-w-xl leading-relaxed"
          style={{ color: `${IB.PARCHMENT}90`, opacity: subtitleOpacity }}
        >
          117,000 kilometres across the 14th-century world
        </motion.p>

        <motion.p
          className="mt-2 font-body text-sm text-center"
          style={{ color: IB.SAND, opacity: subtitleOpacity }}
        >
          29 years · 44 modern nations · One man
        </motion.p>

        {/* Opening quote */}
        <motion.p
          className="mt-5 font-body text-[11px] text-center tracking-wide italic max-w-md"
          style={{ color: IB.SAFFRON, opacity: subtitleOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 2 }}
        >
          "I set out alone, having neither a fellow-traveller in whose companionship I might find cheer, nor caravan whose part I might join..."
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
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
