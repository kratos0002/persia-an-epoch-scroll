import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArmyRibbon } from '@/components/visuals/ArmyRibbon';

const MIDNIGHT = 'hsl(225, 30%, 7%)';
const RED = 'hsl(0, 65%, 48%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';

export const MoscowSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(Math.min(1, v * 2)));
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="moscow" ref={ref} className="relative min-h-[150vh] py-32 px-6" style={{ background: MIDNIGHT }}>
      <div className="max-w-3xl mx-auto">
        {/* Opening numbers */}
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: RED }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            June–December 1812
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: PARCHMENT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: 'hsl(43, 70%, 50%)' }}>685,000</span> marched in.
          </motion.h2>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black"
            style={{ color: RED }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            120,000 walked out.
          </motion.h2>
        </div>

        {/* Minard ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ArmyRibbon progress={progress} />
        </motion.div>

        {/* Text */}
        <div className="max-w-xl mx-auto mt-20 space-y-6">
          <motion.p
            className="font-body text-lg leading-relaxed"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            The Grande Armée crossed the Niemen in June 1812 — the largest army Europe had ever seen. 
            The Russians refused to fight. They burned their own crops, poisoned their own wells, and retreated.
          </motion.p>

          <motion.p
            className="font-body text-lg leading-relaxed"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Napoleon reached Moscow on September 14. The city was empty. Then it burned. 
            With no enemy to defeat and no peace to sign, he waited five weeks — then turned back into the Russian winter.
          </motion.p>

          <motion.p
            className="font-display text-xl italic text-center mt-10"
            style={{ color: RED }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            "The army that conquered Europe was destroyed not by a battle, but by distance, cold, and hunger."
          </motion.p>
        </div>
      </div>
    </section>
  );
};
