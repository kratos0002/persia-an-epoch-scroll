import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { Stamp } from './SeamSystem';

const ENCLAVES_DATA = {
  total: 162,
  indianInBangladesh: 111,
  bangladeshInIndia: 51,
  resolvedYear: 2015,
};

export const LivingBorderSection = () => (
  <section className="relative py-24 md:py-32 radcliffe-bg radcliffe-survey-grid radcliffe-grain overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-40">
      <RevealOnScroll>
        <Stamp>Living Border</Stamp>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-4">
          Disputes & Enclaves
        </h2>
        <p className="font-survey text-[0.75rem] text-radcliffe-grid mb-12 max-w-2xl">
          The Radcliffe Award's ambiguities continue to shape South Asian geopolitics. Many territorial disputes trace directly to 1947.
        </p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Enclaves */}
        <RevealOnScroll>
          <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-6">
            <h3 className="font-display text-xl font-bold text-radcliffe-ink mb-4">The Enclaves</h3>
            <div className="relative h-48 mb-4">
              {/* Dot map of enclaves */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Simplified border region */}
                <rect x="20" y="20" width="160" height="160" fill="none" stroke="hsl(215 30% 62% / 0.15)" strokeWidth="0.5" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(355 70% 45% / 0.3)" strokeWidth="1" />
                {/* Indian enclaves in Bangladesh (right side) */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <circle
                    key={`ie${i}`}
                    cx={110 + (i % 5) * 12 + Math.sin(i) * 5}
                    cy={30 + Math.floor(i / 5) * 35 + Math.cos(i) * 8}
                    r="3"
                    fill="hsl(30 85% 55% / 0.6)"
                  />
                ))}
                {/* Bangladeshi enclaves in India (left side) */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <circle
                    key={`be${i}`}
                    cx={30 + (i % 4) * 16 + Math.cos(i) * 5}
                    cy={40 + Math.floor(i / 4) * 45 + Math.sin(i) * 8}
                    r="3"
                    fill="hsl(150 45% 30% / 0.6)"
                  />
                ))}
              </svg>
            </div>
            <div className="font-survey text-[0.7rem] text-radcliffe-ink/70 space-y-1">
              <p><span className="text-radcliffe-saffron font-bold">{ENCLAVES_DATA.indianInBangladesh}</span> Indian enclaves in Bangladesh</p>
              <p><span className="text-radcliffe-green font-bold">{ENCLAVES_DATA.bangladeshInIndia}</span> Bangladeshi enclaves in India</p>
              <p className="text-radcliffe-grid mt-3">Resolved: Land Boundary Agreement, {ENCLAVES_DATA.resolvedYear}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-radcliffe-grid/15">
              <p className="font-survey text-[0.6rem] text-radcliffe-violet uppercase tracking-widest mb-1">Tin Bigha Corridor</p>
              <p className="font-survey text-[0.65rem] text-radcliffe-ink/70 leading-relaxed">
                A 178m × 85m strip of Indian land, leased to Bangladesh in 1992, providing the only access to the Dahagram-Angarpota enclave. A corridor born of cartographic absurdity.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Sir Creek */}
        <RevealOnScroll delay={0.15}>
          <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-6">
            <h3 className="font-display text-xl font-bold text-radcliffe-ink mb-4">Sir Creek</h3>
            <div className="relative h-48 mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Estuary shape */}
                <path d="M40,180 Q60,120 80,80 Q100,40 120,30" fill="none" stroke="hsl(185 40% 38% / 0.4)" strokeWidth="8" strokeLinecap="round" />
                {/* India's claim: mid-channel */}
                <path d="M40,180 Q60,120 80,80 Q100,40 120,30" fill="none" stroke="hsl(30 85% 55% / 0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
                {/* Pakistan's claim: eastern bank */}
                <path d="M44,180 Q64,118 84,78 Q104,38 124,28" fill="none" stroke="hsl(150 45% 30% / 0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="130" y="30" className="font-survey text-[6px] fill-radcliffe-ink/50">96 km</text>
                <text x="60" y="60" className="font-survey text-[5px] fill-radcliffe-saffron/70">India: mid-channel</text>
                <text x="80" y="100" className="font-survey text-[5px] fill-radcliffe-green/70">Pakistan: east bank</text>
              </svg>
            </div>
            <p className="font-survey text-[0.7rem] text-radcliffe-ink/70">
              A 96km tidal estuary in the Rann of Kutch. Radcliffe failed to provide definitive demarcation. Dispute over maritime boundaries and offshore resources continues.
            </p>
            <div className="mt-4 pt-3 border-t border-radcliffe-grid/15 border-l-2 border-l-radcliffe-teal/30 pl-3">
              <p className="font-body italic text-[0.65rem] text-radcliffe-ink/60 leading-relaxed">
                "Rivers change their course. They are unsuitable for use as fixed boundaries."
              </p>
              <p className="font-survey text-[0.5rem] text-radcliffe-grid mt-1">
                — Field Marshal Auchinleck, Commander-in-Chief, India
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Historiographical divergence */}
        <RevealOnScroll delay={0.3}>
          <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-6">
            <h3 className="font-display text-xl font-bold text-radcliffe-ink mb-4">Three Perspectives</h3>
            <div className="space-y-4 font-survey text-[0.7rem]">
              <div className="border-l-2 border-radcliffe-saffron pl-3">
                <p className="font-bold text-radcliffe-ink text-[0.6rem] uppercase tracking-widest mb-1">Indian</p>
                <p className="text-radcliffe-ink/70">Tragic but inevitable. Focus on British failure to provide security during transition.</p>
              </div>
              <div className="border-l-2 border-radcliffe-green pl-3">
                <p className="font-bold text-radcliffe-ink text-[0.6rem] uppercase tracking-widest mb-1">Pakistani</p>
                <p className="text-radcliffe-ink/70">The award was unjust — a British-Congress conspiracy to cripple Pakistan at birth.</p>
              </div>
              <div className="border-l-2 border-radcliffe-teal pl-3">
                <p className="font-bold text-radcliffe-ink text-[0.6rem] uppercase tracking-widest mb-1">Bangladeshi</p>
                <p className="text-radcliffe-ink/70">Arbitrary boundary ignoring linguistic and cultural unity. Led to 1971 war.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);
