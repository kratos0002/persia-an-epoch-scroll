import React from 'react';
import { RadcliffeHero } from '@/components/radcliffe/RadcliffeHero';
import { ArchitectSection } from '@/components/radcliffe/ArchitectSection';
import { CommissionSection } from '@/components/radcliffe/CommissionSection';
import { CountdownSection } from '@/components/radcliffe/CountdownSection';
import { PunjabSection } from '@/components/radcliffe/PunjabSection';
import { BengalSection } from '@/components/radcliffe/BengalSection';
import { VoidSection } from '@/components/radcliffe/VoidSection';
import { NamedSection } from '@/components/radcliffe/NamedSection';
import { AftermathSection } from '@/components/radcliffe/AftermathSection';
import { LivingBorderSection } from '@/components/radcliffe/LivingBorderSection';
import { RadcliffeEpilogue } from '@/components/radcliffe/RadcliffeEpilogue';
import { Seam, useSeamProgress } from '@/components/radcliffe/SeamSystem';

const RadcliffeLine = () => {
  const { ref, seamConfig } = useSeamProgress();

  return (
    // Each wrapper declares the SEAM_PROGRESSION index it represents via
    // `data-seam-stages`. `useSeamProgress` reads these at mount/resize and
    // picks the current stage based on which wrapper the reading eye is
    // inside. See `SeamSystem.tsx:useSeamProgress` for why equal-division
    // of scroll progress didn't work (VoidSection is 250vh).
    <div ref={ref} className="radcliffe-bg">
      <Seam config={seamConfig} />
      <div data-seam-stages="0">
        <RadcliffeHero />
      </div>
      <div data-seam-stages="1">
        <ArchitectSection drift={seamConfig.drift} />
      </div>
      <div data-seam-stages="2">
        <CommissionSection drift={seamConfig.drift} />
      </div>
      <div data-seam-stages="3">
        <CountdownSection />
      </div>
      <div data-seam-stages="4">
        <PunjabSection drift={seamConfig.drift} />
      </div>
      <div data-seam-stages="5">
        <BengalSection drift={seamConfig.drift} />
      </div>
      {/* Void spans two stages: the tear widens, then peaks as pure void. */}
      <div data-seam-stages="6,7">
        <VoidSection drift={seamConfig.drift} />
      </div>
      <div data-seam-stages="8">
        <NamedSection />
      </div>
      <div data-seam-stages="9">
        <AftermathSection drift={seamConfig.drift} />
      </div>
      <div data-seam-stages="10">
        <LivingBorderSection />
      </div>
      {/* Epilogue inherits LivingBorder's healed-scar stage. */}
      <div data-seam-stages="10">
        <RadcliffeEpilogue />
      </div>
    </div>
  );
};

export default RadcliffeLine;
