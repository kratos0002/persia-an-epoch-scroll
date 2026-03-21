import React from 'react';
import { motion } from 'framer-motion';
import { LOST_AND_DISPUTED_SITES } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

export const LostSitesSection = () => {
  return (
    <ShaktiSectionShell
      id="shakti-lost"
      eyebrow="Uncertain sanctuaries"
      title="Some peethas survive as argument, ruin, or ritual substitution"
      intro="The network is not neat. A few sites are inaccessible, relocated in memory, or claimed by multiple landscapes at once — which is exactly why the essay should visualize them as ghosts rather than pin-drops."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {LOST_AND_DISPUTED_SITES.map((site, index) => (
          <motion.article
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-shakti-line/15 bg-[linear-gradient(180deg,hsl(var(--shakti-panel)/0.92),hsl(var(--shakti-night)/0.86))] p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--shakti-vermilion)/0.12),transparent_35%)]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-gold/72">{site.status === 'ruins' ? 'Ruined' : 'Disputed'}</p>
              <h3 className="mt-2 font-display text-4xl text-shakti-ink">{site.name}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-shakti-ink/48">{site.country} · {site.bodyPart}</p>
              <p className="mt-4 font-body text-lg leading-relaxed text-shakti-ink/76">{site.currentSignificance}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </ShaktiSectionShell>
  );
};