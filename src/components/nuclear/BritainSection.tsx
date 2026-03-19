import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { EmpireFade } from '@/components/visuals/EmpireFade';
import { NewspaperClip } from '@/components/nuclear/NewspaperClip';

const NAVY = 'hsl(210, 50%, 40%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  <div key="partner">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: NAVY }}>
      Nation Three · October 3, 1952
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      Empire's <span style={{ color: NAVY }}>Last Card</span>
    </h2>
    <p className="font-display text-lg font-bold mb-4" style={{ color: STEEL }}>
      The United Kingdom
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Britain had been there from the beginning. British physicists — <span style={{ color: LIGHT }}>James Chadwick</span>, who discovered the neutron; <span style={{ color: LIGHT }}>Rudolf Peierls and Otto Frisch</span>, who calculated the critical mass — had done foundational work before the Americans even started. Under the wartime <span style={{ color: LIGHT }}>Quebec Agreement</span>, Britain contributed scientists to the Manhattan Project as a full partner.
    </p>
  </div>,

  <div key="betrayal">
    <p className="font-body text-base leading-relaxed mb-5" style={{ color: STEEL }}>
      Then, in 1946, the United States passed the <span style={{ color: LIGHT }}>McMahon Act</span>, abruptly cutting off all nuclear cooperation with foreign nations — including Britain. Churchill was furious. The country that had helped invent the bomb was now <span style={{ color: LIGHT }}>locked out of its own creation</span>.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Foreign Secretary Ernest Bevin settled the matter in a single sentence at a 1947 Cabinet meeting:
    </p>
    <blockquote className="mt-4 pl-4 border-l-2" style={{ borderColor: NAVY }}>
      <p className="font-body text-base leading-relaxed italic" style={{ color: LIGHT }}>
        "We've got to have this thing over here, whatever it costs. We've got to have a bloody Union Jack on top of it."
      </p>
      <p className="font-body text-xs mt-2" style={{ color: STEEL }}>
        — Ernest Bevin, Foreign Secretary, 1947
      </p>
    </blockquote>
  </div>,

  <div key="penney">
    <p className="font-body text-base leading-relaxed mb-5" style={{ color: STEEL }}>
      The program, codenamed "High Explosive Research," was run on a fraction of the American budget. <span style={{ color: LIGHT }}>William Penney</span>, a mathematician who had witnessed the Nagasaki bombing as a British observer, led the weapons design. He worked from memory, notes, and sheer intellect.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      On October 3, 1952, Britain detonated "<span style={{ color: LIGHT }}>Hurricane</span>" — a <span style={{ color: LIGHT }}>25-kiloton</span> plutonium device — inside the hull of a frigate anchored off the <span style={{ color: LIGHT }}>Monte Bello Islands</span> in Western Australia. <span style={{ color: LIGHT }}>The ship vaporized.</span> Britain was the third nuclear power.
    </p>
    <div className="mt-6 pt-4" style={{ borderTop: `1px solid hsl(210, 30%, 12%)` }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: STEEL }}>
        Hurricane Test — Yield
      </p>
      <p className="font-display text-4xl font-black" style={{ color: NAVY }}>
        25 kilotons
      </p>
    </div>
  </div>,

  <div key="relevance">
    <p className="font-body text-base leading-relaxed mb-5" style={{ color: STEEL }}>
      The empire was crumbling — India had gone, Palestine had gone, Suez would go. But the bomb gave Britain a permanent seat at the table.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The logic was cold and clear: in a world of superpowers, <span style={{ color: LIGHT }}>nuclear weapons were the price of relevance</span>.
    </p>
    <div className="mt-6 pt-4" style={{ borderTop: `1px solid hsl(210, 30%, 12%)` }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-3" style={{ color: STEEL }}>
        Territories Lost · 1947–1963
      </p>
      <div className="space-y-1">
        {[
          { name: 'India', year: '1947' },
          { name: 'Palestine', year: '1948' },
          { name: 'Egypt (Suez)', year: '1956' },
          { name: 'Malaya', year: '1957' },
          { name: 'Kenya', year: '1963' },
        ].map(({ name, year }) => (
          <div key={name} className="flex justify-between items-center">
            <span className="font-body text-xs" style={{ color: STEEL }}>{name}</span>
            <span className="font-body text-xs font-semibold" style={{ color: NAVY }}>{year}</span>
          </div>
        ))}
      </div>
    </div>
    <NewspaperClip
      image="/images/nuclear/headline-1952-hurricane.png"
      paper="The West Australian"
      date="October 4, 1952"
      headline="OPERATION HURRICANE"
      delay={0.5}
    />
  </div>,
];

export const BritainSection = () => {
  return (
    <section id="britain" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <EmpireFade activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
