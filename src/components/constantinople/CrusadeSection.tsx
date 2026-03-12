import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[2]; // crusade

export const CrusadeSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color={stratum.color} count={18} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum II · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(40 25% 90%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              The Fourth Crusade never reached Jerusalem. In April 1204, an army of Frankish
              knights and Venetian sailors — Christians all — turned their siege engines against
              the richest Christian city on earth.
            </p>
            <p>
              For three days, they looted everything. The bronze horses of the Hippodrome were
              shipped to Venice. Ancient Roman statues were melted for coin. Libraries burned.
              Relics were pried from altars and sold. Nuns were assaulted in convents.
            </p>
            <p>
              The Byzantine historian Niketas Choniates watched the destruction and wept:
              <em className="italic block mt-2 pl-4 border-l-2" style={{ borderColor: 'hsl(35 50% 55% / 0.4)' }}>
                "Even the Saracens would have been more merciful."
              </em>
            </p>
            <p>
              The Latin Empire that replaced Byzantium lasted 57 years. But the wound lasted
              forever. When the Ottomans came in 1453, many Greeks preferred the sultan's
              turban to the cardinal's hat.
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
