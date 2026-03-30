import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { KURUKSHETRA_SECTIONS } from './kurukshetraData';
import { cn } from '@/lib/utils';

interface Props {
  activeSection: string;
}

export const KurukshetraSectionNav = ({ activeSection }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded border border-kuru-bronze/30 bg-kuru-dust/90 text-kuru-kohl shadow-sm backdrop-blur-sm transition-colors hover:bg-kuru-conch"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-kuru-kohl/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto border-r border-kuru-bronze/20 bg-kuru-dust p-6 shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-kuru-clay">
                  The Fractured Yantra
                </span>
                <button onClick={() => setOpen(false)} className="text-kuru-kohl/50 hover:text-kuru-kohl">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1">
                {KURUKSHETRA_SECTIONS.map((section, i) => {
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
                        isActive ? 'bg-kuru-bronze/10 text-kuru-bronze font-semibold' : 'text-kuru-kohl/60 hover:bg-kuru-bronze/5 hover:text-kuru-kohl'
                      )}
                    >
                      <span className="w-5 text-right font-display text-xs text-kuru-ash tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      {section.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-kuru-bronze/15 pt-5">
                <a href="/" className="font-body text-xs text-kuru-kohl/40 hover:text-kuru-bronze transition-colors">← Back to essays</a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
