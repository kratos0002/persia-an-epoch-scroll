import React from 'react';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CommentsSection } from '@/components/site/CommentsSection';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useKurukshetraScrollSpy } from '@/hooks/useKurukshetraScrollSpy';
import { KurukshetraHero } from '@/components/kurukshetra/KurukshetraHero';
import { GitaSection } from '@/components/kurukshetra/GitaSection';
import { AkshauhiniPyramid } from '@/components/kurukshetra/AkshauhiniPyramid';
import { WarTheater } from '@/components/kurukshetra/theater/WarTheater';
import { AstraGallery } from '@/components/kurukshetra/AstraGallery';
import { YantraCrackSequence } from '@/components/kurukshetra/YantraCrackSequence';
import { DatingDial } from '@/components/kurukshetra/DatingDial';
import { ReliefGallery } from '@/components/kurukshetra/ReliefGallery';
import { KurukshetraEpilogue } from '@/components/kurukshetra/KurukshetraEpilogue';
import { KurukshetraSectionNav } from '@/components/kurukshetra/KurukshetraSectionNav';
import { KurukshetraProgressTimeline } from '@/components/kurukshetra/KurukshetraProgressTimeline';
import { DayNotchStrip } from '@/components/kurukshetra/DayNotchStrip';

const Kurukshetra = () => {
  usePageAnalytics('kurukshetra');
  const { activeSection, globalProgress } = useKurukshetraScrollSpy();

  return (
    <div className="min-h-screen bg-kuru-dust text-kuru-kohl">
      <KurukshetraSectionNav activeSection={activeSection} />
      <KurukshetraProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <DayNotchStrip activeSection={activeSection} globalProgress={globalProgress} />

      <KurukshetraHero />
      <EditionBadge essayId="kurukshetra" variant="light" />
      <GitaSection />
      <AkshauhiniPyramid />
      <WarTheater />
      <AstraGallery />
      <YantraCrackSequence />
      <DatingDial />
      <ReliefGallery />
      <KurukshetraEpilogue />

      <CommentsSection pageSlug="kurukshetra" />
      <SiteFooter />
    </div>
  );
};

export default Kurukshetra;
