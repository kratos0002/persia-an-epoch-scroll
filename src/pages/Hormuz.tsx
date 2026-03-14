import React from 'react';
import { HormuzHero } from '@/components/hormuz/HormuzHero';
import { AncientGulfSection } from '@/components/hormuz/AncientGulfSection';
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
import { MobileNotice } from '@/components/site/MobileNotice';

const Hormuz = () => {
  const { activeSection, globalProgress } = useHormuzScrollSpy();

  return (
    <div className="relative" style={{ background: 'hsl(215, 45%, 8%)' }}>
      <MobileNotice />
      <HormuzSectionNav activeSection={activeSection} />
      <HormuzProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <HormuzHero />
      <EditionBadge essayId="hormuz" />
      <AncientGulfSection />
      <PortugalSection />
      <BritishGulfSection />
      <TankerWarSection />
      <BottleneckSection />
      <ChokepointsSection />
      <HormuzEpilogue />
      <CommentsSection pageSlug="hormuz" />
      <SiteFooter />
    </div>
  );
};

export default Hormuz;
