import React, { useMemo } from 'react';
import { BattutaHero } from '@/components/battuta/BattutaHero';
import { BattutaGenesis, PhaseSection } from '@/components/battuta/BattutaPhaseSections';
import { BlackDeathCounters } from '@/components/battuta/BlackDeathCounters';
import { ComparativeScale } from '@/components/battuta/ComparativeScale';
import { IslamicNetwork } from '@/components/battuta/IslamicNetwork';
import { BattutaEpilogue } from '@/components/battuta/BattutaEpilogue';
import { BattutaProgressTimeline } from '@/components/battuta/BattutaProgressTimeline';
import { BattutaSectionNav } from '@/components/battuta/BattutaSectionNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { useBattutaScrollSpy } from '@/hooks/useBattutaScrollSpy';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { PHASES } from '@/components/visuals/battutaMapData';

const IbnBattuta = () => {
  usePageAnalytics('battuta');
  const { activeSection, globalProgress } = useBattutaScrollSpy();

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38, 35%, 88%)' }}>
      <BattutaSectionNav activeSection={activeSection} />
      <BattutaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <BattutaHero />
      <BattutaGenesis />
      {PHASES.map((_, i) => (
        <PhaseSection key={i} phaseIndex={i} />
      ))}
      <IslamicNetwork />
      <ComparativeScale />
      <BattutaEpilogue />
      <SiteFooter variant="dark" />
    </div>
  );
};

export default IbnBattuta;
