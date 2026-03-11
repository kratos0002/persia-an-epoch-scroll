import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REBELLION_SECTIONS } from '@/hooks/useRebellionScrollSpy';
import { cn } from '@/lib/utils';

const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';
const NAVY = 'hsl(220, 25%, 8%)';

interface RebellionSectionNavProps {
  activeSection: string;
}

export const RebellionSectionNav = ({ activeSection }: RebellionSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? AMBER : 'hsl(220, 10%, 65%)' }}
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
        />
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? AMBER : 'hsl(220, 10%, 65%)' }}
          animate={{ opacity: isOpen ? 0 : 1 }}
        />
        <motion.span
          className="block w-6 h-[2px] rounded-full"
          style={{ background: isOpen ? AMBER : 'hsl(220, 10%, 65%)' }}
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-[58] overflow-y-auto py-20 px-6"
              style={{ background: NAVY, borderRight: '1px solid hsl(220, 15%, 18%)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: 'hsl(220, 10%, 45%)' }}>
                The Signal and the Fire
              </p>
              <div className="flex flex-col gap-1">
                {REBELLION_SECTIONS.map(section => {
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
                        color: isActive ? AMBER : 'hsl(220, 10%, 70%)',
                        background: isActive ? 'hsl(220, 20%, 14%)' : 'transparent',
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
