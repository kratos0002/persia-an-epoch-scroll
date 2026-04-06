import React from 'react';
import { motion } from 'framer-motion';
import { LOST_AND_DISPUTED_SITES } from '@/components/visuals/shaktiPeethData';

export const LostSitesSection = () => {
  return (
    <section
      id="shakti-lost"
      className="relative px-6 py-24 md:py-32"
      style={{
        background: `linear-gradient(180deg, hsl(15 20% 6%), hsl(var(--shakti-night)))`,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 max-w-3xl"
      >
        <p className="shakti-chip mb-4 inline-flex">Uncertain sanctuaries</p>
        <h2 className="shakti-title text-4xl md:text-6xl">Some peethas survive as argument, ruin, or ritual substitution</h2>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-shakti-ink/70 md:text-xl">
          The network is not neat. A few sites are inaccessible, relocated in memory, or claimed by multiple landscapes at once — which is exactly why the essay should visualize them as ghosts rather than pin-drops.
        </p>
      </motion.div>

      {/* Ghost cards */}
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {LOST_AND_DISPUTED_SITES.map((site, index) => (
          <motion.article
            key={site.id}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative opacity-70 transition-opacity duration-500 hover:opacity-100"
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, black 55%, transparent 100%)',
              maskImage: 'linear-gradient(180deg, black 55%, transparent 100%)',
              willChange: 'filter',
            }}
          >
            <div className="relative border border-shakti-line/8 bg-shakti-night/20 p-6">
              {/* Faint glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--shakti-vermilion)/0.08),transparent_40%)]" />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-gold/60">
                  {site.status === 'ruins' ? 'Ruined' : 'Disputed'}
                </p>
                <h3 className="mt-2 font-display text-3xl text-shakti-ink/80 transition-colors group-hover:text-shakti-ink">{site.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-shakti-ink/35">{site.country} · {site.bodyPart}</p>
                <p className="mt-4 font-body text-base leading-relaxed text-shakti-ink/60 transition-colors group-hover:text-shakti-ink/76">{site.currentSignificance}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
