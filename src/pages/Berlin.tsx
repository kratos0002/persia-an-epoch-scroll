import React, { useEffect } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CommentsSection } from '@/components/site/CommentsSection';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { BerlinProgressTimeline } from '@/components/berlin/BerlinProgressTimeline';
import { BerlinSectionNav } from '@/components/berlin/BerlinSectionNav';
import { useBerlinScrollSpy } from '@/hooks/useBerlinScrollSpy';
import { BerlinHero } from '@/components/berlin/BerlinHero';
import { ConferenceTable } from '@/components/berlin/ConferenceTable';
import { GeneralActSection } from '@/components/berlin/TreatyArticle';
import { PreColonialCards } from '@/components/berlin/PreColonialCards';
import { PartitionTimelapse } from '@/components/berlin/PartitionTimelapse';
import { EthnicFractureMap } from '@/components/berlin/EthnicFractureMap';
import { ExtractionLedger } from '@/components/berlin/ExtractionLedger';
import { DirectLineCards } from '@/components/berlin/DirectLineCards';
import { BerlinEpilogue } from '@/components/berlin/BerlinEpilogue';
import { BL } from '@/components/visuals/berlinMapData';

const Berlin = () => {
  const { activeSection, globalProgress } = useBerlinScrollSpy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: BL.VELLUM }}>
      <SiteHeader />
      <BerlinSectionNav activeSection={activeSection} />
      <BerlinProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />

      <BerlinHero />
      <EditionBadge essayId="berlin" />
      <ConferenceTable />
      <GeneralActSection />
      <PreColonialCards />
      <PartitionTimelapse />
      <EthnicFractureMap />
      <ExtractionLedger />
      <DirectLineCards />
      <BerlinEpilogue />
      <CommentsSection pageSlug="berlin" />
      <SiteFooter />
    </div>
  );
};

export default Berlin;
