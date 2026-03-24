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
  corrupted: 'ledger-bg ledger-stain-resin',
  contract: 'bg-ledger-highlight',
};

export const OpiumSectionShell = ({ id, eyebrow, title, children, variant = 'clean', className }: OpiumSectionShellProps) => (
  <section
    id={id}
    className={cn(
      'relative overflow-hidden px-4 py-20 md:px-6 md:py-28',
      'ledger-grain',
      variantStyles[variant],
      className
    )}
  >
    <div className="ledger-ruled absolute inset-0 opacity-25 pointer-events-none" />

    <div className="relative mx-auto max-w-5xl">
      {eyebrow && (
        <p className="ledger-chip mb-4 inline-flex">{eyebrow}</p>
      )}
      <h2 className="ledger-title text-3xl leading-tight md:text-5xl mb-8">{title}</h2>
      {children}
    </div>
  </section>
);
