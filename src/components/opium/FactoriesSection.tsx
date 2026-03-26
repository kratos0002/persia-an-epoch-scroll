import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { FactoryBlueprint } from './visuals/FactoryBlueprint';

export const FactoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-factories" eyebrow="Patna & Ghazipur" title="The Industrialization of Opium" variant="stained">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Following the acquisition of the <em>Diwani</em> in Bengal in 1765, the EIC seized control of opium production. Over <strong className="text-ledger-resin font-semibold">1.5 million</strong> peasant cultivators in the Ganges plains were tethered to the state through an advance system — cash paid upfront to ensure the monopoly.
        </p>

        {/* Factory blueprint visualization */}
        <FactoryBlueprint />

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          By the late 1870s, the system produced over <strong className="text-ledger-resin font-semibold">100,000 chests annually</strong>, with revenue providing roughly 15% of total income for British India. The precision of the manufacturing process — quality control, standardized weights, branded product — was applied with the same rigour as any Victorian industrial operation.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
