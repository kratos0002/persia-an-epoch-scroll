import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BATTUTA_SECTIONS } from '@/hooks/useBattutaScrollSpy';
import { IB } from '@/components/visuals/battutaMapData';
import { cn } from '@/lib/utils';

interface BattutaSectionNavProps {
  activeSection: string;
}

export const BattutaSectionNav = ({ activeSection }: BattutaSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors"
        style={{
          background: isOpen ? `${IB.LEATHER}e0` : `${IB.LEATHER}90`,
          border: `1px solid ${IB.SAFFRON}40`,
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <div className="flex flex-col gap-1">
          <motion.div className="w-4 h-px" style={{ background: IB.SAFFRON }}
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3 : 0 }} />
          <motion.div className="w-4 h-px" style={{ background: IB.SAFFRON }}
            animate={{ opacity: isOpen ? 0 : 1 }} />
          <motion.div className="w-4 h-px" style={{ background: IB.SAFFRON }}
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3 : 0 }} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-40 overflow-y-auto py-20 px-6"
              style={{ background: IB.LEATHER }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold mb-6" style={{ color: IB.SAFFRON }}>
                The Global Odyssey
              </p>
              <div className="space-y-1">
                {BATTUTA_SECTIONS.map(section => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      className={cn(
                        "w-full text-left py-2.5 px-3 rounded transition-colors font-body text-sm flex items-center gap-3",
                        isActive ? 'font-semibold' : 'opacity-60 hover:opacity-80'
                      )}
                      style={{
                        color: isActive ? IB.SAFFRON : IB.PARCHMENT,
                        background: isActive ? `${IB.SAFFRON}15` : 'transparent',
                      }}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                    >
                      {section.year && (
                        <span className="text-[9px] tracking-wider w-8 flex-shrink-0" style={{ color: IB.SAND }}>
                          {section.year}
                        </span>
                      )}
                      <span>{section.label}</span>
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
