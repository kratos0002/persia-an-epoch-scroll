import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';

export const OpiumEpilogue = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-epilogue" eyebrow="Epilogue" title="The Ledger Closes" variant="contract">
      <div ref={ref} className="space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl font-body text-xl leading-relaxed text-ledger-stain/80"
        >
          The structural integrity of this trade triangle relied on the seamless integration of Indian agricultural production, British maritime supremacy, and Chinese consumer vulnerability. While the East India Company was dissolved as a commercial entity in 1834, its legacy was the creation of a global drug market that remained the single most profitable commodity trade of the nineteenth century.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl font-body text-lg italic leading-relaxed text-ledger-stain/60"
        >
          The ledger balanced perfectly. The morality never did.
        </motion.p>

        {/* Closing stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {[
            { num: '85', unit: 'years', label: 'of systematic trade' },
            { num: '28M', unit: 'kg', label: 'silver drained from China' },
            { num: '10%', unit: '', label: 'of China addicted by 1830s' },
          ].map((stat, i) => (
            <div key={i} className="border-t-2 border-ledger-rule/30 pt-4 text-center">
              <p className="font-display text-3xl font-bold text-ledger-ink">{stat.num}<span className="text-lg text-ledger-stain/50"> {stat.unit}</span></p>
              <p className="mt-1 font-body text-sm text-ledger-stain/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </OpiumSectionShell>
  );
};
