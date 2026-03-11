import React, { useState } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { PersiaMap, type EmpireId } from '@/components/visuals/PersiaMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { HistoricalMap } from '@/components/visuals/HistoricalImage';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { SectionDivider } from '@/components/visuals/PersianPattern';

export const CyrusSection = () => {
  const mapImages = [
    null,
    null,
    '/images/maps/achaemenid-empire.png',
    '/images/maps/achaemenid-empire.png',
    null,
  ];

  return (
    <section id="cyrus">
      <StickyScroll
        graphic={(activeStep) => (
          <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
            {mapImages[activeStep] ? (
              <img
                src={mapImages[activeStep]!}
                alt="Achaemenid Empire territory"
                className="max-w-full max-h-full object-contain rounded-lg opacity-90"
              />
            ) : activeStep === 4 ? (
              <img
                src="/images/cyrus-cylinder.jpg"
                alt="The Cyrus Cylinder"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <PersiaMap
                empire={activeStep >= 2 ? 'achaemenid' : 'none'}
                showCities
                highlightCities={activeStep === 0 ? ['Pasargadae'] : ['Pasargadae', 'Ecbatana']}
                showLabels={activeStep >= 1}
              />
            )}
          </div>
        )}
        steps={[
          <div key={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-persian-gold/60 mb-3">550 BCE · The Rise</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
              Cyrus the Great
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed font-body">
              In the highlands of Persis, a young king named Cyrus II would forge
              the largest empire the world had ever seen. From a small tribal
              kingdom, he dreamed of something unprecedented.
            </p>
          </div>,
          <div key={1}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-gold/80">The Conquest Begins</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              In 550 BCE, Cyrus overthrew his grandfather Astyages, King of the Medes,
              uniting the Persian and Median tribes. Then he turned west — conquering
              Lydia's fabled King Croesus, absorbing the wealth of Anatolia.
            </p>
          </div>,
          <div key={2}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-gold/80">Babylon Falls</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              In 539 BCE, Cyrus entered Babylon without a battle. The great city
              opened its gates. He freed the Jewish captives, earning the title
              "Messiah" in the Hebrew Bible — the only non-Jew to receive this honor.
            </p>
          </div>,
          <div key={3}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-gold/80">The Achaemenid Empire</h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              At its zenith, the empire stretched from Egypt to India — governing
              44% of the world's population. No empire in history would match this
              proportion again.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <AnimatedCounter end={44} suffix="%" label="of world population" className="text-left" />
              <AnimatedCounter end={8} suffix="M" label="km² territory" className="text-left" />
            </div>
          </div>,
          <div key={4}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-gold/80">The Cyrus Cylinder</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              Found in the ruins of Babylon, this clay cylinder declared religious
              tolerance, freed slaves, and established rights for conquered peoples.
              It is often called <em className="text-persian-gold/70">the first declaration of human rights</em> —
              2,300 years before the Universal Declaration.
            </p>
            <p className="text-xs text-muted-foreground/40 mt-3 font-body">Image: Wikimedia Commons (Public Domain)</p>
          </div>,
        ]}
      />
      <SectionDivider />
    </section>
  );
};
