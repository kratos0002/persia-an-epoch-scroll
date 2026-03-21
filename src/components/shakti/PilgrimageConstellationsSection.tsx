import React from 'react';
import { motion } from 'framer-motion';
import { PILGRIMAGE_CIRCUITS, SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

const circuitColor: Record<string, string> = {
  gold: 'hsl(var(--shakti-gold))',
  vermilion: 'hsl(var(--shakti-vermilion))',
  lotus: 'hsl(var(--shakti-lotus))',
  line: 'hsl(var(--shakti-line))',
};

export const PilgrimageConstellationsSection = () => {
  return (
    <ShaktiSectionShell
      id="shakti-pilgrimage"
      eyebrow="No single mandated route"
      title="Pilgrimage happens in constellations, not a straight line"
      intro="Devotees usually encounter the peethas through clusters: a Himachal trail, a Bengal circuit, an eastern tantric arc, or impossible cross-border longing."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="shakti-panel overflow-hidden p-6">
          <svg viewBox="0 0 760 520" className="w-full">
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
                      <text x={point.x} y={point.y - 18} textAnchor="middle" fill="hsl(var(--shakti-ink) / 0.8)" fontSize="13" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {point.site?.name ?? 'Site'}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid gap-4">
          {PILGRIMAGE_CIRCUITS.map((circuit) => (
            <div key={circuit.name} className="shakti-panel p-5">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: circuitColor[circuit.colorKey] }} />
                <h3 className="font-display text-3xl text-shakti-ink">{circuit.name}</h3>
              </div>
              <p className="mt-3 font-body text-lg leading-relaxed text-shakti-ink/76">{circuit.note}</p>
            </div>
          ))}
        </div>
      </div>
    </ShaktiSectionShell>
  );
};