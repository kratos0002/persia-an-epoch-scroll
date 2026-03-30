import React from 'react';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CommentsSection } from '@/components/site/CommentsSection';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useKurukshetraScrollSpy } from '@/hooks/useKurukshetraScrollSpy';
import { KurukshetraHero } from '@/components/kurukshetra/KurukshetraHero';
import { GitaSection } from '@/components/kurukshetra/GitaSection';
import { LogisticsSection } from '@/components/kurukshetra/LogisticsSection';
import { PhaseSection } from '@/components/kurukshetra/PhaseSection';
import { AstrasSection } from '@/components/kurukshetra/AstrasSection';
import { DharmaSection } from '@/components/kurukshetra/DharmaSection';
import { HistoricitySection } from '@/components/kurukshetra/HistoricitySection';
import { ArtSection } from '@/components/kurukshetra/ArtSection';
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
      <LogisticsSection />

      <PhaseSection phase={1} id="kuru-phase1" title="The Command of Bhishma" eyebrow="Days 1–10 · Phase I" />
      <PhaseSection phase={2} id="kuru-phase2" title="The Command of Drona" eyebrow="Days 11–15 · Phase II" />
      <PhaseSection phase={3} id="kuru-phase3" title="The Command of Karna" eyebrow="Days 16–17 · Phase III" />
      <PhaseSection phase={4} id="kuru-phase4" title="Shalya and the End" eyebrow="Day 18 · Phase IV" />

      <AstrasSection />
      <DharmaSection />
      <HistoricitySection />
      <ArtSection />
      <KurukshetraEpilogue />

      <CommentsSection pageSlug="kurukshetra" />
      <SiteFooter />
    </div>
  );
};

export default Kurukshetra;
