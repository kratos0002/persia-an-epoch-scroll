import React from 'react';
import { HormuzHero } from '@/components/hormuz/HormuzHero';
import { DilmunSection } from '@/components/hormuz/DilmunSection';
import { PersianGulfSection } from '@/components/hormuz/PersianGulfSection';
import { PortugalSection } from '@/components/hormuz/PortugalSection';
import { BritishGulfSection } from '@/components/hormuz/BritishGulfSection';
import { TankerWarSection } from '@/components/hormuz/TankerWarSection';
import { BottleneckSection } from '@/components/hormuz/BottleneckSection';
import { ChokepointsSection } from '@/components/hormuz/ChokepointsSection';
import { HormuzEpilogue } from '@/components/hormuz/HormuzEpilogue';
import { HormuzProgressTimeline } from '@/components/hormuz/HormuzProgressTimeline';
import { HormuzSectionNav } from '@/components/hormuz/HormuzSectionNav';
import { useHormuzScrollSpy } from '@/hooks/useHormuzScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { EraTransition } from '@/components/visuals/EraTransition';

const NAVY = 'hsl(215, 45%, 8%)';

const Hormuz = () => {
  const { activeSection, globalProgress } = useHormuzScrollSpy();

  return (
    <div className="relative" style={{ background: NAVY }}>
      <HormuzSectionNav activeSection={activeSection} />
      <HormuzProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />

      <HormuzHero />
      <EraTransition fromColor="215 45% 8%" toColor="35 80% 50%" label="Before civilization had a name" year="~3000 BCE" />
      <DilmunSection />
      <EraTransition fromColor="35 80% 50%" toColor="43 85% 55%" label="Whoever ruled Persia ruled the Gulf" year="550 BCE" />
      <PersianGulfSection />
      <EraTransition fromColor="43 85% 55%" toColor="140 40% 30%" label="Three locks on the Indian Ocean" year="1507" />
      <PortugalSection />
      <EraTransition fromColor="140 40% 30%" toColor="0 60% 40%" label="An invisible empire" year="1820" />
      <BritishGulfSection />
      <EraTransition fromColor="0 60% 40%" toColor="0 65% 50%" label="The first time the strait caught fire" year="1980" />
      <TankerWarSection />
      <EraTransition fromColor="0 65% 50%" toColor="195 55% 35%" label="21 miles. 21 million barrels. Every day." year="Today" />
      <BottleneckSection />
      <ChokepointsSection />

      <EditionBadge essayId="hormuz" />
      <HormuzEpilogue />
      <CommentsSection pageSlug="hormuz" />
      <SiteFooter />
    </div>
  );
};

export default Hormuz;
