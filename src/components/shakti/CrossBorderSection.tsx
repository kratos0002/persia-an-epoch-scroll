import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CROSS_BORDER_SITES } from '@/components/visuals/shaktiPeethData';
import { geometryToPath, projectPoint, SOUTH_ASIA_COUNTRIES, SOUTH_ASIA_GEOJSON_URL } from './shaktiGeo';

const WIDTH = 760;
const HEIGHT = 540;

export const CrossBorderSection = () => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetch(SOUTH_ASIA_GEOJSON_URL)
      .then((response) => response.json())
      .then((data) => setFeatures((data.features || []).filter((feature: any) => SOUTH_ASIA_COUNTRIES.includes(feature?.properties?.ADMIN))))
      .catch(() => setFeatures([]));
  }, []);

  return (
    <section
      id="shakti-cross-border"
      className="relative px-6 py-20 md:py-28"
      style={{
        background: `linear-gradient(180deg, hsl(var(--shakti-vellum)), hsl(35 30% 85%))`,
      }}
    >
      {/* Header — centered */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="shakti-chip-light mb-4 inline-flex">The sacred map predates the nation-state</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-shakti-dark-ink md:text-6xl">Borders arrive late — the shrine field does not</h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-shakti-dark-ink/60 md:text-xl">
          The peethas cut across Pakistan, Bangladesh, Nepal, Tibet, and Sri Lanka. Modern states sever mobility, but not memory.
        </p>
      </motion.div>

      {/* Full-width map — slightly darker bg for contrast */}
      <div className="mx-auto max-w-6xl rounded-2xl bg-shakti-dark-ink/[0.06] p-4">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
          {features.map((feature, index) => (
            <path
              key={feature.properties?.ADM0_A3 ?? index}
              d={geometryToPath(feature.geometry, WIDTH, HEIGHT)}
              fill="hsl(35 25% 78%)"
              stroke="hsl(var(--shakti-warm-border))"
              strokeWidth="1.5"
            />
          ))}
          {features.map((feature, index) => (
            <motion.path
              key={`border-${feature.properties?.ADM0_A3 ?? index}`}
              d={geometryToPath(feature.geometry, WIDTH, HEIGHT)}
              fill="none"
              stroke="hsl(var(--shakti-vermilion) / 0.75)"
              strokeWidth="2"
              strokeDasharray="8 10"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 0.9, pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, delay: 0.2 + index * 0.15 }}
            />
          ))}

          {CROSS_BORDER_SITES.map((site, index) => {
            const { x, y } = projectPoint(site.coords[0], site.coords[1], WIDTH, HEIGHT);
            return (
              <g key={site.id}>
                <motion.circle cx={x} cy={y} r="10" fill="hsl(var(--shakti-vermilion) / 0.16)" stroke="hsl(var(--shakti-vermilion))" strokeWidth="2" initial={{ scale: 0.3, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: 0.5 + index * 0.04 }} />
                <circle cx={x} cy={y} r="4.5" fill="hsl(var(--shakti-vermilion))" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Centered stat */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto mt-12 max-w-2xl text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-shakti-vermilion/72">Cross-border total</p>
        <p className="mt-2 font-display text-7xl text-shakti-dark-ink">{CROSS_BORDER_SITES.length}</p>
        <p className="mx-auto mt-4 max-w-lg font-body text-lg leading-relaxed text-shakti-dark-ink/65">
          These sites make the peetha network feel like a civilizational map older than Partition, LoC regimes, or passport control.
        </p>
      </motion.div>

      {/* Site grid */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CROSS_BORDER_SITES.slice(0, 8).map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-xl border border-shakti-warm-border/30 bg-white/40 p-4"
          >
            <p className="font-display text-xl text-shakti-dark-ink">{site.name}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-dark-ink/40">{site.country}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-shakti-dark-ink/60">{site.currentSignificance}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
