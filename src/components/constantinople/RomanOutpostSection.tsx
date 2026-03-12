import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[6]; // roman-outpost

export const RomanOutpostSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color="15 40% 55%" count={12} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum VI · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(40 25% 90%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              Before Constantine, Byzantium was just another provincial city. Important for
              its position on the Bosporus — controlling the strait between the Black Sea and
              the Mediterranean — but otherwise unremarkable in the vast machinery of Rome.
            </p>
            <p>
              In 196 CE, Septimius Severus besieged and destroyed the city after it backed
              the wrong candidate in a civil war. He razed the walls, killed the garrison,
              and stripped it of its civic rights. Then, recognizing its strategic value,
              he rebuilt it — larger, with a hippodrome and new walls.
            </p>
            <p>
              For the next 130 years, Byzantium grew slowly. Roman baths, aqueducts, grain
              warehouses. The kind of infrastructure that Rome planted everywhere — functional,
              standardized, unremarkable. The city was a waystation, a customs post, a place
              you passed through on the way to somewhere that mattered.
            </p>
            <p>
              No one imagined it would outlive Rome by a thousand years.
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
