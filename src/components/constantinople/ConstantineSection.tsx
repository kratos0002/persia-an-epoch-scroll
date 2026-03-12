import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[5]; // constantine

export const ConstantineSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color="43 50% 55%" count={14} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum V · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(43 60% 70%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              On May 11, 330 CE, Constantine I dedicated his new capital with chariot races,
              bread distributions, and a golden statue of himself atop a porphyry column.
              He called it Nova Roma — New Rome. Everyone else called it Constantinople.
            </p>
            <p>
              He stripped the old world to furnish his new one. The Serpent Column from Delphi.
              An Egyptian obelisk for the Hippodrome. Statues from every temple in the empire,
              repurposed as civic decoration. Constantine was building a city out of trophies.
            </p>
            <p>
              The Hippodrome — modeled on Rome's Circus Maximus — could hold 100,000 spectators.
              It was the social center of the empire, where chariot-racing factions (Blues and
              Greens) doubled as political parties. Two centuries later, they would nearly
              destroy the city in the Nika Riots.
            </p>
            <p>
              Beneath the forums and colonnades, Constantine was also making a theological bet.
              This would be a Christian capital — the first ever. Churches replaced temples.
              The cross replaced the eagle. The Roman Empire would never be pagan again.
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
