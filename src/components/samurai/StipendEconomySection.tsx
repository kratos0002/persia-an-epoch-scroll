import React from 'react';
import { motion } from 'framer-motion';
import { StipendLedger, LedgerRow } from '@/components/visuals/StipendLedger';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const PAPER = 'hsl(40, 25%, 95%)';

const INITIAL_LEDGER: LedgerRow[] = [
  { privilege: 'Rice Stipend', japanese: '俸禄', value: '600 石/yr', struck: false },
  { privilege: 'Sword Rights', japanese: '帯刀', value: 'Granted', struck: false },
  { privilege: 'Tax Exemption', japanese: '免税', value: 'Full', struck: false },
  { privilege: 'Domain Governance', japanese: '藩政', value: 'Active', struck: false },
  { privilege: 'Hereditary Rank', japanese: '家格', value: 'Permanent', struck: false },
];

export const StipendEconomySection = () => {
  return (
    <section id="stipend-economy" className="relative py-32 px-6" style={{ background: PAPER }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="font-display text-6xl md:text-8xl font-black mb-2"
          style={{ color: 'hsl(30, 10%, 88%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ~1700
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Stipend Economy
        </motion.h2>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-12"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Every samurai family received a fixed amount of rice each year — their <em>chigyo</em> or stipend.
          This wasn't salary for work performed. It was an entitlement for <em>being</em>.
          A mid-ranking samurai received about 200 <em>koku</em> of rice annually — enough to feed 
          200 people for a year. For doing nothing.
        </motion.p>

        {/* First appearance of the ledger — pristine, all intact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <StipendLedger
            rows={INITIAL_LEDGER}
            strikeProgress={0}
            title="上級武士特権台帳"
          />
        </motion.div>

        <motion.p
          className="font-body text-base leading-relaxed max-w-xl mx-auto text-center mt-10"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Every row in this register would be crossed out within two decades. 
          But in 1700, the system looked eternal.
        </motion.p>
      </div>
    </section>
  );
};
