import React from 'react';
import { NutmegHero } from '@/components/nutmeg/NutmegHero';
import { SeedSection } from '@/components/nutmeg/SeedSection';
import { VoyageSection } from '@/components/nutmeg/VoyageSection';
import { BandaSection } from '@/components/nutmeg/BandaSection';
import { MonopolySection } from '@/components/nutmeg/MonopolySection';
import { RunSection } from '@/components/nutmeg/RunSection';
import { ManhattanTradeSection } from '@/components/nutmeg/ManhattanTradeSection';
import { NutmegEpilogue } from '@/components/nutmeg/NutmegEpilogue';
import { NutmegProgressTimeline } from '@/components/nutmeg/NutmegProgressTimeline';
import { NutmegSectionNav } from '@/components/nutmeg/NutmegSectionNav';
import { LogSpine } from '@/components/nutmeg/LogSpine';
import { useNutmegScrollSpy } from '@/hooks/useNutmegScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';

const Nutmeg = () => {
  const { activeSection, globalProgress } = useNutmegScrollSpy();

  return (
    <div className="relative">
      <LogSpine />
      <NutmegSectionNav activeSection={activeSection} />
      <NutmegProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <NutmegHero />
      <EditionBadge essayId="nutmeg" />
      <SeedSection />
      <VoyageSection />
      <BandaSection />
      <MonopolySection />
      <RunSection />
      <ManhattanTradeSection />
      <NutmegEpilogue />
      <CommentsSection pageSlug="nutmeg" />
      <SiteFooter />
    </div>
  );
};

export default Nutmeg;
