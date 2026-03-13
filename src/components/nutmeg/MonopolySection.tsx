import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const VOC_ORANGE = 'hsl(30, 85%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const BLOOD = 'hsl(0, 65%, 45%)';

export const MonopolySection = () => {
  return (
    <section id="dutch-monopoly" className="relative min-h-screen py-32 px-6" style={{ background: OCEAN }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: VOC_ORANGE }}>
            1621 — The Dutch Monopoly
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            The VOC wanted<br />
            <span style={{ color: BLOOD }}>total control.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In 1621, Governor-General Jan Pieterszoon Coen sailed to the Banda Islands
            with a fleet of warships and a plan. The Bandanese had been trading with the English.
            Coen's solution was annihilation.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
            In what became known as the <strong style={{ color: BLOOD }}>Banda Massacre</strong>,
            the VOC killed, enslaved, or deported almost the entire native population.
            Of approximately 15,000 Bandanese, barely 1,000 survived.
          </p>
        </RevealOnScroll>

        {/* Population counter */}
        <RevealOnScroll delay={0.6}>
          <div className="my-12 py-10 text-center rounded-xl" style={{
            background: 'hsl(210, 35%, 6%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6" style={{ color: SMOKE }}>
              Bandanese Population
            </p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-body mb-2" style={{ color: SMOKE }}>Before</p>
                <p className="font-display text-5xl font-black" style={{ color: PARCHMENT }}>
                  <AnimatedCounter target={15000} duration={2} />
                </p>
              </div>
              <motion.div
                className="font-display text-3xl"
                style={{ color: BLOOD }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                →
              </motion.div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-body mb-2" style={{ color: SMOKE }}>After</p>
                <motion.p
                  className="font-display text-5xl font-black"
                  style={{ color: BLOOD }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  ~1,000
                </motion.p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            The VOC then replaced them with Dutch planters and enslaved labourers,
            creating the world's first corporate plantation system. They controlled production,
            set prices, and burned entire warehouses of nutmeg to keep supply artificially low.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: SMOKE }}>
            For decades, the monopoly held. The VOC became the richest corporation in history —
            worth, in today's terms, roughly <strong style={{ color: VOC_ORANGE }}>$7.9 trillion</strong>.
            More than Apple, Amazon, and Google combined.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.9}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: VOC_ORANGE }}>
            "There was one island they couldn't take."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
