import React from 'react';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useOpiumScrollSpy } from '@/hooks/useOpiumScrollSpy';
import { OpiumHero } from '@/components/opium/OpiumHero';
import { SilverDrainSection } from '@/components/opium/SilverDrainSection';
import { CommutationSection } from '@/components/opium/CommutationSection';
import { FactoriesSection } from '@/components/opium/FactoriesSection';
import { RoutesSection } from '@/components/opium/RoutesSection';
import { ReversalSection } from '@/components/opium/ReversalSection';
import { LinZexuSection } from '@/components/opium/LinZexuSection';
import { TreatySection } from '@/components/opium/TreatySection';
import { OpiumEpilogue } from '@/components/opium/OpiumEpilogue';
import { OpiumProgressTimeline } from '@/components/opium/OpiumProgressTimeline';
import { OpiumSectionNav } from '@/components/opium/OpiumSectionNav';

const OpiumTrade = () => {
  usePageAnalytics('opium-trade');
  const { activeSection, globalProgress } = useOpiumScrollSpy();

  return (
    <div className="min-h-screen bg-ledger-cream text-ledger-ink">
      <OpiumSectionNav activeSection={activeSection} />
      <OpiumProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <OpiumHero />
      <EditionBadge essayId="opium" variant="light" />
      <SilverDrainSection />
      <CommutationSection />
      <FactoriesSection />
      <RoutesSection />
      <ReversalSection />
      <LinZexuSection />
      <TreatySection />
      <OpiumEpilogue />
      <CommentsSection pageSlug="opium-trade" />
      <SiteFooter />
    </div>
  );
};

export default OpiumTrade;
