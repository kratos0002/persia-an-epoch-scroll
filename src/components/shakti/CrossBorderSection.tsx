import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CROSS_BORDER_SITES } from '@/components/visuals/shaktiPeethData';
import { geometryToPath, projectPoint, SOUTH_ASIA_COUNTRIES, SOUTH_ASIA_GEOJSON_URL } from './shaktiGeo';
import { ShaktiSectionShell } from './ShaktiSectionShell';

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
    <ShaktiSectionShell
      id="shakti-cross-border"
      eyebrow="The sacred map predates the nation-state"
      title="Borders arrive late — the shrine field does not"
      intro="The peethas cut across Pakistan, Bangladesh, Nepal, Tibet, and Sri Lanka. Modern states sever mobility, but not memory."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="shakti-panel overflow-hidden p-4 md:p-6">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
            {features.map((feature, index) => (
              <path
                key={feature.properties?.ADM0_A3 ?? index}
                d={geometryToPath(feature.geometry, WIDTH, HEIGHT)}
                fill="hsl(var(--shakti-ash) / 0.72)"
                stroke="hsl(var(--shakti-line) / 0.18)"
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
                transition={{ duration: 1.1, delay: 0.2 }}
              />
            ))}

            {CROSS_BORDER_SITES.map((site, index) => {
              const { x, y } = projectPoint(site.coords[0], site.coords[1], WIDTH, HEIGHT);
              return (
                <g key={site.id}>
                  <motion.circle cx={x} cy={y} r="10" fill="hsl(var(--shakti-gold) / 0.16)" stroke="hsl(var(--shakti-gold))" strokeWidth="2" initial={{ scale: 0.3, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: index * 0.04 }} />
                  <circle cx={x} cy={y} r="4.5" fill="hsl(var(--shakti-gold))" />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid gap-4">
          <div className="shakti-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shakti-gold/72">Cross-border total</p>
            <p className="mt-3 font-display text-6xl text-shakti-ink">{CROSS_BORDER_SITES.length}</p>
            <p className="mt-3 font-body text-lg leading-relaxed text-shakti-ink/76">These sites make the peetha network feel like a civilizational map older than Partition, LoC regimes, or passport control.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CROSS_BORDER_SITES.slice(0, 8).map((site) => (
              <div key={site.id} className="rounded-[1.4rem] border border-shakti-line/15 bg-shakti-panel/70 p-4">
                <p className="font-display text-2xl text-shakti-ink">{site.name}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-ink/52">{site.country}</p>
                <p className="mt-2 font-body text-base leading-relaxed text-shakti-ink/74">{site.currentSignificance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShaktiSectionShell>
  );
};