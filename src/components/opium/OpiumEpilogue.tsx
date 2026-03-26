import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';

const AnimStat = ({ num, suffix, label, delay }: { num: number; suffix: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 2000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, num, delay]);

  return (
    <div ref={ref} className="border-t-2 border-ledger-rule/30 pt-4 text-center">
      <p className="font-display text-3xl font-bold text-ledger-ink">
        {count.toLocaleString()}<span className="text-lg text-ledger-stain/50"> {suffix}</span>
      </p>
      <p className="mt-1 font-body text-sm text-ledger-stain/60">{label}</p>
    </div>
  );
};

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

        {/* Closing stats with animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          <AnimStat num={85} suffix="years" label="of systematic trade" delay={0.5} />
          <AnimStat num={28} suffix="M kg" label="silver drained from China" delay={0.8} />
          <AnimStat num={10} suffix="%" label="of China addicted by 1830s" delay={1.1} />
        </motion.div>

        {/* Ledger closing visual */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 2, duration: 1.5 }}
          className="mx-auto mt-8 h-px w-full max-w-lg origin-left bg-ledger-ink/30"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 3 }}
          className="text-center font-display text-xs font-bold uppercase tracking-[0.5em] text-ledger-stain/30"
        >
          Account Closed
        </motion.p>
      </div>
    </OpiumSectionShell>
  );
};
