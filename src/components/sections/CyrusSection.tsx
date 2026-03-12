import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap, EmpireId } from '@/components/visuals/InteractiveMap';
import { EmpireScaleGraphic } from '@/components/visuals/EmpireScaleGraphic';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const empireStages: {
  empire: EmpireId;
  cities: string[];
  center: [number, number];
  zoom: number;
  showTerritories?: boolean;
  routeCities?: string[];
  annotatedCities?: Array<{
    name: string;
    label: string;
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    offset?: [number, number];
  }>;
}[] = [
  { empire: 'none', cities: ['Pasargadae', 'Ecbatana'], center: [32, 52], zoom: 6 },
  {
    empire: 'achaemenid',
    cities: ['Pasargadae', 'Ecbatana', 'Sardis', 'Babylon'],
    center: [34, 46],
    zoom: 4.35,
    showTerritories: false,
  },
  { empire: 'achaemenid', cities: ['Babylon', 'Susa', 'Ecbatana', 'Persepolis'], center: [32, 48], zoom: 4.5 },
  { empire: 'achaemenid', cities: ['Persepolis', 'Susa', 'Babylon', 'Sardis', 'Memphis'], center: [32, 46], zoom: 4 },
  { empire: 'none', cities: ['Pasargadae'], center: [30.2, 53.2], zoom: 8 },
];

const BabylonInset = () => (
  <div className="pointer-events-none absolute left-[20%] top-[50%] z-[1200] w-[200px] sm:w-[220px] lg:w-[250px]">
    <div className="overflow-hidden rounded-2xl border border-[hsl(43,85%,55%,0.35)] bg-[rgba(7,12,22,0.88)] shadow-[0_18px_56px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src="/images/babylon-ishtar-gate.jpg"
          alt="Ishtar Gate associated with ancient Babylon"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,12,22,0.82)] via-transparent to-[rgba(7,12,22,0.12)]" />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(43,85%,55%,0.72)]">539 BCE</p>
        <h4 className="font-display text-[2.2rem] font-bold leading-none text-gradient-gold">Babylon</h4>
        <p className="font-body text-base leading-relaxed text-foreground/72">
          The gates opened. The city surrendered without a battle.
        </p>
      </div>
    </div>
  </div>
);

const HistoricalStageImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => (
  <div className="w-full h-full flex items-center justify-center">
    <img
      src={src}
      alt={alt}
      className="max-h-[80vh] max-w-[68vw] object-contain rounded-lg shadow-2xl"
    />
  </div>
);

export const CyrusSection = () => (
  <section id="cyrus" style={{ '--era-primary': ERA_COLORS.achaemenid } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep, progress) => {
        const stage = empireStages[Math.min(activeStep, empireStages.length - 1)];
        const zoomBoost = progress * 0.3;
        const activeSpotlight = activeStep === 0 ? {
          name: 'Pasargadae',
          eyebrow: '550 BCE',
          label: 'Cyrus the Great',
          detail: 'Pasargadae • Persian heartland • 550 BCE',
          imageSrc: '/images/cyrus-portrait.jpg',
          imageAlt: 'Portrait-style reconstruction of Cyrus the Great',
          imagePosition: 'center 20%',
        } : undefined;

        return activeStep < 4 ? (
          <div className="relative h-full w-full">
            {activeStep === 2 ? (
              <EmpireScaleGraphic />
            ) : activeStep === 3 ? (
              <HistoricalStageImage
                src="/images/cyrus-cylinder.jpg"
                alt="The Cyrus Cylinder"
              />
            ) : (
              <InteractiveMap
                empire={stage.empire}
                showCities
                visibleCities={activeStep === 1 ? ['Pasargadae', 'Ecbatana', 'Sardis', 'Babylon'] : undefined}
                highlightCities={activeStep === 1 ? ['Babylon'] : stage.cities}
                center={stage.center}
                zoom={stage.zoom + zoomBoost}
                showTerritories={stage.showTerritories}
                routeCities={stage.routeCities}
                annotatedCities={activeStep === 1 ? [
                  { name: 'Babylon', label: 'Babylon', direction: 'top', offset: [0, -18] },
                ] : stage.annotatedCities}
                spotlightCity={activeSpotlight}
              />
            )}
            {activeStep === 1 && <BabylonInset />}
          </div>
        ) : (
          <HistoricalStageImage
            src="/images/tomb-of-cyrus.jpg"
            alt="Tomb of Cyrus at Pasargadae"
          />
        );
      }}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(43,85%,55%,0.6)] mb-4">550 BCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gradient-gold">
            Cyrus the Great
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            A tribal king from a backwater province.
          </p>
          <p className="text-foreground/60 text-base leading-relaxed font-body">
            In a single generation, he would build the largest empire the world had ever seen.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Conquest Begins</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            First, he defeated the Medes — his own overlords.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Then Lydia. Then Babylon itself, taken without a battle. The gates simply opened.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">An Empire Unprecedented</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            This was not just a larger kingdom. It was an imperial system spanning the Mediterranean, Mesopotamia, and the Indus frontier.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            For a brief moment, nearly half the world’s population lived inside a single political order.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Cyrus Cylinder</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The first declaration of human rights.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Conquered peoples kept their religions. Slaves were freed. Displaced nations returned home.
            25 centuries before the UN Charter, Cyrus wrote its prototype in clay.
          </p>
        </div>,
        <div key={4} id="pasargadae">
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Tomb at Pasargadae</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            "O man, I am Cyrus, who founded the empire of the Persians. Do not grudge me this patch of earth that covers my body."
          </p>
          <p className="text-foreground/50 text-sm font-body italic">
            — Inscription at the Tomb of Cyrus
          </p>
        </div>,
      ]}
    />
    <EraTransition
      fromColor={ERA_COLORS.achaemenid}
      toColor={ERA_COLORS.achaemenid}
      year="518 BCE"
      label="The Empire Matures"
    />
  </section>
);
