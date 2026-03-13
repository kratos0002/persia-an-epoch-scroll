import React from 'react';
import { BuddhismHero } from '@/components/buddhism/BuddhismHero';
import { AwakeningSection } from '@/components/buddhism/AwakeningSection';
import { AshokaSection } from '@/components/buddhism/AshokaSection';
import { FirstSplitSection } from '@/components/buddhism/FirstSplitSection';
import { TheravadaSection } from '@/components/buddhism/TheravadaSection';
import { MahayanaSection } from '@/components/buddhism/MahayanaSection';
import { VajrayanaSection } from '@/components/buddhism/VajrayanaSection';
import { BranchesSection } from '@/components/buddhism/BranchesSection';
import { ModernBuddhismSection } from '@/components/buddhism/ModernBuddhismSection';
import { BuddhismEpilogue } from '@/components/buddhism/BuddhismEpilogue';
import { BuddhismSectionNav } from '@/components/buddhism/BuddhismSectionNav';
import { BuddhismProgressTimeline } from '@/components/buddhism/BuddhismProgressTimeline';
import { useBuddhismScrollSpy } from '@/hooks/useBuddhismScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const Buddhism = () => {
  const { activeSection, globalProgress } = useBuddhismScrollSpy();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <MobileNotice />
      <BuddhismSectionNav activeSection={activeSection} />
      <BuddhismProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <BuddhismHero />
      <EditionBadge essayId="buddhism" />
      <AwakeningSection />
      <AshokaSection />
      <FirstSplitSection />
      <TheravadaSection />
      <MahayanaSection />
      <VajrayanaSection />
      <BranchesSection />
      <ModernBuddhismSection />
      <BuddhismEpilogue />
      <CommentsSection pageSlug="buddhism" />
      <SiteFooter />
    </div>
  );
};

export default Buddhism;
