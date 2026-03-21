import React from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';

export const ShaktiEpilogue = () => {
  return (
    <section id="shakti-epilogue" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--shakti-gold)/0.2),transparent_25%),radial-gradient(circle_at_50%_100%,hsl(var(--shakti-vermilion)/0.18),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-shakti-line/15 bg-[linear-gradient(180deg,hsl(var(--shakti-panel)/0.9),hsl(var(--shakti-night)/0.95))] px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="shakti-chip inline-flex">Epilogue</p>
          <h2 className="shakti-title mt-5 text-4xl md:text-6xl">The motherland reassembles as sacred field</h2>
          <p className="mx-auto mt-5 max-w-3xl font-body text-xl leading-relaxed text-shakti-ink/78">
            In the end the peethas are not just shrines, nor just a mythic body scattered across the ground. They are a way of seeing the subcontinent itself as charged, connected, and still alive.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {SHAKTI_PEETHS.map((site, index) => (
            <motion.span
              key={site.id}
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              className="h-3.5 w-3.5 rounded-full bg-shakti-gold shadow-[0_0_22px_hsl(var(--shakti-gold)/0.5)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};