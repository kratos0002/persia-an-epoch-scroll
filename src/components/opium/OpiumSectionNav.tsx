import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { OPIUM_SECTIONS } from '@/components/opium/opiumData';
import { cn } from '@/lib/utils';

interface OpiumSectionNavProps {
  activeSection: string;
}

export const OpiumSectionNav = ({ activeSection }: OpiumSectionNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded border border-ledger-rule/40 bg-ledger-cream/90 text-ledger-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-ledger-highlight"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ledger-ink/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto border-r border-ledger-rule/30 bg-ledger-cream p-6 shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ledger-stain/60">Table of Accounts</span>
                <button onClick={() => setOpen(false)} className="text-ledger-ink/50 hover:text-ledger-ink">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1">
                {OPIUM_SECTIONS.map((section, index) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setOpen(false);
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left font-body text-sm transition-colors',
                        isActive ? 'bg-ledger-tea/10 text-ledger-tea font-semibold' : 'text-ledger-stain/70 hover:bg-ledger-rule/15 hover:text-ledger-ink'
                      )}
                    >
                      <span className="w-5 text-right font-display text-xs text-ledger-rule tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                      {section.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-ledger-rule/25 pt-5">
                <a href="/" className="font-body text-xs text-ledger-stain/50 hover:text-ledger-tea transition-colors">← Back to essays</a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
