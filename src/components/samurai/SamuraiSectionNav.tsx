import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAMURAI_SECTIONS } from '@/hooks/useSamuraiScrollSpy';
import { cn } from '@/lib/utils';

interface SamuraiSectionNavProps {
  activeSection: string;
}

const VERMILLION = 'hsl(5, 75%, 50%)';
const INK = 'hsl(25, 20%, 12%)';

export const SamuraiSectionNav = ({ activeSection }: SamuraiSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{
          background: isOpen ? VERMILLION : 'hsl(40, 25%, 92%)',
          border: `1px solid ${isOpen ? VERMILLION : 'hsl(30, 15%, 80%)'}`,
        }}
        aria-label="Toggle navigation"
      >
        <div className="space-y-1">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-4 h-px"
              style={{ background: isOpen ? 'white' : INK }}
              animate={{
                rotate: isOpen && i === 0 ? 45 : isOpen && i === 2 ? -45 : 0,
                y: isOpen && i === 0 ? 5 : isOpen && i === 2 ? -5 : 0,
                opacity: isOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Nav drawer */}
            <motion.nav
              className="fixed top-0 left-0 bottom-0 w-72 z-40 pt-20 px-6 pb-8 overflow-y-auto"
              style={{
                background: 'hsl(40, 25%, 95%)',
                borderRight: '1px solid hsl(30, 15%, 82%)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-6"
                style={{ color: 'hsl(30, 10%, 55%)' }}
              >
                Table of Contents
              </p>

              <div className="space-y-1">
                {SAMURAI_SECTIONS.map(section => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-sm font-body text-sm transition-all flex items-center gap-3',
                      )}
                      style={{
                        background: isActive ? 'hsl(5, 75%, 50% / 0.08)' : 'transparent',
                        color: isActive ? VERMILLION : INK,
                        fontWeight: isActive ? 700 : 400,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: isActive ? VERMILLION : 'hsl(30, 10%, 75%)' }}
                      />
                      <span className="truncate">{section.label}</span>
                      {section.year && (
                        <span className="ml-auto text-[10px] font-display" style={{ color: 'hsl(30, 10%, 60%)' }}>
                          {section.year}
                        </span>
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
