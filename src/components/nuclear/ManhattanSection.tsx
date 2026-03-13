import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(45, 80%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const ManhattanSection = () => {
  return (
    <section id="manhattan" className="relative min-h-[120vh] py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: GEIGER }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation One · July 16, 1945
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: URANIUM }}>Trinity</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The United States
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              It started with a letter. In August 1939, Albert Einstein — a pacifist who had fled Nazi Germany — signed a letter to President Roosevelt warning that Germany might be building an atomic bomb. The physics was clear: splitting the uranium atom released energy on a scale never seen. If Hitler got there first, the war was over.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Roosevelt authorized what became the Manhattan Project — a $2 billion secret (over $30 billion today) spread across thirty sites, employing 125,000 people, most of whom had no idea what they were building. At Los Alamos, New Mexico, a team led by J. Robert Oppenheimer raced to turn theoretical physics into a weapon.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              They built two designs simultaneously. "Little Boy" used uranium-235 — a simple gun-type mechanism so straightforward they never tested it before dropping it on Hiroshima. "Fat Man" used plutonium in a complex implosion design that required a test. That test came at 5:29 AM on July 16, 1945, in the Jornada del Muerto desert.
            </p>
          </RevealOnScroll>

          {/* Trinity yield display */}
          <RevealOnScroll>
            <div className="text-center my-16 py-10" style={{ borderTop: `1px solid hsl(140, 30%, 15%)`, borderBottom: `1px solid hsl(140, 30%, 15%)` }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: STEEL }}>
                Trinity Test — Yield
              </p>
              <p className="font-display text-5xl md:text-7xl font-black" style={{ color: URANIUM }}>
                21 kt
              </p>
              <p className="font-body text-base mt-2" style={{ color: STEEL, opacity: 0.7 }}>
                equivalent to 21,000 tons of TNT
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The fireball rose eight miles. The desert sand fused into green glass — later named "trinitite." Oppenheimer recalled a line from the Bhagavad Gita:
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              "Now I am become Death, the destroyer of worlds."
            </motion.blockquote>
            <p className="text-center text-xs font-body mb-12" style={{ color: STEEL }}>
              — J. Robert Oppenheimer, 1965 interview
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Three weeks later, on August 6, Little Boy was dropped on Hiroshima. Three days after that, Fat Man fell on Nagasaki. Between 110,000 and 210,000 people were killed — most of them civilians. Japan surrendered on August 15, 1945.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The secret of the atom was out. The question was no longer <em className="italic" style={{ color: GEIGER }}>whether</em> others would build it — but <em className="italic" style={{ color: GEIGER }}>how quickly</em>.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
