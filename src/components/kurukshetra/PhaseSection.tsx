import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DAY_JOURNAL, DayEntry, WarPhase } from './kurukshetraData';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';
import { VyuhaDiagram } from './VyuhaDiagram';
import { cn } from '@/lib/utils';

interface PhaseSectionProps {
  phase: WarPhase;
  id: string;
  title: string;
  eyebrow: string;
}

const DayCard = ({ entry }: { entry: DayEntry }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative border rounded-sm p-5 md:p-6',
        entry.phase === 1 && 'border-kuru-bronze/15 bg-kuru-dust/50',
        entry.phase === 2 && 'border-kuru-bronze/20 bg-kuru-dust/40',
        entry.phase === 3 && 'border-kuru-red/20 bg-kuru-red/[0.03]',
        entry.phase === 4 && 'border-kuru-ash/30 bg-kuru-ash/[0.06]',
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Day number */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn(
            'font-display text-4xl md:text-5xl font-bold leading-none',
            entry.phase <= 2 ? 'text-kuru-bronze' : entry.phase === 3 ? 'text-kuru-red' : 'text-kuru-ash',
          )}>
            {entry.day}
          </span>
          <span className="block font-body text-[10px] uppercase tracking-[0.25em] text-kuru-kohl/40 mt-1">
            {entry.senapati} commands
          </span>
        </div>

        {/* Vyuha diagrams */}
        <div className="flex gap-4">
          {entry.vyuhaKaurava !== '—' && (
            <VyuhaDiagram name={entry.vyuhaKaurava} side="kaurava" phase={entry.phase} size={60} />
          )}
          {entry.vyuhaPandava !== '—' && (
            <VyuhaDiagram name={entry.vyuhaPandava} side="pandava" phase={entry.phase} size={60} />
          )}
        </div>
      </div>

      {/* Narrative */}
      <p className="font-body text-base md:text-lg text-kuru-kohl/80 leading-relaxed">
        {entry.narrative}
      </p>

      {/* Casualties */}
      {entry.casualties.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.casualties.map((c) => {
            const isPandava = c.includes('(P');
            return (
              <motion.span
                key={c}
                className={cn(
                  'font-display text-xs tracking-[0.1em] px-2 py-0.5 rounded-sm border',
                  isPandava
                    ? 'border-kuru-gold/20 text-kuru-gold/70 bg-kuru-gold/[0.04]'
                    : 'border-kuru-red/20 text-kuru-red/70 bg-kuru-red/[0.04]'
                )}
                initial={{ opacity: 1 }}
                animate={inView ? { opacity: [1, 0.4] } : {}}
                transition={{ delay: 1.5, duration: 2 }}
              >
                {c.replace(' (P)', '').replace(' (K)', '').replace(' (K – fallen)', ' †').replace(' (P – fallen)', ' †')}
              </motion.span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export const PhaseSection = ({ phase, id, title, eyebrow }: PhaseSectionProps) => {
  const days = DAY_JOURNAL.filter((d) => d.phase === phase);
  const variant = phase === 1 ? 'dust' : phase === 2 ? 'dust' : phase === 3 ? 'dust' : 'ash';

  return (
    <KurukshetraSectionShell
      id={id}
      eyebrow={eyebrow}
      title={title}
      phase={phase}
      variant={variant}
    >
      <div className="space-y-6">
        {days.map((entry) => (
          <DayCard key={entry.day} entry={entry} />
        ))}
      </div>
    </KurukshetraSectionShell>
  );
};
