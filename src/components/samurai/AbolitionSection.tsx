import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { StipendLedger, LedgerRow } from '@/components/visuals/StipendLedger';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const VERMILLION = 'hsl(5, 75%, 50%)';
const PAPER = 'hsl(40, 25%, 95%)';

const ABOLITION_LEDGER: LedgerRow[] = [
  { privilege: 'Domain Governance', japanese: '藩政', value: 'Active → Abolished', struck: false },
  { privilege: 'Hereditary Rank', japanese: '家格', value: 'Permanent → Void', struck: false },
  { privilege: 'Sword Rights', japanese: '帯刀', value: 'Granted → Banned', struck: false },
  { privilege: 'Tax Exemption', japanese: '免税', value: 'Full → None', struck: false },
  { privilege: 'Rice Stipend', japanese: '俸禄', value: '600石 → Bonds', struck: false },
];

const EDICTS = [
  { year: '1869', title: '版籍奉還 Hanseki Hōkan', desc: 'Daimyō "return" their domains to the Emperor. They become salaried governors of their own land.' },
  { year: '1871', title: '廃藩置県 Haihan Chiken', desc: '261 domains dissolved. Replaced by 72 prefectures under central control. The map of Japan is redrawn overnight.' },
  { year: '1873', title: '徴兵令 Chōheirei', desc: 'Universal conscription. Peasants now carry rifles. The samurai monopoly on violence ends.' },
  { year: '1876', title: '廃刀令 Haitōrei', desc: 'Sword-wearing banned. The visible symbol of samurai status becomes illegal.' },
];

export const AbolitionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const [strike, setStrike] = useState(0);

  const strikeProgress = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);

  useEffect(() => {
    return strikeProgress.on('change', setStrike);
  }, [strikeProgress]);

  return (
    <section id="abolition" ref={ref} className="relative py-32 px-6" style={{ background: PAPER }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="font-display text-6xl md:text-8xl font-black mb-2"
          style={{ color: 'hsl(30, 10%, 85%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          1869–76
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Abolition by Memo
        </motion.h2>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-6"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          No single decree killed the samurai class. It was a sequence of bureaucratic edicts — 
          each one stripping another privilege, each one issued by men who were themselves samurai. 
          They dismantled their own class with paperwork.
        </motion.p>

        {/* Edicts timeline */}
        <div className="my-12 space-y-6 max-w-xl">
          {EDICTS.map((edict, i) => (
            <motion.div
              key={edict.year}
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex-shrink-0 w-16 text-right">
                <span className="font-display text-lg font-bold" style={{ color: VERMILLION }}>
                  {edict.year}
                </span>
              </div>
              <div className="flex-1 pb-4" style={{ borderBottom: '1px solid hsl(30, 15%, 85%)' }}>
                <p className="font-display text-sm font-bold mb-1" style={{ color: INK }}>
                  {edict.title}
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: FADED }}>
                  {edict.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ledger with strike-throughs */}
        <StipendLedger
          rows={ABOLITION_LEDGER}
          strikeProgress={strike}
          title="武士特権台帳 — 改訂版"
        />

        <motion.p
          className="font-body text-base text-center mt-8 max-w-md mx-auto"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Row by row, the register empties. But one privilege remained: the stipend itself. 
          That required a different kind of violence — financial.
        </motion.p>
      </div>
    </section>
  );
};
