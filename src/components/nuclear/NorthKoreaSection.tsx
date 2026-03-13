import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const HERMIT = 'hsl(0, 0%, 60%)';
const URANIUM = 'hsl(45, 80%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const NorthKoreaSection = () => {
  return (
    <section id="north-korea" className="relative min-h-[120vh] py-32 px-6" style={{ background: 'hsl(200, 22%, 7%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: HERMIT }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Eight · October 9, 2006
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            The Hermit's <span style={{ color: URANIUM }}>Bomb</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            North Korea
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              North Korea's nuclear program is the story of a dynasty's survival. Kim Il-sung started it in the 1960s with Soviet help. Kim Jong-il accelerated it in the 1990s as the country's economy collapsed. Kim Jong-un completed it, turning an impoverished state of 26 million into a nuclear power that can threaten the continental United States.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The path ran through plutonium first. North Korea built a graphite-moderated reactor at Yongbyon — a design chosen specifically because it doesn't require enriched uranium fuel but produces plutonium as a byproduct. A 1994 framework agreement with the United States temporarily froze the program. North Korea cheated. It also pursued uranium enrichment secretly, using centrifuge technology acquired through A.Q. Khan's network.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              In 2003, North Korea withdrew from the Nuclear Non-Proliferation Treaty — the first nation ever to do so. Three years later, on October 9, 2006, it conducted its first nuclear test. The yield was less than a kiloton — a partial fizzle by weapons standards. The world condemned it. North Korea tested again. And again.
            </p>
          </RevealOnScroll>

          {/* Test progression */}
          <RevealOnScroll>
            <div className="my-16 px-6 py-8 rounded-lg" style={{ background: 'hsl(200, 15%, 10%)', border: '1px solid hsl(200, 15%, 18%)' }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: HERMIT }}>
                North Korean nuclear tests — escalating yields
              </p>
              <div className="space-y-4">
                {[
                  { year: '2006', yield: '~1 kt', pct: 1 },
                  { year: '2009', yield: '~5 kt', pct: 3 },
                  { year: '2013', yield: '~10 kt', pct: 5 },
                  { year: '2016 (Jan)', yield: '~10 kt', pct: 5 },
                  { year: '2016 (Sep)', yield: '~25 kt', pct: 12 },
                  { year: '2017', yield: '~250 kt', pct: 100 },
                ].map((test, i) => (
                  <div key={test.year} className="flex items-center gap-3">
                    <span className="text-xs font-body w-24 text-right shrink-0" style={{ color: STEEL }}>{test.year}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'hsl(200, 10%, 15%)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${HERMIT}, ${URANIUM})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(item => item.pct, 2)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15 * i }}
                      />
                    </div>
                    <span className="text-xs font-body w-16 shrink-0" style={{ color: LIGHT }}>{test.yield}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The sixth and final test in September 2017 registered a magnitude-6.3 earthquake. Intelligence agencies estimated the yield at 250 kilotons — a thermonuclear weapon, roughly seventeen times Hiroshima. North Korea claimed it was a hydrogen bomb small enough to fit on a missile. No one could confirm the claim, but no one could dismiss it either.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The Kim dynasty's logic was always clear: Saddam Hussein didn't have nuclear weapons and was overthrown. Muammar Gaddafi gave up his nuclear program and was overthrown. The Kim family saw what happened to leaders who disarmed — and chose not to.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
