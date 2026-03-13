import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NUTMEG_SECTIONS } from '@/hooks/useNutmegScrollSpy';
import { cn } from '@/lib/utils';

const SPICE = 'hsl(25, 75%, 45%)';
const OCEAN = 'hsl(210, 40%, 8%)';

interface NutmegSectionNavProps {
  activeSection: string;
}

export const NutmegSectionNav = ({ activeSection }: NutmegSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border backdrop-blur-md transition-colors hidden md:flex"
        style={{
          background: isOpen ? 'rgba(10, 15, 25, 0.95)' : 'rgba(10, 15, 25, 0.7)',
          borderColor: isOpen ? SPICE : 'rgba(255,255,255,0.1)',
        }}
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? SPICE : 'rgba(255,255,255,0.6)' }}
          animate={isOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? SPICE : 'rgba(255,255,255,0.6)' }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? SPICE : 'rgba(255,255,255,0.6)' }}
          animate={isOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-[58] overflow-y-auto py-24 px-6"
              style={{ background: OCEAN, borderRight: `1px solid rgba(255,255,255,0.06)` }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <p className="text-[9px] tracking-[0.4em] uppercase font-body font-semibold mb-8" style={{ color: SPICE }}>
                The Nutmeg Wars
              </p>
              <div className="space-y-1">
                {NUTMEG_SECTIONS.map(section => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-body',
                        isActive
                          ? 'font-semibold'
                          : 'hover:bg-white/5'
                      )}
                      style={{
                        color: isActive ? SPICE : 'rgba(255,255,255,0.5)',
                        background: isActive ? 'rgba(180, 100, 30, 0.1)' : undefined,
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {section.label}
                        {section.year && (
                          <span className="text-[10px] opacity-50">{section.year}</span>
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
