import React from 'react';
import { cn } from '@/lib/utils';
import { WarPhase } from './kurukshetraData';
import { YantraGrid } from './YantraGrid';

interface KurukshetraSectionShellProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  phase?: WarPhase;
  variant?: 'dust' | 'clay' | 'bronze' | 'indigo' | 'ash';
  className?: string;
}

const variantStyles: Record<string, string> = {
  dust: 'bg-kuru-dust',
  clay: 'bg-kuru-clay text-kuru-conch',
  bronze: 'bg-kuru-clay text-kuru-conch',
  indigo: 'bg-kuru-indigo text-kuru-conch',
  ash: 'bg-kuru-ash/30',
};

export const KurukshetraSectionShell = ({
  id, eyebrow, title, children, phase = 1, variant = 'dust', className,
}: KurukshetraSectionShellProps) => {
  const crackOpacity = phase === 1 ? 0 : phase === 2 ? 0.08 : phase === 3 ? 0.2 : 0.4;

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden px-4 py-20 md:px-6 md:py-28',
        'kuru-grain',
        variantStyles[variant],
        className,
      )}
    >
      <YantraGrid phase={phase} />

      {/* Cracked earth overlay — intensifies with phase */}
      {crackOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none kuru-cracks"
          style={{ opacity: crackOpacity }}
        />
      )}

      <div className="relative mx-auto max-w-5xl">
        {eyebrow && (
          <p className={cn(
            'kuru-chip mb-4 inline-flex',
            variant === 'dust' || variant === 'ash' ? '' : 'border-kuru-conch/20 text-kuru-conch/70'
          )}>{eyebrow}</p>
        )}
        <h2 className={cn(
          'font-display text-3xl leading-tight md:text-5xl mb-8 tracking-[0.06em]',
          (variant === 'dust' || variant === 'ash') ? 'text-kuru-kohl' : 'text-kuru-conch',
        )}>{title}</h2>
        {children}
      </div>
    </section>
  );
};
