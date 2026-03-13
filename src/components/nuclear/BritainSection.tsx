import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EmpireFade } from '@/components/visuals/EmpireFade';

const BUNKER = 'hsl(200, 25%, 6%)';
const NAVY = 'hsl(210, 50%, 40%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const BritainSection = () => {
  return (
    <section id="britain" className="relative min-h-[120vh] py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: NAVY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Three · October 3, 1952
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Empire's <span style={{ color: NAVY }}>Last Card</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The United Kingdom
          </motion.p>
        </div>

        {/* Empire Fade Visual */}
        <EmpireFade />

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Britain had been there from the beginning. British physicists — James Chadwick, who discovered the neutron; Rudolf Peierls and Otto Frisch, who calculated the critical mass — had done foundational work before the Americans even started. Under the wartime Quebec Agreement, Britain contributed scientists to the Manhattan Project as a full partner.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Then, in 1946, the United States passed the McMahon Act, abruptly cutting off all nuclear cooperation with foreign nations — including Britain. Churchill was furious. The country that had helped invent the bomb was now locked out of its own creation.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Foreign Secretary Ernest Bevin settled the matter in a single sentence at a 1947 Cabinet meeting: <em className="italic" style={{ color: LIGHT }}>"We've got to have this thing over here, whatever it costs. We've got to have a bloody Union Jack on top of it."</em>
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The program, codenamed "High Explosive Research," was run on a fraction of the American budget. William Penney, a mathematician who had witnessed the Nagasaki bombing as a British observer, led the weapons design. He worked from memory, notes, and sheer intellect.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On October 3, 1952, Britain detonated "Hurricane" — a 25-kiloton plutonium device — inside the hull of a frigate anchored off the Monte Bello Islands in Western Australia. The ship vaporized. Britain was the third nuclear power.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The empire was crumbling — India had gone, Palestine had gone, Suez would go. But the bomb gave Britain a permanent seat at the table. The logic was cold and clear: in a world of superpowers, nuclear weapons were the price of relevance.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
