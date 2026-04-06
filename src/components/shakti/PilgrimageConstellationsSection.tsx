import React from 'react';
import { motion } from 'framer-motion';
import { PILGRIMAGE_CIRCUITS, SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';

const circuitColor: Record<string, string> = {
  gold: 'hsl(var(--shakti-gold))',
  vermilion: 'hsl(var(--shakti-vermilion))',
  lotus: 'hsl(var(--shakti-lotus))',
  line: 'hsl(var(--shakti-smoke))',
};

export const PilgrimageConstellationsSection = () => {
  return (
    <section
      id="shakti-pilgrimage"
      className="relative"
      style={{
        background: `linear-gradient(180deg, hsl(35 30% 85%), hsl(var(--shakti-vellum)))`,
      }}
    >
      <div className="lg:flex lg:min-h-screen">
        {/* Left — scrollable circuit descriptions */}
        <div className="w-full px-6 py-16 lg:w-[45%] lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="shakti-chip-light mb-4 inline-flex">No single mandated route</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-shakti-dark-ink md:text-5xl">Pilgrimage happens in constellations, not a straight line</h2>
            <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-shakti-dark-ink/60">
              Devotees usually encounter the peethas through clusters: a Himachal trail, a Bengal circuit, an eastern tantric arc, or impossible cross-border longing.
            </p>
          </motion.div>

          {/* Circuit descriptions as prose blocks */}
          <div className="mt-12">
            {PILGRIMAGE_CIRCUITS.map((circuit, index) => (
              <motion.div
                key={circuit.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border-b border-shakti-warm-border/30 py-7"
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: circuitColor[circuit.colorKey] }} />
                  <h3 className="font-display text-2xl text-shakti-dark-ink">{circuit.name}</h3>
                </div>
                <p className="mt-3 font-body text-lg leading-relaxed text-shakti-dark-ink/65">{circuit.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — sticky constellation SVG */}
        <div className="relative flex w-full items-center justify-center p-6 lg:sticky lg:top-0 lg:h-screen lg:w-[55%]">
          <svg viewBox="0 0 760 520" className="h-auto w-full max-w-[40rem]">
            {PILGRIMAGE_CIRCUITS.map((circuit, circuitIndex) => {
              const points = circuit.sites.map((id, index) => ({
                site: SHAKTI_PEETHS.find((site) => site.id === id),
                x: 110 + index * 120 + (circuitIndex % 2 === 0 ? 0 : 24),
                y: 100 + circuitIndex * 110 + (index % 2 === 0 ? 0 : 28),
              }));

              return (
                <g key={circuit.name}>
                  <motion.path
                    d={points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')}
                    fill="none"
                    stroke={circuitColor[circuit.colorKey]}
                    strokeWidth="3"
                    strokeDasharray="8 10"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: circuitIndex * 0.12 }}
                  />
                  {points.map((point, index) => (
                    <g key={`${circuit.name}-${point.site?.id ?? index}`}>
                      <circle cx={point.x} cy={point.y} r="10" fill={`${circuitColor[circuit.colorKey]}22`} stroke={circuitColor[circuit.colorKey]} strokeWidth="2" />
                      <text x={point.x} y={point.y - 18} textAnchor="middle" fill="hsl(var(--shakti-dark-ink) / 0.7)" fontSize="13" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {point.site?.name ?? 'Site'}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};
