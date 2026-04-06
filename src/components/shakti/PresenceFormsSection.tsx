import React from 'react';
import { motion } from 'framer-motion';
import { PRESENCE_FORMS } from '@/components/visuals/shaktiPeethData';

const GLYPH: Record<string, string> = {
  flame: '✺',
  spring: '◉',
  cave: '◒',
  stone: '△',
  yantra: '⌘',
};

const GRID_CLASSES = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-1 md:col-start-2',
];

const ENTRY_VARIANTS = [
  { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
];

export const PresenceFormsSection = () => {
  return (
    <section
      id="shakti-presence"
      className="relative px-6 py-24 md:py-32"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, hsl(var(--shakti-vermilion) / 0.06), transparent 50%), hsl(var(--shakti-vellum))`,
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
        <p className="shakti-chip-light mb-4 inline-flex">Presence without form</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-shakti-dark-ink md:text-6xl">The goddess is not always an idol</h2>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-shakti-dark-ink/60 md:text-xl">
          Some of the strongest peethas are experienced as fissure, flame, cave, spring, yantra, or ruin. The earth itself becomes the image.
        </p>
      </motion.div>

      {/* Asymmetric editorial grid */}
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {PRESENCE_FORMS.map((form, index) => (
          <motion.article
            key={form.key}
            {...ENTRY_VARIANTS[index % ENTRY_VARIANTS.length]}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`border-l-2 border-shakti-vermilion/25 pl-6 ${GRID_CLASSES[index] ?? ''}`}
          >
            <span className="text-5xl leading-none text-shakti-vermilion/30">
              {GLYPH[form.key] ?? '✺'}
            </span>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-dark-ink/40">{form.site}</p>
            <h3 className="mt-2 font-display text-3xl text-shakti-dark-ink">{form.title}</h3>
            <p className="mt-3 font-body text-lg leading-relaxed text-shakti-dark-ink/65">{form.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
