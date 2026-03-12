import React from 'react';
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
import { useIndiaScrollSpy } from '@/hooks/useIndiaScrollSpy';

const IndiaStates = () => {
  const { activeSection, globalProgress } = useIndiaScrollSpy();

  return (
    <div className="relative" style={{ background: 'hsl(220, 20%, 10%)' }}>
      <IndiaSectionNav activeSection={activeSection} />
      <IndiaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <StateCounter activeSection={activeSection} />
      <TimelineRibbon activeSection={activeSection} globalProgress={globalProgress} />

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
  );
};

export default IndiaStates;
