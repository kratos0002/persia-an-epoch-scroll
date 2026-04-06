import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UPCOMING_EPOCHS = [
  {
    year: '1971',
    title: 'The Birth of Bangladesh',
    subtitle: 'When the line broke itself',
    description: 'The Bengal partition\'s unfinished business. Linguistic unity vs. religious geography — resolved by war.',
  },
  {
    year: '1893',
    title: 'The Durand Line',
    subtitle: 'The line no one agreed to',
    description: 'A colonial boundary through Pashtun lands. Afghanistan has never recognized it. Pakistan enforces it.',
  },
  {
    year: '1975',
    title: 'Sikkim\'s Merger',
    subtitle: 'When a border absorbed',
    description: 'A Himalayan kingdom voted itself into India. Integration, not partition — the counterpoint.',
  },
];

export const RadcliffeEpilogue = () => (
  <section className="relative overflow-hidden" style={{ background: 'hsl(30 5% 8%)' }}>
    {/* The permanent scar */}
    <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-radcliffe-red/60" />

    {/* Torn paper edges */}
    <div className="absolute left-0 top-0 h-full w-[calc(50%-20px)]" style={{ background: 'hsl(38 30% 85% / 0.03)' }} />
    <div className="absolute right-0 top-0 h-full w-[calc(50%-20px)]" style={{ background: 'hsl(38 30% 85% / 0.03)' }} />

    {/* Main epilogue */}
    <div className="relative z-40 min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-radcliffe-cream/80 uppercase tracking-[0.12em] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          The Persistence of the Line
        </motion.h2>

        <motion.div
          className="w-[1px] h-24 bg-radcliffe-red/40 mx-auto mb-8"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="space-y-2 font-survey text-[0.7rem] text-radcliffe-cream/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <p>India-Pakistan border: 3,323 km</p>
          <p>India-Bangladesh border: 4,096 km</p>
          <p>Combined population of border states: ~600 million</p>
        </motion.div>

        <motion.p
          className="mt-12 font-body italic text-radcliffe-cream/50 max-w-md mx-auto text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          viewport={{ once: true }}
        >
          The Radcliffe Line did not just divide two nations; it inaugurated a permanent state of border tension. The "sloppy surgery" of 1947 remains a living reality.
        </motion.p>
      </div>
    </div>

    {/* Next Epochs */}
    <div className="relative z-40 pb-24 pt-12 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="font-survey text-[0.55rem] text-radcliffe-cream/40 uppercase tracking-[0.3em] text-center mb-10">
          Next Epochs
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {UPCOMING_EPOCHS.map((epoch, i) => (
            <motion.div
              key={epoch.year}
              className="border border-radcliffe-cream/15 p-6 group hover:border-radcliffe-cream/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="font-survey text-[0.6rem] text-radcliffe-red/70 uppercase tracking-[0.3em] mb-3">
                {epoch.year}
              </p>
              <h3 className="font-display text-lg font-bold text-radcliffe-cream/80 mb-1 group-hover:text-radcliffe-cream/90 transition-colors duration-500">
                {epoch.title}
              </h3>
              <p className="font-body italic text-[0.7rem] text-radcliffe-cream/50 mb-3">
                {epoch.subtitle}
              </p>
              <p className="font-survey text-[0.65rem] text-radcliffe-cream/55 leading-relaxed">
                {epoch.description}
              </p>
              <p className="font-survey text-[0.5rem] text-radcliffe-cream/35 uppercase tracking-[0.3em] mt-4">
                Coming soon
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sources link */}
        <div className="mt-16 text-center">
          <Link
            to="/sources#radcliffe-line"
            className="inline-block font-survey text-[0.6rem] text-radcliffe-cream/40 uppercase tracking-[0.25em] hover:text-radcliffe-cream/60 transition-colors duration-300"
          >
            Sources and further reading →
          </Link>
        </div>

        {/* Site attribution */}
        <div className="mt-8 text-center">
          <p className="font-survey text-[0.5rem] text-radcliffe-cream/30 uppercase tracking-[0.4em]">
            Epoch Lives
          </p>
          <p className="font-body italic text-[0.6rem] text-radcliffe-cream/25 mt-1">
            Turning points in history, felt
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);
