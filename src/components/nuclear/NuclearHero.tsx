import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroMapBackground } from '@/components/visuals/HeroMapBackground';

const BUNKER = 'hsl(200, 25%, 6%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const URANIUM = 'hsl(45, 80%, 55%)';

export const NuclearHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="nuclear-hero" ref={ref} className="relative h-[150vh]" style={{ background: BUNKER }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(${GEIGER}40 1px, transparent 1px),
              linear-gradient(90deg, ${GEIGER}40 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* World map with proliferation chain */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.6], [0.55, 0]) }}
        >
          <HeroMapBackground />
        </motion.div>

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Essay X
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: 'hsl(0, 0%, 92%)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Chain<br />
            <em className="italic" style={{ color: GEIGER }}>Reaction</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: STEEL, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            How nine countries built the bomb — through espionage, ambition, desperation, and pride.
          </motion.p>

          {/* Nation names — slow reveal */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1 max-w-xl">
              {[
                { name: 'USA', year: '1945', color: 'hsl(140, 70%, 45%)' },
                { name: 'USSR', year: '1949', color: 'hsl(0, 65%, 50%)' },
                { name: 'UK', year: '1952', color: 'hsl(210, 50%, 40%)' },
                { name: 'France', year: '1960', color: 'hsl(220, 50%, 55%)' },
                { name: 'China', year: '1964', color: 'hsl(0, 70%, 45%)' },
                { name: 'India', year: '1974', color: 'hsl(25, 80%, 50%)' },
                { name: 'Pakistan', year: '1998', color: 'hsl(150, 60%, 35%)' },
                { name: 'N. Korea', year: '2006', color: 'hsl(45, 80%, 55%)' },
                { name: 'Israel', year: '~1966', color: 'hsl(220, 20%, 55%)' },
              ].map((nation, i) => (
                <motion.span
                  key={nation.name}
                  className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-body font-semibold"
                  style={{ color: nation.color }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 + i * 0.18 }}
                >
                  {nation.name}
                  <span className="font-normal opacity-50 ml-1" style={{ color: STEEL, fontSize: '0.85em' }}>
                    {nation.year}
                  </span>
                  {i < 8 && (
                    <span className="ml-2 md:ml-3 opacity-20" style={{ color: STEEL }}>·</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Timeline span */}
            <motion.div
              className="flex items-center gap-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 4 }}
            >
              <span className="text-[10px] tracking-[0.2em] font-body" style={{ color: STEEL }}>1945</span>
              <div className="w-32 md:w-48 h-px" style={{ background: `linear-gradient(90deg, ${GEIGER}60, ${GEIGER}20)` }} />
              <span className="text-[10px] tracking-[0.2em] font-body" style={{ color: STEEL }}>2017</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: STEEL }}>Scroll</span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: GEIGER }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
