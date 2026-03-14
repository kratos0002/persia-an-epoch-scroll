import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const BRIT_RED = 'hsl(0, 60%, 40%)';
const OIL_BLACK = 'hsl(0, 0%, 12%)';

export const BritishGulfSection = () => {
  const trucialStates = [
    'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman',
    'Umm al-Quwain', "Ras al-Khaimah", 'Fujairah',
  ];

  return (
    <section id="british-gulf" className="relative min-h-screen py-32 px-6" style={{ background: NAVY }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: BRIT_RED }}>
            1820–1971 — Britain's Invisible Empire
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            They called it<br />
            <span style={{ color: BRIT_RED }}>"piracy suppression."</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In the early 1800s, Britain signed a series of "truces" with the sheikhdoms lining
            the Gulf coast — agreements to stop piracy in exchange for British naval protection.
            The local rulers called them treaties. London called them
            <strong style={{ color: PARCHMENT }}> the Trucial States</strong>.
          </p>
        </RevealOnScroll>

        {/* Trucial States visual */}
        <RevealOnScroll delay={0.5}>
          <div className="my-12 py-8 rounded-xl" style={{
            background: 'hsl(215, 40%, 6%)',
            border: '1px solid hsla(0, 60%, 40%, 0.15)',
          }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: SMOKE }}>
              The Seven Trucial States → The United Arab Emirates
            </p>
            <div className="flex flex-wrap justify-center gap-3 px-6">
              {trucialStates.map((state, i) => (
                <motion.div
                  key={state}
                  className="px-4 py-2 rounded-md text-sm font-body font-semibold"
                  style={{
                    background: 'hsla(0, 60%, 40%, 0.1)',
                    border: '1px solid hsla(0, 60%, 40%, 0.2)',
                    color: PARCHMENT,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {state}
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            For a century, the arrangement was about trade routes and telegraph cables.
            Then, in 1938, oil was discovered in Saudi Arabia. Then Bahrain. Then Kuwait. Then Abu Dhabi.
            The Gulf transformed from a shipping lane into the world's
            <strong style={{ color: AMBER }}> energy reserve</strong>.
          </p>
        </RevealOnScroll>

        {/* Oil discovery timeline */}
        <RevealOnScroll delay={0.7}>
          <div className="my-12 py-8 rounded-xl" style={{
            background: 'hsl(215, 40%, 6%)',
            border: '1px solid hsla(35, 80%, 50%, 0.1)',
          }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: SMOKE }}>
              Oil Discovered
            </p>
            <div className="flex flex-col gap-2 px-6 max-w-sm mx-auto">
              {[
                { year: 1932, place: 'Bahrain' },
                { year: 1938, place: 'Saudi Arabia' },
                { year: 1938, place: 'Kuwait' },
                { year: 1958, place: 'Abu Dhabi' },
                { year: 1969, place: 'Dubai' },
              ].map((d, i) => (
                <motion.div
                  key={d.place}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  <span className="font-display text-lg font-bold w-16" style={{ color: AMBER }}>{d.year}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: OIL_BLACK, border: `1px solid ${AMBER}` }} />
                  <span className="font-body text-sm" style={{ color: PARCHMENT }}>{d.place}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In 1971, Britain withdrew from east of Suez. The Trucial States became the
            <strong style={{ color: PARCHMENT }}> United Arab Emirates</strong>. But the strait remained the same
            21-mile bottleneck through which every tanker had to pass. Britain left the Gulf.
            The Gulf's importance didn't.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.9}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: BRIT_RED }}>
            "Britain didn't just guard the Gulf — it built the states that sit on either side."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
