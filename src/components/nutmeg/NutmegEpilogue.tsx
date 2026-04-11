import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { CompassDivider } from './NutmegCompassRose';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { NM } from './nutmegTheme';

export const NutmegEpilogue = () => {
  return (
    <LogEntry
      id="nutmeg-epilogue"
      entryNumber="Final Entry"
      date="Centuries later"
      stainIntensity={0.8}
    >
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black text-center mb-4"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The spice lost its value.
      </motion.h2>
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black text-center mb-12"
        style={{ color: NM.AMBER }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        The island kept its scars.
      </motion.h2>

      <motion.p
        className="font-body text-lg leading-relaxed text-center mb-8"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        In 1770, a French botanist named Pierre Poivre smuggled nutmeg seedlings
        out of the Banda Islands and planted them in Mauritius.
        The Dutch monopoly collapsed within a generation.
      </motion.p>

      {/* The absurd comparison — styled as a margin annotation added later */}
      <motion.div
        className="text-center mb-20 py-10 mx-auto max-w-lg"
        style={{ borderTop: `1px solid ${NM.TIMBER}22`, borderBottom: `1px solid ${NM.TIMBER}22` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: NM.SMOKE }}>
          Today
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div>
            <p className="font-display text-5xl md:text-6xl font-black" style={{ color: NM.AMBER }}>
              $8
            </p>
            <p className="font-body text-sm mt-1" style={{ color: NM.SMOKE }}>
              per pound of nutmeg
            </p>
          </div>
          <div className="font-display text-2xl" style={{ color: NM.SMOKE }}>vs</div>
          <div>
            <p className="font-display text-5xl md:text-6xl font-black" style={{ color: NM.DUTCH_BLUE }}>
              $1.7T
            </p>
            <p className="font-body text-sm mt-1" style={{ color: NM.SMOKE }}>
              value of Manhattan
            </p>
          </div>
        </div>

        {/* "Added centuries later" annotation */}
        <motion.p
          className="font-body text-xs italic mt-6 -rotate-1"
          style={{ color: NM.TEAL }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          — annotated by a later hand, in a different ink
        </motion.p>
      </motion.div>

      <motion.p
        className="font-body text-lg leading-relaxed text-center mb-8"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Run island today has no airport, no harbour, and fewer than 2,000 inhabitants.
        The Dutch fort is rubble. The nutmeg trees still grow,
        but nobody fights over them anymore.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed text-center mb-16"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Manhattan has 1.6 million people, the world's financial center,
        and real estate worth more than most countries.
        All because the Dutch thought nutmeg was the better deal.
      </motion.p>

      <CompassDivider />

      {/* Final quote */}
      <motion.p
        className="font-display text-xl md:text-2xl italic text-center leading-relaxed mb-2"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        "Empires are built on what people believe is valuable.
        They collapse when they're wrong."
      </motion.p>
      <p className="text-center text-xs font-body mt-4 mb-8" style={{ color: NM.SMOKE }}>
        — The lesson of nutmeg
      </p>

      {/* Botanical sketch placeholder — final page feeling */}
      <motion.div
        className="text-center my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <p className="font-display text-sm italic mb-2" style={{ color: NM.TIMBER, opacity: 0.4 }}>
          ❦
        </p>
        <p className="font-body text-xs italic" style={{ color: NM.SMOKE, opacity: 0.5 }}>
          It was just a seed.
        </p>
      </motion.div>

      <EditionColophon essayId="nutmeg" variant="light" />
    </LogEntry>
  );
};
