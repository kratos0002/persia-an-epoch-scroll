import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DAY_JOURNAL, PHASE_DEFS, DHARMA_RULES, WarPhase } from '../kurukshetraData';
import { PHASE_ATMOSPHERE } from './theaterConstants';
import { PhaseGatePanel } from './PhaseGatePanel';
import { useIsMobile } from '@/hooks/use-mobile';

// Individual day components
import { Day01_FirstBlood } from './days/Day01_FirstBlood';
import { Day02_DuelOfLove } from './days/Day02_DuelOfLove';
import { Day03_Crescent } from './days/Day03_Crescent';
import { Day04_BhimasVow } from './days/Day04_BhimasVow';
import { Day05_CrocodileHawk } from './days/Day05_CrocodileHawk';
import { Day06_Drenched } from './days/Day06_Drenched';
import { Day07_CostRevealed } from './days/Day07_CostRevealed';
import { Day08_NextGeneration } from './days/Day08_NextGeneration';
import { Day09_KrishnasRage } from './days/Day09_KrishnasRage';
import { Day10_GrandsireFalls } from './days/Day10_GrandsireFalls';
import { Day11_SurgeonCommands } from './days/Day11_SurgeonCommands';
import { Day12_GarlandVishnu } from './days/Day12_GarlandVishnu';
import { Day13_ChakraVyuha } from './days/Day13_ChakraVyuha';
import { Day14_NightWithoutEnd } from './days/Day14_NightWithoutEnd';
import { Day15_HalfTruth } from './days/Day15_HalfTruth';
import { Day16_SunRises } from './days/Day16_SunRises';
import { Day17_SunSetsKarna } from './days/Day17_SunSetsKarna';
import { Day18_AshSilence } from './days/Day18_AshSilence';
import { DayComponentProps } from './days/DayShell';

/* ── Map day number → component ── */
const DAY_COMPONENTS: Record<number, React.FC<DayComponentProps>> = {
  1: Day01_FirstBlood,
  2: Day02_DuelOfLove,
  3: Day03_Crescent,
  4: Day04_BhimasVow,
  5: Day05_CrocodileHawk,
  6: Day06_Drenched,
  7: Day07_CostRevealed,
  8: Day08_NextGeneration,
  9: Day09_KrishnasRage,
  10: Day10_GrandsireFalls,
  11: Day11_SurgeonCommands,
  12: Day12_GarlandVishnu,
  13: Day13_ChakraVyuha,
  14: Day14_NightWithoutEnd,
  15: Day15_HalfTruth,
  16: Day16_SunRises,
  17: Day17_SunSetsKarna,
  18: Day18_AshSilence,
};

/* ── Build the panel sequence: [Gate1, Day1..5, Gate2, Day6..10, Gate3, Day11..14, Gate4, Day15..18] ── */
type PanelEntry =
  | { type: 'gate'; phase: (typeof PHASE_DEFS)[number] }
  | { type: 'day'; day: (typeof DAY_JOURNAL)[number]; phase: WarPhase; cumulativeFallen: number; cumulativeViolations: number };

function buildPanelSequence(): PanelEntry[] {
  const panels: PanelEntry[] = [];
  let fallen = 0;
  let violations = 0;

  for (const phase of PHASE_DEFS) {
    panels.push({ type: 'gate', phase });

    const phaseDays = DAY_JOURNAL.filter(
      d => d.day >= phase.days[0] && d.day <= phase.days[1]
    );

    for (const day of phaseDays) {
      fallen += day.casualties.length;
      violations = DHARMA_RULES.filter(r => r.day <= day.day).length;
      panels.push({
        type: 'day',
        day,
        phase: phase.id,
        cumulativeFallen: fallen,
        cumulativeViolations: violations,
      });
    }
  }

  return panels;
}

const PANELS = buildPanelSequence();

export const WarTheater = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active panel
  const [activePanel, setActivePanel] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const idx = Math.min(
        Math.floor(v * PANELS.length),
        PANELS.length - 1
      );
      setActivePanel(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(PANELS.length - 1) * 100}vw`]
  );

  // Resolve current phase for dot coloring
  const currentPhase = (() => {
    const panel = PANELS[activePanel];
    if (!panel) return 1 as WarPhase;
    if (panel.type === 'gate') return panel.phase.id;
    return panel.phase;
  })();

  // Build the panel React nodes
  const panelNodes = PANELS.map((entry, i) => {
    if (entry.type === 'gate') {
      return (
        <PhaseGatePanel
          key={`gate-${entry.phase.id}`}
          phase={entry.phase}
        />
      );
    }

    const DayComp = DAY_COMPONENTS[entry.day.day];
    if (!DayComp) return null;

    return (
      <DayComp
        key={`day-${entry.day.day}`}
        day={entry.day}
        phase={entry.phase}
        cumulativeFallen={entry.cumulativeFallen}
        cumulativeViolations={entry.cumulativeViolations}
      />
    );
  });

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <div className="flex flex-col">
        {panelNodes.map((node, i) => (
          <div key={i} className="min-h-screen">
            {node}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: scroll-jacked horizontal pan
  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${PANELS.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${PANELS.length * 100}vw` }}
        >
          {panelNodes}
        </motion.div>

        {/* Day progress dots — bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {PANELS.map((entry, i) => {
            const isGate = entry.type === 'gate';
            const isActiveOrPast = i <= activePanel;
            const panelPhase = entry.type === 'gate' ? entry.phase.id : entry.phase;
            const panelAtmo = PHASE_ATMOSPHERE[panelPhase];

            if (isGate) {
              return (
                <div
                  key={i}
                  className="transition-all duration-300"
                  style={{
                    width: i === activePanel ? 16 : 8,
                    height: 3,
                    borderRadius: 2,
                    background: isActiveOrPast ? panelAtmo.accent : `${panelAtmo.accent}30`,
                  }}
                />
              );
            }

            return (
              <div
                key={i}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activePanel ? 8 : 4,
                  height: i === activePanel ? 8 : 4,
                  background: isActiveOrPast ? panelAtmo.accent : `${panelAtmo.accent}30`,
                  boxShadow: i === activePanel ? `0 0 8px ${panelAtmo.accent}` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
