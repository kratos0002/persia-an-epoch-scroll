import React, { useEffect } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CommentsSection } from '@/components/site/CommentsSection';
import { RebellionProgressTimeline } from '@/components/rebellion/RebellionProgressTimeline';
import { RebellionSectionNav } from '@/components/rebellion/RebellionSectionNav';
import { useRebellionScrollSpy } from '@/hooks/useRebellionScrollSpy';
import { RebellionHero } from '@/components/rebellion/RebellionHero';
import { CartridgeSection } from '@/components/rebellion/CartridgeSection';
import { TwoNetworksSection } from '@/components/rebellion/TwoNetworksSection';
import { MeerutSection } from '@/components/rebellion/MeerutSection';
import { RaceToDelhi } from '@/components/rebellion/RaceToDelhi';
import { KanpurLucknowSection } from '@/components/rebellion/KanpurLucknowSection';
import { ReconquestSection } from '@/components/rebellion/ReconquestSection';
import { AftermathSection } from '@/components/rebellion/AftermathSection';
import { RebellionEpilogue } from '@/components/rebellion/RebellionEpilogue';

const Rebellion1857 = () => {
  const { activeSection, globalProgress } = useRebellionScrollSpy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <SiteHeader />
      <RebellionSectionNav activeSection={activeSection} />
      <RebellionProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />

      <RebellionHero />
      <CartridgeSection />
      <TwoNetworksSection />
      <MeerutSection />
      <RaceToDelhi />
      <KanpurLucknowSection />
      <ReconquestSection />
      <AftermathSection />
      <RebellionEpilogue />
      <CommentsSection pageSlug="1857" />
      <SiteFooter />
    </div>
  );
};

export default Rebellion1857;
