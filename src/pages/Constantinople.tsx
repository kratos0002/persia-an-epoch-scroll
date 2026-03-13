import React from 'react';
import { SurfaceSection } from '@/components/constantinople/SurfaceSection';
import { OttomanSection } from '@/components/constantinople/OttomanSection';
import { CrusadeSection } from '@/components/constantinople/CrusadeSection';
import { ByzantinePeakSection } from '@/components/constantinople/ByzantinePeakSection';
import { IconoclasmSection } from '@/components/constantinople/IconoclasmSection';
import { ConstantineSection } from '@/components/constantinople/ConstantineSection';
import { RomanOutpostSection } from '@/components/constantinople/RomanOutpostSection';
import { GreekSection } from '@/components/constantinople/GreekSection';
import { BedrockEpilogue } from '@/components/constantinople/BedrockEpilogue';
import { ConstantinopleSectionNav } from '@/components/constantinople/ConstantinopleSectionNav';
import { DepthGauge } from '@/components/visuals/DepthGauge';
import { StratumTransition } from '@/components/visuals/StratumTransition';
import { useConstantinopleScrollSpy } from '@/hooks/useConstantinopleScrollSpy';
import { STRATA } from '@/components/visuals/constantinopleData';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const Constantinople = () => {
  const { activeSection, globalProgress } = useConstantinopleScrollSpy();

  return (
    <div className="relative" style={{ background: 'hsl(25, 15%, 10%)' }}>
      <MobileNotice />
      <ConstantinopleSectionNav activeSection={activeSection} />
      <DepthGauge activeSection={activeSection} globalProgress={globalProgress} />
      <SurfaceSection />
      <EditionBadge essayId="constantinople" />
      <StratumTransition fromColor={STRATA[0].earthColor} toColor={STRATA[1].earthColor} />
      <OttomanSection />
      <StratumTransition fromColor={STRATA[1].earthColor} toColor={STRATA[2].earthColor} />
      <CrusadeSection />
      <StratumTransition fromColor={STRATA[2].earthColor} toColor={STRATA[3].earthColor} />
      <ByzantinePeakSection />
      <StratumTransition fromColor={STRATA[3].earthColor} toColor={STRATA[4].earthColor} />
      <IconoclasmSection />
      <StratumTransition fromColor={STRATA[4].earthColor} toColor={STRATA[5].earthColor} />
      <ConstantineSection />
      <StratumTransition fromColor={STRATA[5].earthColor} toColor={STRATA[6].earthColor} />
      <RomanOutpostSection />
      <StratumTransition fromColor={STRATA[6].earthColor} toColor={STRATA[7].earthColor} />
      <GreekSection />
      <StratumTransition fromColor={STRATA[7].earthColor} toColor={STRATA[8].earthColor} />
      <BedrockEpilogue />
      <CommentsSection pageSlug="constantinople" />
      <SiteFooter />
    </div>
  );
};

export default Constantinople;
