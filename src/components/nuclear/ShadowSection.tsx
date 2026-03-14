import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { RedactedDossier } from '@/components/visuals/RedactedDossier';

const SHADOW = 'hsl(220, 15%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(220, 18%, 7%)';

const steps = [
  /* Step 0 ─ Never confirmed, never denied */
  <div key="undeclared">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: SHADOW }}>
      The Undeclared · ≈1966
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      The <span style={{ color: SHADOW }}>Shadow</span>
    </h2>
    <p className="font-display text-lg font-bold mb-5" style={{ color: STEEL }}>
      Israel
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Israel has never confirmed or denied possessing nuclear weapons. It has never
      conducted a confirmed nuclear test. It has never signed the Nuclear
      Non-Proliferation Treaty. And yet it is universally believed to possess between{' '}
      <span style={{ color: LIGHT }}>80 and 90 nuclear warheads</span>, making it one
      of the world's most significant nuclear powers.
    </p>
  </div>,

  /* Step 1 ─ French assistance & Dimona */
  <div key="dimona">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: SHADOW }}>
      The Reactor · 1958–1963
    </p>
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      The program began in the late 1950s with French assistance. France helped Israel
      build the Dimona reactor in the Negev desert — a facility Israel insisted was a{' '}
      <em className="italic" style={{ color: LIGHT }}>"textile plant."</em>
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The Americans suspected the truth from the beginning but chose not to press the
      issue. Inspections were permitted — but inspectors were steered away from the
      plutonium-separation wing buried beneath the facility.
    </p>
  </div>,

  /* Step 2 ─ First device & 1973 alert */
  <div key="alert">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: SHADOW }}>
      The Crisis · October 1973
    </p>
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      By 1966–67, most intelligence assessments concluded that Israel had assembled its
      first nuclear device. The weapon existed. It had simply never been acknowledged.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      During the 1973 Yom Kippur War — Egyptian and Syrian armies advancing on two
      fronts, Israel's survival genuinely in doubt — Defense Minister Moshe Dayan
      reportedly ordered nuclear warheads to be{' '}
      <span style={{ color: LIGHT }}>armed and loaded onto Jericho missiles.</span>{' '}
      The alert lasted hours before conventional military momentum shifted.
    </p>
  </div>,

  /* Step 3 ─ Vanunu & amimut */
  <div key="vanunu">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: SHADOW }}>
      The Revelation · 1986
    </p>
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      In 1986, Mordechai Vanunu — a former technician at Dimona — provided photographs
      and technical details to the British press, confirming what everyone suspected. He
      was subsequently kidnapped by Mossad in Rome and imprisoned for eighteen years.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Israel's policy of "nuclear ambiguity" —{' '}
      <em className="italic" style={{ color: LIGHT }}>amimut</em> — is itself a
      strategic weapon. By neither confirming nor denying, Israel avoids triggering
      the diplomatic consequences of open declaration while maintaining full deterrent
      effect. It is the most successful nuclear bluff — or non-bluff — in history.
    </p>
  </div>,
];

export const ShadowSection = () => {
  return (
    <section id="shadow" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <RedactedDossier activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
