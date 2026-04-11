import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { VOCSeal } from './VOCSeal';
import { NM } from './nutmegTheme';

/* Treaty document visual */
const TreatyDocument = () => (
  <motion.div
    className="my-12 rounded-sm overflow-hidden"
    style={{
      background: NM.CREAM_DARK,
      border: `1px solid ${NM.TIMBER}22`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.08)`,
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {/* Treaty header */}
    <div className="text-center py-6 px-6" style={{ borderBottom: `2px solid ${NM.TIMBER}18` }}>
      <p className="text-[9px] tracking-[0.5em] uppercase font-body mb-2" style={{ color: NM.SMOKE }}>
        Treaty of Breda
      </p>
      <p className="font-display text-xl font-bold" style={{ color: NM.INK }}>
        31 July 1667
      </p>
      <p className="font-body text-xs italic mt-1" style={{ color: NM.SMOKE }}>
        Ending the Second Anglo-Dutch War
      </p>
    </div>

    {/* Two columns */}
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Dutch offer */}
      <div className="p-6" style={{ borderRight: `1px solid ${NM.TIMBER}12` }}>
        <div className="flex items-center gap-3 mb-4">
          <VOCSeal size={40} color={NM.VERMILION} />
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body" style={{ color: NM.SMOKE }}>
              The Netherlands receives
            </p>
            <p className="font-display text-lg font-bold" style={{ color: NM.AMBER }}>
              Run Island
            </p>
          </div>
        </div>
        <p className="font-body text-sm leading-relaxed mb-4" style={{ color: NM.INK }}>
          Complete and undisputed control of the Banda archipelago
          and the world's entire nutmeg supply.
        </p>
        <div className="text-center py-4" style={{ borderTop: `1px solid ${NM.TIMBER}0d` }}>
          <p className="text-[8px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: NM.SMOKE }}>
            Value in 1667
          </p>
          <p className="font-display text-lg font-bold" style={{ color: NM.AMBER }}>
            Nutmeg monopoly
          </p>
          <p className="text-[8px] tracking-[0.2em] uppercase font-body mt-4 mb-1" style={{ color: NM.SMOKE }}>
            Value today
          </p>
          <p className="font-display text-3xl font-black" style={{ color: NM.AMBER }}>
            $0
          </p>
        </div>
      </div>

      {/* English offer */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid ${NM.ENGLISH_RED}33` }}>
            <span className="font-display text-xs font-bold" style={{ color: NM.ENGLISH_RED }}>EIC</span>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body" style={{ color: NM.SMOKE }}>
              England receives
            </p>
            <p className="font-display text-lg font-bold" style={{ color: NM.DUTCH_BLUE }}>
              New Amsterdam
            </p>
          </div>
        </div>
        <p className="font-body text-sm leading-relaxed mb-4" style={{ color: NM.INK }}>
          A fur-trading outpost on the tip of a swampy island —
          renamed New York.
        </p>
        <div className="text-center py-4" style={{ borderTop: `1px solid ${NM.TIMBER}0d` }}>
          <p className="text-[8px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: NM.SMOKE }}>
            Value in 1667
          </p>
          <p className="font-display text-lg font-bold" style={{ color: NM.DUTCH_BLUE }}>
            Fur trading post
          </p>
          <p className="text-[8px] tracking-[0.2em] uppercase font-body mt-4 mb-1" style={{ color: NM.SMOKE }}>
            Value today
          </p>
          <p className="font-display text-3xl font-black" style={{ color: NM.DUTCH_BLUE }}>
            $1.7T
          </p>
        </div>
      </div>
    </div>

    {/* Signature line */}
    <div className="px-6 py-5 text-center" style={{ borderTop: `2px solid ${NM.TIMBER}18` }}>
      <p className="font-display text-sm italic" style={{ color: NM.SMOKE }}>
        "The worst trade deal in history — or the best, depending on which side you were on."
      </p>
    </div>
  </motion.div>
);

export const ManhattanTradeSection = () => {
  return (
    <LogEntry
      id="manhattan-trade"
      entryNumber="Entry VI"
      date="31 July 1667 — Breda, Netherlands"
      stainIntensity={0.2}
    >
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Manhattan<br />
        <span style={{ color: NM.AMBER }}>for a nutmeg island.</span>
      </motion.h2>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        The Treaty of Breda, signed on 31 July 1667, ended the Second Anglo-Dutch War.
        Among its provisions was an extraordinary exchange: England would keep
        <strong style={{ color: NM.INK }}> New Amsterdam</strong> — a fur-trading outpost
        on the tip of a swampy island — and rename it New York.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed mb-10"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        In return, the Dutch would get undisputed control of <strong style={{ color: NM.AMBER }}>Run</strong> —
        and with it, the complete monopoly on the world's nutmeg supply.
        At the time, the Dutch considered it a magnificent deal.
      </motion.p>

      <TreatyDocument />

      <motion.p
        className="font-body text-lg leading-relaxed mt-10"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Both sides walked away satisfied. The Dutch had their monopoly.
        The English had a harbour. Neither could have imagined how
        history would judge this exchange.
      </motion.p>
    </LogEntry>
  );
};
