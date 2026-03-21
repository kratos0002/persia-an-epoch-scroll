import React from 'react';
import { motion } from 'framer-motion';
import { BENGAL_CLUSTER } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

export const BengalBloomSection = () => {
  return (
    <ShaktiSectionShell
      id="shakti-bengal"
      eyebrow="Why the east dominates"
      title="Bengal blooms into a devotional density field"
      intro="No part of the map is more crowded than Bengal. The later peetha canons are not evenly distributed — they flower in the east as local goddess shrines are woven into a single tantric geography."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:items-center">
        <div className="shakti-panel relative aspect-[1.1/1] overflow-hidden p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--shakti-vermilion)/0.18),transparent_48%)]" />
          <svg viewBox="0 0 760 620" className="relative h-full w-full">
            {BENGAL_CLUSTER.map((site, index) => {
              const angle = (Math.PI * 2 * index) / BENGAL_CLUSTER.length;
              const ring = index % 2 === 0 ? 170 : 230;
              const x = 380 + Math.cos(angle) * ring;
              const y = 310 + Math.sin(angle) * ring * 0.62;
              return (
                <g key={site.id}>
                  <motion.path
                    d={`M 380 310 Q ${(380 + x) / 2} ${(230 + y) / 2} ${x} ${y}`}
                    fill="none"
                    stroke="hsl(var(--shakti-line) / 0.18)"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                  />
                  <motion.circle cx={x} cy={y} r={index % 3 === 0 ? 13 : 10} fill="hsl(var(--shakti-vermilion) / 0.22)" stroke="hsl(var(--shakti-gold) / 0.8)" strokeWidth="2" initial={{ scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: 0.15 + index * 0.03 }} />
                  <text x={x} y={y + 30} textAnchor="middle" fill="hsl(var(--shakti-ink) / 0.78)" fontSize="14" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{site.name}</text>
                </g>
              );
            })}
            <circle cx="380" cy="310" r="48" fill="hsl(var(--shakti-gold) / 0.16)" stroke="hsl(var(--shakti-gold))" strokeWidth="2.5" />
            <text x="380" y="304" textAnchor="middle" fill="hsl(var(--shakti-gold))" fontSize="12" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>Bengal</text>
            <text x="380" y="330" textAnchor="middle" fill="hsl(var(--shakti-ink))" fontSize="28" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{BENGAL_CLUSTER.length}</text>
          </svg>
        </div>
        <div className="grid gap-4">
          <div className="shakti-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shakti-gold/72">What this shows</p>
            <p className="mt-3 font-body text-xl leading-relaxed text-shakti-ink/78">
              Bengal is not just one region among many; it is the place where the network becomes saturated, local, and politically consequential.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {BENGAL_CLUSTER.slice(0, 8).map((site) => (
              <div key={site.id} className="rounded-[1.4rem] border border-shakti-line/15 bg-shakti-panel/70 p-4">
                <p className="font-display text-2xl text-shakti-ink">{site.name}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-ink/52">{site.bodyPart}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShaktiSectionShell>
  );
};