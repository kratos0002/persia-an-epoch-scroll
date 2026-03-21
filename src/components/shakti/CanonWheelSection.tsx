import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CANON_RINGS } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

export const CanonWheelSection = () => {
  const [activeCount, setActiveCount] = useState<number>(CANON_RINGS[3].count);
  const active = CANON_RINGS.find((ring) => ring.count === activeCount) ?? CANON_RINGS[3];

  return (
    <ShaktiSectionShell
      id="shakti-canon"
      eyebrow="Canon is layered, not singular"
      title="The list grows like a ritual diagram"
      intro="The peethas were never fixed once and for all. They expanded as local goddesses, tantric regions, and textual traditions were absorbed into one sacred body-map."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="shakti-panel p-6 md:p-8">
          <svg viewBox="0 0 520 520" className="mx-auto w-full max-w-[30rem]">
            {CANON_RINGS.map((ring, index) => {
              const radius = 58 + index * 42;
              const activeRing = active.count === ring.count;
              return (
                <g key={ring.count} onMouseEnter={() => setActiveCount(ring.count)} onClick={() => setActiveCount(ring.count)} className="cursor-pointer">
                  <motion.circle
                    cx="260"
                    cy="260"
                    r={radius}
                    fill={activeRing ? 'hsl(var(--shakti-vermilion) / 0.2)' : 'transparent'}
                    stroke={activeRing ? 'hsl(var(--shakti-gold))' : 'hsl(var(--shakti-line) / 0.34)'}
                    strokeWidth={activeRing ? 3 : 2}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  />
                  <text x="260" y={260 - radius + 18} textAnchor="middle" fill={activeRing ? 'hsl(var(--shakti-gold))' : 'hsl(var(--shakti-ink) / 0.6)'} fontSize="14" style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>
                    {ring.count}
                  </text>
                </g>
              );
            })}
            <circle cx="260" cy="260" r="34" fill="hsl(var(--shakti-gold) / 0.12)" stroke="hsl(var(--shakti-gold))" strokeWidth="2.5" />
            <text x="260" y="250" textAnchor="middle" fill="hsl(var(--shakti-gold))" fontSize="12" style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>
              Canon
            </text>
            <text x="260" y="273" textAnchor="middle" fill="hsl(var(--shakti-ink))" fontSize="30" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              {active.count}
            </text>
          </svg>
        </div>

        <div className="grid gap-4">
          {CANON_RINGS.map((ring) => {
            const isActive = active.count === ring.count;
            return (
              <button
                key={ring.count}
                onMouseEnter={() => setActiveCount(ring.count)}
                onClick={() => setActiveCount(ring.count)}
                className={`shakti-panel p-5 text-left transition-all duration-300 ${isActive ? 'scale-[1.01] border-shakti-gold/35' : ''}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shakti-ink/56">{ring.label}</p>
                    <h3 className="mt-1 font-display text-3xl text-shakti-ink">{ring.count}</h3>
                  </div>
                  <span className="rounded-full border border-shakti-line/20 bg-shakti-night/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-shakti-gold/80">
                    {ring.texts[0]}
                  </span>
                </div>
                <p className="mt-3 font-body text-lg leading-relaxed text-shakti-ink/76">{ring.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ring.texts.map((text) => (
                    <span key={text} className="rounded-full bg-shakti-vermilion/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-ink/72">
                      {text}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ShaktiSectionShell>
  );
};