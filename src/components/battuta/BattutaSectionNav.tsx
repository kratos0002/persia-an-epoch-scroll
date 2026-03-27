import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BATTUTA_SECTIONS } from '@/hooks/useBattutaScrollSpy';
import { IB } from '@/components/visuals/battutaMapData';
import { cn } from '@/lib/utils';
import { CompassRose } from './CompassRose';

interface BattutaSectionNavProps {
  activeSection: string;
}

/**
 * Section nav drawer styled as a table of contents from a bound atlas.
 */
export const BattutaSectionNav = ({ activeSection }: BattutaSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
              className="fixed top-0 left-0 h-full w-80 z-40 overflow-y-auto py-16 px-8"
              style={{
                background: `linear-gradient(180deg, ${IB.LEATHER}, hsl(25, 40%, 18%))`,
                boxShadow: '4px 0 30px rgba(0,0,0,0.3)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Atlas title cartouche */}
              <div className="text-center mb-8 pb-6" style={{ borderBottom: `1px solid ${IB.SAFFRON}30` }}>
                <CompassRose size={28} color={IB.SAFFRON} opacity={0.6} className="mx-auto mb-3" />
                <p className="text-[9px] tracking-[0.35em] uppercase font-body font-semibold mb-1" style={{ color: IB.SAFFRON }}>
                  Table of Contents
                </p>
                <p className="font-display text-lg font-bold" style={{ color: IB.PARCHMENT }}>
                  The Global Odyssey
                </p>
                <p className="font-body text-[10px] italic" style={{ color: IB.SAND, opacity: 0.6 }}>
                  of Ibn Battuta · 1325–1354
                </p>
              </div>

              {/* Section entries as atlas index */}
              <div className="space-y-0.5">
                {BATTUTA_SECTIONS.map((section, i) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      className={cn(
                        "w-full text-left py-2 px-3 transition-colors font-body text-sm flex items-center gap-3",
                        isActive ? 'font-semibold' : 'opacity-50 hover:opacity-80'
                      )}
                      style={{
                        color: isActive ? IB.SAFFRON : IB.PARCHMENT,
                        background: isActive ? `${IB.SAFFRON}12` : 'transparent',
                        borderLeft: isActive ? `2px solid ${IB.SAFFRON}` : '2px solid transparent',
                      }}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                    >
                      {/* Page number */}
                      <span className="text-[9px] tracking-wider w-8 flex-shrink-0 text-right font-mono" style={{ color: IB.SAND, opacity: 0.5 }}>
                        {section.year || String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Dotted leader */}
                      <span className="flex-1 overflow-hidden">
                        <span className="relative">
                          {section.label}
                          <span className="absolute bottom-0 left-0 right-0 h-px opacity-20"
                            style={{ background: `repeating-linear-gradient(90deg, ${IB.SAND} 0 2px, transparent 2px 6px)` }} />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer ornament */}
              <div className="mt-8 pt-6 text-center" style={{ borderTop: `1px solid ${IB.SAFFRON}20` }}>
                <CompassRose size={20} color={IB.SAFFRON} opacity={0.3} className="mx-auto" />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
