import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[7]; // greek

export const GreekSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color="210 40% 50%" count={10} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum VII · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(210 50% 70%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              In 657 BCE, colonists from the Greek city of Megara sailed into the Bosporus
              and founded a settlement on the European shore. They called it Byzantion.
            </p>
            <p>
              According to legend, the Delphic Oracle told them to settle "opposite the blind."
              Across the strait, earlier colonists from Megara had founded Chalcedon — on the
              Asian side, which had no natural harbor. The new arrivals looked at the Golden
              Horn, one of the finest natural harbors in the world, and understood: the people
              of Chalcedon must have been blind to miss it.
            </p>
            <p>
              Byzantion was a fishing village, a trading post, a toll station for ships passing
              through the strait. It had no great temples, no famous philosophers, no grand
              ambitions. Just fish, favorable currents, and a very good harbor.
            </p>
            <p>
              This is the deepest human layer. Below this, only geology.
              The fishhooks and pottery shards at this depth are the oldest artifacts in the dig —
              simple bronze curves, black-figure pottery fragments showing fishing scenes.
              2,700 years of city, and it started with a hook and a net.
            </p>
          </div>
        </motion.div>
      </div>

      {stratum.artifacts.map(a => (
        <ArtifactCard key={a.id} artifact={a} stratumColor={stratum.color} />
      ))}
    </div>
  </DigSection>
);
