import React, { useEffect } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SamuraiProgressTimeline } from '@/components/samurai/SamuraiProgressTimeline';
import { SamuraiSectionNav } from '@/components/samurai/SamuraiSectionNav';
import { useSamuraiScrollSpy } from '@/hooks/useSamuraiScrollSpy';
import { SamuraiHero } from '@/components/samurai/SamuraiHero';
import { FrozenSocietySection } from '@/components/samurai/FrozenSocietySection';
import { StipendEconomySection } from '@/components/samurai/StipendEconomySection';
import { BlackShipsSection } from '@/components/samurai/BlackShipsSection';
import { RestorationSection } from '@/components/samurai/RestorationSection';
import { AbolitionSection } from '@/components/samurai/AbolitionSection';
import { BondConversionSection } from '@/components/samurai/BondConversionSection';
import { SatsumaSection } from '@/components/samurai/SatsumaSection';
import { SamuraiEpilogue } from '@/components/samurai/SamuraiEpilogue';

const Samurai = () => {
  const { activeSection, globalProgress } = useSamuraiScrollSpy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(40, 25%, 95%)' }}>
      <SiteHeader />
      <SamuraiSectionNav activeSection={activeSection} />
      <SamuraiProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />

      <SamuraiHero />
      <FrozenSocietySection />
      <StipendEconomySection />
      <BlackShipsSection />
      <RestorationSection />
      <AbolitionSection />
      <BondConversionSection />
      <SatsumaSection />
      <SamuraiEpilogue />
      <CommentsSection pageSlug="samurai" />
      <SiteFooter variant="light" />
    </div>
  );
};

export default Samurai;
