import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';
import { AKSHAUHINI, ALLIANCES } from './kurukshetraData';
import { cn } from '@/lib/utils';

const UnitGlyph = ({ type, count }: { type: string; count: number }) => {
  const icons: Record<string, string> = {
    Chariots: '𑁍', // decorative
    Elephants: '🐘',
    Cavalry: '🐎',
    Infantry: '⚔',
  };
  return (
    <div className="flex flex-col items-center gap-1 p-3">
      <span className="text-2xl">{icons[type] ?? '•'}</span>
      <span className="font-display text-lg md:text-xl font-bold text-kuru-conch">{count.toLocaleString()}</span>
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-kuru-conch/50">{type}</span>
    </div>
  );
};

const BronzeTablet = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    'rounded-sm border border-kuru-bronze/20 bg-kuru-clay/90 p-5 md:p-6 shadow-[inset_0_1px_0_hsl(var(--kuru-bronze)/0.1)]',
    className
  )}>
    {children}
  </div>
);

export const LogisticsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <KurukshetraSectionShell
      id="kuru-logistics"
      eyebrow="Military Science"
      title="The Bronze Tablet"
      phase={1}
      variant="clay"
    >
      <div ref={ref} className="space-y-10">
        {/* Akshauhini breakdown */}
        <BronzeTablet>
          <h3 className="font-display text-sm tracking-[0.2em] uppercase text-kuru-bronze mb-4">
            One Akshauhini — The Standard Division
          </h3>
          <p className="font-body text-sm text-kuru-conch/60 mb-6">
            Ratio 1 : 1 : 3 : 5 — Chariots, Elephants, Cavalry, Infantry
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <UnitGlyph type="Chariots" count={AKSHAUHINI.chariots} />
            <UnitGlyph type="Elephants" count={AKSHAUHINI.elephants} />
            <UnitGlyph type="Cavalry" count={AKSHAUHINI.cavalry} />
            <UnitGlyph type="Infantry" count={AKSHAUHINI.infantry} />
          </div>
          <div className="mt-6 flex justify-center gap-12 border-t border-kuru-bronze/15 pt-4">
            <div className="text-center">
              <span className="font-display text-2xl font-bold text-kuru-gold">{AKSHAUHINI.pandava}</span>
              <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-kuru-conch/50 mt-1">Pandava Akshauhinis</span>
              <span className="font-body text-xs text-kuru-conch/40">≈ 1.53 million</span>
            </div>
            <div className="text-center">
              <span className="font-display text-2xl font-bold text-kuru-red">{AKSHAUHINI.kaurava}</span>
              <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-kuru-conch/50 mt-1">Kaurava Akshauhinis</span>
              <span className="font-body text-xs text-kuru-conch/40">≈ 2.41 million</span>
            </div>
          </div>
        </BronzeTablet>

        {/* Alliances */}
        <BronzeTablet>
          <h3 className="font-display text-sm tracking-[0.2em] uppercase text-kuru-bronze mb-4">
            Alliances & Participating Kingdoms
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {ALLIANCES.map((a) => (
              <motion.div
                key={a.kingdom}
                className={cn(
                  'flex items-start gap-3 rounded-sm border p-3',
                  a.faction === 'Pandava'
                    ? 'border-kuru-gold/15 bg-kuru-gold/[0.03]'
                    : 'border-kuru-red/15 bg-kuru-red/[0.03]'
                )}
                initial={{ opacity: 0, x: a.faction === 'Pandava' ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className={cn(
                  'mt-0.5 h-2 w-2 rounded-full shrink-0',
                  a.faction === 'Pandava' ? 'bg-kuru-gold' : 'bg-kuru-red'
                )} />
                <div>
                  <span className="font-display text-sm text-kuru-conch">{a.kingdom}</span>
                  <span className="block font-body text-[11px] text-kuru-conch/50">{a.leader}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </BronzeTablet>
      </div>
    </KurukshetraSectionShell>
  );
};
