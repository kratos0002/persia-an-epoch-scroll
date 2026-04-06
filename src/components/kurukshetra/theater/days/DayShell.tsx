import React from 'react';
import { DayEntry, DHARMA_RULES, WarPhase } from '../../kurukshetraData';
import { PHASE_ATMOSPHERE } from '../theaterConstants';

interface DayShellProps {
  day: DayEntry;
  phase: WarPhase;
  cumulativeFallen: number;
  cumulativeViolations: number;
  /** Override background instead of phase gradient */
  bgOverride?: string;
  /** Background image path (from /public) */
  image?: string;
  children: React.ReactNode;
}

export const DayShell = ({
  day,
  phase,
  cumulativeFallen,
  cumulativeViolations,
  bgOverride,
  image,
  children,
}: DayShellProps) => {
  const atmo = PHASE_ATMOSPHERE[phase];

  return (
    <div
      data-day={day.day}
      className="relative w-screen h-screen flex-shrink-0 overflow-hidden"
      style={{ background: bgOverride || atmo.bg }}
    >
      {/* Background image with vignette */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Scrim — darkens image for text readability, painting visible at edges */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(ellipse 70% 70% at center, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.35) 50%, hsl(0 0% 0% / 0.15) 100%)`,
            }}
          />
        </>
      )}

      {/* Grain + cracks */}
      <div
        className="kuru-grain absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: atmo.grainOpacity }}
      />
      {atmo.crackOpacity > 0 && (
        <div
          className="kuru-cracks absolute inset-0 pointer-events-none z-[1]"
          style={{ opacity: atmo.crackOpacity }}
        />
      )}

      {/* Day-specific content */}
      <div className="relative z-[2] h-full">
        {children}
      </div>

      {/* Bottom bar — inline ledger */}
      <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 right-8 z-[3] flex items-center gap-4">
        <span
          className="font-body text-[9px] tracking-[0.2em] uppercase"
          style={{ color: atmo.textMuted }}
        >
          Day {day.day}/18
        </span>
        <div className="w-px h-3" style={{ background: atmo.borderColor }} />
        <span
          className="font-body text-[9px] tracking-[0.2em] uppercase"
          style={{ color: atmo.textMuted }}
        >
          Fallen {cumulativeFallen}
        </span>
        <div className="w-px h-3" style={{ background: atmo.borderColor }} />
        <span
          className="font-body text-[9px] tracking-[0.2em] uppercase"
          style={{ color: cumulativeViolations > 0 ? 'hsl(355 70% 55%)' : atmo.textMuted }}
        >
          Dharma {cumulativeViolations}/6
        </span>
      </div>
    </div>
  );
};

/** Common props passed to every day component */
export interface DayComponentProps {
  day: DayEntry;
  phase: WarPhase;
  cumulativeFallen: number;
  cumulativeViolations: number;
}
