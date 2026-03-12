import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONSTANTINOPLE_SECTIONS } from '@/hooks/useConstantinopleScrollSpy';
import { STRATA } from '@/components/visuals/constantinopleData';
import { cn } from '@/lib/utils';

interface ConstantinopleSectionNavProps {
  activeSection: string;
}

export const ConstantinopleSectionNav: React.FC<ConstantinopleSectionNavProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed top-6 left-6 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-6 h-[1.5px] rounded-full"
          style={{ background: 'hsl(40 25% 75%)' }}
          animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="block w-6 h-[1.5px] rounded-full"
          style={{ background: 'hsl(40 25% 75%)' }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="block w-6 h-[1.5px] rounded-full"
          style={{ background: 'hsl(40 25% 75%)' }}
          animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
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
              className="fixed left-0 top-0 bottom-0 z-40 w-72 p-8 pt-20 overflow-y-auto"
              style={{ background: 'hsl(25, 15%, 10%)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold mb-6" style={{ color: 'hsl(40 25% 50%)' }}>
                Strata
              </p>
              <div className="flex flex-col gap-1">
                {CONSTANTINOPLE_SECTIONS.map((section, i) => {
                  const stratum = STRATA[i];
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      className={cn(
                        'text-left px-3 py-2 rounded-lg transition-all font-body text-sm flex items-center gap-3',
                        isActive ? 'font-semibold' : 'opacity-60 hover:opacity-100'
                      )}
                      style={{
                        color: isActive ? `hsl(${stratum?.color || '40 25% 80%'})` : 'hsl(40 25% 70%)',
                        background: isActive ? `hsl(${stratum?.color || '40 25% 80%'} / 0.1)` : 'transparent',
                      }}
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: `hsl(${stratum?.color || '40 25% 50%'})` }}
                      />
                      <span className="flex-1">{section.label}</span>
                      <span className="text-[10px] opacity-50">{section.year}</span>
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
