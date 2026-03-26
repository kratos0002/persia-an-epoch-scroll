import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { HUMEN_DATA } from './opiumData';
import { AnimatedChestCounter } from './visuals/AnimatedChestCounter';
import { DestructionPit } from './visuals/DestructionPit';
import { WaxSeal } from './visuals/WaxSeal';

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
          <div className="bg-ledger-cream px-6 py-8">
            <AnimatedChestCounter target={HUMEN_DATA.chests} duration={3} label="chests of opium" />
            <p className="mt-4 text-center font-body text-sm text-ledger-stain/50">
              {HUMEN_DATA.startDate} — {HUMEN_DATA.endDate}
            </p>
          </div>
        </motion.div>

        {/* Destruction pit cross-section */}
        <DestructionPit />

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Three large stone pits were dug, filled with sea water. Opium was mixed with salt and quicklime, creating a chemical reaction that dissolved the drug into a "boiling soup." The mixture was released into the Pearl River at low tide.
        </p>

        {/* Lin's letter to Victoria — document facsimile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative mx-auto max-w-2xl ledger-document"
        >
          {/* Wax seal */}
          <div className="absolute -top-5 -right-3">
            <WaxSeal text="帝" size={56} />
          </div>

          <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-ledger-stain/40 mb-4">
            Letter to Her Majesty Queen Victoria — 1839
          </p>
          <blockquote className="border-l-4 border-ledger-wax/40 py-4 pl-5 pr-2">
            <p className="font-body text-lg italic leading-relaxed text-ledger-ink/85">
              "Suppose there were people from another country who carried opium for sale to England and seduced your people into buying and smoking it; certainly, your honorable ruler would deeply hate it and be bitterly aroused."
            </p>
          </blockquote>
          <footer className="mt-4 font-body text-sm text-ledger-stain/60">
            — Lin Zexu, Imperial Commissioner
          </footer>
        </motion.div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The letter elicited no response. The British government, lobbied by William Jardine and other merchants, viewed the seizure as an assault on British property and "free trade."
        </p>
      </div>
    </OpiumSectionShell>
  );
};
