import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const DRAGON_RED = 'hsl(0, 70%, 45%)';
const URANIUM = 'hsl(45, 80%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const ChinaSection = () => {
  return (
    <section id="china" className="relative min-h-[120vh] py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: DRAGON_RED }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Five · October 16, 1964
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            The <span style={{ color: DRAGON_RED }}>Dragon</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The People's Republic of China
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Mao Zedong called nuclear weapons "paper tigers" — terrifying in appearance, impotent in practice. But he wanted his own paper tiger. In 1955, China launched a nuclear weapons program with Soviet help, importing advisors, reactor designs, and a model bomb. Then, in 1960, Khrushchev abruptly pulled out every Soviet advisor and took the blueprints with him. The Sino-Soviet split had turned nuclear.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              What followed was one of the most remarkable feats of scientific determination in the twentieth century. China built the bomb during the Great Leap Forward — a period of mass famine that killed between 15 and 55 million people. While peasants starved, thousands of scientists and engineers worked at Lop Nur, a dried lake bed in the Xinjiang desert, to produce enriched uranium from scratch.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The program was designated "Project 596" — named for June 1959, the month the Soviets reneged. It became a badge of defiance. China would prove it needed no one.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On October 16, 1964, China detonated a 22-kiloton uranium device at Lop Nur. It was the fifth nation to test a nuclear weapon. Just 32 months later, China tested a thermonuclear (hydrogen) bomb — the fastest progression from fission to fusion of any nuclear state.
            </p>
          </RevealOnScroll>

          {/* Fission to fusion timeline */}
          <RevealOnScroll>
            <div className="my-16 px-6 py-8 rounded-lg" style={{ background: 'hsl(0, 20%, 10%)', border: '1px solid hsl(0, 20%, 18%)' }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: DRAGON_RED }}>
                Time from first fission to first fusion test
              </p>
              <div className="space-y-3">
                {[
                  { nation: 'USA', months: 86, label: '7 years 2 months' },
                  { nation: 'USSR', months: 47, label: '3 years 11 months' },
                  { nation: 'UK', months: 54, label: '4 years 6 months' },
                  { nation: 'China', months: 32, label: '2 years 8 months' },
                ].map((item, i) => (
                  <div key={item.nation} className="flex items-center gap-3">
                    <span className="text-xs font-body w-16 text-right shrink-0" style={{ color: STEEL }}>{item.nation}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'hsl(0, 15%, 15%)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: item.nation === 'China' ? DRAGON_RED : 'hsl(200, 10%, 35%)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.months / 86) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                      />
                    </div>
                    <span className="text-xs font-body w-32 shrink-0" style={{ color: item.nation === 'China' ? DRAGON_RED : STEEL }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
            >
              "We will have the atom bomb even if we have to pawn our trousers for it."
            </motion.blockquote>
            <p className="text-center text-xs font-body mb-6" style={{ color: STEEL }}>
              — attributed to Mao Zedong, widely quoted
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
