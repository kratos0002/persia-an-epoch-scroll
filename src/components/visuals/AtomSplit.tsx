import React from 'react';
import { motion } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(45, 80%, 55%)';

interface AtomSplitProps {
  className?: string;
}

export const AtomSplit = ({ className }: AtomSplitProps) => {
  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 ${className ?? ''}`}>
      {/* Outer orbital rings */}
      {[0, 60, 120].map((rotation, i) => (
        <motion.div
          key={i}
          className="absolute inset-4 rounded-full border"
          style={{
            borderColor: `hsla(140, 70%, 45%, ${0.15 + i * 0.05})`,
            transform: `rotate(${rotation}deg)`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Inner pulsing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 24,
          height: 24,
          background: `radial-gradient(circle, ${URANIUM}, ${GEIGER})`,
          boxShadow: `0 0 40px ${GEIGER}60, 0 0 80px ${GEIGER}30`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          boxShadow: [
            `0 0 40px hsla(140,70%,45%,0.4), 0 0 80px hsla(140,70%,45%,0.2)`,
            `0 0 60px hsla(140,70%,45%,0.6), 0 0 120px hsla(140,70%,45%,0.3)`,
            `0 0 40px hsla(140,70%,45%,0.4), 0 0 80px hsla(140,70%,45%,0.2)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting electrons */}
      {[0, 120, 240].map((offset, i) => (
        <motion.div
          key={`electron-${i}`}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{ background: GEIGER, boxShadow: `0 0 8px ${GEIGER}` }}
          animate={{
            x: [
              Math.cos((offset * Math.PI) / 180) * 80 - 4,
              Math.cos(((offset + 180) * Math.PI) / 180) * 80 - 4,
              Math.cos((offset * Math.PI) / 180) * 80 - 4,
            ],
            y: [
              Math.sin((offset * Math.PI) / 180) * 50 - 4,
              Math.sin(((offset + 180) * Math.PI) / 180) * 50 - 4,
              Math.sin((offset * Math.PI) / 180) * 50 - 4,
            ],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Fission fragments — two particles flying apart */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: URANIUM }}
        animate={{
          x: [-4, -60, -4],
          y: [-4, -30, -4],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: URANIUM }}
        animate={{
          x: [-4, 55, -4],
          y: [-4, 25, -4],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
};
