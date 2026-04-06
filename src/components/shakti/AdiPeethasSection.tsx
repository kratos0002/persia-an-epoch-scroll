import React from 'react';
import { motion } from 'framer-motion';
import { ADI_PEETHAS } from '@/components/visuals/shaktiPeethData';

const positions = [
  { left: '50%', top: '10%' },
  { left: '84%', top: '48%' },
  { left: '50%', top: '84%' },
  { left: '16%', top: '48%' },
];

export const AdiPeethasSection = () => {
  return (
    <section
      id="shakti-adi"
      className="relative px-6 py-24 md:py-32"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, hsl(var(--shakti-gold) / 0.08), transparent 45%), hsl(var(--shakti-vellum))`,
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="shakti-chip-light mb-4 inline-flex">The directional frame</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-shakti-dark-ink md:text-6xl">Four primal seats hold the field in place</h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-shakti-dark-ink/60 md:text-xl">
            Before the canon blooms into dozens of sites, the tradition often begins with a compact fourfold diagram — east, west, north, south, power held at the edges.
          </p>
        </motion.div>

        {/* Compass visual — atmospheric, no panel */}
        <div className="relative mx-auto mb-20 aspect-square max-w-[32rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-[10%] rounded-full border border-shakti-warm-border/40" />
            <div className="absolute inset-[22%] rounded-full border border-shakti-vermilion/20" />
            <div className="absolute inset-[34%] rounded-full border border-shakti-vermilion/30" />
            <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-shakti-warm-border/30" />
            <div className="absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2 bg-shakti-warm-border/30" />
          </motion.div>

          {/* Cardinal peethas */}
          {ADI_PEETHAS.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={positions[index]}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-shakti-vermilion/30 bg-white/50 text-2xl text-shakti-vermilion shadow-[0_0_30px_hsl(var(--shakti-vermilion)/0.12)]">
                ✦
              </div>
              <p className="mt-3 font-display text-xl text-shakti-dark-ink">{site.name}</p>
              <p className="text-sm uppercase tracking-[0.18em] text-shakti-dark-ink/45">{site.country}</p>
            </motion.div>
          ))}

          {/* Center number */}
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-shakti-vermilion/25 bg-shakti-vermilion/10 font-display text-3xl text-shakti-vermilion">
            4
          </div>
        </div>

        {/* Peetha descriptions */}
        <div className="mx-auto max-w-2xl">
          {ADI_PEETHAS.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="border-b border-shakti-warm-border/30 py-7"
            >
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-3xl text-shakti-dark-ink">{site.name}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-vermilion/70">{site.country}</span>
              </div>
              <p className="mt-3 font-body text-lg leading-relaxed text-shakti-dark-ink/65">{site.currentSignificance}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
