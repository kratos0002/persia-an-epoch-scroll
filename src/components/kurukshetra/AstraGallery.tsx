import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ASTRAS, AstraInfo } from './kurukshetraData';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';

/* ── Full-viewport astra mandala ── */
const AstraSlide = ({ astra, index }: { astra: AstraInfo; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-30%' });
  const cx = 200, cy = 200;
  const burstR = 160;
  const petals: React.ReactNode[] = [];

  // Build mandala petals
  for (let i = 0; i < astra.petalCount; i++) {
    const angle = (i / astra.petalCount) * 360;
    const rad = (angle * Math.PI) / 180;
    const innerR = 30;
    const spread = (Math.PI / astra.petalCount) * 0.7;

    const tip = { x: cx + Math.cos(rad) * burstR, y: cy + Math.sin(rad) * burstR };
    const left = { x: cx + Math.cos(rad - spread) * innerR, y: cy + Math.sin(rad - spread) * innerR };
    const right = { x: cx + Math.cos(rad + spread) * innerR, y: cy + Math.sin(rad + spread) * innerR };
    const midL = { x: cx + Math.cos(rad - spread * 0.5) * (burstR * 0.6), y: cy + Math.sin(rad - spread * 0.5) * (burstR * 0.6) };
    const midR = { x: cx + Math.cos(rad + spread * 0.5) * (burstR * 0.6), y: cy + Math.sin(rad + spread * 0.5) * (burstR * 0.6) };

    petals.push(
      <motion.path
        key={i}
        d={`M${cx},${cy} L${left.x},${left.y} Q${midL.x},${midL.y} ${tip.x},${tip.y} Q${midR.x},${midR.y} ${right.x},${right.y} Z`}
        fill={`hsl(${astra.color} / 0.06)`}
        stroke={`hsl(${astra.color})`}
        strokeWidth={0.4}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: i * 0.04, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    );
  }

  // Concentric rings
  const rings = [40, 70, 100, 140].map((r, i) => (
    <motion.circle
      key={`ring-${i}`}
      cx={cx} cy={cy} r={r}
      fill="none" stroke={`hsl(${astra.color} / ${0.12 - i * 0.02})`} strokeWidth={0.3}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  ));

  // Energy rays
  const rays: React.ReactNode[] = [];
  for (let i = 0; i < astra.petalCount * 2; i++) {
    const angle = (i / (astra.petalCount * 2)) * 360;
    const rad = (angle * Math.PI) / 180;
    rays.push(
      <motion.line
        key={`ray-${i}`}
        x1={cx + Math.cos(rad) * (burstR + 5)}
        y1={cy + Math.sin(rad) * (burstR + 5)}
        x2={cx + Math.cos(rad) * (burstR + 20 + Math.sin(i * 3) * 10)}
        y2={cy + Math.sin(rad) * (burstR + 20 + Math.sin(i * 3) * 10)}
        stroke={`hsl(${astra.color} / 0.2)`}
        strokeWidth={0.3}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
        transition={{ duration: 2, delay: 1 + i * 0.02, repeat: Infinity, repeatDelay: 1 }}
      />
    );
  }

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative py-20">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, hsl(${astra.color} / ${inView ? 0.08 : 0}) 0%, transparent 60%)`,
        }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl mx-auto px-6">
        {/* Mandala */}
        <div className="relative flex-shrink-0">
          <svg viewBox="0 0 400 400" className="w-[70vw] md:w-[40vw] lg:w-[35vw] max-w-[500px] h-auto overflow-visible">
            {rings}
            {petals}
            {rays}
            <motion.circle
              cx={cx} cy={cy} r={8}
              fill={`hsl(${astra.color})`}
              initial={{ scale: 0 }}
              animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            />
          </svg>

          {/* Pulsing glow behind SVG */}
          {inView && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, hsl(${astra.color} / 0.15), transparent 55%)`,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          )}
        </div>

        {/* Info */}
        <motion.div
          className="text-center lg:text-left max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="font-devanagari text-2xl md:text-3xl text-kuru-gold/50 block mb-2">
            {astra.sanskrit}
          </span>
          <h3 className="font-display text-3xl md:text-4xl tracking-[0.08em] text-kuru-conch">
            {astra.name}
          </h3>
          <p className="font-display text-sm tracking-[0.2em] uppercase text-kuru-gold/50 mt-2">
            Deity: {astra.deity}
          </p>
          <p className="font-body text-base md:text-lg text-kuru-conch/70 mt-4 leading-relaxed">
            {astra.effect}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Main Gallery ── */
export const AstraGallery = () => (
  <section id="kuru-astras" className="relative bg-kuru-indigo overflow-hidden">
    {/* Section header */}
    <div className="relative z-10 text-center pt-24 pb-8 px-6">
      <p className="kuru-chip inline-flex border-kuru-conch/20 text-kuru-conch/70 mb-4">
        Dhanurveda
      </p>
      <h2 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-kuru-conch">
        The Celestial Arsenal
      </h2>
      <p className="font-body text-base md:text-lg text-kuru-conch/50 mt-4 max-w-2xl mx-auto leading-relaxed">
        The most potent weapons were the Astras — celestial missiles invoked through mantras, each bound to a deity. Their usage against ordinary soldiers was forbidden under the rules of Dharma Yuddha.
      </p>
    </div>

    {/* Each astra as a full-viewport slide */}
    {ASTRAS.map((astra, i) => (
      <AstraSlide key={astra.name} astra={astra} index={i} />
    ))}
  </section>
);
