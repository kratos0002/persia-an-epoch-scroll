import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const SHADOW = 'hsl(220, 15%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

interface RedactedLine {
  text: string;
  classification: 'revealed' | 'partial' | 'classified';
  indent?: boolean;
}

const DOSSIER_LINES: RedactedLine[] = [
  { text: 'SUBJECT: State of Israel — Nuclear Capability Assessment', classification: 'revealed' },
  { text: 'CLASSIFICATION: TOP SECRET / SCI / NOFORN', classification: 'classified' },
  { text: '', classification: 'revealed' },
  { text: 'The Dimona reactor in the Negev desert has been operational since 1963.', classification: 'revealed' },
  { text: 'French assistance in reactor construction confirmed by multiple sources.', classification: 'partial' },
  { text: 'Estimated weapons-grade plutonium production: ████████ kg/year.', classification: 'classified' },
  { text: '', classification: 'revealed' },
  { text: 'Current stockpile estimate: 80–90 nuclear warheads.', classification: 'partial' },
  { text: 'Delivery systems include Jericho II/III ballistic missiles.', classification: 'partial' },
  { text: 'Submarine-based second-strike capability via ██████████████.', classification: 'classified' },
  { text: '', classification: 'revealed' },
  { text: 'Mordechai Vanunu, former technician, leaked details in 1986.', classification: 'revealed' },
  { text: 'Israel maintains a policy of nuclear ambiguity ("amimut").', classification: 'revealed' },
  { text: 'No confirmation. No denial. No test.', classification: 'revealed' },
];

const TRIED_AND_FAILED = [
  { name: 'South Africa', status: 'Built 6, dismantled all', year: '1989', color: 'hsl(45, 60%, 50%)' },
  { name: 'Libya', status: 'Program abandoned', year: '2003', color: 'hsl(30, 60%, 45%)' },
  { name: 'Iraq', status: 'Osirak destroyed by Israel', year: '1981', color: 'hsl(15, 50%, 40%)' },
  { name: 'Iran', status: 'Threshold state', year: 'ongoing', color: 'hsl(0, 50%, 45%)' },
];

export const RedactedDossier = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });
  const revealProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <div ref={scrollRef} className="w-full max-w-xl mx-auto my-16 space-y-12">
      {/* Dossier */}
      <div
        ref={ref}
        className="p-6 md:p-8 rounded border"
        style={{
          background: 'hsl(220, 15%, 8%)',
          borderColor: 'hsl(220, 10%, 18%)',
        }}
      >
        {/* Header stamp */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold" style={{ color: SHADOW }}>
            Intelligence Assessment
          </p>
          <motion.div
            className="px-2 py-0.5 rounded text-[8px] font-body font-bold tracking-wider"
            style={{
              border: `1px solid hsl(0, 60%, 40%)`,
              color: 'hsl(0, 60%, 50%)',
            }}
            animate={inView ? { opacity: [0.4, 1, 0.4] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            TOP SECRET
          </motion.div>
        </div>

        {/* Lines */}
        <div className="space-y-1.5">
          {DOSSIER_LINES.map((line, i) => {
            if (!line.text) return <div key={i} className="h-3" />;

            const isClassified = line.classification === 'classified';
            const isPartial = line.classification === 'partial';

            return (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.06 }}
              >
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{
                    color: isClassified ? 'transparent' : isPartial ? LIGHT : STEEL,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {line.text}
                </p>

                {/* Redaction bar */}
                {isClassified && (
                  <motion.div
                    className="absolute inset-0 rounded-sm"
                    style={{ background: 'hsl(220, 10%, 20%)' }}
                  />
                )}
                {isPartial && (
                  <motion.div
                    className="absolute inset-0 rounded-sm"
                    style={{ background: 'hsl(220, 10%, 20%)' }}
                    initial={{ opacity: 1 }}
                    animate={inView ? { opacity: 0 } : {}}
                    transition={{ duration: 1.5, delay: 1.5 + i * 0.1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Those who tried */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-6" style={{ color: STEEL }}>
          Those Who Tried
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {TRIED_AND_FAILED.map((nation, i) => (
            <motion.div
              key={nation.name}
              className="p-3 rounded border text-center"
              style={{
                background: 'hsl(220, 15%, 8%)',
                borderColor: 'hsl(220, 10%, 15%)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2 + i * 0.15 }}
            >
              <p className="font-body text-xs font-semibold mb-0.5" style={{ color: nation.color }}>
                {nation.name}
              </p>
              <p className="font-body text-[10px]" style={{ color: STEEL }}>
                {nation.status}
              </p>
              <p className="font-body text-[9px] mt-1" style={{ color: 'hsl(200, 10%, 35%)' }}>
                {nation.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
