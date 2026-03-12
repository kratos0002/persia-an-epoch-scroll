import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DigSectionProps {
  id: string;
  color: string; // HSL values
  earthColor: string;
  depth: number;
  children: React.ReactNode;
}

export const DigSection: React.FC<DigSectionProps> = ({ id, color, earthColor, depth, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Clip-path reveal: circle expands from center as section scrolls into view
  const clipRadius = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 50, 150]);
  const clipPath = useTransform(clipRadius, (r) => `circle(${r}% at 50% 50%)`);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.5, 1]);

  return (
    <section
      id={id}
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{ background: `hsl(${earthColor})` }}
    >
      {/* Earth texture grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Revealed content with clip-path wipe */}
      <motion.div
        className="relative z-10 min-h-screen"
        style={{
          clipPath,
          opacity,
          background: `linear-gradient(180deg, hsl(${color} / 0.95) 0%, hsl(${color}) 40%, hsl(${earthColor}) 100%)`,
        }}
      >
        {children}
      </motion.div>

      {/* Depth marker */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold px-2 py-1 rounded"
          style={{ color: `hsl(${color})`, background: `hsl(${earthColor} / 0.8)` }}
        >
          {depth}m below surface
        </span>
      </div>
    </section>
  );
};
