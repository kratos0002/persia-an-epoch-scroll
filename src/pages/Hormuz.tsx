import React from 'react';
import { HormuzMapStory } from '@/components/hormuz/HormuzMapStory';
import { HormuzEpilogue } from '@/components/hormuz/HormuzEpilogue';
import { HormuzProgressTimeline } from '@/components/hormuz/HormuzProgressTimeline';
import { HormuzSectionNav } from '@/components/hormuz/HormuzSectionNav';
import { useHormuzScrollSpy } from '@/hooks/useHormuzScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const NAVY = 'hsl(215, 45%, 8%)';

const Hormuz = () => {
  const { activeSection, globalProgress } = useHormuzScrollSpy();

  return (
    <div className="relative" style={{ background: NAVY }}>
      <MobileNotice />
      <HormuzSectionNav activeSection={activeSection} />
      <HormuzProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <HormuzMapStory />
      <EditionBadge essayId="hormuz" />
      <HormuzEpilogue />
      <CommentsSection pageSlug="hormuz" />
      <SiteFooter />
    </div>
  );
};

export default Hormuz;
