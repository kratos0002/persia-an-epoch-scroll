import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { HUMEN_DATA } from './opiumData';

export const LinZexuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-lin-zexu" eyebrow="1839 — The reckoning" title="Lin Zexu & the Humen Destruction" variant="corrupted">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          In 1838, the Daoguang Emperor appointed <strong className="text-ledger-ink font-semibold">Lin Zexu</strong>, a famously incorruptible official, as Imperial Commissioner to end the trade at all costs. Lin blockaded the foreign factories in Canton, demanding surrender of all opium.
        </p>

        {/* Humen destruction counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-md overflow-hidden border-2 border-ledger-wax/40"
        >
          <div className="border-b border-ledger-wax/20 bg-ledger-wax/5 px-6 py-4 text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-wax">Destroyed at Humen Beach</p>
          </div>
          <div className="bg-ledger-cream px-6 py-8 text-center">
            <motion.p
              className="font-display text-6xl font-bold text-ledger-wax"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {HUMEN_DATA.chests.toLocaleString()}
            </motion.p>
            <p className="mt-1 font-body text-sm text-ledger-stain/60">chests of opium</p>
            <p className="mt-4 font-body text-sm text-ledger-stain/50">
              {HUMEN_DATA.startDate} — {HUMEN_DATA.endDate}
            </p>
          </div>
        </motion.div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Three large stone pits were dug, filled with sea water. Opium was mixed with salt and quicklime, creating a chemical reaction that dissolved the drug into a "boiling soup." The mixture was released into the Pearl River at low tide.
        </p>

        {/* Lin's letter to Victoria */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mx-auto max-w-2xl border-l-4 border-ledger-wax/40 bg-ledger-highlight/60 py-6 pl-6 pr-4"
        >
          <p className="font-body text-lg italic leading-relaxed text-ledger-ink/85">
            "Suppose there were people from another country who carried opium for sale to England and seduced your people into buying and smoking it; certainly, your honorable ruler would deeply hate it and be bitterly aroused."
          </p>
          <footer className="mt-4 font-body text-sm text-ledger-stain/60">
            — Lin Zexu, letter to Queen Victoria, 1839
          </footer>
        </motion.blockquote>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The letter elicited no response. The British government, lobbied by William Jardine and other merchants, viewed the seizure as an assault on British property and "free trade."
        </p>
      </div>
    </OpiumSectionShell>
  );
};
