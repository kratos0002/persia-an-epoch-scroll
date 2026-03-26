import React from 'react';
import { cn } from '@/lib/utils';

type SectionVariant = 'clean' | 'stained' | 'corrupted' | 'contract';

interface OpiumSectionShellProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  clean: 'ledger-bg',
  stained: 'ledger-bg ledger-stain-tea',
  corrupted: 'ledger-bg ledger-stain-corrupted',
  contract: 'bg-ledger-highlight',
};

export const OpiumSectionShell = ({ id, eyebrow, title, children, variant = 'clean', className }: OpiumSectionShellProps) => (
  <section
    id={id}
    className={cn(
      'relative overflow-hidden px-4 py-20 md:px-6 md:py-28',
      'ledger-grain',
      variantStyles[variant],
      variant === 'corrupted' && 'ledger-ink-blot',
      className
    )}
  >
    {/* Ruled lines */}
    <div className={cn(
      'ledger-ruled absolute inset-0 pointer-events-none',
      variant === 'clean' && 'opacity-25',
      variant === 'stained' && 'opacity-20',
      variant === 'corrupted' && 'opacity-15',
      variant === 'contract' && 'opacity-10',
    )} />

    {/* EIC watermark on corrupted sections */}
    {variant === 'corrupted' && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 font-display text-[10rem] font-bold tracking-[0.15em] text-ledger-ink/[0.02] select-none whitespace-nowrap">
          EIC
        </span>
      </div>
    )}

    <div className="relative mx-auto max-w-5xl">
      {eyebrow && (
        <p className="ledger-chip mb-4 inline-flex">{eyebrow}</p>
      )}
      <h2 className="ledger-title text-3xl leading-tight md:text-5xl mb-8">{title}</h2>
      {children}
    </div>
  </section>
);
