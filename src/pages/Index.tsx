import React from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ProgressTimeline } from '@/components/scroll/ProgressTimeline';
import { SectionNav } from '@/components/scroll/SectionNav';
import { HeroSection } from '@/components/sections/HeroSection';
import { CyrusSection } from '@/components/sections/CyrusSection';
import { DariusSection } from '@/components/sections/DariusSection';
import { PersianWarsSection } from '@/components/sections/PersianWarsSection';
import { AlexanderSection } from '@/components/sections/AlexanderSection';
import { ParthianSection } from '@/components/sections/ParthianSection';
import { SassanidSection } from '@/components/sections/SassanidSection';
import { IslamicConquestSection } from '@/components/sections/IslamicConquestSection';
import { GoldenAgeSection } from '@/components/sections/GoldenAgeSection';
import { MongolSection } from '@/components/sections/MongolSection';
import { SafavidSection } from '@/components/sections/SafavidSection';
import { ModernSection } from '@/components/sections/ModernSection';
import { EpilogueSection } from '@/components/sections/EpilogueSection';

const Index = () => {
  const { activeSection, globalProgress } = useScrollSpy();

  return (
    <div className="bg-background min-h-screen">
      <SectionNav activeSection={activeSection} />
      <ProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <HeroSection />
      <CyrusSection />
      <DariusSection />
      <PersianWarsSection />
      <AlexanderSection />
      <ParthianSection />
      <SassanidSection />
      <IslamicConquestSection />
      <GoldenAgeSection />
      <MongolSection />
      <SafavidSection />
      <ModernSection />
      <EpilogueSection />
    </div>
  );
};

export default Index;
