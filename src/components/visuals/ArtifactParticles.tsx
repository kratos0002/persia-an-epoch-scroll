import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PARTICLE_SHAPES } from './constantinopleData';

interface ArtifactParticlesProps {
  color?: string;
  count?: number;
}

export const ArtifactParticles: React.FC<ArtifactParticlesProps> = ({
  color = '40 25% 75%',
  count = 20,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      shape: PARTICLE_SHAPES[i % PARTICLE_SHAPES.length],
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {particles.map((p, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.25, 0.15, 0],
              y: [p.y, p.y - 8, p.y - 18, p.y - 30],
              rotate: [p.rotation, p.rotation + 15, p.rotation - 10, p.rotation + 20],
            }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <g transform={`translate(${p.x}, ${p.y}) scale(${p.size / 60}) rotate(${p.rotation})`}>
              <path
                d={p.shape}
                fill={`hsl(${color} / 0.4)`}
                stroke={`hsl(${color} / 0.2)`}
                strokeWidth="0.3"
              />
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};
