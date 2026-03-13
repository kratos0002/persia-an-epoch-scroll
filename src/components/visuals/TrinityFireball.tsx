import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(50, 90%, 55%)';
const FLASH = 'hsl(45, 100%, 85%)';
const ORANGE = 'hsl(25, 95%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';

const BLAST_RADII = [
  { label: 'Fireball', radius: 0.08, color: URANIUM },
  { label: 'Total destruction', radius: 0.2, color: ORANGE },
  { label: 'Severe damage', radius: 0.35, color: 'hsl(15, 80%, 40%)' },
  { label: 'Moderate damage', radius: 0.55, color: 'hsl(0, 50%, 30%)' },
];

interface Props {
  activeStep: number;
}

export const TrinityFireball = ({ activeStep }: Props) => {
  // Step 0: Einstein's letter (small atom icon)
  // Step 1: Los Alamos (growing core)
  // Step 2: Trinity flash (fireball + shockwave)
  // Step 3: Blast radii comparison

  const fireballScale = activeStep === 0 ? 0.05 : activeStep === 1 ? 0.15 : activeStep >= 2 ? 0.6 : 0.05;
  const showShockwaves = activeStep >= 2;
  const showRadii = activeStep >= 3;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${URANIUM}40 0%, transparent 70%)`,
        }}
        animate={{
          width: activeStep >= 2 ? '120%' : '20%',
          height: activeStep >= 2 ? '120%' : '20%',
          opacity: activeStep >= 1 ? 0.6 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <svg viewBox="0 0 400 400" className="w-full max-w-[500px] h-auto relative z-10">
        {/* Grid lines for blast radii step */}
        <AnimatePresence>
          {showRadii && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[...Array(20)].map((_, i) => (
                <React.Fragment key={i}>
                  <line x1={i * 20} y1={0} x2={i * 20} y2={400} stroke={STEEL} strokeWidth={0.3} />
                  <line x1={0} y1={i * 20} x2={400} y2={i * 20} stroke={STEEL} strokeWidth={0.3} />
                </React.Fragment>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Blast radii circles */}
        <AnimatePresence>
          {showRadii && BLAST_RADII.slice().reverse().map((ring, i) => (
            <motion.g key={ring.label}>
              <motion.circle
                cx={200}
                cy={200}
                fill={`${ring.color}15`}
                stroke={ring.color}
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: ring.radius * 200, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
              />
              <motion.text
                x={200 + ring.radius * 200 + 5}
                y={200 - 4}
                fill={ring.color}
                fontSize={7}
                fontFamily="var(--font-body)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                {ring.label}
              </motion.text>
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Shockwave rings */}
        {showShockwaves && !showRadii && [1, 2, 3].map(i => (
          <motion.circle
            key={`shock-${i}`}
            cx={200}
            cy={200}
            fill="none"
            stroke={FLASH}
            strokeWidth={1.5}
            initial={{ r: 10, opacity: 0.8 }}
            animate={{ r: 200, opacity: 0 }}
            transition={{
              duration: 3,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Core fireball */}
        <motion.circle
          cx={200}
          cy={200}
          fill={activeStep >= 2 ? URANIUM : GEIGER}
          animate={{
            r: fireballScale * 200,
            opacity: activeStep === 0 ? 0.4 : 1,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: activeStep >= 2 ? 'url(#fireball-glow)' : 'none',
          }}
        />

        {/* Inner white-hot core */}
        {activeStep >= 2 && (
          <motion.circle
            cx={200}
            cy={200}
            fill={FLASH}
            initial={{ r: 0 }}
            animate={{ r: fireballScale * 80 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}

        {/* Einstein atom icon for step 0 */}
        {activeStep === 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {[0, 60, 120].map(angle => (
              <motion.ellipse
                key={angle}
                cx={200}
                cy={200}
                rx={40}
                ry={14}
                fill="none"
                stroke={GEIGER}
                strokeWidth={1}
                opacity={0.6}
                transform={`rotate(${angle} 200 200)`}
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ duration: 8 + angle / 30, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />
            ))}
          </motion.g>
        )}

        {/* Glow filter */}
        <defs>
          <filter id="fireball-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Step labels */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: STEEL }}>
          {activeStep === 0 && 'August 2, 1939 — Einstein\'s Letter'}
          {activeStep === 1 && 'Los Alamos Laboratory'}
          {activeStep === 2 && 'July 16, 1945 — 05:29:45'}
          {activeStep === 3 && 'Blast Radii — 21 Kilotons'}
        </p>
      </motion.div>
    </div>
  );
};
