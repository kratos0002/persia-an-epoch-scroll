import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

interface SectionNavProps {
  activeSection: string;
}

const eraColors: Record<string, string> = {
  hero: 'bg-persian-gold/20',
  cyrus: 'bg-persian-gold/20',
  pasargadae: 'bg-persian-gold/20',
  darius: 'bg-persian-gold/20',
  'persian-wars': 'bg-persian-gold/20',
  alexander: 'bg-persian-purple/20',
  parthian: 'bg-persian-crimson/20',
  sassanid: 'bg-persian-crimson/20',
  'islamic-conquest': 'bg-persian-emerald/20',
  'golden-age': 'bg-persian-emerald/20',
  mongol: 'bg-persian-terracotta/20',
  safavid: 'bg-persian-blue/20',
  modern: 'bg-muted/40',
  epilogue: 'bg-persian-gold/20',
};

export const SectionNav = ({ activeSection }: SectionNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Toggle navigation"
      >
        <motion.div className="flex flex-col gap-1 items-center" animate={isOpen ? "open" : "closed"}>
          <motion.span
            className="block w-4 h-px bg-persian-cream/70"
            variants={{ open: { rotate: 45, y: 2.5 }, closed: { rotate: 0, y: 0 } }}
          />
          <motion.span
            className="block w-4 h-px bg-persian-cream/70"
            variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
          />
          <motion.span
            className="block w-4 h-px bg-persian-cream/70"
            variants={{ open: { rotate: -45, y: -2.5 }, closed: { rotate: 0, y: 0 } }}
          />
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-background/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed left-0 top-0 bottom-0 z-[58] w-80 max-w-[85vw] bg-card/95 backdrop-blur-md border-r border-border/30 overflow-y-auto"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6 pt-20">
                <p className="text-xs tracking-[0.3em] uppercase text-persian-gold/50 mb-6 font-body">Table of Contents</p>
                <div className="space-y-1">
                  {SECTIONS.map((section, i) => {
                    const isActive = section.id === activeSection;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                          isActive
                            ? `${eraColors[section.id]} text-foreground`
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                        )}
                      >
                        <span className={cn(
                          "w-2 h-2 rounded-full shrink-0 transition-colors",
                          isActive ? "bg-persian-gold" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm font-semibold truncate">{section.label}</p>
                          {section.year && (
                            <p className="text-xs text-muted-foreground/60 font-body">{section.year}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-border/20">
                  <p className="text-xs text-muted-foreground/40 font-body">
                    An Epoch Lives Visual Essay
                  </p>
                  <p className="text-xs text-muted-foreground/30 font-body mt-1">
                    Images: Wikimedia Commons (Public Domain)
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
