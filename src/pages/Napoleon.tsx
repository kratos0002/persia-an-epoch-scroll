import React from 'react';
import { NapoleonHero } from '@/components/napoleon/NapoleonHero';
import { RevolutionSection } from '@/components/napoleon/RevolutionSection';
import { ToulonSection } from '@/components/napoleon/ToulonSection';
import { ItalyEgyptSection } from '@/components/napoleon/ItalyEgyptSection';
import { EmperorSection } from '@/components/napoleon/EmperorSection';
import { AusterlitzSection } from '@/components/napoleon/AusterlitzSection';
import { SpanishUlcerSection } from '@/components/napoleon/SpanishUlcerSection';
import { MoscowSection } from '@/components/napoleon/MoscowSection';
import { WaterlooSection } from '@/components/napoleon/WaterlooSection';
import { NapoleonEpilogue } from '@/components/napoleon/NapoleonEpilogue';
import { NapoleonProgressTimeline } from '@/components/napoleon/NapoleonProgressTimeline';
import { NapoleonSectionNav } from '@/components/napoleon/NapoleonSectionNav';
import { useNapoleonScrollSpy } from '@/hooks/useNapoleonScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const Napoleon = () => {
  const { activeSection, globalProgress } = useNapoleonScrollSpy();

  return (
    <div className="relative" style={{ background: 'hsl(225, 30%, 7%)' }}>
      <MobileNotice />
      <NapoleonSectionNav activeSection={activeSection} />
      <NapoleonProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <NapoleonHero />
      <EditionBadge essayId="napoleon" />
      <RevolutionSection />
      <ToulonSection />
      <ItalyEgyptSection />
      <EmperorSection />
      <AusterlitzSection />
      <SpanishUlcerSection />
      <MoscowSection />
      <WaterlooSection />
      <NapoleonEpilogue />
      <CommentsSection pageSlug="napoleon" />
      <SiteFooter />
    </div>
  );
};

export default Napoleon;
