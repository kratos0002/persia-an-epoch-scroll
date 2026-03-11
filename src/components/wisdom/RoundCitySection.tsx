import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';
const WISDOM_GOLD = '43 85% 55%';

export const RoundCitySection = () => (
  <section id="round-city" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 50% 50%, hsl(${WISDOM_TEAL} / 0.08) 0%, transparent 70%)`,
      }} />
      <RevealOnScroll className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>762 CE</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
          The Round City
        </h2>
        <p className="text-foreground/70 text-xl font-body leading-relaxed mb-4">
          Caliph al-Mansur built Baghdad as a perfect circle — a city designed from scratch to be the center of the world.
        </p>
        <p className="text-foreground/50 text-lg font-body leading-relaxed">
          100,000 workers. Four years. The result: the most advanced city on Earth.
        </p>
      </RevealOnScroll>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Round City SVG visualization */}
      <RevealOnScroll className="flex justify-center">
        <svg viewBox="0 0 400 400" className="w-72 h-72 md:w-96 md:h-96">
          <defs>
            <radialGradient id="rc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`hsl(${WISDOM_GOLD})`} stopOpacity="0.12" />
              <stop offset="100%" stopColor={`hsl(${WISDOM_GOLD})`} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="url(#rc-glow)" />
          {/* Concentric circles representing the Round City */}
          {[160, 120, 80, 30].map((r, i) => (
            <circle key={i} cx="200" cy="200" r={r} fill="none" stroke={`hsl(${WISDOM_TEAL})`}
              strokeWidth={i === 0 ? 2 : 1} opacity={0.3 + i * 0.15} />
          ))}
          {/* Four gates */}
          {[0, 90, 180, 270].map(angle => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 120;
            const y1 = 200 + Math.sin(rad) * 120;
            const x2 = 200 + Math.cos(rad) * 165;
            const y2 = 200 + Math.sin(rad) * 165;
            return (
              <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`hsl(${WISDOM_GOLD})`} strokeWidth={2} opacity={0.6} />
            );
          })}
          {/* Center — the palace */}
          <circle cx="200" cy="200" r="10" fill={`hsl(${WISDOM_GOLD})`} opacity={0.5} />
          {/* Gate labels */}
          <text x="200" y="25" textAnchor="middle" fill={`hsl(${WISDOM_GOLD})`} fontSize="9" opacity="0.5" fontFamily="'Cormorant Garamond', serif">Khorasan Gate</text>
          <text x="200" y="390" textAnchor="middle" fill={`hsl(${WISDOM_GOLD})`} fontSize="9" opacity="0.5" fontFamily="'Cormorant Garamond', serif">Kufa Gate</text>
          <text x="15" y="205" textAnchor="start" fill={`hsl(${WISDOM_GOLD})`} fontSize="9" opacity="0.5" fontFamily="'Cormorant Garamond', serif">Syria Gate</text>
          <text x="385" y="205" textAnchor="end" fill={`hsl(${WISDOM_GOLD})`} fontSize="9" opacity="0.5" fontFamily="'Cormorant Garamond', serif">Basra Gate</text>
        </svg>
      </RevealOnScroll>

      <RevealOnScroll className="text-center">
        <p className="text-foreground/60 font-body text-lg leading-relaxed max-w-xl mx-auto">
          Three concentric walls. A mosque and palace at the center. Four gates named after the provinces they faced. Baghdad was not just a city — it was a statement.
        </p>
      </RevealOnScroll>

      <RevealOnScroll className="flex justify-center gap-12">
        <AnimatedCounter end={1000000} suffix="+" label="Population at peak" className="text-[hsl(170,45%,50%)]" />
        <AnimatedCounter end={100000} label="Workers to build it" className="text-[hsl(170,45%,50%)]" />
      </RevealOnScroll>
    </div>

    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="786 CE" label="The Collecting Begins" />
  </section>
);
