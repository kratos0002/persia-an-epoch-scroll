import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';

// Seeded pseudo-random from coords for deterministic organic scatter
function seededPosition(lng: number, lat: number, index: number) {
  const seed = (lng * 73.1 + lat * 37.7 + index * 11.3) % 1;
  const seed2 = (lng * 41.3 + lat * 97.1 + index * 23.7) % 1;
  return {
    left: `${10 + seed * 80}%`,
    top: `${8 + seed2 * 84}%`,
    delay: (seed + seed2) * 0.6,
  };
}

export const ShaktiEpilogue = () => {
  const dotPositions = useMemo(
    () => SHAKTI_PEETHS.map((site, i) => seededPosition(site.coords[0], site.coords[1], i)),
    [],
  );

  return (
    <section
      id="shakti-epilogue"
      className="relative overflow-hidden px-6 py-32 md:py-40"
      style={{
        background: `radial-gradient(circle at 50% 35%, hsl(var(--shakti-vermilion) / 0.15), transparent 25%), radial-gradient(circle at 50% 100%, hsl(var(--shakti-plum) / 0.2), transparent 50%), hsl(var(--shakti-night))`,
      }}
    >
      {/* Text — full-bleed, no card wrapper */}
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="shakti-chip inline-flex"
        >
          Epilogue
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="shakti-title mt-6 text-4xl md:text-6xl"
        >
          The motherland reassembles as sacred field
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl font-body text-xl leading-relaxed text-shakti-ink/78"
        >
          In the end the peethas are not just shrines, nor just a mythic body scattered across the ground. They are a way of seeing the subcontinent itself as charged, connected, and still alive.
        </motion.p>
      </div>

      {/* Organic dot scatter — seeded random positions */}
      <div className="relative mx-auto mt-16 h-48 max-w-4xl md:h-64">
        {SHAKTI_PEETHS.map((site, index) => {
          const pos = dotPositions[index];
          return (
            <motion.span
              key={site.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: pos.delay }}
              className="absolute h-3 w-3 rounded-full bg-shakti-vermilion shadow-[0_0_18px_hsl(var(--shakti-vermilion)/0.4)]"
              style={{ left: pos.left, top: pos.top }}
            />
          );
        })}
      </div>
    </section>
  );
};
