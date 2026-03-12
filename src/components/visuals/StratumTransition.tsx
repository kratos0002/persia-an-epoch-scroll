import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PARTICLE_SHAPES } from './constantinopleData';

interface StratumTransitionProps {
  fromColor: string;
  toColor: string;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  shape: string;
  delay: number;
}

export const StratumTransition: React.FC<StratumTransitionProps> = ({
  fromColor,
  toColor,
  particleCount = 12,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * 100,
      y: 10 + Math.random() * 80,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      shape: PARTICLE_SHAPES[i % PARTICLE_SHAPES.length],
      delay: Math.random() * 2,
    }));
  }, [particleCount]);

  return (
    <div
      ref={ref}
      className="relative h-32 md:h-48 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, hsl(${fromColor}) 0%, hsl(${toColor}) 100%)`,
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Floating particles */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {particles.map((p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: p.y + 10 }}
              whileInView={{ opacity: [0, 0.4, 0.2, 0], y: [p.y + 10, p.y - 5, p.y - 15, p.y - 30] }}
              viewport={{ once: false }}
              transition={{ duration: 3, delay: p.delay, repeat: Infinity, repeatDelay: 2 }}
            >
              <g transform={`translate(${p.x}, ${p.y}) scale(${p.size / 50}) rotate(${p.rotation})`}>
                <path
                  d={p.shape}
                  fill={`hsl(40 25% 80% / 0.5)`}
                  stroke={`hsl(40 25% 70% / 0.3)`}
                  strokeWidth="0.3"
                />
              </g>
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Horizontal crack lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="5" y1="30" x2="35" y2="32" stroke={`hsl(40 20% 60% / 0.15)`} strokeWidth="0.2" />
        <line x1="60" y1="55" x2="95" y2="53" stroke={`hsl(40 20% 60% / 0.15)`} strokeWidth="0.2" />
        <line x1="20" y1="75" x2="70" y2="77" stroke={`hsl(40 20% 60% / 0.1)`} strokeWidth="0.15" />
      </svg>
    </div>
  );
};
