import React from 'react';
import { motion } from 'framer-motion';
import { ADI_PEETHAS } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

const positions = [
  { left: '50%', top: '10%' },
  { left: '84%', top: '48%' },
  { left: '50%', top: '84%' },
  { left: '16%', top: '48%' },
];

export const AdiPeethasSection = () => {
  return (
    <ShaktiSectionShell
      id="shakti-adi"
      eyebrow="The directional frame"
      title="Four primal seats hold the field in place"
      intro="Before the canon blooms into dozens of sites, the tradition often begins with a compact fourfold diagram — east, west, north, south, power held at the edges."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="shakti-panel relative aspect-square min-h-[22rem] overflow-hidden p-6">
          <div className="absolute inset-[10%] rounded-full border border-shakti-line/18" />
          <div className="absolute inset-[22%] rounded-full border border-shakti-gold/20" />
          <div className="absolute inset-[34%] rounded-full border border-shakti-vermilion/28" />
          <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-shakti-line/15" />
          <div className="absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2 bg-shakti-line/15" />
          <div className="absolute inset-0">
            {ADI_PEETHAS.map((site, index) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={positions[index]}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-shakti-gold/35 bg-shakti-night/55 text-2xl text-shakti-gold shadow-[0_0_30px_hsl(var(--shakti-gold)/0.18)]">✦</div>
                <p className="mt-3 font-display text-xl text-shakti-ink">{site.name}</p>
                <p className="text-sm uppercase tracking-[0.18em] text-shakti-ink/55">{site.country}</p>
              </motion.div>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-shakti-gold/30 bg-shakti-vermilion/18 font-display text-3xl text-shakti-gold">
            4
          </div>
        </div>

        <div className="grid gap-4">
          {ADI_PEETHAS.map((site) => (
            <div key={site.id} className="shakti-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-3xl text-shakti-ink">{site.name}</h3>
                <span className="rounded-full bg-shakti-gold/16 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-gold">{site.country}</span>
              </div>
              <p className="mt-3 font-body text-lg leading-relaxed text-shakti-ink/76">{site.currentSignificance}</p>
            </div>
          ))}
        </div>
      </div>
    </ShaktiSectionShell>
  );
};