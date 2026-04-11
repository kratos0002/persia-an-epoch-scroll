import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NM } from './nutmegTheme';

export const LogSpine = () => {
  const { scrollYProgress } = useScroll();
  
  // Spine darkens as you scroll
  const spineOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.6, 0.8, 1, 0.5]);

  return (
    <div className="fixed left-0 top-0 h-full z-40 hidden md:block" style={{ width: '32px' }}>
      {/* Leather binding */}
      <motion.div
        className="w-full h-full"
        style={{
          background: `linear-gradient(180deg, 
            ${NM.SPINE_LIGHT} 0%, 
            ${NM.TIMBER} 30%, 
            ${NM.SPINE_DARK} 55%, 
            ${NM.BLOOD}88 70%, 
            ${NM.SPINE_DARK} 85%, 
            ${NM.TIMBER}88 100%
          )`,
          opacity: spineOpacity,
          boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
        }}
      />

      {/* Stitching line */}
      <div className="absolute left-[10px] top-0 h-full w-px" style={{ background: 'rgba(180, 140, 80, 0.2)' }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[8px] -left-[1px]"
            style={{
              top: `${i * 1.7}%`,
              background: i % 2 === 0 ? 'rgba(180, 140, 80, 0.25)' : 'transparent',
              borderRadius: '1px',
            }}
          />
        ))}
      </div>

      {/* Right edge shadow */}
      <div
        className="absolute right-0 top-0 h-full"
        style={{
          width: '8px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15))',
        }}
      />
    </div>
  );
};
