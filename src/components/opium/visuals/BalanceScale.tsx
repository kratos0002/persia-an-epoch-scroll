import React from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const BalanceScale = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const tilt = useSpring(0, { stiffness: 30, damping: 20 });
  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => tilt.set(-12), 500);
      return () => clearTimeout(timer);
    }
  }, [inView, tilt]);

  const beamRotate = useTransform(tilt, v => `rotate(${v}deg)`);

  return (
    <div ref={ref} className="relative mx-auto max-w-lg py-4">
      <svg viewBox="0 0 500 340" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
        {/* Fulcrum */}
        <polygon points="250,290 235,320 265,320" fill="hsl(var(--ledger-ink))" opacity="0.8" />
        <line x1="250" y1="155" x2="250" y2="290" stroke="hsl(var(--ledger-ink))" strokeWidth="3" />

        {/* Beam with spring-animated tilt */}
        <motion.g style={{ transformOrigin: '250px 155px', rotate: beamRotate }}>
          <line x1="60" y1="155" x2="440" y2="155" stroke="hsl(var(--ledger-ink))" strokeWidth="3.5" />

          {/* Tea pan (left — goes up) */}
          <g>
            <line x1="100" y1="155" x2="100" y2="195" stroke="hsl(var(--ledger-tea))" strokeWidth="1.5" />
            <line x1="60" y1="195" x2="140" y2="195" stroke="hsl(var(--ledger-tea))" strokeWidth="1.5" />
            <rect x="60" y="195" width="80" height="55" rx="3" fill="hsl(var(--ledger-tea) / 0.1)" stroke="hsl(var(--ledger-tea))" strokeWidth="1.5" />
            <text x="100" y="218" textAnchor="middle" fill="hsl(var(--ledger-tea))" fontSize="12" fontWeight="700">TEA</text>
            <text x="100" y="236" textAnchor="middle" fill="hsl(var(--ledger-tea) / 0.6)" fontSize="9">£ value falling</text>
          </g>

          {/* Opium pan (right — goes down) */}
          <g>
            <line x1="400" y1="155" x2="400" y2="195" stroke="hsl(var(--ledger-resin))" strokeWidth="1.5" />
            <line x1="360" y1="195" x2="440" y2="195" stroke="hsl(var(--ledger-resin))" strokeWidth="1.5" />
            <rect x="360" y="195" width="80" height="55" rx="3" fill="hsl(var(--ledger-resin) / 0.15)" stroke="hsl(var(--ledger-resin))" strokeWidth="1.5" />
            <text x="400" y="218" textAnchor="middle" fill="hsl(var(--ledger-resin))" fontSize="12" fontWeight="700">OPIUM</text>
            <text x="400" y="236" textAnchor="middle" fill="hsl(var(--ledger-resin) / 0.7)" fontSize="9">£ value rising</text>
          </g>
        </motion.g>

        {/* Silver reversal arrows */}
        <defs>
          <marker id="arrowRev" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--ledger-silver))" />
          </marker>
        </defs>
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          {/* Old direction (faded) */}
          <line x1="310" y1="60" x2="400" y2="60" stroke="hsl(var(--ledger-silver) / 0.2)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowRev)" />
          <text x="355" y="52" textAnchor="middle" fill="hsl(var(--ledger-silver) / 0.3)" fontSize="8">BEFORE: Britain → China</text>

          {/* New direction (bold) */}
          <line x1="400" y1="85" x2="310" y2="85" stroke="hsl(var(--ledger-silver))" strokeWidth="2" markerEnd="url(#arrowRev)" />
          <text x="355" y="77" textAnchor="middle" fill="hsl(var(--ledger-silver))" fontSize="9" fontWeight="700">AFTER: China → Britain</text>
        </motion.g>

        {/* Year marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2.2 }}
        >
          <rect x="210" y="108" width="80" height="28" rx="3" fill="hsl(var(--ledger-resin))" />
          <text x="250" y="127" textAnchor="middle" fill="hsl(var(--ledger-cream))" fontSize="14" fontWeight="700">1819</text>
        </motion.g>
      </svg>
    </div>
  );
};
