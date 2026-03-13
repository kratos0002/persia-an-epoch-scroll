import React, { useEffect } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CommentsSection } from '@/components/site/CommentsSection';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MongolIndiaProgressTimeline } from '@/components/mongol-india/MongolIndiaProgressTimeline';
import { MongolIndiaSectionNav } from '@/components/mongol-india/MongolIndiaSectionNav';
import { useMongolIndiaScrollSpy } from '@/hooks/useMongolIndiaScrollSpy';
import { MongolIndiaHero } from '@/components/mongol-india/MongolIndiaHero';
import { IndusSection } from '@/components/mongol-india/IndusSection';
import { WavesSection } from '@/components/mongol-india/WavesSection';
import { KhaljiSection } from '@/components/mongol-india/KhaljiSection';
import { BattlesSection } from '@/components/mongol-india/BattlesSection';
import { WhySurvivedSection } from '@/components/mongol-india/WhySurvivedSection';
import { PriceSection } from '@/components/mongol-india/PriceSection';
import { MongolIndiaEpilogue } from '@/components/mongol-india/MongolIndiaEpilogue';

const MongolIndia = () => {
  const { activeSection, globalProgress } = useMongolIndiaScrollSpy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <SiteHeader />
      <MongolIndiaSectionNav activeSection={activeSection} />
      <MongolIndiaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />

      <MongolIndiaHero />
      <EditionBadge essayId="mongol-india" />
      <IndusSection />
      <WavesSection />
      <KhaljiSection />
      <BattlesSection />
      <WhySurvivedSection />
      <PriceSection />
      <MongolIndiaEpilogue />
      <CommentsSection pageSlug="mongol-india" />
      <SiteFooter />
    </div>
  );
};

export default MongolIndia;
