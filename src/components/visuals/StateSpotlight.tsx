import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StateSpotlightProps {
  isVisible: boolean;
  title: string;
  year: string;
  description: string;
  color: string;
  side?: 'left' | 'right';
}

export const StateSpotlight: React.FC<StateSpotlightProps> = ({
  isVisible,
  title,
  year,
  description,
  color,
  side = 'right',
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 z-20 max-w-sm ${
          side === 'right' ? 'right-4 md:right-8' : 'left-4 md:left-8'
        }`}
        initial={{ opacity: 0, x: side === 'right' ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: side === 'right' ? 40 : -40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="bg-card/90 backdrop-blur-md border rounded-lg p-5 shadow-xl"
          style={{ borderColor: color }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: color }} />
            <span className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground">
              {year}
            </span>
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
