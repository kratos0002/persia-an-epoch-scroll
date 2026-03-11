import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const NAVY = 'hsl(220, 25%, 8%)';
const PAPER = 'hsl(45, 30%, 88%)';
const SCARLET = 'hsl(0, 70%, 48%)';
const ASH = 'hsl(220, 10%, 45%)';

export const CartridgeSection = () => {
  return (
    <section id="cartridges" className="relative py-32 md:py-48 px-6" style={{ background: NAVY }}>
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-8" style={{ color: SCARLET }}>
            January 1857
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12" style={{ color: PAPER }}>
            The Greased Cartridge
          </h2>
        </RevealOnScroll>

        <div className="space-y-8 font-body text-lg leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
          <RevealOnScroll delay={0.2}>
            <p>
              The new Pattern 1853 Enfield rifle required soldiers to bite open a paper cartridge greased with animal fat. 
              The rumor — and it was more than rumor — spread through the barracks: 
              <span style={{ color: PAPER }}> the grease was made from cow and pig fat</span>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p>
              For Hindu sepoys, the cow was sacred. For Muslim sepoys, the pig was unclean. The cartridge was an insult to both, 
              engineered with the casual obliviousness of men who never imagined their subjects had beliefs worth considering.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <p>
              But the cartridge was only the match. The powder had been accumulating for a century: 
              <span style={{ color: PAPER }}> the Doctrine of Lapse</span>, which annexed kingdoms when rulers died without male heirs; 
              the systematic dispossession of landed aristocracy; the taxation that drained villages; 
              the missionary activity that threatened conversion.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <div className="border-l-2 pl-6 my-12" style={{ borderColor: SCARLET }}>
              <p className="font-display text-2xl md:text-3xl italic" style={{ color: PAPER }}>
                "The sepoys believed the British were trying to destroy their caste, their faith, and their way of life. They were not entirely wrong."
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <p>
              In the bazaars and cantonments, two strange objects began to circulate: 
              <span style={{ color: SCARLET }}> chapatis</span> — flat breads passed from village to village in a chain no one could trace — 
              and <span style={{ color: SCARLET }}>lotus flowers</span>, distributed among sepoy regiments. 
              Their meaning was never fully decoded. But everyone understood: <span style={{ color: PAPER }}>something was coming</span>.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
