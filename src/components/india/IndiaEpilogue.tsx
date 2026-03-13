import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EditionColophon } from '@/components/scroll/EditionColophon';

export const IndiaEpilogue: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="india-epilogue" ref={ref} className="relative min-h-screen py-24 px-6 flex items-center">
      <div className="max-w-4xl mx-auto">
        <div className="md:w-3/5 md:mx-auto">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md text-center"
            style={{ background: 'hsla(220, 22%, 7%, 0.75)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(40, 30%, 88%)' }}>
              No Map Is Final
            </h2>

            <p className="font-body text-lg mb-8" style={{ color: 'hsl(40, 20%, 60%)' }}>
              Every border on this map was negotiated, demanded, fought for, or imposed.
              Nations are not given — they are made, one line at a time.
            </p>

            <p className="font-display text-base italic mb-8 max-w-lg mx-auto" style={{ color: 'hsl(40, 20%, 55%)' }}>
              "India is not a nation but a continent — and its map is still being written."
            </p>

            <div className="border-t border-border/20 pt-6">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold transition-colors"
                style={{ color: 'hsl(40, 30%, 50%)' }}
              >
                ← Back to all essays
              </a>
            </div>
          </motion.div>

          <EditionColophon essayId="india-states" variant="dark" />
        </div>
      </div>
    </section>
  );
};
