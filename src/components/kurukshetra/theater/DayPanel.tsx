import React from 'react';
import { DayEntry, DHARMA_RULES, WarPhase } from '../kurukshetraData';
import { PHASE_ATMOSPHERE } from './theaterConstants';
import { VyuhaFormation } from './VyuhaFormation';

interface DayPanelProps {
  day: DayEntry;
  phase: WarPhase;
  image?: string;
  highlight: string;
  title: string;
  cumulativeFallen: number;
  cumulativeViolations: number;
}

export const DayPanel = ({
  day,
  phase,
  image,
  highlight,
  title,
  cumulativeFallen,
  cumulativeViolations,
}: DayPanelProps) => {
  const atmo = PHASE_ATMOSPHERE[phase];
  const violation = DHARMA_RULES.find(r => r.day === day.day);

  return (
    <div
      data-day={day.day}
      className="relative w-screen h-screen flex-shrink-0 overflow-hidden"
      style={{ background: atmo.bg }}
    >
      {/* Background — image or formation */}
      {image ? (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 15%, ${atmo.bgFrom}cc 70%),
                linear-gradient(to bottom, ${atmo.bgFrom}40 0%, transparent 30%, transparent 60%, ${atmo.bgFrom}dd 100%)
              `,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="opacity-[0.07]">
            <VyuhaFormation
              vyuhaName={day.vyuhaKaurava !== '—' ? day.vyuhaKaurava : 'Vajra'}
              phase={phase}
              size="lg"
            />
          </div>
        </div>
      )}

      {/* Grain + cracks */}
      <div className="kuru-grain absolute inset-0 pointer-events-none z-[1]" style={{ opacity: atmo.grainOpacity }} />
      {atmo.crackOpacity > 0 && (
        <div className="kuru-cracks absolute inset-0 pointer-events-none z-[1]" style={{ opacity: atmo.crackOpacity }} />
      )}

      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Day label */}
          <div className="mb-2">
            <span
              className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase"
              style={{ color: atmo.textMuted }}
            >
              Day
            </span>
          </div>

          {/* Day number + commander */}
          <div className="flex items-baseline gap-5 mb-6">
            <span
              className="font-display text-7xl md:text-[9rem] font-bold leading-none"
              style={{ color: atmo.accent }}
            >
              {day.day}
            </span>
            <div>
              <span
                className="block font-display text-[10px] md:text-xs tracking-[0.25em] uppercase"
                style={{ color: atmo.textMuted }}
              >
                {day.senapati} commands
              </span>
              {day.vyuhaKaurava !== '—' && (
                <span className="block font-body text-[10px] mt-1" style={{ color: atmo.textMuted }}>
                  {day.vyuhaKaurava} vs {day.vyuhaPandava}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-display text-2xl md:text-4xl tracking-[0.04em] mb-6"
            style={{
              color: atmo.textPrimary,
              textShadow: image ? `0 2px 30px ${atmo.bgFrom}` : 'none',
            }}
          >
            {title}
          </h3>

          {/* Highlight text */}
          <p
            className="font-body text-base md:text-lg leading-relaxed max-w-xl"
            style={{
              color: atmo.textPrimary,
              textShadow: image ? `0 1px 20px ${atmo.bgFrom}` : 'none',
            }}
          >
            {highlight}
          </p>

          {/* Casualties */}
          {day.casualties.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {day.casualties.map((c) => {
                const isPandava = c.includes('(P');
                const isFallen = c.includes('fallen');
                return (
                  <span
                    key={c}
                    className="font-display text-sm tracking-[0.1em] px-3 py-1"
                    style={{
                      color: isPandava ? 'hsl(42 85% 58%)' : 'hsl(355 70% 55%)',
                      borderBottom: `2px solid ${isPandava ? 'hsl(42 85% 58% / 0.4)' : 'hsl(355 70% 55% / 0.4)'}`,
                    }}
                  >
                    {c.replace(/\s*\([PK].*?\)/, '')}
                    {isFallen ? ' †' : ''}
                  </span>
                );
              })}
            </div>
          )}

          {/* Dharma violation */}
          {violation && (
            <div
              className="mt-8 pl-4"
              style={{ borderLeft: `2px solid ${atmo.accent}` }}
            >
              <p className="font-display text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: atmo.accent }}>
                Dharma Broken
              </p>
              <p className="font-body text-sm italic" style={{ color: atmo.textMuted }}>
                {violation.violation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar — inline ledger */}
      <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 right-8 z-[3] flex items-center gap-4">
        <span className="font-body text-[9px] tracking-[0.2em] uppercase" style={{ color: atmo.textMuted }}>
          Day {day.day}/18
        </span>
        <div className="w-px h-3" style={{ background: atmo.borderColor }} />
        <span className="font-body text-[9px] tracking-[0.2em] uppercase" style={{ color: atmo.textMuted }}>
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
