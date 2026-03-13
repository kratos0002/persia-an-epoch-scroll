import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
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
            <em className="italic" style={{ color: TRICOLOR }}>Force de Frappe</em>
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

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Charles de Gaulle did not trust alliances. He had watched France be invaded twice in his lifetime, and he had learned a hard lesson from the Americans and British during World War II: allies help you when it's convenient for them. True sovereignty, he concluded, required the ability to destroy any attacker — independently, without asking Washington's permission.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              France's nuclear program had begun quietly under the Fourth Republic, but de Gaulle turned it into a national obsession after returning to power in 1958. His argument was philosophical as much as strategic: <em className="italic" style={{ color: LIGHT }}>"No country without an atom bomb could properly consider itself independent."</em>
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On February 13, 1960, France detonated "Gerboise Bleue" — a 70-kiloton plutonium device — in the Sahara Desert of French Algeria. It was more than three times the yield of Hiroshima, and it was France's first test. The blue jerboa, a desert mouse native to the Sahara, gave the test its name.
            </p>
          </RevealOnScroll>

          {/* Yield comparison */}
          <RevealOnScroll>
            <div className="my-16 px-6 py-8 rounded-lg" style={{ background: 'hsl(220, 25%, 10%)', border: '1px solid hsl(220, 25%, 18%)' }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: TRICOLOR }}>
                First test yields compared
              </p>
              <div className="space-y-3">
                {[
                  { nation: 'USA (Trinity)', yield: 21, pct: 30 },
                  { nation: 'USSR (RDS-1)', yield: 22, pct: 31 },
                  { nation: 'UK (Hurricane)', yield: 25, pct: 36 },
                  { nation: 'France (Gerboise Bleue)', yield: 70, pct: 100 },
                ].map((item, i) => (
                  <div key={item.nation} className="flex items-center gap-3">
                    <span className="text-xs font-body w-44 text-right shrink-0" style={{ color: STEEL }}>{item.nation}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'hsl(220, 20%, 15%)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: TRICOLOR }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                      />
                    </div>
                    <span className="text-xs font-body w-12 shrink-0" style={{ color: LIGHT }}>{item.yield} kt</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              De Gaulle withdrew France from NATO's integrated military command in 1966, insisting that France's nuclear deterrent was France's alone — not a card to be played by American generals. The <em className="italic">Force de Frappe</em> remains the cornerstone of French defense to this day: submarines carrying ballistic missiles that can reach any capital on earth.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
            >
              "The deterrent is not to prevent war. It is to prevent the other side from believing they can wage one."
            </motion.blockquote>
            <p className="text-center text-xs font-body mb-6" style={{ color: STEEL }}>
              — Charles de Gaulle
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
