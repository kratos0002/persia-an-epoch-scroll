import React from 'react';
import { motion } from 'framer-motion';
import { BondCalculator } from '@/components/visuals/BondCalculator';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const VERMILLION = 'hsl(5, 75%, 50%)';
const PAPER_ALT = 'hsl(38, 22%, 93%)';

export const BondConversionSection = () => {
  return (
    <section id="bond-conversion" className="relative py-32 px-6" style={{ background: PAPER_ALT }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="font-display text-6xl md:text-8xl font-black mb-2"
          style={{ color: 'hsl(30, 10%, 85%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          1876
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Bond Conversion
        </motion.h2>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-6"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          The <em>Kinroku Kōsai</em> (金禄公債) of 1876 was the final stroke. Hereditary rice stipends — 
          the economic foundation of the samurai class for centuries — were compulsorily converted 
          into government bonds.
        </motion.p>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-12"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          The bonds paid a fraction of the original stipend's value. For lower samurai, 
          the conversion was devastating — their annual income collapsed by 85%.
        </motion.p>

        {/* Bond Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <BondCalculator />
        </motion.div>

        <motion.div
          className="mt-12 p-6 rounded-sm max-w-xl mx-auto"
          style={{ background: 'hsl(5, 75%, 50% / 0.06)', border: `1px solid hsl(5, 75%, 50% / 0.15)` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-display text-sm font-bold mb-2" style={{ color: VERMILLION }}>
            The Mathematics of Erasure
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: INK }}>
            The government saved ¥30 million annually — roughly 30% of its total revenue. 
            The samurai class was now financially indistinguishable from commoners. 
            The conversion didn't just change their income. It changed what they <em>were</em>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
