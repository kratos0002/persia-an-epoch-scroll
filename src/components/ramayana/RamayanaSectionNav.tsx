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

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 hidden md:flex flex-col items-center justify-center w-10 h-10 rounded-full backdrop-blur-md cursor-pointer"
        style={{ background: 'rgba(10,15,25,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
        aria-label="Toggle navigation"
      >
        <motion.span className="block w-4 h-px mb-1" style={{ background: RM.SAFFRON }} animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3 : 0 }} />
        <motion.span className="block w-4 h-px mb-1" style={{ background: RM.SAFFRON }} animate={{ opacity: isOpen ? 0 : 1 }} />
        <motion.span className="block w-4 h-px" style={{ background: RM.SAFFRON }} animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3 : 0 }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-50 flex flex-col justify-center px-8 py-12 overflow-y-auto"
              style={{ background: RM.EARTH }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold mb-6" style={{ color: RM.SAFFRON, opacity: 0.5 }}>
                The Route
              </p>
              <div className="space-y-1">
                {RAMAYANA_SECTIONS.map((section) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-all',
                        isActive ? 'font-semibold' : 'opacity-50 hover:opacity-80'
                      )}
                      style={{ color: isActive ? RM.SAFFRON : RM.SANDSTONE }}
                    >
                      <span>{section.label}</span>
                      {section.year && (
                        <span className="ml-2 text-[10px] opacity-50">{section.year}</span>
                      )}
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
