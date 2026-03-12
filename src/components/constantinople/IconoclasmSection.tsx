import React from 'react';
import { motion } from 'framer-motion';
import { DigSection } from '@/components/visuals/DigSection';
import { ArtifactCard } from '@/components/visuals/ArtifactCard';
import { ArtifactParticles } from '@/components/visuals/ArtifactParticles';
import { STRATA } from '@/components/visuals/constantinopleData';

const stratum = STRATA[4]; // iconoclasm

export const IconoclasmSection: React.FC = () => (
  <DigSection id={stratum.id} color={stratum.color} earthColor={stratum.earthColor} depth={stratum.depth}>
    <ArtifactParticles color="0 15% 50%" count={22} />
    <div className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40 25% 65%)' }}>
            Stratum IV · {stratum.depth}m below surface · {stratum.year}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(40 25% 90%)' }}>
            {stratum.label}
          </h2>
          <div className="max-w-2xl space-y-6 font-body text-lg leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
            <p>
              For 117 years, the empire tore itself apart over images. In 726, Emperor Leo III
              ordered the icon of Christ above the Chalke Gate destroyed. Riots followed.
              The soldiers who pulled it down were murdered by a crowd of women.
            </p>
            <p>
              The iconoclasts — the "image breakers" — scraped faces from mosaics, smashed
              statues, whitewashed frescoes. Churches were stripped of their art and covered in
              plain crosses and geometric patterns.
            </p>
            <p>
              In the dig, this layer is unmistakable. You find mosaic tesserae in the rubble —
              tiny glass tiles, some still gold-backed, their arrangement shattered beyond
              reconstruction. Marble faces with chisel marks where the eyes should be.
              Deliberate, methodical destruction of beauty.
            </p>
            <p>
              The icons returned in 843 — the "Triumph of Orthodoxy." But the art that had
              been destroyed was gone forever. What remained was rebuilt in a new, more rigid
              style. The original faces, the original expressions — lost to theology.
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
