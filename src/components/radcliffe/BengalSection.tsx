import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { DriftPanel, Stamp, AdminParagraph } from './SeamSystem';
import { BENGAL_DECISIONS } from './radcliffeData';

export const BengalSection = ({ drift }: { drift: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIdx(Math.min(Math.floor(v * BENGAL_DECISIONS.length), BENGAL_DECISIONS.length - 1));
    });
    return unsub;
  }, [scrollYProgress]);

  const decision = BENGAL_DECISIONS[activeIdx];

  return (
    <section ref={ref} className="relative min-h-[280vh] radcliffe-bg radcliffe-grain overflow-hidden">
      <div className="sticky top-0 h-screen flex">
        {/* Left: Delta schematic */}
        <DriftPanel side="left" drift={drift} className="w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <Stamp>Bengal — The Deltaic Divide</Stamp>
            <svg viewBox="0 0 400 400" className="w-full mt-4">
              {/* Rivers */}
              <path d="M50,80 C100,100 150,120 200,140 C250,160 300,200 350,260" fill="none" stroke="hsl(185 40% 38% / 0.5)" strokeWidth="3" />
              <path d="M120,50 C140,90 160,130 180,170 C200,210 220,260 250,320" fill="none" stroke="hsl(185 40% 38% / 0.4)" strokeWidth="2.5" />
              <path d="M200,140 C220,180 240,220 260,280 C280,320 300,350 320,380" fill="none" stroke="hsl(185 40% 38% / 0.3)" strokeWidth="2" />
              {/* Labels */}
              <text x="40" y="75" className="font-survey text-[7px] fill-radcliffe-teal/70">Ganges</text>
              <text x="110" y="45" className="font-survey text-[7px] fill-radcliffe-teal/70">Brahmaputra</text>

              {/* Calcutta */}
              <circle cx="160" cy="280" r="8" fill="hsl(30 85% 55% / 0.4)" stroke="hsl(30 85% 55%)" strokeWidth="1.5" />
              <text x="172" y="284" className="font-survey text-[7px] fill-radcliffe-ink/80">Calcutta</text>

              {/* Murshidabad */}
              <circle cx="140" cy="200" r="6" fill={activeIdx === 1 ? 'hsl(30 85% 55% / 0.5)' : 'hsl(150 45% 30% / 0.3)'} stroke="hsl(215 30% 62% / 0.4)" strokeWidth="1" />
              <text x="155" y="204" className="font-survey text-[6px] fill-radcliffe-ink/60">Murshidabad</text>

              {/* Khulna */}
              <circle cx="230" cy="310" r="6" fill={activeIdx === 2 ? 'hsl(150 45% 30% / 0.5)' : 'hsl(30 85% 55% / 0.3)'} stroke="hsl(215 30% 62% / 0.4)" strokeWidth="1" />
              <text x="245" y="314" className="font-survey text-[6px] fill-radcliffe-ink/60">Khulna</text>

              {/* CHT */}
              <rect x="300" y="180" width="60" height="100" fill={activeIdx === 3 ? 'hsl(150 45% 30% / 0.3)' : 'hsl(215 30% 62% / 0.08)'} stroke="hsl(215 30% 62% / 0.2)" strokeWidth="0.8" />
              <text x="310" y="235" className="font-survey text-[6px] fill-radcliffe-ink/60">CHT</text>

              {/* Sylhet */}
              <circle cx="320" cy="120" r="6" fill="hsl(42 65% 50% / 0.3)" stroke="hsl(215 30% 62% / 0.3)" strokeWidth="1" />
              <text x="332" y="124" className="font-survey text-[6px] fill-radcliffe-ink/60">Sylhet</text>

              {/* Radcliffe Line through Bengal */}
              <motion.path
                d="M100,50 L130,120 L150,180 L160,240 L170,300 L180,360 L200,400"
                fill="none"
                stroke="hsl(355 70% 45%)"
                strokeWidth="2"
                strokeDasharray="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </svg>
          </div>
        </DriftPanel>

        {/* Right: Decision cards */}
        <DriftPanel side="right" drift={drift} className="w-1/2 flex items-center justify-center p-8">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm"
          >
            <p className="font-survey text-[0.55rem] text-radcliffe-teal uppercase tracking-[0.3em] mb-4">
              Bengal Decision {activeIdx + 1} of {BENGAL_DECISIONS.length}
            </p>
            <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-4">{decision.area}</h3>
            <p className="font-survey text-[0.8rem] text-radcliffe-ink/80 leading-relaxed mb-4">{decision.detail}</p>
            <div className={`inline-block px-3 py-1 rounded-sm font-survey text-[0.55rem] uppercase tracking-widest font-bold ${
              decision.type === 'india' ? 'bg-radcliffe-saffron/20 text-radcliffe-saffron' :
              decision.type === 'pakistan' ? 'bg-radcliffe-green/20 text-radcliffe-green' :
              'bg-radcliffe-amber/20 text-radcliffe-amber'
            }`}>
              Awarded to {decision.type === 'split' ? 'Split' : decision.type === 'india' ? 'India' : 'Pakistan'}
            </div>

            {/* Murshidabad-Khulna swap highlight */}
            {(activeIdx === 1 || activeIdx === 2) && (
              <div className="mt-6 border border-radcliffe-grid/20 p-3">
                <p className="font-survey text-[0.6rem] text-radcliffe-violet uppercase tracking-widest mb-2">
                  The "Swap"
                </p>
                <p className="font-survey text-[0.7rem] text-radcliffe-ink/70">
                  Murshidabad (70% Muslim) → India. Khulna (51% Hindu) → Pakistan. "Other factors" overriding demography.
                </p>
              </div>
            )}

            {/* CHT stamp */}
            {activeIdx === 3 && (
              <div className="mt-4">
                <span className="radcliffe-stamp">Geographic Necessity</span>
              </div>
            )}
          </motion.div>
        </DriftPanel>
      </div>
    </section>
  );
};
