import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RAMAYANA_SECTIONS } from '@/hooks/useRamayanaScrollSpy';
import { cn } from '@/lib/utils';
import { RM } from '@/components/visuals/ramayanaMapData';

interface RamayanaSectionNavProps {
  activeSection: string;
}

export const RamayanaSectionNav = ({ activeSection }: RamayanaSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  let lastPhase = '';

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 hidden md:flex flex-col items-center justify-center w-10 h-10 rounded-full cursor-pointer"
        style={{
          background: 'hsla(38, 45%, 92%, 0.9)',
          border: `1px solid ${RM.GOLD_LEAF}40`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        aria-label="Toggle navigation"
      >
        <motion.span className="block w-4 h-px mb-1" style={{ background: RM.VERMILLION }} animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3 : 0 }} />
        <motion.span className="block w-4 h-px mb-1" style={{ background: RM.VERMILLION }} animate={{ opacity: isOpen ? 0 : 1 }} />
        <motion.span className="block w-4 h-px" style={{ background: RM.VERMILLION }} animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3 : 0 }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-50 flex flex-col justify-start px-8 py-12 overflow-y-auto scrollbar-hide"
              style={{
                background: RM.PARCHMENT,
                borderRight: `2px solid ${RM.GOLD_LEAF}40`,
                boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold mb-6" style={{ color: RM.VERMILLION, opacity: 0.6 }}>
                The Exile's Road
              </p>
              <div className="space-y-0.5">
                {RAMAYANA_SECTIONS.map((section) => {
                  const isActive = section.id === activeSection;
                  const showPhase = section.phase && section.phase !== lastPhase;
                  if (section.phase) lastPhase = section.phase;

                  return (
                    <React.Fragment key={section.id}>
                      {showPhase && (
                        <p className="text-[8px] tracking-[0.25em] uppercase font-body font-semibold pt-4 pb-1 px-3" style={{ color: RM.GOLD_DIM, opacity: 0.6 }}>
                          {section.phase}
                        </p>
                      )}
                      <button
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-3 py-1.5 rounded-lg text-xs font-body transition-all',
                          isActive ? 'font-semibold' : 'opacity-50 hover:opacity-80'
                        )}
                        style={{ color: isActive ? RM.VERMILLION : RM.INK }}
                      >
                        <span>{section.label}</span>
                        {section.year && (
                          <span className="ml-2 text-[9px] opacity-50">{section.year}</span>
                        )}
                      </button>
                    </React.Fragment>
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
