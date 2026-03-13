import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { YieldTowers } from '@/components/visuals/YieldTowers';

const TRICOLOR = 'hsl(220, 60%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const FranceSection = () => {
  return (
    <section id="france" className="relative min-h-[120vh] py-32 px-6" style={{ background: 'hsl(200, 22%, 7%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: TRICOLOR }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Four · February 13, 1960
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: TRICOLOR }}>Force de Frappe</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            France
          </motion.p>
        </div>

        {/* Yield Towers Visual */}
        <YieldTowers />

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Charles de Gaulle's logic was simple and brutal: France could not depend on America to risk New York for Paris. The American nuclear umbrella might protect Western Europe in theory, but no French president could stake the nation's survival on the assumption that an American president would trade Washington for a European war.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              France had actually started nuclear research during the war and had strong scientific foundations — Frédéric Joliot-Curie, the son-in-law of Marie Curie, had led early nuclear work. But the political will came from de Gaulle, who saw nuclear weapons as the ultimate guarantor of French sovereignty and greatness.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On February 13, 1960, France detonated "Gerboise Bleue" — a 70-kiloton plutonium device — in the Sahara Desert at Reggane, Algeria. It was more than three times the yield of Trinity. France had made its point: it would defend itself, by itself.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
            >
              "Within ten years, we shall have the means to kill 80 million Russians. I truly believe that one does not light-heartedly attack people who are able to kill 80 million Russians."
            </motion.blockquote>
            <p className="text-center text-xs font-body" style={{ color: STEEL }}>
              — Charles de Gaulle, 1964
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              De Gaulle then withdrew France from NATO's integrated military command — not from the alliance itself, but from the structure that would have placed French forces under American control. France would be an ally, not a subordinate. The <em className="italic" style={{ color: TRICOLOR }}>force de frappe</em> — the strike force — was the instrument of that independence.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
