import React from 'react';
import { motion } from 'framer-motion';
import { StipendLedger, LedgerRow } from '@/components/visuals/StipendLedger';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const PAPER = 'hsl(40, 25%, 95%)';

const FINAL_LEDGER: LedgerRow[] = [
  { privilege: 'Rice Stipend', japanese: '俸禄', value: '0', struck: true },
  { privilege: 'Sword Rights', japanese: '帯刀', value: 'Banned', struck: true },
  { privilege: 'Tax Exemption', japanese: '免税', value: 'None', struck: true },
  { privilege: 'Domain Governance', japanese: '藩政', value: 'Dissolved', struck: true },
  { privilege: 'Hereditary Rank', japanese: '家格', value: 'Void', struck: true },
];

export const SamuraiEpilogue = () => {
  return (
    <section id="samurai-epilogue" className="relative py-32 px-6" style={{ background: PAPER }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-8"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The class didn't fall.
          <br />
          <em className="italic" style={{ color: FADED }}>It was filed away.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <StipendLedger
            rows={FINAL_LEDGER}
            strikeProgress={1}
            showSeal={true}
            title="武士特権台帳 — 最終版"
          />
        </motion.div>

        <motion.p
          className="font-body text-lg leading-relaxed mt-12 max-w-lg mx-auto"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          No guillotines. No purges. No revolution from below. 
          A ruling class of two million people was dissolved through a series of administrative reforms 
          so methodical they read like tax code. The samurai were not overthrown — 
          they were <em>deprecated</em>.
        </motion.p>

        <motion.p
          className="font-body text-base leading-relaxed mt-6 max-w-md mx-auto"
          style={{ color: 'hsl(30, 8%, 72%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          Within a generation, their descendants were bankers, teachers, and bureaucrats. 
          The swords became antiques. The stipends became stories. 
          The register was closed.
        </motion.p>

        {/* Final vermillion mark */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: 'hsl(5, 75%, 50%)' }}
          />
        </motion.div>

        <EditionColophon essayId="samurai" variant="light" />
      </div>
    </section>
  );
};
