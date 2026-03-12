import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[1]; // ottoman

export const OttomanSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color={stratum.color} count={15} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum I · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(40 25% 90%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              On May 29, 1453, the walls that had held for a thousand years finally broke.
              Mehmed II — twenty-one years old, obsessed with this city since boyhood — rode
              through the shattered gate of St. Romanus and into the greatest prize in the world.
            </p>
            <p>
              Within hours, Hagia Sophia's bells rang for the last time. The greatest church in
              Christendom became a mosque. The cross came down. The crescent went up. The city
              that had been the beating heart of Eastern Christianity for 1,123 years became
              the capital of the Ottoman Empire.
            </p>
            <p>
              Under Süleyman the Magnificent, a century later, Constantinople became Istanbul in
              all but official name — a city of 500,000, the largest in Europe, draped in the
              geometry of Sinan's mosques and the tulips of the imperial gardens.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Artifacts */}
      {stratum.artifacts.map(a => (
        <ArtifactCard key={a.id} artifact={a} stratumColor={stratum.color} />
      ))}
    </div>
  </DigSection>
);
