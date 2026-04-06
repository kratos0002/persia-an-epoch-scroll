import React from 'react';
import { PhaseDef } from '../kurukshetraData';
import { PHASE_ATMOSPHERE } from './theaterConstants';

interface PhaseGatePanelProps {
  phase: PhaseDef;
}

export const PhaseGatePanel = ({ phase }: PhaseGatePanelProps) => {
  const atmo = PHASE_ATMOSPHERE[phase.id];

  return (
    <div
      className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: atmo.bg }}
    >
      {/* Grain */}
      <div className="kuru-grain absolute inset-0 pointer-events-none" style={{ opacity: atmo.grainOpacity }} />

      {/* Cracks */}
      {atmo.crackOpacity > 0 && (
        <div className="kuru-cracks absolute inset-0 pointer-events-none" style={{ opacity: atmo.crackOpacity }} />
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${atmo.accent}08, transparent 60%)` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Devanagari numeral */}
        <span
          className="block font-devanagari text-2xl md:text-3xl mb-6"
          style={{ color: atmo.textMuted }}
        >
          {phase.devanagari}
        </span>

        {/* Phase name */}
        <h2
          className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-[0.06em] uppercase"
          style={{ color: atmo.accent }}
        >
          {phase.name}
        </h2>

        {/* Commander + days */}
        <p
          className="mt-6 font-display text-xs md:text-sm tracking-[0.35em] uppercase"
          style={{ color: atmo.textMuted }}
        >
          {phase.commander} · Days {phase.days[0]}–{phase.days[1]}
        </p>

        {/* Divider */}
        <div
          className="mx-auto mt-6 h-px w-24"
          style={{ background: `linear-gradient(to right, transparent, ${atmo.accent}, transparent)` }}
        />

        {/* Subtitle */}
        <p
          className="mt-6 font-body text-base md:text-lg italic max-w-md mx-auto"
          style={{ color: atmo.textMuted }}
        >
          {phase.subtitle}
        </p>
      </div>
    </div>
  );
};
