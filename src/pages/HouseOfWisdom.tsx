import React from 'react';
import { useWisdomScrollSpy, WISDOM_SECTIONS } from '@/hooks/useWisdomScrollSpy';
import { WisdomProgressTimeline } from '@/components/wisdom/WisdomProgressTimeline';
import { WisdomSectionNav } from '@/components/wisdom/WisdomSectionNav';
import { WisdomHero } from '@/components/wisdom/WisdomHero';
import { RoundCitySection } from '@/components/wisdom/RoundCitySection';
import { HarunSection } from '@/components/wisdom/HarunSection';
import { TranslationSection } from '@/components/wisdom/TranslationSection';
import { ScholarsSection } from '@/components/wisdom/ScholarsSection';
import { InventionsSection } from '@/components/wisdom/InventionsSection';
import { RippleSection } from '@/components/wisdom/RippleSection';
import { DestructionSection } from '@/components/wisdom/DestructionSection';
import { WisdomEpilogue } from '@/components/wisdom/WisdomEpilogue';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';

const HouseOfWisdom = () => {
  const { activeSection, globalProgress } = useWisdomScrollSpy();

  return (
    <div className="bg-background min-h-screen">
      <WisdomSectionNav activeSection={activeSection} />
      <WisdomProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <WisdomHero />
      <EditionBadge essayId="wisdom" />
      <RoundCitySection />
      <HarunSection />
      <TranslationSection />
      <ScholarsSection />
      <InventionsSection />
      <RippleSection />
      <DestructionSection />
      <WisdomEpilogue />
      <CommentsSection pageSlug="wisdom" />
      <SiteFooter />
    </div>
  );
};

export default HouseOfWisdom;
