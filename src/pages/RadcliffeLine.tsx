import React from 'react';
import { RadcliffeHero } from '@/components/radcliffe/RadcliffeHero';
import { ArchitectSection } from '@/components/radcliffe/ArchitectSection';
import { CommissionSection } from '@/components/radcliffe/CommissionSection';
import { CountdownSection } from '@/components/radcliffe/CountdownSection';
import { PunjabSection } from '@/components/radcliffe/PunjabSection';
import { BengalSection } from '@/components/radcliffe/BengalSection';
import { VoidSection } from '@/components/radcliffe/VoidSection';
import { AftermathSection } from '@/components/radcliffe/AftermathSection';
import { LivingBorderSection } from '@/components/radcliffe/LivingBorderSection';
import { RadcliffeEpilogue } from '@/components/radcliffe/RadcliffeEpilogue';
import { Seam, useSeamProgress } from '@/components/radcliffe/SeamSystem';

const RadcliffeLine = () => {
  const { ref, seamConfig } = useSeamProgress();

  return (
    <div ref={ref} className="radcliffe-bg">
      <Seam config={seamConfig} />
      <RadcliffeHero />
      <ArchitectSection drift={seamConfig.drift} />
      <CommissionSection drift={seamConfig.drift} />
      <CountdownSection />
      <PunjabSection drift={seamConfig.drift} />
      <BengalSection drift={seamConfig.drift} />
      <VoidSection drift={seamConfig.drift} />
      <AftermathSection drift={seamConfig.drift} />
      <LivingBorderSection />
      <RadcliffeEpilogue />
    </div>
  );
};

export default RadcliffeLine;
