import React from 'react';
import { motion } from 'framer-motion';
import { PRESENCE_FORMS } from '@/components/visuals/shaktiPeethData';
import { ShaktiSectionShell } from './ShaktiSectionShell';

export const PresenceFormsSection = () => {
  return (
    <ShaktiSectionShell
      id="shakti-presence"
      eyebrow="Presence without form"
      title="The goddess is not always an idol"
      intro="Some of the strongest peethas are experienced as fissure, flame, cave, spring, yantra, or ruin. The earth itself becomes the image."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {PRESENCE_FORMS.map((form, index) => (
          <motion.article
            key={form.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="shakti-panel p-5"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-shakti-gold/30 bg-shakti-night/30 text-3xl text-shakti-gold">
              {form.key === 'flame' ? '✺' : form.key === 'spring' ? '◉' : form.key === 'cave' ? '◒' : form.key === 'stone' ? '△' : '⌘'}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">{form.site}</p>
            <h3 className="mt-2 font-display text-3xl text-shakti-ink">{form.title}</h3>
            <p className="mt-3 font-body text-lg leading-relaxed text-shakti-ink/76">{form.description}</p>
          </motion.article>
        ))}
      </div>
    </ShaktiSectionShell>
  );
};