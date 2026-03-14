import React from 'react';
import { Composition } from 'remotion';
import { India1857Teaser } from './compositions/India1857Teaser';
import { IndiaStatesTeaser } from './compositions/IndiaStatesTeaser';
import { BuddhismTeaser } from './compositions/BuddhismTeaser';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1857 Rebellion */}
      <Composition
        id="India1857-Desktop"
        component={India1857Teaser}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: 'desktop' as const }}
      />
      <Composition
        id="India1857-Mobile"
        component={India1857Teaser}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: 'mobile' as const }}
      />
      {/* India States: The Mosaic Republic */}
      <Composition
        id="IndiaStates-Desktop"
        component={IndiaStatesTeaser}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: 'desktop' as const }}
      />
      <Composition
        id="IndiaStates-Mobile"
        component={IndiaStatesTeaser}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: 'mobile' as const }}
      />
      {/* Buddhism: The Path That Split */}
      <Composition
        id="Buddhism-Desktop"
        component={BuddhismTeaser}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: 'desktop' as const }}
      />
      <Composition
        id="Buddhism-Mobile"
        component={BuddhismTeaser}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: 'mobile' as const }}
      />
    </>
  );
};
