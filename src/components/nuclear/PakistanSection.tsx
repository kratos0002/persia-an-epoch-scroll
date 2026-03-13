import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { ResponseClock } from '@/components/visuals/ResponseClock';

const BUNKER = 'hsl(200, 25%, 6%)';
const PAKISTAN_GREEN = 'hsl(150, 60%, 35%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const PakistanSection = () => {
  return (
    <section id="pakistan" className="relative min-h-[120vh] py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: PAKISTAN_GREEN }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Seven · May 28, 1998
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: PAKISTAN_GREEN }}>Chagai</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Pakistan
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Zulfikar Ali Bhutto, Pakistan's president, made the decision in 1972 — two years before India's first test. Pakistan had just lost East Bengal in a catastrophic war. Half the country was gone. Bhutto gathered his scientists at Multan and delivered the line that would define Pakistan's nuclear ambition for decades:
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
            >
              "We will eat grass, even go hungry, but we will get one of our own."
            </motion.blockquote>
            <p className="text-center text-xs font-body mb-12" style={{ color: STEEL }}>
              — Zulfikar Ali Bhutto, 1972
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The man who made it happen was Abdul Qadeer Khan, a metallurgist who had worked at the URENCO enrichment facility in the Netherlands. Khan stole centrifuge designs — the technology to enrich uranium — and brought them home to Pakistan in 1975. He built a parallel enrichment program at Kahuta, outside Islamabad, that the Pakistani government denied for years.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Western intelligence agencies knew. The Americans, British, and Dutch all had evidence of Khan's theft and Pakistan's program. They did remarkably little. Pakistan was a Cold War ally — essential for funneling arms to the Afghan mujahideen fighting the Soviets. Nonproliferation lost to geopolitics.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              When India tested five devices in May 1998, Pakistan responded in seventeen days. On May 28, 1998, Pakistan detonated five devices inside a granite mountain at Chagai, Balochistan. Two days later, it tested one more. The mountain turned white. Pakistan was nuclear.
            </p>
          </RevealOnScroll>
        </div>

        {/* Response Clock + Proliferation Network */}
        <ResponseClock />

        <div className="max-w-xl mx-auto">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              A.Q. Khan would later be revealed as the most dangerous nuclear proliferator in history — selling centrifuge designs, uranium enrichment technology, and even bomb blueprints to Libya, Iran, and North Korea through a vast black-market network. Pakistan's bomb had been built through theft; now that theft was being franchised.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
