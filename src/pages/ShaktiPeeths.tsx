import React from 'react';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useShaktiScrollSpy } from '@/hooks/useShaktiScrollSpy';
import { ShaktiHero } from '@/components/shakti/ShaktiHero';
import { CanonWheelSection } from '@/components/shakti/CanonWheelSection';
import { SacredBodyAtlas } from '@/components/shakti/SacredBodyAtlas';
import { AdiPeethasSection } from '@/components/shakti/AdiPeethasSection';
import { BengalBloomSection } from '@/components/shakti/BengalBloomSection';
import { CrossBorderSection } from '@/components/shakti/CrossBorderSection';
import { PresenceFormsSection } from '@/components/shakti/PresenceFormsSection';
import { LostSitesSection } from '@/components/shakti/LostSitesSection';
import { PilgrimageConstellationsSection } from '@/components/shakti/PilgrimageConstellationsSection';
import { ShaktiEpilogue } from '@/components/shakti/ShaktiEpilogue';
import { ShaktiProgressTimeline } from '@/components/shakti/ShaktiProgressTimeline';
import { ShaktiSectionNav } from '@/components/shakti/ShaktiSectionNav';

const ShaktiPeeths = () => {
  usePageAnalytics('shakti-peeths');
  const { activeSection, globalProgress } = useShaktiScrollSpy();

  return (
    <div className="min-h-screen bg-shakti-night text-shakti-ink">
      <ShaktiSectionNav activeSection={activeSection} />
      <ShaktiProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <ShaktiHero />
      <EditionBadge essayId="shakti" variant="dark" />
      <CanonWheelSection />
      <SacredBodyAtlas />
      <AdiPeethasSection />
      <BengalBloomSection />
      <CrossBorderSection />
      <PresenceFormsSection />
      <LostSitesSection />
      <PilgrimageConstellationsSection />
      <ShaktiEpilogue />
      <CommentsSection pageSlug="shakti-peeths" />
      <SiteFooter variant="dark" />
    </div>
  );
};

export default ShaktiPeeths;