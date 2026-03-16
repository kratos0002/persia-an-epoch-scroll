import React from 'react';
import { RamayanaHero } from '@/components/ramayana/RamayanaHero';
import { RamayanaPaintingGallery } from '@/components/ramayana/RamayanaPaintingGallery';
import { RamayanaZoomDive } from '@/components/ramayana/RamayanaZoomDive';
import { RamayanaEpilogue } from '@/components/ramayana/RamayanaEpilogue';
import { RamayanaProgressTimeline } from '@/components/ramayana/RamayanaProgressTimeline';
import { RamayanaSectionNav } from '@/components/ramayana/RamayanaSectionNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { useRamayanaScrollSpy } from '@/hooks/useRamayanaScrollSpy';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';

const Ramayana = () => {
  usePageAnalytics('ramayana');
  const { activeSection, globalProgress } = useRamayanaScrollSpy();

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38, 45%, 88%)' }}>
      <RamayanaSectionNav activeSection={activeSection} />
      <RamayanaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <RamayanaHero />
      <RamayanaPaintingGallery />
      <RamayanaZoomDive />
      <RamayanaEpilogue />
      <SiteFooter variant="dark" />
    </div>
  );
};

export default Ramayana;
