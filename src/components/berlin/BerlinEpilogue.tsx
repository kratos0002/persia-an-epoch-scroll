import React from 'react';
import { BL, KEY_QUOTES } from '@/components/visuals/berlinMapData';
import { EditionColophon } from '@/components/scroll/EditionColophon';

export const BerlinEpilogue = () => {
  const salisbury = KEY_QUOTES[1];

  return (
    <section id="berlin-epilogue" className="relative py-24 px-6" style={{ background: BL.PRUSSIAN }}>
      {/* Fading survey grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE} 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-2xl mx-auto text-center">
        {/* The Empty Chair — final motif */}
        <div className="flex justify-center mb-8">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={BL.RED_WAX} strokeWidth="1" opacity="0.6">
            <path d="M6 20V14M18 20V14" />
            <path d="M5 14h14" />
            <path d="M6 14V8a1 1 0 011-1h10a1 1 0 011 1v6" />
            <path d="M8 7V5" />
            <path d="M16 7V5" />
          </svg>
        </div>

        <blockquote className="font-body text-lg md:text-xl italic leading-relaxed mb-6" style={{ color: BL.VELLUM }}>
          "{salisbury.text}"
        </blockquote>
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-16" style={{ color: BL.BRASS }}>
          — {salisbury.speaker}, {salisbury.year}
        </p>

        <p className="font-body text-base leading-relaxed mb-6" style={{ color: BL.GRID_BLUE }}>
          The "blank spaces" on the 1884 maps were never truly empty.
          They were filled with civilizations that were dismantled to build a global order
          that is still coming to terms with its foundation in the Wilhelmstrasse.
        </p>

        <p className="font-body text-sm leading-relaxed" style={{ color: BL.MUTED }}>
          The Scramble for Africa was not a singular event but the initiation of a systemic
          realignment that continues to manifest in the structural violence of the present.
          Understanding it is not merely an exercise in historical retrieval — it is a necessary
          diagnostic tool for addressing the root causes of contemporary global instability.
        </p>

        <div className="max-w-md mx-auto mt-16">
          <EditionColophon essayId="berlin" variant="dark" />
        </div>
      </div>
    </section>
  );
};
