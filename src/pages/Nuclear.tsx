import React from 'react';
import { NuclearHero } from '@/components/nuclear/NuclearHero';
import { ManhattanSection } from '@/components/nuclear/ManhattanSection';
import { EspionageSection } from '@/components/nuclear/EspionageSection';
import { BritainSection } from '@/components/nuclear/BritainSection';
import { FranceSection } from '@/components/nuclear/FranceSection';
import { ChinaSection } from '@/components/nuclear/ChinaSection';
import { IndiaSection } from '@/components/nuclear/IndiaSection';
import { PakistanSection } from '@/components/nuclear/PakistanSection';
import { NorthKoreaSection } from '@/components/nuclear/NorthKoreaSection';
import { ShadowSection } from '@/components/nuclear/ShadowSection';
import { NuclearEpilogue } from '@/components/nuclear/NuclearEpilogue';
import { NuclearProgressTimeline } from '@/components/nuclear/NuclearProgressTimeline';
import { NuclearSectionNav } from '@/components/nuclear/NuclearSectionNav';
import { useNuclearScrollSpy } from '@/hooks/useNuclearScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const Nuclear = () => {
  const { activeSection, globalProgress } = useNuclearScrollSpy();

  return (
    <div className="relative" style={{ background: 'hsl(200, 25%, 6%)' }}>
      <MobileNotice />
      <NuclearSectionNav activeSection={activeSection} />
      <NuclearProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <NuclearHero />
      <EditionBadge essayId="nuclear" />
      <ManhattanSection />
      <EspionageSection />
      <BritainSection />
      <FranceSection />
      <ChinaSection />
      <IndiaSection />
      <PakistanSection />
      <NorthKoreaSection />
      <ShadowSection />
      <NuclearEpilogue />
      <CommentsSection pageSlug="nuclear" />
      <SiteFooter />
    </div>
  );
};

export default Nuclear;
