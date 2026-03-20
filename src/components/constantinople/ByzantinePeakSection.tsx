import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';
import { ByzantineDomeVisual } from './StratumVisuals';

const stratum = STRATA[3]; // byzantine-peak

export const ByzantinePeakSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color="43 60% 50%" count={16} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/65">
            Stratum III · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-6xl">
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              In 537, Justinian walked into his finished cathedral and whispered:
              <em className="italic"> "Solomon, I have surpassed thee."</em> He was not wrong.
              Hagia Sophia's dome seemed to float on light itself — 31 meters across, held up
              by pendentives that no one had ever built at this scale.
            </p>
            <p>
              Constantinople at its peak was a city of half a million, protected by the greatest
              walls ever built — the triple Theodosian Walls, which held against every army for
              800 years. The city had running water, sewers, hospitals, a university, and more
              wealth than any place in Europe.
            </p>
            <p>
              Its secret weapon: Greek fire. A napalm-like liquid that burned on water, sprayed
              from bronze siphons at enemy ships. The formula was a state secret so closely held
              that it died with the empire.
            </p>
            <p>
              In this layer, every fragment glitters. Gold mosaic tesserae — tiny glass tiles
              backed with gold leaf — scattered like fallen stars in the rubble.
            </p>
          </div>
        </motion.div>

        <ByzantineDomeVisual accent={stratum.color} earth={stratum.earthColor} />
      </div>

      {stratum.artifacts.map(a => (
        <ArtifactCard key={a.id} artifact={a} stratumColor={stratum.color} />
      ))}
    </div>
  </DigSection>
);
