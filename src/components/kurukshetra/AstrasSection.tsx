import React from 'react';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';
import { AstraBurst } from './AstraBurst';
import { ASTRAS } from './kurukshetraData';

export const AstrasSection = () => (
  <KurukshetraSectionShell
    id="kuru-astras"
    eyebrow="Dhanurveda"
    title="The Celestial Arsenal"
    phase={3}
    variant="indigo"
  >
    <p className="font-body text-base md:text-lg text-kuru-conch/70 leading-relaxed mb-10 max-w-3xl">
      The most potent weapons were the Astras — celestial missiles invoked through mantras, each bound to a deity. Their usage against ordinary soldiers was forbidden under the rules of Dharma Yuddha. These weapons were not merely destructive; they were cosmological instruments, each capable of reshaping the battlefield itself.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
      {ASTRAS.map((astra) => (
        <AstraBurst key={astra.name} astra={astra} />
      ))}
    </div>
  </KurukshetraSectionShell>
);
