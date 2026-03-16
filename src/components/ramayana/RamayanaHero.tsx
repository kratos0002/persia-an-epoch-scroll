import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RM } from '@/components/visuals/ramayanaMapData';

/* Simplified lotus mandala for title page */
const LotusMandala = () => {
  const petals = 12;
  const r = 120;
  return (
    <svg width={r * 2} height={r * 2} viewBox={`-${r} -${r} ${r * 2} ${r * 2}`} className="opacity-[0.08]">
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        return (
          <ellipse
            key={i}
            cx={0}
            cy={-r * 0.5}
            rx={r * 0.18}
            ry={r * 0.45}
            fill="none"
            stroke={RM.VERMILLION}
            strokeWidth={1.5}
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.12} fill="none" stroke={RM.GOLD_LEAF} strokeWidth={1.5} />
      <circle cx={0} cy={0} r={r * 0.35} fill="none" stroke={RM.VERMILLION} strokeWidth={0.5} />
    </svg>
  );
};

export const RamayanaHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.7], [1, 0]);

  return (
    <section id="ramayana-hero-intro" ref={ref} className="relative h-[150vh]" style={{ background: RM.PARCHMENT }}>
      {/* Paper grain */}
      <div className="absolute inset-0 ramayana-paper-grain pointer-events-none" />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Devanagari watermark — राम */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: titleOpacity }}
        >
          <motion.span
            style={{
              fontSize: 'clamp(300px, 42vw, 550px)',
              fontWeight: 900,
              color: RM.VERMILLION,
              opacity: 0.04,
              lineHeight: 1,
              userSelect: 'none',
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            राम
          </motion.span>
        </motion.div>

        {/* Mandala behind title */}
        <div className="absolute pointer-events-none">
          <LotusMandala />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, hsla(43,90%,52%,0.06), transparent)`,
        }} />

        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
          style={{ color: RM.VERMILLION, opacity: subtitleOpacity }}
        >
          Essay XIII
        </motion.p>

        {/* Title in decorative frame */}
        <motion.div
          className="relative px-10 py-4"
          style={{ opacity: titleOpacity }}
        >
          {/* Gold border frame */}
          <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: `${RM.GOLD_LEAF}40` }} />
          <div className="absolute inset-[4px] border pointer-events-none" style={{ borderColor: `${RM.VERMILLION}30` }} />

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] max-w-4xl"
            style={{ color: RM.INK }}
          >
            The Exile's Road
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 font-body text-lg md:text-xl text-center max-w-xl leading-relaxed"
          style={{ color: `${RM.INK}90`, opacity: subtitleOpacity }}
        >
          Tracing the Ramayana across 2,500 kilometres of India
        </motion.p>

        <motion.p
          className="mt-2 font-body text-sm text-center"
          style={{ color: RM.OCHRE, opacity: subtitleOpacity }}
        >
          Part 1 of 2
        </motion.p>

        {/* Opening shloka */}
        <motion.p
          className="mt-5 font-body text-[11px] text-center tracking-wide"
          style={{ color: RM.VERMILLION, opacity: subtitleOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 2 }}
        >
          तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          style={{ opacity: subtitleOpacity }}
        >
          <span className="text-[9px] tracking-[0.2em] uppercase font-body" style={{ color: RM.BURNT_UMBER, opacity: 0.4 }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: RM.VERMILLION, opacity: 0.4 }}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
