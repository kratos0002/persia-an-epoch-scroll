import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const RED = 'hsl(0, 65%, 50%)';
const PORT_GREEN = 'hsl(140, 40%, 35%)';

export const PortugalSection = () => {
  return (
    <section id="portugal-seizes" className="relative min-h-screen py-32 px-6" style={{ background: NAVY }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: PORT_GREEN }}>
            1507 — Portugal Seizes the Throat
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            Albuquerque's<br />
            <span style={{ color: RED }}>chokepoint strategy.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In 1507, <strong style={{ color: PARCHMENT }}>Afonso de Albuquerque</strong> sailed into the Strait of Hormuz
            with six ships and a radical idea: you don't need to conquer territory — you need to control
            the <em>passages</em>.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            He identified three chokepoints that controlled all trade between Europe, Africa, and Asia:
            <strong style={{ color: RED }}> Hormuz</strong>,{' '}
            <strong style={{ color: RED }}>Goa</strong>, and{' '}
            <strong style={{ color: RED }}>Malacca</strong>.
            Seize all three, and the Portuguese crown would hold the keys to the world's commerce.
          </p>
        </RevealOnScroll>

        {/* Fort visual */}
        <RevealOnScroll delay={0.6}>
          <div className="my-12 py-10 rounded-xl relative overflow-hidden" style={{
            background: 'hsl(215, 40%, 6%)',
            border: '1px solid hsla(140, 40%, 35%, 0.15)',
          }}>
            <div className="text-center mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: SMOKE }}>
                The Portuguese Fort on Hormuz Island
              </p>
            </div>
            {/* Stylised fortress SVG */}
            <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto px-4" fill="none">
              {/* Island base */}
              <ellipse cx="200" cy="140" rx="180" ry="18" fill="hsl(30, 25%, 25%)" opacity="0.5" />
              {/* Main walls */}
              <rect x="100" y="60" width="200" height="70" rx="2" stroke={PORT_GREEN} strokeWidth="1.5" fill="none" />
              {/* Towers */}
              <rect x="90" y="50" width="30" height="80" rx="2" stroke={PORT_GREEN} strokeWidth="1.5" fill="none" />
              <rect x="280" y="50" width="30" height="80" rx="2" stroke={PORT_GREEN} strokeWidth="1.5" fill="none" />
              {/* Gate */}
              <path d="M185 130 L185 100 Q200 85 215 100 L215 130" stroke={AMBER} strokeWidth="1" fill="none" />
              {/* Flag */}
              <line x1="200" y1="60" x2="200" y2="30" stroke={PARCHMENT} strokeWidth="0.8" />
              <rect x="201" y="30" width="20" height="14" fill={PORT_GREEN} opacity="0.6" />
              <rect x="201" y="37" width="20" height="7" fill={RED} opacity="0.6" />
              {/* Cannons */}
              <circle cx="130" cy="80" r="3" fill={SMOKE} />
              <line x1="133" y1="80" x2="145" y2="78" stroke={SMOKE} strokeWidth="1.5" />
              <circle cx="270" cy="80" r="3" fill={SMOKE} />
              <line x1="267" y1="80" x2="255" y2="78" stroke={SMOKE} strokeWidth="1.5" />
              {/* Water */}
              <path d="M20 145 Q60 138 100 145 Q140 152 180 145 Q220 138 260 145 Q300 152 340 145 Q360 140 380 145" stroke={TEAL} strokeWidth="0.5" opacity="0.3" fill="none" />
            </svg>
            <p className="text-center text-[10px] font-body mt-4 px-4" style={{ color: SMOKE }}>
              Built on barren rock in the strait, the fortress controlled all traffic entering or leaving the Gulf.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            The fortress on Hormuz was built on a barren, waterless island — deliberately chosen because
            it needed no farmland, only cannons pointed at passing ships. Any vessel entering the Gulf
            had to pay tribute or be sunk.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: SMOKE }}>
            Portugal held Hormuz for over a century — from 1507 to 1622, when a joint
            <strong style={{ color: PARCHMENT }}> Safavid-English</strong> force finally expelled them.
            The Safavids reclaimed their coast. The English got trading rights.
            But the lesson was permanent: whoever controls the narrow places controls the wealth.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.9}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: PORT_GREEN }}>
            "Give me Hormuz, Goa, and Malacca, and the world is yours."
          </p>
          <p className="text-center text-xs font-body mt-2" style={{ color: SMOKE }}>
            — Attributed to Afonso de Albuquerque
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
