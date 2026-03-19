import { Composition } from 'remotion';
import { ChainReactionTrailer } from './ChainReactionTrailer';

export const RemotionRoot = () => {
  return (
    <Composition
      id="ChainReactionTrailer"
      component={ChainReactionTrailer}
      durationInFrames={600}
      fps={30}
      width={3840}
      height={2160}
    />
  );
};
