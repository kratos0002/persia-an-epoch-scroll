import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SHAKTI_SECTIONS } from '@/components/visuals/shaktiPeethData';

interface ShaktiSectionNavProps {
  activeSection: string;
}

export const ShaktiSectionNav = ({ activeSection }: ShaktiSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-shakti-line/20 bg-shakti-panel/85 text-shakti-gold backdrop-blur-md"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Toggle Shakti navigation"
      >
        <div className="flex flex-col gap-1">
          {[0, 1, 2].map((line) => (
            <motion.div
              key={line}
              className="h-px w-4 bg-shakti-gold"
              animate={isOpen ? line === 0 ? { rotate: 45, y: 5 } : line === 1 ? { opacity: 0 } : { rotate: -45, y: -5 } : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-shakti-night/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto border-r border-shakti-line/15 bg-[linear-gradient(180deg,hsl(var(--shakti-panel)),hsl(var(--shakti-night)))] px-6 py-20"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-shakti-gold/72">The Goddess as Geography</p>
              <div className="mt-6 space-y-2">
                {SHAKTI_SECTIONS.map((section) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={`w-full rounded-[1rem] px-4 py-3 text-left transition-colors ${isActive ? 'bg-shakti-vermilion/16 text-shakti-gold' : 'text-shakti-ink/72 hover:bg-shakti-night/25'}`}
                    >
                      <span className="font-body text-sm uppercase tracking-[0.18em]">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};