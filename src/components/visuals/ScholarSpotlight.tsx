import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import scholarKhwarizmi from '@/assets/scholar-khwarizmi.jpg';
import scholarKindi from '@/assets/scholar-kindi.jpg';
import scholarRazi from '@/assets/scholar-razi.jpg';
import scholarHaytham from '@/assets/scholar-haytham.png';

interface Scholar {
  name: string;
  field: string;
  years: string;
  icon: string;
  accentHue: number;
  portrait?: string;
}

const SCHOLARS: Scholar[] = [
  { name: 'al-Khwārizmī', field: 'Mathematics', years: 'c. 780–850', icon: '∑', accentHue: 170, portrait: scholarKhwarizmi },
  { name: 'al-Kindī', field: 'Cryptanalysis', years: 'c. 801–873', icon: '⌘', accentHue: 200, portrait: scholarKindi },
  { name: 'Banū Mūsā', field: 'Engineering', years: 'c. 803–873', icon: '⚙', accentHue: 30 },
  { name: 'al-Rāzī', field: 'Medicine', years: 'c. 854–925', icon: '✦', accentHue: 150, portrait: scholarRazi },
  { name: 'Ibn al-Haytham', field: 'Optics', years: 'c. 965–1040', icon: '◉', accentHue: 215, portrait: scholarHaytham },
];

interface ScholarSpotlightProps {
  activeStep: number;
  className?: string;
}

export const ScholarSpotlight = ({ activeStep, className }: ScholarSpotlightProps) => {
  const scholar = SCHOLARS[Math.min(activeStep, SCHOLARS.length - 1)];
  const accent = `hsl(${scholar.accentHue}, 45%, 45%)`;
  const accentDim = `hsl(${scholar.accentHue}, 40%, 30%)`;
  const accentGlow = `hsl(${scholar.accentHue}, 50%, 50%)`;

  return (
    <div className={cn("w-full h-full flex items-center justify-center relative overflow-hidden", className)}>
      {/* Radial background shift */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scholar.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse at 60% 50%, ${accentDim}15 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* Scholar display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scholar.name}
          className="relative z-10 text-center select-none flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Portrait medallion */}
          {scholar.portrait ? (
            <motion.div
              className="relative mb-6 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
              style={{
                boxShadow: `0 0 40px ${accentGlow}30, 0 0 80px ${accentGlow}15`,
                border: `2px solid ${accentGlow}40`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <img
                src={scholar.portrait}
                alt={`Portrait of ${scholar.name}`}
                className="w-full h-full object-cover"
                style={{
                  filter: `sepia(0.3) hue-rotate(${scholar.accentHue - 40}deg) saturate(0.7) brightness(0.85) contrast(1.1)`,
                }}
              />
              {/* Radial fade overlay */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, transparent 50%, ${accentDim} 100%)`,
                }}
              />
            </motion.div>
          ) : (
            /* Icon fallback when no portrait */
            <motion.div
              className="text-7xl md:text-9xl mb-6 leading-none"
              style={{ color: accentGlow }}
              animate={{
                textShadow: [
                  `0 0 20px ${accentGlow}40`,
                  `0 0 40px ${accentGlow}60`,
                  `0 0 20px ${accentGlow}40`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {scholar.icon}
            </motion.div>
          )}

          {/* Small icon below portrait */}
          {scholar.portrait && (
            <motion.div
              className="text-3xl md:text-4xl mb-4 leading-none"
              style={{ color: accentGlow }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {scholar.icon}
            </motion.div>
          )}

          {/* Name */}
          <h3
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-none"
            style={{ color: accent }}
          >
            {scholar.name}
          </h3>

          {/* Field + years */}
          <p
            className="text-sm md:text-base tracking-[0.2em] uppercase font-body"
            style={{ color: `${accent}99` }}
          >
            {scholar.field} · {scholar.years}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Decorative ring */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <AnimatePresence mode="wait">
          <motion.circle
            key={scholar.name}
            cx="480" cy="300" r="180"
            fill="none"
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.15"
            initial={{ r: 100, opacity: 0 }}
            animate={{ r: 180, opacity: 0.15 }}
            exit={{ r: 220, opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </svg>
    </div>
  );
};
