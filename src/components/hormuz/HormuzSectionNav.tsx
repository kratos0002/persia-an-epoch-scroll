import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HORMUZ_SECTIONS } from '@/hooks/useHormuzScrollSpy';
import { cn } from '@/lib/utils';

const TEAL = 'hsl(195, 55%, 35%)';
const NAVY = 'hsl(215, 45%, 8%)';

interface HormuzSectionNavProps {
  activeSection: string;
}

export const HormuzSectionNav = ({ activeSection }: HormuzSectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 hidden md:flex flex-col gap-1.5 p-2 rounded-lg transition-colors"
        style={{ background: isOpen ? 'transparent' : 'hsla(215, 45%, 8%, 0.7)', backdropFilter: 'blur(8px)' }}
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-5 h-0.5 rounded-full"
          style={{ background: TEAL }}
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="block w-5 h-0.5 rounded-full"
          style={{ background: TEAL }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="block w-5 h-0.5 rounded-full"
          style={{ background: TEAL }}
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        />
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
              className="fixed top-0 left-0 bottom-0 z-40 w-72 py-20 px-6 overflow-y-auto"
              style={{ background: NAVY, borderRight: `1px solid hsla(195, 55%, 35%, 0.15)` }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <p className="text-[9px] tracking-[0.4em] uppercase font-body font-semibold mb-6" style={{ color: TEAL }}>
                The Strait of Hormuz
              </p>

              <div className="space-y-1">
                {HORMUZ_SECTIONS.map((section) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-md text-sm font-body transition-all flex items-center gap-3',
                        isActive ? 'font-semibold' : 'opacity-50 hover:opacity-80'
                      )}
                      style={{ color: isActive ? TEAL : 'hsl(40, 35%, 88%)' }}
                    >
                      {isActive && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: TEAL }}
                          layoutId="hormuz-nav-dot"
                        />
                      )}
                      <span>{section.label}</span>
                      {section.year && (
                        <span className="ml-auto text-[10px] opacity-50">{section.year}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-[8px] tracking-[0.3em] uppercase font-body mt-10 opacity-30" style={{ color: 'hsl(40, 35%, 88%)' }}>
                An Epoch Lives Visual Essay
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
