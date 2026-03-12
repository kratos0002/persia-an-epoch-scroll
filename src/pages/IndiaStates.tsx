import React, { useMemo } from 'react';
import { IndiaHero } from '@/components/india/IndiaHero';
import { MidnightSection } from '@/components/india/MidnightSection';
import { PatelSection } from '@/components/india/PatelSection';
import { HoldoutsSection } from '@/components/india/HoldoutsSection';
import { AbcdSection } from '@/components/india/AbcdSection';
import { LinguisticSection } from '@/components/india/LinguisticSection';
import { SplitsSection } from '@/components/india/SplitsSection';
import { NewStatesSection } from '@/components/india/NewStatesSection';
import { PresentSection } from '@/components/india/PresentSection';
import { IndiaEpilogue } from '@/components/india/IndiaEpilogue';
import { IndiaSectionNav } from '@/components/india/IndiaSectionNav';
import { IndiaProgressTimeline } from '@/components/india/IndiaProgressTimeline';
import { StateCounter } from '@/components/visuals/StateCounter';
import { TimelineRibbon } from '@/components/visuals/TimelineRibbon';
import { IndiaMap } from '@/components/visuals/IndiaMap';
import { useIndiaScrollSpy } from '@/hooks/useIndiaScrollSpy';
import type { EraId } from '@/components/visuals/indiaStatesData';

const SECTION_TO_ERA: Record<string, EraId> = {
  patchwork: 'patchwork',
  midnight: 'midnight',
  patel: 'patel',
  holdouts: 'holdouts',
  abcd: 'abcd',
  linguistic: 'linguistic',
  splits: 'splits',
  'new-states': 'new-states',
  present: 'present',
  'india-epilogue': 'india-epilogue',
};

const SECTION_TO_HIGHLIGHTS: Record<string, string[]> = {
  patel: ['jk', 'la'],
  holdouts: ['jk', 'la'],
  'new-states': ['tg', 'jh', 'cg', 'uk'],
};

const IndiaStates = () => {
  const { activeSection, globalProgress } = useIndiaScrollSpy();

  const era = SECTION_TO_ERA[activeSection] || 'present';
  const highlightIds = SECTION_TO_HIGHLIGHTS[activeSection] || [];

  return (
    <div className="relative" style={{ background: 'hsl(220, 20%, 10%)' }}>
      {/* Fixed full-viewport map background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] h-[85vh] max-w-[900px] opacity-40 md:opacity-50">
          <IndiaMap era={era} highlightIds={highlightIds} className="drop-shadow-2xl" />
        </div>
      </div>

      {/* UI overlays */}
      <IndiaSectionNav activeSection={activeSection} />
      <IndiaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <StateCounter activeSection={activeSection} />
      <TimelineRibbon activeSection={activeSection} globalProgress={globalProgress} />

      {/* Scrolling narrative content */}
      <div className="relative z-10">
        <IndiaHero />
        <MidnightSection />
        <PatelSection />
        <HoldoutsSection />
        <AbcdSection />
        <LinguisticSection />
        <SplitsSection />
        <NewStatesSection />
        <PresentSection />
        <IndiaEpilogue />
      </div>
    </div>
  );
};

export default IndiaStates;
