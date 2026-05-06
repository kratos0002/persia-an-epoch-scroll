import React from 'react';
import { BattutaHero } from '@/components/battuta/BattutaHero';
import { BattutaZoomDive } from '@/components/battuta/BattutaZoomDive';
import { BlackDeathCounters } from '@/components/battuta/BlackDeathCounters';
// ExplorerRoutes removed — its scale-comparison payload was redundant
// with the JourneyOverview reflection's stat row. The unique
// "3× Earth's circumference / 5× Polo / 2× Zheng He" insight is now a
// single line under the reflection's stats.
import { IslamicNetwork } from '@/components/battuta/IslamicNetwork';
import { BattutaEpilogue } from '@/components/battuta/BattutaEpilogue';
import { BattutaProgressTimeline } from '@/components/battuta/BattutaProgressTimeline';
import { BattutaSectionNav } from '@/components/battuta/BattutaSectionNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { useBattutaScrollSpy } from '@/hooks/useBattutaScrollSpy';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { JourneyOverview } from '@/components/visuals/JourneyOverview';

const IbnBattuta = () => {
  usePageAnalytics('battuta');
  const { activeSection, globalProgress } = useBattutaScrollSpy();

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38, 35%, 88%)' }}>
      <BattutaSectionNav activeSection={activeSection} />
      <BattutaProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <BattutaHero />
      {/* Pre-journey scale moment — anticipation. The whole route, drawn in. */}
      <JourneyOverview mode="prelude" id="battuta-prelude" />
      <BattutaZoomDive />
      {/* Post-journey scale moment — reflection. The whole route, drawn whole. */}
      <JourneyOverview mode="reflection" id="battuta-reflection" />
      {/* Three post-dive sections, each a different question. ExplorerRoutes
          deleted — too redundant with the reflection. */}
      <IslamicNetwork />
      <BlackDeathCounters />
      <BattutaEpilogue />
      <SiteFooter variant="dark" />
    </div>
  );
};

export default IbnBattuta;
