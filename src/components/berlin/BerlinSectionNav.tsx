import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BERLIN_SECTIONS } from '@/hooks/useBerlinScrollSpy';
import { BL } from '@/components/visuals/berlinMapData';
import { cn } from '@/lib/utils';

interface BerlinSectionNavProps {
  activeSection: string;
}

export const BerlinSectionNav = ({ activeSection }: BerlinSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? BL.RED_WAX : BL.MUTED }}
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
        />
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? BL.RED_WAX : BL.MUTED }}
          animate={{ opacity: isOpen ? 0 : 1 }}
        />
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? BL.RED_WAX : BL.MUTED }}
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-[58] overflow-y-auto py-20 px-6"
              style={{ background: BL.PRUSSIAN, borderRight: `1px solid ${BL.GRID_BLUE}33` }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: BL.GRID_BLUE }}>
                The Architecture of Partition
              </p>
              <div className="flex flex-col gap-1">
                {BERLIN_SECTIONS.map(section => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={cn(
                        'text-left px-3 py-2.5 rounded-lg font-body text-sm transition-colors',
                        isActive ? 'font-semibold' : 'opacity-60 hover:opacity-80'
                      )}
                      style={{
                        color: isActive ? BL.RED_WAX : BL.VELLUM,
                        background: isActive ? `${BL.RED_WAX}15` : 'transparent',
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span>{section.label}</span>
                        {section.year && (
                          <span className="text-xs opacity-50">{section.year}</span>
                        )}
                      </span>
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
