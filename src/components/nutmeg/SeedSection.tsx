import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { CargoManifest } from './CargoManifest';
import { NM } from './nutmegTheme';

const Marginalia = ({ children, side = 'right' }: { children: string; side?: 'left' | 'right' }) => (
  <div
    className={`hidden lg:block absolute ${side === 'right' ? '-right-48' : '-left-48'} w-36 text-[11px] font-body italic leading-snug`}
    style={{ color: NM.SMOKE }}
  >
    {children}
  </div>
);

export const SeedSection = () => {
  return (
    <LogEntry
      id="the-seed"
      entryNumber="Entry I"
      date="Circa 600 AD — Medieval Europe"
    >
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        A nut so valuable<br />
        <span style={{ color: NM.AMBER }}>men killed for it.</span>
      </motion.h2>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-body text-lg leading-relaxed mb-6" style={{ color: NM.INK }}>
          Nutmeg. A wrinkled brown seed the size of an olive. In medieval Europe, it was believed to cure the plague,
          ward off evil spirits, and ignite passion. Doctors prescribed it. Priests blessed it.
          Kings hoarded it.
        </p>
        <Marginalia side="right">
          The Arabs kept the source a secret for centuries — attributing it to lands beyond the edge of the world.
        </Marginalia>
      </motion.div>

      <motion.p
        className="font-body text-lg leading-relaxed mb-10"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        By the 1500s, a bag of nutmeg bought in the Banda Islands for a few pennies
        could be sold in London for <strong style={{ color: NM.AMBER }}>60,000 percent profit</strong>.
        Ounce for ounce, it was more valuable than gold.
      </motion.p>

      {/* Cargo Manifest — replaces SpicePriceChart */}
      <CargoManifest />

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        And it grew in only one place on Earth: a chain of ten tiny volcanic islands
        in the Banda Sea, east of Java, at the end of the known world.
      </motion.p>

      <motion.p
        className="font-display text-2xl md:text-3xl italic text-center my-10"
        style={{ color: NM.TIMBER }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        "Whoever controlled those islands controlled the world's supply."
      </motion.p>
    </LogEntry>
  );
};
