import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NUTMEG_SECTIONS } from '@/hooks/useNutmegScrollSpy';
import { cn } from '@/lib/utils';
import { NM } from './nutmegTheme';

interface NutmegSectionNavProps {
  activeSection: string;
}

export const NutmegSectionNav = ({ activeSection }: NutmegSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-10 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-sm border transition-colors hidden md:flex"
        style={{
          background: isOpen ? NM.CREAM : `${NM.CREAM}dd`,
          borderColor: isOpen ? NM.TIMBER : `${NM.TIMBER}33`,
        }}
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? NM.TIMBER : NM.INK }}
          animate={isOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? NM.TIMBER : NM.INK }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="block w-4 h-px rounded-full"
          style={{ background: isOpen ? NM.TIMBER : NM.INK }}
          animate={isOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-72 z-[58] overflow-y-auto py-24 px-6"
              style={{
                background: NM.CREAM,
                borderRight: `1px solid ${NM.TIMBER}22`,
                boxShadow: '4px 0 20px rgba(0,0,0,0.08)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <p className="text-[9px] tracking-[0.4em] uppercase font-body font-semibold mb-8" style={{ color: NM.AMBER }}>
                Captain's Log
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
                        'w-full text-left px-3 py-2.5 rounded-sm transition-all text-sm font-body',
                        isActive ? 'font-semibold' : ''
                      )}
                      style={{
                        color: isActive ? NM.TIMBER : NM.SMOKE,
                        background: isActive ? `${NM.AMBER}15` : undefined,
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
