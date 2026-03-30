import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';
import { DHARMA_RULES } from './kurukshetraData';

/** "The Broken Rules" — dharma rules crack as you scroll */
export const DharmaSection = () => {
  return (
    <KurukshetraSectionShell
      id="kuru-dharma"
      eyebrow="Dharma Yuddha → Kuta Yuddha"
      title="The Broken Rules"
      phase={3}
      variant="dust"
    >
      <p className="font-body text-base md:text-lg text-kuru-kohl/70 leading-relaxed mb-10 max-w-3xl">
        The war began with solemn agreements: equals must fight equals, non-combatants must be spared, fighting must end at sunset. One by one, every rule was broken. Krishna justified each violation with the same principle: when the opponent has abandoned dharma, adhering to it is not righteousness — it is suicide.
      </p>

      <div className="space-y-4">
        {DHARMA_RULES.map((rule, index) => (
          <RuleCard key={index} rule={rule} index={index} />
        ))}
      </div>

      <div className="mt-12 border-t border-kuru-ash/20 pt-6">
        <p className="font-body text-sm text-kuru-kohl/50 italic max-w-2xl">
          The ethical narrative suggests that while the Pandavas won the physical war, the moral erosion was so total that the victory was pyrrhic — heralding the Kali Yuga, an age of spiritual decline from which the world has never recovered.
        </p>
      </div>
    </KurukshetraSectionShell>
  );
};

const RuleCard = ({ rule, index }: { rule: typeof DHARMA_RULES[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative border border-kuru-bronze/15 rounded-sm p-5 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Rule text — cracks on view */}
      <div className="relative">
        <p className="font-display text-base md:text-lg text-kuru-gold/80 tracking-wide">
          {rule.rule}
        </p>
        {/* Crack line */}
        <motion.div
          className="absolute left-0 top-1/2 h-[1.5px] bg-kuru-red/40 -translate-y-1/2"
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ delay: 0.8 + index * 0.15, duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Violation */}
      <motion.div
        className="mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5 + index * 0.1 }}
      >
        <p className="font-body text-sm text-kuru-red/70">{rule.violation}</p>
        <div className="mt-2 flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.2em] text-kuru-ash">
          <span>Day {rule.day}</span>
          <span className="h-px w-4 bg-kuru-ash/30" />
          <span>{rule.violator}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
