import { Composition } from 'remotion';
import { ChainReactionTrailer } from './ChainReactionTrailer';
import { WisdomTrailer } from './WisdomTrailer';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ChainReactionTrailer"
        component={ChainReactionTrailer}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      {/* Wisdom: The Library That Lit the World */}
      <Composition
        id="Wisdom-Desktop"
        component={WisdomTrailer}
        durationInFrames={900}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ layout: 'desktop' as const }}
      />
      <Composition
        id="Wisdom-Mobile"
        component={WisdomTrailer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: 'mobile' as const }}
      />
    </>
  );
};
