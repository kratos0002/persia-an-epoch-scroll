import React from 'react';
import { motion } from 'framer-motion';
import { BENGAL_CLUSTER } from '@/components/visuals/shaktiPeethData';

export const BengalBloomSection = () => {
  return (
    <section
      id="shakti-bengal"
      className="relative"
      style={{ background: 'hsl(var(--shakti-night))' }}
    >
      <div className="lg:flex lg:min-h-screen">
        {/* Left — scrollable text */}
        <div className="w-full px-6 py-16 lg:w-[50%] lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="shakti-chip mb-4 inline-flex">Why the east dominates</p>
            <h2 className="shakti-title text-3xl md:text-5xl">Bengal blooms into a devotional density field</h2>
            <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-shakti-ink/70">
              No part of the map is more crowded than Bengal. The later peetha canons are not evenly distributed — they flower in the east as local goddess shrines are woven into a single tantric geography.
            </p>
          </motion.div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 border-l-2 border-shakti-gold/30 pl-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-shakti-gold/72">What this shows</p>
            <p className="mt-3 font-body text-xl leading-relaxed text-shakti-ink/78">
              Bengal is not just one region among many; it is the place where the network becomes saturated, local, and politically consequential.
            </p>
          </motion.div>

          {/* Site list */}
          <div className="mt-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-shakti-ink/40">{BENGAL_CLUSTER.length} sites in the cluster</p>
            {BENGAL_CLUSTER.map((site, index) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="border-b border-shakti-line/10 py-3"
              >
                <span className="font-display text-xl text-shakti-ink">{site.name}</span>
                <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-shakti-ink/45">{site.bodyPart}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — sticky radial burst SVG */}
        <div
          className="relative flex w-full items-center justify-center p-6 lg:sticky lg:top-0 lg:h-screen lg:w-[50%]"
          style={{ background: `radial-gradient(circle at 50% 50%, hsl(var(--shakti-vermilion) / 0.12), transparent 50%)` }}
        >
          <svg viewBox="0 0 760 620" className="h-auto w-full max-w-[36rem]">
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
                  <motion.circle
                    cx={x} cy={y}
                    r={index % 3 === 0 ? 13 : 10}
                    fill="hsl(var(--shakti-vermilion) / 0.22)"
                    stroke="hsl(var(--shakti-gold) / 0.8)"
                    strokeWidth="2"
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.03 }}
                  />
                  <text x={x} y={y + 30} textAnchor="middle" fill="hsl(var(--shakti-ink) / 0.78)" fontSize="14" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {site.name}
                  </text>
                </g>
              );
            })}
            <circle cx="380" cy="310" r="48" fill="hsl(var(--shakti-gold) / 0.16)" stroke="hsl(var(--shakti-gold))" strokeWidth="2.5" />
            <text x="380" y="304" textAnchor="middle" fill="hsl(var(--shakti-gold))" fontSize="12" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>Bengal</text>
            <text x="380" y="330" textAnchor="middle" fill="hsl(var(--shakti-ink))" fontSize="28" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{BENGAL_CLUSTER.length}</text>
          </svg>
        </div>
      </div>
    </section>
  );
};
