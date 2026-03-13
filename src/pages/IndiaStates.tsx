import React, { useState } from 'react';
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
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';
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
  holdouts: ['jk', 'gj', 'tg'],
};

// Linguistic bullet → state IDs to highlight
const LINGUISTIC_HIGHLIGHTS: Record<number, string[]> = {
  0: ['ap'],                                          // Andhra Pradesh (Telugu)
  1: ['kl'],                                          // Kerala (Malayalam)
  2: ['ka'],                                          // Karnataka (Kannada)
  3: ['up', 'mp', 'br', 'hr', 'hp', 'rj', 'or', 'wb'], // Hindi belt + merged states
  4: ['rj'],                                          // Rajasthan
};

const IndiaStates = () => {
  const { activeSection, globalProgress } = useIndiaScrollSpy();
  const [activeNewState, setActiveNewState] = useState(-1);
  const [activeLinguistic, setActiveLinguistic] = useState(-1);

  const era = SECTION_TO_ERA[activeSection] || 'present';

  // Dynamic highlights based on era + scroll position
  let highlightIds: string[] = [];
  if (activeSection === 'holdouts') {
    highlightIds = SECTION_TO_HIGHLIGHTS['holdouts'] || [];
  } else if (activeSection === 'linguistic' && activeLinguistic >= 0) {
    highlightIds = LINGUISTIC_HIGHLIGHTS[activeLinguistic] || [];
  }

  // Reset sub-section states when leaving their sections
  const effectiveNewState = era === 'new-states' ? activeNewState : -1;

  return (
    <div className="relative" style={{ background: 'hsl(220, 20%, 10%)' }}>
      <MobileNotice />
      {/* Fixed full-viewport map background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[85vw] h-[85vh] max-w-[900px] transition-opacity duration-1000 ${
          era === 'patchwork' ? 'opacity-70 md:opacity-80'
          : era === 'linguistic' ? 'opacity-55 md:opacity-65'
          : 'opacity-40 md:opacity-50'
        }`}>
          <IndiaMap
            era={era}
            highlightIds={highlightIds}
            activeNewState={effectiveNewState}
            className="drop-shadow-2xl"
          />
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
        <EditionBadge essayId="india-states" />
        <MidnightSection />
        <PatelSection />
        <HoldoutsSection />
        <AbcdSection />
        <LinguisticSection onActiveBullet={setActiveLinguistic} />
        <SplitsSection />
        <NewStatesSection onActiveCard={setActiveNewState} />
        <PresentSection />
        <IndiaEpilogue />
        <CommentsSection pageSlug="india-states" />
        <SiteFooter />
      </div>
    </div>
  );
};

export default IndiaStates;
