import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CANON_RINGS } from '@/components/visuals/shaktiPeethData';

export const CanonWheelSection = () => {
  const [activeCount, setActiveCount] = useState<number>(CANON_RINGS[3].count);
  const active = CANON_RINGS.find((ring) => ring.count === activeCount) ?? CANON_RINGS[3];

  return (
    <section
      id="shakti-canon"
      className="relative px-6 py-24 md:py-32"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, hsl(var(--shakti-vermilion) / 0.06), transparent 50%), hsl(var(--shakti-vellum))`,
      }}
    >
      {/* Header — centered */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="shakti-chip-light mb-4 inline-flex">Canon is layered, not singular</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-shakti-dark-ink md:text-6xl">The list grows like a ritual diagram</h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-shakti-dark-ink/60 md:text-xl">
          The peethas were never fixed once and for all. They expanded as local goddesses, tantric regions, and textual traditions were absorbed into one sacred body-map.
        </p>
      </motion.div>

      {/* Concentric rings SVG — full-width centerpiece */}
      <div className="mx-auto mb-16 max-w-[36rem]">
        <svg viewBox="0 0 520 520" className="mx-auto w-full">
          {CANON_RINGS.map((ring, index) => {
            const radius = 58 + index * 42;
            const activeRing = active.count === ring.count;
            return (
              <g key={ring.count} onMouseEnter={() => setActiveCount(ring.count)} onClick={() => setActiveCount(ring.count)} className="cursor-pointer">
                <motion.circle
                  cx="260"
                  cy="260"
                  r={radius}
                  fill={activeRing ? 'hsl(var(--shakti-vermilion) / 0.12)' : 'transparent'}
                  stroke={activeRing ? 'hsl(var(--shakti-vermilion))' : 'hsl(var(--shakti-warm-border) / 0.5)'}
                  strokeWidth={activeRing ? 3 : 1.5}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />
                <text x="260" y={260 - radius + 18} textAnchor="middle" fill={activeRing ? 'hsl(var(--shakti-vermilion))' : 'hsl(var(--shakti-dark-ink) / 0.4)'} fontSize="14" style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>
                  {ring.count}
                </text>
              </g>
            );
          })}
          <circle cx="260" cy="260" r="34" fill="hsl(var(--shakti-vermilion) / 0.1)" stroke="hsl(var(--shakti-vermilion))" strokeWidth="2.5" />
          <text x="260" y="250" textAnchor="middle" fill="hsl(var(--shakti-vermilion))" fontSize="12" style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>
            Canon
          </text>
          <text x="260" y="273" textAnchor="middle" fill="hsl(var(--shakti-dark-ink))" fontSize="30" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            {active.count}
          </text>
        </svg>
      </div>

      {/* Canon descriptions — flowing list with dividers */}
      <div className="mx-auto max-w-2xl">
        {CANON_RINGS.map((ring, index) => {
          const isActive = active.count === ring.count;
          return (
            <motion.button
              key={ring.count}
              onMouseEnter={() => setActiveCount(ring.count)}
              onClick={() => setActiveCount(ring.count)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`block w-full border-b border-shakti-warm-border/30 py-6 text-left transition-colors duration-300 ${isActive ? 'border-shakti-vermilion/30' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className={`font-display text-4xl transition-colors ${isActive ? 'text-shakti-vermilion' : 'text-shakti-dark-ink/30'}`}>{ring.count}</span>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shakti-dark-ink/50">{ring.label}</p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-shakti-vermilion/60">
                  {ring.texts[0]}
                </span>
              </div>
              <p className="mt-3 font-body text-lg leading-relaxed text-shakti-dark-ink/70">{ring.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ring.texts.map((text) => (
                  <span key={text} className="rounded-full bg-shakti-vermilion/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-dark-ink/60">
                    {text}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
